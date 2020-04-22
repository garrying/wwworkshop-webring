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
  var svgArt = `<svg xmlns="http://www.w3.org/2000/svg" fill="${widget.color}" viewBox="0 0 19 30"><style>path{transition:opacity 300ms ease-in-out;}g{pointer-events: bounding-box;}g:hover path{opacity:1;}</style><g><path opacity=".1" d="M3.1 17.1l1.5 1.4-1.5 1.4 7.1 7.1 5.7-5.6-1.5-1.5 1.5-1.4 2.8 2.9-8.5 8.4-9.9-9.9z"/><path d="M.3 8.6l9.9 9.9 8.5-8.5L8.8.2.3 8.6zm2.8 0L8.8 3l7.1 7.1-5.7 5.7-7.1-7.2z"/><path opacity=".5" d="M3.1 11.5l1.5 1.4-1.5 1.4 7.1 7.1 5.7-5.7-1.5-1.4 1.5-1.4 2.8 2.8-8.5 8.5-9.9-9.9z"/></g></svg>`

  var ringLink = `
    <a title="WWWorkshop.org" href="${baseUrl}#${typeInput()}" style="position:absolute;width:100%;height:100%">${svgArt}</a>
  `

  myElement.style.cssText = 'position:fixed; z-index:2147483647; width:19px; height:30px; bottom:20px; right:20px;'
  myElement.innerHTML = ringLink

  document.body.appendChild(myElement)
})()
