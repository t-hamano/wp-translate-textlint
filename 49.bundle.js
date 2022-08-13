(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/http.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/http.js ***!
  \************************************************************/
/*! exports provided: http */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"http\", function() { return http; });\nfunction failFirstLine(stream, state) {\n  stream.skipToEnd();\n  state.cur = header;\n  return \"error\";\n}\n\nfunction start(stream, state) {\n  if (stream.match(/^HTTP\\/\\d\\.\\d/)) {\n    state.cur = responseStatusCode;\n    return \"keyword\";\n  } else if (stream.match(/^[A-Z]+/) && /[ \\t]/.test(stream.peek())) {\n    state.cur = requestPath;\n    return \"keyword\";\n  } else {\n    return failFirstLine(stream, state);\n  }\n}\n\nfunction responseStatusCode(stream, state) {\n  var code = stream.match(/^\\d+/);\n  if (!code) return failFirstLine(stream, state);\n\n  state.cur = responseStatusText;\n  var status = Number(code[0]);\n  if (status >= 100 && status < 400) {\n    return \"atom\";\n  } else {\n    return \"error\";\n  }\n}\n\nfunction responseStatusText(stream, state) {\n  stream.skipToEnd();\n  state.cur = header;\n  return null;\n}\n\nfunction requestPath(stream, state) {\n  stream.eatWhile(/\\S/);\n  state.cur = requestProtocol;\n  return \"string.special\";\n}\n\nfunction requestProtocol(stream, state) {\n  if (stream.match(/^HTTP\\/\\d\\.\\d$/)) {\n    state.cur = header;\n    return \"keyword\";\n  } else {\n    return failFirstLine(stream, state);\n  }\n}\n\nfunction header(stream) {\n  if (stream.sol() && !stream.eat(/[ \\t]/)) {\n    if (stream.match(/^.*?:/)) {\n      return \"atom\";\n    } else {\n      stream.skipToEnd();\n      return \"error\";\n    }\n  } else {\n    stream.skipToEnd();\n    return \"string\";\n  }\n}\n\nfunction body(stream) {\n  stream.skipToEnd();\n  return null;\n}\n\nconst http = {\n  token: function(stream, state) {\n    var cur = state.cur;\n    if (cur != header && cur != body && stream.eatSpace()) return null;\n    return cur(stream, state);\n  },\n\n  blankLine: function(state) {\n    state.cur = body;\n  },\n\n  startState: function() {\n    return {cur: start};\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/http.js?");

/***/ })

}]);