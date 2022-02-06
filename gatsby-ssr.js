"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onRenderBody = void 0;

var _react = _interopRequireDefault(require("react"));

var onRenderBody = function onRenderBody(_ref) {
  var setPreBodyComponents = _ref.setPreBodyComponents;
  setPreBodyComponents([/*#__PURE__*/_react.default.createElement("script", {
    key: "gatsby-plugin-dark-mode",
    dangerouslySetInnerHTML: {
      __html: "\nvoid function() {\n  window.__onThemeChange = function() {}\n\n  var preferredTheme\n  try {\n    preferredTheme = localStorage.getItem('theme')\n  } catch (err) { }\n\n  function setTheme(newTheme) {\n    if (preferredTheme && document.body.classList.contains(preferredTheme)) {\n      document.body.classList.replace(preferredTheme, newTheme)\n    } else {\n      document.body.classList.add(newTheme)\n    }\n\n    window.__theme = newTheme\n    preferredTheme = newTheme\n    window.__onThemeChange(newTheme)\n  }\n\n  window.__setPreferredTheme = function(newTheme) {\n    setTheme(newTheme)\n    try {\n      localStorage.setItem('theme', newTheme)\n    } catch (err) {}\n  }\n\n  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')\n  darkQuery.addListener(function(e) {\n    window.__setPreferredTheme(e.matches ? 'dark' : 'light')\n  })\n\n  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))\n}()\n    "
    }
  })]);
};

exports.onRenderBody = onRenderBody;