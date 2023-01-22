export type RouteData = {
  path: string,
  isProtected: boolean
}

export type TListRoutes = Record<string, RouteData>;

export const listRoutes: TListRoutes = {
  base: {
    path: '/',
    isProtected: false
  },
  signin: {
    path: '/signin',
    isProtected: true
  },
  pageNotFound: {
    path: '/404',
    isProtected: false
  },
  pageError: {
    path: '/500',
    isProtected: false
  },
  login: {
    path: '/login',
    isProtected: true
  },
  // dialog: {
  //   path: '/dialog',
  //   isProtected: false
  // },
  profile: {
    path: '/profile',
    isProtected: false
  },
  profileEdit: {
    path: '/profileEdit',
    isProtected: false
  },
  passwordEdit: {
    path: '/passwordEdit',
    isProtected: false
  }
}

export function getRouteData(path: string): RouteData | undefined {
  for (let routeName in listRoutes) {
    if (path === listRoutes[routeName].path) {
      return listRoutes[routeName];
    }
  }
}
