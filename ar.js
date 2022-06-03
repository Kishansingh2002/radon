const express =require('express');
const lodash = require("lodash");
const route = express.Router();
 route.get('/hello2', function(req, res){
     let arr1 =['jan','feb','march','april','may','june','july','aug']
     console.log(lodash.chunk(arr1,4))
     let arr2=[1,3,5,7,9,11,13,15,17,19]
     console.log(lodash.tail(arr2))
     let pair ={}

     res.send('this is your api!')
 });

 //assimodule.exports=router
    