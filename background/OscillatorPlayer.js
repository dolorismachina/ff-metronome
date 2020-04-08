export default class OscillatorPlayer {
  constructor(context) {
    this.context = context
    this.gain = this.context.createGain()
    this.gain.connect(this.context.destination)
  }


  play({ step, time, length }, up) {
    const osc = this.context.createOscillator()
    osc.frequency.value = up ? 700 : 350
    osc.connect(this.gain)
    osc.start(time)
    osc.stop(time + length)
  }
}