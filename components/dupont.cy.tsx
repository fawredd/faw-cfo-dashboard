import React from 'react'
import Dupont from './dupont'

describe('<Dupont />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dupont />)
  })
})