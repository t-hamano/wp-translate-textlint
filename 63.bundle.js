(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[63],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/octave.js":
/*!**************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/octave.js ***!
  \**************************************************************/
/*! exports provided: octave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"octave\", function() { return octave; });\nfunction wordRegexp(words) {\n  return new RegExp(\"^((\" + words.join(\")|(\") + \"))\\\\b\");\n}\n\nvar singleOperators = new RegExp(\"^[\\\\+\\\\-\\\\*/&|\\\\^~<>!@'\\\\\\\\]\");\nvar singleDelimiters = new RegExp('^[\\\\(\\\\[\\\\{\\\\},:=;\\\\.]');\nvar doubleOperators = new RegExp(\"^((==)|(~=)|(<=)|(>=)|(<<)|(>>)|(\\\\.[\\\\+\\\\-\\\\*/\\\\^\\\\\\\\]))\");\nvar doubleDelimiters = new RegExp(\"^((!=)|(\\\\+=)|(\\\\-=)|(\\\\*=)|(/=)|(&=)|(\\\\|=)|(\\\\^=))\");\nvar tripleDelimiters = new RegExp(\"^((>>=)|(<<=))\");\nvar expressionEnd = new RegExp(\"^[\\\\]\\\\)]\");\nvar identifiers = new RegExp(\"^[_A-Za-z\\xa1-\\uffff][_A-Za-z0-9\\xa1-\\uffff]*\");\n\nvar builtins = wordRegexp([\n  'error', 'eval', 'function', 'abs', 'acos', 'atan', 'asin', 'cos',\n  'cosh', 'exp', 'log', 'prod', 'sum', 'log10', 'max', 'min', 'sign', 'sin', 'sinh',\n  'sqrt', 'tan', 'reshape', 'break', 'zeros', 'default', 'margin', 'round', 'ones',\n  'rand', 'syn', 'ceil', 'floor', 'size', 'clear', 'zeros', 'eye', 'mean', 'std', 'cov',\n  'det', 'eig', 'inv', 'norm', 'rank', 'trace', 'expm', 'logm', 'sqrtm', 'linspace', 'plot',\n  'title', 'xlabel', 'ylabel', 'legend', 'text', 'grid', 'meshgrid', 'mesh', 'num2str',\n  'fft', 'ifft', 'arrayfun', 'cellfun', 'input', 'fliplr', 'flipud', 'ismember'\n]);\n\nvar keywords = wordRegexp([\n  'return', 'case', 'switch', 'else', 'elseif', 'end', 'endif', 'endfunction',\n  'if', 'otherwise', 'do', 'for', 'while', 'try', 'catch', 'classdef', 'properties', 'events',\n  'methods', 'global', 'persistent', 'endfor', 'endwhile', 'printf', 'sprintf', 'disp', 'until',\n  'continue', 'pkg'\n]);\n\n\n// tokenizers\nfunction tokenTranspose(stream, state) {\n  if (!stream.sol() && stream.peek() === '\\'') {\n    stream.next();\n    state.tokenize = tokenBase;\n    return 'operator';\n  }\n  state.tokenize = tokenBase;\n  return tokenBase(stream, state);\n}\n\n\nfunction tokenComment(stream, state) {\n  if (stream.match(/^.*%}/)) {\n    state.tokenize = tokenBase;\n    return 'comment';\n  };\n  stream.skipToEnd();\n  return 'comment';\n}\n\nfunction tokenBase(stream, state) {\n  // whitespaces\n  if (stream.eatSpace()) return null;\n\n  // Handle one line Comments\n  if (stream.match('%{')){\n    state.tokenize = tokenComment;\n    stream.skipToEnd();\n    return 'comment';\n  }\n\n  if (stream.match(/^[%#]/)){\n    stream.skipToEnd();\n    return 'comment';\n  }\n\n  // Handle Number Literals\n  if (stream.match(/^[0-9\\.+-]/, false)) {\n    if (stream.match(/^[+-]?0x[0-9a-fA-F]+[ij]?/)) {\n      stream.tokenize = tokenBase;\n      return 'number'; };\n    if (stream.match(/^[+-]?\\d*\\.\\d+([EeDd][+-]?\\d+)?[ij]?/)) { return 'number'; };\n    if (stream.match(/^[+-]?\\d+([EeDd][+-]?\\d+)?[ij]?/)) { return 'number'; };\n  }\n  if (stream.match(wordRegexp(['nan','NaN','inf','Inf']))) { return 'number'; };\n\n  // Handle Strings\n  var m = stream.match(/^\"(?:[^\"]|\"\")*(\"|$)/) || stream.match(/^'(?:[^']|'')*('|$)/)\n  if (m) { return m[1] ? 'string' : \"error\"; }\n\n  // Handle words\n  if (stream.match(keywords)) { return 'keyword'; } ;\n  if (stream.match(builtins)) { return 'builtin'; } ;\n  if (stream.match(identifiers)) { return 'variable'; } ;\n\n  if (stream.match(singleOperators) || stream.match(doubleOperators)) { return 'operator'; };\n  if (stream.match(singleDelimiters) || stream.match(doubleDelimiters) || stream.match(tripleDelimiters)) { return null; };\n\n  if (stream.match(expressionEnd)) {\n    state.tokenize = tokenTranspose;\n    return null;\n  };\n\n\n  // Handle non-detected items\n  stream.next();\n  return 'error';\n};\n\n\nconst octave = {\n  startState: function() {\n    return {\n      tokenize: tokenBase\n    };\n  },\n\n  token: function(stream, state) {\n    var style = state.tokenize(stream, state);\n    if (style === 'number' || style === 'variable'){\n      state.tokenize = tokenTranspose;\n    }\n    return style;\n  },\n\n  languageData: {\n    commentTokens: {line: \"%\"}\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvb2N0YXZlLmpzP2M5NmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxHQUFHLElBQUk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QiwrREFBK0QsaUJBQWlCO0FBQ2hGLDBEQUEwRCxpQkFBaUI7QUFDM0U7QUFDQSw0REFBNEQsaUJBQWlCOztBQUU3RTtBQUNBO0FBQ0EsVUFBVSxrQ0FBa0M7O0FBRTVDO0FBQ0EsK0JBQStCLGtCQUFrQixFQUFFO0FBQ25ELCtCQUErQixrQkFBa0IsRUFBRTtBQUNuRCxrQ0FBa0MsbUJBQW1CLEVBQUU7O0FBRXZELHVFQUF1RSxtQkFBbUI7QUFDMUYsMkdBQTJHLGFBQWE7O0FBRXhIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL0Bjb2RlbWlycm9yL2xlZ2FjeS1tb2Rlcy9tb2RlL29jdGF2ZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRSZWdleHAod29yZHMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKChcIiArIHdvcmRzLmpvaW4oXCIpfChcIikgKyBcIikpXFxcXGJcIik7XG59XG5cbnZhciBzaW5nbGVPcGVyYXRvcnMgPSBuZXcgUmVnRXhwKFwiXltcXFxcK1xcXFwtXFxcXCovJnxcXFxcXn48PiFAJ1xcXFxcXFxcXVwiKTtcbnZhciBzaW5nbGVEZWxpbWl0ZXJzID0gbmV3IFJlZ0V4cCgnXltcXFxcKFxcXFxbXFxcXHtcXFxcfSw6PTtcXFxcLl0nKTtcbnZhciBkb3VibGVPcGVyYXRvcnMgPSBuZXcgUmVnRXhwKFwiXigoPT0pfCh+PSl8KDw9KXwoPj0pfCg8PCl8KD4+KXwoXFxcXC5bXFxcXCtcXFxcLVxcXFwqL1xcXFxeXFxcXFxcXFxdKSlcIik7XG52YXIgZG91YmxlRGVsaW1pdGVycyA9IG5ldyBSZWdFeHAoXCJeKCghPSl8KFxcXFwrPSl8KFxcXFwtPSl8KFxcXFwqPSl8KC89KXwoJj0pfChcXFxcfD0pfChcXFxcXj0pKVwiKTtcbnZhciB0cmlwbGVEZWxpbWl0ZXJzID0gbmV3IFJlZ0V4cChcIl4oKD4+PSl8KDw8PSkpXCIpO1xudmFyIGV4cHJlc3Npb25FbmQgPSBuZXcgUmVnRXhwKFwiXltcXFxcXVxcXFwpXVwiKTtcbnZhciBpZGVudGlmaWVycyA9IG5ldyBSZWdFeHAoXCJeW19BLVphLXpcXHhhMS1cXHVmZmZmXVtfQS1aYS16MC05XFx4YTEtXFx1ZmZmZl0qXCIpO1xuXG52YXIgYnVpbHRpbnMgPSB3b3JkUmVnZXhwKFtcbiAgJ2Vycm9yJywgJ2V2YWwnLCAnZnVuY3Rpb24nLCAnYWJzJywgJ2Fjb3MnLCAnYXRhbicsICdhc2luJywgJ2NvcycsXG4gICdjb3NoJywgJ2V4cCcsICdsb2cnLCAncHJvZCcsICdzdW0nLCAnbG9nMTAnLCAnbWF4JywgJ21pbicsICdzaWduJywgJ3NpbicsICdzaW5oJyxcbiAgJ3NxcnQnLCAndGFuJywgJ3Jlc2hhcGUnLCAnYnJlYWsnLCAnemVyb3MnLCAnZGVmYXVsdCcsICdtYXJnaW4nLCAncm91bmQnLCAnb25lcycsXG4gICdyYW5kJywgJ3N5bicsICdjZWlsJywgJ2Zsb29yJywgJ3NpemUnLCAnY2xlYXInLCAnemVyb3MnLCAnZXllJywgJ21lYW4nLCAnc3RkJywgJ2NvdicsXG4gICdkZXQnLCAnZWlnJywgJ2ludicsICdub3JtJywgJ3JhbmsnLCAndHJhY2UnLCAnZXhwbScsICdsb2dtJywgJ3NxcnRtJywgJ2xpbnNwYWNlJywgJ3Bsb3QnLFxuICAndGl0bGUnLCAneGxhYmVsJywgJ3lsYWJlbCcsICdsZWdlbmQnLCAndGV4dCcsICdncmlkJywgJ21lc2hncmlkJywgJ21lc2gnLCAnbnVtMnN0cicsXG4gICdmZnQnLCAnaWZmdCcsICdhcnJheWZ1bicsICdjZWxsZnVuJywgJ2lucHV0JywgJ2ZsaXBscicsICdmbGlwdWQnLCAnaXNtZW1iZXInXG5dKTtcblxudmFyIGtleXdvcmRzID0gd29yZFJlZ2V4cChbXG4gICdyZXR1cm4nLCAnY2FzZScsICdzd2l0Y2gnLCAnZWxzZScsICdlbHNlaWYnLCAnZW5kJywgJ2VuZGlmJywgJ2VuZGZ1bmN0aW9uJyxcbiAgJ2lmJywgJ290aGVyd2lzZScsICdkbycsICdmb3InLCAnd2hpbGUnLCAndHJ5JywgJ2NhdGNoJywgJ2NsYXNzZGVmJywgJ3Byb3BlcnRpZXMnLCAnZXZlbnRzJyxcbiAgJ21ldGhvZHMnLCAnZ2xvYmFsJywgJ3BlcnNpc3RlbnQnLCAnZW5kZm9yJywgJ2VuZHdoaWxlJywgJ3ByaW50ZicsICdzcHJpbnRmJywgJ2Rpc3AnLCAndW50aWwnLFxuICAnY29udGludWUnLCAncGtnJ1xuXSk7XG5cblxuLy8gdG9rZW5pemVyc1xuZnVuY3Rpb24gdG9rZW5UcmFuc3Bvc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoIXN0cmVhbS5zb2woKSAmJiBzdHJlYW0ucGVlaygpID09PSAnXFwnJykge1xuICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgcmV0dXJuICdvcGVyYXRvcic7XG4gIH1cbiAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gIHJldHVybiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSk7XG59XG5cblxuZnVuY3Rpb24gdG9rZW5Db21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5tYXRjaCgvXi4qJX0vKSkge1xuICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgIHJldHVybiAnY29tbWVudCc7XG4gIH07XG4gIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgcmV0dXJuICdjb21tZW50Jztcbn1cblxuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgLy8gd2hpdGVzcGFjZXNcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcblxuICAvLyBIYW5kbGUgb25lIGxpbmUgQ29tbWVudHNcbiAgaWYgKHN0cmVhbS5tYXRjaCgnJXsnKSl7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkNvbW1lbnQ7XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiAnY29tbWVudCc7XG4gIH1cblxuICBpZiAoc3RyZWFtLm1hdGNoKC9eWyUjXS8pKXtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuICdjb21tZW50JztcbiAgfVxuXG4gIC8vIEhhbmRsZSBOdW1iZXIgTGl0ZXJhbHNcbiAgaWYgKHN0cmVhbS5tYXRjaCgvXlswLTlcXC4rLV0vLCBmYWxzZSkpIHtcbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eWystXT8weFswLTlhLWZBLUZdK1tpal0/LykpIHtcbiAgICAgIHN0cmVhbS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgIHJldHVybiAnbnVtYmVyJzsgfTtcbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eWystXT9cXGQqXFwuXFxkKyhbRWVEZF1bKy1dP1xcZCspP1tpal0/LykpIHsgcmV0dXJuICdudW1iZXInOyB9O1xuICAgIGlmIChzdHJlYW0ubWF0Y2goL15bKy1dP1xcZCsoW0VlRGRdWystXT9cXGQrKT9baWpdPy8pKSB7IHJldHVybiAnbnVtYmVyJzsgfTtcbiAgfVxuICBpZiAoc3RyZWFtLm1hdGNoKHdvcmRSZWdleHAoWyduYW4nLCdOYU4nLCdpbmYnLCdJbmYnXSkpKSB7IHJldHVybiAnbnVtYmVyJzsgfTtcblxuICAvLyBIYW5kbGUgU3RyaW5nc1xuICB2YXIgbSA9IHN0cmVhbS5tYXRjaCgvXlwiKD86W15cIl18XCJcIikqKFwifCQpLykgfHwgc3RyZWFtLm1hdGNoKC9eJyg/OlteJ118JycpKignfCQpLylcbiAgaWYgKG0pIHsgcmV0dXJuIG1bMV0gPyAnc3RyaW5nJyA6IFwiZXJyb3JcIjsgfVxuXG4gIC8vIEhhbmRsZSB3b3Jkc1xuICBpZiAoc3RyZWFtLm1hdGNoKGtleXdvcmRzKSkgeyByZXR1cm4gJ2tleXdvcmQnOyB9IDtcbiAgaWYgKHN0cmVhbS5tYXRjaChidWlsdGlucykpIHsgcmV0dXJuICdidWlsdGluJzsgfSA7XG4gIGlmIChzdHJlYW0ubWF0Y2goaWRlbnRpZmllcnMpKSB7IHJldHVybiAndmFyaWFibGUnOyB9IDtcblxuICBpZiAoc3RyZWFtLm1hdGNoKHNpbmdsZU9wZXJhdG9ycykgfHwgc3RyZWFtLm1hdGNoKGRvdWJsZU9wZXJhdG9ycykpIHsgcmV0dXJuICdvcGVyYXRvcic7IH07XG4gIGlmIChzdHJlYW0ubWF0Y2goc2luZ2xlRGVsaW1pdGVycykgfHwgc3RyZWFtLm1hdGNoKGRvdWJsZURlbGltaXRlcnMpIHx8IHN0cmVhbS5tYXRjaCh0cmlwbGVEZWxpbWl0ZXJzKSkgeyByZXR1cm4gbnVsbDsgfTtcblxuICBpZiAoc3RyZWFtLm1hdGNoKGV4cHJlc3Npb25FbmQpKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblRyYW5zcG9zZTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuXG4gIC8vIEhhbmRsZSBub24tZGV0ZWN0ZWQgaXRlbXNcbiAgc3RyZWFtLm5leHQoKTtcbiAgcmV0dXJuICdlcnJvcic7XG59O1xuXG5cbmV4cG9ydCBjb25zdCBvY3RhdmUgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbml6ZTogdG9rZW5CYXNlXG4gICAgfTtcbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICAgIGlmIChzdHlsZSA9PT0gJ251bWJlcicgfHwgc3R5bGUgPT09ICd2YXJpYWJsZScpe1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblRyYW5zcG9zZTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGNvbW1lbnRUb2tlbnM6IHtsaW5lOiBcIiVcIn1cbiAgfVxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/octave.js\n");

/***/ })

}]);