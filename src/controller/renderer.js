const mimizeButton = document.getElementById('btn-minimize')
const closeButton = document.getElementById('btn-close')
mimizeButton.addEventListener('click', () => {
  window.electronAPI.mimizedWindow()
})

closeButton.addEventListener('click', () => {
  window.electronAPI.appExit()
})