const pool = require('../db._config.js');

let client;

async function CrearUsuario (nombre, balance, genero){    

    try {

        client = await pool.connect();
        const consulta =`INSERT INTO usuarios (nombre, balance, genero) VALUES( $1 , $2, $3)`;
        const variables=[ nombre, balance, genero ];
        const resultado = client.query(consulta,variables);
        return resultado;        
        
    } catch (error) {

        console.log(`X Error al conectar a la base de datos : `, error);
        
    } finally {

        client.release();

    }
    
};

module.exports = CrearUsuario;