'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {
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
  refreshToken.init({
    refreshtoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'refreshToken',
  });
  return refreshToken;
};