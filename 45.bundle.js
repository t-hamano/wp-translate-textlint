(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{384:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gas", function() { return gas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gasArm", function() { return gasArm; });\nfunction mkGas(arch) {\n  // If an architecture is specified, its initialization function may\n  // populate this array with custom parsing functions which will be\n  // tried in the event that the standard functions do not find a match.\n  var custom = [];\n\n  // The symbol used to start a line comment changes based on the target\n  // architecture.\n  // If no architecture is pased in "parserConfig" then only multiline\n  // comments will have syntax support.\n  var lineCommentStartSymbol = "";\n\n  // These directives are architecture independent.\n  // Machine specific directives should go in their respective\n  // architecture initialization function.\n  // Reference:\n  // http://sourceware.org/binutils/docs/as/Pseudo-Ops.html#Pseudo-Ops\n  var directives = {\n    ".abort" : "builtin",\n    ".align" : "builtin",\n    ".altmacro" : "builtin",\n    ".ascii" : "builtin",\n    ".asciz" : "builtin",\n    ".balign" : "builtin",\n    ".balignw" : "builtin",\n    ".balignl" : "builtin",\n    ".bundle_align_mode" : "builtin",\n    ".bundle_lock" : "builtin",\n    ".bundle_unlock" : "builtin",\n    ".byte" : "builtin",\n    ".cfi_startproc" : "builtin",\n    ".comm" : "builtin",\n    ".data" : "builtin",\n    ".def" : "builtin",\n    ".desc" : "builtin",\n    ".dim" : "builtin",\n    ".double" : "builtin",\n    ".eject" : "builtin",\n    ".else" : "builtin",\n    ".elseif" : "builtin",\n    ".end" : "builtin",\n    ".endef" : "builtin",\n    ".endfunc" : "builtin",\n    ".endif" : "builtin",\n    ".equ" : "builtin",\n    ".equiv" : "builtin",\n    ".eqv" : "builtin",\n    ".err" : "builtin",\n    ".error" : "builtin",\n    ".exitm" : "builtin",\n    ".extern" : "builtin",\n    ".fail" : "builtin",\n    ".file" : "builtin",\n    ".fill" : "builtin",\n    ".float" : "builtin",\n    ".func" : "builtin",\n    ".global" : "builtin",\n    ".gnu_attribute" : "builtin",\n    ".hidden" : "builtin",\n    ".hword" : "builtin",\n    ".ident" : "builtin",\n    ".if" : "builtin",\n    ".incbin" : "builtin",\n    ".include" : "builtin",\n    ".int" : "builtin",\n    ".internal" : "builtin",\n    ".irp" : "builtin",\n    ".irpc" : "builtin",\n    ".lcomm" : "builtin",\n    ".lflags" : "builtin",\n    ".line" : "builtin",\n    ".linkonce" : "builtin",\n    ".list" : "builtin",\n    ".ln" : "builtin",\n    ".loc" : "builtin",\n    ".loc_mark_labels" : "builtin",\n    ".local" : "builtin",\n    ".long" : "builtin",\n    ".macro" : "builtin",\n    ".mri" : "builtin",\n    ".noaltmacro" : "builtin",\n    ".nolist" : "builtin",\n    ".octa" : "builtin",\n    ".offset" : "builtin",\n    ".org" : "builtin",\n    ".p2align" : "builtin",\n    ".popsection" : "builtin",\n    ".previous" : "builtin",\n    ".print" : "builtin",\n    ".protected" : "builtin",\n    ".psize" : "builtin",\n    ".purgem" : "builtin",\n    ".pushsection" : "builtin",\n    ".quad" : "builtin",\n    ".reloc" : "builtin",\n    ".rept" : "builtin",\n    ".sbttl" : "builtin",\n    ".scl" : "builtin",\n    ".section" : "builtin",\n    ".set" : "builtin",\n    ".short" : "builtin",\n    ".single" : "builtin",\n    ".size" : "builtin",\n    ".skip" : "builtin",\n    ".sleb128" : "builtin",\n    ".space" : "builtin",\n    ".stab" : "builtin",\n    ".string" : "builtin",\n    ".struct" : "builtin",\n    ".subsection" : "builtin",\n    ".symver" : "builtin",\n    ".tag" : "builtin",\n    ".text" : "builtin",\n    ".title" : "builtin",\n    ".type" : "builtin",\n    ".uleb128" : "builtin",\n    ".val" : "builtin",\n    ".version" : "builtin",\n    ".vtable_entry" : "builtin",\n    ".vtable_inherit" : "builtin",\n    ".warning" : "builtin",\n    ".weak" : "builtin",\n    ".weakref" : "builtin",\n    ".word" : "builtin"\n  };\n\n  var registers = {};\n\n  function x86() {\n    lineCommentStartSymbol = "#";\n\n    registers.al  = "variable";\n    registers.ah  = "variable";\n    registers.ax  = "variable";\n    registers.eax = "variableName.special";\n    registers.rax = "variableName.special";\n\n    registers.bl  = "variable";\n    registers.bh  = "variable";\n    registers.bx  = "variable";\n    registers.ebx = "variableName.special";\n    registers.rbx = "variableName.special";\n\n    registers.cl  = "variable";\n    registers.ch  = "variable";\n    registers.cx  = "variable";\n    registers.ecx = "variableName.special";\n    registers.rcx = "variableName.special";\n\n    registers.dl  = "variable";\n    registers.dh  = "variable";\n    registers.dx  = "variable";\n    registers.edx = "variableName.special";\n    registers.rdx = "variableName.special";\n\n    registers.si  = "variable";\n    registers.esi = "variableName.special";\n    registers.rsi = "variableName.special";\n\n    registers.di  = "variable";\n    registers.edi = "variableName.special";\n    registers.rdi = "variableName.special";\n\n    registers.sp  = "variable";\n    registers.esp = "variableName.special";\n    registers.rsp = "variableName.special";\n\n    registers.bp  = "variable";\n    registers.ebp = "variableName.special";\n    registers.rbp = "variableName.special";\n\n    registers.ip  = "variable";\n    registers.eip = "variableName.special";\n    registers.rip = "variableName.special";\n\n    registers.cs  = "keyword";\n    registers.ds  = "keyword";\n    registers.ss  = "keyword";\n    registers.es  = "keyword";\n    registers.fs  = "keyword";\n    registers.gs  = "keyword";\n  }\n\n  function armv6() {\n    // Reference:\n    // http://infocenter.arm.com/help/topic/com.arm.doc.qrc0001l/QRC0001_UAL.pdf\n    // http://infocenter.arm.com/help/topic/com.arm.doc.ddi0301h/DDI0301H_arm1176jzfs_r0p7_trm.pdf\n    lineCommentStartSymbol = "@";\n    directives.syntax = "builtin";\n\n    registers.r0  = "variable";\n    registers.r1  = "variable";\n    registers.r2  = "variable";\n    registers.r3  = "variable";\n    registers.r4  = "variable";\n    registers.r5  = "variable";\n    registers.r6  = "variable";\n    registers.r7  = "variable";\n    registers.r8  = "variable";\n    registers.r9  = "variable";\n    registers.r10 = "variable";\n    registers.r11 = "variable";\n    registers.r12 = "variable";\n\n    registers.sp  = "variableName.special";\n    registers.lr  = "variableName.special";\n    registers.pc  = "variableName.special";\n    registers.r13 = registers.sp;\n    registers.r14 = registers.lr;\n    registers.r15 = registers.pc;\n\n    custom.push(function(ch, stream) {\n      if (ch === \'#\') {\n        stream.eatWhile(/\\w/);\n        return "number";\n      }\n    });\n  }\n\n  if (arch === "x86") {\n    x86();\n  } else if (arch === "arm" || arch === "armv6") {\n    armv6();\n  }\n\n  function nextUntilUnescaped(stream, end) {\n    var escaped = false, next;\n    while ((next = stream.next()) != null) {\n      if (next === end && !escaped) {\n        return false;\n      }\n      escaped = !escaped && next === "\\\\";\n    }\n    return escaped;\n  }\n\n  function clikeComment(stream, state) {\n    var maybeEnd = false, ch;\n    while ((ch = stream.next()) != null) {\n      if (ch === "/" && maybeEnd) {\n        state.tokenize = null;\n        break;\n      }\n      maybeEnd = (ch === "*");\n    }\n    return "comment";\n  }\n\n  return {\n    startState: function() {\n      return {\n        tokenize: null\n      };\n    },\n\n    token: function(stream, state) {\n      if (state.tokenize) {\n        return state.tokenize(stream, state);\n      }\n\n      if (stream.eatSpace()) {\n        return null;\n      }\n\n      var style, cur, ch = stream.next();\n\n      if (ch === "/") {\n        if (stream.eat("*")) {\n          state.tokenize = clikeComment;\n          return clikeComment(stream, state);\n        }\n      }\n\n      if (ch === lineCommentStartSymbol) {\n        stream.skipToEnd();\n        return "comment";\n      }\n\n      if (ch === \'"\') {\n        nextUntilUnescaped(stream, \'"\');\n        return "string";\n      }\n\n      if (ch === \'.\') {\n        stream.eatWhile(/\\w/);\n        cur = stream.current().toLowerCase();\n        style = directives[cur];\n        return style || null;\n      }\n\n      if (ch === \'=\') {\n        stream.eatWhile(/\\w/);\n        return "tag";\n      }\n\n      if (ch === \'{\') {\n        return "bracket";\n      }\n\n      if (ch === \'}\') {\n        return "bracket";\n      }\n\n      if (/\\d/.test(ch)) {\n        if (ch === "0" && stream.eat("x")) {\n          stream.eatWhile(/[0-9a-fA-F]/);\n          return "number";\n        }\n        stream.eatWhile(/\\d/);\n        return "number";\n      }\n\n      if (/\\w/.test(ch)) {\n        stream.eatWhile(/\\w/);\n        if (stream.eat(":")) {\n          return \'tag\';\n        }\n        cur = stream.current().toLowerCase();\n        style = registers[cur];\n        return style || null;\n      }\n\n      for (var i = 0; i < custom.length; i++) {\n        style = custom[i](ch, stream, state);\n        if (style) {\n          return style;\n        }\n      }\n    },\n\n    languageData: {\n      commentTokens: {\n        line: lineCommentStartSymbol,\n        block: {open: "/*", close: "*/"}\n      }\n    }\n  };\n};\n\nconst gas = mkGas("x86")\nconst gasArm = mkGas("arm")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvZ2FzLmpzPzY0ZjkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ0EiLCJmaWxlIjoiMzg0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbWtHYXMoYXJjaCkge1xuICAvLyBJZiBhbiBhcmNoaXRlY3R1cmUgaXMgc3BlY2lmaWVkLCBpdHMgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gbWF5XG4gIC8vIHBvcHVsYXRlIHRoaXMgYXJyYXkgd2l0aCBjdXN0b20gcGFyc2luZyBmdW5jdGlvbnMgd2hpY2ggd2lsbCBiZVxuICAvLyB0cmllZCBpbiB0aGUgZXZlbnQgdGhhdCB0aGUgc3RhbmRhcmQgZnVuY3Rpb25zIGRvIG5vdCBmaW5kIGEgbWF0Y2guXG4gIHZhciBjdXN0b20gPSBbXTtcblxuICAvLyBUaGUgc3ltYm9sIHVzZWQgdG8gc3RhcnQgYSBsaW5lIGNvbW1lbnQgY2hhbmdlcyBiYXNlZCBvbiB0aGUgdGFyZ2V0XG4gIC8vIGFyY2hpdGVjdHVyZS5cbiAgLy8gSWYgbm8gYXJjaGl0ZWN0dXJlIGlzIHBhc2VkIGluIFwicGFyc2VyQ29uZmlnXCIgdGhlbiBvbmx5IG11bHRpbGluZVxuICAvLyBjb21tZW50cyB3aWxsIGhhdmUgc3ludGF4IHN1cHBvcnQuXG4gIHZhciBsaW5lQ29tbWVudFN0YXJ0U3ltYm9sID0gXCJcIjtcblxuICAvLyBUaGVzZSBkaXJlY3RpdmVzIGFyZSBhcmNoaXRlY3R1cmUgaW5kZXBlbmRlbnQuXG4gIC8vIE1hY2hpbmUgc3BlY2lmaWMgZGlyZWN0aXZlcyBzaG91bGQgZ28gaW4gdGhlaXIgcmVzcGVjdGl2ZVxuICAvLyBhcmNoaXRlY3R1cmUgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24uXG4gIC8vIFJlZmVyZW5jZTpcbiAgLy8gaHR0cDovL3NvdXJjZXdhcmUub3JnL2JpbnV0aWxzL2RvY3MvYXMvUHNldWRvLU9wcy5odG1sI1BzZXVkby1PcHNcbiAgdmFyIGRpcmVjdGl2ZXMgPSB7XG4gICAgXCIuYWJvcnRcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmFsaWduXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5hbHRtYWNyb1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIuYXNjaWlcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmFzY2l6XCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5iYWxpZ25cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmJhbGlnbndcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmJhbGlnbmxcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmJ1bmRsZV9hbGlnbl9tb2RlXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5idW5kbGVfbG9ja1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIuYnVuZGxlX3VubG9ja1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIuYnl0ZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuY2ZpX3N0YXJ0cHJvY1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIuY29tbVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZGF0YVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZGVmXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5kZXNjXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5kaW1cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmRvdWJsZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZWplY3RcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmVsc2VcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmVsc2VpZlwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZW5kXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5lbmRlZlwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZW5kZnVuY1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZW5kaWZcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmVxdVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZXF1aXZcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmVxdlwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZXJyXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5lcnJvclwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZXhpdG1cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmV4dGVyblwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZmFpbFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZmlsZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZmlsbFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZmxvYXRcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmZ1bmNcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmdsb2JhbFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuZ251X2F0dHJpYnV0ZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuaGlkZGVuXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5od29yZFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuaWRlbnRcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmlmXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5pbmNiaW5cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmluY2x1ZGVcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmludFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuaW50ZXJuYWxcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmlycFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuaXJwY1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIubGNvbW1cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmxmbGFnc1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIubGluZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIubGlua29uY2VcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmxpc3RcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmxuXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5sb2NcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmxvY19tYXJrX2xhYmVsc1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIubG9jYWxcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLmxvbmdcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLm1hY3JvXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5tcmlcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLm5vYWx0bWFjcm9cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLm5vbGlzdFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIub2N0YVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIub2Zmc2V0XCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5vcmdcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnAyYWxpZ25cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnBvcHNlY3Rpb25cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnByZXZpb3VzXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5wcmludFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIucHJvdGVjdGVkXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5wc2l6ZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIucHVyZ2VtXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5wdXNoc2VjdGlvblwiIDogXCJidWlsdGluXCIsXG4gICAgXCIucXVhZFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIucmVsb2NcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnJlcHRcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnNidHRsXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5zY2xcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnNlY3Rpb25cIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnNldFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuc2hvcnRcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnNpbmdsZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuc2l6ZVwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuc2tpcFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuc2xlYjEyOFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIuc3BhY2VcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnN0YWJcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnN0cmluZ1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIuc3RydWN0XCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5zdWJzZWN0aW9uXCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi5zeW12ZXJcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnRhZ1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIudGV4dFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIudGl0bGVcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnR5cGVcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnVsZWIxMjhcIiA6IFwiYnVpbHRpblwiLFxuICAgIFwiLnZhbFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIudmVyc2lvblwiIDogXCJidWlsdGluXCIsXG4gICAgXCIudnRhYmxlX2VudHJ5XCIgOiBcImJ1aWx0aW5cIixcbiAgICBcIi52dGFibGVfaW5oZXJpdFwiIDogXCJidWlsdGluXCIsXG4gICAgXCIud2FybmluZ1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIud2Vha1wiIDogXCJidWlsdGluXCIsXG4gICAgXCIud2Vha3JlZlwiIDogXCJidWlsdGluXCIsXG4gICAgXCIud29yZFwiIDogXCJidWlsdGluXCJcbiAgfTtcblxuICB2YXIgcmVnaXN0ZXJzID0ge307XG5cbiAgZnVuY3Rpb24geDg2KCkge1xuICAgIGxpbmVDb21tZW50U3RhcnRTeW1ib2wgPSBcIiNcIjtcblxuICAgIHJlZ2lzdGVycy5hbCAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLmFoICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMuYXggID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5lYXggPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmVnaXN0ZXJzLnJheCA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcblxuICAgIHJlZ2lzdGVycy5ibCAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLmJoICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMuYnggID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5lYnggPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmVnaXN0ZXJzLnJieCA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcblxuICAgIHJlZ2lzdGVycy5jbCAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLmNoICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMuY3ggID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5lY3ggPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmVnaXN0ZXJzLnJjeCA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcblxuICAgIHJlZ2lzdGVycy5kbCAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLmRoICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMuZHggID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5lZHggPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmVnaXN0ZXJzLnJkeCA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcblxuICAgIHJlZ2lzdGVycy5zaSAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLmVzaSA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcbiAgICByZWdpc3RlcnMucnNpID0gXCJ2YXJpYWJsZU5hbWUuc3BlY2lhbFwiO1xuXG4gICAgcmVnaXN0ZXJzLmRpICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMuZWRpID0gXCJ2YXJpYWJsZU5hbWUuc3BlY2lhbFwiO1xuICAgIHJlZ2lzdGVycy5yZGkgPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG5cbiAgICByZWdpc3RlcnMuc3AgID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5lc3AgPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmVnaXN0ZXJzLnJzcCA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcblxuICAgIHJlZ2lzdGVycy5icCAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLmVicCA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcbiAgICByZWdpc3RlcnMucmJwID0gXCJ2YXJpYWJsZU5hbWUuc3BlY2lhbFwiO1xuXG4gICAgcmVnaXN0ZXJzLmlwICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMuZWlwID0gXCJ2YXJpYWJsZU5hbWUuc3BlY2lhbFwiO1xuICAgIHJlZ2lzdGVycy5yaXAgPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG5cbiAgICByZWdpc3RlcnMuY3MgID0gXCJrZXl3b3JkXCI7XG4gICAgcmVnaXN0ZXJzLmRzICA9IFwia2V5d29yZFwiO1xuICAgIHJlZ2lzdGVycy5zcyAgPSBcImtleXdvcmRcIjtcbiAgICByZWdpc3RlcnMuZXMgID0gXCJrZXl3b3JkXCI7XG4gICAgcmVnaXN0ZXJzLmZzICA9IFwia2V5d29yZFwiO1xuICAgIHJlZ2lzdGVycy5ncyAgPSBcImtleXdvcmRcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFybXY2KCkge1xuICAgIC8vIFJlZmVyZW5jZTpcbiAgICAvLyBodHRwOi8vaW5mb2NlbnRlci5hcm0uY29tL2hlbHAvdG9waWMvY29tLmFybS5kb2MucXJjMDAwMWwvUVJDMDAwMV9VQUwucGRmXG4gICAgLy8gaHR0cDovL2luZm9jZW50ZXIuYXJtLmNvbS9oZWxwL3RvcGljL2NvbS5hcm0uZG9jLmRkaTAzMDFoL0RESTAzMDFIX2FybTExNzZqemZzX3IwcDdfdHJtLnBkZlxuICAgIGxpbmVDb21tZW50U3RhcnRTeW1ib2wgPSBcIkBcIjtcbiAgICBkaXJlY3RpdmVzLnN5bnRheCA9IFwiYnVpbHRpblwiO1xuXG4gICAgcmVnaXN0ZXJzLnIwICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMucjEgID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5yMiAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLnIzICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMucjQgID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5yNSAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLnI2ICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMucjcgID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5yOCAgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLnI5ICA9IFwidmFyaWFibGVcIjtcbiAgICByZWdpc3RlcnMucjEwID0gXCJ2YXJpYWJsZVwiO1xuICAgIHJlZ2lzdGVycy5yMTEgPSBcInZhcmlhYmxlXCI7XG4gICAgcmVnaXN0ZXJzLnIxMiA9IFwidmFyaWFibGVcIjtcblxuICAgIHJlZ2lzdGVycy5zcCAgPSBcInZhcmlhYmxlTmFtZS5zcGVjaWFsXCI7XG4gICAgcmVnaXN0ZXJzLmxyICA9IFwidmFyaWFibGVOYW1lLnNwZWNpYWxcIjtcbiAgICByZWdpc3RlcnMucGMgID0gXCJ2YXJpYWJsZU5hbWUuc3BlY2lhbFwiO1xuICAgIHJlZ2lzdGVycy5yMTMgPSByZWdpc3RlcnMuc3A7XG4gICAgcmVnaXN0ZXJzLnIxNCA9IHJlZ2lzdGVycy5scjtcbiAgICByZWdpc3RlcnMucjE1ID0gcmVnaXN0ZXJzLnBjO1xuXG4gICAgY3VzdG9tLnB1c2goZnVuY3Rpb24oY2gsIHN0cmVhbSkge1xuICAgICAgaWYgKGNoID09PSAnIycpIHtcbiAgICAgICAgc3RyZWFtLmVhdFdoaWxlKC9cXHcvKTtcbiAgICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoYXJjaCA9PT0gXCJ4ODZcIikge1xuICAgIHg4NigpO1xuICB9IGVsc2UgaWYgKGFyY2ggPT09IFwiYXJtXCIgfHwgYXJjaCA9PT0gXCJhcm12NlwiKSB7XG4gICAgYXJtdjYoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRVbnRpbFVuZXNjYXBlZChzdHJlYW0sIGVuZCkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIG5leHQ7XG4gICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKG5leHQgPT09IGVuZCAmJiAhZXNjYXBlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBlc2NhcGVkID0gIWVzY2FwZWQgJiYgbmV4dCA9PT0gXCJcXFxcXCI7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVkO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xpa2VDb21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgbWF5YmVFbmQgPSBmYWxzZSwgY2g7XG4gICAgd2hpbGUgKChjaCA9IHN0cmVhbS5uZXh0KCkpICE9IG51bGwpIHtcbiAgICAgIGlmIChjaCA9PT0gXCIvXCIgJiYgbWF5YmVFbmQpIHtcbiAgICAgICAgc3RhdGUudG9rZW5pemUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG1heWJlRW5kID0gKGNoID09PSBcIipcIik7XG4gICAgfVxuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbml6ZTogbnVsbFxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICAgIGlmIChzdGF0ZS50b2tlbml6ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0eWxlLCBjdXIsIGNoID0gc3RyZWFtLm5leHQoKTtcblxuICAgICAgaWYgKGNoID09PSBcIi9cIikge1xuICAgICAgICBpZiAoc3RyZWFtLmVhdChcIipcIikpIHtcbiAgICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IGNsaWtlQ29tbWVudDtcbiAgICAgICAgICByZXR1cm4gY2xpa2VDb21tZW50KHN0cmVhbSwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaCA9PT0gbGluZUNvbW1lbnRTdGFydFN5bWJvbCkge1xuICAgICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICAgIG5leHRVbnRpbFVuZXNjYXBlZChzdHJlYW0sICdcIicpO1xuICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoID09PSAnLicpIHtcbiAgICAgICAgc3RyZWFtLmVhdFdoaWxlKC9cXHcvKTtcbiAgICAgICAgY3VyID0gc3RyZWFtLmN1cnJlbnQoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBzdHlsZSA9IGRpcmVjdGl2ZXNbY3VyXTtcbiAgICAgICAgcmV0dXJuIHN0eWxlIHx8IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaCA9PT0gJz0nKSB7XG4gICAgICAgIHN0cmVhbS5lYXRXaGlsZSgvXFx3Lyk7XG4gICAgICAgIHJldHVybiBcInRhZ1wiO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ggPT09ICd7Jykge1xuICAgICAgICByZXR1cm4gXCJicmFja2V0XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgIHJldHVybiBcImJyYWNrZXRcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKC9cXGQvLnRlc3QoY2gpKSB7XG4gICAgICAgIGlmIChjaCA9PT0gXCIwXCIgJiYgc3RyZWFtLmVhdChcInhcIikpIHtcbiAgICAgICAgICBzdHJlYW0uZWF0V2hpbGUoL1swLTlhLWZBLUZdLyk7XG4gICAgICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtLmVhdFdoaWxlKC9cXGQvKTtcbiAgICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gICAgICB9XG5cbiAgICAgIGlmICgvXFx3Ly50ZXN0KGNoKSkge1xuICAgICAgICBzdHJlYW0uZWF0V2hpbGUoL1xcdy8pO1xuICAgICAgICBpZiAoc3RyZWFtLmVhdChcIjpcIikpIHtcbiAgICAgICAgICByZXR1cm4gJ3RhZyc7XG4gICAgICAgIH1cbiAgICAgICAgY3VyID0gc3RyZWFtLmN1cnJlbnQoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBzdHlsZSA9IHJlZ2lzdGVyc1tjdXJdO1xuICAgICAgICByZXR1cm4gc3R5bGUgfHwgbnVsbDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXN0b20ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3R5bGUgPSBjdXN0b21baV0oY2gsIHN0cmVhbSwgc3RhdGUpO1xuICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgICBjb21tZW50VG9rZW5zOiB7XG4gICAgICAgIGxpbmU6IGxpbmVDb21tZW50U3RhcnRTeW1ib2wsXG4gICAgICAgIGJsb2NrOiB7b3BlbjogXCIvKlwiLCBjbG9zZTogXCIqL1wifVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnYXMgPSBta0dhcyhcIng4NlwiKVxuZXhwb3J0IGNvbnN0IGdhc0FybSA9IG1rR2FzKFwiYXJtXCIpXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///384\n')}}]);