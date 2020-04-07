import AudioBufferPlayer from './AudioBufferPlayer.js'
import OscillatorPlayer from './OscillatorPlayer.js'

export default class {
  constructor () {
    this.context = new AudioContext()
    this.nextNoteTime = this.context.currentTime
    this.bpm = 120
    this.qNoteInterval = 60 / this.bpm

    this.gain = this.context.createGain()
    this.gain.gain.value = 1


    this.queue = []

    this.step = 0
    this.on = false


    this.players = {
      beep: {
        name: 'Beep',
        player: new OscillatorPlayer(this.context)
      },
      click: {
        name: 'Click',
        player: new AudioBufferPlayer(this.context, './click.wav')
      }
    }


    this.oscillatorPlayer = this.players.beep.player
    this.audioBufferPlayer = this.players.click.player

    this.player = this.oscillatorPlayer
  }


  toggle() {
    if (this.on) {
      clearInterval(this.scheduleInterval)
    }
    else {
      this.scheduleInterval = setInterval(this.schedule.bind(this), 25)
    }

    this.on = !this.on
    this.step = 0
    this.nextNoteTime = this.context.currentTime
  }

  
  changePlayer(playerString) {
    console.log('Changing player to: ', playerString)
    this.player = this.players[playerString.toLowerCase()].player
  }


  schedule () {
    if (this.nextNoteTime < this.context.currentTime + 0.1) {
      this.playSound(this.nextNoteTime, this.qNoteInterval * 0.5)
      this.nextNoteTime += this.qNoteInterval
    }
  }

  playSound(time = 0, length = this.qNoteInterval) {
    const oscillator = this.context.createOscillator()
    this.step++
    const step = this.step
    this.player.play({step, time, length})
  }
  
   
  adjustGain(val) {
    this.gain.gain.value = val
  }


  adjustTempo(value) {
    this.bpm = parseInt(value)
    this.qNoteInterval = 60 / this.bpm
  }
}


const arr = [
  {
    name: 'Beep',
    player: OscillatorPlayer
  },
  {
    name: 'Click',
    player: AudioBufferPlayer,
  }
]