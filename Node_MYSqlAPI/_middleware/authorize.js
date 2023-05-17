const jwt = require("jsonwebtoken");
const { secret } = require("config.json");

module.exports = authorize;

function authorize(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized" });
  }

  // get user with id from token 'sub' (subject) property
  // const user = await db.User.findByPk(req.user.sub);
  const employee = jwt.verify(token, secret);

  // check user still exists
  if (!employee) return res.status(401).json({ message: "Unauthorized" });

  // authorization successful
  req.employee = employee;
  next();
}