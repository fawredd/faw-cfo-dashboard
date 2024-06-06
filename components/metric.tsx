import GaugeChart from "./gaugeChart";
import type { MetricSchema } from "@/lib/schemas";
import { formatNumber } from "@/lib/utils";
import { Suspense } from "react";

interface MetricProps {
  metric: MetricSchema;
}
export default function Metric({ metric }: MetricProps) {
  let color = 'text-green-500'
  if ( metric.color == '#ff7f00') {
    color = 'text-warning'
  }else if ( metric.color == '#da0028') {
    color ='text-error'
  }
  return (
    <div className="m-1 p-1 grid grid-flow-row grid-cols-3 aspect-[calc(288/96)] min-h-24 w-full max-w-72 rounded-md border-solid border-gray-500 bg-white text-[0.9rem] border-2 border-opacity-30">
      <div className="col-span-2 flex flex-col content-between justify-center pl-2 text-black">
        <p className="mb-2">{metric.title}</p>
        <p className="text-xl">
          {(metric.type=='currency')?formatNumber(metric.value):Math.round(metric.value*100)/100 }
          <span className={`text-xs ${color}`}>
            &nbsp;({((metric.value / metric.target) * 100).toFixed(2)}%)
          </span>
        </p>
        <p className="text-gray-500">Target: {(metric.type=='currency')?formatNumber(metric.target):Math.round(metric.target*100)+"%" }</p>
      </div>
      <div className="h-full m-0 p-0">
        <GaugeChart data={metric.data} />
      </div>
    </div>
  );
}
