const express = require('express');

//import authentication middleware
const {verify} = require('../Middleware/auth');

//import our authorization middleware
const {authorize} = require('../Middleware/role');

const router = express.Router();

//import the product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', verify, authorize('superadmin'), productController.createProduct);

router.put('/updateproduct/:id', verify, authorize('superadmin'), productController.updateProduct);

router.get('/getallproducts', verify, productController.getProducts);

router.get('/getaproduct/:id', verify, productController.getProductById);

router.delete('/deleteaproduct/:id', verify, authorize('superadmin'), productController.deleteProduct);


//export the router to be used in other files
module.exports = router;
