(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{356:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wast", function() { return wast; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wastLanguage", function() { return wastLanguage; });\n/* harmony import */ var _codemirror_language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);\n/* harmony import */ var _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);\n/* harmony import */ var _lezer_lr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);\n\n\n\n\n// This file was generated by lezer-generator. You probably shouldn\'t edit it.\nconst spec_Keyword = {__proto__:null,anyref:34, dataref:34, eqref:34, externref:34, i31ref:34, funcref:34, i8:34, i16:34, i32:34, i64:34, f32:34, f64:34};\nconst parser = /*@__PURE__*/_lezer_lr__WEBPACK_IMPORTED_MODULE_2__[/* LRParser */ "c"].deserialize({\n  version: 14,\n  states: "!^Q]QPOOOqQPO\'#CbOOQO\'#Cd\'#CdOOQO\'#Cl\'#ClOOQO\'#Ch\'#ChQ]QPOOOOQO,58|,58|OxQPO,58|OOQO-E6f-E6fOOQO1G.h1G.h",\n  stateData: "!P~O_OSPOSQOS~OTPOVROXROYROZROaQO~OSUO~P]OSXO~P]O",\n  goto: "xaPPPPPPbPbPPPhPPPrXROPTVQTOQVPTWTVXSOPTV",\n  nodeNames: "⚠ LineComment BlockComment Module ) ( App Identifier Type Keyword Number String",\n  maxTerm: 17,\n  nodeProps: [\n    ["openedBy", 4,"("],\n    ["closedBy", 5,")"],\n    ["group", -6,6,7,8,9,10,11,"Expression"]\n  ],\n  skippedNodes: [0,1,2],\n  repeatNodeCount: 1,\n  tokenData: "/Q~R^XY}YZ}]^}pq}rs!Stu!qxy&Vyz\'S{|\'X}!O\'X!Q!R\'b!R![)_!]!^,{#T#o-^~!SO_~~!VTOr!Srs!fs#O!S#O#P!k#P~!S~!kOZ~~!nPO~!S~!tiqr$cst$ctu$cuv$cvw$cwx$cz{$c{|$c}!O$c!O!P$c!P!Q$c!Q![$c![!]$c!^!_$c!_!`$c!`!a$c!a!b$c!b!c$c!c!}$c#Q#R$c#R#S$c#S#T$c#T#o$c#p#q$c#r#s$c~$hiV~qr$cst$ctu$cuv$cvw$cwx$cz{$c{|$c}!O$c!O!P$c!P!Q$c!Q![$c![!]$c!^!_$c!_!`$c!`!a$c!a!b$c!b!c$c!c!}$c#Q#R$c#R#S$c#S#T$c#T#o$c#p#q$c#r#s$c~&[PT~!]!^&_~&bRO!]&_!]!^&k!^~&_~&nTOy&_yz&}z!]&_!]!^&k!^~&_~\'SOQ~~\'XOS~~\'[Q!Q!R\'b!R![)_~\'gUY~!O!P\'y!Q![)_!g!h(j#R#S)s#X#Y(j#l#m)y~(ORY~!Q![(X!g!h(j#X#Y(j~(^SY~!Q![(X!g!h(j#R#S)X#X#Y(j~(mR{|(v}!O(v!Q![(|~(yP!Q![(|~)RQY~!Q![(|#R#S(v~)[P!Q![(X~)dTY~!O!P\'y!Q![)_!g!h(j#R#S)s#X#Y(j~)vP!Q![)_~)|R!Q![*V!c!i*V#T#Z*V~*[VY~!O!P*q!Q![*V!c!i*V!r!s+n#R#S)y#T#Z*V#d#e+n~*vTY~!Q![+V!c!i+V!r!s+n#T#Z+V#d#e+n~+[UY~!Q![+V!c!i+V!r!s+n#R#S,o#T#Z+V#d#e+n~+qT{|,Q}!O,Q!Q![,^!c!i,^#T#Z,^~,TR!Q![,^!c!i,^#T#Z,^~,cSY~!Q![,^!c!i,^#R#S,Q#T#Z,^~,rR!Q![+V!c!i+V#T#Z+V~-OP!]!^-R~-WQP~OY-RZ~-R~-ciX~qr-^st-^tu-^uv-^vw-^wx-^z{-^{|-^}!O-^!O!P-^!P!Q-^!Q![-^![!]-^!^!_-^!_!`-^!`!a-^!a!b-^!b!c-^!c!}-^#Q#R-^#R#S-^#S#T-^#T#o-^#p#q-^#r#s-^",\n  tokenizers: [0],\n  topRules: {"Module":[0,3]},\n  specialized: [{term: 9, get: value => spec_Keyword[value] || -1}],\n  tokenPrec: 0\n});\n\nconst wastLanguage = /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[/* LRLanguage */ "c"].define({\n    parser: /*@__PURE__*/parser.configure({\n        props: [\n            /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[/* indentNodeProp */ "u"].add({\n                App: /*@__PURE__*/Object(_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[/* delimitedIndent */ "m"])({ closing: ")", align: false })\n            }),\n            /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_0__[/* foldNodeProp */ "r"].add({\n                App: _codemirror_language__WEBPACK_IMPORTED_MODULE_0__[/* foldInside */ "p"],\n                BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }\n            }),\n            /*@__PURE__*/Object(_lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* styleTags */ "c"])({\n                Keyword: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].keyword,\n                Type: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].typeName,\n                Number: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].number,\n                String: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].string,\n                Identifier: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].variableName,\n                LineComment: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].lineComment,\n                BlockComment: _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].blockComment,\n                "( )": _lezer_highlight__WEBPACK_IMPORTED_MODULE_1__[/* tags */ "e"].paren\n            })\n        ]\n    }),\n    languageData: {\n        commentTokens: { line: ";;", block: { open: "(;", close: ";)" } },\n        closeBrackets: { brackets: ["(", \'"\'] }\n    }\n});\nfunction wast() {\n    return new _codemirror_language__WEBPACK_IMPORTED_MODULE_0__[/* LanguageSupport */ "f"](wastLanguage);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGFuZy13YXN0L2Rpc3QvaW5kZXguanM/ZGQzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEg7QUFDM0U7QUFDZDs7QUFFckM7QUFDQSxzQkFBc0I7QUFDdEIsNEJBQTRCLDBEQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixJQUFJLHNCQUFzQixvRkFBb0YsR0FBRyxJQUFJLDhEQUE4RCxzRUFBc0UsR0FBRyxJQUFJLDhEQUE4RCxrRkFBa0YsaUpBQWlKLElBQUksdVBBQXVQLElBQUksd0pBQXdKLEdBQUcsSUFBSSw4REFBOEQ7QUFDN2lDO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGlCQUFpQixpREFBaUQ7QUFDbEU7QUFDQSxDQUFDOztBQUVELGtDQUFrQyx1RUFBVTtBQUM1QztBQUNBO0FBQ0EseUJBQXlCLDJFQUFjO0FBQ3ZDLGtDQUFrQyxvRkFBZSxFQUFFLDZCQUE2QjtBQUNoRixhQUFhO0FBQ2IseUJBQXlCLHlFQUFZO0FBQ3JDLHFCQUFxQix1RUFBVTtBQUMvQixvQ0FBb0MsU0FBUyx3Q0FBd0M7QUFDckYsYUFBYTtBQUNiLHlCQUF5QiwwRUFBUztBQUNsQyx5QkFBeUIsNkRBQUk7QUFDN0Isc0JBQXNCLDZEQUFJO0FBQzFCLHdCQUF3Qiw2REFBSTtBQUM1Qix3QkFBd0IsNkRBQUk7QUFDNUIsNEJBQTRCLDZEQUFJO0FBQ2hDLDZCQUE2Qiw2REFBSTtBQUNqQyw4QkFBOEIsNkRBQUk7QUFDbEMsdUJBQXVCLDZEQUFJO0FBQzNCLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixVQUFVLFdBQVcsVUFBVSxZQUFZLElBQUksRUFBRTtBQUN6RSx3QkFBd0I7QUFDeEI7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxlQUFlLDRFQUFlO0FBQzlCOztBQUU4QiIsImZpbGUiOiIzNTYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMUkxhbmd1YWdlLCBpbmRlbnROb2RlUHJvcCwgZGVsaW1pdGVkSW5kZW50LCBmb2xkTm9kZVByb3AsIGZvbGRJbnNpZGUsIExhbmd1YWdlU3VwcG9ydCB9IGZyb20gJ0Bjb2RlbWlycm9yL2xhbmd1YWdlJztcbmltcG9ydCB7IHN0eWxlVGFncywgdGFncyB9IGZyb20gJ0BsZXplci9oaWdobGlnaHQnO1xuaW1wb3J0IHsgTFJQYXJzZXIgfSBmcm9tICdAbGV6ZXIvbHInO1xuXG4vLyBUaGlzIGZpbGUgd2FzIGdlbmVyYXRlZCBieSBsZXplci1nZW5lcmF0b3IuIFlvdSBwcm9iYWJseSBzaG91bGRuJ3QgZWRpdCBpdC5cbmNvbnN0IHNwZWNfS2V5d29yZCA9IHtfX3Byb3RvX186bnVsbCxhbnlyZWY6MzQsIGRhdGFyZWY6MzQsIGVxcmVmOjM0LCBleHRlcm5yZWY6MzQsIGkzMXJlZjozNCwgZnVuY3JlZjozNCwgaTg6MzQsIGkxNjozNCwgaTMyOjM0LCBpNjQ6MzQsIGYzMjozNCwgZjY0OjM0fTtcbmNvbnN0IHBhcnNlciA9IC8qQF9fUFVSRV9fKi9MUlBhcnNlci5kZXNlcmlhbGl6ZSh7XG4gIHZlcnNpb246IDE0LFxuICBzdGF0ZXM6IFwiIV5RXVFQT09PcVFQTycjQ2JPT1FPJyNDZCcjQ2RPT1FPJyNDbCcjQ2xPT1FPJyNDaCcjQ2hRXVFQT09PT1FPLDU4fCw1OHxPeFFQTyw1OHxPT1FPLUU2Zi1FNmZPT1FPMUcuaDFHLmhcIixcbiAgc3RhdGVEYXRhOiBcIiFQfk9fT1NQT1NRT1N+T1RQT1ZST1hST1lST1pST2FRT35PU1VPflBdT1NYT35QXU9cIixcbiAgZ290bzogXCJ4YVBQUFBQUGJQYlBQUGhQUFByWFJPUFRWUVRPUVZQVFdUVlhTT1BUVlwiLFxuICBub2RlTmFtZXM6IFwi4pqgIExpbmVDb21tZW50IEJsb2NrQ29tbWVudCBNb2R1bGUgKSAoIEFwcCBJZGVudGlmaWVyIFR5cGUgS2V5d29yZCBOdW1iZXIgU3RyaW5nXCIsXG4gIG1heFRlcm06IDE3LFxuICBub2RlUHJvcHM6IFtcbiAgICBbXCJvcGVuZWRCeVwiLCA0LFwiKFwiXSxcbiAgICBbXCJjbG9zZWRCeVwiLCA1LFwiKVwiXSxcbiAgICBbXCJncm91cFwiLCAtNiw2LDcsOCw5LDEwLDExLFwiRXhwcmVzc2lvblwiXVxuICBdLFxuICBza2lwcGVkTm9kZXM6IFswLDEsMl0sXG4gIHJlcGVhdE5vZGVDb3VudDogMSxcbiAgdG9rZW5EYXRhOiBcIi9RflJeWFl9WVp9XV59cHF9cnMhU3R1IXF4eSZWeXonU3t8J1h9IU8nWCFRIVInYiFSIVspXyFdIV4seyNUI28tXn4hU09ffn4hVlRPciFTcnMhZnMjTyFTI08jUCFrI1B+IVN+IWtPWn5+IW5QT34hU34hdGlxciRjc3QkY3R1JGN1diRjdnckY3d4JGN6eyRje3wkY30hTyRjIU8hUCRjIVAhUSRjIVEhWyRjIVshXSRjIV4hXyRjIV8hYCRjIWAhYSRjIWEhYiRjIWIhYyRjIWMhfSRjI1EjUiRjI1IjUyRjI1MjVCRjI1QjbyRjI3AjcSRjI3IjcyRjfiRoaVZ+cXIkY3N0JGN0dSRjdXYkY3Z3JGN3eCRjenskY3t8JGN9IU8kYyFPIVAkYyFQIVEkYyFRIVskYyFbIV0kYyFeIV8kYyFfIWAkYyFgIWEkYyFhIWIkYyFiIWMkYyFjIX0kYyNRI1IkYyNSI1MkYyNTI1QkYyNUI28kYyNwI3EkYyNyI3MkY34mW1BUfiFdIV4mX34mYlJPIV0mXyFdIV4mayFefiZffiZuVE95Jl95eiZ9eiFdJl8hXSFeJmshXn4mX34nU09Rfn4nWE9Tfn4nW1EhUSFSJ2IhUiFbKV9+J2dVWX4hTyFQJ3khUSFbKV8hZyFoKGojUiNTKXMjWCNZKGojbCNtKXl+KE9SWX4hUSFbKFghZyFoKGojWCNZKGp+KF5TWX4hUSFbKFghZyFoKGojUiNTKVgjWCNZKGp+KG1Se3wodn0hTyh2IVEhWyh8fih5UCFRIVsofH4pUlFZfiFRIVsofCNSI1Modn4pW1AhUSFbKFh+KWRUWX4hTyFQJ3khUSFbKV8hZyFoKGojUiNTKXMjWCNZKGp+KXZQIVEhWylffil8UiFRIVsqViFjIWkqViNUI1oqVn4qW1ZZfiFPIVAqcSFRIVsqViFjIWkqViFyIXMrbiNSI1MpeSNUI1oqViNkI2Urbn4qdlRZfiFRIVsrViFjIWkrViFyIXMrbiNUI1orViNkI2Urbn4rW1VZfiFRIVsrViFjIWkrViFyIXMrbiNSI1MsbyNUI1orViNkI2Urbn4rcVR7fCxRfSFPLFEhUSFbLF4hYyFpLF4jVCNaLF5+LFRSIVEhWyxeIWMhaSxeI1QjWixefixjU1l+IVEhWyxeIWMhaSxeI1IjUyxRI1QjWixefixyUiFRIVsrViFjIWkrViNUI1orVn4tT1AhXSFeLVJ+LVdRUH5PWS1SWn4tUn4tY2lYfnFyLV5zdC1edHUtXnV2LV52dy1ed3gtXnp7LV57fC1efSFPLV4hTyFQLV4hUCFRLV4hUSFbLV4hWyFdLV4hXiFfLV4hXyFgLV4hYCFhLV4hYSFiLV4hYiFjLV4hYyF9LV4jUSNSLV4jUiNTLV4jUyNULV4jVCNvLV4jcCNxLV4jciNzLV5cIixcbiAgdG9rZW5pemVyczogWzBdLFxuICB0b3BSdWxlczoge1wiTW9kdWxlXCI6WzAsM119LFxuICBzcGVjaWFsaXplZDogW3t0ZXJtOiA5LCBnZXQ6IHZhbHVlID0+IHNwZWNfS2V5d29yZFt2YWx1ZV0gfHwgLTF9XSxcbiAgdG9rZW5QcmVjOiAwXG59KTtcblxuY29uc3Qgd2FzdExhbmd1YWdlID0gLypAX19QVVJFX18qL0xSTGFuZ3VhZ2UuZGVmaW5lKHtcbiAgICBwYXJzZXI6IC8qQF9fUFVSRV9fKi9wYXJzZXIuY29uZmlndXJlKHtcbiAgICAgICAgcHJvcHM6IFtcbiAgICAgICAgICAgIC8qQF9fUFVSRV9fKi9pbmRlbnROb2RlUHJvcC5hZGQoe1xuICAgICAgICAgICAgICAgIEFwcDogLypAX19QVVJFX18qL2RlbGltaXRlZEluZGVudCh7IGNsb3Npbmc6IFwiKVwiLCBhbGlnbjogZmFsc2UgfSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgLypAX19QVVJFX18qL2ZvbGROb2RlUHJvcC5hZGQoe1xuICAgICAgICAgICAgICAgIEFwcDogZm9sZEluc2lkZSxcbiAgICAgICAgICAgICAgICBCbG9ja0NvbW1lbnQodHJlZSkgeyByZXR1cm4geyBmcm9tOiB0cmVlLmZyb20gKyAyLCB0bzogdHJlZS50byAtIDIgfTsgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvKkBfX1BVUkVfXyovc3R5bGVUYWdzKHtcbiAgICAgICAgICAgICAgICBLZXl3b3JkOiB0YWdzLmtleXdvcmQsXG4gICAgICAgICAgICAgICAgVHlwZTogdGFncy50eXBlTmFtZSxcbiAgICAgICAgICAgICAgICBOdW1iZXI6IHRhZ3MubnVtYmVyLFxuICAgICAgICAgICAgICAgIFN0cmluZzogdGFncy5zdHJpbmcsXG4gICAgICAgICAgICAgICAgSWRlbnRpZmllcjogdGFncy52YXJpYWJsZU5hbWUsXG4gICAgICAgICAgICAgICAgTGluZUNvbW1lbnQ6IHRhZ3MubGluZUNvbW1lbnQsXG4gICAgICAgICAgICAgICAgQmxvY2tDb21tZW50OiB0YWdzLmJsb2NrQ29tbWVudCxcbiAgICAgICAgICAgICAgICBcIiggKVwiOiB0YWdzLnBhcmVuXG4gICAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgfSksXG4gICAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgICAgIGNvbW1lbnRUb2tlbnM6IHsgbGluZTogXCI7O1wiLCBibG9jazogeyBvcGVuOiBcIig7XCIsIGNsb3NlOiBcIjspXCIgfSB9LFxuICAgICAgICBjbG9zZUJyYWNrZXRzOiB7IGJyYWNrZXRzOiBbXCIoXCIsICdcIiddIH1cbiAgICB9XG59KTtcbmZ1bmN0aW9uIHdhc3QoKSB7XG4gICAgcmV0dXJuIG5ldyBMYW5ndWFnZVN1cHBvcnQod2FzdExhbmd1YWdlKTtcbn1cblxuZXhwb3J0IHsgd2FzdCwgd2FzdExhbmd1YWdlIH07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///356\n')}}]);