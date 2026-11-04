document.addEventListener('DOMContentLoaded', () => {
    // 12-step Plaque Assay sequence configuration
    const steps = [
        {
            src: './images/Step1.mp4',
            caption: 'Step 1: Host cells are washed with PBS and trypsinised'
        },
        {
            src: './images/Step2.mp4',
            caption: 'Step 2: Cells are seeded in a 6-well plate and incubated overnight'
        },
        {
            src: './images/Step3.mp4',
            caption: 'Step 3: 450 μl of plain DMEM to the centrifuge tubes labelled 10-1, 10-2, 10-3, 10-4.'
        },
        {
            src: './images/Step4.mp4',
            caption: 'Step 4: Add virus to the first tube and serially dilute the viral supernatant'
        },
        {
            src: './images/Step5.mp4',
            caption: 'Step 5: Wash the cells seeded in the 6-well plate with PBS'
        },
        {
            src: './images/Step6.mp4',
            caption: 'Step 6: Add each viral dilution to the respective wells and incubate the plate for 1 hour at 37 °C, rocking it periodically to allow viral adsorption and prevent cell drying.'
        },
        {
            src: './images/Step7.mp4',
            caption: 'Step 7: Discard the media and wash cells with PBS'
        },
        {
            src: './images/Step8.mp4',
            caption: 'Step 8: Add methylcellulose DMEM to each well and incubate for 72 hours'
        },
        {
            src: './images/Step9.mp4',
            caption: 'Step 9: Use methanol to fix cells.'
        },
        {
            src: './images/Step10.mp4',
            caption: 'Step 10: Remove the methanol and add 1 % crystal violet, and slow shake for 15 mins'
        },
        {
            src: './images/Step11.mp4',
            caption: 'Step 11: Remove the crystal violet and wash the wells with water'
        },
        {
            src: './images/Step12.mp4',
            caption: 'Step 12: Observe the plaques under a microscope, visualise the plates and count the clear plaques to calculate viral titer in PFU/mL.'
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
