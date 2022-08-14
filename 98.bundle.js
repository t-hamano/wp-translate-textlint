(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[98],{

/***/ "./node_modules/@codemirror/legacy-modes/mode/vbscript.js":
/*!****************************************************************!*\
  !*** ./node_modules/@codemirror/legacy-modes/mode/vbscript.js ***!
  \****************************************************************/
/*! exports provided: vbScript, vbScriptASP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vbScript\", function() { return vbScript; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vbScriptASP\", function() { return vbScriptASP; });\nfunction mkVBScript(parserConf) {\n    var ERRORCLASS = 'error';\n\n    function wordRegexp(words) {\n        return new RegExp(\"^((\" + words.join(\")|(\") + \"))\\\\b\", \"i\");\n    }\n\n    var singleOperators = new RegExp(\"^[\\\\+\\\\-\\\\*/&\\\\\\\\\\\\^<>=]\");\n    var doubleOperators = new RegExp(\"^((<>)|(<=)|(>=))\");\n    var singleDelimiters = new RegExp('^[\\\\.,]');\n    var brackets = new RegExp('^[\\\\(\\\\)]');\n    var identifiers = new RegExp(\"^[A-Za-z][_A-Za-z0-9]*\");\n\n    var openingKeywords = ['class','sub','select','while','if','function', 'property', 'with', 'for'];\n    var middleKeywords = ['else','elseif','case'];\n    var endKeywords = ['next','loop','wend'];\n\n    var wordOperators = wordRegexp(['and', 'or', 'not', 'xor', 'is', 'mod', 'eqv', 'imp']);\n    var commonkeywords = ['dim', 'redim', 'then',  'until', 'randomize',\n                          'byval','byref','new','property', 'exit', 'in',\n                          'const','private', 'public',\n                          'get','set','let', 'stop', 'on error resume next', 'on error goto 0', 'option explicit', 'call', 'me'];\n\n    //This list was from: http://msdn.microsoft.com/en-us/library/f8tbc79x(v=vs.84).aspx\n    var atomWords = ['true', 'false', 'nothing', 'empty', 'null'];\n    //This list was from: http://msdn.microsoft.com/en-us/library/3ca8tfek(v=vs.84).aspx\n    var builtinFuncsWords = ['abs', 'array', 'asc', 'atn', 'cbool', 'cbyte', 'ccur', 'cdate', 'cdbl', 'chr', 'cint', 'clng', 'cos', 'csng', 'cstr', 'date', 'dateadd', 'datediff', 'datepart',\n                        'dateserial', 'datevalue', 'day', 'escape', 'eval', 'execute', 'exp', 'filter', 'formatcurrency', 'formatdatetime', 'formatnumber', 'formatpercent', 'getlocale', 'getobject',\n                        'getref', 'hex', 'hour', 'inputbox', 'instr', 'instrrev', 'int', 'fix', 'isarray', 'isdate', 'isempty', 'isnull', 'isnumeric', 'isobject', 'join', 'lbound', 'lcase', 'left',\n                        'len', 'loadpicture', 'log', 'ltrim', 'rtrim', 'trim', 'maths', 'mid', 'minute', 'month', 'monthname', 'msgbox', 'now', 'oct', 'replace', 'rgb', 'right', 'rnd', 'round',\n                        'scriptengine', 'scriptenginebuildversion', 'scriptenginemajorversion', 'scriptengineminorversion', 'second', 'setlocale', 'sgn', 'sin', 'space', 'split', 'sqr', 'strcomp',\n                        'string', 'strreverse', 'tan', 'time', 'timer', 'timeserial', 'timevalue', 'typename', 'ubound', 'ucase', 'unescape', 'vartype', 'weekday', 'weekdayname', 'year'];\n\n    //This list was from: http://msdn.microsoft.com/en-us/library/ydz4cfk3(v=vs.84).aspx\n    var builtinConsts = ['vbBlack', 'vbRed', 'vbGreen', 'vbYellow', 'vbBlue', 'vbMagenta', 'vbCyan', 'vbWhite', 'vbBinaryCompare', 'vbTextCompare',\n                         'vbSunday', 'vbMonday', 'vbTuesday', 'vbWednesday', 'vbThursday', 'vbFriday', 'vbSaturday', 'vbUseSystemDayOfWeek', 'vbFirstJan1', 'vbFirstFourDays', 'vbFirstFullWeek',\n                         'vbGeneralDate', 'vbLongDate', 'vbShortDate', 'vbLongTime', 'vbShortTime', 'vbObjectError',\n                         'vbOKOnly', 'vbOKCancel', 'vbAbortRetryIgnore', 'vbYesNoCancel', 'vbYesNo', 'vbRetryCancel', 'vbCritical', 'vbQuestion', 'vbExclamation', 'vbInformation', 'vbDefaultButton1', 'vbDefaultButton2',\n                         'vbDefaultButton3', 'vbDefaultButton4', 'vbApplicationModal', 'vbSystemModal', 'vbOK', 'vbCancel', 'vbAbort', 'vbRetry', 'vbIgnore', 'vbYes', 'vbNo',\n                         'vbCr', 'VbCrLf', 'vbFormFeed', 'vbLf', 'vbNewLine', 'vbNullChar', 'vbNullString', 'vbTab', 'vbVerticalTab', 'vbUseDefault', 'vbTrue', 'vbFalse',\n                         'vbEmpty', 'vbNull', 'vbInteger', 'vbLong', 'vbSingle', 'vbDouble', 'vbCurrency', 'vbDate', 'vbString', 'vbObject', 'vbError', 'vbBoolean', 'vbVariant', 'vbDataObject', 'vbDecimal', 'vbByte', 'vbArray'];\n    //This list was from: http://msdn.microsoft.com/en-us/library/hkc375ea(v=vs.84).aspx\n    var builtinObjsWords = ['WScript', 'err', 'debug', 'RegExp'];\n    var knownProperties = ['description', 'firstindex', 'global', 'helpcontext', 'helpfile', 'ignorecase', 'length', 'number', 'pattern', 'source', 'value', 'count'];\n    var knownMethods = ['clear', 'execute', 'raise', 'replace', 'test', 'write', 'writeline', 'close', 'open', 'state', 'eof', 'update', 'addnew', 'end', 'createobject', 'quit'];\n\n    var aspBuiltinObjsWords = ['server', 'response', 'request', 'session', 'application'];\n    var aspKnownProperties = ['buffer', 'cachecontrol', 'charset', 'contenttype', 'expires', 'expiresabsolute', 'isclientconnected', 'pics', 'status', //response\n                              'clientcertificate', 'cookies', 'form', 'querystring', 'servervariables', 'totalbytes', //request\n                              'contents', 'staticobjects', //application\n                              'codepage', 'lcid', 'sessionid', 'timeout', //session\n                              'scripttimeout']; //server\n    var aspKnownMethods = ['addheader', 'appendtolog', 'binarywrite', 'end', 'flush', 'redirect', //response\n                           'binaryread', //request\n                           'remove', 'removeall', 'lock', 'unlock', //application\n                           'abandon', //session\n                           'getlasterror', 'htmlencode', 'mappath', 'transfer', 'urlencode']; //server\n\n    var knownWords = knownMethods.concat(knownProperties);\n\n    builtinObjsWords = builtinObjsWords.concat(builtinConsts);\n\n    if (parserConf.isASP){\n        builtinObjsWords = builtinObjsWords.concat(aspBuiltinObjsWords);\n        knownWords = knownWords.concat(aspKnownMethods, aspKnownProperties);\n    };\n\n    var keywords = wordRegexp(commonkeywords);\n    var atoms = wordRegexp(atomWords);\n    var builtinFuncs = wordRegexp(builtinFuncsWords);\n    var builtinObjs = wordRegexp(builtinObjsWords);\n    var known = wordRegexp(knownWords);\n    var stringPrefixes = '\"';\n\n    var opening = wordRegexp(openingKeywords);\n    var middle = wordRegexp(middleKeywords);\n    var closing = wordRegexp(endKeywords);\n    var doubleClosing = wordRegexp(['end']);\n    var doOpening = wordRegexp(['do']);\n    var noIndentWords = wordRegexp(['on error resume next', 'exit']);\n    var comment = wordRegexp(['rem']);\n\n\n    function indent(_stream, state) {\n      state.currentIndent++;\n    }\n\n    function dedent(_stream, state) {\n      state.currentIndent--;\n    }\n    // tokenizers\n    function tokenBase(stream, state) {\n        if (stream.eatSpace()) {\n            return null\n            //return null;\n        }\n\n        var ch = stream.peek();\n\n        // Handle Comments\n        if (ch === \"'\") {\n            stream.skipToEnd();\n            return 'comment';\n        }\n        if (stream.match(comment)){\n            stream.skipToEnd();\n            return 'comment';\n        }\n\n\n        // Handle Number Literals\n        if (stream.match(/^((&H)|(&O))?[0-9\\.]/i, false) && !stream.match(/^((&H)|(&O))?[0-9\\.]+[a-z_]/i, false)) {\n            var floatLiteral = false;\n            // Floats\n            if (stream.match(/^\\d*\\.\\d+/i)) { floatLiteral = true; }\n            else if (stream.match(/^\\d+\\.\\d*/)) { floatLiteral = true; }\n            else if (stream.match(/^\\.\\d+/)) { floatLiteral = true; }\n\n            if (floatLiteral) {\n                // Float literals may be \"imaginary\"\n                stream.eat(/J/i);\n                return 'number';\n            }\n            // Integers\n            var intLiteral = false;\n            // Hex\n            if (stream.match(/^&H[0-9a-f]+/i)) { intLiteral = true; }\n            // Octal\n            else if (stream.match(/^&O[0-7]+/i)) { intLiteral = true; }\n            // Decimal\n            else if (stream.match(/^[1-9]\\d*F?/)) {\n                // Decimal literals may be \"imaginary\"\n                stream.eat(/J/i);\n                // TODO - Can you have imaginary longs?\n                intLiteral = true;\n            }\n            // Zero by itself with no other piece of number.\n            else if (stream.match(/^0(?![\\dx])/i)) { intLiteral = true; }\n            if (intLiteral) {\n                // Integer literals may be \"long\"\n                stream.eat(/L/i);\n                return 'number';\n            }\n        }\n\n        // Handle Strings\n        if (stream.match(stringPrefixes)) {\n            state.tokenize = tokenStringFactory(stream.current());\n            return state.tokenize(stream, state);\n        }\n\n        // Handle operators and Delimiters\n        if (stream.match(doubleOperators)\n            || stream.match(singleOperators)\n            || stream.match(wordOperators)) {\n            return 'operator';\n        }\n        if (stream.match(singleDelimiters)) {\n            return null;\n        }\n\n        if (stream.match(brackets)) {\n            return \"bracket\";\n        }\n\n        if (stream.match(noIndentWords)) {\n            state.doInCurrentLine = true;\n\n            return 'keyword';\n        }\n\n        if (stream.match(doOpening)) {\n            indent(stream,state);\n            state.doInCurrentLine = true;\n\n            return 'keyword';\n        }\n        if (stream.match(opening)) {\n            if (! state.doInCurrentLine)\n              indent(stream,state);\n            else\n              state.doInCurrentLine = false;\n\n            return 'keyword';\n        }\n        if (stream.match(middle)) {\n            return 'keyword';\n        }\n\n\n        if (stream.match(doubleClosing)) {\n            dedent(stream,state);\n            dedent(stream,state);\n\n            return 'keyword';\n        }\n        if (stream.match(closing)) {\n            if (! state.doInCurrentLine)\n              dedent(stream,state);\n            else\n              state.doInCurrentLine = false;\n\n            return 'keyword';\n        }\n\n        if (stream.match(keywords)) {\n            return 'keyword';\n        }\n\n        if (stream.match(atoms)) {\n            return 'atom';\n        }\n\n        if (stream.match(known)) {\n            return 'variableName.special';\n        }\n\n        if (stream.match(builtinFuncs)) {\n            return 'builtin';\n        }\n\n        if (stream.match(builtinObjs)){\n            return 'builtin';\n        }\n\n        if (stream.match(identifiers)) {\n            return 'variable';\n        }\n\n        // Handle non-detected items\n        stream.next();\n        return ERRORCLASS;\n    }\n\n    function tokenStringFactory(delimiter) {\n        var singleline = delimiter.length == 1;\n        var OUTCLASS = 'string';\n\n        return function(stream, state) {\n            while (!stream.eol()) {\n                stream.eatWhile(/[^'\"]/);\n                if (stream.match(delimiter)) {\n                    state.tokenize = tokenBase;\n                    return OUTCLASS;\n                } else {\n                    stream.eat(/['\"]/);\n                }\n            }\n            if (singleline) {\n              state.tokenize = tokenBase;\n            }\n            return OUTCLASS;\n        };\n    }\n\n\n    function tokenLexer(stream, state) {\n        var style = state.tokenize(stream, state);\n        var current = stream.current();\n\n        // Handle '.' connected identifiers\n        if (current === '.') {\n            style = state.tokenize(stream, state);\n\n            current = stream.current();\n            if (style && (style.substr(0, 8) === 'variable' || style==='builtin' || style==='keyword')){//|| knownWords.indexOf(current.substring(1)) > -1) {\n                if (style === 'builtin' || style === 'keyword') style='variable';\n                if (knownWords.indexOf(current.substr(1)) > -1) style='keyword';\n\n                return style;\n            } else {\n                return ERRORCLASS;\n            }\n        }\n\n        return style;\n    }\n\n    return {\n        startState: function() {\n            return {\n              tokenize: tokenBase,\n              lastToken: null,\n              currentIndent: 0,\n              nextLineIndent: 0,\n              doInCurrentLine: false,\n              ignoreKeyword: false\n\n\n          };\n        },\n\n        token: function(stream, state) {\n            if (stream.sol()) {\n              state.currentIndent += state.nextLineIndent;\n              state.nextLineIndent = 0;\n              state.doInCurrentLine = 0;\n            }\n            var style = tokenLexer(stream, state);\n\n            state.lastToken = {style:style, content: stream.current()};\n\n            if (style===null) style=null;\n\n            return style;\n        },\n\n        indent: function(state, textAfter, cx) {\n            var trueText = textAfter.replace(/^\\s+|\\s+$/g, '') ;\n            if (trueText.match(closing) || trueText.match(doubleClosing) || trueText.match(middle)) return cx.unit*(state.currentIndent-1);\n            if(state.currentIndent < 0) return 0;\n            return state.currentIndent * cx.unit\n        }\n\n    };\n};\n\nconst vbScript = mkVBScript({})\nconst vbScriptASP = mkVBScript({isASP: true})\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvdmJzY3JpcHQuanM/NzczMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUE2Rjs7QUFFN0Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMscUJBQXFCO0FBQ2xFLGlEQUFpRCxxQkFBcUI7QUFDdEUsOENBQThDLHFCQUFxQjs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtQkFBbUI7QUFDbkU7QUFDQSxrREFBa0QsbUJBQW1CO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsbUJBQW1CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdHQUF3RztBQUN4RztBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQjs7QUFFL0I7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPLDhCQUE4QjtBQUM5QixnQ0FBZ0MsWUFBWSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9AY29kZW1pcnJvci9sZWdhY3ktbW9kZXMvbW9kZS92YnNjcmlwdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG1rVkJTY3JpcHQocGFyc2VyQ29uZikge1xuICAgIHZhciBFUlJPUkNMQVNTID0gJ2Vycm9yJztcblxuICAgIGZ1bmN0aW9uIHdvcmRSZWdleHAod29yZHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKChcIiArIHdvcmRzLmpvaW4oXCIpfChcIikgKyBcIikpXFxcXGJcIiwgXCJpXCIpO1xuICAgIH1cblxuICAgIHZhciBzaW5nbGVPcGVyYXRvcnMgPSBuZXcgUmVnRXhwKFwiXltcXFxcK1xcXFwtXFxcXCovJlxcXFxcXFxcXFxcXF48Pj1dXCIpO1xuICAgIHZhciBkb3VibGVPcGVyYXRvcnMgPSBuZXcgUmVnRXhwKFwiXigoPD4pfCg8PSl8KD49KSlcIik7XG4gICAgdmFyIHNpbmdsZURlbGltaXRlcnMgPSBuZXcgUmVnRXhwKCdeW1xcXFwuLF0nKTtcbiAgICB2YXIgYnJhY2tldHMgPSBuZXcgUmVnRXhwKCdeW1xcXFwoXFxcXCldJyk7XG4gICAgdmFyIGlkZW50aWZpZXJzID0gbmV3IFJlZ0V4cChcIl5bQS1aYS16XVtfQS1aYS16MC05XSpcIik7XG5cbiAgICB2YXIgb3BlbmluZ0tleXdvcmRzID0gWydjbGFzcycsJ3N1YicsJ3NlbGVjdCcsJ3doaWxlJywnaWYnLCdmdW5jdGlvbicsICdwcm9wZXJ0eScsICd3aXRoJywgJ2ZvciddO1xuICAgIHZhciBtaWRkbGVLZXl3b3JkcyA9IFsnZWxzZScsJ2Vsc2VpZicsJ2Nhc2UnXTtcbiAgICB2YXIgZW5kS2V5d29yZHMgPSBbJ25leHQnLCdsb29wJywnd2VuZCddO1xuXG4gICAgdmFyIHdvcmRPcGVyYXRvcnMgPSB3b3JkUmVnZXhwKFsnYW5kJywgJ29yJywgJ25vdCcsICd4b3InLCAnaXMnLCAnbW9kJywgJ2VxdicsICdpbXAnXSk7XG4gICAgdmFyIGNvbW1vbmtleXdvcmRzID0gWydkaW0nLCAncmVkaW0nLCAndGhlbicsICAndW50aWwnLCAncmFuZG9taXplJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2J5dmFsJywnYnlyZWYnLCduZXcnLCdwcm9wZXJ0eScsICdleGl0JywgJ2luJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnN0JywncHJpdmF0ZScsICdwdWJsaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnZ2V0Jywnc2V0JywnbGV0JywgJ3N0b3AnLCAnb24gZXJyb3IgcmVzdW1lIG5leHQnLCAnb24gZXJyb3IgZ290byAwJywgJ29wdGlvbiBleHBsaWNpdCcsICdjYWxsJywgJ21lJ107XG5cbiAgICAvL1RoaXMgbGlzdCB3YXMgZnJvbTogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2Y4dGJjNzl4KHY9dnMuODQpLmFzcHhcbiAgICB2YXIgYXRvbVdvcmRzID0gWyd0cnVlJywgJ2ZhbHNlJywgJ25vdGhpbmcnLCAnZW1wdHknLCAnbnVsbCddO1xuICAgIC8vVGhpcyBsaXN0IHdhcyBmcm9tOiBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvM2NhOHRmZWsodj12cy44NCkuYXNweFxuICAgIHZhciBidWlsdGluRnVuY3NXb3JkcyA9IFsnYWJzJywgJ2FycmF5JywgJ2FzYycsICdhdG4nLCAnY2Jvb2wnLCAnY2J5dGUnLCAnY2N1cicsICdjZGF0ZScsICdjZGJsJywgJ2NocicsICdjaW50JywgJ2NsbmcnLCAnY29zJywgJ2NzbmcnLCAnY3N0cicsICdkYXRlJywgJ2RhdGVhZGQnLCAnZGF0ZWRpZmYnLCAnZGF0ZXBhcnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGVzZXJpYWwnLCAnZGF0ZXZhbHVlJywgJ2RheScsICdlc2NhcGUnLCAnZXZhbCcsICdleGVjdXRlJywgJ2V4cCcsICdmaWx0ZXInLCAnZm9ybWF0Y3VycmVuY3knLCAnZm9ybWF0ZGF0ZXRpbWUnLCAnZm9ybWF0bnVtYmVyJywgJ2Zvcm1hdHBlcmNlbnQnLCAnZ2V0bG9jYWxlJywgJ2dldG9iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZ2V0cmVmJywgJ2hleCcsICdob3VyJywgJ2lucHV0Ym94JywgJ2luc3RyJywgJ2luc3RycmV2JywgJ2ludCcsICdmaXgnLCAnaXNhcnJheScsICdpc2RhdGUnLCAnaXNlbXB0eScsICdpc251bGwnLCAnaXNudW1lcmljJywgJ2lzb2JqZWN0JywgJ2pvaW4nLCAnbGJvdW5kJywgJ2xjYXNlJywgJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xlbicsICdsb2FkcGljdHVyZScsICdsb2cnLCAnbHRyaW0nLCAncnRyaW0nLCAndHJpbScsICdtYXRocycsICdtaWQnLCAnbWludXRlJywgJ21vbnRoJywgJ21vbnRobmFtZScsICdtc2dib3gnLCAnbm93JywgJ29jdCcsICdyZXBsYWNlJywgJ3JnYicsICdyaWdodCcsICdybmQnLCAncm91bmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NjcmlwdGVuZ2luZScsICdzY3JpcHRlbmdpbmVidWlsZHZlcnNpb24nLCAnc2NyaXB0ZW5naW5lbWFqb3J2ZXJzaW9uJywgJ3NjcmlwdGVuZ2luZW1pbm9ydmVyc2lvbicsICdzZWNvbmQnLCAnc2V0bG9jYWxlJywgJ3NnbicsICdzaW4nLCAnc3BhY2UnLCAnc3BsaXQnLCAnc3FyJywgJ3N0cmNvbXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0cmluZycsICdzdHJyZXZlcnNlJywgJ3RhbicsICd0aW1lJywgJ3RpbWVyJywgJ3RpbWVzZXJpYWwnLCAndGltZXZhbHVlJywgJ3R5cGVuYW1lJywgJ3Vib3VuZCcsICd1Y2FzZScsICd1bmVzY2FwZScsICd2YXJ0eXBlJywgJ3dlZWtkYXknLCAnd2Vla2RheW5hbWUnLCAneWVhciddO1xuXG4gICAgLy9UaGlzIGxpc3Qgd2FzIGZyb206IGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS95ZHo0Y2ZrMyh2PXZzLjg0KS5hc3B4XG4gICAgdmFyIGJ1aWx0aW5Db25zdHMgPSBbJ3ZiQmxhY2snLCAndmJSZWQnLCAndmJHcmVlbicsICd2YlllbGxvdycsICd2YkJsdWUnLCAndmJNYWdlbnRhJywgJ3ZiQ3lhbicsICd2YldoaXRlJywgJ3ZiQmluYXJ5Q29tcGFyZScsICd2YlRleHRDb21wYXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAndmJTdW5kYXknLCAndmJNb25kYXknLCAndmJUdWVzZGF5JywgJ3ZiV2VkbmVzZGF5JywgJ3ZiVGh1cnNkYXknLCAndmJGcmlkYXknLCAndmJTYXR1cmRheScsICd2YlVzZVN5c3RlbURheU9mV2VlaycsICd2YkZpcnN0SmFuMScsICd2YkZpcnN0Rm91ckRheXMnLCAndmJGaXJzdEZ1bGxXZWVrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAndmJHZW5lcmFsRGF0ZScsICd2YkxvbmdEYXRlJywgJ3ZiU2hvcnREYXRlJywgJ3ZiTG9uZ1RpbWUnLCAndmJTaG9ydFRpbWUnLCAndmJPYmplY3RFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3ZiT0tPbmx5JywgJ3ZiT0tDYW5jZWwnLCAndmJBYm9ydFJldHJ5SWdub3JlJywgJ3ZiWWVzTm9DYW5jZWwnLCAndmJZZXNObycsICd2YlJldHJ5Q2FuY2VsJywgJ3ZiQ3JpdGljYWwnLCAndmJRdWVzdGlvbicsICd2YkV4Y2xhbWF0aW9uJywgJ3ZiSW5mb3JtYXRpb24nLCAndmJEZWZhdWx0QnV0dG9uMScsICd2YkRlZmF1bHRCdXR0b24yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAndmJEZWZhdWx0QnV0dG9uMycsICd2YkRlZmF1bHRCdXR0b240JywgJ3ZiQXBwbGljYXRpb25Nb2RhbCcsICd2YlN5c3RlbU1vZGFsJywgJ3ZiT0snLCAndmJDYW5jZWwnLCAndmJBYm9ydCcsICd2YlJldHJ5JywgJ3ZiSWdub3JlJywgJ3ZiWWVzJywgJ3ZiTm8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICd2YkNyJywgJ1ZiQ3JMZicsICd2YkZvcm1GZWVkJywgJ3ZiTGYnLCAndmJOZXdMaW5lJywgJ3ZiTnVsbENoYXInLCAndmJOdWxsU3RyaW5nJywgJ3ZiVGFiJywgJ3ZiVmVydGljYWxUYWInLCAndmJVc2VEZWZhdWx0JywgJ3ZiVHJ1ZScsICd2YkZhbHNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAndmJFbXB0eScsICd2Yk51bGwnLCAndmJJbnRlZ2VyJywgJ3ZiTG9uZycsICd2YlNpbmdsZScsICd2YkRvdWJsZScsICd2YkN1cnJlbmN5JywgJ3ZiRGF0ZScsICd2YlN0cmluZycsICd2Yk9iamVjdCcsICd2YkVycm9yJywgJ3ZiQm9vbGVhbicsICd2YlZhcmlhbnQnLCAndmJEYXRhT2JqZWN0JywgJ3ZiRGVjaW1hbCcsICd2YkJ5dGUnLCAndmJBcnJheSddO1xuICAgIC8vVGhpcyBsaXN0IHdhcyBmcm9tOiBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGtjMzc1ZWEodj12cy44NCkuYXNweFxuICAgIHZhciBidWlsdGluT2Jqc1dvcmRzID0gWydXU2NyaXB0JywgJ2VycicsICdkZWJ1ZycsICdSZWdFeHAnXTtcbiAgICB2YXIga25vd25Qcm9wZXJ0aWVzID0gWydkZXNjcmlwdGlvbicsICdmaXJzdGluZGV4JywgJ2dsb2JhbCcsICdoZWxwY29udGV4dCcsICdoZWxwZmlsZScsICdpZ25vcmVjYXNlJywgJ2xlbmd0aCcsICdudW1iZXInLCAncGF0dGVybicsICdzb3VyY2UnLCAndmFsdWUnLCAnY291bnQnXTtcbiAgICB2YXIga25vd25NZXRob2RzID0gWydjbGVhcicsICdleGVjdXRlJywgJ3JhaXNlJywgJ3JlcGxhY2UnLCAndGVzdCcsICd3cml0ZScsICd3cml0ZWxpbmUnLCAnY2xvc2UnLCAnb3BlbicsICdzdGF0ZScsICdlb2YnLCAndXBkYXRlJywgJ2FkZG5ldycsICdlbmQnLCAnY3JlYXRlb2JqZWN0JywgJ3F1aXQnXTtcblxuICAgIHZhciBhc3BCdWlsdGluT2Jqc1dvcmRzID0gWydzZXJ2ZXInLCAncmVzcG9uc2UnLCAncmVxdWVzdCcsICdzZXNzaW9uJywgJ2FwcGxpY2F0aW9uJ107XG4gICAgdmFyIGFzcEtub3duUHJvcGVydGllcyA9IFsnYnVmZmVyJywgJ2NhY2hlY29udHJvbCcsICdjaGFyc2V0JywgJ2NvbnRlbnR0eXBlJywgJ2V4cGlyZXMnLCAnZXhwaXJlc2Fic29sdXRlJywgJ2lzY2xpZW50Y29ubmVjdGVkJywgJ3BpY3MnLCAnc3RhdHVzJywgLy9yZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NsaWVudGNlcnRpZmljYXRlJywgJ2Nvb2tpZXMnLCAnZm9ybScsICdxdWVyeXN0cmluZycsICdzZXJ2ZXJ2YXJpYWJsZXMnLCAndG90YWxieXRlcycsIC8vcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnRzJywgJ3N0YXRpY29iamVjdHMnLCAvL2FwcGxpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29kZXBhZ2UnLCAnbGNpZCcsICdzZXNzaW9uaWQnLCAndGltZW91dCcsIC8vc2Vzc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NjcmlwdHRpbWVvdXQnXTsgLy9zZXJ2ZXJcbiAgICB2YXIgYXNwS25vd25NZXRob2RzID0gWydhZGRoZWFkZXInLCAnYXBwZW5kdG9sb2cnLCAnYmluYXJ5d3JpdGUnLCAnZW5kJywgJ2ZsdXNoJywgJ3JlZGlyZWN0JywgLy9yZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JpbmFyeXJlYWQnLCAvL3JlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZW1vdmUnLCAncmVtb3ZlYWxsJywgJ2xvY2snLCAndW5sb2NrJywgLy9hcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FiYW5kb24nLCAvL3Nlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdnZXRsYXN0ZXJyb3InLCAnaHRtbGVuY29kZScsICdtYXBwYXRoJywgJ3RyYW5zZmVyJywgJ3VybGVuY29kZSddOyAvL3NlcnZlclxuXG4gICAgdmFyIGtub3duV29yZHMgPSBrbm93bk1ldGhvZHMuY29uY2F0KGtub3duUHJvcGVydGllcyk7XG5cbiAgICBidWlsdGluT2Jqc1dvcmRzID0gYnVpbHRpbk9ianNXb3Jkcy5jb25jYXQoYnVpbHRpbkNvbnN0cyk7XG5cbiAgICBpZiAocGFyc2VyQ29uZi5pc0FTUCl7XG4gICAgICAgIGJ1aWx0aW5PYmpzV29yZHMgPSBidWlsdGluT2Jqc1dvcmRzLmNvbmNhdChhc3BCdWlsdGluT2Jqc1dvcmRzKTtcbiAgICAgICAga25vd25Xb3JkcyA9IGtub3duV29yZHMuY29uY2F0KGFzcEtub3duTWV0aG9kcywgYXNwS25vd25Qcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgdmFyIGtleXdvcmRzID0gd29yZFJlZ2V4cChjb21tb25rZXl3b3Jkcyk7XG4gICAgdmFyIGF0b21zID0gd29yZFJlZ2V4cChhdG9tV29yZHMpO1xuICAgIHZhciBidWlsdGluRnVuY3MgPSB3b3JkUmVnZXhwKGJ1aWx0aW5GdW5jc1dvcmRzKTtcbiAgICB2YXIgYnVpbHRpbk9ianMgPSB3b3JkUmVnZXhwKGJ1aWx0aW5PYmpzV29yZHMpO1xuICAgIHZhciBrbm93biA9IHdvcmRSZWdleHAoa25vd25Xb3Jkcyk7XG4gICAgdmFyIHN0cmluZ1ByZWZpeGVzID0gJ1wiJztcblxuICAgIHZhciBvcGVuaW5nID0gd29yZFJlZ2V4cChvcGVuaW5nS2V5d29yZHMpO1xuICAgIHZhciBtaWRkbGUgPSB3b3JkUmVnZXhwKG1pZGRsZUtleXdvcmRzKTtcbiAgICB2YXIgY2xvc2luZyA9IHdvcmRSZWdleHAoZW5kS2V5d29yZHMpO1xuICAgIHZhciBkb3VibGVDbG9zaW5nID0gd29yZFJlZ2V4cChbJ2VuZCddKTtcbiAgICB2YXIgZG9PcGVuaW5nID0gd29yZFJlZ2V4cChbJ2RvJ10pO1xuICAgIHZhciBub0luZGVudFdvcmRzID0gd29yZFJlZ2V4cChbJ29uIGVycm9yIHJlc3VtZSBuZXh0JywgJ2V4aXQnXSk7XG4gICAgdmFyIGNvbW1lbnQgPSB3b3JkUmVnZXhwKFsncmVtJ10pO1xuXG5cbiAgICBmdW5jdGlvbiBpbmRlbnQoX3N0cmVhbSwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWRlbnQoX3N0cmVhbSwgc3RhdGUpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQtLTtcbiAgICB9XG4gICAgLy8gdG9rZW5pemVyc1xuICAgIGZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIC8vcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2ggPSBzdHJlYW0ucGVlaygpO1xuXG4gICAgICAgIC8vIEhhbmRsZSBDb21tZW50c1xuICAgICAgICBpZiAoY2ggPT09IFwiJ1wiKSB7XG4gICAgICAgICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbW1lbnQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2goY29tbWVudCkpe1xuICAgICAgICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgICAgICAgcmV0dXJuICdjb21tZW50JztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gSGFuZGxlIE51bWJlciBMaXRlcmFsc1xuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKC9eKCgmSCl8KCZPKSk/WzAtOVxcLl0vaSwgZmFsc2UpICYmICFzdHJlYW0ubWF0Y2goL14oKCZIKXwoJk8pKT9bMC05XFwuXStbYS16X10vaSwgZmFsc2UpKSB7XG4gICAgICAgICAgICB2YXIgZmxvYXRMaXRlcmFsID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBGbG9hdHNcbiAgICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2goL15cXGQqXFwuXFxkKy9pKSkgeyBmbG9hdExpdGVyYWwgPSB0cnVlOyB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdHJlYW0ubWF0Y2goL15cXGQrXFwuXFxkKi8pKSB7IGZsb2F0TGl0ZXJhbCA9IHRydWU7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXlxcLlxcZCsvKSkgeyBmbG9hdExpdGVyYWwgPSB0cnVlOyB9XG5cbiAgICAgICAgICAgIGlmIChmbG9hdExpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBGbG9hdCBsaXRlcmFscyBtYXkgYmUgXCJpbWFnaW5hcnlcIlxuICAgICAgICAgICAgICAgIHN0cmVhbS5lYXQoL0ovaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW50ZWdlcnNcbiAgICAgICAgICAgIHZhciBpbnRMaXRlcmFsID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBIZXhcbiAgICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2goL14mSFswLTlhLWZdKy9pKSkgeyBpbnRMaXRlcmFsID0gdHJ1ZTsgfVxuICAgICAgICAgICAgLy8gT2N0YWxcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXiZPWzAtN10rL2kpKSB7IGludExpdGVyYWwgPSB0cnVlOyB9XG4gICAgICAgICAgICAvLyBEZWNpbWFsXG4gICAgICAgICAgICBlbHNlIGlmIChzdHJlYW0ubWF0Y2goL15bMS05XVxcZCpGPy8pKSB7XG4gICAgICAgICAgICAgICAgLy8gRGVjaW1hbCBsaXRlcmFscyBtYXkgYmUgXCJpbWFnaW5hcnlcIlxuICAgICAgICAgICAgICAgIHN0cmVhbS5lYXQoL0ovaSk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyAtIENhbiB5b3UgaGF2ZSBpbWFnaW5hcnkgbG9uZ3M/XG4gICAgICAgICAgICAgICAgaW50TGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBaZXJvIGJ5IGl0c2VsZiB3aXRoIG5vIG90aGVyIHBpZWNlIG9mIG51bWJlci5cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXjAoPyFbXFxkeF0pL2kpKSB7IGludExpdGVyYWwgPSB0cnVlOyB9XG4gICAgICAgICAgICBpZiAoaW50TGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIC8vIEludGVnZXIgbGl0ZXJhbHMgbWF5IGJlIFwibG9uZ1wiXG4gICAgICAgICAgICAgICAgc3RyZWFtLmVhdCgvTC9pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgU3RyaW5nc1xuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKHN0cmluZ1ByZWZpeGVzKSkge1xuICAgICAgICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZ0ZhY3Rvcnkoc3RyZWFtLmN1cnJlbnQoKSk7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgb3BlcmF0b3JzIGFuZCBEZWxpbWl0ZXJzXG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2goZG91YmxlT3BlcmF0b3JzKVxuICAgICAgICAgICAgfHwgc3RyZWFtLm1hdGNoKHNpbmdsZU9wZXJhdG9ycylcbiAgICAgICAgICAgIHx8IHN0cmVhbS5tYXRjaCh3b3JkT3BlcmF0b3JzKSkge1xuICAgICAgICAgICAgcmV0dXJuICdvcGVyYXRvcic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChzaW5nbGVEZWxpbWl0ZXJzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKGJyYWNrZXRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiYnJhY2tldFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChub0luZGVudFdvcmRzKSkge1xuICAgICAgICAgICAgc3RhdGUuZG9JbkN1cnJlbnRMaW5lID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuICdrZXl3b3JkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2goZG9PcGVuaW5nKSkge1xuICAgICAgICAgICAgaW5kZW50KHN0cmVhbSxzdGF0ZSk7XG4gICAgICAgICAgICBzdGF0ZS5kb0luQ3VycmVudExpbmUgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gJ2tleXdvcmQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2gob3BlbmluZykpIHtcbiAgICAgICAgICAgIGlmICghIHN0YXRlLmRvSW5DdXJyZW50TGluZSlcbiAgICAgICAgICAgICAgaW5kZW50KHN0cmVhbSxzdGF0ZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIHN0YXRlLmRvSW5DdXJyZW50TGluZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gJ2tleXdvcmQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2gobWlkZGxlKSkge1xuICAgICAgICAgICAgcmV0dXJuICdrZXl3b3JkJztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChkb3VibGVDbG9zaW5nKSkge1xuICAgICAgICAgICAgZGVkZW50KHN0cmVhbSxzdGF0ZSk7XG4gICAgICAgICAgICBkZWRlbnQoc3RyZWFtLHN0YXRlKTtcblxuICAgICAgICAgICAgcmV0dXJuICdrZXl3b3JkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKGNsb3NpbmcpKSB7XG4gICAgICAgICAgICBpZiAoISBzdGF0ZS5kb0luQ3VycmVudExpbmUpXG4gICAgICAgICAgICAgIGRlZGVudChzdHJlYW0sc3RhdGUpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBzdGF0ZS5kb0luQ3VycmVudExpbmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuICdrZXl3b3JkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJlYW0ubWF0Y2goa2V5d29yZHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2tleXdvcmQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChhdG9tcykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXRvbSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKGtub3duKSkge1xuICAgICAgICAgICAgcmV0dXJuICd2YXJpYWJsZU5hbWUuc3BlY2lhbCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKGJ1aWx0aW5GdW5jcykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYnVpbHRpbic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKGJ1aWx0aW5PYmpzKSl7XG4gICAgICAgICAgICByZXR1cm4gJ2J1aWx0aW4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChpZGVudGlmaWVycykpIHtcbiAgICAgICAgICAgIHJldHVybiAndmFyaWFibGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIG5vbi1kZXRlY3RlZCBpdGVtc1xuICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICByZXR1cm4gRVJST1JDTEFTUztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2tlblN0cmluZ0ZhY3RvcnkoZGVsaW1pdGVyKSB7XG4gICAgICAgIHZhciBzaW5nbGVsaW5lID0gZGVsaW1pdGVyLmxlbmd0aCA9PSAxO1xuICAgICAgICB2YXIgT1VUQ0xBU1MgPSAnc3RyaW5nJztcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtLCBzdGF0ZSkge1xuICAgICAgICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW0uZWF0V2hpbGUoL1teJ1wiXS8pO1xuICAgICAgICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2goZGVsaW1pdGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9VVENMQVNTO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5lYXQoL1snXCJdLyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpbmdsZWxpbmUpIHtcbiAgICAgICAgICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gT1VUQ0xBU1M7XG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0b2tlbkxleGVyKHN0cmVhbSwgc3RhdGUpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gc3RyZWFtLmN1cnJlbnQoKTtcblxuICAgICAgICAvLyBIYW5kbGUgJy4nIGNvbm5lY3RlZCBpZGVudGlmaWVyc1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gJy4nKSB7XG4gICAgICAgICAgICBzdHlsZSA9IHN0YXRlLnRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuXG4gICAgICAgICAgICBjdXJyZW50ID0gc3RyZWFtLmN1cnJlbnQoKTtcbiAgICAgICAgICAgIGlmIChzdHlsZSAmJiAoc3R5bGUuc3Vic3RyKDAsIDgpID09PSAndmFyaWFibGUnIHx8IHN0eWxlPT09J2J1aWx0aW4nIHx8IHN0eWxlPT09J2tleXdvcmQnKSl7Ly98fCBrbm93bldvcmRzLmluZGV4T2YoY3VycmVudC5zdWJzdHJpbmcoMSkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUgPT09ICdidWlsdGluJyB8fCBzdHlsZSA9PT0gJ2tleXdvcmQnKSBzdHlsZT0ndmFyaWFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChrbm93bldvcmRzLmluZGV4T2YoY3VycmVudC5zdWJzdHIoMSkpID4gLTEpIHN0eWxlPSdrZXl3b3JkJztcblxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVSUk9SQ0xBU1M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0b2tlbml6ZTogdG9rZW5CYXNlLFxuICAgICAgICAgICAgICBsYXN0VG9rZW46IG51bGwsXG4gICAgICAgICAgICAgIGN1cnJlbnRJbmRlbnQ6IDAsXG4gICAgICAgICAgICAgIG5leHRMaW5lSW5kZW50OiAwLFxuICAgICAgICAgICAgICBkb0luQ3VycmVudExpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICBpZ25vcmVLZXl3b3JkOiBmYWxzZVxuXG5cbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnRJbmRlbnQgKz0gc3RhdGUubmV4dExpbmVJbmRlbnQ7XG4gICAgICAgICAgICAgIHN0YXRlLm5leHRMaW5lSW5kZW50ID0gMDtcbiAgICAgICAgICAgICAgc3RhdGUuZG9JbkN1cnJlbnRMaW5lID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHRva2VuTGV4ZXIoc3RyZWFtLCBzdGF0ZSk7XG5cbiAgICAgICAgICAgIHN0YXRlLmxhc3RUb2tlbiA9IHtzdHlsZTpzdHlsZSwgY29udGVudDogc3RyZWFtLmN1cnJlbnQoKX07XG5cbiAgICAgICAgICAgIGlmIChzdHlsZT09PW51bGwpIHN0eWxlPW51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbmRlbnQ6IGZ1bmN0aW9uKHN0YXRlLCB0ZXh0QWZ0ZXIsIGN4KSB7XG4gICAgICAgICAgICB2YXIgdHJ1ZVRleHQgPSB0ZXh0QWZ0ZXIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIDtcbiAgICAgICAgICAgIGlmICh0cnVlVGV4dC5tYXRjaChjbG9zaW5nKSB8fCB0cnVlVGV4dC5tYXRjaChkb3VibGVDbG9zaW5nKSB8fCB0cnVlVGV4dC5tYXRjaChtaWRkbGUpKSByZXR1cm4gY3gudW5pdCooc3RhdGUuY3VycmVudEluZGVudC0xKTtcbiAgICAgICAgICAgIGlmKHN0YXRlLmN1cnJlbnRJbmRlbnQgPCAwKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5jdXJyZW50SW5kZW50ICogY3gudW5pdFxuICAgICAgICB9XG5cbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHZiU2NyaXB0ID0gbWtWQlNjcmlwdCh7fSlcbmV4cG9ydCBjb25zdCB2YlNjcmlwdEFTUCA9IG1rVkJTY3JpcHQoe2lzQVNQOiB0cnVlfSlcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@codemirror/legacy-modes/mode/vbscript.js\n");

/***/ })

}]);