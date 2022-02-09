const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorMessages = require('../Services/errorMessages');

module.exports = 
{
    getServices: async (request,response) =>
    {
        try
        {
            const services = await model.Services.findAll();
            response.type('json');
            response.end(JSON.stringify(services));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    getService: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const service = await model.Services.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(service));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    addService: async (request,response) =>
    {
        try
        {
            if (!request.body.ServiceType ||
                !request.body.RouteName ||
                !request.body.UnitsAmount) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const service = await model.Services.create(
                {
                    ServiceType:request.body.ServiceType,
                    RouteName:request.body.RouteName,
                    UnitsAmount:request.body.UnitsAmount
                }
            );
            response.type('json');
            response.end(JSON.stringify(service));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    updateService: async (request, response) => 
    {
        try
        {
            if(!request.body.ServiceType ||
                !request.body.RouteName ||
                !request.body.UnitsAmount)
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const service = await model.Services.update(
                {
                    ServiceType:request.body.ServiceType,
                    RouteName:request.body.RouteName,
                    UnitsAmount:request.body.UnitsAmount
                },
                {where: {Id: request.params.id}}
            );

            if(service === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.SERVICE_NOT_FOUND}));
            }

            res.type('json');
            res.end(JSON.stringify(service));
        }
        catch (error) 
        {
            console.error(error.message)
        }
    },

    deleteService: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const service = await model.Services.destroy({where:{Id: request.params.id}});
            if(service === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.SERVICE_NOT_FOUND}));
            }
            res.type('json');
            res.end(JSON.stringify(service));
        } 
        catch (error) 
        {
            console.error(error.message);
        }
    }
}