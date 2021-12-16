let startTime;
chrome.storage.local.get(["startTime"], function (result) {
  startTime = result.startTime;
});

function sessionTime() {
  const now = Math.floor(new Date() / 1000);
  const secondsSince = now - startTime;

  let hoursSince = Math.floor(secondsSince / 3600);
  let minutesSince = Math.floor(secondsSince / 60) % 60;

  document.getElementById(
    "session-time"
  ).innerHTML = `You've been working for ${hoursSince} hours and ${minutesSince} minutes`;

  setTimeout(sessionTime, 100);
}

function resetStartTime() {
  startTime = Math.floor(new Date() / 1000);
  chrome.storage.local.set({ startTime: startTime });
}

document
  .getElementById("session-reset")
  .addEventListener("click", resetStartTime);

sessionTime();
