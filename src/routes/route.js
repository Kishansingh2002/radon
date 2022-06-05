const express = require('express');
const router = express.Router();
const useModel= require("./userModel");

const UserController=require("../routes/userController");


router.post('/CreateUser', UserController.creater);
router.get('/getAllUsers', UserController.getUserData);

module.exports = router;




