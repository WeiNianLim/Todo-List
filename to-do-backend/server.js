const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || process.argv[2] || 8080
const cors = require('cors')
const indexRouter = require('./routes/index')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', indexRouter)

const URL = "mongodb://localhost:27017/db"
mongoose.connect(URL, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /data/db/")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

