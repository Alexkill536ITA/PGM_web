const express = require('express');
const Controller = require('../controllers/edit');
const router = express.Router();

router.post('/edit', Controller.modifica_sheda);
router.post('/delete', Controller.cancella_sheda);
router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;