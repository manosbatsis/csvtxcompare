package com.github.manosbatsis.csvtxcompare;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Slf4j
@SpringBootApplication(scanBasePackages = "com.github.manosbatsis.csvtxcompare")
@EnableTransactionManagement
@EntityScan({"com.github.manosbatsis.csvtxcompare.missmatches.model"})
@EnableJpaRepositories(basePackages = {"com.github.manosbatsis.csvtxcompare.missmatches.repository"})
public class Application {

	public static void main(String[] args) {
		AnnotationConfigEmbeddedWebApplicationContext ctx = (AnnotationConfigEmbeddedWebApplicationContext) SpringApplication.run(Application.class, args);

	}

}
