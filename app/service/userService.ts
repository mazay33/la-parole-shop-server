import bcrypt from "bcrypt";
import { v4 } from "uuid";
import MailService from "./mailService";
import TokenService from "./tokenService";
import UserDto from "../dtos/userDto";
import ApiError from "../exceptions/apiError";
import prisma from "../db";
import { UserPayloadData } from "../@types/User";
import { Role } from "@prisma/client";
class UserService {
  async registration(email: string, password: string, role: Role) {
    const candidate = await prisma.user.findFirst({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const activationLink = v4();

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
    });
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: user.id,
      },
    });
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
      cart: cart,
      wishlist: wishlist,
    };
  }

  async activate(activationLink: string) {
    const user = await prisma.user.findFirst({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true },
    });
  }

  async login(email: string, password: string) {
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

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await prisma.user.findUnique({
      where: { id: (userData as UserPayloadData).id },
    });
    if (!user) {
      throw ApiError.UnauthorizedError("Пользователь не найден");
    }
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

  async getMe(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        cart: true,
        profile: true,
        address: true,
        wishlist: true,
      },
    });
    return user;
  }
}

export default new UserService();
