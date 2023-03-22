const User = require('../Models/Users')
const asyncHandler = require('express-async-handler');
const { createToken } = require("../MiddleWare/jwt")


const register = asyncHandler(async (req, res) => {
  try {
    const { email, walletAddress, bio, password } = req.body;
    const user = new User({ email, walletAddress, bio, password });
    await user.save();
    const token = createToken(user.id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
const login = asyncHandler( async (req, res) => {
  try {
    const { walletAddress, password } = req.body;
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(400).json({ error: "Wallet address not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = createToken(user.id);

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const checkUser = asyncHandler (async (req, res) => {
  console.log(req.body)
  try {
    const { walletAddress } = req.params;
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ error: "Wallet address not found" });
    }

    res.json({ userExists: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = {
  register,
  login,
  checkUser
}