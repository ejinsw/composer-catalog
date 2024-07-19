const { Pool } = require('pg')

module.exports = new Pool({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    database: 'top_users',
    password: process.env.DATABASE_PASSWORD,
    port: 5432
})