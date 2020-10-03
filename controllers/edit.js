const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');
var mysql = require('../mysql');

exports.modifica_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            const id_serch = mongodb.ObjectId(req.body.id_scheda_edit);
            methodDB.open_db();
            const cursor = methodDB.serachbyid(id_serch);
            cursor.then(function(result){
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
                        obj_nome[i] = '"'+obj_N[obj_k[i]]['Nome']+'"';
                        obj_quan[i] = '"'+obj_N[obj_k[i]]['Quantita']+'"';
                        obj_note[i] = '"'+obj_N[obj_k[i]]['Note']+'"';
                    }
                    res.render('Scheda_temp.hbs', {
                        id_scheda:js_result['_id'],
                        nome_pg:js_result['Nome_PG'],
                        razza_pg:js_result['Razza'],
                        classe_pg:js_result['Classe'],
                        background_pg:js_result['Background'],
                        monete_pg:js_result['Money'].toString(),
                        object_nome:obj_nome,
                        object_quan:obj_quan,
                        object_note:obj_note
                    });
                } else {
                    res.redirect('/dasboard');
                }
            });
        } else {
            res.redirect('/dasboard');
        }        
    });            
}

exports.cancella_sheda = (req, res) => {
    var id_scheda = req.body.id_scheda_delete;
    var name_pg = req.body.nome_delete;
    var check_pg = req.body.check_delete;
    if (name_pg == check_pg) {
        methodDB.open_db();
        methodDB.delete_db(id_scheda);
        res.redirect('/dasboard');
    } else {
        res.redirect('/dasboard');
    }
}