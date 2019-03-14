'use strict';
var self = this;
var User = {};

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: { type: DataTypes.TEXT, allowNull: false }
  }, {});

  Post.associate = function(models) {
    // console.log("MODELS", models);
    self.User = Post.belongsTo(models.User);
  };

  Post.insert = function(post){
    Post.create(post, {
      include: [ self.User ]
    });
  }

  return Post;
};