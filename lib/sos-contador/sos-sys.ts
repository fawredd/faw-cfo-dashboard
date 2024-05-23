"use server"
import { login, getSession } from "../lib";

/**
* Modulo que hace la consulta de sumas y saldos del cuit seleccionado por periodo
* @param {string} jwtC Es el jwt obtenido de sos-login
* @param {string} fechadesde
* @param {string} fechahasta
* @returns {JSON} con los datos de sumas y saldos
*/

export const cuitSyS = async (jwtC: string,fechadesde:string, fechahasta:string) => {
  let raw = "";
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtC}`,
    },
  };

  try {
    
    const response = await fetch(
      `https://api.sos-contador.com/api-comunidad/sumasysaldos/listado/?fechadesde=${fechadesde}&fechahasta=${fechahasta}`,
      requestOptions,
    );
    if (!response.ok) throw Error;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
