import performLoginSos from "@/lib/sos-contador/sos-login"
import KeyMetrics from "@/components/keyMetrics";

export default async function Home() {
  const data = await performLoginSos("30702250338")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>HOLA</p>
      <KeyMetrics />
    </main>
  );
}
