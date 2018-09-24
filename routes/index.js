var express = require('express');
var router = express.Router();
const { user: User } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll({ order: [['id', 'DESC']] })
  .then(users => {
    res.render('index', { users: users });
  })
});

module.exports = router;
