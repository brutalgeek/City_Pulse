const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

const pool = require('./postgres');

app.prepare().then(() => {
    const server = express();

    server.use(express.json());
    server.use(cors());

    //ASSETS ROUTE
    server.get("/api/assets/:filename", (req, res) => {
        res.sendFile(`${__dirname}/src/assets/${req.params.filename}`);
    });




    //POSTGRES BACKEND ROUTES

    //create user
    server.post("/api/signup/admin", async(req, res) => {
        try {
            const { username, password } = req.body;
            const newUser = await pool.query(`INSERT INTO admins (username, password) VALUES('${username}', '${password}')`);
            res.json(newUser);
        } catch(err) {
            console.log(err.message);
        }
    });

    //user login

    //post issues dadw 

    //get issues



    //UNDECLARED ROUTES FOR NEXTJS HANDLING
    server.use((req, res) => {
        return handler(req, res);
    });

    const PORT = 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server started on http://localhost:${PORT}`);
    });
});

//laltu