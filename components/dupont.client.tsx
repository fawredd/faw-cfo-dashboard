"use client";
import { useState, useEffect, ReactNode } from "react";

export default function DupontCliente({
  dupont,
}: {
  dupont: string[][];
}): ReactNode {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  let lastGroup = "";
  return (
    <div className={`overflow-x-auto`}>
      <table className="table table-xs">
        <thead>
          <tr key="header">
            {dupont.length ? (
              dupont[0].map((cell, index) => {
                if (index == 5) return null;
                return <th key={cell + "-" + index} className={`${(index>1 && index <5)?'text-right':''}`}>{cell}</th>;
              })
            ) : (
              <tr>Loading</tr>
            )}
          </tr>
        </thead>
        <tbody>
          {dupont.length ? (
            dupont.slice(1).map((row, index) => {
              const filaIndex = index;
              const fila = row.map((item, index) => {
                if (index == 5) return null;
                return (
                  <td
                    key={"[" + filaIndex + "]" + index}
                    className={`${index > 1 ? "text-right" : ""}`}
                  >
                   {item}
                  </td>
                );
              });

              let topBorder = "";
              if (lastGroup != row[5]) {
                console.log("i:" + index + " lg:"+ lastGroup + " g:"+row[5])
                topBorder = "border-t-[1px] border-t-gray-600 ";
                lastGroup = row[5]
              }

              return (
                <tr key={"row" + index} className={`border-b-0 ${topBorder}`}>
                  {fila}
                </tr>
              );
            })
          ) : (
            <td>...</td>
          )}
        </tbody>
      </table>
    </div>
  );
}
