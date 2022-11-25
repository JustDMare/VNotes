const { off } = require("process");

/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  plugins: ["vuejs-accessibility", "unused-imports"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:vuejs-accessibility/recommended",
  ],

  env: {
    "vue/setup-compiler-macros": true,
  },
  overrides: [
    {
      files: ["cypress/integration/**.spec.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
      rules: {
        "consistent-type-imports": "off",
      },
    },
  ],
  rules: {
    curly: ["error", "all"],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "max-len": [
      "error",
      { code: 100, ignoreComments: false, ignorePattern: 'd="([\\s\\S]*?)"' },
    ],
    "unused-imports/no-unused-imports": "error",
    "no-dupe-class-members": "off",
    "no-duplicate-imports": "error",
    "no-empty-function": "error",
    "require-await": "error",

    //VUE
    "vue/eqeqeq": "error",
    "vuejs-accessibility/mouse-events-have-key-events": "off",
    "vuejs-accessibility/form-control-has-label": "off",
  },
};
