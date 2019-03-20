module.exports = (sequelize, DataTypes) => {
    const attributes = {
      street: { type: DataTypes.STRING(50), allowNull: false },
      number: { type: DataTypes.INTEGER(5), allowNull: true },
      neighbourhood: { type: DataTypes.STRING(30), allowNull: false },
      city: { type: DataTypes.STRING(50), allowNull: false },
      complement: { type: DataTypes.STRING(20), allowNull: true }
    }
    const options = {
      tableName: 'Address',
      timestamps: true,
      paranoid: true,
      indexes: [{
        unique: true,
        fields: ['id']
      }]
    }
  
    return sequelize.define('Address', attributes, options)
  }