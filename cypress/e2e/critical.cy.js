context("when API is down", () => {
  it("should display empty state when API is unreachable", () => {
    cy.visit("http://localhost:5173/Jest-tests/#/", {
      onBeforeLoad(win) {
        win.fetch = () => Promise.reject(new Error("API down"));
      },
    });

    cy.get('[data-testid="users-count"]', { timeout: 10000 })
      .should("contain", "0");

    cy.get('[data-testid="no-users"]')
      .should("contain", "No registered user yet.");
  });
});