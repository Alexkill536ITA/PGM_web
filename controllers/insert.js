const { MongoClient } = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');
var mysql = require('../mysql');

exports.Crea_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (!err) {
            mysql.query('SELECT * FROM `utenti` WHERE `Id`=? AND `Id_discord`=?', [decoded.id, decoded.user], async (error, results) => {
                if (results.length == 0) {
                    res.render('Dasboard', { message_error: 'Errore nel ricerca profilo' });
                } else if (results[0].master == 1) {
                    res.render('insert_temp', { eanbele_count: 0 });
                } else if (results[0].N_schede == 0) {
                    res.render('insert_temp_py', { eanbele_count: 1 });
                } else {
                    res.render('Dasboard', { message_warn: 'Non puoi avere più di una scheda' });
                }
            });
        } else {
            res.redirect('/login');
        }
    });
}

exports.Insert_db = (req, res) => {
    const token = req.cookies['jwt'];
    const { name, razza, classe, background } = req.body;
    const master_user = req.body.master_user;

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (name.length > 0 || razza != "Scegli Razza" || classe != "Scegli Classe" || background != "Scegli Background") {
                var inventory = {};
                var PG_temp;

                if (master_user == 0) {
                    const id_user = decoded.user.toString();
                    const money = req.body.money;
                    const nome_oggetto_obj = req.body.nome_oggetto;
                    const quantita_obj = req.body.quantita;
                    const note_obj = req.body.note;
                    const index_obj = req.body.index_obj;

                    PG_temp = {
                        "Nome_Discord": id_user,
                        "Livello": 3,
                        "Exp": 0,
                        "Nome_PG": name,
                        "Razza": razza,
                        "Classe": classe,
                        "Background": background,
                        "Money": parseFloat(money),
                        "Inventory": inventory
                    }

                    if (index_obj == 1) {
                        inventory[nome_oggetto_obj] = {
                            "Nome": nome_oggetto_obj,
                            "Quantita": quantita_obj,
                            "Note": note_obj
                        }
                    } else if (index_obj > 1) {
                        for (let index = 0; index < index_obj; index++) {
                            inventory[nome_oggetto_obj[index]] = {
                                "Nome": nome_oggetto_obj[index],
                                "Quantita": quantita_obj[index],
                                "Note": note_obj[index]
                            }
                        }
                    }
                } else {
                    PG_temp = {
                        "Nome_Discord": decoded.user,
                        "Livello": 3,
                        "Exp": 0,
                        "Nome_PG": name,
                        "Razza": razza,
                        "Classe": classe,
                        "Background": background,
                        "Money": 0,
                        "Inventory": inventory
                    }
                }

                var on_sevice_db = await methodDB.open_db();
                if (on_sevice_db != 1) {
                    var erros = await methodDB.insert_db(PG_temp);
                    if (erros == 0) {
                        console.log("1 document inserted MongoDB");
                        if (master_user == 1) {
                            mysql.query('UPDATE `utenti` SET `N_schede` =? WHERE `utenti`.`Id_discord`=?', [1, decoded.user], async () => {
                                console.log('1 document inserted MySQL');
                                // res.render('Dasboard');
                                // res.render('Dasboard.hbs', { message_suces: 'Scheda creata' });
                                res.redirect('/dasboard');
                            });
                        } else {
                            res.redirect('/dasboard');
                        }
                    } else {
                        res.redirect('/dasboard');
                    }
                } else {
                    res.redirect('/dasboard');
                }
            } else {
                res.render('insert_temp', { message_warn: 'Riempire i calpi' });
            }
        }
    });
};