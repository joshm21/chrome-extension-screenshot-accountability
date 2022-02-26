const takeScreenshot = () => {
  chrome.tabs.captureVisibleTab({ quality: 10 }, dataUrl => {
    postToServer("uploadScreenshot", "Chromebook", dataUrl)
  })
}

const checkThisExtensionIncognitoAllowed = () => {
  chrome.extension.isAllowedIncognitoAccess(isAllowedAccess => {
    if (!isAllowedAccess) {
      postToServer("incognitoDisallowed", "Chromebook", null)
    }
  })
}

const onOtherExtensionDisabledOrUninstalled = (extensionInfo) => {
  if (extensionInfo.name == "Screenshot Accountability Guard") {
    postToServer("disabledOrUninstalled", "Chromebook", null)
  }
}

chrome.management.onDisabled.addListener(onOtherExtensionDisabledOrUninstalled)




// Alarms - which run over repeatedly with short delay
const setNextAlarm = () => {
  chrome.alarms.create({ delayInMinutes: 2 })
}

const onAlarm = (alarm) => {
  setNextAlarm()
  takeScreenshot()
  checkThisExtensionIncognitoAllowed()
}

chrome.alarms.onAlarm.addListener(onAlarm)
chrome.alarms.create({ delayInMinutes: 0.1 })




const postToServer = (action, device, img) => {
  console.log(`postToServer; action = ${action}`)
  const url = "your_server_url_endpoint"
  const data = { timestamp: new Date().toISOString(), action, device, img }
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "text/plain;charset=utf-8" }
  })
}