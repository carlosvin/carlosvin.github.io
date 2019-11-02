.. title: Lessons learned developing a PWA with create-react-app
.. slug: pwa-lessons-learned-cra
.. date: 2019/10/29
.. tags: React, Typescript, CRA, PWA, create-react-app, firebase, firestore
.. link: https://btapp.netlify.com
.. description: Lessons learned developing a PWA: Budget Tracker

I started working with [React] few years ago, always the project creation was from scratch, not using any template/scaffolding. Regarding bundlers normally I used either [Webpack] at work, or [Parcel] for personal projects.

Few months ago, I wanted to start a personal project to keep track of my travel expenses. I was in a kind of rush because at that time, I was almost in the middle of my gap year, I wanted to focus on implementing main functionality and get an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) (minimum viable product) the sooner the better, so I thought it was the right time to try out [Create React App] or [CRA]. 

[CRA] allows you to have a production ready [PWA] in [React], which is awesome. They take care of configuration and package dependencies, you only have to take care of dependencies you need for your project.

As I said, I wanted to be implementing business logic ASAP, so together with using [CRA], I also took other decisions/shortcuts driven by the need of speeding up the development pace, I will talk about them in following sections.

>Technology stack: [CRA], [Typescript](https://www.typescriptlang.org), [Material UI], [Frappe charts], [Firestore], [Firebase Authentication].

So far I am quite happy with the result, but with the lessons learned while developing this app, **in the future, I might not choose same technology stack again**. You can try the application [Budget Tracker] and judge for yourself.

Along this post I will describe what are, in my experience, the benefits and drawbacks of taking these design decisions or shortcuts.

[TOC]

# Create React Application: [CRA]
[Create React App] doesn't support [Web Workers] neither customize [Service Worker] implementation without ejecting.  

## Service worker
You might want to customize your Service Worker to handle [post messages](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), to perform [background sync](https://wicg.github.io/BackgroundSync/spec/) or [show notifications](https://developer.mozilla.org/en/docs/Web/API/notification) you will have to [eject your project](https://stackoverflow.com/questions/49737652/what-does-eject-do-in-create-react-app) and maintain the configuration by yourself, which might be a little bit of headache.

There are [other options to customize service worker and avoid ejecting CRA](https://www.freecodecamp.org/news/how-to-customize-service-workers-with-create-react-app-4424dda6210c/), but it is not straightforward enough for my taste.

## Web worker
If you need to perform any heavy processing without blocking the main thread, you can just use a [Web Worker], but this feature is not supported by [CRA].

There are also [other options to use Web Workers in CRA and not eject](https://medium.com/@danilog1905/how-to-use-web-workers-with-react-create-app-and-not-ejecting-in-the-attempt-3718d2a1166b), but they require quite some extra work.

## Webpack
[Webpack] is the bundler used by [CRA]. You don't need to know much about it, unless you eject your project, then you will have to deal with [Webpack configuration file](), this is just an small warning just in case you are not comfortable with it.

# Firebase 
[Budget Tracker] allows to synchronize your data between different devices, so the application requires a backend side to deal with authentication and to save/read data remotely. I considered two options: [Firebase] or implement [REST] API.

For this backend, I chose [Firebase] because it is super easy to implement, because there is nothing to implement. You only have to configure [authentication methods]() and [security rules]() for [Firestore].

But [Firebase] brings some drawbacks you must know before choosing it. 

## Drawbacks

### Bundle size
I got really shocked first time I analyzed [Budget Tracker] bundle size after integrating with [Firebase], it grew around a 39%!
 - 27% from [Firestore] library.
 - 12% from [Firebase Authentication] library.

Happily [Budget Tracker] implementation is following [code-splitting](https://reactjs.org/docs/code-splitting.html) principle, so user experience was not really affected with this integration. But user's device will eventually have to download this **extra 39%** (**539KB**). 

### Offline first, not really
[Firestore] requires user to be authenticated, but [user can be anonymous](https://firebase.google.com/docs/auth/web/anonymous-auth), this is really cool feature if you don't want to force the user to identify herself or himself to use the app.

Another very useful and cool [Firestore] feature is that [it supports offline mode](https://firebase.google.com/docs/firestore/manage-data/enable-offline), so data can be saved even there is no Internet connection. 

So... what is this ["Offline first, not really"](#offline-first-not-really) issue about? First time the application is opened, [Firebase] needs to authenticate the user, to do so, user's device has to be connected to Internet, so **you have to consider following scenario** and be OK with it:

1. [PWA] is installed in your device.
2. User is not authenticated.
3. User's device is offline.
4. User opens the [PWA] and tries to save some data.
5. **That data won't be saved correctly**, because there is no user to link the data with, not even an anonymous user. 

You can solve this issue by implementing yourself a local persistence layer for this scenario.

#### How did I solve this issue with Budget Tracker?
First of all, this **might not be an issue for your use case**, because it will happen only first time application is loaded. I just wanted to [Budget Tracker] to be fully offline first, because it brings other benefits.

##### Implementation details
 - Implement 2 persistence layers: Local ([IndexedDB]) and Remote ([Firestore]).
 - Save always data locally, regardless user authentication status. 
 - If there is any authenticated user, after saving to local layer, propagate same action to remote layer [Firestore] asynchronously.

##### Benefits
- If user is not authenticated, [Budget Tracker] won't load [Firestore] client bundle. As I explained before, it is 27% of application size.
- Application reads and writes are faster, because latest valid data is always saved locally.
   - **Clarification**: Save data in [Firestore] is also fast, because data is also cached locally, but it does a little bit more than just saving to [IndexedDB] and you need an authenticated user.
- You can find a [more detailed performance report](https://github.com/carlosvin/budget-tracker/blob/master/doc/preformance.md#desktop-slow-clear-storage-0-budgets-1), where I analyze 3 different implementations: only firebase client, local and remote persistence layers and the same as previous one but remote layer implemented in service worker.
 
### Data model
Firestore API is easy and intuitive, I really like it, but don't assume will have same features as other document DBs or SQL DBs. 

Check if [Firestore limitations](https://googleapis.github.io/google-cloud-dotnet/docs/Google.Cloud.Firestore/datamodel.html) fit into your data model, or if it is not too late, define your data model following [Firestore best practices](https://cloud.google.com/firestore/docs/best-practices) and having those limitations in mind.

## Firebase alternatives
Besides implementing a [REST] API, there are other services similar to [Firebase] with smaller client bundle size and other features which might fit better to your requirements.

Consider other alternatives: 
- Based on [Apache CouchDB](http://couchdb.apache.org/): [PouchDB](https://pouchdb.com), [Cloudant](https://en.wikipedia.org/wiki/Cloudant).
- Based on [Parse server](https://parseplatform.org/): [back4apps](https://www.back4app.com).

# UI Components Library
There were two good reasons which drove me to pick up an UI Components library:
- I am not designer.
- It is tricky and time consuming to create accessible, responsible and nice simple UI components.
- It has SVG set of [Material Icons](https://material-ui.com/components/material-icons/). [Budget Tracker] allows to create categories defined by a name and a selectable icon.

I chose [Material UI]: *"React components for faster and easier web development. Build your own design system, or start with Material Design"*, quoting their website.

There are some **drawbacks**, not very important in my opinion, maybe the most annoying for me is the first one:

- Jest Snapshots + Material UI: The snapshots are generated with Material UI class names, but classes order might not be deterministic, so a test might pass in your local host but not in CI host. They are working on solve [this issue, more info at github](https://github.com/mui-org/material-ui/issues/14357).
Ui components library. Careful with material ui, jest snapshot issue, performance issue, heavy?
- Performance: There were some performance issues in Github, most of them are already solved.
- UI components libraries are complex and do quite a lot, so most of them are quite heavy. [Material UI bundle size weights: 304.2kB minified](https://bundlephobia.com/result?p=@material-ui/core@4.5.2). You can find some [recommendations to reduce bundle size at Material UI website](https://material-ui.com/guides/minimizing-bundle-size).

# Charts library
Many of them are really heavy because they depend on d3 or other libraries

# Conclusion
I will try to come up with a conclusion better than: "It depends", "Your use case will tell you" and so on.

That said. It depends on your needs :p.

Seriously, do not go for ... if:

## Do not go for CRA if

- You need to use [Service Worker] for [Background sync](https://wicg.github.io/BackgroundSync/spec/) or [Show push notifications](https://developer.mozilla.org/en/docs/Web/API/notification).
- You need to use [Web Workers].

## Do not go for Firestore if
- You are aiming your app to be hit for many users and you don't know the estimated amount of reads/writes, otherwise you might get surprised with the bill. [Firestore] scales like charm, maybe your budget doesn't. 
- Bundle size is critical for your web application. Remember that bundle size is not that critical if you are implementing a [PWA], because it files are cached.

## Do not go blindly for the best charting library
First of all, check what kind of charts you need. In many applications you are OK with XY axis chart, time series, bars or pie charts. 
You can easily get an smaller bundle size by just using a simple charting library like [Frappe charts] or [Chartist]

---

> Just check what are your requirements, if you are not sure about them, the technology stack I used for [Budget Tracker] consists of awesome products which most likely will fit your use case.

# What next?

My next technology stack bet goes for [Svelte]/[Sapper], it is promising project, the results for small projects are really nice, bundle size is ridiculously small and development experience is quick and intuitive.

I've created a tiny [PWA] to estimate [currency exchange loss](https://currency-loss.netlify.com) when you go to a money charger shop: https://currency-loss.netlify.com/. Note, I got that app up and running in few hours, thanks to [Svelte].

[React]: https://reactjs.org
[Webpack]: https://webpack.js.org
[Parcel]: https://parceljs.org
[CRA]: https://create-react-app.dev
[Create React App]: https://create-react-app.dev
[PWA]: https://developers.google.com/web/progressive-web-apps/
[Budget Tracker]: https://btapp.netlify.com
[Web Worker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[Service Worker]: https://developers.google.com/web/fundamentals/primers/service-workers
[Service Workers]: https://developers.google.com/web/fundamentals/primers/service-workers
[IndexedDB]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[Firestore]: https://firebase.google.com/docs/firestore
[Firebase]: https://firebase.google.com/
[Firebase Authentication]: https://firebase.google.com/docs/auth
[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[Material UI]: https://material-ui.com/
[Frappe charts]: https://frappe.io/charts
[Chartist]: https://gionkunz.github.io/chartist-js/
[Svelte]: https://svelte.dev
[Sapper]: https://sapper.svelte.dev
