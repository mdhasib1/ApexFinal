const express = require("express");
const router = express.Router();
const {
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
  checkUser,
  deleteUser
} = require("../controllers/userController");
const {protect,admin} = require("../middleWare/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/getusers",  protect, getUsers);
router.get("/loggedin", loginStatus);
router.get("/check/:address", checkUser);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.delete('/:id', deleteUser);

module.exports = router;
