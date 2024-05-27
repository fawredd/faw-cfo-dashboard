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
  Label,
  LineChart,
  ComposedChart,
  Line,
  Area,
} from "recharts";

const BarChartPlot = ({mayor}:{mayor:any}) => {
  //console.log(mayor.items)
  if (!mayor){
    return (
      <>
      <p> Error al leer mayor.</p>
      </>
    )
  }
  interface DataItem {
    mes: string;
    'Saldo del mes': number;
    'Saldo acumulado': number;
  }
  const data:DataItem[] = mayor
  

  return (
    <div className="w-[600px] border-solid border-gray-200 border-2 rounded-xl overflow-hidden">
      <ResponsiveContainer className="min-h-[300px]">
        <ComposedChart
          data={data} 
          stackOffset="sign" 
          margin={{ top: 5, right: 5, bottom: 25, left: 45 }}
        >
          <XAxis xAxisId="delMes" dataKey="mes" className="text-xs">
            <Label position="bottom"> Mes del año </Label>
          </XAxis>
          <XAxis xAxisId="acumulado" dataKey="mes" className="text-xs" hide />
          <YAxis 
            tickFormatter={(value)=>{
              return "$" + Intl.NumberFormat('us').format(value)
            }}
            className="text-xs ml-2"
          >
            <Label position="left" angle={-90}>ARS</Label>
          </YAxis>
          <ReferenceLine xAxisId="acumulado" y={0} stroke="black" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar xAxisId="acumulado" dataKey={'Saldo acumulado'} stroke="green" fill="green"/>
          <Bar xAxisId="delMes" dataKey={'Saldo del mes'}>
            {data.map((entry: { 'Saldo del mes': number; }, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={(entry['Saldo del mes']<0?"tomato":"lightgreen")}
                className="opacity-50"
              />
            ))}
          </Bar>
          {/* <Bar dataKey={'Saldo acumulado'} fill="green" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
export default BarChartPlot;
