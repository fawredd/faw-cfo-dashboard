import GaugeChart from "./gaugeChart";
import type { MetricSchema } from "@/lib/schemas";
import { formatNumber } from "@/lib/utils";
import { Suspense } from "react";

interface MetricProps {
    metric: MetricSchema
}
export default async function Metric({ metric }: MetricProps){

    return (
        <div className="grid grid-cols-3 w-full min-h-24 max-w-96 aspect-[calc(384/96)] rounded-md p-2 m-1 bg-white text-[0.9rem]">
            <div className="flex flex-col content-between justify-center text-black col-span-2 pl-2">
                <p className="mb-2">{metric.title}</p>
                <p className="text-xl">{ formatNumber(metric.value)}<span className="text-green-500 text-xs">&nbsp;({(metric.value/metric.target*100).toFixed(2)}%)</span></p>
                <p className="text-gray-500">Target: { formatNumber(metric.target) }</p>
            </div>
            <Suspense>
                <GaugeChart data={metric.data} />   
            </Suspense>
        </div>
    )
}