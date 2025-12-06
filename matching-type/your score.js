/**
 * Function called when the "Try Again" button is clicked.
 */
const cards = Array.from(document.querySelectorAll('.card'));
  const leftCols = document.querySelectorAll('.left-column .card');
  const rightCols = document.querySelectorAll('.right-column .card');

  let first = null; // first selected card
  let lock = false; // prevent rapid clicks
function handleTryAgain() {
    alert("Starting a new quiz! (In a real app, this would redirect.)");
    // Example: window.location.href = 'start-quiz.html';
}

/**
 * Function called when the "Go home" button is clicked.
 */
function handleGoHome() {
    alert("Navigating to the home page! (In a real app, this would redirect.)");
    // Example: window.location.href = 'home.html';
}
/**
 * Function called when the "Try Again" button is clicked.
 */
function handleTryAgain() {
    alert("Starting a new quiz! (In a real app, this would redirect.)");
    // window.location.href = 'start-quiz.html';
}

/**
 * Function called when the "Go home" button is clicked.
 */
function handleGoHome() {
    alert("Navigating to the home page! (In a real app, this would redirect.)");
    // window.location.href = 'home.html';
}