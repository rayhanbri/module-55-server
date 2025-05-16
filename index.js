const express = require('express')
const app = express()
const cors = require ('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT || 3000

// middleware 
app.use(cors())
app.use(express.json())


// user: module55server
// pass: QQ1ar7mV16tPAsNr


const uri = "mongodb+srv://module55server:QQ1ar7mV16tPAsNr@cluster0.eztfylz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




app.get('/',(req,res) =>{
    res.send('server is running')
})

app.listen(port,() => {
    console.log(`app is running on ${port}`)
})
