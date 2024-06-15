const pool = require('../db._config.js');

async function transferencias(){

    let client;

    try {

        client = await pool.connect();
        const resultado = await client.query(`SELECT t.id, t.fecha AS fecha,emisor.nombre AS emisor,receptor.nombre AS receptor,t.monto AS monto
                                              FROM transferencias t 
                                              JOIN usuarios emisor ON t.emisor = emisor.id 
                                              JOIN usuarios receptor ON t.receptor = receptor.id
                                              ORDER BY t.id ASC;`);
        return resultado.rows;

        
    } catch (error) {

        console.log(`X Error al conectar a la base de datos : `, error);
        
    } finally {

        client.release();

    }
};

module.exports = transferencias;