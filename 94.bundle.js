(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[94],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/ttcn-cfg.js":
/*!****************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/ttcn-cfg.js ***!
  \****************************************************************/
/*! exports provided: ttcnCfg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ttcnCfg\", function() { return ttcnCfg; });\nfunction words(str) {\n  var obj = {}, words = str.split(\" \");\n  for (var i = 0; i < words.length; ++i)\n    obj[words[i]] = true;\n  return obj;\n}\n\nconst parserConfig = {\n  name: \"ttcn-cfg\",\n  keywords: words(\"Yes No LogFile FileMask ConsoleMask AppendFile\" +\n                  \" TimeStampFormat LogEventTypes SourceInfoFormat\" +\n                  \" LogEntityName LogSourceInfo DiskFullAction\" +\n                  \" LogFileNumber LogFileSize MatchingHints Detailed\" +\n                  \" Compact SubCategories Stack Single None Seconds\" +\n                  \" DateTime Time Stop Error Retry Delete TCPPort KillTimer\" +\n                  \" NumHCs UnixSocketsEnabled LocalAddress\"),\n  fileNCtrlMaskOptions: words(\"TTCN_EXECUTOR TTCN_ERROR TTCN_WARNING\" +\n                              \" TTCN_PORTEVENT TTCN_TIMEROP TTCN_VERDICTOP\" +\n                              \" TTCN_DEFAULTOP TTCN_TESTCASE TTCN_ACTION\" +\n                              \" TTCN_USER TTCN_FUNCTION TTCN_STATISTICS\" +\n                              \" TTCN_PARALLEL TTCN_MATCHING TTCN_DEBUG\" +\n                              \" EXECUTOR ERROR WARNING PORTEVENT TIMEROP\" +\n                              \" VERDICTOP DEFAULTOP TESTCASE ACTION USER\" +\n                              \" FUNCTION STATISTICS PARALLEL MATCHING DEBUG\" +\n                              \" LOG_ALL LOG_NOTHING ACTION_UNQUALIFIED\" +\n                              \" DEBUG_ENCDEC DEBUG_TESTPORT\" +\n                              \" DEBUG_UNQUALIFIED DEFAULTOP_ACTIVATE\" +\n                              \" DEFAULTOP_DEACTIVATE DEFAULTOP_EXIT\" +\n                              \" DEFAULTOP_UNQUALIFIED ERROR_UNQUALIFIED\" +\n                              \" EXECUTOR_COMPONENT EXECUTOR_CONFIGDATA\" +\n                              \" EXECUTOR_EXTCOMMAND EXECUTOR_LOGOPTIONS\" +\n                              \" EXECUTOR_RUNTIME EXECUTOR_UNQUALIFIED\" +\n                              \" FUNCTION_RND FUNCTION_UNQUALIFIED\" +\n                              \" MATCHING_DONE MATCHING_MCSUCCESS\" +\n                              \" MATCHING_MCUNSUCC MATCHING_MMSUCCESS\" +\n                              \" MATCHING_MMUNSUCC MATCHING_PCSUCCESS\" +\n                              \" MATCHING_PCUNSUCC MATCHING_PMSUCCESS\" +\n                              \" MATCHING_PMUNSUCC MATCHING_PROBLEM\" +\n                              \" MATCHING_TIMEOUT MATCHING_UNQUALIFIED\" +\n                              \" PARALLEL_PORTCONN PARALLEL_PORTMAP\" +\n                              \" PARALLEL_PTC PARALLEL_UNQUALIFIED\" +\n                              \" PORTEVENT_DUALRECV PORTEVENT_DUALSEND\" +\n                              \" PORTEVENT_MCRECV PORTEVENT_MCSEND\" +\n                              \" PORTEVENT_MMRECV PORTEVENT_MMSEND\" +\n                              \" PORTEVENT_MQUEUE PORTEVENT_PCIN\" +\n                              \" PORTEVENT_PCOUT PORTEVENT_PMIN\" +\n                              \" PORTEVENT_PMOUT PORTEVENT_PQUEUE\" +\n                              \" PORTEVENT_STATE PORTEVENT_UNQUALIFIED\" +\n                              \" STATISTICS_UNQUALIFIED STATISTICS_VERDICT\" +\n                              \" TESTCASE_FINISH TESTCASE_START\" +\n                              \" TESTCASE_UNQUALIFIED TIMEROP_GUARD\" +\n                              \" TIMEROP_READ TIMEROP_START TIMEROP_STOP\" +\n                              \" TIMEROP_TIMEOUT TIMEROP_UNQUALIFIED\" +\n                              \" USER_UNQUALIFIED VERDICTOP_FINAL\" +\n                              \" VERDICTOP_GETVERDICT VERDICTOP_SETVERDICT\" +\n                              \" VERDICTOP_UNQUALIFIED WARNING_UNQUALIFIED\"),\n  externalCommands: words(\"BeginControlPart EndControlPart BeginTestCase\" +\n                          \" EndTestCase\"),\n  multiLineStrings: true\n}\n\nvar keywords = parserConfig.keywords,\n    fileNCtrlMaskOptions = parserConfig.fileNCtrlMaskOptions,\n    externalCommands = parserConfig.externalCommands,\n    multiLineStrings = parserConfig.multiLineStrings,\n    indentStatements = parserConfig.indentStatements !== false;\nvar isOperatorChar = /[\\|]/;\nvar curPunc;\n\nfunction tokenBase(stream, state) {\n  var ch = stream.next();\n  if (ch == '\"' || ch == \"'\") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  if (/[:=]/.test(ch)) {\n    curPunc = ch;\n    return \"punctuation\";\n  }\n  if (ch == \"#\"){\n    stream.skipToEnd();\n    return \"comment\";\n  }\n  if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w\\.]/);\n    return \"number\";\n  }\n  if (isOperatorChar.test(ch)) {\n    stream.eatWhile(isOperatorChar);\n    return \"operator\";\n  }\n  if (ch == \"[\"){\n    stream.eatWhile(/[\\w_\\]]/);\n    return \"number\";\n  }\n\n  stream.eatWhile(/[\\w\\$_]/);\n  var cur = stream.current();\n  if (keywords.propertyIsEnumerable(cur)) return \"keyword\";\n  if (fileNCtrlMaskOptions.propertyIsEnumerable(cur))\n    return \"atom\";\n  if (externalCommands.propertyIsEnumerable(cur)) return \"deleted\";\n\n  return \"variable\";\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, next, end = false;\n    while ((next = stream.next()) != null) {\n      if (next == quote && !escaped){\n        var afterNext = stream.peek();\n        //look if the character if the quote is like the B in '10100010'B\n        if (afterNext){\n          afterNext = afterNext.toLowerCase();\n          if(afterNext == \"b\" || afterNext == \"h\" || afterNext == \"o\")\n            stream.next();\n        }\n        end = true; break;\n      }\n      escaped = !escaped && next == \"\\\\\";\n    }\n    if (end || !(escaped || multiLineStrings))\n      state.tokenize = null;\n    return \"string\";\n  };\n}\n\nfunction Context(indented, column, type, align, prev) {\n  this.indented = indented;\n  this.column = column;\n  this.type = type;\n  this.align = align;\n  this.prev = prev;\n}\nfunction pushContext(state, col, type) {\n  var indent = state.indented;\n  if (state.context && state.context.type == \"statement\")\n    indent = state.context.indented;\n  return state.context = new Context(indent, col, type, null, state.context);\n}\nfunction popContext(state) {\n  var t = state.context.type;\n  if (t == \")\" || t == \"]\" || t == \"}\")\n    state.indented = state.context.indented;\n  return state.context = state.context.prev;\n}\n\n//Interface\nconst ttcnCfg = {\n  startState: function() {\n    return {\n      tokenize: null,\n      context: new Context(0, 0, \"top\", false),\n      indented: 0,\n      startOfLine: true\n    };\n  },\n\n  token: function(stream, state) {\n    var ctx = state.context;\n    if (stream.sol()) {\n      if (ctx.align == null) ctx.align = false;\n      state.indented = stream.indentation();\n      state.startOfLine = true;\n    }\n    if (stream.eatSpace()) return null;\n    curPunc = null;\n    var style = (state.tokenize || tokenBase)(stream, state);\n    if (style == \"comment\") return style;\n    if (ctx.align == null) ctx.align = true;\n\n    if ((curPunc == \";\" || curPunc == \":\" || curPunc == \",\")\n        && ctx.type == \"statement\"){\n      popContext(state);\n    }\n    else if (curPunc == \"{\") pushContext(state, stream.column(), \"}\");\n    else if (curPunc == \"[\") pushContext(state, stream.column(), \"]\");\n    else if (curPunc == \"(\") pushContext(state, stream.column(), \")\");\n    else if (curPunc == \"}\") {\n      while (ctx.type == \"statement\") ctx = popContext(state);\n      if (ctx.type == \"}\") ctx = popContext(state);\n      while (ctx.type == \"statement\") ctx = popContext(state);\n    }\n    else if (curPunc == ctx.type) popContext(state);\n    else if (indentStatements && (((ctx.type == \"}\" || ctx.type == \"top\")\n                                   && curPunc != ';') || (ctx.type == \"statement\"\n                                                          && curPunc == \"newstatement\")))\n      pushContext(state, stream.column(), \"statement\");\n    state.startOfLine = false;\n    return style;\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*[{}]$/,\n    commentTokens: {line: \"#\"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdHRjbi1jZmcuanM/NmY5MyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQSxjQUFjO0FBQ2QsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix5Q0FBeUM7QUFDbkU7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDJCQUEyQjtBQUMzQixvQkFBb0I7QUFDcEI7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AY29kZW1pcnJvci9sZWdhY3ktbW9kZXMvbW9kZS90dGNuLWNmZy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSlcbiAgICBvYmpbd29yZHNbaV1dID0gdHJ1ZTtcbiAgcmV0dXJuIG9iajtcbn1cblxuY29uc3QgcGFyc2VyQ29uZmlnID0ge1xuICBuYW1lOiBcInR0Y24tY2ZnXCIsXG4gIGtleXdvcmRzOiB3b3JkcyhcIlllcyBObyBMb2dGaWxlIEZpbGVNYXNrIENvbnNvbGVNYXNrIEFwcGVuZEZpbGVcIiArXG4gICAgICAgICAgICAgICAgICBcIiBUaW1lU3RhbXBGb3JtYXQgTG9nRXZlbnRUeXBlcyBTb3VyY2VJbmZvRm9ybWF0XCIgK1xuICAgICAgICAgICAgICAgICAgXCIgTG9nRW50aXR5TmFtZSBMb2dTb3VyY2VJbmZvIERpc2tGdWxsQWN0aW9uXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgTG9nRmlsZU51bWJlciBMb2dGaWxlU2l6ZSBNYXRjaGluZ0hpbnRzIERldGFpbGVkXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgQ29tcGFjdCBTdWJDYXRlZ29yaWVzIFN0YWNrIFNpbmdsZSBOb25lIFNlY29uZHNcIiArXG4gICAgICAgICAgICAgICAgICBcIiBEYXRlVGltZSBUaW1lIFN0b3AgRXJyb3IgUmV0cnkgRGVsZXRlIFRDUFBvcnQgS2lsbFRpbWVyXCIgK1xuICAgICAgICAgICAgICAgICAgXCIgTnVtSENzIFVuaXhTb2NrZXRzRW5hYmxlZCBMb2NhbEFkZHJlc3NcIiksXG4gIGZpbGVOQ3RybE1hc2tPcHRpb25zOiB3b3JkcyhcIlRUQ05fRVhFQ1VUT1IgVFRDTl9FUlJPUiBUVENOX1dBUk5JTkdcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBUVENOX1BPUlRFVkVOVCBUVENOX1RJTUVST1AgVFRDTl9WRVJESUNUT1BcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBUVENOX0RFRkFVTFRPUCBUVENOX1RFU1RDQVNFIFRUQ05fQUNUSU9OXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgVFRDTl9VU0VSIFRUQ05fRlVOQ1RJT04gVFRDTl9TVEFUSVNUSUNTXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgVFRDTl9QQVJBTExFTCBUVENOX01BVENISU5HIFRUQ05fREVCVUdcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBFWEVDVVRPUiBFUlJPUiBXQVJOSU5HIFBPUlRFVkVOVCBUSU1FUk9QXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgVkVSRElDVE9QIERFRkFVTFRPUCBURVNUQ0FTRSBBQ1RJT04gVVNFUlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIEZVTkNUSU9OIFNUQVRJU1RJQ1MgUEFSQUxMRUwgTUFUQ0hJTkcgREVCVUdcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBMT0dfQUxMIExPR19OT1RISU5HIEFDVElPTl9VTlFVQUxJRklFRFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIERFQlVHX0VOQ0RFQyBERUJVR19URVNUUE9SVFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIERFQlVHX1VOUVVBTElGSUVEIERFRkFVTFRPUF9BQ1RJVkFURVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIERFRkFVTFRPUF9ERUFDVElWQVRFIERFRkFVTFRPUF9FWElUXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgREVGQVVMVE9QX1VOUVVBTElGSUVEIEVSUk9SX1VOUVVBTElGSUVEXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgRVhFQ1VUT1JfQ09NUE9ORU5UIEVYRUNVVE9SX0NPTkZJR0RBVEFcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBFWEVDVVRPUl9FWFRDT01NQU5EIEVYRUNVVE9SX0xPR09QVElPTlNcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBFWEVDVVRPUl9SVU5USU1FIEVYRUNVVE9SX1VOUVVBTElGSUVEXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgRlVOQ1RJT05fUk5EIEZVTkNUSU9OX1VOUVVBTElGSUVEXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgTUFUQ0hJTkdfRE9ORSBNQVRDSElOR19NQ1NVQ0NFU1NcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBNQVRDSElOR19NQ1VOU1VDQyBNQVRDSElOR19NTVNVQ0NFU1NcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBNQVRDSElOR19NTVVOU1VDQyBNQVRDSElOR19QQ1NVQ0NFU1NcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBNQVRDSElOR19QQ1VOU1VDQyBNQVRDSElOR19QTVNVQ0NFU1NcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBNQVRDSElOR19QTVVOU1VDQyBNQVRDSElOR19QUk9CTEVNXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgTUFUQ0hJTkdfVElNRU9VVCBNQVRDSElOR19VTlFVQUxJRklFRFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFBBUkFMTEVMX1BPUlRDT05OIFBBUkFMTEVMX1BPUlRNQVBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBQQVJBTExFTF9QVEMgUEFSQUxMRUxfVU5RVUFMSUZJRURcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBQT1JURVZFTlRfRFVBTFJFQ1YgUE9SVEVWRU5UX0RVQUxTRU5EXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgUE9SVEVWRU5UX01DUkVDViBQT1JURVZFTlRfTUNTRU5EXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgUE9SVEVWRU5UX01NUkVDViBQT1JURVZFTlRfTU1TRU5EXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgUE9SVEVWRU5UX01RVUVVRSBQT1JURVZFTlRfUENJTlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFBPUlRFVkVOVF9QQ09VVCBQT1JURVZFTlRfUE1JTlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFBPUlRFVkVOVF9QTU9VVCBQT1JURVZFTlRfUFFVRVVFXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgUE9SVEVWRU5UX1NUQVRFIFBPUlRFVkVOVF9VTlFVQUxJRklFRFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFNUQVRJU1RJQ1NfVU5RVUFMSUZJRUQgU1RBVElTVElDU19WRVJESUNUXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgVEVTVENBU0VfRklOSVNIIFRFU1RDQVNFX1NUQVJUXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgVEVTVENBU0VfVU5RVUFMSUZJRUQgVElNRVJPUF9HVUFSRFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFRJTUVST1BfUkVBRCBUSU1FUk9QX1NUQVJUIFRJTUVST1BfU1RPUFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFRJTUVST1BfVElNRU9VVCBUSU1FUk9QX1VOUVVBTElGSUVEXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgVVNFUl9VTlFVQUxJRklFRCBWRVJESUNUT1BfRklOQUxcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBWRVJESUNUT1BfR0VUVkVSRElDVCBWRVJESUNUT1BfU0VUVkVSRElDVFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFZFUkRJQ1RPUF9VTlFVQUxJRklFRCBXQVJOSU5HX1VOUVVBTElGSUVEXCIpLFxuICBleHRlcm5hbENvbW1hbmRzOiB3b3JkcyhcIkJlZ2luQ29udHJvbFBhcnQgRW5kQ29udHJvbFBhcnQgQmVnaW5UZXN0Q2FzZVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgRW5kVGVzdENhc2VcIiksXG4gIG11bHRpTGluZVN0cmluZ3M6IHRydWVcbn1cblxudmFyIGtleXdvcmRzID0gcGFyc2VyQ29uZmlnLmtleXdvcmRzLFxuICAgIGZpbGVOQ3RybE1hc2tPcHRpb25zID0gcGFyc2VyQ29uZmlnLmZpbGVOQ3RybE1hc2tPcHRpb25zLFxuICAgIGV4dGVybmFsQ29tbWFuZHMgPSBwYXJzZXJDb25maWcuZXh0ZXJuYWxDb21tYW5kcyxcbiAgICBtdWx0aUxpbmVTdHJpbmdzID0gcGFyc2VyQ29uZmlnLm11bHRpTGluZVN0cmluZ3MsXG4gICAgaW5kZW50U3RhdGVtZW50cyA9IHBhcnNlckNvbmZpZy5pbmRlbnRTdGF0ZW1lbnRzICE9PSBmYWxzZTtcbnZhciBpc09wZXJhdG9yQ2hhciA9IC9bXFx8XS87XG52YXIgY3VyUHVuYztcblxuZnVuY3Rpb24gdG9rZW5CYXNlKHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoID09ICdcIicgfHwgY2ggPT0gXCInXCIpIHtcbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuU3RyaW5nKGNoKTtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgaWYgKC9bOj1dLy50ZXN0KGNoKSkge1xuICAgIGN1clB1bmMgPSBjaDtcbiAgICByZXR1cm4gXCJwdW5jdHVhdGlvblwiO1xuICB9XG4gIGlmIChjaCA9PSBcIiNcIil7XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfVxuICBpZiAoL1xcZC8udGVzdChjaCkpIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXC5dLyk7XG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gIH1cbiAgaWYgKGlzT3BlcmF0b3JDaGFyLnRlc3QoY2gpKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKGlzT3BlcmF0b3JDaGFyKTtcbiAgICByZXR1cm4gXCJvcGVyYXRvclwiO1xuICB9XG4gIGlmIChjaCA9PSBcIltcIil7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3X1xcXV0vKTtcbiAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgfVxuXG4gIHN0cmVhbS5lYXRXaGlsZSgvW1xcd1xcJF9dLyk7XG4gIHZhciBjdXIgPSBzdHJlYW0uY3VycmVudCgpO1xuICBpZiAoa2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkgcmV0dXJuIFwia2V5d29yZFwiO1xuICBpZiAoZmlsZU5DdHJsTWFza09wdGlvbnMucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSlcbiAgICByZXR1cm4gXCJhdG9tXCI7XG4gIGlmIChleHRlcm5hbENvbW1hbmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHJldHVybiBcImRlbGV0ZWRcIjtcblxuICByZXR1cm4gXCJ2YXJpYWJsZVwiO1xufVxuXG5mdW5jdGlvbiB0b2tlblN0cmluZyhxdW90ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIG5leHQsIGVuZCA9IGZhbHNlO1xuICAgIHdoaWxlICgobmV4dCA9IHN0cmVhbS5uZXh0KCkpICE9IG51bGwpIHtcbiAgICAgIGlmIChuZXh0ID09IHF1b3RlICYmICFlc2NhcGVkKXtcbiAgICAgICAgdmFyIGFmdGVyTmV4dCA9IHN0cmVhbS5wZWVrKCk7XG4gICAgICAgIC8vbG9vayBpZiB0aGUgY2hhcmFjdGVyIGlmIHRoZSBxdW90ZSBpcyBsaWtlIHRoZSBCIGluICcxMDEwMDAxMCdCXG4gICAgICAgIGlmIChhZnRlck5leHQpe1xuICAgICAgICAgIGFmdGVyTmV4dCA9IGFmdGVyTmV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmKGFmdGVyTmV4dCA9PSBcImJcIiB8fCBhZnRlck5leHQgPT0gXCJoXCIgfHwgYWZ0ZXJOZXh0ID09IFwib1wiKVxuICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbmQgPSB0cnVlOyBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgIH1cbiAgICBpZiAoZW5kIHx8ICEoZXNjYXBlZCB8fCBtdWx0aUxpbmVTdHJpbmdzKSlcbiAgICAgIHN0YXRlLnRva2VuaXplID0gbnVsbDtcbiAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gQ29udGV4dChpbmRlbnRlZCwgY29sdW1uLCB0eXBlLCBhbGlnbiwgcHJldikge1xuICB0aGlzLmluZGVudGVkID0gaW5kZW50ZWQ7XG4gIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmFsaWduID0gYWxpZ247XG4gIHRoaXMucHJldiA9IHByZXY7XG59XG5mdW5jdGlvbiBwdXNoQ29udGV4dChzdGF0ZSwgY29sLCB0eXBlKSB7XG4gIHZhciBpbmRlbnQgPSBzdGF0ZS5pbmRlbnRlZDtcbiAgaWYgKHN0YXRlLmNvbnRleHQgJiYgc3RhdGUuY29udGV4dC50eXBlID09IFwic3RhdGVtZW50XCIpXG4gICAgaW5kZW50ID0gc3RhdGUuY29udGV4dC5pbmRlbnRlZDtcbiAgcmV0dXJuIHN0YXRlLmNvbnRleHQgPSBuZXcgQ29udGV4dChpbmRlbnQsIGNvbCwgdHlwZSwgbnVsbCwgc3RhdGUuY29udGV4dCk7XG59XG5mdW5jdGlvbiBwb3BDb250ZXh0KHN0YXRlKSB7XG4gIHZhciB0ID0gc3RhdGUuY29udGV4dC50eXBlO1xuICBpZiAodCA9PSBcIilcIiB8fCB0ID09IFwiXVwiIHx8IHQgPT0gXCJ9XCIpXG4gICAgc3RhdGUuaW5kZW50ZWQgPSBzdGF0ZS5jb250ZXh0LmluZGVudGVkO1xuICByZXR1cm4gc3RhdGUuY29udGV4dCA9IHN0YXRlLmNvbnRleHQucHJldjtcbn1cblxuLy9JbnRlcmZhY2VcbmV4cG9ydCBjb25zdCB0dGNuQ2ZnID0ge1xuICBzdGFydFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW5pemU6IG51bGwsXG4gICAgICBjb250ZXh0OiBuZXcgQ29udGV4dCgwLCAwLCBcInRvcFwiLCBmYWxzZSksXG4gICAgICBpbmRlbnRlZDogMCxcbiAgICAgIHN0YXJ0T2ZMaW5lOiB0cnVlXG4gICAgfTtcbiAgfSxcblxuICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBjdHggPSBzdGF0ZS5jb250ZXh0O1xuICAgIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAgIGlmIChjdHguYWxpZ24gPT0gbnVsbCkgY3R4LmFsaWduID0gZmFsc2U7XG4gICAgICBzdGF0ZS5pbmRlbnRlZCA9IHN0cmVhbS5pbmRlbnRhdGlvbigpO1xuICAgICAgc3RhdGUuc3RhcnRPZkxpbmUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLmVhdFNwYWNlKCkpIHJldHVybiBudWxsO1xuICAgIGN1clB1bmMgPSBudWxsO1xuICAgIHZhciBzdHlsZSA9IChzdGF0ZS50b2tlbml6ZSB8fCB0b2tlbkJhc2UpKHN0cmVhbSwgc3RhdGUpO1xuICAgIGlmIChzdHlsZSA9PSBcImNvbW1lbnRcIikgcmV0dXJuIHN0eWxlO1xuICAgIGlmIChjdHguYWxpZ24gPT0gbnVsbCkgY3R4LmFsaWduID0gdHJ1ZTtcblxuICAgIGlmICgoY3VyUHVuYyA9PSBcIjtcIiB8fCBjdXJQdW5jID09IFwiOlwiIHx8IGN1clB1bmMgPT0gXCIsXCIpXG4gICAgICAgICYmIGN0eC50eXBlID09IFwic3RhdGVtZW50XCIpe1xuICAgICAgcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCJ7XCIpIHB1c2hDb250ZXh0KHN0YXRlLCBzdHJlYW0uY29sdW1uKCksIFwifVwiKTtcbiAgICBlbHNlIGlmIChjdXJQdW5jID09IFwiW1wiKSBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcIl1cIik7XG4gICAgZWxzZSBpZiAoY3VyUHVuYyA9PSBcIihcIikgcHVzaENvbnRleHQoc3RhdGUsIHN0cmVhbS5jb2x1bW4oKSwgXCIpXCIpO1xuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gXCJ9XCIpIHtcbiAgICAgIHdoaWxlIChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiKSBjdHggPSBwb3BDb250ZXh0KHN0YXRlKTtcbiAgICAgIGlmIChjdHgudHlwZSA9PSBcIn1cIikgY3R4ID0gcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgICB3aGlsZSAoY3R4LnR5cGUgPT0gXCJzdGF0ZW1lbnRcIikgY3R4ID0gcG9wQ29udGV4dChzdGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1clB1bmMgPT0gY3R4LnR5cGUpIHBvcENvbnRleHQoc3RhdGUpO1xuICAgIGVsc2UgaWYgKGluZGVudFN0YXRlbWVudHMgJiYgKCgoY3R4LnR5cGUgPT0gXCJ9XCIgfHwgY3R4LnR5cGUgPT0gXCJ0b3BcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY3VyUHVuYyAhPSAnOycpIHx8IChjdHgudHlwZSA9PSBcInN0YXRlbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY3VyUHVuYyA9PSBcIm5ld3N0YXRlbWVudFwiKSkpXG4gICAgICBwdXNoQ29udGV4dChzdGF0ZSwgc3RyZWFtLmNvbHVtbigpLCBcInN0YXRlbWVudFwiKTtcbiAgICBzdGF0ZS5zdGFydE9mTGluZSA9IGZhbHNlO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfSxcblxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBpbmRlbnRPbklucHV0OiAvXlxccypbe31dJC8sXG4gICAgY29tbWVudFRva2Vuczoge2xpbmU6IFwiI1wifVxuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/ttcn-cfg.js\n");

/***/ })

}]);