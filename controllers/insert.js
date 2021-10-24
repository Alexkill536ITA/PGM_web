const { MongoClient } = require("mongodb");
const mongo = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');

exports.Crea_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (decoded.master == 1) {
                mastr = true
            } else {
                mastr = false
            }
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                id_scheda = mongo.ObjectID(decoded.id);
                var query = { _id: id_scheda, Id_discord: decoded.user };
                methodDB.settab_db("Utenti_web");
                var cursor = methodDB.find_Json(query);
                cursor.then(async function (result) {
                    if (result == null) {
                        res.render('dashboard', { message_error: 'Errore nel ricerca profilo' });
                    } else if (result.master == 1) {
                        res.render('insert_temp', { eanbele_count: 0, master:mastr });
                    } else if (result.N_schede == 0) {
                        res.render('insert_temp', { eanbele_count: 1, master:mastr });
                    } else {
                        res.render('dashboard', { message_warn: 'Non puoi avere più di una scheda' });
                    }
                });
            } else {
                res.render('page500.hbs');
            }
        } else {
            res.redirect('/login');
        }
    });
}

exports.Insert_db = (req, res) => {
    const token = req.cookies['jwt'];
    const {
        name,
        razza,
        razza_altro,
        sot_razza,
        sot_razza_altro,
        classe,
        sot_classe,
        classe_altro,
        sot_classe_altro,
        background,
        Background_altro,
        descrizone,
        forza,
        destrezza,
        costituzione,
        intelligenza,
        saggezza,
        carisma,
        url_avatar,
    } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            const master_user = decoded.master
            if (name.length > 0 || razza != "Scegli Razza" || classe != "Scegli Classe" || background != "Scegli Background") {
                var inventory = {
                    "pomata curativa": {
                        "Nome": "pomata curativa",
                        "Quantita": 1,
                        "Sincronia": "0"
                    },
                    "pozione di guarigione": {
                        "Nome": "pozione di guarigione",
                        "Quantita": 2,
                        "Sincronia": "0"
                    },
                    "scarsella da cerusico": {
                        "Nome": "scarsella da cerusico",
                        "Quantita": 1,
                        "Sincronia": "0"
                    },
                    "tenda": {
                        "Nome": "tenda",
                        "Quantita": 1,
                        "Sincronia": "0"
                    },
                    "monete d'oro degli Mékaris": {
                        "Nome": "monete d'oro degli Mékaris",
                        "Quantita": 10,
                        "Sincronia": "0"
                    }
                };
                var PG_temp;
                var money = 0;
                var sotto_razza_net = "Non Assegnata";
                var sotto_classe_net = "Non Assegnata";
                var razza_net = "Altro";
                var classe_net = "Altro";
                var Background_net = "Altro";

                // Check Value Altro
                if (razza == 'Altro') {
                    razza_net = razza_altro;
                } else {
                    razza_net = razza;
                }

                if (classe == 'Altro') {
                    classe_net = classe_altro;
                } else {
                    classe_net = classe;
                }

                if (background == 'Altro') {
                    Background_net = Background_altro;
                } else {
                    Background_net = background;
                }

                if (sotto_razza_net == 'Altro') {
                    sotto_razza_net = sot_razza_altro;
                } else {
                    sotto_razza_net = sot_razza;
                }

                if (sotto_razza_net == 'Scegli Sotto Razza') {
                    sotto_razza_net = "Non Assegnata";
                }

                if (sot_classe == 'Scegli Sotto Classe') {
                    sotto_classe_net = "Non Assegnata";
                } else if (sot_classe == 'Altro') {
                    if (sot_classe_altro.length > 0) {
                        sotto_classe_net = sot_classe_altro;
                    } else {
                        sotto_classe_net = "Altro";
                    }
                } else {
                    sotto_classe_net = sot_classe;
                }

                // Stasts
                if (forza == null || forza == undefined) {
                    var forza_load = 8;
                } else {
                    var forza_load = forza;
                }

                if (destrezza == null || destrezza == undefined) {
                    var destrezza_load = 8;
                } else {
                    var destrezza_load = destrezza;
                }

                if (costituzione == null || costituzione == undefined) {
                    var costituzione_load = 8;
                } else {
                    var costituzione_load = costituzione;
                }

                if (intelligenza == null || intelligenza == undefined) {
                    var intelligenza_load = 8;
                } else {
                    var intelligenza_load = intelligenza;
                }

                if (saggezza == null || saggezza == undefined) {
                    var saggezza_load = 8;
                } else {
                    var saggezza_load = saggezza;
                }

                if (carisma == null || carisma == undefined) {
                    var carisma_load = 8;
                } else {
                    var carisma_load = carisma;
                }

                // Avatar
                if (url_avatar == null || url_avatar == undefined) {
                    var url_avatar_load = "Non Assegnata";
                } else {
                    if (validURL(url_avatar) == true) {
                        var url_avatar_load = url_avatar;
                    } else {
                        var url_avatar_load = "Non Assegnata";
                    }
                }

                // Money by Class
                if (classe == "Artefice" || classe == "Bardo" || classe == "Chierico" || classe == "Guerriero" || classe == "Paladino" || classe == "Renger") {
                    money = 200;
                } else if (classe == "Barbaro") {
                    money = 90;
                } else if (classe == "Druido") {
                    money = 100;
                } else if (classe == "Ladro" || classe == "Mago" || classe == "Warlock") {
                    money = 160;
                } else if (classe == "Monaco") {
                    money = 50;
                } else if (classe == "Stregone") {
                    money = 120;
                } else {
                    money = 0;
                }

                // if (master_user == "0") {
                //     const id_user = decoded.user.toString();
                //     const nome_oggetto_obj = req.body.nome_oggetto;
                //     const quantita_obj = req.body.quantita;
                //     const note_obj = req.body.note;
                //     const index_obj = req.body.index_obj;

                //     PG_temp = {
                //         "Nome_Discord": id_user,
                //         "Avatar": url_avatar_load,
                //         "Livello": 3,
                //         "Exp": 0,
                //         "Nome_PG": name,
                //         "Razza": razza_net,
                //         //"Sotto Razza": sotto_razza_net,
                //         "Classe": classe_net,
                //         "Sotto Classe": sotto_classe_net,
                //         "Background": Background_net,
                //         "Descrizione": descrizone,
                //         "Forza": forza_load,
                //         "Destrezza": destrezza_load,
                //         "Costituzione": costituzione_load,
                //         "Intelligenza": intelligenza_load,
                //         "Saggezza": saggezza_load,
                //         "Carisma": carisma_load,
                //         "Competenze": {},
                //         "Money": money,
                //         "Inventory": inventory
                //     }

                //     if (index_obj == 1) {
                //         inventory[nome_oggetto_obj] = {
                //             "Nome": nome_oggetto_obj,
                //             "Quantita": quantita_obj,
                //             "Note": note_obj
                //         }
                //     } else if (index_obj > 1) {
                //         for (let index = 0; index < index_obj; index++) {
                //             inventory[nome_oggetto_obj[index]] = {
                //                 "Nome": nome_oggetto_obj[index],
                //                 "Quantita": quantita_obj[index],
                //                 "Note": note_obj[index]
                //             }
                //         }
                //     }
                // } else {
                PG_temp = {
                    "Nome_Discord": decoded.user,
                    "Avatar": url_avatar_load,
                    "Livello": 3,
                    "Exp": 0,
                    "Nome_PG": name,
                    "Razza": razza_net,
                    //"Sotto Razza": sotto_razza_net,
                    "Classe": classe_net,
                    "Sotto Classe": sotto_classe_net,
                    "Background": Background_net,
                    "Descrizione": descrizone,
                    "Forza": forza_load,
                    "Destrezza": destrezza_load,
                    "Costituzione": costituzione_load,
                    "Intelligenza": intelligenza_load,
                    "Saggezza": saggezza_load,
                    "Carisma": carisma_load,
                    "Competenze": {},
                    "Money": money,
                    "Inventory": inventory
                }
                // }

                var on_sevice_db = await methodDB.open_db();
                methodDB.settab_db("Schede_PG");
                if (on_sevice_db != 1) {
                    var erros = await methodDB.insert_db(PG_temp);
                    if (erros == 0) {
                        if (master_user == "0") {
                            methodDB.settab_db("Utenti_web");
                            methodDB.N_schede_update(decoded.user);
                            res.redirect('/dashboard');
                        } else {
                            res.redirect('/dashboard');
                        }
                    } else {
                        res.redirect('/dashboard');
                    }
                } else {
                    res.render('page500.hbs');
                }
            } else {
                res.render('insert_temp', { message_warn: 'Riempire i calpi', master:mastr });
            }
        }
    });
};

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}