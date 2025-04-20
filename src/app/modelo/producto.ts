import { publishFacade } from "@angular/compiler";

/*export class Producto {
    constructor(
        public nombre:string = "",
        public comprado: boolean = false
    ){}
}*/

export interface Producto {
  id?: number
  nombre: string
  comprado: boolean
}