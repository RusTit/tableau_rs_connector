(function() {var implementors = {};
implementors["hyper"] = [{"text":"impl AsyncRead for Upgraded","synthetic":false,"types":[]},{"text":"impl AsyncRead for AddrStream","synthetic":false,"types":[]}];
implementors["tokio_util"] = [{"text":"impl&lt;S, B, E&gt; AsyncRead for StreamReader&lt;S, B&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;S: Stream&lt;Item = Result&lt;B, E&gt;&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;B: Buf,<br>&nbsp;&nbsp;&nbsp;&nbsp;E: Into&lt;Error&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;L, R&gt; AsyncRead for Either&lt;L, R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: AsyncRead,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: AsyncRead,&nbsp;</span>","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()