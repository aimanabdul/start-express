const { authJwt } = require("../middleware");
const testController = require("../controllers/test.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", testController.allAccess);

  app.get(
    "/user",
    [authJwt.verifyToken],
    testController.userBoard
  );

  app.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    testController.moderatorBoard
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    testController.adminBoard
  );
};
