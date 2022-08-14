(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{402:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nginx", function() { return nginx; });\nfunction words(str) {\n  var obj = {}, words = str.split(" ");\n  for (var i = 0; i < words.length; ++i) obj[words[i]] = true;\n  return obj;\n}\n\nvar keywords = words(\n  /* ngxDirectiveControl */ "break return rewrite set" +\n    /* ngxDirective */ " accept_mutex accept_mutex_delay access_log add_after_body add_before_body add_header addition_types aio alias allow ancient_browser ancient_browser_value auth_basic auth_basic_user_file auth_http auth_http_header auth_http_timeout autoindex autoindex_exact_size autoindex_localtime charset charset_types client_body_buffer_size client_body_in_file_only client_body_in_single_buffer client_body_temp_path client_body_timeout client_header_buffer_size client_header_timeout client_max_body_size connection_pool_size create_full_put_path daemon dav_access dav_methods debug_connection debug_points default_type degradation degrade deny devpoll_changes devpoll_events directio directio_alignment empty_gif env epoll_events error_log eventport_events expires fastcgi_bind fastcgi_buffer_size fastcgi_buffers fastcgi_busy_buffers_size fastcgi_cache fastcgi_cache_key fastcgi_cache_methods fastcgi_cache_min_uses fastcgi_cache_path fastcgi_cache_use_stale fastcgi_cache_valid fastcgi_catch_stderr fastcgi_connect_timeout fastcgi_hide_header fastcgi_ignore_client_abort fastcgi_ignore_headers fastcgi_index fastcgi_intercept_errors fastcgi_max_temp_file_size fastcgi_next_upstream fastcgi_param fastcgi_pass_header fastcgi_pass_request_body fastcgi_pass_request_headers fastcgi_read_timeout fastcgi_send_lowat fastcgi_send_timeout fastcgi_split_path_info fastcgi_store fastcgi_store_access fastcgi_temp_file_write_size fastcgi_temp_path fastcgi_upstream_fail_timeout fastcgi_upstream_max_fails flv geoip_city geoip_country google_perftools_profiles gzip gzip_buffers gzip_comp_level gzip_disable gzip_hash gzip_http_version gzip_min_length gzip_no_buffer gzip_proxied gzip_static gzip_types gzip_vary gzip_window if_modified_since ignore_invalid_headers image_filter image_filter_buffer image_filter_jpeg_quality image_filter_transparency imap_auth imap_capabilities imap_client_buffer index ip_hash keepalive_requests keepalive_timeout kqueue_changes kqueue_events large_client_header_buffers limit_conn limit_conn_log_level limit_rate limit_rate_after limit_req limit_req_log_level limit_req_zone limit_zone lingering_time lingering_timeout lock_file log_format log_not_found log_subrequest map_hash_bucket_size map_hash_max_size master_process memcached_bind memcached_buffer_size memcached_connect_timeout memcached_next_upstream memcached_read_timeout memcached_send_timeout memcached_upstream_fail_timeout memcached_upstream_max_fails merge_slashes min_delete_depth modern_browser modern_browser_value msie_padding msie_refresh multi_accept open_file_cache open_file_cache_errors open_file_cache_events open_file_cache_min_uses open_file_cache_valid open_log_file_cache output_buffers override_charset perl perl_modules perl_require perl_set pid pop3_auth pop3_capabilities port_in_redirect postpone_gzipping postpone_output protocol proxy proxy_bind proxy_buffer proxy_buffer_size proxy_buffering proxy_buffers proxy_busy_buffers_size proxy_cache proxy_cache_key proxy_cache_methods proxy_cache_min_uses proxy_cache_path proxy_cache_use_stale proxy_cache_valid proxy_connect_timeout proxy_headers_hash_bucket_size proxy_headers_hash_max_size proxy_hide_header proxy_ignore_client_abort proxy_ignore_headers proxy_intercept_errors proxy_max_temp_file_size proxy_method proxy_next_upstream proxy_pass_error_message proxy_pass_header proxy_pass_request_body proxy_pass_request_headers proxy_read_timeout proxy_redirect proxy_send_lowat proxy_send_timeout proxy_set_body proxy_set_header proxy_ssl_session_reuse proxy_store proxy_store_access proxy_temp_file_write_size proxy_temp_path proxy_timeout proxy_upstream_fail_timeout proxy_upstream_max_fails random_index read_ahead real_ip_header recursive_error_pages request_pool_size reset_timedout_connection resolver resolver_timeout rewrite_log rtsig_overflow_events rtsig_overflow_test rtsig_overflow_threshold rtsig_signo satisfy secure_link_secret send_lowat send_timeout sendfile sendfile_max_chunk server_name_in_redirect server_names_hash_bucket_size server_names_hash_max_size server_tokens set_real_ip_from smtp_auth smtp_capabilities smtp_client_buffer smtp_greeting_delay so_keepalive source_charset ssi ssi_ignore_recycled_buffers ssi_min_file_chunk ssi_silent_errors ssi_types ssi_value_length ssl ssl_certificate ssl_certificate_key ssl_ciphers ssl_client_certificate ssl_crl ssl_dhparam ssl_engine ssl_prefer_server_ciphers ssl_protocols ssl_session_cache ssl_session_timeout ssl_verify_client ssl_verify_depth starttls stub_status sub_filter sub_filter_once sub_filter_types tcp_nodelay tcp_nopush thread_stack_size timeout timer_resolution types_hash_bucket_size types_hash_max_size underscores_in_headers uninitialized_variable_warn use user userid userid_domain userid_expires userid_mark userid_name userid_p3p userid_path userid_service valid_referers variables_hash_bucket_size variables_hash_max_size worker_connections worker_cpu_affinity worker_priority worker_processes worker_rlimit_core worker_rlimit_nofile worker_rlimit_sigpending worker_threads working_directory xclient xml_entities xslt_stylesheet xslt_typesdrew@li229-23"\n);\n\nvar keywords_block = words(\n  /* ngxDirectiveBlock */ "http mail events server types location upstream charset_map limit_except if geo map"\n);\n\nvar keywords_important = words(\n  /* ngxDirectiveImportant */ "include root server server_name listen internal proxy_pass memcached_pass fastcgi_pass try_files"\n);\n\nvar type;\nfunction ret(style, tp) {type = tp; return style;}\n\nfunction tokenBase(stream, state) {\n\n\n  stream.eatWhile(/[\\w\\$_]/);\n\n  var cur = stream.current();\n\n\n  if (keywords.propertyIsEnumerable(cur)) {\n    return "keyword";\n  }\n  else if (keywords_block.propertyIsEnumerable(cur)) {\n    return "controlKeyword";\n  }\n  else if (keywords_important.propertyIsEnumerable(cur)) {\n    return "controlKeyword";\n  }\n  /**/\n\n  var ch = stream.next();\n  if (ch == "@") {stream.eatWhile(/[\\w\\\\\\-]/); return ret("meta", stream.current());}\n  else if (ch == "/" && stream.eat("*")) {\n    state.tokenize = tokenCComment;\n    return tokenCComment(stream, state);\n  }\n  else if (ch == "<" && stream.eat("!")) {\n    state.tokenize = tokenSGMLComment;\n    return tokenSGMLComment(stream, state);\n  }\n  else if (ch == "=") ret(null, "compare");\n  else if ((ch == "~" || ch == "|") && stream.eat("=")) return ret(null, "compare");\n  else if (ch == "\\"" || ch == "\'") {\n    state.tokenize = tokenString(ch);\n    return state.tokenize(stream, state);\n  }\n  else if (ch == "#") {\n    stream.skipToEnd();\n    return ret("comment", "comment");\n  }\n  else if (ch == "!") {\n    stream.match(/^\\s*\\w*/);\n    return ret("keyword", "important");\n  }\n  else if (/\\d/.test(ch)) {\n    stream.eatWhile(/[\\w.%]/);\n    return ret("number", "unit");\n  }\n  else if (/[,.+>*\\/]/.test(ch)) {\n    return ret(null, "select-op");\n  }\n  else if (/[;{}:\\[\\]]/.test(ch)) {\n    return ret(null, ch);\n  }\n  else {\n    stream.eatWhile(/[\\w\\\\\\-]/);\n    return ret("variable", "variable");\n  }\n}\n\nfunction tokenCComment(stream, state) {\n  var maybeEnd = false, ch;\n  while ((ch = stream.next()) != null) {\n    if (maybeEnd && ch == "/") {\n      state.tokenize = tokenBase;\n      break;\n    }\n    maybeEnd = (ch == "*");\n  }\n  return ret("comment", "comment");\n}\n\nfunction tokenSGMLComment(stream, state) {\n  var dashes = 0, ch;\n  while ((ch = stream.next()) != null) {\n    if (dashes >= 2 && ch == ">") {\n      state.tokenize = tokenBase;\n      break;\n    }\n    dashes = (ch == "-") ? dashes + 1 : 0;\n  }\n  return ret("comment", "comment");\n}\n\nfunction tokenString(quote) {\n  return function(stream, state) {\n    var escaped = false, ch;\n    while ((ch = stream.next()) != null) {\n      if (ch == quote && !escaped)\n        break;\n      escaped = !escaped && ch == "\\\\";\n    }\n    if (!escaped) state.tokenize = tokenBase;\n    return ret("string", "string");\n  };\n}\n\nconst nginx = {\n  startState: function() {\n    return {tokenize: tokenBase,\n            baseIndent: 0,\n            stack: []};\n  },\n\n  token: function(stream, state) {\n    if (stream.eatSpace()) return null;\n    type = null;\n    var style = state.tokenize(stream, state);\n\n    var context = state.stack[state.stack.length-1];\n    if (type == "hash" && context == "rule") style = "atom";\n    else if (style == "variable") {\n      if (context == "rule") style = "number";\n      else if (!context || context == "@media{") style = "tag";\n    }\n\n    if (context == "rule" && /^[\\{\\};]$/.test(type))\n      state.stack.pop();\n    if (type == "{") {\n      if (context == "@media") state.stack[state.stack.length-1] = "@media{";\n      else state.stack.push("{");\n    }\n    else if (type == "}") state.stack.pop();\n    else if (type == "@media") state.stack.push("@media");\n    else if (context == "{" && type != "comment") state.stack.push("rule");\n    return style;\n  },\n\n  indent: function(state, textAfter, cx) {\n    var n = state.stack.length;\n    if (/^\\}/.test(textAfter))\n      n -= state.stack[state.stack.length-1] == "rule" ? 2 : 1;\n    return state.baseIndent + n * cx.unit;\n  },\n\n  languageData: {\n    indentOnInput: /^\\s*\\}$/\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGNvZGVtaXJyb3IvbGVnYWN5LW1vZGVzL21vZGUvbmdpbnguanM/MjAyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQSxjQUFjO0FBQ2QsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsVUFBVTs7QUFFbkM7OztBQUdBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7O0FBRUEsa0NBQWtDLEdBQUc7QUFDckM7QUFDQSxrQkFBa0I7QUFDbEIsMkVBQTJFO0FBQzNFLDhCQUE4QjtBQUM5QjtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBIiwiZmlsZSI6IjQwMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHdvcmRzKHN0cikge1xuICB2YXIgb2JqID0ge30sIHdvcmRzID0gc3RyLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkgb2JqW3dvcmRzW2ldXSA9IHRydWU7XG4gIHJldHVybiBvYmo7XG59XG5cbnZhciBrZXl3b3JkcyA9IHdvcmRzKFxuICAvKiBuZ3hEaXJlY3RpdmVDb250cm9sICovIFwiYnJlYWsgcmV0dXJuIHJld3JpdGUgc2V0XCIgK1xuICAgIC8qIG5neERpcmVjdGl2ZSAqLyBcIiBhY2NlcHRfbXV0ZXggYWNjZXB0X211dGV4X2RlbGF5IGFjY2Vzc19sb2cgYWRkX2FmdGVyX2JvZHkgYWRkX2JlZm9yZV9ib2R5IGFkZF9oZWFkZXIgYWRkaXRpb25fdHlwZXMgYWlvIGFsaWFzIGFsbG93IGFuY2llbnRfYnJvd3NlciBhbmNpZW50X2Jyb3dzZXJfdmFsdWUgYXV0aF9iYXNpYyBhdXRoX2Jhc2ljX3VzZXJfZmlsZSBhdXRoX2h0dHAgYXV0aF9odHRwX2hlYWRlciBhdXRoX2h0dHBfdGltZW91dCBhdXRvaW5kZXggYXV0b2luZGV4X2V4YWN0X3NpemUgYXV0b2luZGV4X2xvY2FsdGltZSBjaGFyc2V0IGNoYXJzZXRfdHlwZXMgY2xpZW50X2JvZHlfYnVmZmVyX3NpemUgY2xpZW50X2JvZHlfaW5fZmlsZV9vbmx5IGNsaWVudF9ib2R5X2luX3NpbmdsZV9idWZmZXIgY2xpZW50X2JvZHlfdGVtcF9wYXRoIGNsaWVudF9ib2R5X3RpbWVvdXQgY2xpZW50X2hlYWRlcl9idWZmZXJfc2l6ZSBjbGllbnRfaGVhZGVyX3RpbWVvdXQgY2xpZW50X21heF9ib2R5X3NpemUgY29ubmVjdGlvbl9wb29sX3NpemUgY3JlYXRlX2Z1bGxfcHV0X3BhdGggZGFlbW9uIGRhdl9hY2Nlc3MgZGF2X21ldGhvZHMgZGVidWdfY29ubmVjdGlvbiBkZWJ1Z19wb2ludHMgZGVmYXVsdF90eXBlIGRlZ3JhZGF0aW9uIGRlZ3JhZGUgZGVueSBkZXZwb2xsX2NoYW5nZXMgZGV2cG9sbF9ldmVudHMgZGlyZWN0aW8gZGlyZWN0aW9fYWxpZ25tZW50IGVtcHR5X2dpZiBlbnYgZXBvbGxfZXZlbnRzIGVycm9yX2xvZyBldmVudHBvcnRfZXZlbnRzIGV4cGlyZXMgZmFzdGNnaV9iaW5kIGZhc3RjZ2lfYnVmZmVyX3NpemUgZmFzdGNnaV9idWZmZXJzIGZhc3RjZ2lfYnVzeV9idWZmZXJzX3NpemUgZmFzdGNnaV9jYWNoZSBmYXN0Y2dpX2NhY2hlX2tleSBmYXN0Y2dpX2NhY2hlX21ldGhvZHMgZmFzdGNnaV9jYWNoZV9taW5fdXNlcyBmYXN0Y2dpX2NhY2hlX3BhdGggZmFzdGNnaV9jYWNoZV91c2Vfc3RhbGUgZmFzdGNnaV9jYWNoZV92YWxpZCBmYXN0Y2dpX2NhdGNoX3N0ZGVyciBmYXN0Y2dpX2Nvbm5lY3RfdGltZW91dCBmYXN0Y2dpX2hpZGVfaGVhZGVyIGZhc3RjZ2lfaWdub3JlX2NsaWVudF9hYm9ydCBmYXN0Y2dpX2lnbm9yZV9oZWFkZXJzIGZhc3RjZ2lfaW5kZXggZmFzdGNnaV9pbnRlcmNlcHRfZXJyb3JzIGZhc3RjZ2lfbWF4X3RlbXBfZmlsZV9zaXplIGZhc3RjZ2lfbmV4dF91cHN0cmVhbSBmYXN0Y2dpX3BhcmFtIGZhc3RjZ2lfcGFzc19oZWFkZXIgZmFzdGNnaV9wYXNzX3JlcXVlc3RfYm9keSBmYXN0Y2dpX3Bhc3NfcmVxdWVzdF9oZWFkZXJzIGZhc3RjZ2lfcmVhZF90aW1lb3V0IGZhc3RjZ2lfc2VuZF9sb3dhdCBmYXN0Y2dpX3NlbmRfdGltZW91dCBmYXN0Y2dpX3NwbGl0X3BhdGhfaW5mbyBmYXN0Y2dpX3N0b3JlIGZhc3RjZ2lfc3RvcmVfYWNjZXNzIGZhc3RjZ2lfdGVtcF9maWxlX3dyaXRlX3NpemUgZmFzdGNnaV90ZW1wX3BhdGggZmFzdGNnaV91cHN0cmVhbV9mYWlsX3RpbWVvdXQgZmFzdGNnaV91cHN0cmVhbV9tYXhfZmFpbHMgZmx2IGdlb2lwX2NpdHkgZ2VvaXBfY291bnRyeSBnb29nbGVfcGVyZnRvb2xzX3Byb2ZpbGVzIGd6aXAgZ3ppcF9idWZmZXJzIGd6aXBfY29tcF9sZXZlbCBnemlwX2Rpc2FibGUgZ3ppcF9oYXNoIGd6aXBfaHR0cF92ZXJzaW9uIGd6aXBfbWluX2xlbmd0aCBnemlwX25vX2J1ZmZlciBnemlwX3Byb3hpZWQgZ3ppcF9zdGF0aWMgZ3ppcF90eXBlcyBnemlwX3ZhcnkgZ3ppcF93aW5kb3cgaWZfbW9kaWZpZWRfc2luY2UgaWdub3JlX2ludmFsaWRfaGVhZGVycyBpbWFnZV9maWx0ZXIgaW1hZ2VfZmlsdGVyX2J1ZmZlciBpbWFnZV9maWx0ZXJfanBlZ19xdWFsaXR5IGltYWdlX2ZpbHRlcl90cmFuc3BhcmVuY3kgaW1hcF9hdXRoIGltYXBfY2FwYWJpbGl0aWVzIGltYXBfY2xpZW50X2J1ZmZlciBpbmRleCBpcF9oYXNoIGtlZXBhbGl2ZV9yZXF1ZXN0cyBrZWVwYWxpdmVfdGltZW91dCBrcXVldWVfY2hhbmdlcyBrcXVldWVfZXZlbnRzIGxhcmdlX2NsaWVudF9oZWFkZXJfYnVmZmVycyBsaW1pdF9jb25uIGxpbWl0X2Nvbm5fbG9nX2xldmVsIGxpbWl0X3JhdGUgbGltaXRfcmF0ZV9hZnRlciBsaW1pdF9yZXEgbGltaXRfcmVxX2xvZ19sZXZlbCBsaW1pdF9yZXFfem9uZSBsaW1pdF96b25lIGxpbmdlcmluZ190aW1lIGxpbmdlcmluZ190aW1lb3V0IGxvY2tfZmlsZSBsb2dfZm9ybWF0IGxvZ19ub3RfZm91bmQgbG9nX3N1YnJlcXVlc3QgbWFwX2hhc2hfYnVja2V0X3NpemUgbWFwX2hhc2hfbWF4X3NpemUgbWFzdGVyX3Byb2Nlc3MgbWVtY2FjaGVkX2JpbmQgbWVtY2FjaGVkX2J1ZmZlcl9zaXplIG1lbWNhY2hlZF9jb25uZWN0X3RpbWVvdXQgbWVtY2FjaGVkX25leHRfdXBzdHJlYW0gbWVtY2FjaGVkX3JlYWRfdGltZW91dCBtZW1jYWNoZWRfc2VuZF90aW1lb3V0IG1lbWNhY2hlZF91cHN0cmVhbV9mYWlsX3RpbWVvdXQgbWVtY2FjaGVkX3Vwc3RyZWFtX21heF9mYWlscyBtZXJnZV9zbGFzaGVzIG1pbl9kZWxldGVfZGVwdGggbW9kZXJuX2Jyb3dzZXIgbW9kZXJuX2Jyb3dzZXJfdmFsdWUgbXNpZV9wYWRkaW5nIG1zaWVfcmVmcmVzaCBtdWx0aV9hY2NlcHQgb3Blbl9maWxlX2NhY2hlIG9wZW5fZmlsZV9jYWNoZV9lcnJvcnMgb3Blbl9maWxlX2NhY2hlX2V2ZW50cyBvcGVuX2ZpbGVfY2FjaGVfbWluX3VzZXMgb3Blbl9maWxlX2NhY2hlX3ZhbGlkIG9wZW5fbG9nX2ZpbGVfY2FjaGUgb3V0cHV0X2J1ZmZlcnMgb3ZlcnJpZGVfY2hhcnNldCBwZXJsIHBlcmxfbW9kdWxlcyBwZXJsX3JlcXVpcmUgcGVybF9zZXQgcGlkIHBvcDNfYXV0aCBwb3AzX2NhcGFiaWxpdGllcyBwb3J0X2luX3JlZGlyZWN0IHBvc3Rwb25lX2d6aXBwaW5nIHBvc3Rwb25lX291dHB1dCBwcm90b2NvbCBwcm94eSBwcm94eV9iaW5kIHByb3h5X2J1ZmZlciBwcm94eV9idWZmZXJfc2l6ZSBwcm94eV9idWZmZXJpbmcgcHJveHlfYnVmZmVycyBwcm94eV9idXN5X2J1ZmZlcnNfc2l6ZSBwcm94eV9jYWNoZSBwcm94eV9jYWNoZV9rZXkgcHJveHlfY2FjaGVfbWV0aG9kcyBwcm94eV9jYWNoZV9taW5fdXNlcyBwcm94eV9jYWNoZV9wYXRoIHByb3h5X2NhY2hlX3VzZV9zdGFsZSBwcm94eV9jYWNoZV92YWxpZCBwcm94eV9jb25uZWN0X3RpbWVvdXQgcHJveHlfaGVhZGVyc19oYXNoX2J1Y2tldF9zaXplIHByb3h5X2hlYWRlcnNfaGFzaF9tYXhfc2l6ZSBwcm94eV9oaWRlX2hlYWRlciBwcm94eV9pZ25vcmVfY2xpZW50X2Fib3J0IHByb3h5X2lnbm9yZV9oZWFkZXJzIHByb3h5X2ludGVyY2VwdF9lcnJvcnMgcHJveHlfbWF4X3RlbXBfZmlsZV9zaXplIHByb3h5X21ldGhvZCBwcm94eV9uZXh0X3Vwc3RyZWFtIHByb3h5X3Bhc3NfZXJyb3JfbWVzc2FnZSBwcm94eV9wYXNzX2hlYWRlciBwcm94eV9wYXNzX3JlcXVlc3RfYm9keSBwcm94eV9wYXNzX3JlcXVlc3RfaGVhZGVycyBwcm94eV9yZWFkX3RpbWVvdXQgcHJveHlfcmVkaXJlY3QgcHJveHlfc2VuZF9sb3dhdCBwcm94eV9zZW5kX3RpbWVvdXQgcHJveHlfc2V0X2JvZHkgcHJveHlfc2V0X2hlYWRlciBwcm94eV9zc2xfc2Vzc2lvbl9yZXVzZSBwcm94eV9zdG9yZSBwcm94eV9zdG9yZV9hY2Nlc3MgcHJveHlfdGVtcF9maWxlX3dyaXRlX3NpemUgcHJveHlfdGVtcF9wYXRoIHByb3h5X3RpbWVvdXQgcHJveHlfdXBzdHJlYW1fZmFpbF90aW1lb3V0IHByb3h5X3Vwc3RyZWFtX21heF9mYWlscyByYW5kb21faW5kZXggcmVhZF9haGVhZCByZWFsX2lwX2hlYWRlciByZWN1cnNpdmVfZXJyb3JfcGFnZXMgcmVxdWVzdF9wb29sX3NpemUgcmVzZXRfdGltZWRvdXRfY29ubmVjdGlvbiByZXNvbHZlciByZXNvbHZlcl90aW1lb3V0IHJld3JpdGVfbG9nIHJ0c2lnX292ZXJmbG93X2V2ZW50cyBydHNpZ19vdmVyZmxvd190ZXN0IHJ0c2lnX292ZXJmbG93X3RocmVzaG9sZCBydHNpZ19zaWdubyBzYXRpc2Z5IHNlY3VyZV9saW5rX3NlY3JldCBzZW5kX2xvd2F0IHNlbmRfdGltZW91dCBzZW5kZmlsZSBzZW5kZmlsZV9tYXhfY2h1bmsgc2VydmVyX25hbWVfaW5fcmVkaXJlY3Qgc2VydmVyX25hbWVzX2hhc2hfYnVja2V0X3NpemUgc2VydmVyX25hbWVzX2hhc2hfbWF4X3NpemUgc2VydmVyX3Rva2VucyBzZXRfcmVhbF9pcF9mcm9tIHNtdHBfYXV0aCBzbXRwX2NhcGFiaWxpdGllcyBzbXRwX2NsaWVudF9idWZmZXIgc210cF9ncmVldGluZ19kZWxheSBzb19rZWVwYWxpdmUgc291cmNlX2NoYXJzZXQgc3NpIHNzaV9pZ25vcmVfcmVjeWNsZWRfYnVmZmVycyBzc2lfbWluX2ZpbGVfY2h1bmsgc3NpX3NpbGVudF9lcnJvcnMgc3NpX3R5cGVzIHNzaV92YWx1ZV9sZW5ndGggc3NsIHNzbF9jZXJ0aWZpY2F0ZSBzc2xfY2VydGlmaWNhdGVfa2V5IHNzbF9jaXBoZXJzIHNzbF9jbGllbnRfY2VydGlmaWNhdGUgc3NsX2NybCBzc2xfZGhwYXJhbSBzc2xfZW5naW5lIHNzbF9wcmVmZXJfc2VydmVyX2NpcGhlcnMgc3NsX3Byb3RvY29scyBzc2xfc2Vzc2lvbl9jYWNoZSBzc2xfc2Vzc2lvbl90aW1lb3V0IHNzbF92ZXJpZnlfY2xpZW50IHNzbF92ZXJpZnlfZGVwdGggc3RhcnR0bHMgc3R1Yl9zdGF0dXMgc3ViX2ZpbHRlciBzdWJfZmlsdGVyX29uY2Ugc3ViX2ZpbHRlcl90eXBlcyB0Y3Bfbm9kZWxheSB0Y3Bfbm9wdXNoIHRocmVhZF9zdGFja19zaXplIHRpbWVvdXQgdGltZXJfcmVzb2x1dGlvbiB0eXBlc19oYXNoX2J1Y2tldF9zaXplIHR5cGVzX2hhc2hfbWF4X3NpemUgdW5kZXJzY29yZXNfaW5faGVhZGVycyB1bmluaXRpYWxpemVkX3ZhcmlhYmxlX3dhcm4gdXNlIHVzZXIgdXNlcmlkIHVzZXJpZF9kb21haW4gdXNlcmlkX2V4cGlyZXMgdXNlcmlkX21hcmsgdXNlcmlkX25hbWUgdXNlcmlkX3AzcCB1c2VyaWRfcGF0aCB1c2VyaWRfc2VydmljZSB2YWxpZF9yZWZlcmVycyB2YXJpYWJsZXNfaGFzaF9idWNrZXRfc2l6ZSB2YXJpYWJsZXNfaGFzaF9tYXhfc2l6ZSB3b3JrZXJfY29ubmVjdGlvbnMgd29ya2VyX2NwdV9hZmZpbml0eSB3b3JrZXJfcHJpb3JpdHkgd29ya2VyX3Byb2Nlc3NlcyB3b3JrZXJfcmxpbWl0X2NvcmUgd29ya2VyX3JsaW1pdF9ub2ZpbGUgd29ya2VyX3JsaW1pdF9zaWdwZW5kaW5nIHdvcmtlcl90aHJlYWRzIHdvcmtpbmdfZGlyZWN0b3J5IHhjbGllbnQgeG1sX2VudGl0aWVzIHhzbHRfc3R5bGVzaGVldCB4c2x0X3R5cGVzZHJld0BsaTIyOS0yM1wiXG4pO1xuXG52YXIga2V5d29yZHNfYmxvY2sgPSB3b3JkcyhcbiAgLyogbmd4RGlyZWN0aXZlQmxvY2sgKi8gXCJodHRwIG1haWwgZXZlbnRzIHNlcnZlciB0eXBlcyBsb2NhdGlvbiB1cHN0cmVhbSBjaGFyc2V0X21hcCBsaW1pdF9leGNlcHQgaWYgZ2VvIG1hcFwiXG4pO1xuXG52YXIga2V5d29yZHNfaW1wb3J0YW50ID0gd29yZHMoXG4gIC8qIG5neERpcmVjdGl2ZUltcG9ydGFudCAqLyBcImluY2x1ZGUgcm9vdCBzZXJ2ZXIgc2VydmVyX25hbWUgbGlzdGVuIGludGVybmFsIHByb3h5X3Bhc3MgbWVtY2FjaGVkX3Bhc3MgZmFzdGNnaV9wYXNzIHRyeV9maWxlc1wiXG4pO1xuXG52YXIgdHlwZTtcbmZ1bmN0aW9uIHJldChzdHlsZSwgdHApIHt0eXBlID0gdHA7IHJldHVybiBzdHlsZTt9XG5cbmZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG5cblxuICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXCRfXS8pO1xuXG4gIHZhciBjdXIgPSBzdHJlYW0uY3VycmVudCgpO1xuXG5cbiAgaWYgKGtleXdvcmRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHtcbiAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gIH1cbiAgZWxzZSBpZiAoa2V5d29yZHNfYmxvY2sucHJvcGVydHlJc0VudW1lcmFibGUoY3VyKSkge1xuICAgIHJldHVybiBcImNvbnRyb2xLZXl3b3JkXCI7XG4gIH1cbiAgZWxzZSBpZiAoa2V5d29yZHNfaW1wb3J0YW50LnByb3BlcnR5SXNFbnVtZXJhYmxlKGN1cikpIHtcbiAgICByZXR1cm4gXCJjb250cm9sS2V5d29yZFwiO1xuICB9XG4gIC8qKi9cblxuICB2YXIgY2ggPSBzdHJlYW0ubmV4dCgpO1xuICBpZiAoY2ggPT0gXCJAXCIpIHtzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXFxcXFwtXS8pOyByZXR1cm4gcmV0KFwibWV0YVwiLCBzdHJlYW0uY3VycmVudCgpKTt9XG4gIGVsc2UgaWYgKGNoID09IFwiL1wiICYmIHN0cmVhbS5lYXQoXCIqXCIpKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkNDb21tZW50O1xuICAgIHJldHVybiB0b2tlbkNDb21tZW50KHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGVsc2UgaWYgKGNoID09IFwiPFwiICYmIHN0cmVhbS5lYXQoXCIhXCIpKSB7XG4gICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblNHTUxDb21tZW50O1xuICAgIHJldHVybiB0b2tlblNHTUxDb21tZW50KHN0cmVhbSwgc3RhdGUpO1xuICB9XG4gIGVsc2UgaWYgKGNoID09IFwiPVwiKSByZXQobnVsbCwgXCJjb21wYXJlXCIpO1xuICBlbHNlIGlmICgoY2ggPT0gXCJ+XCIgfHwgY2ggPT0gXCJ8XCIpICYmIHN0cmVhbS5lYXQoXCI9XCIpKSByZXR1cm4gcmV0KG51bGwsIFwiY29tcGFyZVwiKTtcbiAgZWxzZSBpZiAoY2ggPT0gXCJcXFwiXCIgfHwgY2ggPT0gXCInXCIpIHtcbiAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuU3RyaW5nKGNoKTtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gIH1cbiAgZWxzZSBpZiAoY2ggPT0gXCIjXCIpIHtcbiAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgcmV0dXJuIHJldChcImNvbW1lbnRcIiwgXCJjb21tZW50XCIpO1xuICB9XG4gIGVsc2UgaWYgKGNoID09IFwiIVwiKSB7XG4gICAgc3RyZWFtLm1hdGNoKC9eXFxzKlxcdyovKTtcbiAgICByZXR1cm4gcmV0KFwia2V5d29yZFwiLCBcImltcG9ydGFudFwiKTtcbiAgfVxuICBlbHNlIGlmICgvXFxkLy50ZXN0KGNoKSkge1xuICAgIHN0cmVhbS5lYXRXaGlsZSgvW1xcdy4lXS8pO1xuICAgIHJldHVybiByZXQoXCJudW1iZXJcIiwgXCJ1bml0XCIpO1xuICB9XG4gIGVsc2UgaWYgKC9bLC4rPipcXC9dLy50ZXN0KGNoKSkge1xuICAgIHJldHVybiByZXQobnVsbCwgXCJzZWxlY3Qtb3BcIik7XG4gIH1cbiAgZWxzZSBpZiAoL1s7e306XFxbXFxdXS8udGVzdChjaCkpIHtcbiAgICByZXR1cm4gcmV0KG51bGwsIGNoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBzdHJlYW0uZWF0V2hpbGUoL1tcXHdcXFxcXFwtXS8pO1xuICAgIHJldHVybiByZXQoXCJ2YXJpYWJsZVwiLCBcInZhcmlhYmxlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRva2VuQ0NvbW1lbnQoc3RyZWFtLCBzdGF0ZSkge1xuICB2YXIgbWF5YmVFbmQgPSBmYWxzZSwgY2g7XG4gIHdoaWxlICgoY2ggPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgaWYgKG1heWJlRW5kICYmIGNoID09IFwiL1wiKSB7XG4gICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBtYXliZUVuZCA9IChjaCA9PSBcIipcIik7XG4gIH1cbiAgcmV0dXJuIHJldChcImNvbW1lbnRcIiwgXCJjb21tZW50XCIpO1xufVxuXG5mdW5jdGlvbiB0b2tlblNHTUxDb21tZW50KHN0cmVhbSwgc3RhdGUpIHtcbiAgdmFyIGRhc2hlcyA9IDAsIGNoO1xuICB3aGlsZSAoKGNoID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgIGlmIChkYXNoZXMgPj0gMiAmJiBjaCA9PSBcIj5cIikge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlbkJhc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGFzaGVzID0gKGNoID09IFwiLVwiKSA/IGRhc2hlcyArIDEgOiAwO1xuICB9XG4gIHJldHVybiByZXQoXCJjb21tZW50XCIsIFwiY29tbWVudFwiKTtcbn1cblxuZnVuY3Rpb24gdG9rZW5TdHJpbmcocXVvdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBjaDtcbiAgICB3aGlsZSAoKGNoID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKGNoID09IHF1b3RlICYmICFlc2NhcGVkKVxuICAgICAgICBicmVhaztcbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBjaCA9PSBcIlxcXFxcIjtcbiAgICB9XG4gICAgaWYgKCFlc2NhcGVkKSBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICByZXR1cm4gcmV0KFwic3RyaW5nXCIsIFwic3RyaW5nXCIpO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgbmdpbnggPSB7XG4gIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7dG9rZW5pemU6IHRva2VuQmFzZSxcbiAgICAgICAgICAgIGJhc2VJbmRlbnQ6IDAsXG4gICAgICAgICAgICBzdGFjazogW119O1xuICB9LFxuXG4gIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgaWYgKHN0cmVhbS5lYXRTcGFjZSgpKSByZXR1cm4gbnVsbDtcbiAgICB0eXBlID0gbnVsbDtcbiAgICB2YXIgc3R5bGUgPSBzdGF0ZS50b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcblxuICAgIHZhciBjb250ZXh0ID0gc3RhdGUuc3RhY2tbc3RhdGUuc3RhY2subGVuZ3RoLTFdO1xuICAgIGlmICh0eXBlID09IFwiaGFzaFwiICYmIGNvbnRleHQgPT0gXCJydWxlXCIpIHN0eWxlID0gXCJhdG9tXCI7XG4gICAgZWxzZSBpZiAoc3R5bGUgPT0gXCJ2YXJpYWJsZVwiKSB7XG4gICAgICBpZiAoY29udGV4dCA9PSBcInJ1bGVcIikgc3R5bGUgPSBcIm51bWJlclwiO1xuICAgICAgZWxzZSBpZiAoIWNvbnRleHQgfHwgY29udGV4dCA9PSBcIkBtZWRpYXtcIikgc3R5bGUgPSBcInRhZ1wiO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ID09IFwicnVsZVwiICYmIC9eW1xce1xcfTtdJC8udGVzdCh0eXBlKSlcbiAgICAgIHN0YXRlLnN0YWNrLnBvcCgpO1xuICAgIGlmICh0eXBlID09IFwie1wiKSB7XG4gICAgICBpZiAoY29udGV4dCA9PSBcIkBtZWRpYVwiKSBzdGF0ZS5zdGFja1tzdGF0ZS5zdGFjay5sZW5ndGgtMV0gPSBcIkBtZWRpYXtcIjtcbiAgICAgIGVsc2Ugc3RhdGUuc3RhY2sucHVzaChcIntcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJ9XCIpIHN0YXRlLnN0YWNrLnBvcCgpO1xuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJAbWVkaWFcIikgc3RhdGUuc3RhY2sucHVzaChcIkBtZWRpYVwiKTtcbiAgICBlbHNlIGlmIChjb250ZXh0ID09IFwie1wiICYmIHR5cGUgIT0gXCJjb21tZW50XCIpIHN0YXRlLnN0YWNrLnB1c2goXCJydWxlXCIpO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfSxcblxuICBpbmRlbnQ6IGZ1bmN0aW9uKHN0YXRlLCB0ZXh0QWZ0ZXIsIGN4KSB7XG4gICAgdmFyIG4gPSBzdGF0ZS5zdGFjay5sZW5ndGg7XG4gICAgaWYgKC9eXFx9Ly50ZXN0KHRleHRBZnRlcikpXG4gICAgICBuIC09IHN0YXRlLnN0YWNrW3N0YXRlLnN0YWNrLmxlbmd0aC0xXSA9PSBcInJ1bGVcIiA/IDIgOiAxO1xuICAgIHJldHVybiBzdGF0ZS5iYXNlSW5kZW50ICsgbiAqIGN4LnVuaXQ7XG4gIH0sXG5cbiAgbGFuZ3VhZ2VEYXRhOiB7XG4gICAgaW5kZW50T25JbnB1dDogL15cXHMqXFx9JC9cbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///402\n')}}]);