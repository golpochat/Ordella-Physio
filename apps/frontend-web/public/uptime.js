(function () {
  var INTERVAL_MS = 300000;

  function pingHealth() {
    fetch("/api/health", { method: "GET", cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Health check failed with status " + response.status);
        }
      })
      .catch(function () {
        if (window.gtag) {
          window.gtag("event", "uptime_failure");
        }
      });
  }

  pingHealth();
  window.setInterval(pingHealth, INTERVAL_MS);
})();
