browser.runtime.sendMessage({
  action: 'status'
}).then(status => {
  console.log(status)
  populateSelect(status.sounds, status.selectedSound)

  if (status.status === 'offline')
    return

  document.querySelector('label').textContent = status.bpm
  document.querySelector('input').value = status.bpm
  
  document.querySelector('button').textContent = 
    status.status === true ? 'Pause' : 'Start'

  
})

// Tempo Slider
document.querySelector('input').oninput = e => {
  document.querySelector('label').textContent = e.target.value
  browser.runtime.sendMessage({
    action: 'tempo',
    value: e.target.value
  })
}

// Start / Pause button
document.querySelector('button').onclick = e => {
  browser.runtime.sendMessage({
    action: 'toggle'
  })

  toggleButton()
}


// Sound select.
document.querySelector('select').oninput = e => {
  console.log(e.target.value)
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
  document.querySelector('select').append(frag)
  document.querySelector('select').value = current
}



function toggleButton() {
  const b = document.querySelector('button')
  b.textContent === 'Start' ? b.textContent = 'Pause' : b.textContent = 'Start'
}


function onError(e) {
  console.log(e)
}
