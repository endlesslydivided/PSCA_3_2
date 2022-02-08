const pulpitHandler = require("./RequestHandlers/pulpitHandler");
const auditoriumtypeHandler = require("./RequestHandlers/auditoriumtypeHandler");
const getHandler = require('./RequestHandlers/getHandler');
const subjectHandler = require("./RequestHandlers/subjectHandler");
const auditoriumHandler = require("./RequestHandlers/auditoriumHandler");
const errorHandler = require('./RequestHandlers/errorHandler');
const facultyHandler = require("./RequestHandlers/facultyHandler");


module.exports = (request,response) =>
{
    const path = request.url;

    switch(true)
    {
        case path === '/':
        {
            getHandler(request,response); break;
        }
        case (/\/api\/faculties/).test(path):
        {
            facultyHandler(request,response);break;
        }
        case (/\/api\/pulpits/).test(path):
        {
            pulpitHandler(request, response);break;
        }

        case (/\/api\/subject/).test(path):
        {
            subjectHandler(request, response);break;
        }
        case (/\/api\/auditorium/).test(path):
        {
            auditoriumHandler(request, response);break;
        }   
        case (/\/api\/auditoriumtype/).test(path):
        {
            auditoriumtypeHandler(request, response);break;          
        }
        default:       
        {
            errorHandler(response, 404, 'Not found');
        }
    }
}