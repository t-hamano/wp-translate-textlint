(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{431:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toml\", function() { return toml; });\nconst toml = {\n  startState: function () {\n    return {\n      inString: false,\n      stringType: \"\",\n      lhs: true,\n      inArray: 0\n    };\n  },\n  token: function (stream, state) {\n    //check for state changes\n    if (!state.inString && ((stream.peek() == '\"') || (stream.peek() == \"'\"))) {\n      state.stringType = stream.peek();\n      stream.next(); // Skip quote\n      state.inString = true; // Update state\n    }\n    if (stream.sol() && state.inArray === 0) {\n      state.lhs = true;\n    }\n    //return state\n    if (state.inString) {\n      while (state.inString && !stream.eol()) {\n        if (stream.peek() === state.stringType) {\n          stream.next(); // Skip quote\n          state.inString = false; // Clear flag\n        } else if (stream.peek() === '\\\\') {\n          stream.next();\n          stream.next();\n        } else {\n          stream.match(/^.[^\\\\\\\"\\']*/);\n        }\n      }\n      return state.lhs ? \"property\" : \"string\"; // Token style\n    } else if (state.inArray && stream.peek() === ']') {\n      stream.next();\n      state.inArray--;\n      return 'bracket';\n    } else if (state.lhs && stream.peek() === '[' && stream.skipTo(']')) {\n      stream.next();//skip closing ]\n      // array of objects has an extra open & close []\n      if (stream.peek() === ']') stream.next();\n      return \"atom\";\n    } else if (stream.peek() === \"#\") {\n      stream.skipToEnd();\n      return \"comment\";\n    } else if (stream.eatSpace()) {\n      return null;\n    } else if (state.lhs && stream.eatWhile(function (c) { return c != '=' && c != ' '; })) {\n      return \"property\";\n    } else if (state.lhs && stream.peek() === \"=\") {\n      stream.next();\n      state.lhs = false;\n      return null;\n    } else if (!state.lhs && stream.match(/^\\d\\d\\d\\d[\\d\\-\\:\\.T]*Z/)) {\n      return 'atom'; //date\n    } else if (!state.lhs && (stream.match('true') || stream.match('false'))) {\n      return 'atom';\n    } else if (!state.lhs && stream.peek() === '[') {\n      state.inArray++;\n      stream.next();\n      return 'bracket';\n    } else if (!state.lhs && stream.match(/^\\-?\\d+(?:\\.\\d+)?/)) {\n      return 'number';\n    } else if (!stream.eatSpace()) {\n      stream.next();\n    }\n    return null;\n  },\n  languageData: {\n    commentTokens: { line: '#' },\n  },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdG9tbC5qcz9jMzhmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGlDQUFpQztBQUNqQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0MsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLLHFEQUFxRCw2QkFBNkIsRUFBRTtBQUN6RjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CO0FBQ3BCLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEMsR0FBRztBQUNIIiwiZmlsZSI6IjQzMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB0b21sID0ge1xuICBzdGFydFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluU3RyaW5nOiBmYWxzZSxcbiAgICAgIHN0cmluZ1R5cGU6IFwiXCIsXG4gICAgICBsaHM6IHRydWUsXG4gICAgICBpbkFycmF5OiAwXG4gICAgfTtcbiAgfSxcbiAgdG9rZW46IGZ1bmN0aW9uIChzdHJlYW0sIHN0YXRlKSB7XG4gICAgLy9jaGVjayBmb3Igc3RhdGUgY2hhbmdlc1xuICAgIGlmICghc3RhdGUuaW5TdHJpbmcgJiYgKChzdHJlYW0ucGVlaygpID09ICdcIicpIHx8IChzdHJlYW0ucGVlaygpID09IFwiJ1wiKSkpIHtcbiAgICAgIHN0YXRlLnN0cmluZ1R5cGUgPSBzdHJlYW0ucGVlaygpO1xuICAgICAgc3RyZWFtLm5leHQoKTsgLy8gU2tpcCBxdW90ZVxuICAgICAgc3RhdGUuaW5TdHJpbmcgPSB0cnVlOyAvLyBVcGRhdGUgc3RhdGVcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5zb2woKSAmJiBzdGF0ZS5pbkFycmF5ID09PSAwKSB7XG4gICAgICBzdGF0ZS5saHMgPSB0cnVlO1xuICAgIH1cbiAgICAvL3JldHVybiBzdGF0ZVxuICAgIGlmIChzdGF0ZS5pblN0cmluZykge1xuICAgICAgd2hpbGUgKHN0YXRlLmluU3RyaW5nICYmICFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgaWYgKHN0cmVhbS5wZWVrKCkgPT09IHN0YXRlLnN0cmluZ1R5cGUpIHtcbiAgICAgICAgICBzdHJlYW0ubmV4dCgpOyAvLyBTa2lwIHF1b3RlXG4gICAgICAgICAgc3RhdGUuaW5TdHJpbmcgPSBmYWxzZTsgLy8gQ2xlYXIgZmxhZ1xuICAgICAgICB9IGVsc2UgaWYgKHN0cmVhbS5wZWVrKCkgPT09ICdcXFxcJykge1xuICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJlYW0ubWF0Y2goL14uW15cXFxcXFxcIlxcJ10qLyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZS5saHMgPyBcInByb3BlcnR5XCIgOiBcInN0cmluZ1wiOyAvLyBUb2tlbiBzdHlsZVxuICAgIH0gZWxzZSBpZiAoc3RhdGUuaW5BcnJheSAmJiBzdHJlYW0ucGVlaygpID09PSAnXScpIHtcbiAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICBzdGF0ZS5pbkFycmF5LS07XG4gICAgICByZXR1cm4gJ2JyYWNrZXQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGhzICYmIHN0cmVhbS5wZWVrKCkgPT09ICdbJyAmJiBzdHJlYW0uc2tpcFRvKCddJykpIHtcbiAgICAgIHN0cmVhbS5uZXh0KCk7Ly9za2lwIGNsb3NpbmcgXVxuICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBoYXMgYW4gZXh0cmEgb3BlbiAmIGNsb3NlIFtdXG4gICAgICBpZiAoc3RyZWFtLnBlZWsoKSA9PT0gJ10nKSBzdHJlYW0ubmV4dCgpO1xuICAgICAgcmV0dXJuIFwiYXRvbVwiO1xuICAgIH0gZWxzZSBpZiAoc3RyZWFtLnBlZWsoKSA9PT0gXCIjXCIpIHtcbiAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxocyAmJiBzdHJlYW0uZWF0V2hpbGUoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMgIT0gJz0nICYmIGMgIT0gJyAnOyB9KSkge1xuICAgICAgcmV0dXJuIFwicHJvcGVydHlcIjtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxocyAmJiBzdHJlYW0ucGVlaygpID09PSBcIj1cIikge1xuICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgIHN0YXRlLmxocyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmICghc3RhdGUubGhzICYmIHN0cmVhbS5tYXRjaCgvXlxcZFxcZFxcZFxcZFtcXGRcXC1cXDpcXC5UXSpaLykpIHtcbiAgICAgIHJldHVybiAnYXRvbSc7IC8vZGF0ZVxuICAgIH0gZWxzZSBpZiAoIXN0YXRlLmxocyAmJiAoc3RyZWFtLm1hdGNoKCd0cnVlJykgfHwgc3RyZWFtLm1hdGNoKCdmYWxzZScpKSkge1xuICAgICAgcmV0dXJuICdhdG9tJztcbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5saHMgJiYgc3RyZWFtLnBlZWsoKSA9PT0gJ1snKSB7XG4gICAgICBzdGF0ZS5pbkFycmF5Kys7XG4gICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgcmV0dXJuICdicmFja2V0JztcbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5saHMgJiYgc3RyZWFtLm1hdGNoKC9eXFwtP1xcZCsoPzpcXC5cXGQrKT8vKSkge1xuICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgIH0gZWxzZSBpZiAoIXN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgICBzdHJlYW0ubmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgY29tbWVudFRva2VuczogeyBsaW5lOiAnIycgfSxcbiAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///431\n")}}]);