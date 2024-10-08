import BarChartPlot from "@/components/barChartPlot";
import KeyMetrics from "@/components/keyMetrics";

import flowConstructor from "@/lib/sos-contador/setFlow";
import { fetchDupontData } from "@/lib/sos-contador/fetchDupont";
import { userFechaDesde } from "@/lib/config";
import DupontChart from "@/components/dupontChart";

export default async function Home() {
  const date = new Date(userFechaDesde);
  const year = date.getFullYear();
  const dataFlow = await flowConstructor();
  const tabla  = await fetchDupontData();
  return (
    <main className="container grid gap-2 lg:grid-cols-2 justify-center align-top">
      
      <div className="card m-3 max-h-svh">
        <div className="card-title p-1 bg-gray-100 justify-center">Principales indicadores ({year}) </div>
        <div className="card-body p-1 overflow-y-auto">
            <KeyMetrics />
        </div>
      </div>

      <div className="card m-3 max-h-screen">
        <div className="card-title p-1 justify-center bg-gray-100">Dupont</div>
        <div className="card-body justify-center p-1 overflow-y-auto">
            <DupontChart dupont={tabla} />
        </div>
      </div>

      <div className="card m-3 max-w-full">
        <div className="card-title justify-center p-1 bg-gray-100">
          Flujo de fondos ({year})
        </div>
        <div className="card-body justify-center p-1 overflow-x-auto">
            <BarChartPlot dataFlow={dataFlow} />
        </div>
      </div>
    </main>
  );
}
