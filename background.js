// //background.js is the extension's event handler. Listening for browser events, with events fed into it using Chrome Extension API

//On chrome startup, save the date/time for session data
chrome.runtime.onStartup.addListener(function () {
  let startTime = Math.floor(new Date() / 1000);
  chrome.storage.local.set({ startTime: startTime });
});

//Event listener for alarm, creates notification
chrome.alarms.onAlarm.addListener(function (alarm) {
  ikiNotification();
  ikiTone();
});

//Function to create the notification popup
function ikiNotification() {
  chrome.notifications.create(
    "reminder",
    {
      type: "basic",
      iconUrl: "./css/iki.png",
      title: "Iki Reminder!",
      message: "Take a breath",
      priority: 1,
    },
    function (notificationId) {}
  );
}

// //Function to play a notification tone
// function ikiTone() {
//   // const tone = document.createElement("audio");
//   let tone;
//   tone.src = chrome.extension.getURL("notification-tone.ogg");
//   tone.play();
// }

function ikiTone() {
  // let tone = document.createElement("audio");
  let tone;
  tone.src = chrome.runtime.getURL("notification-tone.ogg");
  console.log(tone);
  // tone.play();
}

//Event listener for what happens when clicking on the notification
chrome.notifications.onClicked.addListener(function () {
  chrome.tabs.create({
    url: "https://www.mindful.org/a-five-minute-breathing-meditation/",
  });
});
