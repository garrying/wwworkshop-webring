'use strict'

let portal

function Portal (sites) {
  this.el = document.createElement('div')
  this.sites = sites
  const separators = ['▤', '▥', '▦', '▧', '▨', '▩']

  function aboutDisable () {
    if (window.location.pathname === '/about/') {
      return 'dn'
    } else {
      return 'dib'
    }
  }

  // Templates

  function _separator () {
    return separators[Math.floor(Math.random()*separators.length)];
  }

  function _buttons () {
    return `<p class='buttons'><a class='f3 link dim br4 bw2 ba ph5 pv3 mb5 mr3 dib white' href='#random' onClick="portal.reload('random')">Random</a> <a class='f3 link dim br4 bw2 ba ph5 pv3 mb5 mr3 white ${aboutDisable()}' href='/about'>About</a> <a class='link white' id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }

  function _directory (sites) {
    return `
    <ul class="grid list pl0 f3-ns f3 lh-title">${sites.reduce((acc, val, id) => { return `${acc}<li class="mb3"><a class='dim link white' href='${val.siteURL}'>${val.name} ${_separator()} <br>↳ ${val.siteURL.split('//')[1]}</a></li>` }, '')}</ul>\n${_buttons()}`
  }

  function _redirect (target) {
    return `<p class="f3">Redirecting to <b>${target.siteURL}</b></p><meta http-equiv="refresh" content="3; url=${target.siteURL}">
    <p class='buttons'><a class='f3 link dim br4 bw2 ba ph5 pv3 mb3 mr3 dib white' href='#' onClick="portal.reload('')">Directory</a> <a class='f3 link dim br4 bw2 ba ph5 pv3 mb3 mr3 dib white' href='#${target.siteURL}' onClick="portal.reload('random')">Skip</a> <a class='f3 link dim br4 bw2 ba ph5 pv3 mb3 mr3 dib white' href='#random' onClick="portal.reload('random')">Random</a> <a class='f3 link dim br4 bw2 ba ph5 pv3 mb2 white ${aboutDisable()}' href='/about'>About</a></p>`
  }

  //

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {
    this.el.innerHTML = window.location.hash && window.location.hash.length > 4 ? _redirect(this.next()) : _directory(this.sites)
  }

  this.reload = function () {
    setTimeout(() => { window.location.reload() }, 500)
  }

  this.navigate = function (target) {
    setTimeout(() => { window.location.href = target }, 3000)
  }

  this.locate = function () {
    const hash = window.location.hash.replace('#', '').trim()
    if (hash === 'random') {
      return Math.floor(Math.random() * this.sites.length)
    }

    for (const id in this.sites) {
      if (this.sites[id].siteURL.indexOf(hash) > -1) {
        return parseInt(id)
      }
    }
    return -1
  }

  this.next = function (loc = this.locate()) {
    return loc === this.sites.length - 1 ? this.sites[0] : this.sites[loc + 1]
  }
}

async function fetchAsync () {
  let response = await fetch('/sites.json')
  let data = await response.json()
  return data
}

fetchAsync()
  .then(function (data) {
    portal = new Portal(data.sites)
    portal.install(document.getElementById('webring-container'))
    portal.start()
  })
  .catch(function (reason) {
    console.log(reason.message)
  })
