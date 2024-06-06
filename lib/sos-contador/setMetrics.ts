import { MetricSchema, SySSchema } from "@/lib/schemas"; //Importo los esquemas
import { cuitSyS } from "./sos-sys"; // Importo la funcion que hace la consulta del sumas y saldos a la api
import performLoginSos from "./sos-login"; //Importo la funcion que obtiene el JWT del cuit
import { env } from "../env"; //env verifica que las variables de entorno esten cargadas

import { roundUpToNearestInteger, roundToDecimals } from "@/lib/utils"; //importo funciones utiles

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
  const data: SySSchema = await cuitSyS(jwt, "2021-01-01", "2021-12-31");
  return data;
}

/**
 * Interface that defines the arguments for the `computeMetrics` function.
 * @interface ComputeMetricsProps
 * @property {string} name - The name or identifier for the metric.
 * @property {string | number } dividend - The group of accounts as '04.01', or value that will be used as the dividend
 * @property {string | number | undefined } divisor - The group of accounts as '04.01.01' or value that will be used as the divisor. Can be `undefined`.
 */
interface ComputeMetricsProps {
  name: string;
  dividend: string | number;
  divisor: string | number | undefined;
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
      let indicators: { [key: string]: number }[] = [];
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
            )?.[item.divisor] as number;
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
              )?.[item.dividend] as number;
            }
          }
        }
        indicators.push({
          [item.name]: Math.round((dividend / divisor) * 100) / 100,
        });
      }
      
      console.log(JSON.stringify(indicators))

      for (let indicatorsItem of indicators) {
        for (let key in indicatorsItem) {
          const title = key.toUpperCase();
          const value = indicatorsItem[key];
          let target = roundUpToNearestInteger(value);
          const itemColor =
            value >= 0.6
              ? "lightgreen"
              : value > 0.25 && value <= 0.59
                ? "orange"
                : "tomatoe";
          if (value > target) target = value;
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
              value: value,
              color: "gray",
            },
          ];

          const item: MetricSchema = {
            title: title,
            value: value,
            target: target,
            type: 'currency',
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

const data: ComputeMetricsProps[] = [
  {
    name: "Ingresos",
    dividend: "04.01",
    divisor: undefined,
    type: "currency"
  },
  {
    name: "EBIT",
    dividend: "04.01.01",
    divisor: undefined,
    type: "currency"
  },
  {
    name: " EBIT margin",
    dividend: "EBIT",
    divisor: "Ingresos",
    type: "margin"
  },
];
computeMetrics(data);

/**
 * This function sums all accounts in account param group.
 * @param data Account balance
 * @param account Group of accounts
 * @returns Sum
 */
function reduceAccounts(data: AccountSchema[], account: string): number {
  const indicator = data.reduce(
    (acumulador: number, item: AccountSchema): number => {
      return item.codigo.slice(0, account.length) === account
        ? acumulador + Math.abs(item.montosaldo_fin)
        : acumulador;
    },
    0,
  );
  return indicator;
}

function startsWithNumber(input: string): boolean {
  return /^\d/.test(input);
}
