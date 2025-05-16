const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000

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



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

         const database = client.db('usersdb');
         const userCollection = database.collection('users');


        //  for reading data 
        app.get('/users',async(req,res) =>{
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        // got to locahost and user /users 

        //  data sendin on server 
        app.post('/users',async(req,res) => {
            console.log(req.body)
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })

        app.delete('/users/:id', async(req,res) =>{
            console.log(req.params)
            const id =req.params.id;
            // ei khane id just number , kintu id k object diye ref kore rakhe jeta database 
            // gele dekhs jabe 
            const query =  {_id: new ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        } ) 


        // connection check kore commment kore dilam 
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        //   finally function clear kore dilam mongo theke ene.
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`app is running on ${port}`)
})
