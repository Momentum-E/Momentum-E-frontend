describe('Pricing Component', () => {

  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit('http://localhost:3000/pricing');
  });

  it('renders Signup component', () => {
    cy.get('[data-testid="register-form"]').should('exist');
  });
});