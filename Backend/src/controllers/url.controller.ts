import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { type Request, type Response } from "express";
import { URL } from "../models/url.model.ts";
import { User } from "../models/user.model.ts";


// create url methode for logged in user...
const createURL = asyncHandler(async (req: Request, res: Response) => {
  const { longUrl, customUrl } = req.body;

  // validate the user input
  if (!longUrl) throw new ApiError(400, "Long URL is required");

  // check if the user already exists
  const existingUser = await User.findById(req.user._id);
  if (!existingUser) throw new ApiError(404, "User not found");

  let urlCode;
  if (!customUrl) {
    // generate random url code untill it is not exist
    do {
      urlCode = Math.random().toString(36).substring(2, 8);
    } while (await URL.findOne({ urlCode }));
  } else {
    // check if the custom url already exists
    const existingUrl = await URL.findOne({ urlCode: customUrl });
    if (existingUrl) throw new ApiError(400, "Custom URL already exists");
    urlCode = customUrl;
  }

  // create the url
  const url = await URL.create({
    urlCode,
    longUrl,
    owner: req.user._id,
  });

  // update user's urls array
  existingUser.urls.push(url._id);
  await existingUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        url,
        "URL created successfully"
      )
    );
});

// create url methode for guest user...
const createURLForGuest = asyncHandler(async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  // validate the user input
  if (!longUrl) throw new ApiError(400, "Long URL is required");

  // generate random url code untill it is not exist
  let urlCode;
  do {
    urlCode = Math.random().toString(36).substring(2, 8);
  } while (await URL.findOne({ urlCode }));

  // create the url
  const url = await URL.create({
    urlCode,
    longUrl,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        url,
        "URL created successfully"
      )
    );
});

// Delete url methode for logged in user...
const deleteURL = asyncHandler(async (req: Request, res: Response) => {
  const { urlId } = req.params;


  // validate the user input
  if (!urlId) throw new ApiError(400, "URL ID is required");

  // check if the url exists
  const url = await URL.findById(urlId);
  if (!url) throw new ApiError(404, "URL not found");

  // check if the url belongs to the user
  if (url.owner?.toString() !== req.user._id.toString()) throw new ApiError(403, "You are not authorized to delete this URL");

  // delete the url
  await url.deleteOne();

  // update user's urls array
  const existingUser = await User.findById(req.user._id);
  if (!existingUser) throw new ApiError(404, "User not found");
  existingUser.urls = existingUser.urls.filter((url) => url.toString() !== urlId);
  await existingUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        url,
        "URL deleted successfully"
      )
    );
});

// Redirect url methode for all users...
const redirectURL = asyncHandler(async (req: Request, res: Response) => {
  const { urlCode } = req.params;

  // validate the user input
  if (!urlCode) throw new ApiError(400, "URL Code is required");

  // check if the url exists
  const url = await URL.findOne({ urlCode });
  if (!url) throw new ApiError(404, "URL not found");

  // increment the click count
  url.clicks++;
  await url.save({ validateBeforeSave: false });

  // returning the long url
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        url,
        "URL redirected successfully"
      )
    );
});

export {
  createURL,
  createURLForGuest,
  deleteURL,
  redirectURL,
};
