'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through : models.TransaksiProductUser})
      User.hasMany(models.TransaksiProductUser)
    }

    static checkRole(value){
      if(value === 'admin'){
        return true
      }
      return false 
    }

    comparePassword(passwordInputan){
      let hash = this.password
      return bcrypt.compareSync(passwordInputan, hash)
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    let salt = bcrypt.genSaltSync(5)
    let hash = bcrypt.hashSync(user.password, salt) 
    user.password = hash
  })
  return User;
};