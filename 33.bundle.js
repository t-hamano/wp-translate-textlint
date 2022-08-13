(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/diff.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/diff.js ***!
  \************************************************************/
/*! exports provided: diff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"diff\", function() { return diff; });\nvar TOKEN_NAMES = {\n  '+': 'inserted',\n  '-': 'deleted',\n  '@': 'meta'\n};\n\nconst diff = {\n  token: function(stream) {\n    var tw_pos = stream.string.search(/[\\t ]+?$/);\n\n    if (!stream.sol() || tw_pos === 0) {\n      stream.skipToEnd();\n      return (\"error \" + (\n        TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');\n    }\n\n    var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();\n\n    if (tw_pos === -1) {\n      stream.skipToEnd();\n    } else {\n      stream.pos = tw_pos;\n    }\n\n    return token_name;\n  }\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/diff.js?");

/***/ })

}]);