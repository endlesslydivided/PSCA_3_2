module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Order', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerName: {
            type: DataTypes.STRING(300),
                allowNull: false
        },
        ServiceId: {
            type: DataTypes.INTEGER,
                allowNull: false
        },
        UnitsAmount: {
            type: DataTypes.DECIMAL(6,1),
                allowNull: false
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        OrderExec: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'Order', modelName: 'Order', timestamps: false
    });
};
