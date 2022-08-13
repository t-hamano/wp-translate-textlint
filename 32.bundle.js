(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/d.js":
/*!*********************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/d.js ***!
  \*********************************************************/
/*! exports provided: d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return d; });\nfunction words(str) {\n  var obj = {}, words = str.split(\" \");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\n\nvar blockKeywordsStr = \"body catch class do else enum for foreach foreach_reverse if in interface mixin \" +\n    \"out scope struct switch try union unittest version while with\";\n\nconst parserConfig = {\n  keywords: words(\"abstract alias align asm assert auto break case cast cdouble cent cfloat const continue \" +\n                  \"debug default delegate delete deprecated export extern final finally function goto immutable \" +\n                  \"import inout invariant is lazy macro module new nothrow override package pragma private \" +\n                  \"protected public pure ref return shared short static super synchronized template this \" +\n                  \"throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters \" +\n                  blockKeywordsStr),\n  blockKeywords: words(blockKeywordsStr),\n  builtin: words(\"bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte \" +\n                 \"ucent uint ulong ushort wchar wstring void size_t sizediff_t\"),\n  atoms: words(\"exit failure success true false null\"),\n  hooks: {\n    \"@\": function(stream, _state) {\n      stream.eatWhile(/[\\w\\$_]/);\n      return \"meta\";\n    }\n  }\n}\n\nvar statementIndentUnit = parserConfig.statementIndentUnit,\n    keywords = parserConfig.keywords,\n    builtin = parserConfig.builtin,\n    blockKeywords = parserConfig.blockKeywords,\n    atoms = parserConfig.atoms,\n    hooks = parserConfig.hooks,\n    multiLineStrings = parserConfig.multiLineStrings;\nvar isOperatorChar = /[+\\-*&%=<>!?|\\/]/;\n\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (hooks[ch]) {\n    var result = hooks[ch](stream, state);\n    if (result !== false) return result;\n  }\n  if (ch == '\"' || ch == \"'\" || ch == \"`\") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    curPunc = ch;\n    return null;\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    return \"number\";\n  }\n  if (ch == \"/\") {\n    if (stream.eat(\"+\")) {\n      state.tokenize = tokenNestedComment;\n      return tokenNestedComment(stream, state);\n    }\n    if (stream.eat(\"*\")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n    if (stream.eat(\"/\")) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"operator\";\n  }\n  stream.eatWhile(/[\\w\\$_\\xa1-\\uffff]/);\n  var cur = stream.current();\n  if (keywords.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = \"newstatement\";\n    return \"keyword\";\n  }\n  if (builtin.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = \"newstatement\";\n    return \"builtin\";\n  }\n  if (atoms.propertyIsEnumerable(cur)) return \"atom\";\n  return \"variable\";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == \"\\\\\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = null;\n    return \"string\";\n  };\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"/\" && maybeEnd) {\n      state.tokenize = null;\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return \"comment\";\n}\n\nfunction tokenNestedComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"/\" && maybeEnd) {\n      state.tokenize = null;\n      break;\n    }\n    maybeEnd = (ch == \"+\");\n  }\n  return \"comment\";\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  var indent = state.indented;\n  if (state.context && state.context.type == \"statement\")\n    indent = state.context.indented;\n  return state.context = new Context(indent, col, type, null, state.context);\n}\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == \")\" || t == \"]\" || t == \"}\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\n\nconst d = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == \"comment\" || style == \"meta\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == \";\" || curPunc == \":\" || curPunc == \",\") && ctx.type == \"statement\") popContext(state);\n    else if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n    else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n    else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n    else if (curPunc == \"}\") {\n      while (ctx.type == \"statement\") ctx = popContext(state);\n      if (ctx.type == \"}\") ctx = popContext(state);\n      while (ctx.type == \"statement\") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (((ctx.type == \"}\" || ctx.type == \"top\") && curPunc != ';') || (ctx.type == \"statement\" && curPunc == \"newstatement\"))\n      pushContext(state, stream.column(), \"statement\");\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return null;\n    var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);\n    if (ctx.type == \"statement\" && firstChar == \"}\") ctx = ctx.prev;\n    var closing = firstChar == ctx.type;\n    if (ctx.type == \"statement\") return ctx.indented + (firstChar == \"{\" ? 0 : statementIndentUnit || cx.unit);\n    else if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: \"//\", block: {open: \"/*\", close: \"*/\"}}\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/d.js?");

/***/ })

}]);