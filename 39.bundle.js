(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{376:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"eiffel\", function() { return eiffel; });\nfunction wordObj(words) {\n  var o = {};\n  for (var i = 0, e = words.length; i < e; ++i) o[words[i]] = true;\n  return o;\n}\nvar keywords = wordObj([\n  'note',\n  'across',\n  'when',\n  'variant',\n  'until',\n  'unique',\n  'undefine',\n  'then',\n  'strip',\n  'select',\n  'retry',\n  'rescue',\n  'require',\n  'rename',\n  'reference',\n  'redefine',\n  'prefix',\n  'once',\n  'old',\n  'obsolete',\n  'loop',\n  'local',\n  'like',\n  'is',\n  'inspect',\n  'infix',\n  'include',\n  'if',\n  'frozen',\n  'from',\n  'external',\n  'export',\n  'ensure',\n  'end',\n  'elseif',\n  'else',\n  'do',\n  'creation',\n  'create',\n  'check',\n  'alias',\n  'agent',\n  'separate',\n  'invariant',\n  'inherit',\n  'indexing',\n  'feature',\n  'expanded',\n  'deferred',\n  'class',\n  'Void',\n  'True',\n  'Result',\n  'Precursor',\n  'False',\n  'Current',\n  'create',\n  'attached',\n  'detachable',\n  'as',\n  'and',\n  'implies',\n  'not',\n  'or'\n]);\nvar operators = wordObj([\":=\", \"and then\",\"and\", \"or\",\"<<\",\">>\"]);\n\nfunction chain(newtok, stream, state) {\n  state.tokenize.push(newtok);\n  return newtok(stream, state);\n}\n\nfunction tokenBase(stream, state) {\n  if (stream.eatSpace()) return null;\n  var ch = stream.next();\n  if (ch == '\"'||ch == \"'\") {\n    return chain(readQuoted(ch, \"string\"), stream, state);\n  } else if (ch == \"-\"&&stream.eat(\"-\")) {\n    stream.skipToEnd();\n    return \"comment\";\n  } else if (ch == \":\"&&stream.eat(\"=\")) {\n    return \"operator\";\n  } else if (/[0-9]/.test(ch)) {\n    stream.eatWhile(/[xXbBCc0-9\\.]/);\n    stream.eat(/[\\?\\!]/);\n    return \"variable\";\n  } else if (/[a-zA-Z_0-9]/.test(ch)) {\n    stream.eatWhile(/[a-zA-Z_0-9]/);\n    stream.eat(/[\\?\\!]/);\n    return \"variable\";\n  } else if (/[=+\\-\\/*^%<>~]/.test(ch)) {\n    stream.eatWhile(/[=+\\-\\/*^%<>~]/);\n    return \"operator\";\n  } else {\n    return null;\n  }\n}\n\nfunction readQuoted(quote, style,  unescaped) {\n  return function(stream, state) {\n    var escaped = false, ch;\n    while ((ch = stream.next()) != null) {\n      if (ch == quote && (unescaped || !escaped)) {\n        state.tokenize.pop();\n        break;\n      }\n      escaped = !escaped && ch == \"%\";\n    }\n    return style;\n  };\n}\n\nconst eiffel = {\n  startState: function() {\n    return {tokenize: [tokenBase]};\n  },\n\n  token: function(stream, state) {\n    var style = state.tokenize[state.tokenize.length-1](stream, state);\n    if (style == \"variable\") {\n      var word = stream.current();\n      style = keywords.propertyIsEnumerable(stream.current()) ? \"keyword\"\n        : operators.propertyIsEnumerable(stream.current()) ? \"operator\"\n        : /^[A-Z][A-Z_0-9]*$/g.test(word) ? \"tag\"\n        : /^0[bB][0-1]+$/g.test(word) ? \"number\"\n        : /^0[cC][0-7]+$/g.test(word) ? \"number\"\n        : /^0[xX][a-fA-F0-9]+$/g.test(word) ? \"number\"\n        : /^([0-9]+\\.[0-9]*)|([0-9]*\\.[0-9]+)$/g.test(word) ? \"number\"\n        : /^[0-9]+$/g.test(word) ? \"number\"\n        : \"variable\";\n    }\n    return style;\n  },\n  languageData: {\n    commentTokens: {line: \"--\"}\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZWlmZmVsLmpzP2Y4MjMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLFlBQVk7QUFDWixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBIiwiZmlsZSI6IjM3Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRPYmood29yZHMpIHtcbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIgaSA9IDAsIGUgPSB3b3Jkcy5sZW5ndGg7IGkgPCBlOyArK2kpIG9bd29yZHNbaV1dID0gdHJ1ZTtcbiAgcmV0dXJuIG87XG59XG52YXIga2V5d29yZHMgPSB3b3JkT2JqKFtcbiAgJ25vdGUnLFxuICAnYWNyb3NzJyxcbiAgJ3doZW4nLFxuICAndmFyaWFudCcsXG4gICd1bnRpbCcsXG4gICd1bmlxdWUnLFxuICAndW5kZWZpbmUnLFxuICAndGhlbicsXG4gICdzdHJpcCcsXG4gICdzZWxlY3QnLFxuICAncmV0cnknLFxuICAncmVzY3VlJyxcbiAgJ3JlcXVpcmUnLFxuICAncmVuYW1lJyxcbiAgJ3JlZmVyZW5jZScsXG4gICdyZWRlZmluZScsXG4gICdwcmVmaXgnLFxuICAnb25jZScsXG4gICdvbGQnLFxuICAnb2Jzb2xldGUnLFxuICAnbG9vcCcsXG4gICdsb2NhbCcsXG4gICdsaWtlJyxcbiAgJ2lzJyxcbiAgJ2luc3BlY3QnLFxuICAnaW5maXgnLFxuICAnaW5jbHVkZScsXG4gICdpZicsXG4gICdmcm96ZW4nLFxuICAnZnJvbScsXG4gICdleHRlcm5hbCcsXG4gICdleHBvcnQnLFxuICAnZW5zdXJlJyxcbiAgJ2VuZCcsXG4gICdlbHNlaWYnLFxuICAnZWxzZScsXG4gICdkbycsXG4gICdjcmVhdGlvbicsXG4gICdjcmVhdGUnLFxuICAnY2hlY2snLFxuICAnYWxpYXMnLFxuICAnYWdlbnQnLFxuICAnc2VwYXJhdGUnLFxuICAnaW52YXJpYW50JyxcbiAgJ2luaGVyaXQnLFxuICAnaW5kZXhpbmcnLFxuICAnZmVhdHVyZScsXG4gICdleHBhbmRlZCcsXG4gICdkZWZlcnJlZCcsXG4gICdjbGFzcycsXG4gICdWb2lkJyxcbiAgJ1RydWUnLFxuICAnUmVzdWx0JyxcbiAgJ1ByZWN1cnNvcicsXG4gICdGYWxzZScsXG4gICdDdXJyZW50JyxcbiAgJ2NyZWF0ZScsXG4gICdhdHRhY2hlZCcsXG4gICdkZXRhY2hhYmxlJyxcbiAgJ2FzJyxcbiAgJ2FuZCcsXG4gICdpbXBsaWVzJyxcbiAgJ25vdCcsXG4gICdvcidcbl0pO1xudmFyIG9wZXJhdG9ycyA9IHdvcmRPYmooW1wiOj1cIiwgXCJhbmQgdGhlblwiLFwiYW5kXCIsIFwib3JcIixcIjw8XCIsXCI+PlwiXSk7XG5cbmZ1bmN0aW9uIGNoYWluKG5ld3Rvaywgc3RyZWFtLCBzdGF0ZSkge1xuICBzdGF0ZS50b2tlbml6ZS5wdXNoKG5ld3Rvayk7XG4gIHJldHVybiBuZXd0b2soc3RyZWFtLCBzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkgcmV0dXJuIG51bGw7XG4gIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG4gIGlmIChjaCA9PSAnXCInfHxjaCA9PSBcIidcIikge1xuICAgIHJldHVybiBjaGFpbihyZWFkUXVvdGVkKGNoLCBcInN0cmluZ1wiKSwgc3RyZWFtLCBzdGF0ZSk7XG4gIH0gZWxzZSBpZiAoY2ggPT0gXCItXCImJnN0cmVhbS5lYXQoXCItXCIpKSB7XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfSBlbHNlIGlmIChjaCA9PSBcIjpcIiYmc3RyZWFtLmVhdChcIj1cIikpIHtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9IGVsc2UgaWYgKC9bMC05XS8udGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1t4WGJCQ2MwLTlcXC5dLyk7XG4gICAgc3RyZWFtLmVhdCgvW1xcP1xcIV0vKTtcbiAgICByZXR1cm4gXCJ2YXJpYWJsZVwiO1xuICB9IGVsc2UgaWYgKC9bYS16QS1aXzAtOV0vLnRlc3QoY2gpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bYS16QS1aXzAtOV0vKTtcbiAgICBzdHJlYW0uZWF0KC9bXFw/XFwhXS8pO1xuICAgIHJldHVybiBcInZhcmlhYmxlXCI7XG4gIH0gZWxzZSBpZiAoL1s9K1xcLVxcLypeJTw+fl0vLnRlc3QoY2gpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bPStcXC1cXC8qXiU8Pn5dLyk7XG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkUXVvdGVkKHF1b3RlLCBzdHlsZSwgIHVuZXNjYXBlZCkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIGNoO1xuICAgIHdoaWxlICgoY2ggPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAoY2ggPT0gcXVvdGUgJiYgKHVuZXNjYXBlZCB8fCAhZXNjYXBlZCkpIHtcbiAgICAgICAgc3RhdGUudG9rZW5pemUucG9wKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkICYmIGNoID09IFwiJVwiO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGU7XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBlaWZmZWwgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7dG9rZW5pemU6IFt0b2tlbkJhc2VdfTtcbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnRva2VuaXplW3N0YXRlLnRva2VuaXplLmxlbmd0aC0xXShzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3R5bGUgPT0gXCJ2YXJpYWJsZVwiKSB7XG4gICAgICB2YXIgd29yZCA9IHN0cmVhbS5jdXJyZW50KCk7XG4gICAgICBzdHlsZSA9IGtleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKHN0cmVhbS5jdXJyZW50KCkpID8gXCJrZXl3b3JkXCJcbiAgICAgICAgOiBvcGVyYXRvcnMucHJvcGVydHlJc0VudW1lcmFibGUoc3RyZWFtLmN1cnJlbnQoKSkgPyBcIm9wZXJhdG9yXCJcbiAgICAgICAgOiAvXltBLVpdW0EtWl8wLTldKiQvZy50ZXN0KHdvcmQpID8gXCJ0YWdcIlxuICAgICAgICA6IC9eMFtiQl1bMC0xXSskL2cudGVzdCh3b3JkKSA/IFwibnVtYmVyXCJcbiAgICAgICAgOiAvXjBbY0NdWzAtN10rJC9nLnRlc3Qod29yZCkgPyBcIm51bWJlclwiXG4gICAgICAgIDogL14wW3hYXVthLWZBLUYwLTldKyQvZy50ZXN0KHdvcmQpID8gXCJudW1iZXJcIlxuICAgICAgICA6IC9eKFswLTldK1xcLlswLTldKil8KFswLTldKlxcLlswLTldKykkL2cudGVzdCh3b3JkKSA/IFwibnVtYmVyXCJcbiAgICAgICAgOiAvXlswLTldKyQvZy50ZXN0KHdvcmQpID8gXCJudW1iZXJcIlxuICAgICAgICA6IFwidmFyaWFibGVcIjtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCItLVwifVxuICB9XG59O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///376\n")}}]);