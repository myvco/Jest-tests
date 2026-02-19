describe("Navigation pages and local storage", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit("http://localhost:5173/")
    cy.url().then(url => {
     cy.log(url)
   })

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

    cy.get('button[type="submit"]').click()

    //Wait for automatic redirection to home
    cy.url().should("include", "/")

    //Verify home page shows the new user
    cy.get('[data-testid="users-count"]').should("contain", "1")
    cy.get('[data-testid="users-list"]')
      .should("contain", "Pierre Jean")

    // Vérification localStorage
    cy.window().then((win) => {
      const users = JSON.parse(win.localStorage.getItem("users"))
      expect(users).to.have.length(1)
      expect(users[0].email).to.equal("jean@test.com")
    })

    // Error scenario

    //Back to form
    cy.contains("Form").click()
    cy.url().should("include", "/form")

    // Fill form with same email
    cy.get('input[placeholder="lastname"]').clear().type("Jean")
    cy.get('input[placeholder="firstname"]').clear().type("Pierre")
    cy.get('input[placeholder="email"]').clear().type("jean@test.com")
    cy.get('input[placeholder="birth"]').clear().type("1995-05-15")
    cy.get('input[placeholder="postCode"]').clear().type("75001")
    cy.get('input[placeholder="town"]').clear().type("Paris")

    cy.get('button[type="submit"]').click()

    // Verify error message
    cy.contains(/email already exists|already registered|error/i)
      .should("be.visible")

    // Back to home
    cy.contains("Home").click()

    // Verify home page still shows only 1 user
    cy.get('[data-testid="users-count"]').should("contain", "1")
    cy.get('[data-testid="users-list"]').children().should("have.length", 1)
    cy.get('[data-testid="users-list"]')
      .should("contain", "Pierre Jean")

    // Verify localStorage still has only 1 user
    cy.window().then((win) => {
      const users = JSON.parse(win.localStorage.getItem("users"))
      expect(users).to.have.length(1)
    })
  })
})