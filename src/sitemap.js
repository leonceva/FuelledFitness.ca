const sitemap = require("sitemap");
const fs = require("fs");
const hostname = "https://fuelledfitness.ca";

const urls = [
    { url: "/", changefreq: "weekly", priority: "1" },
    { url: "/about", changefreq: "weekly", priority: "0.5" },
    { url: "/services", changefreq: "weekly", priority: "0.7" },
    { url: "contact", changefreq: "monthly", priority: "0.7" },
    { url: "/athletes", changefreq: "weekly", priority: "0.3" },
    { url: "/my-account", changefreq: "weekly", priority: "0.5" }
];

const sitemapInstance = sitemap.createSitemap({
    hostname,
    urls
});

// Write sitemap to public directory
fs.writeFileSync("../public/sitemap.xml", sitemapInstance.toString());