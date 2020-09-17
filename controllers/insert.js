const mysql = require('mysql');
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');

//------------------------------------------------------//
/*         MongoDB e Mysql Database Connection          */
//------------------------------------------------------//
const db = mysql.createConnection({
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
            db.query('SELECT * FROM `utenti` WHERE `Id`=? AND `Id_discord`=?', [decoded.id, decoded.user], async (error, results) =>{
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
    
    var nome_oggetto_value = "";
    var quantita_value = "";
    var note_value = "";

    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            if(name.length > 0 || razza != "Scegli Razza" || classe != "Scegli Classe" || background != "Scegli Background") { 
                var n = nome_oggetto_obj.length;
                var index = 0;
                var fill_1 = false;
                var Inventariro = {};

                const PG_temp = {
                    Nome_Discord: decoded.user,
                    Nome_PG: name,
                    Razza: razza,
                    Classe: classe,
                    Background: background,
                    Money: money,
                    Inventariro
                }

                if (index_obj > 1){
                    for (index; index < index_obj; index++) {
                        nome_oggetto_value = nome_oggetto_obj[index];
                        quantita_value = quantita_obj[index];
                        note_value = note_obj[index];

                        if (fill_1 == false) {
                            Inventariro = `{${nome_oggetto_value}: {Nome: ${nome_oggetto_value}, Quantita: ${quantita_value}, Note: ${note_value}}`;
                            fill_1 = true;
                        } else {
                            Inventariro = Inventariro+`, ${nome_oggetto_value}: {Nome: ${nome_oggetto_value}, Quantita: ${quantita_value}, Note: ${note_value}}`;
                        }
                        
                    }
                    Inventariro = Inventariro+`}`;
                    Object.assign(PG_temp, {Inventariro});
                } else {
                    nome_oggetto_value = nome_oggetto_obj;
                    quantita_value = quantita_obj;
                    note_value = note_obj;
                    Inventariro = `{${nome_oggetto_value}: {Nome: ${nome_oggetto_value}, Quantita: ${quantita_value}, Note: ${note_value}}}`;                    
                    Object.assign(PG_temp, {Inventariro});
                }
                console.log(PG_temp);
                client.connect(function(err, mogodb) {
                    if (err) {
                        console.log('[ERROR] Database insert');
                    }
                    var mogodb = mogodb.db("Piccolo_Grande_Mondo");
                    mogodb.collection("Schede_PG").insertOne(PG_temp, function(err, res) {
                        if (err) {
                            console.log('[ERROR] Database insert');
                        }
                        console.log("1 document inserted");    
                    });
                });
                client.close();
                //res.render('Dasboard', {message_suces:'Scheda creata'});
            }
            res.render('insert_temp', {message_warn:'Riempire i calpi'});
        }
    });
};

