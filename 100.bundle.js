(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[100],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/vhdl.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/vhdl.js ***!
  \************************************************************/
/*! exports provided: vhdl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vhdl\", function() { return vhdl; });\nfunction words(str) {\n  var obj = {}, words = str.split(\",\");\n  for (var i = 0; i < words.length; ++i) {\n    var allCaps = words[i].toUpperCase();\n    var firstCap = words[i].charAt(0).toUpperCase() + words[i].slice(1);\n    obj[words[i]] = true;\n    obj[allCaps] = true;\n    obj[firstCap] = true;\n  }\n  return obj;\n}\n\nfunction metaHook(stream) {\n  stream.eatWhile(/[\\w\\$_]/);\n  return \"meta\";\n}\n\nvar atoms = words(\"null\"),\n    hooks = {\"`\": metaHook, \"$\": metaHook},\n    multiLineStrings = false;\n\nvar keywords = words(\"abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,\" +\n                     \"body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,end block,end case,\" +\n                     \"end component,end for,end generate,end if,end loop,end process,end record,end units,entity,exit,file,for,\" +\n                     \"function,generate,generic,generic map,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,\" +\n                     \"literal,loop,map,mod,nand,new,next,nor,null,of,on,open,or,others,out,package,package body,port,port map,\" +\n                     \"postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,\" +\n                     \"sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor\");\n\nvar blockKeywords = words(\"architecture,entity,begin,case,port,else,elsif,end,for,function,if\");\n\nvar isOperatorChar = /[&|~><!\\)\\(*#%@+\\/=?\\:;}{,\\.\\^\\-\\[\\]]/;\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (hooks[ch]) {\n    var result = hooks[ch](stream, state);\n    if (result !== false) return result;\n  }\n  if (ch == '\"') {\n    state.tokenize = tokenString2(ch);\n    return state.tokenize(stream, state);\n  }\n  if (ch == \"'\") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    curPunc = ch;\n    return null;\n  }\n  if (/[\\d']/.test(ch)) {\n    stream.eatWhile(/[\\w\\.']/);\n    return \"number\";\n  }\n  if (ch == \"-\") {\n    if (stream.eat(\"-\")) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"operator\";\n  }\n  stream.eatWhile(/[\\w\\$_]/);\n  var cur = stream.current();\n  if (keywords.propertyIsEnumerable(cur.toLowerCase())) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = \"newstatement\";\n    return \"keyword\";\n  }\n  if (atoms.propertyIsEnumerable(cur)) return \"atom\";\n  return \"variable\";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == \"--\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = tokenBase;\n    return \"string\";\n  };\n}\nfunction tokenString2(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == \"--\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = tokenBase;\n    return \"string.special\";\n  };\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == \")\" || t == \"]\" || t == \"}\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\nconst vhdl = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == \"comment\" || style == \"meta\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == \";\" || curPunc == \":\") && ctx.type == \"statement\") popContext(state);\n    else if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n    else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n    else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n    else if (curPunc == \"}\") {\n      while (ctx.type == \"statement\") ctx = popContext(state);\n      if (ctx.type == \"}\") ctx = popContext(state);\n      while (ctx.type == \"statement\") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (ctx.type == \"}\" || ctx.type == \"top\" || (ctx.type == \"statement\" && curPunc == \"newstatement\"))\n      pushContext(state, stream.column(), \"statement\");\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return 0;\n    var firstChar = textAfter && textAfter.charAt(0), ctx = state.context, closing = firstChar == ctx.type;\n    if (ctx.type == \"statement\") return ctx.indented + (firstChar == \"{\" ? 0 : cx.unit);\n    else if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: \"--\"}\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/vhdl.js?");

/***/ })

}]);