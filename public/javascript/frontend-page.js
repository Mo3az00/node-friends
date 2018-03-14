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

$('a[href^="#"]').click(function() {
    let href = $.attr(this, 'href');

    $root.animate({
        scrollTop: $(href).offset().top
    }, 1000, function () {
        window.location.hash = href;
    });

    return false;
});