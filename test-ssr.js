var microcomponent = require('.')
var test = require('tape')
var html = require('bel')

test('integration: server', function (t) {
  t.plan(5)

  function PlainComponent () {
    var component = microcomponent('plaincomponent')
    component.on('render', render)
    component.on('update', update)
    component.on('load', load)
    component.on('unload', unload)

    return component

    function render () {
      t.ok(true, 'component: render')
      return html`
        <div>
          <div></div>
        </div>
      `
    }

    function update (props) {
      return false
    }

    function load () {
      t.ok(true, 'component: load')
    }

    function unload () {
      t.fail('component: unload')
    }
  }

  var plainComponent = PlainComponent()
  var state = {
    count: 0
  }

  function render () {
    var el = html`
      <div>
        <h1>count is ${state.count}</h1>
        ${plainComponent.render()}
      </div>
    `
    return el
  }

  function update () {
    t.ok(true, 'update')
    var newElement = render()
    t.equal(/count is 1/.test(newElement.toString()), true, 'updated')
  }

  var el = render()
  t.equal(/count is 0/.test(el.toString()), true, 'rendered')

  setTimeout(function () {
    state.count++
    update()
  }, 1000)
})
