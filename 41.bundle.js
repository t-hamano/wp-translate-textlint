(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/fcl.js":
/*!***********************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/fcl.js ***!
  \***********************************************************/
/*! exports provided: fcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fcl\", function() { return fcl; });\nvar keywords = {\n  \"term\": true,\n  \"method\": true, \"accu\": true,\n  \"rule\": true, \"then\": true, \"is\": true, \"and\": true, \"or\": true,\n  \"if\": true, \"default\": true\n};\n\nvar start_blocks = {\n  \"var_input\": true,\n  \"var_output\": true,\n  \"fuzzify\": true,\n  \"defuzzify\": true,\n  \"function_block\": true,\n  \"ruleblock\": true\n};\n\nvar end_blocks = {\n  \"end_ruleblock\": true,\n  \"end_defuzzify\": true,\n  \"end_function_block\": true,\n  \"end_fuzzify\": true,\n  \"end_var\": true\n};\n\nvar atoms = {\n  \"true\": true, \"false\": true, \"nan\": true,\n  \"real\": true, \"min\": true, \"max\": true, \"cog\": true, \"cogs\": true\n};\n\nvar isOperatorChar = /[+\\-*&^%:=<>!|\\/]/;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n\n  if (/[\\d\\.]/.test(ch)) {\n    if (ch == \".\") {\n      stream.match(/^[0-9]+([eE][\\-+]?[0-9]+)?/);\n    } else if (ch == \"0\") {\n      stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);\n    } else {\n      stream.match(/^[0-9]*\\.?[0-9]*([eE][\\-+]?[0-9]+)?/);\n    }\n    return \"number\";\n  }\n\n  if (ch == \"/\" || ch == \"(\") {\n    if (stream.eat(\"*\")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n    if (stream.eat(\"/\")) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"operator\";\n  }\n  stream.eatWhile(/[\\w\\$_\\xa1-\\uffff]/);\n\n  var cur = stream.current().toLowerCase();\n  if (keywords.propertyIsEnumerable(cur) ||\n      start_blocks.propertyIsEnumerable(cur) ||\n      end_blocks.propertyIsEnumerable(cur)) {\n    return \"keyword\";\n  }\n  if (atoms.propertyIsEnumerable(cur)) return \"atom\";\n  return \"variable\";\n}\n\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if ((ch == \"/\" || ch == \")\") && maybeEnd) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return \"comment\";\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\n\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\n\nfunction popContext(state) {\n  if (!state.context.prev) return;\n  var t = state.context.type;\n  if (t == \"end_block\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\n\nconst fcl = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == \"comment\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    var cur = stream.current().toLowerCase();\n\n    if (start_blocks.propertyIsEnumerable(cur)) pushContext(state, stream.column(), \"end_block\");\n    else if (end_blocks.propertyIsEnumerable(cur))  popContext(state);\n\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return 0;\n    var ctx = state.context;\n\n    var closing = end_blocks.propertyIsEnumerable(textAfter);\n    if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    commentTokens: {line: \"//\", block: {open: \"(*\", close: \"*)\"}}\n  }\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/fcl.js?");

/***/ })

}]);