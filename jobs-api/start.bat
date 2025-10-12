@echo off
echo ================================================
echo    Udayan Group Jobs API - Starting Server
echo ================================================
echo.

REM Check Java version
echo Checking Java installation...
java -version 2>&1 | findstr /i "version" > temp.txt
set /p JAVA_VERSION_LINE=<temp.txt
del temp.txt

echo Java: %JAVA_VERSION_LINE%
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Maven found! Using system Maven...
    echo.
    mvn spring-boot:run
) else (
    echo Maven wrapper not fully configured.
    echo.
    echo Please use ONE of these options:
    echo.
    echo OPTION 1 - Install Maven (Recommended):
    echo   1. Download from: https://maven.apache.org/download.cgi
    echo   2. Extract to C:\Program Files\Apache\maven
    echo   3. Add to PATH: C:\Program Files\Apache\maven\bin
    echo   4. Run: mvn spring-boot:run
    echo.
    echo OPTION 2 - Use IntelliJ IDEA or Eclipse:
    echo   1. Open jobs-api folder in IDE
    echo   2. Right-click JobsApiApplication.java
    echo   3. Select Run
    echo.
    echo OPTION 3 - Fix Maven Wrapper:
    echo   Run this command:
    echo   curl -o .mvn\wrapper\maven-wrapper.jar https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar
    echo   Then run: mvnw.cmd spring-boot:run
    echo.
    echo See SETUP_ALTERNATIVE.md for detailed instructions
    echo.
)

pause

