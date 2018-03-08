// Navbar transparency + change logo

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 2) {
      $('body').addClass('scrolled')
      $('#logo-image-white').addClass('hidden')
      $('#logo-image-green').removeClass('hidden')
    } else {
      $('body').removeClass('scrolled')
      $('#logo-image-white').removeClass('hidden')
      $('#logo-image-green').addClass('hidden')
    }
});