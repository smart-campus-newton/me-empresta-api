module.exports = (sequelize, DataTypes) => {
  const attributes = {
    name: { type: DataTypes.STRING(50), allowNull: false },
    password: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: true },
    ra: { type: DataTypes.STRING(15), allowNull: false }
  }
  const options = {
    tableName: 'Users',
    timestamps: true,
    paranoid: true,
    indexes: [{
      unique: true,
      fields: ['id', 'name', 'email', 'ra']
    }]
  }

  return sequelize.define('Users', attributes, options)
}