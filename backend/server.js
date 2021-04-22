const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');
const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE list(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY(id)
)`,(err,results,fileds) =>{
    console.log("errrr",err)
    console.log('results',results)
})


app.get('/api/values',function(req,res){
    db.pool.query('SELECT * FROM lists',
    (err,results,fileds)=>{
        if(err)
            return res.status(500).send(err);
        else
            return res.json(results);

    })
})

app.post('/api/value',function(req,res,next){
    console.log(req.body.value)
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err,results,fileds)=>{
        console.log(err)
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success:true, value: req.body.value});

    })
})
console.log("asdfasdfasdfasdf",process.env.MYSQL_HOST)

app.listen(5000,()=>{
    console.log("실행 완료~");
})