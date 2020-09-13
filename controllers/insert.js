const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { post } = require('../routes');

const db = mysql.createConnection({
    host : process.env.DATABASE_Host,
    user : process.env.DATABASE_User,
    password : process.env.DATABASE_Password,
    database : process.env.DATABASE_Data
});

exports.Crea_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            db.query('SELECT * FROM `utenti` WHERE `Id`=? AND `Id_discord`=?', [decoded.id, decoded.user], async (error, results) =>{
                if (results.length == 0) {
                    res.render('Dasboard', {message_error:'Errore nel ricerca profilo'});
                } else if (results[0].master == 1) {
                    res.render('insert_temp', {eanbele_count: 0});
                } else if (results[0].N_schede == 0){
                    res.render('insert_temp', {eanbele_count: 1});
                } else {
                    res.render('Dasboard', {message_warn:'Non puoi avere più di una scheda'});
                }
            });
        } else {
            res.redirect('/login');
        } 
    });
}