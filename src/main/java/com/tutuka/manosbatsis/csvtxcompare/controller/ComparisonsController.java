package com.tutuka.manosbatsis.csvtxcompare.controller;

import com.tutuka.manosbatsis.csvtxcompare.Constants;
import com.tutuka.manosbatsis.csvtxcompare.Util;
import com.tutuka.manosbatsis.csvtxcompare.model.ClientMarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.model.MarkoffFilesComparison;
import com.tutuka.manosbatsis.csvtxcompare.model.TutukaMarkoffFile;
import com.tutuka.manosbatsis.csvtxcompare.model.dto.ErrorModel;
import com.tutuka.manosbatsis.csvtxcompare.service.MarkoffFilesComparisonService;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * {@value #API_DESC}
 *
 * Created by manos on 11/9/2017.
 */
@Slf4j
@RestController
@RequestMapping(value = Constants.REQUEST_MAPPING_COMPARISONS)
@Api(basePath = Constants.REQUEST_MAPPING_COMPARISONS, value = Constants.REQUEST_MAPPING_COMPARISONS,
		description = ComparisonsController.API_DESC, produces = Constants.MULTIPART_JSON)
public class ComparisonsController {

	// ----------------------
	// Documentation literals
	// ----------------------
	/**
	 * The class description reused for javadoc and swagger documentation
	 */
	public static final String API_DESC = "Provides a RESTful API to extract, persist and query MarkoffFilesComparisons. " +
			"In case of any error, an ErrorModel object is provided as the JSON response.";

	/**
	 * The {@link ComparisonsController#findOne(String)}
	 * method description reused for javadoc and swagger documentation
	 */
	public static final String API_DESC_FIND_ONE = "Find the MarkoffFilesComparison matching the given ID, if any exists.";

	/**
	 * The {@link ComparisonsController#save(org.springframework.web.multipart.MultipartFile, org.springframework.web.multipart.MultipartFile)}
	 * method description reused for javadoc and swagger documentation
	 */
	public static final String API_DESC_SAVE = "Parses two CSV file parts ('" + Constants.CLIENT_MARKOFF_FILE + "', '" +
			Constants.TUTUKA_MARKOFF_FILE + "') from a multipart HTTP request, " +
			"persists their mismatched records and other info as a MarkoffFilesComparison object and returns it. " +
			"Clients may use the query API or use the returned object to attempt finding close matches.";

	// ----------------------
	// Injected beans
	// ----------------------
	/**
	 * The actual service component exposed via REST by this controller
	 */
	@Autowired
	private MarkoffFilesComparisonService service;

	// ----------------------
	// Endpoint methods
	// ----------------------
	@ApiOperation(value = "Find a markoff files comparison by ID", notes = API_DESC_FIND_ONE)
	@RequestMapping(method = {RequestMethod.GET})
	public MarkoffFilesComparison findOne(@RequestParam(name = "id", required = true) String id) {
		return this.service.findOne(id);
	}

	/**
	 * {@value #API_DESC_SAVE}
	 * @param clientMarkoffFilePart
	 * @param tutukaMarkoffFilePart
	 * @return
	 */
	@ApiOperation(value = "Persist markoff files comparison", notes = API_DESC_SAVE)
	@RequestMapping(method = {RequestMethod.POST}, headers = ("content-type=multipart/*"))
	@ResponseStatus(HttpStatus.CREATED)
	public MarkoffFilesComparison save(
			@RequestParam(name = Constants.CLIENT_MARKOFF_FILE) MultipartFile clientMarkoffFilePart,
			@RequestParam(name = Constants.TUTUKA_MARKOFF_FILE) MultipartFile tutukaMarkoffFilePart) {

		// Create the client/tutuka markoff file entities
		ClientMarkoffFile clientMarkoffFile = Util.toMarkoffFile(clientMarkoffFilePart, new ClientMarkoffFile());
		TutukaMarkoffFile tutukaMarkoffFile = Util.toMarkoffFile(tutukaMarkoffFilePart, new TutukaMarkoffFile());

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
