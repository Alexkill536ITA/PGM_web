const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { post } = require('../routes');

//------------------------------------------------------//
/*           Mysql Database Create Connection           */
//------------------------------------------------------//
const db = mysql.createConnection({
    host : process.env.DATABASE_Host,
    user : process.env.DATABASE_User,
    password : process.env.DATABASE_Password,
    database : process.env.DATABASE_Data
});

//------------------------------------------------------//
/*                       Login                          */
//------------------------------------------------------//
exports.login = async (req, res) => {
    try {
        const { nome, Password } = req.body;
        if (!nome || !Password) {
            res.render('login', {message_warn:'Perfavore riempire i campi Nome Discord e Password'});
        } else {
            db.query('SELECT * FROM `utenti` WHERE `Id_discord`=?', [nome], async (error, results) => {
                if (results.length == 0) {
                    res.render('login', {message_error:'Il profilo non esiste'});
                } else if (!results || !(await bcrypt.compare(Password, results[0].password))) {
                    res.render('login', {message_warn:'Il Nome Discord o password non sono corretti'});
                } else {
                    const token = jwt.sign({id:results[0].Id, user:results[0].Id_discord, master:results[0].master}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    const cookieOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
                        httpOnly: true
                    };
                    res.cookie('jwt', token, cookieOptions);
                    res.redirect('/dasboard');
                }
            });
        }
    } catch (error) {
        console.log(error);
    }

}

//------------------------------------------------------//
/*                      Register                        */
//------------------------------------------------------//
exports.register = (req, res) => {
    const {name_user, Password, Password_rep} = req.body;
    if (name_user.length > 0 || Password.length > 0 || Password_rep.length > 0) {
        db.query("SELECT * FROM `utenti` WHERE `Id_discord`=?", [name_user], async (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                return res.render('Register.hbs', {message:'Esiste già un\'Utente'});
            } else if (Password !== Password_rep) {
                return res.render('Register.hbs', {message_warn:'Password non coincidono'});
            }
            let hashedPassword = await bcrypt.hash(Password, 8);
            console.log(hashedPassword);

            db.query('INSERT INTO `utenti` SET ?', {Id_discord:name_user, password:hashedPassword}, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    return res.render('Login.hbs', {message_success:'Utente registrato'});
                }
            });
        });  
    } else {
        return res.render('Register.hbs', {message_warn:'Riempire i campi'});
    }
}