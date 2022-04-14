const express = require('express');
const app = express();
const fs = require('fs');

app.use('/', express.static('.'));

let wasmCode = fs.readFileSync('p.wasm');
let wasmImport = {};
let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImport);

app.get('/', (request, response, next) => 
{
    response.type('html').send(
        `sum(3,4) = ${wasmInstance.exports.sum(3, 4)}<br>` +
        `sub(3,4) = ${wasmInstance.exports.sub(3, 4)}<br>` +
        `mul(3,4) = ${wasmInstance.exports.mul(3, 4)}<br>`
    )
});

app.listen(3000, () => {
    console.log('The server started');
});
