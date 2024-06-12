import {Suspense} from 'react'

import fetchDupont from "@/lib/sos-contador/fetchDupont";
import DupontCliente from "./dupont.client";

export default async function Dupont() {
  const datos = await fetchDupont();
  const tabla = datos.split("\r\n").map((row) => {
    return [
      ...row.replace(/\"(\d*)\.*(\d+)[,](\d+%*)\"/g, "$1$2.$3").split(",").map((item,index)=>{
        if (!isNaN(parseFloat(item))){
          if (item.includes("%")){
            return (Math.round(parseFloat(item)*100)/100).toFixed(2) + '%'
          } else {
            return (Math.round(parseFloat(item)*100)/100).toFixed(2)
          }
        } else {
          return item
        }
      })
    ];
  })
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DupontCliente dupont={tabla} />
  </Suspense>
  );
}
