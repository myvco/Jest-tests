const APP = "http://localhost:5173/Jest-tests";
const API = "http://localhost:8000";

    describe("Navigation pages and users list", () => {
      const person = {
        lastname: "Jean",
        firstname: "Pierre",
        email: `jean${Date.now()}@test.com`,
        birth: "1995-05-15",
        postCode: "75001",
        town: "Paris",
    };

  beforeEach(() => {
    cy.visit(`${APP}/#/`);
  });

  it("creates a user and displays it on home", () => {
    cy.request("GET", `${API}/users`).then((response) => {
      const initialCount = response.body.utilisateurs.length;

      cy.get('[data-testid="users-count"]')
        .should("contain", String(initialCount));

      cy.contains("Form").click();
      cy.location("hash").should("include", "/form");

      cy.get('input[placeholder="lastname"]').clear();
      cy.get('input[placeholder="lastname"]').type(person.lastname);

      cy.get('input[placeholder="firstname"]').clear();
      cy.get('input[placeholder="firstname"]').type(person.firstname);

      cy.get('input[placeholder="email"]').clear();
      cy.get('input[placeholder="email"]').type(person.email);

      cy.get('input[placeholder="birth"]').clear();
      cy.get('input[placeholder="birth"]').type(person.birth);

      cy.get('input[placeholder="postCode"]').clear();
      cy.get('input[placeholder="postCode"]').type(person.postCode);

      cy.get('input[placeholder="town"]').clear();
      cy.get('input[placeholder="town"]').type(person.town);

      cy.get('button[type="submit"]').should("not.be.disabled").click();

      cy.contains("Form successfully submitted!", { timeout: 10000 }).should("be.visible");

      cy.location("hash", { timeout: 10000 }).should("not.include", "/form");

      cy.get('[data-testid="users-list"]', { timeout: 10000 })
        .should("contain", person.email);

      cy.get('[data-testid="users-count"]', { timeout: 10000 })
        .invoke("text")
        .then((text) => {
          expect(Number(text.trim())).to.eq(initialCount + 1);
        });
    });
  });

  it("display error if invalid field", () => {
    cy.visit("http://localhost:5173/Jest-tests/#/form");

    cy.get('input[placeholder="lastname"]').clear().type("Jean123").blur();
    cy.contains("Invalid characters in name").should("be.visible");

    cy.get('input[placeholder="firstname"]').clear().type("Pierre@").blur();
    cy.contains("Invalid characters in name").should("be.visible");

    cy.get('input[placeholder="email"]').clear().type("invalid-email").blur();
    cy.contains("Invalid email format").should("be.visible");

    cy.get('input[placeholder="birth"]').clear().type("2020-01-01").blur();
    cy.contains("Must be at least 18 years old").should("be.visible");

    cy.get('input[placeholder="postCode"]').clear().type("123").blur();
    cy.contains("Invalid post code").should("be.visible");

    cy.get('input[placeholder="town"]').clear().type("Paris123").blur();
    cy.contains("Invalid town name").should("be.visible");

    cy.get('button[type="submit"]').should("be.disabled");

    cy.location("hash").should("include", "/form");
  });

  context("when API is down", { tags: "@critical" }, () => {
      it("should display empty state when API is unreachable", () => {
        cy.visit("http://localhost:5173/Jest-tests/#/", {
          onBeforeLoad(win) {
            win.fetch = () => Promise.reject(new Error("API down"));
          },
        });

        //fallback UI
        cy.get('[data-testid="users-count"]', { timeout: 10000 })
          .should("contain", "0");

        cy.get('[data-testid="no-users"]')
          .should("contain", "No registered user yet.");
      });
  })
});