import GaugeChart from "./gaugeChart";
import type { MetricSchema } from "@/lib/schemas";
import { formatNumber } from "@/lib/utils";
import { Suspense } from "react";

interface MetricProps {
  metric: MetricSchema;
}
export default async function Metric({ metric }: MetricProps) {
  return (
    <div className="m-1 p-1 grid aspect-[calc(384/96)] min-h-24 w-full max-w-96 grid-cols-3 rounded-md border-solid border-gray-500 bg-white text-[0.9rem] border-2 border-opacity-30">
      <div className="col-span-2 flex flex-col content-between justify-center pl-2 text-black">
        <p className="mb-2">{metric.title}</p>
        <p className="text-xl">
          {formatNumber(metric.value)}
          <span className="text-xs text-green-500">
            &nbsp;({((metric.value / metric.target) * 100).toFixed(2)}%)
          </span>
        </p>
        <p className="text-gray-500">Target: {formatNumber(metric.target)}</p>
      </div>
      <div className="h-full m-0 p-0">
        <GaugeChart data={metric.data} />
      </div>
    </div>
  );
}
