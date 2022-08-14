(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{444:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"yaml\", function() { return yaml; });\nvar cons = ['true', 'false', 'on', 'off', 'yes', 'no'];\nvar keywordRegex = new RegExp(\"\\\\b((\"+cons.join(\")|(\")+\"))$\", 'i');\n\nconst yaml = {\n  token: function(stream, state) {\n    var ch = stream.peek();\n    var esc = state.escaped;\n    state.escaped = false;\n    /* comments */\n    if (ch == \"#\" && (stream.pos == 0 || /\\s/.test(stream.string.charAt(stream.pos - 1)))) {\n      stream.skipToEnd();\n      return \"comment\";\n    }\n\n    if (stream.match(/^('([^']|\\\\.)*'?|\"([^\"]|\\\\.)*\"?)/))\n      return \"string\";\n\n    if (state.literal && stream.indentation() > state.keyCol) {\n      stream.skipToEnd(); return \"string\";\n    } else if (state.literal) { state.literal = false; }\n    if (stream.sol()) {\n      state.keyCol = 0;\n      state.pair = false;\n      state.pairStart = false;\n      /* document start */\n      if(stream.match('---')) { return \"def\"; }\n      /* document end */\n      if (stream.match('...')) { return \"def\"; }\n      /* array list item */\n      if (stream.match(/^\\s*-\\s+/)) { return 'meta'; }\n    }\n    /* inline pairs/lists */\n    if (stream.match(/^(\\{|\\}|\\[|\\])/)) {\n      if (ch == '{')\n        state.inlinePairs++;\n      else if (ch == '}')\n        state.inlinePairs--;\n      else if (ch == '[')\n        state.inlineList++;\n      else\n        state.inlineList--;\n      return 'meta';\n    }\n\n    /* list separator */\n    if (state.inlineList > 0 && !esc && ch == ',') {\n      stream.next();\n      return 'meta';\n    }\n    /* pairs separator */\n    if (state.inlinePairs > 0 && !esc && ch == ',') {\n      state.keyCol = 0;\n      state.pair = false;\n      state.pairStart = false;\n      stream.next();\n      return 'meta';\n    }\n\n    /* start of value of a pair */\n    if (state.pairStart) {\n      /* block literals */\n      if (stream.match(/^\\s*(\\||\\>)\\s*/)) { state.literal = true; return 'meta'; };\n      /* references */\n      if (stream.match(/^\\s*(\\&|\\*)[a-z0-9\\._-]+\\b/i)) { return 'variable'; }\n      /* numbers */\n      if (state.inlinePairs == 0 && stream.match(/^\\s*-?[0-9\\.\\,]+\\s?$/)) { return 'number'; }\n      if (state.inlinePairs > 0 && stream.match(/^\\s*-?[0-9\\.\\,]+\\s?(?=(,|}))/)) { return 'number'; }\n      /* keywords */\n      if (stream.match(keywordRegex)) { return 'keyword'; }\n    }\n\n    /* pairs (associative arrays) -> key */\n    if (!state.pair && stream.match(/^\\s*(?:[,\\[\\]{}&*!|>'\"%@`][^\\s'\":]|[^,\\[\\]{}#&*!|>'\"%@`])[^#]*?(?=\\s*:($|\\s))/)) {\n      state.pair = true;\n      state.keyCol = stream.indentation();\n      return \"atom\";\n    }\n    if (state.pair && stream.match(/^:\\s*/)) { state.pairStart = true; return 'meta'; }\n\n    /* nothing found, continue */\n    state.pairStart = false;\n    state.escaped = (ch == '\\\\');\n    stream.next();\n    return null;\n  },\n  startState: function() {\n    return {\n      pair: false,\n      pairStart: false,\n      keyCol: 0,\n      inlinePairs: 0,\n      inlineList: 0,\n      literal: false,\n      escaped: false\n    };\n  },\n  languageData: {\n    commentTokens: {line: \"#\"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUveWFtbC5qcz85YmQ3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekIsS0FBSywwQkFBMEIsdUJBQXVCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsY0FBYztBQUM3QztBQUNBLGdDQUFnQyxjQUFjO0FBQzlDO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBLDBCQUEwQixHQUFHO0FBQzdCLGtCQUFrQjtBQUNsQjtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsc0JBQXNCLGVBQWU7QUFDaEY7QUFDQSx3REFBd0QsbUJBQW1CO0FBQzNFO0FBQ0EsMkVBQTJFLGlCQUFpQjtBQUM1RiwyRUFBMkUsT0FBTyxpQkFBaUI7QUFDbkc7QUFDQSx1Q0FBdUMsa0JBQWtCO0FBQ3pEOztBQUVBO0FBQ0Esb0RBQW9ELDZCQUE2QjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx3QkFBd0IsZUFBZTs7QUFFckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBIiwiZmlsZSI6IjQ0NC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb25zID0gWyd0cnVlJywgJ2ZhbHNlJywgJ29uJywgJ29mZicsICd5ZXMnLCAnbm8nXTtcbnZhciBrZXl3b3JkUmVnZXggPSBuZXcgUmVnRXhwKFwiXFxcXGIoKFwiK2NvbnMuam9pbihcIil8KFwiKStcIikpJFwiLCAnaScpO1xuXG5leHBvcnQgY29uc3QgeWFtbCA9IHtcbiAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgY2ggPSBzdHJlYW0ucGVlaygpO1xuICAgIHZhciBlc2MgPSBzdGF0ZS5lc2NhcGVkO1xuICAgIHN0YXRlLmVzY2FwZWQgPSBmYWxzZTtcbiAgICAvKiBjb21tZW50cyAqL1xuICAgIGlmIChjaCA9PSBcIiNcIiAmJiAoc3RyZWFtLnBvcyA9PSAwIHx8IC9cXHMvLnRlc3Qoc3RyZWFtLnN0cmluZy5jaGFyQXQoc3RyZWFtLnBvcyAtIDEpKSkpIHtcbiAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtLm1hdGNoKC9eKCcoW14nXXxcXFxcLikqJz98XCIoW15cIl18XFxcXC4pKlwiPykvKSlcbiAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuXG4gICAgaWYgKHN0YXRlLmxpdGVyYWwgJiYgc3RyZWFtLmluZGVudGF0aW9uKCkgPiBzdGF0ZS5rZXlDb2wpIHtcbiAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTsgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5saXRlcmFsKSB7IHN0YXRlLmxpdGVyYWwgPSBmYWxzZTsgfVxuICAgIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAgIHN0YXRlLmtleUNvbCA9IDA7XG4gICAgICBzdGF0ZS5wYWlyID0gZmFsc2U7XG4gICAgICBzdGF0ZS5wYWlyU3RhcnQgPSBmYWxzZTtcbiAgICAgIC8qIGRvY3VtZW50IHN0YXJ0ICovXG4gICAgICBpZihzdHJlYW0ubWF0Y2goJy0tLScpKSB7IHJldHVybiBcImRlZlwiOyB9XG4gICAgICAvKiBkb2N1bWVudCBlbmQgKi9cbiAgICAgIGlmIChzdHJlYW0ubWF0Y2goJy4uLicpKSB7IHJldHVybiBcImRlZlwiOyB9XG4gICAgICAvKiBhcnJheSBsaXN0IGl0ZW0gKi9cbiAgICAgIGlmIChzdHJlYW0ubWF0Y2goL15cXHMqLVxccysvKSkgeyByZXR1cm4gJ21ldGEnOyB9XG4gICAgfVxuICAgIC8qIGlubGluZSBwYWlycy9saXN0cyAqL1xuICAgIGlmIChzdHJlYW0ubWF0Y2goL14oXFx7fFxcfXxcXFt8XFxdKS8pKSB7XG4gICAgICBpZiAoY2ggPT0gJ3snKVxuICAgICAgICBzdGF0ZS5pbmxpbmVQYWlycysrO1xuICAgICAgZWxzZSBpZiAoY2ggPT0gJ30nKVxuICAgICAgICBzdGF0ZS5pbmxpbmVQYWlycy0tO1xuICAgICAgZWxzZSBpZiAoY2ggPT0gJ1snKVxuICAgICAgICBzdGF0ZS5pbmxpbmVMaXN0Kys7XG4gICAgICBlbHNlXG4gICAgICAgIHN0YXRlLmlubGluZUxpc3QtLTtcbiAgICAgIHJldHVybiAnbWV0YSc7XG4gICAgfVxuXG4gICAgLyogbGlzdCBzZXBhcmF0b3IgKi9cbiAgICBpZiAoc3RhdGUuaW5saW5lTGlzdCA+IDAgJiYgIWVzYyAmJiBjaCA9PSAnLCcpIHtcbiAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICByZXR1cm4gJ21ldGEnO1xuICAgIH1cbiAgICAvKiBwYWlycyBzZXBhcmF0b3IgKi9cbiAgICBpZiAoc3RhdGUuaW5saW5lUGFpcnMgPiAwICYmICFlc2MgJiYgY2ggPT0gJywnKSB7XG4gICAgICBzdGF0ZS5rZXlDb2wgPSAwO1xuICAgICAgc3RhdGUucGFpciA9IGZhbHNlO1xuICAgICAgc3RhdGUucGFpclN0YXJ0ID0gZmFsc2U7XG4gICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgcmV0dXJuICdtZXRhJztcbiAgICB9XG5cbiAgICAvKiBzdGFydCBvZiB2YWx1ZSBvZiBhIHBhaXIgKi9cbiAgICBpZiAoc3RhdGUucGFpclN0YXJ0KSB7XG4gICAgICAvKiBibG9jayBsaXRlcmFscyAqL1xuICAgICAgaWYgKHN0cmVhbS5tYXRjaCgvXlxccyooXFx8fFxcPilcXHMqLykpIHsgc3RhdGUubGl0ZXJhbCA9IHRydWU7IHJldHVybiAnbWV0YSc7IH07XG4gICAgICAvKiByZWZlcmVuY2VzICovXG4gICAgICBpZiAoc3RyZWFtLm1hdGNoKC9eXFxzKihcXCZ8XFwqKVthLXowLTlcXC5fLV0rXFxiL2kpKSB7IHJldHVybiAndmFyaWFibGUnOyB9XG4gICAgICAvKiBudW1iZXJzICovXG4gICAgICBpZiAoc3RhdGUuaW5saW5lUGFpcnMgPT0gMCAmJiBzdHJlYW0ubWF0Y2goL15cXHMqLT9bMC05XFwuXFwsXStcXHM/JC8pKSB7IHJldHVybiAnbnVtYmVyJzsgfVxuICAgICAgaWYgKHN0YXRlLmlubGluZVBhaXJzID4gMCAmJiBzdHJlYW0ubWF0Y2goL15cXHMqLT9bMC05XFwuXFwsXStcXHM/KD89KCx8fSkpLykpIHsgcmV0dXJuICdudW1iZXInOyB9XG4gICAgICAvKiBrZXl3b3JkcyAqL1xuICAgICAgaWYgKHN0cmVhbS5tYXRjaChrZXl3b3JkUmVnZXgpKSB7IHJldHVybiAna2V5d29yZCc7IH1cbiAgICB9XG5cbiAgICAvKiBwYWlycyAoYXNzb2NpYXRpdmUgYXJyYXlzKSAtPiBrZXkgKi9cbiAgICBpZiAoIXN0YXRlLnBhaXIgJiYgc3RyZWFtLm1hdGNoKC9eXFxzKig/OlssXFxbXFxde30mKiF8PidcIiVAYF1bXlxccydcIjpdfFteLFxcW1xcXXt9IyYqIXw+J1wiJUBgXSlbXiNdKj8oPz1cXHMqOigkfFxccykpLykpIHtcbiAgICAgIHN0YXRlLnBhaXIgPSB0cnVlO1xuICAgICAgc3RhdGUua2V5Q29sID0gc3RyZWFtLmluZGVudGF0aW9uKCk7XG4gICAgICByZXR1cm4gXCJhdG9tXCI7XG4gICAgfVxuICAgIGlmIChzdGF0ZS5wYWlyICYmIHN0cmVhbS5tYXRjaCgvXjpcXHMqLykpIHsgc3RhdGUucGFpclN0YXJ0ID0gdHJ1ZTsgcmV0dXJuICdtZXRhJzsgfVxuXG4gICAgLyogbm90aGluZyBmb3VuZCwgY29udGludWUgKi9cbiAgICBzdGF0ZS5wYWlyU3RhcnQgPSBmYWxzZTtcbiAgICBzdGF0ZS5lc2NhcGVkID0gKGNoID09ICdcXFxcJyk7XG4gICAgc3RyZWFtLm5leHQoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhaXI6IGZhbHNlLFxuICAgICAgcGFpclN0YXJ0OiBmYWxzZSxcbiAgICAgIGtleUNvbDogMCxcbiAgICAgIGlubGluZVBhaXJzOiAwLFxuICAgICAgaW5saW5lTGlzdDogMCxcbiAgICAgIGxpdGVyYWw6IGZhbHNlLFxuICAgICAgZXNjYXBlZDogZmFsc2VcbiAgICB9O1xuICB9LFxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCIjXCJ9XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///444\n")}}]);