// cypress/integration/Login.cy.js

describe('Login Page', () => {
  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit('http://localhost:3000/auth/login');
  });

  it('should display the login form', () => {
    // Assertions related to the login form
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('[data-testid="login-submit-btn"]').should('be.visible');
  });

  it('should display an error message for invalid credentials', () => {
    // Test for displaying an error message for invalid login
    cy.get('#email').type('mannandassani@momentum-e.com');
    cy.get('#password').type('HelloWorld');
    cy.get('[data-testid="login-submit-btn"]').click();

    // Assertions for the error message
    // cy.get('[data-testid="login-error-message"]').should('be.visible');
    cy.contains('No data found for the provided email').should('be.visible');
  });

  it('should log in with valid credentials', () => {
    // Test logging in with valid credentials
    cy.get('#email').type('mannandassani@momentum-e.com');
    cy.get('#password').type('Password!200');
    cy.get('[data-testid="login-submit-btn"]').click();

    // Assertions for successful login
    cy.url().should('eq', 'http://localhost:3000/dashboard');
  });
});
