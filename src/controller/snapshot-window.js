const img = document.getElementById('img')

window.electronAPI.showImg((event, value) => {
    img.src = value;
})