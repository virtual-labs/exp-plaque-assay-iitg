document.addEventListener('DOMContentLoaded', () => {
    // 12-step Plaque Assay sequence configuration
    const steps = [
        {
            src: './images/Step1.mp4',
            caption: 'Step 1: Host cells are seeded in a multi-well tissue culture plate and incubated until they form a confluent monolayer.'
        },
        {
            src: './images/Step2.mp4',
            caption: 'Step 2: Prepare serial ten-fold dilutions of the viral stock suspension to ensure countable plaque counts.'
        },
        {
            src: './images/Step3.mp4',
            caption: 'Step 3: Carefully aspirate and remove the liquid growth medium from the wells containing confluent host cells.'
        },
        {
            src: './images/Step4.mp4',
            caption: 'Step 4: Inoculate the cell monolayers by adding a measured volume of each viral dilution to the respective wells.'
        },
        {
            src: './images/Step5.mp4',
            caption: 'Step 5: Incubate the plate for 1 hour at 37 °C, rocking it periodically to allow viral adsorption and prevent cell drying.'
        },
        {
            src: './images/Step6.mp4',
            caption: 'Step 6: Remove the viral inoculum from each well to clear away any unadsorbed free viral particles.'
        },
        {
            src: './images/Step7.mp4',
            caption: 'Step 7: Prepare the semi-solid overlay medium (commonly agarose or methylcellulose mixed with nutrient medium).'
        },
        {
            src: './images/Step8.mp4',
            caption: 'Step 8: Apply the warm semi-solid overlay medium to each well to restrict viral spread to neighboring cells.'
        },
        {
            src: './images/Step9.mp4',
            caption: 'Step 9: Incubate the plate at 37 °C for 2–3 days to allow local viral replication cycles and plaque development.'
        },
        {
            src: './images/Step10.mp4',
            caption: 'Step 10: Fix the host cell monolayer by adding a fixative solution (e.g., formaldehyde or glutaraldehyde) to the wells.'
        },
        {
            src: './images/Step11.mp4',
            caption: 'Step 11: Stain the fixed cells using crystal violet dye, which stains living host cells purple while leaving plaques clear.'
        },
        {
            src: './images/Step12.mp4',
            caption: 'Step 12: Gently wash off the excess dye, visualize the plates, and count the clear plaques to calculate viral titer in PFU/mL.'
        }
    ];

    let currentIndex = 0;

    const sliderVideo = document.getElementById('sliderVideo');
    const slideCaption = document.getElementById('slideCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepCounter = document.getElementById('stepCounter');
    const progressBar = document.getElementById('progressBar');
    const indicatorsContainer = document.getElementById('indicators');

    // Initialize dot indicators
    function initIndicators() {
        indicatorsContainer.innerHTML = '';
        steps.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => jumpToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    // Update the layout and slide content
    function updateSlide() {
        const step = steps[currentIndex];

        // Apply fade-out animation to the media element
        sliderVideo.classList.add('fade-out');

        setTimeout(() => {
            // Update source and load video
            sliderVideo.src = step.src;
            sliderVideo.load();

            // Wait for video data to load to prevent visual stutter
            sliderVideo.onloadeddata = () => {
                sliderVideo.classList.remove('fade-out');
                // Automatically play the video (with volume muted to prevent browser blocks)
                sliderVideo.play().catch(e => console.log('Playback prevented by browser policies:', e));
            };

            // Update caption content
            slideCaption.style.animation = 'none';
            slideCaption.offsetHeight; // trigger reflow
            slideCaption.style.animation = null;
            slideCaption.textContent = step.caption;

            // Update text counter and progress bar
            stepCounter.textContent = `Step ${currentIndex + 1} of ${steps.length}`;
            const progressPercentage = ((currentIndex + 1) / steps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            // Update dot indicators states
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Enable/disable navigation buttons
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === steps.length - 1;

        }, 250); // Matches the CSS transition duration
    }

    function goToNext() {
        if (currentIndex < steps.length - 1) {
            currentIndex++;
            updateSlide();
        }
    }

    // Handle video end to automatically trigger next step
    sliderVideo.addEventListener('ended', () => {
        if (currentIndex < steps.length - 1) {
            goToNext();
        }
    });

    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    }

    function jumpToSlide(index) {
        if (index !== currentIndex && index >= 0 && index < steps.length) {
            currentIndex = index;
            updateSlide();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Initial setup
    initIndicators();
    updateSlide();
});
