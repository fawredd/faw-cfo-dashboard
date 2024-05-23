import performLoginSos from "@/lib/sos-contador/sos-login";
import consultaMayor from "@/lib/sos-contador/sos-mayor";
import { env } from "@/lib/env";

const flowConstructor = async () => {
  let cuentas = ["01.01.01.003.003","01.01.01.001.001"]
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
          let acumulado = acc.find((i) => i.mes === item.mes)?.montoacumulado;
          let suma = acc.find((i) => i.mes === item.mes)?.montosaldo;
          acumulado = Math.round((acumulado + item.montosaldo) * 100) / 100;
          suma = Math.round((suma + item.montosaldo) * 100) / 100;
          acc.find((i) => i.mes === item.mes).montosaldo = suma;
          acc.find((i) => i.mes === item.mes).montoacumulado = acumulado;
          return acc;
        },
        [],
      );
  return data
};

export default flowConstructor;

async function readAllMayores(cuentas:string[], fechaDesde:string, fechaHasta:string){
    const cuit = env.CUIT;
    const jwtC = await performLoginSos(cuit);
    let datos = []
    for (let cuenta of cuentas){
        console.log(cuenta)
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