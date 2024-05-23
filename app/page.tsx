
// import KeyMetrics from "@/components/keyMetrics";

import BarChartPlot from "@/components/barChartPlot";
import flowConstructor from "@/lib/sos-contador/setFlow";

export default async function Home() {
  const flow = await flowConstructor()
  return (
    <main className="container">
      <div className="w-[600px]">
        <BarChartPlot mayor={flow}/>
      </div>
    </main>
  );
}
