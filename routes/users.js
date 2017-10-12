var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt');

//Splash page
router.get('/', function(req, res, next) {
  knex.raw(`select * from users`)
  .then(data => {
    res.json(data.rows)
  });
});

// //Create new user form
// router.get('/new', function(req, res, next) {
//   res.render('users/new')
// });

//Post new user to database
router.post('/new', function(req, res, next) {
  knex.raw(`select * from users`).then(function(data) {
    for (var i = 0; i < data.rows.length; i++) {
      if (req.body.username === data.rows[i]["username"]) {
        res.render('users/errorName', {data: "Please choose a new username"})
      } else {
        if (req.body.password === req.body.confirm) {
          bcrypt.hash(req.body.password, 8, function(err, hash) {
            knex.raw(`insert into users (email, username, password) values ('${req.body.email}', '${req.body.username}','${hash}')`).then(function() {
              res.redirect('/')
            })
          });
        } else {
          res.render('users/errorPW')
        };
      }
    }
  })
});

// router.post('/new', function(req, res, next) {
//             knex.raw(`insert into users (email, username, password) values ('${req.body.email}', '${req.body.username}','${req.body.password}')`).then(function() {
//               res.redirect('/')
//             })
//           });


// //Delete user from database
// router.post('/:id/delete', function(req, res, next) {
//   knex.raw(`delete from users where users.id = ${req.params.id}`).then(function() {
//     if (req.signedCookies["admin"] === "true") {
//       res.redirect('/users/admin')
//     } else {
//       res.redirect('/')
//     }
//   });
// });
//
// // // Get login form
// // router.get('/login', function(req, res, next) {
// //   res.render('users/login')
// // });
//
// //Post login
// router.post('/login', function(req, res, next) {
//   knex.raw(`select * from users where username = '${req.body.username}'`).then(function(user) {
//     var userID = user.rows[0].id
//     bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp) {
//       if (resp) {
//         if (user.rows[0]["isAdmin"] === true) {
//           res.cookie('admin', true, {signed: true})
//           res.redirect('/users/admin')
//         } else {
//           res.redirect(`/users/${userID}`)
//         }
//       } else {
//         res.send("Login failed!")
//       }
//     })
//
//   })
// });
//
// //Show Admin page
//
// router.get('/admin', function(req, res, next) {
//   knex.raw(`select * from users order by username`).then(function(data) {
//     if (req.signedCookies["admin"] === "true") {
//       res.render('users/admin', {data: data.rows})
//     } else {
//       res.send('Unauthorized Access! Administrator only!')
//     }
//   })
// })
//
// //Edit user form
// router.get('/:id/edit', function(req, res, next) {
//   knex.raw(`select * from users where users.id = ${req.params.id}`).then(function(data) {
//     res.render('users/edit', {data: data.rows[0]})
//   });
// });
//
// //Update user in database
// router.post('/:id/edit', function(req, res, next) {
//   if (req.body.password === req.body.confirm) {
//     bcrypt.hash(req.body.password, 8, function(err, hash) {
//       knex.raw(`update users set username = '${req.body.username}', password = '${hash}' where users.id = ${req.params.id}`).then(function() {
//         res.redirect(`/users/${req.params.id}`)
//       })
//     });
//   } else {
//     res.send("Passwords do not match")
//   };
// });
//
// //clear cookies for user login
// router.get('/logout', function(req, res, next) {
//   res.clearCookie('admin')
//   res.clearCookie('userid')
//   res.redirect('/users')
// })
//
// //Show single user
// router.get('/:id', function(req, res, next) {
//   var userID = req.params.id;
//   knex.raw(`select * from users where id = '${req.params.id}'`).then(function(user) {
//     res.render("users/show", {user: user.rows[0]})
//   })
// });

module.exports = router;
