import Vue from 'vue'

Vue.directive(`get-in-line`, {
  bind(el, binding) {
    // defaults
    let visible = false
    let columns = 12
    let padding = `1rem`
    let rows = `1rem`

    // user
    if (binding.value) {
      if (`visible` in binding.value) {
        visible = binding.value.visible
      }

      if (`columns` in binding.value) {
        columns = binding.value.columns
      }

      if (`padding` in binding.value) {
        padding = binding.value.padding
      }

      if (`rows` in binding.value) {
        rows = binding.value.rows
      }
    }

    // grids
    let columnGrid = document.createElement(`span`)
    columnGrid.setAttribute(`id`, `getInLineColumnGrid`)
    columnGrid.style.position = `absolute`
    columnGrid.style.top = `0`
    columnGrid.style.bottom = `0`
    columnGrid.style.left = `0`
    columnGrid.style.right = `0`
    columnGrid.style.zIndex = `999999`
    columnGrid.style.opacity = `.25`
    columnGrid.style.pointerEvents = `none`
    columnGrid.style.backgroundImage = `repeating-linear-gradient(
      to right,
      fuchsia,
      fuchsia ${padding},
      aqua calc(${padding} + 1px),
      aqua calc(100% - ${padding}),
      hotpink calc(100% - ${padding} + 1px),
      hotpink 100%
    )`

    let rowGrid = document.createElement(`span`)
    rowGrid.setAttribute(`id`, `getInLineRowGrid`)
    rowGrid.style.position = `absolute`
    rowGrid.style.top = `0`
    rowGrid.style.bottom = `0`
    rowGrid.style.left = `0`
    rowGrid.style.right = `0`
    rowGrid.style.zIndex = `999999`
    rowGrid.style.opacity = `.25`
    rowGrid.style.pointerEvents = `none`
    rowGrid.style.backgroundImage = `repeating-linear-gradient(
      to bottom,
      transparent,
      transparent calc(${rows} - 1px),
      red ${rows}
    )`

    // methods
    const handleResize = () => {
      const width = el.offsetWidth
      columnGrid.style.backgroundSize = width / columns + `px`
    }

    const handleToggle = (event) => {
      const e = event || window.event
      if (e.code === `KeyG`) {
        if (visible) {
          el.removeChild(columnGrid)
          el.removeChild(rowGrid)
        } else {
          el.appendChild(columnGrid)
          el.appendChild(rowGrid)
        }
        visible = !visible
      }
    }

    // init
    Vue.nextTick(() => {
      handleResize()
      if (visible) {
        el.appendChild(columnGrid)
        el.appendChild(rowGrid)
      }
    })

    window.addEventListener(`resize`, handleResize)
    document.addEventListener(`keypress`, handleToggle)
  },

  unbind() {
    window.removeEventListener(`resize`, handleResize)
    document.addEventListener(`keypress`, handleToggle)
  }
})
