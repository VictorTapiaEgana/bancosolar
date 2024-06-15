const pool = require('../db._config.js');

async function crearTransferencia (Emisor, Receptor, Monto){

    let client;

    try {

        client = await pool.connect();

        client.query('BEGIN');

            const consulta = `INSERT INTO transferencias ( emisor, receptor, monto) VALUES ($1, $2, $3)`;
            const variable = [Emisor, Receptor, Monto];
            const resultado = await client.query(consulta,variable);

            const consulta2 = `UPDATE usuarios SET balance = balance - $1 WHERE id = $2`;
            const variable2 = [Monto, Emisor];
            const resultado2 =  await client.query(consulta2,variable2);

            const consulta3 = `UPDATE usuarios SET balance = balance + $1 WHERE id = $2`;
            const variable3 = [Monto, Receptor];
            const resulado3 = await client.query(consulta3,variable3)


        client.query('COMMIT');    

        return resultado;
        
    } catch (error) {
        
        client.query('ROLLBACK')
        // console.log(`X Error al conectar a la base de datos : `, error);
        if(error.constraint){
            return 'sin saldo';
        }        
        
    } finally {

        client.release()

    }

};

module.exports = crearTransferencia;