'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Post}) {
      // define association here
      this.belongsTo(User,{foreignKey:'userid'})
      this.belongsTo(Post,{foreignKey:'postid'})
    }
  };
  Comment.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    contant:{ 
      type:DataTypes.STRING,
      allowNull:false
    }
  }, 
  {
    sequelize,
    tableName:"comment",
    modelName: 'Comment',
  });
  return Comment;
};