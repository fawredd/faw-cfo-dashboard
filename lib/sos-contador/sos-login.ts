"use server"

/**
 * ESTE MODULO SE ENCARGA DE OBTENER EL JWT DEL USUARIO DE SOS-CONTADOR 
*/ 
import { sosLoginConfig, savedUserData } from "./sos-config";
import { z } from "zod";
import jwtCache from "../jwtCache";

const cuitDataSchema = z.object(
  {
    jwt: z.string().trim().min(1, { message: 'required' }),
    cuitId: z.string().trim().min(4, { message: 'required' }),
  }
)

/**
 * Realiza el proceso de login en el server de sos-contador
 * y obtiene el jwt del usuario
 * @param {string} cuit El cuit de la empresa a consultar con formato '00-00000000-0'
 * @returns {string} El JWT del usuario y el JWT del cuit
 *
 * @ejemplo
 * performLoginSos('30-00000000-1') // Devuelve JWT o error.
 */
const performLoginSos = async (cuit: string ): Promise<string> => {

  try {
    if ((jwtCache.getJWT() ?? 0)){
      return jwtCache.getJWT() as string
    }
    console.log("--- Fetching user JWT --- ")
    const loginResponse = await fetch(sosLoginConfig.url,sosLoginConfig.options);
    console.log("--" + loginResponse.ok + "--")
    if (!loginResponse.ok){
      // Create a new Error object with details about the failed response
      const error = new Error(`SOS Login failed with status: ${loginResponse.status}`);
      throw error;
    }
    console.log("--- END Fetching user JWT --- ")
    const savedUserData = await loginResponse.json() as savedUserData;
    // console.log("JWT: " + JSON.stringify(savedUserData.jwt) + `\n Data: `+ JSON.stringify(savedUserData));
    
    let cuitIdResponse = savedUserData.cuits?.find((userCuit)=>{
      return (userCuit.cuit === cuit)
      })?.id.toString()
    
      //GET CUIT JWT
    const cuitData = cuitDataSchema.safeParse({jwt: savedUserData.jwt, cuitId: cuitIdResponse})
    if (cuitData.error){
      const error = new Error(`SOS Login failed with status: ${cuitData.error}`);
      throw error
    } 
    const {url: cuitUrl, options: cuitOptions} = getCuitCredentialsConfig(cuitData.data.jwt, cuitData.data.cuitId)
    const getCuitCredentialsResponse = await fetch(cuitUrl, cuitOptions);
    if (!getCuitCredentialsResponse.ok){
      const error = new Error(`SOS Login failed with status: ${getCuitCredentialsResponse.status}`);
      throw error
    }
    let savedCuitData = await getCuitCredentialsResponse.json();
    const expirationTimeInMs = 1*60*60*1000
    jwtCache.setJWT(savedCuitData.jwt, Date.now() + expirationTimeInMs)
    return savedCuitData.jwt

  } catch (error) {
    console.log(error);
  }
  return "Something went wrong"
};

/**
 * Configura el header a utilizar en el fetch para obtener jwt del cuit
 * @param {string} jwt Es el jwt del usuario
 * @param {string} cuitId Es el id obtenido que referencia al cuit
 * @returns {{header object}} 
 *
 * @ejemplo
 * getCuitCredentialsConfig("aakwerlakjv","4162") // Devuelve JWT o error.
 */
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


