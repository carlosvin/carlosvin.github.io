.. title: Lecciones aprendidas creando una PWA con create-react-app
.. slug: pwa-lessons-learned-cra
.. date: 2019/10/18
.. tags: React, Typescript, CRA, PWA, create-react-app, firebase, firestore
.. link: https://btapp.netlify.com
.. description: Lecciones aprendidas durante la creacion de una PWA: Budget Tracker

Ui components library. Careful with material ui, jest snapshot issue, performance issue, heavy?

Charts library. Many of them are really heavy because they depend on d3 or other libraries

CRA, think carefully before. You need custom service worker? Do you need web workers?

Bundle size important, but not that much in PWA 

Firebase bundle size too big, it is beta , you need to be online first time anonymous user... 