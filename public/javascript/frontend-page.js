// Navbar transparency + change logo

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 2) {
      $('body').addClass('scrolled')
    } else {
      $('body').removeClass('scrolled')
    }
});