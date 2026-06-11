(function () {
  var partnerId = window.__ORDELLA_LINKEDIN_PARTNER_ID__;
  if (!partnerId) {
    return;
  }

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(partnerId);

  var firstScript = document.getElementsByTagName("script")[0];
  var insightScript = document.createElement("script");
  insightScript.type = "text/javascript";
  insightScript.async = true;
  insightScript.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  firstScript.parentNode.insertBefore(insightScript, firstScript);
})();
