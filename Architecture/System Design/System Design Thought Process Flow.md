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
Comments: Still deciding what else makes sense to mention I might convert to a mind map or something visual like some type of decision tree.
Purpose: This documentation discusses order to talk about system in system design interview.
Status: Refinement
Started: 2024-01-04
EditDate: 2024-03-16
Version: 3.0.0
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

### Overall Architecture
In a system design choosing the right [[Impact of Architectural Styles |Architectural Styles]] is important think about what is needed and purpose of the style. In addition to that you can leverage [[When to use Domain-Driven Design |Domain Driven Design]] with some of the different styles depending on domain complexity determines weather it is necessary to use meaning the more simpler the domain is the less need for domain driven design in my opinion.

In terms of styles popular ones include [[Microservices]] which tends to be used with [[Eureka Service]] if built in Java and monolithic architecture which is an example of a centralized system. In a monolithic architecture, the entire application is built as a single, indivisible unit, making it centralized and typically deployed on a single server or a closely connected set of servers.  



#todo/Personal/High/Dev 
- [ ] Identify where to integrate [[Stateless & Statefull Processes |Stateless vs Statefull]] application or process which relates to [[VIII Concurrency |12 factor app factor 8]].
- [ ] Identify were to talk about  [[🌐 Internet Communication Process]] in terms of what you would use might be very granular or over kill could be wrong.
- [ ] Also add stuff around security, maintainability, and user experience to cover the rest of the core concepts of system design.
- [ ] maybe add stuff around circuit break pattern seems relevant to system design but you can say that about all design patterns but it seems like this one is used heavily in comparison to others patterns or one of the heavily used patterns need to verify this


You should also consider [[Fault Tolerance]] which refers to the system's resilience against failures, errors, or faults, ensuring uninterrupted operation and maintaining user experience. It encompasses proactive measures to handle failures gracefully and sustain availability. This principle applies universally across hardware, software, networks, and systems architecture. At its essence, fault tolerance anticipates failures as inevitable and seeks to minimize their impact through proactive strategies it also applies at and between each system  component. 

Depending on the Architectural Styles you then should talk and identify major components of your system like [[Physical Servers vs Virtual Servers |physical or virtual servers]] which tend to be on premises or on cloud you can talk about the [[Benefits of cloud]] talking about cloud  in terms of outsourcing functionality or infrastructure using different service architecture ranging from IAAS to SAAS and benefiting from things like availability zones and other cloud services that add fault tolerance to the overall system. 

When it comes to cloud services like AWS there are a broad range of services like include for [[Messaging systems]], [[Caches]] which if you implement locally you can improve response time, and [[Monitoring & Observability |monitoring/logging for metrics]]. You have things like Amazon MQ, Amazon ElastiCache, and Amazon CloudWatch. Alternatively if you don't want cloud solutions you can use things like [[Apache Kafka]], Redis for caching, or something like Prometheus. You also have services for things like static [[File System Storage]] services like Amazon S3 which can be used with a [[Content Delivery Network |CDN]] improving traffic and fault tolerance. 

When it comes to all these components you also want keep [[Data Flow]] in mind as well like all the different sources of data, the processing and transformation, storage, transportation and communication. Along with things like versioning, change management, and monitoring.  

There are other things like Networking components such as routers like [[Reverse proxy vs API gateway vs load balancer]].


##### Testing
#todo/Personal/High/Dev 
- [ ] update testing portion

Talk testing architecture or [[Testing Hierarchy]] maybe using [[Test Driven Development]] or talk about test automation, [[Acceptance Testing]], [[Pre Acceptance Testing]], or [[Type of Testing Techniques]]

##### Deployment
#todo/Personal/High/Dev 
- [ ] update devops portion

Maybe [[Continuous Integration |CI/CD]] which relates to [[V Build, release, run |12 factor app factor 5]]

#### Things to consider

- Talk about selecting components for system from different perspectives like how is the community support or technical documentation around the different technology options also cost.

- Talk about leveraging [[Libraries vs Building From Scratch]] and the pros and cons around that in terms of potential dependencies issues.

- Talk about API selection discuss the use of APIs for certain functionalities like auth or [[IV Backing services]].

- You can also talk about choosing tech stack based the potentially implementing a [[Migration Plan]] like sometimes the technologies you start out with doesn't make sense or you want to manage cost of your system.

- Security measures like firewalls, intrusion detection systems, encryption, and access control mechanisms are part of the Infrastructure layer to protect the application from various security threats, including unauthorized access, data breaches, and DDoS attacks. you can also talk about [[Authentication vs Authorization]].
  
- You can talk governance like [[Data Retention Target]] and [[Database data governance]] compliance, Infrastructure may include tools and processes to enforce compliance with regulatory requirements and organizational policies, ensuring data security and legal compliance. 

### Scalability and Performance
In the context of database servers and instances of your application, as well as any microservices within your codebase architecture, the concept of scaling can be categorized into [[Vertical vs Horizontal Scaling]]. Horizontal scaling is often preferred due to the limitations of vertical scaling. For instance, it's impossible to infinitely increase CPU and memory resources on a single server. Additionally, vertical scaling lacks failover and redundancy mechanisms. If one server experiences downtime, the entire website or application goes down with it completely. System tend to follow these common [[System Scalability Strategies]].

To improve system scaling and performance you can use several technologies commonly used to distribute traffic across [[server pools]] like [[Load Balancer |load balancers]] technologies like this also implement [[Load Shedding]] which improves fault tolerance.

On the database side of thing there are things like [[Database Sharding]] and [[Master-Slave Database Architecture]] which tend to be used together the workload is distributed not only horizontally across shards but also vertically within each shard. This allows for greater scalability and performance gains by parallelizing both read and write operations across multiple database servers. Additionally, using master-slave setups within each shard provides fault tolerance and high availability within each shard. If the master server in a shard fails, one of the slave servers can be promoted to the new master, ensuring continuous operation and data availability for that shard.

It's worth noting that scaling considerations can fall under administrative functionalities, whether that involves resource scaling in a cloud environment or implementing custom solutions such as creating an admin dashboard for internal use by developers. This dashboard could encompass various [[XII Admin processes]], offering insights and control over the scaling operations and other administrative tasks.


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