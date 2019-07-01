// https://docs.cypress.io/api/introduction/api.html

describe('Contact us', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Shows contact methods', () => {
    cy.get('[data-cy=show-contact-methods]').click();

    cy.get('[data-cy=email-btn]').contains('Email');
    cy.get('[data-cy=phone-btn]').contains('Phone');
  });

  it('Shows email address', () => {
    cy.get('[data-cy=show-contact-methods]').click();
    cy.get('[data-cy=email-btn]').click();

    cy.get('[data-cy=contact-dialog]').should('be.visible').contains('develop@tygr.info');
  });

  it('Shows phone number', () => {
    cy.get('[data-cy=show-contact-methods]').click();
    cy.get('[data-cy=phone-btn]').click();

    cy.get('[data-cy=contact-dialog]').should('be.visible').contains('(802) 455-TYGR');
  });

  
  it('Hides buttons after 5 seconds', () => {
    cy.get('[data-cy=show-contact-methods]').click();
    cy.wait(5000);
    cy.get('[data-cy=phone-btn]').within(() => {
      // text should be invisible
      cy.get('.contact-text').should('not.be.visible');
      // fab should be exited
      cy.get('.mdc-fab--exited');
    });

    cy.get('[data-cy=email-btn]').within(() => {
      // text should be invisible
      cy.get('.contact-text').should('not.be.visible');
      // fab should be exited
      cy.get('.mdc-fab--exited');
    });
  });
});

describe('TyGr menu', () => {

  it('Redirects to home page', () => {
    cy.visit('/');
    cy.url().should('include', '/home');

    cy.get('[data-cy=pre-page-btn]').should('not.exist');
  });

  it('Goes to next page on next page click', () => {

    cy.wait(500).get('[data-cy=next-page-btn]').click();

    cy.url().should('include', '/cross-platform');
    cy.get('[data-cy=pre-page-btn]').should('be.visible');

    cy.wait(500).get('[data-cy=next-page-btn]').click();
    cy.url().should('include', '/single-page-application');

    cy.wait(500).get('[data-cy=next-page-btn]').click();
    cy.url().should('include', '/progressive-web-app');

    cy.wait(500).get('[data-cy=next-page-btn]').click();
    cy.url().should('include', '/full-stack');

    cy.wait(500).get('[data-cy=next-page-btn]').click();
    cy.url().should('include', '/best-practices');
    cy.get('[data-cy=next-page-btn]').should('not.exist');

  });

  it('Goes to previous page on pre page click', () => {

    cy.wait(500).get('[data-cy=pre-page-btn]').click();
    cy.url().should('include', '/full-stack');
    cy.get('[data-cy=next-page-btn]').should('be.visible');

    cy.wait(500).get('[data-cy=pre-page-btn]').click();
    cy.url().should('include', '/progressive-web-app');

    cy.wait(500).get('[data-cy=pre-page-btn]').click();
    cy.url().should('include', '/single-page-application');

    cy.wait(500).get('[data-cy=pre-page-btn]').click();
    cy.url().should('include', '/cross-platform');

    cy.wait(500).get('[data-cy=pre-page-btn]').click();
    cy.url().should('include', '/home');
    cy.get('[data-cy=pre-page-btn]').should('not.exist');

  });

});
