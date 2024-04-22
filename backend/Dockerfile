# Stage 1: Build the application
FROM maven:3.8.4-openjdk-8 AS build
WORKDIR /app

# Copy the project files
COPY src ./src
COPY pom.xml .

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Create the Docker final image
FROM openjdk:8-jdk-alpine
EXPOSE 8080
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
