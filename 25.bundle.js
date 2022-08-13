(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/brainfuck.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/brainfuck.js ***!
  \*****************************************************************/
/*! exports provided: brainfuck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"brainfuck\", function() { return brainfuck; });\nvar reserve = \"><+-.,[]\".split(\"\");\n/*\n  comments can be either:\n  placed behind lines\n\n  +++    this is a comment\n\n  where reserved characters cannot be used\n  or in a loop\n  [\n  this is ok to use [ ] and stuff\n  ]\n  or preceded by #\n*/\nconst brainfuck = {\n  startState: function() {\n    return {\n      commentLine: false,\n      left: 0,\n      right: 0,\n      commentLoop: false\n    }\n  },\n  token: function(stream, state) {\n    if (stream.eatSpace()) return null\n    if(stream.sol()){\n      state.commentLine = false;\n    }\n    var ch = stream.next().toString();\n    if(reserve.indexOf(ch) !== -1){\n      if(state.commentLine === true){\n        if(stream.eol()){\n          state.commentLine = false;\n        }\n        return \"comment\";\n      }\n      if(ch === \"]\" || ch === \"[\"){\n        if(ch === \"[\"){\n          state.left++;\n        }\n        else{\n          state.right++;\n        }\n        return \"bracket\";\n      }\n      else if(ch === \"+\" || ch === \"-\"){\n        return \"keyword\";\n      }\n      else if(ch === \"<\" || ch === \">\"){\n        return \"atom\";\n      }\n      else if(ch === \".\" || ch === \",\"){\n        return \"def\";\n      }\n    }\n    else{\n      state.commentLine = true;\n      if(stream.eol()){\n        state.commentLine = false;\n      }\n      return \"comment\";\n    }\n    if(stream.eol()){\n      state.commentLine = false;\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/brainfuck.js?");

/***/ })

}]);