import { Component, OnInit } from '@angular/core';
import { ProductoFormComponent } from "../producto-form/producto-form.component";
import { ProductoListComponent } from "../producto-list/producto-list.component";
import { Producto } from 'src/app/modelo/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compras',
  templateUrl: './app-compras.component.html',
  styleUrls: ['./app-compras.component.scss'],
  standalone: true,
  imports: [ProductoFormComponent, ProductoListComponent, CommonModule],
})
export class AppComprasComponent implements OnInit {

  listaProductos: Producto[] = []

  constructor(
    private productoService:ProductoService,
    private configuracionService:ConfiguracionService
  ) { }

  async ngOnInit() {
    await this.productoService.iniciarPlugin()
    await this._actualizar()
  }

  async _actualizar() {
    this.listaProductos = await this.productoService.getProductos()
  }

  async onCreateProduct($event: string) {
    const producto:Producto = {nombre: $event, comprado: false}
    await this.productoService.agregarProducto(producto)
    await this._actualizar()
  }
}
