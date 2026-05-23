import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { validateBody } from "../middleware/validation.js";
import { RegisterDto, LoginDto, VerifyEmailDto, ResendVerificationDto } from "../dtos/auth.dto.js";
import { authLimiter } from "../config/rate-limit.js";
import {
  register,
  login,
  verifyEmail,
  resendVerification,
  logout,
  getUser,
  getConfig,
  googleCallback,
} from "../controllers/auth.controller.js";

const router = Router();

router.use(authLimiter);
router.post("/register", validateBody(RegisterDto), register);
router.post("/login", validateBody(LoginDto), login);
router.post("/verify-email", validateBody(VerifyEmailDto), verifyEmail);
router.post("/resend-verification", validateBody(ResendVerificationDto), resendVerification);
router.post("/logout", logout);
router.get("/user", getUser);
router.get("/config", getConfig);

router.get("/google", (req: Request, res: Response, next: NextFunction) => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientID || !clientSecret) {
    return res.redirect("/auth?error=google_not_configured");
  }
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth?error=google_failed",
  }),
  googleCallback,
);

export default router;
