const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const http = require('http');

var emailRouter = require('./emailRouter');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(express.static(path.join(__dirname, '../dist/buro-service')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/buro-service/index.html'));
});

app.use(bodyParser.json());
app.use('/email', emailRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});