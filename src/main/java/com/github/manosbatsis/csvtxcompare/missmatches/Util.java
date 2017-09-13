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
import com.github.manosbatsis.csvtxcompare.missmatches.model.MismatchedRecord;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.io.IOUtils;

import org.springframework.web.multipart.MultipartFile;

/**
 * Various project utilities.
 *
 * Created by manos on 12/9/2017.
 */
@Slf4j
public class Util {

	/**
	 * Returns the CSV records of the given document as a {@link List} of {@link Map} instances.
	 * Allows duplicate records in case they are useful as close (mis)matches
	 * @param markoffFile the given CSV document
	 * @return the CSV records as a {@link List} of {@link Map}s
	 */
	public static List<Map<String, String>> csvToMaps(MultipartFile markoffFile) {
		List<Map<String, String>> maps;
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
			for (CSVRecord record : records) {

				// convert to map and add
				maps.add(record.toMap());
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


	/**
	 * Convert the given {@link Map}s to {@link MismatchedRecord} instances
	 */
	public static List<MismatchedRecord> toMismatchRecords(List<Map<String, String>> clientMismatchMaps,
			MarkoffFile markoffFile) {
		List<MismatchedRecord> mismatchedRecords = new ArrayList<>(clientMismatchMaps.size());
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//                                                2014-01-11 22:27:44
		try {
			// Convert manually for best performance
			for (Map<String, String> map : clientMismatchMaps) {

				// Get tx date if any
				String sTransactionDate = map.get("TransactionDate");
				Date transactionDate = sTransactionDate != null ? format.parse(sTransactionDate) : null;

				// Get tx amount if any
				String sTransactionAmount = map.get("TransactionDate");
				BigDecimal TransactionAmount = sTransactionAmount != null
						? BigDecimal.valueOf(Long.parseLong(map.get("TransactionAmount"))) : null;

				// Build mismatch record
				MismatchedRecord mismatch = MismatchedRecord.builder()
						.profileName(map.get("ProfileName"))
						.transactionDate(transactionDate)
						.transactionAmount(TransactionAmount)
						.transactionNarrative(map.get("TransactionNarrative"))
						.transactionDescription(map.get("TransactionDescription"))
						.transactionID(map.get("TransactionID"))
						.transactionType(map.get("TransactionType"))
						.walletReference(map.get("WalletReference"))
						.markoffFile(markoffFile)
						.build();
				// Add record
				mismatchedRecords.add(mismatch);
				log.debug("save, converted map: {} to mismatch: {}", map, mismatch);
			}
		}
		catch (Exception e) {
			throw new RuntimeException("Failed to convert mismatch record", e);
		}
		return mismatchedRecords;
	}
}
