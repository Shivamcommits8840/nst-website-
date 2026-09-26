(() => {
  const page = document.body.dataset.page || "home";
  const base = (window.NST_SITE_URL || "").trim().replace(/\/+$/, "");
  const routes = {
    home: "", about: "about.html", academics: "academics.html",
    campus: "campus.html", activities: "activities.html",
    achievements: "achievements.html", gallery: "gallery.html", contact: "contact.html",
  };
  const description = document.querySelector('meta[name="description"]')?.content || "";
  const setMeta = (key, value, property = "property") => {
    if (!value) return;
    let tag = document.head.querySelector(`meta[${property}="${key}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(property, key);
      document.head.append(tag);
    }
    tag.content = value;
  };

  let pageUrl = "";
  let imageUrl = document.querySelector('meta[property="og:image"]')?.content || "";
  if (base) {
    try {
      const origin = new URL(`${base}/`);
      pageUrl = new URL(routes[page] || "", origin).href;
      imageUrl = new URL("assets/nst-campus-og.jpg", origin).href;
      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = pageUrl;
      setMeta("og:url", pageUrl);
    } catch {
      // Leave canonical and absolute social URLs unset until a valid site URL is configured.
    }
  }
  setMeta("og:title", document.title);
  setMeta("og:description", description);
  setMeta("og:image", imageUrl);
  setMeta("twitter:title", document.title, "name");
  setMeta("twitter:description", description, "name");
  setMeta("twitter:image", imageUrl, "name");

  const school = {
    "@type": "School",
    name: "NST Group of Education Jalaun",
    alternateName: "NST Group of Education",
    description: "NST Group of Education in Jalaun, Uttar Pradesh, offering classes from Nursery through Class 10, with the LEAD curriculum from Nursery through Class 8.",
    telephone: "+91 831 865 0805",
    email: "singhtomarjasvant@gmail.com",
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Churkhibal, Bhawaniram",
      addressLocality: "Jalaun",
      addressRegion: "Uttar Pradesh",
      postalCode: "285123",
      addressCountry: "IN",
    },
    sameAs: ["https://www.facebook.com/profile.php?id=100057534667428"],
  };
  const website = { "@type": "WebSite", name: "NST Group of Education Jalaun", inLanguage: "en-IN" };
  const webPage = {
    "@type": "WebPage",
    name: document.title,
    description,
    inLanguage: "en-IN",
    about: { "@type": "School", name: "NST Group of Education Jalaun" },
  };
  if (base && pageUrl) {
    school["@id"] = `${base}/#school`;
    school.url = base;
    school.image = imageUrl;
    website["@id"] = `${base}/#website`;
    website.url = base;
    website.publisher = { "@id": school["@id"] };
    webPage["@id"] = pageUrl;
    webPage.url = pageUrl;
    webPage.isPartOf = { "@id": website["@id"] };
    webPage.about = { "@id": school["@id"] };
  }
  const structuredData = document.createElement("script");
  structuredData.type = "application/ld+json";
  structuredData.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": [school, website, webPage] });
  document.head.append(structuredData);
})();
