(() => {
  const SESSION_KEY = "links_access_granted";
  const linksMarker = "/links/";
  const linksIndex = window.location.pathname.indexOf(linksMarker);
  const siteRootPath = linksIndex === -1 ? "/" : `${window.location.pathname.slice(0, linksIndex)}/`;
  const siteRootUrl = `${window.location.origin}${siteRootPath}`;
  const LOGIN_PAGE = `${siteRootUrl}index.html`;
  const PARTIALS_BASE = `${siteRootUrl}links/partials`;

  // Enforce gate on every protected page
  if (sessionStorage.getItem(SESSION_KEY) !== "1") {
    window.location.replace(LOGIN_PAGE);
    return;
  }

  async function inject(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return null;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);

    el.innerHTML = await res.text();
    return el;
  }

  inject("#pagetop", `${PARTIALS_BASE}/pagetop.html`)
    .then((el) => {
      if (!el) return;
      const homeLink = el.querySelector(".home-link");
      if (homeLink) homeLink.href = `${siteRootUrl}links/neverHub.html`;

      const logoutLink = el.querySelector('a[href="/index.html"]');
      if (logoutLink) logoutLink.href = `${siteRootUrl}index.html`;

      const onNeverHub = window.location.pathname.endsWith("/links/neverHub.html");
      if (onNeverHub && homeLink) homeLink.remove();
    })
    .catch(console.error);
  inject("#pagebottom", `${PARTIALS_BASE}/pagebottom.html`).catch(console.error);
})();
