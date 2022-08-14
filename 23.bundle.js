(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/asn1.js":
/*!************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/asn1.js ***!
  \************************************************************/
/*! exports provided: asn1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"asn1\", function() { return asn1; });\nfunction words(str) {\n  var obj = {}, words = str.split(\" \");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\n\nconst defaults = {\n  keywords: words(\"DEFINITIONS OBJECTS IF DERIVED INFORMATION ACTION\" +\n                  \" REPLY ANY NAMED CHARACTERIZED BEHAVIOUR REGISTERED\" +\n                  \" WITH AS IDENTIFIED CONSTRAINED BY PRESENT BEGIN\" +\n                  \" IMPORTS FROM UNITS SYNTAX MIN-ACCESS MAX-ACCESS\" +\n                  \" MINACCESS MAXACCESS REVISION STATUS DESCRIPTION\" +\n                  \" SEQUENCE SET COMPONENTS OF CHOICE DistinguishedName\" +\n                  \" ENUMERATED SIZE MODULE END INDEX AUGMENTS EXTENSIBILITY\" +\n                  \" IMPLIED EXPORTS\"),\n  cmipVerbs: words(\"ACTIONS ADD GET NOTIFICATIONS REPLACE REMOVE\"),\n  compareTypes: words(\"OPTIONAL DEFAULT MANAGED MODULE-TYPE MODULE_IDENTITY\" +\n                      \" MODULE-COMPLIANCE OBJECT-TYPE OBJECT-IDENTITY\" +\n                      \" OBJECT-COMPLIANCE MODE CONFIRMED CONDITIONAL\" +\n                      \" SUBORDINATE SUPERIOR CLASS TRUE FALSE NULL\" +\n                      \" TEXTUAL-CONVENTION\"),\n  status: words(\"current deprecated mandatory obsolete\"),\n  tags: words(\"APPLICATION AUTOMATIC EXPLICIT IMPLICIT PRIVATE TAGS\" +\n              \" UNIVERSAL\"),\n  storage: words(\"BOOLEAN INTEGER OBJECT IDENTIFIER BIT OCTET STRING\" +\n                 \" UTCTime InterfaceIndex IANAifType CMIP-Attribute\" +\n                 \" REAL PACKAGE PACKAGES IpAddress PhysAddress\" +\n                 \" NetworkAddress BITS BMPString TimeStamp TimeTicks\" +\n                 \" TruthValue RowStatus DisplayString GeneralString\" +\n                 \" GraphicString IA5String NumericString\" +\n                 \" PrintableString SnmpAdminString TeletexString\" +\n                 \" UTF8String VideotexString VisibleString StringStore\" +\n                 \" ISO646String T61String UniversalString Unsigned32\" +\n                 \" Integer32 Gauge Gauge32 Counter Counter32 Counter64\"),\n  modifier: words(\"ATTRIBUTE ATTRIBUTES MANDATORY-GROUP MANDATORY-GROUPS\" +\n                  \" GROUP GROUPS ELEMENTS EQUALITY ORDERING SUBSTRINGS\" +\n                  \" DEFINED\"),\n  accessTypes: words(\"not-accessible accessible-for-notify read-only\" +\n                     \" read-create read-write\"),\n  multiLineStrings: true\n}\n\nfunction asn1(parserConfig) {\n  var keywords = parserConfig.keywords || defaults.keywords,\n      cmipVerbs = parserConfig.cmipVerbs || defaults.cmipVerbs,\n      compareTypes = parserConfig.compareTypes || defaults.compareTypes,\n      status = parserConfig.status || defaults.status,\n      tags = parserConfig.tags || defaults.tags,\n      storage = parserConfig.storage || defaults.storage,\n      modifier = parserConfig.modifier || defaults.modifier,\n      accessTypes = parserConfig.accessTypes|| defaults.accessTypes,\n      multiLineStrings = parserConfig.multiLineStrings || defaults.multiLineStrings,\n      indentStatements = parserConfig.indentStatements !== false;\n  var isOperatorChar = /[\\|\\^]/;\n  var curPunc;\n\n  function tokenBase(stream, state) {\n    var ch = stream.next();\n    if (ch == '\"' || ch == \"'\") {\n      state.tokenize = tokenString(ch);\n      return state.tokenize(stream, state);\n    }\n    if (/[\\[\\]\\(\\){}:=,;]/.test(ch)) {\n      curPunc = ch;\n      return \"punctuation\";\n    }\n    if (ch == \"-\"){\n      if (stream.eat(\"-\")) {\n        stream.skipToEnd();\n        return \"comment\";\n      }\n    }\n    if (/\\d/.test(ch)) {\n      stream.eatWhile(/[\\w\\.]/);\n      return \"number\";\n    }\n    if (isOperatorChar.test(ch)) {\n      stream.eatWhile(isOperatorChar);\n      return \"operator\";\n    }\n\n    stream.eatWhile(/[\\w\\-]/);\n    var cur = stream.current();\n    if (keywords.propertyIsEnumerable(cur)) return \"keyword\";\n    if (cmipVerbs.propertyIsEnumerable(cur)) return \"variableName\";\n    if (compareTypes.propertyIsEnumerable(cur)) return \"atom\";\n    if (status.propertyIsEnumerable(cur)) return \"comment\";\n    if (tags.propertyIsEnumerable(cur)) return \"typeName\";\n    if (storage.propertyIsEnumerable(cur)) return \"modifier\";\n    if (modifier.propertyIsEnumerable(cur)) return \"modifier\";\n    if (accessTypes.propertyIsEnumerable(cur)) return \"modifier\";\n\n    return \"variableName\";\n  }\n\n  function tokenString(quote) {\n    return function(stream, state) {\n      var escaped = false, next, end = false;\n      while ((next = stream.next()) != null) {\n        if (next == quote && !escaped){\n          var afterNext = stream.peek();\n          //look if the character if the quote is like the B in '10100010'B\n          if (afterNext){\n            afterNext = afterNext.toLowerCase();\n            if(afterNext == \"b\" || afterNext == \"h\" || afterNext == \"o\")\n              stream.next();\n          }\n          end = true; break;\n        }\n        escaped = !escaped && next == \"\\\\\";\n      }\n      if (end || !(escaped || multiLineStrings))\n        state.tokenize = null;\n      return \"string\";\n    };\n  }\n\n  function Context(indented, column, type, align, prev) {\n    this.indented = indented;\n    this.column = column;\n    this.type = type;\n    this.align = align;\n    this.prev = prev;\n  }\n  function pushContext(state, col, type) {\n    var indent = state.indented;\n    if (state.context && state.context.type == \"statement\")\n      indent = state.context.indented;\n    return state.context = new Context(indent, col, type, null, state.context);\n  }\n  function popContext(state) {\n    var t = state.context.type;\n    if (t == \")\" || t == \"]\" || t == \"}\")\n      state.indented = state.context.indented;\n    return state.context = state.context.prev;\n  }\n\n  //Interface\n  return {\n    startState: function() {\n      return {\n        tokenize: null,\n        context: new Context(-2, 0, \"top\", false),\n        indented: 0,\n        startOfLine: true\n      };\n    },\n\n    token: function(stream, state) {\n      var ctx = state.context;\n      if (stream.sol()) {\n        if (ctx.align == null) ctx.align = false;\n        state.indented = stream.indentation();\n        state.startOfLine = true;\n      }\n      if (stream.eatSpace()) return null;\n      curPunc = null;\n      var style = (state.tokenize || tokenBase)(stream, state);\n      if (style == \"comment\") return style;\n      if (ctx.align == null) ctx.align = true;\n\n      if ((curPunc == \";\" || curPunc == \":\" || curPunc == \",\")\n          && ctx.type == \"statement\"){\n        popContext(state);\n      }\n      else if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n      else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n      else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n      else if (curPunc == \"}\") {\n        while (ctx.type == \"statement\") ctx = popContext(state);\n        if (ctx.type == \"}\") ctx = popContext(state);\n        while (ctx.type == \"statement\") ctx = popContext(state);\n      }\n      else if (curPunc == ctx.type) popContext(state);\n      else if (indentStatements && (((ctx.type == \"}\" || ctx.type == \"top\")\n                                     && curPunc != ';') || (ctx.type == \"statement\"\n                                                            && curPunc == \"newstatement\")))\n        pushContext(state, stream.column(), \"statement\");\n\n      state.startOfLine = false;\n      return style;\n    },\n\n    languageData: {\n      indentOnInput: /^\\s*[{}]$/,\n      commentTokens: {line: \"--\"}\n    }\n  };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvYXNuMS5qcz9jMDExIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBLGNBQWM7QUFDZCxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHlDQUF5QztBQUNyRTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRCxxREFBcUQ7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZCQUE2QjtBQUM3QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL0Bjb2RlbWlycm9yL2xlZ2FjeS1tb2Rlcy9tb2RlL2FzbjEuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB3b3JkcyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9LCB3b3JkcyA9IHN0ci5zcGxpdChcIiBcIik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyArK2kpIG9ialt3b3Jkc1tpXV0gPSB0cnVlO1xuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAga2V5d29yZHM6IHdvcmRzKFwiREVGSU5JVElPTlMgT0JKRUNUUyBJRiBERVJJVkVEIElORk9STUFUSU9OIEFDVElPTlwiICtcbiAgICAgICAgICAgICAgICAgIFwiIFJFUExZIEFOWSBOQU1FRCBDSEFSQUNURVJJWkVEIEJFSEFWSU9VUiBSRUdJU1RFUkVEXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgV0lUSCBBUyBJREVOVElGSUVEIENPTlNUUkFJTkVEIEJZIFBSRVNFTlQgQkVHSU5cIiArXG4gICAgICAgICAgICAgICAgICBcIiBJTVBPUlRTIEZST00gVU5JVFMgU1lOVEFYIE1JTi1BQ0NFU1MgTUFYLUFDQ0VTU1wiICtcbiAgICAgICAgICAgICAgICAgIFwiIE1JTkFDQ0VTUyBNQVhBQ0NFU1MgUkVWSVNJT04gU1RBVFVTIERFU0NSSVBUSU9OXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgU0VRVUVOQ0UgU0VUIENPTVBPTkVOVFMgT0YgQ0hPSUNFIERpc3Rpbmd1aXNoZWROYW1lXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgRU5VTUVSQVRFRCBTSVpFIE1PRFVMRSBFTkQgSU5ERVggQVVHTUVOVFMgRVhURU5TSUJJTElUWVwiICtcbiAgICAgICAgICAgICAgICAgIFwiIElNUExJRUQgRVhQT1JUU1wiKSxcbiAgY21pcFZlcmJzOiB3b3JkcyhcIkFDVElPTlMgQUREIEdFVCBOT1RJRklDQVRJT05TIFJFUExBQ0UgUkVNT1ZFXCIpLFxuICBjb21wYXJlVHlwZXM6IHdvcmRzKFwiT1BUSU9OQUwgREVGQVVMVCBNQU5BR0VEIE1PRFVMRS1UWVBFIE1PRFVMRV9JREVOVElUWVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIiBNT0RVTEUtQ09NUExJQU5DRSBPQkpFQ1QtVFlQRSBPQkpFQ1QtSURFTlRJVFlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCIgT0JKRUNULUNPTVBMSUFOQ0UgTU9ERSBDT05GSVJNRUQgQ09ORElUSU9OQUxcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCIgU1VCT1JESU5BVEUgU1VQRVJJT1IgQ0xBU1MgVFJVRSBGQUxTRSBOVUxMXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiIFRFWFRVQUwtQ09OVkVOVElPTlwiKSxcbiAgc3RhdHVzOiB3b3JkcyhcImN1cnJlbnQgZGVwcmVjYXRlZCBtYW5kYXRvcnkgb2Jzb2xldGVcIiksXG4gIHRhZ3M6IHdvcmRzKFwiQVBQTElDQVRJT04gQVVUT01BVElDIEVYUExJQ0lUIElNUExJQ0lUIFBSSVZBVEUgVEFHU1wiICtcbiAgICAgICAgICAgICAgXCIgVU5JVkVSU0FMXCIpLFxuICBzdG9yYWdlOiB3b3JkcyhcIkJPT0xFQU4gSU5URUdFUiBPQkpFQ1QgSURFTlRJRklFUiBCSVQgT0NURVQgU1RSSU5HXCIgK1xuICAgICAgICAgICAgICAgICBcIiBVVENUaW1lIEludGVyZmFjZUluZGV4IElBTkFpZlR5cGUgQ01JUC1BdHRyaWJ1dGVcIiArXG4gICAgICAgICAgICAgICAgIFwiIFJFQUwgUEFDS0FHRSBQQUNLQUdFUyBJcEFkZHJlc3MgUGh5c0FkZHJlc3NcIiArXG4gICAgICAgICAgICAgICAgIFwiIE5ldHdvcmtBZGRyZXNzIEJJVFMgQk1QU3RyaW5nIFRpbWVTdGFtcCBUaW1lVGlja3NcIiArXG4gICAgICAgICAgICAgICAgIFwiIFRydXRoVmFsdWUgUm93U3RhdHVzIERpc3BsYXlTdHJpbmcgR2VuZXJhbFN0cmluZ1wiICtcbiAgICAgICAgICAgICAgICAgXCIgR3JhcGhpY1N0cmluZyBJQTVTdHJpbmcgTnVtZXJpY1N0cmluZ1wiICtcbiAgICAgICAgICAgICAgICAgXCIgUHJpbnRhYmxlU3RyaW5nIFNubXBBZG1pblN0cmluZyBUZWxldGV4U3RyaW5nXCIgK1xuICAgICAgICAgICAgICAgICBcIiBVVEY4U3RyaW5nIFZpZGVvdGV4U3RyaW5nIFZpc2libGVTdHJpbmcgU3RyaW5nU3RvcmVcIiArXG4gICAgICAgICAgICAgICAgIFwiIElTTzY0NlN0cmluZyBUNjFTdHJpbmcgVW5pdmVyc2FsU3RyaW5nIFVuc2lnbmVkMzJcIiArXG4gICAgICAgICAgICAgICAgIFwiIEludGVnZXIzMiBHYXVnZSBHYXVnZTMyIENvdW50ZXIgQ291bnRlcjMyIENvdW50ZXI2NFwiKSxcbiAgbW9kaWZpZXI6IHdvcmRzKFwiQVRUUklCVVRFIEFUVFJJQlVURVMgTUFOREFUT1JZLUdST1VQIE1BTkRBVE9SWS1HUk9VUFNcIiArXG4gICAgICAgICAgICAgICAgICBcIiBHUk9VUCBHUk9VUFMgRUxFTUVOVFMgRVFVQUxJVFkgT1JERVJJTkcgU1VCU1RSSU5HU1wiICtcbiAgICAgICAgICAgICAgICAgIFwiIERFRklORURcIiksXG4gIGFjY2Vzc1R5cGVzOiB3b3JkcyhcIm5vdC1hY2Nlc3NpYmxlIGFjY2Vzc2libGUtZm9yLW5vdGlmeSByZWFkLW9ubHlcIiArXG4gICAgICAgICAgICAgICAgICAgICBcIiByZWFkLWNyZWF0ZSByZWFkLXdyaXRlXCIpLFxuICBtdWx0aUxpbmVTdHJpbmdzOiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc24xKHBhcnNlckNvbmZpZykge1xuICB2YXIga2V5d29yZHMgPSBwYXJzZXJDb25maWcua2V5d29yZHMgfHwgZGVmYXVsdHMua2V5d29yZHMsXG4gICAgICBjbWlwVmVyYnMgPSBwYXJzZXJDb25maWcuY21pcFZlcmJzIHx8IGRlZmF1bHRzLmNtaXBWZXJicyxcbiAgICAgIGNvbXBhcmVUeXBlcyA9IHBhcnNlckNvbmZpZy5jb21wYXJlVHlwZXMgfHwgZGVmYXVsdHMuY29tcGFyZVR5cGVzLFxuICAgICAgc3RhdHVzID0gcGFyc2VyQ29uZmlnLnN0YXR1cyB8fCBkZWZhdWx0cy5zdGF0dXMsXG4gICAgICB0YWdzID0gcGFyc2VyQ29uZmlnLnRhZ3MgfHwgZGVmYXVsdHMudGFncyxcbiAgICAgIHN0b3JhZ2UgPSBwYXJzZXJDb25maWcuc3RvcmFnZSB8fCBkZWZhdWx0cy5zdG9yYWdlLFxuICAgICAgbW9kaWZpZXIgPSBwYXJzZXJDb25maWcubW9kaWZpZXIgfHwgZGVmYXVsdHMubW9kaWZpZXIsXG4gICAgICBhY2Nlc3NUeXBlcyA9IHBhcnNlckNvbmZpZy5hY2Nlc3NUeXBlc3x8IGRlZmF1bHRzLmFjY2Vzc1R5cGVzLFxuICAgICAgbXVsdGlMaW5lU3RyaW5ncyA9IHBhcnNlckNvbmZpZy5tdWx0aUxpbmVTdHJpbmdzIHx8IGRlZmF1bHRzLm11bHRpTGluZVN0cmluZ3MsXG4gICAgICBpbmRlbnRTdGF0ZW1lbnRzID0gcGFyc2VyQ29uZmlnLmluZGVudFN0YXRlbWVudHMgIT09IGZhbHNlO1xuICB2YXIgaXNPcGVyYXRvckNoYXIgPSAvW1xcfFxcXl0vO1xuICB2YXIgY3VyUHVuYztcblxuICBmdW5jdGlvbiB0b2tlbkJhc2Uoc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG4gICAgaWYgKGNoID09ICdcIicgfHwgY2ggPT0gXCInXCIpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5TdHJpbmcoY2gpO1xuICAgICAgcmV0dXJuIHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICAgIH1cbiAgICBpZiAoL1tcXFtcXF1cXChcXCl7fTo9LDtdLy50ZXN0KGNoKSkge1xuICAgICAgY3VyUHVuYyA9IGNoO1xuICAgICAgcmV0dXJuIFwicHVuY3R1YXRpb25cIjtcbiAgICB9XG4gICAgaWYgKGNoID09IFwiLVwiKXtcbiAgICAgIGlmIChzdHJlYW0uZWF0KFwiLVwiKSkge1xuICAgICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKC9cXGQvLnRlc3QoY2gpKSB7XG4gICAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXC5dLyk7XG4gICAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgICB9XG4gICAgaWYgKGlzT3BlcmF0b3JDaGFyLnRlc3QoY2gpKSB7XG4gICAgICBzdHJlYW0uZWF0V2hpbGUoaXNPcGVyYXRvckNoYXIpO1xuICAgICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgICB9XG5cbiAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXC1dLyk7XG4gICAgdmFyIGN1ciA9IHN0cmVhbS5jdXJyZW50KCk7XG4gICAgaWYgKGtleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImtleXdvcmRcIjtcbiAgICBpZiAoY21pcFZlcmJzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcInZhcmlhYmxlTmFtZVwiO1xuICAgIGlmIChjb21wYXJlVHlwZXMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiYXRvbVwiO1xuICAgIGlmIChzdGF0dXMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgIGlmICh0YWdzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcInR5cGVOYW1lXCI7XG4gICAgaWYgKHN0b3JhZ2UucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwibW9kaWZpZXJcIjtcbiAgICBpZiAobW9kaWZpZXIucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwibW9kaWZpZXJcIjtcbiAgICBpZiAoYWNjZXNzVHlwZXMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwibW9kaWZpZXJcIjtcblxuICAgIHJldHVybiBcInZhcmlhYmxlTmFtZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9rZW5TdHJpbmcocXVvdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgbmV4dCwgZW5kID0gZmFsc2U7XG4gICAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChuZXh0ID09IHF1b3RlICYmICFlc2NhcGVkKXtcbiAgICAgICAgICB2YXIgYWZ0ZXJOZXh0ID0gc3RyZWFtLnBlZWsoKTtcbiAgICAgICAgICAvL2xvb2sgaWYgdGhlIGNoYXJhY3RlciBpZiB0aGUgcXVvdGUgaXMgbGlrZSB0aGUgQiBpbiAnMTAxMDAwMTAnQlxuICAgICAgICAgIGlmIChhZnRlck5leHQpe1xuICAgICAgICAgICAgYWZ0ZXJOZXh0ID0gYWZ0ZXJOZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihhZnRlck5leHQgPT0gXCJiXCIgfHwgYWZ0ZXJOZXh0ID09IFwiaFwiIHx8IGFmdGVyTmV4dCA9PSBcIm9cIilcbiAgICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW5kID0gdHJ1ZTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkICYmIG5leHQgPT0gXCJcXFxcXCI7XG4gICAgICB9XG4gICAgICBpZiAoZW5kIHx8ICEoZXNjYXBlZCB8fCBtdWx0aUxpbmVTdHJpbmdzKSlcbiAgICAgICAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQoaW5kZW50ZWQsIGNvbHVtbiwgdHlwZSwgYWxpZ24sIHByZXYpIHtcbiAgICB0aGlzLmluZGVudGVkID0gaW5kZW50ZWQ7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmFsaWduID0gYWxpZ247XG4gICAgdGhpcy5wcmV2ID0gcHJldjtcbiAgfVxuICBmdW5jdGlvbiBwdXNoQ29udGV4dChzdGF0ZSwgY29sLCB0eXBlKSB7XG4gICAgdmFyIGluZGVudCA9IHN0YXRlLmluZGVudGVkO1xuICAgIGlmIChzdGF0ZS5jb250ZXh0ICYmIHN0YXRlLmNvbnRleHQudHlwZSA9PSBcInN0YXRlbWVudFwiKVxuICAgICAgaW5kZW50ID0gc3RhdGUuY29udGV4dC5pbmRlbnRlZDtcbiAgICByZXR1cm4gc3RhdGUuY29udGV4dCA9IG5ldyBDb250ZXh0KGluZGVudCwgY29sLCB0eXBlLCBudWxsLCBzdGF0ZS5jb250ZXh0KTtcbiAgfVxuICBmdW5jdGlvbiBwb3BDb250ZXh0KHN0YXRlKSB7XG4gICAgdmFyIHQgPSBzdGF0ZS5jb250ZXh0LnR5cGU7XG4gICAgaWYgKHQgPT0gXCIpXCIgfHwgdCA9PSBcIl1cIiB8fCB0ID09IFwifVwiKVxuICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkO1xuICAgIHJldHVybiBzdGF0ZS5jb250ZXh0ID0gc3RhdGUuY29udGV4dC5wcmV2O1xuICB9XG5cbiAgLy9JbnRlcmZhY2VcbiAgcmV0dXJuIHtcbiAgICBzdGFydFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuaXplOiBudWxsLFxuICAgICAgICBjb250ZXh0OiBuZXcgQ29udGV4dCgtMiwgMCwgXCJ0b3BcIiwgZmFsc2UpLFxuICAgICAgICBpbmRlbnRlZDogMCxcbiAgICAgICAgc3RhcnRPZkxpbmU6IHRydWVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgICB2YXIgY3R4ID0gc3RhdGUuY29udGV4dDtcbiAgICAgIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAgICAgaWYgKGN0eC5hbGlnbiA9PSBudWxsKSBjdHguYWxpZ24gPSBmYWxzZTtcbiAgICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICAgICAgc3RhdGUuc3RhcnRPZkxpbmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICAgIGN1clB1bmMgPSBudWxsO1xuICAgICAgdmFyIHN0eWxlID0gKHN0YXRlLnRva2VuaXplIHx8IHRva2VuQmFzZSkoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICBpZiAoc3R5bGUgPT0gXCJjb21tZW50XCIpIHJldHVybiBzdHlsZTtcbiAgICAgIGlmIChjdHguYWxpZ24gPT0gbnVsbCkgY3R4LmFsaWduID0gdHJ1ZTtcblxuICAgICAgaWYgKChjdXJQdW5jID09IFwiO1wiIHx8IGN1clB1bmMgPT0gXCI6XCIgfHwgY3VyUHVuYyA9PSBcIixcIilcbiAgICAgICAgICAmJiBjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKXtcbiAgICAgICAgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjdXJQdW5jID09IFwie1wiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIn1cIik7XG4gICAgICBlbHNlIGlmIChjdXJQdW5jID09IFwiW1wiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIl1cIik7XG4gICAgICBlbHNlIGlmIChjdXJQdW5jID09IFwiKFwiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIilcIik7XG4gICAgICBlbHNlIGlmIChjdXJQdW5jID09IFwifVwiKSB7XG4gICAgICAgIHdoaWxlIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICAgICAgaWYgKGN0eC50eXBlID09IFwifVwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICAgICAgd2hpbGUgKGN0eC50eXBlID09IFwic3RhdGVtZW50XCIpIGN0eCA9IHBvcENvbnRleHQoc3RhdGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBjdHgudHlwZSkgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgICBlbHNlIGlmIChpbmRlbnRTdGF0ZW1lbnRzICYmICgoKGN0eC50eXBlID09IFwifVwiIHx8IGN0eC50eXBlID09IFwidG9wXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY3VyUHVuYyAhPSAnOycpIHx8IChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBjdXJQdW5jID09IFwibmV3c3RhdGVtZW50XCIpKSlcbiAgICAgICAgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCJzdGF0ZW1lbnRcIik7XG5cbiAgICAgIHN0YXRlLnN0YXJ0T2ZMaW5lID0gZmFsc2U7XG4gICAgICByZXR1cm4gc3R5bGU7XG4gICAgfSxcblxuICAgIGxhbmd1YWdlRGF0YToge1xuICAgICAgaW5kZW50T25JbnB1dDogL15cXHMqW3t9XSQvLFxuICAgICAgY29tbWVudFRva2Vuczoge2xpbmU6IFwiLS1cIn1cbiAgICB9XG4gIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/asn1.js\n");

/***/ })

}]);