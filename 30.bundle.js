(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/crystal.js":
/*!***************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/crystal.js ***!
  \***************************************************************/
/*! exports provided: crystal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"crystal\", function() { return crystal; });\nfunction wordRegExp(words, end) {\n  return new RegExp((end ? \"\" : \"^\") + \"(?:\" + words.join(\"|\") + \")\" + (end ? \"$\" : \"\\\\b\"));\n}\n\nfunction chain(tokenize, stream, state) {\n  state.tokenize.push(tokenize);\n  return tokenize(stream, state);\n}\n\nvar operators = /^(?:[-+/%|&^]|\\*\\*?|[<>]{2})/;\nvar conditionalOperators = /^(?:[=!]~|===|<=>|[<>=!]=?|[|&]{2}|~)/;\nvar indexingOperators = /^(?:\\[\\][?=]?)/;\nvar anotherOperators = /^(?:\\.(?:\\.{2})?|->|[?:])/;\nvar idents = /^[a-z_\\u009F-\\uFFFF][a-zA-Z0-9_\\u009F-\\uFFFF]*/;\nvar types = /^[A-Z_\\u009F-\\uFFFF][a-zA-Z0-9_\\u009F-\\uFFFF]*/;\nvar keywords = wordRegExp([\n  \"abstract\", \"alias\", \"as\", \"asm\", \"begin\", \"break\", \"case\", \"class\", \"def\", \"do\",\n  \"else\", \"elsif\", \"end\", \"ensure\", \"enum\", \"extend\", \"for\", \"fun\", \"if\",\n  \"include\", \"instance_sizeof\", \"lib\", \"macro\", \"module\", \"next\", \"of\", \"out\", \"pointerof\",\n  \"private\", \"protected\", \"rescue\", \"return\", \"require\", \"select\", \"sizeof\", \"struct\",\n  \"super\", \"then\", \"type\", \"typeof\", \"uninitialized\", \"union\", \"unless\", \"until\", \"when\", \"while\", \"with\",\n  \"yield\", \"__DIR__\", \"__END_LINE__\", \"__FILE__\", \"__LINE__\"\n]);\nvar atomWords = wordRegExp([\"true\", \"false\", \"nil\", \"self\"]);\nvar indentKeywordsArray = [\n  \"def\", \"fun\", \"macro\",\n  \"class\", \"module\", \"struct\", \"lib\", \"enum\", \"union\",\n  \"do\", \"for\"\n];\nvar indentKeywords = wordRegExp(indentKeywordsArray);\nvar indentExpressionKeywordsArray = [\"if\", \"unless\", \"case\", \"while\", \"until\", \"begin\", \"then\"];\nvar indentExpressionKeywords = wordRegExp(indentExpressionKeywordsArray);\nvar dedentKeywordsArray = [\"end\", \"else\", \"elsif\", \"rescue\", \"ensure\"];\nvar dedentKeywords = wordRegExp(dedentKeywordsArray);\nvar dedentPunctualsArray = [\"\\\\)\", \"\\\\}\", \"\\\\]\"];\nvar dedentPunctuals = new RegExp(\"^(?:\" + dedentPunctualsArray.join(\"|\") + \")$\");\nvar nextTokenizer = {\n  \"def\": tokenFollowIdent, \"fun\": tokenFollowIdent, \"macro\": tokenMacroDef,\n  \"class\": tokenFollowType, \"module\": tokenFollowType, \"struct\": tokenFollowType,\n  \"lib\": tokenFollowType, \"enum\": tokenFollowType, \"union\": tokenFollowType\n};\nvar matching = {\"[\": \"]\", \"{\": \"}\", \"(\": \")\", \"<\": \">\"};\n\nfunction tokenBase(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  // Macros\n  if (state.lastToken != \"\\\\\" && stream.match(\"{%\", false)) {\n    return chain(tokenMacro(\"%\", \"%\"), stream, state);\n  }\n\n  if (state.lastToken != \"\\\\\" && stream.match(\"{{\", false)) {\n    return chain(tokenMacro(\"{\", \"}\"), stream, state);\n  }\n\n  // Comments\n  if (stream.peek() == \"#\") {\n    stream.skipToEnd();\n    return \"comment\";\n  }\n\n  // Variables and keywords\n  var matched;\n  if (stream.match(idents)) {\n    stream.eat(/[?!]/);\n\n    matched = stream.current();\n    if (stream.eat(\":\")) {\n      return \"atom\";\n    } else if (state.lastToken == \".\") {\n      return \"property\";\n    } else if (keywords.test(matched)) {\n      if (indentKeywords.test(matched)) {\n        if (!(matched == \"fun\" && state.blocks.indexOf(\"lib\") >= 0) && !(matched == \"def\" && state.lastToken == \"abstract\")) {\n          state.blocks.push(matched);\n          state.currentIndent += 1;\n        }\n      } else if ((state.lastStyle == \"operator\" || !state.lastStyle) && indentExpressionKeywords.test(matched)) {\n        state.blocks.push(matched);\n        state.currentIndent += 1;\n      } else if (matched == \"end\") {\n        state.blocks.pop();\n        state.currentIndent -= 1;\n      }\n\n      if (nextTokenizer.hasOwnProperty(matched)) {\n        state.tokenize.push(nextTokenizer[matched]);\n      }\n\n      return \"keyword\";\n    } else if (atomWords.test(matched)) {\n      return \"atom\";\n    }\n\n    return \"variable\";\n  }\n\n  // Class variables and instance variables\n  // or attributes\n  if (stream.eat(\"@\")) {\n    if (stream.peek() == \"[\") {\n      return chain(tokenNest(\"[\", \"]\", \"meta\"), stream, state);\n    }\n\n    stream.eat(\"@\");\n    stream.match(idents) || stream.match(types);\n    return \"propertyName\";\n  }\n\n  // Constants and types\n  if (stream.match(types)) {\n    return \"tag\";\n  }\n\n  // Symbols or ':' operator\n  if (stream.eat(\":\")) {\n    if (stream.eat(\"\\\"\")) {\n      return chain(tokenQuote(\"\\\"\", \"atom\", false), stream, state);\n    } else if (stream.match(idents) || stream.match(types) ||\n               stream.match(operators) || stream.match(conditionalOperators) || stream.match(indexingOperators)) {\n      return \"atom\";\n    }\n    stream.eat(\":\");\n    return \"operator\";\n  }\n\n  // Strings\n  if (stream.eat(\"\\\"\")) {\n    return chain(tokenQuote(\"\\\"\", \"string\", true), stream, state);\n  }\n\n  // Strings or regexps or macro variables or '%' operator\n  if (stream.peek() == \"%\") {\n    var style = \"string\";\n    var embed = true;\n    var delim;\n\n    if (stream.match(\"%r\")) {\n      // Regexps\n      style = \"string.special\";\n      delim = stream.next();\n    } else if (stream.match(\"%w\")) {\n      embed = false;\n      delim = stream.next();\n    } else if (stream.match(\"%q\")) {\n      embed = false;\n      delim = stream.next();\n    } else {\n      if(delim = stream.match(/^%([^\\w\\s=])/)) {\n        delim = delim[1];\n      } else if (stream.match(/^%[a-zA-Z_\\u009F-\\uFFFF][\\w\\u009F-\\uFFFF]*/)) {\n        // Macro variables\n        return \"meta\";\n      } else if (stream.eat('%')) {\n        // '%' operator\n        return \"operator\";\n      }\n    }\n\n    if (matching.hasOwnProperty(delim)) {\n      delim = matching[delim];\n    }\n    return chain(tokenQuote(delim, style, embed), stream, state);\n  }\n\n  // Here Docs\n  if (matched = stream.match(/^<<-('?)([A-Z]\\w*)\\1/)) {\n    return chain(tokenHereDoc(matched[2], !matched[1]), stream, state)\n  }\n\n  // Characters\n  if (stream.eat(\"'\")) {\n    stream.match(/^(?:[^']|\\\\(?:[befnrtv0'\"]|[0-7]{3}|u(?:[0-9a-fA-F]{4}|\\{[0-9a-fA-F]{1,6}\\})))/);\n    stream.eat(\"'\");\n    return \"atom\";\n  }\n\n  // Numbers\n  if (stream.eat(\"0\")) {\n    if (stream.eat(\"x\")) {\n      stream.match(/^[0-9a-fA-F_]+/);\n    } else if (stream.eat(\"o\")) {\n      stream.match(/^[0-7_]+/);\n    } else if (stream.eat(\"b\")) {\n      stream.match(/^[01_]+/);\n    }\n    return \"number\";\n  }\n\n  if (stream.eat(/^\\d/)) {\n    stream.match(/^[\\d_]*(?:\\.[\\d_]+)?(?:[eE][+-]?\\d+)?/);\n    return \"number\";\n  }\n\n  // Operators\n  if (stream.match(operators)) {\n    stream.eat(\"=\"); // Operators can follow assign symbol.\n    return \"operator\";\n  }\n\n  if (stream.match(conditionalOperators) || stream.match(anotherOperators)) {\n    return \"operator\";\n  }\n\n  // Parens and braces\n  if (matched = stream.match(/[({[]/, false)) {\n    matched = matched[0];\n    return chain(tokenNest(matched, matching[matched], null), stream, state);\n  }\n\n  // Escapes\n  if (stream.eat(\"\\\\\")) {\n    stream.next();\n    return \"meta\";\n  }\n\n  stream.next();\n  return null;\n}\n\nfunction tokenNest(begin, end, style, started) {\n  return function (stream, state) {\n    if (!started && stream.match(begin)) {\n      state.tokenize[state.tokenize.length - 1] = tokenNest(begin, end, style, true);\n      state.currentIndent += 1;\n      return style;\n    }\n\n    var nextStyle = tokenBase(stream, state);\n    if (stream.current() === end) {\n      state.tokenize.pop();\n      state.currentIndent -= 1;\n      nextStyle = style;\n    }\n\n    return nextStyle;\n  };\n}\n\nfunction tokenMacro(begin, end, started) {\n  return function (stream, state) {\n    if (!started && stream.match(\"{\" + begin)) {\n      state.currentIndent += 1;\n      state.tokenize[state.tokenize.length - 1] = tokenMacro(begin, end, true);\n      return \"meta\";\n    }\n\n    if (stream.match(end + \"}\")) {\n      state.currentIndent -= 1;\n      state.tokenize.pop();\n      return \"meta\";\n    }\n\n    return tokenBase(stream, state);\n  };\n}\n\nfunction tokenMacroDef(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  var matched;\n  if (matched = stream.match(idents)) {\n    if (matched == \"def\") {\n      return \"keyword\";\n    }\n    stream.eat(/[?!]/);\n  }\n\n  state.tokenize.pop();\n  return \"def\";\n}\n\nfunction tokenFollowIdent(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  if (stream.match(idents)) {\n    stream.eat(/[!?]/);\n  } else {\n    stream.match(operators) || stream.match(conditionalOperators) || stream.match(indexingOperators);\n  }\n  state.tokenize.pop();\n  return \"def\";\n}\n\nfunction tokenFollowType(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  stream.match(types);\n  state.tokenize.pop();\n  return \"def\";\n}\n\nfunction tokenQuote(end, style, embed) {\n  return function (stream, state) {\n    var escaped = false;\n\n    while (stream.peek()) {\n      if (!escaped) {\n        if (stream.match(\"{%\", false)) {\n          state.tokenize.push(tokenMacro(\"%\", \"%\"));\n          return style;\n        }\n\n        if (stream.match(\"{{\", false)) {\n          state.tokenize.push(tokenMacro(\"{\", \"}\"));\n          return style;\n        }\n\n        if (embed && stream.match(\"#{\", false)) {\n          state.tokenize.push(tokenNest(\"#{\", \"}\", \"meta\"));\n          return style;\n        }\n\n        var ch = stream.next();\n\n        if (ch == end) {\n          state.tokenize.pop();\n          return style;\n        }\n\n        escaped = embed && ch == \"\\\\\";\n      } else {\n        stream.next();\n        escaped = false;\n      }\n    }\n\n    return style;\n  };\n}\n\nfunction tokenHereDoc(phrase, embed) {\n  return function (stream, state) {\n    if (stream.sol()) {\n      stream.eatSpace()\n      if (stream.match(phrase)) {\n        state.tokenize.pop();\n        return \"string\";\n      }\n    }\n\n    var escaped = false;\n    while (stream.peek()) {\n      if (!escaped) {\n        if (stream.match(\"{%\", false)) {\n          state.tokenize.push(tokenMacro(\"%\", \"%\"));\n          return \"string\";\n        }\n\n        if (stream.match(\"{{\", false)) {\n          state.tokenize.push(tokenMacro(\"{\", \"}\"));\n          return \"string\";\n        }\n\n        if (embed && stream.match(\"#{\", false)) {\n          state.tokenize.push(tokenNest(\"#{\", \"}\", \"meta\"));\n          return \"string\";\n        }\n\n        escaped = embed && stream.next() == \"\\\\\";\n      } else {\n        stream.next();\n        escaped = false;\n      }\n    }\n\n    return \"string\";\n  }\n}\n\nconst crystal = {\n  startState: function () {\n    return {\n      tokenize: [tokenBase],\n      currentIndent: 0,\n      lastToken: null,\n      lastStyle: null,\n      blocks: []\n    };\n  },\n\n  token: function (stream, state) {\n    var style = state.tokenize[state.tokenize.length - 1](stream, state);\n    var token = stream.current();\n\n    if (style && style != \"comment\") {\n      state.lastToken = token;\n      state.lastStyle = style;\n    }\n\n    return style;\n  },\n\n  indent: function (state, textAfter, cx) {\n    textAfter = textAfter.replace(/^\\s*(?:\\{%)?\\s*|\\s*(?:%\\})?\\s*$/g, \"\");\n\n    if (dedentKeywords.test(textAfter) || dedentPunctuals.test(textAfter)) {\n      return cx.unit * (state.currentIndent - 1);\n    }\n\n    return cx.unit * state.currentIndent;\n  },\n\n  languageData: {\n    indentOnInput: wordRegExp(dedentPunctualsArray.concat(dedentKeywordsArray), true),\n    commentTokens: {line: \"#\"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvY3J5c3RhbC5qcz82MjI3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLEVBQUU7QUFDNUMsNERBQTRELEVBQUU7QUFDOUQ7QUFDQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVksS0FBSzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTs7QUFFQSxpREFBaUQ7QUFDakQsOEJBQThCLEtBQUs7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxFQUFFLGlCQUFpQixFQUFFLEdBQUcsWUFBWSxJQUFJLEVBQUU7QUFDN0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QiwyQ0FBMkMsS0FBSztBQUNoRDtBQUNBOztBQUVBLHFDQUFxQztBQUNyQywyQ0FBMkMsS0FBSztBQUNoRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUIsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckMsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0EsNENBQTRDLGdCQUFnQjs7QUFFNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvY3J5c3RhbC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRSZWdFeHAod29yZHMsIGVuZCkge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgoZW5kID8gXCJcIiA6IFwiXlwiKSArIFwiKD86XCIgKyB3b3Jkcy5qb2luKFwifFwiKSArIFwiKVwiICsgKGVuZCA/IFwiJFwiIDogXCJcXFxcYlwiKSk7XG59XG5cbmZ1bmN0aW9uIGNoYWluKHRva2VuaXplLCBzdHJlYW0sIHN0YXRlKSB7XG4gIHN0YXRlLnRva2VuaXplLnB1c2godG9rZW5pemUpO1xuICByZXR1cm4gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG59XG5cbnZhciBvcGVyYXRvcnMgPSAvXig/OlstKy8lfCZeXXxcXCpcXCo/fFs8Pl17Mn0pLztcbnZhciBjb25kaXRpb25hbE9wZXJhdG9ycyA9IC9eKD86Wz0hXX58PT09fDw9PnxbPD49IV09P3xbfCZdezJ9fH4pLztcbnZhciBpbmRleGluZ09wZXJhdG9ycyA9IC9eKD86XFxbXFxdWz89XT8pLztcbnZhciBhbm90aGVyT3BlcmF0b3JzID0gL14oPzpcXC4oPzpcXC57Mn0pP3wtPnxbPzpdKS87XG52YXIgaWRlbnRzID0gL15bYS16X1xcdTAwOUYtXFx1RkZGRl1bYS16QS1aMC05X1xcdTAwOUYtXFx1RkZGRl0qLztcbnZhciB0eXBlcyA9IC9eW0EtWl9cXHUwMDlGLVxcdUZGRkZdW2EtekEtWjAtOV9cXHUwMDlGLVxcdUZGRkZdKi87XG52YXIga2V5d29yZHMgPSB3b3JkUmVnRXhwKFtcbiAgXCJhYnN0cmFjdFwiLCBcImFsaWFzXCIsIFwiYXNcIiwgXCJhc21cIiwgXCJiZWdpblwiLCBcImJyZWFrXCIsIFwiY2FzZVwiLCBcImNsYXNzXCIsIFwiZGVmXCIsIFwiZG9cIixcbiAgXCJlbHNlXCIsIFwiZWxzaWZcIiwgXCJlbmRcIiwgXCJlbnN1cmVcIiwgXCJlbnVtXCIsIFwiZXh0ZW5kXCIsIFwiZm9yXCIsIFwiZnVuXCIsIFwiaWZcIixcbiAgXCJpbmNsdWRlXCIsIFwiaW5zdGFuY2Vfc2l6ZW9mXCIsIFwibGliXCIsIFwibWFjcm9cIiwgXCJtb2R1bGVcIiwgXCJuZXh0XCIsIFwib2ZcIiwgXCJvdXRcIiwgXCJwb2ludGVyb2ZcIixcbiAgXCJwcml2YXRlXCIsIFwicHJvdGVjdGVkXCIsIFwicmVzY3VlXCIsIFwicmV0dXJuXCIsIFwicmVxdWlyZVwiLCBcInNlbGVjdFwiLCBcInNpemVvZlwiLCBcInN0cnVjdFwiLFxuICBcInN1cGVyXCIsIFwidGhlblwiLCBcInR5cGVcIiwgXCJ0eXBlb2ZcIiwgXCJ1bmluaXRpYWxpemVkXCIsIFwidW5pb25cIiwgXCJ1bmxlc3NcIiwgXCJ1bnRpbFwiLCBcIndoZW5cIiwgXCJ3aGlsZVwiLCBcIndpdGhcIixcbiAgXCJ5aWVsZFwiLCBcIl9fRElSX19cIiwgXCJfX0VORF9MSU5FX19cIiwgXCJfX0ZJTEVfX1wiLCBcIl9fTElORV9fXCJcbl0pO1xudmFyIGF0b21Xb3JkcyA9IHdvcmRSZWdFeHAoW1widHJ1ZVwiLCBcImZhbHNlXCIsIFwibmlsXCIsIFwic2VsZlwiXSk7XG52YXIgaW5kZW50S2V5d29yZHNBcnJheSA9IFtcbiAgXCJkZWZcIiwgXCJmdW5cIiwgXCJtYWNyb1wiLFxuICBcImNsYXNzXCIsIFwibW9kdWxlXCIsIFwic3RydWN0XCIsIFwibGliXCIsIFwiZW51bVwiLCBcInVuaW9uXCIsXG4gIFwiZG9cIiwgXCJmb3JcIlxuXTtcbnZhciBpbmRlbnRLZXl3b3JkcyA9IHdvcmRSZWdFeHAoaW5kZW50S2V5d29yZHNBcnJheSk7XG52YXIgaW5kZW50RXhwcmVzc2lvbktleXdvcmRzQXJyYXkgPSBbXCJpZlwiLCBcInVubGVzc1wiLCBcImNhc2VcIiwgXCJ3aGlsZVwiLCBcInVudGlsXCIsIFwiYmVnaW5cIiwgXCJ0aGVuXCJdO1xudmFyIGluZGVudEV4cHJlc3Npb25LZXl3b3JkcyA9IHdvcmRSZWdFeHAoaW5kZW50RXhwcmVzc2lvbktleXdvcmRzQXJyYXkpO1xudmFyIGRlZGVudEtleXdvcmRzQXJyYXkgPSBbXCJlbmRcIiwgXCJlbHNlXCIsIFwiZWxzaWZcIiwgXCJyZXNjdWVcIiwgXCJlbnN1cmVcIl07XG52YXIgZGVkZW50S2V5d29yZHMgPSB3b3JkUmVnRXhwKGRlZGVudEtleXdvcmRzQXJyYXkpO1xudmFyIGRlZGVudFB1bmN0dWFsc0FycmF5ID0gW1wiXFxcXClcIiwgXCJcXFxcfVwiLCBcIlxcXFxdXCJdO1xudmFyIGRlZGVudFB1bmN0dWFscyA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBkZWRlbnRQdW5jdHVhbHNBcnJheS5qb2luKFwifFwiKSArIFwiKSRcIik7XG52YXIgbmV4dFRva2VuaXplciA9IHtcbiAgXCJkZWZcIjogdG9rZW5Gb2xsb3dJZGVudCwgXCJmdW5cIjogdG9rZW5Gb2xsb3dJZGVudCwgXCJtYWNyb1wiOiB0b2tlbk1hY3JvRGVmLFxuICBcImNsYXNzXCI6IHRva2VuRm9sbG93VHlwZSwgXCJtb2R1bGVcIjogdG9rZW5Gb2xsb3dUeXBlLCBcInN0cnVjdFwiOiB0b2tlbkZvbGxvd1R5cGUsXG4gIFwibGliXCI6IHRva2VuRm9sbG93VHlwZSwgXCJlbnVtXCI6IHRva2VuRm9sbG93VHlwZSwgXCJ1bmlvblwiOiB0b2tlbkZvbGxvd1R5cGVcbn07XG52YXIgbWF0Y2hpbmcgPSB7XCJbXCI6IFwiXVwiLCBcIntcIjogXCJ9XCIsIFwiKFwiOiBcIilcIiwgXCI8XCI6IFwiPlwifTtcblxuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBNYWNyb3NcbiAgaWYgKHN0YXRlLmxhc3RUb2tlbiAhPSBcIlxcXFxcIiAmJiBzdHJlYW0ubWF0Y2goXCJ7JVwiLCBmYWxzZSkpIHtcbiAgICByZXR1cm4gY2hhaW4odG9rZW5NYWNybyhcIiVcIiwgXCIlXCIpLCBzdHJlYW0sIHN0YXRlKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5sYXN0VG9rZW4gIT0gXCJcXFxcXCIgJiYgc3RyZWFtLm1hdGNoKFwie3tcIiwgZmFsc2UpKSB7XG4gICAgcmV0dXJuIGNoYWluKHRva2VuTWFjcm8oXCJ7XCIsIFwifVwiKSwgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cblxuICAvLyBDb21tZW50c1xuICBpZiAoc3RyZWFtLnBlZWsoKSA9PSBcIiNcIikge1xuICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gIH1cblxuICAvLyBWYXJpYWJsZXMgYW5kIGtleXdvcmRzXG4gIHZhciBtYXRjaGVkO1xuICBpZiAoc3RyZWFtLm1hdGNoKGlkZW50cykpIHtcbiAgICBzdHJlYW0uZWF0KC9bPyFdLyk7XG5cbiAgICBtYXRjaGVkID0gc3RyZWFtLmN1cnJlbnQoKTtcbiAgICBpZiAoc3RyZWFtLmVhdChcIjpcIikpIHtcbiAgICAgIHJldHVybiBcImF0b21cIjtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxhc3RUb2tlbiA9PSBcIi5cIikge1xuICAgICAgcmV0dXJuIFwicHJvcGVydHlcIjtcbiAgICB9IGVsc2UgaWYgKGtleXdvcmRzLnRlc3QobWF0Y2hlZCkpIHtcbiAgICAgIGlmIChpbmRlbnRLZXl3b3Jkcy50ZXN0KG1hdGNoZWQpKSB7XG4gICAgICAgIGlmICghKG1hdGNoZWQgPT0gXCJmdW5cIiAmJiBzdGF0ZS5ibG9ja3MuaW5kZXhPZihcImxpYlwiKSA+PSAwKSAmJiAhKG1hdGNoZWQgPT0gXCJkZWZcIiAmJiBzdGF0ZS5sYXN0VG9rZW4gPT0gXCJhYnN0cmFjdFwiKSkge1xuICAgICAgICAgIHN0YXRlLmJsb2Nrcy5wdXNoKG1hdGNoZWQpO1xuICAgICAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgoc3RhdGUubGFzdFN0eWxlID09IFwib3BlcmF0b3JcIiB8fCAhc3RhdGUubGFzdFN0eWxlKSAmJiBpbmRlbnRFeHByZXNzaW9uS2V5d29yZHMudGVzdChtYXRjaGVkKSkge1xuICAgICAgICBzdGF0ZS5ibG9ja3MucHVzaChtYXRjaGVkKTtcbiAgICAgICAgc3RhdGUuY3VycmVudEluZGVudCArPSAxO1xuICAgICAgfSBlbHNlIGlmIChtYXRjaGVkID09IFwiZW5kXCIpIHtcbiAgICAgICAgc3RhdGUuYmxvY2tzLnBvcCgpO1xuICAgICAgICBzdGF0ZS5jdXJyZW50SW5kZW50IC09IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0VG9rZW5pemVyLmhhc093blByb3BlcnR5KG1hdGNoZWQpKSB7XG4gICAgICAgIHN0YXRlLnRva2VuaXplLnB1c2gobmV4dFRva2VuaXplclttYXRjaGVkXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICB9IGVsc2UgaWYgKGF0b21Xb3Jkcy50ZXN0KG1hdGNoZWQpKSB7XG4gICAgICByZXR1cm4gXCJhdG9tXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwidmFyaWFibGVcIjtcbiAgfVxuXG4gIC8vIENsYXNzIHZhcmlhYmxlcyBhbmQgaW5zdGFuY2UgdmFyaWFibGVzXG4gIC8vIG9yIGF0dHJpYnV0ZXNcbiAgaWYgKHN0cmVhbS5lYXQoXCJAXCIpKSB7XG4gICAgaWYgKHN0cmVhbS5wZWVrKCkgPT0gXCJbXCIpIHtcbiAgICAgIHJldHVybiBjaGFpbih0b2tlbk5lc3QoXCJbXCIsIFwiXVwiLCBcIm1ldGFcIiksIHN0cmVhbSwgc3RhdGUpO1xuICAgIH1cblxuICAgIHN0cmVhbS5lYXQoXCJAXCIpO1xuICAgIHN0cmVhbS5tYXRjaChpZGVudHMpIHx8IHN0cmVhbS5tYXRjaCh0eXBlcyk7XG4gICAgcmV0dXJuIFwicHJvcGVydHlOYW1lXCI7XG4gIH1cblxuICAvLyBDb25zdGFudHMgYW5kIHR5cGVzXG4gIGlmIChzdHJlYW0ubWF0Y2godHlwZXMpKSB7XG4gICAgcmV0dXJuIFwidGFnXCI7XG4gIH1cblxuICAvLyBTeW1ib2xzIG9yICc6JyBvcGVyYXRvclxuICBpZiAoc3RyZWFtLmVhdChcIjpcIikpIHtcbiAgICBpZiAoc3RyZWFtLmVhdChcIlxcXCJcIikpIHtcbiAgICAgIHJldHVybiBjaGFpbih0b2tlblF1b3RlKFwiXFxcIlwiLCBcImF0b21cIiwgZmFsc2UpLCBzdHJlYW0sIHN0YXRlKTtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaChpZGVudHMpIHx8IHN0cmVhbS5tYXRjaCh0eXBlcykgfHxcbiAgICAgICAgICAgICAgIHN0cmVhbS5tYXRjaChvcGVyYXRvcnMpIHx8IHN0cmVhbS5tYXRjaChjb25kaXRpb25hbE9wZXJhdG9ycykgfHwgc3RyZWFtLm1hdGNoKGluZGV4aW5nT3BlcmF0b3JzKSkge1xuICAgICAgcmV0dXJuIFwiYXRvbVwiO1xuICAgIH1cbiAgICBzdHJlYW0uZWF0KFwiOlwiKTtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9XG5cbiAgLy8gU3RyaW5nc1xuICBpZiAoc3RyZWFtLmVhdChcIlxcXCJcIikpIHtcbiAgICByZXR1cm4gY2hhaW4odG9rZW5RdW90ZShcIlxcXCJcIiwgXCJzdHJpbmdcIiwgdHJ1ZSksIHN0cmVhbSwgc3RhdGUpO1xuICB9XG5cbiAgLy8gU3RyaW5ncyBvciByZWdleHBzIG9yIG1hY3JvIHZhcmlhYmxlcyBvciAnJScgb3BlcmF0b3JcbiAgaWYgKHN0cmVhbS5wZWVrKCkgPT0gXCIlXCIpIHtcbiAgICB2YXIgc3R5bGUgPSBcInN0cmluZ1wiO1xuICAgIHZhciBlbWJlZCA9IHRydWU7XG4gICAgdmFyIGRlbGltO1xuXG4gICAgaWYgKHN0cmVhbS5tYXRjaChcIiVyXCIpKSB7XG4gICAgICAvLyBSZWdleHBzXG4gICAgICBzdHlsZSA9IFwic3RyaW5nLnNwZWNpYWxcIjtcbiAgICAgIGRlbGltID0gc3RyZWFtLm5leHQoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaChcIiV3XCIpKSB7XG4gICAgICBlbWJlZCA9IGZhbHNlO1xuICAgICAgZGVsaW0gPSBzdHJlYW0ubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKFwiJXFcIikpIHtcbiAgICAgIGVtYmVkID0gZmFsc2U7XG4gICAgICBkZWxpbSA9IHN0cmVhbS5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGRlbGltID0gc3RyZWFtLm1hdGNoKC9eJShbXlxcd1xccz1dKS8pKSB7XG4gICAgICAgIGRlbGltID0gZGVsaW1bMV07XG4gICAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXiVbYS16QS1aX1xcdTAwOUYtXFx1RkZGRl1bXFx3XFx1MDA5Ri1cXHVGRkZGXSovKSkge1xuICAgICAgICAvLyBNYWNybyB2YXJpYWJsZXNcbiAgICAgICAgcmV0dXJuIFwibWV0YVwiO1xuICAgICAgfSBlbHNlIGlmIChzdHJlYW0uZWF0KCclJykpIHtcbiAgICAgICAgLy8gJyUnIG9wZXJhdG9yXG4gICAgICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoaW5nLmhhc093blByb3BlcnR5KGRlbGltKSkge1xuICAgICAgZGVsaW0gPSBtYXRjaGluZ1tkZWxpbV07XG4gICAgfVxuICAgIHJldHVybiBjaGFpbih0b2tlblF1b3RlKGRlbGltLCBzdHlsZSwgZW1iZWQpLCBzdHJlYW0sIHN0YXRlKTtcbiAgfVxuXG4gIC8vIEhlcmUgRG9jc1xuICBpZiAobWF0Y2hlZCA9IHN0cmVhbS5tYXRjaCgvXjw8LSgnPykoW0EtWl1cXHcqKVxcMS8pKSB7XG4gICAgcmV0dXJuIGNoYWluKHRva2VuSGVyZURvYyhtYXRjaGVkWzJdLCAhbWF0Y2hlZFsxXSksIHN0cmVhbSwgc3RhdGUpXG4gIH1cblxuICAvLyBDaGFyYWN0ZXJzXG4gIGlmIChzdHJlYW0uZWF0KFwiJ1wiKSkge1xuICAgIHN0cmVhbS5tYXRjaCgvXig/OlteJ118XFxcXCg/OltiZWZucnR2MCdcIl18WzAtN117M318dSg/OlswLTlhLWZBLUZdezR9fFxce1swLTlhLWZBLUZdezEsNn1cXH0pKSkvKTtcbiAgICBzdHJlYW0uZWF0KFwiJ1wiKTtcbiAgICByZXR1cm4gXCJhdG9tXCI7XG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmIChzdHJlYW0uZWF0KFwiMFwiKSkge1xuICAgIGlmIChzdHJlYW0uZWF0KFwieFwiKSkge1xuICAgICAgc3RyZWFtLm1hdGNoKC9eWzAtOWEtZkEtRl9dKy8pO1xuICAgIH0gZWxzZSBpZiAoc3RyZWFtLmVhdChcIm9cIikpIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlswLTdfXSsvKTtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5lYXQoXCJiXCIpKSB7XG4gICAgICBzdHJlYW0ubWF0Y2goL15bMDFfXSsvKTtcbiAgICB9XG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gIH1cblxuICBpZiAoc3RyZWFtLmVhdCgvXlxcZC8pKSB7XG4gICAgc3RyZWFtLm1hdGNoKC9eW1xcZF9dKig/OlxcLltcXGRfXSspPyg/OltlRV1bKy1dP1xcZCspPy8pO1xuICAgIHJldHVybiBcIm51bWJlclwiO1xuICB9XG5cbiAgLy8gT3BlcmF0b3JzXG4gIGlmIChzdHJlYW0ubWF0Y2gob3BlcmF0b3JzKSkge1xuICAgIHN0cmVhbS5lYXQoXCI9XCIpOyAvLyBPcGVyYXRvcnMgY2FuIGZvbGxvdyBhc3NpZ24gc3ltYm9sLlxuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH1cblxuICBpZiAoc3RyZWFtLm1hdGNoKGNvbmRpdGlvbmFsT3BlcmF0b3JzKSB8fCBzdHJlYW0ubWF0Y2goYW5vdGhlck9wZXJhdG9ycykpIHtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9XG5cbiAgLy8gUGFyZW5zIGFuZCBicmFjZXNcbiAgaWYgKG1hdGNoZWQgPSBzdHJlYW0ubWF0Y2goL1soe1tdLywgZmFsc2UpKSB7XG4gICAgbWF0Y2hlZCA9IG1hdGNoZWRbMF07XG4gICAgcmV0dXJuIGNoYWluKHRva2VuTmVzdChtYXRjaGVkLCBtYXRjaGluZ1ttYXRjaGVkXSwgbnVsbCksIHN0cmVhbSwgc3RhdGUpO1xuICB9XG5cbiAgLy8gRXNjYXBlc1xuICBpZiAoc3RyZWFtLmVhdChcIlxcXFxcIikpIHtcbiAgICBzdHJlYW0ubmV4dCgpO1xuICAgIHJldHVybiBcIm1ldGFcIjtcbiAgfVxuXG4gIHN0cmVhbS5uZXh0KCk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB0b2tlbk5lc3QoYmVnaW4sIGVuZCwgc3R5bGUsIHN0YXJ0ZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKCFzdGFydGVkICYmIHN0cmVhbS5tYXRjaChiZWdpbikpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplW3N0YXRlLnRva2VuaXplLmxlbmd0aCAtIDFdID0gdG9rZW5OZXN0KGJlZ2luLCBlbmQsIHN0eWxlLCB0cnVlKTtcbiAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQgKz0gMTtcbiAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFN0eWxlID0gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpO1xuICAgIGlmIChzdHJlYW0uY3VycmVudCgpID09PSBlbmQpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplLnBvcCgpO1xuICAgICAgc3RhdGUuY3VycmVudEluZGVudCAtPSAxO1xuICAgICAgbmV4dFN0eWxlID0gc3R5bGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdHlsZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9rZW5NYWNybyhiZWdpbiwgZW5kLCBzdGFydGVkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmICghc3RhcnRlZCAmJiBzdHJlYW0ubWF0Y2goXCJ7XCIgKyBiZWdpbikpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQgKz0gMTtcbiAgICAgIHN0YXRlLnRva2VuaXplW3N0YXRlLnRva2VuaXplLmxlbmd0aCAtIDFdID0gdG9rZW5NYWNybyhiZWdpbiwgZW5kLCB0cnVlKTtcbiAgICAgIHJldHVybiBcIm1ldGFcIjtcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtLm1hdGNoKGVuZCArIFwifVwiKSkge1xuICAgICAgc3RhdGUuY3VycmVudEluZGVudCAtPSAxO1xuICAgICAgc3RhdGUudG9rZW5pemUucG9wKCk7XG4gICAgICByZXR1cm4gXCJtZXRhXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9rZW5NYWNyb0RlZihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG1hdGNoZWQ7XG4gIGlmIChtYXRjaGVkID0gc3RyZWFtLm1hdGNoKGlkZW50cykpIHtcbiAgICBpZiAobWF0Y2hlZCA9PSBcImRlZlwiKSB7XG4gICAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gICAgfVxuICAgIHN0cmVhbS5lYXQoL1s/IV0vKTtcbiAgfVxuXG4gIHN0YXRlLnRva2VuaXplLnBvcCgpO1xuICByZXR1cm4gXCJkZWZcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5Gb2xsb3dJZGVudChzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChpZGVudHMpKSB7XG4gICAgc3RyZWFtLmVhdCgvWyE/XS8pO1xuICB9IGVsc2Uge1xuICAgIHN0cmVhbS5tYXRjaChvcGVyYXRvcnMpIHx8IHN0cmVhbS5tYXRjaChjb25kaXRpb25hbE9wZXJhdG9ycykgfHwgc3RyZWFtLm1hdGNoKGluZGV4aW5nT3BlcmF0b3JzKTtcbiAgfVxuICBzdGF0ZS50b2tlbml6ZS5wb3AoKTtcbiAgcmV0dXJuIFwiZGVmXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuRm9sbG93VHlwZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RyZWFtLm1hdGNoKHR5cGVzKTtcbiAgc3RhdGUudG9rZW5pemUucG9wKCk7XG4gIHJldHVybiBcImRlZlwiO1xufVxuXG5mdW5jdGlvbiB0b2tlblF1b3RlKGVuZCwgc3R5bGUsIGVtYmVkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoc3RyZWFtLnBlZWsoKSkge1xuICAgICAgaWYgKCFlc2NhcGVkKSB7XG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2goXCJ7JVwiLCBmYWxzZSkpIHtcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZS5wdXNoKHRva2VuTWFjcm8oXCIlXCIsIFwiJVwiKSk7XG4gICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChcInt7XCIsIGZhbHNlKSkge1xuICAgICAgICAgIHN0YXRlLnRva2VuaXplLnB1c2godG9rZW5NYWNybyhcIntcIiwgXCJ9XCIpKTtcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW1iZWQgJiYgc3RyZWFtLm1hdGNoKFwiI3tcIiwgZmFsc2UpKSB7XG4gICAgICAgICAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlbk5lc3QoXCIje1wiLCBcIn1cIiwgXCJtZXRhXCIpKTtcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuXG4gICAgICAgIGlmIChjaCA9PSBlbmQpIHtcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZS5wb3AoKTtcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBlc2NhcGVkID0gZW1iZWQgJiYgY2ggPT0gXCJcXFxcXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2tlbkhlcmVEb2MocGhyYXNlLCBlbWJlZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwgc3RhdGUpIHtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBzdHJlYW0uZWF0U3BhY2UoKVxuICAgICAgaWYgKHN0cmVhbS5tYXRjaChwaHJhc2UpKSB7XG4gICAgICAgIHN0YXRlLnRva2VuaXplLnBvcCgpO1xuICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZXNjYXBlZCA9IGZhbHNlO1xuICAgIHdoaWxlIChzdHJlYW0ucGVlaygpKSB7XG4gICAgICBpZiAoIWVzY2FwZWQpIHtcbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChcInslXCIsIGZhbHNlKSkge1xuICAgICAgICAgIHN0YXRlLnRva2VuaXplLnB1c2godG9rZW5NYWNybyhcIiVcIiwgXCIlXCIpKTtcbiAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2goXCJ7e1wiLCBmYWxzZSkpIHtcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZS5wdXNoKHRva2VuTWFjcm8oXCJ7XCIsIFwifVwiKSk7XG4gICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW1iZWQgJiYgc3RyZWFtLm1hdGNoKFwiI3tcIiwgZmFsc2UpKSB7XG4gICAgICAgICAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlbk5lc3QoXCIje1wiLCBcIn1cIiwgXCJtZXRhXCIpKTtcbiAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzY2FwZWQgPSBlbWJlZCAmJiBzdHJlYW0ubmV4dCgpID09IFwiXFxcXFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBcInN0cmluZ1wiO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjcnlzdGFsID0ge1xuICBzdGFydFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuaXplOiBbdG9rZW5CYXNlXSxcbiAgICAgIGN1cnJlbnRJbmRlbnQ6IDAsXG4gICAgICBsYXN0VG9rZW46IG51bGwsXG4gICAgICBsYXN0U3R5bGU6IG51bGwsXG4gICAgICBibG9ja3M6IFtdXG4gICAgfTtcbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24gKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgc3R5bGUgPSBzdGF0ZS50b2tlbml6ZVtzdGF0ZS50b2tlbml6ZS5sZW5ndGggLSAxXShzdHJlYW0sIHN0YXRlKTtcbiAgICB2YXIgdG9rZW4gPSBzdHJlYW0uY3VycmVudCgpO1xuXG4gICAgaWYgKHN0eWxlICYmIHN0eWxlICE9IFwiY29tbWVudFwiKSB7XG4gICAgICBzdGF0ZS5sYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgIHN0YXRlLmxhc3RTdHlsZSA9IHN0eWxlO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZTtcbiAgfSxcblxuICBpbmRlbnQ6IGZ1bmN0aW9uIChzdGF0ZSwgdGV4dEFmdGVyLCBjeCkge1xuICAgIHRleHRBZnRlciA9IHRleHRBZnRlci5yZXBsYWNlKC9eXFxzKig/OlxceyUpP1xccyp8XFxzKig/OiVcXH0pP1xccyokL2csIFwiXCIpO1xuXG4gICAgaWYgKGRlZGVudEtleXdvcmRzLnRlc3QodGV4dEFmdGVyKSB8fCBkZWRlbnRQdW5jdHVhbHMudGVzdCh0ZXh0QWZ0ZXIpKSB7XG4gICAgICByZXR1cm4gY3gudW5pdCAqIChzdGF0ZS5jdXJyZW50SW5kZW50IC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN4LnVuaXQgKiBzdGF0ZS5jdXJyZW50SW5kZW50O1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGluZGVudE9uSW5wdXQ6IHdvcmRSZWdFeHAoZGVkZW50UHVuY3R1YWxzQXJyYXkuY29uY2F0KGRlZGVudEtleXdvcmRzQXJyYXkpLCB0cnVlKSxcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCIjXCJ9XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/crystal.js\n");

/***/ })

}]);