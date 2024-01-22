const UserModel = require("./UserModel");
const TokenModel = require("./TokenModel");
const { Product, ProductInfo } = require("./ProductModel");

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

module.exports = {
  UserModel,
  TokenModel,
  Product,
  ProductInfo,
};
