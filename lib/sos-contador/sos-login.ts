"use servrer"

import { error } from "console";
import { sosLoginConfig } from "./sos-config";
import { z } from "zod";
import { userDataExample } from "./userDataExample";

interface savedUserData {
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

const cuitDataSchema = z.object(
  {
    jwt: z.string().trim().min(1, { message: 'required' }),
    cuitId: z.string().trim().min(4, { message: 'required' }),
  }
)

const performLoginSos = async (cuit: string ): Promise<string> => {
  try {
    //GET USER JWT AND DATA
/*     const loginResponse = await fetch(sosLoginConfig.url,sosLoginConfig.options);
    if (!loginResponse.ok){
      throw error
    }
    const savedUserData = await loginResponse.json() as savedUserData; */
    const savedUserData = userDataExample
    console.log("JWT: " + JSON.stringify(savedUserData.jwt) + `\n Data: `+ JSON.stringify(savedUserData));
    
    let cuitIdResponse = savedUserData.cuits?.find((userCuit)=>{
      return (userCuit.cuit === cuit)
      })?.id.toString()
    
      //GET CUIT JWT
    const cuitData = cuitDataSchema.safeParse({jwt: savedUserData.jwt, cuitId: cuitIdResponse})
    if (cuitData.error){
      throw cuitData.error
    } 
    const {url: cuitUrl, options: cuitOptions} = getCuitCredentialsConfig(cuitData.data.jwt, cuitData.data.cuitId)
    const getCuitCredentialsResponse = await fetch(cuitUrl, cuitOptions);
    if (!getCuitCredentialsResponse.ok){
      throw error
    }
    let savedCuitData = await getCuitCredentialsResponse.json();
    console.log("JWTC: " + JSON.stringify(savedCuitData));
    
    return savedCuitData.jwt

  } catch (error) {
    console.log(error);
    throw error
  }
};

const getCuitCredentialsConfig = (
  jwt: string, cuitId: string
) => {
  return {
    url: `https://api.sos-contador.com/api-comunidad/cuit/credentials/${cuitId}`,
    options:{
      method: 'get',
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }
  }
}


export default performLoginSos


