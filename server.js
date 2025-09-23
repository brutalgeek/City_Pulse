const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get("/api/assets/:filename", (req, res) => {
        res.sendFile(`${__dirname}/src/assets/${req.params.filename}`);
    });

    server.use((req, res) => {
        return handler(req, res);
    });

    const PORT = 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server started on http://localhost:${PORT}`);
    });
});