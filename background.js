// //background.js is the extension's event handler. Listening for browser events, with events fed into it using Chrome Extension API
chrome.alarms.onAlarm.addListener(function (alarm) {
  ikiNotification();
});

// function launch() {
//   chrome.app.window.create("popup.html", {
//     id: "main",
//     bounds: { width: 620, height: 500 },
//   });
// }

function ikiNotification() {
  chrome.notifications.create(
    "reminder",
    {
      type: "basic",
      iconUrl: "./css/iki.png",
      title: "Iki Reminder title!",
      message: "A reminder to take a breath",
      priority: 2,
    },
    function (notificationId) {}
  );
}

// chrome.app.runtime.onLaunched.addListener(launch);

chrome.notifications.onClicked.addListener(function () {
  // launch();
  console.log("clicked!");
});
