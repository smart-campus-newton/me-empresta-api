module.exports = (sequelize, DataTypes) => {
    const attributes = {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false }
    }
    const options = {
      tableName: 'Users',
      timestamps: true,
      paranoid: true,
      indexes: [{
        unique: true,
        fields: ['id', 'name', 'email']
      }]
    }
  
    return sequelize.define('Users', attributes, options)
  }
  