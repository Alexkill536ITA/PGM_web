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
console.log("[ " + color.blue('INFO') + "  ] Version Running: " + color.yellow("v1.1.0"));
console.log("[ " + color.blue('INFO') + "  ] Start Web Service...");
app.use(express.static('./'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//------------------------------------------------------//
/*         MongoDB Database Create Connection           */
//------------------------------------------------------//
// const uri = process.env.DATABASE_MONGDB;
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     // Connetti il ​​client al server
//     await client.connect({useNewUrlParser: true, useUnifiedTopology: true});

//     // Stabilire e verificare la connessione
//     await client.db("Piccolo_Grande_Mondo").command({ ping: 1 });
//     console.log("MongoDB Connected...");
//   } finally {
//     // Assicura che il client si chiuda al termine / errore
//     await client.close();
//   }
// }
// run().catch(console.dir);

//------------------------------------------------------//
/*                      Routers                         */
//------------------------------------------------------//
// Use page
app.use('/auth', require('./routes/auth'));
app.use('/insert', require('./routes/insert'));
app.use('/edit', require('./routes/edit'));
app.use('/mission/make', require('./routes/dashboard-mission'));
app.use('/mission/insert', require('./routes/dashboard-mission'));
app.use('/mission/edit', require('./routes/dashboard-mission'));
app.use('/post/:id', require('./routes/post'));
app.use(require('./routes/dashboard-mission.js'))
app.use(require('./routes/Blogpost.js'));
app.use(require('./routes/Post.js'));
app.use(require('./routes/Login.js'));
app.use(require('./routes/Register.js'));
app.use(require('./routes/dashboard.js'));
app.use(require('./routes/insert.js'));
app.use(require('./routes/edit.js'));

// Get
app.get('/', (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true
            if (decoded.master == 1) {
                mastr = true
            }
            res.render('index.hbs', {loged:loged, master:mastr});
        } else {
            var loged = false
            var mastr = false
            res.render('index.hbs', {loged:loged, master:mastr});
        }
    });
});

// Error 401
app.use((req, res, next) => {
    res.status(401).render('page401.hbs');
});

// Error 404
app.use((req, res, next) => {
    res.status(404).render('page404.hbs');
});

// Error 500
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

//------------------------------------------------------//
/*                     Set Demon                        */
//------------------------------------------------------//
console.info('[ ' + color.blue('INFO') + '  ]' + ' Server HTTP Start on port [' + color.cyan(80) + ']')
console.info('[ ' + color.blue('INFO') + '  ]' + ' Server HTTPS Start on port [' + color.cyan(443) + ']')

module.exports = app;
