"use client";

import { debug } from "console";
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
  let data = mayor
  return (
    <>
      <ResponsiveContainer className="min-h-[300px]">
        <BarChart data={data} stackOffset="sign" margin={{ top: 5, right: 5, bottom: 5, left: 30 }}>
          <XAxis dataKey="mes" />
          <YAxis domain={['auto', 'auto']} />
          <ReferenceLine y={0} stroke="#FFFFFF" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="montosaldo" stackId="stack">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={(entry.montosaldo<0?"red":"blue")}
              />
            ))}
          </Bar>
          <Bar dataKey="montoacumulado" fill="green" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default BarChartPlot;
