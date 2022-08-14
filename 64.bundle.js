(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[64],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/oz.js":
/*!**********************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/oz.js ***!
  \**********************************************************/
/*! exports provided: oz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"oz\", function() { return oz; });\nfunction wordRegexp(words) {\n  return new RegExp(\"^((\" + words.join(\")|(\") + \"))\\\\b\");\n}\n\nvar singleOperators = /[\\^@!\\|<>#~\\.\\*\\-\\+\\\\/,=]/;\nvar doubleOperators = /(<-)|(:=)|(=<)|(>=)|(<=)|(<:)|(>:)|(=:)|(\\\\=)|(\\\\=:)|(!!)|(==)|(::)/;\nvar tripleOperators = /(:::)|(\\.\\.\\.)|(=<:)|(>=:)/;\n\nvar middle = [\"in\", \"then\", \"else\", \"of\", \"elseof\", \"elsecase\", \"elseif\", \"catch\",\n              \"finally\", \"with\", \"require\", \"prepare\", \"import\", \"export\", \"define\", \"do\"];\nvar end = [\"end\"];\n\nvar atoms = wordRegexp([\"true\", \"false\", \"nil\", \"unit\"]);\nvar commonKeywords = wordRegexp([\"andthen\", \"at\", \"attr\", \"declare\", \"feat\", \"from\", \"lex\",\n                                 \"mod\", \"div\", \"mode\", \"orelse\", \"parser\", \"prod\", \"prop\", \"scanner\", \"self\", \"syn\", \"token\"]);\nvar openingKeywords = wordRegexp([\"local\", \"proc\", \"fun\", \"case\", \"class\", \"if\", \"cond\", \"or\", \"dis\",\n                                  \"choice\", \"not\", \"thread\", \"try\", \"raise\", \"lock\", \"for\", \"suchthat\", \"meth\", \"functor\"]);\nvar middleKeywords = wordRegexp(middle);\nvar endKeywords = wordRegexp(end);\n\n// Tokenizers\nfunction tokenBase(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  // Brackets\n  if(stream.match(/[{}]/)) {\n    return \"bracket\";\n  }\n\n  // Special [] keyword\n  if (stream.match('[]')) {\n    return \"keyword\"\n  }\n\n  // Operators\n  if (stream.match(tripleOperators) || stream.match(doubleOperators)) {\n    return \"operator\";\n  }\n\n  // Atoms\n  if(stream.match(atoms)) {\n    return 'atom';\n  }\n\n  // Opening keywords\n  var matched = stream.match(openingKeywords);\n  if (matched) {\n    if (!state.doInCurrentLine)\n      state.currentIndent++;\n    else\n      state.doInCurrentLine = false;\n\n    // Special matching for signatures\n    if(matched[0] == \"proc\" || matched[0] == \"fun\")\n      state.tokenize = tokenFunProc;\n    else if(matched[0] == \"class\")\n      state.tokenize = tokenClass;\n    else if(matched[0] == \"meth\")\n      state.tokenize = tokenMeth;\n\n    return 'keyword';\n  }\n\n  // Middle and other keywords\n  if (stream.match(middleKeywords) || stream.match(commonKeywords)) {\n    return \"keyword\"\n  }\n\n  // End keywords\n  if (stream.match(endKeywords)) {\n    state.currentIndent--;\n    return 'keyword';\n  }\n\n  // Eat the next char for next comparisons\n  var ch = stream.next();\n\n  // Strings\n  if (ch == '\"' || ch == \"'\") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n\n  // Numbers\n  if (/[~\\d]/.test(ch)) {\n    if (ch == \"~\") {\n      if(! /^[0-9]/.test(stream.peek()))\n        return null;\n      else if (( stream.next() == \"0\" && stream.match(/^[xX][0-9a-fA-F]+/)) || stream.match(/^[0-9]*(\\.[0-9]+)?([eE][~+]?[0-9]+)?/))\n        return \"number\";\n    }\n\n    if ((ch == \"0\" && stream.match(/^[xX][0-9a-fA-F]+/)) || stream.match(/^[0-9]*(\\.[0-9]+)?([eE][~+]?[0-9]+)?/))\n      return \"number\";\n\n    return null;\n  }\n\n  // Comments\n  if (ch == \"%\") {\n    stream.skipToEnd();\n    return 'comment';\n  }\n  else if (ch == \"/\") {\n    if (stream.eat(\"*\")) {\n      state.tokenize = tokenComment;\n      return tokenComment(stream, state);\n    }\n  }\n\n  // Single operators\n  if(singleOperators.test(ch)) {\n    return \"operator\";\n  }\n\n  // If nothing match, we skip the entire alphanumerical block\n  stream.eatWhile(/\\w/);\n\n  return \"variable\";\n}\n\nfunction tokenClass(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n  stream.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)/);\n  state.tokenize = tokenBase;\n  return \"type\"\n}\n\nfunction tokenMeth(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n  stream.match(/([a-zA-Z][A-Za-z0-9_]*)|(`.+`)/);\n  state.tokenize = tokenBase;\n  return \"def\"\n}\n\nfunction tokenFunProc(stream, state) {\n  if (stream.eatSpace()) {\n    return null;\n  }\n\n  if(!state.hasPassedFirstStage && stream.eat(\"{\")) {\n    state.hasPassedFirstStage = true;\n    return \"bracket\";\n  }\n  else if(state.hasPassedFirstStage) {\n    stream.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)|\\$/);\n    state.hasPassedFirstStage = false;\n    state.tokenize = tokenBase;\n    return \"def\"\n  }\n  else {\n    state.tokenize = tokenBase;\n    return null;\n  }\n}\n\nfunction tokenComment(stream, state) {\n  var maybeEnd = false, ch;\n  while (ch = stream.next()) {\n    if (ch == \"/\" && maybeEnd) {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == \"*\");\n  }\n  return \"comment\";\n}\n\nfunction tokenString(quote) {\n  return function (stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped) {\n        end = true;\n        break;\n      }\n      escaped = !escaped && next == \"\\\\\";\n    }\n    if (end || !escaped)\n      state.tokenize = tokenBase;\n    return \"string\";\n  };\n}\n\nfunction buildElectricInputRegEx() {\n  // Reindentation should occur on [] or on a match of any of\n  // the block closing keywords, at the end of a line.\n  var allClosings = middle.concat(end);\n  return new RegExp(\"[\\\\[\\\\]]|(\" + allClosings.join(\"|\") + \")$\");\n}\n\nconst oz = {\n\n  startState: function () {\n    return {\n      tokenize: tokenBase,\n      currentIndent: 0,\n      doInCurrentLine: false,\n      hasPassedFirstStage: false\n    };\n  },\n\n  token: function (stream, state) {\n    if (stream.sol())\n      state.doInCurrentLine = 0;\n\n    return state.tokenize(stream, state);\n  },\n\n  indent: function (state, textAfter, cx) {\n    var trueText = textAfter.replace(/^\\s+|\\s+$/g, '');\n\n    if (trueText.match(endKeywords) || trueText.match(middleKeywords) || trueText.match(/(\\[])/))\n      return cx.unit * (state.currentIndent - 1);\n\n    if (state.currentIndent < 0)\n      return 0;\n\n    return state.currentIndent * cx.unit\n  },\n\n  languageData: {\n    indentOnInut: buildElectricInputRegEx(),\n    commentTokens: {line: \"%\", block: {open: \"/*\", close: \"*/\"}}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvb3ouanM/OWM1OCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AY29kZW1pcnJvci9sZWdhY3ktbW9kZXMvbW9kZS9vei5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRSZWdleHAod29yZHMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKChcIiArIHdvcmRzLmpvaW4oXCIpfChcIikgKyBcIikpXFxcXGJcIik7XG59XG5cbnZhciBzaW5nbGVPcGVyYXRvcnMgPSAvW1xcXkAhXFx8PD4jflxcLlxcKlxcLVxcK1xcXFwvLD1dLztcbnZhciBkb3VibGVPcGVyYXRvcnMgPSAvKDwtKXwoOj0pfCg9PCl8KD49KXwoPD0pfCg8Oil8KD46KXwoPTopfChcXFxcPSl8KFxcXFw9Oil8KCEhKXwoPT0pfCg6OikvO1xudmFyIHRyaXBsZU9wZXJhdG9ycyA9IC8oOjo6KXwoXFwuXFwuXFwuKXwoPTw6KXwoPj06KS87XG5cbnZhciBtaWRkbGUgPSBbXCJpblwiLCBcInRoZW5cIiwgXCJlbHNlXCIsIFwib2ZcIiwgXCJlbHNlb2ZcIiwgXCJlbHNlY2FzZVwiLCBcImVsc2VpZlwiLCBcImNhdGNoXCIsXG4gICAgICAgICAgICAgIFwiZmluYWxseVwiLCBcIndpdGhcIiwgXCJyZXF1aXJlXCIsIFwicHJlcGFyZVwiLCBcImltcG9ydFwiLCBcImV4cG9ydFwiLCBcImRlZmluZVwiLCBcImRvXCJdO1xudmFyIGVuZCA9IFtcImVuZFwiXTtcblxudmFyIGF0b21zID0gd29yZFJlZ2V4cChbXCJ0cnVlXCIsIFwiZmFsc2VcIiwgXCJuaWxcIiwgXCJ1bml0XCJdKTtcbnZhciBjb21tb25LZXl3b3JkcyA9IHdvcmRSZWdleHAoW1wiYW5kdGhlblwiLCBcImF0XCIsIFwiYXR0clwiLCBcImRlY2xhcmVcIiwgXCJmZWF0XCIsIFwiZnJvbVwiLCBcImxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtb2RcIiwgXCJkaXZcIiwgXCJtb2RlXCIsIFwib3JlbHNlXCIsIFwicGFyc2VyXCIsIFwicHJvZFwiLCBcInByb3BcIiwgXCJzY2FubmVyXCIsIFwic2VsZlwiLCBcInN5blwiLCBcInRva2VuXCJdKTtcbnZhciBvcGVuaW5nS2V5d29yZHMgPSB3b3JkUmVnZXhwKFtcImxvY2FsXCIsIFwicHJvY1wiLCBcImZ1blwiLCBcImNhc2VcIiwgXCJjbGFzc1wiLCBcImlmXCIsIFwiY29uZFwiLCBcIm9yXCIsIFwiZGlzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaG9pY2VcIiwgXCJub3RcIiwgXCJ0aHJlYWRcIiwgXCJ0cnlcIiwgXCJyYWlzZVwiLCBcImxvY2tcIiwgXCJmb3JcIiwgXCJzdWNodGhhdFwiLCBcIm1ldGhcIiwgXCJmdW5jdG9yXCJdKTtcbnZhciBtaWRkbGVLZXl3b3JkcyA9IHdvcmRSZWdleHAobWlkZGxlKTtcbnZhciBlbmRLZXl3b3JkcyA9IHdvcmRSZWdleHAoZW5kKTtcblxuLy8gVG9rZW5pemVyc1xuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBCcmFja2V0c1xuICBpZihzdHJlYW0ubWF0Y2goL1t7fV0vKSkge1xuICAgIHJldHVybiBcImJyYWNrZXRcIjtcbiAgfVxuXG4gIC8vIFNwZWNpYWwgW10ga2V5d29yZFxuICBpZiAoc3RyZWFtLm1hdGNoKCdbXScpKSB7XG4gICAgcmV0dXJuIFwia2V5d29yZFwiXG4gIH1cblxuICAvLyBPcGVyYXRvcnNcbiAgaWYgKHN0cmVhbS5tYXRjaCh0cmlwbGVPcGVyYXRvcnMpIHx8IHN0cmVhbS5tYXRjaChkb3VibGVPcGVyYXRvcnMpKSB7XG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfVxuXG4gIC8vIEF0b21zXG4gIGlmKHN0cmVhbS5tYXRjaChhdG9tcykpIHtcbiAgICByZXR1cm4gJ2F0b20nO1xuICB9XG5cbiAgLy8gT3BlbmluZyBrZXl3b3Jkc1xuICB2YXIgbWF0Y2hlZCA9IHN0cmVhbS5tYXRjaChvcGVuaW5nS2V5d29yZHMpO1xuICBpZiAobWF0Y2hlZCkge1xuICAgIGlmICghc3RhdGUuZG9JbkN1cnJlbnRMaW5lKVxuICAgICAgc3RhdGUuY3VycmVudEluZGVudCsrO1xuICAgIGVsc2VcbiAgICAgIHN0YXRlLmRvSW5DdXJyZW50TGluZSA9IGZhbHNlO1xuXG4gICAgLy8gU3BlY2lhbCBtYXRjaGluZyBmb3Igc2lnbmF0dXJlc1xuICAgIGlmKG1hdGNoZWRbMF0gPT0gXCJwcm9jXCIgfHwgbWF0Y2hlZFswXSA9PSBcImZ1blwiKVxuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkZ1blByb2M7XG4gICAgZWxzZSBpZihtYXRjaGVkWzBdID09IFwiY2xhc3NcIilcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5DbGFzcztcbiAgICBlbHNlIGlmKG1hdGNoZWRbMF0gPT0gXCJtZXRoXCIpXG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuTWV0aDtcblxuICAgIHJldHVybiAna2V5d29yZCc7XG4gIH1cblxuICAvLyBNaWRkbGUgYW5kIG90aGVyIGtleXdvcmRzXG4gIGlmIChzdHJlYW0ubWF0Y2gobWlkZGxlS2V5d29yZHMpIHx8IHN0cmVhbS5tYXRjaChjb21tb25LZXl3b3JkcykpIHtcbiAgICByZXR1cm4gXCJrZXl3b3JkXCJcbiAgfVxuXG4gIC8vIEVuZCBrZXl3b3Jkc1xuICBpZiAoc3RyZWFtLm1hdGNoKGVuZEtleXdvcmRzKSkge1xuICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQtLTtcbiAgICByZXR1cm4gJ2tleXdvcmQnO1xuICB9XG5cbiAgLy8gRWF0IHRoZSBuZXh0IGNoYXIgZm9yIG5leHQgY29tcGFyaXNvbnNcbiAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcblxuICAvLyBTdHJpbmdzXG4gIGlmIChjaCA9PSAnXCInIHx8IGNoID09IFwiJ1wiKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZyhjaCk7XG4gICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoL1t+XFxkXS8udGVzdChjaCkpIHtcbiAgICBpZiAoY2ggPT0gXCJ+XCIpIHtcbiAgICAgIGlmKCEgL15bMC05XS8udGVzdChzdHJlYW0ucGVlaygpKSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBlbHNlIGlmICgoIHN0cmVhbS5uZXh0KCkgPT0gXCIwXCIgJiYgc3RyZWFtLm1hdGNoKC9eW3hYXVswLTlhLWZBLUZdKy8pKSB8fCBzdHJlYW0ubWF0Y2goL15bMC05XSooXFwuWzAtOV0rKT8oW2VFXVt+K10/WzAtOV0rKT8vKSlcbiAgICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgaWYgKChjaCA9PSBcIjBcIiAmJiBzdHJlYW0ubWF0Y2goL15beFhdWzAtOWEtZkEtRl0rLykpIHx8IHN0cmVhbS5tYXRjaCgvXlswLTldKihcXC5bMC05XSspPyhbZUVdW34rXT9bMC05XSspPy8pKVxuICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIENvbW1lbnRzXG4gIGlmIChjaCA9PSBcIiVcIikge1xuICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICByZXR1cm4gJ2NvbW1lbnQnO1xuICB9XG4gIGVsc2UgaWYgKGNoID09IFwiL1wiKSB7XG4gICAgaWYgKHN0cmVhbS5lYXQoXCIqXCIpKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQ29tbWVudDtcbiAgICAgIHJldHVybiB0b2tlbkNvbW1lbnQoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2luZ2xlIG9wZXJhdG9yc1xuICBpZihzaW5nbGVPcGVyYXRvcnMudGVzdChjaCkpIHtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9XG5cbiAgLy8gSWYgbm90aGluZyBtYXRjaCwgd2Ugc2tpcCB0aGUgZW50aXJlIGFscGhhbnVtZXJpY2FsIGJsb2NrXG4gIHN0cmVhbS5lYXRXaGlsZSgvXFx3Lyk7XG5cbiAgcmV0dXJuIFwidmFyaWFibGVcIjtcbn1cblxuZnVuY3Rpb24gdG9rZW5DbGFzcyhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN0cmVhbS5tYXRjaCgvKFtBLVpdW0EtWmEtejAtOV9dKil8KGAuK2ApLyk7XG4gIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICByZXR1cm4gXCJ0eXBlXCJcbn1cblxuZnVuY3Rpb24gdG9rZW5NZXRoKHN0cmVhbSwgc3RhdGUpIHtcbiAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3RyZWFtLm1hdGNoKC8oW2EtekEtWl1bQS1aYS16MC05X10qKXwoYC4rYCkvKTtcbiAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gIHJldHVybiBcImRlZlwiXG59XG5cbmZ1bmN0aW9uIHRva2VuRnVuUHJvYyhzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYoIXN0YXRlLmhhc1Bhc3NlZEZpcnN0U3RhZ2UgJiYgc3RyZWFtLmVhdChcIntcIikpIHtcbiAgICBzdGF0ZS5oYXNQYXNzZWRGaXJzdFN0YWdlID0gdHJ1ZTtcbiAgICByZXR1cm4gXCJicmFja2V0XCI7XG4gIH1cbiAgZWxzZSBpZihzdGF0ZS5oYXNQYXNzZWRGaXJzdFN0YWdlKSB7XG4gICAgc3RyZWFtLm1hdGNoKC8oW0EtWl1bQS1aYS16MC05X10qKXwoYC4rYCl8XFwkLyk7XG4gICAgc3RhdGUuaGFzUGFzc2VkRmlyc3RTdGFnZSA9IGZhbHNlO1xuICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgIHJldHVybiBcImRlZlwiXG4gIH1cbiAgZWxzZSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9rZW5Db21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIG1heWJlRW5kID0gZmFsc2UsIGNoO1xuICB3aGlsZSAoY2ggPSBzdHJlYW0ubmV4dCgpKSB7XG4gICAgaWYgKGNoID09IFwiL1wiICYmIG1heWJlRW5kKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBtYXliZUVuZCA9IChjaCA9PSBcIipcIik7XG4gIH1cbiAgcmV0dXJuIFwiY29tbWVudFwiO1xufVxuXG5mdW5jdGlvbiB0b2tlblN0cmluZyhxdW90ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBuZXh0LCBlbmQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAobmV4dCA9PSBxdW90ZSAmJiAhZXNjYXBlZCkge1xuICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgIH1cbiAgICBpZiAoZW5kIHx8ICFlc2NhcGVkKVxuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRWxlY3RyaWNJbnB1dFJlZ0V4KCkge1xuICAvLyBSZWluZGVudGF0aW9uIHNob3VsZCBvY2N1ciBvbiBbXSBvciBvbiBhIG1hdGNoIG9mIGFueSBvZlxuICAvLyB0aGUgYmxvY2sgY2xvc2luZyBrZXl3b3JkcywgYXQgdGhlIGVuZCBvZiBhIGxpbmUuXG4gIHZhciBhbGxDbG9zaW5ncyA9IG1pZGRsZS5jb25jYXQoZW5kKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCJbXFxcXFtcXFxcXV18KFwiICsgYWxsQ2xvc2luZ3Muam9pbihcInxcIikgKyBcIikkXCIpO1xufVxuXG5leHBvcnQgY29uc3Qgb3ogPSB7XG5cbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbml6ZTogdG9rZW5CYXNlLFxuICAgICAgY3VycmVudEluZGVudDogMCxcbiAgICAgIGRvSW5DdXJyZW50TGluZTogZmFsc2UsXG4gICAgICBoYXNQYXNzZWRGaXJzdFN0YWdlOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cbiAgdG9rZW46IGZ1bmN0aW9uIChzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKHN0cmVhbS5zb2woKSlcbiAgICAgIHN0YXRlLmRvSW5DdXJyZW50TGluZSA9IDA7XG5cbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH0sXG5cbiAgaW5kZW50OiBmdW5jdGlvbiAoc3RhdGUsIHRleHRBZnRlciwgY3gpIHtcbiAgICB2YXIgdHJ1ZVRleHQgPSB0ZXh0QWZ0ZXIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuXG4gICAgaWYgKHRydWVUZXh0Lm1hdGNoKGVuZEtleXdvcmRzKSB8fCB0cnVlVGV4dC5tYXRjaChtaWRkbGVLZXl3b3JkcykgfHwgdHJ1ZVRleHQubWF0Y2goLyhcXFtdKS8pKVxuICAgICAgcmV0dXJuIGN4LnVuaXQgKiAoc3RhdGUuY3VycmVudEluZGVudCAtIDEpO1xuXG4gICAgaWYgKHN0YXRlLmN1cnJlbnRJbmRlbnQgPCAwKVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICByZXR1cm4gc3RhdGUuY3VycmVudEluZGVudCAqIGN4LnVuaXRcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBpbmRlbnRPbkludXQ6IGJ1aWxkRWxlY3RyaWNJbnB1dFJlZ0V4KCksXG4gICAgY29tbWVudFRva2Vuczoge2xpbmU6IFwiJVwiLCBibG9jazoge29wZW46IFwiLypcIiwgY2xvc2U6IFwiKi9cIn19XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/oz.js\n");

/***/ })

}]);