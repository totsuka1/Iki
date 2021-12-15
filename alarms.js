(function () {
  "use strict";
  var alarmName = "Iki Reminder!";

  function checkAlarm(callback) {
    chrome.alarms.getAll(function (alarms) {
      console.log(alarms);
      var hasAlarm = alarms.some(function (a) {
        return a.name == alarmName;
      });

      var newLabel;
      if (hasAlarm) {
        newLabel = "Pause Iki";
      } else {
        newLabel = "Activate Iki";
      }
      document.getElementById("toggleIki").innerText = newLabel;

      if (callback) callback(hasAlarm);
    });
  }

  function createAlarm() {
    chrome.alarms.create(alarmName, {
      delayInMinutes: 0.1,
      periodInMinutes: 0.1,
    });
  }

  function cancelAlarm() {
    chrome.alarms.clear(alarmName);
  }

  function doToggleAlarm() {
    checkAlarm(function (hasAlarm) {
      if (hasAlarm) {
        cancelAlarm();
      } else {
        createAlarm();
      }
      checkAlarm();
    });
  }

  document.getElementById("toggleIki").addEventListener("click", doToggleAlarm);

  checkAlarm();
})();
