const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config();


const app = express();
const port = process.env.port || 5000;

app.use(cors())
app.use(express.json());

//
//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gyop3ad.mongodb.net/?retryWrites=true&w=majority;`
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    await client.connect();
    console.log("database connected")
}

app.listen(5000, () => console.log('server up and running'))