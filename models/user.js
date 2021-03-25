'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post,Comment,Reaction,Friend}) {
      // define association here
      this.hasMany(Post,{foreignKey:'userid'})
      this.hasMany(Comment,{foreignKey:'userid'})
      this.hasMany(Reaction,{foreignKey:'userid'})
      this.belongsToMany(this, {through: Friend, as: 'firstuser', foreignKey: 'userid'})
    }
    
  };
  User.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    pass:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          isEmail:true
        }
      
    },
    gender:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isIn: [['female', 'male']]
      }
    },
    phn:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    add:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    country:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    dofbirth: {
      type:DataTypes.DATE,
      allowNull:false
    }
  },
   {
    sequelize,
    tableName:"user",
    modelName: 'User',
  });
  return User;
};