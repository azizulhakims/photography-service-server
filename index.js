const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

//server connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gyop3ad.mongodb.net/?retryWrites=true&w=majority;`
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function dbConnect() {
    try {
        await client.connect();
        console.log("database connected")
    }
    catch (error) {
        console.log(error.name, error.message, error.stack)
    }
}
dbConnect();
const Service = client.db("photography").collection("services")
const User = client.db("photography").collection("users")
//endpoint
app.post('/services', async (req, res) => {
    // res.send("here is your data");
    try {
        const result = await Service.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: `Successfully create the service ${req.body.name} with id ${result.insertedId}`
            });
        } else {
            res.send({
                success: false,
                error: "Couldn't create the service"
            });
        }
    }
    catch (error) {
        console.log(error.name, error.message);
        res.send({
            success: false,
            error: error.message
        });
    }
    // console.log(result)
});
app.get("/services", async (req, res) => {
    try {
        const cursor = Service.find({});
        const service = await cursor.toArray();
        res.send({
            success: true,
            message: "Successfully got the data",
            data: service
        });
    }
    catch (error) {
        console.log(error.name, error.message);
        res.send({
            success: false,
            error: error.message
        });
    }
});



app.listen(5000, () => console.log('server up and running'))


