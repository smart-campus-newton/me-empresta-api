module.exports = (sequelize, DataTypes) => {
    const attributes = {
        name: { type: DataTypes.STRING(50), allowNull: false }
    }
    const options = {
        tableName: 'Shift',
        timestamps: true,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['id']
        }]
    }

    return sequelize.define('Shift', attributes, options)
}
