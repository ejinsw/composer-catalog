const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')
const { DateTime } = require('luxon')

exports.pieceList = asyncHandler(async (req, res, next) => {
    const pieces = await queries.getAllPieceNames()
    const composers = await queries.getAllComposerNames()

    res.render('layout', { title: 'Composers Catalog', content: 'pieceList', pieces: pieces, composers: composers });
})

exports.pieceDetail = asyncHandler(async (req, res, next) => {
    const composer = await queries.getComposerDetail(req.params.composer_id)
    const piece = await queries.getPieceDetail(req.params.piece_id)

    piece[0].composition_date = DateTime.fromJSDate(piece[0].composition_date).toLocaleString(DateTime.DATE_MED)

    res.render('layout', { title: 'Composer Catalog', content: 'pieceDetail', piece: piece[0], composer: composer[0] })
})

exports.addPiece = asyncHandler(async (req, res, next) => {
    const title = req.body.title;
    const composer_id = req.body.composer_id;
    const composition_date = req.body.composition_date;
    const description = req.body.description;
    const era = req.body.era;

    await queries.addPiece(title, composer_id, composition_date, era, description);

    res.redirect('/pieces');
})

exports.deletePiece = asyncHandler(async (req, res, next) => {
    const id = req.body.id;

    await queries.deletePiece(id)
    
    res.redirect('/pieces')
})