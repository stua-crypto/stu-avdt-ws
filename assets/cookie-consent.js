// AVDT — cookie consent banner (Google Consent Mode v2)
// Analytics cookies stay off until the visitor clicks "Accept".
(function () {
  var STORAGE_KEY = 'avdt_cookie_consent';
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  if (stored === 'granted' && typeof gtag === 'function') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }

  if (stored === 'granted' || stored === 'denied') return;

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<p>This site uses Google Analytics to understand visitor traffic. No analytics cookies are set until you accept.</p>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn btn-outline-dark" id="cookieDecline">Decline</button>' +
        '<button type="button" class="btn btn-primary" id="cookieAccept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (e) {}
      if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      banner.remove();
    });

    document.getElementById('cookieDecline').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch (e) {}
      banner.remove();
    });
  });
})();
