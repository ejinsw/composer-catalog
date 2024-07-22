const pool = require('./pool')

async function getAllComposerNames() {
    try {
        const result = await pool.query("SELECT first_name, last_name, id FROM composers")
        return result.rows;
    } catch (error) {
        console.log("Error executing query", error);
        throw error;
    }
}

async function getComposerDetail(composerId) {
    try {
        const result = await pool.query("SELECT * FROM composers WHERE id = ($1);", [composerId])
        return result.rows;
    } catch (error) {
        console.log("Error executing query", error);
        throw error;
    }
}

async function getComposerPieces(composerId) {
    try {
        const result = await pool.query("SELECT * FROM pieces WHERE composer_id = ($1);", [composerId])
        return result.rows;
    } catch (error) {
        console.log("Error executing query", error);
        throw error;
    }
}

async function getPieceDetail(pieceId) {
    try {
        const result = await pool.query("SELECT * FROM pieces WHERE id = ($1);", [pieceId])
        return result.rows;
    } catch (error) {
        console.log("Error executing query", error);
        throw error;
    }
}


module.exports = {
    getAllComposerNames,
    getComposerDetail,
    getComposerPieces,
    getPieceDetail
}