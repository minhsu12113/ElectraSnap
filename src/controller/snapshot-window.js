const img = document.getElementById('img')
const overlay = document.getElementById('overlay')

window.electronAPI.showImg((event, value) => {
    img.src = value;
    console.log(value)
})

const copper = new Cropper(img, {
    aspectRatio: 0,
    autoCrop: false,
    modal: true,
    ImageSmoothingQuality: 'high'
})

img.addEventListener('cropend', (event) => {
    console.log(event.detail.originalEvent);
    console.log(event.detail.action);
    var dataCropped = copper.getCroppedCanvas().toDataURL('image/png');
    window.electronAPI.receiveBase64Img(dataCropped);
});