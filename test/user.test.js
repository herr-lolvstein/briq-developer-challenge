const User = require('../models').user;

test('A user has a default balance of 0', () => {
  const user = User.build();
  expect(user.balance).toEqual(0);
});

test('A user gives his total balance to another', done => {
  const users = {
    userTo: null,
    userFrom: null
  }

  User.create({username: 'userA', balance: 120})
    .then(userFrom => {
      users.userFrom = userFrom;
      return User.create({username: 'userB', balance: 30})
  })
  .then(userTo => {
    users.userTo = userTo;
    return users.userFrom.give(120, users.userTo, {})
  })
  .then(() => {
    expect(users.userTo.balance).toEqual(150);
    expect(users.userFrom.balance).toEqual(0);
    done();
  })
});
