const userService = require("../service/userService");

class userController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.registration(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new userController();
