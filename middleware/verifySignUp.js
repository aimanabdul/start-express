const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmailOrPhoneNumber = (req, res, next) => {
  // if email or phone number not present
  if (!req.body.email || !req.body.phoneNumber){
    res.status(400).send({message: "email or phone number not provided!"})
  }

  // check email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! email is already in use!"
      });
      return;
    }

    // phone number
    User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Phone number is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
};


const verifySignUp = {
  checkDuplicateEmailOrPhoneNumber: checkDuplicateEmailOrPhoneNumber,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;