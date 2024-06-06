import { metricas } from "@/lib/sos-contador/setMetrics";
import Metric from "./metric";

export default async function KeyMetrics() {
  const data = metricas;
  return (
    <div className="flex w-full flex-row flex-wrap gap-2 items-center align-middle justify-center">
      {data.map((item, index) => {
        return <Metric key={`${item.title + index}`} metric={item} />;
      })}
    </div>
  );
}
