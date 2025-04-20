import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../modelo/producto';
import { CommonModule } from '@angular/common';
import { AppComprasComponent } from "../componentes/app-compras/app-compras.component";
import { settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterModule, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, AppComprasComponent],
})
export class HomePage implements OnInit {

  productos:Producto[] = []

  constructor(
    private productoService: ProductoService
  ) {
    addIcons({
      settingsOutline
    })
  }

  async ngOnInit(): Promise<void> {
    this.productos = await this.productoService.getProductos()
  }

  
}
