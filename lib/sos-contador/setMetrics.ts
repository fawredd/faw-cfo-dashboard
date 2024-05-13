import {cuitSYS} from "./cuitSySdataExample"

interface Account {
    codigo: string,
    cuenta: string,
    montosaldo_ini: number,
    montodebe: number,
    montosaldo: number,
    montosaldo_fin: number
}

export default function kpis(){

const revenue = cuitSYS.items.reduce((acumulador:number,item: Account):number => {
    return (item.codigo.slice(0,5) === "04.01")? (acumulador + Math.abs(item.montosaldo_fin)):acumulador
},0)
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

return {
    revenue: revenue.toLocaleString("es-AR"),
    expenses: expenses.toLocaleString("es-AR"),
    grossProfit: grossProfit.toLocaleString("es-AR"),
    grossProfitMargin: grossProfitMargin.toLocaleString("es-AR") + "%",
    netProfitMargin: netProfitMargin.toLocaleString("es-AR") + "%",
    ROI: ROI.toLocaleString("es-AR")+"%",
    EBIT: EBIT.toLocaleString("es-AR"),
    EBITmargin: EBITmargin.toLocaleString("es-AR")+"%"    
}
}