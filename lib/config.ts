export const userMetrics: {
    name: string;
    dividend: string | number;
    divisor: string | number | undefined;
    target: number;
    type: 'currency' | 'margin';
  }[] = [
    {
      name: "Ingresos",
      dividend: "04.01",
      divisor: 1,
      target: 40000000,
      type: "currency"
    },
    {
      name: "EBIT",
      dividend: "04.01.01",
      divisor: 1,
      target: 17650000,
      type: "currency"
    },
    {
      name: "EBIT margin",
      dividend: "EBIT",
      divisor: "Ingresos",
      target: 0.5,
      type: "margin"
    },
    {
        name: "Test 1",
        dividend: 16.25,
        divisor: 1,
        target: 100,
        type: "currency"
      },
      {
        name: "Test 2",
        dividend: 0.35,
        divisor: 1,
        target: 1,
        type: "margin"
      },
  ];

  export const userFechaDesde = "2020/01/01" //Format yyyy/mm/dd
  export const userFechaHasta = "2020/12/31" //Format yyyy/mm/dd