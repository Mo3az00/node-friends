# Node Friends

This is the website of the Node Friends team, which started as a course at the [Digital Career Institute](https://digitalcareerinstitute.org/).

The ```npm run dev``` command will not only start the application, but also watch for changes of SCSS and JavaScript files, using [webpack](https://webpack.js.org/). The [nodemon](https://nodemon.io/) package is used to automatically restart the server, if the scripts change, while it's running.

## Installation

1. Download the repository as .zip-file or clone it.    
1. Run ```npm install``` in your terminal to get all needed packages.
1. Copy __the variables.env.sample__ file to __variables.env__.
2. Edit the configuration to fit your setup and needs.
3. Run ```npm setup``` to load the initial user data.
1. Run ```npm start``` to start the node.js application.

## Development &amp; Production mode

If you want to run the application in development mode, where webpack is watching for changes of SCSS and JavaScript files, etc. simply run the following command:  
```npm run dev```.

And for production mode use:  
```npm start```

## Routing

The routing is done in the __/routes/web.js__ file.  
Just edit it and make it fit to your needs.

## Views

The views are located in the __/views/__ directory and we use [Pug](https://github.com/pugjs/pug) as the default template engine.

## Navigation

The navigation items are red from the __helpers.js__ file.

## Default Users

You should change the passwords on production using the password reset feature.

Name             | Role    | Email                      | Password
:--------------- | :------ | :------------------------- | :------
Dominik Hanke    | Teacher | dominik.hanke@devugees.org | pl3453Ch4ng3
Bjarne Sørensen  | Student | b.rye.soerensen@gmail.com  | pl3453Ch4ng3
Daniela Fedyakin | Student | daniela.fedyakin@gmail.com | pl3453Ch4ng3
Kostas Degaitas  | Student | degaitas@yahoo.com         | pl3453Ch4ng3
Majd Issa        | Student | majdissa0@gmail.com        | pl3453Ch4ng3
Mouaz Meda       | Student | mouaz.meda@hotmail.com     | pl3453Ch4ng3
Osama Rashid     | Student | enlil96rashid@gmail.com    | pl3453Ch4ng3
Ronit Kory       | Student | ronitronitronit@gmail.com  | pl3453Ch4ng3