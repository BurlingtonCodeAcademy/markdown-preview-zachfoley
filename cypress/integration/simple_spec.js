describe('Cypress', function () {
  it('successfully loads and asserts', function () {
    expect(true).to.equal(true);
  });
  it('successfully visits the home page', function () {
    cy.visit('/');
  });
});

describe('The Page', function () {
  before(function () {
    cy.visit('/');
  });

  it('has a headline', function () {
    cy.get('h1')
      .should('be.visible')
      .should('have.text', 'Markdown Preview')
  });

  it('has a source text field', function () {
    cy.get('textarea#source').should('be.visible');
  });

  it('has a preview area', function () {
    cy.get('div#preview').should('be.visible');
  });

  it('has a "render" button', function () {
    cy.get('button#render').should('be.visible');
  });
});

describe('The Render button', function () {
  it('converts markdown to some kind of text', function () {
    cy.get('textarea#source').type('# Hello');
    cy.get('button').click();
    cy.get('div#preview').should('be.visible');
    // cy.get('div#preview').should('have.text', 'Hello');     // this is a full match, but we want a partial match, to ignore newlines etc.
    // cy.get('div#preview').should('contain.text', 'Hello');  // bug: this does the same as have.text
    // cy.get('div#preview').should('include.text', 'Hello');  // bug: this also does the same as have.text
    cy.get('div#preview').then((el)=> {
      assert.include(el.text(), 'Hello');
    });
    console.log(cy.get('div#preview'));
  });

  it('converts markdown to html', function () {
    cy.get('textarea#source').clear();
    cy.get('textarea#source').type('# Hello');
    cy.get('button').click();
    cy.get('div#preview').within(function () {
      cy.get('h1').should('have.text', 'Hello');
    });
  });
});
