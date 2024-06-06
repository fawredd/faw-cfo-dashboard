"use server"

/**
* Modulo que hace la consulta del plan de cuentas del cuit seleccionado
* @param {string} jwtC Es el jwt obtenido de sos-login
* @returns {JSON} con los datos de sumas y saldos
*/


const planDeCuentas = async (
  jwtC: string,
) => {
  interface PlanDeCuentasSchema {
    items: {
      id: number | null;
      rubro: string;
      cuenta: string | null;
    }[]
  }
  let raw = "";
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtC}`,
    },
  };

  try {
    const url = `https://api.sos-contador.com/api-comunidad/cuentacontable/listado`
    //console.log (url)
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      const error = new Error(`SOS failed with status: ${response.status}`);
      throw error
    }
    const data:PlanDeCuentasSchema = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default planDeCuentas
