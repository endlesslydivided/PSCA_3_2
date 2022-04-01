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
            response.status(500).json(new AppError({status: 505, message: error.message}));
        }
    },

    getServiceType: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const serviceType = await model.ServiceTypes.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(serviceType));
        }
        catch (error)
        {
            console.error(error.message);
            response.status(500).json(new AppError({status: 505, message: error.message}));
        }
    },

    addServiceType: async (request,response) =>
    {
        try
        {
            if (!request.body.ServiceName ||
                !request.body.UnitType) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
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
            response.status(500).json(new AppError({status: 505, message: error.message}));
        }
    },

    updateServiceType: async (request, response) => 
    {
        try
        {
            if(!request.body.ServiceName ||
                !request.body.UnitType)
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const serviceType = await model.ServiceTypes.update(
                    {
                        ServiceName:request.body.ServiceName,
                        UnitType:request.body.UnitType
                    },
                    {where: {Id: request.params.id}}
                );
    
                if(serviceType == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.SERVICETYPE_NOT_FOUND}));
                }
                else
                {
                    response.type('json');
                    response.end(JSON.stringify(model.ServiceTypes.findByPk(request.params.id)));
                }           
            }
           
        }
        catch (error) 
        {
            console.error(error.message);
            response.status(500).json(new AppError({status: 505, message: error.message}));        }
    },

    deleteServiceType: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const obj = model.ServiceTypes.findByPk(request.params.id);
                const serviceType = await model.ServiceTypes.destroy({where:{Id: request.params.id}});
                if(serviceType == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.SERVICETYPE_NOT_FOUND}));
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
            console.error(error.message);
            response.status(500).json(new AppError({status: 505, message: error.message}));
        }
    }
}