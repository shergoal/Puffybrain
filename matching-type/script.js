document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let selectedCard = null; // Stores the first selected card

    // Function to handle card click/selection
    const handleCardClick = (event) => {
        const clickedCard = event.currentTarget;

        // Ignore clicks on already matched cards
        if (clickedCard.classList.contains('matched')) {
            return;
        }

        // 1. If no card is currently selected: Select this card.
        if (!selectedCard) {
            // Remove 'selected' from any card in the same column (if applicable)
            clickedCard.closest('.column').querySelectorAll('.card.selected').forEach(c => {
                c.classList.remove('selected');
            });
            
            clickedCard.classList.add('selected');
            selectedCard = clickedCard;
        } 
        
        // 2. If a card is already selected: Attempt a match.
        else {
            // Prevent matching a card with itself, or cards in the same column
            if (clickedCard === selectedCard || clickedCard.closest('.column') === selectedCard.closest('.column')) {
                // If the user clicks the same card or another in the same column, just select the new one
                selectedCard.classList.remove('selected');
                clickedCard.classList.add('selected');
                selectedCard = clickedCard;
                return;
            }

            // Check if the cards match (based on the data-match attribute)
            const isMatch = clickedCard.dataset.match === selectedCard.dataset.match;

            if (isMatch) {
                // Correct Match: Turn both green
                clickedCard.classList.remove('selected'); // Remove selection class
                selectedCard.classList.remove('selected');

                clickedCard.classList.add('matched');
                selectedCard.classList.add('matched');

            } else {
                // Incorrect Match: Keep the selection for a moment, then reset
                clickedCard.classList.add('selected');
                
                // Temporarily display the selection, then clear both
                setTimeout(() => {
                    clickedCard.classList.remove('selected');
                    selectedCard.classList.remove('selected');
                    selectedCard = null; // Clear the selection
                }, 800);
            }
            
            // Clear the selection if it was a valid attempted match
            if (isMatch) {
                selectedCard = null;
            }
        }
    };

    // Attach the click handler to all cards
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
});

// DOTS AUTO SWITCH (just for animation)
let index = 0;
const dots = document.querySelectorAll(".dot");

setInterval(() => {
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");

    index = (index + 1) % dots.length;
}, 2000);

