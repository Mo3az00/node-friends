const moment = require('moment')

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// Date and time formatting
exports.moment = moment

// Main navigation (currently supports max. 1 sub-level)
exports.navigationMain = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About Us',
        href: '#about'
    },
    {
        name: 'Tecnologies',
        href: '#tech'
    },
    {
        name: 'The Team',
        href: '#team'
    },
    {
        name: 'Contact',
        href: '#contact'
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