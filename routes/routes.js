const express = require('express');
const authController = require('../controllers/auth');
const blogpostController = require('../controllers/blogpost');
const characterController = require('../controllers/characters');
const contactsController = require('../controllers/contacts');
const missionController = require('../controllers/missions');
const postsController = require('../controllers/post');
const controller = require('../controllers/home');
const router = express.Router();
var prefix = '';

/* Home Page */
router.get('/', controller.index);
router.get('/index', controller.index);

/* Authentication/Register User */
prefix = '/auth';
router.get(prefix + '/register', authController.register);
router.post(prefix + '/register', authController.register);
router.get(prefix + '/login', authController.login);
router.post(prefix + '/login', authController.login);
router.post(prefix + '/recovery_pas', authController.recovery_pas);

/* Blogposts */
prefix = '/blogpost';
router.get(prefix, blogpostController.show);

/* Characters */
prefix = '/characters';
router.all(prefix, characterController.show);
router.post(prefix + '/make', characterController.crea_scheda);
router.post(prefix + '/insert', characterController.insert_db);
router.post(prefix + '/edit', characterController.modifica_scheda);
router.post(prefix + '/delete', characterController.cancella_scheda);

/* Characters */
prefix = '/contact';
router.get(prefix, contactsController.index);
router.post(prefix + '/send', contactsController.send);

/* Missions */
prefix = '/missions';
router.all(prefix, missionController.show_missions);
router.post(prefix + '/new', missionController.Make_mission);
router.post(prefix + '/edit', missionController.Edit_mission_db);
router.post(prefix + '/insert', missionController.Insert_mission_db);
router.post(prefix + '/delete', missionController.Delete_mission_db);

/* Posts */
prefix = '/post';
router.get(prefix + '/:id', postsController.show);
router.post(prefix + '/make', postsController.Make_post);
// router.post(prefix + '/edit/:id', postsController.Edit_open_post_db);
// router.post(prefix + '/edit/submit', postsController.Edit_post_db);
router.post(prefix + '/insert', postsController.Insert_post_db);
// router.post(prefix + '/delete/:id', postsController.Delete_post_db);

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;