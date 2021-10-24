const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET Home Page */
router.get('/', function (reg, res, next) {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true
            if (decoded.master == 1) {
                mastr = true
            }
            res.render('index.hbs', {loged:loged, master:mastr});
        } else {
            var loged = false
            var mastr = false
            res.render('index.hbs', {loged:loged, master:mastr});
        }
    });
});

module.exports = router;