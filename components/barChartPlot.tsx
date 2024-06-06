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

interface DataItem {
  mes: string;
  'Saldo del mes': number;
  'Saldo acumulado': number;
}
const BarChartPlot: React.FC<{dataFlow:DataItem[]}> = ({dataFlow}) => {

  if (!dataFlow){
    return (
      <>
      <p> Error al leer mayor.</p>
      </>
    )
  }
  const data = dataFlow
  return (
    <div className="max-w-[600px] min-w-80 min-h-80 aspect-video border-solid border-gray-200 border-2 rounded-xl overflow-hidden p-0 m-0">
      <ResponsiveContainer className="min-h-80">
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
          <CartesianGrid vertical={false} fillOpacity={0.6} />
          <ReferenceLine xAxisId="acumulado" y={0} stroke="black" />
          <Tooltip />
          <Legend 
            verticalAlign="top"
            formatter={(value, entry, index) => <span key={`Legend-${index}`} className="text-xs">{value}</span>}  
          />
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
