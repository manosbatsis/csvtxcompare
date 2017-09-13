package com.github.manosbatsis.csvtxcompare.missmatches.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.github.manosbatsis.csvtxcompare.missmatches.Util;
import com.github.manosbatsis.csvtxcompare.missmatches.model.ClientMarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFilesComparison;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MismatchedRecord;
import com.github.manosbatsis.csvtxcompare.missmatches.model.TutukaMarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.repository.ClientMarkoffFileRepository;
import com.github.manosbatsis.csvtxcompare.missmatches.repository.MarkoffFilesComparisonRepository;
import com.github.manosbatsis.csvtxcompare.missmatches.repository.MismatchedRecordRepository;
import com.github.manosbatsis.csvtxcompare.missmatches.repository.TutukaMarkoffFileRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.ListUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Typical repository interface for {@link MarkoffFilesComparison} entities.
 * Implementation is automatically generated by Spring
 * Created by manos on 12/9/2017.
 */
@Slf4j
@Service()
@Transactional(readOnly = true, rollbackFor = Exception.class)
public class MarkoffFilesComparisonService {

	@Autowired
	private MarkoffFilesComparisonRepository repository;

	@Autowired
	private ClientMarkoffFileRepository clientMarkoffFileRepository;

	@Autowired
	private TutukaMarkoffFileRepository tutukaMarkoffFileRepository;

	@Autowired
	private MismatchedRecordRepository mismatchedRecordRepository;


	@Transactional(readOnly = false)
	public MarkoffFilesComparison save(List<Map<String, String>> clientMaps, List<Map<String, String>> tutukaMaps) {

		// Create the list of mismatches per markoff by excluding the intersection of
		// the originals above. Note: contrary to List.removeAll, the lines bellow respect cardinality
		// TODO: doing this manually VS two irrelevant ListUtils calls can improve performance somewhat
		List<Map<String, String>> clientMismatchMaps = ListUtils.subtract(clientMaps, tutukaMaps);
		List<Map<String, String>> tutukaMismatchMaps = ListUtils.subtract(tutukaMaps, clientMaps);

		// Create the main comparison entity
		MarkoffFilesComparison markoffFilesComparison = this.repository.save(new MarkoffFilesComparison());

		// Create the client markoff child
		ClientMarkoffFile clientMarkoffFile = ClientMarkoffFile.builder()
				.markoffFilesComparison(markoffFilesComparison)
				.totalRecords(clientMaps.size()).build();
		// Persist the client markoff child
		clientMarkoffFile = this.clientMarkoffFileRepository.save(clientMarkoffFile);
		markoffFilesComparison.setClientMarkoff(clientMarkoffFile);
		// Save client mismatched records and add to returned object
		clientMarkoffFile.setMismatches(saveMismatchedRecords(clientMismatchMaps, clientMarkoffFile));

		// Create the tutuka markoff child
		TutukaMarkoffFile tutukaMarkoffFile = TutukaMarkoffFile.builder()
				.markoffFilesComparison(markoffFilesComparison)
				.totalRecords(tutukaMaps.size()).build();
		// Persist the tutuka markoff child
		tutukaMarkoffFile = this.tutukaMarkoffFileRepository.save(tutukaMarkoffFile);
		markoffFilesComparison.setTutukaMarkoff(tutukaMarkoffFile);
		// Save tutuka mismatched records and add to returned object
		tutukaMarkoffFile.setMismatches(saveMismatchedRecords(tutukaMismatchMaps, tutukaMarkoffFile));

		return markoffFilesComparison;
	}

	/**
	 * Persist the given mismatched records
	 * @param mismatchMaps given as a lisat of maps
	 * @param clientMarkoffFile the markoff file the maps belong to
	 */
	@Transactional(readOnly = false)
	public List<MismatchedRecord> saveMismatchedRecords(List<Map<String, String>> mismatchMaps, MarkoffFile clientMarkoffFile) {
		List<MismatchedRecord> clientMismatchRecords = Util.toMismatchRecords(mismatchMaps, clientMarkoffFile);
		List<MismatchedRecord> saved = new ArrayList<>(clientMismatchRecords.size());
		for (MismatchedRecord record : clientMismatchRecords) {
			record.setMarkoffFile(clientMarkoffFile);
			log.debug("saveMismatchedRecords, record: {}", record);
			saved.add(this.mismatchedRecordRepository.save(record));
		}
		return saved;
	}

}