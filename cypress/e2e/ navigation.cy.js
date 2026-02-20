describe("Navigation pages and users list", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/")
  })

  it("Nominal scenario + Error scenario", () => {

    // Home empty state
    cy.get('[data-testid="users-count"]').should("contain", "0")
    cy.get('[data-testid="no-users"]').should("exist")

    // Navigate to form
    cy.contains("Form").click()
    cy.url().should("include", "/form")

    // Fill form with valid data
    cy.get('input[placeholder="lastname"]').type("Jean")
    cy.get('input[placeholder="firstname"]').type("Pierre")
    cy.get('input[placeholder="email"]').type("jean@test.com")
    cy.get('input[placeholder="birth"]').type("1995-05-15")
    cy.get('input[placeholder="postCode"]').type("75001")
    cy.get('input[placeholder="town"]').type("Paris")

    // Submit
    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/")

    cy.get('[data-testid="users-count"]').should("contain", "1")
    cy.get('[data-testid="users-list"]')
      .should("contain", "Sincere@april.biz")

   // ---------- Error scenario : email already used ----------
   cy.contains("Form").click()
   cy.url().should("include", "/form")

   // 👇 Interception du POST pour forcer erreur 400
   cy.intercept("POST", "https://jsonplaceholder.typicode.com/users", {
     statusCode: 400,
     body: { message: "Email already exists" }
   }).as("createUserError")

   cy.get('input[placeholder="lastname"]').clear().type("Jean")
   cy.get('input[placeholder="firstname"]').clear().type("Pierre")
   cy.get('input[placeholder="email"]').clear().type("jean@test.com")
   cy.get('input[placeholder="birth"]').clear().type("1995-05-15")
   cy.get('input[placeholder="postCode"]').clear().type("75001")
   cy.get('input[placeholder="town"]').clear().type("Paris")

   cy.get('button[type="submit"]').click()

   cy.wait("@createUserError")

   cy.contains(/email already exists/i).should("be.visible")
  })

 });


