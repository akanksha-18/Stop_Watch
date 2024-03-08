let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let lapListRef = document.querySelector(".lap-list");
let lapCount = 1;
let lapHistory = [];
let int = null;
let currentStyle = "default";

document.getElementById("start-timer").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("lap-timer").addEventListener("click", () => {
    lapHistory.push(`${lapCount}. ${timeRef.innerHTML}`);
    lapCount++;
    updateLapList();
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00:00:00:000";
    lapCount = 1;
    lapHistory = [];
    updateLapList();
});

document.getElementById("share-timer").addEventListener("click", () => {
    const shareableLink = generateShareableLink();
    alert(`Share this link: ${shareableLink}`);
});
function generateShareableLink() {
    const currentTime = timeRef.innerHTML;
    const lapHistoryString = lapHistory.map(lap => encodeURIComponent(lap)).join(';');
    const shareableLink = `${window.location.href}?time=${encodeURIComponent(currentTime)}&laps=${lapHistoryString}`;
    return shareableLink;
}

document.getElementById("style-dropdown").addEventListener("change", () => {
    changeStopwatchStyle();
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timeRef.innerHTML = `${h}:${m}:${s}:${ms}`;
}

function updateLapList() {
    lapListRef.innerHTML = "";
    lapHistory.forEach((lap, index) => {
        const lapItem = document.createElement("div");
        lapItem.classList.add("lap-list-item");
        lapItem.innerHTML = lap;
        lapListRef.appendChild(lapItem);
    });
}

function changeStopwatchStyle() {
    const styleDropdown = document.getElementById("style-dropdown");
    const selectedStyle = styleDropdown.value;
    const container = document.querySelector(".container");
    const body = document.querySelector("body");
    switch (selectedStyle) {
        case "default":
            body.style.backgroundImage = "url('default.jpg')";
            container.style.background = 'rgb(196,238,174)';
            container.style.background = 'radial-gradient(circle, rgba(196,238,174,1) 34%, rgba(148,187,233,1) 100%)';
            container.style.borderRadius = '50%';
            container.style.boxShadow = 'rgba(110,103,103,0.9389005602240896)';
            break;
        case "retro":
            body.style.backgroundImage = "url('retro.jpg')"; 
            container.style.background = "rgb(150,75,0)";
            container.style.background = "radial-gradient(circle, rgba(150,75,0,1) 34%, rgba(148,187,233,1) 100%)";
            container.style.clipPath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
            container.style.color = "#fff";
            break;
        case "digital":
            body.style.backgroundImage = "url('digital.jpg')";
            container.style.background = "rgb(110,103,103)";
            container.style.background = "linear-gradient(90deg, rgba(110,103,103,0.9389005602240896) 28%, rgba(148,187,233,1) 100%)";
            container.style.fontFamily = "'Digital-7', sans-serif";
            break;
        default:
            break;
    }

    body.className = selectedStyle + "-style";
}


function generateShareableLink() {
    const currentTime = timeRef.innerHTML;
    const lapHistoryString = lapHistory.map(lap => encodeURIComponent(lap)).join(';');
    const shareableLink = `${window.location.href}?time=${encodeURIComponent(currentTime)}&laps=${lapHistoryString}`;
    return shareableLink;
}
document.getElementById("style-dropdown").addEventListener("change", () => {
    changeStopwatchStyle();
});
changeStopwatchStyle();