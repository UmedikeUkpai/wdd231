/* members.js — renders ward member cards from inline data (no server needed) */
(function () {
  "use strict";

  /* ── Inline data (mirrors data/members.json exactly) ── */
  const wardMembers = [
    {
      family_name: "Umedike",
      date_moved_in: "2023-03-15",
      number_of_members: 4,
      visited_by_bishopric: true,
      members: [
        { name: "Godwin Umedike",    gender: "Male",   birthdate: "1988-07-22" },
        { name: "Adaeze Umedike",    gender: "Female", birthdate: "1990-11-05" },
        { name: "Chukwuemeka Umedike", gender: "Male", birthdate: "2015-02-18" },
        { name: "Chidinma Umedike",  gender: "Female", birthdate: "2018-09-30" }
      ]
    },
    {
      family_name: "Okafor",
      date_moved_in: "2023-08-01",
      number_of_members: 3,
      visited_by_bishopric: false,
      members: [
        { name: "Emeka Okafor",   gender: "Male",   birthdate: "1985-04-12" },
        { name: "Ngozi Okafor",   gender: "Female", birthdate: "1987-01-28" },
        { name: "Tobenna Okafor", gender: "Male",   birthdate: "2012-06-14" }
      ]
    },
    {
      family_name: "Eze",
      date_moved_in: "2024-01-20",
      number_of_members: 5,
      visited_by_bishopric: true,
      members: [
        { name: "Ikenna Eze",    gender: "Male",   birthdate: "1980-10-03" },
        { name: "Amaka Eze",     gender: "Female", birthdate: "1983-05-17" },
        { name: "Chisomaga Eze", gender: "Female", birthdate: "2008-03-25" },
        { name: "Obiora Eze",    gender: "Male",   birthdate: "2011-08-09" },
        { name: "Adanna Eze",    gender: "Female", birthdate: "2016-12-01" }
      ]
    },
    {
      family_name: "Nwachukwu",
      date_moved_in: "2024-06-10",
      number_of_members: 2,
      visited_by_bishopric: false,
      members: [
        { name: "Chidi Nwachukwu", gender: "Male",   birthdate: "1995-09-19" },
        { name: "Ify Nwachukwu",   gender: "Female", birthdate: "1997-03-07" }
      ]
    },
    {
      family_name: "Onwudiwe",
      date_moved_in: "2025-02-28",
      number_of_members: 6,
      visited_by_bishopric: true,
      members: [
        { name: "Bartholomew Onwudiwe", gender: "Male",   birthdate: "1978-06-30" },
        { name: "Chioma Onwudiwe",      gender: "Female", birthdate: "1981-02-14" },
        { name: "Nnamdi Onwudiwe",      gender: "Male",   birthdate: "2005-11-22" },
        { name: "Uchenna Onwudiwe",     gender: "Male",   birthdate: "2008-07-04" },
        { name: "Adaora Onwudiwe",      gender: "Female", birthdate: "2013-04-16" },
        { name: "Somtochukwu Onwudiwe", gender: "Male",   birthdate: "2019-10-08" }
      ]
    }
  ];

  /* ── Render family cards ─────────────────────────────── */
  function renderMembers(families) {
    const list = document.getElementById("wardList");
    if (!list) return;

    list.innerHTML = families.map((family) => `
      <div class="ward-card">
        <div class="ward-card__header">
          <span class="ward-family-name">${family.family_name} Family</span>
          <span class="ward-badge ${family.visited_by_bishopric ? "ward-badge--yes" : "ward-badge--no"}">
            ${family.visited_by_bishopric ? "✓ Visited" : "Not Visited"}
          </span>
        </div>
        <div class="ward-card__meta">
          <span>📅 Moved in: <strong>${formatDate(family.date_moved_in)}</strong></span>
          <span>👥 Members: <strong>${family.number_of_members}</strong></span>
        </div>
        <ul class="ward-member-list">
          ${family.members.map((m) => `
            <li class="ward-member">
              <span class="ward-member__icon">${m.gender === "Male" ? "👨" : "👩"}</span>
              <span class="ward-member__name">${m.name}</span>
              <span class="ward-member__dob">${formatDate(m.birthdate)}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
  }

  /* ── Format YYYY-MM-DD → "Jan 1, 2000" ──────────────── */
  function formatDate(dateStr) {
    const [y, m, d] = dateStr.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
  }

  /* ── Init ────────────────────────────────────────────── */
  function init() {
    renderMembers(wardMembers);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

