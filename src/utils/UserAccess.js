export const userAccess = {
    'User': [
        '/home',
        '/workshop',
        '/view-workshop',
        '/request-workshop',
        '/view-registered-workshops',
        '/view-requested-workshops',
        '/profile'
    ],
    'Instructor': [
        '/home',
        '/workshop',
        '/view-workshop',
        '/request-workshop',
        '/create-workshop',
        '/update-workshop',
        '/delete-workshop',
        '/view-registered-workshops',
        '/view-requested-workshops',
        '/profile'
    ],
    'Admin': [
        '/home',
        '/workshop',
        '/view-workshop',
        '/create-workshop',
        '/request-workshop',
        '/update-workshop',
        '/delete-workshop',
        '/view-registered-workshops',
        '/view-requested-workshops',
        '/all-workshops',
        '/profile',
        '/all-profiles'
    ]
}

export const userNavLeftPages = {
    'USER': {
        Home: '/home',
        Workshop: {
            View: '/workshop',
            // Request_Workshop: '/request-workshop',
        },
        Activity: {
            Enrolled_Workshops: '/view-registered-workshops',
            // Requested_Skills: '/view-requested-workshops'
        }
    },
    'INSTRUCTOR': {
        Home: '/home',
        Workshop: {
            View: '/workshop',
            Create: '/create-workshop',
            // Request_Workshop: '/request-workshop',
        },
        Activity: {
            Enrolled_Workshops: '/view-registered-workshops',
            // Requested_Skills: '/view-requested-workshops'
        }
    }
}

export const userNavMenu = {
    'USER': {
        Home: '/home',
        Search: '/workshop',
        Enrolled_Workshops: '/view-registered-workshops',
    },
    'INSTRUCTOR': {
        Home: '/home',
        Search: '/workshop',
        Create: '/create-workshop',
        Enrolled_Workshops: '/view-registered-workshops',
        Request_Workshop: '/request-workshop',
        Requested_Skills: '/view-requested-workshops'
    }
}

export const userNavRightPages = {
    Profile: '/profile',
    Logout: '/logout'
}