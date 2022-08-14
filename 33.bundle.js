(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/diff.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/diff.js ***!
  \************************************************************/
/*! exports provided: diff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"diff\", function() { return diff; });\nvar TOKEN_NAMES = {\n  '+': 'inserted',\n  '-': 'deleted',\n  '@': 'meta'\n};\n\nconst diff = {\n  token: function(stream) {\n    var tw_pos = stream.string.search(/[\\t ]+?$/);\n\n    if (!stream.sol() || tw_pos === 0) {\n      stream.skipToEnd();\n      return (\"error \" + (\n        TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');\n    }\n\n    var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();\n\n    if (tw_pos === -1) {\n      stream.skipToEnd();\n    } else {\n      stream.pos = tw_pos;\n    }\n\n    return token_name;\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZGlmZi5qcz84NTM5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZGlmZi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBUT0tFTl9OQU1FUyA9IHtcbiAgJysnOiAnaW5zZXJ0ZWQnLFxuICAnLSc6ICdkZWxldGVkJyxcbiAgJ0AnOiAnbWV0YSdcbn07XG5cbmV4cG9ydCBjb25zdCBkaWZmID0ge1xuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIHR3X3BvcyA9IHN0cmVhbS5zdHJpbmcuc2VhcmNoKC9bXFx0IF0rPyQvKTtcblxuICAgIGlmICghc3RyZWFtLnNvbCgpIHx8IHR3X3BvcyA9PT0gMCkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuIChcImVycm9yIFwiICsgKFxuICAgICAgICBUT0tFTl9OQU1FU1tzdHJlYW0uc3RyaW5nLmNoYXJBdCgwKV0gfHwgJycpKS5yZXBsYWNlKC8gJC8sICcnKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW5fbmFtZSA9IFRPS0VOX05BTUVTW3N0cmVhbS5wZWVrKCldIHx8IHN0cmVhbS5za2lwVG9FbmQoKTtcblxuICAgIGlmICh0d19wb3MgPT09IC0xKSB7XG4gICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmVhbS5wb3MgPSB0d19wb3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VuX25hbWU7XG4gIH1cbn07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/diff.js\n");

/***/ })

}]);