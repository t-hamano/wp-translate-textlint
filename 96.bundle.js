(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{434:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ttcn", function() { return ttcn; });\nfunction words(str) {\n  var obj = {}, words = str.split(" ");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\n\nconst parserConfig = {\n  name: "ttcn",\n  keywords: words("activate address alive all alt altstep and and4b any" +\n                  " break case component const continue control deactivate" +\n                  " display do else encode enumerated except exception" +\n                  " execute extends extension external for from function" +\n                  " goto group if import in infinity inout interleave" +\n                  " label language length log match message mixed mod" +\n                  " modifies module modulepar mtc noblock not not4b nowait" +\n                  " of on optional or or4b out override param pattern port" +\n                  " procedure record recursive rem repeat return runs select" +\n                  " self sender set signature system template testcase to" +\n                  " type union value valueof var variant while with xor xor4b"),\n  builtin: words("bit2hex bit2int bit2oct bit2str char2int char2oct encvalue" +\n                 " decomp decvalue float2int float2str hex2bit hex2int" +\n                 " hex2oct hex2str int2bit int2char int2float int2hex" +\n                 " int2oct int2str int2unichar isbound ischosen ispresent" +\n                 " isvalue lengthof log2str oct2bit oct2char oct2hex oct2int" +\n                 " oct2str regexp replace rnd sizeof str2bit str2float" +\n                 " str2hex str2int str2oct substr unichar2int unichar2char" +\n                 " enum2int"),\n  types: words("anytype bitstring boolean char charstring default float" +\n               " hexstring integer objid octetstring universal verdicttype timer"),\n  timerOps: words("read running start stop timeout"),\n  portOps: words("call catch check clear getcall getreply halt raise receive" +\n                 " reply send trigger"),\n  configOps: words("create connect disconnect done kill killed map unmap"),\n  verdictOps: words("getverdict setverdict"),\n  sutOps: words("action"),\n  functionOps: words("apply derefers refers"),\n\n  verdictConsts: words("error fail inconc none pass"),\n  booleanConsts: words("true false"),\n  otherConsts: words("null NULL omit"),\n\n  visibilityModifiers: words("private public friend"),\n  templateMatch: words("complement ifpresent subset superset permutation"),\n  multiLineStrings: true\n}\n\nvar wordList = []\nfunction add(obj) {\n  if (obj) for (var prop in obj) if (obj.hasOwnProperty(prop))\n    wordList.push(prop);\n}\nadd(parserConfig.keywords);\nadd(parserConfig.builtin);\nadd(parserConfig.timerOps);\nadd(parserConfig.portOps);\n\nvar keywords = parserConfig.keywords || {},\n    builtin = parserConfig.builtin || {},\n    timerOps = parserConfig.timerOps || {},\n    portOps  = parserConfig.portOps || {},\n    configOps = parserConfig.configOps || {},\n    verdictOps = parserConfig.verdictOps || {},\n    sutOps = parserConfig.sutOps || {},\n    functionOps = parserConfig.functionOps || {},\n\n    verdictConsts = parserConfig.verdictConsts || {},\n    booleanConsts = parserConfig.booleanConsts || {},\n    otherConsts   = parserConfig.otherConsts || {},\n\n    types = parserConfig.types || {},\n    visibilityModifiers = parserConfig.visibilityModifiers || {},\n    templateMatch = parserConfig.templateMatch || {},\n    multiLineStrings = parserConfig.multiLineStrings,\n    indentStatements = parserConfig.indentStatements !== false;\nvar isOperatorChar = /[+\\-*&@=<>!\\/]/;\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n\n  if (ch == \'"\' || ch == "\'") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[\\[\\]{}\\(\\),;\\\\:\\?\\.]/.test(ch)) {\n    curPunc = ch;\n    return "punctuation";\n  }\n  if (ch == "#"){\n    stream.skipToEnd();\n    return "atom";\n  }\n  if (ch == "%"){\n    stream.eatWhile(/\\b/);\n    return "atom";\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    return "number";\n  }\n  if (ch == "/") {\n    if (stream.eat("*")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n    if (stream.eat("/")) {\n      stream.skipToEnd();\n      return "comment";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    if(ch == "@"){\n      if(stream.match("try") || stream.match("catch")\n         || stream.match("lazy")){\n        return "keyword";\n      }\n    }\n    stream.eatWhile(isOperatorChar);\n    return "operator";\n  }\n  stream.eatWhile(/[\\w\\$_\\xa1-\\uffff]/);\n  var cur = stream.current();\n\n  if (keywords.propertyIsEnumerable(cur)) return "keyword";\n  if (builtin.propertyIsEnumerable(cur)) return "builtin";\n\n  if (timerOps.propertyIsEnumerable(cur)) return "def";\n  if (configOps.propertyIsEnumerable(cur)) return "def";\n  if (verdictOps.propertyIsEnumerable(cur)) return "def";\n  if (portOps.propertyIsEnumerable(cur)) return "def";\n  if (sutOps.propertyIsEnumerable(cur)) return "def";\n  if (functionOps.propertyIsEnumerable(cur)) return "def";\n\n  if (verdictConsts.propertyIsEnumerable(cur)) return "string";\n  if (booleanConsts.propertyIsEnumerable(cur)) return "string";\n  if (otherConsts.propertyIsEnumerable(cur)) return "string";\n\n  if (types.propertyIsEnumerable(cur)) return "typeName.standard";\n  if (visibilityModifiers.propertyIsEnumerable(cur))\n    return "modifier";\n  if (templateMatch.propertyIsEnumerable(cur)) return "atom";\n\n  return "variable";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped){\n        var afterQuote = stream.peek();\n        //look if the character after the quote is like the B in \'10100010\'B\n        if (afterQuote){\n          afterQuote = afterQuote.toLowerCase();\n          if(afterQuote == "b" || afterQuote == "h" || afterQuote == "o")\n            stream.next();\n        }\n        end = true; break;\n      }\n      escaped = !escaped && next == "\\\\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = null;\n    return "string";\n  };\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == "/" && maybeEnd) {\n      state.tokenize = null;\n      break;\n    }\n    maybeEnd = (ch == "*");\n  }\n  return "comment";\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\n\nfunction pushContext(state, col, type) {\n  var indent = state.indented;\n  if (state.context && state.context.type == "statement")\n    indent = state.context.indented;\n  return state.context = new Context(indent, col, type, null, state.context);\n}\n\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == ")" || t == "]" || t == "}")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n//Interface\nconst ttcn = {\n  startState: function() {\n    return {\n      tokenize: null,\n      context: new Context(0, 0, "top", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == "comment") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == ";" || curPunc == ":" || curPunc == ",")\n        && ctx.type == "statement"){\n      popContext(state);\n    }\n    else if (curPunc == "{") pushContext(state, stream.column(), "}");\n    else if (curPunc == "[") pushContext(state, stream.column(), "]");\n    else if (curPunc == "(") pushContext(state, stream.column(), ")");\n    else if (curPunc == "}") {\n      while (ctx.type == "statement") ctx = popContext(state);\n      if (ctx.type == "}") ctx = popContext(state);\n      while (ctx.type == "statement") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (indentStatements &&\n             (((ctx.type == "}" || ctx.type == "top") && curPunc != \';\') ||\n              (ctx.type == "statement" && curPunc == "newstatement")))\n      pushContext(state, stream.column(), "statement");\n\n    state.startOfLine = false;\n\n    return style;\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},\n    autocomplete: wordList\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdHRjbi5qcz8zODA2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBLGNBQWM7QUFDZCxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDO0FBQzFDLHdDQUF3QztBQUN4QywwQ0FBMEM7QUFDMUMseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsc0NBQXNDO0FBQ3RDLGdEQUFnRDs7QUFFaEQsb0RBQW9EO0FBQ3BELG9EQUFvRDtBQUNwRCxrREFBa0Q7O0FBRWxELG9DQUFvQztBQUNwQyxnRUFBZ0U7QUFDaEUsb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix5Q0FBeUM7QUFDbkU7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix3Q0FBd0M7QUFDdEU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSwyQkFBMkI7QUFDM0Isb0JBQW9CLG9CQUFvQix5QkFBeUI7QUFDakU7QUFDQTtBQUNBIiwiZmlsZSI6IjQzNC5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkgb2JqW3dvcmRzW2ldXSA9IHRydWU7XG4gIHJldHVybiBvYmo7XG59XG5cbmNvbnN0IHBhcnNlckNvbmZpZyA9IHtcbiAgbmFtZTogXCJ0dGNuXCIsXG4gIGtleXdvcmRzOiB3b3JkcyhcImFjdGl2YXRlIGFkZHJlc3MgYWxpdmUgYWxsIGFsdCBhbHRzdGVwIGFuZCBhbmQ0YiBhbnlcIiArXG4gICAgICAgICAgICAgICAgICBcIiBicmVhayBjYXNlIGNvbXBvbmVudCBjb25zdCBjb250aW51ZSBjb250cm9sIGRlYWN0aXZhdGVcIiArXG4gICAgICAgICAgICAgICAgICBcIiBkaXNwbGF5IGRvIGVsc2UgZW5jb2RlIGVudW1lcmF0ZWQgZXhjZXB0IGV4Y2VwdGlvblwiICtcbiAgICAgICAgICAgICAgICAgIFwiIGV4ZWN1dGUgZXh0ZW5kcyBleHRlbnNpb24gZXh0ZXJuYWwgZm9yIGZyb20gZnVuY3Rpb25cIiArXG4gICAgICAgICAgICAgICAgICBcIiBnb3RvIGdyb3VwIGlmIGltcG9ydCBpbiBpbmZpbml0eSBpbm91dCBpbnRlcmxlYXZlXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgbGFiZWwgbGFuZ3VhZ2UgbGVuZ3RoIGxvZyBtYXRjaCBtZXNzYWdlIG1peGVkIG1vZFwiICtcbiAgICAgICAgICAgICAgICAgIFwiIG1vZGlmaWVzIG1vZHVsZSBtb2R1bGVwYXIgbXRjIG5vYmxvY2sgbm90IG5vdDRiIG5vd2FpdFwiICtcbiAgICAgICAgICAgICAgICAgIFwiIG9mIG9uIG9wdGlvbmFsIG9yIG9yNGIgb3V0IG92ZXJyaWRlIHBhcmFtIHBhdHRlcm4gcG9ydFwiICtcbiAgICAgICAgICAgICAgICAgIFwiIHByb2NlZHVyZSByZWNvcmQgcmVjdXJzaXZlIHJlbSByZXBlYXQgcmV0dXJuIHJ1bnMgc2VsZWN0XCIgK1xuICAgICAgICAgICAgICAgICAgXCIgc2VsZiBzZW5kZXIgc2V0IHNpZ25hdHVyZSBzeXN0ZW0gdGVtcGxhdGUgdGVzdGNhc2UgdG9cIiArXG4gICAgICAgICAgICAgICAgICBcIiB0eXBlIHVuaW9uIHZhbHVlIHZhbHVlb2YgdmFyIHZhcmlhbnQgd2hpbGUgd2l0aCB4b3IgeG9yNGJcIiksXG4gIGJ1aWx0aW46IHdvcmRzKFwiYml0MmhleCBiaXQyaW50IGJpdDJvY3QgYml0MnN0ciBjaGFyMmludCBjaGFyMm9jdCBlbmN2YWx1ZVwiICtcbiAgICAgICAgICAgICAgICAgXCIgZGVjb21wIGRlY3ZhbHVlIGZsb2F0MmludCBmbG9hdDJzdHIgaGV4MmJpdCBoZXgyaW50XCIgK1xuICAgICAgICAgICAgICAgICBcIiBoZXgyb2N0IGhleDJzdHIgaW50MmJpdCBpbnQyY2hhciBpbnQyZmxvYXQgaW50MmhleFwiICtcbiAgICAgICAgICAgICAgICAgXCIgaW50Mm9jdCBpbnQyc3RyIGludDJ1bmljaGFyIGlzYm91bmQgaXNjaG9zZW4gaXNwcmVzZW50XCIgK1xuICAgICAgICAgICAgICAgICBcIiBpc3ZhbHVlIGxlbmd0aG9mIGxvZzJzdHIgb2N0MmJpdCBvY3QyY2hhciBvY3QyaGV4IG9jdDJpbnRcIiArXG4gICAgICAgICAgICAgICAgIFwiIG9jdDJzdHIgcmVnZXhwIHJlcGxhY2Ugcm5kIHNpemVvZiBzdHIyYml0IHN0cjJmbG9hdFwiICtcbiAgICAgICAgICAgICAgICAgXCIgc3RyMmhleCBzdHIyaW50IHN0cjJvY3Qgc3Vic3RyIHVuaWNoYXIyaW50IHVuaWNoYXIyY2hhclwiICtcbiAgICAgICAgICAgICAgICAgXCIgZW51bTJpbnRcIiksXG4gIHR5cGVzOiB3b3JkcyhcImFueXR5cGUgYml0c3RyaW5nIGJvb2xlYW4gY2hhciBjaGFyc3RyaW5nIGRlZmF1bHQgZmxvYXRcIiArXG4gICAgICAgICAgICAgICBcIiBoZXhzdHJpbmcgaW50ZWdlciBvYmppZCBvY3RldHN0cmluZyB1bml2ZXJzYWwgdmVyZGljdHR5cGUgdGltZXJcIiksXG4gIHRpbWVyT3BzOiB3b3JkcyhcInJlYWQgcnVubmluZyBzdGFydCBzdG9wIHRpbWVvdXRcIiksXG4gIHBvcnRPcHM6IHdvcmRzKFwiY2FsbCBjYXRjaCBjaGVjayBjbGVhciBnZXRjYWxsIGdldHJlcGx5IGhhbHQgcmFpc2UgcmVjZWl2ZVwiICtcbiAgICAgICAgICAgICAgICAgXCIgcmVwbHkgc2VuZCB0cmlnZ2VyXCIpLFxuICBjb25maWdPcHM6IHdvcmRzKFwiY3JlYXRlIGNvbm5lY3QgZGlzY29ubmVjdCBkb25lIGtpbGwga2lsbGVkIG1hcCB1bm1hcFwiKSxcbiAgdmVyZGljdE9wczogd29yZHMoXCJnZXR2ZXJkaWN0IHNldHZlcmRpY3RcIiksXG4gIHN1dE9wczogd29yZHMoXCJhY3Rpb25cIiksXG4gIGZ1bmN0aW9uT3BzOiB3b3JkcyhcImFwcGx5IGRlcmVmZXJzIHJlZmVyc1wiKSxcblxuICB2ZXJkaWN0Q29uc3RzOiB3b3JkcyhcImVycm9yIGZhaWwgaW5jb25jIG5vbmUgcGFzc1wiKSxcbiAgYm9vbGVhbkNvbnN0czogd29yZHMoXCJ0cnVlIGZhbHNlXCIpLFxuICBvdGhlckNvbnN0czogd29yZHMoXCJudWxsIE5VTEwgb21pdFwiKSxcblxuICB2aXNpYmlsaXR5TW9kaWZpZXJzOiB3b3JkcyhcInByaXZhdGUgcHVibGljIGZyaWVuZFwiKSxcbiAgdGVtcGxhdGVNYXRjaDogd29yZHMoXCJjb21wbGVtZW50IGlmcHJlc2VudCBzdWJzZXQgc3VwZXJzZXQgcGVybXV0YXRpb25cIiksXG4gIG11bHRpTGluZVN0cmluZ3M6IHRydWVcbn1cblxudmFyIHdvcmRMaXN0ID0gW11cbmZ1bmN0aW9uIGFkZChvYmopIHtcbiAgaWYgKG9iaikgZm9yICh2YXIgcHJvcCBpbiBvYmopIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpXG4gICAgd29yZExpc3QucHVzaChwcm9wKTtcbn1cbmFkZChwYXJzZXJDb25maWcua2V5d29yZHMpO1xuYWRkKHBhcnNlckNvbmZpZy5idWlsdGluKTtcbmFkZChwYXJzZXJDb25maWcudGltZXJPcHMpO1xuYWRkKHBhcnNlckNvbmZpZy5wb3J0T3BzKTtcblxudmFyIGtleXdvcmRzID0gcGFyc2VyQ29uZmlnLmtleXdvcmRzIHx8IHt9LFxuICAgIGJ1aWx0aW4gPSBwYXJzZXJDb25maWcuYnVpbHRpbiB8fCB7fSxcbiAgICB0aW1lck9wcyA9IHBhcnNlckNvbmZpZy50aW1lck9wcyB8fCB7fSxcbiAgICBwb3J0T3BzICA9IHBhcnNlckNvbmZpZy5wb3J0T3BzIHx8IHt9LFxuICAgIGNvbmZpZ09wcyA9IHBhcnNlckNvbmZpZy5jb25maWdPcHMgfHwge30sXG4gICAgdmVyZGljdE9wcyA9IHBhcnNlckNvbmZpZy52ZXJkaWN0T3BzIHx8IHt9LFxuICAgIHN1dE9wcyA9IHBhcnNlckNvbmZpZy5zdXRPcHMgfHwge30sXG4gICAgZnVuY3Rpb25PcHMgPSBwYXJzZXJDb25maWcuZnVuY3Rpb25PcHMgfHwge30sXG5cbiAgICB2ZXJkaWN0Q29uc3RzID0gcGFyc2VyQ29uZmlnLnZlcmRpY3RDb25zdHMgfHwge30sXG4gICAgYm9vbGVhbkNvbnN0cyA9IHBhcnNlckNvbmZpZy5ib29sZWFuQ29uc3RzIHx8IHt9LFxuICAgIG90aGVyQ29uc3RzICAgPSBwYXJzZXJDb25maWcub3RoZXJDb25zdHMgfHwge30sXG5cbiAgICB0eXBlcyA9IHBhcnNlckNvbmZpZy50eXBlcyB8fCB7fSxcbiAgICB2aXNpYmlsaXR5TW9kaWZpZXJzID0gcGFyc2VyQ29uZmlnLnZpc2liaWxpdHlNb2RpZmllcnMgfHwge30sXG4gICAgdGVtcGxhdGVNYXRjaCA9IHBhcnNlckNvbmZpZy50ZW1wbGF0ZU1hdGNoIHx8IHt9LFxuICAgIG11bHRpTGluZVN0cmluZ3MgPSBwYXJzZXJDb25maWcubXVsdGlMaW5lU3RyaW5ncyxcbiAgICBpbmRlbnRTdGF0ZW1lbnRzID0gcGFyc2VyQ29uZmlnLmluZGVudFN0YXRlbWVudHMgIT09IGZhbHNlO1xudmFyIGlzT3BlcmF0b3JDaGFyID0gL1srXFwtKiZAPTw+IVxcL10vO1xudmFyIGN1clB1bmM7XG5cbmZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG5cbiAgaWYgKGNoID09ICdcIicgfHwgY2ggPT0gXCInXCIpIHtcbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuU3RyaW5nKGNoKTtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgaWYgKC9bXFxbXFxde31cXChcXCksO1xcXFw6XFw/XFwuXS8udGVzdChjaCkpIHtcbiAgICBjdXJQdW5jID0gY2g7XG4gICAgcmV0dXJuIFwicHVuY3R1YXRpb25cIjtcbiAgfVxuICBpZiAoY2ggPT0gXCIjXCIpe1xuICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICByZXR1cm4gXCJhdG9tXCI7XG4gIH1cbiAgaWYgKGNoID09IFwiJVwiKXtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1xcYi8pO1xuICAgIHJldHVybiBcImF0b21cIjtcbiAgfVxuICBpZiAoL1xcZC8udGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXC5dLyk7XG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gIH1cbiAgaWYgKGNoID09IFwiL1wiKSB7XG4gICAgaWYgKHN0cmVhbS5lYXQoXCIqXCIpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQ29tbWVudDtcbiAgICAgIHJldHVybiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuICAgIGlmIChzdHJlYW0uZWF0KFwiL1wiKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgIH1cbiAgfVxuICBpZiAoaXNPcGVyYXRvckNoYXIudGVzdChjaCkpIHtcbiAgICBpZihjaCA9PSBcIkBcIil7XG4gICAgICBpZihzdHJlYW0ubWF0Y2goXCJ0cnlcIikgfHwgc3RyZWFtLm1hdGNoKFwiY2F0Y2hcIilcbiAgICAgICAgIHx8IHN0cmVhbS5tYXRjaChcImxhenlcIikpe1xuICAgICAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHN0cmVhbS5lYXRXaGlsZShpc09wZXJhdG9yQ2hhcik7XG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfVxuICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXCRfXFx4YTEtXFx1ZmZmZl0vKTtcbiAgdmFyIGN1ciA9IHN0cmVhbS5jdXJyZW50KCk7XG5cbiAgaWYgKGtleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImtleXdvcmRcIjtcbiAgaWYgKGJ1aWx0aW4ucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiYnVpbHRpblwiO1xuXG4gIGlmICh0aW1lck9wcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSByZXR1cm4gXCJkZWZcIjtcbiAgaWYgKGNvbmZpZ09wcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSByZXR1cm4gXCJkZWZcIjtcbiAgaWYgKHZlcmRpY3RPcHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiZGVmXCI7XG4gIGlmIChwb3J0T3BzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImRlZlwiO1xuICBpZiAoc3V0T3BzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImRlZlwiO1xuICBpZiAoZnVuY3Rpb25PcHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiZGVmXCI7XG5cbiAgaWYgKHZlcmRpY3RDb25zdHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwic3RyaW5nXCI7XG4gIGlmIChib29sZWFuQ29uc3RzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcInN0cmluZ1wiO1xuICBpZiAob3RoZXJDb25zdHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwic3RyaW5nXCI7XG5cbiAgaWYgKHR5cGVzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcInR5cGVOYW1lLnN0YW5kYXJkXCI7XG4gIGlmICh2aXNpYmlsaXR5TW9kaWZpZXJzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpXG4gICAgcmV0dXJuIFwibW9kaWZpZXJcIjtcbiAgaWYgKHRlbXBsYXRlTWF0Y2gucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiYXRvbVwiO1xuXG4gIHJldHVybiBcInZhcmlhYmxlXCI7XG59XG5cbmZ1bmN0aW9uIHRva2VuU3RyaW5nKHF1b3RlKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgbmV4dCwgZW5kID0gZmFsc2U7XG4gICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKG5leHQgPT0gcXVvdGUgJiYgIWVzY2FwZWQpe1xuICAgICAgICB2YXIgYWZ0ZXJRdW90ZSA9IHN0cmVhbS5wZWVrKCk7XG4gICAgICAgIC8vbG9vayBpZiB0aGUgY2hhcmFjdGVyIGFmdGVyIHRoZSBxdW90ZSBpcyBsaWtlIHRoZSBCIGluICcxMDEwMDAxMCdCXG4gICAgICAgIGlmIChhZnRlclF1b3RlKXtcbiAgICAgICAgICBhZnRlclF1b3RlID0gYWZ0ZXJRdW90ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmKGFmdGVyUXVvdGUgPT0gXCJiXCIgfHwgYWZ0ZXJRdW90ZSA9PSBcImhcIiB8fCBhZnRlclF1b3RlID09IFwib1wiKVxuICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbmQgPSB0cnVlOyBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgIH1cbiAgICBpZiAoZW5kIHx8ICEoZXNjYXBlZCB8fCBtdWx0aUxpbmVTdHJpbmdzKSlcbiAgICAgIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9rZW5Db21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG1heWJlRW5kID0gZmFsc2UsIGNoO1xuICB3aGlsZSAoY2ggPSBzdHJlYW0ubmV4dCgpKSB7XG4gICAgaWYgKGNoID09IFwiL1wiICYmIG1heWJlRW5kKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IG51bGw7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbWF5YmVFbmQgPSAoY2ggPT0gXCIqXCIpO1xuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cblxuZnVuY3Rpb24gQ29udGV4dChpbmRlbnRlZCwgY29sdW1uLCB0eXBlLCBhbGlnbiwgcHJldikge1xuICB0aGlzLmluZGVudGVkID0gaW5kZW50ZWQ7XG4gIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFsaWduID0gYWxpZ247XG4gIHRoaXMucHJldiA9IHByZXY7XG59XG5cbmZ1bmN0aW9uIHB1c2hDb250ZXh0KHN0YXRlLCBjb2wsIHR5cGUpIHtcbiAgdmFyIGluZGVudCA9IHN0YXRlLmluZGVudGVkO1xuICBpZiAoc3RhdGUuY29udGV4dCAmJiBzdGF0ZS5jb250ZXh0LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIilcbiAgICBpbmRlbnQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkO1xuICByZXR1cm4gc3RhdGUuY29udGV4dCA9IG5ldyBDb250ZXh0KGluZGVudCwgY29sLCB0eXBlLCBudWxsLCBzdGF0ZS5jb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gcG9wQ29udGV4dChzdGF0ZSkge1xuICB2YXIgdCA9IHN0YXRlLmNvbnRleHQudHlwZTtcbiAgaWYgKHQgPT0gXCIpXCIgfHwgdCA9PSBcIl1cIiB8fCB0ID09IFwifVwiKVxuICAgIHN0YXRlLmluZGVudGVkID0gc3RhdGUuY29udGV4dC5pbmRlbnRlZDtcbiAgcmV0dXJuIHN0YXRlLmNvbnRleHQgPSBzdGF0ZS5jb250ZXh0LnByZXY7XG59XG5cbi8vSW50ZXJmYWNlXG5leHBvcnQgY29uc3QgdHRjbiA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuaXplOiBudWxsLFxuICAgICAgY29udGV4dDogbmV3IENvbnRleHQoMCwgMCwgXCJ0b3BcIiwgZmFsc2UpLFxuICAgICAgaW5kZW50ZWQ6IDAsXG4gICAgICBzdGFydE9mTGluZTogdHJ1ZVxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgY3R4ID0gc3RhdGUuY29udGV4dDtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IGZhbHNlO1xuICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICAgIHN0YXRlLnN0YXJ0T2ZMaW5lID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICBjdXJQdW5jID0gbnVsbDtcbiAgICB2YXIgc3R5bGUgPSAoc3RhdGUudG9rZW5pemUgfHwgdG9rZW5CYXNlKShzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3R5bGUgPT0gXCJjb21tZW50XCIpIHJldHVybiBzdHlsZTtcbiAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IHRydWU7XG5cbiAgICBpZiAoKGN1clB1bmMgPT0gXCI7XCIgfHwgY3VyUHVuYyA9PSBcIjpcIiB8fCBjdXJQdW5jID09IFwiLFwiKVxuICAgICAgICAmJiBjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKXtcbiAgICAgIHBvcENvbnRleHQoc3RhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJQdW5jID09IFwie1wiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIn1cIik7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIltcIikgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJdXCIpO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCIoXCIpIHB1c2hDb250ZXh0KHN0YXRlLCBzdHJlYW0uY29sdW1uKCksIFwiKVwiKTtcbiAgICBlbHNlIGlmIChjdXJQdW5jID09IFwifVwiKSB7XG4gICAgICB3aGlsZSAoY3R4LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIikgY3R4ID0gcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgICBpZiAoY3R4LnR5cGUgPT0gXCJ9XCIpIGN0eCA9IHBvcENvbnRleHQoc3RhdGUpO1xuICAgICAgd2hpbGUgKGN0eC50eXBlID09IFwic3RhdGVtZW50XCIpIGN0eCA9IHBvcENvbnRleHQoc3RhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJQdW5jID09IGN0eC50eXBlKSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICBlbHNlIGlmIChpbmRlbnRTdGF0ZW1lbnRzICYmXG4gICAgICAgICAgICAgKCgoY3R4LnR5cGUgPT0gXCJ9XCIgfHwgY3R4LnR5cGUgPT0gXCJ0b3BcIikgJiYgY3VyUHVuYyAhPSAnOycpIHx8XG4gICAgICAgICAgICAgIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiICYmIGN1clB1bmMgPT0gXCJuZXdzdGF0ZW1lbnRcIikpKVxuICAgICAgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJzdGF0ZW1lbnRcIik7XG5cbiAgICBzdGF0ZS5zdGFydE9mTGluZSA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGluZGVudE9uSW5wdXQ6IC9eXFxzKlt7fV0kLyxcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCIvL1wiLCBibG9jazoge29wZW46IFwiLypcIiwgY2xvc2U6IFwiKi9cIn19LFxuICAgIGF1dG9jb21wbGV0ZTogd29yZExpc3RcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///434\n')}}]);