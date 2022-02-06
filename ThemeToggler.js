"use strict";

exports.__esModule = true;
exports.useTheme = void 0;

var _react = require("react");

var useTheme = function useTheme() {
  var _useState = (0, _react.useState)(typeof window === 'undefined' ? null : window.__theme),
      currentTheme = _useState[0],
      setCurrentTheme = _useState[1];

  (0, _react.useEffect)(function () {
    window.__onThemeChange = function () {
      setCurrentTheme(window.__theme);
    };
  }, []);
  var toggleTheme = (0, _react.useCallback)(function (theme) {
    window.__setPreferredTheme(theme);
  }, []);
  return [currentTheme, toggleTheme];
};

exports.useTheme = useTheme;