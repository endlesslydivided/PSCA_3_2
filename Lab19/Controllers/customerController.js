const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorMessages = require('../Services/errorMessages');

module.exports = 
{
    getCustomers: async (request,response) =>
    {
        try
        {
            const customers = await model.Customers.findAll();
            response.type('json');
            response.end(JSON.stringify(customers));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    getCustomer: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const customer = await model.Customers.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(customer));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    addCustomer: async (request,response) =>
    {
        try
        {
            if (!request.params.CustomerName) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const customer = await model.Customers.create(
                {
                    CustomerName:request.params.CustomerName
                }
            );
            response.type('json');
            response.end(JSON.stringify(customer));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    updateCustomer: async (request, response) => 
    {
        try
        {
            if(!request.body.CustomerName)
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const customer = await model.Customers.update(
                {
                   CustomerName:request.body.CustomerName 
                },
                {where: {Id: request.params.id}}
            );

            if(customer === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.CUSTOMER_NOT_FOUND}));
            }

            res.type('json');
            res.end(JSON.stringify(customer));
        }
        catch (error) 
        {
            console.error(error.message)
        }
    },

    deleteCustomer: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const customer = await model.Customers.destroy({where:{Id: request.params.id}});
            if(customer === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.CUSTOMER_NOT_FOUND}));
            }
            res.type('json');
            res.end(JSON.stringify(customer));
        } 
        catch (error) 
        {
            console.error(error.message);
        }
    }
}