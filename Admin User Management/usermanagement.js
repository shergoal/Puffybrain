// Sidebar active menu
const items = document.querySelectorAll(".menu-item");

items.forEach(item => {
  item.addEventListener("click", () => {
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Modal
const modal = document.getElementById("userModal");
const modalBody = modal.querySelector(".modal-body");
const closeBtn = modal.querySelector(".close");

// Open modal for any user
const viewBtns = document.querySelectorAll(".view-btn");

viewBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.parentElement;
    const cells = row.querySelectorAll("div");

    const username = cells[1].textContent;
    const decksMade = Math.floor(Math.random() * 20) + 1;
    const createdDate = new Date(+(new Date()) - Math.floor(Math.random()*31536000000));
    const formattedDate = `${createdDate.getMonth()+1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;

    modalBody.innerHTML = `
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Decks Made:</strong> ${decksMade} decks</p>
      <p><strong>Created Account:</strong> ${formattedDate}</p>
    `;

    modal.style.display = "block";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
