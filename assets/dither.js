var imageDisplay, displayCanvas, displayContext, displayImage, displayImageData, originalImage
var worker = new Worker('assets/dither-worker.js')

function draw () {
  displayImage = new Image()
  displayImage.src = originalImage

  displayCanvas.width = displayImage.width
  displayCanvas.height = displayImage.height
  displayContext = displayCanvas.getContext('2d')

  displayContext.drawImage(displayImage, 0, 0)

  displayImageData = displayContext.getImageData(0,0,displayCanvas.width,displayCanvas.height)

  var tmpGreyscaleMethod = 'luminance'
  var tmpDitherMethod = 'atkinson'
  var tmpDitherThreshold = 127
  var tmpReplaceColours = true
  var tmpReplaceBlack = {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  }
  var tmpReplaceWhite = {
    r: 255,
    g: 255,
    b: 255,
    a: 255
  }

  worker.postMessage({
    image: {
      data: displayImageData,
      width: displayCanvas.width,
      height: displayCanvas.height
    },
    processing: {
      greyscaleMethod: tmpGreyscaleMethod,
      ditherMethod: tmpDitherMethod,
      ditherThreshold: tmpDitherThreshold,
      replaceColours: tmpReplaceColours,
      replaceColourMap: {
        black: tmpReplaceBlack,
        white: tmpReplaceWhite
      }
    }
  })
}

worker.addEventListener('message', function (e) {
  displayContext = displayCanvas.getContext('2d')

  displayContext.putImageData(e.data.image.data, 0, 0)

  imageDisplay.src = displayCanvas.toDataURL('image/png')
}, false)

function setup () {
  // Detect Canvas Support
  displayCanvas = document.createElement('canvas')
  imageDisplay = document.getElementById('displayImage')

  if (displayCanvas.getContext) {

    var links = Array.from(document.getElementsByClassName('link'))

    links.map(function (e) {
      hoverintent(e,
        function (link) {
          originalImage = link.target.dataset.image
          document.getElementById('displayImage').src = ''
          document.getElementById('displayImage').src = link.target.dataset.image
          document.getElementById('displayImage').onload = function () {
            draw()
          }
          imageDisplay.classList.add('visible')
        }, function () {
          imageDisplay.classList.remove('visible')
        })
    })
  } else {
    alert("Hi there, you're using an older browser which doesn't support Canvas.")
  }
}

window.onload = setup
