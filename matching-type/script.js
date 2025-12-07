/* ==========================================================
   MATCHING LOGIC
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.slide:first-child .card'); 
    // Only Slide 1 is clickable
    let selectedCard = null;

    /* ==========================================================
       WRONG FOR SLIDE 2
       ========================================================== */
    const previousWrong = localStorage.getItem("previousWrong");
    if (previousWrong) {
        const [a, b] = previousWrong.split("-");

        // Only target Slide 2 cards
        const slide2Cards = document.querySelectorAll(".slide:nth-child(2) .card, .slide:nth-child(2) .wrong-previous");

        slide2Cards.forEach(c => {
            if (c.dataset.match === a) {
                c.classList.add("wrong-previous");
            }
        });
    }

    /* ==========================================================
       CORRECT FOR SLIDE 3
       ========================================================== */
    const previousCorrect = localStorage.getItem("previousCorrect");
    if (previousCorrect) {

        // Only target Slide 3 cards
        const slide3Cards = document.querySelectorAll(".slide:nth-child(3) .card, .slide:nth-child(3) .matched");

        slide3Cards.forEach(c => {
            if (c.dataset.match === previousCorrect) {
                c.classList.add("matched");
            }
        });
    }

    /* ==========================================================
       MATCHING LOGIC (Slide 1 only)
       ========================================================== */
    const handleCardClick = (event) => {
        const clickedCard = event.currentTarget;

        if (clickedCard.classList.contains('matched') || clickedCard.classList.contains('wrong-previous')) {
            return;
        }

        if (!selectedCard) {
            clickedCard.closest('.column').querySelectorAll('.card.selected')
                .forEach(c => c.classList.remove('selected'));

            clickedCard.classList.add('selected');
            selectedCard = clickedCard;

        } else {
            if (
                clickedCard === selectedCard ||
                clickedCard.closest('.column') === selectedCard.closest('.column')
            ) {
                selectedCard.classList.remove('selected');
                clickedCard.classList.add('selected');
                selectedCard = clickedCard;
                return;
            }

            const isMatch = clickedCard.dataset.match === selectedCard.dataset.match;

            if (isMatch) {
                clickedCard.classList.remove('selected');
                selectedCard.classList.remove('selected');
                clickedCard.classList.add('matched');
                selectedCard.classList.add('matched');

                // Save correct for slide 3
                localStorage.setItem("previousCorrect", selectedCard.dataset.match);

            } else {
                clickedCard.classList.add('selected');

                // Save wrong for slide 2
                localStorage.setItem("previousWrong",
                    selectedCard.dataset.match + "-" + clickedCard.dataset.match
                );

                setTimeout(() => {
                    clickedCard.classList.remove('selected');
                    selectedCard.classList.remove('selected');
                    selectedCard = null;
                }, 700);
            }

            if (isMatch) selectedCard = null;
        }
    };

    cards.forEach(card => card.addEventListener('click', handleCardClick));
});


/* ==========================================================
   SLIDESHOW
   ========================================================== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}, 2500);

/* ==========================================================
   START BUTTON
   ========================================================== */
document.querySelector(".start-button").addEventListener("click", () => {
    window.location.href = "application dep.html";
});
