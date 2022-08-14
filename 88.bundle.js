(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{426:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "swift", function() { return swift; });\nfunction wordSet(words) {\n  var set = {}\n  for (var i = 0; i < words.length; i++) set[words[i]] = true\n  return set\n}\n\nvar keywords = wordSet(["_","var","let","actor","class","enum","extension","import","protocol","struct","func","typealias","associatedtype",\n                        "open","public","internal","fileprivate","private","deinit","init","new","override","self","subscript","super",\n                        "convenience","dynamic","final","indirect","lazy","required","static","unowned","unowned(safe)","unowned(unsafe)","weak","as","is",\n                        "break","case","continue","default","else","fallthrough","for","guard","if","in","repeat","switch","where","while",\n                        "defer","return","inout","mutating","nonmutating","isolated","nonisolated","catch","do","rethrows","throw","throws","async","await","try","didSet","get","set","willSet",\n                        "assignment","associativity","infix","left","none","operator","postfix","precedence","precedencegroup","prefix","right",\n                        "Any","AnyObject","Type","dynamicType","Self","Protocol","__COLUMN__","__FILE__","__FUNCTION__","__LINE__"])\nvar definingKeywords = wordSet(["var","let","actor","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","for"])\nvar atoms = wordSet(["true","false","nil","self","super","_"])\nvar types = wordSet(["Array","Bool","Character","Dictionary","Double","Float","Int","Int8","Int16","Int32","Int64","Never","Optional","Set","String",\n                     "UInt8","UInt16","UInt32","UInt64","Void"])\nvar operators = "+-/*%=|&<>~^?!"\nvar punc = ":;,.(){}[]"\nvar binary = /^\\-?0b[01][01_]*/\nvar octal = /^\\-?0o[0-7][0-7_]*/\nvar hexadecimal = /^\\-?0x[\\dA-Fa-f][\\dA-Fa-f_]*(?:(?:\\.[\\dA-Fa-f][\\dA-Fa-f_]*)?[Pp]\\-?\\d[\\d_]*)?/\nvar decimal = /^\\-?\\d[\\d_]*(?:\\.\\d[\\d_]*)?(?:[Ee]\\-?\\d[\\d_]*)?/\nvar identifier = /^\\$\\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\\1/\nvar property = /^\\.(?:\\$\\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\\1)/\nvar instruction = /^\\#[A-Za-z]+/\nvar attribute = /^@(?:\\$\\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\\1)/\n//var regexp = /^\\/(?!\\s)(?:\\/\\/)?(?:\\\\.|[^\\/])+\\//\n\nfunction tokenBase(stream, state, prev) {\n  if (stream.sol()) state.indented = stream.indentation()\n  if (stream.eatSpace()) return null\n\n  var ch = stream.peek()\n  if (ch == "/") {\n    if (stream.match("//")) {\n      stream.skipToEnd()\n      return "comment"\n    }\n    if (stream.match("/*")) {\n      state.tokenize.push(tokenComment)\n      return tokenComment(stream, state)\n    }\n  }\n  if (stream.match(instruction)) return "builtin"\n  if (stream.match(attribute)) return "attribute"\n  if (stream.match(binary)) return "number"\n  if (stream.match(octal)) return "number"\n  if (stream.match(hexadecimal)) return "number"\n  if (stream.match(decimal)) return "number"\n  if (stream.match(property)) return "property"\n  if (operators.indexOf(ch) > -1) {\n    stream.next()\n    return "operator"\n  }\n  if (punc.indexOf(ch) > -1) {\n    stream.next()\n    stream.match("..")\n    return "punctuation"\n  }\n  var stringMatch\n  if (stringMatch = stream.match(/("""|"|\')/)) {\n    var tokenize = tokenString.bind(null, stringMatch[0])\n    state.tokenize.push(tokenize)\n    return tokenize(stream, state)\n  }\n\n  if (stream.match(identifier)) {\n    var ident = stream.current()\n    if (types.hasOwnProperty(ident)) return "type"\n    if (atoms.hasOwnProperty(ident)) return "atom"\n    if (keywords.hasOwnProperty(ident)) {\n      if (definingKeywords.hasOwnProperty(ident))\n        state.prev = "define"\n      return "keyword"\n    }\n    if (prev == "define") return "def"\n    return "variable"\n  }\n\n  stream.next()\n  return null\n}\n\nfunction tokenUntilClosingParen() {\n  var depth = 0\n  return function(stream, state, prev) {\n    var inner = tokenBase(stream, state, prev)\n    if (inner == "punctuation") {\n      if (stream.current() == "(") ++depth\n      else if (stream.current() == ")") {\n        if (depth == 0) {\n          stream.backUp(1)\n          state.tokenize.pop()\n          return state.tokenize[state.tokenize.length - 1](stream, state)\n        }\n        else --depth\n      }\n    }\n    return inner\n  }\n}\n\nfunction tokenString(openQuote, stream, state) {\n  var singleLine = openQuote.length == 1\n  var ch, escaped = false\n  while (ch = stream.peek()) {\n    if (escaped) {\n      stream.next()\n      if (ch == "(") {\n        state.tokenize.push(tokenUntilClosingParen())\n        return "string"\n      }\n      escaped = false\n    } else if (stream.match(openQuote)) {\n      state.tokenize.pop()\n      return "string"\n    } else {\n      stream.next()\n      escaped = ch == "\\\\"\n    }\n  }\n  if (singleLine) {\n    state.tokenize.pop()\n  }\n  return "string"\n}\n\nfunction tokenComment(stream, state) {\n  var ch\n  while (true) {\n    stream.match(/^[^/*]+/, true)\n    ch = stream.next()\n    if (!ch) break\n    if (ch === "/" && stream.eat("*")) {\n      state.tokenize.push(tokenComment)\n    } else if (ch === "*" && stream.eat("/")) {\n      state.tokenize.pop()\n    }\n  }\n  return "comment"\n}\n\nfunction Context(prev, align, indented) {\n  this.prev = prev\n  this.align = align\n  this.indented = indented\n}\n\nfunction pushContext(state, stream) {\n  var align = stream.match(/^\\s*($|\\/[\\/\\*]|[)}\\]])/, false) ? null : stream.column() + 1\n  state.context = new Context(state.context, align, state.indented)\n}\n\nfunction popContext(state) {\n  if (state.context) {\n    state.indented = state.context.indented\n    state.context = state.context.prev\n  }\n}\n\nconst swift = {\n  startState: function() {\n    return {\n      prev: null,\n      context: null,\n      indented: 0,\n      tokenize: []\n    }\n  },\n\n  token: function(stream, state) {\n    var prev = state.prev\n    state.prev = null\n    var tokenize = state.tokenize[state.tokenize.length - 1] || tokenBase\n    var style = tokenize(stream, state, prev)\n    if (!style || style == "comment") state.prev = prev\n    else if (!state.prev) state.prev = style\n\n    if (style == "punctuation") {\n      var bracket = /[\\(\\[\\{]|([\\]\\)\\}])/.exec(stream.current())\n      if (bracket) (bracket[1] ? popContext : pushContext)(state, stream)\n    }\n\n    return style\n  },\n\n  indent: function(state, textAfter, iCx) {\n    var cx = state.context\n    if (!cx) return 0\n    var closing = /^[\\]\\}\\)]/.test(textAfter)\n    if (cx.align != null) return cx.align - (closing ? 1 : 0)\n    return cx.indented + (closing ? 0 : iCx.unit)\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[\\)\\}\\]]$/,\n    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},\n    closeBrackets: {brackets: ["(", "[", "{", "\'", \'"\', "`"]}\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvc3dpZnQuanM/NzJjMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQztBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixVQUFVO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDZCQUE2QjtBQUM3QixvQkFBb0Isb0JBQW9CLHlCQUF5QjtBQUNqRSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0EiLCJmaWxlIjoiNDI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gd29yZFNldCh3b3Jkcykge1xuICB2YXIgc2V0ID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykgc2V0W3dvcmRzW2ldXSA9IHRydWVcbiAgcmV0dXJuIHNldFxufVxuXG52YXIga2V5d29yZHMgPSB3b3JkU2V0KFtcIl9cIixcInZhclwiLFwibGV0XCIsXCJhY3RvclwiLFwiY2xhc3NcIixcImVudW1cIixcImV4dGVuc2lvblwiLFwiaW1wb3J0XCIsXCJwcm90b2NvbFwiLFwic3RydWN0XCIsXCJmdW5jXCIsXCJ0eXBlYWxpYXNcIixcImFzc29jaWF0ZWR0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9wZW5cIixcInB1YmxpY1wiLFwiaW50ZXJuYWxcIixcImZpbGVwcml2YXRlXCIsXCJwcml2YXRlXCIsXCJkZWluaXRcIixcImluaXRcIixcIm5ld1wiLFwib3ZlcnJpZGVcIixcInNlbGZcIixcInN1YnNjcmlwdFwiLFwic3VwZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udmVuaWVuY2VcIixcImR5bmFtaWNcIixcImZpbmFsXCIsXCJpbmRpcmVjdFwiLFwibGF6eVwiLFwicmVxdWlyZWRcIixcInN0YXRpY1wiLFwidW5vd25lZFwiLFwidW5vd25lZChzYWZlKVwiLFwidW5vd25lZCh1bnNhZmUpXCIsXCJ3ZWFrXCIsXCJhc1wiLFwiaXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYnJlYWtcIixcImNhc2VcIixcImNvbnRpbnVlXCIsXCJkZWZhdWx0XCIsXCJlbHNlXCIsXCJmYWxsdGhyb3VnaFwiLFwiZm9yXCIsXCJndWFyZFwiLFwiaWZcIixcImluXCIsXCJyZXBlYXRcIixcInN3aXRjaFwiLFwid2hlcmVcIixcIndoaWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlZmVyXCIsXCJyZXR1cm5cIixcImlub3V0XCIsXCJtdXRhdGluZ1wiLFwibm9ubXV0YXRpbmdcIixcImlzb2xhdGVkXCIsXCJub25pc29sYXRlZFwiLFwiY2F0Y2hcIixcImRvXCIsXCJyZXRocm93c1wiLFwidGhyb3dcIixcInRocm93c1wiLFwiYXN5bmNcIixcImF3YWl0XCIsXCJ0cnlcIixcImRpZFNldFwiLFwiZ2V0XCIsXCJzZXRcIixcIndpbGxTZXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWdubWVudFwiLFwiYXNzb2NpYXRpdml0eVwiLFwiaW5maXhcIixcImxlZnRcIixcIm5vbmVcIixcIm9wZXJhdG9yXCIsXCJwb3N0Zml4XCIsXCJwcmVjZWRlbmNlXCIsXCJwcmVjZWRlbmNlZ3JvdXBcIixcInByZWZpeFwiLFwicmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQW55XCIsXCJBbnlPYmplY3RcIixcIlR5cGVcIixcImR5bmFtaWNUeXBlXCIsXCJTZWxmXCIsXCJQcm90b2NvbFwiLFwiX19DT0xVTU5fX1wiLFwiX19GSUxFX19cIixcIl9fRlVOQ1RJT05fX1wiLFwiX19MSU5FX19cIl0pXG52YXIgZGVmaW5pbmdLZXl3b3JkcyA9IHdvcmRTZXQoW1widmFyXCIsXCJsZXRcIixcImFjdG9yXCIsXCJjbGFzc1wiLFwiZW51bVwiLFwiZXh0ZW5zaW9uXCIsXCJpbXBvcnRcIixcInByb3RvY29sXCIsXCJzdHJ1Y3RcIixcImZ1bmNcIixcInR5cGVhbGlhc1wiLFwiYXNzb2NpYXRlZHR5cGVcIixcImZvclwiXSlcbnZhciBhdG9tcyA9IHdvcmRTZXQoW1widHJ1ZVwiLFwiZmFsc2VcIixcIm5pbFwiLFwic2VsZlwiLFwic3VwZXJcIixcIl9cIl0pXG52YXIgdHlwZXMgPSB3b3JkU2V0KFtcIkFycmF5XCIsXCJCb29sXCIsXCJDaGFyYWN0ZXJcIixcIkRpY3Rpb25hcnlcIixcIkRvdWJsZVwiLFwiRmxvYXRcIixcIkludFwiLFwiSW50OFwiLFwiSW50MTZcIixcIkludDMyXCIsXCJJbnQ2NFwiLFwiTmV2ZXJcIixcIk9wdGlvbmFsXCIsXCJTZXRcIixcIlN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgXCJVSW50OFwiLFwiVUludDE2XCIsXCJVSW50MzJcIixcIlVJbnQ2NFwiLFwiVm9pZFwiXSlcbnZhciBvcGVyYXRvcnMgPSBcIistLyolPXwmPD5+Xj8hXCJcbnZhciBwdW5jID0gXCI6OywuKCl7fVtdXCJcbnZhciBiaW5hcnkgPSAvXlxcLT8wYlswMV1bMDFfXSovXG52YXIgb2N0YWwgPSAvXlxcLT8wb1swLTddWzAtN19dKi9cbnZhciBoZXhhZGVjaW1hbCA9IC9eXFwtPzB4W1xcZEEtRmEtZl1bXFxkQS1GYS1mX10qKD86KD86XFwuW1xcZEEtRmEtZl1bXFxkQS1GYS1mX10qKT9bUHBdXFwtP1xcZFtcXGRfXSopPy9cbnZhciBkZWNpbWFsID0gL15cXC0/XFxkW1xcZF9dKig/OlxcLlxcZFtcXGRfXSopPyg/OltFZV1cXC0/XFxkW1xcZF9dKik/L1xudmFyIGlkZW50aWZpZXIgPSAvXlxcJFxcZCt8KGA/KVtfQS1aYS16XVtfQS1aYS16JDAtOV0qXFwxL1xudmFyIHByb3BlcnR5ID0gL15cXC4oPzpcXCRcXGQrfChgPylbX0EtWmEtel1bX0EtWmEteiQwLTldKlxcMSkvXG52YXIgaW5zdHJ1Y3Rpb24gPSAvXlxcI1tBLVphLXpdKy9cbnZhciBhdHRyaWJ1dGUgPSAvXkAoPzpcXCRcXGQrfChgPylbX0EtWmEtel1bX0EtWmEteiQwLTldKlxcMSkvXG4vL3ZhciByZWdleHAgPSAvXlxcLyg/IVxccykoPzpcXC9cXC8pPyg/OlxcXFwufFteXFwvXSkrXFwvL1xuXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSwgcHJldikge1xuICBpZiAoc3RyZWFtLnNvbCgpKSBzdGF0ZS5pbmRlbnRlZCA9IHN0cmVhbS5pbmRlbnRhdGlvbigpXG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkgcmV0dXJuIG51bGxcblxuICB2YXIgY2ggPSBzdHJlYW0ucGVlaygpXG4gIGlmIChjaCA9PSBcIi9cIikge1xuICAgIGlmIChzdHJlYW0ubWF0Y2goXCIvL1wiKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpXG4gICAgICByZXR1cm4gXCJjb21tZW50XCJcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5tYXRjaChcIi8qXCIpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZS5wdXNoKHRva2VuQ29tbWVudClcbiAgICAgIHJldHVybiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSlcbiAgICB9XG4gIH1cbiAgaWYgKHN0cmVhbS5tYXRjaChpbnN0cnVjdGlvbikpIHJldHVybiBcImJ1aWx0aW5cIlxuICBpZiAoc3RyZWFtLm1hdGNoKGF0dHJpYnV0ZSkpIHJldHVybiBcImF0dHJpYnV0ZVwiXG4gIGlmIChzdHJlYW0ubWF0Y2goYmluYXJ5KSkgcmV0dXJuIFwibnVtYmVyXCJcbiAgaWYgKHN0cmVhbS5tYXRjaChvY3RhbCkpIHJldHVybiBcIm51bWJlclwiXG4gIGlmIChzdHJlYW0ubWF0Y2goaGV4YWRlY2ltYWwpKSByZXR1cm4gXCJudW1iZXJcIlxuICBpZiAoc3RyZWFtLm1hdGNoKGRlY2ltYWwpKSByZXR1cm4gXCJudW1iZXJcIlxuICBpZiAoc3RyZWFtLm1hdGNoKHByb3BlcnR5KSkgcmV0dXJuIFwicHJvcGVydHlcIlxuICBpZiAob3BlcmF0b3JzLmluZGV4T2YoY2gpID4gLTEpIHtcbiAgICBzdHJlYW0ubmV4dCgpXG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIlxuICB9XG4gIGlmIChwdW5jLmluZGV4T2YoY2gpID4gLTEpIHtcbiAgICBzdHJlYW0ubmV4dCgpXG4gICAgc3RyZWFtLm1hdGNoKFwiLi5cIilcbiAgICByZXR1cm4gXCJwdW5jdHVhdGlvblwiXG4gIH1cbiAgdmFyIHN0cmluZ01hdGNoXG4gIGlmIChzdHJpbmdNYXRjaCA9IHN0cmVhbS5tYXRjaCgvKFwiXCJcInxcInwnKS8pKSB7XG4gICAgdmFyIHRva2VuaXplID0gdG9rZW5TdHJpbmcuYmluZChudWxsLCBzdHJpbmdNYXRjaFswXSlcbiAgICBzdGF0ZS50b2tlbml6ZS5wdXNoKHRva2VuaXplKVxuICAgIHJldHVybiB0b2tlbml6ZShzdHJlYW0sIHN0YXRlKVxuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChpZGVudGlmaWVyKSkge1xuICAgIHZhciBpZGVudCA9IHN0cmVhbS5jdXJyZW50KClcbiAgICBpZiAodHlwZXMuaGFzT3duUHJvcGVydHkoaWRlbnQpKSByZXR1cm4gXCJ0eXBlXCJcbiAgICBpZiAoYXRvbXMuaGFzT3duUHJvcGVydHkoaWRlbnQpKSByZXR1cm4gXCJhdG9tXCJcbiAgICBpZiAoa2V5d29yZHMuaGFzT3duUHJvcGVydHkoaWRlbnQpKSB7XG4gICAgICBpZiAoZGVmaW5pbmdLZXl3b3Jkcy5oYXNPd25Qcm9wZXJ0eShpZGVudCkpXG4gICAgICAgIHN0YXRlLnByZXYgPSBcImRlZmluZVwiXG4gICAgICByZXR1cm4gXCJrZXl3b3JkXCJcbiAgICB9XG4gICAgaWYgKHByZXYgPT0gXCJkZWZpbmVcIikgcmV0dXJuIFwiZGVmXCJcbiAgICByZXR1cm4gXCJ2YXJpYWJsZVwiXG4gIH1cblxuICBzdHJlYW0ubmV4dCgpXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHRva2VuVW50aWxDbG9zaW5nUGFyZW4oKSB7XG4gIHZhciBkZXB0aCA9IDBcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUsIHByZXYpIHtcbiAgICB2YXIgaW5uZXIgPSB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSwgcHJldilcbiAgICBpZiAoaW5uZXIgPT0gXCJwdW5jdHVhdGlvblwiKSB7XG4gICAgICBpZiAoc3RyZWFtLmN1cnJlbnQoKSA9PSBcIihcIikgKytkZXB0aFxuICAgICAgZWxzZSBpZiAoc3RyZWFtLmN1cnJlbnQoKSA9PSBcIilcIikge1xuICAgICAgICBpZiAoZGVwdGggPT0gMCkge1xuICAgICAgICAgIHN0cmVhbS5iYWNrVXAoMSlcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZS5wb3AoKVxuICAgICAgICAgIHJldHVybiBzdGF0ZS50b2tlbml6ZVtzdGF0ZS50b2tlbml6ZS5sZW5ndGggLSAxXShzdHJlYW0sIHN0YXRlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgLS1kZXB0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5uZXJcbiAgfVxufVxuXG5mdW5jdGlvbiB0b2tlblN0cmluZyhvcGVuUXVvdGUsIHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIHNpbmdsZUxpbmUgPSBvcGVuUXVvdGUubGVuZ3RoID09IDFcbiAgdmFyIGNoLCBlc2NhcGVkID0gZmFsc2VcbiAgd2hpbGUgKGNoID0gc3RyZWFtLnBlZWsoKSkge1xuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBzdHJlYW0ubmV4dCgpXG4gICAgICBpZiAoY2ggPT0gXCIoXCIpIHtcbiAgICAgICAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlblVudGlsQ2xvc2luZ1BhcmVuKCkpXG4gICAgICAgIHJldHVybiBcInN0cmluZ1wiXG4gICAgICB9XG4gICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaChvcGVuUXVvdGUpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZS5wb3AoKVxuICAgICAgcmV0dXJuIFwic3RyaW5nXCJcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyZWFtLm5leHQoKVxuICAgICAgZXNjYXBlZCA9IGNoID09IFwiXFxcXFwiXG4gICAgfVxuICB9XG4gIGlmIChzaW5nbGVMaW5lKSB7XG4gICAgc3RhdGUudG9rZW5pemUucG9wKClcbiAgfVxuICByZXR1cm4gXCJzdHJpbmdcIlxufVxuXG5mdW5jdGlvbiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2hcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzdHJlYW0ubWF0Y2goL15bXi8qXSsvLCB0cnVlKVxuICAgIGNoID0gc3RyZWFtLm5leHQoKVxuICAgIGlmICghY2gpIGJyZWFrXG4gICAgaWYgKGNoID09PSBcIi9cIiAmJiBzdHJlYW0uZWF0KFwiKlwiKSkge1xuICAgICAgc3RhdGUudG9rZW5pemUucHVzaCh0b2tlbkNvbW1lbnQpXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gXCIqXCIgJiYgc3RyZWFtLmVhdChcIi9cIikpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplLnBvcCgpXG4gICAgfVxuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIlxufVxuXG5mdW5jdGlvbiBDb250ZXh0KHByZXYsIGFsaWduLCBpbmRlbnRlZCkge1xuICB0aGlzLnByZXYgPSBwcmV2XG4gIHRoaXMuYWxpZ24gPSBhbGlnblxuICB0aGlzLmluZGVudGVkID0gaW5kZW50ZWRcbn1cblxuZnVuY3Rpb24gcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbSkge1xuICB2YXIgYWxpZ24gPSBzdHJlYW0ubWF0Y2goL15cXHMqKCR8XFwvW1xcL1xcKl18Wyl9XFxdXSkvLCBmYWxzZSkgPyBudWxsIDogc3RyZWFtLmNvbHVtbigpICsgMVxuICBzdGF0ZS5jb250ZXh0ID0gbmV3IENvbnRleHQoc3RhdGUuY29udGV4dCwgYWxpZ24sIHN0YXRlLmluZGVudGVkKVxufVxuXG5mdW5jdGlvbiBwb3BDb250ZXh0KHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5jb250ZXh0KSB7XG4gICAgc3RhdGUuaW5kZW50ZWQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkXG4gICAgc3RhdGUuY29udGV4dCA9IHN0YXRlLmNvbnRleHQucHJldlxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzd2lmdCA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByZXY6IG51bGwsXG4gICAgICBjb250ZXh0OiBudWxsLFxuICAgICAgaW5kZW50ZWQ6IDAsXG4gICAgICB0b2tlbml6ZTogW11cbiAgICB9XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgcHJldiA9IHN0YXRlLnByZXZcbiAgICBzdGF0ZS5wcmV2ID0gbnVsbFxuICAgIHZhciB0b2tlbml6ZSA9IHN0YXRlLnRva2VuaXplW3N0YXRlLnRva2VuaXplLmxlbmd0aCAtIDFdIHx8IHRva2VuQmFzZVxuICAgIHZhciBzdHlsZSA9IHRva2VuaXplKHN0cmVhbSwgc3RhdGUsIHByZXYpXG4gICAgaWYgKCFzdHlsZSB8fCBzdHlsZSA9PSBcImNvbW1lbnRcIikgc3RhdGUucHJldiA9IHByZXZcbiAgICBlbHNlIGlmICghc3RhdGUucHJldikgc3RhdGUucHJldiA9IHN0eWxlXG5cbiAgICBpZiAoc3R5bGUgPT0gXCJwdW5jdHVhdGlvblwiKSB7XG4gICAgICB2YXIgYnJhY2tldCA9IC9bXFwoXFxbXFx7XXwoW1xcXVxcKVxcfV0pLy5leGVjKHN0cmVhbS5jdXJyZW50KCkpXG4gICAgICBpZiAoYnJhY2tldCkgKGJyYWNrZXRbMV0gPyBwb3BDb250ZXh0IDogcHVzaENvbnRleHQpKHN0YXRlLCBzdHJlYW0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlXG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyLCBpQ3gpIHtcbiAgICB2YXIgY3ggPSBzdGF0ZS5jb250ZXh0XG4gICAgaWYgKCFjeCkgcmV0dXJuIDBcbiAgICB2YXIgY2xvc2luZyA9IC9eW1xcXVxcfVxcKV0vLnRlc3QodGV4dEFmdGVyKVxuICAgIGlmIChjeC5hbGlnbiAhPSBudWxsKSByZXR1cm4gY3guYWxpZ24gLSAoY2xvc2luZyA/IDEgOiAwKVxuICAgIHJldHVybiBjeC5pbmRlbnRlZCArIChjbG9zaW5nID8gMCA6IGlDeC51bml0KVxuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGluZGVudE9uSW5wdXQ6IC9eXFxzKltcXClcXH1cXF1dJC8sXG4gICAgY29tbWVudFRva2Vuczoge2xpbmU6IFwiLy9cIiwgYmxvY2s6IHtvcGVuOiBcIi8qXCIsIGNsb3NlOiBcIiovXCJ9fSxcbiAgICBjbG9zZUJyYWNrZXRzOiB7YnJhY2tldHM6IFtcIihcIiwgXCJbXCIsIFwie1wiLCBcIidcIiwgJ1wiJywgXCJgXCJdfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///426\n')}}]);