/* Elites AI Academy — student portal demo.
   Front-end only: no real accounts, nothing leaves this device. */

var LEVELS = [
  {
    n: 1,
    title: "Foundations & Getting Started",
    status: "completed",
    done: 12,
    modules: [
      { id: "1.1", title: "Demystifying Artificial Intelligence", lessons: [
        "What AI Really Is (and What It Isn't)",
        "Spotting Hidden AI in Your Everyday Life",
        "Meeting the \u201CBig Three\u201D AI Assistants",
        "AI in the News: Sorting Fact from Hype",
        "Practice Time: Spot the AI Around You",
        "Check What You Learned"
      ]},
      { id: "1.2", title: "Your First 10 Minutes with AI", lessons: [
        "Accessing AI Safely on Phone or Computer",
        "Communicating in Everyday Language",
        "The Iterative Chat Habit (Refining Your First Draft)",
        "Practice Time: Your First Three Chats",
        "When the Answer Sounds Wrong",
        "Check What You Learned"
      ]}
    ]
  },
  {
    n: 2,
    title: "Effective Prompting & Smart Communication",
    status: "in-progress",
    done: 6,
    modules: [
      { id: "2.1", title: "Structuring High-Quality Prompts", lessons: [
        "The Core 4-Part Prompting Formula",
        "Prompting Best Practices from Top AI Labs",
        "\u201CShow, Don't Just Tell\u201D (Using Examples & Step-by-Step Thinking)",
        "Fixing a Weak Prompt, Step by Step",
        "Practice Time: Build Your Own Prompts",
        "Check What You Learned"
      ]},
      { id: "2.2", title: "AI as a Thought Partner & Interactive Tutor", lessons: [
        "Letting AI Ask You Questions First",
        "Overcoming Sycophancy & Getting Honest Feedback",
        "Building a Personal AI Tutor or Language Coach",
        "Learning a New Topic with AI, Step by Step",
        "Practice Time: Set Up Your Own Tutor",
        "Check What You Learned"
      ]}
    ]
  },
  {
    n: 3,
    title: "Everyday Life & Workplace Productivity",
    status: "not-started",
    done: 0,
    modules: [
      { id: "3.1", title: "Everyday Personal Shortcuts", lessons: [
        "Meal Planning & Grocery Sorting",
        "Stress-Free Everyday Writing",
        "Managing Time & Energy Schedules",
        "Planning a Trip or a Family Event",
        "Practice Time: Your Week, Sorted",
        "Check What You Learned"
      ]},
      { id: "3.2", title: "Workplace & Career Superpowers", lessons: [
        "Working with Long Files & Reports",
        "Job Search Enhancement (Resumes, Cover Letters, & Interviews)",
        "Integrating AI into Office Apps (Microsoft Word & Google Workspace)",
        "Meetings and Notes Made Simple",
        "Practice Time: A Better Resume Draft",
        "Check What You Learned"
      ]}
    ]
  },
  {
    n: 4,
    title: "AI Safety, Fact-Checking & Scam Defense",
    status: "not-started",
    done: 0,
    modules: [
      { id: "4.1", title: "Checking When AI is Wrong (Catching Hallucinations)", lessons: [
        "Understanding AI Hallucinations",
        "Four Essential Fact-Checking Habits",
        "Checking Names, Dates, and Numbers",
        "Practice Time: Catch the Made-Up Answer",
        "When to Ask a Real Person Instead",
        "Check What You Learned"
      ]},
      { id: "4.2", title: "Personal Privacy & Data Protection", lessons: [
        "The \u201CPostcard Rule\u201D & Data Hygiene",
        "Privacy Controls & Temporary Chats",
        "What AI Companies Do with Your Chats",
        "Safe Sharing: What Is Okay to Paste",
        "Practice Time: Clean Up Your Settings",
        "Check What You Learned"
      ]},
      { id: "4.3", title: "Defending Against AI Scams & Deepfakes", lessons: [
        "Voice Cloning & Emergency Family Scams",
        "Establishing a Secret Family Code Word",
        "Detecting Modern Digital Scams (Phishing, Video, & Package Tricks)",
        "Fake Texts, Emails, and Ads",
        "Practice Time: Test Your Family Code Word",
        "Check What You Learned"
      ]}
    ]
  },
  {
    n: 5,
    title: "Modern Frontier Tools, Multimedia & Agents",
    status: "not-started",
    done: 0,
    modules: [
      { id: "5.1", title: "Multimedia & Real-Time Information", lessons: [
        "Vision Capabilities & 4-Part Image Prompting",
        "Live Web Search & Deep Research Modes",
        "Talking to AI with Your Voice",
        "Making Pictures with AI, Step by Step",
        "Practice Time: Read a Photo with AI",
        "Check What You Learned"
      ]},
      { id: "5.2", title: "Tailored Workspaces & Custom Assistants", lessons: [
        "Setting Custom Instructions & Executive Prompts",
        "Organizing Work with Projects & Custom GPTs/Gems",
        "Your Own Helper for Work or Home",
        "Keeping Your Files in One Place",
        "Practice Time: Build Your First Assistant",
        "Check What You Learned"
      ]},
      { id: "5.3", title: "Introduction to Agentic AI & Autonomous Tools", lessons: [
        "Prompt AI vs. Agentic AI (The Shift from Answering to Doing)",
        "Directing AI Agents Safely (Claude Code, Plugins, & Tool Integration)",
        "Watching an Agent Work, Step by Step",
        "Staying in Control: Approvals and Limits",
        "Practice Time: Give an Agent a Small Job",
        "Check What You Learned"
      ]}
    ]
  }
];

var STATUS_LABEL = {
  "completed": "Completed",
  "in-progress": "In Progress",
  "not-started": "Not Started"
};
var STATUS_ACTION = {
  "completed": "Review",
  "in-progress": "Continue",
  "not-started": "Start"
};

function lessonTotal(level) {
  return level.modules.reduce(function (sum, m) { return sum + m.lessons.length; }, 0);
}
function levelPercent(level) {
  var total = lessonTotal(level);
  return total ? Math.round((level.done / total) * 100) : 0;
}

var state = { tab: null, show: "all", sort: "az" };

function $(id) { return document.getElementById(id); }

/* ---------- view switching ---------- */

function showAuth(which) {
  $("view-login").hidden = which !== "login";
  $("view-signup").hidden = which !== "signup";
  $("view-app").hidden = true;
  window.scrollTo(0, 0);
}

function showApp(page) {
  $("view-login").hidden = true;
  $("view-signup").hidden = true;
  $("view-app").hidden = false;
  showPage(page || "training");
  window.scrollTo(0, 0);
}

function showPage(page) {
  ["training", "course", "progress", "profile", "inbox", "help"].forEach(function (p) {
    $("page-" + p).hidden = p !== page;
  });
  document.querySelectorAll(".menu-item[data-nav]").forEach(function (item) {
    item.classList.toggle("active", item.getAttribute("data-nav") === page);
  });
  window.scrollTo(0, 0);
}

/* ---------- login / signup ---------- */

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function startSession(name, email) {
  sessionStorage.setItem("eaa_in", "1");
  sessionStorage.setItem("eaa_email", email);
  if (name) sessionStorage.setItem("eaa_name", name);
  fillProfile();
  showApp("training");
}

function fillProfile() {
  var name = sessionStorage.getItem("eaa_name");
  var email = sessionStorage.getItem("eaa_email");
  $("profile-name").textContent = name || "Student";
  $("profile-email").textContent = email || "—";
}

$("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = $("login-email").value.trim();
  var pw = $("login-password").value;
  var err = $("login-error");
  if (!validEmail(email) || pw.length < 4) {
    err.textContent = "Please check your email and password. The password needs at least 4 characters.";
    err.hidden = false;
    return;
  }
  err.hidden = true;
  startSession(null, email);
});

$("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = $("signup-name").value.trim();
  var email = $("signup-email").value.trim();
  var pw = $("signup-password").value;
  var err = $("signup-error");
  if (!name || !validEmail(email) || pw.length < 4) {
    err.textContent = "Please fill in your name, a real email, and a password of at least 4 characters.";
    err.hidden = false;
    return;
  }
  err.hidden = true;
  startSession(name, email);
});

$("show-signup").addEventListener("click", function () { showAuth("signup"); });
$("show-login").addEventListener("click", function () { showAuth("login"); });
$("forgot-link").addEventListener("click", function () { $("forgot-note").hidden = false; });

document.querySelectorAll(".eye-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var input = $(btn.getAttribute("data-eye"));
    input.type = input.type === "password" ? "text" : "password";
    input.focus();
  });
});

$("logout-btn").addEventListener("click", function () {
  sessionStorage.removeItem("eaa_in");
  sessionStorage.removeItem("eaa_email");
  sessionStorage.removeItem("eaa_name");
  closeMenu();
  showAuth("login");
});

/* ---------- menu ---------- */

function openMenu() {
  $("side-menu").classList.add("open");
  $("menu-overlay").hidden = false;
}
function closeMenu() {
  $("side-menu").classList.remove("open");
  $("menu-overlay").hidden = true;
}
$("menu-btn").addEventListener("click", openMenu);
$("menu-close").addEventListener("click", closeMenu);
$("menu-overlay").addEventListener("click", closeMenu);

document.querySelectorAll(".menu-item[data-nav]").forEach(function (item) {
  item.addEventListener("click", function () {
    closeMenu();
    showPage(item.getAttribute("data-nav"));
  });
});

/* ---------- training cards ---------- */

function renderCounts() {
  var counts = { "not-started": 0, "in-progress": 0, "completed": 0 };
  LEVELS.forEach(function (l) { counts[l.status]++; });
  $("count-not-started").textContent = counts["not-started"];
  $("count-in-progress").textContent = counts["in-progress"];
  $("count-completed").textContent = counts["completed"];
}

function visibleLevels() {
  var list = LEVELS.filter(function (l) {
    if (state.show !== "all" && String(l.n) !== state.show) return false;
    if (state.tab && l.status !== state.tab) return false;
    return true;
  });
  if (state.sort === "az") list.sort(function (a, b) { return a.title.localeCompare(b.title); });
  if (state.sort === "za") list.sort(function (a, b) { return b.title.localeCompare(a.title); });
  if (state.sort === "level") list.sort(function (a, b) { return a.n - b.n; });
  return list;
}

function renderCards() {
  var wrap = $("cards");
  wrap.innerHTML = "";
  var list = visibleLevels();
  $("cards-empty").hidden = list.length > 0;
  list.forEach(function (level) {
    var total = lessonTotal(level);
    var hours = level.modules.length;
    var card = document.createElement("button");
    card.className = "card";
    var html =
      '<div class="card-art art-' + level.n + '">' +
        '<span class="level-num">' + level.n + '</span>' +
        '<span class="level-word">Level ' + level.n + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<p class="card-title">Level ' + level.n + ': ' + level.title + '</p>' +
        '<span class="status-badge status-' + level.status + '">' + STATUS_LABEL[level.status] + '</span>' +
        '<p class="card-meta">' + total + ' lessons · about ' + hours + (hours === 1 ? ' hour' : ' hours') + '</p>';
    if (level.status === "in-progress") {
      html +=
        '<div class="progress-track"><div class="progress-fill" style="width:' + levelPercent(level) + '%"></div></div>' +
        '<p class="progress-label">' + level.done + ' of ' + total + ' lessons done</p>';
    }
    if (level.status === "completed") {
      html += '<p class="progress-label">All ' + total + ' lessons done</p>';
    }
    html +=
      '</div>' +
      '<div class="card-foot"><span class="card-action">' + STATUS_ACTION[level.status] + '</span></div>';
    card.innerHTML = html;
    card.addEventListener("click", function () { openCourse(level.n); });
    wrap.appendChild(card);
  });
}

document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    var key = tab.getAttribute("data-tab");
    state.tab = state.tab === key ? null : key;
    document.querySelectorAll(".tab").forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-tab") === state.tab);
    });
    renderCards();
  });
});

$("filter-show").addEventListener("change", function () {
  state.show = this.value;
  renderCards();
});
$("filter-sort").addEventListener("change", function () {
  state.sort = this.value;
  renderCards();
});

/* ---------- course view ---------- */

function openCourse(n) {
  var level = LEVELS.filter(function (l) { return l.n === n; })[0];
  if (!level) return;
  var total = lessonTotal(level);
  var html =
    '<div class="course-head">' +
      '<span class="status-badge status-' + level.status + '">' + STATUS_LABEL[level.status] + '</span>' +
      '<h2>Level ' + level.n + ': ' + level.title + '</h2>' +
      '<p class="page-sub">' + total + ' lessons · about ' + level.modules.length + ' hours · ' + level.done + ' lessons done</p>' +
    '</div>';
  var seen = 0;
  level.modules.forEach(function (mod) {
    html +=
      '<div class="module-block">' +
        '<h3>Module ' + mod.id + ': ' + mod.title + '</h3>' +
        '<p class="module-meta">' + mod.lessons.length + ' lessons · about 1 hour</p>' +
        '<ul class="lesson-list">';
    mod.lessons.forEach(function (lesson) {
      seen++;
      var doneLesson = seen <= level.done;
      html +=
        '<li>' +
          '<span class="lesson-check' + (doneLesson ? ' done' : '') + '">' + (doneLesson ? '&#10003;' : '') + '</span>' +
          '<span>' + lesson + '</span>' +
          '<span class="lesson-min">about 10 min</span>' +
        '</li>';
    });
    html += '</ul></div>';
  });
  $("course-detail").innerHTML = html;
  showPage("course");
}

$("back-to-training").addEventListener("click", function () { showPage("training"); });

/* ---------- progress page ---------- */

function renderProgress() {
  var wrap = $("progress-list");
  var html = "";
  var totalAll = 0, doneAll = 0;
  LEVELS.forEach(function (level) {
    var total = lessonTotal(level);
    totalAll += total; doneAll += level.done;
    html +=
      '<div class="plain-card">' +
        '<div class="progress-row-head">' +
          '<h3>Level ' + level.n + ': ' + level.title + '</h3>' +
          '<span class="status-badge status-' + level.status + '">' + STATUS_LABEL[level.status] + '</span>' +
        '</div>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + levelPercent(level) + '%"></div></div>' +
        '<p class="progress-label">' + level.done + ' of ' + total + ' lessons done</p>' +
      '</div>';
  });
  var pct = totalAll ? Math.round((doneAll / totalAll) * 100) : 0;
  html =
    '<div class="plain-card">' +
      '<div class="progress-row-head"><h3>Whole course</h3></div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<p class="progress-label">' + doneAll + ' of ' + totalAll + ' lessons done</p>' +
    '</div>' + html;
  wrap.innerHTML = html;
}

/* ---------- start ---------- */

renderCounts();
renderCards();
renderProgress();

if (sessionStorage.getItem("eaa_in") === "1") {
  fillProfile();
  showApp("training");
} else {
  showAuth("login");
}
