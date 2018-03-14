// Navbar transparency + change logo

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 2) {
      $('body').addClass('scrolled')
    } else {
      $('body').removeClass('scrolled')
    }
});

// Smooth Scroll 

const $root = $('html, body');

$('a[href^="#"]').click(function(e) {
    e.preventDefault()

    let href = $.attr(this, 'href');
    const navbarHeight = $('.navbar').outerHeight()
    const newPosition = $(href).offset().top - navbarHeight - 10

    $root.animate({
        scrollTop: newPosition
    }, 1000);

    return false;
});