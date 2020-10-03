const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_MONGDB, { useUnifiedTopology: true });
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
exports.open_db = function() {
    client.on('serverOpening', () => {connect_up = true;});
    if (connect_up == false) {
        client.connect();
        database = client.db("Piccolo_Grande_Mondo");
        collection = database.collection("Schede_PG");
        console.log("[ INFO ] Connect MongoDB success");
        return 0;
    }
    return 1;
}

exports.close_db = function() {
    client.close();
}

// Operazioni
// MongoDB Find/Search
exports.serachbyid =function(id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    let cursor = collection.findOne({ '_id': id_scheda });
    return cursor;
}

exports.load_pg =function(id_discord, id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    let cursor = collection.findOne({ '_id': id_scheda, 'Nome_Discord': id_discord });
    return cursor;
}

// MongoDB Insert
exports.insert_db =function(Data_value) {
    collection.insertOne(Data_value);
    return 0;
}

// MongoDB Update
exports.money_update =function(id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, {$set: {Money:value_new}});
    return 0;
}

exports.exp_update =function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, {$set: {exp:value_new}});
    return 0;
}

// MongoDB Delete
exports.delete_db = function(id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.deleteOne({ '_id': id_scheda });
    return 0;
}  