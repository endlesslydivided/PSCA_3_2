module.exports = function (sequelize, DataTypes) {
    return sequelize.define('City', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CityName: {
            type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
        }
    }, {
        tableName: 'City', modelName: 'City', timestamps: false
    });
};