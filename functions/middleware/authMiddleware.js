const admin = require("firebase-admin");

// Middleware function to check access level
const checkAccessLevel = (requiredAccessLevel) => async (req, res, next) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    const accessLevel = user.customClaims.accessLevel;

    if (accessLevel >= requiredAccessLevel) {
      req.user.accessLevel = accessLevel;
      return next();
    } else {
      return res.status(403).send("Access denied");
    }
  } catch (error) {
    console.error("Error checking access level: ", error.message);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  checkAccessLevel,
};
