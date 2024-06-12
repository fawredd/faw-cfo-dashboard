'use server'
import { promises as fs } from 'fs';

import { SySSchema } from "@/lib/schemas"; //Importo los esquemas
import { cuitSyS } from "./sos-sys"; // Importo la funcion que hace la consulta del sumas y saldos a la api
import performLoginSos from "./sos-login"; //Importo la funcion que obtiene el JWT del cuit
import { env } from "../env"; //env verifica que las variables de entorno esten cargadas
import { userFechaDesde, userFechaHasta} from '../config'

import { reduceAccounts, roundToDecimals } from "@/lib/utils"; //importo funciones utiles

async function getSumasySaldos(year:number): Promise<SySSchema> {
  const jwt = await performLoginSos(env.CUIT);
  if (!jwt) {
    let error = new Error("Login error.");
    throw error;
  }
  const data: SySSchema = await cuitSyS(jwt, userFechaDesde, userFechaHasta);
  return data;
}

async function fetchDupontSos(year):Promise<string[][]>{
  const sysData = await getSumasySaldos(year)
  const activo = reduceAccounts(sysData.items, "01")
  const pasivo = reduceAccounts(sysData.items, "02")
  const pn = reduceAccounts(sysData.items, "03")
  const ingresos = reduceAccounts(sysData.items, "04.01")
  const egresos = reduceAccounts(sysData.items, "04.02")
  const costoDeVentas = 0
  const resultado = ingresos - egresos
  const datos:string[][] = [
    ['Sistema Dupont','Indicador',year-2,year-1,year],
    ['','Activo',activo,activo,activo,0],
    ['ESTADO DE SITUACIÓN FINANCIERA','Pasivo',pasivo,pasivo,pasivo,0],
    ['','Patrimonio',pn,pn,pn,0],
    ['','Ventas',ingresos,ingresos,ingresos,1],
    ['','Costo de Ventas',costoDeVentas,costoDeVentas,costoDeVentas,1]
/* ,Utilidad Bruta,"23.000,00","25.000,00","26.000,00",1
,Gastos Operacionales,"12.000,00","11.000,00","14.600,00",1
ESTADO DE RESULTADOS,Utilidad Operacional,"11.000,00","14.000,00","11.400,00",1
,Ingresos no Operacionales,"2.000,00","2.900,00","3.800,00",1
,Gastos no Operacionales (Gasto de intereses),"8.000,00","9.600,00","13.400,00",1
,Utilidad antes de impuestos,"5.000,00","7.300,00","1.800,00",1
,Provision de impuestos 25%,"1.250,00","1.825,00","450,00",1
,Utilidad Neta,"3.750,00","5.475,00","1.350,00",1
Eficiencia Gestion Fiscal,Utilidad Neta / Utilidad antes de impuestos,"75,00%","75,00%","75,00%",2
Eficiencia Gestión Financiera,Utilidad antes de impuestos / Utilidad Operacional,"45,45%","52,14%","15,79%",2
Eficiencia Gestión Gastos Operativos,Utilidad Operacional / Utilidad Bruta,"47,83%","56,00%","43,85%",2
Margen Bruto,Utilidad Bruta / Ventas,"38,33%","36,76%","34,67%",2
Margen Neto,EG Fiscal * EG Financiera * EG Gastos Oper * Margen Bruto,"6,25%","8,05%","1,80%",3
Margen Neto,Utilidad Neta / Ventas,"6,25%","8,05%","1,80%",3
Rotación del Activo,Ventas / Activo,"0,50","0,47","0,48",3
Rendimiento sobre el Activo (RSA),Margen Neto * Rotación del Activo,"3,13%","3,78%","0,87%",4
Rendimiento sobre el Activo (RSA),Utilidad Neta / Activo,"3,13%","3,78%","0,87%",4
Multiplicador del Capital,Activo / Patrimonio,"4,00","4,14","6,24",4
INDICE DUPONT,Rendimiento sobre el Activo RSA * Multiplicador del Capital,"12,50%","15,64%","5,40%",5
Return On Equity (ROE),Utilidad Neta / Patrimonio,"12,50%","15,64%","5,40%",5 */
  ]
  return datos
}

async function fetchDupontCSV(){
  const file = await fs.readFile(process.cwd() + '/lib/sos-contador/indiceDupont.csv', 'utf8').then(res=>res);
  const datos = file.split("\r\n").map((row) => {
    return [
      ...row.replace(/\"(\d*)\.*(\d+)[,](\d+%*)\"/g, "$1$2.$3").split(",").map((item,index)=>{
        if (!isNaN(parseFloat(item))){
          if (item.includes("%")){
            return (Math.round(parseFloat(item)*100)/100).toFixed(2) + '%'
          } else {
            return (Math.round(parseFloat(item)*100)/100).toFixed(2)
          }
        } else {
          return item
        }
      })
    ];
  })
  return datos
}

export async function fetchDupontData() {
    // const tabla = await fetchDupontCSV();
    const tabla = await fetchDupontSos(2023)
    return tabla;
  }