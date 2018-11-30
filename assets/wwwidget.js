(function () {
  var baseUrl = 'https://wwworkshop.org'
  var myElement = document.createElement('div')
  myElement.id = 'wwworkshop-widget'

  function getSyncScriptParams () {
    var scripts = document.getElementsByTagName('script')
    var scriptEles = Array.prototype.map.call(scripts, element => ({
      src: element.src,
      color: (element.dataset.color || '#000'),
      type: element.dataset.linkType
    }))
    var widgetEle = scriptEles.filter(script => script.src.includes('wwwidget.js'))[0]

    return widgetEle
  }

  function typeInput () {
    var hash = 'random'
    if (widget.type === 'next') {
      hash = `${window.location.host}${window.location.pathname}`
    }
    return hash
  }

  var widget = getSyncScriptParams()

  var ringLink = `
    <a href="${baseUrl}#${typeInput()}" style="position:absolute;width:100%;height:100%"></a>
  `

  myElement.style.cssText = `position:fixed; z-index:2147483647; border-radius:50%; width:40px; height:40px; bottom:20px; right:20px; background:${widget.color};`
  myElement.innerHTML = ringLink

  document.body.appendChild(myElement)
})()
