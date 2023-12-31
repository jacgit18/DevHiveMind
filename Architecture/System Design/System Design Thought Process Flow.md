---
tags: 
author:
  - jacgit18
Status: Refinement
Started: 
EditDate: 
Relates:
---
### **Step 1: Understand the Problem and Establish Design Scope (3 - 10 minutes)**
During this step, it's crucial to seek clarification on the system scope and priorities like for example they may ask design an Instagram reel feature. Break down the problem into specific use cases or user stories, outlining the interactions between system components. Identify key requirements and constraints, such as expected traffic, data volume, latency, and scalability.

#### Start small 
Focus on the action like pressing the button ask what it does and expand on that in terms of what you think should happen like collecting certain data and where would that go or be connected to and the different processes that need to happen. 

Then you ask about things like user base and the size of it estimation of it and determine things like constraints and bottlenecks which will then lead to database questions which may require specialized databases that are NoSQL or SQL DB. 
#### Use Cases/[[User Stories]] Example:
>[!important]
>Doing this helps with coming up with data model
1. User uploads pictures and videos. or As a user I want to upload picture and videos to share.
2. User views uploaded photos and videos.
3. User follows, likes, and comments on posts.
4. User has a feed containing posts from friends.
5. User can block or unfollow other users.

### *Step 2: Design Deep Dive (15 - 25 minutes)
Delve into the design by following the flow from Database to Server/Services (Architecture) to Client Side.

- **Database:**
  - Create an Entity Relationship Diagram (ERD) to define relationships.
  - Consider SQL for structured data and NoSQL for unstructured data.
  - More things to think about when deciding between [[Choosing Database]] you can also talk about [[Database Sharding]]
  - What type of [[Schema Design]] makes sense.
  - You can also talk about [[Master-Slave Database Architecture]]

- **Architecture:**
  - Identify major components: servers, databases, cache, load balancer,  [[Messaging systems]], *monitoring/logging for metrics*, and microservices.
  - Discuss trade-offs between performance, scalability, and cost.
  - Consider the use of APIs for certain functionalities.
  - Discuss [[Stateless & Statefull Processes| Stateless vs Statefull]] application or process.
  - Maybe talk [[Microservices]](might not be relevant since small scope) or leverage knowledge of [[12 Factor App Docker.canvas|12 Factor App Docker]] which has some overlap with everything mentioned, whatever comes to mind.

- **Scalability and Performance:**
  - Distribute traffic across server pools for different types of traffic.
  - Implement local cache for improved response time.
  - Discuss the number of master and slave databases.
  - Implement a CDN network for content distribution.
  

#### Other things to mention:
- **Traffic Distribution:** Distribute traffic across server pools.
- **Local Cache:** Use local cache for improved response times.


#### Scaling stuff to reference somewhere
- [[Vertical vs Horizontal Scaling]]
- [[Benefits of cloud]]
- [[Concurrency Vs Horizontal Scaling]] 
- Load balancing Placeholder
- [[Resource Scaling]]
- clean up [[Arch to think about]]

### **Step 3: Wrap (3 - 5 minutes)**
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

Certainly, let's refine the estimation with a music streaming service as an example.

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