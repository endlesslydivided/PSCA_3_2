const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": false,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);
const count = 10000;

hset(client, count);
hget(client, count);


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

client.quit();

function hset(client, count) 
{
    console.time(`${count} hsets`);
    for (let n = 0; n < count; n++) 
    {
        client.hset(n, n, JSON.stringify({id: n, val: `value - ${n}`}));
    }
    console.timeEnd(`${count} hsets`);
}

function hget(client, count) {
    console.time(`${count} hgets`);
    for (let n = 0; n < count; n++) 
    {
        client.hget(n, n);
    }
    console.timeEnd(`${count} hgets`);
}
