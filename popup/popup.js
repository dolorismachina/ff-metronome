browser.runtime.sendMessage({
  action: 'status'
}).then(status => {
  console.log(status)
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

function toggleButton() {
  const b = document.querySelector('button')
  b.textContent === 'Start' ? b.textContent = 'Pause' : b.textContent = 'Start'
}


function onError(e) {
  console.log(e)
}