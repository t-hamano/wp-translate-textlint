(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{399:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modelica", function() { return modelica; });\nfunction words(str) {\n  var obj = {}, words = str.split(" ");\n  for (var i=0; i<words.length; ++i)\n    obj[words[i]] = true;\n  return obj;\n}\n\nvar keywords = words("algorithm and annotation assert block break class connect connector constant constrainedby der discrete each else elseif elsewhen encapsulated end enumeration equation expandable extends external false final flow for function if import impure in initial inner input loop model not operator or outer output package parameter partial protected public pure record redeclare replaceable return stream then true type when while within")\nvar builtin = words("abs acos actualStream asin atan atan2 cardinality ceil cos cosh delay div edge exp floor getInstanceName homotopy inStream integer log log10 mod pre reinit rem semiLinear sign sin sinh spatialDistribution sqrt tan tanh")\nvar atoms = words("Real Boolean Integer String")\n\nvar completions = [].concat(Object.keys(keywords), Object.keys(builtin), Object.keys(atoms))\n\nvar isSingleOperatorChar = /[;=\\(:\\),{}.*<>+\\-\\/^\\[\\]]/;\nvar isDoubleOperatorChar = /(:=|<=|>=|==|<>|\\.\\+|\\.\\-|\\.\\*|\\.\\/|\\.\\^)/;\nvar isDigit = /[0-9]/;\nvar isNonDigit = /[_a-zA-Z]/;\n\nfunction tokenLineComment(stream, state) {\n  stream.skipToEnd();\n  state.tokenize = null;\n  return "comment";\n}\n\nfunction tokenBlockComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (maybeEnd && ch == "/") {\n      state.tokenize = null;\n      break;\n    }\n    maybeEnd = (ch == "*");\n  }\n  return "comment";\n}\n\nfunction tokenString(stream, state) {\n  var escaped = false, ch;\n  while ((ch = stream.next()) != null) {\n    if (ch == \'"\' && !escaped) {\n      state.tokenize = null;\n      state.sol = false;\n      break;\n    }\n    escaped = !escaped && ch == "\\\\";\n  }\n\n  return "string";\n}\n\nfunction tokenIdent(stream, state) {\n  stream.eatWhile(isDigit);\n  while (stream.eat(isDigit) || stream.eat(isNonDigit)) { }\n\n\n  var cur = stream.current();\n\n  if(state.sol && (cur == "package" || cur == "model" || cur == "when" || cur == "connector")) state.level++;\n  else if(state.sol && cur == "end" && state.level > 0) state.level--;\n\n  state.tokenize = null;\n  state.sol = false;\n\n  if (keywords.propertyIsEnumerable(cur)) return "keyword";\n  else if (builtin.propertyIsEnumerable(cur)) return "builtin";\n  else if (atoms.propertyIsEnumerable(cur)) return "atom";\n  else return "variable";\n}\n\nfunction tokenQIdent(stream, state) {\n  while (stream.eat(/[^\']/)) { }\n\n  state.tokenize = null;\n  state.sol = false;\n\n  if(stream.eat("\'"))\n    return "variable";\n  else\n    return "error";\n}\n\nfunction tokenUnsignedNumber(stream, state) {\n  stream.eatWhile(isDigit);\n  if (stream.eat(\'.\')) {\n    stream.eatWhile(isDigit);\n  }\n  if (stream.eat(\'e\') || stream.eat(\'E\')) {\n    if (!stream.eat(\'-\'))\n      stream.eat(\'+\');\n    stream.eatWhile(isDigit);\n  }\n\n  state.tokenize = null;\n  state.sol = false;\n  return "number";\n}\n\n// Interface\nconst modelica = {\n  startState: function() {\n    return {\n      tokenize: null,\n      level: 0,\n      sol: true\n    };\n  },\n\n  token: function(stream, state) {\n    if(state.tokenize != null) {\n      return state.tokenize(stream, state);\n    }\n\n    if(stream.sol()) {\n      state.sol = true;\n    }\n\n    // WHITESPACE\n    if(stream.eatSpace()) {\n      state.tokenize = null;\n      return null;\n    }\n\n    var ch = stream.next();\n\n    // LINECOMMENT\n    if(ch == \'/\' && stream.eat(\'/\')) {\n      state.tokenize = tokenLineComment;\n    }\n    // BLOCKCOMMENT\n    else if(ch == \'/\' && stream.eat(\'*\')) {\n      state.tokenize = tokenBlockComment;\n    }\n    // TWO SYMBOL TOKENS\n    else if(isDoubleOperatorChar.test(ch+stream.peek())) {\n      stream.next();\n      state.tokenize = null;\n      return "operator";\n    }\n    // SINGLE SYMBOL TOKENS\n    else if(isSingleOperatorChar.test(ch)) {\n      state.tokenize = null;\n      return "operator";\n    }\n    // IDENT\n    else if(isNonDigit.test(ch)) {\n      state.tokenize = tokenIdent;\n    }\n    // Q-IDENT\n    else if(ch == "\'" && stream.peek() && stream.peek() != "\'") {\n      state.tokenize = tokenQIdent;\n    }\n    // STRING\n    else if(ch == \'"\') {\n      state.tokenize = tokenString;\n    }\n    // UNSIGNED_NUMBER\n    else if(isDigit.test(ch)) {\n      state.tokenize = tokenUnsignedNumber;\n    }\n    // ERROR\n    else {\n      state.tokenize = null;\n      return "error";\n    }\n\n    return state.tokenize(stream, state);\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != null) return null;\n\n    var level = state.level;\n    if(/(algorithm)/.test(textAfter)) level--;\n    if(/(equation)/.test(textAfter)) level--;\n    if(/(initial algorithm)/.test(textAfter)) level--;\n    if(/(initial equation)/.test(textAfter)) level--;\n    if(/(end)/.test(textAfter)) level--;\n\n    if(level > 0)\n      return cx.unit*level;\n    else\n      return 0;\n  },\n\n  languageData: {\n    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},\n    autocomplete: completions\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvbW9kZWxpY2EuanM/ZGZmOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQSxjQUFjO0FBQ2QsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw4QkFBOEIsU0FBUztBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUF5RDs7O0FBR3pEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLG9CQUFvQixvQkFBb0IseUJBQXlCO0FBQ2pFO0FBQ0E7QUFDQSIsImZpbGUiOiIzOTkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB3b3JkcyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9LCB3b3JkcyA9IHN0ci5zcGxpdChcIiBcIik7XG4gIGZvciAodmFyIGk9MDsgaTx3b3Jkcy5sZW5ndGg7ICsraSlcbiAgICBvYmpbd29yZHNbaV1dID0gdHJ1ZTtcbiAgcmV0dXJuIG9iajtcbn1cblxudmFyIGtleXdvcmRzID0gd29yZHMoXCJhbGdvcml0aG0gYW5kIGFubm90YXRpb24gYXNzZXJ0IGJsb2NrIGJyZWFrIGNsYXNzIGNvbm5lY3QgY29ubmVjdG9yIGNvbnN0YW50IGNvbnN0cmFpbmVkYnkgZGVyIGRpc2NyZXRlIGVhY2ggZWxzZSBlbHNlaWYgZWxzZXdoZW4gZW5jYXBzdWxhdGVkIGVuZCBlbnVtZXJhdGlvbiBlcXVhdGlvbiBleHBhbmRhYmxlIGV4dGVuZHMgZXh0ZXJuYWwgZmFsc2UgZmluYWwgZmxvdyBmb3IgZnVuY3Rpb24gaWYgaW1wb3J0IGltcHVyZSBpbiBpbml0aWFsIGlubmVyIGlucHV0IGxvb3AgbW9kZWwgbm90IG9wZXJhdG9yIG9yIG91dGVyIG91dHB1dCBwYWNrYWdlIHBhcmFtZXRlciBwYXJ0aWFsIHByb3RlY3RlZCBwdWJsaWMgcHVyZSByZWNvcmQgcmVkZWNsYXJlIHJlcGxhY2VhYmxlIHJldHVybiBzdHJlYW0gdGhlbiB0cnVlIHR5cGUgd2hlbiB3aGlsZSB3aXRoaW5cIilcbnZhciBidWlsdGluID0gd29yZHMoXCJhYnMgYWNvcyBhY3R1YWxTdHJlYW0gYXNpbiBhdGFuIGF0YW4yIGNhcmRpbmFsaXR5IGNlaWwgY29zIGNvc2ggZGVsYXkgZGl2IGVkZ2UgZXhwIGZsb29yIGdldEluc3RhbmNlTmFtZSBob21vdG9weSBpblN0cmVhbSBpbnRlZ2VyIGxvZyBsb2cxMCBtb2QgcHJlIHJlaW5pdCByZW0gc2VtaUxpbmVhciBzaWduIHNpbiBzaW5oIHNwYXRpYWxEaXN0cmlidXRpb24gc3FydCB0YW4gdGFuaFwiKVxudmFyIGF0b21zID0gd29yZHMoXCJSZWFsIEJvb2xlYW4gSW50ZWdlciBTdHJpbmdcIilcblxudmFyIGNvbXBsZXRpb25zID0gW10uY29uY2F0KE9iamVjdC5rZXlzKGtleXdvcmRzKSwgT2JqZWN0LmtleXMoYnVpbHRpbiksIE9iamVjdC5rZXlzKGF0b21zKSlcblxudmFyIGlzU2luZ2xlT3BlcmF0b3JDaGFyID0gL1s7PVxcKDpcXCkse30uKjw+K1xcLVxcL15cXFtcXF1dLztcbnZhciBpc0RvdWJsZU9wZXJhdG9yQ2hhciA9IC8oOj18PD18Pj18PT18PD58XFwuXFwrfFxcLlxcLXxcXC5cXCp8XFwuXFwvfFxcLlxcXikvO1xudmFyIGlzRGlnaXQgPSAvWzAtOV0vO1xudmFyIGlzTm9uRGlnaXQgPSAvW19hLXpBLVpdLztcblxuZnVuY3Rpb24gdG9rZW5MaW5lQ29tbWVudChzdHJlYW0sIHN0YXRlKSB7XG4gIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICByZXR1cm4gXCJjb21tZW50XCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuQmxvY2tDb21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG1heWJlRW5kID0gZmFsc2UsIGNoO1xuICB3aGlsZSAoY2ggPSBzdHJlYW0ubmV4dCgpKSB7XG4gICAgaWYgKG1heWJlRW5kICYmIGNoID09IFwiL1wiKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IG51bGw7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbWF5YmVFbmQgPSAoY2ggPT0gXCIqXCIpO1xuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5TdHJpbmcoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBjaDtcbiAgd2hpbGUgKChjaCA9IHN0cmVhbS5uZXh0KCkpICE9IG51bGwpIHtcbiAgICBpZiAoY2ggPT0gJ1wiJyAmJiAhZXNjYXBlZCkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICAgICAgc3RhdGUuc29sID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZXNjYXBlZCA9ICFlc2NhcGVkICYmIGNoID09IFwiXFxcXFwiO1xuICB9XG5cbiAgcmV0dXJuIFwic3RyaW5nXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuSWRlbnQoc3RyZWFtLCBzdGF0ZSkge1xuICBzdHJlYW0uZWF0V2hpbGUoaXNEaWdpdCk7XG4gIHdoaWxlIChzdHJlYW0uZWF0KGlzRGlnaXQpIHx8IHN0cmVhbS5lYXQoaXNOb25EaWdpdCkpIHsgfVxuXG5cbiAgdmFyIGN1ciA9IHN0cmVhbS5jdXJyZW50KCk7XG5cbiAgaWYoc3RhdGUuc29sICYmIChjdXIgPT0gXCJwYWNrYWdlXCIgfHwgY3VyID09IFwibW9kZWxcIiB8fCBjdXIgPT0gXCJ3aGVuXCIgfHwgY3VyID09IFwiY29ubmVjdG9yXCIpKSBzdGF0ZS5sZXZlbCsrO1xuICBlbHNlIGlmKHN0YXRlLnNvbCAmJiBjdXIgPT0gXCJlbmRcIiAmJiBzdGF0ZS5sZXZlbCA+IDApIHN0YXRlLmxldmVsLS07XG5cbiAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICBzdGF0ZS5zb2wgPSBmYWxzZTtcblxuICBpZiAoa2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwia2V5d29yZFwiO1xuICBlbHNlIGlmIChidWlsdGluLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImJ1aWx0aW5cIjtcbiAgZWxzZSBpZiAoYXRvbXMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiYXRvbVwiO1xuICBlbHNlIHJldHVybiBcInZhcmlhYmxlXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuUUlkZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgd2hpbGUgKHN0cmVhbS5lYXQoL1teJ10vKSkgeyB9XG5cbiAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICBzdGF0ZS5zb2wgPSBmYWxzZTtcblxuICBpZihzdHJlYW0uZWF0KFwiJ1wiKSlcbiAgICByZXR1cm4gXCJ2YXJpYWJsZVwiO1xuICBlbHNlXG4gICAgcmV0dXJuIFwiZXJyb3JcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5VbnNpZ25lZE51bWJlcihzdHJlYW0sIHN0YXRlKSB7XG4gIHN0cmVhbS5lYXRXaGlsZShpc0RpZ2l0KTtcbiAgaWYgKHN0cmVhbS5lYXQoJy4nKSkge1xuICAgIHN0cmVhbS5lYXRXaGlsZShpc0RpZ2l0KTtcbiAgfVxuICBpZiAoc3RyZWFtLmVhdCgnZScpIHx8IHN0cmVhbS5lYXQoJ0UnKSkge1xuICAgIGlmICghc3RyZWFtLmVhdCgnLScpKVxuICAgICAgc3RyZWFtLmVhdCgnKycpO1xuICAgIHN0cmVhbS5lYXRXaGlsZShpc0RpZ2l0KTtcbiAgfVxuXG4gIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgc3RhdGUuc29sID0gZmFsc2U7XG4gIHJldHVybiBcIm51bWJlclwiO1xufVxuXG4vLyBJbnRlcmZhY2VcbmV4cG9ydCBjb25zdCBtb2RlbGljYSA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuaXplOiBudWxsLFxuICAgICAgbGV2ZWw6IDAsXG4gICAgICBzb2w6IHRydWVcbiAgICB9O1xuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYoc3RhdGUudG9rZW5pemUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICAgIH1cblxuICAgIGlmKHN0cmVhbS5zb2woKSkge1xuICAgICAgc3RhdGUuc29sID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBXSElURVNQQUNFXG4gICAgaWYoc3RyZWFtLmVhdFNwYWNlKCkpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG5cbiAgICAvLyBMSU5FQ09NTUVOVFxuICAgIGlmKGNoID09ICcvJyAmJiBzdHJlYW0uZWF0KCcvJykpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5MaW5lQ29tbWVudDtcbiAgICB9XG4gICAgLy8gQkxPQ0tDT01NRU5UXG4gICAgZWxzZSBpZihjaCA9PSAnLycgJiYgc3RyZWFtLmVhdCgnKicpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmxvY2tDb21tZW50O1xuICAgIH1cbiAgICAvLyBUV08gU1lNQk9MIFRPS0VOU1xuICAgIGVsc2UgaWYoaXNEb3VibGVPcGVyYXRvckNoYXIudGVzdChjaCtzdHJlYW0ucGVlaygpKSkge1xuICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gICAgfVxuICAgIC8vIFNJTkdMRSBTWU1CT0wgVE9LRU5TXG4gICAgZWxzZSBpZihpc1NpbmdsZU9wZXJhdG9yQ2hhci50ZXN0KGNoKSkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICAgICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgICB9XG4gICAgLy8gSURFTlRcbiAgICBlbHNlIGlmKGlzTm9uRGlnaXQudGVzdChjaCkpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5JZGVudDtcbiAgICB9XG4gICAgLy8gUS1JREVOVFxuICAgIGVsc2UgaWYoY2ggPT0gXCInXCIgJiYgc3RyZWFtLnBlZWsoKSAmJiBzdHJlYW0ucGVlaygpICE9IFwiJ1wiKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuUUlkZW50O1xuICAgIH1cbiAgICAvLyBTVFJJTkdcbiAgICBlbHNlIGlmKGNoID09ICdcIicpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5TdHJpbmc7XG4gICAgfVxuICAgIC8vIFVOU0lHTkVEX05VTUJFUlxuICAgIGVsc2UgaWYoaXNEaWdpdC50ZXN0KGNoKSkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblVuc2lnbmVkTnVtYmVyO1xuICAgIH1cbiAgICAvLyBFUlJPUlxuICAgIGVsc2Uge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICAgICAgcmV0dXJuIFwiZXJyb3JcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyLCBjeCkge1xuICAgIGlmIChzdGF0ZS50b2tlbml6ZSAhPSBudWxsKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBsZXZlbCA9IHN0YXRlLmxldmVsO1xuICAgIGlmKC8oYWxnb3JpdGhtKS8udGVzdCh0ZXh0QWZ0ZXIpKSBsZXZlbC0tO1xuICAgIGlmKC8oZXF1YXRpb24pLy50ZXN0KHRleHRBZnRlcikpIGxldmVsLS07XG4gICAgaWYoLyhpbml0aWFsIGFsZ29yaXRobSkvLnRlc3QodGV4dEFmdGVyKSkgbGV2ZWwtLTtcbiAgICBpZigvKGluaXRpYWwgZXF1YXRpb24pLy50ZXN0KHRleHRBZnRlcikpIGxldmVsLS07XG4gICAgaWYoLyhlbmQpLy50ZXN0KHRleHRBZnRlcikpIGxldmVsLS07XG5cbiAgICBpZihsZXZlbCA+IDApXG4gICAgICByZXR1cm4gY3gudW5pdCpsZXZlbDtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gMDtcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCIvL1wiLCBibG9jazoge29wZW46IFwiLypcIiwgY2xvc2U6IFwiKi9cIn19LFxuICAgIGF1dG9jb21wbGV0ZTogY29tcGxldGlvbnNcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///399\n')}}]);