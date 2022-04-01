const { Sequelize } = require('sequelize');
const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorMessages = require('../Services/errorMessages');

module.exports = 
{
    getOrders: async (request,response) =>
    {
        try
        {
            const orders = await model.Orders.findAll();
            response.type('json');
            response.end(JSON.stringify(orders));
        }
        catch (error)
        {
            console.error(error.message);
response.status(500).json(new AppError({status: 505, message: error.message}));;
        }
    },

    getOrder: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const order = await model.Orders.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(order));
        }
        catch (error)
        {
            console.error(error.message);
response.status(500).json(new AppError({status: 505, message: error.message}));;
            
        }
    },

    addOrder: async (request,response) =>
    {
        try
        {
            if (!request.body.CustomerName ||
                !request.body.ServiceId ||
                !request.body.UnitsAmount||
                !request.body.OrderDate ||
                !request.body.OrderExec) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const order = await model.Orders.create(
                {
                    CustomerName:request.body.CustomerName,
                    ServiceId:request.body.ServiceId,
                    UnitsAmount:request.body.UnitsAmount,
                    OrderDate:(new Date(request.body.OrderDate)),
                    OrderExec:(new Date(request.body.OrderExec))
                }
            );
            response.type('json');
            response.end(JSON.stringify(order));
        }
        catch (error)
        {
            console.error(error.message);
response.status(500).json(new AppError({status: 505, message: error.message}));;
        }
    },

    updateOrder: async (request, response) => 
    {
        try
        {
            if(!request.body.CustomerName ||
                !request.body.ServiceId ||
                !request.body.UnitsAmount||
                !request.body.OrderDate ||
                !request.body.OrderExec)
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const order = await model.Orders.update(
                    {
                        CustomerName:request.body.CustomerName,
                        ServiceId:request.body.ServiceId,
                        UnitsAmount:request.body.UnitsAmount,
                        OrderDate:request.body.OrderDate,
                        OrderExec:request.body.OrderExec
                    },
                    {where: {Id: request.params.id}}
                );
    
                if(order == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.ORDER_NOT_FOUND}));
                }
                else
                {
                    response.type('json');
                    response.end(JSON.stringify(model.Orders.findByPk(request.params.id)));
                }
                
            }
           
        }
        catch (error) 
        {
            console.error(error.message);
response.status(500).json(new AppError({status: 505, message: error.message}));
        }
    },

    deleteOrder: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            else
            {
                const obj = model.Orders.findByPk(request.params.id);
                const order = await model.Orders.destroy({where:{Id: request.params.id}});
                if(order == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.ORDER_NOT_FOUND}));
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
response.status(500).json(new AppError({status: 505, message: error.message}));;
        }
    }
}