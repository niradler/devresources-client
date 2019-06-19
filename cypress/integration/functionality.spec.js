/// <reference types="Cypress" />

context('Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('search', () => {
    cy.get('#search')
      .type('npm')
      .should('have.value', 'npm');

    cy.get('.anticon-loading').should('exist');
    cy.get('.anticon-user').should('exist');
  });

  it('sort', () => {
    cy.get('.ant-menu > li:nth-child(2)').click();

    cy.get('.ant-menu-item-selected').should('exist');
    cy.get('.ant-menu-item-selected').should('have.text', 'npm');
  });
});
