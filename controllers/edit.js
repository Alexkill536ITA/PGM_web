const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');

exports.modifica_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
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
                            } else if (results.master == 1) {
                                if (isNaN(js_result['Money'])) {
                                    money_ck = -9999;
                                } else {
                                    money_ck = js_result['Money']
                                }

                                res.render('scheda_temp.hbs', {
                                    id_scheda: js_result['_id'],
                                    level_pg: js_result['Livello'],
                                    nome_pg: js_result['Nome_PG'],
                                    avatar_pg: js_result['Avatar'],
                                    razza_pg: js_result['Razza'],
                                    classe_pg: js_result['Classe'],
                                    sotto_classe_pg: js_result['Sotto Classe'],
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
                                    object_note: obj_note
                                });
                            } else {
                                res.render('scheda_temp_py.hbs', {
                                    id_scheda: js_result['_id'],
                                    level_pg: js_result['Livello'],
                                    nome_pg: js_result['Nome_PG'],
                                    avatar_pg: js_result['Avatar'],
                                    razza_pg: js_result['Razza'],
                                    classe_pg: js_result['Classe'],
                                    sotto_classe_pg: js_result['Sotto Classe'],
                                    background_pg: js_result['Background'],
                                    descrizone: js_result['Descrizione'],
                                    forza_pg: js_result['Forza'],
                                    destrezza_pg: js_result['Destrezza'],
                                    costituzione_pg: js_result['Costituzione'],
                                    intelligenza_pg: js_result['Intelligenza'],
                                    saggezza_pg: js_result['Saggezza'],
                                    carisma_pg: js_result['Carisma'],
                                    monete_pg: js_result['Money'].toString(),
                                    object_nome: obj_nome,
                                    object_quan: obj_quan,
                                    object_note: obj_note
                                });
                            }
                        });
                    } else {
                        res.redirect('/dashboard');
                    }
                });
            } else {
                res.render('page500.hbs');
            }
        } else {
            res.redirect('/dashboard');
        }
    });
}

exports.cancella_sheda = async (req, res) => {
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
                    res.redirect('/dashboard');
                } else {
                    res.render('page500.hbs');
                }
            } else {
                res.redirect('/dashboard');
            }
        }
    });
}