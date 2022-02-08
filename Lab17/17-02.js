const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": false,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);

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

sets(client);
gets(client);
dels(client);

client.quit();


function sets(client)
{
    console.time('10000 sets');
    for(let n = 0;n < 10000;n++)
    {
        client.set(n,`set${n}`);
    }
    console.timeEnd(`10000 sets`);
}

function gets(client)
{
    console.time('10000 gets');
    for(let n = 0;n < 10000;n++)
    {
        client.get(n, (err, data) => 
        {
            if (err) 
            {
                console.log(err);
            }
            // else if (data)
            // {
            //     console.log(data);
            // }
        });    
    }
    console.timeEnd(`10000 gets`);
}

function dels(client)
{
    console.time('10000 dels');
    for(let n = 0;n < 10000;n++)
    {
        client.del(n, (err, data) => 
        {
            if (err) 
            {
                console.log(err);
            }
            // else if (data)
            // {
            //     console.log(data);
            // }
        });     
    }
    console.timeEnd(`10000 dels`);
}

