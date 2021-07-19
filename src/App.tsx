import { useEffect, useRef } from "react";
import "./styles.css";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createSitemap() {
  var doc = document.implementation.createDocument("", "", null);

  //create the outer tag
  var urlset = doc.createElement("urlset");
  urlset.setAttribute("xmlns", " http://www.sitemaps.org/schemas/sitemap/0.9");

  var url = "";
  var changefreq = "";
  var loc = "";

  //first create static sites (note, that this is a selection)
  var staticSites = ["terms", "privacy", "", "about"];
  for (var i = 0; i < staticSites.length; i++) {
    url = doc.createElement("url");
    loc = doc.createElement("loc");
    loc.innerHTML = location.href + staticSites[i];
    changefreq = doc.createElement("changefreq");
    changefreq.innerHTML = "monthly";
    url.appendChild(loc);
    url.appendChild(changefreq);
    urlset.appendChild(url);
  }
  //dynamic :
  var dataFromDb = [makeid(10), makeid(10), makeid(10), makeid(10), makeid(10)];
  for (var i = 0; i < dataFromDb.length; i++) {
    url = doc.createElement("url");
    loc = doc.createElement("loc");
    loc.innerHTML = location.href + dataFromDb[i];
    changefreq = doc.createElement("changefreq");
    changefreq.innerHTML = "monthly";
    url.appendChild(loc);
    url.appendChild(changefreq);
    urlset.appendChild(url);
  }
  doc.appendChild(urlset);
  return doc;
}

export default function App() {
  const anchorSitemap = useRef();
  useEffect(() => {
    let doc = createSitemap();
    var oSerializer = new XMLSerializer();
    var xmltext = oSerializer.serializeToString(doc);
    xmltext = '<?xml version="1.0" encoding="UTF-8"?>' + xmltext;
    var filename = "sitemap.xml";
    var bb = new Blob([xmltext], { type: "text/plain" });
    anchorSitemap.current.setAttribute("href", window.URL.createObjectURL(bb));
    anchorSitemap.current.setAttribute("download", filename);
    anchorSitemap.current.dataset.downloadurl = [
      "text/plain",
      anchorSitemap.current.download,
      anchorSitemap.current.href
    ].join(":");
    anchorSitemap.current.draggable = true;
    anchorSitemap.current.classList.add("dragout");
  }, []);

  const getFile = () => {};
  return (
    <div className="App">
      <h1 className="quote">
        Creating a sitemap.xml is basic SEO 101 - and is needed even for
        dynamically added page urls
      </h1>
      <a ref={anchorSitemap}>Download sitemap.xml</a>
    </div>
  );
}
