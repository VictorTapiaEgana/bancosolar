const listado = require('./functions/usuarios');
const CrearUsuario = require('./functions/crearusuario');
const EditarCliente = require('./functions/EditarCliente');

const express  = require('express'); 
const path = require('path');
const EliminarCliente = require('./functions/EliminarCliente');
const crearTransferencia = require('./functions/crearTransferencia');
const transferencias = require('./functions/transferencias');

const PORT= process.env.SERVER_PORT || 3002;
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended:false }));
app.use('/public',express.static(path.join(process.cwd(),'/public')));
app.use(express.static(path.join(process.cwd(),'/pages')));

app.get('/',(req,res)=>{
        res.status(200).sendFile(path.join(process.cwd(),'/pages/index.html'));
});

app.get('/usuarios', async (req,res)=>{

    try {

        const resultado = await listado();        
        res.send(resultado);
        
    } catch (error) {

        console.log(`X Error al obtebner los datos : `, error);        
        
    }

});

app.post('/usuarios',async (req,res)=>{

    const { nombreCliente, balanceCliente, generoCliente} = req.body;
    
    try {

        const resultado = await CrearUsuario(nombreCliente, balanceCliente, generoCliente);
        res.status(200).send(resultado);
        
    } catch (error) {
        
        console.log(`X Error al insertar un nuevo registro : `, error);

    }    

});

app.put('/usuario',async (req,res)=>{

    const { id, nombre, balance, genero } = req.body;

    try {
        const resultado = await(EditarCliente(id, nombre, balance, genero ));
        res.status(200).send(resultado);
        
    } catch (error) {
       console.log(`X Error al conecta a la base de datos : ` , error);     
    }

});

app.delete('/usuario', async (req,res)=>{

     const { IDCliente } = req.body;     

     try {
         const resultado = await EliminarCliente(IDCliente);
         res.status(200).send(resultado);   
        
     } catch (error) {

        console.log(`X Error al eliminar al cliente : `, error);

     }

});

app.post('/transferencia',async (req,res)=>{

    const { Emisor, Receptor, Monto } = req.body;

    try {
        
        const resultado = await crearTransferencia(Emisor, Receptor, Monto);       
        
        if(resultado === 'sin saldo'){           
            res.status(300).send();
        }else{
            res.status(200).send(resultado);
        }
                    

    } catch (error) {
        
        // console.log(`X Error al conectar a la base de datos : `, error);
        console.log(error.constraint)
        res.status(300);
       


    }

});
































app.get('/transferencias',async (req,res)=>{

    try {

        const resultado = await transferencias();        
        res.status(200).send(resultado);
        
    } catch (error) {
        
        console.log(`X error a conectar a la base de datos : `, error );

    }

});























// RUTAS de HTML
app.get('/usuarios.html', (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), '/pages/usuarios.html'));
});

app.get('/transferencias.html', (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), '/pages/transferencias.html'));
});

app.listen(PORT,()=>{
    console.clear()
    console.log(`Holiwis en port: ${PORT}`)
});

