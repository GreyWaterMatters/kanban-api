const express = require('express');
const router = require('./router');

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());

app.use(router);

const start = () => {
    app.listen(port, () => console.log(`App running on http://localhost:${port}`));
};

module.exports = { start };