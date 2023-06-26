/* eslint-disable @typescript-eslint/no-namespace */
import {
  loginWithAuth0Command,
  saveNoteCommand,
  focusedNodeTextShouldEqualCommand,
} from "./commands/index";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      loginWithAuth0: typeof loginWithAuth0Command;
      saveNoteChanges: typeof saveNoteCommand;
      focusedNodeTextShouldEqual: typeof focusedNodeTextShouldEqualCommand;
    }
  }
}

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("loginWithAuth0", loginWithAuth0Command);
Cypress.Commands.add("saveNoteChanges", saveNoteCommand);
Cypress.Commands.add("focusedNodeTextShouldEqual", focusedNodeTextShouldEqualCommand);
