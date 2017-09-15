package com.github.manosbatsis.csvtxcompare;

import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Slf4j
@SpringBootApplication(scanBasePackages = {"**.restdude", "com.github.manosbatsis.csvtxcompare"})
@EnableTransactionManagement
@EntityScan({"**.restdude", "com.github.manosbatsis.csvtxcompare.missmatches.model"})
@EnableJpaRepositories(basePackages = {"com.github.manosbatsis.csvtxcompare.missmatches.repository"})
public class Application {

	public static void main(String[] args) {
		AnnotationConfigEmbeddedWebApplicationContext ctx = (AnnotationConfigEmbeddedWebApplicationContext) SpringApplication.run(Application.class, args);

	}

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
