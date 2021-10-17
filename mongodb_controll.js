const color = require('ansi-colors');
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
var client = new MongoClient(process.env.DATABASE_MONGDB, { useUnifiedTopology: true });
var database;
var collection;
var connect_up = false;

//------------------------------------------------------//
/*              MongoDB Database Connection             */
//------------------------------------------------------//

// client.connect().then(result => {
//     const database = client.db("Piccolo_Grande_Mondo");
//     const collection = database.collection("Schede_PG");
//     console.log(result);
// }, error => {
//     console.error(error);
// });

// Gestione Connessione
async function set_db_collection() {
    database = client.db(process.env.DATABASE_MONGDB_DB);
    // collection = database.collection("Schede_PG");
    console.log("[ " + color.blue("INFO") + "  ] Connect MongoDB success");
}

exports.open_db = async function () {
    try {
        client.on('serverOpening', () => { connect_up = true; });
        if (connect_up == false) {
            await client.connect();
            await set_db_collection();
        }
    } catch (e) {
        console.log("[ " + color.red("ERROR") + " ] Connect MongoDB Fail: \n");
        if (process.env.DEBUG_MODE == 'true') {
            console.log("[ " + color.magenta('DEBUG') + " ] " + e);
        }
        connect_up = false;
        return 1;
    }
}

exports.settab_db = function (slect) {
    collection = database.collection(slect);
}

// function close_db() {
//     client.save();
//     client.close();
//     client = new MongoClient(process.env.DATABASE_MONGDB, { useUnifiedTopology: true });
// }

// Operazioni
// MongoDB Find/Search
exports.serachbyid = function (id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    let cursor = collection.findOne({ '_id': id_scheda });
    return cursor;
}

exports.load_pg = function (id_discord, id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    let cursor = collection.findOne({ '_id': id_scheda, 'Nome_Discord': id_discord });
    return cursor;
}

exports.load_person = async function (id_discord) {
    let cursor = await collection.findOne({ 'Id_discord': id_discord });
    return cursor;
}

exports.find_Json = function (query) {
    return collection.findOne(query);
}

// MongoDB Insert
exports.insert_db = function (Data_value) {
    collection.insertOne(Data_value);
    return 0;
}

// MongoDB Update
exports.mission_update = function (id_scheda, value_new) {
    collection.updateOne({ 'ID': id_scheda }, { $set: value_new });
    return 0;
}

exports.money_update = function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: { Money: value_new } });
    return 0;
}

exports.exp_update = function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: { exp: value_new } });
    return 0;
}

exports.N_schede_update = function (id_discord) {
    collection.updateOne({ 'Id_discord': id_discord }, { $inc: { N_schede: 1 } });
    return 0;
}

exports.N_schede_dec_update = function (id_discord) {
    id = mongo.ObjectID(id_discord);
    collection.updateOne({ '_id': id }, { $inc: { N_schede: -1 } });
    return 0;
}

exports.password_update = function (id_user, value_new) {
    id_user = mongo.ObjectID(id_user);
    collection.updateOne({ '_id': id_user }, { $set: { password: value_new, temp_paw: "0" } });
    return 0;
}

// MongoDB Delete
exports.delete_db = function (id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.deleteOne({ '_id': id_scheda });
    return 0;
}