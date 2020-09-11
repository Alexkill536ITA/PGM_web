const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET Dasboard Page */
router.get('/Dasboard', (reg, res) => {
    const token = reg.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            res.render('Dasboard.hbs');
        } else {
            res.redirect('/Login');
        } 
    });
});

module.exports = router;