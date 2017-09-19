package com.tutuka.manosbatsis.csvtxcompare;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffRecord;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.io.IOUtils;

import org.springframework.web.multipart.MultipartFile;

/**
 * Various utilities for conversion and mismatch discovery
 *
 * Created by manos on 12/9/2017.
 */
@Slf4j
public class Util {

	/**
	 * Uses the data of the given HTTP request (multi) part to populate
	 * the given markoff file instance records.
	 *
	 * @param part the part of the request being the given CSV file
	 * @param markoff the instance to convert the part to
	 * @param <T> the markoff file class. Mostly used because generic parameters have no build-in support for constructing an instance
	 * @return the populated instance
	 */
	public static <T extends MarkoffFile> T toMarkoffFile(MultipartFile part, T markoff) {

		// Parse CSV records, convert to markoff record instances
		List<MarkoffRecord> records = Util.toMarkoffRecords(part);

		// Populate the markoff file instance
		markoff.setFileName(part.getOriginalFilename());
		markoff.setFileSize(part.getSize());
		markoff.setRecords(records);

		return markoff;
	}

	/**
	 * Returns the CSV records of the given document as a {@link List} of {@link Map} instances.
	 * Allows duplicate records in case they are useful as close (mis)matches
	 * @param markoffFile the given CSV document
	 * @return the CSV records as a {@link List} of {@link Map}s
	 */
	public static List<MarkoffRecord> toMarkoffRecords(MultipartFile markoffFile) {
		List<MarkoffRecord> markoffRecords;
		BufferedReader in = null;
		try {
			// Create a buffered reader for the CSV doc
			in = new BufferedReader(
					new InputStreamReader(markoffFile.getInputStream()));

			// Parse CSV records
			List<CSVRecord> csvRecords = CSVFormat.RFC4180
					.withFirstRecordAsHeader()
					.withDelimiter(',').parse(in).getRecords();

			// Convert records to a serializable map collection
			markoffRecords = new ArrayList<>(csvRecords.size());

			// Iterate CSV records
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for (CSVRecord record : csvRecords) {

				// Get tx amount if any
				String sTransactionAmount = record.get(MarkoffRecord.TRANSACTION_AMOUNT);
				BigDecimal TransactionAmount = Objects.isNull(sTransactionAmount)
						? null : new BigDecimal(sTransactionAmount);

				// Convert to markoff record instance
				MarkoffRecord markoffRecord = MarkoffRecord.builder()
						.recordComment(record.getComment())
						.recordNumber(record.getRecordNumber())
						.profileName(record.get(MarkoffRecord.PROFILE_NAME))
						.transactionDate(record.get(MarkoffRecord.TRANSACTION_DATE))
						.transactionAmount(TransactionAmount)
						.transactionNarrative(record.get(MarkoffRecord.TRANSACTION_NARRATIVE))
						.transactionDescription(record.get(MarkoffRecord.TRANSACTION_DESCRIPTION))
						.transactionID(record.get(MarkoffRecord.TRANSACTION_ID))
						.transactionType(record.get(MarkoffRecord.TRANSACTION_TYPE))
						.walletReference(record.get(MarkoffRecord.WALLET_REFERENCE))
						.build();

				// Add markoff record to results
				markoffRecords.add(markoffRecord);
			}
		}
		catch (Exception e) {
			throw new RuntimeException("Failed converting CSV document", e);
		}
		finally {
			// clean up IO resources
			IOUtils.closeQuietly(in);
		}

		return markoffRecords;
	}
}
