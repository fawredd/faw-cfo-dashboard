'use server'
import { promises as fs } from 'fs';
async function fetchDupontCSV(){
    const file = await fs.readFile(process.cwd() + '/lib/sos-contador/indiceDupont.csv', 'utf8').then(res=>res);
    return await file
 }

 export async function fetchDupontData() {
    const datos = await fetchDupontCSV();
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
    return tabla;
  }