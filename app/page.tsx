
// import KeyMetrics from "@/components/keyMetrics";

import BarChartPlot from "@/components/barChartPlot";
import KeyMetrics from "@/components/keyMetrics";
import flowConstructor from "@/lib/sos-contador/setFlow";

export default async function Home() {
  const dataFlow = await flowConstructor()
  return (
    <main className="container grid grid-flow-row ">
        <div className="card rounded-lg">
          <div className="card-title justify-center">Flujo de fondos</div>
          <div className="card-body">
            <BarChartPlot dataFlow={dataFlow}/>
          </div>
        </div>
        <div className="card rounded-lg">
          <div className="card-title text-center">Principales indicadores</div>
          <div className="card-body">
          <KeyMetrics />
          </div>
        </div>

    </main>
  );
}
