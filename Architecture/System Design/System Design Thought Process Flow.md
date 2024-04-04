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
Relates: "[[System Design interview Scope]]"
Peer Reviewed: 0
dg-publish:
---
![[System design core concepts.gif]]
For more info read 
#todo/Personal/High/Dev  
- [ ] [[System Design Interview An Insider’s Guide.pdf]]
- [ ] [[Designing Data-Intensive Applications The Big Ideas Behind Reliable, Scalable, and Maintainable Systems by Martin Kleppmann (z-lib.org).pdf |Designing Data-Intensive Applications]]
- [ ] [[Software Architecture The Hard Parts Modern Trade-Off Analyses for Distributed Architectures (Neal Ford, Mark Richards, Pramod Sadalage etc.) (z-lib.org).pdf |Software Architecture The Hard Parts]]
- [ ] [[Alex Petrov - Database Internals_ A Deep Dive into How Distributed Data Systems Work-O'Reilly Media (2019).pdf |Database Internals_ A Deep Dive into How Distributed Data Systems Work]]
- [ ] https://www.slideshare.net/jboner/scalability-availability-stability-patterns
- [ ] https://betterprogramming.pub/graphic-design-for-software-engineers-and-architects-c616bb6c3366
- [ ] https://medium.com/@karan99/system-design-netflix-6962b4f6222
- [ ] https://interviewnoodle.com/algorithms-you-need-to-know-before-you-take-that-systems-design-interview-671608d61741
- [ ] https://www.workfall.com/learning/blog/how-to-set-up-an-aws-cloudfront-distribution-to-speed-up-content-delivery/
- [ ] https://kasunprageethdissanayake.medium.com/tinder-fully-explained-system-design-and-architecture-1225ecdfe64e
- [ ] https://www.outsystems.com/tech-hub/app-dev/technical-debt/#what-is-technical-debt
- [ ] Refine and trim cloud notes not trying to document to many stuff just key details and relationships and stuff that may actually come up.

Throughout the designing of the system you can discuss [[Fault Tolerance]] which refers to the system's resilience against failures, errors, or faults, ensuring uninterrupted operation and maintaining user experience by reducing system downtime. It encompasses proactive measures to handle failures gracefully and sustain availability. This principle applies universally across hardware, software, networks, and systems architecture. At its essence, fault tolerance anticipates failures as inevitable and seeks to minimize their impact through proactive strategies it also applies at and between each system component. 

### Step 1: Requirements Gathering 
> **Establish a Understanding and Design Scope of problem (3 - 10 minutes)

During this phase, it's pivotal to establish the system's scope and priorities while gathering  [[Business Requirements Life cycle|Business Requirements]]. For instance, when tasked with designing an Instagram Reels feature, it's essential to deconstruct the problem into distinct use cases, delineating interactions among system components. Key requirements such as anticipated traffic, data volume, latency, and scalability should be identified. Inquire about the [[Userbase]]type, as this insight aids in resource estimation and governance considerations, especially regarding scalability implications, such as underage user base scenarios. Understanding potential constraints and bottlenecks that may emerge with an expanding user base is imperative. This insight informs decisions regarding database considerations, determining whether a NoSQL or SQL database aligns with specific needs and data characteristics.

In designing this system, it's essential to consider its limitations, scale, and constraints in general but also in the interview context were they may want you to consider and work around these things. We should discuss factors such as the maximum number of reads and writes the system can handle efficiently, network request throughput, service usage (e.g., accounts created per unit time), and other relevant metrics to ensure scalability and performance. You should always ask for clarification.
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

Create an Entity Relationship Diagram (ERD) to define clear relationships in data model and come up with general feature endpoints.


### Data Design & Database Architecture 
When [[Choosing Database]] type, consider whether you're dealing with [[Industry Structured & Unstructured Data |Structured or Unstructured Data]] then come up with a short list of databases to pick from. For instance, if the domain focuses on medical data, it's likely structured, favoring SQL databases. Conversely, media-related data tends to be unstructured, making NoSQL databases more suitable. Then consider and talking about [[Schema Design]] that makes sense along with table [[Normalization & Denormalization]]. all these factors also include database architecture can influence throughput in terms of number request, database transactions(`collection of queries`), and queries made.  


You can talk governance like [[Data Retention Target]] and [[Database data governance]] compliance, Infrastructure may include tools and processes to enforce compliance with regulatory requirements and organizational policies, ensuring data security and legal compliance. 


#### Storage Estimation Examples
> Keep estimation simple focus on storage needed and not to much on queries especially if there are other critical things to discuss. 
- Storage: Writes per day \* size of write \* time to store data
- (10,000 thousand KB/day * 1.5 MB) = 14.65 MB \* 2 days = roughly 30 MB at minimum for storage since data is held for 2 days probably want a little more.
- Daily storage for writes: 10 million writes \* 1.5 MB = 15 TB guesstimate
- Yearly storage:(15 TB \* 365 days \* 10 years) = 55 PB guesstimate

#### Network Traffic Estimate Examples
- Traffic: Daily active users * average reads and writes per user
- Active users: 10 million 
- User Post viewed: 30 views per user or 30 `GET Request`
- User Posting: 10 post `POST Request`
- Active user views = (10 million \* 30) = 300 million `GET Requests`
- Active user views total traffic per second = (300 million / 86,400 seconds) = 3,000 `GET Requests`
- Active user post = (10 million \* 10) = 100 million `POST Request`
- Active user post per second =  (10 million / 86,400 seconds) = 115 `POST Request`

#### Memory Storage Estimate Examples
- Memory: Read requests per day \* average request size \* 20%
- Cache for Instagram highlights:  (300 million requests \* 500 bytes) = 150 GB
- Adjusted cache: (20% of 150 GB) = 30 GB
- Total memory: (30 GB \* 3 for replication) = 90 GB 

#### [[Bandwidth Estimation]] Examples
> Once you determine other estimation you can address this last or ask about potential historical traffic using that as a baseline.
- Bandwidth: Requests per day * average request size
- Bandwidth required: 450,000 GB (300 million(Active users) \* 1.5 MB)
- Bandwidth per second: 5.2 GB (450,000 GB / 86,400 seconds in a day)

You can leverage ChatGPT to perform a CAP theorem analysis and a Kepner-Tregoe decision analysis, using weighted decisions to identify a concise list of choices for databases or other relevant technologies. This approach allows for a systematic evaluation of options based on their consistency, availability, and partition tolerance, as well as other criteria important to your decision-making process. By combining these analytical methods, you can efficiently narrow down your options and make informed decisions that align with your specific needs and preferences.


###### Potential Start for overall Architecture 
If you're aiming to quickly establish your infrastructure, consider sticking to a cloud-heavy Software as a Service (SaaS) approach initially. This approach offers several benefits, including the ability to leverage built-in monitoring, logging, and performance statistics to understand real-world system performance. By starting with cloud-heavy SaaS solutions, you can swiftly deploy your infrastructure and gain valuable insights into its performance and usage patterns. With this information in hand, you can then transition to other potential, potentially more cost-effective options based on your specific needs and requirements. This approach allows for agility and flexibility, enabling you to optimize your infrastructure over time while ensuring a smooth and efficient initial setup.

### Overall Architecture
In a system design choosing the right [[Impact of Architectural Styles |Architectural Styles]] is important think about what is needed and purpose of the style. In addition to that you can leverage [[When to use Domain-Driven Design |Domain Driven Design]] with some of the different styles depending on domain complexity determines weather it is necessary to use meaning the more simpler the domain is the less need for domain driven design in my opinion. Also what [[IV Backing services]] would you leverage and why also consider [[Test Driven Development]] depends on your priorities. Side note things like Test Driven and Domain design are meant to be used alongside architectural styles.


In the realm of architectural styles, popular ones include [[Microservices VS Monolithic Architecture |Microservices]] which can also help with overall system maintainability and scalability improving response times, often paired with [[Eureka Service]] in Java-based applications, and monolithic architecture, representing a centralized system. Monolithic architecture involves building the entire application as a single, indivisible unit, typically deployed on a single server or a closely connected set of servers. 

Microservices, are very good for segregating services and responsibilities allowing for both stateless and stateful services to work together. This concept is intertwined with [[Stateless & Statefull Processes]], which aligns with the [[VIII Concurrency |Concurrency factor of the 12-factor app]]. Furthermore, this concurrency factor intersects with [[Distributed Locking]], which can be implemented using various technologies such as [[ZooKeeper]] and Redis. Also stateless architecture may be more database query heavy relative to stateful architecture.


When it comes to fault tolerance there are many ways to improve including [[Circuit breaker pattern relationship with fault tolerance |Circuit Breaker Design Pattern]]  which considered a stability pattern by monitoring interactions between services and, when a certain threshold of failures is reached, temporarily "opens" the circuit to prevent further requests from being sent. 

Depending on the Architectural Styles you then should talk and identify major components of your system like [[Physical Servers vs Virtual Servers |physical or virtual servers]] which tend to be on premises or on cloud you can talk about the [[Benefits of cloud]] talking about cloud  in terms of outsourcing functionality or infrastructure using different service architecture ranging from IAAS to SAAS and benefiting from things like availability zones and other cloud services that add fault tolerance to the overall system also do a cost benefit analyst. 

When it comes to cloud services like AWS there are a broad range of services like [[Messaging systems]], and [[Caches]] which if you implement locally you can improve response time but keep caching policies in my mind. You can also discuss the usage of [[Monitoring & Observability |monitoring/logging for metrics]] talking around up-time and down-time and using [[Chaos Engineering]] in order to identify weakness in the overall system by injecting controlled failures and disruption into a system or access system capacity to reevaluate things bandwidth and other resources needs. You have things like `Amazon MQ`, `Amazon ElastiCache`, and `Amazon CloudWatch` which could be very beneficial because of community support and documentation available. Alternatively if you don't want cloud solutions because of cost you can use things like [[Apache Kafka]], `Redis` for caching, or something like `Prometheus`. You also have services for things like static [[File System Storage]] services like `Amazon S3` which can be used with [[Content Delivery Network |CDN]] services like `Amazon Cloudfront` which also supports Dynamic content or alternatives like `Cloudflare`, or `Fastly` improving traffic and fault tolerance. 

> When it comes to technologies like if you want to use a lot of open source technologies you should consider longevity of open source technology staying open source like Redis which has changed. 

If you expect system to process high traffic consider this [[High Traffic Architecture]].

When it comes to all these components you also want keep [[Data Flow]] in mind as well like all the different sources of data, the processing and transformation, storage, transportation and communication. Along with things like versioning, change management, and monitoring.  

You talk about choosing tech stack like deciding between leveraging [[Libraries vs Building From Scratch]] and the pros and cons around that in terms of potential dependencies issues. Besides that picking technologies based on the ability to potentially doing a future [[Migration Plan]] like sometimes the technologies you start out with doesn't make sense or you want to manage cost of your system.


##### API 
When choosing an API, or other things like libraries, and frameworks you should prioritize alignment with your business requirements, including cost, long-term support, and desired functionality. Consider the [[API Provided Services |API specific services]] you need like maybe you need something like data retrieval, authentication, and file management. Evaluate [[API Architecture Styles]] like GraphQL, [[gRPC]], or REST to ensure compatibility with your system's needs.


##### Protocols
Depending on the feature you can leverage [[🌐 Internet Communication Process |web protocols]] like [[WebSockets]] directly or some library/framework that utilize it or both for things like chat apps or apps with real time data transmissions usually over TCP connection. But when it comes to other web protocols if your creating an feature with UDP protocol and this may be the same for other protocols your typically using the protocols indirectly meaning your leveraging a library or framework that is using protocols.

##### Deployment
When building application you want to consider all your viable options this is were [[Deployment Strategies]] come in to play there are several ways you can go about then you can leverage technologies like [[Docker Construct Relationships |Docker]] and containerization which encapsulate the application along with all of its dependencies, ensuring consistency between development, testing, and production environments streamlining the development lifecycle even at the local environment level also scaling well and integrates well with CI/CD pipelines. This process relates to [[V Build, release, run |12 factor app factor 5 Build, Release, & Run]] also [[X-10 Dev prod parity]] which aims to maintain consistency across environments in terms of limiting the difference. there is also [[Cloud Version Control |Version Control]] to consider.

Popular technologies for things like CI/CD includes `Jenkins`, `Travis CI`, `CircleCI`, `TeamCity`, `Bamboo`, or `AWS CodePipeline`.

If we decided on more of a manual deployment strategy you can use `Bash Scripts`, also config management tools like `Ansible` and deployment automation tools like `Capistrano` just know there are a lot of repetitive task between these tools and using a combination of these tools may introduce complexity and overhead, particularly when managing dependencies and ensuring consistency across deployments.

When it comes Blue/Green deployment and Canary Releases/Deployments strategy you can use technologies like `AWS Elastic Beanstalk`, `AWS CodeDeploy`, `Kubernetes`, `Docker Swarm`, or `Terraform`

##### Security
For Security measures you can utilize several cloud services apart of your Infrastructure layer  like `AWS Firewall Manager`, `Amazon VPC`, `AWS IAM`, `AWS KMS`, and many other services to protect the application from various security threats, including [[Authentication vs Authorization |unauthorized]] access, data breaches, and DDoS attacks. Also instead of IAM you can opt for something like `Microsoft Active Directory`.
##### Testing
Establish [[Pre Acceptance Testing]] and [[Acceptance Testing]] processes, integrating with DevOps for seamless deployment. Understand the [[Testing Hierarchy]], including unit, integration, system, and acceptance testing. Employ various [[Types of Testing Technique]] like black-box and white-box testing to ensure comprehensive test coverage and high-quality software delivery.

##### User Interface
When designing user interface you want to consider multiple things like addhering to Web Content Accessibility Guidelines (WCAG) ensures your site is accessible to all users, including those with disabilities, fostering inclusivity and facilitating better search engine crawling and indexing, ultimately boosting SEO performance. 

There also things like Internationalization which is the practice of making your application adaptable to different languages, regions, and cultures without requiring code changes. Then you have Localization which  is the process of customizing a software application for a specific locale or target market, taking into account linguistic, cultural, and regulatory differences. This customization involves translating text strings, adapting date and time formats, adjusting currency symbols, and addressing other locale-specific requirements to ensure that the application resonates with users in the target region. This goes beyond translation; it involves tailoring the user experience to align with the cultural norms, preferences, and expectations of the target audience. This may include modifying images, colors, icons, and other visual elements to suit local sensibilities.

Also implementing responsive design principles ensures your website adapts seamlessly to various devices, meeting Google's mobile-first indexing criteria and enhancing SEO performance. 

You should also consider enhancing frontend performance by optimizing page load speed through strategies like minimizing HTTP requests, compressing images, leveraging browser caching, and using CDNs, thereby improving user experience and search engine rankings. 

### Scalability and Performance
In the context of database servers and instances of your application, as well as any microservices within your codebase architecture, the concept of scaling can be categorized into [[Vertical vs Horizontal Scaling]]. Horizontal scaling is often preferred due to the limitations of vertical scaling. For instance, it's impossible to infinitely increase CPU and memory resources on a single server. Additionally, vertical scaling lacks failover and redundancy mechanisms. If one server experiences downtime, the entire website or application goes down with it completely. System tend to follow these common [[System Scalability Strategies]].

To improve system scaling and performance you can use several technologies commonly used to distribute traffic across [[server pools]] like [[Load Balancer |load balancers]] technologies or strategies this also implement [[Load Shedding]] which improves fault tolerance you can even discuss [[Consistent Hashing]] which is one of several methods used to implement a load balancer. Also [[Rate Limiting]] can be implemented delaying or buffering excessive requests, ensuring that they are processed at a controlled pace you can discuss [[System Design Interview An Insider’s Guide.pdf#page=53&selection=4,0,4,30|Where to put the rate limiter?]] which typically server side but can be implemented in [[API Gateway]] there are also [[System Design Interview An Insider’s Guide.pdf#page=54&selection=24,0,29,44|Algorithms for rate limiting]].

There are Networking components that can improve performance such as routers like [[Reverse proxy vs API gateway vs load balancer]].

On the database side of thing you can use techniques like [[Database Sharding]] also known as horizontal partitioning and a [[Master-Slave Database Architecture]] which is simple to implement and is better in terms of data consistency while improving performance. This tandem approach distributes workload both horizontally across shards and vertically within each shard. This strategy enhances scalability and performance by parallelizing read and write operations across multiple database servers. Moreover, integrating master-slave setups within each shard ensures fault tolerance and high availability. In the event of a master server failure within a shard, a slave server can seamlessly assume the role of the new master, thereby guaranteeing uninterrupted operation and data accessibility for that shard. 

Alternatively you can use Sharding with [[Leaderless Architecture]] improving high availability by distributing both data and operations across multiple shards and nodes. Each shard operates independently and can handle its own read and write requests without relying on a centralized coordinator. The benefits of this is you can easily scale horizontally adding more nodes or shards depending on the workload which helps with fault tolerance because there isn't a leader. You also have reduced latency because user can interact with the closest node which helps if in geographically distributed systems. Leaderless architectures offer flexibility in terms of data placement and replication strategies. Different shards can employ different replication methods, allowing organizations to tailor their data storage and redundancy options to their specific needs. the only thing is it can be more complex and hard to achieve strong consistency especially in the presence of network partitions or node failures.

Picking between the two database architecture comes down to complexity, data consistency and predictable operations, vs high availability, fault tolerance, scalability, and decentralization operations. if you prefer CP(Consistency & Partitioning) then Master Slave is the way to go but if you prefer AP(Availability & Partitioning) Leaderless architecture is the way to go. There also other [[Replication Strategies]] to consider that help achieve high availability and reliability.


It's worth noting that scaling considerations can fall under administrative functionalities, whether that involves resource scaling in a cloud environment or implementing custom solutions such as creating an admin dashboard for internal use by developers. This dashboard could encompass various [[XII Admin processes]], offering insights and control over the scaling operations and other administrative tasks.


### Step 3: Wrap Up(3 - 5 minutes)
Summarize key design decisions, highlighting any alternative considerations. Invite questions and address outstanding concerns.

# Stats 

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
