const express = require('express');
const jwt = require('jsonwebtoken');
const { post } = require('../routes');
const router = express.Router();

/* GET Dasboard Page */
router.get('/Dasboard', (req, res) => {
    const token = req.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            res.render('Dasboard.hbs');
        } else {
            res.redirect('/Login');
        } 
    });
});

module.exports = router;