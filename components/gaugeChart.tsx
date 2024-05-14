"use client";
import { PieChart, Pie, Cell, Label, LabelList, ResponsiveContainer, Text, Tooltip } from "recharts"
interface GaugeChartProps {
  data: any
}
const GaugeChart = ({data}:GaugeChartProps) => {
  return (
    <>
    <ResponsiveContainer width="100%" className="bg-gray-300 rounded-md">
      <PieChart width={100} height={50} className="text-xs" title="KPI">
        <Pie
          startAngle={180}
          endAngle={0}
          innerRadius="70%"
          outerRadius="130%"
          data={data}
          dataKey="value"
          nameKey="name"
          blendStroke
          isAnimationActive={false}
          paddingAngle={5}
          cy="70%"
        >
          {data.map((item:any, index:number) => {
            return (
              <Cell key={`${item.name+index}`} fill={`${item.color}`} />
            )
          })}
          
        </Pie>
        <Tooltip />
        <Text>Prueba</Text>
      </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default GaugeChart;
