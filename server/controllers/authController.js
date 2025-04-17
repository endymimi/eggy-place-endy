import USER from "../models/userModel.js";
import { sendForgotPasswordMail } from "../emails/emailHandlers.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// sign up

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, cPassword } = req.body;
  if (!email || !password || !firstName || !lastName || !cPassword) {
    res.status(400).json({
      success: false,
      errMsg: "all fields are required for registration",
    });
    return;
  }

  if (password !== cPassword) {
    res.status(400).json({ success: false, errMsg: "password do not match" });
    return;
  }
  
  if (password.length < 8) {
    res
    .status(400)
    .json({ success: false, errMsg: "min password length must be 8 chrs" });
    return;
  }

  try {
    const existingEmail = await USER.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ success: false, errMsg: "Email already exists" });
      return;
    }
    
    const user = await USER.create({ ...req.body });
    res
    .status(201)
    .json({ success: true, message: "registration successful", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, errMsg: "all fields are required to sign in" });
      return;
    }
    // finding a registered email address
    const user = await USER.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, errMsg: "user not found" });
      return;
    }

    // comparing password and validating password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, errMsg: "Email or password is incorrect" });
      return;
    }
    // generating token
    const token = await user.generateToken();
    if (token) {
      res.status(200).json({
        success: true,
        message: "signed in successfully",
        user: {
          role: user.role,
          firstName: user.firstName,
          _id: user._id,
          token,
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(400).json({ success: false, errMsg: "email is required" });
      return;
    }

    const user = await USER.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, errMsg: "email not found" });
      return;
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();
    res.status(201).json({ success: true, message: "mail sent" });
    const resetUrl = process.env.CLIENT_URL_RESET + resetToken;
    try {
      await sendForgotPasswordMail({
        to: user.email,
        firstName: user.firstName,
        resetUrl,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({errMsg:"Email could not be sent", error})
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// reset password ftn
export const resetPassword = async (req,res)=>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  try {
    const user = await USER.findOne({
      resetPasswordToken,
      resetPasswordExpire :{$gt:Date.now()}
    })
    if(!user){
      res.status(400).json({status:false, errMsg:"invalid reset token"});
      return;
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(201).json({success:true,message:"Password Reset successful"})
  } catch (error) {
    res.status(500).json(error.message);

  }
}

// isLoggedIn ftn
export const isLoggedIn = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, errMsg: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await USER.findById(decoded.userId).select("firstName role email");

    if (!user) {
      return res.status(404).json({ success: false, errMsg: "User not found" });
    }

    res.status(200).json({
      success: true,
      user, 
    });
  } catch (error) {
    // console.error("isLoggedIn error:", error);
    res.status(401).json({ success: false, errMsg: "Invalid token" });
  }
};