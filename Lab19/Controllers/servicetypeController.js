const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorMessages = require('../Services/errorMessages');

module.exports = 
{
    getServiceTypes: async (request,response) =>
    {
        try
        {
            const serviceTypes = await model.ServiceTypes.findAll();
            response.type('json');
            response.end(JSON.stringify(serviceTypes));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    getServiceType: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const serviceType = await model.ServiceTypes.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(serviceType));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    addServiceType: async (request,response) =>
    {
        try
        {
            if (!request.body.ServiceName ||
                !request.body.UnitType) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const serviceType = await model.ServiceTypes.create(
                {
                    ServiceName:request.body.ServiceName,
                    UnitType:request.body.UnitType
                }
            );
            response.type('json');
            response.end(JSON.stringify(serviceType));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    updateServiceType: async (request, response) => 
    {
        try
        {
            if(!request.body.ServiceName ||
                !request.body.UnitType)
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const serviceType = await model.ServiceTypes.update(
                {
                    ServiceName:request.body.ServiceName,
                    UnitType:request.body.UnitType
                },
                {where: {Id: request.params.id}}
            );

            if(serviceType === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.SERVICETYPE_NOT_FOUND}));
            }

            res.type('json');
            res.end(JSON.stringify(serviceType));
        }
        catch (error) 
        {
            console.error(error.message)
        }
    },

    deleteServiceType: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const serviceType = await model.ServiceTypes.destroy({where:{Id: request.params.id}});
            if(serviceType === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.SERVICETYPE_NOT_FOUND}));
            }
            res.type('json');
            res.end(JSON.stringify(serviceType));
        } 
        catch (error) 
        {
            console.error(error.message);
        }
    }
}