(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/mllike.js":
/*!**************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/mllike.js ***!
  \**************************************************************/
/*! exports provided: oCaml, fSharp, sml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"oCaml\", function() { return oCaml; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fSharp\", function() { return fSharp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sml\", function() { return sml; });\nfunction mlLike(parserConfig) {\n  var words = {\n    'as': 'keyword',\n    'do': 'keyword',\n    'else': 'keyword',\n    'end': 'keyword',\n    'exception': 'keyword',\n    'fun': 'keyword',\n    'functor': 'keyword',\n    'if': 'keyword',\n    'in': 'keyword',\n    'include': 'keyword',\n    'let': 'keyword',\n    'of': 'keyword',\n    'open': 'keyword',\n    'rec': 'keyword',\n    'struct': 'keyword',\n    'then': 'keyword',\n    'type': 'keyword',\n    'val': 'keyword',\n    'while': 'keyword',\n    'with': 'keyword'\n  };\n\n  var extraWords = parserConfig.extraWords || {};\n  for (var prop in extraWords) {\n    if (extraWords.hasOwnProperty(prop)) {\n      words[prop] = parserConfig.extraWords[prop];\n    }\n  }\n  var hintWords = [];\n  for (var k in words) { hintWords.push(k); }\n\n  function tokenBase(stream, state) {\n    var ch = stream.next();\n\n    if (ch === '\"') {\n      state.tokenize = tokenString;\n      return state.tokenize(stream, state);\n    }\n    if (ch === '{') {\n      if (stream.eat('|')) {\n        state.longString = true;\n        state.tokenize = tokenLongString;\n        return state.tokenize(stream, state);\n      }\n    }\n    if (ch === '(') {\n      if (stream.match(/^\\*(?!\\))/)) {\n        state.commentLevel++;\n        state.tokenize = tokenComment;\n        return state.tokenize(stream, state);\n      }\n    }\n    if (ch === '~' || ch === '?') {\n      stream.eatWhile(/\\w/);\n      return 'variableName.special';\n    }\n    if (ch === '`') {\n      stream.eatWhile(/\\w/);\n      return 'quote';\n    }\n    if (ch === '/' && parserConfig.slashComments && stream.eat('/')) {\n      stream.skipToEnd();\n      return 'comment';\n    }\n    if (/\\d/.test(ch)) {\n      if (ch === '0' && stream.eat(/[bB]/)) {\n        stream.eatWhile(/[01]/);\n      } if (ch === '0' && stream.eat(/[xX]/)) {\n        stream.eatWhile(/[0-9a-fA-F]/)\n      } if (ch === '0' && stream.eat(/[oO]/)) {\n        stream.eatWhile(/[0-7]/);\n      } else {\n        stream.eatWhile(/[\\d_]/);\n        if (stream.eat('.')) {\n          stream.eatWhile(/[\\d]/);\n        }\n        if (stream.eat(/[eE]/)) {\n          stream.eatWhile(/[\\d\\-+]/);\n        }\n      }\n      return 'number';\n    }\n    if ( /[+\\-*&%=<>!?|@\\.~:]/.test(ch)) {\n      return 'operator';\n    }\n    if (/[\\w\\xa1-\\uffff]/.test(ch)) {\n      stream.eatWhile(/[\\w\\xa1-\\uffff]/);\n      var cur = stream.current();\n      return words.hasOwnProperty(cur) ? words[cur] : 'variable';\n    }\n    return null\n  }\n\n  function tokenString(stream, state) {\n    var next, end = false, escaped = false;\n    while ((next = stream.next()) != null) {\n      if (next === '\"' && !escaped) {\n        end = true;\n        break;\n      }\n      escaped = !escaped && next === '\\\\';\n    }\n    if (end && !escaped) {\n      state.tokenize = tokenBase;\n    }\n    return 'string';\n  };\n\n  function tokenComment(stream, state) {\n    var prev, next;\n    while(state.commentLevel > 0 && (next = stream.next()) != null) {\n      if (prev === '(' && next === '*') state.commentLevel++;\n      if (prev === '*' && next === ')') state.commentLevel--;\n      prev = next;\n    }\n    if (state.commentLevel <= 0) {\n      state.tokenize = tokenBase;\n    }\n    return 'comment';\n  }\n\n  function tokenLongString(stream, state) {\n    var prev, next;\n    while (state.longString && (next = stream.next()) != null) {\n      if (prev === '|' && next === '}') state.longString = false;\n      prev = next;\n    }\n    if (!state.longString) {\n      state.tokenize = tokenBase;\n    }\n    return 'string';\n  }\n\n  return {\n    startState: function() {return {tokenize: tokenBase, commentLevel: 0, longString: false};},\n    token: function(stream, state) {\n      if (stream.eatSpace()) return null;\n      return state.tokenize(stream, state);\n    },\n\n    languageData: {\n      autocomplete: hintWords,\n      commentTokens: {\n        line: parserConfig.slashComments ? \"//\" : undefined,\n        block: {open: \"(*\", close: \"*)\"}\n      }\n    }\n  };\n};\n\nconst oCaml = mlLike({\n  extraWords: {\n    'and': 'keyword',\n    'assert': 'keyword',\n    'begin': 'keyword',\n    'class': 'keyword',\n    'constraint': 'keyword',\n    'done': 'keyword',\n    'downto': 'keyword',\n    'external': 'keyword',\n    'function': 'keyword',\n    'initializer': 'keyword',\n    'lazy': 'keyword',\n    'match': 'keyword',\n    'method': 'keyword',\n    'module': 'keyword',\n    'mutable': 'keyword',\n    'new': 'keyword',\n    'nonrec': 'keyword',\n    'object': 'keyword',\n    'private': 'keyword',\n    'sig': 'keyword',\n    'to': 'keyword',\n    'try': 'keyword',\n    'value': 'keyword',\n    'virtual': 'keyword',\n    'when': 'keyword',\n\n    // builtins\n    'raise': 'builtin',\n    'failwith': 'builtin',\n    'true': 'builtin',\n    'false': 'builtin',\n\n    // Pervasives builtins\n    'asr': 'builtin',\n    'land': 'builtin',\n    'lor': 'builtin',\n    'lsl': 'builtin',\n    'lsr': 'builtin',\n    'lxor': 'builtin',\n    'mod': 'builtin',\n    'or': 'builtin',\n\n    // More Pervasives\n    'raise_notrace': 'builtin',\n    'trace': 'builtin',\n    'exit': 'builtin',\n    'print_string': 'builtin',\n    'print_endline': 'builtin',\n\n     'int': 'type',\n     'float': 'type',\n     'bool': 'type',\n     'char': 'type',\n     'string': 'type',\n     'unit': 'type',\n\n     // Modules\n     'List': 'builtin'\n  }\n});\n\nconst fSharp = mlLike({\n  extraWords: {\n    'abstract': 'keyword',\n    'assert': 'keyword',\n    'base': 'keyword',\n    'begin': 'keyword',\n    'class': 'keyword',\n    'default': 'keyword',\n    'delegate': 'keyword',\n    'do!': 'keyword',\n    'done': 'keyword',\n    'downcast': 'keyword',\n    'downto': 'keyword',\n    'elif': 'keyword',\n    'extern': 'keyword',\n    'finally': 'keyword',\n    'for': 'keyword',\n    'function': 'keyword',\n    'global': 'keyword',\n    'inherit': 'keyword',\n    'inline': 'keyword',\n    'interface': 'keyword',\n    'internal': 'keyword',\n    'lazy': 'keyword',\n    'let!': 'keyword',\n    'match': 'keyword',\n    'member': 'keyword',\n    'module': 'keyword',\n    'mutable': 'keyword',\n    'namespace': 'keyword',\n    'new': 'keyword',\n    'null': 'keyword',\n    'override': 'keyword',\n    'private': 'keyword',\n    'public': 'keyword',\n    'return!': 'keyword',\n    'return': 'keyword',\n    'select': 'keyword',\n    'static': 'keyword',\n    'to': 'keyword',\n    'try': 'keyword',\n    'upcast': 'keyword',\n    'use!': 'keyword',\n    'use': 'keyword',\n    'void': 'keyword',\n    'when': 'keyword',\n    'yield!': 'keyword',\n    'yield': 'keyword',\n\n    // Reserved words\n    'atomic': 'keyword',\n    'break': 'keyword',\n    'checked': 'keyword',\n    'component': 'keyword',\n    'const': 'keyword',\n    'constraint': 'keyword',\n    'constructor': 'keyword',\n    'continue': 'keyword',\n    'eager': 'keyword',\n    'event': 'keyword',\n    'external': 'keyword',\n    'fixed': 'keyword',\n    'method': 'keyword',\n    'mixin': 'keyword',\n    'object': 'keyword',\n    'parallel': 'keyword',\n    'process': 'keyword',\n    'protected': 'keyword',\n    'pure': 'keyword',\n    'sealed': 'keyword',\n    'tailcall': 'keyword',\n    'trait': 'keyword',\n    'virtual': 'keyword',\n    'volatile': 'keyword',\n\n    // builtins\n    'List': 'builtin',\n    'Seq': 'builtin',\n    'Map': 'builtin',\n    'Set': 'builtin',\n    'Option': 'builtin',\n    'int': 'builtin',\n    'string': 'builtin',\n    'not': 'builtin',\n    'true': 'builtin',\n    'false': 'builtin',\n\n    'raise': 'builtin',\n    'failwith': 'builtin'\n  },\n  slashComments: true\n});\n\nconst sml = mlLike({\n  extraWords: {\n    'abstype': 'keyword',\n    'and': 'keyword',\n    'andalso': 'keyword',\n    'case': 'keyword',\n    'datatype': 'keyword',\n    'fn': 'keyword',\n    'handle': 'keyword',\n    'infix': 'keyword',\n    'infixr': 'keyword',\n    'local': 'keyword',\n    'nonfix': 'keyword',\n    'op': 'keyword',\n    'orelse': 'keyword',\n    'raise': 'keyword',\n    'withtype': 'keyword',\n    'eqtype': 'keyword',\n    'sharing': 'keyword',\n    'sig': 'keyword',\n    'signature': 'keyword',\n    'structure': 'keyword',\n    'where': 'keyword',\n    'true': 'keyword',\n    'false': 'keyword',\n\n    // types\n    'int': 'builtin',\n    'real': 'builtin',\n    'string': 'builtin',\n    'char': 'builtin',\n    'bool': 'builtin'\n  },\n  slashComments: true\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvbWxsaWtlLmpzP2EwYjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjs7QUFFM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixRQUFRLDBEQUEwRDtBQUM5RjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AY29kZW1pcnJvci9sZWdhY3ktbW9kZXMvbW9kZS9tbGxpa2UuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBtbExpa2UocGFyc2VyQ29uZmlnKSB7XG4gIHZhciB3b3JkcyA9IHtcbiAgICAnYXMnOiAna2V5d29yZCcsXG4gICAgJ2RvJzogJ2tleXdvcmQnLFxuICAgICdlbHNlJzogJ2tleXdvcmQnLFxuICAgICdlbmQnOiAna2V5d29yZCcsXG4gICAgJ2V4Y2VwdGlvbic6ICdrZXl3b3JkJyxcbiAgICAnZnVuJzogJ2tleXdvcmQnLFxuICAgICdmdW5jdG9yJzogJ2tleXdvcmQnLFxuICAgICdpZic6ICdrZXl3b3JkJyxcbiAgICAnaW4nOiAna2V5d29yZCcsXG4gICAgJ2luY2x1ZGUnOiAna2V5d29yZCcsXG4gICAgJ2xldCc6ICdrZXl3b3JkJyxcbiAgICAnb2YnOiAna2V5d29yZCcsXG4gICAgJ29wZW4nOiAna2V5d29yZCcsXG4gICAgJ3JlYyc6ICdrZXl3b3JkJyxcbiAgICAnc3RydWN0JzogJ2tleXdvcmQnLFxuICAgICd0aGVuJzogJ2tleXdvcmQnLFxuICAgICd0eXBlJzogJ2tleXdvcmQnLFxuICAgICd2YWwnOiAna2V5d29yZCcsXG4gICAgJ3doaWxlJzogJ2tleXdvcmQnLFxuICAgICd3aXRoJzogJ2tleXdvcmQnXG4gIH07XG5cbiAgdmFyIGV4dHJhV29yZHMgPSBwYXJzZXJDb25maWcuZXh0cmFXb3JkcyB8fCB7fTtcbiAgZm9yICh2YXIgcHJvcCBpbiBleHRyYVdvcmRzKSB7XG4gICAgaWYgKGV4dHJhV29yZHMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIHdvcmRzW3Byb3BdID0gcGFyc2VyQ29uZmlnLmV4dHJhV29yZHNbcHJvcF07XG4gICAgfVxuICB9XG4gIHZhciBoaW50V29yZHMgPSBbXTtcbiAgZm9yICh2YXIgayBpbiB3b3JkcykgeyBoaW50V29yZHMucHVzaChrKTsgfVxuXG4gIGZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcblxuICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZztcbiAgICAgIHJldHVybiBzdGF0ZS50b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcbiAgICB9XG4gICAgaWYgKGNoID09PSAneycpIHtcbiAgICAgIGlmIChzdHJlYW0uZWF0KCd8JykpIHtcbiAgICAgICAgc3RhdGUubG9uZ1N0cmluZyA9IHRydWU7XG4gICAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5Mb25nU3RyaW5nO1xuICAgICAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaCA9PT0gJygnKSB7XG4gICAgICBpZiAoc3RyZWFtLm1hdGNoKC9eXFwqKD8hXFwpKS8pKSB7XG4gICAgICAgIHN0YXRlLmNvbW1lbnRMZXZlbCsrO1xuICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQ29tbWVudDtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2ggPT09ICd+JyB8fCBjaCA9PT0gJz8nKSB7XG4gICAgICBzdHJlYW0uZWF0V2hpbGUoL1xcdy8pO1xuICAgICAgcmV0dXJuICd2YXJpYWJsZU5hbWUuc3BlY2lhbCc7XG4gICAgfVxuICAgIGlmIChjaCA9PT0gJ2AnKSB7XG4gICAgICBzdHJlYW0uZWF0V2hpbGUoL1xcdy8pO1xuICAgICAgcmV0dXJuICdxdW90ZSc7XG4gICAgfVxuICAgIGlmIChjaCA9PT0gJy8nICYmIHBhcnNlckNvbmZpZy5zbGFzaENvbW1lbnRzICYmIHN0cmVhbS5lYXQoJy8nKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuICdjb21tZW50JztcbiAgICB9XG4gICAgaWYgKC9cXGQvLnRlc3QoY2gpKSB7XG4gICAgICBpZiAoY2ggPT09ICcwJyAmJiBzdHJlYW0uZWF0KC9bYkJdLykpIHtcbiAgICAgICAgc3RyZWFtLmVhdFdoaWxlKC9bMDFdLyk7XG4gICAgICB9IGlmIChjaCA9PT0gJzAnICYmIHN0cmVhbS5lYXQoL1t4WF0vKSkge1xuICAgICAgICBzdHJlYW0uZWF0V2hpbGUoL1swLTlhLWZBLUZdLylcbiAgICAgIH0gaWYgKGNoID09PSAnMCcgJiYgc3RyZWFtLmVhdCgvW29PXS8pKSB7XG4gICAgICAgIHN0cmVhbS5lYXRXaGlsZSgvWzAtN10vKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbS5lYXRXaGlsZSgvW1xcZF9dLyk7XG4gICAgICAgIGlmIChzdHJlYW0uZWF0KCcuJykpIHtcbiAgICAgICAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXGRdLyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmVhbS5lYXQoL1tlRV0vKSkge1xuICAgICAgICAgIHN0cmVhbS5lYXRXaGlsZSgvW1xcZFxcLStdLyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICB9XG4gICAgaWYgKCAvWytcXC0qJiU9PD4hP3xAXFwufjpdLy50ZXN0KGNoKSkge1xuICAgICAgcmV0dXJuICdvcGVyYXRvcic7XG4gICAgfVxuICAgIGlmICgvW1xcd1xceGExLVxcdWZmZmZdLy50ZXN0KGNoKSkge1xuICAgICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3XFx4YTEtXFx1ZmZmZl0vKTtcbiAgICAgIHZhciBjdXIgPSBzdHJlYW0uY3VycmVudCgpO1xuICAgICAgcmV0dXJuIHdvcmRzLmhhc093blByb3BlcnR5KGN1cikgPyB3b3Jkc1tjdXJdIDogJ3ZhcmlhYmxlJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGZ1bmN0aW9uIHRva2VuU3RyaW5nKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgbmV4dCwgZW5kID0gZmFsc2UsIGVzY2FwZWQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAobmV4dCA9PT0gJ1wiJyAmJiAhZXNjYXBlZCkge1xuICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09PSAnXFxcXCc7XG4gICAgfVxuICAgIGlmIChlbmQgJiYgIWVzY2FwZWQpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgIH1cbiAgICByZXR1cm4gJ3N0cmluZyc7XG4gIH07XG5cbiAgZnVuY3Rpb24gdG9rZW5Db21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgcHJldiwgbmV4dDtcbiAgICB3aGlsZShzdGF0ZS5jb21tZW50TGV2ZWwgPiAwICYmIChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKHByZXYgPT09ICcoJyAmJiBuZXh0ID09PSAnKicpIHN0YXRlLmNvbW1lbnRMZXZlbCsrO1xuICAgICAgaWYgKHByZXYgPT09ICcqJyAmJiBuZXh0ID09PSAnKScpIHN0YXRlLmNvbW1lbnRMZXZlbC0tO1xuICAgICAgcHJldiA9IG5leHQ7XG4gICAgfVxuICAgIGlmIChzdGF0ZS5jb21tZW50TGV2ZWwgPD0gMCkge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgfVxuICAgIHJldHVybiAnY29tbWVudCc7XG4gIH1cblxuICBmdW5jdGlvbiB0b2tlbkxvbmdTdHJpbmcoc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBwcmV2LCBuZXh0O1xuICAgIHdoaWxlIChzdGF0ZS5sb25nU3RyaW5nICYmIChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKHByZXYgPT09ICd8JyAmJiBuZXh0ID09PSAnfScpIHN0YXRlLmxvbmdTdHJpbmcgPSBmYWxzZTtcbiAgICAgIHByZXYgPSBuZXh0O1xuICAgIH1cbiAgICBpZiAoIXN0YXRlLmxvbmdTdHJpbmcpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgIH1cbiAgICByZXR1cm4gJ3N0cmluZyc7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge3JldHVybiB7dG9rZW5pemU6IHRva2VuQmFzZSwgY29tbWVudExldmVsOiAwLCBsb25nU3RyaW5nOiBmYWxzZX07fSxcbiAgICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiBzdGF0ZS50b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcbiAgICB9LFxuXG4gICAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgICBhdXRvY29tcGxldGU6IGhpbnRXb3JkcyxcbiAgICAgIGNvbW1lbnRUb2tlbnM6IHtcbiAgICAgICAgbGluZTogcGFyc2VyQ29uZmlnLnNsYXNoQ29tbWVudHMgPyBcIi8vXCIgOiB1bmRlZmluZWQsXG4gICAgICAgIGJsb2NrOiB7b3BlbjogXCIoKlwiLCBjbG9zZTogXCIqKVwifVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBvQ2FtbCA9IG1sTGlrZSh7XG4gIGV4dHJhV29yZHM6IHtcbiAgICAnYW5kJzogJ2tleXdvcmQnLFxuICAgICdhc3NlcnQnOiAna2V5d29yZCcsXG4gICAgJ2JlZ2luJzogJ2tleXdvcmQnLFxuICAgICdjbGFzcyc6ICdrZXl3b3JkJyxcbiAgICAnY29uc3RyYWludCc6ICdrZXl3b3JkJyxcbiAgICAnZG9uZSc6ICdrZXl3b3JkJyxcbiAgICAnZG93bnRvJzogJ2tleXdvcmQnLFxuICAgICdleHRlcm5hbCc6ICdrZXl3b3JkJyxcbiAgICAnZnVuY3Rpb24nOiAna2V5d29yZCcsXG4gICAgJ2luaXRpYWxpemVyJzogJ2tleXdvcmQnLFxuICAgICdsYXp5JzogJ2tleXdvcmQnLFxuICAgICdtYXRjaCc6ICdrZXl3b3JkJyxcbiAgICAnbWV0aG9kJzogJ2tleXdvcmQnLFxuICAgICdtb2R1bGUnOiAna2V5d29yZCcsXG4gICAgJ211dGFibGUnOiAna2V5d29yZCcsXG4gICAgJ25ldyc6ICdrZXl3b3JkJyxcbiAgICAnbm9ucmVjJzogJ2tleXdvcmQnLFxuICAgICdvYmplY3QnOiAna2V5d29yZCcsXG4gICAgJ3ByaXZhdGUnOiAna2V5d29yZCcsXG4gICAgJ3NpZyc6ICdrZXl3b3JkJyxcbiAgICAndG8nOiAna2V5d29yZCcsXG4gICAgJ3RyeSc6ICdrZXl3b3JkJyxcbiAgICAndmFsdWUnOiAna2V5d29yZCcsXG4gICAgJ3ZpcnR1YWwnOiAna2V5d29yZCcsXG4gICAgJ3doZW4nOiAna2V5d29yZCcsXG5cbiAgICAvLyBidWlsdGluc1xuICAgICdyYWlzZSc6ICdidWlsdGluJyxcbiAgICAnZmFpbHdpdGgnOiAnYnVpbHRpbicsXG4gICAgJ3RydWUnOiAnYnVpbHRpbicsXG4gICAgJ2ZhbHNlJzogJ2J1aWx0aW4nLFxuXG4gICAgLy8gUGVydmFzaXZlcyBidWlsdGluc1xuICAgICdhc3InOiAnYnVpbHRpbicsXG4gICAgJ2xhbmQnOiAnYnVpbHRpbicsXG4gICAgJ2xvcic6ICdidWlsdGluJyxcbiAgICAnbHNsJzogJ2J1aWx0aW4nLFxuICAgICdsc3InOiAnYnVpbHRpbicsXG4gICAgJ2x4b3InOiAnYnVpbHRpbicsXG4gICAgJ21vZCc6ICdidWlsdGluJyxcbiAgICAnb3InOiAnYnVpbHRpbicsXG5cbiAgICAvLyBNb3JlIFBlcnZhc2l2ZXNcbiAgICAncmFpc2Vfbm90cmFjZSc6ICdidWlsdGluJyxcbiAgICAndHJhY2UnOiAnYnVpbHRpbicsXG4gICAgJ2V4aXQnOiAnYnVpbHRpbicsXG4gICAgJ3ByaW50X3N0cmluZyc6ICdidWlsdGluJyxcbiAgICAncHJpbnRfZW5kbGluZSc6ICdidWlsdGluJyxcblxuICAgICAnaW50JzogJ3R5cGUnLFxuICAgICAnZmxvYXQnOiAndHlwZScsXG4gICAgICdib29sJzogJ3R5cGUnLFxuICAgICAnY2hhcic6ICd0eXBlJyxcbiAgICAgJ3N0cmluZyc6ICd0eXBlJyxcbiAgICAgJ3VuaXQnOiAndHlwZScsXG5cbiAgICAgLy8gTW9kdWxlc1xuICAgICAnTGlzdCc6ICdidWlsdGluJ1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGZTaGFycCA9IG1sTGlrZSh7XG4gIGV4dHJhV29yZHM6IHtcbiAgICAnYWJzdHJhY3QnOiAna2V5d29yZCcsXG4gICAgJ2Fzc2VydCc6ICdrZXl3b3JkJyxcbiAgICAnYmFzZSc6ICdrZXl3b3JkJyxcbiAgICAnYmVnaW4nOiAna2V5d29yZCcsXG4gICAgJ2NsYXNzJzogJ2tleXdvcmQnLFxuICAgICdkZWZhdWx0JzogJ2tleXdvcmQnLFxuICAgICdkZWxlZ2F0ZSc6ICdrZXl3b3JkJyxcbiAgICAnZG8hJzogJ2tleXdvcmQnLFxuICAgICdkb25lJzogJ2tleXdvcmQnLFxuICAgICdkb3duY2FzdCc6ICdrZXl3b3JkJyxcbiAgICAnZG93bnRvJzogJ2tleXdvcmQnLFxuICAgICdlbGlmJzogJ2tleXdvcmQnLFxuICAgICdleHRlcm4nOiAna2V5d29yZCcsXG4gICAgJ2ZpbmFsbHknOiAna2V5d29yZCcsXG4gICAgJ2Zvcic6ICdrZXl3b3JkJyxcbiAgICAnZnVuY3Rpb24nOiAna2V5d29yZCcsXG4gICAgJ2dsb2JhbCc6ICdrZXl3b3JkJyxcbiAgICAnaW5oZXJpdCc6ICdrZXl3b3JkJyxcbiAgICAnaW5saW5lJzogJ2tleXdvcmQnLFxuICAgICdpbnRlcmZhY2UnOiAna2V5d29yZCcsXG4gICAgJ2ludGVybmFsJzogJ2tleXdvcmQnLFxuICAgICdsYXp5JzogJ2tleXdvcmQnLFxuICAgICdsZXQhJzogJ2tleXdvcmQnLFxuICAgICdtYXRjaCc6ICdrZXl3b3JkJyxcbiAgICAnbWVtYmVyJzogJ2tleXdvcmQnLFxuICAgICdtb2R1bGUnOiAna2V5d29yZCcsXG4gICAgJ211dGFibGUnOiAna2V5d29yZCcsXG4gICAgJ25hbWVzcGFjZSc6ICdrZXl3b3JkJyxcbiAgICAnbmV3JzogJ2tleXdvcmQnLFxuICAgICdudWxsJzogJ2tleXdvcmQnLFxuICAgICdvdmVycmlkZSc6ICdrZXl3b3JkJyxcbiAgICAncHJpdmF0ZSc6ICdrZXl3b3JkJyxcbiAgICAncHVibGljJzogJ2tleXdvcmQnLFxuICAgICdyZXR1cm4hJzogJ2tleXdvcmQnLFxuICAgICdyZXR1cm4nOiAna2V5d29yZCcsXG4gICAgJ3NlbGVjdCc6ICdrZXl3b3JkJyxcbiAgICAnc3RhdGljJzogJ2tleXdvcmQnLFxuICAgICd0byc6ICdrZXl3b3JkJyxcbiAgICAndHJ5JzogJ2tleXdvcmQnLFxuICAgICd1cGNhc3QnOiAna2V5d29yZCcsXG4gICAgJ3VzZSEnOiAna2V5d29yZCcsXG4gICAgJ3VzZSc6ICdrZXl3b3JkJyxcbiAgICAndm9pZCc6ICdrZXl3b3JkJyxcbiAgICAnd2hlbic6ICdrZXl3b3JkJyxcbiAgICAneWllbGQhJzogJ2tleXdvcmQnLFxuICAgICd5aWVsZCc6ICdrZXl3b3JkJyxcblxuICAgIC8vIFJlc2VydmVkIHdvcmRzXG4gICAgJ2F0b21pYyc6ICdrZXl3b3JkJyxcbiAgICAnYnJlYWsnOiAna2V5d29yZCcsXG4gICAgJ2NoZWNrZWQnOiAna2V5d29yZCcsXG4gICAgJ2NvbXBvbmVudCc6ICdrZXl3b3JkJyxcbiAgICAnY29uc3QnOiAna2V5d29yZCcsXG4gICAgJ2NvbnN0cmFpbnQnOiAna2V5d29yZCcsXG4gICAgJ2NvbnN0cnVjdG9yJzogJ2tleXdvcmQnLFxuICAgICdjb250aW51ZSc6ICdrZXl3b3JkJyxcbiAgICAnZWFnZXInOiAna2V5d29yZCcsXG4gICAgJ2V2ZW50JzogJ2tleXdvcmQnLFxuICAgICdleHRlcm5hbCc6ICdrZXl3b3JkJyxcbiAgICAnZml4ZWQnOiAna2V5d29yZCcsXG4gICAgJ21ldGhvZCc6ICdrZXl3b3JkJyxcbiAgICAnbWl4aW4nOiAna2V5d29yZCcsXG4gICAgJ29iamVjdCc6ICdrZXl3b3JkJyxcbiAgICAncGFyYWxsZWwnOiAna2V5d29yZCcsXG4gICAgJ3Byb2Nlc3MnOiAna2V5d29yZCcsXG4gICAgJ3Byb3RlY3RlZCc6ICdrZXl3b3JkJyxcbiAgICAncHVyZSc6ICdrZXl3b3JkJyxcbiAgICAnc2VhbGVkJzogJ2tleXdvcmQnLFxuICAgICd0YWlsY2FsbCc6ICdrZXl3b3JkJyxcbiAgICAndHJhaXQnOiAna2V5d29yZCcsXG4gICAgJ3ZpcnR1YWwnOiAna2V5d29yZCcsXG4gICAgJ3ZvbGF0aWxlJzogJ2tleXdvcmQnLFxuXG4gICAgLy8gYnVpbHRpbnNcbiAgICAnTGlzdCc6ICdidWlsdGluJyxcbiAgICAnU2VxJzogJ2J1aWx0aW4nLFxuICAgICdNYXAnOiAnYnVpbHRpbicsXG4gICAgJ1NldCc6ICdidWlsdGluJyxcbiAgICAnT3B0aW9uJzogJ2J1aWx0aW4nLFxuICAgICdpbnQnOiAnYnVpbHRpbicsXG4gICAgJ3N0cmluZyc6ICdidWlsdGluJyxcbiAgICAnbm90JzogJ2J1aWx0aW4nLFxuICAgICd0cnVlJzogJ2J1aWx0aW4nLFxuICAgICdmYWxzZSc6ICdidWlsdGluJyxcblxuICAgICdyYWlzZSc6ICdidWlsdGluJyxcbiAgICAnZmFpbHdpdGgnOiAnYnVpbHRpbidcbiAgfSxcbiAgc2xhc2hDb21tZW50czogdHJ1ZVxufSk7XG5cbmV4cG9ydCBjb25zdCBzbWwgPSBtbExpa2Uoe1xuICBleHRyYVdvcmRzOiB7XG4gICAgJ2Fic3R5cGUnOiAna2V5d29yZCcsXG4gICAgJ2FuZCc6ICdrZXl3b3JkJyxcbiAgICAnYW5kYWxzbyc6ICdrZXl3b3JkJyxcbiAgICAnY2FzZSc6ICdrZXl3b3JkJyxcbiAgICAnZGF0YXR5cGUnOiAna2V5d29yZCcsXG4gICAgJ2ZuJzogJ2tleXdvcmQnLFxuICAgICdoYW5kbGUnOiAna2V5d29yZCcsXG4gICAgJ2luZml4JzogJ2tleXdvcmQnLFxuICAgICdpbmZpeHInOiAna2V5d29yZCcsXG4gICAgJ2xvY2FsJzogJ2tleXdvcmQnLFxuICAgICdub25maXgnOiAna2V5d29yZCcsXG4gICAgJ29wJzogJ2tleXdvcmQnLFxuICAgICdvcmVsc2UnOiAna2V5d29yZCcsXG4gICAgJ3JhaXNlJzogJ2tleXdvcmQnLFxuICAgICd3aXRodHlwZSc6ICdrZXl3b3JkJyxcbiAgICAnZXF0eXBlJzogJ2tleXdvcmQnLFxuICAgICdzaGFyaW5nJzogJ2tleXdvcmQnLFxuICAgICdzaWcnOiAna2V5d29yZCcsXG4gICAgJ3NpZ25hdHVyZSc6ICdrZXl3b3JkJyxcbiAgICAnc3RydWN0dXJlJzogJ2tleXdvcmQnLFxuICAgICd3aGVyZSc6ICdrZXl3b3JkJyxcbiAgICAndHJ1ZSc6ICdrZXl3b3JkJyxcbiAgICAnZmFsc2UnOiAna2V5d29yZCcsXG5cbiAgICAvLyB0eXBlc1xuICAgICdpbnQnOiAnYnVpbHRpbicsXG4gICAgJ3JlYWwnOiAnYnVpbHRpbicsXG4gICAgJ3N0cmluZyc6ICdidWlsdGluJyxcbiAgICAnY2hhcic6ICdidWlsdGluJyxcbiAgICAnYm9vbCc6ICdidWlsdGluJ1xuICB9LFxuICBzbGFzaENvbW1lbnRzOiB0cnVlXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/mllike.js\n");

/***/ })

}]);