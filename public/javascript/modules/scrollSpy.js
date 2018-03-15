const scrollspy = document.querySelector('#frontnav')

if (scrollspy) {
  $('body').scrollspy({ target: '#frontnav' })
  $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {
    $('nav-link').addClass("active")
  })
  $('a').on('click', function (e) {
    var href = $(this).attr('href')
    if (href.search('#') > -1) {
      var targetId = href.replace(/#/, '')
      if (targetId.length > 0 && $('#' + targetId)) {
        e.preventDefault()

        $('html, body').animate({
          scrollTop: $("#" + targetId).offset().top
        }, 1000)
      }
    }
  })
}

export default scrollSpy