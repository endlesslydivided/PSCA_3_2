module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ServiceType', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ServiceName: {
            type: DataTypes.STRING(50),
                allowNull: false
        },
        UnitType: {
            type: DataTypes.STRING(15),
                allowNull: false
        }

    }, {
        tableName: 'ServiceType', modelName: 'ServiceType', timestamps: false
    });
};
