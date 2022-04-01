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

let t = setInterval(() => {
    if(client.connected)
    {
        clearInterval(t);
        console.time('10000 sets');
        sets(client);
        console.timeEnd(`10000 sets`);

        console.time('10000 gets');
        gets(client);
        console.timeEnd(`10000 gets`);

        console.time('10000 dels');
        dels(client);
        console.timeEnd(`10000 dels`);

        client.quit();
        

    }
}, 0);



function sets(client)
{
    console.log('in sets');

    for(let n = 0;n < 10000;n++)
    {
        client.set(n,`set${n}`);
    }

    console.log('out sets');

}

function gets(client)
{
    console.log('in gets');
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

    console.log('out gets');

}

function dels(client)
{
    console.log('in dels');

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
    console.log('out dels');

}

