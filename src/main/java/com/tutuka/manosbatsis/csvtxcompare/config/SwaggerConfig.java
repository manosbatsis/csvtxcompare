package com.tutuka.manosbatsis.csvtxcompare.config;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Gathers swagger documentation and exposes it via a dedicated endpoint.
 * @see <a href="http://localhost:8080/v2/api-docs">the endpoint</a>
 * @see <a href="http://localhost:8080/swagger-ui.html">the Swagger UI</a>
 */
@Configuration
@EnableSwagger2
@EnableAutoConfiguration
public class SwaggerConfig {

	// ----------------------------------------------------------
	// Properties, see src/main/resources/application.properties
	// ----------------------------------------------------------
	@Value("${spring.application.name}")
	private String applicationName;

	@Value("${csvtxcompare.appVersion}")
	private String applicationVersion;

	@Value("${csvtxcompare.contact.name}")
	private String contactName;

	@Value("${csvtxcompare.contact.url}")
	private String contactUrl;

	@Value("${csvtxcompare.contact.email}")
	private String contactEmail;


	@Value("${csvtxcompare.license.name}")
	private String licenseName;

	@Value("${csvtxcompare.license.url}")
	private String licenseUrl;

	// -------------
	// Swagger beans
	// -------------

	/**
	 * Configure the documentation annotations scanner
	 * @return the configuration as a Docket bean
	 */
	@Bean
	public Docket customImplementation() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.any())
				.build()
				.apiInfo(apiInfo());
	}

	/**
	 * Default UI configuration
	 * @return the UI configuration bean
	 */
	@Bean
	public UiConfiguration uiConfig() {
		return new UiConfiguration((String) null);
	}

	// -------------
	// Util methods
	// -------------

	/**
	 * Build an ApiInfo based on application.properties
	 * @return
	 */
	private ApiInfo apiInfo() {

		Contact contact = new Contact(contactName, contactUrl, contactEmail);
		return new ApiInfo("Tutuka " + applicationName + " API reference " + applicationVersion,
				"Generated documentation based on [Swagger](http://swagger.io/) and created by [Springfox](http://springfox.github.io/springfox/).",
				applicationVersion, "urn:tos", contactName, licenseName,
				licenseUrl);
	}
}
