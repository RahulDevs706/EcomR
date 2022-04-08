const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const errorMiddleWare = require('./middleware/Error')
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUploader());

// route imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')

app.use('/api', product);
app.use('/user', user)
app.use('/api', order)
app.use('/api', payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// middleware for error handling
app.use(errorMiddleWare);


module.exports = app