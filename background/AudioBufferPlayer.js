export default class AudioBufferPlayer {
  constructor(context, pathHigh, pathLow) {
    this.context = context

    this.pathHigh = pathHigh
    this.pathLow = pathLow
    
    this.bufferHigh = null
    this.bufferLow = null
  }


  async play({ step, time, length }, up) {
    if (!this.bufferHigh)
      this.bufferHigh = await this.createAudioBuffer(this.pathHigh, this.context)
    if (!this.bufferLow)
      this.bufferLow = await this.createAudioBuffer(this.pathLow, this.context)

    const source = this.context.createBufferSource()
    source.buffer = up ? this.bufferHigh : this.bufferLow
    source.connect(this.context.destination)
    source.start(time)
  }


  async createAudioBuffer(file, audioContext) {
    const fetchResponse = await fetch(file)
    if (!fetchResponse.ok)
      throw new Error(`Could not fetch: ${res.status} ${res.statusText} ${file}`)

    const arrayBuffer = await fetchResponse.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    return audioBuffer
  }
}