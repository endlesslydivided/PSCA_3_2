module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Service', {
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
        tableName: 'Service', modelName: 'Service', timestamps: false
    });
};
