const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    employeeNumber: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    lastName: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    extension : { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    officeCode: { type: DataTypes.STRING, allowNull: false },
    reportsTo: { type: DataTypes.INTEGER, allowNull: true },
    jobTitle: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    timestamps: false
  };

  return sequelize.define("Employee", attributes, options);
}
