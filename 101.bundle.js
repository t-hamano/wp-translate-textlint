(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[101],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/webidl.js":
/*!**************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/webidl.js ***!
  \**************************************************************/
/*! exports provided: webIDL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"webIDL\", function() { return webIDL; });\nfunction wordRegexp(words) {\n  return new RegExp(\"^((\" + words.join(\")|(\") + \"))\\\\b\");\n};\n\nvar builtinArray = [\n  \"Clamp\",\n  \"Constructor\",\n  \"EnforceRange\",\n  \"Exposed\",\n  \"ImplicitThis\",\n  \"Global\", \"PrimaryGlobal\",\n  \"LegacyArrayClass\",\n  \"LegacyUnenumerableNamedProperties\",\n  \"LenientThis\",\n  \"NamedConstructor\",\n  \"NewObject\",\n  \"NoInterfaceObject\",\n  \"OverrideBuiltins\",\n  \"PutForwards\",\n  \"Replaceable\",\n  \"SameObject\",\n  \"TreatNonObjectAsNull\",\n  \"TreatNullAs\",\n    \"EmptyString\",\n  \"Unforgeable\",\n  \"Unscopeable\"\n];\nvar builtins = wordRegexp(builtinArray);\n\nvar typeArray = [\n  \"unsigned\", \"short\", \"long\",                  // UnsignedIntegerType\n  \"unrestricted\", \"float\", \"double\",            // UnrestrictedFloatType\n  \"boolean\", \"byte\", \"octet\",                   // Rest of PrimitiveType\n  \"Promise\",                                    // PromiseType\n  \"ArrayBuffer\", \"DataView\", \"Int8Array\", \"Int16Array\", \"Int32Array\",\n  \"Uint8Array\", \"Uint16Array\", \"Uint32Array\", \"Uint8ClampedArray\",\n  \"Float32Array\", \"Float64Array\",               // BufferRelatedType\n  \"ByteString\", \"DOMString\", \"USVString\", \"sequence\", \"object\", \"RegExp\",\n  \"Error\", \"DOMException\", \"FrozenArray\",       // Rest of NonAnyType\n  \"any\",                                        // Rest of SingleType\n  \"void\"                                        // Rest of ReturnType\n];\nvar types = wordRegexp(typeArray);\n\nvar keywordArray = [\n  \"attribute\", \"callback\", \"const\", \"deleter\", \"dictionary\", \"enum\", \"getter\",\n  \"implements\", \"inherit\", \"interface\", \"iterable\", \"legacycaller\", \"maplike\",\n  \"partial\", \"required\", \"serializer\", \"setlike\", \"setter\", \"static\",\n  \"stringifier\", \"typedef\",                     // ArgumentNameKeyword except\n                                                // \"unrestricted\"\n  \"optional\", \"readonly\", \"or\"\n];\nvar keywords = wordRegexp(keywordArray);\n\nvar atomArray = [\n  \"true\", \"false\",                              // BooleanLiteral\n  \"Infinity\", \"NaN\",                            // FloatLiteral\n  \"null\"                                        // Rest of ConstValue\n];\nvar atoms = wordRegexp(atomArray);\n\nvar startDefArray = [\"callback\", \"dictionary\", \"enum\", \"interface\"];\nvar startDefs = wordRegexp(startDefArray);\n\nvar endDefArray = [\"typedef\"];\nvar endDefs = wordRegexp(endDefArray);\n\nvar singleOperators = /^[:<=>?]/;\nvar integers = /^-?([1-9][0-9]*|0[Xx][0-9A-Fa-f]+|0[0-7]*)/;\nvar floats = /^-?(([0-9]+\\.[0-9]*|[0-9]*\\.[0-9]+)([Ee][+-]?[0-9]+)?|[0-9]+[Ee][+-]?[0-9]+)/;\nvar identifiers = /^_?[A-Za-z][0-9A-Z_a-z-]*/;\nvar identifiersEnd = /^_?[A-Za-z][0-9A-Z_a-z-]*(?=\\s*;)/;\nvar strings = /^\"[^\"]*\"/;\nvar multilineComments = /^\\/\\*.*?\\*\\//;\nvar multilineCommentsStart = /^\\/\\*.*/;\nvar multilineCommentsEnd = /^.*?\\*\\//;\n\nfunction readToken(stream, state) {\n  // whitespace\n  if (stream.eatSpace()) return null;\n\n  // comment\n  if (state.inComment) {\n    if (stream.match(multilineCommentsEnd)) {\n      state.inComment = false;\n      return \"comment\";\n    }\n    stream.skipToEnd();\n    return \"comment\";\n  }\n  if (stream.match(\"//\")) {\n    stream.skipToEnd();\n    return \"comment\";\n  }\n  if (stream.match(multilineComments)) return \"comment\";\n  if (stream.match(multilineCommentsStart)) {\n    state.inComment = true;\n    return \"comment\";\n  }\n\n  // integer and float\n  if (stream.match(/^-?[0-9\\.]/, false)) {\n    if (stream.match(integers) || stream.match(floats)) return \"number\";\n  }\n\n  // string\n  if (stream.match(strings)) return \"string\";\n\n  // identifier\n  if (state.startDef && stream.match(identifiers)) return \"def\";\n\n  if (state.endDef && stream.match(identifiersEnd)) {\n    state.endDef = false;\n    return \"def\";\n  }\n\n  if (stream.match(keywords)) return \"keyword\";\n\n  if (stream.match(types)) {\n    var lastToken = state.lastToken;\n    var nextToken = (stream.match(/^\\s*(.+?)\\b/, false) || [])[1];\n\n    if (lastToken === \":\" || lastToken === \"implements\" ||\n        nextToken === \"implements\" || nextToken === \"=\") {\n      // Used as identifier\n      return \"builtin\";\n    } else {\n      // Used as type\n      return \"type\";\n    }\n  }\n\n  if (stream.match(builtins)) return \"builtin\";\n  if (stream.match(atoms)) return \"atom\";\n  if (stream.match(identifiers)) return \"variable\";\n\n  // other\n  if (stream.match(singleOperators)) return \"operator\";\n\n  // unrecognized\n  stream.next();\n  return null;\n};\n\nconst webIDL = {\n  startState: function() {\n    return {\n      // Is in multiline comment\n      inComment: false,\n      // Last non-whitespace, matched token\n      lastToken: \"\",\n      // Next token is a definition\n      startDef: false,\n      // Last token of the statement is a definition\n      endDef: false\n    };\n  },\n  token: function(stream, state) {\n    var style = readToken(stream, state);\n\n    if (style) {\n      var cur = stream.current();\n      state.lastToken = cur;\n      if (style === \"keyword\") {\n        state.startDef = startDefs.test(cur);\n        state.endDef = state.endDef || endDefs.test(cur);\n      } else {\n        state.startDef = false;\n      }\n    }\n\n    return style;\n  },\n\n  languageData: {\n    autocomplete: builtinArray.concat(typeArray).concat(keywordArray).concat(atomArray)\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvd2ViaWRsLmpzP2VjMmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvd2ViaWRsLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gd29yZFJlZ2V4cCh3b3Jkcykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oKFwiICsgd29yZHMuam9pbihcIil8KFwiKSArIFwiKSlcXFxcYlwiKTtcbn07XG5cbnZhciBidWlsdGluQXJyYXkgPSBbXG4gIFwiQ2xhbXBcIixcbiAgXCJDb25zdHJ1Y3RvclwiLFxuICBcIkVuZm9yY2VSYW5nZVwiLFxuICBcIkV4cG9zZWRcIixcbiAgXCJJbXBsaWNpdFRoaXNcIixcbiAgXCJHbG9iYWxcIiwgXCJQcmltYXJ5R2xvYmFsXCIsXG4gIFwiTGVnYWN5QXJyYXlDbGFzc1wiLFxuICBcIkxlZ2FjeVVuZW51bWVyYWJsZU5hbWVkUHJvcGVydGllc1wiLFxuICBcIkxlbmllbnRUaGlzXCIsXG4gIFwiTmFtZWRDb25zdHJ1Y3RvclwiLFxuICBcIk5ld09iamVjdFwiLFxuICBcIk5vSW50ZXJmYWNlT2JqZWN0XCIsXG4gIFwiT3ZlcnJpZGVCdWlsdGluc1wiLFxuICBcIlB1dEZvcndhcmRzXCIsXG4gIFwiUmVwbGFjZWFibGVcIixcbiAgXCJTYW1lT2JqZWN0XCIsXG4gIFwiVHJlYXROb25PYmplY3RBc051bGxcIixcbiAgXCJUcmVhdE51bGxBc1wiLFxuICAgIFwiRW1wdHlTdHJpbmdcIixcbiAgXCJVbmZvcmdlYWJsZVwiLFxuICBcIlVuc2NvcGVhYmxlXCJcbl07XG52YXIgYnVpbHRpbnMgPSB3b3JkUmVnZXhwKGJ1aWx0aW5BcnJheSk7XG5cbnZhciB0eXBlQXJyYXkgPSBbXG4gIFwidW5zaWduZWRcIiwgXCJzaG9ydFwiLCBcImxvbmdcIiwgICAgICAgICAgICAgICAgICAvLyBVbnNpZ25lZEludGVnZXJUeXBlXG4gIFwidW5yZXN0cmljdGVkXCIsIFwiZmxvYXRcIiwgXCJkb3VibGVcIiwgICAgICAgICAgICAvLyBVbnJlc3RyaWN0ZWRGbG9hdFR5cGVcbiAgXCJib29sZWFuXCIsIFwiYnl0ZVwiLCBcIm9jdGV0XCIsICAgICAgICAgICAgICAgICAgIC8vIFJlc3Qgb2YgUHJpbWl0aXZlVHlwZVxuICBcIlByb21pc2VcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9taXNlVHlwZVxuICBcIkFycmF5QnVmZmVyXCIsIFwiRGF0YVZpZXdcIiwgXCJJbnQ4QXJyYXlcIiwgXCJJbnQxNkFycmF5XCIsIFwiSW50MzJBcnJheVwiLFxuICBcIlVpbnQ4QXJyYXlcIiwgXCJVaW50MTZBcnJheVwiLCBcIlVpbnQzMkFycmF5XCIsIFwiVWludDhDbGFtcGVkQXJyYXlcIixcbiAgXCJGbG9hdDMyQXJyYXlcIiwgXCJGbG9hdDY0QXJyYXlcIiwgICAgICAgICAgICAgICAvLyBCdWZmZXJSZWxhdGVkVHlwZVxuICBcIkJ5dGVTdHJpbmdcIiwgXCJET01TdHJpbmdcIiwgXCJVU1ZTdHJpbmdcIiwgXCJzZXF1ZW5jZVwiLCBcIm9iamVjdFwiLCBcIlJlZ0V4cFwiLFxuICBcIkVycm9yXCIsIFwiRE9NRXhjZXB0aW9uXCIsIFwiRnJvemVuQXJyYXlcIiwgICAgICAgLy8gUmVzdCBvZiBOb25BbnlUeXBlXG4gIFwiYW55XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3Qgb2YgU2luZ2xlVHlwZVxuICBcInZvaWRcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0IG9mIFJldHVyblR5cGVcbl07XG52YXIgdHlwZXMgPSB3b3JkUmVnZXhwKHR5cGVBcnJheSk7XG5cbnZhciBrZXl3b3JkQXJyYXkgPSBbXG4gIFwiYXR0cmlidXRlXCIsIFwiY2FsbGJhY2tcIiwgXCJjb25zdFwiLCBcImRlbGV0ZXJcIiwgXCJkaWN0aW9uYXJ5XCIsIFwiZW51bVwiLCBcImdldHRlclwiLFxuICBcImltcGxlbWVudHNcIiwgXCJpbmhlcml0XCIsIFwiaW50ZXJmYWNlXCIsIFwiaXRlcmFibGVcIiwgXCJsZWdhY3ljYWxsZXJcIiwgXCJtYXBsaWtlXCIsXG4gIFwicGFydGlhbFwiLCBcInJlcXVpcmVkXCIsIFwic2VyaWFsaXplclwiLCBcInNldGxpa2VcIiwgXCJzZXR0ZXJcIiwgXCJzdGF0aWNcIixcbiAgXCJzdHJpbmdpZmllclwiLCBcInR5cGVkZWZcIiwgICAgICAgICAgICAgICAgICAgICAvLyBBcmd1bWVudE5hbWVLZXl3b3JkIGV4Y2VwdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJ1bnJlc3RyaWN0ZWRcIlxuICBcIm9wdGlvbmFsXCIsIFwicmVhZG9ubHlcIiwgXCJvclwiXG5dO1xudmFyIGtleXdvcmRzID0gd29yZFJlZ2V4cChrZXl3b3JkQXJyYXkpO1xuXG52YXIgYXRvbUFycmF5ID0gW1xuICBcInRydWVcIiwgXCJmYWxzZVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvb2xlYW5MaXRlcmFsXG4gIFwiSW5maW5pdHlcIiwgXCJOYU5cIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmxvYXRMaXRlcmFsXG4gIFwibnVsbFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3Qgb2YgQ29uc3RWYWx1ZVxuXTtcbnZhciBhdG9tcyA9IHdvcmRSZWdleHAoYXRvbUFycmF5KTtcblxudmFyIHN0YXJ0RGVmQXJyYXkgPSBbXCJjYWxsYmFja1wiLCBcImRpY3Rpb25hcnlcIiwgXCJlbnVtXCIsIFwiaW50ZXJmYWNlXCJdO1xudmFyIHN0YXJ0RGVmcyA9IHdvcmRSZWdleHAoc3RhcnREZWZBcnJheSk7XG5cbnZhciBlbmREZWZBcnJheSA9IFtcInR5cGVkZWZcIl07XG52YXIgZW5kRGVmcyA9IHdvcmRSZWdleHAoZW5kRGVmQXJyYXkpO1xuXG52YXIgc2luZ2xlT3BlcmF0b3JzID0gL15bOjw9Pj9dLztcbnZhciBpbnRlZ2VycyA9IC9eLT8oWzEtOV1bMC05XSp8MFtYeF1bMC05QS1GYS1mXSt8MFswLTddKikvO1xudmFyIGZsb2F0cyA9IC9eLT8oKFswLTldK1xcLlswLTldKnxbMC05XSpcXC5bMC05XSspKFtFZV1bKy1dP1swLTldKyk/fFswLTldK1tFZV1bKy1dP1swLTldKykvO1xudmFyIGlkZW50aWZpZXJzID0gL15fP1tBLVphLXpdWzAtOUEtWl9hLXotXSovO1xudmFyIGlkZW50aWZpZXJzRW5kID0gL15fP1tBLVphLXpdWzAtOUEtWl9hLXotXSooPz1cXHMqOykvO1xudmFyIHN0cmluZ3MgPSAvXlwiW15cIl0qXCIvO1xudmFyIG11bHRpbGluZUNvbW1lbnRzID0gL15cXC9cXCouKj9cXCpcXC8vO1xudmFyIG11bHRpbGluZUNvbW1lbnRzU3RhcnQgPSAvXlxcL1xcKi4qLztcbnZhciBtdWx0aWxpbmVDb21tZW50c0VuZCA9IC9eLio/XFwqXFwvLztcblxuZnVuY3Rpb24gcmVhZFRva2VuKHN0cmVhbSwgc3RhdGUpIHtcbiAgLy8gd2hpdGVzcGFjZVxuICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHJldHVybiBudWxsO1xuXG4gIC8vIGNvbW1lbnRcbiAgaWYgKHN0YXRlLmluQ29tbWVudCkge1xuICAgIGlmIChzdHJlYW0ubWF0Y2gobXVsdGlsaW5lQ29tbWVudHNFbmQpKSB7XG4gICAgICBzdGF0ZS5pbkNvbW1lbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICB9XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfVxuICBpZiAoc3RyZWFtLm1hdGNoKFwiLy9cIikpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICB9XG4gIGlmIChzdHJlYW0ubWF0Y2gobXVsdGlsaW5lQ29tbWVudHMpKSByZXR1cm4gXCJjb21tZW50XCI7XG4gIGlmIChzdHJlYW0ubWF0Y2gobXVsdGlsaW5lQ29tbWVudHNTdGFydCkpIHtcbiAgICBzdGF0ZS5pbkNvbW1lbnQgPSB0cnVlO1xuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfVxuXG4gIC8vIGludGVnZXIgYW5kIGZsb2F0XG4gIGlmIChzdHJlYW0ubWF0Y2goL14tP1swLTlcXC5dLywgZmFsc2UpKSB7XG4gICAgaWYgKHN0cmVhbS5tYXRjaChpbnRlZ2VycykgfHwgc3RyZWFtLm1hdGNoKGZsb2F0cykpIHJldHVybiBcIm51bWJlclwiO1xuICB9XG5cbiAgLy8gc3RyaW5nXG4gIGlmIChzdHJlYW0ubWF0Y2goc3RyaW5ncykpIHJldHVybiBcInN0cmluZ1wiO1xuXG4gIC8vIGlkZW50aWZpZXJcbiAgaWYgKHN0YXRlLnN0YXJ0RGVmICYmIHN0cmVhbS5tYXRjaChpZGVudGlmaWVycykpIHJldHVybiBcImRlZlwiO1xuXG4gIGlmIChzdGF0ZS5lbmREZWYgJiYgc3RyZWFtLm1hdGNoKGlkZW50aWZpZXJzRW5kKSkge1xuICAgIHN0YXRlLmVuZERlZiA9IGZhbHNlO1xuICAgIHJldHVybiBcImRlZlwiO1xuICB9XG5cbiAgaWYgKHN0cmVhbS5tYXRjaChrZXl3b3JkcykpIHJldHVybiBcImtleXdvcmRcIjtcblxuICBpZiAoc3RyZWFtLm1hdGNoKHR5cGVzKSkge1xuICAgIHZhciBsYXN0VG9rZW4gPSBzdGF0ZS5sYXN0VG9rZW47XG4gICAgdmFyIG5leHRUb2tlbiA9IChzdHJlYW0ubWF0Y2goL15cXHMqKC4rPylcXGIvLCBmYWxzZSkgfHwgW10pWzFdO1xuXG4gICAgaWYgKGxhc3RUb2tlbiA9PT0gXCI6XCIgfHwgbGFzdFRva2VuID09PSBcImltcGxlbWVudHNcIiB8fFxuICAgICAgICBuZXh0VG9rZW4gPT09IFwiaW1wbGVtZW50c1wiIHx8IG5leHRUb2tlbiA9PT0gXCI9XCIpIHtcbiAgICAgIC8vIFVzZWQgYXMgaWRlbnRpZmllclxuICAgICAgcmV0dXJuIFwiYnVpbHRpblwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2VkIGFzIHR5cGVcbiAgICAgIHJldHVybiBcInR5cGVcIjtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RyZWFtLm1hdGNoKGJ1aWx0aW5zKSkgcmV0dXJuIFwiYnVpbHRpblwiO1xuICBpZiAoc3RyZWFtLm1hdGNoKGF0b21zKSkgcmV0dXJuIFwiYXRvbVwiO1xuICBpZiAoc3RyZWFtLm1hdGNoKGlkZW50aWZpZXJzKSkgcmV0dXJuIFwidmFyaWFibGVcIjtcblxuICAvLyBvdGhlclxuICBpZiAoc3RyZWFtLm1hdGNoKHNpbmdsZU9wZXJhdG9ycykpIHJldHVybiBcIm9wZXJhdG9yXCI7XG5cbiAgLy8gdW5yZWNvZ25pemVkXG4gIHN0cmVhbS5uZXh0KCk7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHdlYklETCA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIElzIGluIG11bHRpbGluZSBjb21tZW50XG4gICAgICBpbkNvbW1lbnQ6IGZhbHNlLFxuICAgICAgLy8gTGFzdCBub24td2hpdGVzcGFjZSwgbWF0Y2hlZCB0b2tlblxuICAgICAgbGFzdFRva2VuOiBcIlwiLFxuICAgICAgLy8gTmV4dCB0b2tlbiBpcyBhIGRlZmluaXRpb25cbiAgICAgIHN0YXJ0RGVmOiBmYWxzZSxcbiAgICAgIC8vIExhc3QgdG9rZW4gb2YgdGhlIHN0YXRlbWVudCBpcyBhIGRlZmluaXRpb25cbiAgICAgIGVuZERlZjogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBzdHlsZSA9IHJlYWRUb2tlbihzdHJlYW0sIHN0YXRlKTtcblxuICAgIGlmIChzdHlsZSkge1xuICAgICAgdmFyIGN1ciA9IHN0cmVhbS5jdXJyZW50KCk7XG4gICAgICBzdGF0ZS5sYXN0VG9rZW4gPSBjdXI7XG4gICAgICBpZiAoc3R5bGUgPT09IFwia2V5d29yZFwiKSB7XG4gICAgICAgIHN0YXRlLnN0YXJ0RGVmID0gc3RhcnREZWZzLnRlc3QoY3VyKTtcbiAgICAgICAgc3RhdGUuZW5kRGVmID0gc3RhdGUuZW5kRGVmIHx8IGVuZERlZnMudGVzdChjdXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc3RhcnREZWYgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH0sXG5cbiAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgYXV0b2NvbXBsZXRlOiBidWlsdGluQXJyYXkuY29uY2F0KHR5cGVBcnJheSkuY29uY2F0KGtleXdvcmRBcnJheSkuY29uY2F0KGF0b21BcnJheSlcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/webidl.js\n");

/***/ })

}]);