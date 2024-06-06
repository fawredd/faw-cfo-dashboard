
// import KeyMetrics from "@/components/keyMetrics";

import { Suspense } from 'react'
import BarChartPlot from "@/components/barChartPlot";
import KeyMetrics from "@/components/keyMetrics";
import flowConstructor from "@/lib/sos-contador/setFlow";
import { userFechaDesde } from '@/lib/config';

export default async function Home() {
  const date = new Date(userFechaDesde)
  const year = date.getFullYear()
  const dataFlow = await flowConstructor()
  return (
    <main className="container grid ">

        <div className="card rounded-lg">
          <div className="card-title">Principales indicadores ({year}) </div>
          <div className="card-body p-2">
          <Suspense fallback={<p>Loading...</p>}>
            <KeyMetrics />
          </Suspense>
          </div>
        </div>
        <div className="card rounded-lg">
          <div className="card-title justify-center">Flujo de fondos ({year})</div>
          <div className="card-body justify-center p-2">
            <Suspense fallback={<p>Loading...</p>}>
                <BarChartPlot dataFlow={dataFlow}/>
            </Suspense>
          </div>
        </div>
    </main>
  );
}
