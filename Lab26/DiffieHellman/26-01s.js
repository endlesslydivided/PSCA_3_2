const app = require('express')();
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");
const {ServerDH} = require('./serverDH');
const PORT = 3000;

let serverDH, serverContext, serverSecret;

app.listen(PORT, () => 
{
    console.log(`Listening to http://localhost:${PORT}/`);
});

app.use(bodyParser.json());

app.get('/', (req, res) => 
{
    serverDH = new ServerDH(1024, 3);
    serverContext = serverDH.getContext();
    console.log("serverContext = ", serverContext);
    res.json(serverContext);
});

app.post('/resource', (req, res) => 
{
    let context = req.body.clientContext;
    if (context) 
    {
        console.log("clientContext = ", context);
        serverSecret = serverDH.getSecret(context);
        const cipher = crypto.createCipher("aes256", serverSecret.toString());
        const text = fs.readFileSync(`${__dirname}/files/file.txt`, { encoding: "utf8" });
        const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
        console.log('encrypted = ', encrypted);

        res.json({ file: encrypted });
    } 
    else 
    {
        res.status(409).json({ errorMessage: "Error!" });
    }
});
