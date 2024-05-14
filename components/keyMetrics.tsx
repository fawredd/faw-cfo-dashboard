import { env } from "@/lib/env";

/* import performLoginSos from "@/lib/sos-contador/sos-login";
import { cuitSyS } from "@/lib/sos-contador/sos-sys"; */

import  { data }  from "@/lib/sos-contador/setMetrics"
import Metric from "./metric";
import type { MetricSchema } from "@/lib/schemas"


export default async function KeyMetrics() {

  /*   const jwtC = await performLoginSos(env.CUIT);
  const cuitSys = await cuitSyS(jwtC, "2022-01-01", "2022-12-31"); */
  
  return (
  <>
      <div className="flex flex-row flex-wrap gap-3 w-full">
        { data.map((item,index) => {
          return (
            <Metric key={`${item.title+index}`} metric={item} />
          )
        }) }
      </div>
    </>
  );
}
