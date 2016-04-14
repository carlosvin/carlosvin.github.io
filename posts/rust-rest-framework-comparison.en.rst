.. title: Rust web frameworks comparison
.. slug: rust-rest-framework-comparison
.. date: 2016/04/14 20:40:00
.. tags: Frameworks, Rustlang, Programming Languages, REST
.. description: REST frameworks for Rust Comparisson
.. type: micro

I'm doing some experiments with Rust_ because it is a language that promises to be as fast as `C/C++`_, but safer in regards to memory management. Essentially, it doesn't allow the developer to do "bad things" with the memory like:  forgetting  release the memory that is not going to be used anymore or release memory if the developer is not the owner. In such scenarios, Rust_ won't compile.

Just for learning I've started a small project that offers a REST_ API_, so I've started looking for frameworks to ease/speed up the development. I've found a `Rust web frameworks comparison`_:
https://github.com/flosse/rust-web-framework-comparison

.. _`Rust web frameworks comparison`: https://github.com/flosse/rust-web-framework-comparison
.. _Rust: https://www.rust-lang.org/
.. _`C/C++`: https://en.wikipedia.org/wiki/C%2B%2B
.. _REST: https://en.wikipedia.org/wiki/Representational_state_transfer
.. _API: https://en.wikipedia.org/wiki/Application_programming_interface
