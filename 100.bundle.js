(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[100],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/vhdl.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/vhdl.js ***!
  \************************************************************/
/*! exports provided: vhdl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vhdl\", function() { return vhdl; });\nfunction words(str) {\n  var obj = {}, words = str.split(\",\");\n  for (var i = 0; i < words.length; ++i) {\n    var allCaps = words[i].toUpperCase();\n    var firstCap = words[i].charAt(0).toUpperCase() + words[i].slice(1);\n    obj[words[i]] = true;\n    obj[allCaps] = true;\n    obj[firstCap] = true;\n  }\n  return obj;\n}\n\nfunction metaHook(stream) {\n  stream.eatWhile(/[\\w\\$_]/);\n  return \"meta\";\n}\n\nvar atoms = words(\"null\"),\n    hooks = {\"`\": metaHook, \"$\": metaHook},\n    multiLineStrings = false;\n\nvar keywords = words(\"abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,\" +\n                     \"body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,end block,end case,\" +\n                     \"end component,end for,end generate,end if,end loop,end process,end record,end units,entity,exit,file,for,\" +\n                     \"function,generate,generic,generic map,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,\" +\n                     \"literal,loop,map,mod,nand,new,next,nor,null,of,on,open,or,others,out,package,package body,port,port map,\" +\n                     \"postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,\" +\n                     \"sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor\");\n\nvar blockKeywords = words(\"architecture,entity,begin,case,port,else,elsif,end,for,function,if\");\n\nvar isOperatorChar = /[&|~><!\\)\\(*#%@+\\/=?\\:;}{,\\.\\^\\-\\[\\]]/;\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (hooks[ch]) {\n    var result = hooks[ch](stream, state);\n    if (result !== false) return result;\n  }\n  if (ch == '\"') {\n    state.tokenize = tokenString2(ch);\n    return state.tokenize(stream, state);\n  }\n  if (ch == \"'\") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    curPunc = ch;\n    return null;\n  }\n  if (/[\\d']/.test(ch)) {\n    stream.eatWhile(/[\\w\\.']/);\n    return \"number\";\n  }\n  if (ch == \"-\") {\n    if (stream.eat(\"-\")) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"operator\";\n  }\n  stream.eatWhile(/[\\w\\$_]/);\n  var cur = stream.current();\n  if (keywords.propertyIsEnumerable(cur.toLowerCase())) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = \"newstatement\";\n    return \"keyword\";\n  }\n  if (atoms.propertyIsEnumerable(cur)) return \"atom\";\n  return \"variable\";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == \"--\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = tokenBase;\n    return \"string\";\n  };\n}\nfunction tokenString2(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == \"--\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = tokenBase;\n    return \"string.special\";\n  };\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == \")\" || t == \"]\" || t == \"}\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\nconst vhdl = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == \"comment\" || style == \"meta\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == \";\" || curPunc == \":\") && ctx.type == \"statement\") popContext(state);\n    else if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n    else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n    else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n    else if (curPunc == \"}\") {\n      while (ctx.type == \"statement\") ctx = popContext(state);\n      if (ctx.type == \"}\") ctx = popContext(state);\n      while (ctx.type == \"statement\") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (ctx.type == \"}\" || ctx.type == \"top\" || (ctx.type == \"statement\" && curPunc == \"newstatement\"))\n      pushContext(state, stream.column(), \"statement\");\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return 0;\n    var firstChar = textAfter && textAfter.charAt(0), ctx = state.context, closing = firstChar == ctx.type;\n    if (ctx.type == \"statement\") return ctx.indented + (firstChar == \"{\" ? 0 : cx.unit);\n    else if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: \"--\"}\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdmhkbC5qcz8zZWQ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBLGNBQWM7QUFDZCxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLDZCQUE2QjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwrQ0FBK0M7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFdBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCLDBCQUEwQix5Q0FBeUM7QUFDbkU7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSx1RUFBdUU7QUFDdkU7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwyQkFBMkI7QUFDM0Isb0JBQW9CO0FBQ3BCO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdmhkbC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBhbGxDYXBzID0gd29yZHNbaV0udG9VcHBlckNhc2UoKTtcbiAgICB2YXIgZmlyc3RDYXAgPSB3b3Jkc1tpXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnNsaWNlKDEpO1xuICAgIG9ialt3b3Jkc1tpXV0gPSB0cnVlO1xuICAgIG9ialthbGxDYXBzXSA9IHRydWU7XG4gICAgb2JqW2ZpcnN0Q2FwXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gbWV0YUhvb2soc3RyZWFtKSB7XG4gIHN0cmVhbS5lYXRXaGlsZSgvW1xcd1xcJF9dLyk7XG4gIHJldHVybiBcIm1ldGFcIjtcbn1cblxudmFyIGF0b21zID0gd29yZHMoXCJudWxsXCIpLFxuICAgIGhvb2tzID0ge1wiYFwiOiBtZXRhSG9vaywgXCIkXCI6IG1ldGFIb29rfSxcbiAgICBtdWx0aUxpbmVTdHJpbmdzID0gZmFsc2U7XG5cbnZhciBrZXl3b3JkcyA9IHdvcmRzKFwiYWJzLGFjY2VzcyxhZnRlcixhbGlhcyxhbGwsYW5kLGFyY2hpdGVjdHVyZSxhcnJheSxhc3NlcnQsYXR0cmlidXRlLGJlZ2luLGJsb2NrLFwiICtcbiAgICAgICAgICAgICAgICAgICAgIFwiYm9keSxidWZmZXIsYnVzLGNhc2UsY29tcG9uZW50LGNvbmZpZ3VyYXRpb24sY29uc3RhbnQsZGlzY29ubmVjdCxkb3dudG8sZWxzZSxlbHNpZixlbmQsZW5kIGJsb2NrLGVuZCBjYXNlLFwiICtcbiAgICAgICAgICAgICAgICAgICAgIFwiZW5kIGNvbXBvbmVudCxlbmQgZm9yLGVuZCBnZW5lcmF0ZSxlbmQgaWYsZW5kIGxvb3AsZW5kIHByb2Nlc3MsZW5kIHJlY29yZCxlbmQgdW5pdHMsZW50aXR5LGV4aXQsZmlsZSxmb3IsXCIgK1xuICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvbixnZW5lcmF0ZSxnZW5lcmljLGdlbmVyaWMgbWFwLGdyb3VwLGd1YXJkZWQsaWYsaW1wdXJlLGluLGluZXJ0aWFsLGlub3V0LGlzLGxhYmVsLGxpYnJhcnksbGlua2FnZSxcIiArXG4gICAgICAgICAgICAgICAgICAgICBcImxpdGVyYWwsbG9vcCxtYXAsbW9kLG5hbmQsbmV3LG5leHQsbm9yLG51bGwsb2Ysb24sb3BlbixvcixvdGhlcnMsb3V0LHBhY2thZ2UscGFja2FnZSBib2R5LHBvcnQscG9ydCBtYXAsXCIgK1xuICAgICAgICAgICAgICAgICAgICAgXCJwb3N0cG9uZWQscHJvY2VkdXJlLHByb2Nlc3MscHVyZSxyYW5nZSxyZWNvcmQscmVnaXN0ZXIscmVqZWN0LHJlbSxyZXBvcnQscmV0dXJuLHJvbCxyb3Isc2VsZWN0LHNldmVyaXR5LHNpZ25hbCxcIiArXG4gICAgICAgICAgICAgICAgICAgICBcInNsYSxzbGwsc3JhLHNybCxzdWJ0eXBlLHRoZW4sdG8sdHJhbnNwb3J0LHR5cGUsdW5hZmZlY3RlZCx1bml0cyx1bnRpbCx1c2UsdmFyaWFibGUsd2FpdCx3aGVuLHdoaWxlLHdpdGgseG5vcix4b3JcIik7XG5cbnZhciBibG9ja0tleXdvcmRzID0gd29yZHMoXCJhcmNoaXRlY3R1cmUsZW50aXR5LGJlZ2luLGNhc2UscG9ydCxlbHNlLGVsc2lmLGVuZCxmb3IsZnVuY3Rpb24saWZcIik7XG5cbnZhciBpc09wZXJhdG9yQ2hhciA9IC9bJnx+PjwhXFwpXFwoKiMlQCtcXC89P1xcOjt9eyxcXC5cXF5cXC1cXFtcXF1dLztcbnZhciBjdXJQdW5jO1xuXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuICBpZiAoaG9va3NbY2hdKSB7XG4gICAgdmFyIHJlc3VsdCA9IGhvb2tzW2NoXShzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoY2ggPT0gJ1wiJykge1xuICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5TdHJpbmcyKGNoKTtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgaWYgKGNoID09IFwiJ1wiKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZyhjaCk7XG4gICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmICgvW1xcW1xcXXt9XFwoXFwpLDtcXDpcXC5dLy50ZXN0KGNoKSkge1xuICAgIGN1clB1bmMgPSBjaDtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoL1tcXGQnXS8udGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXC4nXS8pO1xuICAgIHJldHVybiBcIm51bWJlclwiO1xuICB9XG4gIGlmIChjaCA9PSBcIi1cIikge1xuICAgIGlmIChzdHJlYW0uZWF0KFwiLVwiKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgIH1cbiAgfVxuICBpZiAoaXNPcGVyYXRvckNoYXIudGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoaXNPcGVyYXRvckNoYXIpO1xuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH1cbiAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFwkX10vKTtcbiAgdmFyIGN1ciA9IHN0cmVhbS5jdXJyZW50KCk7XG4gIGlmIChrZXl3b3Jkcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIudG9Mb3dlckNhc2UoKSkpIHtcbiAgICBpZiAoYmxvY2tLZXl3b3Jkcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSBjdXJQdW5jID0gXCJuZXdzdGF0ZW1lbnRcIjtcbiAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gIH1cbiAgaWYgKGF0b21zLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImF0b21cIjtcbiAgcmV0dXJuIFwidmFyaWFibGVcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5TdHJpbmcocXVvdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBuZXh0LCBlbmQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAobmV4dCA9PSBxdW90ZSAmJiAhZXNjYXBlZCkge2VuZCA9IHRydWU7IGJyZWFrO31cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiLS1cIjtcbiAgICB9XG4gICAgaWYgKGVuZCB8fCAhKGVzY2FwZWQgfHwgbXVsdGlMaW5lU3RyaW5ncykpXG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cbmZ1bmN0aW9uIHRva2VuU3RyaW5nMihxdW90ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIG5leHQsIGVuZCA9IGZhbHNlO1xuICAgIHdoaWxlICgobmV4dCA9IHN0cmVhbS5uZXh0KCkpICE9IG51bGwpIHtcbiAgICAgIGlmIChuZXh0ID09IHF1b3RlICYmICFlc2NhcGVkKSB7ZW5kID0gdHJ1ZTsgYnJlYWs7fVxuICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkICYmIG5leHQgPT0gXCItLVwiO1xuICAgIH1cbiAgICBpZiAoZW5kIHx8ICEoZXNjYXBlZCB8fCBtdWx0aUxpbmVTdHJpbmdzKSlcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgIHJldHVybiBcInN0cmluZy5zcGVjaWFsXCI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIENvbnRleHQoaW5kZW50ZWQsIGNvbHVtbiwgdHlwZSwgYWxpZ24sIHByZXYpIHtcbiAgdGhpcy5pbmRlbnRlZCA9IGluZGVudGVkO1xuICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5hbGlnbiA9IGFsaWduO1xuICB0aGlzLnByZXYgPSBwcmV2O1xufVxuZnVuY3Rpb24gcHVzaENvbnRleHQoc3RhdGUsIGNvbCwgdHlwZSkge1xuICByZXR1cm4gc3RhdGUuY29udGV4dCA9IG5ldyBDb250ZXh0KHN0YXRlLmluZGVudGVkLCBjb2wsIHR5cGUsIG51bGwsIHN0YXRlLmNvbnRleHQpO1xufVxuZnVuY3Rpb24gcG9wQ29udGV4dChzdGF0ZSkge1xuICB2YXIgdCA9IHN0YXRlLmNvbnRleHQudHlwZTtcbiAgaWYgKHQgPT0gXCIpXCIgfHwgdCA9PSBcIl1cIiB8fCB0ID09IFwifVwiKVxuICAgIHN0YXRlLmluZGVudGVkID0gc3RhdGUuY29udGV4dC5pbmRlbnRlZDtcbiAgcmV0dXJuIHN0YXRlLmNvbnRleHQgPSBzdGF0ZS5jb250ZXh0LnByZXY7XG59XG5cbi8vIEludGVyZmFjZVxuZXhwb3J0IGNvbnN0IHZoZGwgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKGluZGVudFVuaXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5pemU6IG51bGwsXG4gICAgICBjb250ZXh0OiBuZXcgQ29udGV4dCgtaW5kZW50VW5pdCwgMCwgXCJ0b3BcIiwgZmFsc2UpLFxuICAgICAgaW5kZW50ZWQ6IDAsXG4gICAgICBzdGFydE9mTGluZTogdHJ1ZVxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgY3R4ID0gc3RhdGUuY29udGV4dDtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IGZhbHNlO1xuICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICAgIHN0YXRlLnN0YXJ0T2ZMaW5lID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICBjdXJQdW5jID0gbnVsbDtcbiAgICB2YXIgc3R5bGUgPSAoc3RhdGUudG9rZW5pemUgfHwgdG9rZW5CYXNlKShzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3R5bGUgPT0gXCJjb21tZW50XCIgfHwgc3R5bGUgPT0gXCJtZXRhXCIpIHJldHVybiBzdHlsZTtcbiAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IHRydWU7XG5cbiAgICBpZiAoKGN1clB1bmMgPT0gXCI7XCIgfHwgY3VyUHVuYyA9PSBcIjpcIikgJiYgY3R4LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIikgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIntcIikgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJ9XCIpO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCJbXCIpIHB1c2hDb250ZXh0KHN0YXRlLCBzdHJlYW0uY29sdW1uKCksIFwiXVwiKTtcbiAgICBlbHNlIGlmIChjdXJQdW5jID09IFwiKFwiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIilcIik7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIn1cIikge1xuICAgICAgd2hpbGUgKGN0eC50eXBlID09IFwic3RhdGVtZW50XCIpIGN0eCA9IHBvcENvbnRleHQoc3RhdGUpO1xuICAgICAgaWYgKGN0eC50eXBlID09IFwifVwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICAgIHdoaWxlIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBjdHgudHlwZSkgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgZWxzZSBpZiAoY3R4LnR5cGUgPT0gXCJ9XCIgfHwgY3R4LnR5cGUgPT0gXCJ0b3BcIiB8fCAoY3R4LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIiAmJiBjdXJQdW5jID09IFwibmV3c3RhdGVtZW50XCIpKVxuICAgICAgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJzdGF0ZW1lbnRcIik7XG4gICAgc3RhdGUuc3RhcnRPZkxpbmUgPSBmYWxzZTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyLCBjeCkge1xuICAgIGlmIChzdGF0ZS50b2tlbml6ZSAhPSB0b2tlbkJhc2UgJiYgc3RhdGUudG9rZW5pemUgIT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgdmFyIGZpcnN0Q2hhciA9IHRleHRBZnRlciAmJiB0ZXh0QWZ0ZXIuY2hhckF0KDApLCBjdHggPSBzdGF0ZS5jb250ZXh0LCBjbG9zaW5nID0gZmlyc3RDaGFyID09IGN0eC50eXBlO1xuICAgIGlmIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKSByZXR1cm4gY3R4LmluZGVudGVkICsgKGZpcnN0Q2hhciA9PSBcIntcIiA/IDAgOiBjeC51bml0KTtcbiAgICBlbHNlIGlmIChjdHguYWxpZ24pIHJldHVybiBjdHguY29sdW1uICsgKGNsb3NpbmcgPyAwIDogMSk7XG4gICAgZWxzZSByZXR1cm4gY3R4LmluZGVudGVkICsgKGNsb3NpbmcgPyAwIDogY3gudW5pdCk7XG4gIH0sXG5cbiAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgaW5kZW50T25JbnB1dDogL15cXHMqW3t9XSQvLFxuICAgIGNvbW1lbnRUb2tlbnM6IHtsaW5lOiBcIi0tXCJ9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/vhdl.js\n");

/***/ })

}]);