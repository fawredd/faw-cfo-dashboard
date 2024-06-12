import { MetricSchema, SySSchema } from "@/lib/schemas"; //Importo los esquemas
import { cuitSyS } from "./sos-sys"; // Importo la funcion que hace la consulta del sumas y saldos a la api
import performLoginSos from "./sos-login"; //Importo la funcion que obtiene el JWT del cuit
import { env } from "../env"; //env verifica que las variables de entorno esten cargadas
import {userMetrics, userFechaDesde, userFechaHasta} from '../config'

import { reduceAccounts, roundUpToNearestInteger, roundToDecimals } from "@/lib/utils"; //importo funciones utiles

/**
 * Calcula y retorna un arreglo de métricas para un tablero de control.
 * @returns {MetricSchema[]} - Un arreglo de objetos que representan las métricas calculadas.
 *     Cada objeto en el arreglo tiene las siguientes propiedades:
 *     - title {string} - El título de la métrica.
 *     - value {number} - El valor actual de la métrica.
 *     - target {number} - El valor objetivo o meta de la métrica.
 *     - type {string} - El tipo de metrica 'currency' o 'margin'
 *     - data {object[]} - Un arreglo de objetos con datos adicionales relacionados con la métrica.
 */
export let metricas: MetricSchema[] = [];

interface AccountSchema {
  codigo: string;
  cuenta: string;
  montosaldo_ini: number;
  montodebe: number;
  montosaldo: number;
  montosaldo_fin: number;
}

async function getSumasySaldos(): Promise<SySSchema> {
  const jwt = await performLoginSos(env.CUIT);
  if (!jwt) {
    let error = new Error("Login error.");
    throw error;
  }
  const data: SySSchema = await cuitSyS(jwt, userFechaDesde, userFechaHasta);
  return data;
}

/**
 * Interface that defines the arguments for the `computeMetrics` function.
 * @interface ComputeMetricsProps
 * @property {string} name - The name or identifier for the metric.
 * @property {string | number } dividend - The group of accounts as '04.01', or value that will be used as the dividend
 * @property {string | number | undefined } divisor - The group of accounts as '04.01.01' or value that will be used as the divisor. Can be `undefined`.
 * @property {number} target - Target.
 * @property {string} type 'currency' | 'margin'
 */
interface ComputeMetricsProps {
  name: string;
  dividend: string | number;
  divisor: string | number | undefined;
  target: number;
  type: 'currency' | 'margin';
}

/**
 * Function that fetches accounts balance and returns indicators as needed
 * @params ComputeMetricsProps[]
 * @returns {
 *      title: title,
 *      value: value,
 *      target: target,
 *      data: itemData,
 *      }[]
 */

function computeMetrics(sourceData: ComputeMetricsProps[]): void {
  getSumasySaldos()
    .then((data) => {
      let indicators: {[key: string]:{value: number, target: number, type:'currency' | 'margin'}}[] = [];
      for (let item of sourceData) {
        // Verifico si el divisor es number, string o undefined para obtener su valor
        let divisor = 1;
        if (!(typeof item.divisor === "undefined")) {
          if (typeof item.divisor === "number") {
            //Caso divisor es numero
            divisor = item.divisor;
          } else {
            //Caso divisor es el nombre de un indicador
            // CORREGIR TIPOS DE DATOS Y VERIFICACIONES ------------------->>>>>>>>
            divisor = indicators.find(
              (i) => (item.divisor as string) in i,
            )?.[item.divisor].value as number;
          }
        }
        // Verifico si el dividendo es number, string para obtener su valor
        let dividend = 0;
        if (!(typeof item.dividend === "undefined")) {
          if (typeof item.dividend === "number") {
            //Caso dividendo es numero
            dividend = item.dividend;
            
          } else {
            //Caso dividendo es el nombre de un indicador o cuenta
            if (startsWithNumber(item.dividend)) {
              // CASO "04.01"
              dividend = reduceAccounts(data.items, item.dividend); //Obtengo el valor del dividendo
            } else {
              // CORREGIR TIPOS DE DATOS Y VERIFICACIONES ------------------->>>>>>>>
              dividend = indicators.find(
                (i) => (item.dividend as string) in i,
              )?.[item.dividend].value as number;
            }
          }
        }
        indicators.push({
          [item.name]: {
            value: Math.round((dividend / divisor) * 100) / 100,
            target: item.target,
            type: item.type,
          }
        });
      }
      
      // console.log(JSON.stringify(indicators))

      for (let indicatorsItem of indicators) {
        for (let key in indicatorsItem) {
          const title = key.toUpperCase();
          const value = indicatorsItem[key].value;
          let target = (value > indicatorsItem[key].target)? value:indicatorsItem[key].target; //Modifico valor de Target si es superado 
          const itemColor: string =
            (value/target) >= 0.6
              ? "lightgreen"
              : (value/target) > 0.25 && (value/target) <= 0.59
                ? "#ff7f00"
                : "#da0028";
          const itemData = [
            {
              name: title,
              valuePie: roundToDecimals(value / target),
              value: value,
              color: itemColor,
            },
            {
              name: "Target",
              valuePie: roundToDecimals(1 - value / target),
              value: (roundToDecimals(target-indicatorsItem[key].value)),
              color: "gray",
            },
          ];

          const item: MetricSchema = {
            title: title,
            value: value,
            target:indicatorsItem[key].target,
            type: indicatorsItem[key].type,
            color: itemColor,
            data: itemData,
          };
          
          metricas.push(item);
        }
      }

    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

//Run function
computeMetrics(userMetrics);

function startsWithNumber(input: string): boolean {
  return /^\d/.test(input);
}
