document.addEventListener("DOMContentLoaded", function () {
    let totalSeconds = 0;
    let userAddedTime = {};
    const maxUserTime = 3 * 3600; 
    const maxDailyTime = new Date().getDay() === 0 || new Date().getDay() === 6 ? 10 * 3600 : 6 * 3600; // 10h weekends, 6h weekdays
    const endTime = 12 * 3600; 

    const totalTimeDisplay = document.getElementById("total-time");
    const timeForm = document.getElementById("add-time-form");
    const timeLimitMsg = document.getElementById("time-limit-message");
    const logContainer = document.createElement("div");
    logContainer.id = "log-container";
    document.body.appendChild(logContainer);

    function formatTime(seconds) {
        let h = Math.floor(seconds / 3600);
        let m = Math.floor((seconds % 3600) / 60);
        let s = seconds % 60;
        return `${h} hours ${m} minutes ${s} seconds`;
    }

    function updateTimeDisplay() {
        totalTimeDisplay.textContent = formatTime(totalSeconds);
    }

    function addToLog(user, time) {
        const entry = document.createElement("p");
        entry.textContent = `${user} added ${formatTime(time)}`;
        logContainer.appendChild(entry);
    }

    timeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let user = "Guest"; 
        let addedHours = parseInt(document.getElementById("hours").value) || 0;
        let addedMinutes = parseInt(document.getElementById("minutes").value) || 0;
        let addedSeconds = parseInt(document.getElementById("seconds").value) || 0;
        let addedTime = addedHours * 3600 + addedMinutes * 60 + addedSeconds;

        if (addedTime <= 0) {
            timeLimitMsg.textContent = "Please add a valid amount of time";
            return;
        }

        let userTime = userAddedTime[user] || 0;
        if (userTime + addedTime > maxUserTime) {
            timeLimitMsg.textContent = "You have exceeded the limit";
            return;
        }

        if (totalSeconds + addedTime > maxDailyTime) {
            timeLimitMsg.textContent = "Today's maximum revision time has been reached";
            return;
        }

        userAddedTime[user] = userTime + addedTime;
        totalSeconds += addedTime;
        updateTimeDisplay();
        addToLog(user, addedTime);
        timeLimitMsg.textContent = "";
    });

    updateTimeDisplay();

    const music = document.getElementById("background-music");
    music.play().catch(() => console.log("Autoplay prevented, user interaction needed"));
});
