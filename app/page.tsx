
// import KeyMetrics from "@/components/keyMetrics";

import BarChartPlot from "@/components/barChartPlot";
import KeyMetrics from "@/components/keyMetrics";
import flowConstructor from "@/lib/sos-contador/setFlow";

export default async function Home() {
  const dataFlow = await flowConstructor()
  return (
    <main className="container grid grid-flow-row ">
        <BarChartPlot dataFlow={dataFlow}/>
        <KeyMetrics />
    </main>
  );
}
