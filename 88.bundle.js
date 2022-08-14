(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[88],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/tcl.js":
/*!***********************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/tcl.js ***!
  \***********************************************************/
/*! exports provided: tcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tcl\", function() { return tcl; });\nfunction parseWords(str) {\n  var obj = {}, words = str.split(\" \");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\nvar keywords = parseWords(\"Tcl safe after append array auto_execok auto_import auto_load \" +\n                          \"auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror \" +\n                          \"binary break catch cd close concat continue dde eof encoding error \" +\n                          \"eval exec exit expr fblocked fconfigure fcopy file fileevent filename \" +\n                          \"filename flush for foreach format gets glob global history http if \" +\n                          \"incr info interp join lappend lindex linsert list llength load lrange \" +\n                          \"lreplace lsearch lset lsort memory msgcat namespace open package parray \" +\n                          \"pid pkg::create pkg_mkIndex proc puts pwd re_syntax read regex regexp \" +\n                          \"registry regsub rename resource return scan seek set socket source split \" +\n                          \"string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord \" +\n                          \"tcl_wordBreakAfter tcl_startOfPreviousWord tcl_wordBreakBefore tcltest \" +\n                          \"tclvars tell time trace unknown unset update uplevel upvar variable \" +\n                          \"vwait\");\nvar functions = parseWords(\"if elseif else and not or eq ne in ni for foreach while switch\");\nvar isOperatorChar = /[+\\-*&%=<>!?^\\/\\|]/;\nfunction chain(stream, state, f) {\n  state.tokenize = f;\n  return f(stream, state);\n}\nfunction tokenBase(stream, state) {\n  var beforeParams = state.beforeParams;\n  state.beforeParams = false;\n  var ch = stream.next();\n  if ((ch == '\"' || ch == \"'\") && state.inParams) {\n    return chain(stream, state, tokenString(ch));\n  } else if (/[\\[\\]{}\\(\\),;\\.]/.test(ch)) {\n    if (ch == \"(\" && beforeParams) state.inParams = true;\n    else if (ch == \")\") state.inParams = false;\n    return null;\n  } else if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    return \"number\";\n  } else if (ch == \"#\") {\n    if (stream.eat(\"*\"))\n      return chain(stream, state, tokenComment);\n    if (ch == \"#\" && stream.match(/ *\\[ *\\[/))\n      return chain(stream, state, tokenUnparsed);\n    stream.skipToEnd();\n    return \"comment\";\n  } else if (ch == '\"') {\n    stream.skipTo(/\"/);\n    return \"comment\";\n  } else if (ch == \"$\") {\n    stream.eatWhile(/[$_a-z0-9A-Z\\.{:]/);\n    stream.eatWhile(/}/);\n    state.beforeParams = true;\n    return \"builtin\";\n  } else if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"comment\";\n  } else {\n    stream.eatWhile(/[\\w\\$_{}\\xa1-\\uffff]/);\n    var word = stream.current().toLowerCase();\n    if (keywords && keywords.propertyIsEnumerable(word))\n      return \"keyword\";\n    if (functions && functions.propertyIsEnumerable(word)) {\n      state.beforeParams = true;\n      return \"keyword\";\n    }\n    return null;\n  }\n}\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {\n        end = true;\n        break;\n      }\n      escaped = !escaped && next == \"\\\\\";\n    }\n    if (end) state.tokenize = tokenBase;\n    return \"string\";\n  };\n}\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"#\" && maybeEnd) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return \"comment\";\n}\nfunction tokenUnparsed(stream, state) {\n  var maybeEnd = 0, ch;\n  while (ch = stream.next()) {\n    if (ch == \"#\" && maybeEnd == 2) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    if (ch == \"]\")\n      maybeEnd++;\n    else if (ch != \" \")\n      maybeEnd = 0;\n  }\n  return \"meta\";\n}\nconst tcl = {\n  startState: function() {\n    return {\n      tokenize: tokenBase,\n      beforeParams: false,\n      inParams: false\n    };\n  },\n  token: function(stream, state) {\n    if (stream.eatSpace()) return null;\n    return state.tokenize(stream, state);\n  },\n  languageData: {\n    commentTokens: {line: \"#\"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdGNsLmpzPzk0NDgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0EsY0FBYztBQUNkLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxrQkFBa0IsTUFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxvQ0FBb0M7QUFDcEMsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AY29kZW1pcnJvci9sZWdhY3ktbW9kZXMvbW9kZS90Y2wuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBwYXJzZVdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkgb2JqW3dvcmRzW2ldXSA9IHRydWU7XG4gIHJldHVybiBvYmo7XG59XG52YXIga2V5d29yZHMgPSBwYXJzZVdvcmRzKFwiVGNsIHNhZmUgYWZ0ZXIgYXBwZW5kIGFycmF5IGF1dG9fZXhlY29rIGF1dG9faW1wb3J0IGF1dG9fbG9hZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0b19ta2luZGV4IGF1dG9fbWtpbmRleF9vbGQgYXV0b19xdWFsaWZ5IGF1dG9fcmVzZXQgYmdlcnJvciBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmluYXJ5IGJyZWFrIGNhdGNoIGNkIGNsb3NlIGNvbmNhdCBjb250aW51ZSBkZGUgZW9mIGVuY29kaW5nIGVycm9yIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJldmFsIGV4ZWMgZXhpdCBleHByIGZibG9ja2VkIGZjb25maWd1cmUgZmNvcHkgZmlsZSBmaWxlZXZlbnQgZmlsZW5hbWUgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpbGVuYW1lIGZsdXNoIGZvciBmb3JlYWNoIGZvcm1hdCBnZXRzIGdsb2IgZ2xvYmFsIGhpc3RvcnkgaHR0cCBpZiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5jciBpbmZvIGludGVycCBqb2luIGxhcHBlbmQgbGluZGV4IGxpbnNlcnQgbGlzdCBsbGVuZ3RoIGxvYWQgbHJhbmdlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJscmVwbGFjZSBsc2VhcmNoIGxzZXQgbHNvcnQgbWVtb3J5IG1zZ2NhdCBuYW1lc3BhY2Ugb3BlbiBwYWNrYWdlIHBhcnJheSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwicGlkIHBrZzo6Y3JlYXRlIHBrZ19ta0luZGV4IHByb2MgcHV0cyBwd2QgcmVfc3ludGF4IHJlYWQgcmVnZXggcmVnZXhwIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWdpc3RyeSByZWdzdWIgcmVuYW1lIHJlc291cmNlIHJldHVybiBzY2FuIHNlZWsgc2V0IHNvY2tldCBzb3VyY2Ugc3BsaXQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0cmluZyBzdWJzdCBzd2l0Y2ggdGNsX2VuZE9mV29yZCB0Y2xfZmluZExpYnJhcnkgdGNsX3N0YXJ0T2ZOZXh0V29yZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGNsX3dvcmRCcmVha0FmdGVyIHRjbF9zdGFydE9mUHJldmlvdXNXb3JkIHRjbF93b3JkQnJlYWtCZWZvcmUgdGNsdGVzdCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidGNsdmFycyB0ZWxsIHRpbWUgdHJhY2UgdW5rbm93biB1bnNldCB1cGRhdGUgdXBsZXZlbCB1cHZhciB2YXJpYWJsZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidndhaXRcIik7XG52YXIgZnVuY3Rpb25zID0gcGFyc2VXb3JkcyhcImlmIGVsc2VpZiBlbHNlIGFuZCBub3Qgb3IgZXEgbmUgaW4gbmkgZm9yIGZvcmVhY2ggd2hpbGUgc3dpdGNoXCIpO1xudmFyIGlzT3BlcmF0b3JDaGFyID0gL1srXFwtKiYlPTw+IT9eXFwvXFx8XS87XG5mdW5jdGlvbiBjaGFpbihzdHJlYW0sIHN0YXRlLCBmKSB7XG4gIHN0YXRlLnRva2VuaXplID0gZjtcbiAgcmV0dXJuIGYoc3RyZWFtLCBzdGF0ZSk7XG59XG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgYmVmb3JlUGFyYW1zID0gc3RhdGUuYmVmb3JlUGFyYW1zO1xuICBzdGF0ZS5iZWZvcmVQYXJhbXMgPSBmYWxzZTtcbiAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgaWYgKChjaCA9PSAnXCInIHx8IGNoID09IFwiJ1wiKSAmJiBzdGF0ZS5pblBhcmFtcykge1xuICAgIHJldHVybiBjaGFpbihzdHJlYW0sIHN0YXRlLCB0b2tlblN0cmluZyhjaCkpO1xuICB9IGVsc2UgaWYgKC9bXFxbXFxde31cXChcXCksO1xcLl0vLnRlc3QoY2gpKSB7XG4gICAgaWYgKGNoID09IFwiKFwiICYmIGJlZm9yZVBhcmFtcykgc3RhdGUuaW5QYXJhbXMgPSB0cnVlO1xuICAgIGVsc2UgaWYgKGNoID09IFwiKVwiKSBzdGF0ZS5pblBhcmFtcyA9IGZhbHNlO1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKC9cXGQvLnRlc3QoY2gpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFwuXS8pO1xuICAgIHJldHVybiBcIm51bWJlclwiO1xuICB9IGVsc2UgaWYgKGNoID09IFwiI1wiKSB7XG4gICAgaWYgKHN0cmVhbS5lYXQoXCIqXCIpKVxuICAgICAgcmV0dXJuIGNoYWluKHN0cmVhbSwgc3RhdGUsIHRva2VuQ29tbWVudCk7XG4gICAgaWYgKGNoID09IFwiI1wiICYmIHN0cmVhbS5tYXRjaCgvICpcXFsgKlxcWy8pKVxuICAgICAgcmV0dXJuIGNoYWluKHN0cmVhbSwgc3RhdGUsIHRva2VuVW5wYXJzZWQpO1xuICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gIH0gZWxzZSBpZiAoY2ggPT0gJ1wiJykge1xuICAgIHN0cmVhbS5za2lwVG8oL1wiLyk7XG4gICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICB9IGVsc2UgaWYgKGNoID09IFwiJFwiKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bJF9hLXowLTlBLVpcXC57Ol0vKTtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL30vKTtcbiAgICBzdGF0ZS5iZWZvcmVQYXJhbXMgPSB0cnVlO1xuICAgIHJldHVybiBcImJ1aWx0aW5cIjtcbiAgfSBlbHNlIGlmIChpc09wZXJhdG9yQ2hhci50ZXN0KGNoKSkge1xuICAgIHN0cmVhbS5lYXRXaGlsZShpc09wZXJhdG9yQ2hhcik7XG4gICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICB9IGVsc2Uge1xuICAgIHN0cmVhbS5lYXRXaGlsZSgvW1xcd1xcJF97fVxceGExLVxcdWZmZmZdLyk7XG4gICAgdmFyIHdvcmQgPSBzdHJlYW0uY3VycmVudCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGtleXdvcmRzICYmIGtleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKHdvcmQpKVxuICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgIGlmIChmdW5jdGlvbnMgJiYgZnVuY3Rpb25zLnByb3BlcnR5SXNFbnVtZXJhYmxlKHdvcmQpKSB7XG4gICAgICBzdGF0ZS5iZWZvcmVQYXJhbXMgPSB0cnVlO1xuICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuZnVuY3Rpb24gdG9rZW5TdHJpbmcocXVvdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBuZXh0LCBlbmQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAobmV4dCA9PSBxdW90ZSAmJiAhZXNjYXBlZCkge1xuICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgIH1cbiAgICBpZiAoZW5kKSBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cbmZ1bmN0aW9uIHRva2VuQ29tbWVudChzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBtYXliZUVuZCA9IGZhbHNlLCBjaDtcbiAgd2hpbGUgKGNoID0gc3RyZWFtLm5leHQoKSkge1xuICAgIGlmIChjaCA9PSBcIiNcIiAmJiBtYXliZUVuZCkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbWF5YmVFbmQgPSAoY2ggPT0gXCIqXCIpO1xuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cbmZ1bmN0aW9uIHRva2VuVW5wYXJzZWQoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbWF5YmVFbmQgPSAwLCBjaDtcbiAgd2hpbGUgKGNoID0gc3RyZWFtLm5leHQoKSkge1xuICAgIGlmIChjaCA9PSBcIiNcIiAmJiBtYXliZUVuZCA9PSAyKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoY2ggPT0gXCJdXCIpXG4gICAgICBtYXliZUVuZCsrO1xuICAgIGVsc2UgaWYgKGNoICE9IFwiIFwiKVxuICAgICAgbWF5YmVFbmQgPSAwO1xuICB9XG4gIHJldHVybiBcIm1ldGFcIjtcbn1cbmV4cG9ydCBjb25zdCB0Y2wgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbml6ZTogdG9rZW5CYXNlLFxuICAgICAgYmVmb3JlUGFyYW1zOiBmYWxzZSxcbiAgICAgIGluUGFyYW1zOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0sXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGNvbW1lbnRUb2tlbnM6IHtsaW5lOiBcIiNcIn1cbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/tcl.js\n");

/***/ })

}]);