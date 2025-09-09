document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const settingsButton = document.getElementById("cookie-settings");

  function showBanner() {
    banner.style.display = "block";
  }

  Object.assign(banner.style, { position: "fixed", bottom: "0", left: "0", right: "0", background: "#fff", borderTop: "1px solid #ccc", padding: "12px", textAlign: "center", zIndex: "2" });
  console.log(banner);

  function applyConsent() {
    try {
      const consentData = localStorage.getItem("cookieConsent");
      if (consentData) {
        const consent = JSON.parse(consentData);

        // Check if consent is older than 12 months → renew
        if (consent.timestamp && (Date.now() - consent.timestamp > 30 * 24 * 60 * 60 * 1000)) {
          localStorage.removeItem("cookieConsent");
          showBanner();
          return;
        }

        if (consent.analytics || consent.marketing) {
          enableOptionalCookies(consent);
        }
        banner.style.display = "none";
      } else {
        showBanner();
      }
    } catch (error) {
      console.error("Error parsing cookie consent:", error);
      showBanner(); // fallback
    }
  }

  // Save consent
  function saveConsent(consent) {
    consent.timestamp = Date.now(); // Add timestamp
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    banner.style.display = "none";

    if (consent.analytics || consent.marketing) {
      enableOptionalCookies(consent);
    }
  }

  // Load optional scripts
  function enableOptionalCookies(consent) {
    if (consent.analytics) {
      // Google Analytics example
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=GA-ID";
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'GA-ID', { anonymize_ip: true }); // GDPR-friendly
    }

    if (consent.marketing) {
      // Example: Marketing script placeholder
      console.log("Loading marketing cookies...");
      // const marketingScript = document.createElement("script");
      // marketingScript.src = "https://example.com/marketing.js";
      // document.head.appendChild(marketingScript);
    }
  }

  // Check localStorage availability
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    applyConsent();
  } catch (error) {
    console.warn("localStorage unavailable. Banner will always show.");
    showBanner();
  }

  // Button actions
  banner.querySelector(".accept").addEventListener("click", () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  });

  banner.querySelector(".reject").addEventListener("click", () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  });

  banner.querySelector(".manage").addEventListener("click", () => {
    banner.querySelector(".checkboxes").style.display = "block";
  });

  document.getElementById("save-preferences").addEventListener("click", () => {
    const analyticsCheckbox = document.getElementById("analytics-checkbox");
    const marketingCheckbox = document.getElementById("marketing-checkbox");

    saveConsent({
      necessary: true,
      analytics: analyticsCheckbox.checked,
      marketing: marketingCheckbox.checked
    });
  });

  // Reopen banner (revocation)
  if (settingsButton) {
    settingsButton.style.display = "inline-block"; // make visible
    settingsButton.addEventListener("click", () => {
      localStorage.removeItem("cookieConsent");
      showBanner();
    });
  }
});
