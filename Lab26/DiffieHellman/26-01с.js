const axios = require('axios');
const crypto = require("crypto");
const fs = require("fs");

const {ClientDH} = require("./clientDH");
let clientContext;

async function client() {
    try 
    {
        const res1 = await axios.get('http://localhost:3000/');
        console.log("serverContext = ", res1.data);
        const clientDH = new ClientDH(res1.data);
        const clientSecret = clientDH.getSecret(res1.data);
        clientContext = clientDH.getContext();
        console.log("clientContext = ", clientContext);

        const res2 = await axios({
            method: 'post',
            url: 'http://localhost:3000/resource',
            data: {
                clientContext: clientContext
            }
        });

        let text = res2.data.file.toString("utf8");

        const decipher = crypto.createDecipher("aes256", clientSecret.toString());

        const decrypted = decipher.update(text, "hex", "utf8") + decipher.final("utf8");
        console.log('decrypted = ', decrypted);
        fs.writeFileSync(`${__dirname}/files/fileClient.txt`, decrypted);
    } 
    catch (e) 
    {
        console.error(e.message)
    }
}

client();

 

