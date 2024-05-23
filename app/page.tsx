
// import KeyMetrics from "@/components/keyMetrics";

import BarChartPlot from "@/components/barChartPlot";
import performLoginSos from "@/lib/sos-contador/sos-login";
import consultaMayor from "@/lib/sos-contador/sos-mayor";
import { env } from "@/lib/env";

export default async function Home() {
  const cuit = env.CUIT
  const jwtC = await performLoginSos(cuit)
  const mayor = await consultaMayor(jwtC,"2021-01-01","2021-12-31","1","9999999","01.01.01.003.003")  
  
  return (
    <main className="container">
      <div className="w-[600px]">
        <BarChartPlot mayor={mayor}/>
      </div>
    </main>
  );
}
