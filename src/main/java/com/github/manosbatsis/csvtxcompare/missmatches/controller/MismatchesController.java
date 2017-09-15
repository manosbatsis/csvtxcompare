package com.github.manosbatsis.csvtxcompare.missmatches.controller;

import com.github.manosbatsis.csvtxcompare.missmatches.Constants;
import com.github.manosbatsis.csvtxcompare.missmatches.Util;
import com.github.manosbatsis.csvtxcompare.missmatches.model.ClientMarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.model.MarkoffFilesComparison;
import com.github.manosbatsis.csvtxcompare.missmatches.model.TutukaMarkoffFile;
import com.github.manosbatsis.csvtxcompare.missmatches.model.dto.ErrorModel;
import com.github.manosbatsis.csvtxcompare.missmatches.service.MarkoffFilesComparisonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
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

	/**
	 * The class description reused for javadoc and swagger documentation
	 */
	public static final String API_DESC = "Provides a RESTful API to extract, persist and query record mismatches";

	/**
	 * The {@link MismatchesController#save(org.springframework.web.multipart.MultipartFile, org.springframework.web.multipart.MultipartFile)}
	 * method description reused for javadoc and swagger documentation
	 */
	public static final String API_DESC_SAVE = "Parses two CSV file parts ('" + Constants.CLIENT_MARKOFF_FILE + "', '" +
			Constants.TUTUKA_MARKOFF_FILE + "') from a multipart HTTP request, " +
			"persists their mismatched records and other info as a MarkoffFilesComparison object and returns it. " +
			"Clients may use the query API or use the returned object to attempt finding close matches.";

	/**
	 * The actual service component exposed via REST by this controller
	 */
	@Autowired
	private MarkoffFilesComparisonService service;

	/**
	 * {@value #API_DESC_SAVE}
	 * @param clientMarkoffFilePart
	 * @param tutukaMarkoffFilePart
	 * @return
	 */
	@ApiOperation(value = "Persist markoff file", notes = API_DESC_SAVE)
	@RequestMapping(method = {RequestMethod.POST}, headers = ("content-type=multipart/*"))
	public MarkoffFilesComparison save(
			@RequestParam(name = Constants.CLIENT_MARKOFF_FILE) MultipartFile clientMarkoffFilePart,
			@RequestParam(name = Constants.TUTUKA_MARKOFF_FILE) MultipartFile tutukaMarkoffFilePart) {

		// Create the client/tutuka markoff file entities
		ClientMarkoffFile clientMarkoffFile = Util.partToMarkoffFile(clientMarkoffFilePart, new ClientMarkoffFile());
		TutukaMarkoffFile tutukaMarkoffFile = Util.partToMarkoffFile(tutukaMarkoffFilePart, new TutukaMarkoffFile());

		// Submit to service and write the returned comparison to the response
		MarkoffFilesComparison comparison = this.service.save(clientMarkoffFile, tutukaMarkoffFile);
		log.debug("save, markoffFilesComparison: {}", comparison);
		return comparison;
	}

	/**
	 * Produce a proper JSON response for every error
	 * @param e the exception that occurred, provided by the framework
	 * @return the error model to be serialized as JSON
	 */
	@ExceptionHandler(value = Exception.class)
	protected ResponseEntity<ErrorModel> handleError(Exception e) {
		// help console/log readers
		log.error("handleError: ", e);
		// send the error response
		ErrorModel error = ErrorModel.from(e);
		HttpStatus status = HttpStatus.valueOf(error.getStatusCode());
		return new ResponseEntity<ErrorModel>(error, status);
	}

}
