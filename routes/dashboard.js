const express = require('express');
const jwt = require('jsonwebtoken');
const { post } = require('../routes');
const router = express.Router();

/* GET Dashboard Page */
router.all('/dashboard', (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, async function(err, decoded)  {
        if (!err) {
            var MongoClient = require('mongodb').MongoClient;
            var url = process.env.DATABASE_MONGDB;

            if (decoded.master == 1) {
                mastr = true
            } else {
                mastr = false
            }

            await MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
                if (!err) { 
                    var dbo = db.db("Piccolo_Grande_Mondo");
                    var query = { Nome_Discord: decoded.user};
                    
                    dbo.collection("Schede_PG").find(query).toArray(function(err, result) {
                        if (!err) {
                            if(result) {
                                if (result.length == 1) {
                                    var id_scheda = result[0]._id;
                                    var name_pg = result[0].Nome_PG;
                                    var list_max = result.length;
                                    if (result[0].Avatar == "" || result[0].Avatar == null || result[0].Avatar == "Non Assegnata") {
                                        avatar = "/images/stemma_gilda_f.png"
                                    } else {
                                        avatar = result[0].Avatar;
                                    }
                                } else {
                                    var id_scheda = [];
                                    var name_pg = [];
                                    var avatar = [];
                                    var list_max = result.length;
                                    for (let index = 0; index < list_max; index++) {
                                        id_scheda[index] = result[index]._id;
                                        name_pg[index] = result[index].Nome_PG;
                                        if (result[index].Avatar == "" || result[index].Avatar == null || result[index].Avatar == "Non Assegnata") {
                                            avatar[index] = "/images/stemma_gilda_f.png"
                                        } else {
                                            avatar[index] = result[index].Avatar;
                                        }
                                    }
                                }
                                db.close();
                                res.render('dashboard.hbs', {master:mastr ,list_pg:list_max, id:id_scheda, name:name_pg, avatar_pg:avatar});
                            }
                        }
                    });
                } else {
                    res.render('page500.hbs');
                }
            });
            
        } else {
            res.redirect('/Login');
        } 
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;