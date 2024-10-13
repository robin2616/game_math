const express=require('express');
const app = express();
const mongoose=require('mongoose');
const port=3000;
const cors=require('cors');
 const bodyParser=require('body-parser');
console.log("hello world");
 app.use(cors());
 app.use(bodyParser.json());

main().catch(err=>console.log(err))
async function main(){
    await mongoose.connect('mongodb+srv://robinkumardbg11:aPTJ!E8LbWEgZZf@first.qxoadwq.mongodb.net/game?retryWrites=true&w=majority&appName=First')
    console.log("db connected")
}

const userschema = new mongoose.Schema({
    name:Array,
    score:Array,
    iden:Number
});

const User= mongoose.model('User', userschema);
app.post('/user',async(req, res)=>{
    const m=await User.findOne({iden:2616})
    m.name=[...m.name,req.body.username];
    const rob=await m.save();
    res.json(m)
})

 app.post('/store',async(req, res)=>{
    const m=await User.findOne({iden:2616})
    m.score=[...m.score,req.body.s];
    const rob=await m.save();
    res.json(m)
})

app.post('/stat',async(req, res)=>{
    const m=await User.findOne({iden:2616})
    res.json(m)
})



app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});