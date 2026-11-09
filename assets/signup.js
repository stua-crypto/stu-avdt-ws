(function () {
  var forms = document.querySelectorAll('.signup-form');
  var loaded = Date.now();
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.signup-status');
      var button = form.querySelector('button[type="submit"]');
      var email = form.querySelector('[name="email"]').value.trim();
      var name = form.querySelector('[name="name"]').value.trim();
      var consent = form.querySelector('[name="consent"]').checked;
      var trap = form.querySelector('[name="website"]').value;

      function show(msg, ok, withPdf) {
        status.textContent = msg;
        if (withPdf) {
          var link = document.createElement('a');
          link.href = 'assets/downloads/driver-training-syllabus.pdf';
          link.textContent = 'Download your printable syllabus (PDF)';
          link.setAttribute('download', '');
          status.appendChild(document.createElement('br'));
          status.appendChild(link);
        }
        status.className = 'signup-status visible' + (ok ? ' ok' : '');
      }

      // Spam trap: bots fill the hidden field or submit within seconds of page load. Pretend it worked, send nothing.
      if (trap || Date.now() - loaded < 3000) { show('Thanks, you\'re signed up.', true, true); return; }
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { show('Please enter a valid email address.', false); return; }
      if (!consent) { show('Please tick the box so I know you\'re happy to hear from me.', false); return; }

      button.disabled = true;
      button.textContent = 'Signing up…';

      fetch('https://formspree.io/f/moevogyd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Email sign-up — driver training tips',
          name: name,
          email: email,
          consent: 'Ticked: happy to receive occasional emails from AVDT',
          source_page: window.location.pathname
        })
      }).then(function (res) {
        if (!res.ok) throw new Error('Send failed');
        if (window.gtag) gtag('event', 'email_signup', { page: window.location.pathname });
        form.reset();
        button.textContent = 'Signed up';
        show('Thanks, you\'re signed up. I\'ll only email occasionally, and every email has an easy way to opt out.', true, true);
      }).catch(function () {
        button.disabled = false;
        button.textContent = 'Sign me up';
        show('Sorry, that didn\'t send. Please try again, or email info@avdt.co.uk and I\'ll add you.', false);
      });
    });
  });
})();
