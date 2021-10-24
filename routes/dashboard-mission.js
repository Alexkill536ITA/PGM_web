const express = require('express');
const jwt = require('jsonwebtoken');
const Controller = require('../controllers/mission');
const { post } = require('../routes');
const router = express.Router();

/* GET Dashboard Page */
router.all('/dashboard-mission', (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (decoded.master == 1) {
                var MongoClient = require('mongodb').MongoClient;
                var url = process.env.DATABASE_MONGDB;

                await MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
                    if (!err) {
                        var dbo = db.db("Piccolo_Grande_Mondo");
                        var query = { Master_id: decoded.user };

                        dbo.collection("Registro_missioni").find(query).toArray(function (err, result) {
                            if (!err) {
                                if (result) {
                                    if (result.length == 1) {
                                        var id_mission = result[0]._id;
                                        var name_mission = result[0].Nome;
                                        var Descrizione_breve = result[0].Descrizione_breve + "%new%,";
                                        var Data_scadenza = format_date(result[0].Data_scadenza);
                                        var Player_min = result[0].Player_min;
                                        var Player_list = result[0].Player_list.length;
                                        var Player = "";
                                        var URL_Image = result[0].URL_Image;
                                        var list_max = result.length;
                                        Player = String(Player_list) + "/" + String(Player_min);
                                        if (URL_Image == "" || URL_Image == null || URL_Image == "Non Assegnata") {
                                            avatar = "/images/stemma_gilda_f.png"
                                        } else {
                                            avatar = URL_Image;
                                        }
                                    } else {
                                        var id_mission = [];
                                        var name_mission = [];
                                        var Descrizione_breve = [];
                                        var Data_scadenza = [];
                                        var Player_min = [];
                                        var Player_list = [];
                                        var Player = [];
                                        var avatar = [];
                                        var list_max = result.length;
                                        for (let index = 0; index < list_max; index++) {
                                            id_mission[index] = result[index]._id;
                                            name_mission[index] = result[index].Nome;
                                            Descrizione_breve[index] = result[index].Descrizione_breve + "%new%,";
                                            Data_scadenza[index] = format_date(result[index].Data_scadenza);
                                            Player_min[index] = result[index].Player_min;
                                            Player_list[index] = result[index].Player_list.length;
                                            Player[index] = String(Player_list[index]) +"/" + String(Player_min[index]);
                                            if (result[index].URL_Image == "" || result[index].URL_Image == null || result[index].URL_Image == "Non Assegnata") {
                                                avatar[index] = "/images/stemma_gilda_f.png"
                                            } else {
                                                avatar[index] = result[index].URL_Image;
                                            }
                                        }
                                    }
                                    db.close();
                                    res.render('dashboard-mission.hbs', { list_mission: list_max, id_missione: id_mission, nome_missione: name_mission, avatar_mission: avatar, body_missione: Descrizione_breve, exspire_mission: Data_scadenza, player_missione: Player });
                                }
                            }
                        });
                    } else {
                        res.render('page500.hbs');
                    }
                });
            } else {
                res.render('page401.hbs');
            }
        } else {
            res.redirect('/Login');
        }
    });
    // res.render('dashboard-mission.hbs');
});

function format_date(date_int) {
    var today = new Date(date_int);
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    month = String(parseInt(month)+1);
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return day + "/" + month + "/" + year
}


router.post('/mission/make', Controller.Make_mission);
router.post('/mission/edit', Controller.Edit_mission_db);
router.post('/mission/insert', Controller.Insert_mission_db);
router.post('/mission/delete', Controller.Delete_mission_db);

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;