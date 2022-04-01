module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Service', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ServiceType: {
            type: DataTypes.STRING(50),
                allowNull: false
        },
        RouteName: {
            type: DataTypes.STRING(100),
                allowNull: false
        },
        CostPerUnit: {
            type: DataTypes.DECIMAL(19,4),
                allowNull: false
        }

    }, {
        tableName: 'Service', modelName: 'Service', timestamps: false
    });
};
