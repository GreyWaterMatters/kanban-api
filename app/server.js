const multer = require('multer');
const upload = multer();
const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.static('public'));

app.use(cors());
app.use(upload.array());
app.use((req, res, next) => {
    console.log('Server received ', req.body);
    next();
});

app.use(express.json());

app.use(router);

const start = () => {
    app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
};

module.exports = { start };