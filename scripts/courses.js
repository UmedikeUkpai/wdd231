const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 1,
    certificate: 'Web and Computer Programming',
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    completed: false
  }
];

const courseCards = document.getElementById('courseCards');
const totalCredits = document.getElementById('totalCredits');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(list) {
  courseCards.innerHTML = '';

  list.forEach((course) => {
    const card = document.createElement('div');
    card.className = `course-card${course.completed ? ' completed' : ''}`;

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p class="course-meta">${course.title} &middot; ${course.credits} credits</p>
      <span class="status">${course.completed ? '&#10003; Completed' : 'Not yet taken'}</span>
    `;

    courseCards.appendChild(card);
  });

  const credits = list.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = `Total credits shown: ${credits}`;
}

function applyFilter(filter) {
  if (filter === 'all') {
    renderCourses(courses);
  } else {
    renderCourses(courses.filter((course) => course.subject.toLowerCase() === filter));
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    applyFilter(button.dataset.filter);
  });
});

renderCourses(courses);
