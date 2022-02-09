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
        }
    },

    getOrder: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const order = await model.Orders.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(order));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    addOrder: async (request,response) =>
    {
        try
        {
            if (!request.body.CustomerName ||
                !request.body.ServiceId ||
                !request.body.UnitsAmount ||
                !request.body.ArrivalPoint ||
                !request.body.OrderExec) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const order = await model.Orders.create(
                {
                    CustomerName:request.body.CustomerName,
                    ServiceId:request.body.ServiceId,
                    UnitsAmount:request.body.DepartuUnitsAmountrePoint,
                    OrderDate:request.body.OrderDate,
                    OrderExec:request.body.OrderExec
                }
            );
            response.type('json');
            response.end(JSON.stringify(order));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    updateOrder: async (request, response) => 
    {
        try
        {
            if(!request.body.CustomerName ||
                !request.body.ServiceId ||
                !request.body.UnitsAmount ||
                !request.body.ArrivalPoint ||
                !request.body.OrderExec)
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const order = await model.Orders.update(
                {
                    CustomerName:request.body.CustomerName,
                    ServiceId:request.body.ServiceId,
                    UnitsAmount:request.body.DepartuUnitsAmountrePoint,
                    OrderDate:request.body.OrderDate,
                    OrderExec:request.body.OrderExec
                },
                {where: {Id: request.params.id}}
            );

            if(order === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.ORDER_NOT_FOUND}));
            }

            res.type('json');
            res.end(JSON.stringify(order));
        }
        catch (error) 
        {
            console.error(error.message)
        }
    },

    deleteOrder: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const order = await model.Orders.destroy({where:{Id: request.params.id}});
            if(order === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.ORDER_NOT_FOUND}));
            }
            res.type('json');
            res.end(JSON.stringify(order));
        } 
        catch (error) 
        {
            console.error(error.message);
        }
    }
}