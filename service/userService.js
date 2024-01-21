const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mailService");
const TokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ where: { email } });
    if (candidate) {
      throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ where: { activationLink } });
    if (!user) {
      throw new Error("User not found");
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();
