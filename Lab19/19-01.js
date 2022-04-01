const express = require("express");
const port = 3000;
const app = express();
const dbConnection = require('./db/dbConnection');
const bodyParser = require('body-parser');

const customerRouter = require('./Routers/customerRouter');
const routeRouter = require('./Routers/routeRouter');
const serviceRouter = require('./Routers/serviceRouter');
const servicetypeRouter = require('./Routers/servicetypeRouter');
const orderRouter = require('./Routers/orderRouter');
const cityRouter = require('./Routers/cityRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

dbConnection.sync()
    .then(()=>
    {
        console.log('Приложение запущено: http://localhost:' + port);
        return app.listen(port);
    })
    .catch((error)=>
    {
        console.error(error.message);
    });

app.use("/customer",customerRouter);
app.use("/route",routeRouter);
app.use("/service",serviceRouter);
app.use("/servicetype",servicetypeRouter);
app.use("/order",orderRouter);
app.use("/city",cityRouter);


app.use(function(request,response,next)
{
    response.status(404).send('Not found');
});
