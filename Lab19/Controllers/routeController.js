const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorMessages = require('../Services/errorMessages');

module.exports = 
{
    getRoutes: async (request,response) =>
    {
        try
        {
            const routes = await model.Routes.findAll();
            response.type('json');
            response.end(JSON.stringify(routes));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    getRoute: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const route = await model.Routes.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(route));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    addRoute: async (request,response) =>
    {
        try
        {
            if (!request.body.RouteName ||
                !request.body.Distance ||
                !request.body.DeparturePoint ||
                !request.body.ArrivalPoint) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const route = await model.Routes.create(
                {
                    RouteName:request.body.CustomerName,
                    Distance:request.body.Distance,
                    DeparturePoint:request.body.DeparturePoint,
                    ArrivalPoint:request.body.ArrivalPoint
                }
            );
            response.type('json');
            response.end(JSON.stringify(route));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    updateRoute: async (request, response) => 
    {
        try
        {
            if(!request.body.RouteName ||
                !request.body.Distance ||
                !request.body.DeparturePoint ||
                !request.body.ArrivalPoint)
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const route = await model.Routes.update(
                {
                    RouteName:request.body.CustomerName,
                    Distance:request.body.Distance,
                    DeparturePoint:request.body.DeparturePoint,
                    ArrivalPoint:request.body.ArrivalPoint
                },
                {where: {Id: request.params.id}}
            );

            if(route === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.ROUTE_NOT_FOUND}));
            }

            res.type('json');
            res.end(JSON.stringify(route));
        }
        catch (error) 
        {
            console.error(error.message)
        }
    },

    deleteRoute: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const route = await model.Routes.destroy({where:{Id: request.params.id}});
            if(route === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.ROUTE_NOT_FOUND}));
            }
            res.type('json');
            res.end(JSON.stringify(route));
        } 
        catch (error) 
        {
            console.error(error.message);
        }
    }
}