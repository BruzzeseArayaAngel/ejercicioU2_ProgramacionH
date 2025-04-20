import { Injectable } from '@angular/core';
import { Producto } from '../modelo/producto';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection;

  plataforma: string = ""
  
  DB_NAME: string = "lista_compras";
  DB_ENCRIPTADA: boolean  = false;
  DB_MODE: string         = "no-encryption";
  DB_VERSION: number      = 1;
  DB_READ_ONLY: boolean   = false;
  TABLE_NAME: string = "lista_compras";
  COL_NOMBRE: string = "nombre";
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_NOMBRE} TEXT NOT NULL,
      comprado INTEGER DEFAULT 0
    );
  `;
  
  
  constructor() {}

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
  }

  async iniciarPlugin() {    
    this.plataforma = Capacitor.getPlatform()
    if(this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)
    
    await this.agregarProducto({nombre: "Naranjas", comprado: false})
    await this.agregarProducto({nombre: "Peras", comprado: true})
    await this.agregarProducto({nombre: "Frutillas", comprado: false})
  }

  async abrirConexion() {                    
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }

  async agregarProducto(producto:Producto) {
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_NOMBRE}) VALUES (?)`
    await this.db.run(sql, [producto.nombre])
  }

  async getProductos():Promise<Producto[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    return resultado?.values ?? []
  }
}
