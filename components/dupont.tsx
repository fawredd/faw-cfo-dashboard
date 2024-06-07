import fetchDupont from "@/lib/sos-contador/fetchDupont";
import DupontCliente from "./dupont.client"

export default async function Dupont() {
    const datos = await fetchDupont()
    const tabla = datos.split("\r\n").map((row) => {
        return [
          ...row.replace(/\"(\d*)\.*(\d+)[,](\d+%*)\"/g, "$1$2.$3").split(",")
        ]
      });
    console.log(tabla)
    return <DupontCliente dupont={tabla} />
}
