// AVDT — cookie consent banner (Google Consent Mode v2)
// Advertising and analytics cookies stay off until the visitor clicks "Accept".
(function () {
  var STORAGE_KEY = 'avdt_cookie_consent';
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  var GRANT_ALL = {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  };

  if (stored === 'granted' && typeof gtag === 'function') {
    gtag('consent', 'update', GRANT_ALL);
  }

  if (stored === 'granted' || stored === 'denied') return;

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<p>This site uses Google cookies to measure visits and the results of our Google Ads. No cookies are set until you accept. <a href="privacy.html#cookies">Privacy notice</a></p>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn btn-outline-dark" id="cookieDecline">Decline</button>' +
        '<button type="button" class="btn btn-primary" id="cookieAccept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (e) {}
      if (typeof gtag === 'function') {
        gtag('consent', 'update', GRANT_ALL);
      }
      banner.remove();
    });

    document.getElementById('cookieDecline').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch (e) {}
      banner.remove();
    });
  });
})();
