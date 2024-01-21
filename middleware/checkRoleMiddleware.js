const jwt = require("jsonwebtoken");
const tokenService = require("../service/tokenService");
const ApiError = require("../exceptions/apiError");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = tokenService.validateAccessToken(accessToken);
      if (userData.role !== role) {
        return next(ApiError.ForbiddenError());
      }
      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
};
