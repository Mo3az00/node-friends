const moment = require('moment')

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// Date and time formatting
exports.moment = moment

// Generate an image placeholder
exports.placeholderImage = function (width, height, icon) {
	return `
		<div class="placeholder-image" style="width: ${width}px; height: ${height}px;">
			<i class="placeholder-image-icon fa fa-${icon}"></i>
		</div>
	`
}

// Main navigation (currently supports max. 1 sub-level)
exports.navigationMain = [
	{
		name: 'Home',
		href: '/'
	},
	{
		name: 'Link',
		href: '#'
	},
	{
		name: 'Disabled',
		href: '#',
		class: 'disabled'
	},
	{
		name: 'Dropdown',
		href: '#',
		childs: [
			{
				name: 'Action',
				href: '#'
			},
			{
				name: 'Another Action',
				href: '#'
			},
			{
				name: 'Something else here',
				href: '#'
			},
		]
	}
]

/*
 * DASHBOARD
 */
exports.adminSidebarNavigation = (user) => {
	if (!user) {
			return [
					{
							href: '/admin/login',
							icon: 'sign-in',
							title: 'Please login'
					}
			]
	}

	let navigation = [
			{
					href: '/admin',
					icon: 'th-large',
					title: 'Dashboard'
			},
			{
					href: '/admin/students',
					icon: 'users',
					title: 'Students'
			},
			{
					href: '/admin/absence-reports',
					icon: 'envelope',
					title: 'Absence Reports'
			}
	]
	
	if (user.role === 'teacher') {
			navigation = navigation.concat([
					{
							href: '/admin/homepage-technologies',
							icon: 'code',
							title: 'Technologies'
					},
					{
							href: '#',
							icon: 'cog',
							title: 'Settings'
					},
			])
	} else {
			navigation = navigation.concat([
					{
							href: '/admin/tech-favorites',
							icon: 'list',
							title: 'Tech Favorites'
					},
					{
							href: '/admin/projects',
							icon: 'code',
							title: 'Projects'
					},
			])
	}

	return navigation
}