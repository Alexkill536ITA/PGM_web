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

exports.modifica_sheda = (req, res) => {

}

exports.cancella_sheda = (req, res) => {
    
}