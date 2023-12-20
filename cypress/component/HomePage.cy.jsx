import HomePage from '@/pages/index'

describe('HomePage.cy.jsx', () => {
  it('Home Page', () => {
    cy.mount(<HomePage/>)

    cy.get('span').contains('and EV fleet management platform')
 
    // Validate that a link with the expected URL is present
    // Following the link is better suited to an E2E test
    cy.get('a[href="/auth/register"]').should('be.visible')
    cy.get('a[href="/auth/login"]').should('be.visible')
    cy.get('a[href="/"]').should('be.visible')
    cy.get('a[href="/pricing"]').should('be.visible')

    cy.get('#About_Us').should('exist')
    cy.get('#Heading').should('exist')
    cy.get('#Get_In_Touch').should('exist')
  })
})