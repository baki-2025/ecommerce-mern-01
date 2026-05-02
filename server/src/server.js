const express = require('express');
const morgan = require('morgan')
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const isLoggedIn = (req,res,next)=> {
    const login = true;
    if(login){
       req.body.id = 101;
       next()
    }else{
      return res.status(401).send({"message": "Unauthorized"});  
    }
    
};

app.use(isLoggedIn);

app.get('/test',(req,res)=>{
res.status(200).send({"message": "API is working for GET request"});
});

app.get('/api/user',isLoggedIn,(req,res)=> {
    console.log(req.body.id);
  res.status(200).send({"message": "user profile is working "});
});






app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});