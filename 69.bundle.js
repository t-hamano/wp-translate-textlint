(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/properties.js":
/*!******************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/properties.js ***!
  \******************************************************************/
/*! exports provided: properties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"properties\", function() { return properties; });\nconst properties = {\n  token: function(stream, state) {\n    var sol = stream.sol() || state.afterSection;\n    var eol = stream.eol();\n\n    state.afterSection = false;\n\n    if (sol) {\n      if (state.nextMultiline) {\n        state.inMultiline = true;\n        state.nextMultiline = false;\n      } else {\n        state.position = \"def\";\n      }\n    }\n\n    if (eol && ! state.nextMultiline) {\n      state.inMultiline = false;\n      state.position = \"def\";\n    }\n\n    if (sol) {\n      while(stream.eatSpace()) {}\n    }\n\n    var ch = stream.next();\n\n    if (sol && (ch === \"#\" || ch === \"!\" || ch === \";\")) {\n      state.position = \"comment\";\n      stream.skipToEnd();\n      return \"comment\";\n    } else if (sol && ch === \"[\") {\n      state.afterSection = true;\n      stream.skipTo(\"]\"); stream.eat(\"]\");\n      return \"header\";\n    } else if (ch === \"=\" || ch === \":\") {\n      state.position = \"quote\";\n      return null;\n    } else if (ch === \"\\\\\" && state.position === \"quote\") {\n      if (stream.eol()) {  // end of line?\n        // Multiline value\n        state.nextMultiline = true;\n      }\n    }\n\n    return state.position;\n  },\n\n  startState: function() {\n    return {\n      position : \"def\",       // Current position, \"def\", \"quote\" or \"comment\"\n      nextMultiline : false,  // Is the next line multiline value\n      inMultiline : false,    // Is the current line a multiline value\n      afterSection : false    // Did we just open a section\n    };\n  }\n\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/properties.js?");

/***/ })

}]);