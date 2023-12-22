describe('Signup Component', () => {

  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit('http://localhost:3000/auth/register');
  });

  it('renders Signup component', () => {
    cy.get('[data-testid="register-form"]').should('exist');
  });

  it('submits the form with invalid data', () => {
    cy.get('[data-testid="register-submit-btn"]').should('have.attr', 'disabled');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');
    cy.get('#company').type('Momentum-Test');
    // cy.get('#country').select('Spain')
    // cy.get('#state').type('Madrid');
    // cy.get('#city').type('Madrid');
    // cy.get('#policy_agreement').click();
    cy.get('label[for="policy_agreement"]').click();
    cy.get('[data-testid="register-submit-btn"]').click();

    // Add assertions for un-successful submission
    cy.contains('No data found for the provided email').should('be.visible');
  });

  it('submits the form with valid data', () => {
    cy.get('[data-testid="register-submit-btn"]').should('have.attr', 'disabled');
    cy.get('#email').type('mannandassani@momentum-e.com');
    cy.get('#password').type('Password!200');
    cy.get('#confirmPassword').type('Password!200');
    cy.get('#company').type('Momentum-Test');
    // cy.get('#country').select('Spain')
    // cy.get('#state').type('Madrid');
    // cy.get('#city').type('Madrid');
    // cy.get('#policy_agreement').click();
    cy.get('label[for="policy_agreement"]').click();
    cy.get('[data-testid="register-submit-btn"]').click();

    // Add assertions for successful submission
    cy.contains('No data found for the provided email').should('be.visible');
  });
});