const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');
var mysql = require('../mysql');

//------------------------------------------------------//
/*         MongoDB Database Connection          */
//------------------------------------------------------//
const url = process.env.DATABASE_MONGDB;
const client = new MongoClient(url);

exports.modifica_sheda = (req, res) => {

}

exports.cancella_sheda = (req, res) => {
    
}
