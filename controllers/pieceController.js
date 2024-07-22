const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')
const { DateTime } = require('luxon')

exports.pieceDetail = asyncHandler(async (req, res, next) => {
    const composer = await queries.getComposerDetail(req.params.composer_id)
    const piece = await queries.getPieceDetail(req.params.piece_id)

    piece[0].composition_date = DateTime.fromJSDate(piece[0].composition_date).toLocaleString(DateTime.DATE_MED)

    res.render('layout', { title: 'Composer Catalog', content: 'pieceDetail', piece: piece[0], composer: composer[0] })
})