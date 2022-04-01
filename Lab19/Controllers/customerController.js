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
response.status(500).json(new AppError({status: 505, message: error.message}));;
        }
    },

    getCustomer: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const customer = await model.Customers.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(customer));
        }
        catch (error)
        {
            console.error(error.message);
response.status(500).json(new AppError({status: 505, message: error.message}));;
        }
    },

    addCustomer: async (request,response) =>
    {
        try
        {
            if (!request.body.CustomerName) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const customer = await model.Customers.create(
                {
                    CustomerName:request.body.CustomerName
                }
            );
            response.type('json');
            response.end(JSON.stringify(customer));
        }
        catch (error)
        {
            console.error(error.message);
            response.status(500).json(new AppError({status: 505, message: error.message})); 
        }
    },

    updateCustomer: async (request, response) => 
    {
        try
        {
            if(!request.body.CustomerName)
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const customer = await model.Customers.update(
                    {
                       CustomerName:request.body.CustomerName 
                    },
                    {where: {Id: request.params.id}}
                );
    
                if(customer == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.CUSTOMER_NOT_FOUND}));
                }
                else
                {
                    response.type('json');
                    response.end(JSON.stringify(model.Customers.findByPk(request.params.id)));
                }
            }
            
        }
        catch (error) 
        {
            console.error(error.message);
            response.status(500).json(new AppError({status: 505, message: error.message}));
        }
    },

    deleteCustomer: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                response.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            else
            {
                const obj = model.Customers.findByPk(request.params.id);
                const customer = await model.Customers.destroy({where:{Id: request.params.id}});
                if(customer == 0)
                {
                    response.status(404).json(new AppError({status: 404, message: errorMessages.CUSTOMER_NOT_FOUND}));
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