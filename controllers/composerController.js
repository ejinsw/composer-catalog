const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')
const { DateTime } = require('luxon')


exports.index = asyncHandler(async (req, res, next) => {
    const composersCount = await queries.getComposersCount();
    const pieceCount = await queries.getPieceCount();

    res.render('layout', { title: 'Composers Catalog', content: 'index', composersCount: composersCount, pieceCount: pieceCount });
})

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

exports.addComposer = asyncHandler(async (req, res, next) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const bio = req.body.bio;
    const birthDate = req.body.birth_date;
    const deathDate = req.body.death_date;
    const era = req.body.era;

    await queries.addComposer(firstName, lastName, bio, birthDate, deathDate, era);

    res.redirect('/composers');
})

exports.deleteComposer = asyncHandler(async (req, res, next) => {
    const id = req.body.composer_id;

    await queries.deleteComposer(id)
    
    res.redirect('/composers')
})