const btnTransferencia = document.getElementById('btnTransferencia');

const selecEmisor = document.getElementById('selectEmisor');
const selecReceptor = document.getElementById('selectReceptor');
const inputMonto = document.getElementById('montaT');

const errorTransferencia = document.getElementById('errorTransferencia');

const tBody = document.getElementById('tbody_transferencias');


// OBTENER LISTADO DE USUARIOS
function ObtenerTransferencias(){

    try {

        fetch('http://localhost:3010/transferencias')
        .then(data => data.json())
        .then(resultado=>{            
            llenarTabla(resultado)                
        })
        
    } catch (error) {

        console.log(`X Error al obtener los datos : `, error);
        
    }  

};
// OBTENER LISTADO DE TRANSFERE
function ObtenerUsuarios(){

    try {

        fetch('http://localhost:3010/usuarios')
        .then(data => data.json())
        .then(resultado=>{            
            llenarSelects(resultado)                
        })
        
    } catch (error) {

        console.log(`X Error al obtener los datos : `, error);
        
    }  

};

// LLENAR TABALA TRANSFERENCIAS

function llenarTabla(arrayTranferencias){

    let fila = '';

    arrayTranferencias.forEach(trans =>{
        fila += `<tr class="has-text-centered">
                    <td class="px-6 pt-5 pb-4">${trans.id}</td>
                    
                    <td class="px-6 pt-5 pb-4">${convertirFecha(trans.fecha)}</td>
                    
                    <td class="px-6 py-3">${trans.emisor}</td>

                    <td class="px-6 pt-5 pb-4">${trans.receptor}</td>
                    
                    <td class="px-6 pt-5 pb-4">${convertirMoneda(trans.monto)}</td>

                </tr>`
    })

        tBody.innerHTML = fila;

};

function llenarSelects(UserArray){

    let fila='<option> Seleccion un cliente </option>';

    UserArray.forEach(cliente => {        
         fila += `<option value = ${ cliente.id} > ${cliente.nombre } </option>`;                
    });

    selecEmisor.innerHTML = fila;
    selecReceptor.innerHTML = fila;

};

// Generar Transferencia
btnTransferencia.addEventListener('click',(e)=>{

    e.preventDefault(); 

    if (selecEmisor.value.trim() != 'Seleccion un cliente' && selecReceptor.value.trim() != 'Seleccion un cliente' && inputMonto.value != ''){

        document.getElementById('errorTransferencia').textContent ='';

        try {
             
            fetch('http://localhost:3010/transferencia', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                      Emisor: selecEmisor.value.trim(),
                      Receptor: selecReceptor.value.trim() ,
                      Monto: inputMonto.value.trim()
                })
              })                                                                                                                                   
              .then( response =>{

                 console.log(response.status)

                if(response.status === 300){
                    errorTransferencia.textContent = "Saldo insuficiente para realizar la transferencia" 
                   return;   
                }                
                
                if(response.ok){
                   window.location.href = '/transferencias.html'
                }

              })
            
        } catch (error) {
            
            console.log(`X Error al transferir  dinero : `, error);

        }

    }else {

       document.getElementById('errorTransferencia').textContent ='Ingrese todos los datos para proseguir';

    }

});

document.addEventListener('keydown', (event) => {

    if(event.key === "Escape") {        
  
        selecEmisor.value = 'Seleccion un cliente';
        selecReceptor.value = 'Seleccion un cliente';
        inputMonto.value = '';
  
    }
  
});

// CONVERTIR FORMATO DE FECHA
function convertirFecha(fecha) {
    
    const date = new Date(fecha);
    
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
};

// DAR FORMATO CURRENCY A CAMPO MONTO
function convertirMoneda(balance) {

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    return formatter.format(balance);
};

  
document.addEventListener('DOMContentLoaded',()=>{
    ObtenerUsuarios();
    ObtenerTransferencias();
});
