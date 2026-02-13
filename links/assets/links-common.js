// links/assets/links-common.js
(() => {
  const SESSION_KEY = "links_access_granted";
  const LOGIN_PAGE = "index.html";

  // Enforce gate on every protected page
  if (sessionStorage.getItem(SESSION_KEY) !== "1") {
    window.location.replace(LOGIN_PAGE);
    return;
  }

  async function inject(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);

    el.innerHTML = await res.text();
  }

  inject("#pagetop", "./partials/pagetop.html").catch(console.error);
  inject("#pagebottom", "./partials/pagebottom.html").catch(console.error);
})();
