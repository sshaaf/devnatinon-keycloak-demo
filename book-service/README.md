# Book Service
Is a backend service written in Quarkus that does the following. 
- The API is a Books API, uses a Pg database in the backend to store the data. 
- This project uses Quarkus, the Supersonic Subatomic Java Framework.
- It uses the Quarkus oidc extension to authorize against Keycloak
- An angular front-end for this service is also available here.
- API endpoints
  - GET -> getAll,
  - GET /{isbn} -> getOne,
  - DELETE /{isbn} -> remove,
  - POST -> create,
  - PUT /isbn -> update

-----------------------
If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw compile quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

## Packaging and running the application

The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:

```shell script
./mvnw package -Dquarkus.package.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

## Creating a native executable

You can create a native executable using:

```shell script
./mvnw package -Pnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using:

```shell script
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/keycloak-basic-1.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.

## Provided Code

### RESTEasy Reactive

Easily start your Reactive RESTful Web Services

[Related guide section...](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)



### Securing with Keycloak



Testing the backend service from a terminal
Getting a token from Keycloak. 
```
export access_token=$(\
  curl --insecure -X POST http://localhost:32778/realms/quarkus/protocol/openid-connect/token \
  --user backend-service:secret \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'username=alice&password=alice&grant_type=password' | jq --raw-output '.access_token' \
  )
```

Hitting the API with the token.

```
curl -v -X GET   http://localhost:8888/books   -H "Authorization: Bearer "$access_token
```

