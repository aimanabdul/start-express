const { verifySignUp } = require("../middleware");
const authController = require("../controllers/auth.controller");
const router = require("express").Router();


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmailOrPhoneNumber,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
};
