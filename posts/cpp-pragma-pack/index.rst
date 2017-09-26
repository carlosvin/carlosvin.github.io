.. title: C++ Struct memory alignment
.. slug: cpp-pragma-pack
.. date: 2012/11/26 12:00:00
.. update: 2017/09/20 17:00:00
.. tags: C++, Performance, Compilers
.. type: text
.. description: Understanding pragma pack preprocessor directive and how it affects to memory alignment

A C++ struct is an element that allows grouping attributes with different type so we can manipulate all elements together using same reference. It is like a class with public visibility by default for functions and attributes. 

If we want to work in a lower level, closer to machine, it might be useful understand how that data structure is stored in memory and how to control that mapping.

.. contents:: 

.. TEASER_END

Example Struct
==============

It has two attributes: an integer (4 bytes) and a boolean (1 byte). 

.. code-block:: c++
	
	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};

If we get the instance size using :code:`sizeof` we should get 5 bytes size and memory would be like:

.. figure:: /galleries/c-mem-struct/5b.png
	:width: 30%
	:figwidth: 50%

	5 bytes struct which uses 5 bytes in memory 

**But** is not that simple, following we will see that we can't forget about memory alignment which depends on compiler and system. We will learn how to control compiler alignment policy, so we can avoid getting unexpected allocation memory sizes.

For example, in my local host with :code:`sizeof` of structure, I get a 8 bytes size. What is happening is that compiler allocates more memory at the end of structure so it fits in 2n bytes blocks. Memory looks like:

.. figure:: /galleries/c-mem-struct/8b.png
	:width: 30%
	:figwidth: 50%
	
	5 bytes structure that actually spends 8 bytes in memory

Let's see a code snippet that prints structure and attributes size, in this case **4 + 1 is not 5**.

.. code-block:: c++

	#include  <iostream>

	using namespace std;

	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};

	static void print (size_t sz, size_t sz_flag, size_t sz_timeout)
	{
	    cout << "\tflag: " << sz_flag << " Bytes" << endl;
	    cout << "\t+" << endl;
	    cout << "\ttimeout: " << sz_timeout << " Bytes" << endl;
	    cout << "\t=" << endl;
	    cout << "\t" << sz_timeout + sz_flag << " Bytes" << endl;
	    cout <<"sizeof struct:  " << sz << " Bytes" << endl;
	}

	int main(int argc, char *argv[])
	{
	    cout << "SampleStruct" << endl;
	    print (sizeof(SampleStruct), sizeof(SampleStruct::flag), sizeof(SampleStruct::timeout));
	    cout << " -- " << endl;

	    return 0;
	}

`Executing code with pragma pack directive`_,  8 bytes en lugar de 5 bytes.

.. code-block:: bash
	
	SampleStruct
	flag: 1 Bytes
	+
	timeout: 4 Bytes
	=
	5 Bytes
	sizeof struct:  8 Bytes
	--

.. tip:: If we want to know the exact structure size we have to specify compiler the way how to align memory, to do so we have :code:`#pragma pack(n)` directive.


#pragma pack directive in C++ struct
====================================

It is a preprocessor directive to indicate to compiler how to align data in memory. 

.. code-block:: c++
	
	#include <iostream>
    
	using namespace std;

	static void print (size_t sz, size_t sz_flag, size_t sz_timeout)
	{
	    cout << " flag: " << sz_flag << " Bytes"<< endl;
	    cout << " +" << endl;
	    cout << " timeout: " << sz_timeout << "Bytes" << endl;
	    cout << " =" << endl;
	    cout << " " << sz_timeout + sz_flag << "Bytes" << endl;
	    cout << " sizeof struct:  " << sz << " Bytes" << endl;
	}

	#pragma pack (1)
	struct SampleStructPack1
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (2)
	struct SampleStructPack2
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (4)
	struct SampleStructPack4
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)


	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};


	int main(int argc, char *argv[])
	{

	    cout << "SampleStructPack1" << endl;
	    print (sizeof(SampleStructPack1), sizeof(SampleStructPack1::flag), sizeof(SampleStructPack1::timeout));
	    cout << " -- " << endl;

	    cout << "SampleStructPack2" << endl;
	    print (sizeof(SampleStructPack2), sizeof(SampleStructPack2::flag), sizeof(SampleStructPack2::timeout));
	    
	    cout << "SampleStructPack4" << endl;
	    print (sizeof(SampleStructPack4), sizeof(SampleStructPack4::flag), sizeof(SampleStructPack4::timeout));

	    cout << "SampleStruct" << endl;
	    print (sizeof(SampleStruct), sizeof(SampleStruct::flag), sizeof(SampleStruct::timeout));
	    cout << " -- " << endl;
	    
	    return 0;
	}

`Executing code with pragma pack directive`_, we have different results depending of pragma value.

.. code-block:: bash
	
	SampleStructPack1
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  5 Bytes
	 --

	SampleStructPack2
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  6 Bytes

	SampleStructPack4
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  8 Bytes

	SampleStruct
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  8 Bytes
	 --

Let's analyze those results:

SampleStructPack1 :code:`#pragma pack (1)`
	It allocates 1 byte memory block, so our sample struct fits perfectly, in this case it is true that :code:`4 + 1 = 5`.

SampleStructPack2 :code:`#pragma pack (2)`
	Minimum block size is 2 bytes. Integer attribute fits because it just needs 2 blocks of 2 Bytes. Boolean attribute needs just 1 Byte, but minimum block size is 2 Bytes, that's why total allocated memory is 6 bytes, :code:`4 + 2 = 6`.

SampleStructPack4 :code:`#pragma pack (4)`
	It is like previous one, but in this case we are wasting more memory for boolean attribute, it needs 1 Byte, but we are allocating 4 Bytes. 
 
SampleStruct (alineación por defecto del compilador)
	As you can see it behaves exactly like :code:`#pragma pack (4)`, so we can deduct it is the default compiler alignment.

.. important:: Why don't we always use smallest memory alignment (:code:`#pragma pack (1)`) so we can save more memory? 
	
	.. warning:: Because of performance loss.

Performance test
================

Test consists of allocate same number of elements in arrays for each structure type (1, 2, 4).

.. code-block:: bash

	SampleStructPack1: 500000000000000000 bytes allocated in 94311 nanoseconds
	SampleStructPack2: 600000000000000000 bytes allocated in 1777 nanoseconds
	SampleStructPack4: 800000000000000000 bytes allocated in 1519 nanoseconds

As you can see, the smallest memory alignment spends more time allocating and releasing memory. Puedes `execute performance test`_. 

Performance test source code:

.. code-block:: c++
	
	#include <iostream>
	#include <chrono>

	#pragma pack (1)
	struct SampleStructPack1
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (2)
	struct SampleStructPack2
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (4)
	struct SampleStructPack4
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)


	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};

	static const long MAX_ELEMENTS = 100000000000000000;
	using namespace std;
	using namespace std::chrono;

	void allocate1()
	{
	    SampleStructPack1 elements [MAX_ELEMENTS];
	    cout << "SampleStructPack1: " << sizeof(elements) << " bytes allocated";
	}

	void allocate2()
	{
	    SampleStructPack2 elements [MAX_ELEMENTS];
	    cout << "SampleStructPack2: " << sizeof(elements) << " bytes allocated";
	}

	void allocate4()
	{
	    SampleStructPack4 elements [MAX_ELEMENTS];
	    cout << "SampleStructPack4: " << sizeof(elements) << " bytes allocated";
	}

	void chrono1()
	{
	    auto begin = high_resolution_clock::now() ;
	    allocate1();
	    cout << " in " << duration_cast<nanoseconds>(high_resolution_clock::now() - begin).count() << " nanoseconds" << endl;
	}

	void chrono2()
	{
	    auto begin = high_resolution_clock::now() ;
	    allocate2();
	    cout << " in " << duration_cast<nanoseconds>(high_resolution_clock::now() - begin).count() << " nanoseconds" << endl;
	}

	void chrono4()
	{
	    auto begin = high_resolution_clock::now() ;
	    allocate4();
	    cout << " in " << duration_cast<nanoseconds>(high_resolution_clock::now() - begin).count() << " nanoseconds" << endl;
	}


	int main(int argc, char *argv[])
	{
	    chrono1();
	    chrono2();
	    chrono4();
	    
	    return 0;
	}

.. _`Executing code without pragma pack directive`: http://coliru.stacked-crooked.com/a/c7deb3df49bebd40
.. _`Executing code with pragma pack directive`: http://coliru.stacked-crooked.com/a/7c18ee6585e57366
.. _`execute performance test`: http://coliru.stacked-crooked.com/a/954ad542659c7591

