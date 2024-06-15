const pool = require('../db._config.js');

let client;

async function listado(){    

    try {

        client = await pool.connect();
        const resultado = await client.query(`SELECT id, nombre, balance, genero, fecha_creacion FROM usuarios ORDER BY id ASC;`);
        return resultado.rows;
        
    } catch (error) {

        console.log(`X Error al conectarse a la base de datos : `, error);
        
    } finally {

        client.release();

    }
};

module.exports = listado;