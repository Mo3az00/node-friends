// Navbar transparency 

window.addEventListener('scroll', function () {
  document.body.classList[
    window.scrollY > window.innerHeight / 2 ? 'add': 'remove'
  ]('scrolled');
});