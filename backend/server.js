// config
const app = require('./app');
const cloudinary = require('cloudinary');

// handling uncaught exception
process.on("uncaughtException", err=>{
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1)
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
  

// connecting to databse
const connectToDatabse = require('./config/database')
connectToDatabse();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})


const server =app.listen(process.env.PORT, ()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`);
})

// handling unhandled promise rejection
process.on('unhandledRejection', err=>{
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1)
    })
})