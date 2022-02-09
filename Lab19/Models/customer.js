module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Customer', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerName: {
            type: DataTypes.STRING(300),
                allowNull: false
        }
    }, {
        tableName: 'Customer', modelName: 'Customer', timestamps: false
    });
};
