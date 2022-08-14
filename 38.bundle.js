(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{375:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ecl", function() { return ecl; });\nfunction words(str) {\n  var obj = {}, words = str.split(" ");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\n\nfunction metaHook(stream, state) {\n  if (!state.startOfLine) return false;\n  stream.skipToEnd();\n  return "meta";\n}\n\nvar keyword = words("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode");\nvar variable = words("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait");\nvar variable_2 = words("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath");\nvar variable_3 = words("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode");\nvar builtin = words("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when");\nvar blockKeywords = words("catch class do else finally for if switch try while");\nvar atoms = words("true false null");\nvar hooks = {"#": metaHook};\nvar isOperatorChar = /[+\\-*&%=<>!?|\\/]/;\n\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (hooks[ch]) {\n    var result = hooks[ch](stream, state);\n    if (result !== false) return result;\n  }\n  if (ch == \'"\' || ch == "\'") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[\\[\\]{}\\(\\),;\\:\\.]/.test(ch)) {\n    curPunc = ch;\n    return null;\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    return "number";\n  }\n  if (ch == "/") {\n    if (stream.eat("*")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n    if (stream.eat("/")) {\n      stream.skipToEnd();\n      return "comment";\n    }\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return "operator";\n  }\n  stream.eatWhile(/[\\w\\$_]/);\n  var cur = stream.current().toLowerCase();\n  if (keyword.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = "newstatement";\n    return "keyword";\n  } else if (variable.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = "newstatement";\n    return "variable";\n  } else if (variable_2.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = "newstatement";\n    return "modifier";\n  } else if (variable_3.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = "newstatement";\n    return "type";\n  } else if (builtin.propertyIsEnumerable(cur)) {\n    if (blockKeywords.propertyIsEnumerable(cur)) curPunc = "newstatement";\n    return "builtin";\n  } else { //Data types are of from KEYWORD##\n    var i = cur.length - 1;\n    while(i >= 0 && (!isNaN(cur[i]) || cur[i] == \'_\'))\n      --i;\n\n    if (i > 0) {\n      var cur2 = cur.substr(0, i + 1);\n      if (variable_3.propertyIsEnumerable(cur2)) {\n        if (blockKeywords.propertyIsEnumerable(cur2)) curPunc = "newstatement";\n        return "type";\n      }\n    }\n  }\n  if (atoms.propertyIsEnumerable(cur)) return "atom";\n  return null;\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {end = true; break;}\n      escaped = !escaped && next == "\\\\";\n    }\n    if (end || !escaped)\n      state.tokenize = tokenBase;\n    return "string";\n  };\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == "/" && maybeEnd) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == "*");\n  }\n  return "comment";\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  return state.context = new Context(state.indented, col, type, null, state.context);\n}\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == ")" || t == "]" || t == "}")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n// Interface\n\nconst ecl = {\n  startState: function(indentUnit) {\n    return {\n      tokenize: null,\n      context: new Context(-indentUnit, 0, "top", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == "comment" || style == "meta") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == ";" || curPunc == ":") && ctx.type == "statement") popContext(state);\n    else if (curPunc == "{") pushContext(state, stream.column(), "}");\n    else if (curPunc == "[") pushContext(state, stream.column(), "]");\n    else if (curPunc == "(") pushContext(state, stream.column(), ")");\n    else if (curPunc == "}") {\n      while (ctx.type == "statement") ctx = popContext(state);\n      if (ctx.type == "}") ctx = popContext(state);\n      while (ctx.type == "statement") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (ctx.type == "}" || ctx.type == "top" || (ctx.type == "statement" && curPunc == "newstatement"))\n      pushContext(state, stream.column(), "statement");\n    state.startOfLine = false;\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    if (state.tokenize != tokenBase && state.tokenize != null) return 0;\n    var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);\n    if (ctx.type == "statement" && firstChar == "}") ctx = ctx.prev;\n    var closing = firstChar == ctx.type;\n    if (ctx.type == "statement") return ctx.indented + (firstChar == "{" ? 0 : cx.unit);\n    else if (ctx.align) return ctx.column + (closing ? 0 : 1);\n    else return ctx.indented + (closing ? 0 : cx.unit);\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZWNsLmpzPzEyZjciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0EsY0FBYztBQUNkLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUcsT0FBTztBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFdBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEIsMEJBQTBCLHlDQUF5QztBQUNuRTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBIiwiZmlsZSI6IjM3NS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkgb2JqW3dvcmRzW2ldXSA9IHRydWU7XG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIG1ldGFIb29rKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKCFzdGF0ZS5zdGFydE9mTGluZSkgcmV0dXJuIGZhbHNlO1xuICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gIHJldHVybiBcIm1ldGFcIjtcbn1cblxudmFyIGtleXdvcmQgPSB3b3JkcyhcImFicyBhY29zIGFsbG5vZGVzIGFzY2lpIGFzaW4gYXNzdHJpbmcgYXRhbiBhdGFuMiBhdmUgY2FzZSBjaG9vc2UgY2hvb3NlbiBjaG9vc2VzZXRzIGNsdXN0ZXJzaXplIGNvbWJpbmUgY29ycmVsYXRpb24gY29zIGNvc2ggY291bnQgY292YXJpYW5jZSBjcm9uIGRhdGFzZXQgZGVkdXAgZGVmaW5lIGRlbm9ybWFsaXplIGRpc3RyaWJ1dGUgZGlzdHJpYnV0ZWQgZGlzdHJpYnV0aW9uIGViY2RpYyBlbnRoIGVycm9yIGV2YWx1YXRlIGV2ZW50IGV2ZW50ZXh0cmEgZXZlbnRuYW1lIGV4aXN0cyBleHAgZmFpbGNvZGUgZmFpbG1lc3NhZ2UgZmV0Y2ggZnJvbXVuaWNvZGUgZ2V0aXN2YWxpZCBnbG9iYWwgZ3JhcGggZ3JvdXAgaGFzaCBoYXNoMzIgaGFzaDY0IGhhc2hjcmMgaGFzaG1kNSBoYXZpbmcgaWYgaW5kZXggaW50Zm9ybWF0IGlzdmFsaWQgaXRlcmF0ZSBqb2luIGtleXVuaWNvZGUgbGVuZ3RoIGxpYnJhcnkgbGltaXQgbG4gbG9jYWwgbG9nIGxvb3AgbWFwIG1hdGNoZWQgbWF0Y2hsZW5ndGggbWF0Y2hwb3NpdGlvbiBtYXRjaHRleHQgbWF0Y2h1bmljb2RlIG1heCBtZXJnZSBtZXJnZWpvaW4gbWluIG5vbG9jYWwgbm9uZW1wdHkgbm9ybWFsaXplIHBhcnNlIHBpcGUgcG93ZXIgcHJlbG9hZCBwcm9jZXNzIHByb2plY3QgcHVsbCByYW5kb20gcmFuZ2UgcmFuayByYW5rZWQgcmVhbGZvcm1hdCByZWNvcmRvZiByZWdleGZpbmQgcmVnZXhyZXBsYWNlIHJlZ3JvdXAgcmVqZWN0ZWQgcm9sbHVwIHJvdW5kIHJvdW5kdXAgcm93IHJvd2RpZmYgc2FtcGxlIHNldCBzaW4gc2luaCBzaXplb2Ygc29hcGNhbGwgc29ydCBzb3J0ZWQgc3FydCBzdGVwcGVkIHN0b3JlZCBzdW0gdGFibGUgdGFuIHRhbmggdGhpc25vZGUgdG9wbiB0b3VuaWNvZGUgdHJhbnNmZXIgdHJpbSB0cnVuY2F0ZSB0eXBlb2YgdW5ncm91cCB1bmljb2Rlb3JkZXIgdmFyaWFuY2Ugd2hpY2ggd29ya3VuaXQgeG1sZGVjb2RlIHhtbGVuY29kZSB4bWx0ZXh0IHhtbHVuaWNvZGVcIik7XG52YXIgdmFyaWFibGUgPSB3b3JkcyhcImFwcGx5IGFzc2VydCBidWlsZCBidWlsZGluZGV4IGV2YWx1YXRlIGZhaWwga2V5ZGlmZiBrZXlwYXRjaCBsb2FkeG1sIG5vdGhvciBub3RpZnkgb3V0cHV0IHBhcmFsbGVsIHNlcXVlbnRpYWwgc29hcGNhbGwgd2FpdFwiKTtcbnZhciB2YXJpYWJsZV8yID0gd29yZHMoXCJfX2NvbXByZXNzZWRfXyBhbGwgYW5kIGFueSBhcyBhdG1vc3QgYmVmb3JlIGJlZ2luYysrIGJlc3QgYmV0d2VlbiBjYXNlIGNvbnN0IGNvdW50ZXIgY3N2IGRlc2NlbmQgZW5jcnlwdCBlbmQgZW5kYysrIGVuZG1hY3JvIGV4Y2VwdCBleGNsdXNpdmUgZXhwaXJlIGV4cG9ydCBleHRlbmQgZmFsc2UgZmV3IGZpcnN0IGZsYXQgZnJvbSBmdWxsIGZ1bmN0aW9uIGdyb3VwIGhlYWRlciBoZWFkaW5nIGhvbGUgaWZibG9jayBpbXBvcnQgaW4gaW50ZXJmYWNlIGpvaW5lZCBrZWVwIGtleWVkIGxhc3QgbGVmdCBsaW1pdCBsb2FkIGxvY2FsIGxvY2FsZSBsb29rdXAgbWFjcm8gbWFueSBtYXhjb3VudCBtYXhsZW5ndGggbWluIHNrZXcgbW9kdWxlIG5hbWVkIG5vY2FzZSBub3Jvb3Qgbm9zY2FuIG5vc29ydCBub3Qgb2Ygb25seSBvcHQgb3Igb3V0ZXIgb3ZlcndyaXRlIHBhY2tlZCBwYXJ0aXRpb24gcGVuYWx0eSBwaHlzaWNhbGxlbmd0aCBwaXBlIHF1b3RlIHJlY29yZCByZWxhdGlvbnNoaXAgcmVwZWF0IHJldHVybiByaWdodCBzY2FuIHNlbGYgc2VwYXJhdG9yIHNlcnZpY2Ugc2hhcmVkIHNrZXcgc2tpcCBzcWwgc3RvcmUgdGVybWluYXRvciB0aG9yIHRocmVzaG9sZCB0b2tlbiB0cmFuc2Zvcm0gdHJpbSB0cnVlIHR5cGUgdW5pY29kZW9yZGVyIHVuc29ydGVkIHZhbGlkYXRlIHZpcnR1YWwgd2hvbGUgd2lsZCB3aXRoaW4geG1sIHhwYXRoXCIpO1xudmFyIHZhcmlhYmxlXzMgPSB3b3JkcyhcImFzY2lpIGJpZ19lbmRpYW4gYm9vbGVhbiBkYXRhIGRlY2ltYWwgZWJjZGljIGludGVnZXIgcGF0dGVybiBxc3RyaW5nIHJlYWwgcmVjb3JkIHJ1bGUgc2V0IG9mIHN0cmluZyB0b2tlbiB1ZGVjaW1hbCB1bmljb2RlIHVuc2lnbmVkIHZhcnN0cmluZyB2YXJ1bmljb2RlXCIpO1xudmFyIGJ1aWx0aW4gPSB3b3JkcyhcImNoZWNrcG9pbnQgZGVwcmVjYXRlZCBmYWlsY29kZSBmYWlsbWVzc2FnZSBmYWlsdXJlIGdsb2JhbCBpbmRlcGVuZGVudCBvbndhcm5pbmcgcGVyc2lzdCBwcmlvcml0eSByZWNvdmVyeSBzdG9yZWQgc3VjY2VzcyB3YWl0IHdoZW5cIik7XG52YXIgYmxvY2tLZXl3b3JkcyA9IHdvcmRzKFwiY2F0Y2ggY2xhc3MgZG8gZWxzZSBmaW5hbGx5IGZvciBpZiBzd2l0Y2ggdHJ5IHdoaWxlXCIpO1xudmFyIGF0b21zID0gd29yZHMoXCJ0cnVlIGZhbHNlIG51bGxcIik7XG52YXIgaG9va3MgPSB7XCIjXCI6IG1ldGFIb29rfTtcbnZhciBpc09wZXJhdG9yQ2hhciA9IC9bK1xcLSomJT08PiE/fFxcL10vO1xuXG52YXIgY3VyUHVuYztcblxuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgaWYgKGhvb2tzW2NoXSkge1xuICAgIHZhciByZXN1bHQgPSBob29rc1tjaF0oc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKGNoID09ICdcIicgfHwgY2ggPT0gXCInXCIpIHtcbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuU3RyaW5nKGNoKTtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgaWYgKC9bXFxbXFxde31cXChcXCksO1xcOlxcLl0vLnRlc3QoY2gpKSB7XG4gICAgY3VyUHVuYyA9IGNoO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICgvXFxkLy50ZXN0KGNoKSkge1xuICAgIHN0cmVhbS5lYXRXaGlsZSgvW1xcd1xcLl0vKTtcbiAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgfVxuICBpZiAoY2ggPT0gXCIvXCIpIHtcbiAgICBpZiAoc3RyZWFtLmVhdChcIipcIikpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5Db21tZW50O1xuICAgICAgcmV0dXJuIHRva2VuQ29tbWVudChzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5lYXQoXCIvXCIpKSB7XG4gICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgfVxuICB9XG4gIGlmIChpc09wZXJhdG9yQ2hhci50ZXN0KGNoKSkge1xuICAgIHN0cmVhbS5lYXRXaGlsZShpc09wZXJhdG9yQ2hhcik7XG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfVxuICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXCRfXS8pO1xuICB2YXIgY3VyID0gc3RyZWFtLmN1cnJlbnQoKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoa2V5d29yZC5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSB7XG4gICAgaWYgKGJsb2NrS2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgY3VyUHVuYyA9IFwibmV3c3RhdGVtZW50XCI7XG4gICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICB9IGVsc2UgaWYgKHZhcmlhYmxlLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHtcbiAgICBpZiAoYmxvY2tLZXl3b3Jkcy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSBjdXJQdW5jID0gXCJuZXdzdGF0ZW1lbnRcIjtcbiAgICByZXR1cm4gXCJ2YXJpYWJsZVwiO1xuICB9IGVsc2UgaWYgKHZhcmlhYmxlXzIucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkge1xuICAgIGlmIChibG9ja0tleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIGN1clB1bmMgPSBcIm5ld3N0YXRlbWVudFwiO1xuICAgIHJldHVybiBcIm1vZGlmaWVyXCI7XG4gIH0gZWxzZSBpZiAodmFyaWFibGVfMy5wcm9wZXJ0eUlzRW51bWVyYWJsZShjdXIpKSB7XG4gICAgaWYgKGJsb2NrS2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgY3VyUHVuYyA9IFwibmV3c3RhdGVtZW50XCI7XG4gICAgcmV0dXJuIFwidHlwZVwiO1xuICB9IGVsc2UgaWYgKGJ1aWx0aW4ucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkge1xuICAgIGlmIChibG9ja0tleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIGN1clB1bmMgPSBcIm5ld3N0YXRlbWVudFwiO1xuICAgIHJldHVybiBcImJ1aWx0aW5cIjtcbiAgfSBlbHNlIHsgLy9EYXRhIHR5cGVzIGFyZSBvZiBmcm9tIEtFWVdPUkQjI1xuICAgIHZhciBpID0gY3VyLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUoaSA+PSAwICYmICghaXNOYU4oY3VyW2ldKSB8fCBjdXJbaV0gPT0gJ18nKSlcbiAgICAgIC0taTtcblxuICAgIGlmIChpID4gMCkge1xuICAgICAgdmFyIGN1cjIgPSBjdXIuc3Vic3RyKDAsIGkgKyAxKTtcbiAgICAgIGlmICh2YXJpYWJsZV8zLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cjIpKSB7XG4gICAgICAgIGlmIChibG9ja0tleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cjIpKSBjdXJQdW5jID0gXCJuZXdzdGF0ZW1lbnRcIjtcbiAgICAgICAgcmV0dXJuIFwidHlwZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYXRvbXMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiYXRvbVwiO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdG9rZW5TdHJpbmcocXVvdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBuZXh0LCBlbmQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAobmV4dCA9PSBxdW90ZSAmJiAhZXNjYXBlZCkge2VuZCA9IHRydWU7IGJyZWFrO31cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgIH1cbiAgICBpZiAoZW5kIHx8ICFlc2NhcGVkKVxuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRva2VuQ29tbWVudChzdHJlYW0sIHN0YXRlKSB7XG4gIHZhciBtYXliZUVuZCA9IGZhbHNlLCBjaDtcbiAgd2hpbGUgKGNoID0gc3RyZWFtLm5leHQoKSkge1xuICAgIGlmIChjaCA9PSBcIi9cIiAmJiBtYXliZUVuZCkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbWF5YmVFbmQgPSAoY2ggPT0gXCIqXCIpO1xuICB9XG4gIHJldHVybiBcImNvbW1lbnRcIjtcbn1cblxuZnVuY3Rpb24gQ29udGV4dChpbmRlbnRlZCwgY29sdW1uLCB0eXBlLCBhbGlnbiwgcHJldikge1xuICB0aGlzLmluZGVudGVkID0gaW5kZW50ZWQ7XG4gIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFsaWduID0gYWxpZ247XG4gIHRoaXMucHJldiA9IHByZXY7XG59XG5mdW5jdGlvbiBwdXNoQ29udGV4dChzdGF0ZSwgY29sLCB0eXBlKSB7XG4gIHJldHVybiBzdGF0ZS5jb250ZXh0ID0gbmV3IENvbnRleHQoc3RhdGUuaW5kZW50ZWQsIGNvbCwgdHlwZSwgbnVsbCwgc3RhdGUuY29udGV4dCk7XG59XG5mdW5jdGlvbiBwb3BDb250ZXh0KHN0YXRlKSB7XG4gIHZhciB0ID0gc3RhdGUuY29udGV4dC50eXBlO1xuICBpZiAodCA9PSBcIilcIiB8fCB0ID09IFwiXVwiIHx8IHQgPT0gXCJ9XCIpXG4gICAgc3RhdGUuaW5kZW50ZWQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkO1xuICByZXR1cm4gc3RhdGUuY29udGV4dCA9IHN0YXRlLmNvbnRleHQucHJldjtcbn1cblxuLy8gSW50ZXJmYWNlXG5cbmV4cG9ydCBjb25zdCBlY2wgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKGluZGVudFVuaXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5pemU6IG51bGwsXG4gICAgICBjb250ZXh0OiBuZXcgQ29udGV4dCgtaW5kZW50VW5pdCwgMCwgXCJ0b3BcIiwgZmFsc2UpLFxuICAgICAgaW5kZW50ZWQ6IDAsXG4gICAgICBzdGFydE9mTGluZTogdHJ1ZVxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgY3R4ID0gc3RhdGUuY29udGV4dDtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IGZhbHNlO1xuICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICAgIHN0YXRlLnN0YXJ0T2ZMaW5lID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICBjdXJQdW5jID0gbnVsbDtcbiAgICB2YXIgc3R5bGUgPSAoc3RhdGUudG9rZW5pemUgfHwgdG9rZW5CYXNlKShzdHJlYW0sIHN0YXRlKTtcbiAgICBpZiAoc3R5bGUgPT0gXCJjb21tZW50XCIgfHwgc3R5bGUgPT0gXCJtZXRhXCIpIHJldHVybiBzdHlsZTtcbiAgICBpZiAoY3R4LmFsaWduID09IG51bGwpIGN0eC5hbGlnbiA9IHRydWU7XG5cbiAgICBpZiAoKGN1clB1bmMgPT0gXCI7XCIgfHwgY3VyUHVuYyA9PSBcIjpcIikgJiYgY3R4LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIikgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIntcIikgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJ9XCIpO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCJbXCIpIHB1c2hDb250ZXh0KHN0YXRlLCBzdHJlYW0uY29sdW1uKCksIFwiXVwiKTtcbiAgICBlbHNlIGlmIChjdXJQdW5jID09IFwiKFwiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIilcIik7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIn1cIikge1xuICAgICAgd2hpbGUgKGN0eC50eXBlID09IFwic3RhdGVtZW50XCIpIGN0eCA9IHBvcENvbnRleHQoc3RhdGUpO1xuICAgICAgaWYgKGN0eC50eXBlID09IFwifVwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICAgIHdoaWxlIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBjdHgudHlwZSkgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgZWxzZSBpZiAoY3R4LnR5cGUgPT0gXCJ9XCIgfHwgY3R4LnR5cGUgPT0gXCJ0b3BcIiB8fCAoY3R4LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIiAmJiBjdXJQdW5jID09IFwibmV3c3RhdGVtZW50XCIpKVxuICAgICAgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJzdGF0ZW1lbnRcIik7XG4gICAgc3RhdGUuc3RhcnRPZkxpbmUgPSBmYWxzZTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyLCBjeCkge1xuICAgIGlmIChzdGF0ZS50b2tlbml6ZSAhPSB0b2tlbkJhc2UgJiYgc3RhdGUudG9rZW5pemUgIT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgdmFyIGN0eCA9IHN0YXRlLmNvbnRleHQsIGZpcnN0Q2hhciA9IHRleHRBZnRlciAmJiB0ZXh0QWZ0ZXIuY2hhckF0KDApO1xuICAgIGlmIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiICYmIGZpcnN0Q2hhciA9PSBcIn1cIikgY3R4ID0gY3R4LnByZXY7XG4gICAgdmFyIGNsb3NpbmcgPSBmaXJzdENoYXIgPT0gY3R4LnR5cGU7XG4gICAgaWYgKGN0eC50eXBlID09IFwic3RhdGVtZW50XCIpIHJldHVybiBjdHguaW5kZW50ZWQgKyAoZmlyc3RDaGFyID09IFwie1wiID8gMCA6IGN4LnVuaXQpO1xuICAgIGVsc2UgaWYgKGN0eC5hbGlnbikgcmV0dXJuIGN0eC5jb2x1bW4gKyAoY2xvc2luZyA/IDAgOiAxKTtcbiAgICBlbHNlIHJldHVybiBjdHguaW5kZW50ZWQgKyAoY2xvc2luZyA/IDAgOiBjeC51bml0KTtcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBpbmRlbnRPbklucHV0OiAvXlxccypbe31dJC9cbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///375\n')}}]);