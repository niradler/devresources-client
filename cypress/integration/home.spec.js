/// <reference types="Cypress" />

context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('resources loading', () => {
    cy.get('.ant-card-body').should('exist');
  });

  it('categories', () => {
    cy.get('.ant-menu-item').should('exist');
  });
});
