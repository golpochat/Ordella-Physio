(function () {
  var pixelId = window.__ORDELLA_META_PIXEL_ID__;
  if (!pixelId || window.fbq) {
    return;
  }

  var f = window;
  var b = document;
  var e = "script";
  var v = "https://connect.facebook.net/en_US/fbevents.js";

  var n = (f.fbq = function () {
    if (n.callMethod) {
      n.callMethod.apply(n, arguments);
    } else {
      n.queue.push(arguments);
    }
  });

  if (!f._fbq) {
    f._fbq = n;
  }

  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  var t = b.createElement(e);
  t.async = true;
  t.src = v;

  var s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
})();
