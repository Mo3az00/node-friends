import Sortable from 'sortablejs'
import axios from 'axios'

function sortable() {
  $('.table-sortable').each(function() {
    const table = $(this)
    const url = table.data('sortable-url') || null
    const group = table.data('sortable-group') || 'default'

    if (url === null) {
      return
    }

    Sortable.create(this.querySelector('tbody'), {
      group,
      handle: '.sortable-handle',
      animation: 150,
      store: {
        get: function (sortable) {
          return []
        },
        set: function (sortable) {
          var order = sortable.toArray()
          sortable.option('disabled', true)
  
          axios
            .post(url, {
              order
            })
            .then((response) => {
              sortable.option('disabled', false)
            })
            .catch((error) => {
              console.error(error)
              sortable.option('disabled', false)
            })
        }
      }
    });
  })
}

export default sortable