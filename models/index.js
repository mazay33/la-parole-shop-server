const UserModel = require("./UserModel");
const TokenModel = require("./TokenModel");
const { Product, ProductInfo, Category } = require("./ProductModel");

Category.hasMany(Product,{foreignKey: 'categoryId'});
Product.belongsTo(Category, {foreignKey: 'categoryId'});

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

module.exports = {
  UserModel,
  TokenModel,
  Product,
  ProductInfo,
  Category,
};
