#include <iostream>
#include <fstream>
#include <filesystem>
#include <curl/curl.h>
#include <miniz.h>

// Function to write downloaded content to a file
size_t write_callback(void* contents, size_t size, size_t nmemb, void* userp) {
    std::ofstream* ofs = static_cast<std::ofstream*>(userp);
    ofs->write(static_cast<char*>(contents), size * nmemb);
    return size * nmemb;
}

// Function to download the zip file using libcurl
bool download_file(const std::string& url, const std::string& output_file) {
    CURL* curl;
    CURLcode res;
    std::ofstream ofs(output_file, std::ios::binary);

    if (!ofs) {
        std::cerr << "Error opening output file for writing." << std::endl;
        return false;
    }

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if (!curl) {
        std::cerr << "Error initializing libcurl." << std::endl;
        return false;
    }

    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &ofs);

    res = curl_easy_perform(curl);
    curl_easy_cleanup(curl);
    curl_global_cleanup();

    if (res != CURLE_OK) {
        std::cerr << "Error downloading file: " << curl_easy_strerror(res) << std::endl;
        return false;
    }

    return true;
}

// Function to extract the downloaded zip file using miniz
bool extract_zip(const std::string& zip_file, const std::string& target_dir) {
    mz_zip_archive zip_archive;
    memset(&zip_archive, 0, sizeof(zip_archive));

    if (!mz_zip_reader_init_file(&zip_archive, zip_file.c_str(), 0)) {
        std::cerr << "Error opening zip file." << std::endl;
        return false;
    }

    int file_count = mz_zip_reader_get_num_files(&zip_archive);
    for (int i = 0; i < file_count; ++i) {
        if (!mz_zip_reader_is_file_encrypted(&zip_archive, i)) {
            mz_zip_archive_file_stat file_stat;
            mz_zip_reader_file_stat(&zip_archive, i, &file_stat);

            std::string output_path = target_dir + "/" + file_stat.m_filename;
            if (file_stat.m_is_directory) {
                std::filesystem::create_directories(output_path);
            } else {
                std::vector<char> buffer(file_stat.m_uncomp_size);
                if (!mz_zip_reader_extract_to_mem(&zip_archive, i, buffer.data(), buffer.size(), 0)) {
                    std::cerr << "Error extracting file " << file_stat.m_filename << std::endl;
                    mz_zip_reader_end(&zip_archive);
                    return false;
                }

                std::ofstream out_file(output_path, std::ios::binary);
                out_file.write(buffer.data(), buffer.size());
                out_file.close();
            }
        }
    }

    mz_zip_reader_end(&zip_archive);
    return true;
}

// Function to replace the folder with the unpacked zip
bool replace_folder(const std::string& folder_name, const std::string& zip_file) {
    if (std::filesystem::exists(folder_name)) {
        std::filesystem::remove_all(folder_name); // Remove existing folder
    }

    std::filesystem::create_directory(folder_name); // Create new folder
    return extract_zip(zip_file, folder_name); // Extract contents to folder
}

int main() {
    const std::string folder_name = "MHOL Enhancer";
    const std::string zip_file = "update.zip";
    const std::string download_url = "http://jin-zhao-teh.github.io/Extensions/MHOL-Enhancer/Download/update.zip";

    // Download the update.zip file
    std::cout << "Downloading update..." << std::endl;
    if (!download_file(download_url, zip_file)) {
        std::cerr << "Failed to download the update." << std::endl;
        return 1;
    }

    // Replace the folder with the unpacked zip contents
    std::cout << "Replacing folder..." << std::endl;
    if (replace_folder(folder_name, zip_file)) {
        std::cout << "Update completed successfully!" << std::endl;
    } else {
        std::cerr << "Failed to replace the folder." << std::endl;
        return 1;
    }

    // Clean up downloaded zip file
    std::filesystem::remove(zip_file);

    return 0;
}
