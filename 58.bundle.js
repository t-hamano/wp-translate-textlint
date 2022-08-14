(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{401:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mbox", function() { return mbox; });\nvar rfc2822 = [\n  "From", "Sender", "Reply-To", "To", "Cc", "Bcc", "Message-ID",\n  "In-Reply-To", "References", "Resent-From", "Resent-Sender", "Resent-To",\n  "Resent-Cc", "Resent-Bcc", "Resent-Message-ID", "Return-Path", "Received"\n];\nvar rfc2822NoEmail = [\n  "Date", "Subject", "Comments", "Keywords", "Resent-Date"\n];\n\nvar whitespace = /^[ \\t]/;\nvar separator = /^From /; // See RFC 4155\nvar rfc2822Header = new RegExp("^(" + rfc2822.join("|") + "): ");\nvar rfc2822HeaderNoEmail = new RegExp("^(" + rfc2822NoEmail.join("|") + "): ");\nvar header = /^[^:]+:/; // Optional fields defined in RFC 2822\nvar email = /^[^ ]+@[^ ]+/;\nvar untilEmail = /^.*?(?=[^ ]+?@[^ ]+)/;\nvar bracketedEmail = /^<.*?>/;\nvar untilBracketedEmail = /^.*?(?=<.*>)/;\n\nfunction styleForHeader(header) {\n  if (header === "Subject") return "header";\n  return "string";\n}\n\nfunction readToken(stream, state) {\n  if (stream.sol()) {\n    // From last line\n    state.inSeparator = false;\n    if (state.inHeader && stream.match(whitespace)) {\n      // Header folding\n      return null;\n    } else {\n      state.inHeader = false;\n      state.header = null;\n    }\n\n    if (stream.match(separator)) {\n      state.inHeaders = true;\n      state.inSeparator = true;\n      return "atom";\n    }\n\n    var match;\n    var emailPermitted = false;\n    if ((match = stream.match(rfc2822HeaderNoEmail)) ||\n        (emailPermitted = true) && (match = stream.match(rfc2822Header))) {\n      state.inHeaders = true;\n      state.inHeader = true;\n      state.emailPermitted = emailPermitted;\n      state.header = match[1];\n      return "atom";\n    }\n\n    // Use vim\'s heuristics: recognize custom headers only if the line is in a\n    // block of legitimate headers.\n    if (state.inHeaders && (match = stream.match(header))) {\n      state.inHeader = true;\n      state.emailPermitted = true;\n      state.header = match[1];\n      return "atom";\n    }\n\n    state.inHeaders = false;\n    stream.skipToEnd();\n    return null;\n  }\n\n  if (state.inSeparator) {\n    if (stream.match(email)) return "link";\n    if (stream.match(untilEmail)) return "atom";\n    stream.skipToEnd();\n    return "atom";\n  }\n\n  if (state.inHeader) {\n    var style = styleForHeader(state.header);\n\n    if (state.emailPermitted) {\n      if (stream.match(bracketedEmail)) return style + " link";\n      if (stream.match(untilBracketedEmail)) return style;\n    }\n    stream.skipToEnd();\n    return style;\n  }\n\n  stream.skipToEnd();\n  return null;\n};\n\nconst mbox = {\n  startState: function() {\n    return {\n      // Is in a mbox separator\n      inSeparator: false,\n      // Is in a mail header\n      inHeader: false,\n      // If bracketed email is permitted. Only applicable when inHeader\n      emailPermitted: false,\n      // Name of current header\n      header: null,\n      // Is in a region of mail headers\n      inHeaders: false\n    };\n  },\n  token: readToken,\n  blankLine: function(state) {\n    state.inHeaders = state.inSeparator = state.inHeader = false;\n  },\n  languageData: {\n    autocomplete: rfc2822.concat(rfc2822NoEmail)\n  }\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvbWJveC5qcz80MzVmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNDAxLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJmYzI4MjIgPSBbXG4gIFwiRnJvbVwiLCBcIlNlbmRlclwiLCBcIlJlcGx5LVRvXCIsIFwiVG9cIiwgXCJDY1wiLCBcIkJjY1wiLCBcIk1lc3NhZ2UtSURcIixcbiAgXCJJbi1SZXBseS1Ub1wiLCBcIlJlZmVyZW5jZXNcIiwgXCJSZXNlbnQtRnJvbVwiLCBcIlJlc2VudC1TZW5kZXJcIiwgXCJSZXNlbnQtVG9cIixcbiAgXCJSZXNlbnQtQ2NcIiwgXCJSZXNlbnQtQmNjXCIsIFwiUmVzZW50LU1lc3NhZ2UtSURcIiwgXCJSZXR1cm4tUGF0aFwiLCBcIlJlY2VpdmVkXCJcbl07XG52YXIgcmZjMjgyMk5vRW1haWwgPSBbXG4gIFwiRGF0ZVwiLCBcIlN1YmplY3RcIiwgXCJDb21tZW50c1wiLCBcIktleXdvcmRzXCIsIFwiUmVzZW50LURhdGVcIlxuXTtcblxudmFyIHdoaXRlc3BhY2UgPSAvXlsgXFx0XS87XG52YXIgc2VwYXJhdG9yID0gL15Gcm9tIC87IC8vIFNlZSBSRkMgNDE1NVxudmFyIHJmYzI4MjJIZWFkZXIgPSBuZXcgUmVnRXhwKFwiXihcIiArIHJmYzI4MjIuam9pbihcInxcIikgKyBcIik6IFwiKTtcbnZhciByZmMyODIySGVhZGVyTm9FbWFpbCA9IG5ldyBSZWdFeHAoXCJeKFwiICsgcmZjMjgyMk5vRW1haWwuam9pbihcInxcIikgKyBcIik6IFwiKTtcbnZhciBoZWFkZXIgPSAvXlteOl0rOi87IC8vIE9wdGlvbmFsIGZpZWxkcyBkZWZpbmVkIGluIFJGQyAyODIyXG52YXIgZW1haWwgPSAvXlteIF0rQFteIF0rLztcbnZhciB1bnRpbEVtYWlsID0gL14uKj8oPz1bXiBdKz9AW14gXSspLztcbnZhciBicmFja2V0ZWRFbWFpbCA9IC9ePC4qPz4vO1xudmFyIHVudGlsQnJhY2tldGVkRW1haWwgPSAvXi4qPyg/PTwuKj4pLztcblxuZnVuY3Rpb24gc3R5bGVGb3JIZWFkZXIoaGVhZGVyKSB7XG4gIGlmIChoZWFkZXIgPT09IFwiU3ViamVjdFwiKSByZXR1cm4gXCJoZWFkZXJcIjtcbiAgcmV0dXJuIFwic3RyaW5nXCI7XG59XG5cbmZ1bmN0aW9uIHJlYWRUb2tlbihzdHJlYW0sIHN0YXRlKSB7XG4gIGlmIChzdHJlYW0uc29sKCkpIHtcbiAgICAvLyBGcm9tIGxhc3QgbGluZVxuICAgIHN0YXRlLmluU2VwYXJhdG9yID0gZmFsc2U7XG4gICAgaWYgKHN0YXRlLmluSGVhZGVyICYmIHN0cmVhbS5tYXRjaCh3aGl0ZXNwYWNlKSkge1xuICAgICAgLy8gSGVhZGVyIGZvbGRpbmdcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5pbkhlYWRlciA9IGZhbHNlO1xuICAgICAgc3RhdGUuaGVhZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtLm1hdGNoKHNlcGFyYXRvcikpIHtcbiAgICAgIHN0YXRlLmluSGVhZGVycyA9IHRydWU7XG4gICAgICBzdGF0ZS5pblNlcGFyYXRvciA9IHRydWU7XG4gICAgICByZXR1cm4gXCJhdG9tXCI7XG4gICAgfVxuXG4gICAgdmFyIG1hdGNoO1xuICAgIHZhciBlbWFpbFBlcm1pdHRlZCA9IGZhbHNlO1xuICAgIGlmICgobWF0Y2ggPSBzdHJlYW0ubWF0Y2gocmZjMjgyMkhlYWRlck5vRW1haWwpKSB8fFxuICAgICAgICAoZW1haWxQZXJtaXR0ZWQgPSB0cnVlKSAmJiAobWF0Y2ggPSBzdHJlYW0ubWF0Y2gocmZjMjgyMkhlYWRlcikpKSB7XG4gICAgICBzdGF0ZS5pbkhlYWRlcnMgPSB0cnVlO1xuICAgICAgc3RhdGUuaW5IZWFkZXIgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1haWxQZXJtaXR0ZWQgPSBlbWFpbFBlcm1pdHRlZDtcbiAgICAgIHN0YXRlLmhlYWRlciA9IG1hdGNoWzFdO1xuICAgICAgcmV0dXJuIFwiYXRvbVwiO1xuICAgIH1cblxuICAgIC8vIFVzZSB2aW0ncyBoZXVyaXN0aWNzOiByZWNvZ25pemUgY3VzdG9tIGhlYWRlcnMgb25seSBpZiB0aGUgbGluZSBpcyBpbiBhXG4gICAgLy8gYmxvY2sgb2YgbGVnaXRpbWF0ZSBoZWFkZXJzLlxuICAgIGlmIChzdGF0ZS5pbkhlYWRlcnMgJiYgKG1hdGNoID0gc3RyZWFtLm1hdGNoKGhlYWRlcikpKSB7XG4gICAgICBzdGF0ZS5pbkhlYWRlciA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFBlcm1pdHRlZCA9IHRydWU7XG4gICAgICBzdGF0ZS5oZWFkZXIgPSBtYXRjaFsxXTtcbiAgICAgIHJldHVybiBcImF0b21cIjtcbiAgICB9XG5cbiAgICBzdGF0ZS5pbkhlYWRlcnMgPSBmYWxzZTtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoc3RhdGUuaW5TZXBhcmF0b3IpIHtcbiAgICBpZiAoc3RyZWFtLm1hdGNoKGVtYWlsKSkgcmV0dXJuIFwibGlua1wiO1xuICAgIGlmIChzdHJlYW0ubWF0Y2godW50aWxFbWFpbCkpIHJldHVybiBcImF0b21cIjtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIFwiYXRvbVwiO1xuICB9XG5cbiAgaWYgKHN0YXRlLmluSGVhZGVyKSB7XG4gICAgdmFyIHN0eWxlID0gc3R5bGVGb3JIZWFkZXIoc3RhdGUuaGVhZGVyKTtcblxuICAgIGlmIChzdGF0ZS5lbWFpbFBlcm1pdHRlZCkge1xuICAgICAgaWYgKHN0cmVhbS5tYXRjaChicmFja2V0ZWRFbWFpbCkpIHJldHVybiBzdHlsZSArIFwiIGxpbmtcIjtcbiAgICAgIGlmIChzdHJlYW0ubWF0Y2godW50aWxCcmFja2V0ZWRFbWFpbCkpIHJldHVybiBzdHlsZTtcbiAgICB9XG4gICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfVxuXG4gIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgbWJveCA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIElzIGluIGEgbWJveCBzZXBhcmF0b3JcbiAgICAgIGluU2VwYXJhdG9yOiBmYWxzZSxcbiAgICAgIC8vIElzIGluIGEgbWFpbCBoZWFkZXJcbiAgICAgIGluSGVhZGVyOiBmYWxzZSxcbiAgICAgIC8vIElmIGJyYWNrZXRlZCBlbWFpbCBpcyBwZXJtaXR0ZWQuIE9ubHkgYXBwbGljYWJsZSB3aGVuIGluSGVhZGVyXG4gICAgICBlbWFpbFBlcm1pdHRlZDogZmFsc2UsXG4gICAgICAvLyBOYW1lIG9mIGN1cnJlbnQgaGVhZGVyXG4gICAgICBoZWFkZXI6IG51bGwsXG4gICAgICAvLyBJcyBpbiBhIHJlZ2lvbiBvZiBtYWlsIGhlYWRlcnNcbiAgICAgIGluSGVhZGVyczogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0b2tlbjogcmVhZFRva2VuLFxuICBibGFua0xpbmU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUuaW5IZWFkZXJzID0gc3RhdGUuaW5TZXBhcmF0b3IgPSBzdGF0ZS5pbkhlYWRlciA9IGZhbHNlO1xuICB9LFxuICBsYW5ndWFnZURhdGE6IHtcbiAgICBhdXRvY29tcGxldGU6IHJmYzI4MjIuY29uY2F0KHJmYzI4MjJOb0VtYWlsKVxuICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///401\n')}}]);