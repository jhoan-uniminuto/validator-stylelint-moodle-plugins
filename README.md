# Validator Stylelint Moodle Plugins

Validador de estilos CSS basado en el linter [stylelint](https://stylelint.io/) para la implementación y guia de buenas practicas en la construcción de hojas de estilo dentro del entorno de diseño y desarrollo en Moodle bajo el IDE VSCode.

Esta configuración incluye:
* Metodologia BEM [guia completa](https://en.bem.info/methodology/css/).
* Implementacion de prefijos en nombramiento de clases ('b-' para blocks, 'l-' para plugins y 't-' para themes).
* Validación de clases existentes en el Core de Moodle [guia completa](https://docs.moodle.org/dev/Element_HTML_and_CSS_guidelines).
* Reglas y buenas practicas en el uso de propiedades CSS. [guia completa](https://stylelint.io/user-guide/rules/).

## Requisitos

- Node.js >= 20.x
- Npm >= 10.x
- Stylelint 16.25.0
- Extension Stylelint en IDE VSCode v1.5.3

## Instalación

```bash
$ npm install validator-stylelint-moodle-plugins --save-dev
```

## Uso

Agrega `stylelint.config.js` en tu proyecto y configura este archivo con:
```json
module.exports = {
  extends: [
    "validator-stylelint-moodle-plugins" 
  ]
};
```

Ahora puede ejecutar este linter agregando el siguientes scripts en CLI
```bash
npx stylelint "**/*.css"
```

## Recomendaciones

- Agregue la opción `--fix` para corregir automáticamente los errores de linting:
```bash
npm run stylelint:fix
```
- Valida la extension Stylelint v1.5.3 o mas se encuentre instalada en IDE VSCode.
- Configura la extension desde `Edit in settings .json` con:
```json
"stylelint.useLocal": true,
    "stylelint.validate": [
        "css"
    ],
```
