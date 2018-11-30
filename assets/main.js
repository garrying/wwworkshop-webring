'use strict'

let portal

function Portal (sites) {
  this.el = document.createElement('div')
  this.el.classList.add('f1')
  this.sites = sites

  function aboutDisable () {
    if (window.location.pathname === '/about/') {
      return 'dn'
    } else {
      return 'dib'
    }
  }

  console.log(aboutDisable());

  // Templates

  function _buttons () {
    return `<p class='buttons'><a class='f2 link dim br4 bw2 ba ph5 pv3 mb2 dib black' href='#random' onClick="portal.reload('random')">Random</a> <a class='f2 link dim br4 bw2 ba ph5 pv3 mb2 black ${aboutDisable()}' href='/about'>About</a> <a class='link black' id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }

  function _directory (sites) {
    return `
    <ul class="list pl0 f1 lh-title">${sites.reduce((acc, val, id) => { return `${acc}<li><a class='link black' href='${val.siteURL}'>${val.name} ❍ ${val.siteURL.split('//')[1]}</a></li>` }, '')}</ul>\n${_buttons()}`
  }

  function _redirect (target) {
    return `<p>Redirecting to <b>${target.siteURL}</b></p><meta http-equiv="refresh" content="3; url=${target.siteURL}">
    <p class='buttons'><a class='f2 link dim br4 bw2 ba ph5 pv3 mb2 dib black' href='#' onClick="portal.reload('')">Directory</a> <a class='f2 link dim br4 bw2 ba ph5 pv3 mb2 dib black' href='#${target.siteURL}' onClick="portal.reload('random')">Skip</a> <a class='f2 link dim br4 bw2 ba ph5 pv3 mb2 dib black' href='#random' onClick="portal.reload('random')">Random</a> <a class='f2 link dim br4 bw2 ba ph5 pv3 mb2 black ${aboutDisable()}' href='/about'>About</a> <a class='link black' id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
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
    portal.install(document.body)
    portal.start()
  })
  .catch(function (reason) {
    console.log(reason.message)
  })
