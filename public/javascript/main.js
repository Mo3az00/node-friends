// node modules
import 'bootstrap'

// styles
import '../sass/main.scss'

// own modules
import contactForm from './modules/contactForm'

// Get the height of the navbar
const navbarHeight = $('.navbar').outerHeight()

// Navbar change on scroll
if (!$('body').hasClass('profile')) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight / 2) {
      $('body').addClass('scrolled')
    } else {
      $('body').removeClass('scrolled')
    }
  })
}

// Smooth Scrolling for links
const $root = $('html, body')

$('a[href^="#"]').click(function (e) {
  e.preventDefault()

  let href = $.attr(this, 'href')
  const newPosition = $(href).offset().top - navbarHeight - 10

  if (history.pushState) {
    history.pushState(null, null, href)
  }

  $root.animate({
    scrollTop: newPosition
  }, 1000, function () {
    if (!history.pushState) {
      location.hash = `/${href}`
    }
  })

  return false
})

// Scroll spy
const scrollspy = document.querySelector('#nav-main')

if (scrollspy) {
  $('body').scrollspy({
    target: '#nav-main',
    offset: navbarHeight + 11
  })

  $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {
    $('nav-link').addClass('active')
  })
}

// Contact Form
contactForm()
