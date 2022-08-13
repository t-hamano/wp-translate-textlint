(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[70],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/protobuf.js":
/*!****************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/protobuf.js ***!
  \****************************************************************/
/*! exports provided: protobuf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"protobuf\", function() { return protobuf; });\nfunction wordRegexp(words) {\n  return new RegExp(\"^((\" + words.join(\")|(\") + \"))\\\\b\", \"i\");\n};\n\nvar keywordArray = [\n  \"package\", \"message\", \"import\", \"syntax\",\n  \"required\", \"optional\", \"repeated\", \"reserved\", \"default\", \"extensions\", \"packed\",\n  \"bool\", \"bytes\", \"double\", \"enum\", \"float\", \"string\",\n  \"int32\", \"int64\", \"uint32\", \"uint64\", \"sint32\", \"sint64\", \"fixed32\", \"fixed64\", \"sfixed32\", \"sfixed64\",\n  \"option\", \"service\", \"rpc\", \"returns\"\n];\nvar keywords = wordRegexp(keywordArray);\n\nvar identifiers = new RegExp(\"^[_A-Za-z\\xa1-\\uffff][_A-Za-z0-9\\xa1-\\uffff]*\");\n\nfunction tokenBase(stream) {\n  // whitespaces\n  if (stream.eatSpace()) return null;\n\n  // Handle one line Comments\n  if (stream.match(\"//\")) {\n    stream.skipToEnd();\n    return \"comment\";\n  }\n\n  // Handle Number Literals\n  if (stream.match(/^[0-9\\.+-]/, false)) {\n    if (stream.match(/^[+-]?0x[0-9a-fA-F]+/))\n      return \"number\";\n    if (stream.match(/^[+-]?\\d*\\.\\d+([EeDd][+-]?\\d+)?/))\n      return \"number\";\n    if (stream.match(/^[+-]?\\d+([EeDd][+-]?\\d+)?/))\n      return \"number\";\n  }\n\n  // Handle Strings\n  if (stream.match(/^\"([^\"]|(\"\"))*\"/)) { return \"string\"; }\n  if (stream.match(/^'([^']|(''))*'/)) { return \"string\"; }\n\n  // Handle words\n  if (stream.match(keywords)) { return \"keyword\"; }\n  if (stream.match(identifiers)) { return \"variable\"; } ;\n\n  // Handle non-detected items\n  stream.next();\n  return null;\n};\n\nconst protobuf = {\n  token: tokenBase,\n  languageData: {\n    autocomplete: keywordArray\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/protobuf.js?");

/***/ })

}]);