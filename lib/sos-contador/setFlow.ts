import performLoginSos from "@/lib/sos-contador/sos-login";
import consultaMayor from "@/lib/sos-contador/sos-mayor";
import { env } from "@/lib/env";
/**
 * Este modulo se encarga de confeccionar el flujo de datos
 * unificado de todas las cuentas indicadas en el periodo seleccionado.
 * @param {string} accounts 
 * @returns
 */
const flowConstructor = async (accounts?:string[]) => {
  let cuentas = ["01.01.01.003.003","01.01.01.001.001","01.01.01.003.002"]
  const fechaDesde = "2021-01-01"
  const fechaHasta = "2021-12-31"
  const allData = await readAllMayores(cuentas, fechaDesde, fechaHasta)
  
  let data = allData.map((item: any) => {
        const mes = item.fecha.slice(5, 7);
        if (item.clipro == "ASIENTO CIERRE ") item.montosaldo = 0;
        return {
          mes: `${mes}`,
          montosaldo: item.montosaldo,
        };
      })
      .reduce(
        (
          acc: { mes: string; montosaldo: number; montoacumulado: number }[],
          item: { mes: string; montosaldo: number },
        ) => {
          if (!acc) {
            acc = [{ mes: item.mes, montosaldo: 0, montoacumulado: 0 }];
          } else {
            const existingIndex = acc.findIndex((i) => i.mes === item.mes);
            if (existingIndex === -1) {
              if (acc.length > 0) {
                acc.push({
                  mes: item.mes,
                  montosaldo: 0,
                  montoacumulado: acc[acc.length - 1].montoacumulado,
                });
              } else {
                acc.push({ mes: item.mes, montosaldo: 0, montoacumulado: 0 });
              }
            }
          }
          const foundedItem = acc.find((i) => i.mes === item.mes)
          if (foundedItem){
            let acumulado = foundedItem.montoacumulado;
            let suma = foundedItem.montosaldo;
            acumulado = Math.round(((acumulado ?? 0) + item.montosaldo) * 100) / 100;
            suma = Math.round(((suma ?? 0) + item.montosaldo) * 100) / 100;
            foundedItem.montosaldo = suma;
            foundedItem.montoacumulado = acumulado;
          }
          return acc;
        },
        [],
      );
  interface NewData {
    mes: string;
    'Saldo del mes': number;
    'Saldo acumulado': number;
  }    
  let newData: NewData[] = data.map(item => ({
    mes: item.mes,
    'Saldo del mes': item.montosaldo,
    'Saldo acumulado': item.montoacumulado
  }));
  return newData
};

export default flowConstructor;

async function readAllMayores(cuentas:string[], fechaDesde:string, fechaHasta:string){
    const cuit = env.CUIT;
    const jwtC = await performLoginSos(cuit);
    let datos:{}[] = []
    for (let cuenta of cuentas){
        //console.log(cuenta)
         let mayor = await consultaMayor(
            jwtC,
            fechaDesde,
            fechaHasta,
            "1",
            "9999999",
            cuenta,
        ); 
        if (mayor.items?.length) {
            datos = [...datos,...mayor.items];
        }
    }
    return datos
}