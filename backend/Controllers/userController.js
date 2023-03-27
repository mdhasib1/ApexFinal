const asyncHandler = require("express-async-handler");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utlis/sendEmail");
const env = require('dotenv');

env.config()

// Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { address, name, email, password } = req.body;

    // Validation
    if (!address || !name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }
  
    // Check if user email already exists
    const userExists = await User.findOne({ address });
  
    if (userExists) {
      res.status(400);
      throw new Error("Address has already been registered");
    }

    // Make sure address field is not null or undefined
    if (!address) {
      res.status(400);
      throw new Error("Address field is required");
    }
  
    // Create new user
    const user = await User.create({
      address,
      name,
      email,
      password,
    });
  
    //   Generate Token
    const token = generateToken(user._id, user.role);
  
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  
    if (user) {
      const { _id, address, name, email, role, photo, phone, bio } = user;
      res.status(201).json({
        _id,
        address,
        name,
        email,
        photo,
        phone,
        bio,
        role,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error)
  }
});


// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { address, password } = req.body;

  // Validate Request
  if (!address || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({ address });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id, user.role);


  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, address, name, email, role, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      address,
      name,
      email,
      photo,
      phone,
      bio,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const {  _id,
      name,
      address,
      email,
      photo,
      phone,
      bio,
      role,
      token, } = user;
    res.status(200).json({
      _id,
      address,
      name,
      email,
      photo,
      phone,
      bio,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get User Data
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(req.users);
  

  if (users) { 
    res.status(200).json(
     {users}
    );
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

const getCreator = async (req, res) => {
  try {
    const users = await User.find({ role: "creator" });
    console.log(users)
    const numberOfCreator = users.length;
    res.status(200).json({ numberOfCreator });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { address,name, email, photo, phone, bio } = user;
    user.address = address;
    user.email = req.body.email || email ;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URI}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>PAW Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});


const checkUser = async (req, res) => {
  try {
    const { address } = req.params;
    const user = await User.findOne({ address });

    if (user) {
      res.json({ addressExists: true });
    } else {
      res.json({ addressExists: false });
    }
  } catch (error) {
    console.error('Error checking user address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = asyncHandler(async (req, res) => {
  console.log('Attempting to delete collection with ID:', req.params.id);
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id }); // Change this line
    res.json({ message: 'user deleted' });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  getUsers,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getCreator,
  checkUser,
  deleteUser
};
