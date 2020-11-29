const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const methodDB = require("../mongodb_controll.js");
const { post } = require('../routes');

//------------------------------------------------------//
/*                       Login                          */
//------------------------------------------------------//
exports.login = async (req, res) => {
    try {
        const { nome, Password } = req.body;
        if (!nome || !Password) {
            res.render('login', { message_warn: 'Per favore, riempire i campi Nome Discord e Password' });
        } else {
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                var query = { "username" : nome };
                methodDB.settab_db("Utenti_web");
                var cursor = methodDB.find_Json(query);
                cursor.then(async function(result) {
                    if (result === null) {
                        res.render('login', { message_error: 'Il profilo non esiste' });
                    } else if (!result.password || !(await bcrypt.compare(Password, result.password))){
                        res.render('login', { message_warn: 'Il Nome Discord o password non sono corretti' });
                    } else {
                        const token = jwt.sign({ id: result._id, user: result.Id_discord, master: result.master }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });
                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };
                        res.cookie('jwt', token, cookieOptions);
                        res.redirect('/dasboard');
                    }
                });
            } else {
                res.render('page500.hbs');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

//------------------------------------------------------//
/*                      Register                        */
//------------------------------------------------------//
exports.register = async (req, res) => {
    const { name_user, id_user, Password, Password_rep } = req.body;
    if (name_user.length > 0 || id_user.length > 0 || Password.length > 0 || Password_rep.length > 0) {
        var on_sevice_db = await methodDB.open_db();
        if (on_sevice_db != 1) {
            var query = { "Id_discord" : id_user };
            methodDB.settab_db("Utenti_web")
            var cursor = methodDB.find_Json(query);
            cursor.then(async function(result) {
                if (result != null) {
                    return res.render('register.hbs', { message: 'Esiste già un\'Utente' });
                } else if (Password !== Password_rep) {
                    return res.render('register.hbs', { message_warn: 'Password non coincidono' });
                }
                let hashedPassword = await bcrypt.hash(Password, 8);
                var valid = methodDB.insert_db({ username: name_user, Id_discord: id_user, password: hashedPassword , N_schede: 0, N_sessioni_totali: "0", master: "0"})
                if (valid != 0) {
                    res.render('page500.hbs');
                } else {
                    return res.render('login.hbs', { message_success: 'Utente registrato' });
                }
            });
        }
    } else {
        return res.render('register.hbs', { message_warn: 'Riempire i campi' });
    }
}