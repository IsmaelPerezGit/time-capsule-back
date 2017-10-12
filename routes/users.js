var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt');

//Post new user to database
router.post('/new', function(req, res, next) {
  knex.raw(`select * from users`).then(function(data) {
        if (req.body.password === req.body.confirm) {
          bcrypt.hash(req.body.password, 8, function(err, hash) {
            knex.raw(`insert into users (username, email, password) values ('${req.body.username}', '${req.body.email}','${hash}')`).then(function() {
              res.send('success')
            })
          });
        } else {
          res.send('Error')
        };
    //   }
    // }
  })
});

//Post login
router.post('/login', function(req, res, next) {
  knex.raw(`select * from users where username = '${req.body.username}'`).then(function(user) {
    var userID = user.rows[0].id
    bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp) {
      if (resp) {
          res.send(`Successfully Checked}`)
      } else {
        res.send("Login failed!")
      }
    })
  })
});

module.exports = router;
