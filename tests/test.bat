@echo off
setlocal

:: Define the folder name and the download URL
set "folderName=MHOL Enhancer"
set "downloadUrl=http://jin-zhao-teh.github.io/Extensions/MHOL-Enhancer/Download/update.zip"
set "tempZip=%temp%\update.zip"
set "targetFolder=%cd%\%folderName%"

:: Check if the target folder exists
if not exist "%targetFolder%" (
    echo Folder "%folderName%" does not exist. Exiting.
    exit /b 1
)

:: Download the update.zip file
echo Downloading update.zip...
powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%downloadUrl%', '%tempZip%')"

:: Check if the download was successful
if not exist "%tempZip%" (
    echo Failed to download update.zip. Exiting.
    exit /b 1
)

:: Extract the ZIP file to the target folder
echo Extracting the update.zip...
powershell -Command "Expand-Archive -Path '%tempZip%' -DestinationPath '%targetFolder%' -Force"

:: Check if the extraction was successful
if errorlevel 1 (
    echo Extraction failed. Exiting.
    exit /b 1
)

:: Clean up the downloaded ZIP file
echo Cleaning up...
del "%tempZip%"

:: Confirm the update is complete
echo Update completed successfully.

endlocal
