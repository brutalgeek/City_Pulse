const Pool = require('pg').Pool;

const pool = new Pool({
    user: "citypulsepgadmin",
    password: "pgadmin",
    host: "localhost",
    port: 5432,
    database: "citypulse"
});

module.exports = pool;