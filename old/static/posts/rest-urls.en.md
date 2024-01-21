# REST URLs

First time I designed a {REST} {API} I made several mistakes, of course. Following I’m going to explain common mistakes and what I’ve learned about {REST} {URL} with examples.

## {REST} Basics

* Using {URL}s for get resources.
* Using _verbs_ for modify resources.
* The _verbs_ are provided by the {HTTP} protocol.
* The _verbs_ have a direct equivalency with {CRUD}footnote:[Create, Read, Update, Delete].
* To access to an existent resource we need an identifier.

### {REST} Verbs

* **POST**\
**Create** new resources.
* **GET**\
**Read** already existing resources.
* **PUT**\
**Update** already existing resources.
* **DELETE**\
**Delete** already existing resources.

It is clearer in the following table

|     |     |     |
| --- | --- | --- |
| {REST} Verb | {CRUD} Action | Resource must exist |
| POST | Create | No |
| GET | Read | Yes |
| PUT | Update | Yes |
| DELETE | Delete | Yes |

### Accessing to Resources

A resource is _what we want to get_. For example, a car.

To be able to get a car, that information is not enough, you can’t go to your car dealer and ask for whatever car, you have to specify which one you want:

_Good morning. I’d like to have a Fiat Bravo 1.9 Emotion 120CV_.

In this manner the sheller knows which one is.

"Fiat Bravo 1.9 Emotion 120CV" is the **identifier**.

Transferring the example to {REST} {API}s:

```
GET   https://cardealer.com/api/cars/fiat-bravo-19-emotion-120cv
```

Now our {API} can supply the car info.

This is a very simple example, but actually when we access to a specific resource, we have to use something to identify it, a common and recommendable practice is use {UUID}.

```
GET  https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f
```

But our {API}, like a shop, it hasn’t to be so strict. We can ask for cars with several features:

_Good morning, I want a Fiat Bravo_.

Then, the dealer kindly will show you all Fiat Bravo he has available. Let’s see how {API} says that.

```
GET  https://cardealer.com/api/cars/?brand=fiat&model=bravo
```

{API} will return all cars with Fiat brand and Bravo model.

Brand and model are so called **query parameters**.

As you might already notice, to get resource information, we have always used **GET** _verb_

### Update resources

The {API} should also support updating resources. Like reading resources, to update a resource we have to specify which resource we want to update, so we again need an _identifier_.

Before, we wanted to get information (read) and we used **GET** _verb_. Now the only difference is the verb.

We want to **update** so we use the equivalency {HTTP} verb: **PUT**.

```
PUT   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f
```

Actually something else is missing, we have to say what thing of the car we want to change, for example, let’s imagine we want to change the engine power and set it to 100CV.

We have to send the new engine power to following {URL} https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f through {HTTP} using **PUT** verb.

{HTTP} protocol allows sending data within PUT message, we have to choose a sending format.

We can use {JSON} or link:[XML] or whatever, we only have to ensure that sent format is expected in server side.

**📌 NOTE**\
Designing a {REST} {API} requires to select a data format.

**{JSON} example**

```json
{ enginePower: 100 }
```

### Delete Resources

Let’s imagine that now we are the car dealer and we don’t want to shell the Fiat Bravo Emotion 1.9CV anymore (the cce05bee-386b-11e5-a151-feff819cdc9f). We’ll keep the {URL} that identifies the resource, but we change the verb: we don’t want to read (GET), we don’t want to update (PUT), we want to **to delete (DELETE)**.

```
DELETE   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f
```

We don’t have to supply any additional info, only de verb (DELETE) and the resource identifier.

### Create Resources

And the last verb is **to create (POST)**. In this case we don’t have to identify the resource, because it still doesn’t exist.

```
POST   https://cardealer.com/api/cars/
```

But we have to send the data to create the resource.

Following with the example, let’s create a new car, so we include the necessary data within POST {HTTP} message, it is something similar what we did at section [Update resources](#update-resources), but we are going to send **all required data**, not only the engine power.

**{JSON} example**

```json
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
```

We can delegate on the system to assign a new **identifier**, or simply send it within the message:

```json
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
```

### Collections

All actions we have already explained were actually applied over a cars collection.

But, what happen if a resource has a nested collection?

Continuing with cars example, a car can use a set of engine oils. So the {API} must allow update, delete or create elements in the set.

**📌 NOTE**\
For the example we will assume that _the oil identifier_ is the attribute _type_.

#### Add an element to collection

When we add a car to cars collection, what we do is create a new car, so it is the case of [Create Resources](#create-resources).

To add a new engine oil to the car cce05bee-386b-11e5-a151-feff819cdc9f, that already exists:

**Request**

```http
POST   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/
```

**Response**

```json
{
  "type": "5W30",
  "otherInfo": "This is the best oil for this car"
}
```

If we want to add another one:

**Request**

```http
POST   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/
```

**Response**

```json
{
  "type": "10W30",
  "otherInfo": "This is very good for cold weather"
}
```

#### Update a collection item

If we want to update the info of oil _5W30_ of car _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Request**

```http
PUT   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/5W30/
```

**Response**

```json
{
  "type": "5W30",
  "otherInfo": "This is no longer the best oil for this car"
}
```

#### Delete a collection item

To delete an oil _10W30_ from car _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Request**

```http
DELETE   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/10W30
```

#### Read a collection item

To get the oil info _10W30_ of the car _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Request**

```http
GET   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/10W30
```

#### List collection items

As we have seen at [Read a collection item](#read-a-collection-item), we can get the info of every collection element, but we also can get multiple collection elements, sorted, paged and apply typical collection actions.

We can get all supported oils for a car _cce05bee-386b-11e5-a151-feff819cdc9f_, it is as simple as:

**Request**

```http
GET   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/
```

We can also get sorted items:

**Request**

```http
GET   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?sort_by=type&order=asc
```

We can ask {API} to return the first 10 oils for car _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Request**

```http
GET   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?number_of_elements=10
```

{API} can support also pagination:

**Request**

```http
GET   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?page=3&number_of_elements=2
```

Above request is telling {API} that returns the page 3 of all oils of car _cce05bee-386b-11e5-a151-feff819cdc9f_ and it has to shown 2 oils per page. If we want to go to next page:

**Request**

```http
GET   https://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/oils/?page=4&number_of_elements=2
```

All those features are supported by **query parameters**.

## Common mistake

First time I tried to design a {API} {REST} I designed an {API}, but {REST}.

My main mistake was the {URL}s design, I added my own _verbs_ skipping {HTTP} _verbs_.

**Wrong**

```http
POST    https://example.com/api/cars/ford-focus/delete-oil/5W30
```

**The correct way**

```http
DELETE  https://example.com/api/cars/ford-focus/oils/5W30
```
