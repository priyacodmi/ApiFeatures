
const jwt = require("jsonwebtoken");
const cookieService = require("../services/cookieManager");

let authenticate = async (request, response, next) => {
  let token = cookieService.getCookie("token", {
    req: request,
    res: response,
  });
  if (!token) {
    return response
      .status(401)
      .json({ msg: "No Token Provided , Authentication Denied" });
  }
  try {
    let decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    request.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    response.status(500).json({ msg: "Invalid Token" });
  }
};

module.exports = authenticate;
