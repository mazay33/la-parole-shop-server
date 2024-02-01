const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mailService");
const TokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");
const prisma = require("../db");
class UserService {
  async registration(email, password, role) {
    const candidate = await prisma.user.findFirst({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role,
        activationLink,
      },
    });
    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
    })
    console.log(process.env.API_URL);
    // await MailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/auth/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
      cart: cart
    };
  }

  async activate(activationLink) {
    const user = await prisma.user.findFirst({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true },
    });
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await prisma.user.findUnique({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    const users = await prisma.user.findMany({
      include: {
        cart: true,
      },
    });
    return users;
  }
}

module.exports = new UserService();
