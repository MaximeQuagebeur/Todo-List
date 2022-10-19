
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = require('./app/router');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const mutipartParser = multer();
app.use(mutipartParser.none());

app.use(router);

app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});
