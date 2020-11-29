const express = require('express');
const router = express.Router();

/* GET Register Page */
router.get('/register', (reg, res) => {
    res.render('register.hbs');
});

module.exports = router;