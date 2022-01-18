const color = require('ansi-colors');
const express = require('express');
const path = require('path');
// const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const metho_doverride = require('method-override');
const { session } = require('passport');
const jwt = require('jsonwebtoken');
const app = express();
const hbs = require('hbs');
var pjson = require('./package.json');

//------------------------------------------------------//
/*                      Config                          */
//------------------------------------------------------//
dotenv.config({ path: './.env' });

//------------------------------------------------------//
/*                      Engine                          */
//------------------------------------------------------//
console.log("[ " + color.blue('INFO') + "  ] Start Process");
console.log("[ " + color.blue('INFO') + "  ] Name Applications: " + color.yellow('GdrBot Web Server'));
console.log("[ " + color.blue('INFO') + "  ] Authors: " + color.yellow('Alexkill536ITA'));
console.log("[ " + color.blue('INFO') + "  ] Version Running: " + color.yellow(pjson.version));
console.log("[ " + color.blue('INFO') + "  ] Start Web Service...");
app.use(express.static('./'));
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials', function (err) { });
app.set('view engine', 'hbs');
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//------------------------------------------------------//
/*                      Routes                          */
//------------------------------------------------------//
app.use(require('./routes/routes.js'));

// Error 401
app.use((req, res, next) => {
    res.status(401).render('errorPages/page401');
});

// Error 404
app.use((req, res, next) => {
    res.status(404).render('errorPages/page404');
});

// Error 500
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

//------------------------------------------------------//
/*                     Set Demon                        */
//------------------------------------------------------//
app.listen(80, console.info('[ ' + color.blue('INFO') + '  ]' + ' Server HTTP Start on port [' + color.cyan(80) + ']'));
app.listen(443, console.info('[ ' + color.blue('INFO') + '  ]' + ' Server HTTPS Start on port [' + color.cyan(443) + ']'));

module.exports = app;
