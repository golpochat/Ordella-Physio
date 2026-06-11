(function (c, l, a, r, i, t, y) {
  var projectId = c.__ORDELLA_CLARITY_ID__;
  if (!projectId) {
    return;
  }

  c[a] =
    c[a] ||
    function () {
      (c[a].q = c[a].q || []).push(arguments);
    };

  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + projectId;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script");
