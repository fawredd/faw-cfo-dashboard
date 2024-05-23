
/* QUEDA PENDIENTE IMPORTAR LOS DATOS DEL SUMAS Y SALDOS */
let cuitSYS = {items:[]}

import type { MetricSchema } from "@/lib/schemas"
import { roundUpToNearestInteger, roundToDecimals } from "@/lib/utils";

interface Account {
    codigo: string,
    cuenta: string,
    montosaldo_ini: number,
    montodebe: number,
    montosaldo: number,
    montosaldo_fin: number
}

const revenue = cuitSYS.items.reduce((acumulador:number,item: Account):number => {
    return (item.codigo.slice(0,5) === "04.01")? (acumulador + Math.abs(item.montosaldo_fin)):acumulador
},0) as number
const EBIT = cuitSYS.items.reduce((acumulador:number,item: Account):number => {
    return (item.codigo.slice(0,8) === "04.01.01")? (acumulador + Math.abs(item.montosaldo_fin)):acumulador
},0)
const EBITmargin = (EBIT / revenue) * 100
const grossProfit = revenue - cuitSYS.items.reduce((acumulador:number,item: Account):number => {
    return (item.codigo.slice(0,5) === "04.02")? (acumulador + Math.abs(item.montosaldo_fin)):acumulador
},0)
const grossProfitMargin = (grossProfit / revenue) * 100
const netProfitMargin = grossProfit / EBIT
const ROI = grossProfit / cuitSYS.items.reduce((acumulador:number,item: Account):number => {
    return (item.codigo.slice(0,5) === "03.01")? (acumulador + Math.abs(item.montosaldo_fin)):acumulador
},0)
const expenses = cuitSYS.items.reduce((acumulador:number,item: Account):number => {
    return (item.codigo.slice(0,5) === "04.02")? (acumulador + Math.abs(item.montosaldo_fin)):acumulador
},0)

const kpis = {
    revenue: revenue,
    expenses: expenses,
    grossProfit: grossProfit,
    grossProfitMargin: grossProfitMargin,
    netProfitMargin: netProfitMargin,
    ROI: ROI,
    EBIT: EBIT,
    EBITmargin: EBITmargin
}

export let data:MetricSchema[] = []

for (const key in kpis) {
    const title = key.toUpperCase();
    const value = kpis[key];
    const target = roundUpToNearestInteger(value);
    const itemColor =
        value >= 0.6
        ? "green"
        : value > 0.25 && value <= 0.59
        ? "orange"
        : "red";
    const itemData = [
      {
        name: title,
        value: roundToDecimals(value / target),
        color: itemColor,
      },
      {
        name: "Target",
        value: roundToDecimals(1 - value / target),
        color: "gray",
      },
    ];
  
    const item: MetricSchema = {
      title: title,
      value: value,
      target: target,
      data: itemData,
    };
  
    data.push(item);
  }