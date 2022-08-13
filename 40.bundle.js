(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/erlang.js":
/*!**************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/erlang.js ***!
  \**************************************************************/
/*! exports provided: erlang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"erlang\", function() { return erlang; });\n/////////////////////////////////////////////////////////////////////////////\n// constants\n\nvar typeWords = [\n  \"-type\", \"-spec\", \"-export_type\", \"-opaque\"];\n\nvar keywordWords = [\n  \"after\",\"begin\",\"catch\",\"case\",\"cond\",\"end\",\"fun\",\"if\",\n  \"let\",\"of\",\"query\",\"receive\",\"try\",\"when\"];\n\nvar separatorRE    = /[\\->,;]/;\nvar separatorWords = [\n  \"->\",\";\",\",\"];\n\nvar operatorAtomWords = [\n  \"and\",\"andalso\",\"band\",\"bnot\",\"bor\",\"bsl\",\"bsr\",\"bxor\",\n  \"div\",\"not\",\"or\",\"orelse\",\"rem\",\"xor\"];\n\nvar operatorSymbolRE    = /[\\+\\-\\*\\/<>=\\|:!]/;\nvar operatorSymbolWords = [\n  \"=\",\"+\",\"-\",\"*\",\"/\",\">\",\">=\",\"<\",\"=<\",\"=:=\",\"==\",\"=/=\",\"/=\",\"||\",\"<-\",\"!\"];\n\nvar openParenRE    = /[<\\(\\[\\{]/;\nvar openParenWords = [\n  \"<<\",\"(\",\"[\",\"{\"];\n\nvar closeParenRE    = /[>\\)\\]\\}]/;\nvar closeParenWords = [\n  \"}\",\"]\",\")\",\">>\"];\n\nvar guardWords = [\n  \"is_atom\",\"is_binary\",\"is_bitstring\",\"is_boolean\",\"is_float\",\n  \"is_function\",\"is_integer\",\"is_list\",\"is_number\",\"is_pid\",\n  \"is_port\",\"is_record\",\"is_reference\",\"is_tuple\",\n  \"atom\",\"binary\",\"bitstring\",\"boolean\",\"function\",\"integer\",\"list\",\n  \"number\",\"pid\",\"port\",\"record\",\"reference\",\"tuple\"];\n\nvar bifWords = [\n  \"abs\",\"adler32\",\"adler32_combine\",\"alive\",\"apply\",\"atom_to_binary\",\n  \"atom_to_list\",\"binary_to_atom\",\"binary_to_existing_atom\",\n  \"binary_to_list\",\"binary_to_term\",\"bit_size\",\"bitstring_to_list\",\n  \"byte_size\",\"check_process_code\",\"contact_binary\",\"crc32\",\n  \"crc32_combine\",\"date\",\"decode_packet\",\"delete_module\",\n  \"disconnect_node\",\"element\",\"erase\",\"exit\",\"float\",\"float_to_list\",\n  \"garbage_collect\",\"get\",\"get_keys\",\"group_leader\",\"halt\",\"hd\",\n  \"integer_to_list\",\"internal_bif\",\"iolist_size\",\"iolist_to_binary\",\n  \"is_alive\",\"is_atom\",\"is_binary\",\"is_bitstring\",\"is_boolean\",\n  \"is_float\",\"is_function\",\"is_integer\",\"is_list\",\"is_number\",\"is_pid\",\n  \"is_port\",\"is_process_alive\",\"is_record\",\"is_reference\",\"is_tuple\",\n  \"length\",\"link\",\"list_to_atom\",\"list_to_binary\",\"list_to_bitstring\",\n  \"list_to_existing_atom\",\"list_to_float\",\"list_to_integer\",\n  \"list_to_pid\",\"list_to_tuple\",\"load_module\",\"make_ref\",\"module_loaded\",\n  \"monitor_node\",\"node\",\"node_link\",\"node_unlink\",\"nodes\",\"notalive\",\n  \"now\",\"open_port\",\"pid_to_list\",\"port_close\",\"port_command\",\n  \"port_connect\",\"port_control\",\"pre_loaded\",\"process_flag\",\n  \"process_info\",\"processes\",\"purge_module\",\"put\",\"register\",\n  \"registered\",\"round\",\"self\",\"setelement\",\"size\",\"spawn\",\"spawn_link\",\n  \"spawn_monitor\",\"spawn_opt\",\"split_binary\",\"statistics\",\n  \"term_to_binary\",\"time\",\"throw\",\"tl\",\"trunc\",\"tuple_size\",\n  \"tuple_to_list\",\"unlink\",\"unregister\",\"whereis\"];\n\n// upper case: [A-Z] [Ø-Þ] [À-Ö]\n// lower case: [a-z] [ß-ö] [ø-ÿ]\nvar anumRE       = /[\\w@Ø-ÞÀ-Öß-öø-ÿ]/;\nvar escapesRE    =\n    /[0-7]{1,3}|[bdefnrstv\\\\\"']|\\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;\n\n/////////////////////////////////////////////////////////////////////////////\n// tokenizer\n\nfunction tokenizer(stream,state) {\n  // in multi-line string\n  if (state.in_string) {\n    state.in_string = (!doubleQuote(stream));\n    return rval(state,stream,\"string\");\n  }\n\n  // in multi-line atom\n  if (state.in_atom) {\n    state.in_atom = (!singleQuote(stream));\n    return rval(state,stream,\"atom\");\n  }\n\n  // whitespace\n  if (stream.eatSpace()) {\n    return rval(state,stream,\"whitespace\");\n  }\n\n  // attributes and type specs\n  if (!peekToken(state) &&\n      stream.match(/-\\s*[a-zß-öø-ÿ][\\wØ-ÞÀ-Öß-öø-ÿ]*/)) {\n    if (is_member(stream.current(),typeWords)) {\n      return rval(state,stream,\"type\");\n    }else{\n      return rval(state,stream,\"attribute\");\n    }\n  }\n\n  var ch = stream.next();\n\n  // comment\n  if (ch == '%') {\n    stream.skipToEnd();\n    return rval(state,stream,\"comment\");\n  }\n\n  // colon\n  if (ch == \":\") {\n    return rval(state,stream,\"colon\");\n  }\n\n  // macro\n  if (ch == '?') {\n    stream.eatSpace();\n    stream.eatWhile(anumRE);\n    return rval(state,stream,\"macro\");\n  }\n\n  // record\n  if (ch == \"#\") {\n    stream.eatSpace();\n    stream.eatWhile(anumRE);\n    return rval(state,stream,\"record\");\n  }\n\n  // dollar escape\n  if (ch == \"$\") {\n    if (stream.next() == \"\\\\\" && !stream.match(escapesRE)) {\n      return rval(state,stream,\"error\");\n    }\n    return rval(state,stream,\"number\");\n  }\n\n  // dot\n  if (ch == \".\") {\n    return rval(state,stream,\"dot\");\n  }\n\n  // quoted atom\n  if (ch == '\\'') {\n    if (!(state.in_atom = (!singleQuote(stream)))) {\n      if (stream.match(/\\s*\\/\\s*[0-9]/,false)) {\n        stream.match(/\\s*\\/\\s*[0-9]/,true);\n        return rval(state,stream,\"fun\");      // 'f'/0 style fun\n      }\n      if (stream.match(/\\s*\\(/,false) || stream.match(/\\s*:/,false)) {\n        return rval(state,stream,\"function\");\n      }\n    }\n    return rval(state,stream,\"atom\");\n  }\n\n  // string\n  if (ch == '\"') {\n    state.in_string = (!doubleQuote(stream));\n    return rval(state,stream,\"string\");\n  }\n\n  // variable\n  if (/[A-Z_Ø-ÞÀ-Ö]/.test(ch)) {\n    stream.eatWhile(anumRE);\n    return rval(state,stream,\"variable\");\n  }\n\n  // atom/keyword/BIF/function\n  if (/[a-z_ß-öø-ÿ]/.test(ch)) {\n    stream.eatWhile(anumRE);\n\n    if (stream.match(/\\s*\\/\\s*[0-9]/,false)) {\n      stream.match(/\\s*\\/\\s*[0-9]/,true);\n      return rval(state,stream,\"fun\");      // f/0 style fun\n    }\n\n    var w = stream.current();\n\n    if (is_member(w,keywordWords)) {\n      return rval(state,stream,\"keyword\");\n    }else if (is_member(w,operatorAtomWords)) {\n      return rval(state,stream,\"operator\");\n    }else if (stream.match(/\\s*\\(/,false)) {\n      // 'put' and 'erlang:put' are bifs, 'foo:put' is not\n      if (is_member(w,bifWords) &&\n          ((peekToken(state).token != \":\") ||\n           (peekToken(state,2).token == \"erlang\"))) {\n        return rval(state,stream,\"builtin\");\n      }else if (is_member(w,guardWords)) {\n        return rval(state,stream,\"guard\");\n      }else{\n        return rval(state,stream,\"function\");\n      }\n    }else if (lookahead(stream) == \":\") {\n      if (w == \"erlang\") {\n        return rval(state,stream,\"builtin\");\n      } else {\n        return rval(state,stream,\"function\");\n      }\n    }else if (is_member(w,[\"true\",\"false\"])) {\n      return rval(state,stream,\"boolean\");\n    }else{\n      return rval(state,stream,\"atom\");\n    }\n  }\n\n  // number\n  var digitRE      = /[0-9]/;\n  var radixRE      = /[0-9a-zA-Z]/;         // 36#zZ style int\n  if (digitRE.test(ch)) {\n    stream.eatWhile(digitRE);\n    if (stream.eat('#')) {                // 36#aZ  style integer\n      if (!stream.eatWhile(radixRE)) {\n        stream.backUp(1);                 //\"36#\" - syntax error\n      }\n    } else if (stream.eat('.')) {       // float\n      if (!stream.eatWhile(digitRE)) {\n        stream.backUp(1);        // \"3.\" - probably end of function\n      } else {\n        if (stream.eat(/[eE]/)) {        // float with exponent\n          if (stream.eat(/[-+]/)) {\n            if (!stream.eatWhile(digitRE)) {\n              stream.backUp(2);            // \"2e-\" - syntax error\n            }\n          } else {\n            if (!stream.eatWhile(digitRE)) {\n              stream.backUp(1);            // \"2e\" - syntax error\n            }\n          }\n        }\n      }\n    }\n    return rval(state,stream,\"number\");   // normal integer\n  }\n\n  // open parens\n  if (nongreedy(stream,openParenRE,openParenWords)) {\n    return rval(state,stream,\"open_paren\");\n  }\n\n  // close parens\n  if (nongreedy(stream,closeParenRE,closeParenWords)) {\n    return rval(state,stream,\"close_paren\");\n  }\n\n  // separators\n  if (greedy(stream,separatorRE,separatorWords)) {\n    return rval(state,stream,\"separator\");\n  }\n\n  // operators\n  if (greedy(stream,operatorSymbolRE,operatorSymbolWords)) {\n    return rval(state,stream,\"operator\");\n  }\n\n  return rval(state,stream,null);\n}\n\n/////////////////////////////////////////////////////////////////////////////\n// utilities\nfunction nongreedy(stream,re,words) {\n  if (stream.current().length == 1 && re.test(stream.current())) {\n    stream.backUp(1);\n    while (re.test(stream.peek())) {\n      stream.next();\n      if (is_member(stream.current(),words)) {\n        return true;\n      }\n    }\n    stream.backUp(stream.current().length-1);\n  }\n  return false;\n}\n\nfunction greedy(stream,re,words) {\n  if (stream.current().length == 1 && re.test(stream.current())) {\n    while (re.test(stream.peek())) {\n      stream.next();\n    }\n    while (0 < stream.current().length) {\n      if (is_member(stream.current(),words)) {\n        return true;\n      }else{\n        stream.backUp(1);\n      }\n    }\n    stream.next();\n  }\n  return false;\n}\n\nfunction doubleQuote(stream) {\n  return quote(stream, '\"', '\\\\');\n}\n\nfunction singleQuote(stream) {\n  return quote(stream,'\\'','\\\\');\n}\n\nfunction quote(stream,quoteChar,escapeChar) {\n  while (!stream.eol()) {\n    var ch = stream.next();\n    if (ch == quoteChar) {\n      return true;\n    }else if (ch == escapeChar) {\n      stream.next();\n    }\n  }\n  return false;\n}\n\nfunction lookahead(stream) {\n  var m = stream.match(/^\\s*([^\\s%])/, false)\n  return m ? m[1] : \"\";\n}\n\nfunction is_member(element,list) {\n  return (-1 < list.indexOf(element));\n}\n\nfunction rval(state,stream,type) {\n\n  // parse stack\n  pushToken(state,realToken(type,stream));\n\n  // map erlang token type to CodeMirror style class\n  //     erlang             -> CodeMirror tag\n  switch (type) {\n  case \"atom\":        return \"atom\";\n  case \"attribute\":   return \"attribute\";\n  case \"boolean\":     return \"atom\";\n  case \"builtin\":     return \"builtin\";\n  case \"close_paren\": return null;\n  case \"colon\":       return null;\n  case \"comment\":     return \"comment\";\n  case \"dot\":         return null;\n  case \"error\":       return \"error\";\n  case \"fun\":         return \"meta\";\n  case \"function\":    return \"tag\";\n  case \"guard\":       return \"property\";\n  case \"keyword\":     return \"keyword\";\n  case \"macro\":       return \"macroName\";\n  case \"number\":      return \"number\";\n  case \"open_paren\":  return null;\n  case \"operator\":    return \"operator\";\n  case \"record\":      return \"bracket\";\n  case \"separator\":   return null;\n  case \"string\":      return \"string\";\n  case \"type\":        return \"def\";\n  case \"variable\":    return \"variable\";\n  default:            return null;\n  }\n}\n\nfunction aToken(tok,col,ind,typ) {\n  return {token:  tok,\n          column: col,\n          indent: ind,\n          type:   typ};\n}\n\nfunction realToken(type,stream) {\n  return aToken(stream.current(),\n                stream.column(),\n                stream.indentation(),\n                type);\n}\n\nfunction fakeToken(type) {\n  return aToken(type,0,0,type);\n}\n\nfunction peekToken(state,depth) {\n  var len = state.tokenStack.length;\n  var dep = (depth ? depth : 1);\n\n  if (len < dep) {\n    return false;\n  }else{\n    return state.tokenStack[len-dep];\n  }\n}\n\nfunction pushToken(state,token) {\n\n  if (!(token.type == \"comment\" || token.type == \"whitespace\")) {\n    state.tokenStack = maybe_drop_pre(state.tokenStack,token);\n    state.tokenStack = maybe_drop_post(state.tokenStack);\n  }\n}\n\nfunction maybe_drop_pre(s,token) {\n  var last = s.length-1;\n\n  if (0 < last && s[last].type === \"record\" && token.type === \"dot\") {\n    s.pop();\n  }else if (0 < last && s[last].type === \"group\") {\n    s.pop();\n    s.push(token);\n  }else{\n    s.push(token);\n  }\n  return s;\n}\n\nfunction maybe_drop_post(s) {\n  if (!s.length) return s\n  var last = s.length-1;\n\n  if (s[last].type === \"dot\") {\n    return [];\n  }\n  if (last > 1 && s[last].type === \"fun\" && s[last-1].token === \"fun\") {\n    return s.slice(0,last-1);\n  }\n  switch (s[last].token) {\n  case \"}\":    return d(s,{g:[\"{\"]});\n  case \"]\":    return d(s,{i:[\"[\"]});\n  case \")\":    return d(s,{i:[\"(\"]});\n  case \">>\":   return d(s,{i:[\"<<\"]});\n  case \"end\":  return d(s,{i:[\"begin\",\"case\",\"fun\",\"if\",\"receive\",\"try\"]});\n  case \",\":    return d(s,{e:[\"begin\",\"try\",\"when\",\"->\",\n                              \",\",\"(\",\"[\",\"{\",\"<<\"]});\n  case \"->\":   return d(s,{r:[\"when\"],\n                           m:[\"try\",\"if\",\"case\",\"receive\"]});\n  case \";\":    return d(s,{E:[\"case\",\"fun\",\"if\",\"receive\",\"try\",\"when\"]});\n  case \"catch\":return d(s,{e:[\"try\"]});\n  case \"of\":   return d(s,{e:[\"case\"]});\n  case \"after\":return d(s,{e:[\"receive\",\"try\"]});\n  default:     return s;\n  }\n}\n\nfunction d(stack,tt) {\n  // stack is a stack of Token objects.\n  // tt is an object; {type:tokens}\n  // type is a char, tokens is a list of token strings.\n  // The function returns (possibly truncated) stack.\n  // It will descend the stack, looking for a Token such that Token.token\n  //  is a member of tokens. If it does not find that, it will normally (but\n  //  see \"E\" below) return stack. If it does find a match, it will remove\n  //  all the Tokens between the top and the matched Token.\n  // If type is \"m\", that is all it does.\n  // If type is \"i\", it will also remove the matched Token and the top Token.\n  // If type is \"g\", like \"i\", but add a fake \"group\" token at the top.\n  // If type is \"r\", it will remove the matched Token, but not the top Token.\n  // If type is \"e\", it will keep the matched Token but not the top Token.\n  // If type is \"E\", it behaves as for type \"e\", except if there is no match,\n  //  in which case it will return an empty stack.\n\n  for (var type in tt) {\n    var len = stack.length-1;\n    var tokens = tt[type];\n    for (var i = len-1; -1 < i ; i--) {\n      if (is_member(stack[i].token,tokens)) {\n        var ss = stack.slice(0,i);\n        switch (type) {\n        case \"m\": return ss.concat(stack[i]).concat(stack[len]);\n        case \"r\": return ss.concat(stack[len]);\n        case \"i\": return ss;\n        case \"g\": return ss.concat(fakeToken(\"group\"));\n        case \"E\": return ss.concat(stack[i]);\n        case \"e\": return ss.concat(stack[i]);\n        }\n      }\n    }\n  }\n  return (type == \"E\" ? [] : stack);\n}\n\n/////////////////////////////////////////////////////////////////////////////\n// indenter\n\nfunction indenter(state, textAfter, cx) {\n  var t;\n  var wordAfter = wordafter(textAfter);\n  var currT = peekToken(state,1);\n  var prevT = peekToken(state,2);\n\n  if (state.in_string || state.in_atom) {\n    return null;\n  }else if (!prevT) {\n    return 0;\n  }else if (currT.token == \"when\") {\n    return currT.column + cx.unit;\n  }else if (wordAfter === \"when\" && prevT.type === \"function\") {\n    return prevT.indent+cx.unit;\n  }else if (wordAfter === \"(\" && currT.token === \"fun\") {\n    return  currT.column+3;\n  }else if (wordAfter === \"catch\" && (t = getToken(state,[\"try\"]))) {\n    return t.column;\n  }else if (is_member(wordAfter,[\"end\",\"after\",\"of\"])) {\n    t = getToken(state,[\"begin\",\"case\",\"fun\",\"if\",\"receive\",\"try\"]);\n    return t ? t.column : null;\n  }else if (is_member(wordAfter,closeParenWords)) {\n    t = getToken(state,openParenWords);\n    return t ? t.column : null;\n  }else if (is_member(currT.token,[\",\",\"|\",\"||\"]) ||\n            is_member(wordAfter,[\",\",\"|\",\"||\"])) {\n    t = postcommaToken(state);\n    return t ? t.column+t.token.length : cx.unit;\n  }else if (currT.token == \"->\") {\n    if (is_member(prevT.token, [\"receive\",\"case\",\"if\",\"try\"])) {\n      return prevT.column+cx.unit+cx.unit;\n    }else{\n      return prevT.column+cx.unit;\n    }\n  }else if (is_member(currT.token,openParenWords)) {\n    return currT.column+currT.token.length;\n  }else{\n    t = defaultToken(state);\n    return truthy(t) ? t.column+cx.unit : 0;\n  }\n}\n\nfunction wordafter(str) {\n  var m = str.match(/,|[a-z]+|\\}|\\]|\\)|>>|\\|+|\\(/);\n\n  return truthy(m) && (m.index === 0) ? m[0] : \"\";\n}\n\nfunction postcommaToken(state) {\n  var objs = state.tokenStack.slice(0,-1);\n  var i = getTokenIndex(objs,\"type\",[\"open_paren\"]);\n\n  return truthy(objs[i]) ? objs[i] : false;\n}\n\nfunction defaultToken(state) {\n  var objs = state.tokenStack;\n  var stop = getTokenIndex(objs,\"type\",[\"open_paren\",\"separator\",\"keyword\"]);\n  var oper = getTokenIndex(objs,\"type\",[\"operator\"]);\n\n  if (truthy(stop) && truthy(oper) && stop < oper) {\n    return objs[stop+1];\n  } else if (truthy(stop)) {\n    return objs[stop];\n  } else {\n    return false;\n  }\n}\n\nfunction getToken(state,tokens) {\n  var objs = state.tokenStack;\n  var i = getTokenIndex(objs,\"token\",tokens);\n\n  return truthy(objs[i]) ? objs[i] : false;\n}\n\nfunction getTokenIndex(objs,propname,propvals) {\n\n  for (var i = objs.length-1; -1 < i ; i--) {\n    if (is_member(objs[i][propname],propvals)) {\n      return i;\n    }\n  }\n  return false;\n}\n\nfunction truthy(x) {\n  return (x !== false) && (x != null);\n}\n\n/////////////////////////////////////////////////////////////////////////////\n// this object defines the mode\n\nconst erlang = {\n  startState() {\n    return {tokenStack: [],\n            in_string:  false,\n            in_atom:    false};\n  },\n\n  token: tokenizer,\n\n  indent: indenter,\n\n  languageData: {\n    commentTokens: {line: \"%\"}\n  }\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/@codemirror/legacy-modes/mode/erlang.js?");

/***/ })

}]);