var express = require('express');
var router = express.Router();

const composerController = require('../controllers/composerController')
const pieceController = require('../controllers/pieceController')

/* GET home page. */
router.get('/', composerController.index);

router.get('/composers', composerController.composerList);
router.post('/composers/add', composerController.addComposer)
router.post('/composers/delete', composerController.deleteComposer)

router.get('/composers/:id', composerController.composerDetail);

router.get('/composers/:composer_id/pieces/:piece_id', pieceController.pieceDetail);

router.get('/pieces', pieceController.pieceList)
router.post('/pieces/add', pieceController.addPiece)
router.post('/pieces/delete', pieceController.deletePiece)

module.exports = router;
