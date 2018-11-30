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
  var svgArt = `<svg xmlns="http://www.w3.org/2000/svg" fill="${widget.color}" viewBox="0 0 26 26"><path d="M2 12V2h10v4h2V0H0v14h6v-2z"/><path opacity=".5" d="M6 6v14h6v-2H8V8h10v4h2V6z"/><path d="M12 12v14h14V12H12zm12 12H14V14h10v10z" opacity=".1"/></svg>`

  var ringLink = `
    <a title="WWWorkshop.org" href="${baseUrl}#${typeInput()}" style="position:absolute;width:100%;height:100%">${svgArt}</a>
  `

  myElement.style.cssText = `position:fixed; z-index:2147483647; width:26px; height:26px; bottom:20px; right:20px;`
  myElement.innerHTML = ringLink

  document.body.appendChild(myElement)
})()
