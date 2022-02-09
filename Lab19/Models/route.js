module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Route', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        RouteName: {
            type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
        },
        Distance: {
            type: DataTypes.DECIMAL(100),
                allowNull: false
        },
        DeparturePoint: {
            type: DataTypes.STRING(100),
                allowNull: false
        },
        ArrivalPoint: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'Route', modelName: 'Route', timestamps: false
    });
};
