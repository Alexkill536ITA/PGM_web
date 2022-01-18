const jwt = require('jsonwebtoken');
const methodDB = require("../mongodb_controll.js");

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
            res.render('post/post', { loged: loged, master: mastr, Title: post.Title, Img: post.Img, Tag: post.Tag, date: post['Date'], text: post['Text'], Famiglia: post.Famiglia });
        } else {
            var loged = false
            var mastr = false
            var post = "";
            if (req.params.id.length == 24) {
                post = await get_Object(req.params.id);
            }
            res.render('post/post', { loged: loged, master: mastr, Title: post.Title, Img: post.Img, Tag: post.Tag, date: post['Date'], text: post['Text'], Famiglia: post.Famiglia });
        }
    });
};

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