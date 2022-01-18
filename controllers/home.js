const jwt = require('jsonwebtoken');

exports.index = function (req, res, next) {
    const token = req.cookies['jwt'];
    var loged = false
    var mastr = false
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if (!err) {
                loged = true;
                if (decoded.master == 1)
                    mastr = true;
            }
            res.render('index', { loged: loged, master: mastr });
        });
    }
    else {
        res.render('index', { loged: false, master: false });
    }
};