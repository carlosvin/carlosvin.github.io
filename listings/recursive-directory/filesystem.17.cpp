#include <experimental/filesystem>
#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>    // std::find

namespace fs = std::experimental::filesystem;
using namespace std;

vector<string> getDirectoryFiles(const string & dir, const vector<string> & extensions) 
{
	vector<string> files;
    for(auto & p: fs::recursive_directory_iterator(dir)) 
    {
        if (fs::is_regular_file(p)) 
        {
	        if (extensions.empty() || find(extensions.begin(), extensions.end(), p.path().extension().string()) != extensions.end()) 
            {
                files.push_back(p.path().string());
            } 
        }
    }
    return files;    
}

int main()
{
    fs::create_directories("sandbox/a/b");
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
		ofstream(f) << "test";
	}

    cout << "filtered files: " << endl;
	for (auto &f: getDirectoryFiles(".", {".rst", ".RST", ".md"})){
	    cout << "\t" << f << endl;
	}

    return 0;
}
