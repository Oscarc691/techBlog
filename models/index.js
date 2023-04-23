const sequelize = require("../config/connection");
const User = require("./User");
const Article = require("./Article");

Article.belongsTo(User, {
  foreignkey: "name",
});

User.hasMany(Article, {
  foreignkey: "article_id",
});

module.exports = { Article, User };
