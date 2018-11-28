(function() {
  var baseUrl = 'http://localhost:4000';
  var myElement = document.createElement("div");
  myElement.id = 'wwworkshop-widget';

  function getSyncScriptParams() {
    var scripts = document.getElementsByTagName('script');
    scriptEles = Array.prototype.map.call(scripts, element =>({
      src: element.src,
      color: element.dataset.color,
      type: element.dataset.linkType
    }));
    widgetEle = scriptEles.filter(script => script.src.includes('wwwidget.js'))[0];
    return widgetEle;
  }

  function typeInput() {
    if (widget.type === 'next') {
      var hash = `${window.location.host}${window.location.pathname}`;
    } else {
      var hash = 'random';
    }
    return hash;
  }

  var widget = getSyncScriptParams();

  var ringLink = `
    <a href="${baseUrl}#${typeInput()}" style="position:absolute;width:100%;height:100%"></a>
  `;

  myElement.style.cssText = `position:fixed; z-index:2147483647; border-radius:50%; width:40px; height:40px; bottom:20px; right:20px; background:${widget.color};`;
  myElement.innerHTML = ringLink;

  document.body.appendChild(myElement);

})();