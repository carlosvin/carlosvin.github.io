.. title: C++ Dependency Management: Biicode
.. slug: first-biicode-poco
.. date: 2015/05/14 20:00:00
.. tags: C++, Biicode, Poco, Build Automation Software, Dependency Management
.. link: 
.. description: C++ Dependency Management with Biicode. A sample project that requires Poco library, in particular logging part.  
.. type: text


I'm interested in building, dependency management, packagin and deployment in regards to software projects. For Java_, Scala_, Python_, and so on is quite easy since there are tools like Maven_, Gradle_, pip_, Sbt_, etc. But regarding C++_, the best options I've found are Maven_ with Nar_ plugin or Gradle_ with `cpp plugin`_ (incubation).

I knew about Biicode_ almost 2 years ago, but I've never found time to test it, until today.

How does Biicode_ work?

Firstly we have to `install Biicode`_.

I've made tiny example project using logging system from Poco_ library.

I've executed this command to create the project, called bii_log. 

.. code-block:: bash

	bii new carlovin/bii_log --hello=cpp

I've created the project under my Biicode_ username, just in case I'd like to publish later. 

Previous command generates the structure of files and directories, although we are going to focus only on: 

.. code-block:: bash
	
	blocks/carlosvin/bii_log/main.cpp
	blocks/carlosvin/bii_log/biicode.conf

In biicode.conf we are going to configure our dependencies, in this example Poco_ library.

.. code-block:: yaml
	
	# Biicode configuration file

	[requirements]
	    fenix/poco(develop): 0

	[parent]
		carlosvin/bii_log: 0

	[includes]
	    Poco/*.h: fenix/poco/Foundation/include

In [includes] section, we are overriding the path to file headers. If we don't override it we'd had to do something like this:
 
.. code-block:: cpp
	
	#include "fenix/poco/Foundation/include/Logger.h"

Thanks to this line, include declarations are going to be clearer, as follows:

.. code-block:: cpp
	
	#include "Poco/Logger.h"

Easy, now we can start using Poco_ in our project, e.g:

.. code-block:: cpp
	
	#include "Poco/FileChannel.h"
	#include "Poco/FormattingChannel.h"
	#include "Poco/PatternFormatter.h"
	#include "Poco/Logger.h"
	#include "Poco/AutoPtr.h"

	using Poco::FileChannel;
	using Poco::FormattingChannel;
	using Poco::PatternFormatter;
	using Poco::Logger;
	using Poco::AutoPtr;

	int main(int argc, char** argv) {
		AutoPtr<FileChannel> pChannel(new FileChannel);
		pChannel->setProperty("path", "log/sample.log");
		pChannel->setProperty("rotation", "100 K");
		pChannel->setProperty("archive", "timestamp");

		//AutoPtr<ConsoleChannel> pCons(new ConsoleChannel);
		AutoPtr<PatternFormatter> pPF(new PatternFormatter);
		pPF->setProperty("pattern", "%Y-%m-%d %H:%M:%S %s: %t");
		AutoPtr<FormattingChannel> pFC(new FormattingChannel(pPF, pChannel));
		Logger::root().setChannel(pFC);

		Logger & logger = Logger::get("TestChannel");
		for(int i=0; i<10000; i++){
			poco_information(logger, "This is a info");
			poco_warning(logger, "This is a warning");
		}
		return 0;
	}

To compile the project we only have to execute following command:

.. code-block:: bash
	
	bii cpp:build

To publish the project and to allow everyone use it as we have used Poco_:

.. code-block:: bash
	
	bii publish

Besides the ease to use, I like so much the integration with Eclipse_ with CDT_. After "bii cpp:build" execution all files were properly indexed. 

I've read also an article about the good integration with CLion_: `When CLion met biicode`_.


.. _Biicode: https://www.biicode.org/
.. _Poco: http://pocoproject.org/
.. _Eclipse: https://eclipse.org
.. _CDT: https://eclipse.org/cdt/
.. _pip: https://pypi.python.org/pypi/pip
.. _Maven: http://maven.apache.org/
.. _Nar: http://maven-nar.github.io/
.. _Java: http://java.com/en/download/whatis_java.jsp
.. _Gradle: http://www.gradle.org/
.. _Python: http://www.python.org/
.. _Scala: http://www.scala-lang.org/
.. _Sbt: http://www.scala-sbt.org/
.. _`cpp plugin`: https://gradle.org/docs/current/userguide/nativeBinaries.html
.. _`install Biicode`: http://docs.biicode.com/c++/installation.html
.. _CLion: https://www.jetbrains.com/clion/
.. _`When CLion met biicode`: http://blog.jetbrains.com/clion/2015/03/when-clion-met-biicode/

