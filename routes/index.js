const express = require('express');
const router = express.Router();

/* GET Home Page */
router.get('/', function(reg, res, next) {
    res.render('index.hbs');
})

module.exports = router;