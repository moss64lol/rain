document.addEventListener("DOMContentLoaded", function () {
    const totalTimeElement = document.getElementById("total-time");
    const form = document.getElementById("add-time-form");
    const logContainer = document.getElementById("log-container");
    let guestCount = localStorage.getItem("guestCount") || 1;
    let totalSeconds = parseInt(localStorage.getItem("totalSeconds")) || 0;

    function formatTime(seconds) {
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;
        return `${hrs} hours ${mins} minutes ${secs} seconds`;
    }

    function updateTotalTime() {
        totalTimeElement.textContent = formatTime(totalSeconds);
        localStorage.setItem("totalSeconds", totalSeconds);
    }

    function addLogEntry(guestName, addedSeconds) {
        let logEntry = document.createElement("p");
        logEntry.textContent = `${guestName} added ${formatTime(addedSeconds)}`;
        logContainer.appendChild(logEntry);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let hours = parseInt(document.getElementById("hours").value) || 0;
        let minutes = parseInt(document.getElementById("minutes").value) || 0;
        let seconds = parseInt(document.getElementById("seconds").value) || 0;
        let userName = prompt("Enter your name (or leave blank for Guest)") || `Guest${guestCount}`;
        
        let addedSeconds = hours * 3600 + minutes * 60 + seconds;
        if (addedSeconds > 0) {
            totalSeconds += addedSeconds;
            updateTotalTime();
            addLogEntry(userName, addedSeconds);
            localStorage.setItem("guestCount", parseInt(guestCount) + 1);
        }
    });
    
    updateTotalTime();
});
