const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { session } = require('passport');
const app = express();

//------------------------------------------------------//
/*                      Config                          */
//------------------------------------------------------//
dotenv.config({path:'./.env'});

//------------------------------------------------------//
/*                      Engine                          */
//------------------------------------------------------//
app.use(express.static('./'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

//------------------------------------------------------//
/*           Mysql Database Create Connection           */
//------------------------------------------------------//
const db = mysql.createConnection({
    host : process.env.DATABASE_Host,
    user : process.env.DATABASE_User,
    password : process.env.DATABASE_Password,
    database : process.env.DATABASE_Data
});

// Connect
db.connect((err) => {
    if (!err) {
        console.info('MySql Connected...');
        } else {
        console.log(err.message);
    }
});

//------------------------------------------------------//
/*                      Routers                         */
//------------------------------------------------------//
// Use page
app.use('/auth', require('./routes/auth'));
app.use('/insert', require('./routes/insert'));
app.use(require('./routes/Login.js'));
app.use(require('./routes/Register.js'));
app.use(require('./routes/Dasboard.js'));
app.use(require('./routes/insert.js'));

// Get
app.get('/', (req, res) => {
    res.render('index.hbs');
});

// Error 404
app.use((req, res, next) => {
    res.render('page404.hbs');
});

// Error 500
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

//------------------------------------------------------//
/*                     Set Demon                        */
//------------------------------------------------------//
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.info(`Server Start on port ${PORT}`));