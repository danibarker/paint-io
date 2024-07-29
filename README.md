<h1 align="center">
  <a src="https://paint-io.herokuapp.com/"><img src="./screenshots/paint-io.gif" alt="Screencapture of app features" width="50%"></a>
  <br>
  Mintbean Hackathon November 2021: Paint App
</h1>

### Table of Contents

-   [Introduction](#introduction)
-   [Technologies Used](#technologies-used)
-   [The Team](#the-team)
-   [Screenshots](#screenshots)
-   [Installation and Development Instructions](#instructions)

## Introduction

This project was built for a weeklong hackathon run by [Mintbean](https://mintbean.io/). The challenge was to build a full-stack paint app, and we decided to make ours a collaborative app using sockets. Multiple people can join the same room to draw together on the same canvas. We incorporated standard drawing tools such as selector tools for colour and brush size, an eraser, and a clear canvas button. The users can also save their drawings to the gallery, which can be viewed by anyone.

Visit the [live demo on Heroku](https://paint-io.herokuapp.com/) to try it out, or visit the [landing page](https://danibarker.github.io/paintIO/) for more information about the project.

## Technologies Used

-   Node
-   Firebase
-   Express
-   MongoDB
-   React
-   Socket.IO

## The Team

-   Danielle Barker
    -   [LinkedIn](https://www.linkedin.com/in/danielle-ej-barker/)
    -   [Portfolio](https://portfolio.danibarker.ca)
-   Christy Clement
    -   [LinkedIn](https://www.linkedin.com/in/christy-clement/)
    -   [Portfolio](https://christyc01.github.io/)

## Screenshots

<p align="center">
<img src="./screenshots/paint-io_screenshot_main.jpg" width="70%">
</p>
<p align="center">
<img src="./screenshots/paint-io_screenshot_gallery.jpg" width="70%">
</p>

## Instructions

##### To run locally for development:

-   Create a copy of `backend/.env.example` and rename to `.env` and replace with your own values
-   Install or update NodeJS to at least version 21 (may work with earlier versions, but not guaranteed)
-   Run `npm run install` to install both frontend and backend packages, then `npm run dev-server` to run the server and in another terminal, `npm run dev-client` and open the url displayed in your browser.

-   To test the socket-io used for communicating drawing between two users, open a new browser window in Incognito mode to the same url
-   To set up on your own Firebase account `npm install -g firebase-tools`,`firebase login`, `firebase init` and set up functions and hosting with these options for the questions asked in `firebase init`:

    -   Overwrite or new codebase: `Overwrite`

    -   Typescript: `unless you want to write your own server code in a different language`
    -   use eslint: `optional, but recommended`

    -   Questions asked about overwriting existing files: `Yes, except for functions/src/index.ts`
    -   public directory: `front-end/dist`
    -   single-page app: `yes`
    -   automatic builds: `optional`
    -   build script before deploy: `yes`
    -   what script: `npm run install && npm run build`
    -   set up auto deployment: `optional`
    -   branch for auto deployment: `any, but one seperate from the branch that regular development is done on recommended`

##### In Progress:

-   Deploying frontend on Firebase Hosting
-   Set up Firebase Functions to host the express server

##### To-Do:

-   Finish creating the Mongo User schema/model
-   Create routes for User objects
-   Build SignUp and SignIn pages in frontend (Firebase Auth?)
-   Allow users to add friends, save images to their gallery, send chat messages
-   Set up Firebase Storage for images (currently saving in MongoDB)
