"use client";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  ReferenceLine,
  Cell,
} from "recharts";

const BarChartPlot = ({mayor}:{mayor:any}) => {
  //console.log(mayor.items)
  if (!mayor){
    return (
      <>
      <p> Error al leer mayor. {JSON.stringify(mayor)}</p>
      </>
    )
  }
  let data = mayor.items.map((item:any) => {
    const mes = item.fecha.slice(5, 7);
    return {
      mes: `${mes}`,
      montosaldo: item.montosaldo,
    };
  })
  .reduce((acc: { mes: string; montosaldo: number }[], item:{ mes:string, montosaldo: number}) => {
    if (!acc) {
      acc = [{ mes: item.mes, montosaldo: 0 }];
    } else {
      const existingIndex = acc.findIndex((i) => i.mes === item.mes);
      if (existingIndex === -1) {
        acc.push({ mes: item.mes, montosaldo: 0 });
      }
    }
    let suma = acc.find((i) => i.mes === item.mes)?.montosaldo || 0;
    suma = Math.round(((suma + item.montosaldo) * 100) / 100);
    acc.find((i) => i.mes === item.mes).montosaldo = suma;
    return acc;
  }, [])

  //console.log(JSON.stringify(data))
  
  return (
    <>
      <ResponsiveContainer className="min-h-[300px]">
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <ReferenceLine y={0} stroke="#000" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="montosaldo">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={(entry.montosaldo<0?"red":"blue")}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default BarChartPlot;
