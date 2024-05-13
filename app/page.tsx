import performLoginSos from "@/lib/sos-contador/sos-login"
import KeyMetrics from "@/components/keyMetrics";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-24">
      <p>HOLA</p>
      <KeyMetrics />
    </main>
  );
}
