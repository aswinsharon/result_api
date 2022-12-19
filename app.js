const express = require('express');

const {MongoClient} = require('mongodb');
const port = 8081;
const uri = 'mongodb://127.0.0.1:27017/resultsDB';
const app = express();
const client = new MongoClient(uri);

app.use(express.urlencoded({
    extended: true
}));
try{
    client.connect();
}catch(e){
    console.error(e)
}

app.route("/")
.get( (req,res)=>{
    res.json({"message":"Welcome to final examination results,we wish your scores to be more than you expected"})
})
app.route("/marks/:_id")
    .get(async(req, res) => {

            const result = await client.db('resultsDB').collection('marks').findOne({_id:parseInt(req.params._id)});
            console.log(req.params);
            if (result) {
                res.json(result)
            } else {
                console.log(result)
                res.json({
                    "message": "result not found"
                })
            }

        })


// app.get('/',function(req,res){
//     res.send({"message":"success"})
// })
app.listen(port,function(){
   console.log(`server started at port ${port}`)
})
