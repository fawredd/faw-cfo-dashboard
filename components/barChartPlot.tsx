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
      <p> Error al leer mayor. {JSON.stringify(mayor)}</p>
      </>
    )
  }
  let data = mayor
  return (
    <div className="w-[600px] border-solid border-gray-200 border-2 rounded-xl overflow-hidden">
      <ResponsiveContainer className="min-h-[300px]">
        <ComposedChart
          data={data} 
          stackOffset="sign" 
          margin={{ top: 5, right: 5, bottom: 25, left: 25 }}
        >
          <XAxis dataKey="mes" className="text-xs">
            <Label position="bottom"> Mes del año </Label>
          </XAxis>
          <YAxis 
            domain={['auto', 'auto']} 
            tickFormatter={(value)=>{
              return Intl.NumberFormat('us').format(value)
            }}
            className="text-xs ml-2"
          >
            <Label position="left" angle={-90}>ARS</Label>
          </YAxis>
          <ReferenceLine y={0} stroke="black" />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Area dataKey={'Saldo acumulado'} stroke="green" fill="lightgreen" />
          <Bar dataKey={'Saldo del mes'}>
            {data.map((entry: { 'Saldo del mes': number; }, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={(entry['Saldo del mes']<0?"red":"blue")}
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
