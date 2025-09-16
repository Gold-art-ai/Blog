const  User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) =>{
    try {
        const {username, email, password, role} = req.body;
        const existing  = await User.findOne({email});
        if (existing) return res.status(404).json({message: "User already exists!"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password:hashedPassword,
            role: role || "user"
        });
        await user.save();
        res.status(201).json({message: "User created successfully", user});


    }catch (err){
        res.status(500).json({error: err.message});
    }
 };
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign( { id: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "1h" });

    res.json({message: "Login Successful",token,user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req,res) => {
 try {
    const users = await User.find().select("-password");
    res.json(users);
 }catch(err){
    res.status(500).json({error: err.message});
 }
};
