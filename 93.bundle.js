(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[93],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/troff.js":
/*!*************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/troff.js ***!
  \*************************************************************/
/*! exports provided: troff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"troff\", function() { return troff; });\nvar words = {};\n\nfunction tokenBase(stream) {\n  if (stream.eatSpace()) return null;\n\n  var sol = stream.sol();\n  var ch = stream.next();\n\n  if (ch === '\\\\') {\n    if (stream.match('fB') || stream.match('fR') || stream.match('fI') ||\n        stream.match('u')  || stream.match('d')  ||\n        stream.match('%')  || stream.match('&')) {\n      return 'string';\n    }\n    if (stream.match('m[')) {\n      stream.skipTo(']');\n      stream.next();\n      return 'string';\n    }\n    if (stream.match('s+') || stream.match('s-')) {\n      stream.eatWhile(/[\\d-]/);\n      return 'string';\n    }\n    if (stream.match('\\(') || stream.match('*\\(')) {\n      stream.eatWhile(/[\\w-]/);\n      return 'string';\n    }\n    return 'string';\n  }\n  if (sol && (ch === '.' || ch === '\\'')) {\n    if (stream.eat('\\\\') && stream.eat('\\\"')) {\n      stream.skipToEnd();\n      return 'comment';\n    }\n  }\n  if (sol && ch === '.') {\n    if (stream.match('B ') || stream.match('I ') || stream.match('R ')) {\n      return 'attribute';\n    }\n    if (stream.match('TH ') || stream.match('SH ') || stream.match('SS ') || stream.match('HP ')) {\n      stream.skipToEnd();\n      return 'quote';\n    }\n    if ((stream.match(/[A-Z]/) && stream.match(/[A-Z]/)) || (stream.match(/[a-z]/) && stream.match(/[a-z]/))) {\n      return 'attribute';\n    }\n  }\n  stream.eatWhile(/[\\w-]/);\n  var cur = stream.current();\n  return words.hasOwnProperty(cur) ? words[cur] : null;\n}\n\nfunction tokenize(stream, state) {\n  return (state.tokens[0] || tokenBase) (stream, state);\n};\n\nconst troff = {\n  startState: function() {return {tokens:[]};},\n  token: function(stream, state) {\n    return tokenize(stream, state);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/troff.js?");

/***/ })

}]);