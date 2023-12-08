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
