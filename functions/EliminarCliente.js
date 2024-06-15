const pool = require('../db._config.js');

async function EliminarCliente (id){

    let client;

    try {

        client = await pool.connect();
        const consulta = `DELETE FROM usuarios WHERE id = $1;`;
        const variables = [id];
        const resultado = await client.query(consulta,variables);
        return resultado;
        
    } catch (error) {

        console.log(`X Error al conectar al abase de datos : `, error);
        
    } finally {

        client.release();

    }
}

module.exports = EliminarCliente;