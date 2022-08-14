(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{419:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shell", function() { return shell; });\nvar words = {};\nfunction define(style, dict) {\n  for(var i = 0; i < dict.length; i++) {\n    words[dict[i]] = style;\n  }\n};\n\nvar commonAtoms = ["true", "false"];\nvar commonKeywords = ["if", "then", "do", "else", "elif", "while", "until", "for", "in", "esac", "fi",\n                      "fin", "fil", "done", "exit", "set", "unset", "export", "function"];\nvar commonCommands = ["ab", "awk", "bash", "beep", "cat", "cc", "cd", "chown", "chmod", "chroot", "clear",\n                      "cp", "curl", "cut", "diff", "echo", "find", "gawk", "gcc", "get", "git", "grep", "hg", "kill", "killall",\n                      "ln", "ls", "make", "mkdir", "openssl", "mv", "nc", "nl", "node", "npm", "ping", "ps", "restart", "rm",\n                      "rmdir", "sed", "service", "sh", "shopt", "shred", "source", "sort", "sleep", "ssh", "start", "stop",\n                      "su", "sudo", "svn", "tee", "telnet", "top", "touch", "vi", "vim", "wall", "wc", "wget", "who", "write",\n                      "yes", "zsh"];\n\ndefine(\'atom\', commonAtoms);\ndefine(\'keyword\', commonKeywords);\ndefine(\'builtin\', commonCommands);\n\nfunction tokenBase(stream, state) {\n  if (stream.eatSpace()) return null;\n\n  var sol = stream.sol();\n  var ch = stream.next();\n\n  if (ch === \'\\\\\') {\n    stream.next();\n    return null;\n  }\n  if (ch === \'\\\'\' || ch === \'"\' || ch === \'`\') {\n    state.tokens.unshift(tokenString(ch, ch === "`" ? "quote" : "string"));\n    return tokenize(stream, state);\n  }\n  if (ch === \'#\') {\n    if (sol && stream.eat(\'!\')) {\n      stream.skipToEnd();\n      return \'meta\'; // \'comment\'?\n    }\n    stream.skipToEnd();\n    return \'comment\';\n  }\n  if (ch === \'$\') {\n    state.tokens.unshift(tokenDollar);\n    return tokenize(stream, state);\n  }\n  if (ch === \'+\' || ch === \'=\') {\n    return \'operator\';\n  }\n  if (ch === \'-\') {\n    stream.eat(\'-\');\n    stream.eatWhile(/\\w/);\n    return \'attribute\';\n  }\n  if (ch == "<") {\n    if (stream.match("<<")) return "operator"\n    var heredoc = stream.match(/^<-?\\s*[\'"]?([^\'"]*)[\'"]?/)\n    if (heredoc) {\n      state.tokens.unshift(tokenHeredoc(heredoc[1]))\n      return \'string.special\'\n    }\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/\\d/);\n    if(stream.eol() || !/\\w/.test(stream.peek())) {\n      return \'number\';\n    }\n  }\n  stream.eatWhile(/[\\w-]/);\n  var cur = stream.current();\n  if (stream.peek() === \'=\' && /\\w+/.test(cur)) return \'def\';\n  return words.hasOwnProperty(cur) ? words[cur] : null;\n}\n\nfunction tokenString(quote, style) {\n  var close = quote == "(" ? ")" : quote == "{" ? "}" : quote\n  return function(stream, state) {\n    var next, escaped = false;\n    while ((next = stream.next()) != null) {\n      if (next === close && !escaped) {\n        state.tokens.shift();\n        break;\n      } else if (next === \'$\' && !escaped && quote !== "\'" && stream.peek() != close) {\n        escaped = true;\n        stream.backUp(1);\n        state.tokens.unshift(tokenDollar);\n        break;\n      } else if (!escaped && quote !== close && next === quote) {\n        state.tokens.unshift(tokenString(quote, style))\n        return tokenize(stream, state)\n      } else if (!escaped && /[\'"]/.test(next) && !/[\'"]/.test(quote)) {\n        state.tokens.unshift(tokenStringStart(next, "string"));\n        stream.backUp(1);\n        break;\n      }\n      escaped = !escaped && next === \'\\\\\';\n    }\n    return style;\n  };\n};\n\nfunction tokenStringStart(quote, style) {\n  return function(stream, state) {\n    state.tokens[0] = tokenString(quote, style)\n    stream.next()\n    return tokenize(stream, state)\n  }\n}\n\nvar tokenDollar = function(stream, state) {\n  if (state.tokens.length > 1) stream.eat(\'$\');\n  var ch = stream.next()\n  if (/[\'"({]/.test(ch)) {\n    state.tokens[0] = tokenString(ch, ch == "(" ? "quote" : ch == "{" ? "def" : "string");\n    return tokenize(stream, state);\n  }\n  if (!/\\d/.test(ch)) stream.eatWhile(/\\w/);\n  state.tokens.shift();\n  return \'def\';\n};\n\nfunction tokenHeredoc(delim) {\n  return function(stream, state) {\n    if (stream.sol() && stream.string == delim) state.tokens.shift()\n    stream.skipToEnd()\n    return "string.special"\n  }\n}\n\nfunction tokenize(stream, state) {\n  return (state.tokens[0] || tokenBase) (stream, state);\n};\n\nconst shell = {\n  startState: function() {return {tokens:[]};},\n  token: function(stream, state) {\n    return tokenize(stream, state);\n  },\n  languageData: {\n    autocomplete: commonAtoms.concat(commonKeywords, commonCommands),\n    closeBrackets: {brackets: ["(", "[", "{", "\'", \'"\', "`"]},\n    commentTokens: {line: "#"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvc2hlbGwuanM/YWU1OSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxNQUFNO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCwwQkFBMEIsUUFBUSxZQUFZO0FBQzlDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUIsa0JBQWtCO0FBQzdELG9CQUFvQjtBQUNwQjtBQUNBIiwiZmlsZSI6IjQxOS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB3b3JkcyA9IHt9O1xuZnVuY3Rpb24gZGVmaW5lKHN0eWxlLCBkaWN0KSB7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBkaWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgd29yZHNbZGljdFtpXV0gPSBzdHlsZTtcbiAgfVxufTtcblxudmFyIGNvbW1vbkF0b21zID0gW1widHJ1ZVwiLCBcImZhbHNlXCJdO1xudmFyIGNvbW1vbktleXdvcmRzID0gW1wiaWZcIiwgXCJ0aGVuXCIsIFwiZG9cIiwgXCJlbHNlXCIsIFwiZWxpZlwiLCBcIndoaWxlXCIsIFwidW50aWxcIiwgXCJmb3JcIiwgXCJpblwiLCBcImVzYWNcIiwgXCJmaVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiZmluXCIsIFwiZmlsXCIsIFwiZG9uZVwiLCBcImV4aXRcIiwgXCJzZXRcIiwgXCJ1bnNldFwiLCBcImV4cG9ydFwiLCBcImZ1bmN0aW9uXCJdO1xudmFyIGNvbW1vbkNvbW1hbmRzID0gW1wiYWJcIiwgXCJhd2tcIiwgXCJiYXNoXCIsIFwiYmVlcFwiLCBcImNhdFwiLCBcImNjXCIsIFwiY2RcIiwgXCJjaG93blwiLCBcImNobW9kXCIsIFwiY2hyb290XCIsIFwiY2xlYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImNwXCIsIFwiY3VybFwiLCBcImN1dFwiLCBcImRpZmZcIiwgXCJlY2hvXCIsIFwiZmluZFwiLCBcImdhd2tcIiwgXCJnY2NcIiwgXCJnZXRcIiwgXCJnaXRcIiwgXCJncmVwXCIsIFwiaGdcIiwgXCJraWxsXCIsIFwia2lsbGFsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwibG5cIiwgXCJsc1wiLCBcIm1ha2VcIiwgXCJta2RpclwiLCBcIm9wZW5zc2xcIiwgXCJtdlwiLCBcIm5jXCIsIFwibmxcIiwgXCJub2RlXCIsIFwibnBtXCIsIFwicGluZ1wiLCBcInBzXCIsIFwicmVzdGFydFwiLCBcInJtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJybWRpclwiLCBcInNlZFwiLCBcInNlcnZpY2VcIiwgXCJzaFwiLCBcInNob3B0XCIsIFwic2hyZWRcIiwgXCJzb3VyY2VcIiwgXCJzb3J0XCIsIFwic2xlZXBcIiwgXCJzc2hcIiwgXCJzdGFydFwiLCBcInN0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInN1XCIsIFwic3Vkb1wiLCBcInN2blwiLCBcInRlZVwiLCBcInRlbG5ldFwiLCBcInRvcFwiLCBcInRvdWNoXCIsIFwidmlcIiwgXCJ2aW1cIiwgXCJ3YWxsXCIsIFwid2NcIiwgXCJ3Z2V0XCIsIFwid2hvXCIsIFwid3JpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcInllc1wiLCBcInpzaFwiXTtcblxuZGVmaW5lKCdhdG9tJywgY29tbW9uQXRvbXMpO1xuZGVmaW5lKCdrZXl3b3JkJywgY29tbW9uS2V5d29yZHMpO1xuZGVmaW5lKCdidWlsdGluJywgY29tbW9uQ29tbWFuZHMpO1xuXG5mdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHJldHVybiBudWxsO1xuXG4gIHZhciBzb2wgPSBzdHJlYW0uc29sKCk7XG4gIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG5cbiAgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICBzdHJlYW0ubmV4dCgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChjaCA9PT0gJ1xcJycgfHwgY2ggPT09ICdcIicgfHwgY2ggPT09ICdgJykge1xuICAgIHN0YXRlLnRva2Vucy51bnNoaWZ0KHRva2VuU3RyaW5nKGNoLCBjaCA9PT0gXCJgXCIgPyBcInF1b3RlXCIgOiBcInN0cmluZ1wiKSk7XG4gICAgcmV0dXJuIHRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmIChjaCA9PT0gJyMnKSB7XG4gICAgaWYgKHNvbCAmJiBzdHJlYW0uZWF0KCchJykpIHtcbiAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICAgIHJldHVybiAnbWV0YSc7IC8vICdjb21tZW50Jz9cbiAgICB9XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiAnY29tbWVudCc7XG4gIH1cbiAgaWYgKGNoID09PSAnJCcpIHtcbiAgICBzdGF0ZS50b2tlbnMudW5zaGlmdCh0b2tlbkRvbGxhcik7XG4gICAgcmV0dXJuIHRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGlmIChjaCA9PT0gJysnIHx8IGNoID09PSAnPScpIHtcbiAgICByZXR1cm4gJ29wZXJhdG9yJztcbiAgfVxuICBpZiAoY2ggPT09ICctJykge1xuICAgIHN0cmVhbS5lYXQoJy0nKTtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1xcdy8pO1xuICAgIHJldHVybiAnYXR0cmlidXRlJztcbiAgfVxuICBpZiAoY2ggPT0gXCI8XCIpIHtcbiAgICBpZiAoc3RyZWFtLm1hdGNoKFwiPDxcIikpIHJldHVybiBcIm9wZXJhdG9yXCJcbiAgICB2YXIgaGVyZWRvYyA9IHN0cmVhbS5tYXRjaCgvXjwtP1xccypbJ1wiXT8oW14nXCJdKilbJ1wiXT8vKVxuICAgIGlmIChoZXJlZG9jKSB7XG4gICAgICBzdGF0ZS50b2tlbnMudW5zaGlmdCh0b2tlbkhlcmVkb2MoaGVyZWRvY1sxXSkpXG4gICAgICByZXR1cm4gJ3N0cmluZy5zcGVjaWFsJ1xuICAgIH1cbiAgfVxuICBpZiAoL1xcZC8udGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1xcZC8pO1xuICAgIGlmKHN0cmVhbS5lb2woKSB8fCAhL1xcdy8udGVzdChzdHJlYW0ucGVlaygpKSkge1xuICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgIH1cbiAgfVxuICBzdHJlYW0uZWF0V2hpbGUoL1tcXHctXS8pO1xuICB2YXIgY3VyID0gc3RyZWFtLmN1cnJlbnQoKTtcbiAgaWYgKHN0cmVhbS5wZWVrKCkgPT09ICc9JyAmJiAvXFx3Ky8udGVzdChjdXIpKSByZXR1cm4gJ2RlZic7XG4gIHJldHVybiB3b3Jkcy5oYXNPd25Qcm9wZXJ0eShjdXIpID8gd29yZHNbY3VyXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHRva2VuU3RyaW5nKHF1b3RlLCBzdHlsZSkge1xuICB2YXIgY2xvc2UgPSBxdW90ZSA9PSBcIihcIiA/IFwiKVwiIDogcXVvdGUgPT0gXCJ7XCIgPyBcIn1cIiA6IHF1b3RlXG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIG5leHQsIGVzY2FwZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAobmV4dCA9PT0gY2xvc2UgJiYgIWVzY2FwZWQpIHtcbiAgICAgICAgc3RhdGUudG9rZW5zLnNoaWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChuZXh0ID09PSAnJCcgJiYgIWVzY2FwZWQgJiYgcXVvdGUgIT09IFwiJ1wiICYmIHN0cmVhbS5wZWVrKCkgIT0gY2xvc2UpIHtcbiAgICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICAgIHN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgIHN0YXRlLnRva2Vucy51bnNoaWZ0KHRva2VuRG9sbGFyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKCFlc2NhcGVkICYmIHF1b3RlICE9PSBjbG9zZSAmJiBuZXh0ID09PSBxdW90ZSkge1xuICAgICAgICBzdGF0ZS50b2tlbnMudW5zaGlmdCh0b2tlblN0cmluZyhxdW90ZSwgc3R5bGUpKVxuICAgICAgICByZXR1cm4gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSlcbiAgICAgIH0gZWxzZSBpZiAoIWVzY2FwZWQgJiYgL1snXCJdLy50ZXN0KG5leHQpICYmICEvWydcIl0vLnRlc3QocXVvdGUpKSB7XG4gICAgICAgIHN0YXRlLnRva2Vucy51bnNoaWZ0KHRva2VuU3RyaW5nU3RhcnQobmV4dCwgXCJzdHJpbmdcIikpO1xuICAgICAgICBzdHJlYW0uYmFja1VwKDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09PSAnXFxcXCc7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZTtcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHRva2VuU3RyaW5nU3RhcnQocXVvdGUsIHN0eWxlKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgc3RhdGUudG9rZW5zWzBdID0gdG9rZW5TdHJpbmcocXVvdGUsIHN0eWxlKVxuICAgIHN0cmVhbS5uZXh0KClcbiAgICByZXR1cm4gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSlcbiAgfVxufVxuXG52YXIgdG9rZW5Eb2xsYXIgPSBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdGF0ZS50b2tlbnMubGVuZ3RoID4gMSkgc3RyZWFtLmVhdCgnJCcpO1xuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpXG4gIGlmICgvWydcIih7XS8udGVzdChjaCkpIHtcbiAgICBzdGF0ZS50b2tlbnNbMF0gPSB0b2tlblN0cmluZyhjaCwgY2ggPT0gXCIoXCIgPyBcInF1b3RlXCIgOiBjaCA9PSBcIntcIiA/IFwiZGVmXCIgOiBcInN0cmluZ1wiKTtcbiAgICByZXR1cm4gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgaWYgKCEvXFxkLy50ZXN0KGNoKSkgc3RyZWFtLmVhdFdoaWxlKC9cXHcvKTtcbiAgc3RhdGUudG9rZW5zLnNoaWZ0KCk7XG4gIHJldHVybiAnZGVmJztcbn07XG5cbmZ1bmN0aW9uIHRva2VuSGVyZWRvYyhkZWxpbSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChzdHJlYW0uc29sKCkgJiYgc3RyZWFtLnN0cmluZyA9PSBkZWxpbSkgc3RhdGUudG9rZW5zLnNoaWZ0KClcbiAgICBzdHJlYW0uc2tpcFRvRW5kKClcbiAgICByZXR1cm4gXCJzdHJpbmcuc3BlY2lhbFwiXG4gIH1cbn1cblxuZnVuY3Rpb24gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSkge1xuICByZXR1cm4gKHN0YXRlLnRva2Vuc1swXSB8fCB0b2tlbkJhc2UpIChzdHJlYW0sIHN0YXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaGVsbCA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7cmV0dXJuIHt0b2tlbnM6W119O30sXG4gIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgcmV0dXJuIHRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9LFxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBhdXRvY29tcGxldGU6IGNvbW1vbkF0b21zLmNvbmNhdChjb21tb25LZXl3b3JkcywgY29tbW9uQ29tbWFuZHMpLFxuICAgIGNsb3NlQnJhY2tldHM6IHticmFja2V0czogW1wiKFwiLCBcIltcIiwgXCJ7XCIsIFwiJ1wiLCAnXCInLCBcImBcIl19LFxuICAgIGNvbW1lbnRUb2tlbnM6IHtsaW5lOiBcIiNcIn1cbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///419\n')}}]);