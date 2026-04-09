import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { type Request, type Response, type CookieOptions } from "express";
import { User } from "../models/user.model.ts";
import mongoose from "mongoose";
import { OTP } from "../models/otp.model.ts";
import { sendEmail } from "../utils/SendOTP.ts";


// Function for Generate Access Token
const generrateToken = async (id: mongoose.Types.ObjectId) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "SomeThing Went Wrong While Generating Access and Rreferesh Token");
  }
}


// Signup methode...
const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;

  // Validate the user input
  if (!fullname || !email || !password) throw new ApiError(400, "All fields are required");

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  // Create the user
  const user = await User.create({
    fullname,
    email: email.toLowerCase(),
    password,
  })

  const { accessToken, refreshToken } = await generrateToken(user._id)
  // sending cookies
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  // Secure Cookie
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        loggedInUser,
        "User signed up successfully"
      )
    );
});

// signin methode...
const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate the user input
  if (!email || !password) throw new ApiError(400, "All fields are required");

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // Check if the password is correct
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Invalid password");

  // Generate tokens
  const { accessToken, refreshToken } = await generrateToken(user._id)

  // sending cookies
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken").populate("urls")
  // Secure Cookie
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        loggedInUser,
        "User signed in successfully"
      )
    );
})

// Logout methode...
const logout = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  )

  // Secure Cookie
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {},
        "User logged out successfully"
      )
    );
})

// Get Current User methode...
const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken")

  // check if the user exists
  if (!user) throw new ApiError(404, "User not found");

  // populate the user's urls
  await user.populate("urls")

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "User fetched successfully"
      )
    )
})

// Delete Account methode...
const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.user?._id)

  // Secure Cookie
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {},
        "User deleted successfully"
      )
    );
})

/**
 * Forget Password Step...
 */
// STEP 1 -> send OTP methode...
const sendOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  // Validate the user input
  if (!email) throw new ApiError(400, "Email is required");

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // Generate OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  // Save OTP in user document
  const createdOTP = await OTP.create({
    otp: otpCode.toString(),
    email,
  })

  // Send OTP to user
  // await sendMail(email, "OTP", `Your OTP is ${otpCode}`);
  const emailSent = await sendEmail({
    to: email,
    subject: "OTP For Forget Password",
    otp: otpCode,
  })

  if (!emailSent) throw new ApiError(500, "Failed to send OTP");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          createdOTP
        },
        "OTP sent successfully"
      )
    );
});

// STEP 2 -> Verify OTP methode...
const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // Validate the user input
  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // Check if the OTP is correct
  const isOTPValid = await OTP.findOne({ email, otp });
  if (!isOTPValid) throw new ApiError(401, "Invalid OTP");

  // Delete OTP
  await OTP.deleteOne({ email, otp });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "OTP verified successfully"
      )
    );
});

// STEP 3 -> Reset Password methode...
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate the user input
  if (!email || !password) throw new ApiError(400, "Email and password are required");

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // Update password
  user.password = password;
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset successfully"
      )
    );
})


export {
  signup,
  signin,
  logout,
  getCurrentUser,
  deleteAccount,
  sendOTP,
  verifyOTP,
  resetPassword,
};
