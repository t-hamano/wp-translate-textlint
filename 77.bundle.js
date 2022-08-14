(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{417:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sas\", function() { return sas; });\nvar words = {};\nvar isDoubleOperatorSym = {\n  eq: 'operator',\n  lt: 'operator',\n  le: 'operator',\n  gt: 'operator',\n  ge: 'operator',\n  \"in\": 'operator',\n  ne: 'operator',\n  or: 'operator'\n};\nvar isDoubleOperatorChar = /(<=|>=|!=|<>)/;\nvar isSingleOperatorChar = /[=\\(:\\),{}.*<>+\\-\\/^\\[\\]]/;\n\n// Takes a string of words separated by spaces and adds them as\n// keys with the value of the first argument 'style'\nfunction define(style, string, context) {\n  if (context) {\n    var split = string.split(' ');\n    for (var i = 0; i < split.length; i++) {\n      words[split[i]] = {style: style, state: context};\n    }\n  }\n}\n//datastep\ndefine('def', 'stack pgm view source debug nesting nolist', ['inDataStep']);\ndefine('def', 'if while until for do do; end end; then else cancel', ['inDataStep']);\ndefine('def', 'label format _n_ _error_', ['inDataStep']);\ndefine('def', 'ALTER BUFNO BUFSIZE CNTLLEV COMPRESS DLDMGACTION ENCRYPT ENCRYPTKEY EXTENDOBSCOUNTER GENMAX GENNUM INDEX LABEL OBSBUF OUTREP PW PWREQ READ REPEMPTY REPLACE REUSE ROLE SORTEDBY SPILL TOBSNO TYPE WRITE FILECLOSE FIRSTOBS IN OBS POINTOBS WHERE WHEREUP IDXNAME IDXWHERE DROP KEEP RENAME', ['inDataStep']);\ndefine('def', 'filevar finfo finv fipname fipnamel fipstate first firstobs floor', ['inDataStep']);\ndefine('def', 'varfmt varinfmt varlabel varlen varname varnum varray varrayx vartype verify vformat vformatd vformatdx vformatn vformatnx vformatw vformatwx vformatx vinarray vinarrayx vinformat vinformatd vinformatdx vinformatn vinformatnx vinformatw vinformatwx vinformatx vlabel vlabelx vlength vlengthx vname vnamex vnferr vtype vtypex weekday', ['inDataStep']);\ndefine('def', 'zipfips zipname zipnamel zipstate', ['inDataStep']);\ndefine('def', 'put putc putn', ['inDataStep']);\ndefine('builtin', 'data run', ['inDataStep']);\n\n\n//proc\ndefine('def', 'data', ['inProc']);\n\n// flow control for macros\ndefine('def', '%if %end %end; %else %else; %do %do; %then', ['inMacro']);\n\n//everywhere\ndefine('builtin', 'proc run; quit; libname filename %macro %mend option options', ['ALL']);\n\ndefine('def', 'footnote title libname ods', ['ALL']);\ndefine('def', '%let %put %global %sysfunc %eval ', ['ALL']);\n// automatic macro variables http://support.sas.com/documentation/cdl/en/mcrolref/61885/HTML/default/viewer.htm#a003167023.htm\ndefine('variable', '&sysbuffr &syscc &syscharwidth &syscmd &sysdate &sysdate9 &sysday &sysdevic &sysdmg &sysdsn &sysencoding &sysenv &syserr &syserrortext &sysfilrc &syshostname &sysindex &sysinfo &sysjobid &syslast &syslckrc &syslibrc &syslogapplname &sysmacroname &sysmenv &sysmsg &sysncpu &sysodspath &sysparm &syspbuff &sysprocessid &sysprocessname &sysprocname &sysrc &sysscp &sysscpl &sysscpl &syssite &sysstartid &sysstartname &systcpiphostname &systime &sysuserid &sysver &sysvlong &sysvlong4 &syswarningtext', ['ALL']);\n\n//footnote[1-9]? title[1-9]?\n\n//options statement\ndefine('def', 'source2 nosource2 page pageno pagesize', ['ALL']);\n\n//proc and datastep\ndefine('def', '_all_ _character_ _cmd_ _freq_ _i_ _infile_ _last_ _msg_ _null_ _numeric_ _temporary_ _type_ abort abs addr adjrsq airy alpha alter altlog altprint and arcos array arsin as atan attrc attrib attrn authserver autoexec awscontrol awsdef awsmenu awsmenumerge awstitle backward band base betainv between blocksize blshift bnot bor brshift bufno bufsize bxor by byerr byline byte calculated call cards cards4 catcache cbufno cdf ceil center cexist change chisq cinv class cleanup close cnonct cntllev coalesce codegen col collate collin column comamid comaux1 comaux2 comdef compbl compound compress config continue convert cos cosh cpuid create cross crosstab css curobs cv daccdb daccdbsl daccsl daccsyd dacctab dairy datalines datalines4 datejul datepart datetime day dbcslang dbcstype dclose ddfm ddm delete delimiter depdb depdbsl depsl depsyd deptab dequote descending descript design= device dflang dhms dif digamma dim dinfo display distinct dkricond dkrocond dlm dnum do dopen doptname doptnum dread drop dropnote dsname dsnferr echo else emaildlg emailid emailpw emailserver emailsys encrypt end endsas engine eof eov erf erfc error errorcheck errors exist exp fappend fclose fcol fdelete feedback fetch fetchobs fexist fget file fileclose fileexist filefmt filename fileref  fmterr fmtsearch fnonct fnote font fontalias  fopen foptname foptnum force formatted formchar formdelim formdlim forward fpoint fpos fput fread frewind frlen from fsep fuzz fwrite gaminv gamma getoption getvarc getvarn go goto group gwindow hbar hbound helpenv helploc hms honorappearance hosthelp hostprint hour hpct html hvar ibessel ibr id if index indexc indexw initcmd initstmt inner input inputc inputn inr insert int intck intnx into intrr invaliddata irr is jbessel join juldate keep kentb kurtosis label lag last lbound leave left length levels lgamma lib  library libref line linesize link list log log10 log2 logpdf logpmf logsdf lostcard lowcase lrecl ls macro macrogen maps mautosource max maxdec maxr mdy mean measures median memtype merge merror min minute missing missover mlogic mod mode model modify month mopen mort mprint mrecall msglevel msymtabmax mvarsize myy n nest netpv new news nmiss no nobatch nobs nocaps nocardimage nocenter nocharcode nocmdmac nocol nocum nodate nodbcs nodetails nodmr nodms nodmsbatch nodup nodupkey noduplicates noechoauto noequals noerrorabend noexitwindows nofullstimer noicon noimplmac noint nolist noloadlist nomiss nomlogic nomprint nomrecall nomsgcase nomstored nomultenvappl nonotes nonumber noobs noovp nopad nopercent noprint noprintinit normal norow norsasuser nosetinit  nosplash nosymbolgen note notes notitle notitles notsorted noverbose noxsync noxwait npv null number numkeys nummousekeys nway obs  on open     order ordinal otherwise out outer outp= output over ovp p(1 5 10 25 50 75 90 95 99) pad pad2  paired parm parmcards path pathdll pathname pdf peek peekc pfkey pmf point poisson poke position printer probbeta probbnml probchi probf probgam probhypr probit probnegb probnorm probsig probt procleave prt ps  pw pwreq qtr quote r ranbin rancau random ranexp rangam range ranks rannor ranpoi rantbl rantri ranuni rcorr read recfm register regr remote remove rename repeat repeated replace resolve retain return reuse reverse rewind right round rsquare rtf rtrace rtraceloc s s2 samploc sasautos sascontrol sasfrscr sasmsg sasmstore sasscript sasuser saving scan sdf second select selection separated seq serror set setcomm setot sign simple sin sinh siteinfo skewness skip sle sls sortedby sortpgm sortseq sortsize soundex  spedis splashlocation split spool sqrt start std stderr stdin stfips stimer stname stnamel stop stopover sub subgroup subpopn substr sum sumwgt symbol symbolgen symget symput sysget sysin sysleave sysmsg sysparm sysprint sysprintfont sysprod sysrc system t table tables tan tanh tapeclose tbufsize terminal test then timepart tinv  tnonct to today tol tooldef totper transformout translate trantab tranwrd trigamma trim trimn trunc truncover type unformatted uniform union until upcase update user usericon uss validate value var  weight when where while wincharset window work workinit workterm write wsum xsync xwait yearcutoff yes yyq  min max', ['inDataStep', 'inProc']);\ndefine('operator', 'and not ', ['inDataStep', 'inProc']);\n\n// Main function\nfunction tokenize(stream, state) {\n  // Finally advance the stream\n  var ch = stream.next();\n\n  // BLOCKCOMMENT\n  if (ch === '/' && stream.eat('*')) {\n    state.continueComment = true;\n    return \"comment\";\n  } else if (state.continueComment === true) { // in comment block\n    //comment ends at the beginning of the line\n    if (ch === '*' && stream.peek() === '/') {\n      stream.next();\n      state.continueComment = false;\n    } else if (stream.skipTo('*')) { //comment is potentially later in line\n      stream.skipTo('*');\n      stream.next();\n      if (stream.eat('/'))\n        state.continueComment = false;\n    } else {\n      stream.skipToEnd();\n    }\n    return \"comment\";\n  }\n\n  if (ch == \"*\" && stream.column() == stream.indentation()) {\n    stream.skipToEnd()\n    return \"comment\"\n  }\n\n  // DoubleOperator match\n  var doubleOperator = ch + stream.peek();\n\n  if ((ch === '\"' || ch === \"'\") && !state.continueString) {\n    state.continueString = ch\n    return \"string\"\n  } else if (state.continueString) {\n    if (state.continueString == ch) {\n      state.continueString = null;\n    } else if (stream.skipTo(state.continueString)) {\n      // quote found on this line\n      stream.next();\n      state.continueString = null;\n    } else {\n      stream.skipToEnd();\n    }\n    return \"string\";\n  } else if (state.continueString !== null && stream.eol()) {\n    stream.skipTo(state.continueString) || stream.skipToEnd();\n    return \"string\";\n  } else if (/[\\d\\.]/.test(ch)) { //find numbers\n    if (ch === \".\")\n      stream.match(/^[0-9]+([eE][\\-+]?[0-9]+)?/);\n    else if (ch === \"0\")\n      stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);\n    else\n      stream.match(/^[0-9]*\\.?[0-9]*([eE][\\-+]?[0-9]+)?/);\n    return \"number\";\n  } else if (isDoubleOperatorChar.test(ch + stream.peek())) { // TWO SYMBOL TOKENS\n    stream.next();\n    return \"operator\";\n  } else if (isDoubleOperatorSym.hasOwnProperty(doubleOperator)) {\n    stream.next();\n    if (stream.peek() === ' ')\n      return isDoubleOperatorSym[doubleOperator.toLowerCase()];\n  } else if (isSingleOperatorChar.test(ch)) { // SINGLE SYMBOL TOKENS\n    return \"operator\";\n  }\n\n  // Matches one whole word -- even if the word is a character\n  var word;\n  if (stream.match(/[%&;\\w]+/, false) != null) {\n    word = ch + stream.match(/[%&;\\w]+/, true);\n    if (/&/.test(word)) return 'variable'\n  } else {\n    word = ch;\n  }\n  // the word after DATA PROC or MACRO\n  if (state.nextword) {\n    stream.match(/[\\w]+/);\n    // match memname.libname\n    if (stream.peek() === '.') stream.skipTo(' ');\n    state.nextword = false;\n    return 'variableName.special';\n  }\n\n  word = word.toLowerCase()\n  // Are we in a DATA Step?\n  if (state.inDataStep) {\n    if (word === 'run;' || stream.match(/run\\s;/)) {\n      state.inDataStep = false;\n      return 'builtin';\n    }\n    // variable formats\n    if ((word) && stream.next() === '.') {\n      //either a format or libname.memname\n      if (/\\w/.test(stream.peek())) return 'variableName.special';\n      else return 'variable';\n    }\n    // do we have a DATA Step keyword\n    if (word && words.hasOwnProperty(word) &&\n        (words[word].state.indexOf(\"inDataStep\") !== -1 ||\n         words[word].state.indexOf(\"ALL\") !== -1)) {\n      //backup to the start of the word\n      if (stream.start < stream.pos)\n        stream.backUp(stream.pos - stream.start);\n      //advance the length of the word and return\n      for (var i = 0; i < word.length; ++i) stream.next();\n      return words[word].style;\n    }\n  }\n  // Are we in an Proc statement?\n  if (state.inProc) {\n    if (word === 'run;' || word === 'quit;') {\n      state.inProc = false;\n      return 'builtin';\n    }\n    // do we have a proc keyword\n    if (word && words.hasOwnProperty(word) &&\n        (words[word].state.indexOf(\"inProc\") !== -1 ||\n         words[word].state.indexOf(\"ALL\") !== -1)) {\n      stream.match(/[\\w]+/);\n      return words[word].style;\n    }\n  }\n  // Are we in a Macro statement?\n  if (state.inMacro) {\n    if (word === '%mend') {\n      if (stream.peek() === ';') stream.next();\n      state.inMacro = false;\n      return 'builtin';\n    }\n    if (word && words.hasOwnProperty(word) &&\n        (words[word].state.indexOf(\"inMacro\") !== -1 ||\n         words[word].state.indexOf(\"ALL\") !== -1)) {\n      stream.match(/[\\w]+/);\n      return words[word].style;\n    }\n\n    return 'atom';\n  }\n  // Do we have Keywords specific words?\n  if (word && words.hasOwnProperty(word)) {\n    // Negates the initial next()\n    stream.backUp(1);\n    // Actually move the stream\n    stream.match(/[\\w]+/);\n    if (word === 'data' && /=/.test(stream.peek()) === false) {\n      state.inDataStep = true;\n      state.nextword = true;\n      return 'builtin';\n    }\n    if (word === 'proc') {\n      state.inProc = true;\n      state.nextword = true;\n      return 'builtin';\n    }\n    if (word === '%macro') {\n      state.inMacro = true;\n      state.nextword = true;\n      return 'builtin';\n    }\n    if (/title[1-9]/.test(word)) return 'def';\n\n    if (word === 'footnote') {\n      stream.eat(/[1-9]/);\n      return 'def';\n    }\n\n    // Returns their value as state in the prior define methods\n    if (state.inDataStep === true && words[word].state.indexOf(\"inDataStep\") !== -1)\n      return words[word].style;\n    if (state.inProc === true && words[word].state.indexOf(\"inProc\") !== -1)\n      return words[word].style;\n    if (state.inMacro === true && words[word].state.indexOf(\"inMacro\") !== -1)\n      return words[word].style;\n    if (words[word].state.indexOf(\"ALL\") !== -1)\n      return words[word].style;\n    return null;\n  }\n  // Unrecognized syntax\n  return null;\n}\n\nconst sas = {\n  startState: function () {\n    return {\n      inDataStep: false,\n      inProc: false,\n      inMacro: false,\n      nextword: false,\n      continueString: null,\n      continueComment: false\n    };\n  },\n  token: function (stream, state) {\n    // Strip the spaces, but regex will account for them either way\n    if (stream.eatSpace()) return null;\n    // Go through the main process\n    return tokenize(stream, state);\n  },\n\n  languageData: {\n    commentTokens: {block: {open: \"/*\", close: \"*/\"}}\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvc2FzLmpzPzkwNjQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixhQUFhLFNBQVM7O0FBRW5EO0FBQ0EsNEJBQTRCLE1BQU07O0FBRWxDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRywyQ0FBMkM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtCQUErQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUcsOEJBQThCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRywwREFBMEQ7QUFDN0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHLDBDQUEwQztBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsa0NBQWtDO0FBQ2xDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5QkFBeUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixvQkFBb0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBIiwiZmlsZSI6IjQxNy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB3b3JkcyA9IHt9O1xudmFyIGlzRG91YmxlT3BlcmF0b3JTeW0gPSB7XG4gIGVxOiAnb3BlcmF0b3InLFxuICBsdDogJ29wZXJhdG9yJyxcbiAgbGU6ICdvcGVyYXRvcicsXG4gIGd0OiAnb3BlcmF0b3InLFxuICBnZTogJ29wZXJhdG9yJyxcbiAgXCJpblwiOiAnb3BlcmF0b3InLFxuICBuZTogJ29wZXJhdG9yJyxcbiAgb3I6ICdvcGVyYXRvcidcbn07XG52YXIgaXNEb3VibGVPcGVyYXRvckNoYXIgPSAvKDw9fD49fCE9fDw+KS87XG52YXIgaXNTaW5nbGVPcGVyYXRvckNoYXIgPSAvWz1cXCg6XFwpLHt9Lio8PitcXC1cXC9eXFxbXFxdXS87XG5cbi8vIFRha2VzIGEgc3RyaW5nIG9mIHdvcmRzIHNlcGFyYXRlZCBieSBzcGFjZXMgYW5kIGFkZHMgdGhlbSBhc1xuLy8ga2V5cyB3aXRoIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgYXJndW1lbnQgJ3N0eWxlJ1xuZnVuY3Rpb24gZGVmaW5lKHN0eWxlLCBzdHJpbmcsIGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQpIHtcbiAgICB2YXIgc3BsaXQgPSBzdHJpbmcuc3BsaXQoJyAnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwbGl0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB3b3Jkc1tzcGxpdFtpXV0gPSB7c3R5bGU6IHN0eWxlLCBzdGF0ZTogY29udGV4dH07XG4gICAgfVxuICB9XG59XG4vL2RhdGFzdGVwXG5kZWZpbmUoJ2RlZicsICdzdGFjayBwZ20gdmlldyBzb3VyY2UgZGVidWcgbmVzdGluZyBub2xpc3QnLCBbJ2luRGF0YVN0ZXAnXSk7XG5kZWZpbmUoJ2RlZicsICdpZiB3aGlsZSB1bnRpbCBmb3IgZG8gZG87IGVuZCBlbmQ7IHRoZW4gZWxzZSBjYW5jZWwnLCBbJ2luRGF0YVN0ZXAnXSk7XG5kZWZpbmUoJ2RlZicsICdsYWJlbCBmb3JtYXQgX25fIF9lcnJvcl8nLCBbJ2luRGF0YVN0ZXAnXSk7XG5kZWZpbmUoJ2RlZicsICdBTFRFUiBCVUZOTyBCVUZTSVpFIENOVExMRVYgQ09NUFJFU1MgRExETUdBQ1RJT04gRU5DUllQVCBFTkNSWVBUS0VZIEVYVEVORE9CU0NPVU5URVIgR0VOTUFYIEdFTk5VTSBJTkRFWCBMQUJFTCBPQlNCVUYgT1VUUkVQIFBXIFBXUkVRIFJFQUQgUkVQRU1QVFkgUkVQTEFDRSBSRVVTRSBST0xFIFNPUlRFREJZIFNQSUxMIFRPQlNOTyBUWVBFIFdSSVRFIEZJTEVDTE9TRSBGSVJTVE9CUyBJTiBPQlMgUE9JTlRPQlMgV0hFUkUgV0hFUkVVUCBJRFhOQU1FIElEWFdIRVJFIERST1AgS0VFUCBSRU5BTUUnLCBbJ2luRGF0YVN0ZXAnXSk7XG5kZWZpbmUoJ2RlZicsICdmaWxldmFyIGZpbmZvIGZpbnYgZmlwbmFtZSBmaXBuYW1lbCBmaXBzdGF0ZSBmaXJzdCBmaXJzdG9icyBmbG9vcicsIFsnaW5EYXRhU3RlcCddKTtcbmRlZmluZSgnZGVmJywgJ3ZhcmZtdCB2YXJpbmZtdCB2YXJsYWJlbCB2YXJsZW4gdmFybmFtZSB2YXJudW0gdmFycmF5IHZhcnJheXggdmFydHlwZSB2ZXJpZnkgdmZvcm1hdCB2Zm9ybWF0ZCB2Zm9ybWF0ZHggdmZvcm1hdG4gdmZvcm1hdG54IHZmb3JtYXR3IHZmb3JtYXR3eCB2Zm9ybWF0eCB2aW5hcnJheSB2aW5hcnJheXggdmluZm9ybWF0IHZpbmZvcm1hdGQgdmluZm9ybWF0ZHggdmluZm9ybWF0biB2aW5mb3JtYXRueCB2aW5mb3JtYXR3IHZpbmZvcm1hdHd4IHZpbmZvcm1hdHggdmxhYmVsIHZsYWJlbHggdmxlbmd0aCB2bGVuZ3RoeCB2bmFtZSB2bmFtZXggdm5mZXJyIHZ0eXBlIHZ0eXBleCB3ZWVrZGF5JywgWydpbkRhdGFTdGVwJ10pO1xuZGVmaW5lKCdkZWYnLCAnemlwZmlwcyB6aXBuYW1lIHppcG5hbWVsIHppcHN0YXRlJywgWydpbkRhdGFTdGVwJ10pO1xuZGVmaW5lKCdkZWYnLCAncHV0IHB1dGMgcHV0bicsIFsnaW5EYXRhU3RlcCddKTtcbmRlZmluZSgnYnVpbHRpbicsICdkYXRhIHJ1bicsIFsnaW5EYXRhU3RlcCddKTtcblxuXG4vL3Byb2NcbmRlZmluZSgnZGVmJywgJ2RhdGEnLCBbJ2luUHJvYyddKTtcblxuLy8gZmxvdyBjb250cm9sIGZvciBtYWNyb3NcbmRlZmluZSgnZGVmJywgJyVpZiAlZW5kICVlbmQ7ICVlbHNlICVlbHNlOyAlZG8gJWRvOyAldGhlbicsIFsnaW5NYWNybyddKTtcblxuLy9ldmVyeXdoZXJlXG5kZWZpbmUoJ2J1aWx0aW4nLCAncHJvYyBydW47IHF1aXQ7IGxpYm5hbWUgZmlsZW5hbWUgJW1hY3JvICVtZW5kIG9wdGlvbiBvcHRpb25zJywgWydBTEwnXSk7XG5cbmRlZmluZSgnZGVmJywgJ2Zvb3Rub3RlIHRpdGxlIGxpYm5hbWUgb2RzJywgWydBTEwnXSk7XG5kZWZpbmUoJ2RlZicsICclbGV0ICVwdXQgJWdsb2JhbCAlc3lzZnVuYyAlZXZhbCAnLCBbJ0FMTCddKTtcbi8vIGF1dG9tYXRpYyBtYWNybyB2YXJpYWJsZXMgaHR0cDovL3N1cHBvcnQuc2FzLmNvbS9kb2N1bWVudGF0aW9uL2NkbC9lbi9tY3JvbHJlZi82MTg4NS9IVE1ML2RlZmF1bHQvdmlld2VyLmh0bSNhMDAzMTY3MDIzLmh0bVxuZGVmaW5lKCd2YXJpYWJsZScsICcmc3lzYnVmZnIgJnN5c2NjICZzeXNjaGFyd2lkdGggJnN5c2NtZCAmc3lzZGF0ZSAmc3lzZGF0ZTkgJnN5c2RheSAmc3lzZGV2aWMgJnN5c2RtZyAmc3lzZHNuICZzeXNlbmNvZGluZyAmc3lzZW52ICZzeXNlcnIgJnN5c2Vycm9ydGV4dCAmc3lzZmlscmMgJnN5c2hvc3RuYW1lICZzeXNpbmRleCAmc3lzaW5mbyAmc3lzam9iaWQgJnN5c2xhc3QgJnN5c2xja3JjICZzeXNsaWJyYyAmc3lzbG9nYXBwbG5hbWUgJnN5c21hY3JvbmFtZSAmc3lzbWVudiAmc3lzbXNnICZzeXNuY3B1ICZzeXNvZHNwYXRoICZzeXNwYXJtICZzeXNwYnVmZiAmc3lzcHJvY2Vzc2lkICZzeXNwcm9jZXNzbmFtZSAmc3lzcHJvY25hbWUgJnN5c3JjICZzeXNzY3AgJnN5c3NjcGwgJnN5c3NjcGwgJnN5c3NpdGUgJnN5c3N0YXJ0aWQgJnN5c3N0YXJ0bmFtZSAmc3lzdGNwaXBob3N0bmFtZSAmc3lzdGltZSAmc3lzdXNlcmlkICZzeXN2ZXIgJnN5c3Zsb25nICZzeXN2bG9uZzQgJnN5c3dhcm5pbmd0ZXh0JywgWydBTEwnXSk7XG5cbi8vZm9vdG5vdGVbMS05XT8gdGl0bGVbMS05XT9cblxuLy9vcHRpb25zIHN0YXRlbWVudFxuZGVmaW5lKCdkZWYnLCAnc291cmNlMiBub3NvdXJjZTIgcGFnZSBwYWdlbm8gcGFnZXNpemUnLCBbJ0FMTCddKTtcblxuLy9wcm9jIGFuZCBkYXRhc3RlcFxuZGVmaW5lKCdkZWYnLCAnX2FsbF8gX2NoYXJhY3Rlcl8gX2NtZF8gX2ZyZXFfIF9pXyBfaW5maWxlXyBfbGFzdF8gX21zZ18gX251bGxfIF9udW1lcmljXyBfdGVtcG9yYXJ5XyBfdHlwZV8gYWJvcnQgYWJzIGFkZHIgYWRqcnNxIGFpcnkgYWxwaGEgYWx0ZXIgYWx0bG9nIGFsdHByaW50IGFuZCBhcmNvcyBhcnJheSBhcnNpbiBhcyBhdGFuIGF0dHJjIGF0dHJpYiBhdHRybiBhdXRoc2VydmVyIGF1dG9leGVjIGF3c2NvbnRyb2wgYXdzZGVmIGF3c21lbnUgYXdzbWVudW1lcmdlIGF3c3RpdGxlIGJhY2t3YXJkIGJhbmQgYmFzZSBiZXRhaW52IGJldHdlZW4gYmxvY2tzaXplIGJsc2hpZnQgYm5vdCBib3IgYnJzaGlmdCBidWZubyBidWZzaXplIGJ4b3IgYnkgYnllcnIgYnlsaW5lIGJ5dGUgY2FsY3VsYXRlZCBjYWxsIGNhcmRzIGNhcmRzNCBjYXRjYWNoZSBjYnVmbm8gY2RmIGNlaWwgY2VudGVyIGNleGlzdCBjaGFuZ2UgY2hpc3EgY2ludiBjbGFzcyBjbGVhbnVwIGNsb3NlIGNub25jdCBjbnRsbGV2IGNvYWxlc2NlIGNvZGVnZW4gY29sIGNvbGxhdGUgY29sbGluIGNvbHVtbiBjb21hbWlkIGNvbWF1eDEgY29tYXV4MiBjb21kZWYgY29tcGJsIGNvbXBvdW5kIGNvbXByZXNzIGNvbmZpZyBjb250aW51ZSBjb252ZXJ0IGNvcyBjb3NoIGNwdWlkIGNyZWF0ZSBjcm9zcyBjcm9zc3RhYiBjc3MgY3Vyb2JzIGN2IGRhY2NkYiBkYWNjZGJzbCBkYWNjc2wgZGFjY3N5ZCBkYWNjdGFiIGRhaXJ5IGRhdGFsaW5lcyBkYXRhbGluZXM0IGRhdGVqdWwgZGF0ZXBhcnQgZGF0ZXRpbWUgZGF5IGRiY3NsYW5nIGRiY3N0eXBlIGRjbG9zZSBkZGZtIGRkbSBkZWxldGUgZGVsaW1pdGVyIGRlcGRiIGRlcGRic2wgZGVwc2wgZGVwc3lkIGRlcHRhYiBkZXF1b3RlIGRlc2NlbmRpbmcgZGVzY3JpcHQgZGVzaWduPSBkZXZpY2UgZGZsYW5nIGRobXMgZGlmIGRpZ2FtbWEgZGltIGRpbmZvIGRpc3BsYXkgZGlzdGluY3QgZGtyaWNvbmQgZGtyb2NvbmQgZGxtIGRudW0gZG8gZG9wZW4gZG9wdG5hbWUgZG9wdG51bSBkcmVhZCBkcm9wIGRyb3Bub3RlIGRzbmFtZSBkc25mZXJyIGVjaG8gZWxzZSBlbWFpbGRsZyBlbWFpbGlkIGVtYWlscHcgZW1haWxzZXJ2ZXIgZW1haWxzeXMgZW5jcnlwdCBlbmQgZW5kc2FzIGVuZ2luZSBlb2YgZW92IGVyZiBlcmZjIGVycm9yIGVycm9yY2hlY2sgZXJyb3JzIGV4aXN0IGV4cCBmYXBwZW5kIGZjbG9zZSBmY29sIGZkZWxldGUgZmVlZGJhY2sgZmV0Y2ggZmV0Y2hvYnMgZmV4aXN0IGZnZXQgZmlsZSBmaWxlY2xvc2UgZmlsZWV4aXN0IGZpbGVmbXQgZmlsZW5hbWUgZmlsZXJlZiAgZm10ZXJyIGZtdHNlYXJjaCBmbm9uY3QgZm5vdGUgZm9udCBmb250YWxpYXMgIGZvcGVuIGZvcHRuYW1lIGZvcHRudW0gZm9yY2UgZm9ybWF0dGVkIGZvcm1jaGFyIGZvcm1kZWxpbSBmb3JtZGxpbSBmb3J3YXJkIGZwb2ludCBmcG9zIGZwdXQgZnJlYWQgZnJld2luZCBmcmxlbiBmcm9tIGZzZXAgZnV6eiBmd3JpdGUgZ2FtaW52IGdhbW1hIGdldG9wdGlvbiBnZXR2YXJjIGdldHZhcm4gZ28gZ290byBncm91cCBnd2luZG93IGhiYXIgaGJvdW5kIGhlbHBlbnYgaGVscGxvYyBobXMgaG9ub3JhcHBlYXJhbmNlIGhvc3RoZWxwIGhvc3RwcmludCBob3VyIGhwY3QgaHRtbCBodmFyIGliZXNzZWwgaWJyIGlkIGlmIGluZGV4IGluZGV4YyBpbmRleHcgaW5pdGNtZCBpbml0c3RtdCBpbm5lciBpbnB1dCBpbnB1dGMgaW5wdXRuIGluciBpbnNlcnQgaW50IGludGNrIGludG54IGludG8gaW50cnIgaW52YWxpZGRhdGEgaXJyIGlzIGpiZXNzZWwgam9pbiBqdWxkYXRlIGtlZXAga2VudGIga3VydG9zaXMgbGFiZWwgbGFnIGxhc3QgbGJvdW5kIGxlYXZlIGxlZnQgbGVuZ3RoIGxldmVscyBsZ2FtbWEgbGliICBsaWJyYXJ5IGxpYnJlZiBsaW5lIGxpbmVzaXplIGxpbmsgbGlzdCBsb2cgbG9nMTAgbG9nMiBsb2dwZGYgbG9ncG1mIGxvZ3NkZiBsb3N0Y2FyZCBsb3djYXNlIGxyZWNsIGxzIG1hY3JvIG1hY3JvZ2VuIG1hcHMgbWF1dG9zb3VyY2UgbWF4IG1heGRlYyBtYXhyIG1keSBtZWFuIG1lYXN1cmVzIG1lZGlhbiBtZW10eXBlIG1lcmdlIG1lcnJvciBtaW4gbWludXRlIG1pc3NpbmcgbWlzc292ZXIgbWxvZ2ljIG1vZCBtb2RlIG1vZGVsIG1vZGlmeSBtb250aCBtb3BlbiBtb3J0IG1wcmludCBtcmVjYWxsIG1zZ2xldmVsIG1zeW10YWJtYXggbXZhcnNpemUgbXl5IG4gbmVzdCBuZXRwdiBuZXcgbmV3cyBubWlzcyBubyBub2JhdGNoIG5vYnMgbm9jYXBzIG5vY2FyZGltYWdlIG5vY2VudGVyIG5vY2hhcmNvZGUgbm9jbWRtYWMgbm9jb2wgbm9jdW0gbm9kYXRlIG5vZGJjcyBub2RldGFpbHMgbm9kbXIgbm9kbXMgbm9kbXNiYXRjaCBub2R1cCBub2R1cGtleSBub2R1cGxpY2F0ZXMgbm9lY2hvYXV0byBub2VxdWFscyBub2Vycm9yYWJlbmQgbm9leGl0d2luZG93cyBub2Z1bGxzdGltZXIgbm9pY29uIG5vaW1wbG1hYyBub2ludCBub2xpc3Qgbm9sb2FkbGlzdCBub21pc3Mgbm9tbG9naWMgbm9tcHJpbnQgbm9tcmVjYWxsIG5vbXNnY2FzZSBub21zdG9yZWQgbm9tdWx0ZW52YXBwbCBub25vdGVzIG5vbnVtYmVyIG5vb2JzIG5vb3ZwIG5vcGFkIG5vcGVyY2VudCBub3ByaW50IG5vcHJpbnRpbml0IG5vcm1hbCBub3JvdyBub3JzYXN1c2VyIG5vc2V0aW5pdCAgbm9zcGxhc2ggbm9zeW1ib2xnZW4gbm90ZSBub3RlcyBub3RpdGxlIG5vdGl0bGVzIG5vdHNvcnRlZCBub3ZlcmJvc2Ugbm94c3luYyBub3h3YWl0IG5wdiBudWxsIG51bWJlciBudW1rZXlzIG51bW1vdXNla2V5cyBud2F5IG9icyAgb24gb3BlbiAgICAgb3JkZXIgb3JkaW5hbCBvdGhlcndpc2Ugb3V0IG91dGVyIG91dHA9IG91dHB1dCBvdmVyIG92cCBwKDEgNSAxMCAyNSA1MCA3NSA5MCA5NSA5OSkgcGFkIHBhZDIgIHBhaXJlZCBwYXJtIHBhcm1jYXJkcyBwYXRoIHBhdGhkbGwgcGF0aG5hbWUgcGRmIHBlZWsgcGVla2MgcGZrZXkgcG1mIHBvaW50IHBvaXNzb24gcG9rZSBwb3NpdGlvbiBwcmludGVyIHByb2JiZXRhIHByb2Jibm1sIHByb2JjaGkgcHJvYmYgcHJvYmdhbSBwcm9iaHlwciBwcm9iaXQgcHJvYm5lZ2IgcHJvYm5vcm0gcHJvYnNpZyBwcm9idCBwcm9jbGVhdmUgcHJ0IHBzICBwdyBwd3JlcSBxdHIgcXVvdGUgciByYW5iaW4gcmFuY2F1IHJhbmRvbSByYW5leHAgcmFuZ2FtIHJhbmdlIHJhbmtzIHJhbm5vciByYW5wb2kgcmFudGJsIHJhbnRyaSByYW51bmkgcmNvcnIgcmVhZCByZWNmbSByZWdpc3RlciByZWdyIHJlbW90ZSByZW1vdmUgcmVuYW1lIHJlcGVhdCByZXBlYXRlZCByZXBsYWNlIHJlc29sdmUgcmV0YWluIHJldHVybiByZXVzZSByZXZlcnNlIHJld2luZCByaWdodCByb3VuZCByc3F1YXJlIHJ0ZiBydHJhY2UgcnRyYWNlbG9jIHMgczIgc2FtcGxvYyBzYXNhdXRvcyBzYXNjb250cm9sIHNhc2Zyc2NyIHNhc21zZyBzYXNtc3RvcmUgc2Fzc2NyaXB0IHNhc3VzZXIgc2F2aW5nIHNjYW4gc2RmIHNlY29uZCBzZWxlY3Qgc2VsZWN0aW9uIHNlcGFyYXRlZCBzZXEgc2Vycm9yIHNldCBzZXRjb21tIHNldG90IHNpZ24gc2ltcGxlIHNpbiBzaW5oIHNpdGVpbmZvIHNrZXduZXNzIHNraXAgc2xlIHNscyBzb3J0ZWRieSBzb3J0cGdtIHNvcnRzZXEgc29ydHNpemUgc291bmRleCAgc3BlZGlzIHNwbGFzaGxvY2F0aW9uIHNwbGl0IHNwb29sIHNxcnQgc3RhcnQgc3RkIHN0ZGVyciBzdGRpbiBzdGZpcHMgc3RpbWVyIHN0bmFtZSBzdG5hbWVsIHN0b3Agc3RvcG92ZXIgc3ViIHN1Ymdyb3VwIHN1YnBvcG4gc3Vic3RyIHN1bSBzdW13Z3Qgc3ltYm9sIHN5bWJvbGdlbiBzeW1nZXQgc3ltcHV0IHN5c2dldCBzeXNpbiBzeXNsZWF2ZSBzeXNtc2cgc3lzcGFybSBzeXNwcmludCBzeXNwcmludGZvbnQgc3lzcHJvZCBzeXNyYyBzeXN0ZW0gdCB0YWJsZSB0YWJsZXMgdGFuIHRhbmggdGFwZWNsb3NlIHRidWZzaXplIHRlcm1pbmFsIHRlc3QgdGhlbiB0aW1lcGFydCB0aW52ICB0bm9uY3QgdG8gdG9kYXkgdG9sIHRvb2xkZWYgdG90cGVyIHRyYW5zZm9ybW91dCB0cmFuc2xhdGUgdHJhbnRhYiB0cmFud3JkIHRyaWdhbW1hIHRyaW0gdHJpbW4gdHJ1bmMgdHJ1bmNvdmVyIHR5cGUgdW5mb3JtYXR0ZWQgdW5pZm9ybSB1bmlvbiB1bnRpbCB1cGNhc2UgdXBkYXRlIHVzZXIgdXNlcmljb24gdXNzIHZhbGlkYXRlIHZhbHVlIHZhciAgd2VpZ2h0IHdoZW4gd2hlcmUgd2hpbGUgd2luY2hhcnNldCB3aW5kb3cgd29yayB3b3JraW5pdCB3b3JrdGVybSB3cml0ZSB3c3VtIHhzeW5jIHh3YWl0IHllYXJjdXRvZmYgeWVzIHl5cSAgbWluIG1heCcsIFsnaW5EYXRhU3RlcCcsICdpblByb2MnXSk7XG5kZWZpbmUoJ29wZXJhdG9yJywgJ2FuZCBub3QgJywgWydpbkRhdGFTdGVwJywgJ2luUHJvYyddKTtcblxuLy8gTWFpbiBmdW5jdGlvblxuZnVuY3Rpb24gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSkge1xuICAvLyBGaW5hbGx5IGFkdmFuY2UgdGhlIHN0cmVhbVxuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuXG4gIC8vIEJMT0NLQ09NTUVOVFxuICBpZiAoY2ggPT09ICcvJyAmJiBzdHJlYW0uZWF0KCcqJykpIHtcbiAgICBzdGF0ZS5jb250aW51ZUNvbW1lbnQgPSB0cnVlO1xuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfSBlbHNlIGlmIChzdGF0ZS5jb250aW51ZUNvbW1lbnQgPT09IHRydWUpIHsgLy8gaW4gY29tbWVudCBibG9ja1xuICAgIC8vY29tbWVudCBlbmRzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpbmVcbiAgICBpZiAoY2ggPT09ICcqJyAmJiBzdHJlYW0ucGVlaygpID09PSAnLycpIHtcbiAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICBzdGF0ZS5jb250aW51ZUNvbW1lbnQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5za2lwVG8oJyonKSkgeyAvL2NvbW1lbnQgaXMgcG90ZW50aWFsbHkgbGF0ZXIgaW4gbGluZVxuICAgICAgc3RyZWFtLnNraXBUbygnKicpO1xuICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgIGlmIChzdHJlYW0uZWF0KCcvJykpXG4gICAgICAgIHN0YXRlLmNvbnRpbnVlQ29tbWVudCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgfVxuICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgfVxuXG4gIGlmIChjaCA9PSBcIipcIiAmJiBzdHJlYW0uY29sdW1uKCkgPT0gc3RyZWFtLmluZGVudGF0aW9uKCkpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKClcbiAgICByZXR1cm4gXCJjb21tZW50XCJcbiAgfVxuXG4gIC8vIERvdWJsZU9wZXJhdG9yIG1hdGNoXG4gIHZhciBkb3VibGVPcGVyYXRvciA9IGNoICsgc3RyZWFtLnBlZWsoKTtcblxuICBpZiAoKGNoID09PSAnXCInIHx8IGNoID09PSBcIidcIikgJiYgIXN0YXRlLmNvbnRpbnVlU3RyaW5nKSB7XG4gICAgc3RhdGUuY29udGludWVTdHJpbmcgPSBjaFxuICAgIHJldHVybiBcInN0cmluZ1wiXG4gIH0gZWxzZSBpZiAoc3RhdGUuY29udGludWVTdHJpbmcpIHtcbiAgICBpZiAoc3RhdGUuY29udGludWVTdHJpbmcgPT0gY2gpIHtcbiAgICAgIHN0YXRlLmNvbnRpbnVlU3RyaW5nID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHN0cmVhbS5za2lwVG8oc3RhdGUuY29udGludWVTdHJpbmcpKSB7XG4gICAgICAvLyBxdW90ZSBmb3VuZCBvbiB0aGlzIGxpbmVcbiAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICBzdGF0ZS5jb250aW51ZVN0cmluZyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICB9XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH0gZWxzZSBpZiAoc3RhdGUuY29udGludWVTdHJpbmcgIT09IG51bGwgJiYgc3RyZWFtLmVvbCgpKSB7XG4gICAgc3RyZWFtLnNraXBUbyhzdGF0ZS5jb250aW51ZVN0cmluZykgfHwgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgIHJldHVybiBcInN0cmluZ1wiO1xuICB9IGVsc2UgaWYgKC9bXFxkXFwuXS8udGVzdChjaCkpIHsgLy9maW5kIG51bWJlcnNcbiAgICBpZiAoY2ggPT09IFwiLlwiKVxuICAgICAgc3RyZWFtLm1hdGNoKC9eWzAtOV0rKFtlRV1bXFwtK10/WzAtOV0rKT8vKTtcbiAgICBlbHNlIGlmIChjaCA9PT0gXCIwXCIpXG4gICAgICBzdHJlYW0ubWF0Y2goL15beFhdWzAtOWEtZkEtRl0rLykgfHwgc3RyZWFtLm1hdGNoKC9eMFswLTddKy8pO1xuICAgIGVsc2VcbiAgICAgIHN0cmVhbS5tYXRjaCgvXlswLTldKlxcLj9bMC05XSooW2VFXVtcXC0rXT9bMC05XSspPy8pO1xuICAgIHJldHVybiBcIm51bWJlclwiO1xuICB9IGVsc2UgaWYgKGlzRG91YmxlT3BlcmF0b3JDaGFyLnRlc3QoY2ggKyBzdHJlYW0ucGVlaygpKSkgeyAvLyBUV08gU1lNQk9MIFRPS0VOU1xuICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfSBlbHNlIGlmIChpc0RvdWJsZU9wZXJhdG9yU3ltLmhhc093blByb3BlcnR5KGRvdWJsZU9wZXJhdG9yKSkge1xuICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgaWYgKHN0cmVhbS5wZWVrKCkgPT09ICcgJylcbiAgICAgIHJldHVybiBpc0RvdWJsZU9wZXJhdG9yU3ltW2RvdWJsZU9wZXJhdG9yLnRvTG93ZXJDYXNlKCldO1xuICB9IGVsc2UgaWYgKGlzU2luZ2xlT3BlcmF0b3JDaGFyLnRlc3QoY2gpKSB7IC8vIFNJTkdMRSBTWU1CT0wgVE9LRU5TXG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfVxuXG4gIC8vIE1hdGNoZXMgb25lIHdob2xlIHdvcmQgLS0gZXZlbiBpZiB0aGUgd29yZCBpcyBhIGNoYXJhY3RlclxuICB2YXIgd29yZDtcbiAgaWYgKHN0cmVhbS5tYXRjaCgvWyUmO1xcd10rLywgZmFsc2UpICE9IG51bGwpIHtcbiAgICB3b3JkID0gY2ggKyBzdHJlYW0ubWF0Y2goL1slJjtcXHddKy8sIHRydWUpO1xuICAgIGlmICgvJi8udGVzdCh3b3JkKSkgcmV0dXJuICd2YXJpYWJsZSdcbiAgfSBlbHNlIHtcbiAgICB3b3JkID0gY2g7XG4gIH1cbiAgLy8gdGhlIHdvcmQgYWZ0ZXIgREFUQSBQUk9DIG9yIE1BQ1JPXG4gIGlmIChzdGF0ZS5uZXh0d29yZCkge1xuICAgIHN0cmVhbS5tYXRjaCgvW1xcd10rLyk7XG4gICAgLy8gbWF0Y2ggbWVtbmFtZS5saWJuYW1lXG4gICAgaWYgKHN0cmVhbS5wZWVrKCkgPT09ICcuJykgc3RyZWFtLnNraXBUbygnICcpO1xuICAgIHN0YXRlLm5leHR3b3JkID0gZmFsc2U7XG4gICAgcmV0dXJuICd2YXJpYWJsZU5hbWUuc3BlY2lhbCc7XG4gIH1cblxuICB3b3JkID0gd29yZC50b0xvd2VyQ2FzZSgpXG4gIC8vIEFyZSB3ZSBpbiBhIERBVEEgU3RlcD9cbiAgaWYgKHN0YXRlLmluRGF0YVN0ZXApIHtcbiAgICBpZiAod29yZCA9PT0gJ3J1bjsnIHx8IHN0cmVhbS5tYXRjaCgvcnVuXFxzOy8pKSB7XG4gICAgICBzdGF0ZS5pbkRhdGFTdGVwID0gZmFsc2U7XG4gICAgICByZXR1cm4gJ2J1aWx0aW4nO1xuICAgIH1cbiAgICAvLyB2YXJpYWJsZSBmb3JtYXRzXG4gICAgaWYgKCh3b3JkKSAmJiBzdHJlYW0ubmV4dCgpID09PSAnLicpIHtcbiAgICAgIC8vZWl0aGVyIGEgZm9ybWF0IG9yIGxpYm5hbWUubWVtbmFtZVxuICAgICAgaWYgKC9cXHcvLnRlc3Qoc3RyZWFtLnBlZWsoKSkpIHJldHVybiAndmFyaWFibGVOYW1lLnNwZWNpYWwnO1xuICAgICAgZWxzZSByZXR1cm4gJ3ZhcmlhYmxlJztcbiAgICB9XG4gICAgLy8gZG8gd2UgaGF2ZSBhIERBVEEgU3RlcCBrZXl3b3JkXG4gICAgaWYgKHdvcmQgJiYgd29yZHMuaGFzT3duUHJvcGVydHkod29yZCkgJiZcbiAgICAgICAgKHdvcmRzW3dvcmRdLnN0YXRlLmluZGV4T2YoXCJpbkRhdGFTdGVwXCIpICE9PSAtMSB8fFxuICAgICAgICAgd29yZHNbd29yZF0uc3RhdGUuaW5kZXhPZihcIkFMTFwiKSAhPT0gLTEpKSB7XG4gICAgICAvL2JhY2t1cCB0byB0aGUgc3RhcnQgb2YgdGhlIHdvcmRcbiAgICAgIGlmIChzdHJlYW0uc3RhcnQgPCBzdHJlYW0ucG9zKVxuICAgICAgICBzdHJlYW0uYmFja1VwKHN0cmVhbS5wb3MgLSBzdHJlYW0uc3RhcnQpO1xuICAgICAgLy9hZHZhbmNlIHRoZSBsZW5ndGggb2YgdGhlIHdvcmQgYW5kIHJldHVyblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aDsgKytpKSBzdHJlYW0ubmV4dCgpO1xuICAgICAgcmV0dXJuIHdvcmRzW3dvcmRdLnN0eWxlO1xuICAgIH1cbiAgfVxuICAvLyBBcmUgd2UgaW4gYW4gUHJvYyBzdGF0ZW1lbnQ/XG4gIGlmIChzdGF0ZS5pblByb2MpIHtcbiAgICBpZiAod29yZCA9PT0gJ3J1bjsnIHx8IHdvcmQgPT09ICdxdWl0OycpIHtcbiAgICAgIHN0YXRlLmluUHJvYyA9IGZhbHNlO1xuICAgICAgcmV0dXJuICdidWlsdGluJztcbiAgICB9XG4gICAgLy8gZG8gd2UgaGF2ZSBhIHByb2Mga2V5d29yZFxuICAgIGlmICh3b3JkICYmIHdvcmRzLmhhc093blByb3BlcnR5KHdvcmQpICYmXG4gICAgICAgICh3b3Jkc1t3b3JkXS5zdGF0ZS5pbmRleE9mKFwiaW5Qcm9jXCIpICE9PSAtMSB8fFxuICAgICAgICAgd29yZHNbd29yZF0uc3RhdGUuaW5kZXhPZihcIkFMTFwiKSAhPT0gLTEpKSB7XG4gICAgICBzdHJlYW0ubWF0Y2goL1tcXHddKy8pO1xuICAgICAgcmV0dXJuIHdvcmRzW3dvcmRdLnN0eWxlO1xuICAgIH1cbiAgfVxuICAvLyBBcmUgd2UgaW4gYSBNYWNybyBzdGF0ZW1lbnQ/XG4gIGlmIChzdGF0ZS5pbk1hY3JvKSB7XG4gICAgaWYgKHdvcmQgPT09ICclbWVuZCcpIHtcbiAgICAgIGlmIChzdHJlYW0ucGVlaygpID09PSAnOycpIHN0cmVhbS5uZXh0KCk7XG4gICAgICBzdGF0ZS5pbk1hY3JvID0gZmFsc2U7XG4gICAgICByZXR1cm4gJ2J1aWx0aW4nO1xuICAgIH1cbiAgICBpZiAod29yZCAmJiB3b3Jkcy5oYXNPd25Qcm9wZXJ0eSh3b3JkKSAmJlxuICAgICAgICAod29yZHNbd29yZF0uc3RhdGUuaW5kZXhPZihcImluTWFjcm9cIikgIT09IC0xIHx8XG4gICAgICAgICB3b3Jkc1t3b3JkXS5zdGF0ZS5pbmRleE9mKFwiQUxMXCIpICE9PSAtMSkpIHtcbiAgICAgIHN0cmVhbS5tYXRjaCgvW1xcd10rLyk7XG4gICAgICByZXR1cm4gd29yZHNbd29yZF0uc3R5bGU7XG4gICAgfVxuXG4gICAgcmV0dXJuICdhdG9tJztcbiAgfVxuICAvLyBEbyB3ZSBoYXZlIEtleXdvcmRzIHNwZWNpZmljIHdvcmRzP1xuICBpZiAod29yZCAmJiB3b3Jkcy5oYXNPd25Qcm9wZXJ0eSh3b3JkKSkge1xuICAgIC8vIE5lZ2F0ZXMgdGhlIGluaXRpYWwgbmV4dCgpXG4gICAgc3RyZWFtLmJhY2tVcCgxKTtcbiAgICAvLyBBY3R1YWxseSBtb3ZlIHRoZSBzdHJlYW1cbiAgICBzdHJlYW0ubWF0Y2goL1tcXHddKy8pO1xuICAgIGlmICh3b3JkID09PSAnZGF0YScgJiYgLz0vLnRlc3Qoc3RyZWFtLnBlZWsoKSkgPT09IGZhbHNlKSB7XG4gICAgICBzdGF0ZS5pbkRhdGFTdGVwID0gdHJ1ZTtcbiAgICAgIHN0YXRlLm5leHR3b3JkID0gdHJ1ZTtcbiAgICAgIHJldHVybiAnYnVpbHRpbic7XG4gICAgfVxuICAgIGlmICh3b3JkID09PSAncHJvYycpIHtcbiAgICAgIHN0YXRlLmluUHJvYyA9IHRydWU7XG4gICAgICBzdGF0ZS5uZXh0d29yZCA9IHRydWU7XG4gICAgICByZXR1cm4gJ2J1aWx0aW4nO1xuICAgIH1cbiAgICBpZiAod29yZCA9PT0gJyVtYWNybycpIHtcbiAgICAgIHN0YXRlLmluTWFjcm8gPSB0cnVlO1xuICAgICAgc3RhdGUubmV4dHdvcmQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdidWlsdGluJztcbiAgICB9XG4gICAgaWYgKC90aXRsZVsxLTldLy50ZXN0KHdvcmQpKSByZXR1cm4gJ2RlZic7XG5cbiAgICBpZiAod29yZCA9PT0gJ2Zvb3Rub3RlJykge1xuICAgICAgc3RyZWFtLmVhdCgvWzEtOV0vKTtcbiAgICAgIHJldHVybiAnZGVmJztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZWlyIHZhbHVlIGFzIHN0YXRlIGluIHRoZSBwcmlvciBkZWZpbmUgbWV0aG9kc1xuICAgIGlmIChzdGF0ZS5pbkRhdGFTdGVwID09PSB0cnVlICYmIHdvcmRzW3dvcmRdLnN0YXRlLmluZGV4T2YoXCJpbkRhdGFTdGVwXCIpICE9PSAtMSlcbiAgICAgIHJldHVybiB3b3Jkc1t3b3JkXS5zdHlsZTtcbiAgICBpZiAoc3RhdGUuaW5Qcm9jID09PSB0cnVlICYmIHdvcmRzW3dvcmRdLnN0YXRlLmluZGV4T2YoXCJpblByb2NcIikgIT09IC0xKVxuICAgICAgcmV0dXJuIHdvcmRzW3dvcmRdLnN0eWxlO1xuICAgIGlmIChzdGF0ZS5pbk1hY3JvID09PSB0cnVlICYmIHdvcmRzW3dvcmRdLnN0YXRlLmluZGV4T2YoXCJpbk1hY3JvXCIpICE9PSAtMSlcbiAgICAgIHJldHVybiB3b3Jkc1t3b3JkXS5zdHlsZTtcbiAgICBpZiAod29yZHNbd29yZF0uc3RhdGUuaW5kZXhPZihcIkFMTFwiKSAhPT0gLTEpXG4gICAgICByZXR1cm4gd29yZHNbd29yZF0uc3R5bGU7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gVW5yZWNvZ25pemVkIHN5bnRheFxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IHNhcyA9IHtcbiAgc3RhcnRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbkRhdGFTdGVwOiBmYWxzZSxcbiAgICAgIGluUHJvYzogZmFsc2UsXG4gICAgICBpbk1hY3JvOiBmYWxzZSxcbiAgICAgIG5leHR3b3JkOiBmYWxzZSxcbiAgICAgIGNvbnRpbnVlU3RyaW5nOiBudWxsLFxuICAgICAgY29udGludWVDb21tZW50OiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRva2VuOiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIC8vIFN0cmlwIHRoZSBzcGFjZXMsIGJ1dCByZWdleCB3aWxsIGFjY291bnQgZm9yIHRoZW0gZWl0aGVyIHdheVxuICAgIGlmIChzdHJlYW0uZWF0U3BhY2UoKSkgcmV0dXJuIG51bGw7XG4gICAgLy8gR28gdGhyb3VnaCB0aGUgbWFpbiBwcm9jZXNzXG4gICAgcmV0dXJuIHRva2VuaXplKHN0cmVhbSwgc3RhdGUpO1xuICB9LFxuXG4gIGxhbmd1YWdlRGF0YToge1xuICAgIGNvbW1lbnRUb2tlbnM6IHtibG9jazoge29wZW46IFwiLypcIiwgY2xvc2U6IFwiKi9cIn19XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///417\n")}}]);