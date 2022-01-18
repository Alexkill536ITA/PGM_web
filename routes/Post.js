const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const methodDB = require("../mongodb_controll.js");
const Controller = require('../controllers/post');

router.get('/post/:id', async (req, res, next) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true
            if (decoded.master == 1) {
                mastr = true
            }
            var post = "";
            if (req.params.id.length == 24) {
                post = await get_Object(req.params.id);
            }
            res.render('Post.hbs', { loged: loged, master: mastr, Title: post.Title, Img: post.Img, Tag: post.Tag, date: post['Date'], text: post['Text'], Famiglia: post.Famiglia });
        } else {
            var loged = false
            var mastr = false
            var post = "";
            if (req.params.id.length == 24) {
                post = await get_Object(req.params.id);
            }
            res.render('Post.hbs', { loged: loged, master: mastr, Title: post.Title, Img: post.Img, Tag: post.Tag, date: post['Date'], text: post['Text'], Famiglia: post.Famiglia });
        }
    });
});

async function get_Object(id_obj) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Post_blog");
        var cursor = methodDB.serachbyid(id_obj);
    } else {
        return 1;
    }
    return cursor;
}

router.post('/post/make', Controller.Make_post);
// router.post('/post/edit/:id', Controller.Edit_open_post_db);
// router.post('/post/edit/submit', Controller.Edit_post_db);
router.post('/post/insert', Controller.Insert_post_db);
// router.post('/post/delete/:id', Controller.Delete_post_db);

module.exports = router;