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
package com.github.manosbatsis.csvtxcompare.missmatches.test;

import static io.restassured.RestAssured.given;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import com.github.manosbatsis.csvtxcompare.missmatches.Constants;
import com.github.manosbatsis.csvtxcompare.missmatches.model.ClientMarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFilesComparison;
import com.github.manosbatsis.csvtxcompare.missmatches.model.TutukaMarkoffFile;
import io.restassured.RestAssured;
import io.restassured.builder.MultiPartSpecBuilder;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.mapper.factory.Jackson2ObjectMapperFactory;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.junit.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

@Slf4j
@Test(description = "MismatchesController Integration Tests")
@SuppressWarnings("unused")
public class MismatchesControllerIT {

	public static final String TEXT_CSV = "text/csv";

	@BeforeClass
	public void setup() {

		// log request/response in errors
		//RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
		RestAssured.port = 8080;

		// configure our object mapper
		RestAssured.config = RestAssuredConfig.config().objectMapperConfig(
			// config object mapper
			new ObjectMapperConfig().jackson2ObjectMapperFactory(new Jackson2ObjectMapperFactory() {
				@Override
				public ObjectMapper create(Class aClass, String s) {
					ObjectMapper objectMapper = new ObjectMapper()
							.registerModule(new ParameterNamesModule())
							.registerModule(new Jdk8Module())
							.registerModule(new JavaTimeModule());

					// Disable features
					objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
					objectMapper.configure(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS, false);
					objectMapper.configure(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE, false);
					objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

					// enable features
					objectMapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true);

					return objectMapper;
				}
			}));

	}


	@Test(description = "Test CSV files submission")
	public void testCsvFilesSubmission() throws Exception {
		log.debug("testCsvFilesSubmission...");
		// Read CSV files
		String file1 = "ClientMarkoffFile20140113.csv";
		String file2 = "TutukaMarkoffFile20140113.csv";
		final byte[] bytes1 = IOUtils.toByteArray(getClass().getResourceAsStream("/" + file1));
		final byte[] bytes2 = IOUtils.toByteArray(getClass().getResourceAsStream("/" + file2));
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
				.when().post(Constants.REQUEST_MAPPING_MISMATCHES)
				.then()
				.statusCode(200).extract().as(MarkoffFilesComparison.class);

		// assume the sample files have 306/18 and 305/17 records/mismatches
		// for the client and tutuka markoffs respectivel
		ClientMarkoffFile clientMarkoff = comparison.getClientMarkoff();
		TutukaMarkoffFile tutukaMarkoff = comparison.getTutukaMarkoff();

		Assert.assertEquals(306, clientMarkoff.getTotalRecords().intValue());
		Assert.assertEquals(18, clientMarkoff.getMismatches().size());
		Assert.assertEquals(305, tutukaMarkoff.getTotalRecords().intValue());
		Assert.assertEquals(17, tutukaMarkoff.getMismatches().size());


	}

}
