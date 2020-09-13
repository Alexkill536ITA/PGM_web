const express = require('express');
const Controller = require('../controllers/insert');
const router = express.Router();

router.post('/insert', Controller.Crea_sheda);

module.exports = router;