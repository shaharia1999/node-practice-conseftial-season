const express =require('express');
const { get } = require('express/lib/request');

const app=express();
// const cors=require('cors')
const port=process.env.PORT ||5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');


// middleWare
// app.use(cors())
app.use(express.json());
const uri = "mongodb+srv://dbuser1:hXYRbImf5rpko23f@cluster0.rykcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
   
    try{
        await client.connect();
        const collection=client.db('geniousCar').collection('service');
        // fet method
       app.get('/service',async(req,res)=>{
            const query={};
           const cursor=collection.find(query);
           const services=await cursor.toArray();
           res.send(services) 
        });
         /// http://localhost:5000/service
         /**
          * dataFormet
          * {
                    "userName":"Rahim",
                    "description":"Post method is Activet"
            }   
        */
       // post method
        app.post('/service',async(req,res)=>{
            const data=req.body;
            console.log(data);
            const result=await collection.insertOne(data)
            res.send(result);


        })
        // put method
        app.put('/service/:id',async(req,res)=>{
            const id=req.params.id;
            const data=req.body;
            console.log(data);
            const filter = { _id:ObjectId(id)  };
            const options = { upsert: true };
            const updateDoc = {
                $set: {...data},
              };
              const result = await collection.updateOne(filter, updateDoc, options);
            res.send(result);


        })
        // delete api
        app.delete('/service/:id',async(req,res)=>{
            const id=req.params.id;
            const filter={_id:ObjectId(id)};
            const result = await collection.deleteOne(filter);
            res.send(result);

        })
     

    }finally{

    }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Hellow World')
});

app.listen(port,()=>{
    console.log('The listion location',port)
})



