(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{382:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fcl", function() { return fcl; });\nvar keywords = {\n  "term": true,\n  "method": true, "accu": true,\n  "rule": true, "then": true, "is": true, "and": true, "or": true,\n  "if": true, "default": true\n};\n\nvar start_blocks = {\n  "var_input": true,\n  "var_output": true,\n  "fuzzify": true,\n  "defuzzify": true,\n  "function_block": true,\n  "ruleblock": true\n};\n\nvar end_blocks = {\n  "end_ruleblock": true,\n  "end_defuzzify": true,\n  "end_function_block": true,\n  "end_fuzzify": true,\n  "end_var": true\n};\n\nvar atoms = {\n  "true": true, "false": true, "nan": true,\n  "real": true, "min": true, "max": true, "cog": true, "cogs": true\n};\n\nvar isOperatorChar = /[+\\-*&^%:=<>!|\\/]/;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n\n  if (/[\\d\\.]/.test(ch)) {\n    if (ch == ".") {\n      stream.match(/^[0-9]+([eE][\\-+]?[0-9]+)?/);\n    } else if (ch == "0") {\n      stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);\n    } else {\n      stream.match(/^[0-9]*\\.?[0-9]*([eE][\\-+]?[0-9]+)?/);\n    }\n    return "number";\n  }\n\n  if (ch == "/" || ch == "(") {\n    if (stream.eat("*")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n    if (stream.eat("/")) {\n      stream.skipToEnd();\n      return "comment";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return "operator";\n  }\n  stream.eatWhile(/[\\w\\$_\\xa1-\\uffff]/);\n\n  var cur = stream.current().toLowerCase();\n  if (keywords.propertyIsEnumerable(cur) ||\n      start_blocks.propertyIsEnumerable(cur) ||\n      end_blocks.propertyIsEnumerable(cur)) {\n    return "keyword";\n  }\n  if (atoms.propertyIsEnumerable(cur)) return "atom";\n  return "variable";\n}\n\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if ((ch == "/" || ch == ")") && maybeEnd) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == "*");\n  }\n  return "comment";\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\n\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\n\nfunction popContext(state) {\n  if (!state.context.prev) return;\n  var t = state.context.type;\n  if (t == "end_block")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\n\nconst fcl = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, "top", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == "comment") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    var cur = stream.current().toLowerCase();\n\n    if (start_blocks.propertyIsEnumerable(cur)) pushContext(state, stream.column(), "end_block");\n    else if (end_blocks.propertyIsEnumerable(cur))  popContext(state);\n\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return 0;\n    var ctx = state.context;\n\n    var closing = end_blocks.propertyIsEnumerable(textAfter);\n    if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    commentTokens: {line: "//", block: {open: "(*", close: "*)"}}\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZmNsLmpzPzZhZWYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0EiLCJmaWxlIjoiMzgyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGtleXdvcmRzID0ge1xuICBcInRlcm1cIjogdHJ1ZSxcbiAgXCJtZXRob2RcIjogdHJ1ZSwgXCJhY2N1XCI6IHRydWUsXG4gIFwicnVsZVwiOiB0cnVlLCBcInRoZW5cIjogdHJ1ZSwgXCJpc1wiOiB0cnVlLCBcImFuZFwiOiB0cnVlLCBcIm9yXCI6IHRydWUsXG4gIFwiaWZcIjogdHJ1ZSwgXCJkZWZhdWx0XCI6IHRydWVcbn07XG5cbnZhciBzdGFydF9ibG9ja3MgPSB7XG4gIFwidmFyX2lucHV0XCI6IHRydWUsXG4gIFwidmFyX291dHB1dFwiOiB0cnVlLFxuICBcImZ1enppZnlcIjogdHJ1ZSxcbiAgXCJkZWZ1enppZnlcIjogdHJ1ZSxcbiAgXCJmdW5jdGlvbl9ibG9ja1wiOiB0cnVlLFxuICBcInJ1bGVibG9ja1wiOiB0cnVlXG59O1xuXG52YXIgZW5kX2Jsb2NrcyA9IHtcbiAgXCJlbmRfcnVsZWJsb2NrXCI6IHRydWUsXG4gIFwiZW5kX2RlZnV6emlmeVwiOiB0cnVlLFxuICBcImVuZF9mdW5jdGlvbl9ibG9ja1wiOiB0cnVlLFxuICBcImVuZF9mdXp6aWZ5XCI6IHRydWUsXG4gIFwiZW5kX3ZhclwiOiB0cnVlXG59O1xuXG52YXIgYXRvbXMgPSB7XG4gIFwidHJ1ZVwiOiB0cnVlLCBcImZhbHNlXCI6IHRydWUsIFwibmFuXCI6IHRydWUsXG4gIFwicmVhbFwiOiB0cnVlLCBcIm1pblwiOiB0cnVlLCBcIm1heFwiOiB0cnVlLCBcImNvZ1wiOiB0cnVlLCBcImNvZ3NcIjogdHJ1ZVxufTtcblxudmFyIGlzT3BlcmF0b3JDaGFyID0gL1srXFwtKiZeJTo9PD4hfFxcL10vO1xuXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuXG4gIGlmICgvW1xcZFxcLl0vLnRlc3QoY2gpKSB7XG4gICAgaWYgKGNoID09IFwiLlwiKSB7XG4gICAgICBzdHJlYW0ubWF0Y2goL15bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPy8pO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIwXCIpIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlt4WF1bMC05YS1mQS1GXSsvKSB8fCBzdHJlYW0ubWF0Y2goL14wWzAtN10rLyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlswLTldKlxcLj9bMC05XSooW2VFXVtcXC0rXT9bMC05XSspPy8pO1xuICAgIH1cbiAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgfVxuXG4gIGlmIChjaCA9PSBcIi9cIiB8fCBjaCA9PSBcIihcIikge1xuICAgIGlmIChzdHJlYW0uZWF0KFwiKlwiKSkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkNvbW1lbnQ7XG4gICAgICByZXR1cm4gdG9rZW5Db21tZW50KHN0cmVhbSwgc3RhdGUpO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLmVhdChcIi9cIikpIHtcbiAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICB9XG4gIH1cbiAgaWYgKGlzT3BlcmF0b3JDaGFyLnRlc3QoY2gpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKGlzT3BlcmF0b3JDaGFyKTtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9XG4gIHN0cmVhbS5lYXRXaGlsZSgvW1xcd1xcJF9cXHhhMS1cXHVmZmZmXS8pO1xuXG4gIHZhciBjdXIgPSBzdHJlYW0uY3VycmVudCgpLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChrZXl3b3Jkcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpIHx8XG4gICAgICBzdGFydF9ibG9ja3MucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSB8fFxuICAgICAgZW5kX2Jsb2Nrcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSB7XG4gICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICB9XG4gIGlmIChhdG9tcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSByZXR1cm4gXCJhdG9tXCI7XG4gIHJldHVybiBcInZhcmlhYmxlXCI7XG59XG5cblxuZnVuY3Rpb24gdG9rZW5Db21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG1heWJlRW5kID0gZmFsc2UsIGNoO1xuICB3aGlsZSAoY2ggPSBzdHJlYW0ubmV4dCgpKSB7XG4gICAgaWYgKChjaCA9PSBcIi9cIiB8fCBjaCA9PSBcIilcIikgJiYgbWF5YmVFbmQpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG1heWJlRW5kID0gKGNoID09IFwiKlwiKTtcbiAgfVxuICByZXR1cm4gXCJjb21tZW50XCI7XG59XG5cbmZ1bmN0aW9uIENvbnRleHQoaW5kZW50ZWQsIGNvbHVtbiwgdHlwZSwgYWxpZ24sIHByZXYpIHtcbiAgdGhpcy5pbmRlbnRlZCA9IGluZGVudGVkO1xuICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5hbGlnbiA9IGFsaWduO1xuICB0aGlzLnByZXYgPSBwcmV2O1xufVxuXG5mdW5jdGlvbiBwdXNoQ29udGV4dChzdGF0ZSwgY29sLCB0eXBlKSB7XG4gIHJldHVybiBzdGF0ZS5jb250ZXh0ID0gbmV3IENvbnRleHQoc3RhdGUuaW5kZW50ZWQsIGNvbCwgdHlwZSwgbnVsbCwgc3RhdGUuY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIHBvcENvbnRleHQoc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5jb250ZXh0LnByZXYpIHJldHVybjtcbiAgdmFyIHQgPSBzdGF0ZS5jb250ZXh0LnR5cGU7XG4gIGlmICh0ID09IFwiZW5kX2Jsb2NrXCIpXG4gICAgc3RhdGUuaW5kZW50ZWQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkO1xuICByZXR1cm4gc3RhdGUuY29udGV4dCA9IHN0YXRlLmNvbnRleHQucHJldjtcbn1cblxuLy8gSW50ZXJmYWNlXG5cbmV4cG9ydCBjb25zdCBmY2wgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKGluZGVudFVuaXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5pemU6IG51bGwsXG4gICAgICBjb250ZXh0OiBuZXcgQ29udGV4dCgtaW5kZW50VW5pdCwgMCwgXCJ0b3BcIiwgZmFsc2UpLFxuICAgICAgaW5kZW50ZWQ6IDAsXG4gICAgICBzdGFydE9mTGluZTogdHJ1ZVxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgY3R4ID0gc3RhdGUuY29udGV4dDtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IGZhbHNlO1xuICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICAgIHN0YXRlLnN0YXJ0T2ZMaW5lID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBzdHlsZSA9IChzdGF0ZS50b2tlbml6ZSB8fCB0b2tlbkJhc2UpKHN0cmVhbSwgc3RhdGUpO1xuICAgIGlmIChzdHlsZSA9PSBcImNvbW1lbnRcIikgcmV0dXJuIHN0eWxlO1xuICAgIGlmIChjdHguYWxpZ24gPT0gbnVsbCkgY3R4LmFsaWduID0gdHJ1ZTtcblxuICAgIHZhciBjdXIgPSBzdHJlYW0uY3VycmVudCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoc3RhcnRfYmxvY2tzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHB1c2hDb250ZXh0KHN0YXRlLCBzdHJlYW0uY29sdW1uKCksIFwiZW5kX2Jsb2NrXCIpO1xuICAgIGVsc2UgaWYgKGVuZF9ibG9ja3MucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgIHBvcENvbnRleHQoc3RhdGUpO1xuXG4gICAgc3RhdGUuc3RhcnRPZkxpbmUgPSBmYWxzZTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyLCBjeCkge1xuICAgIGlmIChzdGF0ZS50b2tlbml6ZSAhPSB0b2tlbkJhc2UgJiYgc3RhdGUudG9rZW5pemUgIT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgdmFyIGN0eCA9IHN0YXRlLmNvbnRleHQ7XG5cbiAgICB2YXIgY2xvc2luZyA9IGVuZF9ibG9ja3MucHJvcGVydHlJc0VudW1lcmFibGUodGV4dEFmdGVyKTtcbiAgICBpZiAoY3R4LmFsaWduKSByZXR1cm4gY3R4LmNvbHVtbiArIChjbG9zaW5nID8gMCA6IDEpO1xuICAgIGVsc2UgcmV0dXJuIGN0eC5pbmRlbnRlZCArIChjbG9zaW5nID8gMCA6IGN4LnVuaXQpO1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGNvbW1lbnRUb2tlbnM6IHtsaW5lOiBcIi8vXCIsIGJsb2NrOiB7b3BlbjogXCIoKlwiLCBjbG9zZTogXCIqKVwifX1cbiAgfVxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///382\n')}}]);