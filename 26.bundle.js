(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/cmake.js":
/*!*************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/cmake.js ***!
  \*************************************************************/
/*! exports provided: cmake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cmake\", function() { return cmake; });\nvar variable_regex = /({)?[a-zA-Z0-9_]+(})?/;\n\nfunction tokenString(stream, state) {\n  var current, prev, found_var = false;\n  while (!stream.eol() && (current = stream.next()) != state.pending) {\n    if (current === '$' && prev != '\\\\' && state.pending == '\"') {\n      found_var = true;\n      break;\n    }\n    prev = current;\n  }\n  if (found_var) {\n    stream.backUp(1);\n  }\n  if (current == state.pending) {\n    state.continueString = false;\n  } else {\n    state.continueString = true;\n  }\n  return \"string\";\n}\n\nfunction tokenize(stream, state) {\n  var ch = stream.next();\n\n  // Have we found a variable?\n  if (ch === '$') {\n    if (stream.match(variable_regex)) {\n      return 'variableName.special';\n    }\n    return 'variable';\n  }\n  // Should we still be looking for the end of a string?\n  if (state.continueString) {\n    // If so, go through the loop again\n    stream.backUp(1);\n    return tokenString(stream, state);\n  }\n  // Do we just have a function on our hands?\n  // In 'cmake_minimum_required (VERSION 2.8.8)', 'cmake_minimum_required' is matched\n  if (stream.match(/(\\s+)?\\w+\\(/) || stream.match(/(\\s+)?\\w+\\ \\(/)) {\n    stream.backUp(1);\n    return 'def';\n  }\n  if (ch == \"#\") {\n    stream.skipToEnd();\n    return \"comment\";\n  }\n  // Have we found a string?\n  if (ch == \"'\" || ch == '\"') {\n    // Store the type (single or double)\n    state.pending = ch;\n    // Perform the looping function to find the end\n    return tokenString(stream, state);\n  }\n  if (ch == '(' || ch == ')') {\n    return 'bracket';\n  }\n  if (ch.match(/[0-9]/)) {\n    return 'number';\n  }\n  stream.eatWhile(/[\\w-]/);\n  return null;\n}\nconst cmake = {\n  startState: function () {\n    var state = {};\n    state.inDefinition = false;\n    state.inInclude = false;\n    state.continueString = false;\n    state.pending = false;\n    return state;\n  },\n  token: function (stream, state) {\n    if (stream.eatSpace()) return null;\n    return tokenize(stream, state);\n  }\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/cmake.js?");

/***/ })

}]);