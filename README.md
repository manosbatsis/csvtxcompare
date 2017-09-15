# CSV transaction files comparison

Implementation of trial project for CSV transaction markoff files comparison

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Notes On...](#notes-on)
	- [Assumptions](#assumptions)
	- [Architecture](#architecture)
		- [Backend](#backend)
		- [Frontend](#frontend)
- [HOWTO](#howto)
	- [Build and Run](#build-and-run)
	- [Testing](#testing)
	- [REST API Documentation](#rest-api-documentation)
	- [Database Console](#database-console)
- [UI Screenshots](#ui-screenshots)

<!-- /TOC -->

## Notes

This section includes some informative items regarding the codebase.

### Assumptions

- Comma is assumed to be the field delimiter
- Record ordering is irrelevant
- Date strings, when present, are always given as `yyyy-MM-dd HH:mm:ss`
- Field values are already normalized/regular as string representations of their typed values
- Non-unique records may exist, those are allowed in case they are useful as close (mis)matches
- All possible matches of exceptions should be evaluated and scored according to used-defined criteria
- Close matches are avaluated field-by-field, the code does not try to recover misplaced values
- The (integration) tests assume the sample files have 306/18 and 305/17 records/mismatches for the client and tutuka markoffs respectivel

### Architecture

#### Backend

The project is a vanilla 3 tier (Controller, Service, Repository), RESTful Spring app without my usual model-driven
libs. An embedded, in-memory H2 database is used for convenience and can be replaced by any other mainstream RDBMS without
code changes.

This is also the first time I use Spring Boot's default Tomcat as I normally prefer Jetty for performance.

#### Frontend

The font-end is a simple SPA following the mockup. The SPA also adds a comparison table component where client and tutuka
markoffs are given the x and y axis respectively. The table cells show the overall match score between the records and
provide a tooltip for visual comparison (pending)

## HOWTO

This section includes some quick guides for common dev tasks and resources.

### Build and Run

1) Clone the source:

```
git clone https://github.com/manosbatsis/csvtxcompare.git
```

2) Navigate to the project folder

```
cd csvtxcompare
```

3) Build and run

```
mvn clean install spring-boot:run
```

<img src="src/main/resources/img/cmd-run.png">

4) Browse the app at [http://localhost:8080](http://localhost:8080) (TBA)

### Testing

(Integration) Tests are skipped by default. To enable them, build using the `ci` profile:

```
mvn clean install -P ci
```

This will build the code, launch a tomcat server and execute the tests against it.


### REST API Documentation

To view the API documentation run the application and browse to
[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) to visit the
embedded Swagger UI:

<img src="src/main/resources/img/swagger-ui.png">

### Database Console

To review the database run the application and browse to
[http://localhost:8080/h2-console](http://localhost:8080/h2-console) to visit the
embedded H2 console. In the login screen, just leave everything as-is and submit:

<img src="src/main/resources/img/h2-console.png">


## Walkthrough

This section walks you provides a UI and source walkthrough, showing screenshots and explaining the code for each use-case.
