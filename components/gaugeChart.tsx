"use client";
import { PieChart, Pie, Cell, Label, LabelList, ResponsiveContainer, Text, Tooltip } from "recharts"
interface GaugeChartProps {
  data:{
      name: string;
      value: number;
      color: string;
    }[];
}
const GaugeChart = ({data}:{data:object[]}) => {
  return (
    <>
    <ResponsiveContainer width="100%" height="100%" className="rounded-md min-h-full"> 
      <PieChart title="KPI">
        <Pie
          innerRadius="75%"
          outerRadius="100%"
          data={data}
          dataKey="valuePie"
          nameKey="name"
          blendStroke
          isAnimationActive={false}
        >
          {data.map((item:any, index:number) => {
            return (
              <Cell key={`${item.name+index}`} fill={`${item.color}`} />
            )
          })}
          
        </Pie>
        <Label value="valuePie" className="text-xs" />
      </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default GaugeChart;
