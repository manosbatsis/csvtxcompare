package com.tutuka.manosbatsis.csvtxcompare.config;

import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.orm.hibernate5.HibernateExceptionTranslator;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Configuration of webapp context: exception handlers,
 * jackson (de)serialization features, CORS etc.
 */
@Slf4j
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter /*implements WebMvcRegistrations*/ {

	/**
	 * Make better use of underlying ORM exceptions
	 * @return
	 */
	@Bean
	public HibernateExceptionTranslator hibernateExceptionTranslator() {
		return new HibernateExceptionTranslator();
	}

	/**
	 * Allow cross-domain requests from port 4200 to 8080 during development
	 * @param registry
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
			.allowCredentials(true)
			.allowedOrigins("*")
			//.allowedHeaders("*")
			//.exposedHeaders("*")
			.allowedMethods("HEAD", "GET", "OPTIONS", "PUT", "PATCH", "POST", "DELETE")
			.maxAge(3600);
	}

	/**
	 * Some custom Jacksone/JSON configuration
	 * @return
	 */
	@Bean
	public Jackson2ObjectMapperBuilder jacksonBuilder() {
		Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
		builder.featuresToEnable(com.fasterxml.jackson.databind.MapperFeature.DEFAULT_VIEW_INCLUSION)
			.featuresToDisable(
				SerializationFeature.FAIL_ON_EMPTY_BEANS,
				com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				com.fasterxml.jackson.databind.DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS,
				com.fasterxml.jackson.databind.DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE,
				com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		return builder;
	}
}