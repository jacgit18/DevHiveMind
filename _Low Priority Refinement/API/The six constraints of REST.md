---
tags: 
author:
  - jacgit18
Status: 
Started: 
EditDate: 
Relates:
---
![[six-paths-of-pain-naruto-w2mrtj5sk0ccusoz.gif]]
How REST relates to HTTP 

client > cache > server 

Working with REST APIs, you'll most likely send your requests through HTTP. Does that mean REST and HTTP are intrinsically linked? No, but a large percentage of REST APIs are available through the web using the HTTP protocol. So although not all REST APIs use the HTTP protocol, the RESTful ones do. Let me explain. HTTP, short for HyperText Transfer Protocol, is the protocol your web browser uses to access hypertext documents on the world wide web. That world wide web lives on the internet alongside other services like SMTP for email, various instant messaging services, video streaming, and so on. As you have learned, REST is a set of six software architecture design constraints that produce a specific type of service. There's nothing in that definition of REST that stipulates that service must run on HTTP and therefore the web. You could just as easily make a REST service running on FTP or SMTP or some other protocol. REST and HTTP are not linked; they're just a convenient pairing. When a REST service runs on the web over HTTP to give us access to a web resource, we call it a RESTful API. The web platform is what makes it RESTful. In other words, if you send a request through HTTP to a REST service that meets the six constraints, that service is a RESTful API. 

Constraint number one, client-server architecture. This constraint ensures proper separation of concerns. The client manages user interface concerns, while the server manages data storage concerns. In return, we get a highly portable system where one REST service can serve many different clients and interfaces without knowing or caring what those interfaces look like or what they are doing. In short, we have a complete separation between the content and its presentation and interaction.  

Constraint number two, statelessness. No client context or information, AKA state, can be stored on the server between requests. The client is responsible for keeping track of its own session state and all requests sent from a client must be self-contained and complete. If the client's session state is relevant, it must be sent along with a request and if the server needs to store that state, it must pass it on to a database or similar service for a specific time. As an example, the server can be asked to pass on an authentication token for a set period of time to allow authenticated requests.  

Constraint number three, cacheability. Cacheing, as in storing responses for a set period of time, is an intricle part of web architecture and performance optimization. All REST responses must be clearly marked as cacheable or non-cacheable to ensure cacheing works as expected on the client end. This means cacheing responses that won't or are unlikely to change, cacheing rarely or periodically changed responses for reasonable periods of time, and blocking cacheing for constantly changing responses.  

Constraint number four, layered system. The system must be designed so the client can't know and doesn't care whether it's connected directly to the server or to an intermediary like a mirror or a CDN. This ensures scalability and also helps with security.  

Constraint number five, code on demand. Servers are allowed to transfer executable code in the form of client side JavaScript and compiled components to the client to extend and customize functionality. This is a less common use of rest. 

constraint number six, uniform interface, which breaks down into four more constraints, so it's really not a single constraint but just four more constraints. A uniform interface must use resource identification in requests. In REST systems on the web, a URI is used to send a request and that URI will specify what resource it is looking for. So a URI like authors/mortens/bio is requesting my bio as a resource. The key here is the resource is the data sitting on the server. What REST returns is a representation of that resource which can have a different format from the server resource. So, while the resource data may be stored as a table in my SQL, the return representation may be JSON or XML or even HTML. Next, a uniform interface must allow resource manipulation through representations. This means once a client has a representation of a resource, it can also modify or delete that resource. In other words, the client given the right level of access, can control what's stored on the server. Third, a uniform interface must issue self-descriptive messages. This goes for both sending and receiving REST data. Each representation must describe its own data format. So if you're receiving JSON, the response message will have its media type set to JSON. Without this information, the data cannot be reliably parsed. And fourth and finally, a uniform interface must use hypermedia as the engine of application state. This is a complicated way of saying once the client has access to a REST resource, it should be able to discover all available resources and methods through the hyperlinks provided. Request a page resource and along with the page contents, the return representation should include hyperlinks to all resources and methods available. In other words, the REST service describes its own use with every returned resource. If and only if a web-based API meets these six constraints, it can be considered a RESTful API. 

This is the underlying technique of how RESTful web services should work. RESTful basically works on the HTTP web layer and uses the below key verbs to work with resources on the server 

POST – To create a resource on the server 

GET – To retrieve a resource from the server 

PUT – To change the state of a resource or to update it 

DELETE – To remove or delete a resource from the server