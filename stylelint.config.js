const classesForbidden = require("./forbidden-classes.json");
const identifiersForbidden = require("./forbidden-identifiers.json");

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order"
  ],
  plugins: [
    "stylelint-declaration-strict-value",
    "./stylelint-no-forbidden-classes.js",
    "./stylelint-no-forbidden-identifiers.js"
  ],
  rules: {
    "selector-class-pattern": [
      "^(b|l|t)-[a-z0-9]+(-[a-z0-9]+)?(__[a-z0-9]+)?(--[a-z0-9]+)?$",
      {
        "message": "Las clases deben seguir la convención BEM con prefijos 'b-' para blocks, 'l-' para plugins y 't-' para themes."
      }
    ],
    "plugin/no-forbidden-classes": classesForbidden,
    "plugin/no-forbidden-identifiers": identifiersForbidden,
    "selector-max-type":[
      0,
      {
        "message": "Estás usando selectores de tipo (etiquetas HTML) en tu CSS. Por favor, usa clases o IDs para estilizar los elementos."
      }
    ],
    "no-duplicate-selectors": [
      true,
      {
        "message": "Estás repitiendo selectores en tu CSS."
      }
    ],
    "color-named": "never",
    "color-no-invalid-hex": true,
    "no-unknown-custom-properties": [
      true,
      {
        "message": "Estás usando una variable CSS que no está definida y/o no has agregado el valor por defecto var(--variable, valor_defecto);."
      }
    ],
    "declaration-no-important": true,
    "declaration-empty-line-before": null,
    "unit-allowed-list": ["px", "%", "vh", "vw", "s", "ms", "deg", "rem", "em"],
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "fill", "stroke", "background-color","/font-size/",],
      {
        "ignoreValues": ["transparent", "0", "inherit", "currentColor"],
        "disableFix": true
      }
    ],
  }
};
