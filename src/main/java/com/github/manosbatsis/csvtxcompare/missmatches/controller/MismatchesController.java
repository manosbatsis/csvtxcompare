package com.github.manosbatsis.csvtxcompare.missmatches.controller;

import java.util.List;
import java.util.Map;

import com.github.manosbatsis.csvtxcompare.missmatches.Constants;
import com.github.manosbatsis.csvtxcompare.missmatches.Util;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFilesComparison;
import com.github.manosbatsis.csvtxcompare.missmatches.service.MarkoffFilesComparisonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * {@value #API_DESC}
 *
 * Created by manos on 11/9/2017.
 */
@Slf4j
@RestController
@RequestMapping(value = Constants.REQUEST_MAPPING_MISMATCHES)
@Api(basePath = Constants.REQUEST_MAPPING_MISMATCHES, value = Constants.REQUEST_MAPPING_MISMATCHES,
		description = MismatchesController.API_DESC, produces = Constants.MULTIPART_JSON)
public class MismatchesController {

	public static final String API_DESC = "Provides a RESTful API to extract, persist and query record mismatches";

	@Autowired
	private MarkoffFilesComparisonService markoffFilesComparisonService;

	@ApiOperation(value = "Persist markoff file",
			notes = "Parses two CSV file parts ('" + Constants.CLIENT_MARKOFF_FILE + "', '" +
					Constants.TUTUKA_MARKOFF_FILE + "') from a multipart HTTP request, " +
					"persists their mismatched records and other info as a MarkoffFilesComparison object and returns it. " +
					"Clients may use the query API or use the returned object to attempt finding close matches.")
	@RequestMapping(method = {RequestMethod.POST}, headers = ("content-type=multipart/*"))
	public MarkoffFilesComparison save(
			@RequestParam(Constants.CLIENT_MARKOFF_FILE) MultipartFile clientMarkoffFilePart,
			@RequestParam(Constants.TUTUKA_MARKOFF_FILE) MultipartFile tutukaMarkoffFilePart) {

		// Get client/tutuka records as a list of maps
		List<Map<String, String>> clientMaps = Util.csvToMaps(clientMarkoffFilePart);
		List<Map<String, String>> tutukaMaps = Util.csvToMaps(tutukaMarkoffFilePart);


		// Persist and write to response
		MarkoffFilesComparison markoffFilesComparison = this.markoffFilesComparisonService.save(clientMaps, tutukaMaps);
		log.debug("save, markoffFilesComparison: {}", markoffFilesComparison);
		return markoffFilesComparison;
	}

}
