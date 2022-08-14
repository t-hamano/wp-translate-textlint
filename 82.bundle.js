(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{422:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"smalltalk\", function() { return smalltalk; });\nvar specialChars = /[+\\-\\/\\\\*~<>=@%|&?!.,:;^]/;\nvar keywords = /true|false|nil|self|super|thisContext/;\n\nvar Context = function(tokenizer, parent) {\n  this.next = tokenizer;\n  this.parent = parent;\n};\n\nvar Token = function(name, context, eos) {\n  this.name = name;\n  this.context = context;\n  this.eos = eos;\n};\n\nvar State = function() {\n  this.context = new Context(next, null);\n  this.expectVariable = true;\n  this.indentation = 0;\n  this.userIndentationDelta = 0;\n};\n\nState.prototype.userIndent = function(indentation, indentUnit) {\n  this.userIndentationDelta = indentation > 0 ? (indentation / indentUnit - this.indentation) : 0;\n};\n\nvar next = function(stream, context, state) {\n  var token = new Token(null, context, false);\n  var aChar = stream.next();\n\n  if (aChar === '\"') {\n    token = nextComment(stream, new Context(nextComment, context));\n\n  } else if (aChar === '\\'') {\n    token = nextString(stream, new Context(nextString, context));\n\n  } else if (aChar === '#') {\n    if (stream.peek() === '\\'') {\n      stream.next();\n      token = nextSymbol(stream, new Context(nextSymbol, context));\n    } else {\n      if (stream.eatWhile(/[^\\s.{}\\[\\]()]/))\n        token.name = 'string.special';\n      else\n        token.name = 'meta';\n    }\n\n  } else if (aChar === '$') {\n    if (stream.next() === '<') {\n      stream.eatWhile(/[^\\s>]/);\n      stream.next();\n    }\n    token.name = 'string.special';\n\n  } else if (aChar === '|' && state.expectVariable) {\n    token.context = new Context(nextTemporaries, context);\n\n  } else if (/[\\[\\]{}()]/.test(aChar)) {\n    token.name = 'bracket';\n    token.eos = /[\\[{(]/.test(aChar);\n\n    if (aChar === '[') {\n      state.indentation++;\n    } else if (aChar === ']') {\n      state.indentation = Math.max(0, state.indentation - 1);\n    }\n\n  } else if (specialChars.test(aChar)) {\n    stream.eatWhile(specialChars);\n    token.name = 'operator';\n    token.eos = aChar !== ';'; // ; cascaded message expression\n\n  } else if (/\\d/.test(aChar)) {\n    stream.eatWhile(/[\\w\\d]/);\n    token.name = 'number';\n\n  } else if (/[\\w_]/.test(aChar)) {\n    stream.eatWhile(/[\\w\\d_]/);\n    token.name = state.expectVariable ? (keywords.test(stream.current()) ? 'keyword' : 'variable') : null;\n\n  } else {\n    token.eos = state.expectVariable;\n  }\n\n  return token;\n};\n\nvar nextComment = function(stream, context) {\n  stream.eatWhile(/[^\"]/);\n  return new Token('comment', stream.eat('\"') ? context.parent : context, true);\n};\n\nvar nextString = function(stream, context) {\n  stream.eatWhile(/[^']/);\n  return new Token('string', stream.eat('\\'') ? context.parent : context, false);\n};\n\nvar nextSymbol = function(stream, context) {\n  stream.eatWhile(/[^']/);\n  return new Token('string.special', stream.eat('\\'') ? context.parent : context, false);\n};\n\nvar nextTemporaries = function(stream, context) {\n  var token = new Token(null, context, false);\n  var aChar = stream.next();\n\n  if (aChar === '|') {\n    token.context = context.parent;\n    token.eos = true;\n\n  } else {\n    stream.eatWhile(/[^|]/);\n    token.name = 'variable';\n  }\n\n  return token;\n};\n\nconst smalltalk = {\n  startState: function() {\n    return new State;\n  },\n\n  token: function(stream, state) {\n    state.userIndent(stream.indentation(), stream.indentUnit);\n\n    if (stream.eatSpace()) {\n      return null;\n    }\n\n    var token = state.context.next(stream, state.context, state);\n    state.context = token.context;\n    state.expectVariable = token.eos;\n\n    return token.name;\n  },\n\n  blankLine: function(state, indentUnit) {\n    state.userIndent(0, indentUnit);\n  },\n\n  indent: function(state, textAfter, cx) {\n    var i = state.context.next === next && textAfter && textAfter.charAt(0) === ']' ? -1 : state.userIndentationDelta;\n    return (state.indentation + i) * cx.unit;\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*\\]$/\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvc21hbGx0YWxrLmpzP2ZlMjEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBLDJDQUEyQztBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDs7QUFFQSxHQUFHLGtCQUFrQjtBQUNyQjtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNEJBQTRCLEVBQUUsS0FBSzs7QUFFbkMsR0FBRztBQUNIO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI0MjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3BlY2lhbENoYXJzID0gL1srXFwtXFwvXFxcXCp+PD49QCV8Jj8hLiw6O15dLztcbnZhciBrZXl3b3JkcyA9IC90cnVlfGZhbHNlfG5pbHxzZWxmfHN1cGVyfHRoaXNDb250ZXh0LztcblxudmFyIENvbnRleHQgPSBmdW5jdGlvbih0b2tlbml6ZXIsIHBhcmVudCkge1xuICB0aGlzLm5leHQgPSB0b2tlbml6ZXI7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xufTtcblxudmFyIFRva2VuID0gZnVuY3Rpb24obmFtZSwgY29udGV4dCwgZW9zKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuZW9zID0gZW9zO1xufTtcblxudmFyIFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KG5leHQsIG51bGwpO1xuICB0aGlzLmV4cGVjdFZhcmlhYmxlID0gdHJ1ZTtcbiAgdGhpcy5pbmRlbnRhdGlvbiA9IDA7XG4gIHRoaXMudXNlckluZGVudGF0aW9uRGVsdGEgPSAwO1xufTtcblxuU3RhdGUucHJvdG90eXBlLnVzZXJJbmRlbnQgPSBmdW5jdGlvbihpbmRlbnRhdGlvbiwgaW5kZW50VW5pdCkge1xuICB0aGlzLnVzZXJJbmRlbnRhdGlvbkRlbHRhID0gaW5kZW50YXRpb24gPiAwID8gKGluZGVudGF0aW9uIC8gaW5kZW50VW5pdCAtIHRoaXMuaW5kZW50YXRpb24pIDogMDtcbn07XG5cbnZhciBuZXh0ID0gZnVuY3Rpb24oc3RyZWFtLCBjb250ZXh0LCBzdGF0ZSkge1xuICB2YXIgdG9rZW4gPSBuZXcgVG9rZW4obnVsbCwgY29udGV4dCwgZmFsc2UpO1xuICB2YXIgYUNoYXIgPSBzdHJlYW0ubmV4dCgpO1xuXG4gIGlmIChhQ2hhciA9PT0gJ1wiJykge1xuICAgIHRva2VuID0gbmV4dENvbW1lbnQoc3RyZWFtLCBuZXcgQ29udGV4dChuZXh0Q29tbWVudCwgY29udGV4dCkpO1xuXG4gIH0gZWxzZSBpZiAoYUNoYXIgPT09ICdcXCcnKSB7XG4gICAgdG9rZW4gPSBuZXh0U3RyaW5nKHN0cmVhbSwgbmV3IENvbnRleHQobmV4dFN0cmluZywgY29udGV4dCkpO1xuXG4gIH0gZWxzZSBpZiAoYUNoYXIgPT09ICcjJykge1xuICAgIGlmIChzdHJlYW0ucGVlaygpID09PSAnXFwnJykge1xuICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgIHRva2VuID0gbmV4dFN5bWJvbChzdHJlYW0sIG5ldyBDb250ZXh0KG5leHRTeW1ib2wsIGNvbnRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0cmVhbS5lYXRXaGlsZSgvW15cXHMue31cXFtcXF0oKV0vKSlcbiAgICAgICAgdG9rZW4ubmFtZSA9ICdzdHJpbmcuc3BlY2lhbCc7XG4gICAgICBlbHNlXG4gICAgICAgIHRva2VuLm5hbWUgPSAnbWV0YSc7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAoYUNoYXIgPT09ICckJykge1xuICAgIGlmIChzdHJlYW0ubmV4dCgpID09PSAnPCcpIHtcbiAgICAgIHN0cmVhbS5lYXRXaGlsZSgvW15cXHM+XS8pO1xuICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICB9XG4gICAgdG9rZW4ubmFtZSA9ICdzdHJpbmcuc3BlY2lhbCc7XG5cbiAgfSBlbHNlIGlmIChhQ2hhciA9PT0gJ3wnICYmIHN0YXRlLmV4cGVjdFZhcmlhYmxlKSB7XG4gICAgdG9rZW4uY29udGV4dCA9IG5ldyBDb250ZXh0KG5leHRUZW1wb3JhcmllcywgY29udGV4dCk7XG5cbiAgfSBlbHNlIGlmICgvW1xcW1xcXXt9KCldLy50ZXN0KGFDaGFyKSkge1xuICAgIHRva2VuLm5hbWUgPSAnYnJhY2tldCc7XG4gICAgdG9rZW4uZW9zID0gL1tcXFt7KF0vLnRlc3QoYUNoYXIpO1xuXG4gICAgaWYgKGFDaGFyID09PSAnWycpIHtcbiAgICAgIHN0YXRlLmluZGVudGF0aW9uKys7XG4gICAgfSBlbHNlIGlmIChhQ2hhciA9PT0gJ10nKSB7XG4gICAgICBzdGF0ZS5pbmRlbnRhdGlvbiA9IE1hdGgubWF4KDAsIHN0YXRlLmluZGVudGF0aW9uIC0gMSk7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAoc3BlY2lhbENoYXJzLnRlc3QoYUNoYXIpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKHNwZWNpYWxDaGFycyk7XG4gICAgdG9rZW4ubmFtZSA9ICdvcGVyYXRvcic7XG4gICAgdG9rZW4uZW9zID0gYUNoYXIgIT09ICc7JzsgLy8gOyBjYXNjYWRlZCBtZXNzYWdlIGV4cHJlc3Npb25cblxuICB9IGVsc2UgaWYgKC9cXGQvLnRlc3QoYUNoYXIpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFxkXS8pO1xuICAgIHRva2VuLm5hbWUgPSAnbnVtYmVyJztcblxuICB9IGVsc2UgaWYgKC9bXFx3X10vLnRlc3QoYUNoYXIpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFxkX10vKTtcbiAgICB0b2tlbi5uYW1lID0gc3RhdGUuZXhwZWN0VmFyaWFibGUgPyAoa2V5d29yZHMudGVzdChzdHJlYW0uY3VycmVudCgpKSA/ICdrZXl3b3JkJyA6ICd2YXJpYWJsZScpIDogbnVsbDtcblxuICB9IGVsc2Uge1xuICAgIHRva2VuLmVvcyA9IHN0YXRlLmV4cGVjdFZhcmlhYmxlO1xuICB9XG5cbiAgcmV0dXJuIHRva2VuO1xufTtcblxudmFyIG5leHRDb21tZW50ID0gZnVuY3Rpb24oc3RyZWFtLCBjb250ZXh0KSB7XG4gIHN0cmVhbS5lYXRXaGlsZSgvW15cIl0vKTtcbiAgcmV0dXJuIG5ldyBUb2tlbignY29tbWVudCcsIHN0cmVhbS5lYXQoJ1wiJykgPyBjb250ZXh0LnBhcmVudCA6IGNvbnRleHQsIHRydWUpO1xufTtcblxudmFyIG5leHRTdHJpbmcgPSBmdW5jdGlvbihzdHJlYW0sIGNvbnRleHQpIHtcbiAgc3RyZWFtLmVhdFdoaWxlKC9bXiddLyk7XG4gIHJldHVybiBuZXcgVG9rZW4oJ3N0cmluZycsIHN0cmVhbS5lYXQoJ1xcJycpID8gY29udGV4dC5wYXJlbnQgOiBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG52YXIgbmV4dFN5bWJvbCA9IGZ1bmN0aW9uKHN0cmVhbSwgY29udGV4dCkge1xuICBzdHJlYW0uZWF0V2hpbGUoL1teJ10vKTtcbiAgcmV0dXJuIG5ldyBUb2tlbignc3RyaW5nLnNwZWNpYWwnLCBzdHJlYW0uZWF0KCdcXCcnKSA/IGNvbnRleHQucGFyZW50IDogY29udGV4dCwgZmFsc2UpO1xufTtcblxudmFyIG5leHRUZW1wb3JhcmllcyA9IGZ1bmN0aW9uKHN0cmVhbSwgY29udGV4dCkge1xuICB2YXIgdG9rZW4gPSBuZXcgVG9rZW4obnVsbCwgY29udGV4dCwgZmFsc2UpO1xuICB2YXIgYUNoYXIgPSBzdHJlYW0ubmV4dCgpO1xuXG4gIGlmIChhQ2hhciA9PT0gJ3wnKSB7XG4gICAgdG9rZW4uY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgIHRva2VuLmVvcyA9IHRydWU7XG5cbiAgfSBlbHNlIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1tefF0vKTtcbiAgICB0b2tlbi5uYW1lID0gJ3ZhcmlhYmxlJztcbiAgfVxuXG4gIHJldHVybiB0b2tlbjtcbn07XG5cbmV4cG9ydCBjb25zdCBzbWFsbHRhbGsgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgU3RhdGU7XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICBzdGF0ZS51c2VySW5kZW50KHN0cmVhbS5pbmRlbnRhdGlvbigpLCBzdHJlYW0uaW5kZW50VW5pdCk7XG5cbiAgICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciB0b2tlbiA9IHN0YXRlLmNvbnRleHQubmV4dChzdHJlYW0sIHN0YXRlLmNvbnRleHQsIHN0YXRlKTtcbiAgICBzdGF0ZS5jb250ZXh0ID0gdG9rZW4uY29udGV4dDtcbiAgICBzdGF0ZS5leHBlY3RWYXJpYWJsZSA9IHRva2VuLmVvcztcblxuICAgIHJldHVybiB0b2tlbi5uYW1lO1xuICB9LFxuXG4gIGJsYW5rTGluZTogZnVuY3Rpb24oc3RhdGUsIGluZGVudFVuaXQpIHtcbiAgICBzdGF0ZS51c2VySW5kZW50KDAsIGluZGVudFVuaXQpO1xuICB9LFxuXG4gIGluZGVudDogZnVuY3Rpb24oc3RhdGUsIHRleHRBZnRlciwgY3gpIHtcbiAgICB2YXIgaSA9IHN0YXRlLmNvbnRleHQubmV4dCA9PT0gbmV4dCAmJiB0ZXh0QWZ0ZXIgJiYgdGV4dEFmdGVyLmNoYXJBdCgwKSA9PT0gJ10nID8gLTEgOiBzdGF0ZS51c2VySW5kZW50YXRpb25EZWx0YTtcbiAgICByZXR1cm4gKHN0YXRlLmluZGVudGF0aW9uICsgaSkgKiBjeC51bml0O1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGluZGVudE9uSW5wdXQ6IC9eXFxzKlxcXSQvXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///422\n")}}]);