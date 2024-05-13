"use client";
import { PieChart, Pie, Cell } from "recharts"
const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
]
const GaugeChart = () => {
  return (
    <>
      <PieChart height={260} width={500}>
        <Pie
          startAngle={180}
          endAngle={0}
          innerRadius="55%"
          data={data01}
          dataKey="value"
          labelLine={true}
          blendStroke
          isAnimationActive={false}
          cy={"70%"}
        >
          <Cell fill="#000" />
          <Cell fill="#eaeaea" />
        </Pie>
      </PieChart>
    </>
  );
};

export default GaugeChart;
