const dbConnection = require('../../DB');
const errorHandler = require('../RequestHandlers/errorHandler');
const {Faculty} = require('../../Models/model').ORM(dbConnection);

function addFaculty(request, response, body) 
{
    Faculty.create(
        {
        faculty: body.faculty,
        faculty_name: body.faculty_name
    }).then(result => 
        {
            response.end(JSON.stringify(result));
        }).catch(error => errorHandler(response, 500, error.message));
}

function updateFaculty(request, response, body) 
{
    Faculty.update({faculty_name: body.faculty_name}, {where: {faculty: body.faculty}})
        .then(result => 
        {
        if (result == 0) 
        {
            throw new Error("Faculty not found!")
        } 
        else 
        {
            response.end(JSON.stringify(result))
        }
        }).catch(error => errorHandler(response, 500, error.message));
}


module.exports = function (request, response) {
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    switch (request.method) {
        case "GET": 
        {
            const path = request.url;        
            Faculty.findAll()
                .then(result => 
                {
                    response.end(JSON.stringify(result));
                }).catch(error => errorHandler(response, 500, error.message));
            break;
        }
           
        case "POST": 
        {
            let body = "";

            request.on("data", data => 
            {
                body += data.toString();
            });

            request.on("end", () => 
            {
                addFaculty(request, response, JSON.parse(body));
            });

            break;
        }
            
        case "PUT": 
        {
            let body = "";

            request.on("data", data => 
            {
                body += data.toString();
            });

            request.on("end", () => 
            {
                updateFaculty(request, response, JSON.parse(body));
            });

            break;

        }
        case "DELETE": {
            Faculty.destroy({where: {faculty: request.url.split('/')[3]}})
                .then(result => 
                    {
                    if (result == 0) 
                    {
                        throw new notFoundError('Faculty not define')
                    } 
                    else 
                    {
                        response.end(JSON.stringify(result))
                    }
                })
                .catch(error => errorHandler(response, 500, error.message));

            break;
        }
            
        default:
        {
            errorHandler(response, 405, 'Method Not Allowed');
            break;
        }
    }
};

