const pool = require('../db._config.js');

async function EditarCliente( id, nombre, balance,genero ){

    let client;

    try {

        client = await pool.connect();
        const consulta = `UPDATE usuarios SET nombre = $2, balance= $3, genero = $4  WHERE id = $1;`;
        const variables= [id, nombre, balance, genero];
        const resultado = client.query(consulta,variables);
        return resultado;
        
    } catch (error) {

        console.log(`X Error al conectar a la base de datos : `, error );
        
    } finally {

        client.release();

    }
};

module.exports = EditarCliente;


