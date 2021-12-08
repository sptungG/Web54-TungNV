const router = require("express").Router();
// api/auth
const authController = require("./auth.controller");
// Signup
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;
