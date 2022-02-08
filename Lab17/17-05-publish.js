const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": false,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);

client.on('ready', () => {
    client.set('incr', 0);
});

client.on('error', err => {
    console.log('error: ' + err);
});

client.on('error', err => 
{
    console.log('error: ' + err);
});

client.on('connect',()=>
{
    console.log('Connection accepted');
});

client.on('end', () => 
{
    console.log('End');
});

client.publish('channel-01', 'message 1 from pub-client');
client.publish('channel-01', 'message 2 from pub-client');

setTimeout(() => 
{
    client.publish('channel-01', 'message 3 from pub-client');
}, 10000);

setTimeout(() => 
{
    client.publish('channel-01', 'message 4 from pub-client');
}, 20000);

setTimeout(() => 
{
    client.publish('channel-01', 'message 5 from pub-client');
}, 30000);

setTimeout(() => 
{
    client.publish('channel-01', 'message 6 from pub-client');
}, 40000);

setTimeout(() => client.quit(), 60000);
