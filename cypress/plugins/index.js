// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// import htmlvalidate from "cypress-html-validate/dist/plugin"

const htmlvalidate = require("cypress-html-validate/dist/plugin")


module.exports = (on) => {
  /* html-validate configuration */
  const config = {
    "extends": [
      "htmlvalidate:recommended"
    ],
   
    "rules": {
      "require-sri":  "off",
      "wcag/h30": "warn"
    }
  };
  /* plugin options */
  const options = { exclude: ["iframe"], include: [], };
  htmlvalidate.install(on, config, options);
};