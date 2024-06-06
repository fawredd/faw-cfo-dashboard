let instance: JWTCache | null = null;

class JWTCache {
  private cache: { jwt: string | null; expirationTime: number | null } = {
    jwt: null,
    expirationTime: null,
  };
  constructor() {
    this.cache = { jwt: null, expirationTime:null }
  }

  static getInstance():JWTCache {
    if (!instance) {
      instance = new JWTCache();
    }
    return instance;
  }

  setJWT(jwt:string , expirationTime:number ) {
    this.cache.jwt = jwt;
    this.cache.expirationTime = expirationTime;
  }

  getJWT():string | null {
    if (this.cache.jwt && (this.cache.expirationTime ?? 0) > new Date().getTime()) {
      return this.cache.jwt;
    }
    return null;
  }

  clearJWT():void {
    this.cache.jwt = null;
    this.cache.expirationTime = null;
  }
}

/** 
 * Este modulo devuelve una instancia de modelo sigleton para poder hacer cache 
 * del jwt obtenido del servidor y asi evitar el uso de consultas excesivas a la api
 * @return {JWTCache} Retorna la instancia de JWTCache
 */
export default JWTCache.getInstance();
