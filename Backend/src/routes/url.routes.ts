import { Router } from "express";
import {
  createURL,
  createURLForGuest,
  deleteURL,
  redirectURL,
} from "../controllers/url.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router: Router = Router();

router.route("/generate").post(verifyJWT, createURL);
router.route("/generate-guest").post(createURLForGuest);
router.route("/:urlId").delete(verifyJWT, deleteURL);
router.route("/:urlCode").get(redirectURL);

export default router;

