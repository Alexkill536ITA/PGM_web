const express = require('express');
const Controller = require('../controllers/edit');
const router = express.Router();

router.post('/edit', Controller.modifica_sheda);
router.post('/delete', Controller.cancella_sheda);

module.exports = router;