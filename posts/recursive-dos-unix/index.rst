.. title: Convert files formats: Windows to Unix
.. slug: recursive-dos-unix
.. date: 2016/02/12 10:34:00
.. tags: Useful Commands, Unix, Windows
.. description: Convert Windows formatted files to Unix format per directory recursively
.. type: micro

If you are developing from a Windows environment to a Unix target environment, most likely you have had this issue: 
You install source files in Windows format in your Unix environment.  

There is a way quite simple to convert all your files from Windows to Unix format:

.. code-block:: bash
	
	find . -type f -print0 | xargs -0 dos2unix
  
I got it, of course, form http://stackoverflow.com/questions/11929461/how-can-i-run-dos2unix-on-an-entire-directory
