let app = require('express')();
let https = require('https');
let fs = require('fs');

let options = {
    key: fs.readFileSync('LAB.key').toString(),
    cert: fs.readFileSync('LAB.crt').toString()
};

https.createServer(options, app)
    .listen(3000, () => {
        console.log(`https://localhost:3000`)
    });

app.use((req, res, next) => {
    console.log('middleware 1');
    next();
});

app.get('/', (req, res, next) => {
    console.log('middleware 2');
    res.end('hello from https');
});
