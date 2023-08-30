# PWA - Text Editor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This Progressive Web Application is an online text editor built using code mirror

## User Story

As a developer I want to create notes or code snippets with or without an internet connection, so I can reliably retrieve them for later use

## Acceptance Criteria

Given a text editor web application:

- WHEN I open my application in my editor, then I should see a client server folder structure
- WHEN I run `npm run start` from the root directory, then I find that my application should start up the backend and serve the client
- WHEN I run the text editor application from my terminal, then I find that my JavaScript files have been bundled using webpack
- WHEN I run my webpack plugins, then I find that I have a generated HTML file, service worker, and a manifest file
- WHEN I use next-gen JavaScript in my application, then I find that the text editor still functions in the browser without errors
- WHEN I open the text editor, then I find that IndexedDB has immediately created a database storage
- WHEN I enter content and subsequently click off of the DOM window, then I find that the content in the text editor has been saved with IndexedDB
- WHEN I reopen the text editor after closing it, then I find that the content in the text editor has been retrieved from our IndexedDB
- WHEN I click on the Install button, then I download my web application as an icon on my desktop
- WHEN I load my web application, then I should have a registered service worker using workbox
- WHEN I register a service worker, then I should have my static assets pre cached upon loading along with subsequent pages and static assets
- WHEN I deploy to Heroku, then I should have proper build scripts for a webpack application

## Mock-Up

The following animation demonstrates the application functionality:

![Screenshot 2023-08-29 at 11 44 52 PM](https://github.com/JulianmLacey/Text-Editor/assets/117090683/b38fddc4-175f-4482-b817-ed0d310d5711)


## Demo
A live demo is available [here](https://intense-fjord-64438-511de1432e19.herokuapp.com/)


## License

View "LICENSE" in Repository
