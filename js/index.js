import Anuncio,{a} from './class.js'
import {autos} from './data.js'
const spinner = document.getElementById("spinner");
window.addEventListener("load",inicioParametros);
    const frm = document.forms[0];

    const txtTitulo = document.getElementById("txtTitulo");
    const txtId = document.getElementById("idtxt");
    const rdoVenta = document.getElementById("rdoV");
    const rdoAlquiler = document.getElementById("rdoA");
    const txtDesc = document.getElementById("txtDescripcion");
    const txtPrecio = document.getElementById("txtPrecio");
    const puertas = document.getElementById("txtPuerta");
    const kms = document.getElementById("txtKm");
    const potencia = document.getElementById("txtPotencia");

function inicioParametros(){
  //  localStorage.clear();
    spinner.setAttribute("hidden", "");
    document.getElementById("btnGuadar").addEventListener("click",activarSpinner);
    document.getElementById("btnCancelar").addEventListener("click",limpiarDatos);
   
    console.log(a);    
}
function activarSpinner(){
 //  
    spinner.removeAttribute("hidden");
    window.setTimeout(function() {
        cargarDatos();
      },900);  
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
    frm.addEventListener('submit', manejadorModificar);

}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = cargarDatos(e.target, true);
    modificarAnuncio(anuncio);
}
function limpiarDatos() {
    txtTitulo.value = "";
    txtId.value = "0";
    rdoVenta.value = true;
    rdoAlquiler.value = false;
    txtDesc.value = "";
    txtPrecio.value = "0";
    puertas.value = "2";
    kms.value="0";
    potencia.value="0";
}
function cargarDatos(){
    iniciarLocalStr("listarAutos");
    const trans = rdoVenta.value == true?"Venta": "Alquiler";
    const anuncio = new Anuncio("0",txtTitulo.value,trans,txtDesc.value,txtPrecio.value,puertas.value, kms.value,potencia.value);
    console.log(anuncio);
    console.log(a);
    spinner.setAttribute("hidden", "");
    let lista = leerDatosDeLoco("listarAutos");
    lista.push(anuncio);
    borrarDatosDelLoco("listarAutos");
    guardarDatosEnLoco("listarAutos", lista); 
      
}

function guardarDatosEnLoco(nombre, array) {

    localStorage.setItem(nombre, JSON.stringify(array));
}


function iniciarLocalStr(unalist) {
    let array = new Array();
    if (localStorage.getItem(unalist) == null) {
        guardarDatosEnLoco(unalist, array);
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
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));
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
        console.log(element.hasOwnProperty('id'));
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
    console.log(localStorage.getItem(list));
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
        document.getElementById("btnBorrar").hidden = true;
        document.getElementById("btnCancelar").hidden = true;

        frm.removeEventListener('submit', manejadorModificar);

    }

}
 //////////segundo paracial//////////////
 function traerAutos() {
    ol.innerHTML = "";
    spinner.appendChild(crearSpinner());
    fetch("http://localhost:3000/personas")
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(res);
        })
        .then((data) => {
            ol.appendChild(crearItems(data));
            console.log("Personas obtenidas con exito");

        })
        .catch((err) => {
            let mensaje = err.statusText || "Se produjo un error";
            console.error("ERROR: " + err.status + "-" + mensaje);

        })
        .finally(() => {
            spinner.innerHTML = "";

        });


}

 