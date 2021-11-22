const Discord = require('discord.js');
const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');
const { post } = require('../routes');

exports.Make_mission = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (decoded.master = 1) {
                var data_min = new Date();
                var data_max = new Date();
                data_max.setDate(data_max.getDate() + 21);
                res.render('insert_mission', { mindate: GetFormatDate(data_min), maxdate: GetFormatDate(data_max) });
            } else {
                res.render('page401.hbs');
            }
        } else {
            res.redirect('/login');
        }
    });
};

exports.Edit_mission_db = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            const id_serch = mongodb.ObjectId(req.body.id_missione_edit);
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Registro_missioni");
                var cursor = methodDB.serachbyid(id_serch);
                cursor.then(async function (result) {
                    if (result != null) {

                        var Status_enbele = false;
                        var Status_execute = false;
                        var Status_disable = false;
                        var Enable_result = false;
                        if (result.Status_missione == "enable") {
                            Status_enbele = true;
                        } else if (result.Status_missione == "execute") {
                            Status_execute = true;
                            Enable_result = true;
                        } else {
                            Status_disable = true;
                            Enable_result = true;
                        }

                        var Select_level_temp = ["", "", "", "", "", "", "", "", ""]
                        for (let index = 0; index < result.Grado.length; index++) {
                            if (result.Grado[index] == "Rame") {
                                Select_level_temp[0] = "checked"
                            }
                            if (result.Grado[index] == "Bronzo") {
                                Select_level_temp[1] = "checked"
                            }
                            if (result.Grado[index] == "Ferro") {
                                Select_level_temp[2] = "checked"
                            }
                            if (result.Grado[index] == "Argento") {
                                Select_level_temp[3] = "checked"
                            }
                            if (result.Grado[index] == "Electrum") {
                                Select_level_temp[4] = "checked"
                            }
                            if (result.Grado[index] == "Oro") {
                                Select_level_temp[5] = "checked"
                            }
                            if (result.Grado[index] == "Platino") {
                                Select_level_temp[6] = "checked"
                            }
                            if (result.Grado[index] == "Mithril") {
                                Select_level_temp[7] = "checked"
                            }
                            if (result.Grado[index] == "Adamantio") {
                                Select_level_temp[8] = "checked"
                            }
                        }

                        var Player_list_temp = false;
                        if (result.Player_list.length > 0) {
                            Player_list_temp = true;
                        }

                        var Player_status_list = [];
                        var Player_id_list = [];
                        var Player_nome_list = [];
                        var Player_priority = [];
                        for (let index = 0; index < result.Player_list.length; index++) {
                            Player_nome_list[index] = result.Player_list[index]["Nome_PG"];
                            if (result.Player_list[index]["Status"] == "Attesa") {
                                Player_status_list[index] = "Attesa"
                            } else if (result.Player_list[index]["Status"] == "Accettato") {
                                Player_status_list[index] = "Accettato"
                            } else if (result.Player_list[index]["Status"] == "Rifiutato") {
                                Player_status_list[index] = "Rifiutato"
                            } else if (result.Player_list[index]["Status"] == "Riserva") {
                                Player_status_list[index] = "Riserva"
                            }

                            var cursor = await get_Scheda_pg(result.Player_list[index]["ID_Discord"])
                            if (cursor != null) {
                                Player_priority[index] = cursor["Priority"];
                            } else {
                                Player_priority[index] = "Null";
                            }

                            Player_id_list[index] = result.Player_list[index]["ID_Discord"];
                        }

                        if (result.URL_Image == "" || result.URL_Image == null || result.URL_Image == "Non Assegnata") {
                            var avatar = "https://cdn.discordapp.com/attachments/759699249947869184/912053846359023666/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                        } else {
                            var avatar = result.URL_Image;
                        }

                        res.render('mission.hbs', {
                            id_data_db: result._id,
                            id_missione: result['ID'],
                            Discord_id_message: result.Discord_id_message,
                            Status_enbele: Status_enbele,
                            Status_execute: Status_execute,
                            Status_disable: Status_disable,
                            Enable_result: Enable_result,
                            Nome: result.Nome,
                            Player_min: result.Player_min,
                            Data_scadenza: GetFormatDate(result.Data_scadenza),
                            Data_ora_missione: GetFormatDate(result.Data_ora_missione),
                            Select_level: Select_level_temp,
                            tag: result.Tag,
                            Descrizione_breve: result.Descrizione_breve,
                            URL_Image: avatar,
                            Descrizione: result.Descrizione,
                            Esito_missione: result.Esito_missione,
                            Player_list: Player_list_temp,
                            Player_max: result.Player_list.length,
                            Player_id: Player_id_list,
                            Player_name: Player_nome_list,
                            Player_priority: Player_priority,
                            Player_status: Player_status_list
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

exports.Insert_mission_db = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var Date_now = new Date();
            var {
                type_insert,
                id_mission,
                discord_id_message,
                nome_missione,
                player_min_missione,
                data_missione,
                Scadenza_missione,
                Select_rame,
                Select_bronzo,
                Select_ferro,
                Select_argento,
                Select_electrum,
                Select_oro,
                Select_platino,
                Select_mithril,
                Select_adamantio,
                tag_missione,
                descrizone_breve_missione,
                Url_missione,
                descrizone_missione,
                esito_missione,
                type_close
            } = req.body;

            if (id_mission == undefined) {
                id_mission = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            }

            if (discord_id_message == undefined) {
                id_message = "";
            } else {
                id_message = discord_id_message;
            }

            if (Scadenza_missione == undefined || Scadenza_missione == null || Scadenza_missione == "") {
                Scadenza_missione = new Date().getTime() - 1;
            }

            var index = 0;
            var player_list = [];
            do {
                var player_id = "player_id_" + String(index);
                var player_name = "player_name_" + String(index);
                var player_status = "status" + String(index);
                object_player = {
                    "ID_Discord": req.body[player_id],
                    "Nome_PG": req.body[player_name],
                    "Status": req.body[player_status]
                }

                if (req.body[player_id] != undefined) {
                    player_list.push(object_player)
                    index++;
                }

            } while (req.body[player_id] != undefined);

            var grado = [];
            if (Select_rame == "Rame") {
                grado.push("Rame")
            }
            if (Select_bronzo == "Bronzo") {
                grado.push("Bronzo")
            }
            if (Select_ferro == "Ferro") {
                grado.push("Ferro")
            }
            if (Select_argento == "Argento") {
                grado.push("Argento")
            }
            if (Select_electrum == "Electrum") {
                grado.push("Electrum")
            }
            if (Select_oro == "Oro") {
                grado.push("Oro")
            }
            if (Select_platino == "Platino") {
                grado.push("Platino")
            }
            if (Select_mithril == "Mithril") {
                grado.push("Mithril")
            }
            if (Select_adamantio == "Adamantio") {
                grado.push("Adamantio")
            }

            if (esito_missione == undefined || esito_missione == null) {
                var esito = "";
            } else {
                var esito = esito_missione;
            }

            if (Url_missione != "") {
                if (validURL(Url_missione) == true) {
                    var immage = Url_missione;
                } else {
                    var immage = "https://cdn.discordapp.com/attachments/759699249947869184/912053846359023666/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
                }
            } else {
                var immage = "https://cdn.discordapp.com/attachments/759699249947869184/912053846359023666/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
            }

            template = {
                "ID": id_mission,
                "Status_missione": "enable",
                "Discord_id_message": id_message,
                "Data_creazione": Date_now,
                "Data_scadenza": Scadenza_missione,
                "Data_ora_missione": data_missione,
                "Nome": nome_missione,
                "Tag": tag_missione,
                "Descrizione": descrizone_missione,
                "Descrizione_breve": descrizone_breve_missione,
                "Grado": grado,
                "URL_Image": immage,
                "Esito_missione": esito,
                "Master_id": decoded.user,
                "Player_min": player_min_missione,
                "Player_list": player_list
            }

            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Registro_missioni");
                if (type_close == 1) {
                    template['Status_missione'] = "disable";
                    methodDB.mission_update(id_mission, template);
                    call_Discord_bot('response', id_mission);
                } else {
                    if (type_insert == 0) {
                        methodDB.insert_db(template);
                        call_Discord_bot('init', id_mission);
                    } else {
                        methodDB.mission_update(id_mission, template);
                        call_Discord_bot('edit', id_mission);
                    };
                }
                res.redirect('/dashboard-mission');
            } else {
                res.render('page500.hbs');
            }

        } else {
            res.render('page401.hbs');
        }
    });
}

exports.Delete_mission_db = async (req, res) => {
    var id_scheda = req.body.id_scheda_delete;
    console.log(id_scheda);
    var name_pg = req.body.nome_delete;
    var check_pg = req.body.check_delete;
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (name_pg == check_pg) {
                var on_sevice_db = await methodDB.open_db();
                if (on_sevice_db != 1) {
                    methodDB.settab_db("Registro_missioni");
                    methodDB.delete_db(id_scheda);
                    res.redirect('/dashboard-mission');
                } else {
                    res.render('page500.hbs');
                }
            } else {
                res.redirect('/dashboard-mission');
            }
        }
    });
}

function GetFormatDate(String_date) {
    let current_datetime = new Date(String_date)
    var Month = current_datetime.getMonth() + 1
    var Day = current_datetime.getDate()
    var Hours = current_datetime.getHours()
    var Seconds = current_datetime.getSeconds()
    if (Month < 10) {
        Month = "0" + Month
    }
    if (Day < 10) {
        Day = "0" + Day
    }
    if (Hours < 10) {
        Hours = "0" + Hours
    }
    if (Seconds < 10) {
        Seconds = "0" + Seconds
    }
    return current_datetime.getFullYear() + "-" + Month + "-" + Day + "T" + Hours + ":" + Seconds
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Utenti_web");
        // var cursor = methodDB.serachbyid(id_serach);
        var cursor = methodDB.load_person(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function call_Discord_bot(option, id_mission) {
    const hook = new Discord.WebhookClient(process.env.ID_WEBHOOK, process.env.TOKEN_WEBHOOK);
    hook.send('&mission ' + option + ' ' + id_mission);
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}