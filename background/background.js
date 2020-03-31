import App from './app.js'


let desiredTempo = 120
let app = null

// Listen to messages from popup
browser.runtime.onMessage.addListener((message, sender, respond) => {
  if (message.action === 'status') {
    if (!app) {
      respond({
        status: 'offline'
      })
    }
    else respond({
      status: app.status,
      bpm: app.bpm
    })
  } 

  else if (message.action === 'tempo') {
    if (app) {
      app.adjustTempo(message.value)
      desiredTempo = message.value
    }
    else desiredTempo = message.value
  } 

  else if (message.action === 'toggle') {
    if (!app) {
      console.log('new')
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
})