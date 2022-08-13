(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/groovy.js":
/*!**************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/groovy.js ***!
  \**************************************************************/
/*! exports provided: groovy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"groovy\", function() { return groovy; });\nfunction words(str) {\n  var obj = {}, words = str.split(\" \");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\nvar keywords = words(\n  \"abstract as assert boolean break byte case catch char class const continue def default \" +\n    \"do double else enum extends final finally float for goto if implements import in \" +\n    \"instanceof int interface long native new package private protected public return \" +\n    \"short static strictfp super switch synchronized threadsafe throw throws trait transient \" +\n    \"try void volatile while\");\nvar blockKeywords = words(\"catch class def do else enum finally for if interface switch trait try while\");\nvar standaloneKeywords = words(\"return break continue\");\nvar atoms = words(\"null true false this\");\n\nvar curPunc;\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == '\"' || ch == \"'\") {\n    return startString(ch, stream, state);\n  }\n  if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    curPunc = ch;\n    return null;\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    if (stream.eat(/eE/)) { stream.eat(/\\+\\-/); stream.eatWhile(/\\d/); }\n    return \"number\";\n  }\n  if (ch == \"/\") {\n    if (stream.eat(\"*\")) {\n      state.tokenize.push(tokenComment);\n      return tokenComment(stream, state);\n    }\n    if (stream.eat(\"/\")) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n    if (expectExpression(state.lastToken, false)) {\n      return startString(ch, stream, state);\n    }\n  }\n  if (ch == \"-\" && stream.eat(\">\")) {\n    curPunc = \"->\";\n    return null;\n  }\n  if (/[+\\-*&%=<>!?|\\/~]/.test(ch)) {\n    stream.eatWhile(/[+\\-*&%=<>|~]/);\n    return \"operator\";\n  }\n  stream.eatWhile(/[\\w\\$_]/);\n  if (ch == \"@\") { stream.eatWhile(/[\\w\\$_\\.]/); return \"meta\"; }\n  if (state.lastToken == \".\") return \"property\";\n  if (stream.eat(\":\")) { curPunc = \"proplabel\"; return \"property\"; }\n  var cur = stream.current();\n  if (atoms.propertyIsEnumerable(cur)) { return \"atom\"; }\n  if (keywords.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = \"newstatement\";\n    else if (standaloneKeywords.propertyIsEnumerable(cur)) curPunc = \"standalone\";\n    return \"keyword\";\n  }\n  return \"variable\";\n}\ntokenBase.isBase = true;\n\nfunction startString(quote, stream, state) {\n  var tripleQuoted = false;\n  if (quote != \"/\" && stream.eat(quote)) {\n    if (stream.eat(quote)) tripleQuoted = true;\n    else return \"string\";\n  }\n  function t(stream, state) {\n    var escaped = false, next, end = !tripleQuoted;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {\n        if (!tripleQuoted) { break; }\n        if (stream.match(quote + quote)) { end = true; break; }\n      }\n      if (quote == '\"' && next == \"$\" && !escaped) {\n        if (stream.eat(\"{\")) {\n          state.tokenize.push(tokenBaseUntilBrace());\n          return \"string\";\n        } else if (stream.match(/^\\w/, false)) {\n          state.tokenize.push(tokenVariableDeref);\n          return \"string\";\n        }\n      }\n      escaped = !escaped && next == \"\\\\\";\n    }\n    if (end) state.tokenize.pop();\n    return \"string\";\n  }\n  state.tokenize.push(t);\n  return t(stream, state);\n}\n\nfunction tokenBaseUntilBrace() {\n  var depth = 1;\n  function t(stream, state) {\n    if (stream.peek() == \"}\") {\n      depth--;\n      if (depth == 0) {\n        state.tokenize.pop();\n        return state.tokenize[state.tokenize.length-1](stream, state);\n      }\n    } else if (stream.peek() == \"{\") {\n      depth++;\n    }\n    return tokenBase(stream, state);\n  }\n  t.isBase = true;\n  return t;\n}\n\nfunction tokenVariableDeref(stream, state) {\n  var next = stream.match(/^(\\.|[\\w\\$_]+)/)\n  if (!next) {\n    state.tokenize.pop()\n    return state.tokenize[state.tokenize.length-1](stream, state)\n  }\n  return next[0] == \".\" ? null : \"variable\"\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"/\" && maybeEnd) {\n      state.tokenize.pop();\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return \"comment\";\n}\n\nfunction expectExpression(last, newline) {\n  return !last || last == \"operator\" || last == \"->\" || /[\\.\\[\\{\\(,;:]/.test(last) ||\n    last == \"newstatement\" || last == \"keyword\" || last == \"proplabel\" ||\n    (last == \"standalone\" && !newline);\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == \")\" || t == \"]\" || t == \"}\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\n\nconst groovy = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: [tokenBase],\n      context: new Context(-indentUnit, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true,\n      lastToken: null\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n      // Automatic semicolon insertion\n      if (ctx.type == \"statement\" && !expectExpression(state.lastToken, true)) {\n        popContext(state); ctx = state.context;\n      }\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = state.tokenize[state.tokenize.length-1](stream, state);\n    if (style == \"comment\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == \";\" || curPunc == \":\") && ctx.type == \"statement\") popContext(state);\n    // Handle indentation for {x -> \\n ... }\n    else if (curPunc == \"->\" && ctx.type == \"statement\" && ctx.prev.type == \"}\") {\n      popContext(state);\n      state.context.align = false;\n    }\n    else if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n    else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n    else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n    else if (curPunc == \"}\") {\n      while (ctx.type == \"statement\") ctx = popContext(state);\n      if (ctx.type == \"}\") ctx = popContext(state);\n      while (ctx.type == \"statement\") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (ctx.type == \"}\" || ctx.type == \"top\" || (ctx.type == \"statement\" && curPunc == \"newstatement\"))\n      pushContext(state, stream.column(), \"statement\");\n    state.startOfLine = false;\n    state.lastToken = curPunc || style;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (!state.tokenize[state.tokenize.length-1].isBase) return null;\n    var firstChar = textAfter && textAfter.charAt(0), ctx = state.context;\n    if (ctx.type == \"statement\" && !expectExpression(state.lastToken, true)) ctx = ctx.prev;\n    var closing = firstChar == ctx.type;\n    if (ctx.type == \"statement\") return ctx.indented + (firstChar == \"{\" ? 0 : cx.unit);\n    else if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: \"//\", block: {open: \"/*\", close: \"*/\"}},\n    closeBrackets: {brackets: [\"(\", \"[\", \"{\", \"'\", '\"', \"'''\", '\"\"\"']}\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/groovy.js?");

/***/ })

}]);