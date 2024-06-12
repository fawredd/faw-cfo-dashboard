import { Suspense } from "react";
import BarChartPlot from "@/components/barChartPlot";
import KeyMetrics from "@/components/keyMetrics";
import Dupont from "@/components/dupont";

import flowConstructor from "@/lib/sos-contador/setFlow";
import { userFechaDesde } from "@/lib/config";

export default async function Home() {
  const date = new Date(userFechaDesde);
  const year = date.getFullYear();
  const dataFlow = await flowConstructor();
  return (
    <main className="container grid lg:grid-cols-2 justify-center align-top">
      <div className="card m-3">
        <div className="card-title p-1 justify-center bg-gray-100">Dupont</div>
        <div className="card-body justify-center p-1">
          <Suspense fallback={<p>Loading...</p>}>
            <Dupont />
          </Suspense>
        </div>
      </div>

      <div className="card m-3">
        <div className="card-title p-1 bg-gray-100 justify-center">Principales indicadores ({year}) </div>
        <div className="card-body p-1">
          <Suspense fallback={<p>Loading...</p>}>
            <KeyMetrics />
          </Suspense>
        </div>
      </div>
      <div className="card m-3">
        <div className="card-title justify-center p-1 bg-gray-100">
          Flujo de fondos ({year})
        </div>
        <div className="card-body justify-center p-1">
          <Suspense fallback={<p>Loading...</p>}>
            <BarChartPlot dataFlow={dataFlow} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
