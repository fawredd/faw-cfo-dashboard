import React from 'react'
import BarChartPlot from './barChartPlot'

interface DataItem {
  mes: string;
  'Saldo del mes': number;
  'Saldo acumulado': number;
}

let dataFlow:DataItem[] = [
  {mes:'1','Saldo del mes':100,'Saldo acumulado':100},
  {mes:'2','Saldo del mes':50,'Saldo acumulado':150},
  {mes:'3','Saldo del mes':75,'Saldo acumulado':75},
]

describe('<BarChartPlot />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BarChartPlot dataFlow={dataFlow} />)
  })
})