const DataTypes = require('sequelize');
const dbConnection = require('../DB/dbConnection');

const City = require('./city')(dbConnection,DataTypes);
const Customer = require('./customer')(dbConnection,DataTypes);
const Order = require('./order')(dbConnection,DataTypes);
const Route = require('./route')(dbConnection,DataTypes);
const Service = require('./service')(dbConnection,DataTypes);
const ServiceType = require('./serviceType')(dbConnection,DataTypes);

Route.hasMany(City,{
    as: 'FK_CITYD_ROUTE',
    foreignKey: 'DeparturePoint',
    onDelete: 'CASCADE'
});

Route.hasMany(City,{
    as: 'FK_CITYA_ROUTE',
    foreignKey: 'ArrivalPoint',
    onDelete: 'NO ACTION'
});

City.belongsTo(Route,{
    as: 'FK_CITYA_ROUTE',
    foreignKey: 'ArrivalPoint',
    onDelete: 'CASCADE'
})

City.belongsTo(Route,{
    as: 'FK_CITYD_ROUTE',
    foreignKey: 'DeparturePoint',
    onDelete: 'CASCADE'
})

Service.hasMany(ServiceType,{
    as: 'FK_SERVICE_SERVICETYPE',
    foreignKey: 'ServiceType',
    onDelete: 'CASCADE'
});

Service.hasMany(Route,{
    as: 'FK_SERVICE_ROUTE',
    foreignKey: 'RouteName',
    onDelete: 'CASCADE'
});

Route.belongsTo(Service,{
    as: 'FK_SERVICE_ROUTE',
    foreignKey: 'ArrivalPoint',
    onDelete: 'CASCADE'
})

ServiceType.belongsTo(Service,{
    as: 'FK_SERVICE_SERVICETYPE',
    foreignKey: 'ServiceType',
    onDelete: 'CASCADE'
})

Order.hasMany(Customer,{
    as: 'FK_ORDER_CUSTOMER',
    foreignKey: 'CustomerName',
    onDelete: 'CASCADE'
})

Order.hasMany(Service,{
    as: 'FK_ORDER_SERVICE',
    foreignKey: 'ServiceId',
    onDelete: 'CASCADE'
})

Customer.belongsTo(Order,{
    as: 'FK_ORDER_CUSTOMER',
    foreignKey: 'CustomerName',
    onDelete: 'CASCADE'
})

Service.belongsTo(Order,{
    as: 'FK_ORDER_SERVICE',
    foreignKey: 'ServiceId',
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
