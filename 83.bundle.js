(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{423:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "solr", function() { return solr; });\nvar isStringChar = /[^\\s\\|\\!\\+\\-\\*\\?\\~\\^\\&\\:\\(\\)\\[\\]\\{\\}\\"\\\\]/;\nvar isOperatorChar = /[\\|\\!\\+\\-\\*\\?\\~\\^\\&]/;\nvar isOperatorString = /^(OR|AND|NOT|TO)$/i;\n\nfunction isNumber(word) {\n  return parseFloat(word).toString() === word;\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) break;\n      escaped = !escaped && next == "\\\\";\n    }\n\n    if (!escaped) state.tokenize = tokenBase;\n    return "string";\n  };\n}\n\nfunction tokenOperator(operator) {\n  return function(stream, state) {\n    if (operator == "|")\n      stream.eat(/\\|/);\n    else if (operator == "&")\n      stream.eat(/\\&/);\n\n    state.tokenize = tokenBase;\n    return "operator";\n  };\n}\n\nfunction tokenWord(ch) {\n  return function(stream, state) {\n    var word = ch;\n    while ((ch = stream.peek()) && ch.match(isStringChar) != null) {\n      word += stream.next();\n    }\n\n    state.tokenize = tokenBase;\n    if (isOperatorString.test(word))\n      return "operator";\n    else if (isNumber(word))\n      return "number";\n    else if (stream.peek() == ":")\n      return "propertyName";\n    else\n      return "string";\n  };\n}\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == \'"\')\n    state.tokenize = tokenString(ch);\n  else if (isOperatorChar.test(ch))\n    state.tokenize = tokenOperator(ch);\n  else if (isStringChar.test(ch))\n    state.tokenize = tokenWord(ch);\n\n  return (state.tokenize != tokenBase) ? state.tokenize(stream, state) : null;\n}\n\nconst solr = {\n  startState: function() {\n    return {\n      tokenize: tokenBase\n    };\n  },\n\n  token: function(stream, state) {\n    if (stream.eatSpace()) return null;\n    return state.tokenize(stream, state);\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvc29sci5qcz8wMzg5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQSxzREFBc0QsRUFBRTtBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNDIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzU3RyaW5nQ2hhciA9IC9bXlxcc1xcfFxcIVxcK1xcLVxcKlxcP1xcflxcXlxcJlxcOlxcKFxcKVxcW1xcXVxce1xcfVxcXCJcXFxcXS87XG52YXIgaXNPcGVyYXRvckNoYXIgPSAvW1xcfFxcIVxcK1xcLVxcKlxcP1xcflxcXlxcJl0vO1xudmFyIGlzT3BlcmF0b3JTdHJpbmcgPSAvXihPUnxBTkR8Tk9UfFRPKSQvaTtcblxuZnVuY3Rpb24gaXNOdW1iZXIod29yZCkge1xuICByZXR1cm4gcGFyc2VGbG9hdCh3b3JkKS50b1N0cmluZygpID09PSB3b3JkO1xufVxuXG5mdW5jdGlvbiB0b2tlblN0cmluZyhxdW90ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIG5leHQ7XG4gICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKG5leHQgPT0gcXVvdGUgJiYgIWVzY2FwZWQpIGJyZWFrO1xuICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkICYmIG5leHQgPT0gXCJcXFxcXCI7XG4gICAgfVxuXG4gICAgaWYgKCFlc2NhcGVkKSBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9rZW5PcGVyYXRvcihvcGVyYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChvcGVyYXRvciA9PSBcInxcIilcbiAgICAgIHN0cmVhbS5lYXQoL1xcfC8pO1xuICAgIGVsc2UgaWYgKG9wZXJhdG9yID09IFwiJlwiKVxuICAgICAgc3RyZWFtLmVhdCgvXFwmLyk7XG5cbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2tlbldvcmQoY2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgd29yZCA9IGNoO1xuICAgIHdoaWxlICgoY2ggPSBzdHJlYW0ucGVlaygpKSAmJiBjaC5tYXRjaChpc1N0cmluZ0NoYXIpICE9IG51bGwpIHtcbiAgICAgIHdvcmQgKz0gc3RyZWFtLm5leHQoKTtcbiAgICB9XG5cbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICBpZiAoaXNPcGVyYXRvclN0cmluZy50ZXN0KHdvcmQpKVxuICAgICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgICBlbHNlIGlmIChpc051bWJlcih3b3JkKSlcbiAgICAgIHJldHVybiBcIm51bWJlclwiO1xuICAgIGVsc2UgaWYgKHN0cmVhbS5wZWVrKCkgPT0gXCI6XCIpXG4gICAgICByZXR1cm4gXCJwcm9wZXJ0eU5hbWVcIjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoID09ICdcIicpXG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZyhjaCk7XG4gIGVsc2UgaWYgKGlzT3BlcmF0b3JDaGFyLnRlc3QoY2gpKVxuICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5PcGVyYXRvcihjaCk7XG4gIGVsc2UgaWYgKGlzU3RyaW5nQ2hhci50ZXN0KGNoKSlcbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuV29yZChjaCk7XG5cbiAgcmV0dXJuIChzdGF0ZS50b2tlbml6ZSAhPSB0b2tlbkJhc2UpID8gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSkgOiBudWxsO1xufVxuXG5leHBvcnQgY29uc3Qgc29sciA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuaXplOiB0b2tlbkJhc2VcbiAgICB9O1xuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///423\n')}}]);