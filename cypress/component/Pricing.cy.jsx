import Pricing from '@/pages/pricing'

describe('Page.cy.jsx', () => {
    it('Pricing', () => {
        cy.mount(<Pricing/>)
        
        cy.wait(1000)
        cy.get('h3').contains('Monthly Plan')
        cy.get('h3').contains('Yearly Plan')
    
        // Validate that a link with the expected URL is present
        // Following the link is better suited to an E2E test
        cy.get('#pricing').should('exist')
        cy.get("#pricing").children().should("have.length", 2);
    })
  })