(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{364:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coffeeScript", function() { return coffeeScript; });\nvar ERRORCLASS = "error";\n\nfunction wordRegexp(words) {\n  return new RegExp("^((" + words.join(")|(") + "))\\\\b");\n}\n\nvar operators = /^(?:->|=>|\\+[+=]?|-[\\-=]?|\\*[\\*=]?|\\/[\\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\\|=?|\\^=?|\\~|!|\\?|(or|and|\\|\\||&&|\\?)=)/;\nvar delimiters = /^(?:[()\\[\\]{},:`=;]|\\.\\.?\\.?)/;\nvar identifiers = /^[_A-Za-z$][_A-Za-z$0-9]*/;\nvar atProp = /^@[_A-Za-z$][_A-Za-z$0-9]*/;\n\nvar wordOperators = wordRegexp(["and", "or", "not",\n                                "is", "isnt", "in",\n                                "instanceof", "typeof"]);\nvar indentKeywords = ["for", "while", "loop", "if", "unless", "else",\n                      "switch", "try", "catch", "finally", "class"];\nvar commonKeywords = ["break", "by", "continue", "debugger", "delete",\n                      "do", "in", "of", "new", "return", "then",\n                      "this", "@", "throw", "when", "until", "extends"];\n\nvar keywords = wordRegexp(indentKeywords.concat(commonKeywords));\n\nindentKeywords = wordRegexp(indentKeywords);\n\n\nvar stringPrefixes = /^(\'{3}|\\"{3}|[\'\\"])/;\nvar regexPrefixes = /^(\\/{3}|\\/)/;\nvar commonConstants = ["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no"];\nvar constants = wordRegexp(commonConstants);\n\n// Tokenizers\nfunction tokenBase(stream, state) {\n  // Handle scope changes\n  if (stream.sol()) {\n    if (state.scope.align === null) state.scope.align = false;\n    var scopeOffset = state.scope.offset;\n    if (stream.eatSpace()) {\n      var lineOffset = stream.indentation();\n      if (lineOffset > scopeOffset && state.scope.type == "coffee") {\n        return "indent";\n      } else if (lineOffset < scopeOffset) {\n        return "dedent";\n      }\n      return null;\n    } else {\n      if (scopeOffset > 0) {\n        dedent(stream, state);\n      }\n    }\n  }\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  var ch = stream.peek();\n\n  // Handle docco title comment (single line)\n  if (stream.match("####")) {\n    stream.skipToEnd();\n    return "comment";\n  }\n\n  // Handle multi line comments\n  if (stream.match("###")) {\n    state.tokenize = longComment;\n    return state.tokenize(stream, state);\n  }\n\n  // Single line comment\n  if (ch === "#") {\n    stream.skipToEnd();\n    return "comment";\n  }\n\n  // Handle number literals\n  if (stream.match(/^-?[0-9\\.]/, false)) {\n    var floatLiteral = false;\n    // Floats\n    if (stream.match(/^-?\\d*\\.\\d+(e[\\+\\-]?\\d+)?/i)) {\n      floatLiteral = true;\n    }\n    if (stream.match(/^-?\\d+\\.\\d*/)) {\n      floatLiteral = true;\n    }\n    if (stream.match(/^-?\\.\\d+/)) {\n      floatLiteral = true;\n    }\n\n    if (floatLiteral) {\n      // prevent from getting extra . on 1..\n      if (stream.peek() == "."){\n        stream.backUp(1);\n      }\n      return "number";\n    }\n    // Integers\n    var intLiteral = false;\n    // Hex\n    if (stream.match(/^-?0x[0-9a-f]+/i)) {\n      intLiteral = true;\n    }\n    // Decimal\n    if (stream.match(/^-?[1-9]\\d*(e[\\+\\-]?\\d+)?/)) {\n      intLiteral = true;\n    }\n    // Zero by itself with no other piece of number.\n    if (stream.match(/^-?0(?![\\dx])/i)) {\n      intLiteral = true;\n    }\n    if (intLiteral) {\n      return "number";\n    }\n  }\n\n  // Handle strings\n  if (stream.match(stringPrefixes)) {\n    state.tokenize = tokenFactory(stream.current(), false, "string");\n    return state.tokenize(stream, state);\n  }\n  // Handle regex literals\n  if (stream.match(regexPrefixes)) {\n    if (stream.current() != "/" || stream.match(/^.*\\//, false)) { // prevent highlight of division\n      state.tokenize = tokenFactory(stream.current(), true, "string.special");\n      return state.tokenize(stream, state);\n    } else {\n      stream.backUp(1);\n    }\n  }\n\n\n\n  // Handle operators and delimiters\n  if (stream.match(operators) || stream.match(wordOperators)) {\n    return "operator";\n  }\n  if (stream.match(delimiters)) {\n    return "punctuation";\n  }\n\n  if (stream.match(constants)) {\n    return "atom";\n  }\n\n  if (stream.match(atProp) || state.prop && stream.match(identifiers)) {\n    return "property";\n  }\n\n  if (stream.match(keywords)) {\n    return "keyword";\n  }\n\n  if (stream.match(identifiers)) {\n    return "variable";\n  }\n\n  // Handle non-detected items\n  stream.next();\n  return ERRORCLASS;\n}\n\nfunction tokenFactory(delimiter, singleline, outclass) {\n  return function(stream, state) {\n    while (!stream.eol()) {\n      stream.eatWhile(/[^\'"\\/\\\\]/);\n      if (stream.eat("\\\\")) {\n        stream.next();\n        if (singleline && stream.eol()) {\n          return outclass;\n        }\n      } else if (stream.match(delimiter)) {\n        state.tokenize = tokenBase;\n        return outclass;\n      } else {\n        stream.eat(/[\'"\\/]/);\n      }\n    }\n    if (singleline) {\n      state.tokenize = tokenBase;\n    }\n    return outclass;\n  };\n}\n\nfunction longComment(stream, state) {\n  while (!stream.eol()) {\n    stream.eatWhile(/[^#]/);\n    if (stream.match("###")) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    stream.eatWhile("#");\n  }\n  return "comment";\n}\n\nfunction indent(stream, state, type = "coffee") {\n  var offset = 0, align = false, alignOffset = null;\n  for (var scope = state.scope; scope; scope = scope.prev) {\n    if (scope.type === "coffee" || scope.type == "}") {\n      offset = scope.offset + stream.indentUnit;\n      break;\n    }\n  }\n  if (type !== "coffee") {\n    align = null;\n    alignOffset = stream.column() + stream.current().length;\n  } else if (state.scope.align) {\n    state.scope.align = false;\n  }\n  state.scope = {\n    offset: offset,\n    type: type,\n    prev: state.scope,\n    align: align,\n    alignOffset: alignOffset\n  };\n}\n\nfunction dedent(stream, state) {\n  if (!state.scope.prev) return;\n  if (state.scope.type === "coffee") {\n    var _indent = stream.indentation();\n    var matched = false;\n    for (var scope = state.scope; scope; scope = scope.prev) {\n      if (_indent === scope.offset) {\n        matched = true;\n        break;\n      }\n    }\n    if (!matched) {\n      return true;\n    }\n    while (state.scope.prev && state.scope.offset !== _indent) {\n      state.scope = state.scope.prev;\n    }\n    return false;\n  } else {\n    state.scope = state.scope.prev;\n    return false;\n  }\n}\n\nfunction tokenLexer(stream, state) {\n  var style = state.tokenize(stream, state);\n  var current = stream.current();\n\n  // Handle scope changes.\n  if (current === "return") {\n    state.dedent = true;\n  }\n  if (((current === "->" || current === "=>") && stream.eol())\n      || style === "indent") {\n    indent(stream, state);\n  }\n  var delimiter_index = "[({".indexOf(current);\n  if (delimiter_index !== -1) {\n    indent(stream, state, "])}".slice(delimiter_index, delimiter_index+1));\n  }\n  if (indentKeywords.exec(current)){\n    indent(stream, state);\n  }\n  if (current == "then"){\n    dedent(stream, state);\n  }\n\n\n  if (style === "dedent") {\n    if (dedent(stream, state)) {\n      return ERRORCLASS;\n    }\n  }\n  delimiter_index = "])}".indexOf(current);\n  if (delimiter_index !== -1) {\n    while (state.scope.type == "coffee" && state.scope.prev)\n      state.scope = state.scope.prev;\n    if (state.scope.type == current)\n      state.scope = state.scope.prev;\n  }\n  if (state.dedent && stream.eol()) {\n    if (state.scope.type == "coffee" && state.scope.prev)\n      state.scope = state.scope.prev;\n    state.dedent = false;\n  }\n\n  return style == "indent" || style == "dedent" ? null : style;\n}\n\nconst coffeeScript = {\n  startState: function() {\n    return {\n      tokenize: tokenBase,\n      scope: {offset: 0, type:"coffee", prev: null, align: false},\n      prop: false,\n      dedent: 0\n    };\n  },\n\n  token: function(stream, state) {\n    var fillAlign = state.scope.align === null && state.scope;\n    if (fillAlign && stream.sol()) fillAlign.align = false;\n\n    var style = tokenLexer(stream, state);\n    if (style && style != "comment") {\n      if (fillAlign) fillAlign.align = true;\n      state.prop = style == "punctuation" && stream.current() == "."\n    }\n\n    return style;\n  },\n\n  indent: function(state, text) {\n    if (state.tokenize != tokenBase) return 0;\n    var scope = state.scope;\n    var closer = text && "])}".indexOf(text.charAt(0)) > -1;\n    if (closer) while (scope.type == "coffee" && scope.prev) scope = scope.prev;\n    var closes = closer && scope.type === text.charAt(0);\n    if (scope.align)\n      return scope.alignOffset - (closes ? 1 : 0);\n    else\n      return (closes ? scope.prev : scope).offset;\n  },\n\n  languageData: {\n    commentTokens: {line: "#"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvY29mZmVlc2NyaXB0LmpzPzlhOTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0EsMEJBQTBCLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLDBCQUEwQixFQUFFO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLE9BQU87QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbURBQW1EO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EiLCJmaWxlIjoiMzY0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEVSUk9SQ0xBU1MgPSBcImVycm9yXCI7XG5cbmZ1bmN0aW9uIHdvcmRSZWdleHAod29yZHMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKChcIiArIHdvcmRzLmpvaW4oXCIpfChcIikgKyBcIikpXFxcXGJcIik7XG59XG5cbnZhciBvcGVyYXRvcnMgPSAvXig/Oi0+fD0+fFxcK1srPV0/fC1bXFwtPV0/fFxcKltcXCo9XT98XFwvW1xcLz1dP3xbPSFdPXw8Wz48XT89P3w+Pj89P3wlPT98Jj0/fFxcfD0/fFxcXj0/fFxcfnwhfFxcP3wob3J8YW5kfFxcfFxcfHwmJnxcXD8pPSkvO1xudmFyIGRlbGltaXRlcnMgPSAvXig/OlsoKVxcW1xcXXt9LDpgPTtdfFxcLlxcLj9cXC4/KS87XG52YXIgaWRlbnRpZmllcnMgPSAvXltfQS1aYS16JF1bX0EtWmEteiQwLTldKi87XG52YXIgYXRQcm9wID0gL15AW19BLVphLXokXVtfQS1aYS16JDAtOV0qLztcblxudmFyIHdvcmRPcGVyYXRvcnMgPSB3b3JkUmVnZXhwKFtcImFuZFwiLCBcIm9yXCIsIFwibm90XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNcIiwgXCJpc250XCIsIFwiaW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZW9mXCIsIFwidHlwZW9mXCJdKTtcbnZhciBpbmRlbnRLZXl3b3JkcyA9IFtcImZvclwiLCBcIndoaWxlXCIsIFwibG9vcFwiLCBcImlmXCIsIFwidW5sZXNzXCIsIFwiZWxzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3dpdGNoXCIsIFwidHJ5XCIsIFwiY2F0Y2hcIiwgXCJmaW5hbGx5XCIsIFwiY2xhc3NcIl07XG52YXIgY29tbW9uS2V5d29yZHMgPSBbXCJicmVha1wiLCBcImJ5XCIsIFwiY29udGludWVcIiwgXCJkZWJ1Z2dlclwiLCBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZG9cIiwgXCJpblwiLCBcIm9mXCIsIFwibmV3XCIsIFwicmV0dXJuXCIsIFwidGhlblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwidGhpc1wiLCBcIkBcIiwgXCJ0aHJvd1wiLCBcIndoZW5cIiwgXCJ1bnRpbFwiLCBcImV4dGVuZHNcIl07XG5cbnZhciBrZXl3b3JkcyA9IHdvcmRSZWdleHAoaW5kZW50S2V5d29yZHMuY29uY2F0KGNvbW1vbktleXdvcmRzKSk7XG5cbmluZGVudEtleXdvcmRzID0gd29yZFJlZ2V4cChpbmRlbnRLZXl3b3Jkcyk7XG5cblxudmFyIHN0cmluZ1ByZWZpeGVzID0gL14oJ3szfXxcXFwiezN9fFsnXFxcIl0pLztcbnZhciByZWdleFByZWZpeGVzID0gL14oXFwvezN9fFxcLykvO1xudmFyIGNvbW1vbkNvbnN0YW50cyA9IFtcIkluZmluaXR5XCIsIFwiTmFOXCIsIFwidW5kZWZpbmVkXCIsIFwibnVsbFwiLCBcInRydWVcIiwgXCJmYWxzZVwiLCBcIm9uXCIsIFwib2ZmXCIsIFwieWVzXCIsIFwibm9cIl07XG52YXIgY29uc3RhbnRzID0gd29yZFJlZ2V4cChjb21tb25Db25zdGFudHMpO1xuXG4vLyBUb2tlbml6ZXJzXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICAvLyBIYW5kbGUgc2NvcGUgY2hhbmdlc1xuICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgaWYgKHN0YXRlLnNjb3BlLmFsaWduID09PSBudWxsKSBzdGF0ZS5zY29wZS5hbGlnbiA9IGZhbHNlO1xuICAgIHZhciBzY29wZU9mZnNldCA9IHN0YXRlLnNjb3BlLm9mZnNldDtcbiAgICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHtcbiAgICAgIHZhciBsaW5lT2Zmc2V0ID0gc3RyZWFtLmluZGVudGF0aW9uKCk7XG4gICAgICBpZiAobGluZU9mZnNldCA+IHNjb3BlT2Zmc2V0ICYmIHN0YXRlLnNjb3BlLnR5cGUgPT0gXCJjb2ZmZWVcIikge1xuICAgICAgICByZXR1cm4gXCJpbmRlbnRcIjtcbiAgICAgIH0gZWxzZSBpZiAobGluZU9mZnNldCA8IHNjb3BlT2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBcImRlZGVudFwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzY29wZU9mZnNldCA+IDApIHtcbiAgICAgICAgZGVkZW50KHN0cmVhbSwgc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBjaCA9IHN0cmVhbS5wZWVrKCk7XG5cbiAgLy8gSGFuZGxlIGRvY2NvIHRpdGxlIGNvbW1lbnQgKHNpbmdsZSBsaW5lKVxuICBpZiAoc3RyZWFtLm1hdGNoKFwiIyMjI1wiKSkge1xuICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gIH1cblxuICAvLyBIYW5kbGUgbXVsdGkgbGluZSBjb21tZW50c1xuICBpZiAoc3RyZWFtLm1hdGNoKFwiIyMjXCIpKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSBsb25nQ29tbWVudDtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cblxuICAvLyBTaW5nbGUgbGluZSBjb21tZW50XG4gIGlmIChjaCA9PT0gXCIjXCIpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICB9XG5cbiAgLy8gSGFuZGxlIG51bWJlciBsaXRlcmFsc1xuICBpZiAoc3RyZWFtLm1hdGNoKC9eLT9bMC05XFwuXS8sIGZhbHNlKSkge1xuICAgIHZhciBmbG9hdExpdGVyYWwgPSBmYWxzZTtcbiAgICAvLyBGbG9hdHNcbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eLT9cXGQqXFwuXFxkKyhlW1xcK1xcLV0/XFxkKyk/L2kpKSB7XG4gICAgICBmbG9hdExpdGVyYWwgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eLT9cXGQrXFwuXFxkKi8pKSB7XG4gICAgICBmbG9hdExpdGVyYWwgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eLT9cXC5cXGQrLykpIHtcbiAgICAgIGZsb2F0TGl0ZXJhbCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGZsb2F0TGl0ZXJhbCkge1xuICAgICAgLy8gcHJldmVudCBmcm9tIGdldHRpbmcgZXh0cmEgLiBvbiAxLi5cbiAgICAgIGlmIChzdHJlYW0ucGVlaygpID09IFwiLlwiKXtcbiAgICAgICAgc3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBcIm51bWJlclwiO1xuICAgIH1cbiAgICAvLyBJbnRlZ2Vyc1xuICAgIHZhciBpbnRMaXRlcmFsID0gZmFsc2U7XG4gICAgLy8gSGV4XG4gICAgaWYgKHN0cmVhbS5tYXRjaCgvXi0/MHhbMC05YS1mXSsvaSkpIHtcbiAgICAgIGludExpdGVyYWwgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBEZWNpbWFsXG4gICAgaWYgKHN0cmVhbS5tYXRjaCgvXi0/WzEtOV1cXGQqKGVbXFwrXFwtXT9cXGQrKT8vKSkge1xuICAgICAgaW50TGl0ZXJhbCA9IHRydWU7XG4gICAgfVxuICAgIC8vIFplcm8gYnkgaXRzZWxmIHdpdGggbm8gb3RoZXIgcGllY2Ugb2YgbnVtYmVyLlxuICAgIGlmIChzdHJlYW0ubWF0Y2goL14tPzAoPyFbXFxkeF0pL2kpKSB7XG4gICAgICBpbnRMaXRlcmFsID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGludExpdGVyYWwpIHtcbiAgICAgIHJldHVybiBcIm51bWJlclwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhhbmRsZSBzdHJpbmdzXG4gIGlmIChzdHJlYW0ubWF0Y2goc3RyaW5nUHJlZml4ZXMpKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkZhY3Rvcnkoc3RyZWFtLmN1cnJlbnQoKSwgZmFsc2UsIFwic3RyaW5nXCIpO1xuICAgIHJldHVybiBzdGF0ZS50b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcbiAgfVxuICAvLyBIYW5kbGUgcmVnZXggbGl0ZXJhbHNcbiAgaWYgKHN0cmVhbS5tYXRjaChyZWdleFByZWZpeGVzKSkge1xuICAgIGlmIChzdHJlYW0uY3VycmVudCgpICE9IFwiL1wiIHx8IHN0cmVhbS5tYXRjaCgvXi4qXFwvLywgZmFsc2UpKSB7IC8vIHByZXZlbnQgaGlnaGxpZ2h0IG9mIGRpdmlzaW9uXG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuRmFjdG9yeShzdHJlYW0uY3VycmVudCgpLCB0cnVlLCBcInN0cmluZy5zcGVjaWFsXCIpO1xuICAgICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJlYW0uYmFja1VwKDEpO1xuICAgIH1cbiAgfVxuXG5cblxuICAvLyBIYW5kbGUgb3BlcmF0b3JzIGFuZCBkZWxpbWl0ZXJzXG4gIGlmIChzdHJlYW0ubWF0Y2gob3BlcmF0b3JzKSB8fCBzdHJlYW0ubWF0Y2god29yZE9wZXJhdG9ycykpIHtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9XG4gIGlmIChzdHJlYW0ubWF0Y2goZGVsaW1pdGVycykpIHtcbiAgICByZXR1cm4gXCJwdW5jdHVhdGlvblwiO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChjb25zdGFudHMpKSB7XG4gICAgcmV0dXJuIFwiYXRvbVwiO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChhdFByb3ApIHx8IHN0YXRlLnByb3AgJiYgc3RyZWFtLm1hdGNoKGlkZW50aWZpZXJzKSkge1xuICAgIHJldHVybiBcInByb3BlcnR5XCI7XG4gIH1cblxuICBpZiAoc3RyZWFtLm1hdGNoKGtleXdvcmRzKSkge1xuICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgfVxuXG4gIGlmIChzdHJlYW0ubWF0Y2goaWRlbnRpZmllcnMpKSB7XG4gICAgcmV0dXJuIFwidmFyaWFibGVcIjtcbiAgfVxuXG4gIC8vIEhhbmRsZSBub24tZGV0ZWN0ZWQgaXRlbXNcbiAgc3RyZWFtLm5leHQoKTtcbiAgcmV0dXJuIEVSUk9SQ0xBU1M7XG59XG5cbmZ1bmN0aW9uIHRva2VuRmFjdG9yeShkZWxpbWl0ZXIsIHNpbmdsZWxpbmUsIG91dGNsYXNzKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgIHN0cmVhbS5lYXRXaGlsZSgvW14nXCJcXC9cXFxcXS8pO1xuICAgICAgaWYgKHN0cmVhbS5lYXQoXCJcXFxcXCIpKSB7XG4gICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgIGlmIChzaW5nbGVsaW5lICYmIHN0cmVhbS5lb2woKSkge1xuICAgICAgICAgIHJldHVybiBvdXRjbGFzcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdHJlYW0ubWF0Y2goZGVsaW1pdGVyKSkge1xuICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgICAgcmV0dXJuIG91dGNsYXNzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyZWFtLmVhdCgvWydcIlxcL10vKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNpbmdsZWxpbmUpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgIH1cbiAgICByZXR1cm4gb3V0Y2xhc3M7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGxvbmdDb21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1teI10vKTtcbiAgICBpZiAoc3RyZWFtLm1hdGNoKFwiIyMjXCIpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzdHJlYW0uZWF0V2hpbGUoXCIjXCIpO1xuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cblxuZnVuY3Rpb24gaW5kZW50KHN0cmVhbSwgc3RhdGUsIHR5cGUgPSBcImNvZmZlZVwiKSB7XG4gIHZhciBvZmZzZXQgPSAwLCBhbGlnbiA9IGZhbHNlLCBhbGlnbk9mZnNldCA9IG51bGw7XG4gIGZvciAodmFyIHNjb3BlID0gc3RhdGUuc2NvcGU7IHNjb3BlOyBzY29wZSA9IHNjb3BlLnByZXYpIHtcbiAgICBpZiAoc2NvcGUudHlwZSA9PT0gXCJjb2ZmZWVcIiB8fCBzY29wZS50eXBlID09IFwifVwiKSB7XG4gICAgICBvZmZzZXQgPSBzY29wZS5vZmZzZXQgKyBzdHJlYW0uaW5kZW50VW5pdDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZSAhPT0gXCJjb2ZmZWVcIikge1xuICAgIGFsaWduID0gbnVsbDtcbiAgICBhbGlnbk9mZnNldCA9IHN0cmVhbS5jb2x1bW4oKSArIHN0cmVhbS5jdXJyZW50KCkubGVuZ3RoO1xuICB9IGVsc2UgaWYgKHN0YXRlLnNjb3BlLmFsaWduKSB7XG4gICAgc3RhdGUuc2NvcGUuYWxpZ24gPSBmYWxzZTtcbiAgfVxuICBzdGF0ZS5zY29wZSA9IHtcbiAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIHByZXY6IHN0YXRlLnNjb3BlLFxuICAgIGFsaWduOiBhbGlnbixcbiAgICBhbGlnbk9mZnNldDogYWxpZ25PZmZzZXRcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVkZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5zY29wZS5wcmV2KSByZXR1cm47XG4gIGlmIChzdGF0ZS5zY29wZS50eXBlID09PSBcImNvZmZlZVwiKSB7XG4gICAgdmFyIF9pbmRlbnQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICB2YXIgbWF0Y2hlZCA9IGZhbHNlO1xuICAgIGZvciAodmFyIHNjb3BlID0gc3RhdGUuc2NvcGU7IHNjb3BlOyBzY29wZSA9IHNjb3BlLnByZXYpIHtcbiAgICAgIGlmIChfaW5kZW50ID09PSBzY29wZS5vZmZzZXQpIHtcbiAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW1hdGNoZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB3aGlsZSAoc3RhdGUuc2NvcGUucHJldiAmJiBzdGF0ZS5zY29wZS5vZmZzZXQgIT09IF9pbmRlbnQpIHtcbiAgICAgIHN0YXRlLnNjb3BlID0gc3RhdGUuc2NvcGUucHJldjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLnNjb3BlID0gc3RhdGUuc2NvcGUucHJldjtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9rZW5MZXhlcihzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBzdHlsZSA9IHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB2YXIgY3VycmVudCA9IHN0cmVhbS5jdXJyZW50KCk7XG5cbiAgLy8gSGFuZGxlIHNjb3BlIGNoYW5nZXMuXG4gIGlmIChjdXJyZW50ID09PSBcInJldHVyblwiKSB7XG4gICAgc3RhdGUuZGVkZW50ID0gdHJ1ZTtcbiAgfVxuICBpZiAoKChjdXJyZW50ID09PSBcIi0+XCIgfHwgY3VycmVudCA9PT0gXCI9PlwiKSAmJiBzdHJlYW0uZW9sKCkpXG4gICAgICB8fCBzdHlsZSA9PT0gXCJpbmRlbnRcIikge1xuICAgIGluZGVudChzdHJlYW0sIHN0YXRlKTtcbiAgfVxuICB2YXIgZGVsaW1pdGVyX2luZGV4ID0gXCJbKHtcIi5pbmRleE9mKGN1cnJlbnQpO1xuICBpZiAoZGVsaW1pdGVyX2luZGV4ICE9PSAtMSkge1xuICAgIGluZGVudChzdHJlYW0sIHN0YXRlLCBcIl0pfVwiLnNsaWNlKGRlbGltaXRlcl9pbmRleCwgZGVsaW1pdGVyX2luZGV4KzEpKTtcbiAgfVxuICBpZiAoaW5kZW50S2V5d29yZHMuZXhlYyhjdXJyZW50KSl7XG4gICAgaW5kZW50KHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmIChjdXJyZW50ID09IFwidGhlblwiKXtcbiAgICBkZWRlbnQoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cblxuXG4gIGlmIChzdHlsZSA9PT0gXCJkZWRlbnRcIikge1xuICAgIGlmIChkZWRlbnQoc3RyZWFtLCBzdGF0ZSkpIHtcbiAgICAgIHJldHVybiBFUlJPUkNMQVNTO1xuICAgIH1cbiAgfVxuICBkZWxpbWl0ZXJfaW5kZXggPSBcIl0pfVwiLmluZGV4T2YoY3VycmVudCk7XG4gIGlmIChkZWxpbWl0ZXJfaW5kZXggIT09IC0xKSB7XG4gICAgd2hpbGUgKHN0YXRlLnNjb3BlLnR5cGUgPT0gXCJjb2ZmZWVcIiAmJiBzdGF0ZS5zY29wZS5wcmV2KVxuICAgICAgc3RhdGUuc2NvcGUgPSBzdGF0ZS5zY29wZS5wcmV2O1xuICAgIGlmIChzdGF0ZS5zY29wZS50eXBlID09IGN1cnJlbnQpXG4gICAgICBzdGF0ZS5zY29wZSA9IHN0YXRlLnNjb3BlLnByZXY7XG4gIH1cbiAgaWYgKHN0YXRlLmRlZGVudCAmJiBzdHJlYW0uZW9sKCkpIHtcbiAgICBpZiAoc3RhdGUuc2NvcGUudHlwZSA9PSBcImNvZmZlZVwiICYmIHN0YXRlLnNjb3BlLnByZXYpXG4gICAgICBzdGF0ZS5zY29wZSA9IHN0YXRlLnNjb3BlLnByZXY7XG4gICAgc3RhdGUuZGVkZW50ID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gc3R5bGUgPT0gXCJpbmRlbnRcIiB8fCBzdHlsZSA9PSBcImRlZGVudFwiID8gbnVsbCA6IHN0eWxlO1xufVxuXG5leHBvcnQgY29uc3QgY29mZmVlU2NyaXB0ID0ge1xuICBzdGFydFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5pemU6IHRva2VuQmFzZSxcbiAgICAgIHNjb3BlOiB7b2Zmc2V0OiAwLCB0eXBlOlwiY29mZmVlXCIsIHByZXY6IG51bGwsIGFsaWduOiBmYWxzZX0sXG4gICAgICBwcm9wOiBmYWxzZSxcbiAgICAgIGRlZGVudDogMFxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgZmlsbEFsaWduID0gc3RhdGUuc2NvcGUuYWxpZ24gPT09IG51bGwgJiYgc3RhdGUuc2NvcGU7XG4gICAgaWYgKGZpbGxBbGlnbiAmJiBzdHJlYW0uc29sKCkpIGZpbGxBbGlnbi5hbGlnbiA9IGZhbHNlO1xuXG4gICAgdmFyIHN0eWxlID0gdG9rZW5MZXhlcihzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3R5bGUgJiYgc3R5bGUgIT0gXCJjb21tZW50XCIpIHtcbiAgICAgIGlmIChmaWxsQWxpZ24pIGZpbGxBbGlnbi5hbGlnbiA9IHRydWU7XG4gICAgICBzdGF0ZS5wcm9wID0gc3R5bGUgPT0gXCJwdW5jdHVhdGlvblwiICYmIHN0cmVhbS5jdXJyZW50KCkgPT0gXCIuXCJcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dCkge1xuICAgIGlmIChzdGF0ZS50b2tlbml6ZSAhPSB0b2tlbkJhc2UpIHJldHVybiAwO1xuICAgIHZhciBzY29wZSA9IHN0YXRlLnNjb3BlO1xuICAgIHZhciBjbG9zZXIgPSB0ZXh0ICYmIFwiXSl9XCIuaW5kZXhPZih0ZXh0LmNoYXJBdCgwKSkgPiAtMTtcbiAgICBpZiAoY2xvc2VyKSB3aGlsZSAoc2NvcGUudHlwZSA9PSBcImNvZmZlZVwiICYmIHNjb3BlLnByZXYpIHNjb3BlID0gc2NvcGUucHJldjtcbiAgICB2YXIgY2xvc2VzID0gY2xvc2VyICYmIHNjb3BlLnR5cGUgPT09IHRleHQuY2hhckF0KDApO1xuICAgIGlmIChzY29wZS5hbGlnbilcbiAgICAgIHJldHVybiBzY29wZS5hbGlnbk9mZnNldCAtIChjbG9zZXMgPyAxIDogMCk7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIChjbG9zZXMgPyBzY29wZS5wcmV2IDogc2NvcGUpLm9mZnNldDtcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCIjXCJ9XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///364\n')}}]);