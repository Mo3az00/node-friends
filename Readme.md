# Node Friends

This is the website of the Node Friends Team, which started as a course at the [Digital Career Institute](https://digitalcareerinstitute.org/).

The ```npm run dev``` command will not only start the application, but also watch for changes of SCSS and JavaScript files, using [webpack](https://webpack.js.org/). The [nodemon](https://nodemon.io/) package is used to automatically restart the server, if the scripts change, while it's running.

## License

The usage of our code is limited to courses of the [Digital Career Institute](https://digitalcareerinstitute.org/) and all rights are reserved. Please contact [info@node-friends.com](mailto:info@node-friends.com) if you've got questions.

You are not allowed to launch your own version of the application without changing the design, so please be creative and update the layout files and stylesheets to get your very own version of it.

## Installation

1. Download the repository as .zip-file or clone it.    
1. Run ```npm install``` in your terminal to get all needed packages.
1. Copy the __.env.sample__ file to __.env__.
1. Edit the configuration to fit your setup and needs.
1. Edit the __/data/user-data.json__ file to setup your course members.
1. Run ```npm setup``` to load the user data from __user-data.json__ into the MongoDB database.
1. Run ```npm start``` to start the node.js application.

## Development &amp; Production mode

If you want to run the application in development mode, where webpack is watching for changes of SCSS and JavaScript files, etc. simply run the following command:  
```npm run dev```

And for production mode use:  
```npm start```

## Routing

The routing is defined by all files located in the __/routes/__ folder.

## Views

The views are located in the __/views/__ directory and we use [Pug](https://github.com/pugjs/pug) as the default template engine.

## Navigation

The navigation items are read from __/helpers.js__.

## Dashboard Calendar Events

All calendar events are stored in  __/public/javascript/data/calendar.json__.

## Course Holidays

The course holidays are needed for the calculation of days learned and days left. The data is passed to Moment.js instances and must be of type Array.

You can edit the holidays in __/data/holidays.js__.

## Default User

You should change the user data and password on production using the password reset feature.

It is highly recommended that you setup all needed users in __/data/user-data.json__ before you work on the application, to have the most realistic setup. You could do this at a later stage, but you should not forget it, as there's no user registration process implemented.

Name             | Role    | Email                      | Password
:--------------- | :------ | :------------------------- | :------
Node Friends     | Teacher | info@node-friends.com      | pl3453Ch4ng3