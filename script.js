document.addEventListener("DOMContentLoaded", function () {
    let words = document.querySelectorAll(".change-text .word");
    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;

    // Function to split text into spans for animation
    function prepareWords() {
        words.forEach((word, index) => {
            let letters = word.textContent.split("");
            word.innerHTML = ""; 
            letters.forEach((letter) => {
                let span = document.createElement("span");
                span.textContent = letter;
                span.classList.add("letter");
                word.appendChild(span);
            });
            word.style.opacity = index === 0 ? "1" : "0"; 
        });
    }

    function changeText() {
        let currentWord = words[currentWordIndex];
        let nextWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
        let nextWord = words[nextWordIndex];

        // Fade out current word
        currentWord.style.opacity = "0";
        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.classList.add("out");
            }, i * 50);
        });

        // Fade in next word
        setTimeout(() => {
            nextWord.style.opacity = "1";
            Array.from(nextWord.children).forEach((letter, i) => {
                letter.classList.remove("out");
                letter.classList.add("in");
                setTimeout(() => {
                    letter.classList.remove("in");
                }, i * 50);
            });

            currentWordIndex = nextWordIndex;
        }, 500);
    }

    // Initialize words and start animation
    prepareWords();
    setInterval(changeText, 3000);
});
