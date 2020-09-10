const express = require('express');
const router = express.Router();

/* GET Login Page */
router.get('/login', (reg, res) => {
    res.render('Login.hbs');
});

module.exports = router;