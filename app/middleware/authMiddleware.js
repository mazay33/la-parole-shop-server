const ApiError = require("../exceptions/apiError");
const tokenService = require("../service/tokenService");

module.exports = function (req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
