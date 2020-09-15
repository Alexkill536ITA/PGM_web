const express = require('express');
const Controller = require('../controllers/insert');
const router = express.Router();

router.post('/make', Controller.Crea_sheda);
router.post('/insert', Controller.Insert_db);

module.exports = router;