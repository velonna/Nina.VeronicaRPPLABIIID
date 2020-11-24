

export default class Anuncio {
    constructor(id, titulo,transaccion,descripcion,precio,puertas,kms,potencia) {
      this._id = id;
      this._titulo = titulo;
      this._transaccion = transaccion;
      this._descripcion = descripcion;
      this._precio = precio;
      this._puertas = puertas;
      this._kms= kms;
      this.potencia =potencia;
           
    }
    agregar() {
        console.log(`hola ${this._id}`);
    }
    eleminar() {
      console.log("eliminar");
    }
    modifcar() {
      console.log("modificar");
    }
    buscar() {
      console.log("buscar");
    }
}


export let a =9;