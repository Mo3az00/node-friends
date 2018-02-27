function dropDownHover(selector) {

	$(selector).each(function (item) {
		this.addEventListener('mouseover', function (e) {
			$(this).dropdown('toggle')
		})

		this.addEventListener('mouseout', function (e) {
			$(this).dropdown('toggle')
		})
	})
}

export default dropDownHover