(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/asciiarmor.js":
/*!******************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/asciiarmor.js ***!
  \******************************************************************/
/*! exports provided: asciiArmor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"asciiArmor\", function() { return asciiArmor; });\nfunction errorIfNotEmpty(stream) {\n  var nonWS = stream.match(/^\\s*\\S/);\n  stream.skipToEnd();\n  return nonWS ? \"error\" : null;\n}\n\nconst asciiArmor = {\n  token: function(stream, state) {\n    var m;\n    if (state.state == \"top\") {\n      if (stream.sol() && (m = stream.match(/^-----BEGIN (.*)?-----\\s*$/))) {\n        state.state = \"headers\";\n        state.type = m[1];\n        return \"tag\";\n      }\n      return errorIfNotEmpty(stream);\n    } else if (state.state == \"headers\") {\n      if (stream.sol() && stream.match(/^\\w+:/)) {\n        state.state = \"header\";\n        return \"atom\";\n      } else {\n        var result = errorIfNotEmpty(stream);\n        if (result) state.state = \"body\";\n        return result;\n      }\n    } else if (state.state == \"header\") {\n      stream.skipToEnd();\n      state.state = \"headers\";\n      return \"string\";\n    } else if (state.state == \"body\") {\n      if (stream.sol() && (m = stream.match(/^-----END (.*)?-----\\s*$/))) {\n        if (m[1] != state.type) return \"error\";\n        state.state = \"end\";\n        return \"tag\";\n      } else {\n        if (stream.eatWhile(/[A-Za-z0-9+\\/=]/)) {\n          return null;\n        } else {\n          stream.next();\n          return \"error\";\n        }\n      }\n    } else if (state.state == \"end\") {\n      return errorIfNotEmpty(stream);\n    }\n  },\n  blankLine: function(state) {\n    if (state.state == \"headers\") state.state = \"body\";\n  },\n  startState: function() {\n    return {state: \"top\", type: null};\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/asciiarmor.js?");

/***/ })

}]);