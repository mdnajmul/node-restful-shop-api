//import express package
const express = require('express');

//create roter object
const router = express.Router();

//import users controller file
const UserController = require('../controllers/users');

//import check-auth middleware file
const checkAuth = require('../middleware/check-auth');


//signup/register users
router.post('/signup', UserController.user_signup);

//signin/login user
router.post('/login', UserController.user_login);

//delete users
router.delete('/:userId', checkAuth, UserController.user_delete);



//exports router object
module.exports = router;