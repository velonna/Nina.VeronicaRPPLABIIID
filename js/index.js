import Anuncio,{a} from './class.js'
const spinner = document.getElementById("spinner");
let proximoId =0;
window.addEventListener("load",inicioParametros);
    const frm = document.forms[0];

    const txtTitulo = document.getElementById("txtTitulo");
    const txtId = document.getElementById("idtxt");//id
    const rdoVenta = document.getElementById("rdoV");
    const rdoAlquiler = document.getElementById("rdoA");
    const txtDesc = document.getElementById("txtDescripcion");
    const txtPrecio = document.getElementById("txtPrecio");
    const puertas = document.getElementById("txtPuerta");
    const kms = document.getElementById("txtKm");
    const potencia = document.getElementById("txtPotencia");
    

function inicioParametros(){
    localStorage.clear();
    spinner.setAttribute("hidden", "");
    document.getElementById("btnGuadar").addEventListener("click",activarSpinner);
    document.getElementById("btnCancelar").addEventListener("click",limpiarDatos);
    document.getElementById("btnModificarDato").hidden = true;
    localStorage.setItem('nextId', proximoId);
    console.log(a);    
}
function activarSpinner(){
 //  
    spinner.removeAttribute("hidden");
    window.setTimeout(function() {
        cargarDatos();
      },900);  
}
function obtenerId(){
    try{
        proximoId = JSON.parse(localStorage.getItem('nextId')) || 1000;
        console.log(proximoId);
        return proximoId;
    }catch{
        console.log("Error");
        return 0;
    }
   
   
}

function ingresar(e) {
	
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    txtId.value = nodos[0].innerText;    
	txtTitulo.value = nodos[1].innerText;
    txtDesc.value = nodos[3].innerText;
    txtPrecio.value = nodos[4].innerText;
    kms.value = nodos[6].innerText;
    potencia.value = nodos[7].innerText;
    rdoVenta.value = true;
    puertas.value = nodos[5].innerText;
    document.getElementById("btnCancelar").hidden = false;
    document.getElementById("btnModificarDato").hidden = false;
    document.getElementById("btnModificarDato").addEventListener("click",manejadorModificar);
    document.getElementById("btnGuadar").hidden = true;

}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = cargarDatos(e.target, true);
    modificarAnuncio(anuncio);
    document.getElementById("btnModificarDato").hidden = true;
    document.getElementById("btnGuadar").hidden = false;
}
function limpiarDatos() {
    txtTitulo.value = "";
    txtId.value = obtenerId();
    rdoVenta.value = true;
    rdoAlquiler.value = false;
    txtDesc.value = "";
    txtPrecio.value = "0";
    puertas.value = "2";
    kms.value="0";
    potencia.value="0";
    document.getElementById("btnModificarDato").hidden = true;
    document.getElementById("btnGuadar").hidden = false;
}
function cargarDatos(){
    iniciarLocalStr("listarAutos");
    const trans = rdoVenta.value == true?"Venta": "Alquiler";
    const anuncio = new Anuncio(obtenerId(),txtTitulo.value,trans,txtDesc.value,txtPrecio.value,puertas.value, kms.value,potencia.value);
        
    spinner.setAttribute("hidden", "");
    let lista = leerDatosDeLoco("listarAutos");
    lista.push(anuncio);
    borrarDatosDelLoco("listarAutos");
    guardarDatosEnLoco("listarAutos", lista); 
    localStorage.setItem('nextId', proximoId+1);
    return anuncio;
}

function guardarDatosEnLoco(nombre, array) {

    localStorage.setItem(nombre, JSON.stringify(array));
}


function iniciarLocalStr(unalist) {
    let array = new Array();
    if (localStorage.getItem(unalist) == null) {
        guardarDatosEnLoco(unalist, array);
        txtId.value =  1;
    }
}

const btnTabla = document.getElementById('btnGuadar');
btnTabla.addEventListener('click',function(){
    event.preventDefault();
    
    const divTabla = document.getElementById('divTabla');
    Array.from(divTabla.childNodes).forEach( child => {divTabla.removeChild(child);});

   // divTabla.appendChild(crearTabla(autos));
    const datosAutos = leerDatosDeLoco("listarAutos");
    divTabla.appendChild(crearTabla(datosAutos));

    const eventosTds = document.getElementsByTagName("td");
        for (var i = 0; i < eventosTds.length; i++) {
            let td = eventosTds[i];
            td.addEventListener('click', ingresar);
        }


});

function crearTabla(lista){   
    const tabla = document.createElement('table');
    tabla.className='table table-bordered table-striped table-hover';
    try{
        tabla.appendChild(crearCabecera(lista[0]));
        tabla.appendChild(crearCuerpo(lista));
    }catch{
        
    }
    
    
    return tabla;
}
function crearCabecera(item){
//retorna un thead
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(const key in item){
        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
       // th.textContent=key
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista){
//retorna untbody
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
       
        for(const key in element){
            const td = document.createElement('td');
            
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            
            tr.appendChild(td);
            agregarManejadorTd(td);
        }
        
        if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id',element['id']);
        }
        agregarManejadorTr(tr);
        tbody.appendChild(tr);
        
    });
    return tbody;
}

function agregarManejadorTd(td){

    if(td){
        td.addEventListener('click',function(e){
           
           console.log(e.target.parentNode.dataset.id);
            e.stopPropagation();
        })
    }
}
function agregarManejadorTr(tr){

    if(tr){
        tr.addEventListener('click',function(e){
           // alert(e.target.getAttribute('data-id'));
           alert(e.path[0].dataset.id);
           console.log(e.target);
            
        })
    }
}

 function leerDatosDeLoco(list) {
    return JSON.parse(localStorage.getItem(list));
}


function borrarDatosDelLoco(list) {

    localStorage.removeItem(list);
}
function modificarAnuncio(anuncio) {

    if (window.confirm("DESEA MODIFICAR ESTE ANUNCIO??")) {
        let lista = leerDatosDeLoco("listarAutos");

        anuncio = cargarDatos(frm, true);

        lista.forEach(element => {
            if (element.id == anuncio.id) {
                element.titulo = anuncio.titulo;
                element.transaccion = anuncio.transaccion;
                element.descripcion = anuncio.descripcion;
                element.precio = anuncio.precio;
                element.num_puertas = anuncio.num_puertas;
                element.num_KMs = anuncio.num_KMs;
                element.potencia = anuncio.potencia;
            }
        });


        borrarDatosDelLoco("listarAutos");
        guardarDatosEnLoco("listarAutos", lista);
        document.getElementById("btnCancelar").hidden = true;

    }

}
 
 