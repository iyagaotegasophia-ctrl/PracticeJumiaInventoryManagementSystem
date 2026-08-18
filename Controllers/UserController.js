const User = require('../Models/Users');
const bcrypt = require('bcryptjs'); // or 'bcrypt'


//create a new user
exports.createUser = async (req, res) => {
    try {
        //request body
        const {name, address, email, password, gender, phone, role, HasAdminAccess} = req.body;

        //check if all required fields are provided
        if (!req.body.name || !req.body.address || !req.body.email || !req.body.password || !req.body.gender || !req.body.phone) {
            return res.status(400).json({message: 'Please provide all required fields.'});
        }

        //email check
        const existingEmail = await User.findOne({email: req.body.email}); //User before findOne here acts as the db bcos its the model?
        if (existingEmail) {
            return res.status(400).json({message: 'Email already exists.'});
        }
        
        //phone number check
        const existingPhone = await User.findOne({phone: req.body.phone}); //User before findOne here acts as the db bcos its the model?
        if (existingPhone) {
            return res.status(400).json({message: 'Phone Number already exists.'});
        }

        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = new User({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            phone: req.body.phone,
            role: req.body.role || 'user', //Default role is 'user' if not provided
            HasAdminAccess: req.body.HasAdminAccess || false //Default is false if not provided
            });

        await user.save();
        res.status(201).json({message: 'User created successfully', user});
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message});
    }
};

//Login User
exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({message: 'Please provide all required fields.'});
        }

        //Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        //Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid Password'});
        }

        //Generate a token (you can use JWT or any other method)
        //const token = generateToken(user); //Implement your token generation logic here

        const jwt = require('jsonwebtoken');
        const token = jwt.sign({id: user._id, email: user.email, name: user.name, role: user.role, HasAdminAccess: user.HasAdminAccess}, process.env.JWT_SECRET, {expiresIn: '1h'}); //Don't include sensitive information; can be decryted

        res.status(200).json({message: 'Login successful', token, role: user.role});
    } catch(error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
};

//Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // assuming user ID is passed in the URL

        //Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Delete user
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
