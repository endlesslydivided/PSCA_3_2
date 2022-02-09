const model = require('../Models/models');
const AppError = require('../Services/applicationError');
const errorMessages = require('../Services/errorMessages');

module.exports = 
{
    getCities: async (request,response) =>
    {
        try
        {
            const cities = await model.Cities.findAll();
            response.type('json');
            response.end(JSON.stringify(cities));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    getCity: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const city = await model.Cities.findByPk(request.params.id);
            response.type('json');
            response.end(JSON.stringify(city));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    addCity: async (request,response) =>
    {
        try
        {
            if (!request.body.CityName) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }
            const city = await model.Cities.create(
                {
                    CityName:request.body.CityName
                }
            );
            response.type('json');
            response.end(JSON.stringify(city));
        }
        catch (error)
        {
            console.error(error.message);
        }
    },

    updateCity: async (request, response) => 
    {
        try
        {
            if(!request.body.CityName)
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const city = await model.Cities.update(
                {
                    CityName:request.body.CityName
                },
                {where: {Id: request.params.id}}
            );

            if(city === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.CITY_NOT_FOUND}));
            }

            res.type('json');
            res.end(JSON.stringify(city));
        }
        catch (error) 
        {
            console.error(error.message)
        }
    },

    deleteCity: async (request,response) =>
    {
        try
        {
            if (!request.params.id) 
            {
                res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
            }

            const city = await model.Cities.destroy({where:{Id: request.params.id}});
            if(city === 0)
            {
                res.status(404).json(new AppError({status: 404, message: errorMessages.CITY_NOT_FOUND}));
            }
            res.type('json');
            res.end(JSON.stringify(city));
        } 
        catch (error) 
        {
            console.error(error.message);
        }
    }
}