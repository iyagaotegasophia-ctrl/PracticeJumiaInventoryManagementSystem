const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String,
        enum: ['superadmin', 'storekeeper', 'salesperson', 'user'], //Define the allowed roles
        default: 'user'},
    HasAdminAccess: {type: Boolean,default: false}
},
{timestamps: true} //Date Created, modified and updated at
);

//Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User; //export the model to be used in other files