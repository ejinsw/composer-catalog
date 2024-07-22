const pool = require('./pool')

async function getComposersCount() {
    try {
        const result = await pool.query("SELECT count(*) FROM composers")
        console.log(result)
        return result.rows[0].count;
    } catch (error) {
        console.log("Error executing query", error);
        throw error;
    }
}

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

async function addComposer(firstName, lastName, bio, dob, dod, era) {
    try {
        pool.query("INSERT INTO composers (first_name, last_name, bio, birth_date, death_date, era) VALUES (($1), ($2), ($3), ($4), ($5), ($6));", [firstName, lastName, bio, dob, dod, era])
    } catch (error) {
        console.log("Error adding composer", error)
        throw error
    }
}

async function deleteComposer(id) {
    try {
        await pool.query("DELETE FROM pieces WHERE composer_id = ($1)", [id])
        await pool.query("DELETE FROM composers WHERE id = ($1)", [id])
    } catch (error) {
        console.log("Error adding composer", error)
        throw error
    }
}

async function updateComposer(firstName, lastName, bio, dob, dod, era, id) {
    try {
        pool.query("UPDATE composers SET first_name = ($1), last_name = ($2), bio = ($3), birth_date = ($4), death_date = ($5), era = ($6) WHERE id = ($7);", [firstName, lastName, bio, dob, dod, era, id])
    } catch (error) {
        console.log("Error adding composer", error)
        throw error
    }
}

async function getPieceCount() {
    try {
        const result = await pool.query("SELECT count(*) FROM pieces")
        console.log(result)
        return result.rows[0].count;
    } catch (error) {
        console.log("Error executing query", error);
        throw error;
    }
}

async function getAllPieceNames() {
    try {
        const result = await pool.query("SELECT title, composer_id, id FROM pieces")
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

async function addPiece(title, composer_id, composition_date, era, description) {
    try {
        pool.query("INSERT INTO pieces (title, composer_id, composition_date, era, description) VALUES (($1), ($2), ($3), ($4), ($5));", [title, composer_id, composition_date, era, description])
    } catch (error) {
        console.log("Error adding piece", error)
        throw error
    }
}

async function deletePiece(id) {
    try {
        await pool.query("DELETE FROM pieces WHERE id = ($1)", [id])
    } catch (error) {
        console.log("Error deleting piece", error)
        throw error
    }
}

async function updatePiece(title, composer_id, composition_date, era, description, id) {
    try {
        pool.query("UPDATE pieces SET title = ($1), composer_id = ($2), composition_date = ($3), era = ($4), description = ($5) WHERE id = ($6);", [title, composer_id, composition_date, era, description, id])
    } catch (error) {
        console.log("Error adding composer", error)
        throw error
    }
}

module.exports = {
    getComposersCount,
    getAllComposerNames,
    getComposerDetail,
    getComposerPieces,
    getPieceCount,
    getAllPieceNames,
    getPieceDetail,
    addComposer,
    deleteComposer,
    addPiece,
    deletePiece,
    updateComposer,
    updatePiece
}