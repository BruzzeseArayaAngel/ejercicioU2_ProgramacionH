import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonButton, IonIcon, IonText, IonInput } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss'],
  standalone: true,
  imports: [IonInput, IonText, IonIcon, IonButton, IonItem, IonList, FormsModule, CommonModule]
})
export class ProductoFormComponent  implements OnInit {

  productoStr: string = ""
  @Output() onCreate = new EventEmitter<string>  ()

  constructor() { 
    addIcons({addCircleOutline});
  }

  ngOnInit() {}

  onClick() {
    this.onCreate.emit(this.productoStr)
  }
}
