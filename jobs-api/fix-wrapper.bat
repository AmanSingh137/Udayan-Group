@echo off
echo ================================================
echo    Fixing Maven Wrapper
echo ================================================
echo.

REM Create wrapper directory if it doesn't exist
if not exist ".mvn\wrapper" mkdir .mvn\wrapper

echo Downloading maven-wrapper.jar...
echo.

REM Try to download using PowerShell
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar' -OutFile '.mvn/wrapper/maven-wrapper.jar'}"

if exist ".mvn\wrapper\maven-wrapper.jar" (
    echo.
    echo ✓ Success! Maven wrapper fixed.
    echo.
    echo Now you can run: mvnw.cmd spring-boot:run
    echo.
) else (
    echo.
    echo ✗ Download failed. Please install Maven directly instead.
    echo.
    echo Visit: https://maven.apache.org/download.cgi
    echo.
)

pause



