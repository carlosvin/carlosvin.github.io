
#include <dirent.h>
#include <cstring>
#include <iostream>
#include <fstream> // std::ofstream
#include <vector>
#include <memory>
#include <system_error>
#include <sys/stat.h>

using namespace std;

const string UP_DIR = "..";
const string CURRENT_DIR = ".";
const string SEP = "/";


string path(initializer_list<string> parts) 
{
    string pathTmp {};
    string separator = "";
    for (auto & part: parts) 
    {
        pathTmp.append(separator).append(part);
        separator = SEP;
    }
    return pathTmp;
}

vector<string> getDirectoryFiles(const string& dir, const vector<string> & extensions) 
{
    vector<string> files;
    shared_ptr<DIR> directory_ptr(opendir(dir.c_str()), [](DIR* dir){ dir && closedir(dir); });
    if (!directory_ptr) 
    {
        throw system_error(error_code(errno, system_category()), "Error opening : " + dir);
    }
 
    struct dirent *dirent_ptr;
    while ((dirent_ptr = readdir(directory_ptr.get())) != nullptr) 
    {
        const string fileName {dirent_ptr->d_name};
        if (dirent_ptr->d_type == DT_DIR) 
        {
            if (CURRENT_DIR != fileName && UP_DIR != fileName) 
            {
                auto subFiles = getDirectoryFiles(path({dir, fileName}), extensions);
                files.insert(end(files), begin(subFiles), end(subFiles));
            }
        } 
        else if (dirent_ptr->d_type == DT_REG) 
        {
            // here we should check also if filename has an extension in extensions vector
            files.push_back(path({dir, fileName}));
        }
    }
    return files;
}

int main ()
{
    auto opt = S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH;
    mkdir("sandbox", opt);
    mkdir("sandbox/a", opt);
    mkdir("sandbox/a/b", opt);

	vector<string> e_files = {
	    "./sandbox/a/b/file1.rst", 
	    "./sandbox/a/b/file1.txt",
	    "./sandbox/a/file2.RST", 
	    "./sandbox/file3.md",
	    "./sandbox/will_be.ignored"
	};
	
	// create files
	for (auto &f: e_files)
	{
		ofstream of(f, ofstream::out);
		of << "test";
	}

    cout << "filtered files: " << endl;
	for (auto &f: getDirectoryFiles(".", {".rst", ".RST", ".md"})){
	    cout << "\t" << f << endl;
	}

    return 0;
}
