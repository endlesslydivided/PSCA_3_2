const dbConnection = require('../../DB');
const errorHandler = require('./errorHandler');
const {Auditorium_type} = require('../../Models/model').ORM(dbConnection);

module.exports = function (request, response) {
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    switch (request.method) 
    {
        case "GET": 
        {
            Auditorium_type.findAll()
            .then(result => 
                {
                response.end(JSON.stringify(result));
            })
            .catch(error => errorHandler(response, 500, error.message));

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
                addAuditoriumtype(request, response, JSON.parse(body));
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
                updateAuditoriumtype(request, response, JSON.parse(body));
            });

            break;
        }

        case "DELETE": 
        {
            Auditorium_type.findByPk(request.url.split('/')[3])
            .then(result => 
                {
                    Auditorium_type.destroy({where: {auditorium_type: request.url.split('/')[3]}})
                    .then(resultD => {
                        if (resultD == 0) 
                        {
                            throw new Error('AuditoriumType not found')
                        } 
                        else 
                        {
                            response.end(JSON.stringify(result))
                        }
                    })
                    .catch(error => errorHandler(response, 500, error.message));
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

function addAuditoriumtype(request, response, body) {
    Auditorium_type.create(
    {
        auditorium_type: body.auditorium_type,
        auditorium_typename: body.auditorium_typename
    })
    .then(result => 
    {
        response.end(JSON.stringify(result));
    })
    .catch(error => errorHandler(response, 500, error.message));
}

function updateAuditoriumtype(request, response, body) 
{
    Auditorium_type.update({auditorium_typename: body.auditorium_typename}, {where: {auditorium_type: body.auditorium_type}})
    .then(result => 
    {
        if (result == 0) 
        {
            throw new Error('AuditoriumType not found')
        } 
        else {
            response.end(JSON.stringify(body))
        }
    })
    .catch(error => errorHandler(response, 500, error.message));
}
