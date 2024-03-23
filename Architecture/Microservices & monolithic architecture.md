---
tags:
  - microservices
  - monolithic
  - CodebaseDecision
author:
  - jacgit18
  - chatgpt
Purpose: This documentation discusses microservices and monolithic architecture.
Status: Done
Started: 
EditDate: 2024-03-07
Relates: "[[Project Structure]]"
Peer Reviewed: 0
dg-publish:
---




The folder architecture for a JavaScript Node.js application implementing a microservice and a monolith API can vary significantly based on the specific requirements and design choices. Here's a simplified comparison of the two:  
  
**Microservice Architecture:**  
In a microservice architecture, each microservice is a separate and independent component of the application. Each microservice often has its own codebase and folder structure. Here's a basic folder structure for a microservice:  
  
```  
/my-microservice  
/src  
/routes # API routes and controllers  
/models # Data models  
/services # Business logic  
/config # Configuration files  
/test # Unit and integration tests  
/node_modules # Dependencies  
package.json # Node.js package file  
index.js # Entry point for the microservice  
```  
  
Each microservice would have its own similar structure, and they can communicate with each other via APIs or message queues.  
  
**Monolith API:**  
In a monolithic architecture, the entire application is typically organized within a single codebase and folder structure. Here's a simplified folder structure for a monolithic API:  
  
```  
/my-monolith-api  
/src  
/routes # API routes and controllers  
/models # Data models  
/services # Business logic  
/config # Configuration files  
/test # Unit and integration tests  
/node_modules # Dependencies  
package.json # Node.js package file  
index.js # Entry point for the API  
```  

#### Check out & maybe integrate
#todo/Personal/Low/Dev 
- [ ] Read https://newsletter.techworld-with-milan.com/p/why-you-should-build-a-modular-monolith
- [ ] https://read.engineerscodex.com/p/how-airbnb-scaled-by-moving-away


In a monolith, all parts of the application are closely interconnected, and communication between different functionalities is often direct within the same codebase.  



One of the primary distinctions between microservices and monolithic APIs lies in the architectural weight of the projects. In a microservice setup, multiple services communicate with each other. In contrast, a monolithic API, while sharing some architectural characteristics with microservices, essentially represents a single service with substantial complexity. This is particularly evident in the distribution of routes, as a monolithic API tends to concentrate a significant number of routes within a single service, whereas a microservice architecture spreads routes across multiple services, each handling a smaller set of routes

  
Please note that these are simplified examples, and the actual folder structure can become more complex as your application grows. In both cases, it's essential to maintain good organization and documentation to keep your codebase manageable and understandable.






The microservice architecture is a design paradigm that structures an application into multiple independent services, each with its own database. These services exhibit the following characteristics:

- Organized around specific business capabilities
- Owned by small, dedicated teams
- Independently deployable
- Highly scalable
- Loosely coupled
- Highly maintainable and testable

One of the key benefits of microservices is the flexibility to expose certain services publicly, such as through an API, while keeping others private.

![[Microservice Roadmap.gif]]

#todo/Personal/Low/Dev 
- [ ] https://itnext.io/the-issue-with-sharing-data-in-a-microservice-architecture-d6a36f297ff5

#todo/Personal/Med/Dev 
- [ ] https://medium.com/javarevisited/50-microservices-interview-questions-for-java-programmers-70a4a68c4349
- [ ] https://medium.com/javarevisited/difference-between-microservices-and-monolithic-architecture-for-java-interviews-af525908c2d5

## When to use microservice
It makes sense to turn something into a microservice when you want to achieve scalability, maintainability, and independent deployment. However, administrative processes might not be suitable for microservices if they don't require frequent updates or scalability, and if their complexity doesn't warrant the overhead of a separate microservice. It's important to consider the trade-offs and benefits before deciding.



You can define microservices in yaml file



In the realm of microservices and software development, it's imperative that systems exhibit responsiveness, resilience, elasticity, and embrace a message-driven architecture. This ensures not only efficient handling of tasks but also enhances adaptability to varying workloads. Responsive systems promptly react to user inputs, while resilient ones gracefully recover from failures. Elasticity facilitates scalability, enabling systems to handle fluctuating demands seamlessly. Incorporating a message-driven approach promotes effective communication between components, fostering a robust and interconnected software ecosystem.




##  Strangler Design

The strangler design pattern is a popular design pattern to incrementally transform your monolithic application to microservices by replacing old functionality with a new service. Once the new component is ready, the old component is strangled and a new one is put to use.  
  
The facade interface, which serves as the primary interface between the legacy system and the other apps and systems that call it, is one of the most important components of the strangler pattern.  
  
External apps and systems will be able to identify the code associated with a certain function, while the underlying historical system code will be obscured by the facade interface. The strangler design addresses this by requiring developers to provide a façade interface that allows them to expose individual services and functions when they break them free from the monolith.  
  
You need to understand the quality and reliability of your system, whether you're working with legacy code, starting the process of "strangling" your old system, or running a newly containerized application. When anything goes wrong, you need to know how the system got there and why it went down that road.



### Strangler Facade 

The Strangler Facade is a software architectural pattern used in the context of legacy system modernization or migration. It's a gradual approach to replace or refactor an existing system without completely discarding it. Here's how it works:  
  
1. **Strangler Application**: Initially, a new system or application is built alongside the existing one, often using modern technologies and practices.  
  
2. **Routing and Decomposition**: Requests or traffic are gradually routed to the new system for specific functionalities or components. This can be done using a facade or proxy layer that determines whether to forward requests to the old or new system.  
  
3. **Incremental Replacement**: Over time, more and more functionality is moved from the old system to the new one. The old system is gradually "strangled" as its parts are replaced.  
  
4. **Decommissioning**: Eventually, when all critical functionality has been transitioned to the new system and the old system is no longer needed, it can be safely decommissioned.  
  
The Strangler Facade approach allows for a controlled, low-risk migration from legacy systems to more modern ones, reducing the chances of major disruptions and minimizing downtime.  
  
This pattern is often used in scenarios where rewriting the entire system from scratch is impractical due to cost, time, or risk constraints.


## Best Practices
When designing microservices, it's generally considered a best practice to minimize dependencies between services, promoting independence and autonomy. However, the level of inter-service communication is a nuanced decision based on your specific use case and requirements. Here are some considerations:  


![[Microservices.jpeg]]
  
### Minimizing Dependencies:  
  
1. **Autonomy:** Microservices are meant to be autonomous, independently deployable units. Minimizing dependencies allows each service to evolve independently without impacting others.  
  
2. **Resilience:** Reducing dependencies can enhance system resilience. If one service fails or undergoes changes, it's less likely to cause a cascading failure across other services.  
  
3. **Scale:** Independent services can be scaled individually, optimizing resources based on the specific needs of each service.  
  
### Inter-Service Communication:  
  
1. **Avoid Synchronous Communication:** Minimize synchronous communication between services, as it can introduce tight coupling and impact overall system performance and responsiveness.  
  
2. **Use Asynchronous Communication:** Prefer asynchronous communication patterns like message queues or event-driven architectures. This allows services to communicate without being directly dependent on each other's availability.  
  
3. **APIs for Loose Coupling:** If direct communication is necessary, expose well-defined APIs. This helps in maintaining loose coupling between services.  
  
4. **Service Mesh:** Consider using a service mesh for managing communication between microservices. Service meshes provide features like load balancing, fault tolerance, and observability.  
  
### Common Practices:  
  
1. **Event-Driven Architectures:** Many microservices architectures leverage events and message queues for communication. This allows services to react to events without direct coupling.  
  
2. **RESTful APIs:** When direct communication is necessary, RESTful APIs are commonly used. However, be cautious about overusing synchronous HTTP calls.  
  
3. **Service Discovery:** Implement service discovery mechanisms so that services can dynamically locate and communicate with each other.  
  
4. **API Gateways:** Use API gateways for managing external access to microservices. This can help in handling cross-cutting concerns like authentication, authorization, and routing.  
  
### When Direct Communication is Acceptable:  
  
1. **Bounded Context:** If two microservices are part of the same bounded context, direct communication might be acceptable. However, strive to keep dependencies minimal even within a bounded context.  
  
2. **Small Teams:** In situations where small teams manage multiple microservices, they may have more control and understanding of the interdependencies.  
  
3. **Performance Considerations:** For certain performance-critical scenarios, synchronous communication may be necessary. However, these should be carefully evaluated and optimized.  
  
In summary, while minimizing dependencies is a general best practice in microservices architecture, the appropriate level of communication between services depends on the specific requirements and constraints of your system. Always consider factors like autonomy, resilience, and scalability in your design decisions.