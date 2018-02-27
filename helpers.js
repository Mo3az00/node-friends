// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

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

exports.sidenav = [
    {
        href: '#',
        icon: 'th-large',
        title: 'Dashboard'
    },
    {
        href: '#',
        icon: 'users',
        title: 'Students'
    },
    {
        href: '#',
        icon: 'envelope',
        title: 'Absence Report'
    },
    {
        href: '#',
        icon: 'list',
        title: 'Tech Favourites'
    },
    {
        href: '#',
        icon: 'code',
        title: 'Projects'
    },
]