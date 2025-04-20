import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private readonly KEY_ORDENAR = "ORDENAR"

  constructor() { }

  async deboOrdenar():Promise<boolean> {
    const resultado = await Preferences.get({key: this.KEY_ORDENAR})
    if (!resultado || resultado.value === undefined) {
      return false;
    }
    return resultado.value === "true";
  }

  async setDeboOrdenar(deboOrdenar:boolean):Promise<void> {
    await Preferences.set({
      key: this.KEY_ORDENAR,
      value: deboOrdenar ? "true" : "false"
    })
  }
}
