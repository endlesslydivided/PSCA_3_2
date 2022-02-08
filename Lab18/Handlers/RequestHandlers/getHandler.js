const fs = require('fs');

module.exports = function (request, response) 
{
    let html = fs.readFileSync('./static/index.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
};