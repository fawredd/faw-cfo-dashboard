import { env } from "@/lib/env";
import performLoginSos from "@/lib/sos-contador/sos-login";
import { cuitSyS } from "@/lib/sos-contador/sos-sys";
import  kpis  from "@/lib/sos-contador/setMetrics"
import Metric from "./metric";
import type { MetricSchema } from "@/lib/schemas"

export default async function KeyMetrics() {
  const jwtC = await performLoginSos(env.CUIT);
  const cuitSys = await cuitSyS(jwtC, "2022-01-01", "2022-12-31");
  const data:MetricSchema = {
    title:"REVENUE",
    value:750,
    target: 1000,
    data:[
      { 
        name:"Revenue",
        value:0.75
      },
      { 
        name:"Target",
        value:0.25
      }
    ]
  }

  return (
  <>
      <div className="w-1/2 h-1/2 p-2">
        <Metric metric={data} />
      </div>
    </>
  );
}
