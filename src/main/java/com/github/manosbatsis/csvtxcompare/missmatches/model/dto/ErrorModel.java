package com.github.manosbatsis.csvtxcompare.missmatches.model.dto;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.ValidationException;

import com.github.manosbatsis.csvtxcompare.missmatches.controller.MismatchesController;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.hibernate.ObjectNotFoundException;

import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;

/**
 * Used by controllers as a JSON response object in case of system errors/exceptions.
 * The model includes messages for the error and it's root cause, an appropriate
 * HTTP status code for any possible exception and the stacktrace as a string.
 *
 * Created by manos on 15/9/2017.
 *
 * @see MismatchesController#handleError(java.lang.Exception)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorModel {

	/**
	 * Exception to HTTP status code mappings
	 */
	private static Map<Class, Integer> exceptionStatuses = new HashMap<Class, Integer>();

	static {
		exceptionStatuses.put(AccessDeniedException.class, HttpServletResponse.SC_UNAUTHORIZED);
		exceptionStatuses.put(ObjectNotFoundException.class, HttpServletResponse.SC_NOT_FOUND);
		exceptionStatuses.put(EntityNotFoundException.class, HttpServletResponse.SC_NOT_FOUND);
		exceptionStatuses.put(EntityExistsException.class, HttpServletResponse.SC_CONFLICT);
		exceptionStatuses.put(HttpRequestMethodNotSupportedException.class, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		exceptionStatuses.put(HttpMediaTypeNotSupportedException.class, HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
		exceptionStatuses.put(HttpMediaTypeNotAcceptableException.class, HttpServletResponse.SC_NOT_ACCEPTABLE);
		exceptionStatuses.put(MissingPathVariableException.class, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		exceptionStatuses.put(DataIntegrityViolationException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(MissingServletRequestParameterException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(ServletRequestBindingException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(ValidationException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(ConversionNotSupportedException.class, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		exceptionStatuses.put(TypeMismatchException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(HttpMessageNotReadableException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(HttpMessageNotWritableException.class, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		exceptionStatuses.put(MethodArgumentNotValidException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(MissingServletRequestPartException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(BindException.class, HttpServletResponse.SC_BAD_REQUEST);
		exceptionStatuses.put(NoHandlerFoundException.class, HttpServletResponse.SC_NOT_FOUND);
		exceptionStatuses.put(AsyncRequestTimeoutException.class, HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		exceptionStatuses.put(RuntimeException.class, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		exceptionStatuses.put(Exception.class, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	}

	/**
	 * Get the appropriate HTTP status code for the given exception
	 * @param e
	 * @return
	 */
	public static Integer toStatusCode(Exception e) {
		Integer status = exceptionStatuses.get(e.getClass());
		// default fall back is 500
		if (status == null) {
			status = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
		}
		return status;
	}

	/**
	 * Convert the given exception to an error model appropriate for a JSON response
	 * @param e
	 * @return
	 */
	public static ErrorModel from(Exception e) {
		return ErrorModel.builder()
				.message(ExceptionUtils.getMessage(e))
				.statusCode(toStatusCode(e))
				.routeCauseMessage(ExceptionUtils.getRootCauseMessage(e))
				.stacktrace(ExceptionUtils.getStackTrace(e))
				.build();
	}

	/** The error message */
	private String message;

	/** The HTTP status code appropriate for the exception */
	private Integer statusCode;

	/** The root cause error message */
	private String routeCauseMessage;

	/** The exception stacktrace  */
	private String stacktrace;
}
