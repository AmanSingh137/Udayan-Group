@echo off
echo ================================================
echo    Checking System Requirements
echo ================================================
echo.

REM Check Java
echo [1/2] Checking Java...
java -version 2>&1 | findstr "version"
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Java NOT found!
    echo.
    echo Please install Java 17 or higher from:
    echo https://adoptium.net/temurin/releases/?version=17
    echo.
    goto :requirements_failed
)

REM Check Java version
for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    set JAVA_VERSION=%%g
)
set JAVA_VERSION=%JAVA_VERSION:"=%
echo ✓ Java version: %JAVA_VERSION%

REM Extract major version
for /f "tokens=1,2 delims=." %%a in ("%JAVA_VERSION%") do (
    if "%%a"=="1" (
        set JAVA_MAJOR=%%b
    ) else (
        set JAVA_MAJOR=%%a
    )
)

if %JAVA_MAJOR% LSS 17 (
    echo.
    echo ✗ Java version is too old! Need Java 17 or higher.
    echo   Current version: %JAVA_VERSION%
    echo.
    echo Please install Java 17 from:
    echo https://adoptium.net/temurin/releases/?version=17
    echo.
    echo See FIX_JAVA_VERSION.md for detailed instructions.
    goto :requirements_failed
)

echo.

REM Check Maven
echo [2/2] Checking Maven...
where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Maven found!
    mvn -version | findstr "Apache Maven"
) else (
    echo ⚠ Maven not found (will use wrapper)
    if exist ".mvn\wrapper\maven-wrapper.jar" (
        echo ✓ Maven wrapper available
    ) else (
        echo ✗ Maven wrapper incomplete
        echo.
        echo Please either:
        echo 1. Install Maven from: https://maven.apache.org/download.cgi
        echo 2. Run: fix-wrapper.bat
        echo.
        goto :requirements_failed
    )
)

echo.
echo ================================================
echo    ✓ All requirements met!
echo ================================================
echo.
echo You can now run: mvn spring-boot:run
echo Or double-click: start.bat
echo.
pause
exit /b 0

:requirements_failed
echo.
echo ================================================
echo    ✗ Requirements check failed
echo ================================================
echo.
echo Please fix the issues above and try again.
echo.
pause
exit /b 1

