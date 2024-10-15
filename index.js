const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://sujon-portfolio.surge.sh'
    ],
    credentials: true
}))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://new-portfolio:XC2qkz1afh4RDmJr@atlascluster.aasa6jh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

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


        const contactColection = client.db('portfolio-websid').collection('user')


        app.post('/contactus', async (req, res) => {
            const data = req.body;
            const result = await contactColection.insertOne(data);
            res.send(result);

        })
        app.get('/contactuser', async (req, res) => {
            const result = await contactColection.find().toArray()
            res.send(result)
        })



        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
  
    }
  }
  run().catch(console.dir);
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })