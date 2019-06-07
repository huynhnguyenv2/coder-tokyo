const express = require('express');
const controller = require('../controllers/user.controller');
const valUser = require("../validates/validate.user");
const authMiddleware = require("../middlewares/auth.middlewares")
const router  = express.Router();

router.get('/', authMiddleware.requireAuth ,controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', valUser.postCreate ,controller.postCreate);

module.exports = router;
