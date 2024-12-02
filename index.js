require("dotenv").config();
const express = require("express");
const server = require("./server.js");

const serviceRoutes = require("./routes/app.routes.js");

const app=express();
app.use(express.json());
server.connect();

app.use("/routes",serviceRoutes);

app.get("/",(req,res)=>{
    res.status(200).send("API is running");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));