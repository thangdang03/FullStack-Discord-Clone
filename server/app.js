const express = require("express");
const dotEvn = require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const { urlClient } = require("./config/conn.common");
require("./helmet/createStrategy");
require("./database/init.dbs");

app.use(cors({
    origin: urlClient,  
    credentials: true,
    methods:["GET","POST","PUT","DELETE","PATH"]
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.static("./uploads"));
const router = require("./routers/index");
router(app);



module.exports = app;