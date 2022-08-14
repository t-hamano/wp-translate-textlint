(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{419:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });\nvar BUILTIN = "builtin", COMMENT = "comment", STRING = "string",\n    SYMBOL = "symbol", ATOM = "atom", NUMBER = "number", BRACKET = "bracket";\nvar INDENT_WORD_SKIP = 2;\n\nfunction makeKeywords(str) {\n  var obj = {}, words = str.split(" ");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\n\nvar keywords = makeKeywords("λ case-lambda call/cc class cond-expand define-class define-values exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax define-macro defmacro delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?");\nvar indentKeys = makeKeywords("define let letrec let* lambda define-macro defmacro let-syntax letrec-syntax let-values let*-values define-syntax syntax-rules define-values when unless");\n\nfunction stateStack(indent, type, prev) { // represents a state stack object\n  this.indent = indent;\n  this.type = type;\n  this.prev = prev;\n}\n\nfunction pushStack(state, indent, type) {\n  state.indentStack = new stateStack(indent, type, state.indentStack);\n}\n\nfunction popStack(state) {\n  state.indentStack = state.indentStack.prev;\n}\n\nvar binaryMatcher = new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\\/[01]+#*)?i|[-+]?[01]+#*(?:\\/[01]+#*)?@[-+]?[01]+#*(?:\\/[01]+#*)?|[-+]?[01]+#*(?:\\/[01]+#*)?[-+](?:[01]+#*(?:\\/[01]+#*)?)?i|[-+]?[01]+#*(?:\\/[01]+#*)?)(?=[()\\s;"]|$)/i);\nvar octalMatcher = new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\\/[0-7]+#*)?)(?=[()\\s;"]|$)/i);\nvar hexMatcher = new RegExp(/^(?:[-+]i|[-+][\\da-f]+#*(?:\\/[\\da-f]+#*)?i|[-+]?[\\da-f]+#*(?:\\/[\\da-f]+#*)?@[-+]?[\\da-f]+#*(?:\\/[\\da-f]+#*)?|[-+]?[\\da-f]+#*(?:\\/[\\da-f]+#*)?[-+](?:[\\da-f]+#*(?:\\/[\\da-f]+#*)?)?i|[-+]?[\\da-f]+#*(?:\\/[\\da-f]+#*)?)(?=[()\\s;"]|$)/i);\nvar decimalMatcher = new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\\d+#+\\.?#*|\\d+\\.\\d*#*|\\.\\d+#*|\\d+)(?:[esfdl][-+]?\\d+)?)|\\d+#*\\/\\d+#*)i|[-+]?(?:(?:(?:\\d+#+\\.?#*|\\d+\\.\\d*#*|\\.\\d+#*|\\d+)(?:[esfdl][-+]?\\d+)?)|\\d+#*\\/\\d+#*)@[-+]?(?:(?:(?:\\d+#+\\.?#*|\\d+\\.\\d*#*|\\.\\d+#*|\\d+)(?:[esfdl][-+]?\\d+)?)|\\d+#*\\/\\d+#*)|[-+]?(?:(?:(?:\\d+#+\\.?#*|\\d+\\.\\d*#*|\\.\\d+#*|\\d+)(?:[esfdl][-+]?\\d+)?)|\\d+#*\\/\\d+#*)[-+](?:(?:(?:\\d+#+\\.?#*|\\d+\\.\\d*#*|\\.\\d+#*|\\d+)(?:[esfdl][-+]?\\d+)?)|\\d+#*\\/\\d+#*)?i|(?:(?:(?:\\d+#+\\.?#*|\\d+\\.\\d*#*|\\.\\d+#*|\\d+)(?:[esfdl][-+]?\\d+)?)|\\d+#*\\/\\d+#*))(?=[()\\s;"]|$)/i);\n\nfunction isBinaryNumber (stream) {\n  return stream.match(binaryMatcher);\n}\n\nfunction isOctalNumber (stream) {\n  return stream.match(octalMatcher);\n}\n\nfunction isDecimalNumber (stream, backup) {\n  if (backup === true) {\n    stream.backUp(1);\n  }\n  return stream.match(decimalMatcher);\n}\n\nfunction isHexNumber (stream) {\n  return stream.match(hexMatcher);\n}\n\nfunction processEscapedSequence(stream, options) {\n  var next, escaped = false;\n  while ((next = stream.next()) != null) {\n    if (next == options.token && !escaped) {\n      options.state.mode = false;\n      break;\n    }\n    escaped = !escaped && next == "\\\\";\n  }\n}\n\nconst scheme = {\n  startState: function () {\n    return {\n      indentStack: null,\n      indentation: 0,\n      mode: false,\n      sExprComment: false,\n      sExprQuote: false\n    };\n  },\n\n  token: function (stream, state) {\n    if (state.indentStack == null && stream.sol()) {\n      // update indentation, but only if indentStack is empty\n      state.indentation = stream.indentation();\n    }\n\n    // skip spaces\n    if (stream.eatSpace()) {\n      return null;\n    }\n    var returnType = null;\n\n    switch(state.mode){\n    case "string": // multi-line string parsing mode\n      processEscapedSequence(stream, {\n        token: "\\"",\n        state: state\n      });\n      returnType = STRING; // continue on in scheme-string mode\n      break;\n    case "symbol": // escape symbol\n      processEscapedSequence(stream, {\n        token: "|",\n        state: state\n      });\n      returnType = SYMBOL; // continue on in scheme-symbol mode\n      break;\n    case "comment": // comment parsing mode\n      var next, maybeEnd = false;\n      while ((next = stream.next()) != null) {\n        if (next == "#" && maybeEnd) {\n\n          state.mode = false;\n          break;\n        }\n        maybeEnd = (next == "|");\n      }\n      returnType = COMMENT;\n      break;\n    case "s-expr-comment": // s-expr commenting mode\n      state.mode = false;\n      if(stream.peek() == "(" || stream.peek() == "["){\n        // actually start scheme s-expr commenting mode\n        state.sExprComment = 0;\n      }else{\n        // if not we just comment the entire of the next token\n        stream.eatWhile(/[^\\s\\(\\)\\[\\]]/); // eat symbol atom\n        returnType = COMMENT;\n        break;\n      }\n    default: // default parsing mode\n      var ch = stream.next();\n\n      if (ch == "\\"") {\n        state.mode = "string";\n        returnType = STRING;\n\n      } else if (ch == "\'") {\n        if (stream.peek() == "(" || stream.peek() == "["){\n          if (typeof state.sExprQuote != "number") {\n            state.sExprQuote = 0;\n          } // else already in a quoted expression\n          returnType = ATOM;\n        } else {\n          stream.eatWhile(/[\\w_\\-!$%&*+\\.\\/:<=>?@\\^~]/);\n          returnType = ATOM;\n        }\n      } else if (ch == \'|\') {\n        state.mode = "symbol";\n        returnType = SYMBOL;\n      } else if (ch == \'#\') {\n        if (stream.eat("|")) {                    // Multi-line comment\n          state.mode = "comment"; // toggle to comment mode\n          returnType = COMMENT;\n        } else if (stream.eat(/[tf]/i)) {            // #t/#f (atom)\n          returnType = ATOM;\n        } else if (stream.eat(\';\')) {                // S-Expr comment\n          state.mode = "s-expr-comment";\n          returnType = COMMENT;\n        } else {\n          var numTest = null, hasExactness = false, hasRadix = true;\n          if (stream.eat(/[ei]/i)) {\n            hasExactness = true;\n          } else {\n            stream.backUp(1);       // must be radix specifier\n          }\n          if (stream.match(/^#b/i)) {\n            numTest = isBinaryNumber;\n          } else if (stream.match(/^#o/i)) {\n            numTest = isOctalNumber;\n          } else if (stream.match(/^#x/i)) {\n            numTest = isHexNumber;\n          } else if (stream.match(/^#d/i)) {\n            numTest = isDecimalNumber;\n          } else if (stream.match(/^[-+0-9.]/, false)) {\n            hasRadix = false;\n            numTest = isDecimalNumber;\n            // re-consume the initial # if all matches failed\n          } else if (!hasExactness) {\n            stream.eat(\'#\');\n          }\n          if (numTest != null) {\n            if (hasRadix && !hasExactness) {\n              // consume optional exactness after radix\n              stream.match(/^#[ei]/i);\n            }\n            if (numTest(stream))\n              returnType = NUMBER;\n          }\n        }\n      } else if (/^[-+0-9.]/.test(ch) && isDecimalNumber(stream, true)) { // match non-prefixed number, must be decimal\n        returnType = NUMBER;\n      } else if (ch == ";") { // comment\n        stream.skipToEnd(); // rest of the line is a comment\n        returnType = COMMENT;\n      } else if (ch == "(" || ch == "[") {\n        var keyWord = \'\'; var indentTemp = stream.column(), letter;\n        /**\n           Either\n           (indent-word ..\n           (non-indent-word ..\n           (;something else, bracket, etc.\n        */\n\n        while ((letter = stream.eat(/[^\\s\\(\\[\\;\\)\\]]/)) != null) {\n          keyWord += letter;\n        }\n\n        if (keyWord.length > 0 && indentKeys.propertyIsEnumerable(keyWord)) { // indent-word\n\n          pushStack(state, indentTemp + INDENT_WORD_SKIP, ch);\n        } else { // non-indent word\n          // we continue eating the spaces\n          stream.eatSpace();\n          if (stream.eol() || stream.peek() == ";") {\n            // nothing significant after\n            // we restart indentation 1 space after\n            pushStack(state, indentTemp + 1, ch);\n          } else {\n            pushStack(state, indentTemp + stream.current().length, ch); // else we match\n          }\n        }\n        stream.backUp(stream.current().length - 1); // undo all the eating\n\n        if(typeof state.sExprComment == "number") state.sExprComment++;\n        if(typeof state.sExprQuote == "number") state.sExprQuote++;\n\n        returnType = BRACKET;\n      } else if (ch == ")" || ch == "]") {\n        returnType = BRACKET;\n        if (state.indentStack != null && state.indentStack.type == (ch == ")" ? "(" : "[")) {\n          popStack(state);\n\n          if(typeof state.sExprComment == "number"){\n            if(--state.sExprComment == 0){\n              returnType = COMMENT; // final closing bracket\n              state.sExprComment = false; // turn off s-expr commenting mode\n            }\n          }\n          if(typeof state.sExprQuote == "number"){\n            if(--state.sExprQuote == 0){\n              returnType = ATOM; // final closing bracket\n              state.sExprQuote = false; // turn off s-expr quote mode\n            }\n          }\n        }\n      } else {\n        stream.eatWhile(/[\\w_\\-!$%&*+\\.\\/:<=>?@\\^~]/);\n\n        if (keywords && keywords.propertyIsEnumerable(stream.current())) {\n          returnType = BUILTIN;\n        } else returnType = "variable";\n      }\n    }\n    return (typeof state.sExprComment == "number") ? COMMENT : ((typeof state.sExprQuote == "number") ? ATOM : returnType);\n  },\n\n  indent: function (state) {\n    if (state.indentStack == null) return state.indentation;\n    return state.indentStack.indent;\n  },\n\n  languageData: {\n    closeBrackets: {brackets: ["(", "[", "{", \'"\']},\n    commentTokens: {line: ";;"}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvc2NoZW1lLmpzP2I3NDUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZCxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5TkFBeU47QUFDek4sb09BQW9PO0FBQ3BPLDBQQUEwUDtBQUMxUCx1aUJBQXVpQjs7QUFFdmlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakM7QUFDQSxTQUFTLGdDQUFnQztBQUN6QztBQUNBLFNBQVMsdUJBQXVCLEtBQUs7QUFDckM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sa0VBQWtFO0FBQ3pFO0FBQ0EsT0FBTyxrQkFBa0IsSUFBSTtBQUM3QiwyQkFBMkI7QUFDM0I7QUFDQSxPQUFPO0FBQ1AseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBLCtDQUErQztBQUMvQztBQUNBOztBQUVBLDZFQUE2RTs7QUFFN0U7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsdUVBQXVFO0FBQ3ZFO0FBQ0E7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxvQkFBb0IsdUJBQXVCLFFBQVE7QUFDbkQsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQSIsImZpbGUiOiI0MTkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQlVJTFRJTiA9IFwiYnVpbHRpblwiLCBDT01NRU5UID0gXCJjb21tZW50XCIsIFNUUklORyA9IFwic3RyaW5nXCIsXG4gICAgU1lNQk9MID0gXCJzeW1ib2xcIiwgQVRPTSA9IFwiYXRvbVwiLCBOVU1CRVIgPSBcIm51bWJlclwiLCBCUkFDS0VUID0gXCJicmFja2V0XCI7XG52YXIgSU5ERU5UX1dPUkRfU0tJUCA9IDI7XG5cbmZ1bmN0aW9uIG1ha2VLZXl3b3JkcyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9LCB3b3JkcyA9IHN0ci5zcGxpdChcIiBcIik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyArK2kpIG9ialt3b3Jkc1tpXV0gPSB0cnVlO1xuICByZXR1cm4gb2JqO1xufVxuXG52YXIga2V5d29yZHMgPSBtYWtlS2V5d29yZHMoXCLOuyBjYXNlLWxhbWJkYSBjYWxsL2NjIGNsYXNzIGNvbmQtZXhwYW5kIGRlZmluZS1jbGFzcyBkZWZpbmUtdmFsdWVzIGV4aXQtaGFuZGxlciBmaWVsZCBpbXBvcnQgaW5oZXJpdCBpbml0LWZpZWxkIGludGVyZmFjZSBsZXQqLXZhbHVlcyBsZXQtdmFsdWVzIGxldC9lYyBtaXhpbiBvcHQtbGFtYmRhIG92ZXJyaWRlIHByb3RlY3QgcHJvdmlkZSBwdWJsaWMgcmVuYW1lIHJlcXVpcmUgcmVxdWlyZS1mb3Itc3ludGF4IHN5bnRheCBzeW50YXgtY2FzZSBzeW50YXgtZXJyb3IgdW5pdC9zaWcgdW5sZXNzIHdoZW4gd2l0aC1zeW50YXggYW5kIGJlZ2luIGNhbGwtd2l0aC1jdXJyZW50LWNvbnRpbnVhdGlvbiBjYWxsLXdpdGgtaW5wdXQtZmlsZSBjYWxsLXdpdGgtb3V0cHV0LWZpbGUgY2FzZSBjb25kIGRlZmluZSBkZWZpbmUtc3ludGF4IGRlZmluZS1tYWNybyBkZWZtYWNybyBkZWxheSBkbyBkeW5hbWljLXdpbmQgZWxzZSBmb3ItZWFjaCBpZiBsYW1iZGEgbGV0IGxldCogbGV0LXN5bnRheCBsZXRyZWMgbGV0cmVjLXN5bnRheCBtYXAgb3Igc3ludGF4LXJ1bGVzIGFicyBhY29zIGFuZ2xlIGFwcGVuZCBhcHBseSBhc2luIGFzc29jIGFzc3EgYXNzdiBhdGFuIGJvb2xlYW4/IGNhYXIgY2FkciBjYWxsLXdpdGgtaW5wdXQtZmlsZSBjYWxsLXdpdGgtb3V0cHV0LWZpbGUgY2FsbC13aXRoLXZhbHVlcyBjYXIgY2RkZGFyIGNkZGRkciBjZHIgY2VpbGluZyBjaGFyLT5pbnRlZ2VyIGNoYXItYWxwaGFiZXRpYz8gY2hhci1jaTw9PyBjaGFyLWNpPD8gY2hhci1jaT0/IGNoYXItY2k+PT8gY2hhci1jaT4/IGNoYXItZG93bmNhc2UgY2hhci1sb3dlci1jYXNlPyBjaGFyLW51bWVyaWM/IGNoYXItcmVhZHk/IGNoYXItdXBjYXNlIGNoYXItdXBwZXItY2FzZT8gY2hhci13aGl0ZXNwYWNlPyBjaGFyPD0/IGNoYXI8PyBjaGFyPT8gY2hhcj49PyBjaGFyPj8gY2hhcj8gY2xvc2UtaW5wdXQtcG9ydCBjbG9zZS1vdXRwdXQtcG9ydCBjb21wbGV4PyBjb25zIGNvcyBjdXJyZW50LWlucHV0LXBvcnQgY3VycmVudC1vdXRwdXQtcG9ydCBkZW5vbWluYXRvciBkaXNwbGF5IGVvZi1vYmplY3Q/IGVxPyBlcXVhbD8gZXF2PyBldmFsIGV2ZW4/IGV4YWN0LT5pbmV4YWN0IGV4YWN0PyBleHAgZXhwdCAjZiBmbG9vciBmb3JjZSBnY2QgaW1hZy1wYXJ0IGluZXhhY3QtPmV4YWN0IGluZXhhY3Q/IGlucHV0LXBvcnQ/IGludGVnZXItPmNoYXIgaW50ZWdlcj8gaW50ZXJhY3Rpb24tZW52aXJvbm1lbnQgbGNtIGxlbmd0aCBsaXN0IGxpc3QtPnN0cmluZyBsaXN0LT52ZWN0b3IgbGlzdC1yZWYgbGlzdC10YWlsIGxpc3Q/IGxvYWQgbG9nIG1hZ25pdHVkZSBtYWtlLXBvbGFyIG1ha2UtcmVjdGFuZ3VsYXIgbWFrZS1zdHJpbmcgbWFrZS12ZWN0b3IgbWF4IG1lbWJlciBtZW1xIG1lbXYgbWluIG1vZHVsbyBuZWdhdGl2ZT8gbmV3bGluZSBub3QgbnVsbC1lbnZpcm9ubWVudCBudWxsPyBudW1iZXItPnN0cmluZyBudW1iZXI/IG51bWVyYXRvciBvZGQ/IG9wZW4taW5wdXQtZmlsZSBvcGVuLW91dHB1dC1maWxlIG91dHB1dC1wb3J0PyBwYWlyPyBwZWVrLWNoYXIgcG9ydD8gcG9zaXRpdmU/IHByb2NlZHVyZT8gcXVhc2lxdW90ZSBxdW90ZSBxdW90aWVudCByYXRpb25hbD8gcmF0aW9uYWxpemUgcmVhZCByZWFkLWNoYXIgcmVhbC1wYXJ0IHJlYWw/IHJlbWFpbmRlciByZXZlcnNlIHJvdW5kIHNjaGVtZS1yZXBvcnQtZW52aXJvbm1lbnQgc2V0ISBzZXQtY2FyISBzZXQtY2RyISBzaW4gc3FydCBzdHJpbmcgc3RyaW5nLT5saXN0IHN0cmluZy0+bnVtYmVyIHN0cmluZy0+c3ltYm9sIHN0cmluZy1hcHBlbmQgc3RyaW5nLWNpPD0/IHN0cmluZy1jaTw/IHN0cmluZy1jaT0/IHN0cmluZy1jaT49PyBzdHJpbmctY2k+PyBzdHJpbmctY29weSBzdHJpbmctZmlsbCEgc3RyaW5nLWxlbmd0aCBzdHJpbmctcmVmIHN0cmluZy1zZXQhIHN0cmluZzw9PyBzdHJpbmc8PyBzdHJpbmc9PyBzdHJpbmc+PT8gc3RyaW5nPj8gc3RyaW5nPyBzdWJzdHJpbmcgc3ltYm9sLT5zdHJpbmcgc3ltYm9sPyAjdCB0YW4gdHJhbnNjcmlwdC1vZmYgdHJhbnNjcmlwdC1vbiB0cnVuY2F0ZSB2YWx1ZXMgdmVjdG9yIHZlY3Rvci0+bGlzdCB2ZWN0b3ItZmlsbCEgdmVjdG9yLWxlbmd0aCB2ZWN0b3ItcmVmIHZlY3Rvci1zZXQhIHdpdGgtaW5wdXQtZnJvbS1maWxlIHdpdGgtb3V0cHV0LXRvLWZpbGUgd3JpdGUgd3JpdGUtY2hhciB6ZXJvP1wiKTtcbnZhciBpbmRlbnRLZXlzID0gbWFrZUtleXdvcmRzKFwiZGVmaW5lIGxldCBsZXRyZWMgbGV0KiBsYW1iZGEgZGVmaW5lLW1hY3JvIGRlZm1hY3JvIGxldC1zeW50YXggbGV0cmVjLXN5bnRheCBsZXQtdmFsdWVzIGxldCotdmFsdWVzIGRlZmluZS1zeW50YXggc3ludGF4LXJ1bGVzIGRlZmluZS12YWx1ZXMgd2hlbiB1bmxlc3NcIik7XG5cbmZ1bmN0aW9uIHN0YXRlU3RhY2soaW5kZW50LCB0eXBlLCBwcmV2KSB7IC8vIHJlcHJlc2VudHMgYSBzdGF0ZSBzdGFjayBvYmplY3RcbiAgdGhpcy5pbmRlbnQgPSBpbmRlbnQ7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG4gIHRoaXMucHJldiA9IHByZXY7XG59XG5cbmZ1bmN0aW9uIHB1c2hTdGFjayhzdGF0ZSwgaW5kZW50LCB0eXBlKSB7XG4gIHN0YXRlLmluZGVudFN0YWNrID0gbmV3IHN0YXRlU3RhY2soaW5kZW50LCB0eXBlLCBzdGF0ZS5pbmRlbnRTdGFjayk7XG59XG5cbmZ1bmN0aW9uIHBvcFN0YWNrKHN0YXRlKSB7XG4gIHN0YXRlLmluZGVudFN0YWNrID0gc3RhdGUuaW5kZW50U3RhY2sucHJldjtcbn1cblxudmFyIGJpbmFyeU1hdGNoZXIgPSBuZXcgUmVnRXhwKC9eKD86Wy0rXWl8Wy0rXVswMV0rIyooPzpcXC9bMDFdKyMqKT9pfFstK10/WzAxXSsjKig/OlxcL1swMV0rIyopP0BbLStdP1swMV0rIyooPzpcXC9bMDFdKyMqKT98Wy0rXT9bMDFdKyMqKD86XFwvWzAxXSsjKik/Wy0rXSg/OlswMV0rIyooPzpcXC9bMDFdKyMqKT8pP2l8Wy0rXT9bMDFdKyMqKD86XFwvWzAxXSsjKik/KSg/PVsoKVxccztcIl18JCkvaSk7XG52YXIgb2N0YWxNYXRjaGVyID0gbmV3IFJlZ0V4cCgvXig/OlstK11pfFstK11bMC03XSsjKig/OlxcL1swLTddKyMqKT9pfFstK10/WzAtN10rIyooPzpcXC9bMC03XSsjKik/QFstK10/WzAtN10rIyooPzpcXC9bMC03XSsjKik/fFstK10/WzAtN10rIyooPzpcXC9bMC03XSsjKik/Wy0rXSg/OlswLTddKyMqKD86XFwvWzAtN10rIyopPyk/aXxbLStdP1swLTddKyMqKD86XFwvWzAtN10rIyopPykoPz1bKClcXHM7XCJdfCQpL2kpO1xudmFyIGhleE1hdGNoZXIgPSBuZXcgUmVnRXhwKC9eKD86Wy0rXWl8Wy0rXVtcXGRhLWZdKyMqKD86XFwvW1xcZGEtZl0rIyopP2l8Wy0rXT9bXFxkYS1mXSsjKig/OlxcL1tcXGRhLWZdKyMqKT9AWy0rXT9bXFxkYS1mXSsjKig/OlxcL1tcXGRhLWZdKyMqKT98Wy0rXT9bXFxkYS1mXSsjKig/OlxcL1tcXGRhLWZdKyMqKT9bLStdKD86W1xcZGEtZl0rIyooPzpcXC9bXFxkYS1mXSsjKik/KT9pfFstK10/W1xcZGEtZl0rIyooPzpcXC9bXFxkYS1mXSsjKik/KSg/PVsoKVxccztcIl18JCkvaSk7XG52YXIgZGVjaW1hbE1hdGNoZXIgPSBuZXcgUmVnRXhwKC9eKD86Wy0rXWl8Wy0rXSg/Oig/Oig/OlxcZCsjK1xcLj8jKnxcXGQrXFwuXFxkKiMqfFxcLlxcZCsjKnxcXGQrKSg/Oltlc2ZkbF1bLStdP1xcZCspPyl8XFxkKyMqXFwvXFxkKyMqKWl8Wy0rXT8oPzooPzooPzpcXGQrIytcXC4/Iyp8XFxkK1xcLlxcZCojKnxcXC5cXGQrIyp8XFxkKykoPzpbZXNmZGxdWy0rXT9cXGQrKT8pfFxcZCsjKlxcL1xcZCsjKilAWy0rXT8oPzooPzooPzpcXGQrIytcXC4/Iyp8XFxkK1xcLlxcZCojKnxcXC5cXGQrIyp8XFxkKykoPzpbZXNmZGxdWy0rXT9cXGQrKT8pfFxcZCsjKlxcL1xcZCsjKil8Wy0rXT8oPzooPzooPzpcXGQrIytcXC4/Iyp8XFxkK1xcLlxcZCojKnxcXC5cXGQrIyp8XFxkKykoPzpbZXNmZGxdWy0rXT9cXGQrKT8pfFxcZCsjKlxcL1xcZCsjKilbLStdKD86KD86KD86XFxkKyMrXFwuPyMqfFxcZCtcXC5cXGQqIyp8XFwuXFxkKyMqfFxcZCspKD86W2VzZmRsXVstK10/XFxkKyk/KXxcXGQrIypcXC9cXGQrIyopP2l8KD86KD86KD86XFxkKyMrXFwuPyMqfFxcZCtcXC5cXGQqIyp8XFwuXFxkKyMqfFxcZCspKD86W2VzZmRsXVstK10/XFxkKyk/KXxcXGQrIypcXC9cXGQrIyopKSg/PVsoKVxccztcIl18JCkvaSk7XG5cbmZ1bmN0aW9uIGlzQmluYXJ5TnVtYmVyIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5tYXRjaChiaW5hcnlNYXRjaGVyKTtcbn1cblxuZnVuY3Rpb24gaXNPY3RhbE51bWJlciAoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW0ubWF0Y2gob2N0YWxNYXRjaGVyKTtcbn1cblxuZnVuY3Rpb24gaXNEZWNpbWFsTnVtYmVyIChzdHJlYW0sIGJhY2t1cCkge1xuICBpZiAoYmFja3VwID09PSB0cnVlKSB7XG4gICAgc3RyZWFtLmJhY2tVcCgxKTtcbiAgfVxuICByZXR1cm4gc3RyZWFtLm1hdGNoKGRlY2ltYWxNYXRjaGVyKTtcbn1cblxuZnVuY3Rpb24gaXNIZXhOdW1iZXIgKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLm1hdGNoKGhleE1hdGNoZXIpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRXNjYXBlZFNlcXVlbmNlKHN0cmVhbSwgb3B0aW9ucykge1xuICB2YXIgbmV4dCwgZXNjYXBlZCA9IGZhbHNlO1xuICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgaWYgKG5leHQgPT0gb3B0aW9ucy50b2tlbiAmJiAhZXNjYXBlZCkge1xuICAgICAgb3B0aW9ucy5zdGF0ZS5tb2RlID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZXNjYXBlZCA9ICFlc2NhcGVkICYmIG5leHQgPT0gXCJcXFxcXCI7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNjaGVtZSA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRlbnRTdGFjazogbnVsbCxcbiAgICAgIGluZGVudGF0aW9uOiAwLFxuICAgICAgbW9kZTogZmFsc2UsXG4gICAgICBzRXhwckNvbW1lbnQ6IGZhbHNlLFxuICAgICAgc0V4cHJRdW90ZTogZmFsc2VcbiAgICB9O1xuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5pbmRlbnRTdGFjayA9PSBudWxsICYmIHN0cmVhbS5zb2woKSkge1xuICAgICAgLy8gdXBkYXRlIGluZGVudGF0aW9uLCBidXQgb25seSBpZiBpbmRlbnRTdGFjayBpcyBlbXB0eVxuICAgICAgc3RhdGUuaW5kZW50YXRpb24gPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBza2lwIHNwYWNlc1xuICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciByZXR1cm5UeXBlID0gbnVsbDtcblxuICAgIHN3aXRjaChzdGF0ZS5tb2RlKXtcbiAgICBjYXNlIFwic3RyaW5nXCI6IC8vIG11bHRpLWxpbmUgc3RyaW5nIHBhcnNpbmcgbW9kZVxuICAgICAgcHJvY2Vzc0VzY2FwZWRTZXF1ZW5jZShzdHJlYW0sIHtcbiAgICAgICAgdG9rZW46IFwiXFxcIlwiLFxuICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuVHlwZSA9IFNUUklORzsgLy8gY29udGludWUgb24gaW4gc2NoZW1lLXN0cmluZyBtb2RlXG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3ltYm9sXCI6IC8vIGVzY2FwZSBzeW1ib2xcbiAgICAgIHByb2Nlc3NFc2NhcGVkU2VxdWVuY2Uoc3RyZWFtLCB7XG4gICAgICAgIHRva2VuOiBcInxcIixcbiAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICB9KTtcbiAgICAgIHJldHVyblR5cGUgPSBTWU1CT0w7IC8vIGNvbnRpbnVlIG9uIGluIHNjaGVtZS1zeW1ib2wgbW9kZVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNvbW1lbnRcIjogLy8gY29tbWVudCBwYXJzaW5nIG1vZGVcbiAgICAgIHZhciBuZXh0LCBtYXliZUVuZCA9IGZhbHNlO1xuICAgICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgICBpZiAobmV4dCA9PSBcIiNcIiAmJiBtYXliZUVuZCkge1xuXG4gICAgICAgICAgc3RhdGUubW9kZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG1heWJlRW5kID0gKG5leHQgPT0gXCJ8XCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuVHlwZSA9IENPTU1FTlQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicy1leHByLWNvbW1lbnRcIjogLy8gcy1leHByIGNvbW1lbnRpbmcgbW9kZVxuICAgICAgc3RhdGUubW9kZSA9IGZhbHNlO1xuICAgICAgaWYoc3RyZWFtLnBlZWsoKSA9PSBcIihcIiB8fCBzdHJlYW0ucGVlaygpID09IFwiW1wiKXtcbiAgICAgICAgLy8gYWN0dWFsbHkgc3RhcnQgc2NoZW1lIHMtZXhwciBjb21tZW50aW5nIG1vZGVcbiAgICAgICAgc3RhdGUuc0V4cHJDb21tZW50ID0gMDtcbiAgICAgIH1lbHNle1xuICAgICAgICAvLyBpZiBub3Qgd2UganVzdCBjb21tZW50IHRoZSBlbnRpcmUgb2YgdGhlIG5leHQgdG9rZW5cbiAgICAgICAgc3RyZWFtLmVhdFdoaWxlKC9bXlxcc1xcKFxcKVxcW1xcXV0vKTsgLy8gZWF0IHN5bWJvbCBhdG9tXG4gICAgICAgIHJldHVyblR5cGUgPSBDT01NRU5UO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICBkZWZhdWx0OiAvLyBkZWZhdWx0IHBhcnNpbmcgbW9kZVxuICAgICAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcblxuICAgICAgaWYgKGNoID09IFwiXFxcIlwiKSB7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBcInN0cmluZ1wiO1xuICAgICAgICByZXR1cm5UeXBlID0gU1RSSU5HO1xuXG4gICAgICB9IGVsc2UgaWYgKGNoID09IFwiJ1wiKSB7XG4gICAgICAgIGlmIChzdHJlYW0ucGVlaygpID09IFwiKFwiIHx8IHN0cmVhbS5wZWVrKCkgPT0gXCJbXCIpe1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUuc0V4cHJRdW90ZSAhPSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBzdGF0ZS5zRXhwclF1b3RlID0gMDtcbiAgICAgICAgICB9IC8vIGVsc2UgYWxyZWFkeSBpbiBhIHF1b3RlZCBleHByZXNzaW9uXG4gICAgICAgICAgcmV0dXJuVHlwZSA9IEFUT007XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyZWFtLmVhdFdoaWxlKC9bXFx3X1xcLSEkJSYqK1xcLlxcLzo8PT4/QFxcXn5dLyk7XG4gICAgICAgICAgcmV0dXJuVHlwZSA9IEFUT007XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2ggPT0gJ3wnKSB7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBcInN5bWJvbFwiO1xuICAgICAgICByZXR1cm5UeXBlID0gU1lNQk9MO1xuICAgICAgfSBlbHNlIGlmIChjaCA9PSAnIycpIHtcbiAgICAgICAgaWYgKHN0cmVhbS5lYXQoXCJ8XCIpKSB7ICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aS1saW5lIGNvbW1lbnRcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gXCJjb21tZW50XCI7IC8vIHRvZ2dsZSB0byBjb21tZW50IG1vZGVcbiAgICAgICAgICByZXR1cm5UeXBlID0gQ09NTUVOVDtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJlYW0uZWF0KC9bdGZdL2kpKSB7ICAgICAgICAgICAgLy8gI3QvI2YgKGF0b20pXG4gICAgICAgICAgcmV0dXJuVHlwZSA9IEFUT007XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLmVhdCgnOycpKSB7ICAgICAgICAgICAgICAgIC8vIFMtRXhwciBjb21tZW50XG4gICAgICAgICAgc3RhdGUubW9kZSA9IFwicy1leHByLWNvbW1lbnRcIjtcbiAgICAgICAgICByZXR1cm5UeXBlID0gQ09NTUVOVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbnVtVGVzdCA9IG51bGwsIGhhc0V4YWN0bmVzcyA9IGZhbHNlLCBoYXNSYWRpeCA9IHRydWU7XG4gICAgICAgICAgaWYgKHN0cmVhbS5lYXQoL1tlaV0vaSkpIHtcbiAgICAgICAgICAgIGhhc0V4YWN0bmVzcyA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmVhbS5iYWNrVXAoMSk7ICAgICAgIC8vIG11c3QgYmUgcmFkaXggc3BlY2lmaWVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2goL14jYi9pKSkge1xuICAgICAgICAgICAgbnVtVGVzdCA9IGlzQmluYXJ5TnVtYmVyO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eI28vaSkpIHtcbiAgICAgICAgICAgIG51bVRlc3QgPSBpc09jdGFsTnVtYmVyO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eI3gvaSkpIHtcbiAgICAgICAgICAgIG51bVRlc3QgPSBpc0hleE51bWJlcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0cmVhbS5tYXRjaCgvXiNkL2kpKSB7XG4gICAgICAgICAgICBudW1UZXN0ID0gaXNEZWNpbWFsTnVtYmVyO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLm1hdGNoKC9eWy0rMC05Ll0vLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIGhhc1JhZGl4ID0gZmFsc2U7XG4gICAgICAgICAgICBudW1UZXN0ID0gaXNEZWNpbWFsTnVtYmVyO1xuICAgICAgICAgICAgLy8gcmUtY29uc3VtZSB0aGUgaW5pdGlhbCAjIGlmIGFsbCBtYXRjaGVzIGZhaWxlZFxuICAgICAgICAgIH0gZWxzZSBpZiAoIWhhc0V4YWN0bmVzcykge1xuICAgICAgICAgICAgc3RyZWFtLmVhdCgnIycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobnVtVGVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoaGFzUmFkaXggJiYgIWhhc0V4YWN0bmVzcykge1xuICAgICAgICAgICAgICAvLyBjb25zdW1lIG9wdGlvbmFsIGV4YWN0bmVzcyBhZnRlciByYWRpeFxuICAgICAgICAgICAgICBzdHJlYW0ubWF0Y2goL14jW2VpXS9pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChudW1UZXN0KHN0cmVhbSkpXG4gICAgICAgICAgICAgIHJldHVyblR5cGUgPSBOVU1CRVI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKC9eWy0rMC05Ll0vLnRlc3QoY2gpICYmIGlzRGVjaW1hbE51bWJlcihzdHJlYW0sIHRydWUpKSB7IC8vIG1hdGNoIG5vbi1wcmVmaXhlZCBudW1iZXIsIG11c3QgYmUgZGVjaW1hbFxuICAgICAgICByZXR1cm5UeXBlID0gTlVNQkVSO1xuICAgICAgfSBlbHNlIGlmIChjaCA9PSBcIjtcIikgeyAvLyBjb21tZW50XG4gICAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTsgLy8gcmVzdCBvZiB0aGUgbGluZSBpcyBhIGNvbW1lbnRcbiAgICAgICAgcmV0dXJuVHlwZSA9IENPTU1FTlQ7XG4gICAgICB9IGVsc2UgaWYgKGNoID09IFwiKFwiIHx8IGNoID09IFwiW1wiKSB7XG4gICAgICAgIHZhciBrZXlXb3JkID0gJyc7IHZhciBpbmRlbnRUZW1wID0gc3RyZWFtLmNvbHVtbigpLCBsZXR0ZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgICBFaXRoZXJcbiAgICAgICAgICAgKGluZGVudC13b3JkIC4uXG4gICAgICAgICAgIChub24taW5kZW50LXdvcmQgLi5cbiAgICAgICAgICAgKDtzb21ldGhpbmcgZWxzZSwgYnJhY2tldCwgZXRjLlxuICAgICAgICAqL1xuXG4gICAgICAgIHdoaWxlICgobGV0dGVyID0gc3RyZWFtLmVhdCgvW15cXHNcXChcXFtcXDtcXClcXF1dLykpICE9IG51bGwpIHtcbiAgICAgICAgICBrZXlXb3JkICs9IGxldHRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlXb3JkLmxlbmd0aCA+IDAgJiYgaW5kZW50S2V5cy5wcm9wZXJ0eUlzRW51bWVyYWJsZShrZXlXb3JkKSkgeyAvLyBpbmRlbnQtd29yZFxuXG4gICAgICAgICAgcHVzaFN0YWNrKHN0YXRlLCBpbmRlbnRUZW1wICsgSU5ERU5UX1dPUkRfU0tJUCwgY2gpO1xuICAgICAgICB9IGVsc2UgeyAvLyBub24taW5kZW50IHdvcmRcbiAgICAgICAgICAvLyB3ZSBjb250aW51ZSBlYXRpbmcgdGhlIHNwYWNlc1xuICAgICAgICAgIHN0cmVhbS5lYXRTcGFjZSgpO1xuICAgICAgICAgIGlmIChzdHJlYW0uZW9sKCkgfHwgc3RyZWFtLnBlZWsoKSA9PSBcIjtcIikge1xuICAgICAgICAgICAgLy8gbm90aGluZyBzaWduaWZpY2FudCBhZnRlclxuICAgICAgICAgICAgLy8gd2UgcmVzdGFydCBpbmRlbnRhdGlvbiAxIHNwYWNlIGFmdGVyXG4gICAgICAgICAgICBwdXNoU3RhY2soc3RhdGUsIGluZGVudFRlbXAgKyAxLCBjaCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1c2hTdGFjayhzdGF0ZSwgaW5kZW50VGVtcCArIHN0cmVhbS5jdXJyZW50KCkubGVuZ3RoLCBjaCk7IC8vIGVsc2Ugd2UgbWF0Y2hcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtLmJhY2tVcChzdHJlYW0uY3VycmVudCgpLmxlbmd0aCAtIDEpOyAvLyB1bmRvIGFsbCB0aGUgZWF0aW5nXG5cbiAgICAgICAgaWYodHlwZW9mIHN0YXRlLnNFeHByQ29tbWVudCA9PSBcIm51bWJlclwiKSBzdGF0ZS5zRXhwckNvbW1lbnQrKztcbiAgICAgICAgaWYodHlwZW9mIHN0YXRlLnNFeHByUXVvdGUgPT0gXCJudW1iZXJcIikgc3RhdGUuc0V4cHJRdW90ZSsrO1xuXG4gICAgICAgIHJldHVyblR5cGUgPSBCUkFDS0VUO1xuICAgICAgfSBlbHNlIGlmIChjaCA9PSBcIilcIiB8fCBjaCA9PSBcIl1cIikge1xuICAgICAgICByZXR1cm5UeXBlID0gQlJBQ0tFVDtcbiAgICAgICAgaWYgKHN0YXRlLmluZGVudFN0YWNrICE9IG51bGwgJiYgc3RhdGUuaW5kZW50U3RhY2sudHlwZSA9PSAoY2ggPT0gXCIpXCIgPyBcIihcIiA6IFwiW1wiKSkge1xuICAgICAgICAgIHBvcFN0YWNrKHN0YXRlKTtcblxuICAgICAgICAgIGlmKHR5cGVvZiBzdGF0ZS5zRXhwckNvbW1lbnQgPT0gXCJudW1iZXJcIil7XG4gICAgICAgICAgICBpZigtLXN0YXRlLnNFeHByQ29tbWVudCA9PSAwKXtcbiAgICAgICAgICAgICAgcmV0dXJuVHlwZSA9IENPTU1FTlQ7IC8vIGZpbmFsIGNsb3NpbmcgYnJhY2tldFxuICAgICAgICAgICAgICBzdGF0ZS5zRXhwckNvbW1lbnQgPSBmYWxzZTsgLy8gdHVybiBvZmYgcy1leHByIGNvbW1lbnRpbmcgbW9kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZih0eXBlb2Ygc3RhdGUuc0V4cHJRdW90ZSA9PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgIGlmKC0tc3RhdGUuc0V4cHJRdW90ZSA9PSAwKXtcbiAgICAgICAgICAgICAgcmV0dXJuVHlwZSA9IEFUT007IC8vIGZpbmFsIGNsb3NpbmcgYnJhY2tldFxuICAgICAgICAgICAgICBzdGF0ZS5zRXhwclF1b3RlID0gZmFsc2U7IC8vIHR1cm4gb2ZmIHMtZXhwciBxdW90ZSBtb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdfXFwtISQlJiorXFwuXFwvOjw9Pj9AXFxefl0vKTtcblxuICAgICAgICBpZiAoa2V5d29yZHMgJiYga2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUoc3RyZWFtLmN1cnJlbnQoKSkpIHtcbiAgICAgICAgICByZXR1cm5UeXBlID0gQlVJTFRJTjtcbiAgICAgICAgfSBlbHNlIHJldHVyblR5cGUgPSBcInZhcmlhYmxlXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAodHlwZW9mIHN0YXRlLnNFeHByQ29tbWVudCA9PSBcIm51bWJlclwiKSA/IENPTU1FTlQgOiAoKHR5cGVvZiBzdGF0ZS5zRXhwclF1b3RlID09IFwibnVtYmVyXCIpID8gQVRPTSA6IHJldHVyblR5cGUpO1xuICB9LFxuXG4gIGluZGVudDogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmluZGVudFN0YWNrID09IG51bGwpIHJldHVybiBzdGF0ZS5pbmRlbnRhdGlvbjtcbiAgICByZXR1cm4gc3RhdGUuaW5kZW50U3RhY2suaW5kZW50O1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGNsb3NlQnJhY2tldHM6IHticmFja2V0czogW1wiKFwiLCBcIltcIiwgXCJ7XCIsICdcIiddfSxcbiAgICBjb21tZW50VG9rZW5zOiB7bGluZTogXCI7O1wifVxuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///419\n')}}]);