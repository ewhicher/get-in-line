import Vue from 'vue'
import GetInLine from './directives/GetInLine'

new Vue({
  el: `#root`,

  data: {
    custom: {
      columns: 6,
      padding: `10px`,
      rows: `10px`
    }
  }
})
