.. title: REST URLs
.. slug: rest-urls
.. date: 2015/08/16 14:00:00
.. tags: REST, API, Web Services
.. link:
.. description: Design REST API: URLs
.. type: text

First time I designed a REST_ API_ I made several mistakes, of course. Following I'm going to explain common mistakes and what I've learned about REST_ URL_ with examples.

.. contents:: Index

REST_ Basics
============

- Using URLs_ for get resources.
- Using *verbs* for modify resources.
- The *verbs* are provided by the HTTP_ protocol.
- The *verbs* have a direct equivalency with CRUD_ [#]_.
- To access to an existent resource we need an identifier.

REST_ Verbs
-----------

POST
 **Create** new resources.
GET
 **Read** already existing resources.
PUT
 **Update** already existing resources.
DELETE
 **Delete** already existing resources.

It is clearer in the following table

===========  ============  ===================
REST_ Verb   CRUD_ Action  Resource must exist
-----------  ------------  -------------------
POST         Create        No
GET          Read          Yes
PUT          Update        Yes
DELETE       Delete        Yes
===========  ============  ===================

Accessing to Resources
----------------------

A resource is *what we want to get*. For example, a car.

To be able to get a car, that information is not enough, you can't go to your car dealer and ask for whatever car, you have to specify which one you want:

*Good morning. I'd like to have a Fiat Bravo 1.9 Emotion 120CV*.

In this manner the sheller knows which one is.

"Fiat Bravo 1.9 Emotion 120CV" is the **identifier**.

Transferring the example to REST_ APIs_:

::

  GET   http://cardealer.com/api/cars/fiat-bravo-19-emotion-120cv

Now our API_ can supply the car info.

This is a very simple example, but actually when we access to a specific resource, we have to use something to identify it, a common and recommendable practice is use UUID_.

::

  GET  http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

But our API_, like a shop, it hasn't to be so strict. We can ask for cars with several features:

*Good morning, I want a Fiat Bravo*.

Then, the dealer kindly will show you all Fiat Bravo he has available. Let's see how API_ says that.

::

  GET  http://cardealer.com/api/cars/?brand=fiat&model=bravo

API_ will return all cars with Fiat brand and Bravo model.

Brand and model are so called **query parameters**.

As you might already notice, to get resource information, we have always used **GET** *verb*

Update resources
----------------

The API_ should also support updating resources. Like reading resources, to update a resource we have to specify which resource we want to update, so we again need an *identifier*.

Before, we wanted to get information (read) and we used **GET** *verb*. Now the only difference is the verb.

We want to **update** so we use the equivalency HTTP_ verb: **PUT**.

::

  PUT   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

Actually something else is missing, we have to say what thing of the car we want to change, for example, let's imagine we want to change the engine power and set it to 100CV.

We have to send the new engine power to following URL_  http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f through HTTP_ using **PUT** verb.

HTTP_ protocol allows sending data within PUT message, we have to choose a sending format.

We can use JSON_ or XML_ or whatever, we only have to ensure that sent format is expected in server side.

.. note::

  Designing a REST_ API_ requires select a sending data format.

JSON_ example::

  { enginePower: 100 }


Delete Resources
----------------

Let's imagine that now we are the car dealer and we don't want to shell the Fiat Bravo Emotion 1.9CV anymore (the cce05bee-386b-11e5-a151-feff819cdc9f).
We'll keep the URL_ that identifies the resource, but we change the verb: we don't want to read (GET), we don't want to update (PUT), we want to **to delete (DELETE)**.

::

  DELETE   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

We don't have to supply any additional info, only de verb (DELETE) and the resource identifier.

Create Resources
----------------

And the last verb is **to create (POST)**. In this case we don't have to identify the resource, because it still doesn't exist.

::

  POST   http://cardealer.com/api/cars/

But we have to send the data to create the resource.

Following with the example, let's create a new car, so we include the necessary data within POST HTTP_ message, it is something similar what we did at section `Update resources`_, but we are going to send **all required data**, not only the engine power.

JSON_ example::

  {
  "brand": "Fiat",
  "model": "Bravo"
  "year": 2010
  "doors": 5,
  "enginePower": 120,
  "version": "Emotion",
  "clima": true,
  "ac": false,
  "fuel": "Diesel"
  }

We can delegate on the system to assign a new **identifier**, or simply send it within the message::

  {
  "identifier": "cce05bee-386b-11e5-a151-feff819cdc9f"
  "brand": "Fiat",
  "model": "Bravo"
  "year": 2010
  "doors": 5,
  "enginePower": 120,
  "version": "Emotion",
  "clima": true,
  "ac": false,
  "fuel": "Diesel"
  }


Collections
-----------

All actions we have already explained were actually applied over a cars collection.

But, what happen if a resource has a nested collection?

Continuing with cars example, a car can use a set of engine oils. So the API_ must allow update, delete or create elements in the set.

.. note::

  For the example we will assume that *the oil identifier* is the attribute *type*.


Add an element to collection
***************************

When we add a car to cars collection, what we do is create a new car, so it is the case of `Create Resources`_.

To add a new engine oil to the car cce05bee-386b-11e5-a151-feff819cdc9f, that already exists::

  POST   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/

  {
  "type": "5W30",
  "otherInfo": "This is the best oil for this car"
  }


If we want to add another one::

  POST   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/

  {
  "type": "10W30",
  "otherInfo": "This is very good for cold weather"
  }

Update a collection item
************************

If we want to update the info of oil *5W30* of car *cce05bee-386b-11e5-a151-feff819cdc9f*::

  PUT   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/5W30/

  {
  "type": "5W30",
  "otherInfo": "This is no longer the best oil for this car"
  }


Delete a collection item
************************

To delete an oil *10W30* from car *cce05bee-386b-11e5-a151-feff819cdc9f*::

  DELETE   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/10W30


Read a collection item
**********************

To get the oil info *10W30* of the car *cce05bee-386b-11e5-a151-feff819cdc9f*::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/10W30


List collection items
*********************

As we have seen at `Read a collection item`_, we can get the info of every collection element, but we also can get multiple collection elements, sorted, paged and apply typical collection actions.

We can get all supported oils for a car *cce05bee-386b-11e5-a151-feff819cdc9f*, it is as simple as::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/

We can also get sorted items::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?sort_by=type&order=asc

We can ask API_ to return the first 10 oils for car *cce05bee-386b-11e5-a151-feff819cdc9f*::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?number_of_elements=10

API_ can support also pagination::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?page=3&number_of_elements=2

Above request is telling API_ that returns the page 3 of all oils of car *cce05bee-386b-11e5-a151-feff819cdc9f* and it has to shown 2 oils per page. If we want to go to next page::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?page=4&number_of_elements=2

All those features are supported by **query parameters**.

Common mistake
==============

First time I tried to design a API_ REST_ I designed an API_, but REST_.

My main mistake was the URLs_ design, I added my own *verbs* skipping HTTP_ *verbs*.

For example::

	POST	http://example.com/api/cars/ford-focus/delete-oil/5W30

The right::

	DELETE	http://example.com/api/cars/ford-focus/oils/5W30


Video Tutorials
===============

These 2 videos help me to understand REST_ URLs_, I encourage you to watch them full:

.. youtube:: NjpKwiRORI4
.. youtube:: gYKJqUZXuBw


.. _API: https://en.wikipedia.org/wiki/Application_programming_interface
.. _APIs: https://en.wikipedia.org/wiki/Application_programming_interface
.. _REST: https://en.wikipedia.org/wiki/Representational_state_transfer
.. _URL: https://en.wikipedia.org/wiki/Uniform_resource_locator
.. _URLs: https://en.wikipedia.org/wiki/Uniform_resource_locator
.. _HTTP: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
.. _CRUD: https://en.wikipedia.org/wiki/CRUD
.. _`REST Tutorial`: http://www.restapitutorial.com/
.. _UUID: https://en.wikipedia.org/wiki/Universally_unique_identifier
.. _JSON: https://en.wikipedia.org/wiki/JSON
.. _XML: https://en.wikipedia.org/wiki/XML

.. [#] Create, Read, Update, Delete
