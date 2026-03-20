describe("Navigation pages and users list", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/users").as("getUsers");
    cy.intercept("POST", "**/users").as("createUser");
    cy.visit("http://localhost:5173/");
    cy.wait("@getUsers");
  });

  it("creates a user and displays it on home", () => {
    cy.get('[data-testid="users-count"]')
      .invoke("text")
      .then((text) => {
        const initialCount = Number(text.trim());
        const email = `jean${Date.now()}@test.com`;

        cy.contains("Form").click();
        cy.url().should("include", "/form");

        cy.get('input[placeholder="lastname"]').type("Jean");
        cy.get('input[placeholder="firstname"]').type("Pierre");
        cy.get('input[placeholder="email"]').type(email);
        cy.get('input[placeholder="birth"]').type("1995-05-15");
        cy.get('input[placeholder="postCode"]').type("75001");
        cy.get('input[placeholder="town"]').type("Paris");

        cy.get('button[type="submit"]').click();

        cy.wait("@createUser").its("response.statusCode").should("eq", 200);
        cy.wait("@getUsers");

        cy.url().should("not.include", "/form");

        cy.get('[data-testid="users-list"]', { timeout: 10000 })
          .should("contain", email);

        cy.get('[data-testid="users-count"]', { timeout: 10000 })
          .invoke("text")
          .then((newText) => {
            expect(Number(newText.trim())).to.eq(initialCount + 1);
          });
      });
  });
});