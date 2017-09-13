# Overview

Implementation of trial project for CSV transaction files comparison

## Notes On...

This section includes some informative items regarding the codebase.

### ...Assumptions
  
- Comma is assumed to be the field delimiter.
- Record ordering is irrelevant.
- Date strings are given as `yyyy-MM-dd HH:mm:ss`.
- Field values are already normalized/regular as string representations of their typed values.
- Non-unique records may exist, those are allowed in case they are useful as close (mis)matches.
- All possible matches of exceptions should be evaluated and scored according to used-defined criteria.
- Close matches are avaluated field-by-field, the code does not try to recover misplaced values. 
- The (integration) tests assume the sample files have 306/18 and 305/17 records/mismatches for the client and tutuka markoffs respectively
 
### ...Architecture

#### Backend 

The project is a vanilla 3 tier (Controller, Service, Repository), RESTful Spring app without my usual model-driven 
libs. An embedded, in-memory H2 database is used for convenience. The set of usecases is also very narrow so eager 
fetching is used for mismatch child collections, something I normally avoid. 

This is also the first time I use Spring Boot's default Tomcat as I normally prefer Jetty for performance.

#### Frontend

TBA

## HOWTO

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

## Tests

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


## Screenshots