// simple interactivity: animated counters, search filter, menu active toggle

document.addEventListener('DOMContentLoaded', () => {
  // animated counters
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = parseInt(el.dataset.count || 0, 10);
    animateCount(el, target, 1100);
  });

  // sidebar menu click highlight (works even if they are <a>)
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // search: filters both lists (users and quizzes) by any text in list items
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    filterList('quizList', q);
    filterList('userList', q);
  });

  // show all links just scroll to end (small helper)
  document.querySelectorAll('.show-all').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      // basic toast
      showToast('Showing all (demo) — implement server logic to load more.');
    });
  });
});

/* --- helpers --- */
function animateCount(el, target, duration=1000) {
  const start = 0;
  const range = target - start;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(start + (range * easeOutCubic(progress)));
    el.textContent = numberWithCommas(value);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function filterList(listId, query){
  const list = document.getElementById(listId);
  if(!list) return;
  const items = Array.from(list.children);
  items.forEach(li => {
    const text = li.innerText.toLowerCase();
    if (!query) {
      li.style.display = '';
    } else {
      li.style.display = text.includes(query) ? '' : 'none';
    }
  });
}

// tiny toast
function showToast(msg, time=1800){
  let t = document.getElementById('toastBox');
  if(!t){
    t = document.createElement('div');
    t.id = 'toastBox';
    Object.assign(t.style, {
      position:'fixed',right:'18px',bottom:'18px',background:'#111',color:'#fff',padding:'10px 14px',
      borderRadius:'10px',boxShadow:'0 8px 20px rgba(0,0,0,0.15)',zIndex:9999,fontWeight:700
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._h);
  t._h = setTimeout(()=> t.style.opacity = '0', time);
}
