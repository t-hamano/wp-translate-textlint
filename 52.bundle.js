(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/jinja2.js":
/*!**************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/jinja2.js ***!
  \**************************************************************/
/*! exports provided: jinja2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"jinja2\", function() { return jinja2; });\nvar keywords = [\"and\", \"as\", \"block\", \"endblock\", \"by\", \"cycle\", \"debug\", \"else\", \"elif\",\n                \"extends\", \"filter\", \"endfilter\", \"firstof\", \"for\",\n                \"endfor\", \"if\", \"endif\", \"ifchanged\", \"endifchanged\",\n                \"ifequal\", \"endifequal\", \"ifnotequal\",\n                \"endifnotequal\", \"in\", \"include\", \"load\", \"not\", \"now\", \"or\",\n                \"parsed\", \"regroup\", \"reversed\", \"spaceless\",\n                \"endspaceless\", \"ssi\", \"templatetag\", \"openblock\",\n                \"closeblock\", \"openvariable\", \"closevariable\",\n                \"openbrace\", \"closebrace\", \"opencomment\",\n                \"closecomment\", \"widthratio\", \"url\", \"with\", \"endwith\",\n                \"get_current_language\", \"trans\", \"endtrans\", \"noop\", \"blocktrans\",\n                \"endblocktrans\", \"get_available_languages\",\n                \"get_current_language_bidi\", \"plural\"],\n    operator = /^[+\\-*&%=<>!?|~^]/,\n    sign = /^[:\\[\\(\\{]/,\n    atom = [\"true\", \"false\"],\n    number = /^(\\d[+\\-\\*\\/])?\\d+(\\.\\d+)?/;\n\nkeywords = new RegExp(\"((\" + keywords.join(\")|(\") + \"))\\\\b\");\natom = new RegExp(\"((\" + atom.join(\")|(\") + \"))\\\\b\");\n\nfunction tokenBase (stream, state) {\n  var ch = stream.peek();\n\n  //Comment\n  if (state.incomment) {\n    if(!stream.skipTo(\"#}\")) {\n      stream.skipToEnd();\n    } else {\n      stream.eatWhile(/\\#|}/);\n      state.incomment = false;\n    }\n    return \"comment\";\n    //Tag\n  } else if (state.intag) {\n    //After operator\n    if(state.operator) {\n      state.operator = false;\n      if(stream.match(atom)) {\n        return \"atom\";\n      }\n      if(stream.match(number)) {\n        return \"number\";\n      }\n    }\n    //After sign\n    if(state.sign) {\n      state.sign = false;\n      if(stream.match(atom)) {\n        return \"atom\";\n      }\n      if(stream.match(number)) {\n        return \"number\";\n      }\n    }\n\n    if(state.instring) {\n      if(ch == state.instring) {\n        state.instring = false;\n      }\n      stream.next();\n      return \"string\";\n    } else if(ch == \"'\" || ch == '\"') {\n      state.instring = ch;\n      stream.next();\n      return \"string\";\n    } else if(stream.match(state.intag + \"}\") || stream.eat(\"-\") && stream.match(state.intag + \"}\")) {\n      state.intag = false;\n      return \"tag\";\n    } else if(stream.match(operator)) {\n      state.operator = true;\n      return \"operator\";\n    } else if(stream.match(sign)) {\n      state.sign = true;\n    } else {\n      if(stream.eat(\" \") || stream.sol()) {\n        if(stream.match(keywords)) {\n          return \"keyword\";\n        }\n        if(stream.match(atom)) {\n          return \"atom\";\n        }\n        if(stream.match(number)) {\n          return \"number\";\n        }\n        if(stream.sol()) {\n          stream.next();\n        }\n      } else {\n        stream.next();\n      }\n\n    }\n    return \"variable\";\n  } else if (stream.eat(\"{\")) {\n    if (stream.eat(\"#\")) {\n      state.incomment = true;\n      if(!stream.skipTo(\"#}\")) {\n        stream.skipToEnd();\n      } else {\n        stream.eatWhile(/\\#|}/);\n        state.incomment = false;\n      }\n      return \"comment\";\n      //Open tag\n    } else if (ch = stream.eat(/\\{|%/)) {\n      //Cache close tag\n      state.intag = ch;\n      if(ch == \"{\") {\n        state.intag = \"}\";\n      }\n      stream.eat(\"-\");\n      return \"tag\";\n    }\n  }\n  stream.next();\n};\n\nconst jinja2 = {\n  startState: function () {\n    return {tokenize: tokenBase};\n  },\n  token: function (stream, state) {\n    return state.tokenize(stream, state);\n  },\n  languageData: {\n    commentTokens: {block: {open: \"{#\", close: \"#}\"}}\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/jinja2.js?");

/***/ })

}]);