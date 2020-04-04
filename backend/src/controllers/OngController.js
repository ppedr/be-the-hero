const connection = require('../database/connection');

const crypto = require('crypto');

module.exports = {
    
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },


    async create(request, response) {
        // { var1, var2, varn} - cada dado é armazenado na sua respectiva variavel
        // garantindo assim que usuário não envie o dado de um campo que não seja desejado que ele preencha
        const { name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};