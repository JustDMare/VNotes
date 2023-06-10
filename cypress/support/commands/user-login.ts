export function loginWithAuth0Command(username: string, password: string) {
  const log = Cypress.log({
    displayName: "AUTH0 LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot("before");

  loginViaAuth0Ui(username, password);

  log.snapshot("after");
  log.end();
}

function loginViaAuth0Ui(username: string, password: string) {
  cy.visit("http://localhost:3000");
  cy.contains("Sign in");
  //Redirects to Auth0
  cy.get(".landing__header__login-btn").click();
  // Login on Auth0.
  cy.origin(
    Cypress.env("auth0_domain"),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get("input#username").type(username);
      cy.get("input#password").type(password, { log: false });
      cy.get("button[value=default]").eq(1).click();
    }
  );
  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should("equal", "http://localhost:3000/workspace");
}
