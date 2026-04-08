import { Router } from "express";
import {
  signup,
  signin,
  logout,
  getCurrentUser,
} from "../controllers/user.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router: Router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser);


export default router;

