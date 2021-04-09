/* eslint-disable no-console */
const { Users, Couches } = require('./db.js');

Users.deleteMany({})
  .then(() =>
    console.log(
      '\x1b[36m',
      '\nDatabase (MongoDB): users table successfully dropped!'
    )
  )
  .then(() =>
    Users.insertMany([{id: 0, name: 'Fake Person', email: 'FakePerson@FakeEmail.fake'}])
  )
  .then((result) =>
    console.log(
      '\x1b[32m',
      `\nDatabase (MongoDB): 'users' table successfully seeded ${result.length} entries!\n`,
      '\x1b[37m'
    )
  );

Couches.deleteMany({})
  .then(() =>
    Couches.insertMany([{userId: 0, name: 'Fake Friend', phone: '555-555-5555', address: '4200 Canal St, New Orleans, LA 70119'}])
  )
  .then((result) =>
    console.log(
      '\x1b[32m',
      `\nDatabase (MongoDB): couches table successfully seeded ${result.length} entries!\n`,
      '\x1b[37m'
    ))
  .then(process.exit);

