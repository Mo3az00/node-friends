import Sortable from 'sortablejs'
import axios from 'axios'

function sortable() {
  Sortable.create(listWithHandle, {
    group: 'favorites',
    handle: '.fa.fa-bars',
    animation: 150,
    store: {
      get: function (sortable) {
        return []
      },
      set: function (sortable) {
        var order = sortable.toArray()
        sortable.option('disabled', true)

        axios
          .post('/admin/tech-favorites/update-order', {
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
}

export default sortable