import { env } from "../env";

const sosLoginData = JSON.stringify({
    "usuario": env.SOS_USER,
    "password": env.SOS_PASS
  });
  
export const sosLoginConfig = {
    url: 'https://api.sos-contador.com/api-comunidad/login',
    options:{
        method: 'post',
        maxBodyLength: Infinity,
        headers: { 
        'Content-Type': 'application/json'
        },
        body: sosLoginData
    }
};

export interface savedUserData {
    jwt: string,
    idusuario: string,
    cuits: [
      {
        id:string,
        cuit: string,
        razonsocial: string
      }
    ] | undefined
  }