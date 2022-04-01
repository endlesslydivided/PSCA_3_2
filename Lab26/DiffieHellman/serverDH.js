const crypto = require('crypto');

function ServerDH(len_a, g) 
{

    const dh = crypto.createDiffieHellman(len_a, g);
    const p = dh.getPrime();
    const gb = dh.getGenerator();
    const k = dh.generateKeys();

    this.getContext = () => 
    {
        return {
            p_hex: p.toString("hex"),
            g_hex: gb.toString("hex"),
            key_hex: k.toString("hex"),
        };
    };

    this.getSecret = (clientContext) => 
    {
        const k = Buffer.from(clientContext.key_hex, "hex");
        return dh.computeSecret(k);
    };
}

module.exports.ServerDH = ServerDH;
