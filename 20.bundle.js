(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/@codemirror/lang-wast/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@codemirror/lang-wast/dist/index.js ***!
  \**********************************************************/
/*! exports provided: wast, wastLanguage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wast\", function() { return wast; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wastLanguage\", function() { return wastLanguage; });\n/* harmony import */ var _codemirror_language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @codemirror/language */ \"./node_modules/@codemirror/language/dist/index.js\");\n/* harmony import */ var _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lezer/highlight */ \"./node_modules/@lezer/highlight/dist/index.js\");\n/* harmony import */ var _lezer_lr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lezer/lr */ \"./node_modules/@lezer/lr/dist/index.js\");\n\n\n\n\n// This file was generated by lezer-generator. You probably shouldn't edit it.\nconst spec_Keyword = {__proto__:null,anyref:34, dataref:34, eqref:34, externref:34, i31ref:34, funcref:34, i8:34, i16:34, i32:34, i64:34, f32:34, f64:34};\nconst parser = /*@__PURE__*/_lezer_lr__WEBPACK_IMPORTED_MODULE_2__[\"LRParser\"].deserialize({\n  version: 14,\n  states: \"!^Q]QPOOOqQPO'#CbOOQO'#Cd'#CdOOQO'#Cl'#ClOOQO'#Ch'#ChQ]QPOOOOQO,58|,58|OxQPO,58|OOQO-E6f-E6fOOQO1G.h1G.h\",\n  stateData: \"!P~O_OSPOSQOS~OTPOVROXROYROZROaQO~OSUO~P]OSXO~P]O\",\n  goto: \"xaPPPPPPbPbPPPhPPPrXROPTVQTOQVPTWTVXSOPTV\",\n  nodeNames: \"⚠ LineComment BlockComment Module ) ( App Identifier Type Keyword Number String\",\n  maxTerm: 17,\n  nodeProps: [\n    [\"openedBy\", 4,\"(\"],\n    [\"closedBy\", 5,\")\"],\n    [\"group\", -6,6,7,8,9,10,11,\"Expression\"]\n  ],\n  skippedNodes: [0,1,2],\n  repeatNodeCount: 1,\n  tokenData: \"/Q~R^XY}YZ}]^}pq}rs!Stu!qxy&Vyz'S{|'X}!O'X!Q!R'b!R![)_!]!^,{#T#o-^~!SO_~~!VTOr!Srs!fs#O!S#O#P!k#P~!S~!kOZ~~!nPO~!S~!tiqr$cst$ctu$cuv$cvw$cwx$cz{$c{|$c}!O$c!O!P$c!P!Q$c!Q![$c![!]$c!^!_$c!_!`$c!`!a$c!a!b$c!b!c$c!c!}$c#Q#R$c#R#S$c#S#T$c#T#o$c#p#q$c#r#s$c~$hiV~qr$cst$ctu$cuv$cvw$cwx$cz{$c{|$c}!O$c!O!P$c!P!Q$c!Q![$c![!]$c!^!_$c!_!`$c!`!a$c!a!b$c!b!c$c!c!}$c#Q#R$c#R#S$c#S#T$c#T#o$c#p#q$c#r#s$c~&[PT~!]!^&_~&bRO!]&_!]!^&k!^~&_~&nTOy&_yz&}z!]&_!]!^&k!^~&_~'SOQ~~'XOS~~'[Q!Q!R'b!R![)_~'gUY~!O!P'y!Q![)_!g!h(j#R#S)s#X#Y(j#l#m)y~(ORY~!Q![(X!g!h(j#X#Y(j~(^SY~!Q![(X!g!h(j#R#S)X#X#Y(j~(mR{|(v}!O(v!Q![(|~(yP!Q![(|~)RQY~!Q![(|#R#S(v~)[P!Q![(X~)dTY~!O!P'y!Q![)_!g!h(j#R#S)s#X#Y(j~)vP!Q![)_~)|R!Q![*V!c!i*V#T#Z*V~*[VY~!O!P*q!Q![*V!c!i*V!r!s+n#R#S)y#T#Z*V#d#e+n~*vTY~!Q![+V!c!i+V!r!s+n#T#Z+V#d#e+n~+[UY~!Q![+V!c!i+V!r!s+n#R#S,o#T#Z+V#d#e+n~+qT{|,Q}!O,Q!Q![,^!c!i,^#T#Z,^~,TR!Q![,^!c!i,^#T#Z,^~,cSY~!Q![,^!c!i,^#R#S,Q#T#Z,^~,rR!Q![+V!c!i+V#T#Z+V~-OP!]!^-R~-WQP~OY-RZ~-R~-ciX~qr-^st-^tu-^uv-^vw-^wx-^z{-^{|-^}!O-^!O!P-^!P!Q-^!Q![-^![!]-^!^!_-^!_!`-^!`!a-^!a!b-^!b!c-^!c!}-^#Q#R-^#R#S-^#S#T-^#T#o-^#p#q-^#r#s-^\",\n  tokenizers: [0],\n  topRules: {\"Module\":[0,3]},\n  specialized: [{term: 9, get: value => spec_Keyword[value] || -1}],\n  tokenPrec: 0\n});\n\nconst wastLanguage = /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[\"LRLanguage\"].define({\n    parser: /*@__PURE__*/parser.configure({\n        props: [\n            /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[\"indentNodeProp\"].add({\n                App: /*@__PURE__*/Object(_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[\"delimitedIndent\"])({ closing: \")\", align: false })\n            }),\n            /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[\"foldNodeProp\"].add({\n                App: _codemirror_language__WEBPACK_IMPORTED_MODULE_0__[\"foldInside\"],\n                BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }\n            }),\n            /*@__PURE__*/Object(_lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"styleTags\"])({\n                Keyword: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].keyword,\n                Type: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].typeName,\n                Number: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].number,\n                String: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].string,\n                Identifier: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].variableName,\n                LineComment: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].lineComment,\n                BlockComment: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].blockComment,\n                \"( )\": _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[\"tags\"].paren\n            })\n        ]\n    }),\n    languageData: {\n        commentTokens: { line: \";;\", block: { open: \"(;\", close: \";)\" } },\n        closeBrackets: { brackets: [\"(\", '\"'] }\n    }\n});\nfunction wast() {\n    return new _codemirror_language__WEBPACK_IMPORTED_MODULE_0__[\"LanguageSupport\"](wastLanguage);\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/lang-wast/dist/index.js?");

/***/ })

}]);