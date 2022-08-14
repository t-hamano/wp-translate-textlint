(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{406:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pascal", function() { return pascal; });\nfunction words(str) {\n  var obj = {}, words = str.split(" ");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\nvar keywords = words(\n  "absolute and array asm begin case const constructor destructor div do " +\n    "downto else end file for function goto if implementation in inherited " +\n    "inline interface label mod nil not object of operator or packed procedure " +\n    "program record reintroduce repeat self set shl shr string then to type " +\n    "unit until uses var while with xor as class dispinterface except exports " +\n    "finalization finally initialization inline is library on out packed " +\n    "property raise resourcestring threadvar try absolute abstract alias " +\n    "assembler bitpacked break cdecl continue cppdecl cvar default deprecated " +\n    "dynamic enumerator experimental export external far far16 forward generic " +\n    "helper implements index interrupt iocheck local message name near " +\n    "nodefault noreturn nostackframe oldfpccall otherwise overload override " +\n    "pascal platform private protected public published read register " +\n    "reintroduce result safecall saveregisters softfloat specialize static " +\n    "stdcall stored strict unaligned unimplemented varargs virtual write");\nvar atoms = {"null": true};\n\nvar isOperatorChar = /[+\\-*&%=<>!?|\\/]/;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == "#" && state.startOfLine) {\n    stream.skipToEnd();\n    return "meta";\n  }\n  if (ch == \'"\' || ch == "\'") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (ch == "(" && stream.eat("*")) {\n    state.tokenize = tokenComment;\n    return tokenComment(stream, state);\n  }\n  if (ch == "{") {\n    state.tokenize = tokenCommentBraces;\n    return tokenCommentBraces(stream, state);\n  }\n  if (/[\\[\\]\\(\\),;\\:\\.]/.test(ch)) {\n    return null;\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    return "number";\n  }\n  if (ch == "/") {\n    if (stream.eat("/")) {\n      stream.skipToEnd();\n      return "comment";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return "operator";\n  }\n  stream.eatWhile(/[\\w\\$_]/);\n  var cur = stream.current();\n  if (keywords.propertyIsEnumerable(cur)) return "keyword";\n  if (atoms.propertyIsEnumerable(cur)) return "atom";\n  return "variable";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == "\\\\";\n    }\n    if (end || !escaped) state.tokenize = null;\n    return "string";\n  };\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == ")" && maybeEnd) {\n      state.tokenize = null;\n      break;\n    }\n    maybeEnd = (ch == "*");\n  }\n  return "comment";\n}\n\nfunction tokenCommentBraces(stream, state) {\n  var ch;\n  while (ch = stream.next()) {\n    if (ch == "}") {\n      state.tokenize = null;\n      break;\n    }\n  }\n  return "comment";\n}\n\n// Interface\n\nconst pascal = {\n  startState: function() {\n    return {tokenize: null};\n  },\n\n  token: function(stream, state) {\n    if (stream.eatSpace()) return null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == "comment" || style == "meta") return style;\n    return style;\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {block: {open: "(*", close: "*)"}}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvcGFzY2FsLmpzP2FiMTEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0EsY0FBYztBQUNkLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsV0FBVztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQSxZQUFZO0FBQ1osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDJCQUEyQjtBQUMzQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBIiwiZmlsZSI6IjQwNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkgb2JqW3dvcmRzW2ldXSA9IHRydWU7XG4gIHJldHVybiBvYmo7XG59XG52YXIga2V5d29yZHMgPSB3b3JkcyhcbiAgXCJhYnNvbHV0ZSBhbmQgYXJyYXkgYXNtIGJlZ2luIGNhc2UgY29uc3QgY29uc3RydWN0b3IgZGVzdHJ1Y3RvciBkaXYgZG8gXCIgK1xuICAgIFwiZG93bnRvIGVsc2UgZW5kIGZpbGUgZm9yIGZ1bmN0aW9uIGdvdG8gaWYgaW1wbGVtZW50YXRpb24gaW4gaW5oZXJpdGVkIFwiICtcbiAgICBcImlubGluZSBpbnRlcmZhY2UgbGFiZWwgbW9kIG5pbCBub3Qgb2JqZWN0IG9mIG9wZXJhdG9yIG9yIHBhY2tlZCBwcm9jZWR1cmUgXCIgK1xuICAgIFwicHJvZ3JhbSByZWNvcmQgcmVpbnRyb2R1Y2UgcmVwZWF0IHNlbGYgc2V0IHNobCBzaHIgc3RyaW5nIHRoZW4gdG8gdHlwZSBcIiArXG4gICAgXCJ1bml0IHVudGlsIHVzZXMgdmFyIHdoaWxlIHdpdGggeG9yIGFzIGNsYXNzIGRpc3BpbnRlcmZhY2UgZXhjZXB0IGV4cG9ydHMgXCIgK1xuICAgIFwiZmluYWxpemF0aW9uIGZpbmFsbHkgaW5pdGlhbGl6YXRpb24gaW5saW5lIGlzIGxpYnJhcnkgb24gb3V0IHBhY2tlZCBcIiArXG4gICAgXCJwcm9wZXJ0eSByYWlzZSByZXNvdXJjZXN0cmluZyB0aHJlYWR2YXIgdHJ5IGFic29sdXRlIGFic3RyYWN0IGFsaWFzIFwiICtcbiAgICBcImFzc2VtYmxlciBiaXRwYWNrZWQgYnJlYWsgY2RlY2wgY29udGludWUgY3BwZGVjbCBjdmFyIGRlZmF1bHQgZGVwcmVjYXRlZCBcIiArXG4gICAgXCJkeW5hbWljIGVudW1lcmF0b3IgZXhwZXJpbWVudGFsIGV4cG9ydCBleHRlcm5hbCBmYXIgZmFyMTYgZm9yd2FyZCBnZW5lcmljIFwiICtcbiAgICBcImhlbHBlciBpbXBsZW1lbnRzIGluZGV4IGludGVycnVwdCBpb2NoZWNrIGxvY2FsIG1lc3NhZ2UgbmFtZSBuZWFyIFwiICtcbiAgICBcIm5vZGVmYXVsdCBub3JldHVybiBub3N0YWNrZnJhbWUgb2xkZnBjY2FsbCBvdGhlcndpc2Ugb3ZlcmxvYWQgb3ZlcnJpZGUgXCIgK1xuICAgIFwicGFzY2FsIHBsYXRmb3JtIHByaXZhdGUgcHJvdGVjdGVkIHB1YmxpYyBwdWJsaXNoZWQgcmVhZCByZWdpc3RlciBcIiArXG4gICAgXCJyZWludHJvZHVjZSByZXN1bHQgc2FmZWNhbGwgc2F2ZXJlZ2lzdGVycyBzb2Z0ZmxvYXQgc3BlY2lhbGl6ZSBzdGF0aWMgXCIgK1xuICAgIFwic3RkY2FsbCBzdG9yZWQgc3RyaWN0IHVuYWxpZ25lZCB1bmltcGxlbWVudGVkIHZhcmFyZ3MgdmlydHVhbCB3cml0ZVwiKTtcbnZhciBhdG9tcyA9IHtcIm51bGxcIjogdHJ1ZX07XG5cbnZhciBpc09wZXJhdG9yQ2hhciA9IC9bK1xcLSomJT08PiE/fFxcL10vO1xuXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuICBpZiAoY2ggPT0gXCIjXCIgJiYgc3RhdGUuc3RhcnRPZkxpbmUpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIFwibWV0YVwiO1xuICB9XG4gIGlmIChjaCA9PSAnXCInIHx8IGNoID09IFwiJ1wiKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZyhjaCk7XG4gICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmIChjaCA9PSBcIihcIiAmJiBzdHJlYW0uZWF0KFwiKlwiKSkge1xuICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5Db21tZW50O1xuICAgIHJldHVybiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgaWYgKGNoID09IFwie1wiKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkNvbW1lbnRCcmFjZXM7XG4gICAgcmV0dXJuIHRva2VuQ29tbWVudEJyYWNlcyhzdHJlYW0sIHN0YXRlKTtcbiAgfVxuICBpZiAoL1tcXFtcXF1cXChcXCksO1xcOlxcLl0vLnRlc3QoY2gpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKC9cXGQvLnRlc3QoY2gpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFwuXS8pO1xuICAgIHJldHVybiBcIm51bWJlclwiO1xuICB9XG4gIGlmIChjaCA9PSBcIi9cIikge1xuICAgIGlmIChzdHJlYW0uZWF0KFwiL1wiKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgIH1cbiAgfVxuICBpZiAoaXNPcGVyYXRvckNoYXIudGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoaXNPcGVyYXRvckNoYXIpO1xuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH1cbiAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFwkX10vKTtcbiAgdmFyIGN1ciA9IHN0cmVhbS5jdXJyZW50KCk7XG4gIGlmIChrZXl3b3Jkcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSByZXR1cm4gXCJrZXl3b3JkXCI7XG4gIGlmIChhdG9tcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSByZXR1cm4gXCJhdG9tXCI7XG4gIHJldHVybiBcInZhcmlhYmxlXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuU3RyaW5nKHF1b3RlKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgbmV4dCwgZW5kID0gZmFsc2U7XG4gICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKG5leHQgPT0gcXVvdGUgJiYgIWVzY2FwZWQpIHtlbmQgPSB0cnVlOyBicmVhazt9XG4gICAgICBlc2NhcGVkID0gIWVzY2FwZWQgJiYgbmV4dCA9PSBcIlxcXFxcIjtcbiAgICB9XG4gICAgaWYgKGVuZCB8fCAhZXNjYXBlZCkgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICAgIHJldHVybiBcInN0cmluZ1wiO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbWF5YmVFbmQgPSBmYWxzZSwgY2g7XG4gIHdoaWxlIChjaCA9IHN0cmVhbS5uZXh0KCkpIHtcbiAgICBpZiAoY2ggPT0gXCIpXCIgJiYgbWF5YmVFbmQpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBtYXliZUVuZCA9IChjaCA9PSBcIipcIik7XG4gIH1cbiAgcmV0dXJuIFwiY29tbWVudFwiO1xufVxuXG5mdW5jdGlvbiB0b2tlbkNvbW1lbnRCcmFjZXMoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2g7XG4gIHdoaWxlIChjaCA9IHN0cmVhbS5uZXh0KCkpIHtcbiAgICBpZiAoY2ggPT0gXCJ9XCIpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJjb21tZW50XCI7XG59XG5cbi8vIEludGVyZmFjZVxuXG5leHBvcnQgY29uc3QgcGFzY2FsID0ge1xuICBzdGFydFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge3Rva2VuaXplOiBudWxsfTtcbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHN0eWxlID0gKHN0YXRlLnRva2VuaXplIHx8IHRva2VuQmFzZSkoc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKHN0eWxlID09IFwiY29tbWVudFwiIHx8IHN0eWxlID09IFwibWV0YVwiKSByZXR1cm4gc3R5bGU7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGluZGVudE9uSW5wdXQ6IC9eXFxzKlt7fV0kLyxcbiAgICBjb21tZW50VG9rZW5zOiB7YmxvY2s6IHtvcGVuOiBcIigqXCIsIGNsb3NlOiBcIiopXCJ9fVxuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///406\n')}}]);