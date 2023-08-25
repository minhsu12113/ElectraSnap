const mimizeButton = document.getElementById('btn-minimize');
const closeButton = document.getElementById('btn-close');
const snapButton = document.getElementById('btn-snap');
const historyButton = document.getElementById('btn-history');


mimizeButton.addEventListener('click', () => {
  window.electronAPI.mimizedWindow()
})

closeButton.addEventListener('click', () => {
  window.electronAPI.appExit()
})

snapButton.addEventListener('click', async () => {
  let filepath = await window.electronAPI.snapshot()  
  
  
  window.electronAPI.openSnapshotWindow(filepath);
  
})

historyButton.addEventListener('click', () => {
  window.electronAPI.openWindowHis()
})

