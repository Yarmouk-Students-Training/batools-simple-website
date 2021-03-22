'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{foreignKey:'userid'})
    }
  };
  Post.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false
    },
    date:{ 
      type:DataTypes.DATE,
      allowNull:false
    },
    contant:{
      type:  DataTypes.STRING,
      allowNull:false
    }
  },
   {
    sequelize,
    tableName:"post",
    modelName: 'Post',
  });
  return Post;
};