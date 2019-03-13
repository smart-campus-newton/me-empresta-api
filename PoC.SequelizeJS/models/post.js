'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: { type: DataTypes.TEXT, allowNull: false }
  }, {});

  Post.associate = function(models) {
    // console.log("MODELS", models);
    Post.belongsTo(models.User);
  };

  return Post;
};