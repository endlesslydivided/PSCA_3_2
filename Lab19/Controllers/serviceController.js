const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorHandler = require('./errorHandler');
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
            response.status(500).json(new AppError({status: 505, message: error.message}));
            console.error(error.message);
        }
    },

    getService: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const service = await model.Services.findByPk(request.params.id);
            if(service === null)
            {
                response.status(404).json(new AppError({status: 404, message: errorMessages.SERVICE_NOT_FOUND}));
            }
            else
            {
                response.type('json');
                response.end(JSON.stringify(service));
            }
        }
        catch (error)
        {
            response.status(500).json(new AppError({status: 505, message: error.message}));
            console.error(error.message);
        }
    },

    addService: async (request,response) =>
    {
        try
        {
            if (!request.body.ServiceType ||
                !request.body.RouteName ||
                !request.body.CostPerUnit) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const service = await model.Services.create(
                    {
                        ServiceType:request.body.ServiceType,
                        RouteName:request.body.RouteName,
                        CostPerUnit:request.body.CostPerUnit
                    }
                );
                response.type('json');
                response.end(JSON.stringify(service));
            }
            
        }
        catch (error)
        {
            response.status(500).json(new AppError({status: 505, message: error.message}));
            console.error(error.message);
        }
    },

    updateService: async (request, response) => 
    {
        try
        {
            if(!request.body.ServiceType ||
                !request.body.RouteName ||
                !request.body.CostPerUnit)
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            else
            {
                const service = await model.Services.update(
                    {
                        ServiceType:request.body.ServiceType,
                        RouteName:request.body.RouteName,
                        CostPerUnit:request.body.CostPerUnit
                    },
                    {where: {Id: request.params.id}}
                );
    
                if(service == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.SERVICE_NOT_FOUND}));
                }
                else
                {
                    response.type('json');
                    response.end(JSON.stringify(model.Services.findByPk(request.params.id))); 
                }
                
            }
           
        }
        catch (error) 
        {
            response.status(500).json(new AppError({status: 505, message: error.message}));
            console.error(error.message)
        }
    },

    deleteService: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const obj = model.Services.findByPk(request.params.id);
                const service = await model.Services.destroy({where:{Id: request.params.id}});
                if(service == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.SERVICE_NOT_FOUND}));
                }
                else
                {
                    response.type('json');
                    response.end(JSON.stringify(obj));
                }
            }
           
        } 
        catch (error) 
        {
            response.status(500).json(new AppError({status: 505, message: error.message}));

            console.error(error.message);
        }
    }
}