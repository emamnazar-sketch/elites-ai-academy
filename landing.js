/* Elites AI Academy — landing page language toggle.
   English | دری — switches the whole page, RTL in Dari mode. */

var STRINGS = {
  en: {
    title: "Elites AI Academy — From AI Chat to Mastery",
    login: "Student Login",
    headline: "From AI Chat to Mastery",
    subline: "Step-by-step video lessons for everyday people. No tech background needed.",
    start: "Start Learning",
    l1badge: "Level 1", l1h1: "START", l1h2: "HERE",
    l1title: "Foundations & Getting Started",
    l1desc: "Begin your journey — what AI is and your first chat",
    l2badge: "Level 2", l2h1: "ASK IT", l2h2: "RIGHT",
    l2title: "Effective Prompting & Smart Communication",
    l2desc: "Learn to ask so AI gives you answers you can use",
    l3badge: "Level 3", l3h1: "AI EVERY", l3h2: "DAY",
    l3title: "Everyday Life & Workplace Productivity",
    l3desc: "Use AI for home, family, and work tasks",
    l4badge: "Level 4", l4h1: "STAY", l4h2: "SAFE",
    l4title: "AI Safety, Fact-Checking & Scam Defense",
    l4desc: "Spot fakes, scams, and wrong answers before they hurt you",
    l5badge: "Level 5", l5h1: "NEWEST", l5h2: "TOOLS",
    l5title: "Modern Frontier Tools, Multimedia & Agents",
    l5desc: "Pictures, voice, custom helpers, and AI agents",
    joinHeading: "Join Elites AI Academy",
    price: "$19.99/month",
    cancel: "Cancel anytime",
    create: "Create Your Account",
    help: "Need help?"
  },
  fa: {
    title: "اکادمی هوش مصنوعی نخبگان — یادگیری به زبان ساده",
    login: "ورود شاگردان",
    headline: "از گفت‌وگو با هوش مصنوعی تا استادی",
    subline: "درس‌های ویدیویی قدم به قدم برای مردم عادی. هیچ دانش فنی لازم نیست.",
    start: "شروع یادگیری",
    l1badge: "سطح ۱", l1h1: "از اینجا", l1h2: "شروع کنید",
    l1title: "اساس‌ها و شروع کار",
    l1desc: "سفر خود را شروع کنید — هوش مصنوعی چیست و اولین گفتگوی شما",
    l2badge: "سطح ۲", l2h1: "درست", l2h2: "بپرسید",
    l2title: "پرسیدن درست و ارتباط هوشمند",
    l2desc: "یاد بگیرید چطور بپرسید تا جواب‌های مفید بگیرید",
    l3badge: "سطح ۳", l3h1: "هوش مصنوعی", l3h2: "هر روز",
    l3title: "زندگی روزمره و کار",
    l3desc: "از هوش مصنوعی برای کارهای خانه، خانواده و کار استفاده کنید",
    l4badge: "سطح ۴", l4h1: "امن", l4h2: "بمانید",
    l4title: "امنیت و محافظت در برابر کلاهبرداری",
    l4desc: "جعلی‌ها، کلاهبرداری‌ها و جواب‌های غلط را پیش از آسیب بشناسید",
    l5badge: "سطح ۵", l5h1: "ابزارهای", l5h2: "جدید",
    l5title: "ابزارهای جدید و دستیارهای هوشمند",
    l5desc: "عکس‌ها، صدا، دستیارهای شخصی و نماینده‌های هوش مصنوعی",
    joinHeading: "به اکادمی هوش مصنوعی نخبگان بپیوندید",
    price: "19.99 دالر در ماه",
    cancel: "هر وقت خواستید لغو کنید",
    create: "حساب خود را بسازید",
    help: "کمک می‌خواهید؟"
  }
};

function setLang(lang) {
  var dict = STRINGS[lang];
  if (!dict) return;
  document.documentElement.lang = lang === "fa" ? "fa" : "en";
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.title = dict.title;
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-fa").classList.toggle("active", lang === "fa");
  try { localStorage.setItem("eaa_lang", lang); } catch (e) {}
}

document.getElementById("lang-en").addEventListener("click", function () { setLang("en"); });
document.getElementById("lang-fa").addEventListener("click", function () { setLang("fa"); });

var saved = "en";
try { saved = localStorage.getItem("eaa_lang") || "en"; } catch (e) {}
if (saved === "fa") setLang("fa");
