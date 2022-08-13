(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[82],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/solr.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/solr.js ***!
  \************************************************************/
/*! exports provided: solr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solr\", function() { return solr; });\nvar isStringChar = /[^\\s\\|\\!\\+\\-\\*\\?\\~\\^\\&\\:\\(\\)\\[\\]\\{\\}\\\"\\\\]/;\nvar isOperatorChar = /[\\|\\!\\+\\-\\*\\?\\~\\^\\&]/;\nvar isOperatorString = /^(OR|AND|NOT|TO)$/i;\n\nfunction isNumber(word) {\n  return parseFloat(word).toString() === word;\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) break;\n      escaped = !escaped && next == \"\\\\\";\n    }\n\n    if (!escaped) state.tokenize = tokenBase;\n    return \"string\";\n  };\n}\n\nfunction tokenOperator(operator) {\n  return function(stream, state) {\n    if (operator == \"|\")\n      stream.eat(/\\|/);\n    else if (operator == \"&\")\n      stream.eat(/\\&/);\n\n    state.tokenize = tokenBase;\n    return \"operator\";\n  };\n}\n\nfunction tokenWord(ch) {\n  return function(stream, state) {\n    var word = ch;\n    while ((ch = stream.peek()) && ch.match(isStringChar) != null) {\n      word += stream.next();\n    }\n\n    state.tokenize = tokenBase;\n    if (isOperatorString.test(word))\n      return \"operator\";\n    else if (isNumber(word))\n      return \"number\";\n    else if (stream.peek() == \":\")\n      return \"propertyName\";\n    else\n      return \"string\";\n  };\n}\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == '\"')\n    state.tokenize = tokenString(ch);\n  else if (isOperatorChar.test(ch))\n    state.tokenize = tokenOperator(ch);\n  else if (isStringChar.test(ch))\n    state.tokenize = tokenWord(ch);\n\n  return (state.tokenize != tokenBase) ? state.tokenize(stream, state) : null;\n}\n\nconst solr = {\n  startState: function() {\n    return {\n      tokenize: tokenBase\n    };\n  },\n\n  token: function(stream, state) {\n    if (stream.eatSpace()) return null;\n    return state.tokenize(stream, state);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/solr.js?");

/***/ })

}]);