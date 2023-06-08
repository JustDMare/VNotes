import BlockComponent from "../BlockComponent.vue";

describe("<BlockComponent />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BlockComponent);
  });
});
