"use strict";
let alarmName = "Iki Reminder!";
let form = document.forms[0];

form.addEventListener("change", function () {
  chrome.storage.local.set({
    interval: form.interval.value,
  });

  checkAlarm(function (hasAlarm) {
    if (hasAlarm) {
      cancelAlarm();
      createAlarm();
    }
  });
});

chrome.storage.local.get({ interval: 30 }, function (data) {
  form.interval.value = data.interval;
});

function checkAlarm(callback) {
  chrome.alarms.getAll(function (alarms) {
    let hasAlarm = alarms.some(function (a) {
      return a.name == alarmName;
    });

    let buttonText;
    if (hasAlarm) {
      buttonText = "Pause Iki";
    } else {
      buttonText = "Activate Iki";
    }
    document.getElementById("toggleIki").innerText = buttonText;

    if (callback) callback(hasAlarm);
  });
}

function createAlarm() {
  chrome.alarms.create(alarmName, {
    delayInMinutes: parseInt(form.interval.value),
    periodInMinutes: parseInt(form.interval.value),
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
