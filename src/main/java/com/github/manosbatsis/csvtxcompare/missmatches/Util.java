package com.github.manosbatsis.csvtxcompare.missmatches;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffRecord;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.io.IOUtils;

import org.springframework.web.multipart.MultipartFile;

/**
 * Various project utilities including conversion and mismatch recovery methods.
 *
 * Created by manos on 12/9/2017.
 */
@Slf4j
public class Util {

	/**
	 * Uses the data of the given HTTP request (multi) part to fill-in
	 * the given markoff file instance records.
	 *
	 * @param part the part of the request being the given CSV file
	 * @param markoff the instance to convert the part to
	 * @param <T> the markoff file class. Mostly used because generic parameters have no build-in support for constructing an instance
	 * @return the filled instance
	 */
	public static <T extends MarkoffFile> T partToMarkoffFile(MultipartFile part, T markoff) {

		// Parse CSV records and convert to a list of maps
		List<MarkoffRecord> maps = Util.toMarkoffRecords(part);

		// fill the markoff file instance
		markoff.setFileName(part.getOriginalFilename());
		markoff.setFileSize(part.getSize());
		markoff.setRecords(maps);

		return markoff;
	}

	/**
	 * Returns the CSV records of the given document as a {@link List} of {@link Map} instances.
	 * Allows duplicate records in case they are useful as close (mis)matches
	 * @param markoffFile the given CSV document
	 * @return the CSV records as a {@link List} of {@link Map}s
	 */
	public static List<MarkoffRecord> toMarkoffRecords(MultipartFile markoffFile) {
		List<MarkoffRecord> maps;
		BufferedReader in = null;
		try {
			// create a buffered reader for the CSV doc
			in = new BufferedReader(
					new InputStreamReader(markoffFile.getInputStream()));

			// parse CSV records
			List<CSVRecord> records = CSVFormat.RFC4180
					.withFirstRecordAsHeader()
					.withDelimiter(',').parse(in).getRecords();

			// convert records to a serializable map collection
			maps = new ArrayList<>(records.size());


			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for (CSVRecord record : records) {

				// Get tx date if any
				String sTransactionDate = record.get(MarkoffRecord.TRANSACTION_DATE);
				Date transactionDate = sTransactionDate != null ? format.parse(sTransactionDate) : null;

				// Get tx amount if any
				String sTransactionAmount = record.get(MarkoffRecord.TRANSACTION_AMOUNT);
				BigDecimal TransactionAmount = sTransactionAmount != null
						? new BigDecimal(sTransactionAmount) : null;

				// convert to markof record
				MarkoffRecord markoffRecord = MarkoffRecord.builder()
						.recordComment(record.getComment())
						.recordNumber(record.getRecordNumber())
						.profileName(record.get(MarkoffRecord.PROFILE_NAME))
						.transactionDate(transactionDate)
						.transactionAmount(TransactionAmount)
						.transactionNarrative(record.get(MarkoffRecord.TRANSACTION_NARRATIVE))
						.transactionDescription(record.get(MarkoffRecord.TRANSACTION_DESCRIPTION))
						.transactionID(record.get(MarkoffRecord.TRANSACTION_ID))
						.transactionType(record.get(MarkoffRecord.TRANSACTION_TYPE))
						.walletReference(record.get(MarkoffRecord.WALLET_REFERENCE))
						.build();
				// add map
				maps.add(markoffRecord);
			}
		}
		catch (Exception e) {
			throw new RuntimeException("Failed converting CSV document", e);
		}
		finally {
			// clean up IO resources
			IOUtils.closeQuietly(in);
		}

		return maps;
	}
}
