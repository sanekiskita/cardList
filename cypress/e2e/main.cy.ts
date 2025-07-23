// https://on.cypress.io/api

describe('Main page', () => {
  it('visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Отображение карточек');
    cy.contains('p', 'Выберите источник для отображния карточек');
  });

  it('change color', () => {
    cy.visit('/');

    cy.get('select#theme').select('dark');

    cy.get('html')
      .should('have.attr', 'main-theme', 'dark');
  });
});
