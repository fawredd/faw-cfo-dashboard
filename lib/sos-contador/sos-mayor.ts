"use server"

/**
* Modulo que hace la consulta de de un mayor de cuenta del cuit seleccionado por periodo
* @param {string} jwtC Es el jwt obtenido de sos-login
* @param {string} fechadesde
* @param {string} fechahasta
* @param {string} pagina Se refiere al numero de pagina a consultar del total de paginas
* @param {string} registros Numero de registros
* @returns {JSON} con los datos de sumas y saldos
*/


const consultaMayor = async (
  jwtC: string,
  fechadesde:string,
  fechahasta:string,
  pagina: string,
  registros: string,
  arbol: string
) => {
  
  let raw = "";
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtC}`,
    },
  };

  try {
    const url = `https://api.sos-contador.com/api-comunidad/mayor/listado/?fechadesde=${fechadesde}&fechahasta=${fechahasta}&pagina=${pagina}&registros=${registros}&arbol=${arbol}`
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      const error = new Error(`SOS Login failed with status: ${response.status}`);
      throw error
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default consultaMayor
