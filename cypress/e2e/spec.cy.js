describe('home page spec', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Registration Form');
  })
})