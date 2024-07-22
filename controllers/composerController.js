const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')
const { DateTime } = require('luxon')


exports.composerList = asyncHandler(async (req, res, next) => {
    const composers = await queries.getAllComposerNames()

    res.render('layout', { title: 'Composers Catalog', content: 'composerList', composers: composers });
})

exports.composerDetail = asyncHandler(async (req, res, next) => {
    const composers = await queries.getComposerDetail(req.params.id);
    const pieces = await queries.getComposerPieces(req.params.id);

    composers[0].birth_date = DateTime.fromJSDate(composers[0].birth_date).toLocaleString(DateTime.DATE_MED)
    composers[0].death_date = DateTime.fromJSDate(composers[0].death_date).toLocaleString(DateTime.DATE_MED)

    res.render('layout', { title: 'Composers Catalog', content: 'composerDetail', composer: composers[0], pieces: pieces });
})