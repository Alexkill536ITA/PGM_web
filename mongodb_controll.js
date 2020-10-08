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
    database = client.db("Piccolo_Grande_Mondo");
    collection = database.collection("Schede_PG");
    console.log("[ INFO ] Connect MongoDB success");
}

exports.open_db = async function() {
    try {
        client.on('serverOpening', () => {connect_up = true;});
        if (connect_up == false) {
            await client.connect();
            await set_db_collection();
        }
    } catch (e) {
        console.log("[ ERROR ] Connect MongoDB success: \n");
        connect_up = false;
        return 1;
    }
}

// function close_db() {
//     client.save();
//     client.close();
//     client = new MongoClient(process.env.DATABASE_MONGDB, { useUnifiedTopology: true });
// }

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