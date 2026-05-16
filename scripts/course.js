/* course.js — Web Certificate Courses filter widget
   Renders the #courseSection HTML, handles All/CSE/WDD filtering,
   and displays the running credit total.
   NOTE: loaded with `defer`, so the DOM is ready when this runs.
*/
(function () {
  "use strict";

  /* ── Course data ─────────────────────────────────────── */
  const courses = [
    { code: "CSE 110", name: "Intro to Programming",       credits: 2, type: "CSE" },
    { code: "WDD 130", name: "Web Fundamentals",           credits: 2, type: "WDD" },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE" },
    { code: "CSE 210", name: "Programming with Classes",   credits: 2, type: "CSE" },
    { code: "WDD 131", name: "Dynamic Web Fundamentals",   credits: 2, type: "WDD" },
    { code: "WDD 231", name: "Front-end Web Dev I",        credits: 2, type: "WDD" },
  ];

  /* ── Build the section HTML ──────────────────────────── */
  function buildSection() {
    const section = document.createElement("section");
    section.id = "courseSection";
    section.innerHTML = `
      <h2>Web Development Certificate Courses</h2>
      <div class="course-filters" role="group" aria-label="Filter courses">
        <button class="active" data-filter="All">All</button>
        <button data-filter="CSE">CSE</button>
        <button data-filter="WDD">WDD</button>
      </div>
      <div id="courseList" aria-live="polite"></div>
      <p id="creditTotal"></p>
    `;
    return section;
  }

  /* ── Render filtered course list ─────────────────────── */
  function renderCourses(filter, listEl, totalEl) {
    const filtered = filter === "All"
      ? courses
      : courses.filter((c) => c.type === filter);

    listEl.innerHTML = filtered
      .map((c) => `<div class="course-item">${c.code} – ${c.name}</div>`)
      .join("");

    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    totalEl.textContent = `The total credits for courses listed above is ${total}`;
  }

  /* ── Init ────────────────────────────────────────────── */
  function init() {
    const bottomGrid = document.querySelector(".bottom-grid");
    const container  = document.querySelector(".container");

    if (!container) { console.warn("course.js: .container not found"); return; }

    const section = buildSection();

    /* Insert before .bottom-grid if it exists, else append */
    if (bottomGrid && bottomGrid.parentNode === container) {
      container.insertBefore(section, bottomGrid);
    } else {
      container.appendChild(section);
    }

    const listEl  = section.querySelector("#courseList");
    const totalEl = section.querySelector("#creditTotal");
    const buttons = section.querySelectorAll(".course-filters button");

    renderCourses("All", listEl, totalEl);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderCourses(btn.dataset.filter, listEl, totalEl);
      });
    });
  }

  /* With `defer`, DOM is already ready — guard for edge cases */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
