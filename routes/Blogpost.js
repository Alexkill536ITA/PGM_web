const express = require('express');
const router = express.Router();

/* GET Home Page */
router.get('/blogpost', async function(reg, res, next) {
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
    res.render('blogpost');
});

module.exports = router;