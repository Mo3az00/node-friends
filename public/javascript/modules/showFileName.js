function showFileNames() {
  document.querySelectorAll('.filename-button').forEach((item) => {
    const input = item.querySelector('input')
    const button = item.querySelector('button')

    input.addEventListener('change', function (e) {
      button.innerText = this.value.replace(/^.*\\/, "")
    })
  })
}

export default showFileNames