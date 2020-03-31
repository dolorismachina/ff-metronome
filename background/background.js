import App from './app.js'


let desiredTempo = 120
let app = null


function handleMessageStatus(message, sender, respond) {
  if (!app) {
    respond({
      status: 'offline'
    })
  }
  else respond({
    status: app.on,
    bpm: app.bpm
  })
}


function handleMessageTempo(message, sender, respond) {
  desiredTempo = parseInt(message.value)

  if (app) {
    app.adjustTempo(message.value)
  }
}


function handleMessageToggle(message, sender, respond) {
  if (!app) {
    app = new App()
    app.adjustTempo(desiredTempo)
  }

  else if (app.on) {
    app.on = false
    app.adjustGain(0)
    app.context.close()
    app = null
  } 
}


function handleMessage({message, sender, respond}, handler) {
  handler(message, sender, respond)
}


function onMessageHandler(message, sender, respond) {
  const data = {
    message,
    sender,
    respond
  }

  if (message.action === 'status') {
    handleMessage(data, handleMessageStatus)
  } 

  else if (message.action === 'tempo') {
    handleMessage(data, handleMessageTempo)
  } 

  else if (message.action === 'toggle') {
    handleMessage(data, handleMessageToggle)
  } 
}


// Listen to messages from popup
browser.runtime.onMessage.addListener(onMessageHandler)
