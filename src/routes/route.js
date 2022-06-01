const express = require('express');
const externalModule = require('./logger')

const router = express.Router();

router.get('/test-me', function (req, res) {
    
    console.log('The current batch is '+externalModule.batch)
    externalModule.welcome()
    res.send('welcome to my application. i am kishan singh and a part of Function Up Redon Cohort')
});

router.get('/test-me1', function (req, res) {
    res.send('My second welcome to my application. i am kishan singh and a part of Function Up Redon Cohort ')
});

router.get('/test-me2', function (req, res) {
    res.send('My 2nd line welcome to my application. i am kishan singh and a part of Function UpREdon Cohort')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th welcome to my application. i am kishan singh and a part of Function UpREdon Cohort')
});

router.get('/test-me4', function (req, res) {
    res.send('My last welcome to my application. i am kishan singh and a part of Function UpREdon Cohortnode')
});

module.exports = router;
// adding this comment for no reason