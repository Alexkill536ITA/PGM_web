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
            res.render('login', { message_warn: 'Per favore, riempire i campi Username e Password' });
        } else {
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                var query = { "username": nome };
                methodDB.settab_db("Utenti_web");
                var cursor = methodDB.find_Json(query);
                cursor.then(async function (result) {
                    if (result === null) {
                        res.render('login', { message_error: 'Il profilo non esiste' });
                    } else if (!result.password || !(await bcrypt.compare(Password, result.password))) {
                        res.render('login', { message_warn: 'Username o password non sono corretti' });
                    } else {
                        if (result.temp_paw == "0") {
                            const token = jwt.sign({ id: result._id, user: result.Id_discord, master: result.master }, process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_EXPIRES_IN
                            });
                            const cookieOptions = {
                                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                httpOnly: true
                            };
                            res.cookie('jwt', token, cookieOptions);
                            res.redirect('/dashboard');
                        } else {
                            res.render('login', { recovery_pas_enable: nome });
                        }
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
    if (name_user.length > 0 && name_user != "" && id_user.length > 0 && Password.length > 0 && Password_rep.length > 0) {
        var on_sevice_db = await methodDB.open_db();
        if (on_sevice_db != 1) {
            var query = { "Id_discord": id_user };
            var query_2 = { "username": name_user };
            methodDB.settab_db("Utenti_web")
            var cursor = methodDB.find_Json(query);
            cursor.then(async function (result) {
                var cursor_2 = methodDB.find_Json(query_2);
                cursor_2.then(async function (result_2) {
                    if (result != null) {
                        return res.render('register.hbs', { message: 'Esiste già un\'Utente con questo ID Discord' });
                    } else if (result_2 != null) {
                        return res.render('register.hbs', { message: 'Esiste già un\'Utente con questo Username' });
                    } else if (id_user.length <= 0 || id_user.length > 18 || isNaN(parseInt(id_user)) == true) {
                        return res.render('register.hbs', { message: 'ID Discord inserito non valido' });
                    } else if (Password !== Password_rep) {
                        return res.render('register.hbs', { message_warn: 'Password non coincidono' });
                    } else if (id_user.length == 18) {
                        let hashedPassword = await bcrypt.hash(Password, 8);
                        var valid = methodDB.insert_db({ username: name_user, Id_discord: id_user, password: hashedPassword, N_schede: 0, N_sessioni_totali: "0", master: "0", temp_paw: "0", Priority: 0 })
                        if (valid != 0) {
                            res.render('page500.hbs');
                        } else {
                            return res.render('login.hbs', { message_success: 'Utente registrato' });
                        }
                    } else {
                        return res.render('register.hbs', { message: 'ID Discord inserito non valido' });
                    }
                });
            });
        }
    } else {
        return res.render('register.hbs', { message_warn: 'Riempire i campi' });
    }
}

//------------------------------------------------------//
/*                  Recovey Password                    */
//------------------------------------------------------//

exports.recovery_pas = async (req, res) => {
    const { Password_recover, Password_rep_recover, name_user_recover } = req.body;
    if (Password_recover.length > 0 && Password_rep_recover.length > 0) {
        var on_sevice_db = await methodDB.open_db();
        if (on_sevice_db != 1) {
            var query = { "username": name_user_recover };
            methodDB.settab_db("Utenti_web")
            var cursor = methodDB.find_Json(query);
            cursor.then(async function (result) {
                if (result == null) {
                    return res.render('login.hbs', { message: 'Utente Non trovato' });
                } else if (Password_recover == Password_rep_recover) {
                    let hashedPassword = await bcrypt.hash(Password_rep_recover, 8);
                    var valid = methodDB.password_update(result._id, hashedPassword);
                    if (valid != 0) {
                        res.render('page500.hbs');
                    } else {
                        const token = jwt.sign({ id: result._id, user: result.Id_discord, master: result.master }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });
                        const cookieOptions = {
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };
                        res.cookie('jwt', token, cookieOptions);
                        res.redirect('/dashboard');
                    }
                } else {
                    return res.render('login.hbs', { message: 'Password non coincidono' });
                }
            });
        }
    } else {
        return res.render('login.hbs', { message_warn: 'Riempire i campi' });
    }
}