/* Elites AI Academy — landing page: language toggle + sticky CTA.
   English | دری — switches the whole page, RTL in Dari mode. */

var STRINGS = {
  en: {
    title: "Elites AI Academy — From AI Chat to Mastery",
    login: "Student Login",
    headline: "From AI Chat to Mastery",
    subhead: "72 short video lessons for complete beginners — no tech skills needed, in English and Dari.",
    cta: "Start Learning Today",
    heroProof: "5 levels · Watch on any phone · Cancel anytime",
    visualAlt: "Elites AI Academy course cards",
    proofStrip: "72 lessons · 5 levels · English + Dari · Made for beginners",
    pathHeading: "Your path: 5 levels",
    l1badge: "Level 1", l1title: "Foundations & Getting Started",
    l2badge: "Level 2", l2title: "Effective Prompting & Smart Communication",
    l3badge: "Level 3", l3title: "Everyday Life & Workplace Productivity",
    l4badge: "Level 4", l4title: "AI Safety, Fact-Checking & Scam Defense",
    l5badge: "Level 5", l5title: "Modern Frontier Tools, Multimedia & Agents",
    count12: "12 lessons",
    count18: "18 lessons",
    how1: "Watch on your phone",
    how2: "English or Dari",
    how3: "Learn at your own pace",
    joinHeading: "Join Elites AI Academy",
    price: "$19.99/month",
    inc1: "All 72 lessons",
    inc2: "Both languages — English and Dari",
    inc3: "New lessons as they come",
    inc4: "Watch on phone, tablet, and computer",
    secureLine: "Cancel anytime · Secure payment",
    faqHeading: "Common questions",
    q1: "Do I need experience?",
    a1: "No — the course starts from zero.",
    q2: "Is it in Dari?",
    a2: "Yes — every lesson is in English and Dari.",
    q3: "How long are the lessons?",
    a3: "About 10 minutes each.",
    q4: "Can I cancel anytime?",
    a4: "Yes — cancel in a few taps, and you keep access until the end of the month.",
    finalPrice: "$19.99/month · Cancel anytime",
    help: "Need help?",
    privacy: "Privacy",
    terms: "Terms"
  },
  fa: {
    title: "اکادمی هوش مصنوعی نخبگان — از گفت‌وگو تا استادی",
    login: "ورود شاگردان",
    headline: "از گفت‌وگو با هوش مصنوعی تا استادی",
    subhead: "۷۲ درس ویدیویی کوتاه برای مبتدی‌ها — بدون نیاز به مهارت فنی، به انگلیسی و دری.",
    cta: "همین امروز شروع کنید",
    heroProof: "۵ سطح · در هر تلیفون ببینید · هر وقت خواستید لغو کنید",
    visualAlt: "کارت‌های کورس اکادمی هوش مصنوعی نخبگان",
    proofStrip: "۷۲ درس · ۵ سطح · انگلیسی + دری · برای مبتدی‌ها",
    pathHeading: "مسیر شما: ۵ سطح",
    l1badge: "سطح ۱", l1title: "اساس‌ها و شروع کار",
    l2badge: "سطح ۲", l2title: "پرسیدن درست و ارتباط هوشمند",
    l3badge: "سطح ۳", l3title: "زندگی روزمره و کار",
    l4badge: "سطح ۴", l4title: "امنیت و محافظت در برابر کلاهبرداری",
    l5badge: "سطح ۵", l5title: "ابزارهای جدید و دستیارهای هوشمند",
    count12: "۱۲ درس",
    count18: "۱۸ درس",
    how1: "در تلیفون‌تان ببینید",
    how2: "انگلیسی یا دری",
    how3: "با سرعت خودتان یاد بگیرید",
    joinHeading: "به اکادمی هوش مصنوعی نخبگان بپیوندید",
    price: "19.99 دالر در ماه",
    inc1: "هر ۷۲ درس",
    inc2: "به هر دو زبان — انگلیسی و دری",
    inc3: "درس‌های جدید، وقتی آماده شوند",
    inc4: "در تلیفون، تابلت و کمپیوتر ببینید",
    secureLine: "هر وقت خواستید لغو کنید · پرداخت امن",
    faqHeading: "سوال‌های معمول",
    q1: "آیا به تجربه نیاز دارم؟",
    a1: "نه — کورس از صفر شروع می‌شود.",
    q2: "آیا به دری هم است؟",
    a2: "بله — هر درس به انگلیسی و دری است.",
    q3: "هر درس چقدر وقت می‌گیرد؟",
    a3: "هر درس حدود ۱۰ دقیقه است.",
    q4: "آیا هر وقت خواستم لغو می‌توانم؟",
    a4: "بله — با چند لمس لغو کنید و تا پایان ماه دسترسی‌تان باقی می‌ماند.",
    finalPrice: "19.99 دالر در ماه · هر وقت خواستید لغو کنید",
    help: "کمک می‌خواهید؟",
    privacy: "حریم خصوصی",
    terms: "شرایط استفاده"
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
  var visual = document.getElementById("hero-visual");
  if (visual) visual.alt = dict.visualAlt;
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-fa").classList.toggle("active", lang === "fa");
  try { localStorage.setItem("eaa_lang", lang); } catch (e) {}
}

document.getElementById("lang-en").addEventListener("click", function () { setLang("en"); });
document.getElementById("lang-fa").addEventListener("click", function () { setLang("fa"); });

var saved = "en";
try { saved = localStorage.getItem("eaa_lang") || "en"; } catch (e) {}
if (saved === "fa") setLang("fa");

/* Sticky bottom CTA on phones: appears after the hero */
var sticky = document.getElementById("sticky-cta");
function onScroll() {
  if (sticky) sticky.classList.toggle("show", window.scrollY > 430);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
