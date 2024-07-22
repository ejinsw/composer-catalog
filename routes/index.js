var express = require('express');
var router = express.Router();

const composerController = require('../controllers/composerController')
const pieceController = require('../controllers/pieceController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', { title: 'Composers Catalog', content: 'index' });
});

router.get('/composers', composerController.composerList);
router.get('/composers/:id', composerController.composerDetail);

router.get('/composers/:composer_id/pieces/:piece_id', pieceController.pieceDetail);

module.exports = router;
