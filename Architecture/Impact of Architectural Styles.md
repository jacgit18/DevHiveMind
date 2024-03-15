---
tags:
  - architecturalPatterns
  - monolithic
  - microservices
  - REST
  - SOA
  - eventDriven
author:
  - jacgit18
  - chatgpt
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses Impact of Architectural Styles.
Status: Done
Started: 
EditDate: 2024-03-06
Relates: 
Peer Reviewed: 0
dg-publish:
---
When it comes to architectural styles they can man have a major effect on the components of a system. 
> Alot of these stlyes fall under event driven architecture

The chosen architecture significantly influences how different components interact, scale, and maintainability. Let's explore how these architectural styles affect key components:  
  
1. **Monolithic Architecture:**  
   - **Components:**  
    - In a monolithic architecture, all components (e.g., user interface, business logic, and data access) are tightly integrated into a single, unified codebase for the entire application.  
   - **Impact:**  
    - Simplifies development and deployment but can lead to challenges in scalability and maintainability as the application grows.  
    - Scaling typically involves replicating the entire monolith.  
  
2. **Microservices Architecture:**  
	- **Components:**  
		- Decomposes the system into independently deployable and scalable services, each responsible for specific business capabilities.  
	- **Impact:**  
		- Enhances scalability, as individual services can scale independently.  
		- Facilitates independent development and deployment of services, promoting agility.  
		- Requires robust service communication mechanisms, often relying on APIs and message queues.  
	
3. **Event-Driven Architecture (EDA):**  
	- **Components:**  
		- Components communicate through events and event handlers.  
	- **Impact:**  
		- Enables loosely coupled components, making it easier to adapt and extend the system.  
		- Supports real-time processing and responsiveness.  

4. **Event-Driven Microservices:**  
	- **Components:**  
		- Combines microservices with event-driven architecture, where services communicate through events.  
	- **Impact:**  
		- Enhances decoupling between services, fostering flexibility and scalability.  
		- Supports asynchronous communication patterns.  
  
5. **Service-Oriented Architecture (SOA):**  
	- **Components:**  
		- Similar to microservices but may have larger, more coarse-grained services that communicate through standardized protocols.  
	- **Impact:**  
		- Promotes service reusability and interoperability across different systems.  
		- Centralized service orchestration may be used to coordinate interactions between services.  
  

  
6. **Serverless Architecture:**  
	- **Components:**  
		- Components are implemented as functions that are executed in response to events or triggers.  
	- **Impact:**  
		- Abstracts away infrastructure management, allowing developers to focus on code.  
		- Scales automatically based on demand.  
  
7. **Layered Architecture:**  
	- **Components:**  
		- Divides the system into logical layers (presentation, business logic, data access).  
	- **Impact:**  
		- Separation of concerns simplifies maintenance and facilitates modular development.  
		- Each layer can be independently replaced or upgraded.  
  

8. **CQRS (Command Query Responsibility Segregation):**  
	- **Components:**  
		- Separates read and write operations, using different components for each.  
	- **Impact:**  
		- Optimizes performance for read-heavy or write-heavy workloads.  
		- Facilitates scaling based on specific types of operations.  


9. **Component-Based Architecture:**  
   - **Components:**  
     - Building the system using reusable and replaceable software components.  
   - **Impact:**  
     - Encourages modular design, facilitating component reuse and system scalability.  
     - Enhances maintainability by isolating changes within individual components.

10. **Hexagonal (Ports and Adapters) Architecture:**  
   - **Components:**  
     - Focusing on the separation of concerns by defining clear boundaries between components.  
   - **Impact:**  
     - Promotes testability and flexibility by decoupling application logic from external dependencies.  
     - Enables easier integration of new features and technologies without impacting existing code.

11. **Blockchain Architecture:**  
   - **Components:**  
     - Implementing a decentralized and distributed ledger system.  
   - **Impact:**  
     - Provides immutability, transparency, and trust through distributed consensus mechanisms.  
     - Enables secure and tamper-resistant data storage and transactions.

12. **Client-Server Architecture:**  
   - **Components:**  
     - Separating the user interface (client) from the backend (server) to enable communication between them.  
   - **Impact:**  
     - Facilitates scalability by distributing processing tasks between clients and servers.  
     - Enables multi-platform support and centralizes business logic and data management.

13. **RESTful Architecture:**  
   - **Components:**  
     - Using Representational State Transfer principles for designing networked applications.  
   - **Impact:**  
     - Promotes interoperability, scalability, and simplicity in distributed systems.  
     - Enables stateless communication and resource-based interactions via HTTP methods.

These additional architectural styles further illustrate the diverse approaches available for designing software systems, each with its own principles, benefits, and considerations.
  
When discussing system design, the choice of architectural style shapes the interactions, dependencies, and scalability of various components. It influences how components are developed, deployed, and maintained, impacting the overall system's agility, resilience, and ability to meet business requirements. The decision on the architectural style should align with the specific needs and goals of the project.