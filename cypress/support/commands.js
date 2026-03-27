// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const baseApiUrl = "http://localhost:8000";

Cypress.Commands.add("resetUsers", () => {
  cy.request("GET", `${baseApiUrl}/users`)
    .its("body.users")
    .then((users = []) => {
      if (!users.length) return;

      cy.wrap(users).each((user) => {
        cy.request("DELETE", `${baseApiUrl}/users/${user.id}`);
      });
    });
});

Cypress.Commands.add("addFirstUser", () => {
  cy.request("POST", `${baseApiUrl}/users`, {
    name: "First Doe",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@ynov.com",
    birth: "1986-12-31",
    city: "Paris",
    zipCode: "75001",
  });
});