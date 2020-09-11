const express = require('express');
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
        throw err;
    }
});

//------------------------------------------------------//
/*                      Engine                          */
//------------------------------------------------------//
app.use(express.static('./'));
app.use(bodyParser.text({ type: 'text/html' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

//------------------------------------------------------//
/*                     Sessione                         */
//------------------------------------------------------//


//------------------------------------------------------//
/*                      Routers                         */
//------------------------------------------------------//
// Routes 


// Use page
app.use('/auth', require('./routes/auth'));
app.use(require('./routes/Login.js'));
app.use(require('./routes/Register.js'));
app.use(require('./routes/Dasboard.js'));

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