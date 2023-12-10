document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const revealImage = heroSection.querySelector('.reveal-image');

    if (!revealImage) {
        console.error('Reveal image not found!');
        return;
    }

    // Initial scaling and hiding of the image
    revealImage.style.transform = 'scale(0.2)';
    revealImage.style.opacity = 0;
    revealImage.style.position = 'absolute';

    // Making the image appear after 3 seconds
    setTimeout(() => {
        revealImage.style.opacity = 1;
    }, 3000);

    heroSection.addEventListener('mousemove', function(e) {
        heroSection.classList.add('cursor-none'); // Add the class to hide the cursor

        revealImage.style.opacity = 1; // Ensure the image is visible when mouse moves within hero section

        const rect = heroSection.getBoundingClientRect();
        const xPos = e.clientX - rect.left - (revealImage.width / 2);
        const yPos = e.clientY - rect.top - (revealImage.height / 2);

        // Update the position of the original image
        revealImage.style.left = xPos + 'px';
        revealImage.style.top = yPos + 'px';

        // Create a new image element for the trace
        const newImage = revealImage.cloneNode();
        newImage.style.left = xPos + 'px';
        newImage.style.top = yPos + 'px';
        heroSection.appendChild(newImage);

        // Optional: Remove the trace image after some time
        setTimeout(() => {
            newImage.remove();
        }, 200); // Removes each trace image after 200 milliseconds
    });

    heroSection.addEventListener('mouseleave', function() {
        revealImage.style.opacity = 0;
        heroSection.classList.remove('cursor-none'); // Remove the class to show the cursor again
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('transition-overlay');
    const squares = [];

    // Create squares
    for (let i = 0; i < 400; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        overlay.appendChild(square);
        squares.push(square);
    }

    // Function to start the transition
    function startTransition(url) {
        overlay.style.visibility = 'visible';

        // Randomize the order of squares and make them appear
        const shuffledSquares = squares.sort(() => 0.5 - Math.random());
        shuffledSquares.forEach((square, index) => {
            setTimeout(() => {
                square.style.opacity = 1;
            }, index * 2); // Time delay for each square
        });

        // After all squares are visible, navigate to the new page
        setTimeout(() => {
            window.location.href = url;
        }, shuffledSquares.length * 5);
    }

    // Attach transition to links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            startTransition(link.href);
        });
    });

    // Make squares disappear in reverse order when the new page loads
    squares.reverse().forEach((square, index) => {
        setTimeout(() => {
            square.style.opacity = 0;
        }, index * 5); // Adjust timing as needed
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var loadPercent = 0;
    var isPageLoaded = false;
    var interval = setInterval(function() {
        if (loadPercent < 99) {
            loadPercent++;
            document.querySelector('.loading h').textContent = loadPercent + '%';
        }
    }, 20); // Adjust this to ensure it reaches 99% around 2 seconds

    window.onload = function() {
        isPageLoaded = true;
        hideLoadingScreen();
    }

    setTimeout(function() {
        if (isPageLoaded) {
            hideLoadingScreen();
        }
    }, 2000); // Check after 2 seconds

    function hideLoadingScreen() {
        clearInterval(interval);
        document.querySelector('.loading').style.display = 'none';
    }
});


