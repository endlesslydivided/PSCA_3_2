const DataTypes = require('sequelize');
const dbConnection = require('../DB/dbConnection');

const City = require('./city')(dbConnection,DataTypes);
const Customer = require('./customer')(dbConnection,DataTypes);
const Order = require('./order')(dbConnection,DataTypes);
const Route = require('./route')(dbConnection,DataTypes);
const Service = require('./service')(dbConnection,DataTypes);
const ServiceType = require('./serviceType')(dbConnection,DataTypes);

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
  };

Route.hasMany(City,{
    as: 'FK_CITYD_ROUTE',
    foreignKey: 'CityName',
    onDelete: 'CASCADE'
});

Route.hasMany(City,{
    as: 'FK_CITYA_ROUTE',
    foreignKey: 'CityName',
    onDelete: 'NO ACTION'
});


Service.hasMany(ServiceType,{
    as: 'FK_SERVICE_SERVICETYPE',
    foreignKey: 'ServiceName',
    onDelete: 'CASCADE'
});

Service.hasMany(Route,{
    as: 'FK_SERVICE_ROUTE',
    foreignKey: 'RouteName',
    onDelete: 'CASCADE'
});

Order.hasMany(Customer,{
    as: 'FK_ORDER_CUSTOMER',
    foreignKey: 'CustomerName',
    onDelete: 'CASCADE'
})

Order.hasMany(Service,{
    as: 'FK_ORDER_SERVICE',
    foreignKey: 'Id',
    onDelete: 'CASCADE'
})


module.exports = {
    Cities: City,
    Customers: Customer,
    Orders: Order,
    Services: Service,
    ServiceTypes: ServiceType,
    Routes: Route,

    DataTypes: DataTypes,
    DBConnection: dbConnection
};
