/* global Two _ */

'use strict'

let portal

function Portal (sites) {
  this.el = document.createElement('div')
  this.sites = sites
  const separators = ['▤', '▥', '▦', '▧', '▨', '▩']

  // Templates

  function _separator () {
    return separators[Math.floor(Math.random() * separators.length)]
  }

  function _buttons () {
    return '<p class="buttons"><a class="f3 link br4 dim bw1 ba ph4 pv3 mb5 mr3 dib white" href="#random" onClick="portal.reload(\'random\')">Random</a>'
  }

  function _directory (sites) {
    return `
    <ul class="grid list pl0 f4-ns f4 mb5 mt5 lh-title">${sites.reduce((acc, val, id) => { return `${acc}<li class="mb3"><a class='dib dim link white' data-image='${val.image}' href='${val.siteURL}' target="_blank">${val.name} ${_separator()} <br>⤷ ${val.title ? val.title : val.siteURL.split('//')[1]}</a></li>` }, '')}</ul>\n${_buttons()}`
  }

  function _redirect (target) {
    return `<p class="f1">Redirecting to ${target.title ? target.title : ''}<br>⤷ <strong>${target.siteURL}</strong></p><meta http-equiv="refresh" content="3; url=${target.siteURL}">
    <p class='buttons'><a class='f3 link br4 dim bw2 ba ph4 pv3 mb3 mr3 dib white' href='#' onClick="portal.reload('')">Directory</a> <a class='f3 link br4 dim bw2 ba ph5 pv3 mb3 mr3 dib white' href='#${target.siteURL}' onClick="portal.reload('random')">Skip</a> <a class='f3 link br4 dim bw2 ba ph5 pv3 mb3 mr3 dib white' href='#random' onClick="portal.reload('random')">Random</a></p>`
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
  const response = await window.fetch('/sites.json')
  const data = await response.json()
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

// two.js effect

document.addEventListener('DOMContentLoaded', () => {
  const type = 'svg'
  const two = new Two({
    type: Two.Types[type],
    fullscreen: true
  }).appendTo(document.getElementById('bg-graphic'))

  Two.Resolution = 64

  const delta = new Two.Vector()
  const mouse = new Two.Vector()
  const drag = 0.15
  const radius = 14

  const ball = two.makeCircle(two.width / 2, two.height / 2, radius)
  ball.noStroke()

  _.each(ball.vertices, function (v) {
    v.origin = new Two.Vector().copy(v)
  })

  document.addEventListener('mouseenter', () => {
    two.play()
  })

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  two.bind('update', () => {
    delta.copy(mouse).subSelf(ball.translation)

    _.each(ball.vertices, function (v, i) {
      const dist = v.origin.distanceTo(delta)
      const pct = dist / radius

      const x = delta.x * pct
      const y = delta.y * pct

      const destx = v.origin.x - x
      const desty = v.origin.y - y

      v.x += (destx - v.x) * drag
      v.y += (desty - v.y) * drag
    })

    ball.translation.addSelf(delta)
  })
})
