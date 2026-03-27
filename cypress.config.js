import { defineConfig } from "cypress";
import { plugin as cypressGrepPlugin } from "@cypress/grep/plugin";

module.exports = defineConfig({
  allowCypressEnv: false,
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      cypressGrepPlugin(config);
      return config;
    },
  },
});