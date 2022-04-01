const Sequelize = require("sequelize");
const sequelize = new Sequelize("LAB22NODE", "ConnectionUser", "ConnectionUser", {
    dialect: "mssql",
    host: "localhost",
    port: "1433",
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
        acquire: 30000,
    }
});

module.exports = sequelize;
