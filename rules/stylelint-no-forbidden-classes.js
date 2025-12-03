const stylelint = require("stylelint");
const selectorParser = require("postcss-selector-parser");
const path = require("path");

const ruleName = "plugin/no-forbidden-classes";
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (cls) => `La clase "${cls}" ya es empleada por el Core Moodle.`
});

// RegExp de todas las clases prohibidas
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const plugin = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptions) {
    if (!secondaryOptions || !secondaryOptions.filePath) { return () => {}; }

    const forbiddenClassesPath = secondaryOptions.filePath;
    let forbiddenClassesRaw = [];
    
    try {
        forbiddenClassesRaw = require(forbiddenClassesPath);
    } catch (e) {
        console.error(`[${ruleName}] Error al cargar el archivo de clases prohibidas en: ${forbiddenClassesPath}`, e);
        return () => {}; 
    }
    
    const forbiddenPattern = new RegExp(
        forbiddenClassesRaw.filter(Boolean).map(cls => escapeRegex(cls.trim())).join('|'),
        'g'
    );
  return function(root, result) {
    root.walkRules((rule) => {
      rule.selectors.forEach((selector) => {
        // Procesamos selector con postcss-selector-parser
        selectorParser((selectors) => {
          selectors.walkClasses((classNode) => {
            const className = classNode.value;
            if (className.match(forbiddenPattern)) {
              stylelint.utils.report({
                ruleName,
                result,
                message: messages.rejected(className),
                node: rule,
                word: className
              });
            }
          });
        }).processSync(selector);
      });
    });
  };
});

plugin.ruleName = ruleName;
plugin.messages = messages;

module.exports = plugin;
