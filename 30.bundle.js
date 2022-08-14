(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{366:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonLisp", function() { return commonLisp; });\nvar specialForm = /^(block|let*|return-from|catch|load-time-value|setq|eval-when|locally|symbol-macrolet|flet|macrolet|tagbody|function|multiple-value-call|the|go|multiple-value-prog1|throw|if|progn|unwind-protect|labels|progv|let|quote)$/;\nvar assumeBody = /^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/;\nvar numLiteral = /^(?:[+\\-]?(?:\\d+|\\d*\\.\\d+)(?:[efd][+\\-]?\\d+)?|[+\\-]?\\d+(?:\\/[+\\-]?\\d+)?|#b[+\\-]?[01]+|#o[+\\-]?[0-7]+|#x[+\\-]?[\\da-f]+)/;\nvar symbol = /[^\\s\'`,@()\\[\\]";]/;\nvar type;\n\nfunction readSym(stream) {\n  var ch;\n  while (ch = stream.next()) {\n    if (ch == "\\\\") stream.next();\n    else if (!symbol.test(ch)) { stream.backUp(1); break; }\n  }\n  return stream.current();\n}\n\nfunction base(stream, state) {\n  if (stream.eatSpace()) {type = "ws"; return null;}\n  if (stream.match(numLiteral)) return "number";\n  var ch = stream.next();\n  if (ch == "\\\\") ch = stream.next();\n\n  if (ch == \'"\') return (state.tokenize = inString)(stream, state);\n  else if (ch == "(") { type = "open"; return "bracket"; }\n  else if (ch == ")" || ch == "]") { type = "close"; return "bracket"; }\n  else if (ch == ";") { stream.skipToEnd(); type = "ws"; return "comment"; }\n  else if (/[\'`,@]/.test(ch)) return null;\n  else if (ch == "|") {\n    if (stream.skipTo("|")) { stream.next(); return "variableName"; }\n    else { stream.skipToEnd(); return "error"; }\n  } else if (ch == "#") {\n    var ch = stream.next();\n    if (ch == "(") { type = "open"; return "bracket"; }\n    else if (/[+\\-=\\.\']/.test(ch)) return null;\n    else if (/\\d/.test(ch) && stream.match(/^\\d*#/)) return null;\n    else if (ch == "|") return (state.tokenize = inComment)(stream, state);\n    else if (ch == ":") { readSym(stream); return "meta"; }\n    else if (ch == "\\\\") { stream.next(); readSym(stream); return "string.special" }\n    else return "error";\n  } else {\n    var name = readSym(stream);\n    if (name == ".") return null;\n    type = "symbol";\n    if (name == "nil" || name == "t" || name.charAt(0) == ":") return "atom";\n    if (state.lastType == "open" && (specialForm.test(name) || assumeBody.test(name))) return "keyword";\n    if (name.charAt(0) == "&") return "variableName.special";\n    return "variableName";\n  }\n}\n\nfunction inString(stream, state) {\n  var escaped = false, next;\n  while (next = stream.next()) {\n    if (next == \'"\' && !escaped) { state.tokenize = base; break; }\n    escaped = !escaped && next == "\\\\";\n  }\n  return "string";\n}\n\nfunction inComment(stream, state) {\n  var next, last;\n  while (next = stream.next()) {\n    if (next == "#" && last == "|") { state.tokenize = base; break; }\n    last = next;\n  }\n  type = "ws";\n  return "comment";\n}\n\nconst commonLisp = {\n  startState: function () {\n    return {ctx: {prev: null, start: 0, indentTo: 0}, lastType: null, tokenize: base};\n  },\n\n  token: function (stream, state) {\n    if (stream.sol() && typeof state.ctx.indentTo != "number")\n      state.ctx.indentTo = state.ctx.start + 1;\n\n    type = null;\n    var style = state.tokenize(stream, state);\n    if (type != "ws") {\n      if (state.ctx.indentTo == null) {\n        if (type == "symbol" && assumeBody.test(stream.current()))\n          state.ctx.indentTo = state.ctx.start + stream.indentUnit;\n        else\n          state.ctx.indentTo = "next";\n      } else if (state.ctx.indentTo == "next") {\n        state.ctx.indentTo = stream.column();\n      }\n      state.lastType = type;\n    }\n    if (type == "open") state.ctx = {prev: state.ctx, start: stream.column(), indentTo: null};\n    else if (type == "close") state.ctx = state.ctx.prev || state.ctx;\n    return style;\n  },\n\n  indent: function (state) {\n    var i = state.ctx.indentTo;\n    return typeof i == "number" ? i : state.ctx.start + 1;\n  },\n\n  languageData: {\n    commentTokens: {line: ";;", block: {open: "#|", close: "|#"}},\n    closeBrackets: {brackets: ["(", "[", "{", \'"\']}\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvY29tbW9ubGlzcC5qcz8yMDg3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0JBQWtCLE9BQU87QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGVBQWUsa0JBQWtCO0FBQ3hELG9DQUFvQyxnQkFBZ0Isa0JBQWtCO0FBQ3RFLG1CQUFtQixJQUFJLG9CQUFvQixhQUFhLGtCQUFrQjtBQUMxRTtBQUNBO0FBQ0EsNkJBQTZCLGVBQWUsdUJBQXVCO0FBQ25FLFVBQVUsb0JBQW9CLGdCQUFnQjtBQUM5QyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsZUFBZSxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlCQUFpQixlQUFlO0FBQ3pELDBCQUEwQixlQUFlLGlCQUFpQjtBQUMxRDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVCQUF1QixPQUFPO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx1QkFBdUIsT0FBTztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxZQUFZLE1BQU0sa0NBQWtDO0FBQ3BELEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLG9CQUFvQixTQUFTLFdBQVcseUJBQXlCO0FBQ2pFLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQSIsImZpbGUiOiIzNjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3BlY2lhbEZvcm0gPSAvXihibG9ja3xsZXQqfHJldHVybi1mcm9tfGNhdGNofGxvYWQtdGltZS12YWx1ZXxzZXRxfGV2YWwtd2hlbnxsb2NhbGx5fHN5bWJvbC1tYWNyb2xldHxmbGV0fG1hY3JvbGV0fHRhZ2JvZHl8ZnVuY3Rpb258bXVsdGlwbGUtdmFsdWUtY2FsbHx0aGV8Z298bXVsdGlwbGUtdmFsdWUtcHJvZzF8dGhyb3d8aWZ8cHJvZ258dW53aW5kLXByb3RlY3R8bGFiZWxzfHByb2d2fGxldHxxdW90ZSkkLztcbnZhciBhc3N1bWVCb2R5ID0gL153aXRofF5kZWZ8XmRvfF5wcm9nfGNhc2UkfF5jb25kJHxiaW5kJHx3aGVuJHx1bmxlc3MkLztcbnZhciBudW1MaXRlcmFsID0gL14oPzpbK1xcLV0/KD86XFxkK3xcXGQqXFwuXFxkKykoPzpbZWZkXVsrXFwtXT9cXGQrKT98WytcXC1dP1xcZCsoPzpcXC9bK1xcLV0/XFxkKyk/fCNiWytcXC1dP1swMV0rfCNvWytcXC1dP1swLTddK3wjeFsrXFwtXT9bXFxkYS1mXSspLztcbnZhciBzeW1ib2wgPSAvW15cXHMnYCxAKClcXFtcXF1cIjtdLztcbnZhciB0eXBlO1xuXG5mdW5jdGlvbiByZWFkU3ltKHN0cmVhbSkge1xuICB2YXIgY2g7XG4gIHdoaWxlIChjaCA9IHN0cmVhbS5uZXh0KCkpIHtcbiAgICBpZiAoY2ggPT0gXCJcXFxcXCIpIHN0cmVhbS5uZXh0KCk7XG4gICAgZWxzZSBpZiAoIXN5bWJvbC50ZXN0KGNoKSkgeyBzdHJlYW0uYmFja1VwKDEpOyBicmVhazsgfVxuICB9XG4gIHJldHVybiBzdHJlYW0uY3VycmVudCgpO1xufVxuXG5mdW5jdGlvbiBiYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7dHlwZSA9IFwid3NcIjsgcmV0dXJuIG51bGw7fVxuICBpZiAoc3RyZWFtLm1hdGNoKG51bUxpdGVyYWwpKSByZXR1cm4gXCJudW1iZXJcIjtcbiAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoID09IFwiXFxcXFwiKSBjaCA9IHN0cmVhbS5uZXh0KCk7XG5cbiAgaWYgKGNoID09ICdcIicpIHJldHVybiAoc3RhdGUudG9rZW5pemUgPSBpblN0cmluZykoc3RyZWFtLCBzdGF0ZSk7XG4gIGVsc2UgaWYgKGNoID09IFwiKFwiKSB7IHR5cGUgPSBcIm9wZW5cIjsgcmV0dXJuIFwiYnJhY2tldFwiOyB9XG4gIGVsc2UgaWYgKGNoID09IFwiKVwiIHx8IGNoID09IFwiXVwiKSB7IHR5cGUgPSBcImNsb3NlXCI7IHJldHVybiBcImJyYWNrZXRcIjsgfVxuICBlbHNlIGlmIChjaCA9PSBcIjtcIikgeyBzdHJlYW0uc2tpcFRvRW5kKCk7IHR5cGUgPSBcIndzXCI7IHJldHVybiBcImNvbW1lbnRcIjsgfVxuICBlbHNlIGlmICgvWydgLEBdLy50ZXN0KGNoKSkgcmV0dXJuIG51bGw7XG4gIGVsc2UgaWYgKGNoID09IFwifFwiKSB7XG4gICAgaWYgKHN0cmVhbS5za2lwVG8oXCJ8XCIpKSB7IHN0cmVhbS5uZXh0KCk7IHJldHVybiBcInZhcmlhYmxlTmFtZVwiOyB9XG4gICAgZWxzZSB7IHN0cmVhbS5za2lwVG9FbmQoKTsgcmV0dXJuIFwiZXJyb3JcIjsgfVxuICB9IGVsc2UgaWYgKGNoID09IFwiI1wiKSB7XG4gICAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgICBpZiAoY2ggPT0gXCIoXCIpIHsgdHlwZSA9IFwib3BlblwiOyByZXR1cm4gXCJicmFja2V0XCI7IH1cbiAgICBlbHNlIGlmICgvWytcXC09XFwuJ10vLnRlc3QoY2gpKSByZXR1cm4gbnVsbDtcbiAgICBlbHNlIGlmICgvXFxkLy50ZXN0KGNoKSAmJiBzdHJlYW0ubWF0Y2goL15cXGQqIy8pKSByZXR1cm4gbnVsbDtcbiAgICBlbHNlIGlmIChjaCA9PSBcInxcIikgcmV0dXJuIChzdGF0ZS50b2tlbml6ZSA9IGluQ29tbWVudCkoc3RyZWFtLCBzdGF0ZSk7XG4gICAgZWxzZSBpZiAoY2ggPT0gXCI6XCIpIHsgcmVhZFN5bShzdHJlYW0pOyByZXR1cm4gXCJtZXRhXCI7IH1cbiAgICBlbHNlIGlmIChjaCA9PSBcIlxcXFxcIikgeyBzdHJlYW0ubmV4dCgpOyByZWFkU3ltKHN0cmVhbSk7IHJldHVybiBcInN0cmluZy5zcGVjaWFsXCIgfVxuICAgIGVsc2UgcmV0dXJuIFwiZXJyb3JcIjtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbmFtZSA9IHJlYWRTeW0oc3RyZWFtKTtcbiAgICBpZiAobmFtZSA9PSBcIi5cIikgcmV0dXJuIG51bGw7XG4gICAgdHlwZSA9IFwic3ltYm9sXCI7XG4gICAgaWYgKG5hbWUgPT0gXCJuaWxcIiB8fCBuYW1lID09IFwidFwiIHx8IG5hbWUuY2hhckF0KDApID09IFwiOlwiKSByZXR1cm4gXCJhdG9tXCI7XG4gICAgaWYgKHN0YXRlLmxhc3RUeXBlID09IFwib3BlblwiICYmIChzcGVjaWFsRm9ybS50ZXN0KG5hbWUpIHx8IGFzc3VtZUJvZHkudGVzdChuYW1lKSkpIHJldHVybiBcImtleXdvcmRcIjtcbiAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gXCImXCIpIHJldHVybiBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmV0dXJuIFwidmFyaWFibGVOYW1lXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5TdHJpbmcoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBuZXh0O1xuICB3aGlsZSAobmV4dCA9IHN0cmVhbS5uZXh0KCkpIHtcbiAgICBpZiAobmV4dCA9PSAnXCInICYmICFlc2NhcGVkKSB7IHN0YXRlLnRva2VuaXplID0gYmFzZTsgYnJlYWs7IH1cbiAgICBlc2NhcGVkID0gIWVzY2FwZWQgJiYgbmV4dCA9PSBcIlxcXFxcIjtcbiAgfVxuICByZXR1cm4gXCJzdHJpbmdcIjtcbn1cblxuZnVuY3Rpb24gaW5Db21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG5leHQsIGxhc3Q7XG4gIHdoaWxlIChuZXh0ID0gc3RyZWFtLm5leHQoKSkge1xuICAgIGlmIChuZXh0ID09IFwiI1wiICYmIGxhc3QgPT0gXCJ8XCIpIHsgc3RhdGUudG9rZW5pemUgPSBiYXNlOyBicmVhazsgfVxuICAgIGxhc3QgPSBuZXh0O1xuICB9XG4gIHR5cGUgPSBcIndzXCI7XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbW1vbkxpc3AgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge2N0eDoge3ByZXY6IG51bGwsIHN0YXJ0OiAwLCBpbmRlbnRUbzogMH0sIGxhc3RUeXBlOiBudWxsLCB0b2tlbml6ZTogYmFzZX07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uIChzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKHN0cmVhbS5zb2woKSAmJiB0eXBlb2Ygc3RhdGUuY3R4LmluZGVudFRvICE9IFwibnVtYmVyXCIpXG4gICAgICBzdGF0ZS5jdHguaW5kZW50VG8gPSBzdGF0ZS5jdHguc3RhcnQgKyAxO1xuXG4gICAgdHlwZSA9IG51bGw7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKHR5cGUgIT0gXCJ3c1wiKSB7XG4gICAgICBpZiAoc3RhdGUuY3R4LmluZGVudFRvID09IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJzeW1ib2xcIiAmJiBhc3N1bWVCb2R5LnRlc3Qoc3RyZWFtLmN1cnJlbnQoKSkpXG4gICAgICAgICAgc3RhdGUuY3R4LmluZGVudFRvID0gc3RhdGUuY3R4LnN0YXJ0ICsgc3RyZWFtLmluZGVudFVuaXQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzdGF0ZS5jdHguaW5kZW50VG8gPSBcIm5leHRcIjtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuY3R4LmluZGVudFRvID09IFwibmV4dFwiKSB7XG4gICAgICAgIHN0YXRlLmN0eC5pbmRlbnRUbyA9IHN0cmVhbS5jb2x1bW4oKTtcbiAgICAgIH1cbiAgICAgIHN0YXRlLmxhc3RUeXBlID0gdHlwZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gXCJvcGVuXCIpIHN0YXRlLmN0eCA9IHtwcmV2OiBzdGF0ZS5jdHgsIHN0YXJ0OiBzdHJlYW0uY29sdW1uKCksIGluZGVudFRvOiBudWxsfTtcbiAgICBlbHNlIGlmICh0eXBlID09IFwiY2xvc2VcIikgc3RhdGUuY3R4ID0gc3RhdGUuY3R4LnByZXYgfHwgc3RhdGUuY3R4O1xuICAgIHJldHVybiBzdHlsZTtcbiAgfSxcblxuICBpbmRlbnQ6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIHZhciBpID0gc3RhdGUuY3R4LmluZGVudFRvO1xuICAgIHJldHVybiB0eXBlb2YgaSA9PSBcIm51bWJlclwiID8gaSA6IHN0YXRlLmN0eC5zdGFydCArIDE7XG4gIH0sXG5cbiAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgY29tbWVudFRva2Vuczoge2xpbmU6IFwiOztcIiwgYmxvY2s6IHtvcGVuOiBcIiN8XCIsIGNsb3NlOiBcInwjXCJ9fSxcbiAgICBjbG9zZUJyYWNrZXRzOiB7YnJhY2tldHM6IFtcIihcIiwgXCJbXCIsIFwie1wiLCAnXCInXX1cbiAgfVxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///366\n')}}]);