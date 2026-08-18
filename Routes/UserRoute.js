const express = require('express');
const router = express.Router();

//import the product controller
const userController = require('../Controllers/UserController');

//define the routes
router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);
router.delete('/deleteuser/:id', userController.deleteUser);

//export the router to be used in other files
module.exports = router;