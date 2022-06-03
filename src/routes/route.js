const express = require('express');
const res = require('express/lib/response');
//const myHelper = require('../util/helper')
//const underscore = require('underscore')

const router = express.Router();

router.get('/hello', function (req, res) {
    let _ = require("lodash");
    let arr = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'];
    console.log("Before: ", arr)
    

    // Making chunks of size 3
    console.log("After: ", _.chunk(arr, 3))
    
  



    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


    const odds = arr1.filter(number => {
        return number % 2 !== 0;
    });

    console.log(_.tail(odds));






//const _ = require("lodash");  

// Use of _.union() method 
    let gfg = _.union([20, 12, 6, 15], [8, 15, 6], [6, 8, 9], [9, 8, 5], [9, 6, 7]);
// Printing the output  
    console.log(gfg)
// const _ = require('lodash');

    let pairs = [['x', 1], ['y', 2], ['z', 3]]

    let obj = _.fromPairs(pairs);

    console.log(obj)
});


module.exports = router;
// adding this comment for no reason

