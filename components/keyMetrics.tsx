import { metricas } from "@/lib/sos-contador/setMetrics";
import Metric from "./metric";

export default function KeyMetrics() {
  const data = metricas;
  return (
    <div className="grid gap-2 justify-center items-center align-center">
      {data.map((item, index) => {
        return <Metric key={`${item.title + index}`} metric={item} />;
      })}
    </div>
  );
}
