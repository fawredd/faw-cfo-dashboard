"use client";
import { useState, useEffect, ReactNode } from "react";

export default function DupontCliente({dupont}:{dupont:string[][]}):ReactNode {
  
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
      setLoaded(true);
  },[]);

  return (
      <div className={`overflow-x-auto`}>
        <table className="table table-xs">
          <thead>
            <tr>
              {(dupont.length)?dupont[0].map((cell, index) => {
                return <th key={cell + "-" + index}>{cell}</th>;
              }):<tr>Loading</tr>}
            </tr>
          </thead>
          <tbody>
            {(dupont.length)?dupont.slice(1).map((row, index) => {
              const filaIndex = index
              const fila = row.map((item, index) => (
                <td key={'['+filaIndex+']'+index} className={`${(index>1)?'text-right':''}`}>{item}</td>
              ));
              return <tr key={"row" + index}>{fila}</tr>;
            }):<td>...</td>}
          </tbody>
        </table>
      </div>
    )
}
