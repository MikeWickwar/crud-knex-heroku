var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Comments = function () {
  return knex('comments')
}

router.get('/', function(req, res, next) {
  Comments().select().then(function (comments) {
    res.json({'SUCCESS': comments });
  })
});

router.get('/:post_id/comments', function(req, res, next){
  Comments().select().where('post_id', req.params.post_id).then(function (comments) {
    res.json({'SUCCESS': comments });
  })
});

router.post('/:post_id/comments', function(req, res, next){
  req.body.post_id = req.params.post_id;
  Comments().insert(req.body).then(function (response) {
    res.redirect('/posts/'+ req.params.post_id+ '/comments')
  })
});

router.get('/:post_id/comments/:id', function (req, res, next) {
    Comments().select().where('post_id', req.params.post_id).andWhere('id', req.params.id).first().then(function (response) {
      res.json({'SUCCESS': response})
    })
})
router.get('/:post_id/comments/:id/edit', function (req, res, next) {
    Comments().select().where('post_id', req.params.post_id).andWhere('id', req.params.id).then(function (response) {
      res.json({'SUCCESS': response})
    })
})
router.post('/:post_id/comments/:id', function (req, res, next) {
    Comments().select().where('post_id', req.params.post_id).andWhere('id', req.params.id).update(req.body).then(function () {
      res.redirect('/posts/'+req.params.post_id+'/comments')
    })
})
router.post('/:post_id/comments/:id/delete', function (req, res, next) {
    Comments().select().where('post_id', req.params.post_id).andWhere('id', req.params.id).del().then(function () {
      res.redirect('/posts/'+req.params.post_id+'/comments')
    })
})




module.exports = router;
