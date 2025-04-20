import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToggleChangeEventDetail } from '@ionic/angular';
import { IonToggleCustomEvent } from '@ionic/core';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class ConfiguracionPage implements OnInit {

  deboOrdenar: boolean = false;

  constructor(
    private configuracionService:ConfiguracionService
  ) { }

  async ngOnInit() {
    this.deboOrdenar = await this.configuracionService.deboOrdenar()
  }

  ionChange($event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
    this.configuracionService.setDeboOrdenar(this.deboOrdenar)
  }

}
