(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/haxe.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/haxe.js ***!
  \************************************************************/
/*! exports provided: haxe, hxml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"haxe\", function() { return haxe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hxml\", function() { return hxml; });\n// Tokenizer\n\nfunction kw(type) {return {type: type, style: \"keyword\"};}\nvar A = kw(\"keyword a\"), B = kw(\"keyword b\"), C = kw(\"keyword c\");\nvar operator = kw(\"operator\"), atom = {type: \"atom\", style: \"atom\"}, attribute = {type:\"attribute\", style: \"attribute\"};\nvar type = kw(\"typedef\");\nvar keywords = {\n  \"if\": A, \"while\": A, \"else\": B, \"do\": B, \"try\": B,\n  \"return\": C, \"break\": C, \"continue\": C, \"new\": C, \"throw\": C,\n  \"var\": kw(\"var\"), \"inline\":attribute, \"static\": attribute, \"using\":kw(\"import\"),\n  \"public\": attribute, \"private\": attribute, \"cast\": kw(\"cast\"), \"import\": kw(\"import\"), \"macro\": kw(\"macro\"),\n  \"function\": kw(\"function\"), \"catch\": kw(\"catch\"), \"untyped\": kw(\"untyped\"), \"callback\": kw(\"cb\"),\n  \"for\": kw(\"for\"), \"switch\": kw(\"switch\"), \"case\": kw(\"case\"), \"default\": kw(\"default\"),\n  \"in\": operator, \"never\": kw(\"property_access\"), \"trace\":kw(\"trace\"),\n  \"class\": type, \"abstract\":type, \"enum\":type, \"interface\":type, \"typedef\":type, \"extends\":type, \"implements\":type, \"dynamic\":type,\n  \"true\": atom, \"false\": atom, \"null\": atom\n};\n\nvar isOperatorChar = /[+\\-*&%=<>!?|]/;\n\nfunction chain(stream, state, f) {\n  state.tokenize = f;\n  return f(stream, state);\n}\n\nfunction toUnescaped(stream, end) {\n  var escaped = false, next;\n  while ((next = stream.next()) != null) {\n    if (next == end && !escaped)\n      return true;\n    escaped = !escaped && next == \"\\\\\";\n  }\n}\n\n// Used as scratch variables to communicate multiple values without\n// consing up tons of objects.\nvar type, content;\nfunction ret(tp, style, cont) {\n  type = tp; content = cont;\n  return style;\n}\n\nfunction haxeTokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == '\"' || ch == \"'\") {\n    return chain(stream, state, haxeTokenString(ch));\n  } else if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    return ret(ch);\n  } else if (ch == \"0\" && stream.eat(/x/i)) {\n    stream.eatWhile(/[\\da-f]/i);\n    return ret(\"number\", \"number\");\n  } else if (/\\d/.test(ch) || ch == \"-\" && stream.eat(/\\d/)) {\n    stream.match(/^\\d*(?:\\.\\d*(?!\\.))?(?:[eE][+\\-]?\\d+)?/);\n    return ret(\"number\", \"number\");\n  } else if (state.reAllowed && (ch == \"~\" && stream.eat(/\\//))) {\n    toUnescaped(stream, \"/\");\n    stream.eatWhile(/[gimsu]/);\n    return ret(\"regexp\", \"string.special\");\n  } else if (ch == \"/\") {\n    if (stream.eat(\"*\")) {\n      return chain(stream, state, haxeTokenComment);\n    } else if (stream.eat(\"/\")) {\n      stream.skipToEnd();\n      return ret(\"comment\", \"comment\");\n    } else {\n      stream.eatWhile(isOperatorChar);\n      return ret(\"operator\", null, stream.current());\n    }\n  } else if (ch == \"#\") {\n    stream.skipToEnd();\n    return ret(\"conditional\", \"meta\");\n  } else if (ch == \"@\") {\n    stream.eat(/:/);\n    stream.eatWhile(/[\\w_]/);\n    return ret (\"metadata\", \"meta\");\n  } else if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return ret(\"operator\", null, stream.current());\n  } else {\n    var word;\n    if(/[A-Z]/.test(ch)) {\n      stream.eatWhile(/[\\w_<>]/);\n      word = stream.current();\n      return ret(\"type\", \"type\", word);\n    } else {\n      stream.eatWhile(/[\\w_]/);\n      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];\n      return (known && state.kwAllowed) ? ret(known.type, known.style, word) :\n        ret(\"variable\", \"variable\", word);\n    }\n  }\n}\n\nfunction haxeTokenString(quote) {\n  return function(stream, state) {\n    if (toUnescaped(stream, quote))\n      state.tokenize = haxeTokenBase;\n    return ret(\"string\", \"string\");\n  };\n}\n\nfunction haxeTokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"/\" && maybeEnd) {\n      state.tokenize = haxeTokenBase;\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return ret(\"comment\", \"comment\");\n}\n\n// Parser\n\nvar atomicTypes = {\"atom\": true, \"number\": true, \"variable\": true, \"string\": true, \"regexp\": true};\n\nfunction HaxeLexical(indented, column, type, align, prev, info) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.prev = prev;\n  this.info = info;\n  if (align != null) this.align = align;\n}\n\nfunction inScope(state, varname) {\n  for (var v = state.localVars; v; v = v.next)\n    if (v.name == varname) return true;\n}\n\nfunction parseHaxe(state, style, type, content, stream) {\n  var cc = state.cc;\n  // Communicate our context to the combinators.\n  // (Less wasteful than consing up a hundred closures on every call.)\n  cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc;\n\n  if (!state.lexical.hasOwnProperty(\"align\"))\n    state.lexical.align = true;\n\n  while(true) {\n    var combinator = cc.length ? cc.pop() : statement;\n    if (combinator(type, content)) {\n      while(cc.length && cc[cc.length - 1].lex)\n        cc.pop()();\n      if (cx.marked) return cx.marked;\n      if (type == \"variable\" && inScope(state, content)) return \"variableName.local\";\n      if (type == \"variable\" && imported(state, content)) return \"variableName.special\";\n      return style;\n    }\n  }\n}\n\nfunction imported(state, typename) {\n  if (/[a-z]/.test(typename.charAt(0)))\n    return false;\n  var len = state.importedtypes.length;\n  for (var i = 0; i<len; i++)\n    if(state.importedtypes[i]==typename) return true;\n}\n\nfunction registerimport(importname) {\n  var state = cx.state;\n  for (var t = state.importedtypes; t; t = t.next)\n    if(t.name == importname) return;\n  state.importedtypes = { name: importname, next: state.importedtypes };\n}\n// Combinator utils\n\nvar cx = {state: null, column: null, marked: null, cc: null};\nfunction pass() {\n  for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);\n}\nfunction cont() {\n  pass.apply(null, arguments);\n  return true;\n}\nfunction inList(name, list) {\n  for (var v = list; v; v = v.next)\n    if (v.name == name) return true;\n  return false;\n}\nfunction register(varname) {\n  var state = cx.state;\n  if (state.context) {\n    cx.marked = \"def\";\n    if (inList(varname, state.localVars)) return;\n    state.localVars = {name: varname, next: state.localVars};\n  } else if (state.globalVars) {\n    if (inList(varname, state.globalVars)) return;\n    state.globalVars = {name: varname, next: state.globalVars};\n  }\n}\n\n// Combinators\n\nvar defaultVars = {name: \"this\", next: null};\nfunction pushcontext() {\n  if (!cx.state.context) cx.state.localVars = defaultVars;\n  cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};\n}\nfunction popcontext() {\n  cx.state.localVars = cx.state.context.vars;\n  cx.state.context = cx.state.context.prev;\n}\npopcontext.lex = true;\nfunction pushlex(type, info) {\n  var result = function() {\n    var state = cx.state;\n    state.lexical = new HaxeLexical(state.indented, cx.stream.column(), type, null, state.lexical, info);\n  };\n  result.lex = true;\n  return result;\n}\nfunction poplex() {\n  var state = cx.state;\n  if (state.lexical.prev) {\n    if (state.lexical.type == \")\")\n      state.indented = state.lexical.indented;\n    state.lexical = state.lexical.prev;\n  }\n}\npoplex.lex = true;\n\nfunction expect(wanted) {\n  function f(type) {\n    if (type == wanted) return cont();\n    else if (wanted == \";\") return pass();\n    else return cont(f);\n  }\n  return f;\n}\n\nfunction statement(type) {\n  if (type == \"@\") return cont(metadef);\n  if (type == \"var\") return cont(pushlex(\"vardef\"), vardef1, expect(\";\"), poplex);\n  if (type == \"keyword a\") return cont(pushlex(\"form\"), expression, statement, poplex);\n  if (type == \"keyword b\") return cont(pushlex(\"form\"), statement, poplex);\n  if (type == \"{\") return cont(pushlex(\"}\"), pushcontext, block, poplex, popcontext);\n  if (type == \";\") return cont();\n  if (type == \"attribute\") return cont(maybeattribute);\n  if (type == \"function\") return cont(functiondef);\n  if (type == \"for\") return cont(pushlex(\"form\"), expect(\"(\"), pushlex(\")\"), forspec1, expect(\")\"),\n                                 poplex, statement, poplex);\n  if (type == \"variable\") return cont(pushlex(\"stat\"), maybelabel);\n  if (type == \"switch\") return cont(pushlex(\"form\"), expression, pushlex(\"}\", \"switch\"), expect(\"{\"),\n                                    block, poplex, poplex);\n  if (type == \"case\") return cont(expression, expect(\":\"));\n  if (type == \"default\") return cont(expect(\":\"));\n  if (type == \"catch\") return cont(pushlex(\"form\"), pushcontext, expect(\"(\"), funarg, expect(\")\"),\n                                   statement, poplex, popcontext);\n  if (type == \"import\") return cont(importdef, expect(\";\"));\n  if (type == \"typedef\") return cont(typedef);\n  return pass(pushlex(\"stat\"), expression, expect(\";\"), poplex);\n}\nfunction expression(type) {\n  if (atomicTypes.hasOwnProperty(type)) return cont(maybeoperator);\n  if (type == \"type\" ) return cont(maybeoperator);\n  if (type == \"function\") return cont(functiondef);\n  if (type == \"keyword c\") return cont(maybeexpression);\n  if (type == \"(\") return cont(pushlex(\")\"), maybeexpression, expect(\")\"), poplex, maybeoperator);\n  if (type == \"operator\") return cont(expression);\n  if (type == \"[\") return cont(pushlex(\"]\"), commasep(maybeexpression, \"]\"), poplex, maybeoperator);\n  if (type == \"{\") return cont(pushlex(\"}\"), commasep(objprop, \"}\"), poplex, maybeoperator);\n  return cont();\n}\nfunction maybeexpression(type) {\n  if (type.match(/[;\\}\\)\\],]/)) return pass();\n  return pass(expression);\n}\n\nfunction maybeoperator(type, value) {\n  if (type == \"operator\" && /\\+\\+|--/.test(value)) return cont(maybeoperator);\n  if (type == \"operator\" || type == \":\") return cont(expression);\n  if (type == \";\") return;\n  if (type == \"(\") return cont(pushlex(\")\"), commasep(expression, \")\"), poplex, maybeoperator);\n  if (type == \".\") return cont(property, maybeoperator);\n  if (type == \"[\") return cont(pushlex(\"]\"), expression, expect(\"]\"), poplex, maybeoperator);\n}\n\nfunction maybeattribute(type) {\n  if (type == \"attribute\") return cont(maybeattribute);\n  if (type == \"function\") return cont(functiondef);\n  if (type == \"var\") return cont(vardef1);\n}\n\nfunction metadef(type) {\n  if(type == \":\") return cont(metadef);\n  if(type == \"variable\") return cont(metadef);\n  if(type == \"(\") return cont(pushlex(\")\"), commasep(metaargs, \")\"), poplex, statement);\n}\nfunction metaargs(type) {\n  if(type == \"variable\") return cont();\n}\n\nfunction importdef (type, value) {\n  if(type == \"variable\" && /[A-Z]/.test(value.charAt(0))) { registerimport(value); return cont(); }\n  else if(type == \"variable\" || type == \"property\" || type == \".\" || value == \"*\") return cont(importdef);\n}\n\nfunction typedef (type, value)\n{\n  if(type == \"variable\" && /[A-Z]/.test(value.charAt(0))) { registerimport(value); return cont(); }\n  else if (type == \"type\" && /[A-Z]/.test(value.charAt(0))) { return cont(); }\n}\n\nfunction maybelabel(type) {\n  if (type == \":\") return cont(poplex, statement);\n  return pass(maybeoperator, expect(\";\"), poplex);\n}\nfunction property(type) {\n  if (type == \"variable\") {cx.marked = \"property\"; return cont();}\n}\nfunction objprop(type) {\n  if (type == \"variable\") cx.marked = \"property\";\n  if (atomicTypes.hasOwnProperty(type)) return cont(expect(\":\"), expression);\n}\nfunction commasep(what, end) {\n  function proceed(type) {\n    if (type == \",\") return cont(what, proceed);\n    if (type == end) return cont();\n    return cont(expect(end));\n  }\n  return function(type) {\n    if (type == end) return cont();\n    else return pass(what, proceed);\n  };\n}\nfunction block(type) {\n  if (type == \"}\") return cont();\n  return pass(statement, block);\n}\nfunction vardef1(type, value) {\n  if (type == \"variable\"){register(value); return cont(typeuse, vardef2);}\n  return cont();\n}\nfunction vardef2(type, value) {\n  if (value == \"=\") return cont(expression, vardef2);\n  if (type == \",\") return cont(vardef1);\n}\nfunction forspec1(type, value) {\n  if (type == \"variable\") {\n    register(value);\n    return cont(forin, expression)\n  } else {\n    return pass()\n  }\n}\nfunction forin(_type, value) {\n  if (value == \"in\") return cont();\n}\nfunction functiondef(type, value) {\n  //function names starting with upper-case letters are recognised as types, so cludging them together here.\n  if (type == \"variable\" || type == \"type\") {register(value); return cont(functiondef);}\n  if (value == \"new\") return cont(functiondef);\n  if (type == \"(\") return cont(pushlex(\")\"), pushcontext, commasep(funarg, \")\"), poplex, typeuse, statement, popcontext);\n}\nfunction typeuse(type) {\n  if(type == \":\") return cont(typestring);\n}\nfunction typestring(type) {\n  if(type == \"type\") return cont();\n  if(type == \"variable\") return cont();\n  if(type == \"{\") return cont(pushlex(\"}\"), commasep(typeprop, \"}\"), poplex);\n}\nfunction typeprop(type) {\n  if(type == \"variable\") return cont(typeuse);\n}\nfunction funarg(type, value) {\n  if (type == \"variable\") {register(value); return cont(typeuse);}\n}\n\n// Interface\nconst haxe = {\n  startState: function(indentUnit) {\n    var defaulttypes = [\"Int\", \"Float\", \"String\", \"Void\", \"Std\", \"Bool\", \"Dynamic\", \"Array\"];\n    var state = {\n      tokenize: haxeTokenBase,\n      reAllowed: true,\n      kwAllowed: true,\n      cc: [],\n      lexical: new HaxeLexical(-indentUnit, 0, \"block\", false),\n      importedtypes: defaulttypes,\n      context: null,\n      indented: 0\n    };\n    return state;\n  },\n\n  token: function(stream, state) {\n    if (stream.sol()) {\n      if (!state.lexical.hasOwnProperty(\"align\"))\n        state.lexical.align = false;\n      state.indented = stream.indentation();\n    }\n    if (stream.eatSpace()) return null;\n    var style = state.tokenize(stream, state);\n    if (type == \"comment\") return style;\n    state.reAllowed = !!(type == \"operator\" || type == \"keyword c\" || type.match(/^[\\[{}\\(,;:]$/));\n    state.kwAllowed = type != '.';\n    return parseHaxe(state, style, type, content, stream);\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != haxeTokenBase) return 0;\n    var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;\n    if (lexical.type == \"stat\" && firstChar == \"}\") lexical = lexical.prev;\n    var type = lexical.type, closing = firstChar == type;\n    if (type == \"vardef\") return lexical.indented + 4;\n    else if (type == \"form\" && firstChar == \"{\") return lexical.indented;\n    else if (type == \"stat\" || type == \"form\") return lexical.indented + cx.unit;\n    else if (lexical.info == \"switch\" && !closing)\n      return lexical.indented + (/^(?:case|default)\\b/.test(textAfter) ? cx.unit : 2 * cx.unit);\n    else if (lexical.align) return lexical.column + (closing ? 0 : 1);\n    else return lexical.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: \"//\", block: {open: \"/*\", close: \"*/\"}}\n  }\n};\n\nconst hxml = {\n  startState: function () {\n    return {\n      define: false,\n      inString: false\n    };\n  },\n  token: function (stream, state) {\n    var ch = stream.peek();\n    var sol = stream.sol();\n\n    ///* comments */\n    if (ch == \"#\") {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n    if (sol && ch == \"-\") {\n      var style = \"variable-2\";\n\n      stream.eat(/-/);\n\n      if (stream.peek() == \"-\") {\n        stream.eat(/-/);\n        style = \"keyword a\";\n      }\n\n      if (stream.peek() == \"D\") {\n        stream.eat(/[D]/);\n        style = \"keyword c\";\n        state.define = true;\n      }\n\n      stream.eatWhile(/[A-Z]/i);\n      return style;\n    }\n\n    var ch = stream.peek();\n\n    if (state.inString == false && ch == \"'\") {\n      state.inString = true;\n      stream.next();\n    }\n\n    if (state.inString == true) {\n      if (stream.skipTo(\"'\")) {\n\n      } else {\n        stream.skipToEnd();\n      }\n\n      if (stream.peek() == \"'\") {\n        stream.next();\n        state.inString = false;\n      }\n\n      return \"string\";\n    }\n\n    stream.next();\n    return null;\n  },\n  languageData: {\n    commentTokens: {line: \"#\"}\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/haxe.js?");

/***/ })

}]);