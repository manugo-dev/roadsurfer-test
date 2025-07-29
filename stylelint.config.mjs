export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-idiomatic-order",
    "stylelint-config-recommended-vue",
    "stylelint-config-tailwindcss",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "selector-class-pattern": "^([a-z][a-z0-9]*)(_[a-z0-9]+)*$",
    "at-rule-no-unknown": null,
  },
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/coverage/**"],
};
