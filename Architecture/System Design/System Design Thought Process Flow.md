---
tags:
  - interview
  - architecturalParadigm
  - systemDesign
  - systemComponent
  - systemHealth
  - distributedSystem
  - OrderOfOperations
  - favorite
author:
  - jacgit18
  - chatgpt
Comments: Still cleaning up this documentation I might convert to a mind map or something visual like some type of decision tree.
Purpose: This documentation discusses order to talk about system in system design interview.
Status: Refinement
Started: 2024-01-04
EditDate: 2024-01-26
Version: 2.8.0
Relates: 
Peer Reviewed: 0
dg-publish:
---
![[System design core concepts.gif]]
### Step 1: Requirements Gathering 
> **Establish a Understanding and Design Scope of problem (3 - 10 minutes)

During this phase, it's pivotal to establish the system's scope and priorities while gathering  [[Business Requirements Life cycle|Business Requirements]]. For instance, when tasked with designing an Instagram Reels feature, it's essential to deconstruct the problem into distinct use cases, delineating interactions among system components. Key requirements such as anticipated traffic, data volume, latency, and scalability should be identified. Inquire about the [[Userbase]]type, as this insight aids in resource estimation and governance considerations, especially regarding scalability implications, such as underage user base scenarios. Understanding potential constraints and bottlenecks that may emerge with an expanding user base is imperative. This insight informs decisions regarding database considerations, determining whether a NoSQL or SQL database aligns with specific needs and data characteristics.
#### [[Use Case vs User Story |User Story]] Example:
>[!important]
>Creating stories helps with building data model, also if dealing with complex feature might want to consider using Use Cases over Stories.
1. As a user I want to upload picture and videos to share.
2. As a user I want to view uploaded photos and videos.
3. As a user I want to follow, like, and comment on posts.
4. As a user I want to see a feed containing posts from friends.
5. As a user I want to block or unfollow other users.

### Step 2: Design Deep Dive (15 - 25 minutes)
>[!important]
When crafting your design, prioritize a forward-thinking approach that anticipates future functionality. Ensure flexibility to seamlessly accommodate expansions and enhancements. Focus on constructing a foundation that facilitates scalability, simplifying the integration of additional features down the line. Adopt a holistic mindset, anticipating potential modifications and advancements, and ensure the architecture remains adaptable to evolving requirements. This proactive approach fosters a more sustainable and extensible system over time.

*Delve into the design by following the flow from Database ▶ Server/Services (Architecture) ▶ Client Side design.

For more info read 
#todo/Personal/High/Dev  
- [ ] [[System Design Interview An Insider’s Guide.pdf]] and [[System Design Interview - An Insider's Guide Second Edition|System Design notes]] on this book.
- [ ] [[Designing Data-Intensive Applications The Big Ideas Behind Reliable, Scalable, and Maintainable Systems by Martin Kleppmann (z-lib.org).pdf |Designing Data-Intensive Applications]]
- [ ] [[Software Architecture The Hard Parts Modern Trade-Off Analyses for Distributed Architectures (Neal Ford, Mark Richards, Pramod Sadalage etc.) (z-lib.org).pdf |Software Architecture The Hard Parts]]
### Data Design & Database Architecture 
  - Create an Entity Relationship Diagram (ERD) to define relationships.
  - Consider SQL for structured data and NoSQL for unstructured data.
  - More things to think about when deciding between [[Choosing Database]] 
  - What type of [[Schema Design]] makes sense.

Performance
  - you can also talk about [[Database Sharding]].
  
  - You can also talk about [[Master-Slave Database Architecture]] in terms of replication and high availability
  - Talk about 
    - [[Data Retention Target]]
    - [[Data Flow]]

### Domain Driven Design(Possible Pathway)
[[When to use Domain-Driven Design]] still refining domain driven design documentation depending on domain complexity determines weather it is necessary to use meaning the more simpler the domain is the less need for domain driven design in my opinion.

### Overall Architecture
- If your thinking of Architectural Styles like for example Monolithic Architecture identify the specifics around it and talk about it maybe compare in contrast it to other [[Architectural Styles]].

- Depending on the Architectural Styles you then should talk and identify major components of your system like physical or virtual servers, databases, [[Caches]],  [[Messaging systems]], [[Monitoring & Observability |monitoring/logging for metrics]], and [[Benefits of cloud |cloud infrastructure]] talking about cloud  in terms of outsourcing functionality or infrastructure using different service architecture ranging from IAAS to SAAS.
  
- Talk about selecting components for system from different perspectives like how is the community support or technical documentation around the different technology options also cost.

- You can also talk tech stack compatibility in the context of planing out a [[Migration Plan]] like sometimes the technologies you start out with don't make sense or you want to manage cost of your system.

- You can maybe talk about [[File System Storage]] services like Amazon S3.
  
- Networking components such as routers, [[Load Balancer]], firewalls, and Content Delivery Networks ([[Content Delivery Network |CDN]]) play a crucial role in ensuring that data is transmitted efficiently between clients and servers. Load balancers distribute incoming traffic to multiple servers for load distribution and redundancy.
  
- Security measures like firewalls, intrusion detection systems, encryption, and access control mechanisms are part of the Infrastructure layer to protect the application from various security threats, including unauthorized access, data breaches, and DDoS attacks.
  
- **Compliance and Governance***: Infrastructure may include tools and processes to enforce compliance with regulatory requirements and organizational policies, ensuring data security and legal compliance.

- Maybe CI/CD stuff
- Consider the use of APIs for certain functionalities.
- Discuss [[Stateless & Statefull Processes |Stateless vs Statefull]] application or process.
- Maybe talk [[Microservices]](might not be relevant since small scope) or leverage knowledge of [[12 Factor App Docker.canvas|12 Factor App Docker]] which has some overlap with everything mentioned, whatever comes to mind also [[Eureka Service]] for microservices.
- Making [[Event-driven Architectural Pattern Decisions]].
- Maybe talk testing architecture or [[Testing Hierarchy]] maybe using [[Test Driven Development]] or talk about test automation, [[Acceptance Testing]], [[Pre Acceptance Testing]],[[Type of Testing Techniques]]

### Scalability and Performance
  - Distribute traffic across server pools for different types of traffic. talk about different trade-offs.
  
  - Implement local cache for improved response time.

  - You can talk about [[Vertical vs Horizontal Scaling]] in the context of database servers and instances of your application along with any microservices if you include that in your codebase architecture. Side note scaling can fall under Admin functionality weather that is resource scaling in a cloud environment or some custom built solution like creating an admin dashboard for internal use by developers with a frontend that includes different [[XII Admin processes]].
  
  - Horizontal scaling is often more desirable since vertical scaling limitations like it is impossible to add unlimited CPU and memory to the server and it lacks fail over and redundancy if one server goes down the website app goes down with it completely 

  


#todo/Personal/High/Dev 
- [ ] Talk about centralized systems in comparison to decentralized systems which is mostly covered here need to research more about centralized systems 
- [ ] monolithic architecture is an example of a centralized system. In a monolithic architecture, the entire application is built as a single, indivisible unit, making it centralized and typically deployed on a single server or a closely connected set of servers.
- [ ] Also add stuff around security, maintainability, and user experience to cover the rest of the core concepts of system design.
- [ ] Integrate and talk [[Fault Tolerance]]
- [ ] look into talk about Load shedding and distributed Locking
- [ ] maybe add stuff around circuit break pattern seems relevant to system design but you can say that about all design patterns but it seems like this one is used heavily in comparison to others patterns or one of the heavily used patterns need to verify this
- [ ] Look into https://blog.quastor.org/p/rate-limiting-stripe
- [ ] talk picking languages and libraries and frameworks
- [ ] Talk [[🌐 Internet Communication Process]] in terms of what you would use
- [ ] [[System Scalability Strategies]]
- [ ] [[Network Infrastructure to use]]
- [ ] [[System Design interview Scope]]



### Step 3: Wrap Up(3 - 5 minutes)
Summarize key design decisions, highlighting any alternative considerations. Invite questions and address outstanding concerns.

# Talking Stats 

### Data Size:
| Unit          | Equivalent in Bytes                    |
|---------------|----------------------------------------|
| 1 Kilobyte    | 1,024 Bytes                             |
| 1 Megabyte    | 1,024 Kilobytes = 1,048,576 Bytes       |
| 1 Gigabyte    | 1,024 Megabytes = 1,073,741,824 Bytes    |
| 1 Terabyte    | 1,024 Gigabytes = 1,099,511,627,776 Bytes|
| 1 Petabyte    | 1,024 Terabytes = 1,125,899,906,842,624 Bytes|

### Time:
| Calculation                            | Result                       |
|----------------------------------------|------------------------------|
| 60 seconds * 60 minutes                | 3,600 seconds per hour       |
| 3,600 seconds * 24 hours               | 86,400 seconds per day       |
| 86,400 seconds * 30 days               | 2,592,000 seconds per month  |

### Number Places:
- 300 hundred
- 600,000 thousand
- 900,000,000 million
- 120,000,000,000 billion
- 150,000,000,000,000 trillion

## Traffic Estimate Example:

### Network Traffic Estimate Example:
- Active users Posting: 10 million `POST Request`
- User Post viewed: 30 views per user or 30 `GET Request`
- GET traffic = 300 million (10 million * 30)
- `GET Requests` total traffic per second: 3,000 (300 million / 86,400 seconds)
- Active user `POST Request` per second: 115 (10 million / 86,400 seconds)

### Memory Storage Estimate Example:
- Cache for Instagram highlights: 150 GB (300 million requests * 500 bytes)
- Adjusted cache: 30 GB (20% of 150 GB)
- Total memory: 90 GB (30 GB * 3 for replication)

### Bandwidth:
- Bandwidth required: 450,000 GB (300 million(Active users) * 1.5 MB)
- Bandwidth per second: 5.2 GB (450,000 GB / 86,400 seconds in a day)

### Storage:
- Daily storage for writes: 15 TB (10 million writes * 1.5 MB)
- Yearly storage: 55 PB (15 TB * 365 days * 10 years)

### Summary:
- Traffic: Daily active users * average reads and writes per user
- Memory: Read requests per day * average request size * 20%
- Bandwidth: Requests per day * average request size
- Storage: Writes per day * size of write * time to store data


# Alt Design
### Music Streaming Service Estimation:

**Assumptions:**
- Average song duration: 3 minutes
- Average songs played per hour per user: 20 songs
- Average daily active users: 10 million
- Average hours of music played per user per day: 3 hours
- Number of days in a month: 30

#### Math Problem:

1. **Daily Usage Estimation:**
   - Songs played per user per day: 20 songs/hour * 3 hours = 60 songs
   - Total daily songs played: 60 songs/user * 10 million users = 600 million songs
   - Total daily music duration: 600 million songs * 3 minutes/song = 1,800 million minutes

2. **Monthly Usage Estimation:**
   - Total monthly music duration: 1,800 million minutes * 30 days = 54,000 million minutes

3. **Conversion to Seconds:**
   - Total monthly music duration in seconds: 54,000 million minutes * 60 seconds/minute = 3,240,000 million seconds

### Why This Information Matters:

**Throughput Considerations:**
- The system needs to handle a massive volume of song requests and streaming data.
- Infrastructure must support concurrent users and maintain low latency during high usage periods.
- Designing the database, server architecture, and network bandwidth should accommodate this estimated daily and monthly load.
- Ensuring scalability is crucial to handle potential growth in user base and usage patterns.

This estimation allows us to properly design and dimension the infrastructure to meet the demands of the music streaming service, ensuring a smooth and responsive user experience.



![[System Design Cheatsheet.gif]]


![[System Design BluePrint.jpg]]

## Advance Roadmap
![[system-design.pdf]]