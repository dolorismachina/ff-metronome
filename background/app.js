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

    setInterval(this.schedule.bind(this), 25)

    this.queue = []

    this.step = 0
    this.on = true

    this.oscillatorPlayer = new OscillatorPlayer(this.context)
    this.audioBufferPlayer = new AudioBufferPlayer(this.context, './click.wav')

    this.player = this.oscillatorPlayer
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
