/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PlayersImport } from './routes/players'
import { Route as BracketInfoImport } from './routes/bracket-info'
import { Route as IndexImport } from './routes/index'
import { Route as PlayerIdImport } from './routes/player.$id'

// Create/Update Routes

const PlayersRoute = PlayersImport.update({
  id: '/players',
  path: '/players',
  getParentRoute: () => rootRoute,
} as any)

const BracketInfoRoute = BracketInfoImport.update({
  id: '/bracket-info',
  path: '/bracket-info',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PlayerIdRoute = PlayerIdImport.update({
  id: '/player/$id',
  path: '/player/$id',
  getParentRoute: () => rootRoute,
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
    '/bracket-info': {
      id: '/bracket-info'
      path: '/bracket-info'
      fullPath: '/bracket-info'
      preLoaderRoute: typeof BracketInfoImport
      parentRoute: typeof rootRoute
    }
    '/players': {
      id: '/players'
      path: '/players'
      fullPath: '/players'
      preLoaderRoute: typeof PlayersImport
      parentRoute: typeof rootRoute
    }
    '/player/$id': {
      id: '/player/$id'
      path: '/player/$id'
      fullPath: '/player/$id'
      preLoaderRoute: typeof PlayerIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/bracket-info': typeof BracketInfoRoute
  '/players': typeof PlayersRoute
  '/player/$id': typeof PlayerIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/bracket-info': typeof BracketInfoRoute
  '/players': typeof PlayersRoute
  '/player/$id': typeof PlayerIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/bracket-info': typeof BracketInfoRoute
  '/players': typeof PlayersRoute
  '/player/$id': typeof PlayerIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/bracket-info' | '/players' | '/player/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/bracket-info' | '/players' | '/player/$id'
  id: '__root__' | '/' | '/bracket-info' | '/players' | '/player/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BracketInfoRoute: typeof BracketInfoRoute
  PlayersRoute: typeof PlayersRoute
  PlayerIdRoute: typeof PlayerIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BracketInfoRoute: BracketInfoRoute,
  PlayersRoute: PlayersRoute,
  PlayerIdRoute: PlayerIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/bracket-info",
        "/players",
        "/player/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/bracket-info": {
      "filePath": "bracket-info.tsx"
    },
    "/players": {
      "filePath": "players.tsx"
    },
    "/player/$id": {
      "filePath": "player.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
