const express = require('express');
const multer = require('multer');
const controller = require('../controllers/user.controller');
const valUser = require("../validates/validate.user");

const upload = multer({ dest: './public/uploads/' });

const router  = express.Router();

router.get('/',controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', 
  upload.single('avatar'),
  valUser.postCreate,
  controller.postCreate
);

module.exports = router;
