# Convert files formats: Windows to Unix

If you are developing from a Windows environment to a Unix target environment, most likely you have had this issue: You install source files in Windows format in your Unix environment.

There is a way quite simple to convert all your files from Windows to Unix format:

```bash
find . -type f -print0 | xargs -0 dos2unix
```

I got it, of course, from https://stackoverflow.com/questions/11929461/how-can-i-run-dos2unix-on-an-entire-directory
