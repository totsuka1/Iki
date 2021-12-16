"use strict";
let alarmName = "Iki Reminder!";
let form = document.forms[0];
form.addEventListener("change", function () {
  chrome.storage.local.set({
    interval: form.interval.value,
    soundToggle: form.sound.checked,
  });
});

// let interval = form.interval.value;

function checkAlarm(callback) {
  chrome.alarms.getAll(function (alarms) {
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
    delayInMinutes: 1,
    periodInMinutes: 1,

    // delayInMinutes: form.interval.value,
    // periodInMinutes: form.interval.value,
  });
}

function cancelAlarm() {
  chrome.alarms.clear(alarmName);
}

function toggleAlarm() {
  checkAlarm(function (hasAlarm) {
    if (hasAlarm) {
      cancelAlarm();
    } else {
      createAlarm();
    }
    checkAlarm();
  });
}

document.getElementById("toggleIki").addEventListener("click", toggleAlarm);

checkAlarm();
