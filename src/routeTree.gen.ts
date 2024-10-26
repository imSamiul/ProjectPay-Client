/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticationSignUpImport } from './routes/_authentication/signUp'
import { Route as AuthenticationLoginImport } from './routes/_authentication/login'
import { Route as AuthenticatedProjectManagerImport } from './routes/_authenticated/projectManager'
import { Route as AuthenticatedProjectManagerManagerOverviewImport } from './routes/_authenticated/projectManager/managerOverview'
import { Route as AuthenticatedProjectManagerAllProjectsImport } from './routes/_authenticated/projectManager/allProjects'
import { Route as AuthenticatedProjectManagerAddProjectImport } from './routes/_authenticated/projectManager/addProject'
import { Route as AuthenticatedProjectManagerAddClientImport } from './routes/_authenticated/projectManager/addClient'
import { Route as AuthenticatedProjectProjectCodeImport } from './routes/_authenticated/project/$projectCode'
import { Route as AuthenticatedProjectEditProjectCodeImport } from './routes/_authenticated/project/edit/$projectCode'

// Create/Update Routes

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  path: '/signUp',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationLoginRoute = AuthenticationLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticatedProjectManagerRoute =
  AuthenticatedProjectManagerImport.update({
    path: '/projectManager',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedProjectManagerManagerOverviewRoute =
  AuthenticatedProjectManagerManagerOverviewImport.update({
    path: '/managerOverview',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectManagerAllProjectsRoute =
  AuthenticatedProjectManagerAllProjectsImport.update({
    path: '/allProjects',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectManagerAddProjectRoute =
  AuthenticatedProjectManagerAddProjectImport.update({
    path: '/addProject',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectManagerAddClientRoute =
  AuthenticatedProjectManagerAddClientImport.update({
    path: '/addClient',
    getParentRoute: () => AuthenticatedProjectManagerRoute,
  } as any)

const AuthenticatedProjectProjectCodeRoute =
  AuthenticatedProjectProjectCodeImport.update({
    path: '/project/$projectCode',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedProjectEditProjectCodeRoute =
  AuthenticatedProjectEditProjectCodeImport.update({
    path: '/project/edit/$projectCode',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/projectManager': {
      id: '/_authenticated/projectManager'
      path: '/projectManager'
      fullPath: '/projectManager'
      preLoaderRoute: typeof AuthenticatedProjectManagerImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authentication/login': {
      id: '/_authentication/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthenticationLoginImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/signUp': {
      id: '/_authentication/signUp'
      path: '/signUp'
      fullPath: '/signUp'
      preLoaderRoute: typeof AuthenticationSignUpImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authenticated/project/$projectCode': {
      id: '/_authenticated/project/$projectCode'
      path: '/project/$projectCode'
      fullPath: '/project/$projectCode'
      preLoaderRoute: typeof AuthenticatedProjectProjectCodeImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/projectManager/addClient': {
      id: '/_authenticated/projectManager/addClient'
      path: '/addClient'
      fullPath: '/projectManager/addClient'
      preLoaderRoute: typeof AuthenticatedProjectManagerAddClientImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/projectManager/addProject': {
      id: '/_authenticated/projectManager/addProject'
      path: '/addProject'
      fullPath: '/projectManager/addProject'
      preLoaderRoute: typeof AuthenticatedProjectManagerAddProjectImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/projectManager/allProjects': {
      id: '/_authenticated/projectManager/allProjects'
      path: '/allProjects'
      fullPath: '/projectManager/allProjects'
      preLoaderRoute: typeof AuthenticatedProjectManagerAllProjectsImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/projectManager/managerOverview': {
      id: '/_authenticated/projectManager/managerOverview'
      path: '/managerOverview'
      fullPath: '/projectManager/managerOverview'
      preLoaderRoute: typeof AuthenticatedProjectManagerManagerOverviewImport
      parentRoute: typeof AuthenticatedProjectManagerImport
    }
    '/_authenticated/project/edit/$projectCode': {
      id: '/_authenticated/project/edit/$projectCode'
      path: '/project/edit/$projectCode'
      fullPath: '/project/edit/$projectCode'
      preLoaderRoute: typeof AuthenticatedProjectEditProjectCodeImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedProjectManagerRouteChildren {
  AuthenticatedProjectManagerAddClientRoute: typeof AuthenticatedProjectManagerAddClientRoute
  AuthenticatedProjectManagerAddProjectRoute: typeof AuthenticatedProjectManagerAddProjectRoute
  AuthenticatedProjectManagerAllProjectsRoute: typeof AuthenticatedProjectManagerAllProjectsRoute
  AuthenticatedProjectManagerManagerOverviewRoute: typeof AuthenticatedProjectManagerManagerOverviewRoute
}

const AuthenticatedProjectManagerRouteChildren: AuthenticatedProjectManagerRouteChildren =
  {
    AuthenticatedProjectManagerAddClientRoute:
      AuthenticatedProjectManagerAddClientRoute,
    AuthenticatedProjectManagerAddProjectRoute:
      AuthenticatedProjectManagerAddProjectRoute,
    AuthenticatedProjectManagerAllProjectsRoute:
      AuthenticatedProjectManagerAllProjectsRoute,
    AuthenticatedProjectManagerManagerOverviewRoute:
      AuthenticatedProjectManagerManagerOverviewRoute,
  }

const AuthenticatedProjectManagerRouteWithChildren =
  AuthenticatedProjectManagerRoute._addFileChildren(
    AuthenticatedProjectManagerRouteChildren,
  )

interface AuthenticatedRouteChildren {
  AuthenticatedProjectManagerRoute: typeof AuthenticatedProjectManagerRouteWithChildren
  AuthenticatedProjectProjectCodeRoute: typeof AuthenticatedProjectProjectCodeRoute
  AuthenticatedProjectEditProjectCodeRoute: typeof AuthenticatedProjectEditProjectCodeRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedProjectManagerRoute:
    AuthenticatedProjectManagerRouteWithChildren,
  AuthenticatedProjectProjectCodeRoute: AuthenticatedProjectProjectCodeRoute,
  AuthenticatedProjectEditProjectCodeRoute:
    AuthenticatedProjectEditProjectCodeRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface AuthenticationRouteChildren {
  AuthenticationLoginRoute: typeof AuthenticationLoginRoute
  AuthenticationSignUpRoute: typeof AuthenticationSignUpRoute
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationLoginRoute: AuthenticationLoginRoute,
  AuthenticationSignUpRoute: AuthenticationSignUpRoute,
}

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticationRouteWithChildren
  '/projectManager': typeof AuthenticatedProjectManagerRouteWithChildren
  '/login': typeof AuthenticationLoginRoute
  '/signUp': typeof AuthenticationSignUpRoute
  '/project/$projectCode': typeof AuthenticatedProjectProjectCodeRoute
  '/projectManager/addClient': typeof AuthenticatedProjectManagerAddClientRoute
  '/projectManager/addProject': typeof AuthenticatedProjectManagerAddProjectRoute
  '/projectManager/allProjects': typeof AuthenticatedProjectManagerAllProjectsRoute
  '/projectManager/managerOverview': typeof AuthenticatedProjectManagerManagerOverviewRoute
  '/project/edit/$projectCode': typeof AuthenticatedProjectEditProjectCodeRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticationRouteWithChildren
  '/projectManager': typeof AuthenticatedProjectManagerRouteWithChildren
  '/login': typeof AuthenticationLoginRoute
  '/signUp': typeof AuthenticationSignUpRoute
  '/project/$projectCode': typeof AuthenticatedProjectProjectCodeRoute
  '/projectManager/addClient': typeof AuthenticatedProjectManagerAddClientRoute
  '/projectManager/addProject': typeof AuthenticatedProjectManagerAddProjectRoute
  '/projectManager/allProjects': typeof AuthenticatedProjectManagerAllProjectsRoute
  '/projectManager/managerOverview': typeof AuthenticatedProjectManagerManagerOverviewRoute
  '/project/edit/$projectCode': typeof AuthenticatedProjectEditProjectCodeRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_authenticated/projectManager': typeof AuthenticatedProjectManagerRouteWithChildren
  '/_authentication/login': typeof AuthenticationLoginRoute
  '/_authentication/signUp': typeof AuthenticationSignUpRoute
  '/_authenticated/project/$projectCode': typeof AuthenticatedProjectProjectCodeRoute
  '/_authenticated/projectManager/addClient': typeof AuthenticatedProjectManagerAddClientRoute
  '/_authenticated/projectManager/addProject': typeof AuthenticatedProjectManagerAddProjectRoute
  '/_authenticated/projectManager/allProjects': typeof AuthenticatedProjectManagerAllProjectsRoute
  '/_authenticated/projectManager/managerOverview': typeof AuthenticatedProjectManagerManagerOverviewRoute
  '/_authenticated/project/edit/$projectCode': typeof AuthenticatedProjectEditProjectCodeRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/projectManager'
    | '/login'
    | '/signUp'
    | '/project/$projectCode'
    | '/projectManager/addClient'
    | '/projectManager/addProject'
    | '/projectManager/allProjects'
    | '/projectManager/managerOverview'
    | '/project/edit/$projectCode'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/projectManager'
    | '/login'
    | '/signUp'
    | '/project/$projectCode'
    | '/projectManager/addClient'
    | '/projectManager/addProject'
    | '/projectManager/allProjects'
    | '/projectManager/managerOverview'
    | '/project/edit/$projectCode'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_authentication'
    | '/_authenticated/projectManager'
    | '/_authentication/login'
    | '/_authentication/signUp'
    | '/_authenticated/project/$projectCode'
    | '/_authenticated/projectManager/addClient'
    | '/_authenticated/projectManager/addProject'
    | '/_authenticated/projectManager/allProjects'
    | '/_authenticated/projectManager/managerOverview'
    | '/_authenticated/project/edit/$projectCode'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AuthenticationRoute: typeof AuthenticationRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AuthenticationRoute: AuthenticationRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/_authentication"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/projectManager",
        "/_authenticated/project/$projectCode",
        "/_authenticated/project/edit/$projectCode"
      ]
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/login",
        "/_authentication/signUp"
      ]
    },
    "/_authenticated/projectManager": {
      "filePath": "_authenticated/projectManager.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/projectManager/addClient",
        "/_authenticated/projectManager/addProject",
        "/_authenticated/projectManager/allProjects",
        "/_authenticated/projectManager/managerOverview"
      ]
    },
    "/_authentication/login": {
      "filePath": "_authentication/login.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/signUp": {
      "filePath": "_authentication/signUp.tsx",
      "parent": "/_authentication"
    },
    "/_authenticated/project/$projectCode": {
      "filePath": "_authenticated/project/$projectCode.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/projectManager/addClient": {
      "filePath": "_authenticated/projectManager/addClient.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/projectManager/addProject": {
      "filePath": "_authenticated/projectManager/addProject.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/projectManager/allProjects": {
      "filePath": "_authenticated/projectManager/allProjects.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/projectManager/managerOverview": {
      "filePath": "_authenticated/projectManager/managerOverview.tsx",
      "parent": "/_authenticated/projectManager"
    },
    "/_authenticated/project/edit/$projectCode": {
      "filePath": "_authenticated/project/edit/$projectCode.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
