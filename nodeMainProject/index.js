//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors')
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));



//Database Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", function (error) {
    console.log("error");
});
db.once("open", function () {
    console.log("Connected to the Database");
});



//middlewares

app.use(express.json());
app.use(cors())

//routes prefix
app.use("", require("./routes/book"));
app.use("", require("./routes/user"));

//Server Connection

app.listen(PORT, (req, res) => {
    console.log(`Server running on http://localhost:${PORT}`);
});