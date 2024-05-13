"use client";
import { PieChart, Pie, Cell, Label, LabelList, ResponsiveContainer } from "recharts"
interface GaugeChartProps {
  data: any
}
const GaugeChart = ({data}:GaugeChartProps) => {
  return (
    <>
    <ResponsiveContainer width="100%" aspect={1} className="bg-gray-300 rounded-md p-1">
      <PieChart height={250} width={250} className="text-xs" >
        <Pie
          startAngle={180}
          endAngle={0}
          innerRadius="50%"
          data={data}
          dataKey="value"
          nameKey="name"
          blendStroke
          isAnimationActive={false}
        >
          <Cell fill="green" />
        </Pie>
      </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default GaugeChart;
