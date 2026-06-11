(function () {
  var dsn = window.__ORDELLA_SENTRY_DSN__;
  if (!dsn || window.__ORDELLA_SENTRY_INITIALIZED__) {
    return;
  }

  window.__ORDELLA_SENTRY_INITIALIZED__ = true;

  var script = document.createElement("script");
  script.src = "https://browser.sentry-cdn.com/8.47.0/bundle.min.js";
  script.crossOrigin = "anonymous";
  script.onload = function () {
    if (!window.Sentry) {
      return;
    }

    window.Sentry.init({
      dsn: dsn,
      tracesSampleRate: 0.1,
      environment: window.location.hostname === "localhost" ? "development" : "production",
    });
  };

  document.head.appendChild(script);
})();
