const UserModel = require("./UserModel");
const TokenModel = require("./TokenModel");
const { Product, ProductInfo, Category } = require("./ProductModel");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

module.exports = {
  UserModel,
  TokenModel,
  Product,
  ProductInfo,
  Category,
};
