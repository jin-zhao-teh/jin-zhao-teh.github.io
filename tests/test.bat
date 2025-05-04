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

:: Create a temporary folder to extract the zip contents
set "tempExtract=%temp%\updateExtract"
mkdir "%tempExtract%"

:: Extract the ZIP file to the temporary folder
echo Extracting the update.zip...
powershell -Command "Expand-Archive -Path '%tempZip%' -DestinationPath '%tempExtract%' -Force"

:: Check if the extraction was successful
if errorlevel 1 (
    echo Extraction failed. Exiting.
    exit /b 1
)

:: Move extracted files from temp folder into the target folder
echo Moving the extracted contents into the "%folderName%" folder...
for /r "%tempExtract%" %%f in (*) do (
    move /Y "%%f" "%targetFolder%\"
)

:: Clean up the downloaded and extracted files
echo Cleaning up...
del "%tempZip%"
rd /S /Q "%tempExtract%"

:: Confirm the update is complete
echo Update completed successfully.

endlocal
