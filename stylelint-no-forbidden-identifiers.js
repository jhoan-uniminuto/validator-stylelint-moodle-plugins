const stylelint = require("stylelint");
const selectorParser = require("postcss-selector-parser");

const ruleName = "plugin/no-forbidden-identifiers";
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (id) => `El identificador "${id}" ya es empleada por el Core Moodle.`
});

// Carga el JSON con IDs prohibidos y normaliza
const forbiddenIdsRaw = require("./forbidden-identifiers.json");
const forbiddenSet = new Set(
  forbiddenIdsRaw
    .filter(Boolean)            // elimina null/undefined
    .map(id => id.trim().toLowerCase()) // trim y minúsculas
);

const plugin = stylelint.createPlugin(ruleName, function() {
  return function(root, result) {
    root.walkRules((rule) => {
      const reportedIds = new Set(); // evita duplicados por regla

      rule.selectors.forEach((selector) => {
        try {
          selectorParser((selectors) => {
            selectors.walkIds((idNode) => {
              const idName = idNode.value.trim().toLowerCase();

              if (forbiddenSet.has(idName) && !reportedIds.has(idName)) {
                stylelint.utils.report({
                  ruleName,
                  result,
                  message: messages.rejected(idName),
                  node: rule,
                  word: idName
                });
                reportedIds.add(idName);
              }
            });
          }).processSync(selector);
        } catch (err) {
          console.warn(`[${ruleName}] Error parsing selector: ${selector}`, err);
        }
      });
    });
  };
});

plugin.ruleName = ruleName;
plugin.messages = messages;

module.exports = plugin;
