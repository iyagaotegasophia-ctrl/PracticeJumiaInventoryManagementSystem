const Product = require('../Models/Products');

// //create a new product; creating and exporting 
// const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// };

// module.exports = {createProduct};

//create a new product; exporting directly
exports.createProduct = async (req, res) => {
    try {
        const {name, size, description, price, quantity, color} = req.body;
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({message: 'Please provide all required fields.'});
        }
        
        const product = new Product({
            name,
            size,
            description,
            price,
            quantity,
            color
        });

        await product.save();
        res.status(201).json({message: 'Product created successfully', product});
    } catch (error) {
        res.status(500).json({message: 'Error creating product', error: error.message});
    }
};

//update a product
exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params; //where id is the product id to be updated
        const {name, size, description, price, quantity, color} = req.body;

        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({message: 'Please provide all required fields.'});
        }

        const product = await Product.findByIdAndUpdate(
            id, {name, size, description, price, quantity, color}, {new: true} // ensures the updated document is returned
        );
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product updated successfully', product});

    }
    catch (error) {
        res.status(500).json({message: 'Error updating product', error: error.message});
    }
};