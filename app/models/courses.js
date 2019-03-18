module.exports = (sequelize, DataTypes) => {
    const attributes = {
        name: { type: DataTypes.STRING(50), allowNull: false }
    }
    const options = {
        tableName: 'Courses',
        timestamps: true,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['id']
        }]
    }

    return sequelize.define('Courses', attributes, options)
}
