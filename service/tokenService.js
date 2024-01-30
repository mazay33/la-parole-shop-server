const jwt = require("jsonwebtoken");
const prisma = require("../db");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await prisma.refreshToken.findFirst({
      where: { userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await prisma.refreshToken.update({
        where: { userId },
        data: { refreshToken: tokenData.refreshToken },
      });

      return tokenData;
    }
    const token = await prisma.refreshToken.create({
      data: { userId, refreshToken },
    });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await prisma.refreshToken.delete({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await prisma.refreshToken.findUnique({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
