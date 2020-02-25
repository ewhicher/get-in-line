import Vue from 'vue'

Vue.directive(`get-in-line`, {
  bind(el, binding) {
    el.style.background = `repeating-linear-gradient(to right, transparent, rgba(203, 112, 219, 0.4) 100%)`
    const columns = binding.value ? binding.value.columns : 12
    const handleResize = () => {
      const width = el.offsetWidth
      console.log(columns, el.offsetWidth)
      el.style.backgroundSize = width / columns + `px`
    }

    Vue.nextTick(() => {
      handleResize()
    })
    window.addEventListener(`resize`, handleResize)
  },

  unbind() {
    window.removeEventListener(`resize`, handleResize)
  }
})
