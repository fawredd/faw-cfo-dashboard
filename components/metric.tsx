import GaugeChart from "./gaugeChart";
import type { MetricSchema } from "@/lib/schemas";
import { formatNumber } from "@/lib/utils";

interface MetricProps {
    metric: MetricSchema
}
export default async function Metric({ metric }: MetricProps){

    return (
        <div className="grid grid-cols-2 w-full h-full rounded-md p-2 m-1 bg-white text-[0.5rem]">
            <div className="flex flex-col content-between justify-center text-black">
                <p>{metric.title}</p>
                <p>{ formatNumber(metric.value) }</p>
                <p className="text-gray-500">Target: { formatNumber(metric.target) }</p>
            </div>
            <GaugeChart data={metric.data} />   
        </div>
    )
}