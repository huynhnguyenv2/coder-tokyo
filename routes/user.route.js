const express = require('express');
const controller = require('../controllers/user.controller');
const valUser = require("../validates/validate.user");
const router  = express.Router();

router.get('/', controller.index);

router.get('/cookie', function(req, res){
  res.cookie('user-id', 12345);
  res.send("OK");
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', valUser.postCreate ,controller.postCreate);

module.exports = router;
