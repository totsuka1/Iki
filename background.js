"use strict";

//On chrome startup, save the date/time for session data
chrome.runtime.onStartup.addListener(function () {
  let startupTime = Math.floor(new Date() / 1000);
  chrome.storage.local.set({ startTime: startupTime });
});

//Event listener for alarm, creates notification
chrome.alarms.onAlarm.addListener(function (alarm) {
  ikiNotification();
});

//Function to create the notification popup
function ikiNotification() {
  chrome.notifications.create("reminder", {
    type: "basic",
    iconUrl: "./css/iki.png",
    title: "Iki Reminder!",
    message: "Take a breath",
    priority: 2,
  });
}

//Event listener for what happens when clicking on the notification
chrome.notifications.onClicked.addListener(function () {
  chrome.tabs.create({
    url: "https://www.mindful.org/a-five-minute-breathing-meditation/",
  });
});
