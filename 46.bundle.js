(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[46],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/go.js":
/*!**********************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/go.js ***!
  \**********************************************************/
/*! exports provided: go */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"go\", function() { return go; });\nvar keywords = {\n  \"break\":true, \"case\":true, \"chan\":true, \"const\":true, \"continue\":true,\n  \"default\":true, \"defer\":true, \"else\":true, \"fallthrough\":true, \"for\":true,\n  \"func\":true, \"go\":true, \"goto\":true, \"if\":true, \"import\":true,\n  \"interface\":true, \"map\":true, \"package\":true, \"range\":true, \"return\":true,\n  \"select\":true, \"struct\":true, \"switch\":true, \"type\":true, \"var\":true,\n  \"bool\":true, \"byte\":true, \"complex64\":true, \"complex128\":true,\n  \"float32\":true, \"float64\":true, \"int8\":true, \"int16\":true, \"int32\":true,\n  \"int64\":true, \"string\":true, \"uint8\":true, \"uint16\":true, \"uint32\":true,\n  \"uint64\":true, \"int\":true, \"uint\":true, \"uintptr\":true, \"error\": true,\n  \"rune\":true\n};\n\nvar atoms = {\n  \"true\":true, \"false\":true, \"iota\":true, \"nil\":true, \"append\":true,\n  \"cap\":true, \"close\":true, \"complex\":true, \"copy\":true, \"delete\":true, \"imag\":true,\n  \"len\":true, \"make\":true, \"new\":true, \"panic\":true, \"print\":true,\n  \"println\":true, \"real\":true, \"recover\":true\n};\n\nvar isOperatorChar = /[+\\-*&^%:=<>!|\\/]/;\n\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == '\"' || ch == \"'\" || ch == \"`\") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[\\d\\.]/.test(ch)) {\n    if (ch == \".\") {\n      stream.match(/^[0-9]+([eE][\\-+]?[0-9]+)?/);\n    } else if (ch == \"0\") {\n      stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);\n    } else {\n      stream.match(/^[0-9]*\\.?[0-9]*([eE][\\-+]?[0-9]+)?/);\n    }\n    return \"number\";\n  }\n  if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    curPunc = ch;\n    return null;\n  }\n  if (ch == \"/\") {\n    if (stream.eat(\"*\")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n    if (stream.eat(\"/\")) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"operator\";\n  }\n  stream.eatWhile(/[\\w\\$_\\xa1-\\uffff]/);\n  var cur = stream.current();\n  if (keywords.propertyIsEnumerable(cur)) {\n    if (cur == \"case\" || cur == \"default\") curPunc = \"case\";\n    return \"keyword\";\n  }\n  if (atoms.propertyIsEnumerable(cur)) return \"atom\";\n  return \"variable\";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && quote != \"`\" && next == \"\\\\\";\n    }\n    if (end || !(escaped || quote == \"`\"))\n      state.tokenize = tokenBase;\n    return \"string\";\n  };\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"/\" && maybeEnd) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return \"comment\";\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\nfunction popContext(state) {\n  if (!state.context.prev) return;\n  var t = state.context.type;\n  if (t == \")\" || t == \"]\" || t == \"}\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\n\nconst go = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n      if (ctx.type == \"case\") ctx.type = \"}\";\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == \"comment\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n    else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n    else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n    else if (curPunc == \"case\") ctx.type = \"case\";\n    else if (curPunc == \"}\" && ctx.type == \"}\") popContext(state);\n    else if (curPunc == ctx.type) popContext(state);\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return null;\n    var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);\n    if (ctx.type == \"case\" && /^(?:case|default)\\b/.test(textAfter)) {\n      state.context.type = \"}\";\n      return ctx.indented;\n    }\n    var closing = firstChar == ctx.type;\n    if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s([{}]|case |default\\s*:)$/,\n    commentTokens: {line: \"//\", block: {open: \"/*\", close: \"*/\"}}\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZ28uanM/ODJiOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHlDQUF5QztBQUM5RDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUJBQW1CO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwyQkFBMkI7QUFDM0Isb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL0Bjb2RlbWlycm9yL2xlZ2FjeS1tb2Rlcy9tb2RlL2dvLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGtleXdvcmRzID0ge1xuICBcImJyZWFrXCI6dHJ1ZSwgXCJjYXNlXCI6dHJ1ZSwgXCJjaGFuXCI6dHJ1ZSwgXCJjb25zdFwiOnRydWUsIFwiY29udGludWVcIjp0cnVlLFxuICBcImRlZmF1bHRcIjp0cnVlLCBcImRlZmVyXCI6dHJ1ZSwgXCJlbHNlXCI6dHJ1ZSwgXCJmYWxsdGhyb3VnaFwiOnRydWUsIFwiZm9yXCI6dHJ1ZSxcbiAgXCJmdW5jXCI6dHJ1ZSwgXCJnb1wiOnRydWUsIFwiZ290b1wiOnRydWUsIFwiaWZcIjp0cnVlLCBcImltcG9ydFwiOnRydWUsXG4gIFwiaW50ZXJmYWNlXCI6dHJ1ZSwgXCJtYXBcIjp0cnVlLCBcInBhY2thZ2VcIjp0cnVlLCBcInJhbmdlXCI6dHJ1ZSwgXCJyZXR1cm5cIjp0cnVlLFxuICBcInNlbGVjdFwiOnRydWUsIFwic3RydWN0XCI6dHJ1ZSwgXCJzd2l0Y2hcIjp0cnVlLCBcInR5cGVcIjp0cnVlLCBcInZhclwiOnRydWUsXG4gIFwiYm9vbFwiOnRydWUsIFwiYnl0ZVwiOnRydWUsIFwiY29tcGxleDY0XCI6dHJ1ZSwgXCJjb21wbGV4MTI4XCI6dHJ1ZSxcbiAgXCJmbG9hdDMyXCI6dHJ1ZSwgXCJmbG9hdDY0XCI6dHJ1ZSwgXCJpbnQ4XCI6dHJ1ZSwgXCJpbnQxNlwiOnRydWUsIFwiaW50MzJcIjp0cnVlLFxuICBcImludDY0XCI6dHJ1ZSwgXCJzdHJpbmdcIjp0cnVlLCBcInVpbnQ4XCI6dHJ1ZSwgXCJ1aW50MTZcIjp0cnVlLCBcInVpbnQzMlwiOnRydWUsXG4gIFwidWludDY0XCI6dHJ1ZSwgXCJpbnRcIjp0cnVlLCBcInVpbnRcIjp0cnVlLCBcInVpbnRwdHJcIjp0cnVlLCBcImVycm9yXCI6IHRydWUsXG4gIFwicnVuZVwiOnRydWVcbn07XG5cbnZhciBhdG9tcyA9IHtcbiAgXCJ0cnVlXCI6dHJ1ZSwgXCJmYWxzZVwiOnRydWUsIFwiaW90YVwiOnRydWUsIFwibmlsXCI6dHJ1ZSwgXCJhcHBlbmRcIjp0cnVlLFxuICBcImNhcFwiOnRydWUsIFwiY2xvc2VcIjp0cnVlLCBcImNvbXBsZXhcIjp0cnVlLCBcImNvcHlcIjp0cnVlLCBcImRlbGV0ZVwiOnRydWUsIFwiaW1hZ1wiOnRydWUsXG4gIFwibGVuXCI6dHJ1ZSwgXCJtYWtlXCI6dHJ1ZSwgXCJuZXdcIjp0cnVlLCBcInBhbmljXCI6dHJ1ZSwgXCJwcmludFwiOnRydWUsXG4gIFwicHJpbnRsblwiOnRydWUsIFwicmVhbFwiOnRydWUsIFwicmVjb3ZlclwiOnRydWVcbn07XG5cbnZhciBpc09wZXJhdG9yQ2hhciA9IC9bK1xcLSomXiU6PTw+IXxcXC9dLztcblxudmFyIGN1clB1bmM7XG5cbmZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG4gIGlmIChjaCA9PSAnXCInIHx8IGNoID09IFwiJ1wiIHx8IGNoID09IFwiYFwiKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZyhjaCk7XG4gICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmICgvW1xcZFxcLl0vLnRlc3QoY2gpKSB7XG4gICAgaWYgKGNoID09IFwiLlwiKSB7XG4gICAgICBzdHJlYW0ubWF0Y2goL15bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPy8pO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIwXCIpIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlt4WF1bMC05YS1mQS1GXSsvKSB8fCBzdHJlYW0ubWF0Y2goL14wWzAtN10rLyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlswLTldKlxcLj9bMC05XSooW2VFXVtcXC0rXT9bMC05XSspPy8pO1xuICAgIH1cbiAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgfVxuICBpZiAoL1tcXFtcXF17fVxcKFxcKSw7XFw6XFwuXS8udGVzdChjaCkpIHtcbiAgICBjdXJQdW5jID0gY2g7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNoID09IFwiL1wiKSB7XG4gICAgaWYgKHN0cmVhbS5lYXQoXCIqXCIpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQ29tbWVudDtcbiAgICAgIHJldHVybiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuICAgIGlmIChzdHJlYW0uZWF0KFwiL1wiKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgIH1cbiAgfVxuICBpZiAoaXNPcGVyYXRvckNoYXIudGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoaXNPcGVyYXRvckNoYXIpO1xuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH1cbiAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFwkX1xceGExLVxcdWZmZmZdLyk7XG4gIHZhciBjdXIgPSBzdHJlYW0uY3VycmVudCgpO1xuICBpZiAoa2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkge1xuICAgIGlmIChjdXIgPT0gXCJjYXNlXCIgfHwgY3VyID09IFwiZGVmYXVsdFwiKSBjdXJQdW5jID0gXCJjYXNlXCI7XG4gICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICB9XG4gIGlmIChhdG9tcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSByZXR1cm4gXCJhdG9tXCI7XG4gIHJldHVybiBcInZhcmlhYmxlXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuU3RyaW5nKHF1b3RlKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgbmV4dCwgZW5kID0gZmFsc2U7XG4gICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKG5leHQgPT0gcXVvdGUgJiYgIWVzY2FwZWQpIHtlbmQgPSB0cnVlOyBicmVhazt9XG4gICAgICBlc2NhcGVkID0gIWVzY2FwZWQgJiYgcXVvdGUgIT0gXCJgXCIgJiYgbmV4dCA9PSBcIlxcXFxcIjtcbiAgICB9XG4gICAgaWYgKGVuZCB8fCAhKGVzY2FwZWQgfHwgcXVvdGUgPT0gXCJgXCIpKVxuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRva2VuQ29tbWVudChzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBtYXliZUVuZCA9IGZhbHNlLCBjaDtcbiAgd2hpbGUgKGNoID0gc3RyZWFtLm5leHQoKSkge1xuICAgIGlmIChjaCA9PSBcIi9cIiAmJiBtYXliZUVuZCkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbWF5YmVFbmQgPSAoY2ggPT0gXCIqXCIpO1xuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cblxuZnVuY3Rpb24gQ29udGV4dChpbmRlbnRlZCwgY29sdW1uLCB0eXBlLCBhbGlnbiwgcHJldikge1xuICB0aGlzLmluZGVudGVkID0gaW5kZW50ZWQ7XG4gIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFsaWduID0gYWxpZ247XG4gIHRoaXMucHJldiA9IHByZXY7XG59XG5mdW5jdGlvbiBwdXNoQ29udGV4dChzdGF0ZSwgY29sLCB0eXBlKSB7XG4gIHJldHVybiBzdGF0ZS5jb250ZXh0ID0gbmV3IENvbnRleHQoc3RhdGUuaW5kZW50ZWQsIGNvbCwgdHlwZSwgbnVsbCwgc3RhdGUuY29udGV4dCk7XG59XG5mdW5jdGlvbiBwb3BDb250ZXh0KHN0YXRlKSB7XG4gIGlmICghc3RhdGUuY29udGV4dC5wcmV2KSByZXR1cm47XG4gIHZhciB0ID0gc3RhdGUuY29udGV4dC50eXBlO1xuICBpZiAodCA9PSBcIilcIiB8fCB0ID09IFwiXVwiIHx8IHQgPT0gXCJ9XCIpXG4gICAgc3RhdGUuaW5kZW50ZWQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkO1xuICByZXR1cm4gc3RhdGUuY29udGV4dCA9IHN0YXRlLmNvbnRleHQucHJldjtcbn1cblxuLy8gSW50ZXJmYWNlXG5cbmV4cG9ydCBjb25zdCBnbyA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oaW5kZW50VW5pdCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbml6ZTogbnVsbCxcbiAgICAgIGNvbnRleHQ6IG5ldyBDb250ZXh0KC1pbmRlbnRVbml0LCAwLCBcInRvcFwiLCBmYWxzZSksXG4gICAgICBpbmRlbnRlZDogMCxcbiAgICAgIHN0YXJ0T2ZMaW5lOiB0cnVlXG4gICAgfTtcbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBjdHggPSBzdGF0ZS5jb250ZXh0O1xuICAgIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAgIGlmIChjdHguYWxpZ24gPT0gbnVsbCkgY3R4LmFsaWduID0gZmFsc2U7XG4gICAgICBzdGF0ZS5pbmRlbnRlZCA9IHN0cmVhbS5pbmRlbnRhdGlvbigpO1xuICAgICAgc3RhdGUuc3RhcnRPZkxpbmUgPSB0cnVlO1xuICAgICAgaWYgKGN0eC50eXBlID09IFwiY2FzZVwiKSBjdHgudHlwZSA9IFwifVwiO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHJldHVybiBudWxsO1xuICAgIGN1clB1bmMgPSBudWxsO1xuICAgIHZhciBzdHlsZSA9IChzdGF0ZS50b2tlbml6ZSB8fCB0b2tlbkJhc2UpKHN0cmVhbSwgc3RhdGUpO1xuICAgIGlmIChzdHlsZSA9PSBcImNvbW1lbnRcIikgcmV0dXJuIHN0eWxlO1xuICAgIGlmIChjdHguYWxpZ24gPT0gbnVsbCkgY3R4LmFsaWduID0gdHJ1ZTtcblxuICAgIGlmIChjdXJQdW5jID09IFwie1wiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIn1cIik7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIltcIikgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJdXCIpO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCIoXCIpIHB1c2hDb250ZXh0KHN0YXRlLCBzdHJlYW0uY29sdW1uKCksIFwiKVwiKTtcbiAgICBlbHNlIGlmIChjdXJQdW5jID09IFwiY2FzZVwiKSBjdHgudHlwZSA9IFwiY2FzZVwiO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCJ9XCIgJiYgY3R4LnR5cGUgPT0gXCJ9XCIpIHBvcENvbnRleHQoc3RhdGUpO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gY3R4LnR5cGUpIHBvcENvbnRleHQoc3RhdGUpO1xuICAgIHN0YXRlLnN0YXJ0T2ZMaW5lID0gZmFsc2U7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuXG4gIGluZGVudDogZnVuY3Rpb24oc3RhdGUsIHRleHRBZnRlciwgY3gpIHtcbiAgICBpZiAoc3RhdGUudG9rZW5pemUgIT0gdG9rZW5CYXNlICYmIHN0YXRlLnRva2VuaXplICE9IG51bGwpIHJldHVybiBudWxsO1xuICAgIHZhciBjdHggPSBzdGF0ZS5jb250ZXh0LCBmaXJzdENoYXIgPSB0ZXh0QWZ0ZXIgJiYgdGV4dEFmdGVyLmNoYXJBdCgwKTtcbiAgICBpZiAoY3R4LnR5cGUgPT0gXCJjYXNlXCIgJiYgL14oPzpjYXNlfGRlZmF1bHQpXFxiLy50ZXN0KHRleHRBZnRlcikpIHtcbiAgICAgIHN0YXRlLmNvbnRleHQudHlwZSA9IFwifVwiO1xuICAgICAgcmV0dXJuIGN0eC5pbmRlbnRlZDtcbiAgICB9XG4gICAgdmFyIGNsb3NpbmcgPSBmaXJzdENoYXIgPT0gY3R4LnR5cGU7XG4gICAgaWYgKGN0eC5hbGlnbikgcmV0dXJuIGN0eC5jb2x1bW4gKyAoY2xvc2luZyA/IDAgOiAxKTtcbiAgICBlbHNlIHJldHVybiBjdHguaW5kZW50ZWQgKyAoY2xvc2luZyA/IDAgOiBjeC51bml0KTtcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBpbmRlbnRPbklucHV0OiAvXlxccyhbe31dfGNhc2UgfGRlZmF1bHRcXHMqOikkLyxcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCIvL1wiLCBibG9jazoge29wZW46IFwiLypcIiwgY2xvc2U6IFwiKi9cIn19XG4gIH1cbn07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/go.js\n");

/***/ })

}]);