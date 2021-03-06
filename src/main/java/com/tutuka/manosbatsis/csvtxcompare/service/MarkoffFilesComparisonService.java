package com.tutuka.manosbatsis.csvtxcompare.service;

import java.util.ArrayList;
import java.util.List;

import com.tutuka.manosbatsis.csvtxcompare.model.ClientMarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffFilesComparison;
import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffRecord;
import com.tutuka.manosbatsis.csvtxcompare.model.TutukaMarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.repository.ClientMarkoffFileRepository;
import com.tutuka.manosbatsis.csvtxcompare.repository.MarkoffFilesComparisonRepository;
import com.tutuka.manosbatsis.csvtxcompare.repository.MarkoffRecordRepository;
import com.tutuka.manosbatsis.csvtxcompare.repository.TutukaMarkoffFileRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.ListUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Typical service interface for {@link MarkoffFilesComparison} entities.
 *
 * Created by manos on 12/9/2017.
 */
@Slf4j
@Service()
@Transactional(readOnly = true, rollbackFor = Exception.class)
public class MarkoffFilesComparisonService {

	// ----------------------
	// Injected beans
	// ----------------------
	@Autowired
	private MarkoffFilesComparisonRepository repository;

	@Autowired
	private ClientMarkoffFileRepository clientMarkoffFileRepository;

	@Autowired
	private TutukaMarkoffFileRepository tutukaMarkoffFileRepository;

	@Autowired
	private MarkoffRecordRepository mismatchedRecordRepository;

	// ----------------------
	// Service methods
	// ----------------------

	/**
	 * Find the markoff files comparison matching the given ID
	 * @param id
	 * @return
	 */
	public MarkoffFilesComparison findOne(String id) {
		return this.repository.findOne(id);
	}

	/**
	 * Create and persist a markoff files comparison using the given files.
	 *
	 * @param clientMarkoff
	 * @param tutukaMarkoff
	 * @return
	 */
	@Transactional(readOnly = false)
	public MarkoffFilesComparison save(ClientMarkoffFile clientMarkoff, TutukaMarkoffFile tutukaMarkoff) {

		// The persistence logic bellow seems a bit verbose, but is our preferred
		// approach VS using cascades etc. globally with JPA.

		// Add the main comparison entity to the transaction
		MarkoffFilesComparison markoffFilesComparison = this.repository.save(new MarkoffFilesComparison());

		// Note the original markoff records as they are transient
		// and will be discarded
		List<MarkoffRecord> clientRecords = clientMarkoff.getRecords();
		List<MarkoffRecord> tutukaRecords = tutukaMarkoff.getRecords();
		log.debug("saved clientRecords: {}", clientRecords);
		log.debug("saved tutukaRecords: {}", tutukaRecords);

		// Add the client markoff file to the transaction
		clientMarkoff.setMarkoffFilesComparison(markoffFilesComparison);
		clientMarkoff = this.clientMarkoffFileRepository.save(clientMarkoff);
		markoffFilesComparison.setClientMarkoff(clientMarkoff);

		// Add the tutuka markoff file to the transaction
		tutukaMarkoff.setMarkoffFilesComparison(markoffFilesComparison);
		tutukaMarkoff = this.tutukaMarkoffFileRepository.save(tutukaMarkoff);
		markoffFilesComparison.setTutukaMarkoff(tutukaMarkoff);

		// Create the list of mismatched records per markoff by excluding
		// the intersection of the original record lists.
		// Note: contrary to List.removeAll, the lines bellow respect cardinality
		// TODO: doing this manually VS two irrelevant ListUtils calls can improve performance somewhat
		log.debug("saved clientRecords1: {}", clientRecords);
		log.debug("saved tutukaRecords1: {}", tutukaRecords);
		List<MarkoffRecord> clientMismatchMaps = ListUtils.subtract(clientRecords, tutukaRecords);
		List<MarkoffRecord> tutukaMismatchMaps = ListUtils.subtract(tutukaRecords, clientRecords);
		log.debug("saved clientMismatchMaps: {}", clientMismatchMaps);
		log.debug("saved tutukaMismatchMaps: {}", tutukaMismatchMaps);

		// Convert to, save, and set mismatch records per markoff
		this.saveMismatchedRecords(clientMismatchMaps, clientMarkoff);
		this.saveMismatchedRecords(tutukaMismatchMaps, tutukaMarkoff);

		log.debug("saved clientMarkoff: {}", clientMarkoff);
		log.debug("saved tutukaMarkoff: {}", tutukaMarkoff);

		// Return the persisted comparison object graph
		return markoffFilesComparison;
	}

	// ----------------------
	// Utility methods
	// ----------------------
	/**
	 * Persist the given mismatched records
	 * @param mismatchedRecords given as a lisat of maps
	 * @param markoffFile the markoff file the maps belong to
	 */
	protected void saveMismatchedRecords(List<MarkoffRecord> mismatchedRecords, MarkoffFile markoffFile) {
		log.debug("saveMismatchedRecords, clientMismatchRecords: {}", mismatchedRecords);
		List<MarkoffRecord> saved = new ArrayList<>(mismatchedRecords.size());
		for (MarkoffRecord record : mismatchedRecords) {
			record.setMarkoffFile(markoffFile);
			log.debug("saveMismatchedRecords, record: {}", record);
			saved.add(this.mismatchedRecordRepository.save(record));
		}
		markoffFile.setMismatches(saved);
	}

}
