(() => {
  const banner = document.getElementById("cookie-banner");
  const settingsButton = document.getElementById("cookie-settings");
  console.log(banner);

  if (!banner) return;

  function showBanner() {
  banner.classList.add("active");
  console.log("Banner shown");
 }

  function hideBanner() {
    banner.classList.remove("active");
    console.log("Banner hidden");
  }

  function enableOptionalCookies(consent) {
    if (consent.analytics) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=GA-ID";
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "GA-ID", { anonymize_ip: true });
    }

    if (consent.marketing) {
      console.log("Loading marketing cookies...");
    }
  }

  function saveConsent(consent) {
    consent.timestamp = Date.now();
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    hideBanner();
    if (consent.analytics || consent.marketing) {
      enableOptionalCookies(consent);
    }
  }

  function applyConsent() {
    try {
      const stored = localStorage.getItem("cookieConsent");
      if (!stored) {
        showBanner();
        return;
      }

      const consent = JSON.parse(stored);

      // Expiry check (30 days)
      if (consent.timestamp && (Date.now() - consent.timestamp > 30 * 24 * 60 * 60 * 1000)) {
        localStorage.removeItem("cookieConsent");
        showBanner();
        return;
      }

      if (consent.analytics || consent.marketing) {
        enableOptionalCookies(consent);
      }
      hideBanner();
    } catch (err) {
      console.error("Error reading consent:", err);
      showBanner();
    }
  }

  // Event listeners
  banner.querySelector(".accept").addEventListener("click", () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, ccpa: true });
  });

  banner.querySelector(".reject").addEventListener("click", () => {
    saveConsent({ necessary: true, analytics: false, marketing: false, ccpa: true });
  });

  banner.querySelector(".manage").addEventListener("click", () => {
    banner.querySelector(".checkboxes").style.display = "block";
  });

  document.getElementById("save-preferences").addEventListener("click", () => {
    saveConsent({
      necessary: true,
      analytics: document.getElementById("analytics-checkbox").checked,
      marketing: document.getElementById("marketing-checkbox").checked,
      ccpa: document.getElementById("ccpa-checkbox").checked,
    });
  });

  if (settingsButton) {
    settingsButton.addEventListener("click", () => {
      localStorage.removeItem("cookieConsent");
      showBanner();
    });
  }

  // Run on load
  applyConsent();
})();
