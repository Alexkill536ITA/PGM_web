const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

/* GET Login Page */
router.get('/login', (reg, res) => {
    const token = reg.cookies['jwt'];
    jwt.verify(token,process.env.JWT_SECRET, function(err, decoded)  {
        if (!err) {
            res.redirect('/dasboard');
        } else {
            res.render('./login.hbs');
        } 
    });
});

module.exports = router;