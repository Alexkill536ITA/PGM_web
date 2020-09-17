const mysql = require('mysql');
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');

//------------------------------------------------------//
/*         MongoDB e Mysql Database Connection          */
//------------------------------------------------------//
const dbMysql = mysql.createConnection({
    host : process.env.DATABASE_Host,
    user : process.env.DATABASE_User,
    password : process.env.DATABASE_Password,
    database : process.env.DATABASE_Data
});

const url = process.env.DATABASE_MONGDB;
const client = new MongoClient(url);

exports.Crea_sheda = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            dbMysql.query('SELECT * FROM `utenti` WHERE `Id`=? AND `Id_discord`=?', [decoded.id, decoded.user], async (error, results) =>{
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

exports.Insert_db = (req, res) => {
    const token = req.cookies['jwt'];
    const {name, razza, classe, background, money} = req.body;
    const nome_oggetto_obj = req.body.nome_oggetto;
    const quantita_obj = req.body.quantita;
    const note_obj = req.body.note;
    const index_obj = req.body.index_obj;
    
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            if(name.length > 0 || razza != "Scegli Razza" || classe != "Scegli Classe" || background != "Scegli Background") { 
                var inventory = {};

                const PG_temp = {
                    "Nome_Discord": decoded.user,
                    "Nome_PG": name,
                    "Razza": razza,
                    "Classe": classe,
                    "Background": background,
                    "Money": money,
                    "Inventory": inventory
                }

                if (index_obj == 1) {
                    inventory[nome_oggetto_obj] = {
                        "Nome": nome_oggetto_obj,
                        "Quantita": quantita_obj,
                        "Note": note_obj
                    }
                } else {
                    for (let index = 0; index < index_obj; index++) {
                        inventory[nome_oggetto_obj[index]] = {
                            "Nome": nome_oggetto_obj[index],
                            "Quantita": quantita_obj[index],
                            "Note": note_obj[index]
                        }               
                    }
                }

                console.log(PG_temp);
                client.connect(function(err, mogodb) {
                    if (err) {
                        res.redirect('/dasboard');
                    } else {
                        var mogodb = mogodb.db("Piccolo_Grande_Mondo");
                        mogodb.collection("Schede_PG").insertOne(PG_temp, function(err, res) {
                            if (err) {
                                console.log('[ERROR] Database insert FAIL');
                                res.render('Dasboard');
                            }
                            console.log("1 document inserted MongoDB");
                            dbMysql.query('UPDATE `utenti` SET `N_schede` =? WHERE `utenti`.`Id_discord`=?', [1,decoded.user], async () => {
                                console.log('1 document inserted MySQL');
                                res.render('Dasboard');
                            });
                        });
                        client.close();
                    }
                });
                res.redirect('/dasboard');

                
                //res.render('Dasboard', {message_suces:'Scheda creata'});
            }
            res.render('insert_temp', {message_warn:'Riempire i calpi'});
        }
    });
};
