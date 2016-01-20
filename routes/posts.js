var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Posts = function () {
  return knex('posts')
}

router.get('/', function(req, res, next) {
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.post('/', function (req, res, next) {
  Posts().insert(req.body).then(function () {
    res.redirect('/')
  })
})

router.get('/:id', function (req, res, next) {
    Posts().select().where('id',req.params.id).then(function (result) {
      res.json({'SUCCESS': result[0]})
    })
})

router.post('/:id', function (req, res, next) {
    Posts().select().where('id',req.params.id).update(req.body).then(function (result) {
      res.redirect('/')
    })
})

router.get('/:id/edit',function (req, res, next) {
    Posts().select().where('id', req.params.id).then(function (result) {
        res.json({'SUCCESS': result[0]})
    })
})

router.post('/:id/delete', function (req, res, next) {
    Posts().select().where('id', req.params.id).del().then(function () {
      res.redirect('/')
    })
})

module.exports = router;
