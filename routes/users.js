var express = require('express');
var router = express.Router();
const { user: User } = require('../models');

/* GET users listing. */
router.get('/', (req, res) => {
  User.findAll()
  .then(users => {
    res.send(users);
  })
});

/* POST new user */
router.post('/', (req, res) => {
  User.create({username: req.body.username})
  .then(user =>
    res.send(user)
  )
})

/* PUT user settings */
router.put('/:id', (req, res) => {
  User.update(
    {username: req.body.username, balance: req.body.balance},
    {returning: true, where: {id: req.params.id} }
  )
  .then(([ rows, [user] ]) => {
    res.send(user);
  })
})

/* DELETE user */
router.delete('/:id', (req, res) => {
  User.destroy({where: { id: req.params.id }})
  .then(rows => {
    if (rows === 1)
      return res.send('Deleted user!')
    res.send('User not deleted');
  })
})

/* POST a user transaction */
router.post('/:id/give', (req, res) => {
  Promise.all([
      User.findById(req.body.userFrom),
      User.findById(req.params.id)
    ])
    .then(users => {
      users[0].give(req.body.amount, users[1])
    })
    .then(() =>  res.send('Transaction registered'))
    .catch(err => res.send(err))
})

module.exports = router;
