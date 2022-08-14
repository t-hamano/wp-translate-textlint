(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{412:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"puppet\", function() { return puppet; });\n// Stores the words from the define method\nvar words = {};\n// Taken, mostly, from the Puppet official variable standards regex\nvar variable_regex = /({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;\n\n// Takes a string of words separated by spaces and adds them as\n// keys with the value of the first argument 'style'\nfunction define(style, string) {\n  var split = string.split(' ');\n  for (var i = 0; i < split.length; i++) {\n    words[split[i]] = style;\n  }\n}\n\n// Takes commonly known puppet types/words and classifies them to a style\ndefine('keyword', 'class define site node include import inherits');\ndefine('keyword', 'case if else in and elsif default or');\ndefine('atom', 'false true running present absent file directory undef');\ndefine('builtin', 'action augeas burst chain computer cron destination dport exec ' +\n       'file filebucket group host icmp iniface interface jump k5login limit log_level ' +\n       'log_prefix macauthorization mailalias maillist mcx mount nagios_command ' +\n       'nagios_contact nagios_contactgroup nagios_host nagios_hostdependency ' +\n       'nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service ' +\n       'nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo ' +\n       'nagios_servicegroup nagios_timeperiod name notify outiface package proto reject ' +\n       'resources router schedule scheduled_task selboolean selmodule service source ' +\n       'sport ssh_authorized_key sshkey stage state table tidy todest toports tosource ' +\n       'user vlan yumrepo zfs zone zpool');\n\n// After finding a start of a string ('|\") this function attempts to find the end;\n// If a variable is encountered along the way, we display it differently when it\n// is encapsulated in a double-quoted string.\nfunction tokenString(stream, state) {\n  var current, prev, found_var = false;\n  while (!stream.eol() && (current = stream.next()) != state.pending) {\n    if (current === '$' && prev != '\\\\' && state.pending == '\"') {\n      found_var = true;\n      break;\n    }\n    prev = current;\n  }\n  if (found_var) {\n    stream.backUp(1);\n  }\n  if (current == state.pending) {\n    state.continueString = false;\n  } else {\n    state.continueString = true;\n  }\n  return \"string\";\n}\n\n// Main function\nfunction tokenize(stream, state) {\n  // Matches one whole word\n  var word = stream.match(/[\\w]+/, false);\n  // Matches attributes (i.e. ensure => present ; 'ensure' would be matched)\n  var attribute = stream.match(/(\\s+)?\\w+\\s+=>.*/, false);\n  // Matches non-builtin resource declarations\n  // (i.e. \"apache::vhost {\" or \"mycustomclasss {\" would be matched)\n  var resource = stream.match(/(\\s+)?[\\w:_]+(\\s+)?{/, false);\n  // Matches virtual and exported resources (i.e. @@user { ; and the like)\n  var special_resource = stream.match(/(\\s+)?[@]{1,2}[\\w:_]+(\\s+)?{/, false);\n\n  // Finally advance the stream\n  var ch = stream.next();\n\n  // Have we found a variable?\n  if (ch === '$') {\n    if (stream.match(variable_regex)) {\n      // If so, and its in a string, assign it a different color\n      return state.continueString ? 'variableName.special' : 'variable';\n    }\n    // Otherwise return an invalid variable\n    return \"error\";\n  }\n  // Should we still be looking for the end of a string?\n  if (state.continueString) {\n    // If so, go through the loop again\n    stream.backUp(1);\n    return tokenString(stream, state);\n  }\n  // Are we in a definition (class, node, define)?\n  if (state.inDefinition) {\n    // If so, return def (i.e. for 'class myclass {' ; 'myclass' would be matched)\n    if (stream.match(/(\\s+)?[\\w:_]+(\\s+)?/)) {\n      return 'def';\n    }\n    // Match the rest it the next time around\n    stream.match(/\\s+{/);\n    state.inDefinition = false;\n  }\n  // Are we in an 'include' statement?\n  if (state.inInclude) {\n    // Match and return the included class\n    stream.match(/(\\s+)?\\S+(\\s+)?/);\n    state.inInclude = false;\n    return 'def';\n  }\n  // Do we just have a function on our hands?\n  // In 'ensure_resource(\"myclass\")', 'ensure_resource' is matched\n  if (stream.match(/(\\s+)?\\w+\\(/)) {\n    stream.backUp(1);\n    return 'def';\n  }\n  // Have we matched the prior attribute regex?\n  if (attribute) {\n    stream.match(/(\\s+)?\\w+/);\n    return 'tag';\n  }\n  // Do we have Puppet specific words?\n  if (word && words.hasOwnProperty(word)) {\n    // Negates the initial next()\n    stream.backUp(1);\n    // rs move the stream\n    stream.match(/[\\w]+/);\n    // We want to process these words differently\n    // do to the importance they have in Puppet\n    if (stream.match(/\\s+\\S+\\s+{/, false)) {\n      state.inDefinition = true;\n    }\n    if (word == 'include') {\n      state.inInclude = true;\n    }\n    // Returns their value as state in the prior define methods\n    return words[word];\n  }\n  // Is there a match on a reference?\n  if (/(^|\\s+)[A-Z][\\w:_]+/.test(word)) {\n    // Negate the next()\n    stream.backUp(1);\n    // Match the full reference\n    stream.match(/(^|\\s+)[A-Z][\\w:_]+/);\n    return 'def';\n  }\n  // Have we matched the prior resource regex?\n  if (resource) {\n    stream.match(/(\\s+)?[\\w:_]+/);\n    return 'def';\n  }\n  // Have we matched the prior special_resource regex?\n  if (special_resource) {\n    stream.match(/(\\s+)?[@]{1,2}/);\n    return 'atom';\n  }\n  // Match all the comments. All of them.\n  if (ch == \"#\") {\n    stream.skipToEnd();\n    return \"comment\";\n  }\n  // Have we found a string?\n  if (ch == \"'\" || ch == '\"') {\n    // Store the type (single or double)\n    state.pending = ch;\n    // Perform the looping function to find the end\n    return tokenString(stream, state);\n  }\n  // Match all the brackets\n  if (ch == '{' || ch == '}') {\n    return 'bracket';\n  }\n  // Match characters that we are going to assume\n  // are trying to be regex\n  if (ch == '/') {\n    stream.match(/^[^\\/]*\\//);\n    return 'string.special';\n  }\n  // Match all the numbers\n  if (ch.match(/[0-9]/)) {\n    stream.eatWhile(/[0-9]+/);\n    return 'number';\n  }\n  // Match the '=' and '=>' operators\n  if (ch == '=') {\n    if (stream.peek() == '>') {\n      stream.next();\n    }\n    return \"operator\";\n  }\n  // Keep advancing through all the rest\n  stream.eatWhile(/[\\w-]/);\n  // Return a blank line for everything else\n  return null;\n}\n// Start it all\nconst puppet = {\n  startState: function () {\n    var state = {};\n    state.inDefinition = false;\n    state.inInclude = false;\n    state.continueString = false;\n    state.pending = false;\n    return state;\n  },\n  token: function (stream, state) {\n    // Strip the spaces, but regex will account for them eitherway\n    if (stream.eatSpace()) return null;\n    // Go through the main process\n    return tokenize(stream, state);\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvcHVwcGV0LmpzP2QwMzkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0REFBNEQ7O0FBRXBGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pELG1EQUFtRDtBQUNuRCwwREFBMEQsRUFBRTtBQUM1RCxpREFBaUQsSUFBSSxjQUFjOztBQUVuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsR0FBRztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLElBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IjQxMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0b3JlcyB0aGUgd29yZHMgZnJvbSB0aGUgZGVmaW5lIG1ldGhvZFxudmFyIHdvcmRzID0ge307XG4vLyBUYWtlbiwgbW9zdGx5LCBmcm9tIHRoZSBQdXBwZXQgb2ZmaWNpYWwgdmFyaWFibGUgc3RhbmRhcmRzIHJlZ2V4XG52YXIgdmFyaWFibGVfcmVnZXggPSAvKHspPyhbYS16XVthLXowLTlfXSopPygoOjpbYS16XVthLXowLTlfXSopKjo6KT9bYS16QS1aMC05X10rKH0pPy87XG5cbi8vIFRha2VzIGEgc3RyaW5nIG9mIHdvcmRzIHNlcGFyYXRlZCBieSBzcGFjZXMgYW5kIGFkZHMgdGhlbSBhc1xuLy8ga2V5cyB3aXRoIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgYXJndW1lbnQgJ3N0eWxlJ1xuZnVuY3Rpb24gZGVmaW5lKHN0eWxlLCBzdHJpbmcpIHtcbiAgdmFyIHNwbGl0ID0gc3RyaW5nLnNwbGl0KCcgJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaXQubGVuZ3RoOyBpKyspIHtcbiAgICB3b3Jkc1tzcGxpdFtpXV0gPSBzdHlsZTtcbiAgfVxufVxuXG4vLyBUYWtlcyBjb21tb25seSBrbm93biBwdXBwZXQgdHlwZXMvd29yZHMgYW5kIGNsYXNzaWZpZXMgdGhlbSB0byBhIHN0eWxlXG5kZWZpbmUoJ2tleXdvcmQnLCAnY2xhc3MgZGVmaW5lIHNpdGUgbm9kZSBpbmNsdWRlIGltcG9ydCBpbmhlcml0cycpO1xuZGVmaW5lKCdrZXl3b3JkJywgJ2Nhc2UgaWYgZWxzZSBpbiBhbmQgZWxzaWYgZGVmYXVsdCBvcicpO1xuZGVmaW5lKCdhdG9tJywgJ2ZhbHNlIHRydWUgcnVubmluZyBwcmVzZW50IGFic2VudCBmaWxlIGRpcmVjdG9yeSB1bmRlZicpO1xuZGVmaW5lKCdidWlsdGluJywgJ2FjdGlvbiBhdWdlYXMgYnVyc3QgY2hhaW4gY29tcHV0ZXIgY3JvbiBkZXN0aW5hdGlvbiBkcG9ydCBleGVjICcgK1xuICAgICAgICdmaWxlIGZpbGVidWNrZXQgZ3JvdXAgaG9zdCBpY21wIGluaWZhY2UgaW50ZXJmYWNlIGp1bXAgazVsb2dpbiBsaW1pdCBsb2dfbGV2ZWwgJyArXG4gICAgICAgJ2xvZ19wcmVmaXggbWFjYXV0aG9yaXphdGlvbiBtYWlsYWxpYXMgbWFpbGxpc3QgbWN4IG1vdW50IG5hZ2lvc19jb21tYW5kICcgK1xuICAgICAgICduYWdpb3NfY29udGFjdCBuYWdpb3NfY29udGFjdGdyb3VwIG5hZ2lvc19ob3N0IG5hZ2lvc19ob3N0ZGVwZW5kZW5jeSAnICtcbiAgICAgICAnbmFnaW9zX2hvc3Rlc2NhbGF0aW9uIG5hZ2lvc19ob3N0ZXh0aW5mbyBuYWdpb3NfaG9zdGdyb3VwIG5hZ2lvc19zZXJ2aWNlICcgK1xuICAgICAgICduYWdpb3Nfc2VydmljZWRlcGVuZGVuY3kgbmFnaW9zX3NlcnZpY2Vlc2NhbGF0aW9uIG5hZ2lvc19zZXJ2aWNlZXh0aW5mbyAnICtcbiAgICAgICAnbmFnaW9zX3NlcnZpY2Vncm91cCBuYWdpb3NfdGltZXBlcmlvZCBuYW1lIG5vdGlmeSBvdXRpZmFjZSBwYWNrYWdlIHByb3RvIHJlamVjdCAnICtcbiAgICAgICAncmVzb3VyY2VzIHJvdXRlciBzY2hlZHVsZSBzY2hlZHVsZWRfdGFzayBzZWxib29sZWFuIHNlbG1vZHVsZSBzZXJ2aWNlIHNvdXJjZSAnICtcbiAgICAgICAnc3BvcnQgc3NoX2F1dGhvcml6ZWRfa2V5IHNzaGtleSBzdGFnZSBzdGF0ZSB0YWJsZSB0aWR5IHRvZGVzdCB0b3BvcnRzIHRvc291cmNlICcgK1xuICAgICAgICd1c2VyIHZsYW4geXVtcmVwbyB6ZnMgem9uZSB6cG9vbCcpO1xuXG4vLyBBZnRlciBmaW5kaW5nIGEgc3RhcnQgb2YgYSBzdHJpbmcgKCd8XCIpIHRoaXMgZnVuY3Rpb24gYXR0ZW1wdHMgdG8gZmluZCB0aGUgZW5kO1xuLy8gSWYgYSB2YXJpYWJsZSBpcyBlbmNvdW50ZXJlZCBhbG9uZyB0aGUgd2F5LCB3ZSBkaXNwbGF5IGl0IGRpZmZlcmVudGx5IHdoZW4gaXRcbi8vIGlzIGVuY2Fwc3VsYXRlZCBpbiBhIGRvdWJsZS1xdW90ZWQgc3RyaW5nLlxuZnVuY3Rpb24gdG9rZW5TdHJpbmcoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgY3VycmVudCwgcHJldiwgZm91bmRfdmFyID0gZmFsc2U7XG4gIHdoaWxlICghc3RyZWFtLmVvbCgpICYmIChjdXJyZW50ID0gc3RyZWFtLm5leHQoKSkgIT0gc3RhdGUucGVuZGluZykge1xuICAgIGlmIChjdXJyZW50ID09PSAnJCcgJiYgcHJldiAhPSAnXFxcXCcgJiYgc3RhdGUucGVuZGluZyA9PSAnXCInKSB7XG4gICAgICBmb3VuZF92YXIgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHByZXYgPSBjdXJyZW50O1xuICB9XG4gIGlmIChmb3VuZF92YXIpIHtcbiAgICBzdHJlYW0uYmFja1VwKDEpO1xuICB9XG4gIGlmIChjdXJyZW50ID09IHN0YXRlLnBlbmRpbmcpIHtcbiAgICBzdGF0ZS5jb250aW51ZVN0cmluZyA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLmNvbnRpbnVlU3RyaW5nID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gXCJzdHJpbmdcIjtcbn1cblxuLy8gTWFpbiBmdW5jdGlvblxuZnVuY3Rpb24gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSkge1xuICAvLyBNYXRjaGVzIG9uZSB3aG9sZSB3b3JkXG4gIHZhciB3b3JkID0gc3RyZWFtLm1hdGNoKC9bXFx3XSsvLCBmYWxzZSk7XG4gIC8vIE1hdGNoZXMgYXR0cmlidXRlcyAoaS5lLiBlbnN1cmUgPT4gcHJlc2VudCA7ICdlbnN1cmUnIHdvdWxkIGJlIG1hdGNoZWQpXG4gIHZhciBhdHRyaWJ1dGUgPSBzdHJlYW0ubWF0Y2goLyhcXHMrKT9cXHcrXFxzKz0+LiovLCBmYWxzZSk7XG4gIC8vIE1hdGNoZXMgbm9uLWJ1aWx0aW4gcmVzb3VyY2UgZGVjbGFyYXRpb25zXG4gIC8vIChpLmUuIFwiYXBhY2hlOjp2aG9zdCB7XCIgb3IgXCJteWN1c3RvbWNsYXNzcyB7XCIgd291bGQgYmUgbWF0Y2hlZClcbiAgdmFyIHJlc291cmNlID0gc3RyZWFtLm1hdGNoKC8oXFxzKyk/W1xcdzpfXSsoXFxzKyk/ey8sIGZhbHNlKTtcbiAgLy8gTWF0Y2hlcyB2aXJ0dWFsIGFuZCBleHBvcnRlZCByZXNvdXJjZXMgKGkuZS4gQEB1c2VyIHsgOyBhbmQgdGhlIGxpa2UpXG4gIHZhciBzcGVjaWFsX3Jlc291cmNlID0gc3RyZWFtLm1hdGNoKC8oXFxzKyk/W0BdezEsMn1bXFx3Ol9dKyhcXHMrKT97LywgZmFsc2UpO1xuXG4gIC8vIEZpbmFsbHkgYWR2YW5jZSB0aGUgc3RyZWFtXG4gIHZhciBjaCA9IHN0cmVhbS5uZXh0KCk7XG5cbiAgLy8gSGF2ZSB3ZSBmb3VuZCBhIHZhcmlhYmxlP1xuICBpZiAoY2ggPT09ICckJykge1xuICAgIGlmIChzdHJlYW0ubWF0Y2godmFyaWFibGVfcmVnZXgpKSB7XG4gICAgICAvLyBJZiBzbywgYW5kIGl0cyBpbiBhIHN0cmluZywgYXNzaWduIGl0IGEgZGlmZmVyZW50IGNvbG9yXG4gICAgICByZXR1cm4gc3RhdGUuY29udGludWVTdHJpbmcgPyAndmFyaWFibGVOYW1lLnNwZWNpYWwnIDogJ3ZhcmlhYmxlJztcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlIHJldHVybiBhbiBpbnZhbGlkIHZhcmlhYmxlXG4gICAgcmV0dXJuIFwiZXJyb3JcIjtcbiAgfVxuICAvLyBTaG91bGQgd2Ugc3RpbGwgYmUgbG9va2luZyBmb3IgdGhlIGVuZCBvZiBhIHN0cmluZz9cbiAgaWYgKHN0YXRlLmNvbnRpbnVlU3RyaW5nKSB7XG4gICAgLy8gSWYgc28sIGdvIHRocm91Z2ggdGhlIGxvb3AgYWdhaW5cbiAgICBzdHJlYW0uYmFja1VwKDEpO1xuICAgIHJldHVybiB0b2tlblN0cmluZyhzdHJlYW0sIHN0YXRlKTtcbiAgfVxuICAvLyBBcmUgd2UgaW4gYSBkZWZpbml0aW9uIChjbGFzcywgbm9kZSwgZGVmaW5lKT9cbiAgaWYgKHN0YXRlLmluRGVmaW5pdGlvbikge1xuICAgIC8vIElmIHNvLCByZXR1cm4gZGVmIChpLmUuIGZvciAnY2xhc3MgbXljbGFzcyB7JyA7ICdteWNsYXNzJyB3b3VsZCBiZSBtYXRjaGVkKVxuICAgIGlmIChzdHJlYW0ubWF0Y2goLyhcXHMrKT9bXFx3Ol9dKyhcXHMrKT8vKSkge1xuICAgICAgcmV0dXJuICdkZWYnO1xuICAgIH1cbiAgICAvLyBNYXRjaCB0aGUgcmVzdCBpdCB0aGUgbmV4dCB0aW1lIGFyb3VuZFxuICAgIHN0cmVhbS5tYXRjaCgvXFxzK3svKTtcbiAgICBzdGF0ZS5pbkRlZmluaXRpb24gPSBmYWxzZTtcbiAgfVxuICAvLyBBcmUgd2UgaW4gYW4gJ2luY2x1ZGUnIHN0YXRlbWVudD9cbiAgaWYgKHN0YXRlLmluSW5jbHVkZSkge1xuICAgIC8vIE1hdGNoIGFuZCByZXR1cm4gdGhlIGluY2x1ZGVkIGNsYXNzXG4gICAgc3RyZWFtLm1hdGNoKC8oXFxzKyk/XFxTKyhcXHMrKT8vKTtcbiAgICBzdGF0ZS5pbkluY2x1ZGUgPSBmYWxzZTtcbiAgICByZXR1cm4gJ2RlZic7XG4gIH1cbiAgLy8gRG8gd2UganVzdCBoYXZlIGEgZnVuY3Rpb24gb24gb3VyIGhhbmRzP1xuICAvLyBJbiAnZW5zdXJlX3Jlc291cmNlKFwibXljbGFzc1wiKScsICdlbnN1cmVfcmVzb3VyY2UnIGlzIG1hdGNoZWRcbiAgaWYgKHN0cmVhbS5tYXRjaCgvKFxccyspP1xcdytcXCgvKSkge1xuICAgIHN0cmVhbS5iYWNrVXAoMSk7XG4gICAgcmV0dXJuICdkZWYnO1xuICB9XG4gIC8vIEhhdmUgd2UgbWF0Y2hlZCB0aGUgcHJpb3IgYXR0cmlidXRlIHJlZ2V4P1xuICBpZiAoYXR0cmlidXRlKSB7XG4gICAgc3RyZWFtLm1hdGNoKC8oXFxzKyk/XFx3Ky8pO1xuICAgIHJldHVybiAndGFnJztcbiAgfVxuICAvLyBEbyB3ZSBoYXZlIFB1cHBldCBzcGVjaWZpYyB3b3Jkcz9cbiAgaWYgKHdvcmQgJiYgd29yZHMuaGFzT3duUHJvcGVydHkod29yZCkpIHtcbiAgICAvLyBOZWdhdGVzIHRoZSBpbml0aWFsIG5leHQoKVxuICAgIHN0cmVhbS5iYWNrVXAoMSk7XG4gICAgLy8gcnMgbW92ZSB0aGUgc3RyZWFtXG4gICAgc3RyZWFtLm1hdGNoKC9bXFx3XSsvKTtcbiAgICAvLyBXZSB3YW50IHRvIHByb2Nlc3MgdGhlc2Ugd29yZHMgZGlmZmVyZW50bHlcbiAgICAvLyBkbyB0byB0aGUgaW1wb3J0YW5jZSB0aGV5IGhhdmUgaW4gUHVwcGV0XG4gICAgaWYgKHN0cmVhbS5tYXRjaCgvXFxzK1xcUytcXHMrey8sIGZhbHNlKSkge1xuICAgICAgc3RhdGUuaW5EZWZpbml0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHdvcmQgPT0gJ2luY2x1ZGUnKSB7XG4gICAgICBzdGF0ZS5pbkluY2x1ZGUgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIHRoZWlyIHZhbHVlIGFzIHN0YXRlIGluIHRoZSBwcmlvciBkZWZpbmUgbWV0aG9kc1xuICAgIHJldHVybiB3b3Jkc1t3b3JkXTtcbiAgfVxuICAvLyBJcyB0aGVyZSBhIG1hdGNoIG9uIGEgcmVmZXJlbmNlP1xuICBpZiAoLyhefFxccyspW0EtWl1bXFx3Ol9dKy8udGVzdCh3b3JkKSkge1xuICAgIC8vIE5lZ2F0ZSB0aGUgbmV4dCgpXG4gICAgc3RyZWFtLmJhY2tVcCgxKTtcbiAgICAvLyBNYXRjaCB0aGUgZnVsbCByZWZlcmVuY2VcbiAgICBzdHJlYW0ubWF0Y2goLyhefFxccyspW0EtWl1bXFx3Ol9dKy8pO1xuICAgIHJldHVybiAnZGVmJztcbiAgfVxuICAvLyBIYXZlIHdlIG1hdGNoZWQgdGhlIHByaW9yIHJlc291cmNlIHJlZ2V4P1xuICBpZiAocmVzb3VyY2UpIHtcbiAgICBzdHJlYW0ubWF0Y2goLyhcXHMrKT9bXFx3Ol9dKy8pO1xuICAgIHJldHVybiAnZGVmJztcbiAgfVxuICAvLyBIYXZlIHdlIG1hdGNoZWQgdGhlIHByaW9yIHNwZWNpYWxfcmVzb3VyY2UgcmVnZXg/XG4gIGlmIChzcGVjaWFsX3Jlc291cmNlKSB7XG4gICAgc3RyZWFtLm1hdGNoKC8oXFxzKyk/W0BdezEsMn0vKTtcbiAgICByZXR1cm4gJ2F0b20nO1xuICB9XG4gIC8vIE1hdGNoIGFsbCB0aGUgY29tbWVudHMuIEFsbCBvZiB0aGVtLlxuICBpZiAoY2ggPT0gXCIjXCIpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICB9XG4gIC8vIEhhdmUgd2UgZm91bmQgYSBzdHJpbmc/XG4gIGlmIChjaCA9PSBcIidcIiB8fCBjaCA9PSAnXCInKSB7XG4gICAgLy8gU3RvcmUgdGhlIHR5cGUgKHNpbmdsZSBvciBkb3VibGUpXG4gICAgc3RhdGUucGVuZGluZyA9IGNoO1xuICAgIC8vIFBlcmZvcm0gdGhlIGxvb3BpbmcgZnVuY3Rpb24gdG8gZmluZCB0aGUgZW5kXG4gICAgcmV0dXJuIHRva2VuU3RyaW5nKHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIC8vIE1hdGNoIGFsbCB0aGUgYnJhY2tldHNcbiAgaWYgKGNoID09ICd7JyB8fCBjaCA9PSAnfScpIHtcbiAgICByZXR1cm4gJ2JyYWNrZXQnO1xuICB9XG4gIC8vIE1hdGNoIGNoYXJhY3RlcnMgdGhhdCB3ZSBhcmUgZ29pbmcgdG8gYXNzdW1lXG4gIC8vIGFyZSB0cnlpbmcgdG8gYmUgcmVnZXhcbiAgaWYgKGNoID09ICcvJykge1xuICAgIHN0cmVhbS5tYXRjaCgvXlteXFwvXSpcXC8vKTtcbiAgICByZXR1cm4gJ3N0cmluZy5zcGVjaWFsJztcbiAgfVxuICAvLyBNYXRjaCBhbGwgdGhlIG51bWJlcnNcbiAgaWYgKGNoLm1hdGNoKC9bMC05XS8pKSB7XG4gICAgc3RyZWFtLmVhdFdoaWxlKC9bMC05XSsvKTtcbiAgICByZXR1cm4gJ251bWJlcic7XG4gIH1cbiAgLy8gTWF0Y2ggdGhlICc9JyBhbmQgJz0+JyBvcGVyYXRvcnNcbiAgaWYgKGNoID09ICc9Jykge1xuICAgIGlmIChzdHJlYW0ucGVlaygpID09ICc+Jykge1xuICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIFwib3BlcmF0b3JcIjtcbiAgfVxuICAvLyBLZWVwIGFkdmFuY2luZyB0aHJvdWdoIGFsbCB0aGUgcmVzdFxuICBzdHJlYW0uZWF0V2hpbGUoL1tcXHctXS8pO1xuICAvLyBSZXR1cm4gYSBibGFuayBsaW5lIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgcmV0dXJuIG51bGw7XG59XG4vLyBTdGFydCBpdCBhbGxcbmV4cG9ydCBjb25zdCBwdXBwZXQgPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhdGUgPSB7fTtcbiAgICBzdGF0ZS5pbkRlZmluaXRpb24gPSBmYWxzZTtcbiAgICBzdGF0ZS5pbkluY2x1ZGUgPSBmYWxzZTtcbiAgICBzdGF0ZS5jb250aW51ZVN0cmluZyA9IGZhbHNlO1xuICAgIHN0YXRlLnBlbmRpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG4gIHRva2VuOiBmdW5jdGlvbiAoc3RyZWFtLCBzdGF0ZSkge1xuICAgIC8vIFN0cmlwIHRoZSBzcGFjZXMsIGJ1dCByZWdleCB3aWxsIGFjY291bnQgZm9yIHRoZW0gZWl0aGVyd2F5XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICAvLyBHbyB0aHJvdWdoIHRoZSBtYWluIHByb2Nlc3NcbiAgICByZXR1cm4gdG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///412\n")}}]);