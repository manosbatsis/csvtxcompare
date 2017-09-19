/**
 *
 * Restdude
 * -------------------------------------------------------------------
 *
 * Copyright © 2005 Manos Batsis (manosbatsis gmail)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package com.tutuka.manosbatsis.csvtxcompare.test;

import static io.restassured.RestAssured.given;

import com.tutuka.manosbatsis.csvtxcompare.Constants;
import com.tutuka.manosbatsis.csvtxcompare.model.ClientMarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffFilesComparison;
import com.tutuka.manosbatsis.csvtxcompare.model.TutukaMarkoffFile;
import io.restassured.builder.MultiPartSpecBuilder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.junit.Assert;
import org.testng.annotations.Test;

@Slf4j
@Test(description = "MismatchesController Integration Tests")
@SuppressWarnings("unused")
public class MismatchesControllerIT extends AbstractControllerIT {

	public static final String TEXT_CSV = "text/csv";


	@Test(description = "Test CSV files submission")
	public void testCsvFilesSubmission() throws Exception {
		log.debug("testCsvFilesSubmission...");
		// Read CSV files
		String file1 = "ClientMarkoffFile20140113.csv";
		String file2 = "TutukaMarkoffFile20140113.csv";
		final byte[] bytes1 = IOUtils.toByteArray(getClass().getResourceAsStream("/static/" + file1));
		final byte[] bytes2 = IOUtils.toByteArray(getClass().getResourceAsStream("/static/" + file2));
		MarkoffFilesComparison c = new MarkoffFilesComparison();

		// POST via multipart request, test for HTTP 200
		MarkoffFilesComparison comparison = given()
					.contentType(Constants.MULTIPART_FORM_DATA)
					.multiPart(new MultiPartSpecBuilder(bytes1)
						.fileName(file1)
						.controlName(Constants.CLIENT_MARKOFF_FILE)
						.mimeType(TEXT_CSV).build())
					.multiPart(new MultiPartSpecBuilder(bytes2)
						.fileName(file1)
						.controlName(Constants.TUTUKA_MARKOFF_FILE)
						.mimeType(TEXT_CSV).build())
				.when()
					.post(Constants.REQUEST_MAPPING_COMPARISONS)
				.then()
					.statusCode(201).extract().as(MarkoffFilesComparison.class);

		// validate markoff files
		validateMarkoffFiles(comparison);

		// try retrieving the persisted comparison
		comparison = given().log().all()
				.when()
					.get(Constants.REQUEST_MAPPING_COMPARISONS + "/" + comparison.getId())
				.then()
					.statusCode(200).extract().as(MarkoffFilesComparison.class);

		// validate markoff files
		validateMarkoffFiles(comparison);
	}

	/**
	 * Validate markoff files assuming the are taken from src/test/resources
	 * @param comparison
	 */
	private void validateMarkoffFiles(MarkoffFilesComparison comparison) {
		// assume the sample files have 306/18 and 305/17 records/mismatches
		// for the client and tutuka markoffs respectivel
		ClientMarkoffFile clientMarkoff = comparison.getClientMarkoff();
		TutukaMarkoffFile tutukaMarkoff = comparison.getTutukaMarkoff();

		Assert.assertEquals(306, clientMarkoff.getTotalRecordsCount().intValue());
		Assert.assertEquals(18, clientMarkoff.getMismatches().size());
		Assert.assertEquals(305, tutukaMarkoff.getTotalRecordsCount().intValue());
		Assert.assertEquals(17, tutukaMarkoff.getMismatches().size());
	}

}
