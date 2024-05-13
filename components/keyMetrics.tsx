import { env } from "@/lib/env";
import performLoginSos from "@/lib/sos-contador/sos-login";
import { cuitSyS } from "@/lib/sos-contador/sos-sys";
import  kpis  from "@/lib/sos-contador/setMetrics"
import AreaChartPlot from "./areaChartPlot";

export default async function KeyMetrics() {
  const jwtC = await performLoginSos(env.CUIT);
  const cuitSys = await cuitSyS(jwtC, "2022-01-01", "2022-12-31");

  return (
    <>
      <div className="text-sm h-96 w-96">
        <AreaChartPlot />
      </div>
    </>
  );
}
