(function() {var implementors = {};
implementors["futures_channel"] = [{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"futures_channel/mpsc/struct.Receiver.html\" title=\"struct futures_channel::mpsc::Receiver\">Receiver</a>&lt;T&gt;","synthetic":false,"types":["futures_channel::mpsc::Receiver"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"futures_channel/mpsc/struct.UnboundedReceiver.html\" title=\"struct futures_channel::mpsc::UnboundedReceiver\">UnboundedReceiver</a>&lt;T&gt;","synthetic":false,"types":["futures_channel::mpsc::UnboundedReceiver"]}];
implementors["futures_core"] = [];
implementors["hyper"] = [{"text":"impl <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"hyper/body/struct.Body.html\" title=\"struct hyper::body::Body\">Body</a>","synthetic":false,"types":["hyper::body::body::Body"]}];
implementors["tokio_stream"] = [{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/wrappers/struct.ReceiverStream.html\" title=\"struct tokio_stream::wrappers::ReceiverStream\">ReceiverStream</a>&lt;T&gt;","synthetic":false,"types":["tokio_stream::wrappers::mpsc_bounded::ReceiverStream"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/wrappers/struct.UnboundedReceiverStream.html\" title=\"struct tokio_stream::wrappers::UnboundedReceiverStream\">UnboundedReceiverStream</a>&lt;T&gt;","synthetic":false,"types":["tokio_stream::wrappers::mpsc_unbounded::UnboundedReceiverStream"]},{"text":"impl <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/wrappers/struct.IntervalStream.html\" title=\"struct tokio_stream::wrappers::IntervalStream\">IntervalStream</a>","synthetic":false,"types":["tokio_stream::wrappers::interval::IntervalStream"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/struct.Empty.html\" title=\"struct tokio_stream::Empty\">Empty</a>&lt;T&gt;","synthetic":false,"types":["tokio_stream::empty::Empty"]},{"text":"impl&lt;I&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/struct.Iter.html\" title=\"struct tokio_stream::Iter\">Iter</a>&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/core/iter/traits/iterator/trait.Iterator.html\" title=\"trait core::iter::traits::iterator::Iterator\">Iterator</a>,&nbsp;</span>","synthetic":false,"types":["tokio_stream::iter::Iter"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/struct.Once.html\" title=\"struct tokio_stream::Once\">Once</a>&lt;T&gt;","synthetic":false,"types":["tokio_stream::once::Once"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/struct.Pending.html\" title=\"struct tokio_stream::Pending\">Pending</a>&lt;T&gt;","synthetic":false,"types":["tokio_stream::pending::Pending"]},{"text":"impl&lt;K, V&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_stream/struct.StreamMap.html\" title=\"struct tokio_stream::StreamMap\">StreamMap</a>&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;K: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/core/marker/trait.Unpin.html\" title=\"trait core::marker::Unpin\">Unpin</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;V: <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/core/marker/trait.Unpin.html\" title=\"trait core::marker::Unpin\">Unpin</a>,&nbsp;</span>","synthetic":false,"types":["tokio_stream::stream_map::StreamMap"]}];
implementors["tokio_tungstenite"] = [{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_tungstenite/struct.WebSocketStream.html\" title=\"struct tokio_tungstenite::WebSocketStream\">WebSocketStream</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"tokio/io/async_read/trait.AsyncRead.html\" title=\"trait tokio::io::async_read::AsyncRead\">AsyncRead</a> + <a class=\"trait\" href=\"tokio/io/async_write/trait.AsyncWrite.html\" title=\"trait tokio::io::async_write::AsyncWrite\">AsyncWrite</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/core/marker/trait.Unpin.html\" title=\"trait core::marker::Unpin\">Unpin</a>,&nbsp;</span>","synthetic":false,"types":["tokio_tungstenite::WebSocketStream"]}];
implementors["tokio_util"] = [{"text":"impl&lt;T, U&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_util/codec/struct.Framed.html\" title=\"struct tokio_util::codec::Framed\">Framed</a>&lt;T, U&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"tokio/io/async_read/trait.AsyncRead.html\" title=\"trait tokio::io::async_read::AsyncRead\">AsyncRead</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;U: <a class=\"trait\" href=\"tokio_util/codec/trait.Decoder.html\" title=\"trait tokio_util::codec::Decoder\">Decoder</a>,&nbsp;</span>","synthetic":false,"types":["tokio_util::codec::framed::Framed"]},{"text":"impl&lt;T, D&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_util/codec/struct.FramedRead.html\" title=\"struct tokio_util::codec::FramedRead\">FramedRead</a>&lt;T, D&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"tokio/io/async_read/trait.AsyncRead.html\" title=\"trait tokio::io::async_read::AsyncRead\">AsyncRead</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;D: <a class=\"trait\" href=\"tokio_util/codec/trait.Decoder.html\" title=\"trait tokio_util::codec::Decoder\">Decoder</a>,&nbsp;</span>","synthetic":false,"types":["tokio_util::codec::framed_read::FramedRead"]},{"text":"impl&lt;T, D&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_util/codec/struct.FramedWrite.html\" title=\"struct tokio_util::codec::FramedWrite\">FramedWrite</a>&lt;T, D&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a>,&nbsp;</span>","synthetic":false,"types":["tokio_util::codec::framed_write::FramedWrite"]},{"text":"impl&lt;R:&nbsp;<a class=\"trait\" href=\"tokio/io/async_read/trait.AsyncRead.html\" title=\"trait tokio::io::async_read::AsyncRead\">AsyncRead</a>&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_util/io/struct.ReaderStream.html\" title=\"struct tokio_util::io::ReaderStream\">ReaderStream</a>&lt;R&gt;","synthetic":false,"types":["tokio_util::io::reader_stream::ReaderStream"]},{"text":"impl <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"tokio_util/sync/struct.PollSemaphore.html\" title=\"struct tokio_util::sync::PollSemaphore\">PollSemaphore</a>","synthetic":false,"types":["tokio_util::sync::poll_semaphore::PollSemaphore"]},{"text":"impl&lt;L, R&gt; <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"enum\" href=\"tokio_util/either/enum.Either.html\" title=\"enum tokio_util::either::Either\">Either</a>&lt;L, R&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;L: <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;R: <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a>&lt;Item = L::<a class=\"type\" href=\"futures_core/stream/trait.Stream.html#associatedtype.Item\" title=\"type futures_core::stream::Stream::Item\">Item</a>&gt;,&nbsp;</span>","synthetic":false,"types":["tokio_util::either::Either"]}];
implementors["warp"] = [{"text":"impl <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"warp/filters/multipart/struct.FormData.html\" title=\"struct warp::filters::multipart::FormData\">FormData</a>","synthetic":false,"types":["warp::filters::multipart::FormData"]},{"text":"impl <a class=\"trait\" href=\"futures_core/stream/trait.Stream.html\" title=\"trait futures_core::stream::Stream\">Stream</a> for <a class=\"struct\" href=\"warp/filters/ws/struct.WebSocket.html\" title=\"struct warp::filters::ws::WebSocket\">WebSocket</a>","synthetic":false,"types":["warp::filters::ws::WebSocket"]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()