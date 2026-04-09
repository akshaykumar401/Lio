import { Router } from "express";
import {
  signup,
  signin,
  logout,
  getCurrentUser,
  deleteAccount,
  sendOTP,
  verifyOTP,
  resetPassword,
} from "../controllers/user.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router: Router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/delete-account").delete(verifyJWT, deleteAccount);
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);
router.route("/reset-password").patch(resetPassword);


export default router;

