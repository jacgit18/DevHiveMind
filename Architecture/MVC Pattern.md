---
tags: 
author:
  - jacgit18
Status: 
Started: 
EditDate: 
Relates:
---




// import uuid regex .test(testCompanyId) generate uuid in test file 

// uuuid package to create random uuid 

// in every param are uuid that need to be validated



This is fundamentally no different than indenting a list on a page in an old-school textbook or other document, for which the tab key was developed and included in every major typewriter design in history.


While the machine doesn’t actually care if you use tabs or spaces (unless you’re using Python or something similar in which whitespace is part of the syntax), the size of your source code will increase by the use of spaces over tabs, especially if you indent by four spaces. If you are five levels deep in a nested function and you’re indenting an expression like String str = '' with 20 spaces, that line of source code contains more indentation characters than it does code, which is truly absurd by any standard. Multiply that by hundreds (or thousands) of files, with hundreds of lines of code each, and you’re going to have MBs upon MBs of spaces everywhere.


So, at the end of the day, tabs versus spaces is truly a matter of preference, however the tab is still the character specifically designed for indentation, and using one tab character per indentation level instead of 2 or 4 spaces will use less disk space / memory / compiler resources and the like.




MVC  
  
Data layer where data model gets binded to work with in codebase


Wrote asynchronous functions between different Layers like Controller, data, model, routes, & service layer creating side effects. Utilizing request validation utils.inputPrompt

## Model

may have a sub layer for data with db conncet and interface stuff



The majority of our database tables and associations fit into an object and 

association abstraction. 

MODEL  - Sequelize / Mongoose -  Data Modeling - DB 

ORM’s are software tools that help us create objects for each table, and provide us with CRUD and association methods for each object.




## Veiw 

heavy components that only being used in certain places can be grouped with related files on the frontend 

or used to much  

reset state using redux dev tools because current log our data persist



connect post api endpoint to button manage state with redux 

creating component






react context is about managing global state. forms typically manage their 

own state and the state of their children. global state is just going to make things messy and hard to manage 

think what was context allowing you to do that you couldnt do otherwise? 

basically you refactor the parts that differ between use cases into props, then utilize those props in the form 

same thing we do when we create utility functions — we refactor the parts that are different into function inputs, then use those inputs to determine the exact behavior 

Passing in initial values as a prop, which is used by the form directly onSubmit calls a function passed in as a prop, and passes in values, then the parent of the form decides what to do with it




# Controller


service/controller layer assign things like company_Id , date, user id 

instead of client   

console log res text more



there are two separate queries happening in all endpoint: 

Determining authorization 

Getting the data we want 

you have to be careful about thinking about them separately 

authorization is determined by company type and the users role within the company, which you get from util companyAccess 

the material data itself i think is a simple query, i dont think we’ll need to do a join




does that mean I shouldn't be assigning date_created & date_modified in the post test 

we need to overwrite company_id and created_by (submitting user's id) in the service layer 

you can, it doesnt hurt anything. but we can't expect them to equal the values output by the database, because we are overwriting them in the service layer 

users arent allowed to tell us what those fields should be




An HTTP server that listens on a specific port 

• Provides access to the HTTP Request and Response 

• A URL Router 

• Maps URL paths to our backend code 

• An interface (API) to use and write our own middleware and plugins 

• Express functions that have access to the request and response objects and act on them are    middleware 

• Express is a web server framework used to create HTTP server applications and were it  responds to requests.  

• APIs,s use a myriad of HTTP utility methods and middleware


Instead of you making a request to the API provider, the Webhook provider makes a request to you. Your code receives the request, then does something with it. Examples of Webhook requests would be Stripe sending you a notification you about a new payment or IFTTT sending you a notification of a new tweet from your Twitter account. 

WebSocket is a protocol used to establish a two-way streaming communication channel over a single Transport Control Protocol (TCP) connection. Although the protocol is generally used between a web client (e.g., a browser) and a server, it’s sometimes used for server-to-server communication, as well.


```typescript
route: '/:company_id/project/:project_id/letter/:id',  // arbritary val 
```

When strin matches route can be reasigned values but they are essential unassigned vairiable names to be references but not connected to anything






## Tacflo codebase stuff

If table doesn’t show comment out return of down in knex js and try rollback all and uncomment return of down and run latest 

wherever we have company ID as a foreign key throughout these migration files, please add an index on that field.  

// change order is a parent of letters so dont need foreign keys of company, letter, project, & action what about change order makes it the parent of letter 

only subs have crew in the context of a company  

but crew can be  but admin in other companies  

include anything not null-able in fixture  

create-companies-table 

for increment(id) dont use uuid use interger  

index is a binary tree that search   

when building db start db without foreign keys 

Monolith Api   does all api things   alternative is microservice more complicate   router what is called  every router typically have a controller   controller should(call services ) auth  data validation 

error handling  

  no side effect in controller like logging and other stuff    service handles sideEffect  

need level of detail from project team to formulate business logic 

How to structure post request to retrieve jwt



No, im not a huge fan of code coverage metrics for apps like ours. If we were making a library or a 3rd party type API it would be different 

[https://stackoverflow.com/questions/16633246/code-coverage-with-mocha](https://stackoverflow.com/questions/16633246/code-coverage-with-mocha)



similar 

router[route.method](route.route, route.controllerFn) 

get(route.route, route.controllerFn) 

router({"get", /addrandom", projectController.createRandomProject)





vision next months 

sideeffect not in controller could be in service like have service send an email or something  

the reason date_end and date_start can be modified is because they describe the ticket itself. we dont allow them to update or change date_created or date_modified because those are for our TracFlo internal use. 

things to know for interview when it comes to react  

I like react because it has a unidirectional flow from parents to children  

I hated props  

you get bugs if you have index as key so always have key 

lifeCycle methods 

hooks 

optimization pure components, memo, useMemo & callback  

use redux with redux tool on large project for sall context api and reducer 

user role 

crew 

crew members 

fxture are statc data for testng instead of dataase data whch can change  

psql -U postgres -W //login to postgresql 

figure out how to setup postgres  better 

endpoint auth wrappers on endpoints






