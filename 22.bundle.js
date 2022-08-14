(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/asciiarmor.js":
/*!******************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/asciiarmor.js ***!
  \******************************************************************/
/*! exports provided: asciiArmor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"asciiArmor\", function() { return asciiArmor; });\nfunction errorIfNotEmpty(stream) {\n  var nonWS = stream.match(/^\\s*\\S/);\n  stream.skipToEnd();\n  return nonWS ? \"error\" : null;\n}\n\nconst asciiArmor = {\n  token: function(stream, state) {\n    var m;\n    if (state.state == \"top\") {\n      if (stream.sol() && (m = stream.match(/^-----BEGIN (.*)?-----\\s*$/))) {\n        state.state = \"headers\";\n        state.type = m[1];\n        return \"tag\";\n      }\n      return errorIfNotEmpty(stream);\n    } else if (state.state == \"headers\") {\n      if (stream.sol() && stream.match(/^\\w+:/)) {\n        state.state = \"header\";\n        return \"atom\";\n      } else {\n        var result = errorIfNotEmpty(stream);\n        if (result) state.state = \"body\";\n        return result;\n      }\n    } else if (state.state == \"header\") {\n      stream.skipToEnd();\n      state.state = \"headers\";\n      return \"string\";\n    } else if (state.state == \"body\") {\n      if (stream.sol() && (m = stream.match(/^-----END (.*)?-----\\s*$/))) {\n        if (m[1] != state.type) return \"error\";\n        state.state = \"end\";\n        return \"tag\";\n      } else {\n        if (stream.eatWhile(/[A-Za-z0-9+\\/=]/)) {\n          return null;\n        } else {\n          stream.next();\n          return \"error\";\n        }\n      }\n    } else if (state.state == \"end\") {\n      return errorIfNotEmpty(stream);\n    }\n  },\n  blankLine: function(state) {\n    if (state.state == \"headers\") state.state = \"body\";\n  },\n  startState: function() {\n    return {state: \"top\", type: null};\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvYXNjaWlhcm1vci5qcz9mN2EzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxZQUFZO0FBQ1o7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AY29kZW1pcnJvci9sZWdhY3ktbW9kZXMvbW9kZS9hc2NpaWFybW9yLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZXJyb3JJZk5vdEVtcHR5KHN0cmVhbSkge1xuICB2YXIgbm9uV1MgPSBzdHJlYW0ubWF0Y2goL15cXHMqXFxTLyk7XG4gIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgcmV0dXJuIG5vbldTID8gXCJlcnJvclwiIDogbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGFzY2lpQXJtb3IgPSB7XG4gIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKHN0YXRlLnN0YXRlID09IFwidG9wXCIpIHtcbiAgICAgIGlmIChzdHJlYW0uc29sKCkgJiYgKG0gPSBzdHJlYW0ubWF0Y2goL14tLS0tLUJFR0lOICguKik/LS0tLS1cXHMqJC8pKSkge1xuICAgICAgICBzdGF0ZS5zdGF0ZSA9IFwiaGVhZGVyc1wiO1xuICAgICAgICBzdGF0ZS50eXBlID0gbVsxXTtcbiAgICAgICAgcmV0dXJuIFwidGFnXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JJZk5vdEVtcHR5KHN0cmVhbSk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5zdGF0ZSA9PSBcImhlYWRlcnNcIikge1xuICAgICAgaWYgKHN0cmVhbS5zb2woKSAmJiBzdHJlYW0ubWF0Y2goL15cXHcrOi8pKSB7XG4gICAgICAgIHN0YXRlLnN0YXRlID0gXCJoZWFkZXJcIjtcbiAgICAgICAgcmV0dXJuIFwiYXRvbVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGVycm9ySWZOb3RFbXB0eShzdHJlYW0pO1xuICAgICAgICBpZiAocmVzdWx0KSBzdGF0ZS5zdGF0ZSA9IFwiYm9keVwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUuc3RhdGUgPT0gXCJoZWFkZXJcIikge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgc3RhdGUuc3RhdGUgPSBcImhlYWRlcnNcIjtcbiAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUuc3RhdGUgPT0gXCJib2R5XCIpIHtcbiAgICAgIGlmIChzdHJlYW0uc29sKCkgJiYgKG0gPSBzdHJlYW0ubWF0Y2goL14tLS0tLUVORCAoLiopPy0tLS0tXFxzKiQvKSkpIHtcbiAgICAgICAgaWYgKG1bMV0gIT0gc3RhdGUudHlwZSkgcmV0dXJuIFwiZXJyb3JcIjtcbiAgICAgICAgc3RhdGUuc3RhdGUgPSBcImVuZFwiO1xuICAgICAgICByZXR1cm4gXCJ0YWdcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdHJlYW0uZWF0V2hpbGUoL1tBLVphLXowLTkrXFwvPV0vKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgcmV0dXJuIFwiZXJyb3JcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhdGUuc3RhdGUgPT0gXCJlbmRcIikge1xuICAgICAgcmV0dXJuIGVycm9ySWZOb3RFbXB0eShzdHJlYW0pO1xuICAgIH1cbiAgfSxcbiAgYmxhbmtMaW5lOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zdGF0ZSA9PSBcImhlYWRlcnNcIikgc3RhdGUuc3RhdGUgPSBcImJvZHlcIjtcbiAgfSxcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtzdGF0ZTogXCJ0b3BcIiwgdHlwZTogbnVsbH07XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/asciiarmor.js\n");

/***/ })

}]);