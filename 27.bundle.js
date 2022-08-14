(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{364:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cmake\", function() { return cmake; });\nvar variable_regex = /({)?[a-zA-Z0-9_]+(})?/;\n\nfunction tokenString(stream, state) {\n  var current, prev, found_var = false;\n  while (!stream.eol() && (current = stream.next()) != state.pending) {\n    if (current === '$' && prev != '\\\\' && state.pending == '\"') {\n      found_var = true;\n      break;\n    }\n    prev = current;\n  }\n  if (found_var) {\n    stream.backUp(1);\n  }\n  if (current == state.pending) {\n    state.continueString = false;\n  } else {\n    state.continueString = true;\n  }\n  return \"string\";\n}\n\nfunction tokenize(stream, state) {\n  var ch = stream.next();\n\n  // Have we found a variable?\n  if (ch === '$') {\n    if (stream.match(variable_regex)) {\n      return 'variableName.special';\n    }\n    return 'variable';\n  }\n  // Should we still be looking for the end of a string?\n  if (state.continueString) {\n    // If so, go through the loop again\n    stream.backUp(1);\n    return tokenString(stream, state);\n  }\n  // Do we just have a function on our hands?\n  // In 'cmake_minimum_required (VERSION 2.8.8)', 'cmake_minimum_required' is matched\n  if (stream.match(/(\\s+)?\\w+\\(/) || stream.match(/(\\s+)?\\w+\\ \\(/)) {\n    stream.backUp(1);\n    return 'def';\n  }\n  if (ch == \"#\") {\n    stream.skipToEnd();\n    return \"comment\";\n  }\n  // Have we found a string?\n  if (ch == \"'\" || ch == '\"') {\n    // Store the type (single or double)\n    state.pending = ch;\n    // Perform the looping function to find the end\n    return tokenString(stream, state);\n  }\n  if (ch == '(' || ch == ')') {\n    return 'bracket';\n  }\n  if (ch.match(/[0-9]/)) {\n    return 'number';\n  }\n  stream.eatWhile(/[\\w-]/);\n  return null;\n}\nconst cmake = {\n  startState: function () {\n    var state = {};\n    state.inDefinition = false;\n    state.inInclude = false;\n    state.continueString = false;\n    state.pending = false;\n    return state;\n  },\n  token: function (stream, state) {\n    if (stream.eatSpace()) return null;\n    return tokenize(stream, state);\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvY21ha2UuanM/NDQ3YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUEsd0JBQXdCLGlCQUFpQjs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIzNjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdmFyaWFibGVfcmVnZXggPSAvKHspP1thLXpBLVowLTlfXSsofSk/LztcblxuZnVuY3Rpb24gdG9rZW5TdHJpbmcoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY3VycmVudCwgcHJldiwgZm91bmRfdmFyID0gZmFsc2U7XG4gIHdoaWxlICghc3RyZWFtLmVvbCgpICYmIChjdXJyZW50ID0gc3RyZWFtLm5leHQoKSkgIT0gc3RhdGUucGVuZGluZykge1xuICAgIGlmIChjdXJyZW50ID09PSAnJCcgJiYgcHJldiAhPSAnXFxcXCcgJiYgc3RhdGUucGVuZGluZyA9PSAnXCInKSB7XG4gICAgICBmb3VuZF92YXIgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHByZXYgPSBjdXJyZW50O1xuICB9XG4gIGlmIChmb3VuZF92YXIpIHtcbiAgICBzdHJlYW0uYmFja1VwKDEpO1xuICB9XG4gIGlmIChjdXJyZW50ID09IHN0YXRlLnBlbmRpbmcpIHtcbiAgICBzdGF0ZS5jb250aW51ZVN0cmluZyA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmNvbnRpbnVlU3RyaW5nID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gXCJzdHJpbmdcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuXG4gIC8vIEhhdmUgd2UgZm91bmQgYSB2YXJpYWJsZT9cbiAgaWYgKGNoID09PSAnJCcpIHtcbiAgICBpZiAoc3RyZWFtLm1hdGNoKHZhcmlhYmxlX3JlZ2V4KSkge1xuICAgICAgcmV0dXJuICd2YXJpYWJsZU5hbWUuc3BlY2lhbCc7XG4gICAgfVxuICAgIHJldHVybiAndmFyaWFibGUnO1xuICB9XG4gIC8vIFNob3VsZCB3ZSBzdGlsbCBiZSBsb29raW5nIGZvciB0aGUgZW5kIG9mIGEgc3RyaW5nP1xuICBpZiAoc3RhdGUuY29udGludWVTdHJpbmcpIHtcbiAgICAvLyBJZiBzbywgZ28gdGhyb3VnaCB0aGUgbG9vcCBhZ2FpblxuICAgIHN0cmVhbS5iYWNrVXAoMSk7XG4gICAgcmV0dXJuIHRva2VuU3RyaW5nKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIC8vIERvIHdlIGp1c3QgaGF2ZSBhIGZ1bmN0aW9uIG9uIG91ciBoYW5kcz9cbiAgLy8gSW4gJ2NtYWtlX21pbmltdW1fcmVxdWlyZWQgKFZFUlNJT04gMi44LjgpJywgJ2NtYWtlX21pbmltdW1fcmVxdWlyZWQnIGlzIG1hdGNoZWRcbiAgaWYgKHN0cmVhbS5tYXRjaCgvKFxccyspP1xcdytcXCgvKSB8fCBzdHJlYW0ubWF0Y2goLyhcXHMrKT9cXHcrXFwgXFwoLykpIHtcbiAgICBzdHJlYW0uYmFja1VwKDEpO1xuICAgIHJldHVybiAnZGVmJztcbiAgfVxuICBpZiAoY2ggPT0gXCIjXCIpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICB9XG4gIC8vIEhhdmUgd2UgZm91bmQgYSBzdHJpbmc/XG4gIGlmIChjaCA9PSBcIidcIiB8fCBjaCA9PSAnXCInKSB7XG4gICAgLy8gU3RvcmUgdGhlIHR5cGUgKHNpbmdsZSBvciBkb3VibGUpXG4gICAgc3RhdGUucGVuZGluZyA9IGNoO1xuICAgIC8vIFBlcmZvcm0gdGhlIGxvb3BpbmcgZnVuY3Rpb24gdG8gZmluZCB0aGUgZW5kXG4gICAgcmV0dXJuIHRva2VuU3RyaW5nKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmIChjaCA9PSAnKCcgfHwgY2ggPT0gJyknKSB7XG4gICAgcmV0dXJuICdicmFja2V0JztcbiAgfVxuICBpZiAoY2gubWF0Y2goL1swLTldLykpIHtcbiAgICByZXR1cm4gJ251bWJlcic7XG4gIH1cbiAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3LV0vKTtcbiAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgY29uc3QgY21ha2UgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSB7fTtcbiAgICBzdGF0ZS5pbkRlZmluaXRpb24gPSBmYWxzZTtcbiAgICBzdGF0ZS5pbkluY2x1ZGUgPSBmYWxzZTtcbiAgICBzdGF0ZS5jb250aW51ZVN0cmluZyA9IGZhbHNlO1xuICAgIHN0YXRlLnBlbmRpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG4gIHRva2VuOiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG59O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///364\n")}}]);