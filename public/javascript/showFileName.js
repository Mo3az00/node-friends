const photoInput = window.document.querySelector('#photo')
const photoName = window.document.querySelector('#photo-button')
photoInput.addEventListener("change", function () {
  photoName.innerHTML = this.value.replace(/^.*\\/, "")
})

const avatarInput = window.document.querySelector('#avatar')
const avatarName = window.document.querySelector('#avatar-button')
avatarInput.addEventListener("change", function () {
  avatarName.innerHTML = this.value.replace(/^.*\\/, "")
})