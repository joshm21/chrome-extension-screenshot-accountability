const onOtherExtensionDisabledOrUninstalled = (extensionInfo) => {
  if (extensionInfo.name == "Screenshot Accountability") {
    postToServer("disabledOrUninstalled", "Chromebook", null)
  }
}

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

chrome.management.onDisabled.addListener(onOtherExtensionDisabledOrUninstalled)