const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');

/* GET Dashboard Characters Page */
exports.show = (req, res) => {
    const token = req.cookies['jwt'];
    var loged = false;
    var mastr = false;
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var MongoClient = require('mongodb').MongoClient;
            var url = process.env.DATABASE_MONGDB;
            loged = true;
            if (decoded.master == 1) {
                mastr = true
            }

            await MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
                if (!err) {
                    var dbo = db.db("Piccolo_Grande_Mondo");
                    var query = { Nome_Discord: decoded.user };

                    dbo.collection("Schede_PG").find(query).toArray(function (err, result) {
                        if (!err) {
                            if (result) {
                                if (result.length == 1) {
                                    var id_scheda = result[0]._id;
                                    var name_pg = result[0].Nome_PG;
                                    var list_max = result.length;
                                    if (result[0].Avatar == "" || result[0].Avatar == null || result[0].Avatar == "Non Assegnata") {
                                        avatar = "/images/stemma_gilda_f.png"
                                    } else {
                                        avatar = result[0].Avatar;
                                    }
                                } else {
                                    var id_scheda = [];
                                    var name_pg = [];
                                    var avatar = [];
                                    var list_max = result.length;
                                    for (let index = 0; index < list_max; index++) {
                                        id_scheda[index] = result[index]._id;
                                        name_pg[index] = result[index].Nome_PG;
                                        if (result[index].Avatar == "" || result[index].Avatar == null || result[index].Avatar == "Non Assegnata") {
                                            avatar[index] = "/images/stemma_gilda_f.png"
                                        } else {
                                            avatar[index] = result[index].Avatar;
                                        }
                                    }
                                }
                                db.close();
                                res.render('characters/dashboard', { info: res.req.url, loged: loged, master: mastr, list_pg: list_max, id: id_scheda, name: name_pg, avatar_pg: avatar });
                            }
                        }
                    });
                } else {
                    res.render('errorPages/page500');
                }
            });

        } else {
            res.redirect('/Login');
        }
    });
};

exports.crea_scheda = (req, res) => {
    const token = req.cookies['jwt'];
    var loged = false;
    var mastr = false;
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            loged = true;
            if (decoded.master == 1)
                mastr = true
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                console.log(decoded.id);
                id_scheda = mongodb.ObjectID(decoded.id);
                var query = { _id: id_scheda, Id_discord: decoded.user };
                methodDB.settab_db("Utenti_web");
                var cursor = methodDB.find_Json(query);
                cursor.then(async function (result) {
                    if (result == null) {
                        res.render('characters/dashboard', { loged: loged, master: mastr, message_error: 'Errore nel ricerca profilo' });
                    } else if (result.master == 1) {
                        res.render('characters/insert', { loged: loged, master: mastr, eanbele_count: 0, master: mastr });
                    } else if (result.N_schede == 0) {
                        res.render('characters/insert', { loged: loged, master: mastr, eanbele_count: 1, master: mastr });
                    } else {
                        res.render('characters/dashboard', { loged: loged, master: mastr, message_warn: 'Non puoi avere più di una scheda' });
                    }
                });
            } else {
                res.render('errorPages/page500');
            }
        } else {
            res.redirect('/login');
        }
    });
};

exports.insert_db = (req, res) => {
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
        classe_multi,
        sot_classe_multi,
        classe_multi_altro,
        sot_classe_muti_altro,
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
    var loged = false;
    var mastr = false;

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            loged = true;
            if (decoded.master == 1)
                mastr = true
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
                var sotto_classe_multi_net = "Non Assegnata";
                var razza_net = "Altro";
                var classe_net = "Altro";
                var classe_multi_net = "Altro";
                var Background_net = "Altro";

                // Check Value Altro
                if (razza != null && razza != undefined && razza != "") {
                    if (razza == 'Altro') {
                        if (razza_altro != null && razza_altro != undefined && razza_altro != "") {
                            razza_net = razza_altro;
                        } else {
                            razza_net = "Altro";
                        }
                    } else {
                        razza_net = razza;
                    }
                } else {
                    razza_net = "Non Assegnata";
                }

                if (classe != null && classe != undefined && classe != "") {
                    if (classe == 'Altro') {
                        if (classe_altro != null && classe_altro != undefined && classe_altro != "") {
                            classe_net = classe_altro;
                        } else {
                            classe_net = "Altro";
                        }
                    } else {
                        classe_net = classe;
                    }
                } else {
                    classe_net = "Non Assegnata";
                }

                if (classe_multi != null && classe_multi != undefined && classe_multi != "") {
                    if (classe_multi == "Scegli Multiclasse") {
                        classe_multi_net = "Non Assegnata";
                    } else if (classe_multi == 'Altro') {
                        if (classe_multi_altro != null && classe_multi_altro != undefined && classe_multi_altro != "") {
                            classe_multi_net = classe_multi_altro;
                        } else {
                            classe_multi_net = "Altro";
                        }
                    } else {
                        classe_multi_net = classe_multi;
                    }
                } else {
                    classe_multi_net = "Non Assegnata";
                }

                if (background != null && background != undefined && background != "") {
                    if (background == 'Altro') {
                        if (Background_altro != null && Background_altro != undefined && Background_altro != "") {
                            Background_net = Background_altro;
                        } else {
                            Background_net = "Altro";
                        }
                    } else {
                        Background_net = background;
                    }
                } else {
                    Background_net = "Non Assegnata";
                }

                if (sot_razza != null && sot_razza != undefined && sot_razza != "") {
                    if (sot_razza == 'Scegli Sotto Razza') {
                        sotto_razza_net = "Non Assegnata";
                    } else if (sot_razza == 'Altro') {
                        if (sot_razza_altro != null && sot_razza_altro != undefined && sot_razza_altro != "") {
                            sotto_razza_net = sot_razza_altro;
                        } else {
                            sotto_razza_net = "Altro";
                        }
                    } else {
                        sotto_razza_net = sot_razza;
                    }
                } else {
                    sotto_razza_net = "Non Assegnata";
                }

                if (sot_classe != null && sot_classe != undefined && sot_classe != "") {
                    if (sot_classe == 'Scegli Sottoclasse') {
                        sotto_classe_net = "Non Assegnata";
                    } else if (sot_classe == 'Altro') {
                        if (sot_classe_altro != null && sot_classe_altro != undefined && sot_classe_altro != "") {
                            sotto_classe_net = sot_classe_altro;
                        } else {
                            sotto_classe_net = "Altro";
                        }
                    } else {
                        sotto_classe_net = sot_classe;
                    }
                } else {
                    sotto_classe_net = "Non Assegnata";
                }

                if (sot_classe_multi != null && sot_classe_multi != undefined && sot_classe_multi != "") {
                    if (sot_classe_multi == 'Scegli Sotto Multiclasse') {
                        sotto_classe_multi_net = "Non Assegnata";
                    } else if (sot_classe_multi == 'Altro') {
                        if (sot_classe_muti_altro != null && sot_classe_muti_altro != undefined && sot_classe_muti_altro != "") {
                            sotto_classe_multi_net = sot_classe_muti_altro;
                        } else {
                            sotto_classe_multi_net = "Altro";
                        }
                    } else {
                        sotto_classe_multi_net = sot_classe_multi;
                    }
                } else {
                    sotto_classe_multi_net = "Non Assegnata";
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

                PG_temp = {
                    "Nome_Discord": decoded.user,
                    "Avatar": url_avatar_load,
                    "Livello": 3,
                    "Exp": 0,
                    "Nome_PG": name,
                    "Razza": String(razza_net),
                    //"Sotto Razza": sotto_razza_net,
                    "Classe": String(classe_net),
                    "Sotto Classe": String(sotto_classe_net),
                    "Multi Classe": String(classe_multi_net),
                    "Multi Sotto Classe": String(sotto_classe_multi_net),
                    "Background": String(Background_net),
                    "Casata": "Non Assegnata",
                    "Punti_Fama": 0,
                    "Descrizione": descrizone,
                    "Forza": forza_load,
                    "Destrezza": destrezza_load,
                    "Costituzione": costituzione_load,
                    "Intelligenza": intelligenza_load,
                    "Saggezza": saggezza_load,
                    "Carisma": carisma_load,
                    "Competenze": {},
                    "Money": parseFloat(money),
                    "Ispirazione": 0,
                    "Inventory": inventory
                }

                var on_sevice_db = await methodDB.open_db();
                methodDB.settab_db("Schede_PG");
                if (on_sevice_db != 1) {
                    var erros = await methodDB.insert_db(PG_temp);
                    if (erros == 0) {
                        if (mastr) {
                            methodDB.settab_db("Utenti_web");
                            methodDB.N_schede_update(decoded.user);
                            res.redirect('/characters');
                        } else {
                            res.redirect('/characters');
                        }
                    } else {
                        res.redirect('/characters');
                    }
                } else {
                    res.render('errorPages/page500');
                }
            } else {
                res.render('characters/insert', { message_warn: 'Riempire i calpi', master: mastr });
            }
        }
    });
};

exports.modifica_scheda = (req, res) => {
    const token = req.cookies['jwt'];
    var loged = false;
    var mastr = false;
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            loged = true;
            if (decoded.master == 1) {
                mastr = true
            }

            const id_serch = mongodb.ObjectId(req.body.id_scheda_edit);
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Schede_PG");
                var cursor = methodDB.serachbyid(id_serch);
                cursor.then(function (result) {
                    if (result != null) {
                        var js_result = JSON.stringify(result);
                        js_result = JSON.parse(js_result);
                        var obj_N = JSON.stringify(js_result['Inventory']);
                        obj_N = JSON.parse(obj_N);
                        const obj_k = Object.keys(obj_N);
                        var obj_nome = [];
                        var obj_quan = [];
                        var obj_note = [];
                        for (var i in obj_k) {
                            obj_nome[i] = '"' + obj_N[obj_k[i]]['Nome'] + '"';
                            obj_quan[i] = '"' + obj_N[obj_k[i]]['Quantita'] + '"';
                            obj_note[i] = '"' + obj_N[obj_k[i]]['Sincronia'] + '"';
                        }
                        methodDB.settab_db("Utenti_web");
                        var id_scheda = mongodb.ObjectId(decoded.id);
                        var query = { _id: id_scheda, Id_discord: decoded.user };
                        var cursor = methodDB.find_Json(query);
                        cursor.then(function (results) {
                            if (results == null) {
                                res.render('dashboard', { message_error: 'Errore nel ricerca profilo' });
                            } else {
                                if (isNaN(js_result['Money']) == true || js_result['Money'] == null) {
                                    money_ck = -9999;
                                } else {
                                    money_ck = js_result['Money']
                                }

                                if (js_result['Avatar'] == "" || js_result['Avatar'] == null || js_result['Avatar'] == "Non Assegnata") {
                                    avatar_ck = "/images/stemma_gilda_f.png"
                                    avatar_ck_url = "Avatar Mancante o Non Disponibile"
                                } else {
                                    avatar_ck = js_result['Avatar']
                                    avatar_ck_url = js_result['Avatar']
                                }

                                if (js_result['Multi Classe'] == "" || js_result['Multi Classe'] == null || js_result['Multi Classe'] == "Non Assegnata") {
                                    var render_mult = false;
                                } else {
                                    var render_mult = true;
                                }

                                console.log(req.params);

                                res.render('characters/scheda', {
                                    loged: loged,
                                    master: mastr,
                                    id_scheda: js_result['_id'],
                                    level_pg: js_result['Livello'],
                                    nome_pg: js_result['Nome_PG'],
                                    avatar_pg: avatar_ck,
                                    avatar_pg_url: avatar_ck_url,
                                    razza_pg: js_result['Razza'],
                                    classe_pg: js_result['Classe'],
                                    sotto_classe_pg: js_result['Sotto Classe'],
                                    render_mult: render_mult,
                                    classe_multi: js_result['Multi Classe'],
                                    sot_classe_multi: js_result['Multi Sotto Classe'],
                                    background_pg: js_result['Background'],
                                    descrizone: js_result['Descrizione'],
                                    forza_pg: js_result['Forza'],
                                    destrezza_pg: js_result['Destrezza'],
                                    costituzione_pg: js_result['Costituzione'],
                                    intelligenza_pg: js_result['Intelligenza'],
                                    saggezza_pg: js_result['Saggezza'],
                                    carisma_pg: js_result['Carisma'],
                                    monete_pg: money_ck.toString(),
                                    object_nome: obj_nome,
                                    object_quan: obj_quan,
                                    object_note: obj_note,
                                    img_class: check_class(js_result['Classe']),
                                    img_class_sot: check_class(js_result['Sotto Classe']),
                                    img_class_multi: check_class(js_result['Multi Classe']),
                                    img_class_sot_multi: check_class(js_result['Multi Sotto Classe']),
                                });
                            }
                        });
                    } else {
                        res.redirect('/characters');
                    }
                });
            } else {
                res.render('errorPages/page500');
            }
        } else {
            res.redirect('/characters');
        }
    });
};

exports.cancella_scheda = async (req, res) => {
    var id_scheda = req.body.id_scheda_delete;
    var name_pg = req.body.nome_delete;
    var check_pg = req.body.check_delete;
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (name_pg == check_pg) {
                var on_sevice_db = await methodDB.open_db();
                if (on_sevice_db != 1) {
                    methodDB.settab_db("Schede_PG");
                    methodDB.delete_db(id_scheda);
                    methodDB.settab_db("Utenti_web");
                    methodDB.N_schede_dec_update(decoded.id);
                    res.redirect('/characters');
                } else {
                    res.render('errorPages/page500');
                }
            } else {
                res.redirect('/characters');
            }
        }
    });
};

function check_class(classe) {
    if (classe == "Barbaro") {
        return "/images/Barbaro.png"
    } else if (classe == "Bardo") {
        return "/images/Bardo.png"
    } else if (classe == "Chierico") {
        return "/images/Chierico.png"
    } else if (classe == "Druido") {
        return "/images/Druido.png"
    } else if (classe == "Guerriero") {
        return "/images/Combatente.png"
    } else if (classe == "Ladro") {
        return "/images/Ladro.png"
    } else if (classe == "Mago") {
        return "/images/Mago.png"
    } else if (classe == "Monaco") {
        return "/images/Monaco.png"
    } else if (classe == "Paladino") {
        return "/images/Paladino.png"
    } else if (classe == "Ranger") {
        return "/images/Ranger.png"
    } else if (classe == "Stregone") {
        return "/images/Altro.png"
    } else if (classe == "Warlock") {
        return "/images/Warlock.png"
    } else if (classe == "Artefice") {
        return "/images/Altro.png"
    } else {
        return "/images/Altro.png"
    }
};

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
};