(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{430:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tiki", function() { return tiki; });\nfunction inBlock(style, terminator, returnTokenizer) {\n  return function(stream, state) {\n    while (!stream.eol()) {\n      if (stream.match(terminator)) {\n        state.tokenize = inText;\n        break;\n      }\n      stream.next();\n    }\n\n    if (returnTokenizer) state.tokenize = returnTokenizer;\n\n    return style;\n  };\n}\n\nfunction inLine(style) {\n  return function(stream, state) {\n    while(!stream.eol()) {\n      stream.next();\n    }\n    state.tokenize = inText;\n    return style;\n  };\n}\n\nfunction inText(stream, state) {\n  function chain(parser) {\n    state.tokenize = parser;\n    return parser(stream, state);\n  }\n\n  var sol = stream.sol();\n  var ch = stream.next();\n\n  //non start of line\n  switch (ch) { //switch is generally much faster than if, so it is used here\n  case "{": //plugin\n    stream.eat("/");\n    stream.eatSpace();\n    stream.eatWhile(/[^\\s\\u00a0=\\"\\\'\\/?(}]/);\n    state.tokenize = inPlugin;\n    return "tag";\n  case "_": //bold\n    if (stream.eat("_"))\n      return chain(inBlock("strong", "__", inText));\n    break;\n  case "\'": //italics\n    if (stream.eat("\'"))\n      return chain(inBlock("em", "\'\'", inText));\n    break;\n  case "(":// Wiki Link\n    if (stream.eat("("))\n      return chain(inBlock("link", "))", inText));\n    break;\n  case "[":// Weblink\n    return chain(inBlock("url", "]", inText));\n    break;\n  case "|": //table\n    if (stream.eat("|"))\n      return chain(inBlock("comment", "||"));\n    break;\n  case "-":\n    if (stream.eat("=")) {//titleBar\n      return chain(inBlock("header string", "=-", inText));\n    } else if (stream.eat("-")) {//deleted\n      return chain(inBlock("error tw-deleted", "--", inText));\n    }\n    break;\n  case "=": //underline\n    if (stream.match("=="))\n      return chain(inBlock("tw-underline", "===", inText));\n    break;\n  case ":":\n    if (stream.eat(":"))\n      return chain(inBlock("comment", "::"));\n    break;\n  case "^": //box\n    return chain(inBlock("tw-box", "^"));\n    break;\n  case "~": //np\n    if (stream.match("np~"))\n      return chain(inBlock("meta", "~/np~"));\n    break;\n  }\n\n  //start of line types\n  if (sol) {\n    switch (ch) {\n    case "!": //header at start of line\n      if (stream.match(\'!!!!!\')) {\n        return chain(inLine("header string"));\n      } else if (stream.match(\'!!!!\')) {\n        return chain(inLine("header string"));\n      } else if (stream.match(\'!!!\')) {\n        return chain(inLine("header string"));\n      } else if (stream.match(\'!!\')) {\n        return chain(inLine("header string"));\n      } else {\n        return chain(inLine("header string"));\n      }\n      break;\n    case "*": //unordered list line item, or <li /> at start of line\n    case "#": //ordered list line item, or <li /> at start of line\n    case "+": //ordered list line item, or <li /> at start of line\n      return chain(inLine("tw-listitem bracket"));\n      break;\n    }\n  }\n\n  //stream.eatWhile(/[&{]/); was eating up plugins, turned off to act less like html and more like tiki\n  return null;\n}\n\n// Return variables for tokenizers\nvar pluginName, type;\nfunction inPlugin(stream, state) {\n  var ch = stream.next();\n  var peek = stream.peek();\n\n  if (ch == "}") {\n    state.tokenize = inText;\n    //type = ch == ")" ? "endPlugin" : "selfclosePlugin"; inPlugin\n    return "tag";\n  } else if (ch == "(" || ch == ")") {\n    return "bracket";\n  } else if (ch == "=") {\n    type = "equals";\n\n    if (peek == ">") {\n      stream.next();\n      peek = stream.peek();\n    }\n\n    //here we detect values directly after equal character with no quotes\n    if (!/[\\\'\\"]/.test(peek)) {\n      state.tokenize = inAttributeNoQuote();\n    }\n    //end detect values\n\n    return "operator";\n  } else if (/[\\\'\\"]/.test(ch)) {\n    state.tokenize = inAttribute(ch);\n    return state.tokenize(stream, state);\n  } else {\n    stream.eatWhile(/[^\\s\\u00a0=\\"\\\'\\/?]/);\n    return "keyword";\n  }\n}\n\nfunction inAttribute(quote) {\n  return function(stream, state) {\n    while (!stream.eol()) {\n      if (stream.next() == quote) {\n        state.tokenize = inPlugin;\n        break;\n      }\n    }\n    return "string";\n  };\n}\n\nfunction inAttributeNoQuote() {\n  return function(stream, state) {\n    while (!stream.eol()) {\n      var ch = stream.next();\n      var peek = stream.peek();\n      if (ch == " " || ch == "," || /[ )}]/.test(peek)) {\n        state.tokenize = inPlugin;\n        break;\n      }\n    }\n    return "string";\n  };\n}\n\nvar curState, setStyle;\nfunction pass() {\n  for (var i = arguments.length - 1; i >= 0; i--) curState.cc.push(arguments[i]);\n}\n\nfunction cont() {\n  pass.apply(null, arguments);\n  return true;\n}\n\nfunction pushContext(pluginName, startOfLine) {\n  var noIndent = curState.context && curState.context.noIndent;\n  curState.context = {\n    prev: curState.context,\n    pluginName: pluginName,\n    indent: curState.indented,\n    startOfLine: startOfLine,\n    noIndent: noIndent\n  };\n}\n\nfunction popContext() {\n  if (curState.context) curState.context = curState.context.prev;\n}\n\nfunction element(type) {\n  if (type == "openPlugin") {curState.pluginName = pluginName; return cont(attributes, endplugin(curState.startOfLine));}\n  else if (type == "closePlugin") {\n    var err = false;\n    if (curState.context) {\n      err = curState.context.pluginName != pluginName;\n      popContext();\n    } else {\n      err = true;\n    }\n    if (err) setStyle = "error";\n    return cont(endcloseplugin(err));\n  }\n  else if (type == "string") {\n    if (!curState.context || curState.context.name != "!cdata") pushContext("!cdata");\n    if (curState.tokenize == inText) popContext();\n    return cont();\n  }\n  else return cont();\n}\n\nfunction endplugin(startOfLine) {\n  return function(type) {\n    if (\n      type == "selfclosePlugin" ||\n        type == "endPlugin"\n    )\n      return cont();\n    if (type == "endPlugin") {pushContext(curState.pluginName, startOfLine); return cont();}\n    return cont();\n  };\n}\n\nfunction endcloseplugin(err) {\n  return function(type) {\n    if (err) setStyle = "error";\n    if (type == "endPlugin") return cont();\n    return pass();\n  };\n}\n\nfunction attributes(type) {\n  if (type == "keyword") {setStyle = "attribute"; return cont(attributes);}\n  if (type == "equals") return cont(attvalue, attributes);\n  return pass();\n}\nfunction attvalue(type) {\n  if (type == "keyword") {setStyle = "string"; return cont();}\n  if (type == "string") return cont(attvaluemaybe);\n  return pass();\n}\nfunction attvaluemaybe(type) {\n  if (type == "string") return cont(attvaluemaybe);\n  else return pass();\n}\nconst tiki = {\n  startState: function() {\n    return {tokenize: inText, cc: [], indented: 0, startOfLine: true, pluginName: null, context: null};\n  },\n  token: function(stream, state) {\n    if (stream.sol()) {\n      state.startOfLine = true;\n      state.indented = stream.indentation();\n    }\n    if (stream.eatSpace()) return null;\n\n    setStyle = type = pluginName = null;\n    var style = state.tokenize(stream, state);\n    if ((style || type) && style != "comment") {\n      curState = state;\n      while (true) {\n        var comb = state.cc.pop() || element;\n        if (comb(type || style)) break;\n      }\n    }\n    state.startOfLine = false;\n    return setStyle || style;\n  },\n  indent: function(state, textAfter, cx) {\n    var context = state.context;\n    if (context && context.noIndent) return 0;\n    if (context && /^{\\//.test(textAfter))\n      context = context.prev;\n    while (context && !context.startOfLine)\n      context = context.prev;\n    if (context) return context.indent + cx.unit;\n    else return 0;\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdGlraS5qcz81MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2YsU0FBUztBQUNUO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxLQUFLLDRCQUE0QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLElBQUk7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsaUNBQWlDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDhDQUE4QztBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9CQUFvQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxZQUFZO0FBQ1osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI0MzAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBpbkJsb2NrKHN0eWxlLCB0ZXJtaW5hdG9yLCByZXR1cm5Ub2tlbml6ZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB3aGlsZSAoIXN0cmVhbS5lb2woKSkge1xuICAgICAgaWYgKHN0cmVhbS5tYXRjaCh0ZXJtaW5hdG9yKSkge1xuICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IGluVGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBzdHJlYW0ubmV4dCgpO1xuICAgIH1cblxuICAgIGlmIChyZXR1cm5Ub2tlbml6ZXIpIHN0YXRlLnRva2VuaXplID0gcmV0dXJuVG9rZW5pemVyO1xuXG4gICAgcmV0dXJuIHN0eWxlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpbkxpbmUoc3R5bGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB3aGlsZSghc3RyZWFtLmVvbCgpKSB7XG4gICAgICBzdHJlYW0ubmV4dCgpO1xuICAgIH1cbiAgICBzdGF0ZS50b2tlbml6ZSA9IGluVGV4dDtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGluVGV4dChzdHJlYW0sIHN0YXRlKSB7XG4gIGZ1bmN0aW9uIGNoYWluKHBhcnNlcikge1xuICAgIHN0YXRlLnRva2VuaXplID0gcGFyc2VyO1xuICAgIHJldHVybiBwYXJzZXIoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cblxuICB2YXIgc29sID0gc3RyZWFtLnNvbCgpO1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuXG4gIC8vbm9uIHN0YXJ0IG9mIGxpbmVcbiAgc3dpdGNoIChjaCkgeyAvL3N3aXRjaCBpcyBnZW5lcmFsbHkgbXVjaCBmYXN0ZXIgdGhhbiBpZiwgc28gaXQgaXMgdXNlZCBoZXJlXG4gIGNhc2UgXCJ7XCI6IC8vcGx1Z2luXG4gICAgc3RyZWFtLmVhdChcIi9cIik7XG4gICAgc3RyZWFtLmVhdFNwYWNlKCk7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXlxcc1xcdTAwYTA9XFxcIlxcJ1xcLz8ofV0vKTtcbiAgICBzdGF0ZS50b2tlbml6ZSA9IGluUGx1Z2luO1xuICAgIHJldHVybiBcInRhZ1wiO1xuICBjYXNlIFwiX1wiOiAvL2JvbGRcbiAgICBpZiAoc3RyZWFtLmVhdChcIl9cIikpXG4gICAgICByZXR1cm4gY2hhaW4oaW5CbG9jayhcInN0cm9uZ1wiLCBcIl9fXCIsIGluVGV4dCkpO1xuICAgIGJyZWFrO1xuICBjYXNlIFwiJ1wiOiAvL2l0YWxpY3NcbiAgICBpZiAoc3RyZWFtLmVhdChcIidcIikpXG4gICAgICByZXR1cm4gY2hhaW4oaW5CbG9jayhcImVtXCIsIFwiJydcIiwgaW5UZXh0KSk7XG4gICAgYnJlYWs7XG4gIGNhc2UgXCIoXCI6Ly8gV2lraSBMaW5rXG4gICAgaWYgKHN0cmVhbS5lYXQoXCIoXCIpKVxuICAgICAgcmV0dXJuIGNoYWluKGluQmxvY2soXCJsaW5rXCIsIFwiKSlcIiwgaW5UZXh0KSk7XG4gICAgYnJlYWs7XG4gIGNhc2UgXCJbXCI6Ly8gV2VibGlua1xuICAgIHJldHVybiBjaGFpbihpbkJsb2NrKFwidXJsXCIsIFwiXVwiLCBpblRleHQpKTtcbiAgICBicmVhaztcbiAgY2FzZSBcInxcIjogLy90YWJsZVxuICAgIGlmIChzdHJlYW0uZWF0KFwifFwiKSlcbiAgICAgIHJldHVybiBjaGFpbihpbkJsb2NrKFwiY29tbWVudFwiLCBcInx8XCIpKTtcbiAgICBicmVhaztcbiAgY2FzZSBcIi1cIjpcbiAgICBpZiAoc3RyZWFtLmVhdChcIj1cIikpIHsvL3RpdGxlQmFyXG4gICAgICByZXR1cm4gY2hhaW4oaW5CbG9jayhcImhlYWRlciBzdHJpbmdcIiwgXCI9LVwiLCBpblRleHQpKTtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5lYXQoXCItXCIpKSB7Ly9kZWxldGVkXG4gICAgICByZXR1cm4gY2hhaW4oaW5CbG9jayhcImVycm9yIHR3LWRlbGV0ZWRcIiwgXCItLVwiLCBpblRleHQpKTtcbiAgICB9XG4gICAgYnJlYWs7XG4gIGNhc2UgXCI9XCI6IC8vdW5kZXJsaW5lXG4gICAgaWYgKHN0cmVhbS5tYXRjaChcIj09XCIpKVxuICAgICAgcmV0dXJuIGNoYWluKGluQmxvY2soXCJ0dy11bmRlcmxpbmVcIiwgXCI9PT1cIiwgaW5UZXh0KSk7XG4gICAgYnJlYWs7XG4gIGNhc2UgXCI6XCI6XG4gICAgaWYgKHN0cmVhbS5lYXQoXCI6XCIpKVxuICAgICAgcmV0dXJuIGNoYWluKGluQmxvY2soXCJjb21tZW50XCIsIFwiOjpcIikpO1xuICAgIGJyZWFrO1xuICBjYXNlIFwiXlwiOiAvL2JveFxuICAgIHJldHVybiBjaGFpbihpbkJsb2NrKFwidHctYm94XCIsIFwiXlwiKSk7XG4gICAgYnJlYWs7XG4gIGNhc2UgXCJ+XCI6IC8vbnBcbiAgICBpZiAoc3RyZWFtLm1hdGNoKFwibnB+XCIpKVxuICAgICAgcmV0dXJuIGNoYWluKGluQmxvY2soXCJtZXRhXCIsIFwifi9ucH5cIikpO1xuICAgIGJyZWFrO1xuICB9XG5cbiAgLy9zdGFydCBvZiBsaW5lIHR5cGVzXG4gIGlmIChzb2wpIHtcbiAgICBzd2l0Y2ggKGNoKSB7XG4gICAgY2FzZSBcIiFcIjogLy9oZWFkZXIgYXQgc3RhcnQgb2YgbGluZVxuICAgICAgaWYgKHN0cmVhbS5tYXRjaCgnISEhISEnKSkge1xuICAgICAgICByZXR1cm4gY2hhaW4oaW5MaW5lKFwiaGVhZGVyIHN0cmluZ1wiKSk7XG4gICAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgnISEhIScpKSB7XG4gICAgICAgIHJldHVybiBjaGFpbihpbkxpbmUoXCJoZWFkZXIgc3RyaW5nXCIpKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKCchISEnKSkge1xuICAgICAgICByZXR1cm4gY2hhaW4oaW5MaW5lKFwiaGVhZGVyIHN0cmluZ1wiKSk7XG4gICAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgnISEnKSkge1xuICAgICAgICByZXR1cm4gY2hhaW4oaW5MaW5lKFwiaGVhZGVyIHN0cmluZ1wiKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2hhaW4oaW5MaW5lKFwiaGVhZGVyIHN0cmluZ1wiKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiKlwiOiAvL3Vub3JkZXJlZCBsaXN0IGxpbmUgaXRlbSwgb3IgPGxpIC8+IGF0IHN0YXJ0IG9mIGxpbmVcbiAgICBjYXNlIFwiI1wiOiAvL29yZGVyZWQgbGlzdCBsaW5lIGl0ZW0sIG9yIDxsaSAvPiBhdCBzdGFydCBvZiBsaW5lXG4gICAgY2FzZSBcIitcIjogLy9vcmRlcmVkIGxpc3QgbGluZSBpdGVtLCBvciA8bGkgLz4gYXQgc3RhcnQgb2YgbGluZVxuICAgICAgcmV0dXJuIGNoYWluKGluTGluZShcInR3LWxpc3RpdGVtIGJyYWNrZXRcIikpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy9zdHJlYW0uZWF0V2hpbGUoL1sme10vKTsgd2FzIGVhdGluZyB1cCBwbHVnaW5zLCB0dXJuZWQgb2ZmIHRvIGFjdCBsZXNzIGxpa2UgaHRtbCBhbmQgbW9yZSBsaWtlIHRpa2lcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIFJldHVybiB2YXJpYWJsZXMgZm9yIHRva2VuaXplcnNcbnZhciBwbHVnaW5OYW1lLCB0eXBlO1xuZnVuY3Rpb24gaW5QbHVnaW4oc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuICB2YXIgcGVlayA9IHN0cmVhbS5wZWVrKCk7XG5cbiAgaWYgKGNoID09IFwifVwiKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSBpblRleHQ7XG4gICAgLy90eXBlID0gY2ggPT0gXCIpXCIgPyBcImVuZFBsdWdpblwiIDogXCJzZWxmY2xvc2VQbHVnaW5cIjsgaW5QbHVnaW5cbiAgICByZXR1cm4gXCJ0YWdcIjtcbiAgfSBlbHNlIGlmIChjaCA9PSBcIihcIiB8fCBjaCA9PSBcIilcIikge1xuICAgIHJldHVybiBcImJyYWNrZXRcIjtcbiAgfSBlbHNlIGlmIChjaCA9PSBcIj1cIikge1xuICAgIHR5cGUgPSBcImVxdWFsc1wiO1xuXG4gICAgaWYgKHBlZWsgPT0gXCI+XCIpIHtcbiAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICBwZWVrID0gc3RyZWFtLnBlZWsoKTtcbiAgICB9XG5cbiAgICAvL2hlcmUgd2UgZGV0ZWN0IHZhbHVlcyBkaXJlY3RseSBhZnRlciBlcXVhbCBjaGFyYWN0ZXIgd2l0aCBubyBxdW90ZXNcbiAgICBpZiAoIS9bXFwnXFxcIl0vLnRlc3QocGVlaykpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gaW5BdHRyaWJ1dGVOb1F1b3RlKCk7XG4gICAgfVxuICAgIC8vZW5kIGRldGVjdCB2YWx1ZXNcblxuICAgIHJldHVybiBcIm9wZXJhdG9yXCI7XG4gIH0gZWxzZSBpZiAoL1tcXCdcXFwiXS8udGVzdChjaCkpIHtcbiAgICBzdGF0ZS50b2tlbml6ZSA9IGluQXR0cmlidXRlKGNoKTtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXlxcc1xcdTAwYTA9XFxcIlxcJ1xcLz9dLyk7XG4gICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluQXR0cmlidXRlKHF1b3RlKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgIGlmIChzdHJlYW0ubmV4dCgpID09IHF1b3RlKSB7XG4gICAgICAgIHN0YXRlLnRva2VuaXplID0gaW5QbHVnaW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5BdHRyaWJ1dGVOb1F1b3RlKCkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHdoaWxlICghc3RyZWFtLmVvbCgpKSB7XG4gICAgICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuICAgICAgdmFyIHBlZWsgPSBzdHJlYW0ucGVlaygpO1xuICAgICAgaWYgKGNoID09IFwiIFwiIHx8IGNoID09IFwiLFwiIHx8IC9bICl9XS8udGVzdChwZWVrKSkge1xuICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IGluUGx1Z2luO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH07XG59XG5cbnZhciBjdXJTdGF0ZSwgc2V0U3R5bGU7XG5mdW5jdGlvbiBwYXNzKCkge1xuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBjdXJTdGF0ZS5jYy5wdXNoKGFyZ3VtZW50c1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNvbnQoKSB7XG4gIHBhc3MuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHB1c2hDb250ZXh0KHBsdWdpbk5hbWUsIHN0YXJ0T2ZMaW5lKSB7XG4gIHZhciBub0luZGVudCA9IGN1clN0YXRlLmNvbnRleHQgJiYgY3VyU3RhdGUuY29udGV4dC5ub0luZGVudDtcbiAgY3VyU3RhdGUuY29udGV4dCA9IHtcbiAgICBwcmV2OiBjdXJTdGF0ZS5jb250ZXh0LFxuICAgIHBsdWdpbk5hbWU6IHBsdWdpbk5hbWUsXG4gICAgaW5kZW50OiBjdXJTdGF0ZS5pbmRlbnRlZCxcbiAgICBzdGFydE9mTGluZTogc3RhcnRPZkxpbmUsXG4gICAgbm9JbmRlbnQ6IG5vSW5kZW50XG4gIH07XG59XG5cbmZ1bmN0aW9uIHBvcENvbnRleHQoKSB7XG4gIGlmIChjdXJTdGF0ZS5jb250ZXh0KSBjdXJTdGF0ZS5jb250ZXh0ID0gY3VyU3RhdGUuY29udGV4dC5wcmV2O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50KHR5cGUpIHtcbiAgaWYgKHR5cGUgPT0gXCJvcGVuUGx1Z2luXCIpIHtjdXJTdGF0ZS5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZTsgcmV0dXJuIGNvbnQoYXR0cmlidXRlcywgZW5kcGx1Z2luKGN1clN0YXRlLnN0YXJ0T2ZMaW5lKSk7fVxuICBlbHNlIGlmICh0eXBlID09IFwiY2xvc2VQbHVnaW5cIikge1xuICAgIHZhciBlcnIgPSBmYWxzZTtcbiAgICBpZiAoY3VyU3RhdGUuY29udGV4dCkge1xuICAgICAgZXJyID0gY3VyU3RhdGUuY29udGV4dC5wbHVnaW5OYW1lICE9IHBsdWdpbk5hbWU7XG4gICAgICBwb3BDb250ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChlcnIpIHNldFN0eWxlID0gXCJlcnJvclwiO1xuICAgIHJldHVybiBjb250KGVuZGNsb3NlcGx1Z2luKGVycikpO1xuICB9XG4gIGVsc2UgaWYgKHR5cGUgPT0gXCJzdHJpbmdcIikge1xuICAgIGlmICghY3VyU3RhdGUuY29udGV4dCB8fCBjdXJTdGF0ZS5jb250ZXh0Lm5hbWUgIT0gXCIhY2RhdGFcIikgcHVzaENvbnRleHQoXCIhY2RhdGFcIik7XG4gICAgaWYgKGN1clN0YXRlLnRva2VuaXplID09IGluVGV4dCkgcG9wQ29udGV4dCgpO1xuICAgIHJldHVybiBjb250KCk7XG4gIH1cbiAgZWxzZSByZXR1cm4gY29udCgpO1xufVxuXG5mdW5jdGlvbiBlbmRwbHVnaW4oc3RhcnRPZkxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZiAoXG4gICAgICB0eXBlID09IFwic2VsZmNsb3NlUGx1Z2luXCIgfHxcbiAgICAgICAgdHlwZSA9PSBcImVuZFBsdWdpblwiXG4gICAgKVxuICAgICAgcmV0dXJuIGNvbnQoKTtcbiAgICBpZiAodHlwZSA9PSBcImVuZFBsdWdpblwiKSB7cHVzaENvbnRleHQoY3VyU3RhdGUucGx1Z2luTmFtZSwgc3RhcnRPZkxpbmUpOyByZXR1cm4gY29udCgpO31cbiAgICByZXR1cm4gY29udCgpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBlbmRjbG9zZXBsdWdpbihlcnIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZiAoZXJyKSBzZXRTdHlsZSA9IFwiZXJyb3JcIjtcbiAgICBpZiAodHlwZSA9PSBcImVuZFBsdWdpblwiKSByZXR1cm4gY29udCgpO1xuICAgIHJldHVybiBwYXNzKCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZXModHlwZSkge1xuICBpZiAodHlwZSA9PSBcImtleXdvcmRcIikge3NldFN0eWxlID0gXCJhdHRyaWJ1dGVcIjsgcmV0dXJuIGNvbnQoYXR0cmlidXRlcyk7fVxuICBpZiAodHlwZSA9PSBcImVxdWFsc1wiKSByZXR1cm4gY29udChhdHR2YWx1ZSwgYXR0cmlidXRlcyk7XG4gIHJldHVybiBwYXNzKCk7XG59XG5mdW5jdGlvbiBhdHR2YWx1ZSh0eXBlKSB7XG4gIGlmICh0eXBlID09IFwia2V5d29yZFwiKSB7c2V0U3R5bGUgPSBcInN0cmluZ1wiOyByZXR1cm4gY29udCgpO31cbiAgaWYgKHR5cGUgPT0gXCJzdHJpbmdcIikgcmV0dXJuIGNvbnQoYXR0dmFsdWVtYXliZSk7XG4gIHJldHVybiBwYXNzKCk7XG59XG5mdW5jdGlvbiBhdHR2YWx1ZW1heWJlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT0gXCJzdHJpbmdcIikgcmV0dXJuIGNvbnQoYXR0dmFsdWVtYXliZSk7XG4gIGVsc2UgcmV0dXJuIHBhc3MoKTtcbn1cbmV4cG9ydCBjb25zdCB0aWtpID0ge1xuICBzdGFydFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge3Rva2VuaXplOiBpblRleHQsIGNjOiBbXSwgaW5kZW50ZWQ6IDAsIHN0YXJ0T2ZMaW5lOiB0cnVlLCBwbHVnaW5OYW1lOiBudWxsLCBjb250ZXh0OiBudWxsfTtcbiAgfSxcbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICBzdGF0ZS5zdGFydE9mTGluZSA9IHRydWU7XG4gICAgICBzdGF0ZS5pbmRlbnRlZCA9IHN0cmVhbS5pbmRlbnRhdGlvbigpO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHJldHVybiBudWxsO1xuXG4gICAgc2V0U3R5bGUgPSB0eXBlID0gcGx1Z2luTmFtZSA9IG51bGw7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgaWYgKChzdHlsZSB8fCB0eXBlKSAmJiBzdHlsZSAhPSBcImNvbW1lbnRcIikge1xuICAgICAgY3VyU3RhdGUgPSBzdGF0ZTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBjb21iID0gc3RhdGUuY2MucG9wKCkgfHwgZWxlbWVudDtcbiAgICAgICAgaWYgKGNvbWIodHlwZSB8fCBzdHlsZSkpIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGF0ZS5zdGFydE9mTGluZSA9IGZhbHNlO1xuICAgIHJldHVybiBzZXRTdHlsZSB8fCBzdHlsZTtcbiAgfSxcbiAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyLCBjeCkge1xuICAgIHZhciBjb250ZXh0ID0gc3RhdGUuY29udGV4dDtcbiAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Lm5vSW5kZW50KSByZXR1cm4gMDtcbiAgICBpZiAoY29udGV4dCAmJiAvXntcXC8vLnRlc3QodGV4dEFmdGVyKSlcbiAgICAgIGNvbnRleHQgPSBjb250ZXh0LnByZXY7XG4gICAgd2hpbGUgKGNvbnRleHQgJiYgIWNvbnRleHQuc3RhcnRPZkxpbmUpXG4gICAgICBjb250ZXh0ID0gY29udGV4dC5wcmV2O1xuICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dC5pbmRlbnQgKyBjeC51bml0O1xuICAgIGVsc2UgcmV0dXJuIDA7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///430\n')}}]);