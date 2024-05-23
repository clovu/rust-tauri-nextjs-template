import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),

  {
    ignores: [".next/", "src-tauri/"],
  },

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      semi: ["error", "never"],
      quotes: ["error", "double"],
      "indent-legacy": ["error", 2],
      "max-len": ["error", { code: 100 }],
      "comma-dangle": ["error", "always-multiline"],
      "comma-style": ["error", "last"],
      "array-bracket-newline": ["error", "consistent"],
      "object-curly-newline": ["error", { multiline: true, consistent: true }],
      "object-curly-spacing": ["error", "always"],
      "space-before-function-paren": ["error", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }],
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/type-annotation-spacing": ["error", {
        before: false,
        after: true,
        overrides: { arrow: { before: true, after: true } },
      }],
      "@typescript-eslint/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "none",
          requireLast: false,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
      }],
      "react/prop-types": "off",
      "space-in-parens": ["error", "never"],
      "quote-props": ["error", "as-needed"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
      ],
    },
  },
]
