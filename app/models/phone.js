module.exports = (sequelize, DataTypes) => {
    const attributes = {
        ddd: { type: DataTypes.INTEGER(9), allowNull: false },
        number: { type: DataTypes.INTEGER(9), allowNull: false }
    }
    const options = {
        tableName: 'Phone',
        timestamps: true,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['id']
        }]
    }

    return sequelize.define('Phone', attributes, options)
}
