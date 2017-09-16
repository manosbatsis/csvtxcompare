package com.tutuka.manosbatsis.csvtxcompare;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Basic Spring Boot app context
 */
@Slf4j
@SpringBootApplication(scanBasePackages = {"com.tutuka.manosbatsis.csvtxcompare"})
@EnableTransactionManagement
@EntityScan({"com.tutuka.manosbatsis.csvtxcompare.model"})
@EnableJpaRepositories(basePackages = {"com.tutuka.manosbatsis.csvtxcompare.repository"})
public class Application {

	public static void main(String[] args) {
		AnnotationConfigEmbeddedWebApplicationContext ctx =
				(AnnotationConfigEmbeddedWebApplicationContext) SpringApplication.run(Application.class, args);
	}

}
