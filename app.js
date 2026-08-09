const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const productRoute = require('./Routes/ProductRoute');

dotenv.config(); //load environment variables from .env file
connectDB(); //connect to mongoDB

app.use(express.json()); //middleware to parse JSON request bodies

app.use('/products', productRoute); //use the product route for all requests starting with /products

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});