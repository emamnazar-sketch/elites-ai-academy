/* Elites AI Academy — legal pages (privacy, terms): language toggle.
   English | دری — switches the whole page, RTL in Dari mode.
   Same pattern and same saved choice (eaa_lang) as the landing page.
   Each legal page defines window.LEGAL_STRINGS = { en: {...}, fa: {...} }. */

function setLang(lang) {
  var dict = (window.LEGAL_STRINGS || {})[lang];
  if (!dict) return;
  document.documentElement.lang = lang === "fa" ? "fa" : "en";
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  if (dict.title) document.title = dict.title;
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  var enBtn = document.getElementById("lang-en");
  var faBtn = document.getElementById("lang-fa");
  if (enBtn) enBtn.classList.toggle("active", lang === "en");
  if (faBtn) faBtn.classList.toggle("active", lang === "fa");
  try { localStorage.setItem("eaa_lang", lang); } catch (e) {}
}

var enToggle = document.getElementById("lang-en");
var faToggle = document.getElementById("lang-fa");
if (enToggle) enToggle.addEventListener("click", function () { setLang("en"); });
if (faToggle) faToggle.addEventListener("click", function () { setLang("fa"); });

var savedLang = "en";
try { savedLang = localStorage.getItem("eaa_lang") || "en"; } catch (e) {}
if (savedLang === "fa") setLang("fa");
