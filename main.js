console.log('main.js connected');

// This object will hold all the data for the app
const components = {}

function cyclePageDisplay() {
    // Loop through the list of URLs and update the iframe's target to the
    // next one
    newIndex = (components.targetIndex + 1) % components.targets.length
    components.targetIndex = newIndex;
    console.log(`New target: ${components.targets[components.targetIndex]}`);
    components.frame.src = components.targets[components.targetIndex];
}

function mainLoop() {
    // Check if enough time has elapsed to change the URL target
    console.log(`${components.timeSinceLastChange}s since last change`);
    if (components.timeSinceLastChange > components.cycleDelay) {
        cyclePageDisplay();
        components.timeSinceLastChange = 0;
        components.progressBar.style = "width: 0%";
    }
    // Update the display to show time to next change
    let timeToUpdate = components.cycleDelay - components.timeSinceLastChange;
    components.overlay.innerHTML = `${components.targetIndex + 1}/${components.targets.length}`;

    // Reset the width of the progress bar
    let progress = components.timeSinceLastChange / components.cycleDelay;
    console.log(`Progress: ${progress * 100}%`);
    components.progressBar.style = `width: ${progress * 100}%`;

    components.timeSinceLastChange++;
}

function startCycle() {
    // Kill the timer
    window.clearInterval(components.timer);

    // Grab the cycle interval
    components.cycleDelay = document.getElementById('cycle-delay').valueAsNumber;
    console.log(`Starting auto-cycle every ${components.cycleDelay}s`);

    // Call the mainLoop() function every second. mainLoop handles updating the
    // timer and decides when to switch URL targets.
    components.timer = window.setInterval(mainLoop, 1000);
}

function stopCycle() {
    console.log('Stopping auto-cycle');
    window.clearInterval(components.timer);
    components.timeSinceLastChange = 0;
    components.progressBar.style = `width: ${progress * 100}%`;
}

window.onload = function () {
    // Populate the components object
    components.buttonCycleManual = document.getElementById('btn-cycle-manual');
    components.buttonStartCycle = document.getElementById('btn-start-cycle');
    components.buttonStopCycle = document.getElementById('btn-stop-cycle');
    components.frame = document.getElementById('frame');
    components.targets = [  // URLs to dsplay in the iframe
        "page1.html",
        "page2.html",
        "page3.html"
    ];
    components.targetIndex = 0;
    components.overlay = document.getElementById('overlay');
    components.cycleDelay = document.getElementById('cycle-delay').valueAsNumber;  // Time spent on each display
    components.timeSinceLastChange = 0;  // Tracks when we need to switch to a new target
    components.progressBar = document.getElementById('progress-bar');

    // Attach event listeners
    components.buttonCycleManual.addEventListener('click', cyclePageDisplay);
    components.buttonStartCycle.addEventListener('click', startCycle);
    components.buttonStopCycle.addEventListener('click', stopCycle);
}
