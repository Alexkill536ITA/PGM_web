const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET Home Page */
router.get('/blogpost', async function(req, res, next) {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true
            if (decoded.master == 1) {
                mastr = true
            }
            res.render('blogpost', {loged:loged, master:mastr});
        } else {
            var loged = false
            var mastr = false
            res.render('blogpost', {loged:loged, master:mastr});
        }
    });
    // var MongoClient = require('mongodb').MongoClient;
    //         var url = process.env.DATABASE_MONGDB;

    //         await MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
    //             if (!err) { 
    //                 var dbo = db.db("Piccolo_Grande_Mondo");
    //                 dbo.collection("Post_blog").find().toArray(function(err, result) {
    //                     if (!err) {
    //                         if(result) {
                                
    //                             db.close();
    //                             res.render('blogpost.hbs', {post_recnet, post_tag_mondo, post_tag_storia, post_tag_classi, post_tag_razze, post_tag_homebrew, post_tag_help, post_tag_altro});
    //                         }
    //                     }
    //                 });
    //             } else {
    //                 res.render('page500.hbs');
    //             }
    //         });
});

module.exports = router;