console.log('main.js connected');

// This object will hold all the data for the app
const components = {}

function cyclePageDisplay() {
    newIndex = (components.targetIndex + 1) % components.targets.length
    components.targetIndex = newIndex;
    console.log(`New target: ${components.targets[components.targetIndex]}`);
    components.frame.src = components.targets[components.targetIndex];

    // Update the overlay
    components.overlay.innerHTML = components.frame.src;
}

function startCycle() {
    console.log('Starting auto-cycle');
    components.timer = window.setInterval(cyclePageDisplay, 1000);
}

function stopCycle() {
    console.log('Stopping auto-cycle');
    window.clearInterval(components.timer);
}

window.onload = function () {
    // Populate the components object
    components.buttonCycleManual = document.getElementById('btn-cycle-manual');
    components.buttonStartCycle = document.getElementById('btn-start-cycle');
    components.buttonStopCycle = document.getElementById('btn-stop-cycle');
    components.frame = document.getElementById('frame');
    components.targets = [
        "page1.html",
        "page2.html",
        "page3.html"
    ];
    components.targetIndex = 0;
    components.overlay = document.getElementById('overlay');

    // Attach event listeners
    components.buttonCycleManual.addEventListener('click', cyclePageDisplay);
    components.buttonStartCycle.addEventListener('click', startCycle);
    components.buttonStopCycle.addEventListener('click', stopCycle);
}
