import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { type Request, type Response, type CookieOptions } from "express";
import { User } from "../models/user.model.ts";
import mongoose from "mongoose";

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
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
      )
    )
})

export {
  signup,
  signin,
  logout,
  getCurrentUser,
};
