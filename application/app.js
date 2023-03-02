const express = require('express');
const app = express()
const cors = require('cors')
const router = require('../routes/routes.js')
const mongoose = require('mongoose')
const config = require('../config')
const cookie_parser = require('cookie-parser')
require('dotenv').config()

const uri = config.mongo_uri;
console.log(uri)
mongoose.connect(uri)
app.use(express.urlencoded({
    extended:true
}))
app.set('view engine','ejs')
app.use(cors());
app.use(express.json());
app.use(cookie_parser())
app.use(router)
module.exports = app