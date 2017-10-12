// var bcrypt = require('bcrypt');
const saltRounds = 7;
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'Bon@test.com', username: 'Bon', password: `'Bon'`},
        {email: 'Don@test.com', username: 'Don', password: `'Don'`},
        {email: 'Johnson@test.com', username: 'Johnson', password: `'Johnson'`},
        {email: 'NameyMcNamerson@test.com', username: 'NameyMcNamerson', password: `'NameyMcNamerson'`},
        {email: 'Bib@test.com', username: 'Bib', password: `'Bib'`},
        {email: 'Dib@test.com', username: 'Dib', password: `'Dib'`}
      ]);
    });
};
