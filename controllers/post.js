const mongodb = require("mongodb");
const methodDB = require("../mongodb_controll.js");
const jwt = require('jsonwebtoken');

exports.show = async (req, res, next) => {
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
            res.render('blogpost/post', { loged: loged, master: mastr, Title: post.Title, Img: post.Img, Tag: post.Tag, date: post['Date'], text: post['Text'], Famiglia: post.Famiglia });
        } else {
            var loged = false
            var mastr = false
            var post = "";
            if (req.params.id.length == 24) {
                post = await get_Object(req.params.id);
            }
            res.render('blogpost/post', { loged: loged, master: mastr, Title: post.Title, Img: post.Img, Tag: post.Tag, date: post['Date'], text: post['Text'], Famiglia: post.Famiglia });
        }
    });
};

exports.Make_post = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (decoded.master == 1) {
                res.render('blogpost/insert_post');
            } else {
                res.render('errorPages/page401');
            }
        } else {
            res.redirect('auth/login');
        }
    });
};

exports.Edit_open_post_db = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            const id_serch = mongodb.ObjectId(req.body.id_missione_edit);
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Post_blog");
                var cursor = methodDB.serachbyid(id_serch);
                cursor.then(async function (result) {
                    if (result != null) {

                    } else {
                        res.redirect('/blogpost');
                    }
                });
            } else {
                res.render('errorPages/page500');
            }
        } else {
            res.redirect('/blogpost');
        }
    });
}

exports.Edit_post_db = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var Date_now = new Date();
            var {
                titolo,
                img_post,
                famiglia,
                tag,
                text
            } = req.body;

            var arry_tag = tag.split(";");

            template = {
                "ID": id_post,
                "Title": titolo,
                "Img": img_post,
                "Tag": arry_tag,
                "Date": Date_now,
                "Text": text,
                "Famiglia": famiglia
            }

            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Post_blog");
                if (type_close == 1) {
                    methodDB.mission_update(id_post, template);
                } else {
                    methodDB.insert_db(template);
                }
                res.redirect('/blogpost');
            } else {
                res.render('errorPages/page500');
            }
        } else {
            res.render('errorPages/page401');
        }
    });
}

exports.Insert_post_db = (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var Date_now = new Date();
            var {
                titolo,
                img_post,
                famiglia,
                tag,
                text
            } = req.body;

            var arry_tag = tag.split(";");

            template = {
                "Title": titolo,
                "Img": img_post,
                "Tag": arry_tag,
                "Date": Date_now,
                "Text": text,
                "Famiglia": famiglia
            }

            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Post_blog");
                methodDB.insert_db(template);
                res.redirect('/blogpost');
            } else {
                res.render('errorPages/page500');
            }
        } else {
            res.render('errorPages/page401');
        }
    });
}

exports.Delete_mission_db = async (req, res) => {
    var id_scheda = req.body.id_scheda_delete;
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            if (name_pg == check_pg) {
                var on_sevice_db = await methodDB.open_db();
                if (on_sevice_db != 1) {
                    methodDB.settab_db("Post_blog");
                    methodDB.delete_db(id_scheda);
                    res.redirect('/blogpost');
                } else {
                    res.render('errorPages/page500');
                }
            } else {
                res.redirect('/blogpost');
            }
        }
    });
}

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

module.exports = exports;