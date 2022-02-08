const dbConnection = require('../../DB');
const {Auditorium} = require('../../Models/model').ORM(dbConnection);
const errorHandler = require('../../Handlers/RequestHandlers/errorHandler');

function addAuditorium(request, reponse, body) 
{
    Auditorium.create(
    {
        auditorium: body.auditorium,
        auditorium_name: body.auditorium_name,
        auditorium_capacity: body.auditorium_capacity,
        auditorium_type: body.auditorium_type
    }).then((result) => 
        {
            reponse.end(JSON.stringify(result));
        })
    .catch((error) => errorHandler(reponse, 500, error.message));
}

function updateAuditorium(request, reponse, body) 
{
    Auditorium.update({auditorium_name: body.auditorium_name}, {where: {auditorium: body.auditorium}}).then((result) => 
    {
        if (result == 0) 
        {
            throw new  Error("Auditorium not found!")
        } 
        else 
        {
            reponse.end(JSON.stringify(result))
        }
        })
        .catch((error) => errorHandler(reponse, 500, error.message));
}

module.exports = function(request,response)
{
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    switch(request.method)
    {
        case "GET":
        {
            Auditorium.findAll().then((result) => {
                res.end(JSON.stringify(result));
            })
            .catch(error => errorHandler(response, 500, error.message)); 
            break;
        }
        case "POST":
        {
            let body = "";

            request.on("data",data =>
            {
                body += data.toString();
            });

            request.on("end",() =>
            {
                addAuditorium(request,response,JSON.parse(body));
            });

            break;

        }
        case "PUT":
        {
            let body = "";

            request.on("data",data =>
            {
                body += data.toString();
            });

            request.on("end",() =>
            {
                updateAuditorium(request,response,JSON.parse(body));
            });

            break;
        }
        case "DELETE":
        {
            Auditorium.destroy({where: {auditorium: req.url.split('/')[3]}}).then((result) => 
            {
                if (result == 0) 
                {
                    throw new Error('Auditorium not found')
                } 
                else 
                {
                    res.end(JSON.stringify(result))
                }
                }).catch(err => errorHandler(response, 500, error.message));
        }
    }
}