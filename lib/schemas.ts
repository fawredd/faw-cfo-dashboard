export interface MetricSchema {
    title: string;
    value: number;
    target: number;
    type: 'currency' | 'margin';
    data: object[];
}

export interface SySSchema {
    fechadesde:string;
    fechahasta:string;
    items: 
    {
      codigo: string;
      cuenta: string;
      montosaldo_ini: number;
      montodebe: number;
      montohaber: number;
      montosaldo: number;
      montosaldo_fin: number;
    }[]
  }