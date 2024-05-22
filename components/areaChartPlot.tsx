"use client"

import { mayor } from '@/lib/sos-contador/userDataExample'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const AreaChartPlot = () => {
    //console.log(mayor.items)
    let data = mayor.items.map( (item) => {
      const mes = item.fecha.slice(5,7)
      return {
        mes: `${mes}`,
        montosaldo: item.montosaldo
      }
    })
    //console.log(data)
    data = data.reduce((acc: { mes: string; montosaldo: number; }[], item) => {
      if (!acc) {
        acc = [{ mes: item.mes, montosaldo: 0 }];
      } else {
        const existingIndex = acc.findIndex(i => i.mes === item.mes);
        if (existingIndex === -1) {
          acc.push({ mes: item.mes, montosaldo: 0 });
        }
      }
      let suma = acc.find(i => i.mes === item.mes).montosaldo
      suma = Math.round((suma + item.montosaldo)*100/100)
      acc.find(i => i.mes === item.mes).montosaldo = suma
      return acc;
    }, []);
    console.log(JSON.stringify(data))
    return (
        <>
          <ResponsiveContainer width="100%" height="100%" >
            <AreaChart width={730} height={250} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign='top' />
              <Area type="monotone" dataKey="montosaldo" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

            </AreaChart>
          </ResponsiveContainer>
        </>
      )
  } 
  export default AreaChartPlot;