(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{438:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vb", function() { return vb; });\nvar ERRORCLASS = \'error\';\n\nfunction wordRegexp(words) {\n  return new RegExp("^((" + words.join(")|(") + "))\\\\b", "i");\n}\n\nvar singleOperators = new RegExp("^[\\\\+\\\\-\\\\*/%&\\\\\\\\|\\\\^~<>!]");\nvar singleDelimiters = new RegExp(\'^[\\\\(\\\\)\\\\[\\\\]\\\\{\\\\}@,:`=;\\\\.]\');\nvar doubleOperators = new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\\\*\\\\*))");\nvar doubleDelimiters = new RegExp("^((\\\\+=)|(\\\\-=)|(\\\\*=)|(%=)|(/=)|(&=)|(\\\\|=)|(\\\\^=))");\nvar tripleDelimiters = new RegExp("^((//=)|(>>=)|(<<=)|(\\\\*\\\\*=))");\nvar identifiers = new RegExp("^[_A-Za-z][_A-Za-z0-9]*");\n\nvar openingKeywords = [\'class\',\'module\', \'sub\',\'enum\',\'select\',\'while\',\'if\',\'function\', \'get\',\'set\',\'property\', \'try\', \'structure\', \'synclock\', \'using\', \'with\'];\nvar middleKeywords = [\'else\',\'elseif\',\'case\', \'catch\', \'finally\'];\nvar endKeywords = [\'next\',\'loop\'];\n\nvar operatorKeywords = [\'and\', "andalso", \'or\', \'orelse\', \'xor\', \'in\', \'not\', \'is\', \'isnot\', \'like\'];\nvar wordOperators = wordRegexp(operatorKeywords);\n\nvar commonKeywords = ["#const", "#else", "#elseif", "#end", "#if", "#region", "addhandler", "addressof", "alias", "as", "byref", "byval", "cbool", "cbyte", "cchar", "cdate", "cdbl", "cdec", "cint", "clng", "cobj", "compare", "const", "continue", "csbyte", "cshort", "csng", "cstr", "cuint", "culng", "cushort", "declare", "default", "delegate", "dim", "directcast", "each", "erase", "error", "event", "exit", "explicit", "false", "for", "friend", "gettype", "goto", "handles", "implements", "imports", "infer", "inherits", "interface", "isfalse", "istrue", "lib", "me", "mod", "mustinherit", "mustoverride", "my", "mybase", "myclass", "namespace", "narrowing", "new", "nothing", "notinheritable", "notoverridable", "of", "off", "on", "operator", "option", "optional", "out", "overloads", "overridable", "overrides", "paramarray", "partial", "private", "protected", "public", "raiseevent", "readonly", "redim", "removehandler", "resume", "return", "shadows", "shared", "static", "step", "stop", "strict", "then", "throw", "to", "true", "trycast", "typeof", "until", "until", "when", "widening", "withevents", "writeonly"];\n\nvar commontypes = [\'object\', \'boolean\', \'char\', \'string\', \'byte\', \'sbyte\', \'short\', \'ushort\', \'int16\', \'uint16\', \'integer\', \'uinteger\', \'int32\', \'uint32\', \'long\', \'ulong\', \'int64\', \'uint64\', \'decimal\', \'single\', \'double\', \'float\', \'date\', \'datetime\', \'intptr\', \'uintptr\'];\n\nvar keywords = wordRegexp(commonKeywords);\nvar types = wordRegexp(commontypes);\nvar stringPrefixes = \'"\';\n\nvar opening = wordRegexp(openingKeywords);\nvar middle = wordRegexp(middleKeywords);\nvar closing = wordRegexp(endKeywords);\nvar doubleClosing = wordRegexp([\'end\']);\nvar doOpening = wordRegexp([\'do\']);\n\nvar indentInfo = null;\n\nfunction indent(_stream, state) {\n  state.currentIndent++;\n}\n\nfunction dedent(_stream, state) {\n  state.currentIndent--;\n}\n// tokenizers\nfunction tokenBase(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  var ch = stream.peek();\n\n  // Handle Comments\n  if (ch === "\'") {\n    stream.skipToEnd();\n    return \'comment\';\n  }\n\n\n  // Handle Number Literals\n  if (stream.match(/^((&H)|(&O))?[0-9\\.a-f]/i, false)) {\n    var floatLiteral = false;\n    // Floats\n    if (stream.match(/^\\d*\\.\\d+F?/i)) { floatLiteral = true; }\n    else if (stream.match(/^\\d+\\.\\d*F?/)) { floatLiteral = true; }\n    else if (stream.match(/^\\.\\d+F?/)) { floatLiteral = true; }\n\n    if (floatLiteral) {\n      // Float literals may be "imaginary"\n      stream.eat(/J/i);\n      return \'number\';\n    }\n    // Integers\n    var intLiteral = false;\n    // Hex\n    if (stream.match(/^&H[0-9a-f]+/i)) { intLiteral = true; }\n    // Octal\n    else if (stream.match(/^&O[0-7]+/i)) { intLiteral = true; }\n    // Decimal\n    else if (stream.match(/^[1-9]\\d*F?/)) {\n      // Decimal literals may be "imaginary"\n      stream.eat(/J/i);\n      // TODO - Can you have imaginary longs?\n      intLiteral = true;\n    }\n    // Zero by itself with no other piece of number.\n    else if (stream.match(/^0(?![\\dx])/i)) { intLiteral = true; }\n    if (intLiteral) {\n      // Integer literals may be "long"\n      stream.eat(/L/i);\n      return \'number\';\n    }\n  }\n\n  // Handle Strings\n  if (stream.match(stringPrefixes)) {\n    state.tokenize = tokenStringFactory(stream.current());\n    return state.tokenize(stream, state);\n  }\n\n  // Handle operators and Delimiters\n  if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters)) {\n    return null;\n  }\n  if (stream.match(doubleOperators)\n      || stream.match(singleOperators)\n      || stream.match(wordOperators)) {\n    return \'operator\';\n  }\n  if (stream.match(singleDelimiters)) {\n    return null;\n  }\n  if (stream.match(doOpening)) {\n    indent(stream,state);\n    state.doInCurrentLine = true;\n    return \'keyword\';\n  }\n  if (stream.match(opening)) {\n    if (! state.doInCurrentLine)\n      indent(stream,state);\n    else\n      state.doInCurrentLine = false;\n    return \'keyword\';\n  }\n  if (stream.match(middle)) {\n    return \'keyword\';\n  }\n\n  if (stream.match(doubleClosing)) {\n    dedent(stream,state);\n    dedent(stream,state);\n    return \'keyword\';\n  }\n  if (stream.match(closing)) {\n    dedent(stream,state);\n    return \'keyword\';\n  }\n\n  if (stream.match(types)) {\n    return \'keyword\';\n  }\n\n  if (stream.match(keywords)) {\n    return \'keyword\';\n  }\n\n  if (stream.match(identifiers)) {\n    return \'variable\';\n  }\n\n  // Handle non-detected items\n  stream.next();\n  return ERRORCLASS;\n}\n\nfunction tokenStringFactory(delimiter) {\n  var singleline = delimiter.length == 1;\n  var OUTCLASS = \'string\';\n\n  return function(stream, state) {\n    while (!stream.eol()) {\n      stream.eatWhile(/[^\'"]/);\n      if (stream.match(delimiter)) {\n        state.tokenize = tokenBase;\n        return OUTCLASS;\n      } else {\n        stream.eat(/[\'"]/);\n      }\n    }\n    if (singleline) {\n      state.tokenize = tokenBase;\n    }\n    return OUTCLASS;\n  };\n}\n\n\nfunction tokenLexer(stream, state) {\n  var style = state.tokenize(stream, state);\n  var current = stream.current();\n\n  // Handle \'.\' connected identifiers\n  if (current === \'.\') {\n    style = state.tokenize(stream, state);\n    if (style === \'variable\') {\n      return \'variable\';\n    } else {\n      return ERRORCLASS;\n    }\n  }\n\n\n  var delimiter_index = \'[({\'.indexOf(current);\n  if (delimiter_index !== -1) {\n    indent(stream, state );\n  }\n  if (indentInfo === \'dedent\') {\n    if (dedent(stream, state)) {\n      return ERRORCLASS;\n    }\n  }\n  delimiter_index = \'])}\'.indexOf(current);\n  if (delimiter_index !== -1) {\n    if (dedent(stream, state)) {\n      return ERRORCLASS;\n    }\n  }\n\n  return style;\n}\n\nconst vb = {\n  startState: function() {\n    return {\n      tokenize: tokenBase,\n      lastToken: null,\n      currentIndent: 0,\n      nextLineIndent: 0,\n      doInCurrentLine: false\n\n\n    };\n  },\n\n  token: function(stream, state) {\n    if (stream.sol()) {\n      state.currentIndent += state.nextLineIndent;\n      state.nextLineIndent = 0;\n      state.doInCurrentLine = 0;\n    }\n    var style = tokenLexer(stream, state);\n\n    state.lastToken = {style:style, content: stream.current()};\n\n\n\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    var trueText = textAfter.replace(/^\\s+|\\s+$/g, \'\') ;\n    if (trueText.match(closing) || trueText.match(doubleClosing) || trueText.match(middle)) return cx.unit*(state.currentIndent-1);\n    if(state.currentIndent < 0) return 0;\n    return state.currentIndent * cx.unit;\n  },\n\n  languageData: {\n    closeBrackets: {brackets: ["(", "[", "{", \'"\']},\n    commentTokens: {line: "\'"},\n    autocomplete: openingKeywords.concat(middleKeywords).concat(endKeywords)\n      .concat(operatorKeywords).concat(commonKeywords).concat(commontypes)\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdmIuanM/ODg1NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9ELEdBQUcsTUFBTTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxQkFBcUI7QUFDNUQsMkNBQTJDLHFCQUFxQjtBQUNoRSx3Q0FBd0MscUJBQXFCOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG1CQUFtQjtBQUMzRDtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQkFBbUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qjs7OztBQUl2QjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxvQkFBb0IsdUJBQXVCLFFBQVE7QUFDbkQsb0JBQW9CLFVBQVU7QUFDOUI7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNDM4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEVSUk9SQ0xBU1MgPSAnZXJyb3InO1xuXG5mdW5jdGlvbiB3b3JkUmVnZXhwKHdvcmRzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFwiXigoXCIgKyB3b3Jkcy5qb2luKFwiKXwoXCIpICsgXCIpKVxcXFxiXCIsIFwiaVwiKTtcbn1cblxudmFyIHNpbmdsZU9wZXJhdG9ycyA9IG5ldyBSZWdFeHAoXCJeW1xcXFwrXFxcXC1cXFxcKi8lJlxcXFxcXFxcfFxcXFxefjw+IV1cIik7XG52YXIgc2luZ2xlRGVsaW1pdGVycyA9IG5ldyBSZWdFeHAoJ15bXFxcXChcXFxcKVxcXFxbXFxcXF1cXFxce1xcXFx9QCw6YD07XFxcXC5dJyk7XG52YXIgZG91YmxlT3BlcmF0b3JzID0gbmV3IFJlZ0V4cChcIl4oKD09KXwoPD4pfCg8PSl8KD49KXwoPD4pfCg8PCl8KD4+KXwoLy8pfChcXFxcKlxcXFwqKSlcIik7XG52YXIgZG91YmxlRGVsaW1pdGVycyA9IG5ldyBSZWdFeHAoXCJeKChcXFxcKz0pfChcXFxcLT0pfChcXFxcKj0pfCglPSl8KC89KXwoJj0pfChcXFxcfD0pfChcXFxcXj0pKVwiKTtcbnZhciB0cmlwbGVEZWxpbWl0ZXJzID0gbmV3IFJlZ0V4cChcIl4oKC8vPSl8KD4+PSl8KDw8PSl8KFxcXFwqXFxcXCo9KSlcIik7XG52YXIgaWRlbnRpZmllcnMgPSBuZXcgUmVnRXhwKFwiXltfQS1aYS16XVtfQS1aYS16MC05XSpcIik7XG5cbnZhciBvcGVuaW5nS2V5d29yZHMgPSBbJ2NsYXNzJywnbW9kdWxlJywgJ3N1YicsJ2VudW0nLCdzZWxlY3QnLCd3aGlsZScsJ2lmJywnZnVuY3Rpb24nLCAnZ2V0Jywnc2V0JywncHJvcGVydHknLCAndHJ5JywgJ3N0cnVjdHVyZScsICdzeW5jbG9jaycsICd1c2luZycsICd3aXRoJ107XG52YXIgbWlkZGxlS2V5d29yZHMgPSBbJ2Vsc2UnLCdlbHNlaWYnLCdjYXNlJywgJ2NhdGNoJywgJ2ZpbmFsbHknXTtcbnZhciBlbmRLZXl3b3JkcyA9IFsnbmV4dCcsJ2xvb3AnXTtcblxudmFyIG9wZXJhdG9yS2V5d29yZHMgPSBbJ2FuZCcsIFwiYW5kYWxzb1wiLCAnb3InLCAnb3JlbHNlJywgJ3hvcicsICdpbicsICdub3QnLCAnaXMnLCAnaXNub3QnLCAnbGlrZSddO1xudmFyIHdvcmRPcGVyYXRvcnMgPSB3b3JkUmVnZXhwKG9wZXJhdG9yS2V5d29yZHMpO1xuXG52YXIgY29tbW9uS2V5d29yZHMgPSBbXCIjY29uc3RcIiwgXCIjZWxzZVwiLCBcIiNlbHNlaWZcIiwgXCIjZW5kXCIsIFwiI2lmXCIsIFwiI3JlZ2lvblwiLCBcImFkZGhhbmRsZXJcIiwgXCJhZGRyZXNzb2ZcIiwgXCJhbGlhc1wiLCBcImFzXCIsIFwiYnlyZWZcIiwgXCJieXZhbFwiLCBcImNib29sXCIsIFwiY2J5dGVcIiwgXCJjY2hhclwiLCBcImNkYXRlXCIsIFwiY2RibFwiLCBcImNkZWNcIiwgXCJjaW50XCIsIFwiY2xuZ1wiLCBcImNvYmpcIiwgXCJjb21wYXJlXCIsIFwiY29uc3RcIiwgXCJjb250aW51ZVwiLCBcImNzYnl0ZVwiLCBcImNzaG9ydFwiLCBcImNzbmdcIiwgXCJjc3RyXCIsIFwiY3VpbnRcIiwgXCJjdWxuZ1wiLCBcImN1c2hvcnRcIiwgXCJkZWNsYXJlXCIsIFwiZGVmYXVsdFwiLCBcImRlbGVnYXRlXCIsIFwiZGltXCIsIFwiZGlyZWN0Y2FzdFwiLCBcImVhY2hcIiwgXCJlcmFzZVwiLCBcImVycm9yXCIsIFwiZXZlbnRcIiwgXCJleGl0XCIsIFwiZXhwbGljaXRcIiwgXCJmYWxzZVwiLCBcImZvclwiLCBcImZyaWVuZFwiLCBcImdldHR5cGVcIiwgXCJnb3RvXCIsIFwiaGFuZGxlc1wiLCBcImltcGxlbWVudHNcIiwgXCJpbXBvcnRzXCIsIFwiaW5mZXJcIiwgXCJpbmhlcml0c1wiLCBcImludGVyZmFjZVwiLCBcImlzZmFsc2VcIiwgXCJpc3RydWVcIiwgXCJsaWJcIiwgXCJtZVwiLCBcIm1vZFwiLCBcIm11c3Rpbmhlcml0XCIsIFwibXVzdG92ZXJyaWRlXCIsIFwibXlcIiwgXCJteWJhc2VcIiwgXCJteWNsYXNzXCIsIFwibmFtZXNwYWNlXCIsIFwibmFycm93aW5nXCIsIFwibmV3XCIsIFwibm90aGluZ1wiLCBcIm5vdGluaGVyaXRhYmxlXCIsIFwibm90b3ZlcnJpZGFibGVcIiwgXCJvZlwiLCBcIm9mZlwiLCBcIm9uXCIsIFwib3BlcmF0b3JcIiwgXCJvcHRpb25cIiwgXCJvcHRpb25hbFwiLCBcIm91dFwiLCBcIm92ZXJsb2Fkc1wiLCBcIm92ZXJyaWRhYmxlXCIsIFwib3ZlcnJpZGVzXCIsIFwicGFyYW1hcnJheVwiLCBcInBhcnRpYWxcIiwgXCJwcml2YXRlXCIsIFwicHJvdGVjdGVkXCIsIFwicHVibGljXCIsIFwicmFpc2VldmVudFwiLCBcInJlYWRvbmx5XCIsIFwicmVkaW1cIiwgXCJyZW1vdmVoYW5kbGVyXCIsIFwicmVzdW1lXCIsIFwicmV0dXJuXCIsIFwic2hhZG93c1wiLCBcInNoYXJlZFwiLCBcInN0YXRpY1wiLCBcInN0ZXBcIiwgXCJzdG9wXCIsIFwic3RyaWN0XCIsIFwidGhlblwiLCBcInRocm93XCIsIFwidG9cIiwgXCJ0cnVlXCIsIFwidHJ5Y2FzdFwiLCBcInR5cGVvZlwiLCBcInVudGlsXCIsIFwidW50aWxcIiwgXCJ3aGVuXCIsIFwid2lkZW5pbmdcIiwgXCJ3aXRoZXZlbnRzXCIsIFwid3JpdGVvbmx5XCJdO1xuXG52YXIgY29tbW9udHlwZXMgPSBbJ29iamVjdCcsICdib29sZWFuJywgJ2NoYXInLCAnc3RyaW5nJywgJ2J5dGUnLCAnc2J5dGUnLCAnc2hvcnQnLCAndXNob3J0JywgJ2ludDE2JywgJ3VpbnQxNicsICdpbnRlZ2VyJywgJ3VpbnRlZ2VyJywgJ2ludDMyJywgJ3VpbnQzMicsICdsb25nJywgJ3Vsb25nJywgJ2ludDY0JywgJ3VpbnQ2NCcsICdkZWNpbWFsJywgJ3NpbmdsZScsICdkb3VibGUnLCAnZmxvYXQnLCAnZGF0ZScsICdkYXRldGltZScsICdpbnRwdHInLCAndWludHB0ciddO1xuXG52YXIga2V5d29yZHMgPSB3b3JkUmVnZXhwKGNvbW1vbktleXdvcmRzKTtcbnZhciB0eXBlcyA9IHdvcmRSZWdleHAoY29tbW9udHlwZXMpO1xudmFyIHN0cmluZ1ByZWZpeGVzID0gJ1wiJztcblxudmFyIG9wZW5pbmcgPSB3b3JkUmVnZXhwKG9wZW5pbmdLZXl3b3Jkcyk7XG52YXIgbWlkZGxlID0gd29yZFJlZ2V4cChtaWRkbGVLZXl3b3Jkcyk7XG52YXIgY2xvc2luZyA9IHdvcmRSZWdleHAoZW5kS2V5d29yZHMpO1xudmFyIGRvdWJsZUNsb3NpbmcgPSB3b3JkUmVnZXhwKFsnZW5kJ10pO1xudmFyIGRvT3BlbmluZyA9IHdvcmRSZWdleHAoWydkbyddKTtcblxudmFyIGluZGVudEluZm8gPSBudWxsO1xuXG5mdW5jdGlvbiBpbmRlbnQoX3N0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuY3VycmVudEluZGVudCsrO1xufVxuXG5mdW5jdGlvbiBkZWRlbnQoX3N0cmVhbSwgc3RhdGUpIHtcbiAgc3RhdGUuY3VycmVudEluZGVudC0tO1xufVxuLy8gdG9rZW5pemVyc1xuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgY2ggPSBzdHJlYW0ucGVlaygpO1xuXG4gIC8vIEhhbmRsZSBDb21tZW50c1xuICBpZiAoY2ggPT09IFwiJ1wiKSB7XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiAnY29tbWVudCc7XG4gIH1cblxuXG4gIC8vIEhhbmRsZSBOdW1iZXIgTGl0ZXJhbHNcbiAgaWYgKHN0cmVhbS5tYXRjaCgvXigoJkgpfCgmTykpP1swLTlcXC5hLWZdL2ksIGZhbHNlKSkge1xuICAgIHZhciBmbG9hdExpdGVyYWwgPSBmYWxzZTtcbiAgICAvLyBGbG9hdHNcbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eXFxkKlxcLlxcZCtGPy9pKSkgeyBmbG9hdExpdGVyYWwgPSB0cnVlOyB9XG4gICAgZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eXFxkK1xcLlxcZCpGPy8pKSB7IGZsb2F0TGl0ZXJhbCA9IHRydWU7IH1cbiAgICBlbHNlIGlmIChzdHJlYW0ubWF0Y2goL15cXC5cXGQrRj8vKSkgeyBmbG9hdExpdGVyYWwgPSB0cnVlOyB9XG5cbiAgICBpZiAoZmxvYXRMaXRlcmFsKSB7XG4gICAgICAvLyBGbG9hdCBsaXRlcmFscyBtYXkgYmUgXCJpbWFnaW5hcnlcIlxuICAgICAgc3RyZWFtLmVhdCgvSi9pKTtcbiAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICB9XG4gICAgLy8gSW50ZWdlcnNcbiAgICB2YXIgaW50TGl0ZXJhbCA9IGZhbHNlO1xuICAgIC8vIEhleFxuICAgIGlmIChzdHJlYW0ubWF0Y2goL14mSFswLTlhLWZdKy9pKSkgeyBpbnRMaXRlcmFsID0gdHJ1ZTsgfVxuICAgIC8vIE9jdGFsXG4gICAgZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eJk9bMC03XSsvaSkpIHsgaW50TGl0ZXJhbCA9IHRydWU7IH1cbiAgICAvLyBEZWNpbWFsXG4gICAgZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eWzEtOV1cXGQqRj8vKSkge1xuICAgICAgLy8gRGVjaW1hbCBsaXRlcmFscyBtYXkgYmUgXCJpbWFnaW5hcnlcIlxuICAgICAgc3RyZWFtLmVhdCgvSi9pKTtcbiAgICAgIC8vIFRPRE8gLSBDYW4geW91IGhhdmUgaW1hZ2luYXJ5IGxvbmdzP1xuICAgICAgaW50TGl0ZXJhbCA9IHRydWU7XG4gICAgfVxuICAgIC8vIFplcm8gYnkgaXRzZWxmIHdpdGggbm8gb3RoZXIgcGllY2Ugb2YgbnVtYmVyLlxuICAgIGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXjAoPyFbXFxkeF0pL2kpKSB7IGludExpdGVyYWwgPSB0cnVlOyB9XG4gICAgaWYgKGludExpdGVyYWwpIHtcbiAgICAgIC8vIEludGVnZXIgbGl0ZXJhbHMgbWF5IGJlIFwibG9uZ1wiXG4gICAgICBzdHJlYW0uZWF0KC9ML2kpO1xuICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhhbmRsZSBTdHJpbmdzXG4gIGlmIChzdHJlYW0ubWF0Y2goc3RyaW5nUHJlZml4ZXMpKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZ0ZhY3Rvcnkoc3RyZWFtLmN1cnJlbnQoKSk7XG4gICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG5cbiAgLy8gSGFuZGxlIG9wZXJhdG9ycyBhbmQgRGVsaW1pdGVyc1xuICBpZiAoc3RyZWFtLm1hdGNoKHRyaXBsZURlbGltaXRlcnMpIHx8IHN0cmVhbS5tYXRjaChkb3VibGVEZWxpbWl0ZXJzKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChzdHJlYW0ubWF0Y2goZG91YmxlT3BlcmF0b3JzKVxuICAgICAgfHwgc3RyZWFtLm1hdGNoKHNpbmdsZU9wZXJhdG9ycylcbiAgICAgIHx8IHN0cmVhbS5tYXRjaCh3b3JkT3BlcmF0b3JzKSkge1xuICAgIHJldHVybiAnb3BlcmF0b3InO1xuICB9XG4gIGlmIChzdHJlYW0ubWF0Y2goc2luZ2xlRGVsaW1pdGVycykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoc3RyZWFtLm1hdGNoKGRvT3BlbmluZykpIHtcbiAgICBpbmRlbnQoc3RyZWFtLHN0YXRlKTtcbiAgICBzdGF0ZS5kb0luQ3VycmVudExpbmUgPSB0cnVlO1xuICAgIHJldHVybiAna2V5d29yZCc7XG4gIH1cbiAgaWYgKHN0cmVhbS5tYXRjaChvcGVuaW5nKSkge1xuICAgIGlmICghIHN0YXRlLmRvSW5DdXJyZW50TGluZSlcbiAgICAgIGluZGVudChzdHJlYW0sc3RhdGUpO1xuICAgIGVsc2VcbiAgICAgIHN0YXRlLmRvSW5DdXJyZW50TGluZSA9IGZhbHNlO1xuICAgIHJldHVybiAna2V5d29yZCc7XG4gIH1cbiAgaWYgKHN0cmVhbS5tYXRjaChtaWRkbGUpKSB7XG4gICAgcmV0dXJuICdrZXl3b3JkJztcbiAgfVxuXG4gIGlmIChzdHJlYW0ubWF0Y2goZG91YmxlQ2xvc2luZykpIHtcbiAgICBkZWRlbnQoc3RyZWFtLHN0YXRlKTtcbiAgICBkZWRlbnQoc3RyZWFtLHN0YXRlKTtcbiAgICByZXR1cm4gJ2tleXdvcmQnO1xuICB9XG4gIGlmIChzdHJlYW0ubWF0Y2goY2xvc2luZykpIHtcbiAgICBkZWRlbnQoc3RyZWFtLHN0YXRlKTtcbiAgICByZXR1cm4gJ2tleXdvcmQnO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaCh0eXBlcykpIHtcbiAgICByZXR1cm4gJ2tleXdvcmQnO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChrZXl3b3JkcykpIHtcbiAgICByZXR1cm4gJ2tleXdvcmQnO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChpZGVudGlmaWVycykpIHtcbiAgICByZXR1cm4gJ3ZhcmlhYmxlJztcbiAgfVxuXG4gIC8vIEhhbmRsZSBub24tZGV0ZWN0ZWQgaXRlbXNcbiAgc3RyZWFtLm5leHQoKTtcbiAgcmV0dXJuIEVSUk9SQ0xBU1M7XG59XG5cbmZ1bmN0aW9uIHRva2VuU3RyaW5nRmFjdG9yeShkZWxpbWl0ZXIpIHtcbiAgdmFyIHNpbmdsZWxpbmUgPSBkZWxpbWl0ZXIubGVuZ3RoID09IDE7XG4gIHZhciBPVVRDTEFTUyA9ICdzdHJpbmcnO1xuXG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgIHN0cmVhbS5lYXRXaGlsZSgvW14nXCJdLyk7XG4gICAgICBpZiAoc3RyZWFtLm1hdGNoKGRlbGltaXRlcikpIHtcbiAgICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgICAgIHJldHVybiBPVVRDTEFTUztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbS5lYXQoL1snXCJdLyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaW5nbGVsaW5lKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICB9XG4gICAgcmV0dXJuIE9VVENMQVNTO1xuICB9O1xufVxuXG5cbmZ1bmN0aW9uIHRva2VuTGV4ZXIoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgc3R5bGUgPSBzdGF0ZS50b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcbiAgdmFyIGN1cnJlbnQgPSBzdHJlYW0uY3VycmVudCgpO1xuXG4gIC8vIEhhbmRsZSAnLicgY29ubmVjdGVkIGlkZW50aWZpZXJzXG4gIGlmIChjdXJyZW50ID09PSAnLicpIHtcbiAgICBzdHlsZSA9IHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICAgIGlmIChzdHlsZSA9PT0gJ3ZhcmlhYmxlJykge1xuICAgICAgcmV0dXJuICd2YXJpYWJsZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBFUlJPUkNMQVNTO1xuICAgIH1cbiAgfVxuXG5cbiAgdmFyIGRlbGltaXRlcl9pbmRleCA9ICdbKHsnLmluZGV4T2YoY3VycmVudCk7XG4gIGlmIChkZWxpbWl0ZXJfaW5kZXggIT09IC0xKSB7XG4gICAgaW5kZW50KHN0cmVhbSwgc3RhdGUgKTtcbiAgfVxuICBpZiAoaW5kZW50SW5mbyA9PT0gJ2RlZGVudCcpIHtcbiAgICBpZiAoZGVkZW50KHN0cmVhbSwgc3RhdGUpKSB7XG4gICAgICByZXR1cm4gRVJST1JDTEFTUztcbiAgICB9XG4gIH1cbiAgZGVsaW1pdGVyX2luZGV4ID0gJ10pfScuaW5kZXhPZihjdXJyZW50KTtcbiAgaWYgKGRlbGltaXRlcl9pbmRleCAhPT0gLTEpIHtcbiAgICBpZiAoZGVkZW50KHN0cmVhbSwgc3RhdGUpKSB7XG4gICAgICByZXR1cm4gRVJST1JDTEFTUztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmV4cG9ydCBjb25zdCB2YiA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuaXplOiB0b2tlbkJhc2UsXG4gICAgICBsYXN0VG9rZW46IG51bGwsXG4gICAgICBjdXJyZW50SW5kZW50OiAwLFxuICAgICAgbmV4dExpbmVJbmRlbnQ6IDAsXG4gICAgICBkb0luQ3VycmVudExpbmU6IGZhbHNlXG5cblxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBzdGF0ZS5jdXJyZW50SW5kZW50ICs9IHN0YXRlLm5leHRMaW5lSW5kZW50O1xuICAgICAgc3RhdGUubmV4dExpbmVJbmRlbnQgPSAwO1xuICAgICAgc3RhdGUuZG9JbkN1cnJlbnRMaW5lID0gMDtcbiAgICB9XG4gICAgdmFyIHN0eWxlID0gdG9rZW5MZXhlcihzdHJlYW0sIHN0YXRlKTtcblxuICAgIHN0YXRlLmxhc3RUb2tlbiA9IHtzdHlsZTpzdHlsZSwgY29udGVudDogc3RyZWFtLmN1cnJlbnQoKX07XG5cblxuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuXG4gIGluZGVudDogZnVuY3Rpb24oc3RhdGUsIHRleHRBZnRlciwgY3gpIHtcbiAgICB2YXIgdHJ1ZVRleHQgPSB0ZXh0QWZ0ZXIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIDtcbiAgICBpZiAodHJ1ZVRleHQubWF0Y2goY2xvc2luZykgfHwgdHJ1ZVRleHQubWF0Y2goZG91YmxlQ2xvc2luZykgfHwgdHJ1ZVRleHQubWF0Y2gobWlkZGxlKSkgcmV0dXJuIGN4LnVuaXQqKHN0YXRlLmN1cnJlbnRJbmRlbnQtMSk7XG4gICAgaWYoc3RhdGUuY3VycmVudEluZGVudCA8IDApIHJldHVybiAwO1xuICAgIHJldHVybiBzdGF0ZS5jdXJyZW50SW5kZW50ICogY3gudW5pdDtcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBjbG9zZUJyYWNrZXRzOiB7YnJhY2tldHM6IFtcIihcIiwgXCJbXCIsIFwie1wiLCAnXCInXX0sXG4gICAgY29tbWVudFRva2Vuczoge2xpbmU6IFwiJ1wifSxcbiAgICBhdXRvY29tcGxldGU6IG9wZW5pbmdLZXl3b3Jkcy5jb25jYXQobWlkZGxlS2V5d29yZHMpLmNvbmNhdChlbmRLZXl3b3JkcylcbiAgICAgIC5jb25jYXQob3BlcmF0b3JLZXl3b3JkcykuY29uY2F0KGNvbW1vbktleXdvcmRzKS5jb25jYXQoY29tbW9udHlwZXMpXG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///438\n')}}]);