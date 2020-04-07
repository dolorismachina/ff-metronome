import App from './app.js'


const PLAYERS = {
  beep: 'Beep',
  click: 'Click'
}

let desiredTempo = 120
let soundSelected = PLAYERS.beep
let app = new App()


function handleMessageStatus(message, sender, respond) {
  if (!app) {
    respond({
      status: 'offline',
      sounds: Object.values(PLAYERS),
      selectedSound: soundSelected,
    })
  }
  else respond({
    status: app.on,
    bpm: app.bpm,
    sounds: Object.values(PLAYERS),
    selectedSound: soundSelected,
  })
}


function handleMessageTempo(message, sender, respond) {
  desiredTempo = parseInt(message.value)

  if (app) {
    app.adjustTempo(message.value)
  }
}


function handleMessageToggle(message, sender, respond) {
  app.toggle()
}


function handleMessageChangeSound(message, sender, respond) {
  console.log(message, sender)

  soundSelected = PLAYERS[message.sound.toLowerCase()]
  app.changePlayer(soundSelected)
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

  else if (message.action === 'changesound') {
    handleMessage(data, handleMessageChangeSound)
  }
}


// Listen to messages from popup
browser.runtime.onMessage.addListener(onMessageHandler)
