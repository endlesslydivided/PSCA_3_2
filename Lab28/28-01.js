const jsonRPCServer = require('jsonrpc-server-http-nats');
const {validator,divValidator} = require ('./validators');
const functions = require('./functions');

const server = new jsonRPCServer();

server.on('sum', validator,(params,channel,response)=>
{
    response(null,functions.sum(params));
});
server.on('mul', validator, (params, channel, response) => 
{
    response(null, functions.mul(params));
});
server.on('div', divValidator, (params, channel, response) => 
{
    response(null, params[0] / params[1]);
});
server.on('proc', divValidator, (params, channel, responseult) => 
{
    responseult(null, params[0] / params[1] * 100);
});

server.listenHttp({host: '127.0.0.1', port: 3000}, () => 
{
    console.log('JSON-RPC servser is started')
});