export default class AudioBufferPlayer {
  constructor(context, path) {
    this.context = context
    this.path = path
    this.buffer = null
  }


  async play({ step, time, length }) {
    if (!this.buffer)
      this.buffer = await this.createAudioBuffer(this.path, this.context)

    const source = this.context.createBufferSource()
    source.buffer = this.buffer
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