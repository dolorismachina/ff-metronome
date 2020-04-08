let isPlaying = false
let select = null
let instances = null
let instance = null

const button = document.querySelector('button')

browser.runtime.sendMessage({
  action: 'status'
}).then(status => {
  console.log(status)
  populateSelect(status.sounds, status.selectedSound)

  if (status.status === 'offline')
    return

  isPlaying = status.status
  document.querySelector('#bpm').textContent = status.bpm
  document.querySelector('#bpmrange').value = status.bpm
  setButtonState(isPlaying)
})


function setButtonState(metronomePlaying) {
  button.style.backgroundImage = 
    metronomePlaying ? 'url("../icons/stop.png")' : 'url("../icons/play.png")'
}


// Tempo Slider
document.querySelector('input').oninput = e => {
  document.querySelector('#bpm').textContent = e.target.value
  browser.runtime.sendMessage({
    action: 'tempo',
    value: e.target.value
  })
}


// Start / Pause button
document.querySelector('button').onclick = e => {
  if (!document.querySelector('select').value)
    return

  browser.runtime.sendMessage({
    action: 'toggle'
  })

  toggleButton()
  isPlaying = !isPlaying
}


// Sound select.
document.querySelector('select').onchange = e => {
  browser.runtime.sendMessage({
    action: 'changesound', 
    sound: e.target.value
  })
}


function populateSelect(options, current) {
  const frag = document.createDocumentFragment()
  options.forEach(sound => {
    const option = document.createElement('option')
    option.value = sound
    option.textContent = sound
    frag.append(option)
    console.log(option)
  })
  const elems = document.querySelectorAll('select')
  elems[0].append(frag)
  elems[0].value = current

  instances = M.FormSelect.init(elems)
  instance = M.FormSelect.getInstance(elems[0])
  console.log(instance)
}


function toggleButton(on) {
  button.style.backgroundImage = isPlaying ? 'url("../icons/play.png")' : 'url("../icons/stop.png")'
}


function onError(e) {
  console.log(e)
}
  