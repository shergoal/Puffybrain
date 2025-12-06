document.addEventListener("DOMContentLoaded", () => {
  const leftCards = document.querySelectorAll("table:first-of-type .card");
  const rightCards = document.querySelectorAll("table:last-of-type .card");

  let firstCard = null;
  let lock = false;

  function resetWrong(card1, card2) {
    setTimeout(() => {
      card1.classList.remove("selected", "wrong");
      card2.classList.remove("selected", "wrong");
      firstCard = null;
      lock = false;
    }, 700);
  }

  function markMatched(card1, card2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    card1.classList.remove("selected");
    card2.classList.remove("selected");
    firstCard = null;
    lock = false;

    // AUTOMATIC CHECK: are all cards matched?
    const totalCards = document.querySelectorAll(".card").length;
    const matchedCards = document.querySelectorAll(".card.matched").length;

    if (matchedCards === totalCards) {
        // All matched — calculate score
        const score = matchedCards / 2; // each pair has 2 cards
        localStorage.setItem("quizScore", score);

        // Optional small delay so user sees the last match
        setTimeout(() => {
            window.location.href = "your_score.html";
        }, 800);
    }
  }

  function handleCardClick(card, side) {
    if (lock || card.classList.contains("matched")) return;

    if (!firstCard) {
      firstCard = { element: card, side };
      card.classList.add("selected");
      return;
    }

    if (firstCard.side === side) return; // prevent same side selection

    const first = firstCard.element;
    card.classList.add("selected");

    if (first.dataset.match === card.dataset.match) {
      first.classList.add("correct");
      card.classList.add("correct");

      setTimeout(() => {
        first.classList.remove("correct");
        card.classList.remove("correct");
        markMatched(first, card);
      }, 500);

    } else {
      first.classList.add("wrong");
      card.classList.add("wrong");
      lock = true;
      resetWrong(first, card);
    }
  }

  leftCards.forEach(card => card.addEventListener("click", () => handleCardClick(card, "left")));
  rightCards.forEach(card => card.addEventListener("click", () => handleCardClick(card, "right")));
});
