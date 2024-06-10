---
tags: 
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
The design implicitly uses dependency injection by importing and using modules and services:  
  
Dependency Injection: Modules like exampleService, exampleData, and exampleRouter are injected where needed, promoting modularity and separation of concerns.


index js

export { default as tvShowRouter } from "./TvShowRouter.ts";

export { default as exampleRouter } from "./exampleRouter.ts";


tv show router js

import tvShowController from "../controllers/TvShowController.ts"

import { RouterEntry, routerFactory } from "./util.ts"

  

const exampleRoutes: RouterEntry[] = [

{

method: 'post',

route: '/',

middlewares:[],

controllerFn: tvShowController.createShow

}

,

{

method: 'get',

route: '/:id',

middlewares:[],

controllerFn: tvShowController.getShowInfo

},

{

method: 'put',

route: '/:id/episodes',

middlewares:[],

controllerFn: tvShowController.updateFullShow

},

{

method: 'patch',

route: '/:id/ratings',

middlewares:[],

controllerFn: tvShowController.updatePartialShow

},

{

method: 'delete',

route: '/:id',

middlewares:[],

controllerFn: tvShowController.deleteShow

}

]

  

export default routerFactory(exampleRoutes)