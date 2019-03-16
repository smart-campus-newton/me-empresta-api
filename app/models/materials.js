module.exports = (sequelize, DataTypes) => {
    const attributes = {
        NAME: { type: DataTypes.STRING, allowNull: false }
    }
    const options = {
        tableName: 'MATERIALS',
        timestamps: true,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['ID']
        }]
    }

    return sequelize.define('MATERIALS', attributes, options)
}
