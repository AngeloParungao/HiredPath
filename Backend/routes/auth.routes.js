const express = require("express");
const router = express.Router();
const {
  login,
  register,
  requestResetPassword,
  resetPassword,
  googleLogin,
} = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/google", googleLogin);
router.post("/register", register);
router.post("/request-reset", requestResetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
