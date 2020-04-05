export default class OscillatorPlayer {
  constructor(context) {
    this.context = context
    this.gain = this.context.createGain()
    this.gain.connect(this.context.destination)
  }


  play({ step, time, length }) {
    const freq = step % 4 === 1 ? 700 : 350

    const osc = this.context.createOscillator()

    osc.frequency.value = freq
    osc.connect(this.gain)

    osc.start(time)
    osc.stop(time + length)
  }
}