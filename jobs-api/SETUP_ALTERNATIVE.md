# Alternative Ways to Run the Spring Boot API

If you're having issues with the Maven wrapper, here are alternative methods to run the application:

## Option 1: Install Maven Locally (Recommended)

### Download and Install Maven

1. **Download Maven**: Visit https://maven.apache.org/download.cgi
   - Download `apache-maven-3.9.5-bin.zip` (or latest version)

2. **Extract to a folder**: 
   - Example: `C:\Program Files\Apache\maven`

3. **Add to System PATH**:
   - Open "Environment Variables" in Windows
   - Add to `Path`: `C:\Program Files\Apache\maven\bin`

4. **Verify installation**:
   ```cmd
   mvn --version
   ```

5. **Run the application**:
   ```cmd
   cd Udayan-Group/jobs-api
   mvn spring-boot:run
   ```

## Option 2: Use IDE (IntelliJ IDEA / Eclipse)

### IntelliJ IDEA

1. Open IntelliJ IDEA
2. File → Open → Select `Udayan-Group/jobs-api/pom.xml`
3. Wait for dependencies to download
4. Right-click `JobsApiApplication.java`
5. Select "Run 'JobsApiApplication'"

### Eclipse / Spring Tool Suite

1. Open Eclipse/STS
2. File → Import → Maven → Existing Maven Projects
3. Select `Udayan-Group/jobs-api`
4. Right-click project → Run As → Spring Boot App

## Option 3: Build and Run JAR

If you have Maven installed:

```cmd
cd Udayan-Group/jobs-api
mvn clean package -DskipTests
java -jar target/jobs-api-1.0.0.jar
```

## Option 4: Fix Maven Wrapper

The wrapper files might be missing. Try this:

```cmd
cd Udayan-Group/jobs-api

REM Download the wrapper jar manually
curl -o .mvn\wrapper\maven-wrapper.jar https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

REM Then try running again
mvnw.cmd spring-boot:run
```

## Option 5: Use Docker (Advanced)

Create a `Dockerfile` in `jobs-api/`:

```dockerfile
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/jobs-api-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Then run:
```cmd
docker build -t udayan-jobs-api .
docker run -p 8080:8080 udayan-jobs-api
```

## Troubleshooting

### Issue: Java not found
**Solution**: Install Java 17 or higher
- Download from: https://adoptium.net/
- Add to PATH

### Issue: Maven dependencies won't download
**Solution**: 
1. Check internet connection
2. Try deleting `C:\Users\YourName\.m2\repository`
3. Run `mvn clean install` again

### Issue: Port 8080 already in use
**Solution**: 
1. Find and kill the process using port 8080:
   ```cmd
   netstat -ano | findstr :8080
   taskkill /PID <PID_NUMBER> /F
   ```
2. Or change the port in `application.properties`:
   ```properties
   server.port=8081
   ```

## Recommended Solution

**For Windows users, I recommend Option 1 (Install Maven locally)** as it's the most reliable and will work for any Maven project.

## Quick Check

After installing Maven, verify with:
```cmd
java -version    # Should show Java 17+
mvn --version    # Should show Maven 3.6+
```

Then simply run:
```cmd
cd Udayan-Group/jobs-api
mvn spring-boot:run
```

The application will start on `http://localhost:8080`



