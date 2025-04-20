import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { IonList, IonLabel, IonItem, IonCheckbox } from "@ionic/angular/standalone";
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonItem, IonLabel, IonList, CommonModule]
})
export class ProductoListComponent {

  private _productos: Producto[] = [];

  get productos(): Producto[] {
    return this._productos;
  }

  @Input() 
  set productos(value: Producto[]) {
    this.aplicarOrdenamiento(value);
  }

  constructor(
    private configuracionService: ConfiguracionService
  ) { }

  private async aplicarOrdenamiento(lista: Producto[]) {
    const ordenar = await this.configuracionService.deboOrdenar();
    if (ordenar) {
      this._productos = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      this._productos = lista;
    }
  }
}