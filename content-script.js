console.log('sass')

browser.runtime.onMessage.addListener(e => {
  console.log(e)
})