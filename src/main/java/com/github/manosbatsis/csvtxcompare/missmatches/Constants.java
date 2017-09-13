package com.github.manosbatsis.csvtxcompare.missmatches;

/**
 * Various project constants.
 *
 * Created by manos on 12/9/2017.
 */
public class Constants {

	/** The name of the request parameter/part for client markoff files */
	public static final String CLIENT_MARKOFF_FILE = "clientMarkoffFile";

	/** The name of the request parameter/part for tutuka markoff files */
	public static final String TUTUKA_MARKOFF_FILE = "tutukaMarkoffFile";

	/** Mime type/content type for JSON */
	public static final String MULTIPART_JSON = "application/json";

	/** Mime type/content type HTTP header for CSV document submission requests */
	public static final String MULTIPART_FORM_DATA = "multipart/form-data";


	/** Used for controller request mapping */
	public static final String REQUEST_MAPPING_MISMATCHES = "mismatches";

}
