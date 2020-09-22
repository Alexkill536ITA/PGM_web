const { MongoClient } = require("mongodb");
const mongodb_system = require("mongodb");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');
var mysql = require('../mysql');

//------------------------------------------------------//
/*         MongoDB Database Connection          */
//------------------------------------------------------//
const url = process.env.DATABASE_MONGDB;
const client = new MongoClient(url);

exports.modifica_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            const id_serch = mongodb_system.ObjectId(req.body.id_scheda_edit);
            client.connect(function(err, mogodb) {
                if (!err) {
                    mogodb.db('Piccolo_Grande_Mondo').collection('Schede_PG').findOne({ _id: id_serch}, function(err, result) {
                        if (!err) {
                            var js_result = JSON.stringify(result);
                            js_result = JSON.parse(js_result);
                            client.close();
                            console.log(js_result['Inventory']);
                            res.render('Sceda_temp.hbs', {
                                id_scheda:js_result['_id'],
                                nome_pg:js_result['Nome_PG'],
                                razza_pg:js_result['Razza'],
                                classe_pg:js_result['Classe'],
                                background_pg:js_result['Background'],
                                monete_pg:js_result['Money'].toString(),
                                iventario_pg:js_result['Inventory']
                            });
                        } else {
                            client.close();
                            res.redirect('/dasboard');
                        }
                    });
                    client.close();
                } else {
                    res.redirect('/dasboard');
                }
                client.close();
            });
            
        }
    });
}

exports.cancella_sheda = (req, res) => {
    
}
