// //background.js is the extension's event handler. Listening for browser events, with events fed into it using Chrome Extension API
"use strict";

//On chrome startup, save the date/time for session data
chrome.runtime.onStartup.addListener(function () {
  let startTime = Math.floor(new Date() / 1000);
  chrome.storage.local.set({ startTime: startTime });
});

//Event listener for alarm, creates notification
chrome.alarms.onAlarm.addListener(function (alarm) {
  ikiNotification();
  // ikiTone();
  let tone = chrome.runtime.getURL("notification-tone.ogg");

  let a = new Audio(tone);
  a.play();
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
      priority: 2,
    },
    function (notificationId) {}
  );
}

// let tone = chrome.runtime.getURL("notification-tone.ogg");
// tone.play();

// function ikiTone() {
//   if (sound) {
//     let tone = document.createElement("audio");
//     tone.src = chrome.runtime.getURL("notification-tone.ogg");
//     tone.play();
//   }
// }

// let tone = chrome.runtime.getURL("notification-tone.ogg");
// tone;
// console.log(tone);

//Event listener for what happens when clicking on the notification
chrome.notifications.onClicked.addListener(function () {
  chrome.tabs.create({
    url: "https://www.mindful.org/a-five-minute-breathing-meditation/",
  });
});
