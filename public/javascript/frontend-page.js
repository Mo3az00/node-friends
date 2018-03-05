// Navbar transparency + change logo

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 2) {
      $('body').addClass('scrolled')
      $('#logo-image').attr('src', '/images/node-friends-logo.png')
    } else {
      $('body').removeClass('scrolled')
      $('#logo-image').attr('src', '/images/node-friends-logo-white.png')
    }
});
