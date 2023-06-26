/**
 * Logs into the system via interacting with the Auth0 UI, using the provided username and
 * password, all while taking snapshots for easier debugging.
 *
 * @param username Username of the user to log in as.
 * @param password Password of the user to log in as.
 * @returns {void}
 */
export function loginWithAuth0Command(username: string, password: string): void {
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

/**
 * Logs into the system via interacting with the Auth0 UI, using the provided username and
 * password.
 *
 * Makes several assertions to make sure the process has been successfully completed.
 * @param username Username of the user to log in as.
 * @param password Password of the user to log in as.
 * @returns {void}

 */
function loginViaAuth0Ui(username: string, password: string): void {
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
  cy.get(".empty-ws__title").contains("No note selected").should("exist");
  cy.get(".user-dropdown__profile-name").contains(Cypress.env("auth0_username")).should("exist");
}
