(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{369:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crystal", function() { return crystal; });\nfunction wordRegExp(words, end) {\n  return new RegExp((end ? "" : "^") + "(?:" + words.join("|") + ")" + (end ? "$" : "\\\\b"));\n}\n\nfunction chain(tokenize, stream, state) {\n  state.tokenize.push(tokenize);\n  return tokenize(stream, state);\n}\n\nvar operators = /^(?:[-+/%|&^]|\\*\\*?|[<>]{2})/;\nvar conditionalOperators = /^(?:[=!]~|===|<=>|[<>=!]=?|[|&]{2}|~)/;\nvar indexingOperators = /^(?:\\[\\][?=]?)/;\nvar anotherOperators = /^(?:\\.(?:\\.{2})?|->|[?:])/;\nvar idents = /^[a-z_\\u009F-\\uFFFF][a-zA-Z0-9_\\u009F-\\uFFFF]*/;\nvar types = /^[A-Z_\\u009F-\\uFFFF][a-zA-Z0-9_\\u009F-\\uFFFF]*/;\nvar keywords = wordRegExp([\n  "abstract", "alias", "as", "asm", "begin", "break", "case", "class", "def", "do",\n  "else", "elsif", "end", "ensure", "enum", "extend", "for", "fun", "if",\n  "include", "instance_sizeof", "lib", "macro", "module", "next", "of", "out", "pointerof",\n  "private", "protected", "rescue", "return", "require", "select", "sizeof", "struct",\n  "super", "then", "type", "typeof", "uninitialized", "union", "unless", "until", "when", "while", "with",\n  "yield", "__DIR__", "__END_LINE__", "__FILE__", "__LINE__"\n]);\nvar atomWords = wordRegExp(["true", "false", "nil", "self"]);\nvar indentKeywordsArray = [\n  "def", "fun", "macro",\n  "class", "module", "struct", "lib", "enum", "union",\n  "do", "for"\n];\nvar indentKeywords = wordRegExp(indentKeywordsArray);\nvar indentExpressionKeywordsArray = ["if", "unless", "case", "while", "until", "begin", "then"];\nvar indentExpressionKeywords = wordRegExp(indentExpressionKeywordsArray);\nvar dedentKeywordsArray = ["end", "else", "elsif", "rescue", "ensure"];\nvar dedentKeywords = wordRegExp(dedentKeywordsArray);\nvar dedentPunctualsArray = ["\\\\)", "\\\\}", "\\\\]"];\nvar dedentPunctuals = new RegExp("^(?:" + dedentPunctualsArray.join("|") + ")$");\nvar nextTokenizer = {\n  "def": tokenFollowIdent, "fun": tokenFollowIdent, "macro": tokenMacroDef,\n  "class": tokenFollowType, "module": tokenFollowType, "struct": tokenFollowType,\n  "lib": tokenFollowType, "enum": tokenFollowType, "union": tokenFollowType\n};\nvar matching = {"[": "]", "{": "}", "(": ")", "<": ">"};\n\nfunction tokenBase(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  // Macros\n  if (state.lastToken != "\\\\" && stream.match("{%", false)) {\n    return chain(tokenMacro("%", "%"), stream, state);\n  }\n\n  if (state.lastToken != "\\\\" && stream.match("{{", false)) {\n    return chain(tokenMacro("{", "}"), stream, state);\n  }\n\n  // Comments\n  if (stream.peek() == "#") {\n    stream.skipToEnd();\n    return "comment";\n  }\n\n  // Variables and keywords\n  var matched;\n  if (stream.match(idents)) {\n    stream.eat(/[?!]/);\n\n    matched = stream.current();\n    if (stream.eat(":")) {\n      return "atom";\n    } else if (state.lastToken == ".") {\n      return "property";\n    } else if (keywords.test(matched)) {\n      if (indentKeywords.test(matched)) {\n        if (!(matched == "fun" && state.blocks.indexOf("lib") >= 0) && !(matched == "def" && state.lastToken == "abstract")) {\n          state.blocks.push(matched);\n          state.currentIndent += 1;\n        }\n      } else if ((state.lastStyle == "operator" || !state.lastStyle) && indentExpressionKeywords.test(matched)) {\n        state.blocks.push(matched);\n        state.currentIndent += 1;\n      } else if (matched == "end") {\n        state.blocks.pop();\n        state.currentIndent -= 1;\n      }\n\n      if (nextTokenizer.hasOwnProperty(matched)) {\n        state.tokenize.push(nextTokenizer[matched]);\n      }\n\n      return "keyword";\n    } else if (atomWords.test(matched)) {\n      return "atom";\n    }\n\n    return "variable";\n  }\n\n  // Class variables and instance variables\n  // or attributes\n  if (stream.eat("@")) {\n    if (stream.peek() == "[") {\n      return chain(tokenNest("[", "]", "meta"), stream, state);\n    }\n\n    stream.eat("@");\n    stream.match(idents) || stream.match(types);\n    return "propertyName";\n  }\n\n  // Constants and types\n  if (stream.match(types)) {\n    return "tag";\n  }\n\n  // Symbols or \':\' operator\n  if (stream.eat(":")) {\n    if (stream.eat("\\"")) {\n      return chain(tokenQuote("\\"", "atom", false), stream, state);\n    } else if (stream.match(idents) || stream.match(types) ||\n               stream.match(operators) || stream.match(conditionalOperators) || stream.match(indexingOperators)) {\n      return "atom";\n    }\n    stream.eat(":");\n    return "operator";\n  }\n\n  // Strings\n  if (stream.eat("\\"")) {\n    return chain(tokenQuote("\\"", "string", true), stream, state);\n  }\n\n  // Strings or regexps or macro variables or \'%\' operator\n  if (stream.peek() == "%") {\n    var style = "string";\n    var embed = true;\n    var delim;\n\n    if (stream.match("%r")) {\n      // Regexps\n      style = "string.special";\n      delim = stream.next();\n    } else if (stream.match("%w")) {\n      embed = false;\n      delim = stream.next();\n    } else if (stream.match("%q")) {\n      embed = false;\n      delim = stream.next();\n    } else {\n      if(delim = stream.match(/^%([^\\w\\s=])/)) {\n        delim = delim[1];\n      } else if (stream.match(/^%[a-zA-Z_\\u009F-\\uFFFF][\\w\\u009F-\\uFFFF]*/)) {\n        // Macro variables\n        return "meta";\n      } else if (stream.eat(\'%\')) {\n        // \'%\' operator\n        return "operator";\n      }\n    }\n\n    if (matching.hasOwnProperty(delim)) {\n      delim = matching[delim];\n    }\n    return chain(tokenQuote(delim, style, embed), stream, state);\n  }\n\n  // Here Docs\n  if (matched = stream.match(/^<<-(\'?)([A-Z]\\w*)\\1/)) {\n    return chain(tokenHereDoc(matched[2], !matched[1]), stream, state)\n  }\n\n  // Characters\n  if (stream.eat("\'")) {\n    stream.match(/^(?:[^\']|\\\\(?:[befnrtv0\'"]|[0-7]{3}|u(?:[0-9a-fA-F]{4}|\\{[0-9a-fA-F]{1,6}\\})))/);\n    stream.eat("\'");\n    return "atom";\n  }\n\n  // Numbers\n  if (stream.eat("0")) {\n    if (stream.eat("x")) {\n      stream.match(/^[0-9a-fA-F_]+/);\n    } else if (stream.eat("o")) {\n      stream.match(/^[0-7_]+/);\n    } else if (stream.eat("b")) {\n      stream.match(/^[01_]+/);\n    }\n    return "number";\n  }\n\n  if (stream.eat(/^\\d/)) {\n    stream.match(/^[\\d_]*(?:\\.[\\d_]+)?(?:[eE][+-]?\\d+)?/);\n    return "number";\n  }\n\n  // Operators\n  if (stream.match(operators)) {\n    stream.eat("="); // Operators can follow assign symbol.\n    return "operator";\n  }\n\n  if (stream.match(conditionalOperators) || stream.match(anotherOperators)) {\n    return "operator";\n  }\n\n  // Parens and braces\n  if (matched = stream.match(/[({[]/, false)) {\n    matched = matched[0];\n    return chain(tokenNest(matched, matching[matched], null), stream, state);\n  }\n\n  // Escapes\n  if (stream.eat("\\\\")) {\n    stream.next();\n    return "meta";\n  }\n\n  stream.next();\n  return null;\n}\n\nfunction tokenNest(begin, end, style, started) {\n  return function (stream, state) {\n    if (!started && stream.match(begin)) {\n      state.tokenize[state.tokenize.length - 1] = tokenNest(begin, end, style, true);\n      state.currentIndent += 1;\n      return style;\n    }\n\n    var nextStyle = tokenBase(stream, state);\n    if (stream.current() === end) {\n      state.tokenize.pop();\n      state.currentIndent -= 1;\n      nextStyle = style;\n    }\n\n    return nextStyle;\n  };\n}\n\nfunction tokenMacro(begin, end, started) {\n  return function (stream, state) {\n    if (!started && stream.match("{" + begin)) {\n      state.currentIndent += 1;\n      state.tokenize[state.tokenize.length - 1] = tokenMacro(begin, end, true);\n      return "meta";\n    }\n\n    if (stream.match(end + "}")) {\n      state.currentIndent -= 1;\n      state.tokenize.pop();\n      return "meta";\n    }\n\n    return tokenBase(stream, state);\n  };\n}\n\nfunction tokenMacroDef(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  var matched;\n  if (matched = stream.match(idents)) {\n    if (matched == "def") {\n      return "keyword";\n    }\n    stream.eat(/[?!]/);\n  }\n\n  state.tokenize.pop();\n  return "def";\n}\n\nfunction tokenFollowIdent(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  if (stream.match(idents)) {\n    stream.eat(/[!?]/);\n  } else {\n    stream.match(operators) || stream.match(conditionalOperators) || stream.match(indexingOperators);\n  }\n  state.tokenize.pop();\n  return "def";\n}\n\nfunction tokenFollowType(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  stream.match(types);\n  state.tokenize.pop();\n  return "def";\n}\n\nfunction tokenQuote(end, style, embed) {\n  return function (stream, state) {\n    var escaped = false;\n\n    while (stream.peek()) {\n      if (!escaped) {\n        if (stream.match("{%", false)) {\n          state.tokenize.push(tokenMacro("%", "%"));\n          return style;\n        }\n\n        if (stream.match("{{", false)) {\n          state.tokenize.push(tokenMacro("{", "}"));\n          return style;\n        }\n\n        if (embed && stream.match("#{", false)) {\n          state.tokenize.push(tokenNest("#{", "}", "meta"));\n          return style;\n        }\n\n        var ch = stream.next();\n\n        if (ch == end) {\n          state.tokenize.pop();\n          return style;\n        }\n\n        escaped = embed && ch == "\\\\";\n      } else {\n        stream.next();\n        escaped = false;\n      }\n    }\n\n    return style;\n  };\n}\n\nfunction tokenHereDoc(phrase, embed) {\n  return function (stream, state) {\n    if (stream.sol()) {\n      stream.eatSpace()\n      if (stream.match(phrase)) {\n        state.tokenize.pop();\n        return "string";\n      }\n    }\n\n    var escaped = false;\n    while (stream.peek()) {\n      if (!escaped) {\n        if (stream.match("{%", false)) {\n          state.tokenize.push(tokenMacro("%", "%"));\n          return "string";\n        }\n\n        if (stream.match("{{", false)) {\n          state.tokenize.push(tokenMacro("{", "}"));\n          return "string";\n        }\n\n        if (embed && stream.match("#{", false)) {\n          state.tokenize.push(tokenNest("#{", "}", "meta"));\n          return "string";\n        }\n\n        escaped = embed && stream.next() == "\\\\";\n      } else {\n        stream.next();\n        escaped = false;\n      }\n    }\n\n    return "string";\n  }\n}\n\nconst crystal = {\n  startState: function () {\n    return {\n      tokenize: [tokenBase],\n      currentIndent: 0,\n      lastToken: null,\n      lastStyle: null,\n      blocks: []\n    };\n  },\n\n  token: function (stream, state) {\n    var style = state.tokenize[state.tokenize.length - 1](stream, state);\n    var token = stream.current();\n\n    if (style && style != "comment") {\n      state.lastToken = token;\n      state.lastStyle = style;\n    }\n\n    return style;\n  },\n\n  indent: function (state, textAfter, cx) {\n    textAfter = textAfter.replace(/^\\s*(?:\\{%)?\\s*|\\s*(?:%\\})?\\s*$/g, "");\n\n    if (dedentKeywords.test(textAfter) || dedentPunctuals.test(textAfter)) {\n      return cx.unit * (state.currentIndent - 1);\n    }\n\n    return cx.unit * state.currentIndent;\n  },\n\n  languageData: {\n    indentOnInput: wordRegExp(dedentPunctualsArray.concat(dedentKeywordsArray), true),\n    commentTokens: {line: "#"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvY3J5c3RhbC5qcz82MjI3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLEVBQUU7QUFDNUMsNERBQTRELEVBQUU7QUFDOUQ7QUFDQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVksS0FBSzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTs7QUFFQSxpREFBaUQ7QUFDakQsOEJBQThCLEtBQUs7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxFQUFFLGlCQUFpQixFQUFFLEdBQUcsWUFBWSxJQUFJLEVBQUU7QUFDN0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QiwyQ0FBMkMsS0FBSztBQUNoRDtBQUNBOztBQUVBLHFDQUFxQztBQUNyQywyQ0FBMkMsS0FBSztBQUNoRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUIsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckMsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0EsNENBQTRDLGdCQUFnQjs7QUFFNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EiLCJmaWxlIjoiMzY5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gd29yZFJlZ0V4cCh3b3JkcywgZW5kKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKChlbmQgPyBcIlwiIDogXCJeXCIpICsgXCIoPzpcIiArIHdvcmRzLmpvaW4oXCJ8XCIpICsgXCIpXCIgKyAoZW5kID8gXCIkXCIgOiBcIlxcXFxiXCIpKTtcbn1cblxuZnVuY3Rpb24gY2hhaW4odG9rZW5pemUsIHN0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlbml6ZSk7XG4gIHJldHVybiB0b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcbn1cblxudmFyIG9wZXJhdG9ycyA9IC9eKD86Wy0rLyV8Jl5dfFxcKlxcKj98Wzw+XXsyfSkvO1xudmFyIGNvbmRpdGlvbmFsT3BlcmF0b3JzID0gL14oPzpbPSFdfnw9PT18PD0+fFs8Pj0hXT0/fFt8Jl17Mn18fikvO1xudmFyIGluZGV4aW5nT3BlcmF0b3JzID0gL14oPzpcXFtcXF1bPz1dPykvO1xudmFyIGFub3RoZXJPcGVyYXRvcnMgPSAvXig/OlxcLig/OlxcLnsyfSk/fC0+fFs/Ol0pLztcbnZhciBpZGVudHMgPSAvXlthLXpfXFx1MDA5Ri1cXHVGRkZGXVthLXpBLVowLTlfXFx1MDA5Ri1cXHVGRkZGXSovO1xudmFyIHR5cGVzID0gL15bQS1aX1xcdTAwOUYtXFx1RkZGRl1bYS16QS1aMC05X1xcdTAwOUYtXFx1RkZGRl0qLztcbnZhciBrZXl3b3JkcyA9IHdvcmRSZWdFeHAoW1xuICBcImFic3RyYWN0XCIsIFwiYWxpYXNcIiwgXCJhc1wiLCBcImFzbVwiLCBcImJlZ2luXCIsIFwiYnJlYWtcIiwgXCJjYXNlXCIsIFwiY2xhc3NcIiwgXCJkZWZcIiwgXCJkb1wiLFxuICBcImVsc2VcIiwgXCJlbHNpZlwiLCBcImVuZFwiLCBcImVuc3VyZVwiLCBcImVudW1cIiwgXCJleHRlbmRcIiwgXCJmb3JcIiwgXCJmdW5cIiwgXCJpZlwiLFxuICBcImluY2x1ZGVcIiwgXCJpbnN0YW5jZV9zaXplb2ZcIiwgXCJsaWJcIiwgXCJtYWNyb1wiLCBcIm1vZHVsZVwiLCBcIm5leHRcIiwgXCJvZlwiLCBcIm91dFwiLCBcInBvaW50ZXJvZlwiLFxuICBcInByaXZhdGVcIiwgXCJwcm90ZWN0ZWRcIiwgXCJyZXNjdWVcIiwgXCJyZXR1cm5cIiwgXCJyZXF1aXJlXCIsIFwic2VsZWN0XCIsIFwic2l6ZW9mXCIsIFwic3RydWN0XCIsXG4gIFwic3VwZXJcIiwgXCJ0aGVuXCIsIFwidHlwZVwiLCBcInR5cGVvZlwiLCBcInVuaW5pdGlhbGl6ZWRcIiwgXCJ1bmlvblwiLCBcInVubGVzc1wiLCBcInVudGlsXCIsIFwid2hlblwiLCBcIndoaWxlXCIsIFwid2l0aFwiLFxuICBcInlpZWxkXCIsIFwiX19ESVJfX1wiLCBcIl9fRU5EX0xJTkVfX1wiLCBcIl9fRklMRV9fXCIsIFwiX19MSU5FX19cIlxuXSk7XG52YXIgYXRvbVdvcmRzID0gd29yZFJlZ0V4cChbXCJ0cnVlXCIsIFwiZmFsc2VcIiwgXCJuaWxcIiwgXCJzZWxmXCJdKTtcbnZhciBpbmRlbnRLZXl3b3Jkc0FycmF5ID0gW1xuICBcImRlZlwiLCBcImZ1blwiLCBcIm1hY3JvXCIsXG4gIFwiY2xhc3NcIiwgXCJtb2R1bGVcIiwgXCJzdHJ1Y3RcIiwgXCJsaWJcIiwgXCJlbnVtXCIsIFwidW5pb25cIixcbiAgXCJkb1wiLCBcImZvclwiXG5dO1xudmFyIGluZGVudEtleXdvcmRzID0gd29yZFJlZ0V4cChpbmRlbnRLZXl3b3Jkc0FycmF5KTtcbnZhciBpbmRlbnRFeHByZXNzaW9uS2V5d29yZHNBcnJheSA9IFtcImlmXCIsIFwidW5sZXNzXCIsIFwiY2FzZVwiLCBcIndoaWxlXCIsIFwidW50aWxcIiwgXCJiZWdpblwiLCBcInRoZW5cIl07XG52YXIgaW5kZW50RXhwcmVzc2lvbktleXdvcmRzID0gd29yZFJlZ0V4cChpbmRlbnRFeHByZXNzaW9uS2V5d29yZHNBcnJheSk7XG52YXIgZGVkZW50S2V5d29yZHNBcnJheSA9IFtcImVuZFwiLCBcImVsc2VcIiwgXCJlbHNpZlwiLCBcInJlc2N1ZVwiLCBcImVuc3VyZVwiXTtcbnZhciBkZWRlbnRLZXl3b3JkcyA9IHdvcmRSZWdFeHAoZGVkZW50S2V5d29yZHNBcnJheSk7XG52YXIgZGVkZW50UHVuY3R1YWxzQXJyYXkgPSBbXCJcXFxcKVwiLCBcIlxcXFx9XCIsIFwiXFxcXF1cIl07XG52YXIgZGVkZW50UHVuY3R1YWxzID0gbmV3IFJlZ0V4cChcIl4oPzpcIiArIGRlZGVudFB1bmN0dWFsc0FycmF5LmpvaW4oXCJ8XCIpICsgXCIpJFwiKTtcbnZhciBuZXh0VG9rZW5pemVyID0ge1xuICBcImRlZlwiOiB0b2tlbkZvbGxvd0lkZW50LCBcImZ1blwiOiB0b2tlbkZvbGxvd0lkZW50LCBcIm1hY3JvXCI6IHRva2VuTWFjcm9EZWYsXG4gIFwiY2xhc3NcIjogdG9rZW5Gb2xsb3dUeXBlLCBcIm1vZHVsZVwiOiB0b2tlbkZvbGxvd1R5cGUsIFwic3RydWN0XCI6IHRva2VuRm9sbG93VHlwZSxcbiAgXCJsaWJcIjogdG9rZW5Gb2xsb3dUeXBlLCBcImVudW1cIjogdG9rZW5Gb2xsb3dUeXBlLCBcInVuaW9uXCI6IHRva2VuRm9sbG93VHlwZVxufTtcbnZhciBtYXRjaGluZyA9IHtcIltcIjogXCJdXCIsIFwie1wiOiBcIn1cIiwgXCIoXCI6IFwiKVwiLCBcIjxcIjogXCI+XCJ9O1xuXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIE1hY3Jvc1xuICBpZiAoc3RhdGUubGFzdFRva2VuICE9IFwiXFxcXFwiICYmIHN0cmVhbS5tYXRjaChcInslXCIsIGZhbHNlKSkge1xuICAgIHJldHVybiBjaGFpbih0b2tlbk1hY3JvKFwiJVwiLCBcIiVcIiksIHN0cmVhbSwgc3RhdGUpO1xuICB9XG5cbiAgaWYgKHN0YXRlLmxhc3RUb2tlbiAhPSBcIlxcXFxcIiAmJiBzdHJlYW0ubWF0Y2goXCJ7e1wiLCBmYWxzZSkpIHtcbiAgICByZXR1cm4gY2hhaW4odG9rZW5NYWNybyhcIntcIiwgXCJ9XCIpLCBzdHJlYW0sIHN0YXRlKTtcbiAgfVxuXG4gIC8vIENvbW1lbnRzXG4gIGlmIChzdHJlYW0ucGVlaygpID09IFwiI1wiKSB7XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfVxuXG4gIC8vIFZhcmlhYmxlcyBhbmQga2V5d29yZHNcbiAgdmFyIG1hdGNoZWQ7XG4gIGlmIChzdHJlYW0ubWF0Y2goaWRlbnRzKSkge1xuICAgIHN0cmVhbS5lYXQoL1s/IV0vKTtcblxuICAgIG1hdGNoZWQgPSBzdHJlYW0uY3VycmVudCgpO1xuICAgIGlmIChzdHJlYW0uZWF0KFwiOlwiKSkge1xuICAgICAgcmV0dXJuIFwiYXRvbVwiO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGFzdFRva2VuID09IFwiLlwiKSB7XG4gICAgICByZXR1cm4gXCJwcm9wZXJ0eVwiO1xuICAgIH0gZWxzZSBpZiAoa2V5d29yZHMudGVzdChtYXRjaGVkKSkge1xuICAgICAgaWYgKGluZGVudEtleXdvcmRzLnRlc3QobWF0Y2hlZCkpIHtcbiAgICAgICAgaWYgKCEobWF0Y2hlZCA9PSBcImZ1blwiICYmIHN0YXRlLmJsb2Nrcy5pbmRleE9mKFwibGliXCIpID49IDApICYmICEobWF0Y2hlZCA9PSBcImRlZlwiICYmIHN0YXRlLmxhc3RUb2tlbiA9PSBcImFic3RyYWN0XCIpKSB7XG4gICAgICAgICAgc3RhdGUuYmxvY2tzLnB1c2gobWF0Y2hlZCk7XG4gICAgICAgICAgc3RhdGUuY3VycmVudEluZGVudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKChzdGF0ZS5sYXN0U3R5bGUgPT0gXCJvcGVyYXRvclwiIHx8ICFzdGF0ZS5sYXN0U3R5bGUpICYmIGluZGVudEV4cHJlc3Npb25LZXl3b3Jkcy50ZXN0KG1hdGNoZWQpKSB7XG4gICAgICAgIHN0YXRlLmJsb2Nrcy5wdXNoKG1hdGNoZWQpO1xuICAgICAgICBzdGF0ZS5jdXJyZW50SW5kZW50ICs9IDE7XG4gICAgICB9IGVsc2UgaWYgKG1hdGNoZWQgPT0gXCJlbmRcIikge1xuICAgICAgICBzdGF0ZS5ibG9ja3MucG9wKCk7XG4gICAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQgLT0gMTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRUb2tlbml6ZXIuaGFzT3duUHJvcGVydHkobWF0Y2hlZCkpIHtcbiAgICAgICAgc3RhdGUudG9rZW5pemUucHVzaChuZXh0VG9rZW5pemVyW21hdGNoZWRdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgIH0gZWxzZSBpZiAoYXRvbVdvcmRzLnRlc3QobWF0Y2hlZCkpIHtcbiAgICAgIHJldHVybiBcImF0b21cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJ2YXJpYWJsZVwiO1xuICB9XG5cbiAgLy8gQ2xhc3MgdmFyaWFibGVzIGFuZCBpbnN0YW5jZSB2YXJpYWJsZXNcbiAgLy8gb3IgYXR0cmlidXRlc1xuICBpZiAoc3RyZWFtLmVhdChcIkBcIikpIHtcbiAgICBpZiAoc3RyZWFtLnBlZWsoKSA9PSBcIltcIikge1xuICAgICAgcmV0dXJuIGNoYWluKHRva2VuTmVzdChcIltcIiwgXCJdXCIsIFwibWV0YVwiKSwgc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgc3RyZWFtLmVhdChcIkBcIik7XG4gICAgc3RyZWFtLm1hdGNoKGlkZW50cykgfHwgc3RyZWFtLm1hdGNoKHR5cGVzKTtcbiAgICByZXR1cm4gXCJwcm9wZXJ0eU5hbWVcIjtcbiAgfVxuXG4gIC8vIENvbnN0YW50cyBhbmQgdHlwZXNcbiAgaWYgKHN0cmVhbS5tYXRjaCh0eXBlcykpIHtcbiAgICByZXR1cm4gXCJ0YWdcIjtcbiAgfVxuXG4gIC8vIFN5bWJvbHMgb3IgJzonIG9wZXJhdG9yXG4gIGlmIChzdHJlYW0uZWF0KFwiOlwiKSkge1xuICAgIGlmIChzdHJlYW0uZWF0KFwiXFxcIlwiKSkge1xuICAgICAgcmV0dXJuIGNoYWluKHRva2VuUXVvdGUoXCJcXFwiXCIsIFwiYXRvbVwiLCBmYWxzZSksIHN0cmVhbSwgc3RhdGUpO1xuICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKGlkZW50cykgfHwgc3RyZWFtLm1hdGNoKHR5cGVzKSB8fFxuICAgICAgICAgICAgICAgc3RyZWFtLm1hdGNoKG9wZXJhdG9ycykgfHwgc3RyZWFtLm1hdGNoKGNvbmRpdGlvbmFsT3BlcmF0b3JzKSB8fCBzdHJlYW0ubWF0Y2goaW5kZXhpbmdPcGVyYXRvcnMpKSB7XG4gICAgICByZXR1cm4gXCJhdG9tXCI7XG4gICAgfVxuICAgIHN0cmVhbS5lYXQoXCI6XCIpO1xuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH1cblxuICAvLyBTdHJpbmdzXG4gIGlmIChzdHJlYW0uZWF0KFwiXFxcIlwiKSkge1xuICAgIHJldHVybiBjaGFpbih0b2tlblF1b3RlKFwiXFxcIlwiLCBcInN0cmluZ1wiLCB0cnVlKSwgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cblxuICAvLyBTdHJpbmdzIG9yIHJlZ2V4cHMgb3IgbWFjcm8gdmFyaWFibGVzIG9yICclJyBvcGVyYXRvclxuICBpZiAoc3RyZWFtLnBlZWsoKSA9PSBcIiVcIikge1xuICAgIHZhciBzdHlsZSA9IFwic3RyaW5nXCI7XG4gICAgdmFyIGVtYmVkID0gdHJ1ZTtcbiAgICB2YXIgZGVsaW07XG5cbiAgICBpZiAoc3RyZWFtLm1hdGNoKFwiJXJcIikpIHtcbiAgICAgIC8vIFJlZ2V4cHNcbiAgICAgIHN0eWxlID0gXCJzdHJpbmcuc3BlY2lhbFwiO1xuICAgICAgZGVsaW0gPSBzdHJlYW0ubmV4dCgpO1xuICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKFwiJXdcIikpIHtcbiAgICAgIGVtYmVkID0gZmFsc2U7XG4gICAgICBkZWxpbSA9IHN0cmVhbS5uZXh0KCk7XG4gICAgfSBlbHNlIGlmIChzdHJlYW0ubWF0Y2goXCIlcVwiKSkge1xuICAgICAgZW1iZWQgPSBmYWxzZTtcbiAgICAgIGRlbGltID0gc3RyZWFtLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoZGVsaW0gPSBzdHJlYW0ubWF0Y2goL14lKFteXFx3XFxzPV0pLykpIHtcbiAgICAgICAgZGVsaW0gPSBkZWxpbVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eJVthLXpBLVpfXFx1MDA5Ri1cXHVGRkZGXVtcXHdcXHUwMDlGLVxcdUZGRkZdKi8pKSB7XG4gICAgICAgIC8vIE1hY3JvIHZhcmlhYmxlc1xuICAgICAgICByZXR1cm4gXCJtZXRhXCI7XG4gICAgICB9IGVsc2UgaWYgKHN0cmVhbS5lYXQoJyUnKSkge1xuICAgICAgICAvLyAnJScgb3BlcmF0b3JcbiAgICAgICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWF0Y2hpbmcuaGFzT3duUHJvcGVydHkoZGVsaW0pKSB7XG4gICAgICBkZWxpbSA9IG1hdGNoaW5nW2RlbGltXTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYWluKHRva2VuUXVvdGUoZGVsaW0sIHN0eWxlLCBlbWJlZCksIHN0cmVhbSwgc3RhdGUpO1xuICB9XG5cbiAgLy8gSGVyZSBEb2NzXG4gIGlmIChtYXRjaGVkID0gc3RyZWFtLm1hdGNoKC9ePDwtKCc/KShbQS1aXVxcdyopXFwxLykpIHtcbiAgICByZXR1cm4gY2hhaW4odG9rZW5IZXJlRG9jKG1hdGNoZWRbMl0sICFtYXRjaGVkWzFdKSwgc3RyZWFtLCBzdGF0ZSlcbiAgfVxuXG4gIC8vIENoYXJhY3RlcnNcbiAgaWYgKHN0cmVhbS5lYXQoXCInXCIpKSB7XG4gICAgc3RyZWFtLm1hdGNoKC9eKD86W14nXXxcXFxcKD86W2JlZm5ydHYwJ1wiXXxbMC03XXszfXx1KD86WzAtOWEtZkEtRl17NH18XFx7WzAtOWEtZkEtRl17MSw2fVxcfSkpKS8pO1xuICAgIHN0cmVhbS5lYXQoXCInXCIpO1xuICAgIHJldHVybiBcImF0b21cIjtcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKHN0cmVhbS5lYXQoXCIwXCIpKSB7XG4gICAgaWYgKHN0cmVhbS5lYXQoXCJ4XCIpKSB7XG4gICAgICBzdHJlYW0ubWF0Y2goL15bMC05YS1mQS1GX10rLyk7XG4gICAgfSBlbHNlIGlmIChzdHJlYW0uZWF0KFwib1wiKSkge1xuICAgICAgc3RyZWFtLm1hdGNoKC9eWzAtN19dKy8pO1xuICAgIH0gZWxzZSBpZiAoc3RyZWFtLmVhdChcImJcIikpIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlswMV9dKy8pO1xuICAgIH1cbiAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgfVxuXG4gIGlmIChzdHJlYW0uZWF0KC9eXFxkLykpIHtcbiAgICBzdHJlYW0ubWF0Y2goL15bXFxkX10qKD86XFwuW1xcZF9dKyk/KD86W2VFXVsrLV0/XFxkKyk/Lyk7XG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gIH1cblxuICAvLyBPcGVyYXRvcnNcbiAgaWYgKHN0cmVhbS5tYXRjaChvcGVyYXRvcnMpKSB7XG4gICAgc3RyZWFtLmVhdChcIj1cIik7IC8vIE9wZXJhdG9ycyBjYW4gZm9sbG93IGFzc2lnbiBzeW1ib2wuXG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfVxuXG4gIGlmIChzdHJlYW0ubWF0Y2goY29uZGl0aW9uYWxPcGVyYXRvcnMpIHx8IHN0cmVhbS5tYXRjaChhbm90aGVyT3BlcmF0b3JzKSkge1xuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH1cblxuICAvLyBQYXJlbnMgYW5kIGJyYWNlc1xuICBpZiAobWF0Y2hlZCA9IHN0cmVhbS5tYXRjaCgvWyh7W10vLCBmYWxzZSkpIHtcbiAgICBtYXRjaGVkID0gbWF0Y2hlZFswXTtcbiAgICByZXR1cm4gY2hhaW4odG9rZW5OZXN0KG1hdGNoZWQsIG1hdGNoaW5nW21hdGNoZWRdLCBudWxsKSwgc3RyZWFtLCBzdGF0ZSk7XG4gIH1cblxuICAvLyBFc2NhcGVzXG4gIGlmIChzdHJlYW0uZWF0KFwiXFxcXFwiKSkge1xuICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgcmV0dXJuIFwibWV0YVwiO1xuICB9XG5cbiAgc3RyZWFtLm5leHQoKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHRva2VuTmVzdChiZWdpbiwgZW5kLCBzdHlsZSwgc3RhcnRlZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwgc3RhdGUpIHtcbiAgICBpZiAoIXN0YXJ0ZWQgJiYgc3RyZWFtLm1hdGNoKGJlZ2luKSkge1xuICAgICAgc3RhdGUudG9rZW5pemVbc3RhdGUudG9rZW5pemUubGVuZ3RoIC0gMV0gPSB0b2tlbk5lc3QoYmVnaW4sIGVuZCwgc3R5bGUsIHRydWUpO1xuICAgICAgc3RhdGUuY3VycmVudEluZGVudCArPSAxO1xuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuICAgIHZhciBuZXh0U3R5bGUgPSB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKHN0cmVhbS5jdXJyZW50KCkgPT09IGVuZCkge1xuICAgICAgc3RhdGUudG9rZW5pemUucG9wKCk7XG4gICAgICBzdGF0ZS5jdXJyZW50SW5kZW50IC09IDE7XG4gICAgICBuZXh0U3R5bGUgPSBzdHlsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFN0eWxlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2tlbk1hY3JvKGJlZ2luLCBlbmQsIHN0YXJ0ZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKCFzdGFydGVkICYmIHN0cmVhbS5tYXRjaChcIntcIiArIGJlZ2luKSkge1xuICAgICAgc3RhdGUuY3VycmVudEluZGVudCArPSAxO1xuICAgICAgc3RhdGUudG9rZW5pemVbc3RhdGUudG9rZW5pemUubGVuZ3RoIC0gMV0gPSB0b2tlbk1hY3JvKGJlZ2luLCBlbmQsIHRydWUpO1xuICAgICAgcmV0dXJuIFwibWV0YVwiO1xuICAgIH1cblxuICAgIGlmIChzdHJlYW0ubWF0Y2goZW5kICsgXCJ9XCIpKSB7XG4gICAgICBzdGF0ZS5jdXJyZW50SW5kZW50IC09IDE7XG4gICAgICBzdGF0ZS50b2tlbml6ZS5wb3AoKTtcbiAgICAgIHJldHVybiBcIm1ldGFcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2tlbk1hY3JvRGVmKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgbWF0Y2hlZDtcbiAgaWYgKG1hdGNoZWQgPSBzdHJlYW0ubWF0Y2goaWRlbnRzKSkge1xuICAgIGlmIChtYXRjaGVkID09IFwiZGVmXCIpIHtcbiAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICB9XG4gICAgc3RyZWFtLmVhdCgvWz8hXS8pO1xuICB9XG5cbiAgc3RhdGUudG9rZW5pemUucG9wKCk7XG4gIHJldHVybiBcImRlZlwiO1xufVxuXG5mdW5jdGlvbiB0b2tlbkZvbGxvd0lkZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoc3RyZWFtLm1hdGNoKGlkZW50cykpIHtcbiAgICBzdHJlYW0uZWF0KC9bIT9dLyk7XG4gIH0gZWxzZSB7XG4gICAgc3RyZWFtLm1hdGNoKG9wZXJhdG9ycykgfHwgc3RyZWFtLm1hdGNoKGNvbmRpdGlvbmFsT3BlcmF0b3JzKSB8fCBzdHJlYW0ubWF0Y2goaW5kZXhpbmdPcGVyYXRvcnMpO1xuICB9XG4gIHN0YXRlLnRva2VuaXplLnBvcCgpO1xuICByZXR1cm4gXCJkZWZcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5Gb2xsb3dUeXBlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdHJlYW0ubWF0Y2godHlwZXMpO1xuICBzdGF0ZS50b2tlbml6ZS5wb3AoKTtcbiAgcmV0dXJuIFwiZGVmXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuUXVvdGUoZW5kLCBzdHlsZSwgZW1iZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIGVzY2FwZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChzdHJlYW0ucGVlaygpKSB7XG4gICAgICBpZiAoIWVzY2FwZWQpIHtcbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChcInslXCIsIGZhbHNlKSkge1xuICAgICAgICAgIHN0YXRlLnRva2VuaXplLnB1c2godG9rZW5NYWNybyhcIiVcIiwgXCIlXCIpKTtcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKFwie3tcIiwgZmFsc2UpKSB7XG4gICAgICAgICAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlbk1hY3JvKFwie1wiLCBcIn1cIikpO1xuICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbWJlZCAmJiBzdHJlYW0ubWF0Y2goXCIje1wiLCBmYWxzZSkpIHtcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZS5wdXNoKHRva2VuTmVzdChcIiN7XCIsIFwifVwiLCBcIm1ldGFcIikpO1xuICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGNoID09IGVuZCkge1xuICAgICAgICAgIHN0YXRlLnRva2VuaXplLnBvcCgpO1xuICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVzY2FwZWQgPSBlbWJlZCAmJiBjaCA9PSBcIlxcXFxcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgIGVzY2FwZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRva2VuSGVyZURvYyhwaHJhc2UsIGVtYmVkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAgIHN0cmVhbS5lYXRTcGFjZSgpXG4gICAgICBpZiAoc3RyZWFtLm1hdGNoKHBocmFzZSkpIHtcbiAgICAgICAgc3RhdGUudG9rZW5pemUucG9wKCk7XG4gICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlc2NhcGVkID0gZmFsc2U7XG4gICAgd2hpbGUgKHN0cmVhbS5wZWVrKCkpIHtcbiAgICAgIGlmICghZXNjYXBlZCkge1xuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKFwieyVcIiwgZmFsc2UpKSB7XG4gICAgICAgICAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlbk1hY3JvKFwiJVwiLCBcIiVcIikpO1xuICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChcInt7XCIsIGZhbHNlKSkge1xuICAgICAgICAgIHN0YXRlLnRva2VuaXplLnB1c2godG9rZW5NYWNybyhcIntcIiwgXCJ9XCIpKTtcbiAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbWJlZCAmJiBzdHJlYW0ubWF0Y2goXCIje1wiLCBmYWxzZSkpIHtcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZS5wdXNoKHRva2VuTmVzdChcIiN7XCIsIFwifVwiLCBcIm1ldGFcIikpO1xuICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgZXNjYXBlZCA9IGVtYmVkICYmIHN0cmVhbS5uZXh0KCkgPT0gXCJcXFxcXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyeXN0YWwgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5pemU6IFt0b2tlbkJhc2VdLFxuICAgICAgY3VycmVudEluZGVudDogMCxcbiAgICAgIGxhc3RUb2tlbjogbnVsbCxcbiAgICAgIGxhc3RTdHlsZTogbnVsbCxcbiAgICAgIGJsb2NrczogW11cbiAgICB9O1xuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnRva2VuaXplW3N0YXRlLnRva2VuaXplLmxlbmd0aCAtIDFdKHN0cmVhbSwgc3RhdGUpO1xuICAgIHZhciB0b2tlbiA9IHN0cmVhbS5jdXJyZW50KCk7XG5cbiAgICBpZiAoc3R5bGUgJiYgc3R5bGUgIT0gXCJjb21tZW50XCIpIHtcbiAgICAgIHN0YXRlLmxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgc3RhdGUubGFzdFN0eWxlID0gc3R5bGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuXG4gIGluZGVudDogZnVuY3Rpb24gKHN0YXRlLCB0ZXh0QWZ0ZXIsIGN4KSB7XG4gICAgdGV4dEFmdGVyID0gdGV4dEFmdGVyLnJlcGxhY2UoL15cXHMqKD86XFx7JSk/XFxzKnxcXHMqKD86JVxcfSk/XFxzKiQvZywgXCJcIik7XG5cbiAgICBpZiAoZGVkZW50S2V5d29yZHMudGVzdCh0ZXh0QWZ0ZXIpIHx8IGRlZGVudFB1bmN0dWFscy50ZXN0KHRleHRBZnRlcikpIHtcbiAgICAgIHJldHVybiBjeC51bml0ICogKHN0YXRlLmN1cnJlbnRJbmRlbnQgLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3gudW5pdCAqIHN0YXRlLmN1cnJlbnRJbmRlbnQ7XG4gIH0sXG5cbiAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgaW5kZW50T25JbnB1dDogd29yZFJlZ0V4cChkZWRlbnRQdW5jdHVhbHNBcnJheS5jb25jYXQoZGVkZW50S2V5d29yZHNBcnJheSksIHRydWUpLFxuICAgIGNvbW1lbnRUb2tlbnM6IHtsaW5lOiBcIiNcIn1cbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///369\n')}}]);