package com.tutuka.manosbatsis.csvtxcompare.test;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.mapper.factory.Jackson2ObjectMapperFactory;
import org.testng.annotations.BeforeClass;

/**
 * Abstract base class for project integration tests,
 * used to provide common RESTAssured configuration.
 *
 * Created by manos on 16/9/2017.
 */
public abstract class AbstractControllerIT {

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

						// Enable features
						objectMapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true);

						return objectMapper;
					}
				}));

	}
}
