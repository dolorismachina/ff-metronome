const STATUS = {
  PLAYING: 'playing',
  PAUSED: 'paused'
}

class App {
  constructor () {
    this.context = new AudioContext()
    this.nextNoteTime = this.context.currentTime
    this.bpm = 120
    this.qNoteInterval = 60 / this.bpm

    this.gain = this.context.createGain()
    this.gain.gain.value = 1

    setInterval(this.schedule.bind(this), 25)

    this.queue = []

    this.step = 0
    this.status = STATUS.PLAYING
  }

  schedule () {
    if (this.nextNoteTime < this.context.currentTime + 0.1) {
      this.playSound(this.nextNoteTime, this.qNoteInterval * 0.5)
      this.queue.push(this.nextNoteTime)
      this.nextNoteTime += this.qNoteInterval
    }
  }

  playSound(time = 0, length = this.qNoteInterval) {
    const oscillator = this.context.createOscillator()
    this.step++
    if (this.step % 4 === 1) {
      oscillator.frequency.value = 700
    }
    else {
      oscillator.frequency.value = 350
    }
  
    oscillator.connect(this.gain).connect(this.context.destination)
   
    oscillator.start(time)
    oscillator.stop(time + length)
  }

  adjustGain(val) {
    this.gain.gain.value = val
  }

  adjustTempo(value) {
    this.bpm = parseInt(value)
    this.qNoteInterval = 60 / this.bpm
  }
}

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

    else if (app.status === STATUS.PLAYING) {
      app.status = STATUS.PAUSED
      app.adjustGain(0)
      app.context.close()
      app = null
    }
  } 
})