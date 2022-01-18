const jwt = require('jsonwebtoken');
const methodDB = require("../mongodb_controll.js");

/* GET Blogpost Page */
exports.show = async function(req, res, next) {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true
            if (decoded.master == 1) {
                mastr = true
            }
            var post = await get_Object();
            var post_title = [];
            var post_family = [];
            var post_id = [];
            for (const i in post) {
                post_title[i] = post[i]['Title'];
                post_family[i] = post[i]['Famiglia'];
                post_id[i] = post[i]['_id'];
            }
            res.render('blogpost/blogpost', {loged:loged, master:mastr, post_title:post_title, post_family:post_family, post_id:post_id});
        } else {
            var loged = false
            var mastr = false
            var post = await get_Object();
            var post_title = [];
            var post_family = [];
            var post_id = [];
            for (const i in post) {
                post_title[i] = post[i]['Title'];
                post_family[i] = post[i]['Famiglia'];
                post_id[i] = post[i]['_id'];
            }
            res.render('blogpost/blogpost', {loged:loged, master:mastr, post_title:post_title, post_family:post_family, post_id:post_id});
        }
    });
};

async function get_Object() {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Post_blog");
        var cursor = methodDB.find_All();
    } else {
        return 1;
    }
    return cursor;
}

module.exports = exports;