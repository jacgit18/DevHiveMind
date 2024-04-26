---
excalidraw-plugin: parsed
tags:
  - distributedSystem
  - interview
  - systemDesign
author:
  - jacgit18
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: Tackling
Started: 2024-04-05T00:00:00.000Z
EditDate: 2024-04-11
Relates: 
Peer Reviewed: 0
dg-publish:
---
Can expand on this system week by week growing it or mock by mock interview in a week.

| Unit       | Equivalent in Bytes                           | Place                  |       |
| ---------- | --------------------------------------------- | ---------------------- | ----- |
| 1 Byte     | 1                                             | Hund over 2 digits     | 10^2  |
| 1 Kilobyte | 1,024 Bytes                                   | Thous over 3 digits    | 10^3  |
| 1 Megabyte | 1,024 Kilobytes = 1,048,576 Bytes             | Milli over 6 digits    | 10^6  |
| 1 Gigabyte | 1,024 Megabytes = 1,073,741,824 Bytes         | Billi over 9 digits    | 10^9  |
| 1 Terabyte | 1,024 Gigabytes = 1,099,511,627,776 Bytes     | Trilli over 12 digits  | 10^12 |
| 1 Petabyte | 1,024 Terabytes = 1,125,899,906,842,624 Bytes | Quadril over 15 digits | 10^15 |


| Calculation              | Result                                    |         |
| ------------------------ | ----------------------------------------- | ------- |
| 60 seconds * 60 minutes  | 3,600 seconds per hour use 4,000          | Monthly |
| 3,600 seconds * 24 hours | 86,400 seconds per day use 80,000         | Daily   |
| 86,400 seconds * 30 days | 2,592,000 seconds per month use 2,400,000 | Seconds |



# Question
Design a recommendation engine for YouTube that provides personalized video recommendations to users. 
## Requirements

### Userbase
age, geography, governance, etc ...

#### Schema
##### Table 1 
|     | Video Recommendations |              |
| --- | --------------------- | ------------ |
| PK  | VideoID               | VARCHAR(50)  |
| FK  | UserID                | INT          |
| FK  | ChannelID             | VARCHAR(100) |
|     | title                 | VARCHAR(255) |
|     | category              | VARCHAR(50)  |
|     | duration              | INT          |
|     | views                 | INT          |
|     | likes                 | INT          |
|     | dislikes              | INT          |
|     | upload_date           | DATE         |
|     | recommended_score     | FLOAT        |

##### Table 2
|     | User          |
| --- | ------------- |
| PK  | UserID        |
|     | User channel  |
|     | User history  |
|     | User Likes    |
|     | User Location |


##### Table 3

|     | Channel             |
| --- | ------------------- |
| PK  | ChannelID           |
| FK  | UserID              |
|     | channel subscribers |
|     | channel video count |


#### Data points of focus identified
comments, views, likes, recommendation score

dislikes(not on youtube any more specifically the count at least on the client side)

**Media approximation**
HD image 3MB  intstagram or facebook post
Size of image = height x width x bit depth
1280 x 720 x 24bits or 3 Bytes
1k * 1K * 3 = 3,000,000 = 3MB

Profile image(300x300) 300KB  
1 Min HD Video = 50MB

Video size is calculated by
FrameSize x FrameRate(FPS) x Compression Ratio x Video Duration(# Sec)

3MB * 30FPS * 1/100 * 60(sec) = 90MB * 1/100 * 60 = 90MB *  60 /100 = 5,400MB/ 100 = 54MB = 50MB

  
For something like YouTube you would probably use other resolutions like: 480p, 360P, 240P, 144P

#### Usage Assumption to trace out math calculation
update values after to be closer to more realistic estimations

10,000 active user

200,000,000 active user


> in general monthly estimations should be sufficient especially since there is so much other things to consider.
##### Comments
2 comments per user on average a month

Total monthly comments: 2 comments per user * 200,000,000 users = 400,000,000 comments

Overall comments per day: Total monthly comments / 30 days  = 13,000,000 round down for cleaner math 

Comments per second in a day = Overall comments per day / Total seconds in a day

Comments per second in a day = 13,000,000 / 86,400  ≈ 150 round down

###### Storage Estimation Monthly

Total storage needed = Average comment size(assumption) * Total monthly comments 

Total storage needed = 1,024 bytes * 13,000,000 comments = 13,312,000,000 bytes

13,312,000,000 bytes / 1024 bytes = 13,000,000  KB 

13,000,000 KB / 1024 KB/MB = 12,695.3125 MB(approximately)

###### Network Estimation Monthly
Total network traffic for comments:
400,000,000 comments * 1 KB Average comment size(assumption) = 400,000,000 KB 

400,000,000 KB / 1024 KB/MB ≈ 390,625 MB

Daily network traffic for comments = 390,625 MB / 30 ≈ 13,020.83 MB per day


###### Memory Estimation Monthly
can be used to estimate caching networking traffic request or database storage request.
> metadata associated with each comment, such as timestamp, user ID, Comment ID, Reply-to ID, likes/dislikes count, or Flags. You need to allocate additional memory.

Read requests per day = Total network traffic for comments in month / days in a month

Read requests per day = 400,000,000 comments / 30 = 13,000,000 comments rounded down

Memory Total metadata overhead : Read requests per day \* average request size \* 20%

**The 500 bytes is a rough estimate of the total of timestamp, user ID, Comment ID, Reply-to ID, likes/dislikes count, and Flag metadata.**

Memory Total metadata overhead  = 13,000,000 * 500 bytes(assumption) * 20% = 1,300,000,000 bytes

Cache for Youtube comments:  (13 million requests \* 500 bytes) = 6.05 GB

Adjusted cache: (20% of 6.05 GB) = 1.21 GB

Total memory: (1.21 GB * 3 for replication) = 3.63 GB replicating database cache


###### Ratio(Side Note)
Storage to memory ratio = Storage estimation / Memory estimation

12,695.3125 MB = 12.40625 GB

Storage to memory ratio = 12.40625 GB / 3.63 GB ≈ 3.42 GB

A ratio of approximately 3.42 indicates that the storage estimation is higher than the memory estimation.

Ratio = 3.63 GB / 12.40625 GB ≈ 0.2925
Percentage Ratio = 0.2925 * 100% ≈ 29.25%


##### Likes
120 likes per user in a month between shorts and regular videos

Total monthly likes: 120 likes per user * 30 days * 200,000,000 users = 720,000,000,000 likes

Overall likes per day: Total monthly likes / 30 days  = 24,000,000,000 likes


Likes per second in a day = Total likes in a day / Total seconds in a day

Likes per second in a day = 24,000,000,000 likes / 86,400 seconds = 277,777.77 likes

###### Storage Estimation Monthly
Total storage needed = Average likes size(assumption) * Total monthly likes 

Video ID (11 bytes) + User ID (16 bytes) + JSON overhead (10 bytes) = 37 bytes

Total storage needed = 37 bytes * 720,000,000,000  likes = 26,640,000,000,000 bytes


26,640,000,000,000 bytes / 1024 bytes/KB * 1024 KB/MB = 26,640,000,000,000 bytes / 1,048,576 = 25,402,832.03125 MB

25,402,832.03125 MB / 1024 MB/GB = 25,000 GB (approximately)

###### Network Estimation Monthly
Total network traffic for Likes:
720,000,000,000 likes * 1 KB Average likes size(assumption) = 720,000,000,000 KB 

720,000,000,000 KB / 1024 KB/MB ≈ 703,125,000 MB

###### Memory Estimation Monthly

Read requests per day = Total network traffic for likes in month / days in a month

Read requests per day = 720,000,000,000 likes / 30 days = 24,000,000,000 likes per day

Memory Total metadata overhead: Read requests per day * average request size * 20%

Memory Total metadata overhead = 24,000,000,000 likes per day * 500 bytes (assumption) * 20% = 2,400,000,000,000 bytes

Cache for Youtube comments: (2,400,000,000,000 bytes / 1024^4 bytes) = 2.2332 TB

Adjusted cache: (20% of 2.2332 TB) = 446.64 GB

Total memory: (446.64 GB * 3 for replication) = 1.339 GB replicating database cache



##### Views
100 views per user a month shorts and regular videos

Total monthly views = 100 * active users * 30 days = 30,000,000

Overall daily views per day(shorts and regular videos): Monthly views/ 30 days = 1,000,000 views

Views per second in a day = Total views in a day / Total seconds in a day

Views per second in a day = 1,000,000 views / 86,400 seconds ≈ 11.5741 views per second

###### Storage Estimation Monthly

Total storage needed = Average view counts size(assumption) * Total monthly view counts  

Total storage needed = 4 bytes * 30,000,000 view counts  = 120,000,000 bytes

120,000,000 bytes / 1024 bytes = 117,187.5 KB 

117,187.5 KB / 1024 KB/MB = 114.44 MB (approximately)

###### Network Estimation Monthly

Total network traffic for view counts:
30,000,000 view counts * 1 KB Average view counts size(assumption) = 30,000,000 KB 

30,000,000 KB / 1024 KB/MB ≈ 30,000 MB

###### Memory Estimation Monthly

Read requests per day = Total network traffic for view counts in month / days in a month

Read requests per day = 30,000,000 view counts / 30 days = 1,000,000 view counts per day

Memory Total metadata overhead: Read requests per day * average request size * 20%

Memory Total metadata overhead = 1,000,000 view counts per day * 500 bytes (assumption) * 20% = 100,000,000 bytes per day

Cache for Youtube view counts: (100,000,000 bytes / 1024^3 bytes) ≈ 0.0931 GB

Adjusted cache: (20% of 0.0931 GB) ≈ 0.0186 GB

Total memory: (0.0186 GB * 3 for replication) ≈ 0.0558 GB replicating database cache

### Total Estimation

#### Storage

Comments + Likes + View Counts
19.53 MB +   + 114.44 MB OG calculation

12,695.3125 MB +  25,000 GB + 114.44 MB more realistic

25,000 GB * 1024 MB/GB = 25,600,000 MB

Now, add the sizes together:

Total Storage Needed = 12,695.3125 MB + 25,600,000 MB + 114.44 MB

Total Storage Needed = 25,612,809.7525 MB  - 114.44 MB

Original calculation was less then a 32GB flash drive not accurate real world estimation but just need to adjust initial value

25,612,809.7525 MB/ 1024 MB/GB ≈ 25,000 GB = 25 TB

This new estimation is close to a hard drive but also this a small section of a system and also this obliviously a rough estimation as well so the storage or other estimation categories will look relatively low but also you have consider common sense also like when you think about youtube when it comes to Like to Comment ratio you will probably have more likes made vs comments made on the system.

#### Network 
Comments + Likes + View Counts

390,625 MB + 703,125,000 MB + 30,000 MB = 703,546,625 MB = 670 TB

#### Memory
Comments + Likes + View Counts
3.63 GB + 1.339 GB + 0.0558 GB = 5.0248 GB

#### Bandwidth

Bandwidth required = (200,000,000  * 1.5 MB) = 300,000,000 MB

Bandwidth per second = Bandwidth required / 86,400 seconds in a day = 3,472.22 MB/s = 3.39 GB



#todo/Personal/Low 
- [ ] Senior level estimation to research storage around machine learning models. **Total Storage:** Considering additional storage for video metadata, user profiles, and machine learning model checkpoints, let's estimate a total storage requirement of 500 GB per month. 


## Architecture
Typically Microservices

## Backing Services

### Cloud Infrastructure
Don't need to use strictly cloud services

#### Data Storage
can talk governance and retention within cache, database, and application state also optimizations.
##### Database 
1. **Relational Database (SQL)**:  
	- **User Data Management**: A relational database can be used to store user data such as account information, viewing history, liked videos, and subscription details. This data can be structured into tables with clearly defined relationships.  
	- **Metadata Storage**: Metadata about videos, such as titles, descriptions, tags, and categories, can be stored in a relational database to facilitate efficient querying and retrieval.  
	- **Relationships and Associations**: Relational databases excel at representing complex relationships and associations between different entities, which is crucial for building personalized recommendation algorithms based on user behavior and preferences.  
	  
2. **NoSQL Database**:  
	- **Scalability and Performance**: NoSQL databases are well-suited for handling large volumes of unstructured or semi-structured data, such as user interactions, clickstream data, and social network graphs, which are essential for building robust recommendation systems.  
	- **Real-time Data Processing**: NoSQL databases can support real-time data processing and analytics, allowing for quick updates to user profiles and recommendations based on dynamic user behavior.  
	- **Flexible Schema Design**: NoSQL databases offer flexibility in schema design, enabling developers to adapt the database schema to evolving data requirements and experimentation with different recommendation algorithms.  

3. **Graph Database (Optional)**:  
	- **Relationship Representation**: Graph databases excel at representing and querying complex relationships and networks, making them ideal for modeling user interactions, social connections, and content relationships in a recommendation system.  
	- **Recommendation Algorithm Support**: Graph databases can be used to implement graph-based recommendation algorithms, such as collaborative filtering and graph-based neural networks, which leverage the inherent structure of user-item interactions to generate personalized recommendations.  
  
##### Storage 
file systems static files etc..

##### Caching
For videos that already exist on YouTube and are being recommended to users, they are typically not stored separately in a cache or database solely for the purpose of recommendations. Instead, YouTube leverages its existing infrastructure and data storage mechanisms to facilitate recommendation functionality. Here's how it generally works:  
  
1. **Metadata and Indexing**: YouTube stores metadata about each video, including titles, descriptions, tags, categories, upload dates, view counts, likes, and dislikes, in its databases. This metadata is indexed and optimized for efficient querying and retrieval.  
  
2. **User Interactions**: YouTube tracks user interactions such as views, likes, dislikes, comments, shares, and subscriptions using its backend systems. This user engagement data is also stored in databases and used to generate personalized recommendations.  
  
3. **Recommendation Algorithms**: YouTube employs sophisticated recommendation algorithms that analyze user behavior, preferences, and content similarities to generate personalized recommendations. These algorithms run on YouTube's backend infrastructure and leverage large-scale data processing techniques to compute recommendations in real-time.  
  
4. **Caching and Optimization**: While the recommended videos themselves may not be stored separately in a cache or database, YouTube likely uses caching mechanisms at various levels of its infrastructure to optimize recommendation delivery and reduce latency. This may include caching frequently accessed metadata, pre-computed recommendations, and other relevant data to improve system performance.  
  
In summary, videos recommended on YouTube are typically not stored separately in a cache or database solely for recommendation purposes. Instead, YouTube leverages its existing infrastructure and data storage mechanisms, including metadata storage, user interaction tracking, recommendation algorithms, and caching mechanisms, to deliver personalized recommendations to users based on their preferences and behavior.


##### Networking

###### CDN
###### Traffic Management

###### Protocols

###### Security 


#### Processes

##### Compute

##### Data processing & analytics

##### Logging 

##### Monitoring

#### DevOPS
doesn't need to be cloud solution like AWS 

## Wrap Up


==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
Web Application ^SI2huACs

G ^6en8MHq1

o ^RlRCehCJ

o ^EPK2gIuS

g ^GK2aQ01e

l ^XdMOo9iL

e ^izMdlSsx

Mobile ^yIBmoZ3b

Lorem ipsum dolor sit amet, 
consectetur adipiscing elit,sed
 do eiusmod tempor incididunt
 ut labore et dolore magna
 aliqua. Ut enim ad miveniam,
 quis nostrud exercitaullamco 
laboris nisi ut aliquip ex ea 
ommodo consequat. Duis aute 
irure dolor in reprehenderit i ^cxrY9Vlb

Lorem ipsum dolor s, 
consectetur adipng d
 do eiusmopor incididunt
ut labore et dolore magna
aliqua. Ut enim ad miveniam,
quis nostrud exercitaullamco 
laboris nisi ut aliquip ex ea 
ommodo consequat. Duis aute 
 ^ACbVHD62

Frontend ^uDjBIacQ

 Main 
Service ^nm1VEi3v

Recommendation 
   Service ^a5fEmhU7

Channel 
Service ^fH3LGqwb

Content 
Analysis 
Service ^goqrN6wV

RDS ^VaAiB2VJ

Timestream ^LFqaLWXM

Neptune ^NCRV6sk1

EC2 ^tAFqYIX5

Rekognition ^bIvBglDe

SageMaker ^8u5gPQKy

Personalize ^WF7Btrtq

API Gateway ^zZbCbKB2

S3 Bucket ^5Z50elXe

CloudFront ^E7rlBiYD

Athena ^IyQv4DqK

ELB ^2AUKEF9e

Docker ^bSlhQ21e

GitHub ^SizzwGgf

Github Actions ^Nt6ZLJmr

ElastiCache ^rCXmBsQO

# Element Links
cfVAGpj7: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 1]]
TsXzxI5r: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 2]]
zrOOXy2q: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 3]]
D6RNpTN3: [[Integration of AI and Machine Learning Services#Amazon Rekognition]]

# Embedded files
0e77320ba2cdfffa54ed944064dc676677a1c426: [[Github Actions.png]]

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.1.4",
	"elements": [
		{
			"type": "embeddable",
			"version": 626,
			"versionNonce": 260433312,
			"isDeleted": false,
			"id": "cfVAGpj7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -598.4113049629412,
			"y": -646.8918731283972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 352.5793983609069,
			"height": 500,
			"seed": 16317,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 1]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "embeddable",
			"version": 521,
			"versionNonce": 7128160,
			"isDeleted": false,
			"id": "TsXzxI5r",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -983.9113049629407,
			"y": -871.2252064617302,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 309.3333333333335,
			"height": 213.66666666666643,
			"seed": 14525,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 2]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "embeddable",
			"version": 537,
			"versionNonce": 486027680,
			"isDeleted": false,
			"id": "zrOOXy2q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -536.2863049629409,
			"y": -1012.0611439617303,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 429.16666666666663,
			"height": 192.9166666666667,
			"seed": 3319,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 3]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "line",
			"version": 354,
			"versionNonce": 1930770528,
			"isDeleted": false,
			"id": "-PO2Zd6NDX76DEi7npcXu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -708.7967216296074,
			"y": -800.7479929200638,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 222.5,
			"height": 116.25,
			"seed": 1482929135,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					122.5,
					-30
				],
				[
					222.5,
					-116.25
				]
			]
		},
		{
			"type": "line",
			"version": 588,
			"versionNonce": 1581317536,
			"isDeleted": false,
			"id": "_q6MHlXRfqRwgPr01jKBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -697.5467216296074,
			"y": -799.4979929200638,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 122.5,
			"height": 283.75,
			"seed": 1554389615,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					47.5,
					62.5
				],
				[
					122.5,
					283.75
				]
			]
		},
		{
			"type": "frame",
			"version": 190,
			"versionNonce": 1619995744,
			"isDeleted": false,
			"id": "ESidNTlLbrCl4hZ0PJBBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1146.5619898086943,
			"y": -1118.6540598145957,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 1349.9255371093755,
			"height": 1038.1449538010822,
			"seed": 1362751418,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "1. Schema"
		},
		{
			"type": "arrow",
			"version": 308,
			"versionNonce": 345000352,
			"isDeleted": false,
			"id": "7tHPkd4SfIB373ExuxjVE",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2147.8179260091983,
			"y": -380.21644795998793,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 237.99163633207854,
			"height": 55.72484815753057,
			"seed": 1716473152,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "-VE7GMbpsjhqwe-QCWYxR",
				"focus": -1.1487644411785,
				"gap": 7.865599552686529
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-121.99163633207854,
					-55.72484815753057
				],
				[
					-237.99163633207854,
					-45.72484815753057
				]
			]
		},
		{
			"type": "arrow",
			"version": 165,
			"versionNonce": 1923784800,
			"isDeleted": false,
			"id": "b8crYYIbx7Cg1eFpvw4H0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2231.82628967712,
			"y": -763.9412961175185,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 236,
			"height": 76,
			"seed": 205350592,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "MHOhOR6ILD__ZflgoyJ5I",
				"focus": -0.5459276814084713,
				"gap": 14.686069499380096
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-120,
					76
				],
				[
					-236,
					72
				]
			]
		},
		{
			"type": "arrow",
			"version": 336,
			"versionNonce": 1528173984,
			"isDeleted": false,
			"id": "WyM64MRAi_hQ0WnO58U6d",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2209.82628967712,
			"y": -959.5441580005761,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 228.0803302058298,
			"height": 213.41285114673167,
			"seed": 463490368,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "KAaV-QTO59RxROnreu97C",
				"focus": 0.342546804872001,
				"gap": 1.4595794677734375
			},
			"endBinding": {
				"elementId": "epdVoUdP3yMf_i9s1SJp-",
				"focus": 0.053025073689851404,
				"gap": 1
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-140,
					65.60286188305759
				],
				[
					-228.0803302058298,
					213.41285114673167
				]
			]
		},
		{
			"type": "arrow",
			"version": 139,
			"versionNonce": 423072864,
			"isDeleted": false,
			"id": "O9LQf7NsQhIxvDW5x8X1b",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1812.9344370636904,
			"y": -433.45806912823707,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 129.98314738657064,
			"height": 231.6174193220944,
			"seed": 1689820864,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "vaBljZs6Xsfg2ByxS2fMb",
				"focus": -0.19711674509662427,
				"gap": 13.27182734010637
			},
			"endBinding": {
				"elementId": "xqvko52RSdMyp8oiurAyw",
				"focus": 0.1786377627991464,
				"gap": 6.961068180698028
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-129.98314738657064,
					109.85271051071857
				],
				[
					-77.68211087494615,
					231.6174193220944
				]
			]
		},
		{
			"type": "line",
			"version": 683,
			"versionNonce": 1728209312,
			"isDeleted": false,
			"id": "c0M1x_LM3sW0XU-rncpMD",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1809.0216523746842,
			"y": -134.6105825288687,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 197.34945684749323,
			"height": 39.26643633075014,
			"seed": 1177007808,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					119.46712733849995,
					15.204146046498295
				],
				[
					197.34945684749323,
					39.26643633075014
				]
			]
		},
		{
			"type": "arrow",
			"version": 65,
			"versionNonce": 1241909344,
			"isDeleted": false,
			"id": "FIlZGvwXzh0nKp7thmKAd",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1691.0838654346949,
			"y": -137.22066631058465,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 155.55555555555566,
			"height": 17.77777777777783,
			"seed": 1261770848,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "xqvko52RSdMyp8oiurAyw",
				"focus": -0.13538172405428375,
				"gap": 1.119211251777756
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-155.55555555555566,
					-17.77777777777783
				]
			]
		},
		{
			"type": "arrow",
			"version": 314,
			"versionNonce": 1199910304,
			"isDeleted": false,
			"id": "ACDqpyxuesxKi_YA4tyJL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1637.0629682576396,
			"y": -770.4361592975566,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 67.98568215742239,
			"height": 220.3652751893477,
			"seed": 759341152,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "2IIbIsp3eopTrfWcuwVdP",
				"focus": 0.31061866614034983,
				"gap": 12.000168780107586
			},
			"endBinding": {
				"elementId": "NFpxu9SH1L8Jl9rNr07W4",
				"gap": 2.087165458837717,
				"focus": 0.27924234783167035
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-5.9791028229446965,
					-195.67339590191693
				],
				[
					62.00657933447769,
					-220.3652751893477
				]
			]
		},
		{
			"type": "arrow",
			"version": 104,
			"versionNonce": 1088814176,
			"isDeleted": false,
			"id": "cTKYit54IDA4gGy5GPLGd",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1089.3457701966,
			"y": -687.463785333221,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 79,
			"height": 0.3321836128277482,
			"seed": 381464992,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "U9sGOpfQr2euZBCFhLzoo",
				"gap": 2.7074526635618668,
				"focus": 0.1990573082134081
			},
			"endBinding": {
				"elementId": "dVNrB3hwj-8exkKKKlNkt",
				"gap": 5.959579467773665,
				"focus": 0.016909645559655108
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					79,
					-0.3321836128277482
				]
			]
		},
		{
			"type": "arrow",
			"version": 107,
			"versionNonce": 634288544,
			"isDeleted": false,
			"id": "IdnAXS5GyQ8kLCSrTKb3T",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1943.1791035299334,
			"y": -1033.763325040743,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 46.66666666666674,
			"height": 294.9999999999999,
			"seed": 1260127648,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "mZ0TSb-mZRjlN5Gmieac6",
				"focus": -0.7396892725560091,
				"gap": 12.022213821990931
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-46.66666666666674,
					139.99999999999977
				],
				[
					-20,
					294.9999999999999
				]
			]
		},
		{
			"type": "arrow",
			"version": 162,
			"versionNonce": 1067937888,
			"isDeleted": false,
			"id": "53ILdE1xm5mBIijONewJC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1509.8113244662509,
			"y": -966.8737649587574,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 110.03444573034926,
			"height": 209.77710658468084,
			"seed": 312000928,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0NJYSHqaC2RAqvm5uCdpS",
				"gap": 16.80785017672666,
				"focus": -0.5597483473665974
			},
			"endBinding": {
				"elementId": "LJHIdDOwCgWwF1o2BUI5K",
				"focus": 3.114050634833699,
				"gap": 13.540776501307903
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					68.36777906368252,
					63.11043991801421
				],
				[
					110.03444573034926,
					209.77710658468084
				]
			]
		},
		{
			"type": "arrow",
			"version": 166,
			"versionNonce": 84821408,
			"isDeleted": false,
			"id": "5QV6onNsAlDUCvdmTq6Oo",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1324.8457701966,
			"y": -451.859154012114,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 56.200202701718354,
			"height": 43.39384689373452,
			"seed": 1947110816,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "Tp8qd0wENffOXcGsiVRg3",
				"focus": -0.004779173689316546,
				"gap": 7.163904337001554
			},
			"endBinding": {
				"elementId": "z1UyFGgijam0uIYgmWi4N",
				"focus": 0.09584531512765687,
				"gap": 6.423398205862647
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					56.200202701718354,
					-43.39384689373452
				]
			]
		},
		{
			"type": "arrow",
			"version": 163,
			"versionNonce": 1310352480,
			"isDeleted": false,
			"id": "i9mr7oig95aZ2XlxhUsIS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1276.5124368632669,
			"y": -680.4299917074098,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 93.33333333333348,
			"height": 205,
			"seed": 1973310560,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783858,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "60P4XlI6-IZwSgbOh1SEA",
				"focus": 0.8531279849182286,
				"gap": 12.747227193510877
			},
			"endBinding": {
				"elementId": "Tp8qd0wENffOXcGsiVRg3",
				"focus": -0.29224252582620075,
				"gap": 17.07840016347302
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					91.66666666666674,
					10
				],
				[
					-1.6666666666667425,
					205
				]
			]
		},
		{
			"type": "arrow",
			"version": 56,
			"versionNonce": 41193888,
			"isDeleted": false,
			"id": "XO3l3aysTBF7sBOFc781j",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 889.8457701966001,
			"y": -693.7633250407432,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 95,
			"height": 3.3333333333332575,
			"seed": 171004320,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "d9SJ5xa227orwk2L2uvDP",
				"focus": -0.48105050517775383,
				"gap": 29.070367869255733
			},
			"endBinding": {
				"elementId": "U9sGOpfQr2euZBCFhLzoo",
				"focus": 0.04077443715531453,
				"gap": 4.833935525712263
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					95,
					-3.3333333333332575
				]
			]
		},
		{
			"type": "frame",
			"version": 639,
			"versionNonce": 2047793248,
			"isDeleted": false,
			"id": "vjQ13QAGqqwZLC97MoanI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 387.2081236227966,
			"y": -1127.6394822494199,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 2146.188263721955,
			"height": 1201.5320763221152,
			"seed": 1224266406,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "2. Architecture"
		},
		{
			"type": "rectangle",
			"version": 364,
			"versionNonce": 355556768,
			"isDeleted": false,
			"id": "bzmt6bN9-N04WZy7twrr3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 406.5572300071028,
			"y": -890.8714852799126,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 466.82823768028857,
			"height": 446.6046142578127,
			"seed": 16046394,
			"groupIds": [
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 328,
			"versionNonce": 391433312,
			"isDeleted": false,
			"id": "uDjBIacQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 572.9537143821026,
			"y": -882.4819213526288,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 162.16014099121094,
			"height": 48.59421950120189,
			"seed": 1712534118,
			"groupIds": [
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 38.87537560096151,
			"fontFamily": 1,
			"text": "Frontend",
			"rawText": "Frontend",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Frontend",
			"lineHeight": 1.25
		},
		{
			"type": "text",
			"version": 1298,
			"versionNonce": 1316268448,
			"isDeleted": false,
			"id": "SI2huACs",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 658.3488436128712,
			"y": -593.0494823387517,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 196.07342529296875,
			"height": 35.79861612413039,
			"seed": 2067948582,
			"groupIds": [
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 26.5174934252818,
			"fontFamily": 1,
			"text": "Web Application",
			"rawText": "Web Application",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Web Application",
			"lineHeight": 1.3499999999999985
		},
		{
			"type": "rectangle",
			"version": 3215,
			"versionNonce": 2143043680,
			"isDeleted": false,
			"id": "d9SJ5xa227orwk2L2uvDP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 652.1517362454831,
			"y": -719.7203067031987,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 208.62366608186124,
			"height": 124.85891208837496,
			"seed": 1257172838,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "XO3l3aysTBF7sBOFc781j",
					"type": "arrow"
				}
			],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2458,
			"versionNonce": 426669472,
			"isDeleted": false,
			"id": "BQrMUmXRGc6CME5fprUx-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 652.4421407740231,
			"y": -719.6847790138986,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 207.2467928616144,
			"height": 20.33987091745275,
			"seed": 1667764902,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2620,
			"versionNonce": 1393898592,
			"isDeleted": false,
			"id": "_f0F8Dg0xZaKFqD2TzorU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 659.4733059159469,
			"y": -714.1641513635363,
			"strokeColor": "#000000",
			"backgroundColor": "#fa5252",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 794480102,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2664,
			"versionNonce": 2068758944,
			"isDeleted": false,
			"id": "AW7reduuVWOZBSTqYcmMT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 676.2153836595419,
			"y": -714.1641513635363,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 1003757862,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2722,
			"versionNonce": 925870176,
			"isDeleted": false,
			"id": "JE93ZeXCyzZoqXUNG_pOb",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 693.6927466638087,
			"y": -713.428866102839,
			"strokeColor": "#000000",
			"backgroundColor": "#40c057",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 1816202342,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 980,
			"versionNonce": 1397067168,
			"isDeleted": false,
			"id": "6en8MHq1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 708.3722336923508,
			"y": -682.3585491040385,
			"strokeColor": "#228be6",
			"backgroundColor": "#ffffff",
			"width": 17.283935546875,
			"height": 28.48914565861645,
			"seed": 778997670,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 21.914727429704968,
			"fontFamily": 1,
			"text": "G",
			"rawText": "G",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "G",
			"lineHeight": 1.2999999999999996
		},
		{
			"type": "text",
			"version": 932,
			"versionNonce": 400268384,
			"isDeleted": false,
			"id": "RlRCehCJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 729.1912247505713,
			"y": -682.3585491040385,
			"strokeColor": "#d9480f",
			"backgroundColor": "#ffffff",
			"width": 12.136001586914062,
			"height": 28.48914565861645,
			"seed": 780774118,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 21.914727429704957,
			"fontFamily": 1,
			"text": "o",
			"rawText": "o",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "o",
			"lineHeight": 1.3000000000000003
		},
		{
			"type": "text",
			"version": 939,
			"versionNonce": 444783008,
			"isDeleted": false,
			"id": "EPK2gIuS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 745.6272703228503,
			"y": -682.3585491040385,
			"strokeColor": "#fab005",
			"backgroundColor": "#ffffff",
			"width": 12.136001586914062,
			"height": 28.48914565861645,
			"seed": 186605094,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 21.914727429704957,
			"fontFamily": 1,
			"text": "o",
			"rawText": "o",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "o",
			"lineHeight": 1.3000000000000003
		},
		{
			"type": "text",
			"version": 946,
			"versionNonce": 1726550112,
			"isDeleted": false,
			"id": "GK2aQ01e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 760.9675795236428,
			"y": -682.3585491040385,
			"strokeColor": "#228be6",
			"backgroundColor": "#ffffff",
			"width": 10.9749755859375,
			"height": 28.489145658616444,
			"seed": 152873318,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 21.914727429704957,
			"fontFamily": 1,
			"text": "g",
			"rawText": "g",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "g",
			"lineHeight": 1.3
		},
		{
			"type": "text",
			"version": 948,
			"versionNonce": 607561120,
			"isDeleted": false,
			"id": "XdMOo9iL",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 774.1164159814655,
			"y": -682.3585491040385,
			"strokeColor": "#5c940d",
			"backgroundColor": "#ffffff",
			"width": 5.7613067626953125,
			"height": 28.489145658616444,
			"seed": 1204718758,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 21.914727429704957,
			"fontFamily": 1,
			"text": "l",
			"rawText": "l",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "l",
			"lineHeight": 1.3
		},
		{
			"type": "text",
			"version": 935,
			"versionNonce": 1546126432,
			"isDeleted": false,
			"id": "izMdlSsx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 782.8823069533466,
			"y": -682.3585491040385,
			"strokeColor": "#d9480f",
			"backgroundColor": "#ffffff",
			"width": 11.982650756835938,
			"height": 28.48914565861645,
			"seed": 1960970214,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 21.914727429704957,
			"fontFamily": 1,
			"text": "e",
			"rawText": "e",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "e",
			"lineHeight": 1.3000000000000003
		},
		{
			"type": "rectangle",
			"version": 869,
			"versionNonce": 1569780128,
			"isDeleted": false,
			"id": "V4DlMY0fanGv1u-qBlBOq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 687.4314941484124,
			"y": -647.9889515851182,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 134.16683126408196,
			"height": 19.771954081022606,
			"seed": 6560550,
			"groupIds": [
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 905,
			"versionNonce": 896039008,
			"isDeleted": false,
			"id": "sbjx-ckMAvGVQIgC2EKoa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 805.3570774173661,
			"y": -643.0459630648629,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.835099044411467,
			"height": 6.735436020634421,
			"seed": 1354876518,
			"groupIds": [
				"KKM3T1kiTDI2UCrv83Fhq",
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 903,
			"versionNonce": 230800800,
			"isDeleted": false,
			"id": "Bnk1MF_hHq_dtb71Xa27Q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 813.0217905979018,
			"y": -636.3704506411364,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.9862784611917985,
			"height": 5.085941484968847,
			"seed": 1992821158,
			"groupIds": [
				"KKM3T1kiTDI2UCrv83Fhq",
				"Ph1nEmOlct-5DmUJiWHna",
				"LKNMDPFgut8OubMeaF7p2",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.9862784611917985,
					5.085941484968847
				]
			]
		},
		{
			"type": "text",
			"version": 1294,
			"versionNonce": 1987734624,
			"isDeleted": false,
			"id": "yIBmoZ3b",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 460.70654148609594,
			"y": -580.0377504473968,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 85.75489807128906,
			"height": 38.34606664685638,
			"seed": 1638130918,
			"groupIds": [
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 30.030870612857136,
			"fontFamily": 1,
			"text": "Mobile",
			"rawText": "Mobile",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Mobile",
			"lineHeight": 1.276888277439391
		},
		{
			"type": "rectangle",
			"version": 2239,
			"versionNonce": 368642464,
			"isDeleted": false,
			"id": "qpTe1Z-V3NpdCTO7xDz0X",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 424.1881412205149,
			"y": -826.8696649143326,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 158.88799360370288,
			"height": 242.99796412645367,
			"seed": 316823590,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2461,
			"versionNonce": 690872416,
			"isDeleted": false,
			"id": "hu77snj2V4i4fnSlCRO3Z",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 431.5747335985544,
			"y": -818.3466819590785,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 142.48575746374448,
			"height": 226.6954840610708,
			"seed": 1383097190,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2476,
			"versionNonce": 828822944,
			"isDeleted": false,
			"id": "cLz2kk4ne3IyjrA0bdTMj",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 499.6608970192352,
			"y": -820.4429428946969,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 9.8015549628143,
			"height": 9.8015549628143,
			"seed": 1654326950,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2130,
			"versionNonce": 491967584,
			"isDeleted": false,
			"id": "31PG5Q_RDjTUmZkACjC8k",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 438.26677110061394,
			"y": -801.9727991972313,
			"strokeColor": "#000000",
			"backgroundColor": "#15aabf",
			"width": 128.02124883833554,
			"height": 59.75125078684551,
			"seed": 873415142,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2159,
			"versionNonce": 893067680,
			"isDeleted": false,
			"id": "EZ7wDQmJ16yQDf62RN-6a",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 446.9102400705143,
			"y": -729.7563227846285,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 44.82786000305885,
			"height": 34.901277498386165,
			"seed": 433722662,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2208,
			"versionNonce": 683231328,
			"isDeleted": false,
			"id": "jCoZjDNUKoRQlX-CB_QXX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 518.617968934355,
			"y": -662.8777344136874,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 40.50612551810942,
			"height": 29.499109392199383,
			"seed": 2104000614,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1155,
			"versionNonce": 1353051552,
			"isDeleted": false,
			"id": "cxrY9Vlb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 499.9754213288662,
			"y": -732.9115683855362,
			"strokeColor": "#495057",
			"backgroundColor": "transparent",
			"width": 71.6641845703125,
			"height": 58.3434155468175,
			"seed": 310870950,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783859,
			"link": null,
			"locked": false,
			"fontSize": 4.729665999206178,
			"fontFamily": 1,
			"text": "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit,sed\n do eiusmod tempor incididunt\n ut labore et dolore magna\n aliqua. Ut enim ad miveniam,\n quis nostrud exercitaullamco \nlaboris nisi ut aliquip ex ea \nommodo consequat. Duis aute \nirure dolor in reprehenderit i",
			"rawText": "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit,sed\n do eiusmod tempor incididunt\n ut labore et dolore magna\n aliqua. Ut enim ad miveniam,\n quis nostrud exercitaullamco \nlaboris nisi ut aliquip ex ea \nommodo consequat. Duis aute \nirure dolor in reprehenderit i",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit,sed\n do eiusmod tempor incididunt\n ut labore et dolore magna\n aliqua. Ut enim ad miveniam,\n quis nostrud exercitaullamco \nlaboris nisi ut aliquip ex ea \nommodo consequat. Duis aute \nirure dolor in reprehenderit i",
			"lineHeight": 1.3706256908018875
		},
		{
			"type": "text",
			"version": 1198,
			"versionNonce": 1731279968,
			"isDeleted": false,
			"id": "ACbVHD62",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 441.09178897142885,
			"y": -685.4031396502764,
			"strokeColor": "#495057",
			"backgroundColor": "transparent",
			"width": 71.6641845703125,
			"height": 58.3434155468175,
			"seed": 191110886,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false,
			"fontSize": 4.729665999206178,
			"fontFamily": 1,
			"text": "Lorem ipsum dolor s, \nconsectetur adipng d\n do eiusmopor incididunt\nut labore et dolore magna\naliqua. Ut enim ad miveniam,\nquis nostrud exercitaullamco \nlaboris nisi ut aliquip ex ea \nommodo consequat. Duis aute \n",
			"rawText": "Lorem ipsum dolor s, \nconsectetur adipng d\n do eiusmopor incididunt\nut labore et dolore magna\naliqua. Ut enim ad miveniam,\nquis nostrud exercitaullamco \nlaboris nisi ut aliquip ex ea \nommodo consequat. Duis aute \n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lorem ipsum dolor s, \nconsectetur adipng d\n do eiusmopor incididunt\nut labore et dolore magna\naliqua. Ut enim ad miveniam,\nquis nostrud exercitaullamco \nlaboris nisi ut aliquip ex ea \nommodo consequat. Duis aute \n",
			"lineHeight": 1.3706256908018875
		},
		{
			"type": "rectangle",
			"version": 2261,
			"versionNonce": 1289173408,
			"isDeleted": false,
			"id": "vN-5qtvLW8SM1jxD_2qUG",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 439.49155749362046,
			"y": -625.0558940941823,
			"strokeColor": "#000000",
			"backgroundColor": "#15aabf",
			"width": 128.02124883833554,
			"height": 20.571573995492262,
			"seed": 1284198950,
			"groupIds": [
				"UVt7BT2Tyn7PqrjP3pxRy",
				"10oOTPITdPhuU2scM-Bcs",
				"5k8-hPTzKDz8HWCHmTRe0"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1930,
			"versionNonce": 2055909472,
			"isDeleted": false,
			"id": "sKpUldSUe9aG6lFr-os91",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1900.8611805957628,
			"y": -738.3029909716487,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 229.15595246467387,
			"height": 21.81624030867613,
			"seed": 1902022336,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "PAygpytLM6JGFWbXPrOFH",
				"focus": 0.9474665456192557,
				"gap": 14.861936421465202
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-113.9136787974303,
					21.81624030867613
				],
				[
					-229.15595246467387,
					20.4946206562297
				]
			]
		},
		{
			"type": "arrow",
			"version": 1571,
			"versionNonce": 1291781536,
			"isDeleted": false,
			"id": "T5LtQqsybOX_YbKMme4_4",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1606.0817486754606,
			"y": -730.0040682321995,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 178.32766752377063,
			"height": 148.368513056275,
			"seed": 1491541312,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "nt0tUhmDkHiC8N03EPhfs",
				"focus": 1.2649463339007112,
				"gap": 12.695682290491959
			},
			"endBinding": {
				"elementId": "v4kt-ARfpU8zcZlSeSWdc",
				"focus": 1.4334399177492558,
				"gap": 10.745986782836212
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-177.4675802104615,
					51.85065090256023
				],
				[
					-178.32766752377063,
					148.368513056275
				]
			]
		},
		{
			"type": "arrow",
			"version": 1013,
			"versionNonce": 1251320928,
			"isDeleted": false,
			"id": "3IVUe5tSxsqqkUZgeOqqV",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1848.9274291392696,
			"y": -494.7200905176443,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 173.64659400760388,
			"height": 193.43332681199524,
			"seed": 394368704,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "vaBljZs6Xsfg2ByxS2fMb",
				"focus": 1.0556238155401163,
				"gap": 8.830522124555955
			},
			"endBinding": {
				"elementId": "2IIbIsp3eopTrfWcuwVdP",
				"focus": 0.32153799547805806,
				"gap": 8.965207504809598
			},
			"lastCommittedPoint": null,
			"startArrowhead": "arrow",
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-43.64659400760411,
					-170.0999934786622
				],
				[
					-173.64659400760388,
					-193.43332681199524
				]
			]
		},
		{
			"type": "ellipse",
			"version": 640,
			"versionNonce": 239948192,
			"isDeleted": false,
			"id": "z1UyFGgijam0uIYgmWi4N",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1377.2614442498916,
			"y": -582.3914766410903,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 85033210,
			"groupIds": [
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "sKpUldSUe9aG6lFr-os91",
					"type": "arrow"
				},
				{
					"id": "5QV6onNsAlDUCvdmTq6Oo",
					"type": "arrow"
				}
			],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 585,
			"versionNonce": 1159862368,
			"isDeleted": false,
			"id": "v4kt-ARfpU8zcZlSeSWdc",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1397.389783683895,
			"y": -570.8895683930883,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 132862394,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 558,
			"versionNonce": 670178720,
			"isDeleted": false,
			"id": "DNLnuPc5vfs3UEnzU475h",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1404.5784763388963,
			"y": -563.7008757380871,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1489832570,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 560,
			"versionNonce": 503319648,
			"isDeleted": false,
			"id": "lHEiQXruuMpy6DbkJicwT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1403.8596070733963,
			"y": -551.4800982245849,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1048161082,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 569,
			"versionNonce": 1260218784,
			"isDeleted": false,
			"id": "Af6H46kDF1lTDMjpUz6Py",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1403.8596070733963,
			"y": -537.1027129145824,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 794047482,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 638,
			"versionNonce": 251625568,
			"isDeleted": false,
			"id": "GpoeAwXE5dIBs0lEQQ9MZ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1411.0482997283975,
			"y": -555.0744445520855,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1566549178,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 612,
			"versionNonce": 50279840,
			"isDeleted": false,
			"id": "LoXxNuAuIHesCBR90eobx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1418.2369923833987,
			"y": -547.8857518970843,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1111424378,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 614,
			"versionNonce": 401634400,
			"isDeleted": false,
			"id": "ihF0DejI6D3YS3vFZxYxj",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1417.5181231178985,
			"y": -535.6649743835821,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 724909626,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 623,
			"versionNonce": 1959231904,
			"isDeleted": false,
			"id": "RSl8HmQsQSbZTNHt-hF5v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1417.5181231178985,
			"y": -521.2875890735797,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1160079098,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 622,
			"versionNonce": 1050863712,
			"isDeleted": false,
			"id": "XhkuetTLlCQdNfmWTLb5q",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1426.8634235694003,
			"y": -545.0102748350838,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 680687546,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 596,
			"versionNonce": 530992544,
			"isDeleted": false,
			"id": "nfpDZjuBSQiDUarex57Xz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1434.0521162244015,
			"y": -537.8215821800826,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1704947834,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 598,
			"versionNonce": 1323752544,
			"isDeleted": false,
			"id": "Rw-Xj8b22FJufKdd1r8he",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1433.3332469589013,
			"y": -525.6008046665804,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 269439290,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 607,
			"versionNonce": 483105184,
			"isDeleted": false,
			"id": "XyufN6m3Rlo5jiHEdWfWX",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1433.3332469589013,
			"y": -511.2234193565779,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1262819834,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 639,
			"versionNonce": 445403232,
			"isDeleted": false,
			"id": "OKFEXmSuyTR0BinTKjQVn",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1438.3653318174022,
			"y": -532.0706280560815,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1447283386,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 613,
			"versionNonce": 1600611744,
			"isDeleted": false,
			"id": "g__0_au0EK5jFSGPp3BP1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1445.5540244724034,
			"y": -524.8819354010803,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 397304698,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 615,
			"versionNonce": 962806880,
			"isDeleted": false,
			"id": "zcKyfZtuCg2YU4SM4xkMf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1444.8351552069034,
			"y": -512.6611578875782,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 700965946,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 624,
			"versionNonce": 1957278112,
			"isDeleted": false,
			"id": "x60jMgyreU2bGhTUnQy8r",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1444.8351552069034,
			"y": -498.28377257757563,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1718832378,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 545,
			"versionNonce": 1228650592,
			"isDeleted": false,
			"id": "nm1VEi3v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1388.7633524978937,
			"y": -471.68560975407104,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 97.05978393554688,
			"height": 71.88692655001252,
			"seed": 1932762554,
			"groupIds": [
				"lIM5oWkUljVdSRY6hHbwq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714137783860,
			"link": null,
			"locked": false,
			"fontSize": 28.754770620005008,
			"fontFamily": 1,
			"text": " Main \nService",
			"rawText": " Main \nService",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": " Main \nService",
			"lineHeight": 1.25
		},
		{
			"type": "ellipse",
			"version": 1125,
			"versionNonce": 1136819616,
			"isDeleted": false,
			"id": "epdVoUdP3yMf_i9s1SJp-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1895.5947775832246,
			"y": -754.058143307757,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 579079488,
			"groupIds": [
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "WyM64MRAi_hQ0WnO58U6d",
					"type": "arrow"
				}
			],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1070,
			"versionNonce": 770026592,
			"isDeleted": false,
			"id": "PAygpytLM6JGFWbXPrOFH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1915.723117017228,
			"y": -742.556235059755,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1098802880,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "sKpUldSUe9aG6lFr-os91",
					"type": "arrow"
				}
			],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1041,
			"versionNonce": 1306642848,
			"isDeleted": false,
			"id": "EAgBQmk1SJfhQuwluGLFH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1922.9118096722293,
			"y": -735.3675424047537,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1762682176,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1043,
			"versionNonce": 1362174048,
			"isDeleted": false,
			"id": "0YMrgsrWzJC4EPkQEqD_x",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1922.1929404067293,
			"y": -723.1467648912516,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 981700288,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1052,
			"versionNonce": 1849136544,
			"isDeleted": false,
			"id": "K6Md31cWOF6ggFEHts4ZM",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1922.1929404067293,
			"y": -708.769379581249,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1280425280,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1122,
			"versionNonce": 1659769952,
			"isDeleted": false,
			"id": "mZ0TSb-mZRjlN5Gmieac6",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1929.3816330617306,
			"y": -726.7411112187522,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 681817792,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "IdnAXS5GyQ8kLCSrTKb3T",
					"type": "arrow"
				}
			],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1095,
			"versionNonce": 435413408,
			"isDeleted": false,
			"id": "u_z-eoXx9d7ZZFXlOpm3U",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1936.5703257167318,
			"y": -719.552418563751,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1839732032,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783860,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1097,
			"versionNonce": 418154592,
			"isDeleted": false,
			"id": "LZexxBZVBR-9z667zow9F",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1935.8514564512316,
			"y": -707.3316410502488,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 813620928,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1106,
			"versionNonce": 541502880,
			"isDeleted": false,
			"id": "GKkAjaH-grf_7Am5-9z89",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1935.8514564512316,
			"y": -692.9542557402464,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1114860864,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1105,
			"versionNonce": 1862040672,
			"isDeleted": false,
			"id": "y13YhrqZ0Xyxpm7DW1Oyu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1945.1967569027333,
			"y": -716.6769415017504,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1656030912,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1079,
			"versionNonce": 1784674720,
			"isDeleted": false,
			"id": "SYo_SLglBBt6H4OyelR6p",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1952.3854495577345,
			"y": -709.4882488467492,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 336840000,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1081,
			"versionNonce": 1726869600,
			"isDeleted": false,
			"id": "pm46f3V_LG5RNY748NHPH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1951.6665802922344,
			"y": -697.267471333247,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1004940992,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1090,
			"versionNonce": 997180832,
			"isDeleted": false,
			"id": "e5AG6BZbv_Vbp7DsvDGVu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1951.6665802922344,
			"y": -682.8900860232445,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2145983808,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1123,
			"versionNonce": 1217455200,
			"isDeleted": false,
			"id": "MHOhOR6ILD__ZflgoyJ5I",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1956.6986651507352,
			"y": -703.7372947227482,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 615667392,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "b8crYYIbx7Cg1eFpvw4H0",
					"type": "arrow"
				}
			],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1096,
			"versionNonce": 1889931680,
			"isDeleted": false,
			"id": "TyUDmPguiEaKdQxVf7_M_",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1963.8873578057364,
			"y": -696.548602067747,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2001958208,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1098,
			"versionNonce": 1639274592,
			"isDeleted": false,
			"id": "mfPt6lYW38GdCuHGWaZTA",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1963.1684885402365,
			"y": -684.3278245542448,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1907982016,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1107,
			"versionNonce": 1093852576,
			"isDeleted": false,
			"id": "0_K7NhnUT2nIq9FEQrpu7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1963.1684885402365,
			"y": -669.9504392442423,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1068682560,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1035,
			"versionNonce": 1177242720,
			"isDeleted": false,
			"id": "fH3LGqwb",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1907.0966858312268,
			"y": -643.3522764207377,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 116.40850830078125,
			"height": 71.88692655001252,
			"seed": 1671145152,
			"groupIds": [
				"h_BUGXgYdm9CJzsY7Zopa"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false,
			"fontSize": 28.754770620005008,
			"fontFamily": 1,
			"text": "Channel \nService",
			"rawText": "Channel \nService",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Channel \nService",
			"lineHeight": 1.25
		},
		{
			"type": "ellipse",
			"version": 1694,
			"versionNonce": 2118527392,
			"isDeleted": false,
			"id": "GSlmI5e7jUq5iDmCQlUMJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1805.5947775832228,
			"y": -497.3914766410903,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 159268544,
			"groupIds": [
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1643,
			"versionNonce": 264421472,
			"isDeleted": false,
			"id": "vaBljZs6Xsfg2ByxS2fMb",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1825.7231170172263,
			"y": -485.8895683930883,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 60427584,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				},
				{
					"id": "O9LQf7NsQhIxvDW5x8X1b",
					"type": "arrow"
				}
			],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1615,
			"versionNonce": 1393554848,
			"isDeleted": false,
			"id": "79AGDquzmuYvl4Li2CvyY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1832.9118096722275,
			"y": -478.7008757380871,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 617113280,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1616,
			"versionNonce": 508277856,
			"isDeleted": false,
			"id": "5Q7b3FI_J5Us1ab3PEqwP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1832.1929404067275,
			"y": -466.48009822458494,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 929457472,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1625,
			"versionNonce": 79708576,
			"isDeleted": false,
			"id": "00vwJHarQ1v7lvkq5Pica",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1832.1929404067275,
			"y": -452.1027129145824,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 613256896,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1697,
			"versionNonce": 1469458528,
			"isDeleted": false,
			"id": "LaN2NEWO-A6l8ea1eHX60",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1839.3816330617287,
			"y": -470.07444455208554,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1609022784,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1668,
			"versionNonce": 847711648,
			"isDeleted": false,
			"id": "te5OscxTPwn1gzzCNzQm_",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1846.57032571673,
			"y": -462.88575189708433,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1097709248,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1670,
			"versionNonce": 1735531616,
			"isDeleted": false,
			"id": "WDYHhGju-RKxR4VTvY8N-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1845.8514564512298,
			"y": -450.66497438358215,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 511579456,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1679,
			"versionNonce": 362043808,
			"isDeleted": false,
			"id": "sfr6Igy7giLmpoEKYMyRU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1845.8514564512298,
			"y": -436.28758907357974,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 537452224,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1678,
			"versionNonce": 2142212192,
			"isDeleted": false,
			"id": "o-kc2O5yCSZgx8qJj5_wG",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1855.1967569027315,
			"y": -460.0102748350838,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1753836864,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1652,
			"versionNonce": 1092101536,
			"isDeleted": false,
			"id": "-oOE2HFc9rmwoZfugKJ6v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1862.3854495577327,
			"y": -452.8215821800826,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1358890688,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1654,
			"versionNonce": 404653152,
			"isDeleted": false,
			"id": "PpirpOzl0g0oZKffELR0Q",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1861.6665802922325,
			"y": -440.6008046665804,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 124372288,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1663,
			"versionNonce": 1648521632,
			"isDeleted": false,
			"id": "uOkZZ9TJh1o9Qngx3m6SL",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1861.6665802922325,
			"y": -426.2234193565779,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1357917888,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1695,
			"versionNonce": 781121632,
			"isDeleted": false,
			"id": "s7v1DtoiIecHp2j_9YUIU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1866.6986651507334,
			"y": -447.07062805608155,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 410983744,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1669,
			"versionNonce": 4406688,
			"isDeleted": false,
			"id": "G3TCeLodGaha6EZa8_h9Z",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1873.8873578057346,
			"y": -439.88193540108034,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 142366400,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1671,
			"versionNonce": 114355296,
			"isDeleted": false,
			"id": "qOw-hzKA1GKxcXk4l-Xk1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1873.1684885402346,
			"y": -427.66115788757816,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 220820800,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1680,
			"versionNonce": 1011517856,
			"isDeleted": false,
			"id": "BQM-M-LSpkCHOEyv3igdW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1873.1684885402346,
			"y": -413.28377257757563,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1279491776,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b",
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1660,
			"versionNonce": 1790206048,
			"isDeleted": false,
			"id": "goqrN6wV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1807.096685831225,
			"y": -386.68560975407104,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 124.4010009765625,
			"height": 107.83038982501878,
			"seed": 717802816,
			"groupIds": [
				"BEUtJrZ6oWtvN4_CtB9-I"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783861,
			"link": null,
			"locked": false,
			"fontSize": 28.754770620005008,
			"fontFamily": 1,
			"text": "Content \nAnalysis \nService",
			"rawText": "Content \nAnalysis \nService",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Content \nAnalysis \nService",
			"lineHeight": 1.25
		},
		{
			"type": "ellipse",
			"version": 1611,
			"versionNonce": 294147488,
			"isDeleted": false,
			"id": "2IIbIsp3eopTrfWcuwVdP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1575.453901554188,
			"y": -759.8806900569119,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 96.69309462915602,
			"height": 94.18158567774937,
			"seed": 118707520,
			"groupIds": [
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				},
				{
					"id": "ACDqpyxuesxKi_YA4tyJL",
					"type": "arrow"
				}
			],
			"updated": 1714137783861,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1561,
			"versionNonce": 1778996320,
			"isDeleted": false,
			"id": "Vc-m_YZk8RA7Ni4Wg_l1Y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1593.0344642140344,
			"y": -749.8346542512853,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 209104192,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				},
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1533,
			"versionNonce": 355246496,
			"isDeleted": false,
			"id": "LJHIdDOwCgWwF1o2BUI5K",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1599.3132365925512,
			"y": -743.5558818727687,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1001325888,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				},
				{
					"id": "53ILdE1xm5mBIijONewJC",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1533,
			"versionNonce": 446679136,
			"isDeleted": false,
			"id": "0jGSBLOoR8dm_27jU4rwB",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1598.6853593546994,
			"y": -732.8819688292905,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 303848768,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1543,
			"versionNonce": 912747936,
			"isDeleted": false,
			"id": "_6j06czfMwVBinmMec1N2",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1598.6853593546994,
			"y": -720.3244240722572,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1629402432,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1611,
			"versionNonce": 1481096288,
			"isDeleted": false,
			"id": "qqM5WUbIRO5NAPFTe8Mho",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1604.9641317332162,
			"y": -736.0213550185488,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 1310068032,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1585,
			"versionNonce": 2120792480,
			"isDeleted": false,
			"id": "dc9LtKCoz7BbkWxr9_Cvy",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1611.2429041117325,
			"y": -729.7425826400321,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1382180160,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1588,
			"versionNonce": 80818272,
			"isDeleted": false,
			"id": "TQWSiMBHBF8A6SW45dbYD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1610.615026873881,
			"y": -719.0686695965538,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 996392256,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1596,
			"versionNonce": 1348502944,
			"isDeleted": false,
			"id": "p06VNb8utGT11NTWPpQs3",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1610.615026873881,
			"y": -706.5111248395207,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 712643904,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1596,
			"versionNonce": 1208755296,
			"isDeleted": false,
			"id": "nt0tUhmDkHiC8N03EPhfs",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1618.7774309659526,
			"y": -727.2310736886255,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 352677184,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1569,
			"versionNonce": 696177056,
			"isDeleted": false,
			"id": "7uamUervLGxKbl9MhU8xw",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1625.0562033444694,
			"y": -720.9523013101089,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1147520320,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1571,
			"versionNonce": 1338546272,
			"isDeleted": false,
			"id": "i1kLhgOavjeI1ftLKE036",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1624.4283261066175,
			"y": -710.2783882666306,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1442520384,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1580,
			"versionNonce": 1626578336,
			"isDeleted": false,
			"id": "UgV9c0Agj4k2AmZtpeqQJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1624.4283261066175,
			"y": -697.7208435095973,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 992310592,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1613,
			"versionNonce": 265718880,
			"isDeleted": false,
			"id": "4hq7vnIrn23EvX-smh02y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1628.8234667715792,
			"y": -715.9292834072955,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 960810304,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1588,
			"versionNonce": 1743710624,
			"isDeleted": false,
			"id": "n-ckNLwdKFypMUmFPTZW7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1635.102239150096,
			"y": -709.650511028779,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1773741376,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1588,
			"versionNonce": 33947744,
			"isDeleted": false,
			"id": "dQqPM_0mOBGzfeYU5S_sm",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1634.4743619122441,
			"y": -698.9765979853007,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 971144512,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1597,
			"versionNonce": 161527200,
			"isDeleted": false,
			"id": "7GGbwkpjDghuz3wcCHAtN",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1634.4743619122441,
			"y": -686.4190532282674,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1797313856,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1601,
			"versionNonce": 1713828960,
			"isDeleted": false,
			"id": "a5fEmhU7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1543.6414548363705,
			"y": -659.0017471754114,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 203.43548583984375,
			"height": 62.78772378516625,
			"seed": 315895104,
			"groupIds": [
				"XD9iIN5BADGGAKdepiCW1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"fontSize": 25.1150895140665,
			"fontFamily": 1,
			"text": "Recommendation \n   Service",
			"rawText": "Recommendation \n   Service",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Recommendation \n   Service",
			"lineHeight": 1.25
		},
		{
			"type": "text",
			"version": 1978,
			"versionNonce": 725156256,
			"isDeleted": false,
			"id": "VaAiB2VJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2229.7380417870886,
			"y": -900.0409285860552,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.142822265625,
			"height": 37.27579646895363,
			"seed": 1599981248,
			"groupIds": [
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"fontSize": 31.063163724128028,
			"fontFamily": 1,
			"text": "RDS",
			"rawText": "RDS",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "RDS",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1735,
			"versionNonce": 34170976,
			"isDeleted": false,
			"id": "KAaV-QTO59RxROnreu97C",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2211.2858691448932,
			"y": -1009.02641841888,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 101.08084106445294,
			"height": 101.08084106445294,
			"seed": 628551360,
			"groupIds": [
				"VKwifsy9qzwUZRl9ZN5gf",
				"Gdm0SVqzDCssFi2NITnWE",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "WyM64MRAi_hQ0WnO58U6d",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2587,
			"versionNonce": 199740832,
			"isDeleted": false,
			"id": "dRAaKVGQr6cD0zwzZjorv",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 2290.157342871873,
			"y": -932.4088501818065,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.012737581657009,
			"height": 10.57610619368553,
			"seed": 506140352,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					7.012737581657009,
					10.57610619368553
				]
			]
		},
		{
			"type": "line",
			"version": 2480,
			"versionNonce": 1635605600,
			"isDeleted": false,
			"id": "oTOyGNKr2cEYmYe6eSgOH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.029928014204294584,
			"x": 2295.598164865677,
			"y": -997.9039792385095,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.57665040349346,
			"height": 11.163737885090274,
			"seed": 1041907392,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-7.57665040349346,
					11.163737885090274
				]
			]
		},
		{
			"type": "line",
			"version": 3087,
			"versionNonce": 81598880,
			"isDeleted": false,
			"id": "yqLUkBpzMMsmnD89SXydH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.765434113477622,
			"x": 2302.150876333476,
			"y": -927.5305765215907,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.914795147667562,
			"height": 7.805897785531529,
			"seed": 1709467328,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.124975464628574,
					7.805897785531529
				],
				[
					-10.914795147667562,
					3.1601175975256326
				]
			]
		},
		{
			"type": "line",
			"version": 3305,
			"versionNonce": 374526048,
			"isDeleted": false,
			"id": "y2d6lCkd1iqJ3Xo7mS2dx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.48666424209895,
			"x": 2229.0094726078482,
			"y": -998.9037341117355,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 1646890688,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.739914848809785,
					6.8785352962834105
				],
				[
					-10.065410662827956,
					0.6498078623687248
				]
			]
		},
		{
			"type": "line",
			"version": 2681,
			"versionNonce": 1229514144,
			"isDeleted": false,
			"id": "YestT38NN0kYlUoPABMUs",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 2224.0102054137924,
			"y": -996.8322914261892,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.012737581657009,
			"height": 10.57610619368553,
			"seed": 1804187328,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					7.012737581657009,
					10.57610619368553
				]
			]
		},
		{
			"type": "line",
			"version": 2544,
			"versionNonce": 2019148896,
			"isDeleted": false,
			"id": "T3raV22AUirE7j1dq4AL8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.06885648930104615,
			"x": 2231.812791329259,
			"y": -932.7950471589979,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.57665040349346,
			"height": 11.163737885090274,
			"seed": 648339136,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-7.57665040349346,
					11.163737885090274
				]
			]
		},
		{
			"type": "line",
			"version": 3314,
			"versionNonce": 643510688,
			"isDeleted": false,
			"id": "p_Cd85u5VSHJo6eivVUB5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.854199750177644,
			"x": 2300.625737438956,
			"y": -1000.1315167616197,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 605750976,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.739914848809785,
					6.8785352962834105
				],
				[
					-10.065410662827956,
					0.6498078623687248
				]
			]
		},
		{
			"type": "line",
			"version": 3308,
			"versionNonce": 1700935776,
			"isDeleted": false,
			"id": "NeGJGGXx40qezmkgID0t5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.663921886409196,
			"x": 2229.052743474192,
			"y": -926.1884314821308,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 1619799744,
			"groupIds": [
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.739914848809785,
					6.8785352962834105
				],
				[
					-10.065410662827956,
					0.6498078623687248
				]
			]
		},
		{
			"type": "line",
			"version": 4237,
			"versionNonce": 1128529312,
			"isDeleted": false,
			"id": "gwwCMMAZBrvx4iYvT6VsI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2242.1157698827174,
			"y": -981.6345494805903,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.9329596882709,
			"height": 57.344099073364674,
			"seed": 1150834368,
			"groupIds": [
				"Xgnrsy4LAa8Zgg3vZMN-b",
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783862,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					39.61088736564634
				],
				[
					0.6295329109921753,
					46.77397888946604
				],
				[
					4.95090249259431,
					49.40580999643203
				],
				[
					11.423279213071925,
					51.48689657240841
				],
				[
					18.325235888897208,
					52.02432457376872
				],
				[
					24.21787851057674,
					51.48847305240133
				],
				[
					29.744720635014605,
					50.16379599865726
				],
				[
					35.25733027128624,
					46.49167071235322
				],
				[
					35.634162509263284,
					39.61088736564634
				],
				[
					35.9329596882709,
					5.3954548878185005
				],
				[
					35.47925563339903,
					-0.17248851022859032
				],
				[
					31.012840328561097,
					-3.142750929784986
				],
				[
					26.00015432729276,
					-4.825349405374254
				],
				[
					19.483446305237738,
					-5.319774499595958
				],
				[
					15.347368089355312,
					-5.305385836282697
				],
				[
					6.5398545540219715,
					-4.2351885794904565
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 2394,
			"versionNonce": 20720736,
			"isDeleted": false,
			"id": "30rX2VQxBJCRbitDCPL_V",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2241.9834691175533,
			"y": -987.1450723947212,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 35.869338881988476,
			"height": 9.75268955332379,
			"seed": 618626752,
			"groupIds": [
				"Xgnrsy4LAa8Zgg3vZMN-b",
				"mnBwFfDtgsX9m2qigkLSS",
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "5ptbPmHfQLkfJ-3sHJTWh",
					"type": "arrow"
				},
				{
					"id": "9dqvYiuxpR39AsuYNGx9L",
					"type": "arrow"
				}
			],
			"updated": 1714137783862,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2235,
			"versionNonce": 1630751136,
			"isDeleted": false,
			"id": "WwTHsx0ICM3m8xaXB1ADw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2242.604278925597,
			"y": -967.4783510396235,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.2689376620743,
			"height": 4.531369714274167,
			"seed": 1107404480,
			"groupIds": [
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.0595753817228932,
					1.1456490613014476
				],
				[
					3.6243722085384986,
					2.332798260424539
				],
				[
					6.699342107664948,
					3.051312155157364
				],
				[
					12.722941809839984,
					3.9975604764899777
				],
				[
					18.50947742695174,
					4.056686878136022
				],
				[
					23.637446748125353,
					3.7315336210105956
				],
				[
					28.074584258577826,
					3.1404954995460814
				],
				[
					32.256420129443036,
					2.03642402577916
				],
				[
					34.414184974381065,
					0.8009010268157583
				],
				[
					35.2689376620743,
					-0.47468283613814555
				]
			]
		},
		{
			"type": "line",
			"version": 2263,
			"versionNonce": 1974968416,
			"isDeleted": false,
			"id": "dKwGKuq9DvTd3aYKSfTgt",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2241.6069547729385,
			"y": -950.8059980560628,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.2689376620743,
			"height": 4.531369714274167,
			"seed": 1218367168,
			"groupIds": [
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.0595753817228932,
					1.1456490613014476
				],
				[
					3.6243722085384986,
					2.332798260424539
				],
				[
					6.699342107664948,
					3.051312155157364
				],
				[
					12.722941809839984,
					3.9975604764899777
				],
				[
					18.50947742695174,
					4.056686878136022
				],
				[
					23.637446748125353,
					3.7315336210105956
				],
				[
					28.074584258577826,
					3.1404954995460814
				],
				[
					32.256420129443036,
					2.03642402577916
				],
				[
					34.414184974381065,
					0.8009010268157583
				],
				[
					35.2689376620743,
					-0.47468283613814555
				]
			]
		},
		{
			"type": "arrow",
			"version": 5310,
			"versionNonce": 458823072,
			"isDeleted": false,
			"id": "5ptbPmHfQLkfJ-3sHJTWh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.034244644020102,
			"x": 2241.2497382772845,
			"y": -971.4914475591986,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 14.463571016844513,
			"height": 25.532582515865883,
			"seed": 1364653760,
			"groupIds": [
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "30rX2VQxBJCRbitDCPL_V",
				"focus": 0.17059876156316842,
				"gap": 9.292283166223374
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-5.382684053299236,
					1.1988168492565079
				],
				[
					-9.126721781305594,
					3.523608459748172
				],
				[
					-11.821430801806953,
					6.503085541797092
				],
				[
					-13.975008004314072,
					11.32830652073273
				],
				[
					-14.463571016844513,
					15.029331016241592
				],
				[
					-13.286124378537565,
					20.37468734885812
				],
				[
					-11.004344525155272,
					24.334841255397855
				],
				[
					-9.64394750316391,
					25.532582515865883
				]
			]
		},
		{
			"type": "arrow",
			"version": 5355,
			"versionNonce": 849646688,
			"isDeleted": false,
			"id": "9dqvYiuxpR39AsuYNGx9L",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.31086799431261625,
			"x": 2277.5217280470515,
			"y": -971.4888952466499,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 16.442530389432445,
			"height": 28.10295050046834,
			"seed": 1623858880,
			"groupIds": [
				"wLzYeseyYpw1LiQloE-GH",
				"8PlugCMnYdxFO3o6jMwjT",
				"xn2geFd-ClQVHR77rmpA7"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "30rX2VQxBJCRbitDCPL_V",
				"focus": -0.31376123802395034,
				"gap": 9.07787046494131
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					6.119162827769974,
					1.2237052834924613
				],
				[
					10.375473669002105,
					3.5967615001630455
				],
				[
					13.438882761311998,
					6.638095002948875
				],
				[
					15.887120375451193,
					11.563491580085907
				],
				[
					16.442530389432445,
					15.34135242037859
				],
				[
					15.103981139752,
					20.797682793470585
				],
				[
					12.509999713067074,
					24.840052786753095
				],
				[
					8.409831475975949,
					28.10295050046834
				]
			]
		},
		{
			"type": "text",
			"version": 2760,
			"versionNonce": 652566944,
			"isDeleted": false,
			"id": "LFqaLWXM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2107.9462847943073,
			"y": -301.03989158171765,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 164.84603881835938,
			"height": 35.40284187563427,
			"seed": 525894976,
			"groupIds": [
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"fontSize": 29.50236822969523,
			"fontFamily": 1,
			"text": "Timestream",
			"rawText": "Timestream",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Timestream",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1620,
			"versionNonce": 768804960,
			"isDeleted": false,
			"id": "o8qj_gizkJrsO1QmXD0tn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2142.374935386258,
			"y": -402.2455425289536,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 96.00194688908816,
			"height": 96.00194688908816,
			"seed": 1150672192,
			"groupIds": [
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "7tHPkd4SfIB373ExuxjVE",
					"type": "arrow"
				}
			],
			"updated": 1714137783863,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3143,
			"versionNonce": 319303072,
			"isDeleted": false,
			"id": "-VE7GMbpsjhqwe-QCWYxR",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2155.5339118617294,
			"y": -391.1217607140643,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 49.57937969326794,
			"height": 18.159772968914965,
			"seed": 141047104,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "RLZVS9uAXDCSZRRy__T4K",
					"type": "arrow"
				},
				{
					"id": "7tHPkd4SfIB373ExuxjVE",
					"type": "arrow"
				}
			],
			"updated": 1714137783863,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1311,
			"versionNonce": 588446816,
			"isDeleted": false,
			"id": "XnQ_oCbr6yBS_WkgF06LK",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2156.0292193694177,
			"y": -380.87114707055764,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.35995334837017967,
			"height": 56.512675694123224,
			"seed": 1345293632,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.35995334837017967,
					56.512675694123224
				]
			]
		},
		{
			"type": "line",
			"version": 1351,
			"versionNonce": 150043040,
			"isDeleted": false,
			"id": "bMACLa0zElPcEMs8ij_oo",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2205.198846756788,
			"y": -381.44707242794743,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.3599533483701519,
			"height": 16.678951976095433,
			"seed": 1431037248,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-0.3599533483701519,
					16.678951976095433
				]
			]
		},
		{
			"type": "line",
			"version": 1484,
			"versionNonce": 1412722784,
			"isDeleted": false,
			"id": "EmHVH6eNCb1X5Ccz0znuP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2156.425168052625,
			"y": -341.27359036231155,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.63971383820803,
			"height": 8.323775076416316,
			"seed": 622673216,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.5995334837020914,
					2.879626786961831
				],
				[
					7.918973664144641,
					5.039346877183103
				],
				[
					14.937479538783224,
					7.243915031304365
				],
				[
					22.586195982360135,
					8.323775076416316
				],
				[
					30.63971383820803,
					7.514172251873099
				]
			]
		},
		{
			"type": "line",
			"version": 1376,
			"versionNonce": 198264224,
			"isDeleted": false,
			"id": "FDR_P-KNjx6io0rBKshQR",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2156.677135396484,
			"y": -324.28648070675774,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.59370202997869,
			"height": 9.358787057625653,
			"seed": 553882944,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.1597200902212745,
					2.159720090221274
				],
				[
					7.559020315774461,
					5.399300225553185
				],
				[
					12.958320541327645,
					6.479160270663822
				],
				[
					19.07752746362124,
					6.839113619033905
				],
				[
					24.836781037544654,
					6.839113619033905
				],
				[
					30.59603461146802,
					6.839113619033905
				],
				[
					37.43514823050207,
					5.759253573923268
				],
				[
					42.47449510768503,
					3.9594868320720744
				],
				[
					46.79393528812757,
					1.079860045110637
				],
				[
					48.59370202997869,
					-2.5196734385917483
				]
			]
		},
		{
			"type": "line",
			"version": 1076,
			"versionNonce": 1225221216,
			"isDeleted": false,
			"id": "9ZTe2vV8uszgMGtqCEygk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2205.487546610655,
			"y": -334.72757625467074,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.564700143856714e-13,
			"height": 7.302675216406523,
			"seed": 2120150336,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-1.564700143856714e-13,
					7.302675216406523
				]
			]
		},
		{
			"type": "line",
			"version": 1498,
			"versionNonce": 953651616,
			"isDeleted": false,
			"id": "jEzH32PAinYRDNEcSPWb9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2156.3833021784985,
			"y": -360.04752072803717,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.63971383820803,
			"height": 8.323775076416316,
			"seed": 1183794496,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.5995334837020914,
					2.879626786961831
				],
				[
					7.918973664144641,
					5.039346877183103
				],
				[
					14.937479538783224,
					7.243915031304365
				],
				[
					22.586195982360135,
					8.323775076416316
				],
				[
					30.63971383820803,
					7.514172251873099
				]
			]
		},
		{
			"type": "line",
			"version": 813,
			"versionNonce": 257677408,
			"isDeleted": false,
			"id": "mXNsYL40YS87oGfblnU--",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2192.0241899936245,
			"y": -362.2804827030705,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 33.1937158062507,
			"height": 27.526496034452418,
			"seed": 1458871616,
			"groupIds": [
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					27.526496034452418
				],
				[
					33.1937158062507,
					27.526496034452418
				]
			]
		},
		{
			"type": "arrow",
			"version": 1328,
			"versionNonce": 120872352,
			"isDeleted": false,
			"id": "RLZVS9uAXDCSZRRy__T4K",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2196.0699466294705,
			"y": -359.75125214239443,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.52165667442574,
			"height": 13.718098279875628,
			"seed": 1626273088,
			"groupIds": [
				"laEf4gu_vplrPCBx8kW80",
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "-VE7GMbpsjhqwe-QCWYxR",
				"focus": 2.454945017800435,
				"gap": 14.809161682799413
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					6.630414168606414,
					0
				],
				[
					8.916763881918934,
					3.6581595412999532
				],
				[
					12.346288451887837,
					-0.9145398853252535
				],
				[
					18.748067649163033,
					5.715874283281509
				],
				[
					26.52165667442574,
					12.803558394550373
				]
			]
		},
		{
			"type": "arrow",
			"version": 964,
			"versionNonce": 2063715424,
			"isDeleted": false,
			"id": "3u9V1cU172HyNwFYHj_NO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2195.384041715477,
			"y": -342.6036292925505,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.978926617088188,
			"height": 19.433972563156786,
			"seed": 1776176448,
			"groupIds": [
				"laEf4gu_vplrPCBx8kW80",
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					8.002223996593937,
					-8.459493939256568
				],
				[
					17.14762284984418,
					-8.002223996594116
				],
				[
					19.891242505819235,
					-10.745843652569173
				],
				[
					26.978926617088188,
					-19.433972563156786
				]
			]
		},
		{
			"type": "arrow",
			"version": 915,
			"versionNonce": 135768480,
			"isDeleted": false,
			"id": "nqAnT_VHfKqtmn-BQMIqp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2195.384041715477,
			"y": -349.9199483751501,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.207561588419505,
			"height": 10.517208681237769,
			"seed": 1260561728,
			"groupIds": [
				"laEf4gu_vplrPCBx8kW80",
				"y0wzuqGASvWGN28xvxF12",
				"shETBm6S-rJdALhajMJUL",
				"kkB7BGQxFzb47vZ2dtR52"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					9.831303767244007,
					10.517208681237769
				],
				[
					13.94673325120659,
					5.0299693692876595
				],
				[
					16.461717935850423,
					8.916763881919017
				],
				[
					27.207561588419505,
					8.916763881919017
				]
			]
		},
		{
			"type": "text",
			"version": 2437,
			"versionNonce": 1707688032,
			"isDeleted": false,
			"id": "NCRV6sk1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2219.016288303829,
			"y": -688.4180028005665,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 128.57763671875,
			"height": 40.288174827240816,
			"seed": 1869409984,
			"groupIds": [
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"fontSize": 33.57347902270068,
			"fontFamily": 1,
			"text": "Neptune",
			"rawText": "Neptune",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Neptune",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1309,
			"versionNonce": 649164192,
			"isDeleted": false,
			"id": "GZIXUSrSj5zwQKY9sv4bF",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2228.7015333706913,
			"y": -803.5892925289536,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 109.24951261285652,
			"height": 109.24951261285652,
			"seed": 962664128,
			"groupIds": [
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2530,
			"versionNonce": 1870804064,
			"isDeleted": false,
			"id": "g97xWXZeQ2aieyiWMnya1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2244.3089445299943,
			"y": -788.363084314745,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 52.96920640933012,
			"height": 19.40138760686516,
			"seed": 43007680,
			"groupIds": [
				"WsVOLNAbcd4gNXzKfnKuN",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 702,
			"versionNonce": 1748091296,
			"isDeleted": false,
			"id": "4EsPYjaOClcdAFH_Fadiu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2244.838117056419,
			"y": -777.4116187404632,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.3845639724721782,
			"height": 60.376543678137324,
			"seed": 731539136,
			"groupIds": [
				"WsVOLNAbcd4gNXzKfnKuN",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3845639724721782,
					60.376543678137324
				]
			]
		},
		{
			"type": "line",
			"version": 734,
			"versionNonce": 1039968352,
			"isDeleted": false,
			"id": "qbMIz0gZ5B4o3eru0Kpdm",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2297.3695556961225,
			"y": -778.0269210964163,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.1817949871701327,
			"height": 17.15856077432575,
			"seed": 18845376,
			"groupIds": [
				"WsVOLNAbcd4gNXzKfnKuN",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.1817949871701327,
					17.15856077432575
				]
			]
		},
		{
			"type": "line",
			"version": 803,
			"versionNonce": 734563744,
			"isDeleted": false,
			"id": "-rNkCzjab6XfXb2c3fcfg",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2244.838117056419,
			"y": -756.4144258434803,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.379217109582335,
			"height": 9.229535339333117,
			"seed": 1002419904,
			"groupIds": [
				"WsVOLNAbcd4gNXzKfnKuN",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.8456397247220973,
					3.4610757522499194
				],
				[
					8.460407394388657,
					5.768459587083198
				],
				[
					14.228866981471855,
					7.691279449443565
				],
				[
					21.53558245844398,
					8.844971366861046
				],
				[
					28.45773396294377,
					9.229535339333117
				],
				[
					34.99532149497138,
					8.46040739438855
				],
				[
					40.379217109582335,
					6.922151504499839
				]
			]
		},
		{
			"type": "line",
			"version": 820,
			"versionNonce": 1023974496,
			"isDeleted": false,
			"id": "cZGyvXjWVRWsTN74yRlUJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2245.2611374261373,
			"y": -736.5771360462304,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.379217109582335,
			"height": 8.460407394388971,
			"seed": 1760960,
			"groupIds": [
				"WsVOLNAbcd4gNXzKfnKuN",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.8456397247220973,
					3.076511779777846
				],
				[
					8.460407394388657,
					5.383895614611125
				],
				[
					14.228866981471855,
					7.30671547697149
				],
				[
					21.53558245844398,
					8.460407394388971
				],
				[
					28.842297935415996,
					8.460407394388971
				],
				[
					34.99532149497138,
					8.07584342191648
				],
				[
					40.379217109582335,
					6.537587532027766
				]
			]
		},
		{
			"type": "line",
			"version": 764,
			"versionNonce": 1789254048,
			"isDeleted": false,
			"id": "zatTq4ohJ02yS_fxDKsVv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2245.5303322068685,
			"y": -716.9581622678271,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 51.916136283748784,
			"height": 9.998663284277683,
			"seed": 1590757056,
			"groupIds": [
				"WsVOLNAbcd4gNXzKfnKuN",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.307383834833279,
					2.3073838348332787
				],
				[
					8.07584342191648,
					5.768459587083197
				],
				[
					13.844303008999677,
					6.922151504499837
				],
				[
					20.381890541027285,
					7.3067154769719105
				],
				[
					26.534914100582718,
					7.3067154769719105
				],
				[
					32.68793766013809,
					7.3067154769719105
				],
				[
					39.994653137110156,
					6.153023559555271
				],
				[
					45.37854875172112,
					4.2302036971940655
				],
				[
					49.99331642138769,
					1.1536919174166393
				],
				[
					51.916136283748784,
					-2.691947807305772
				]
			]
		},
		{
			"type": "ellipse",
			"version": 649,
			"versionNonce": 1584795744,
			"isDeleted": false,
			"id": "F8vdu0IOcVFMQMpz6AikJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2298.4495031729593,
			"y": -748.8709526303796,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.820418484735523,
			"height": 11.820418484735523,
			"seed": 1417817792,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 661,
			"versionNonce": 2012849568,
			"isDeleted": false,
			"id": "jjLvtH6DQ02oO9jJy3SeL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2311.8741213091944,
			"y": -766.3482856756657,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.865313863551412,
			"height": 8.865313863551412,
			"seed": 1238259392,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783863,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 652,
			"versionNonce": 1511326816,
			"isDeleted": false,
			"id": "Ig79QPeZBaCx3gDs7QIu8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2301.1513131123274,
			"y": -727.0876099942238,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.131787272630186,
			"height": 10.131787272630186,
			"seed": 324370112,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 653,
			"versionNonce": 1089728928,
			"isDeleted": false,
			"id": "Q8Bnu0KaYwmz1za4QJj3p",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2282.238643536751,
			"y": -742.6230171455895,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.287471666577515,
			"height": 9.287471666577515,
			"seed": 1907861184,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 648,
			"versionNonce": 1840609376,
			"isDeleted": false,
			"id": "B0TQPvNdrT6XxN-yNjA0h",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2288.233284339724,
			"y": -759.0871714636138,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 6.332367045393866,
			"seed": 294964928,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 647,
			"versionNonce": 214220192,
			"isDeleted": false,
			"id": "bycTJIlorI0hvtgSTvpVG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2316.011267778852,
			"y": -734.3487242062758,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 6.332367045393866,
			"seed": 193787584,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 666,
			"versionNonce": 489122912,
			"isDeleted": false,
			"id": "Whvvi4EIx2MIflNTOH76E",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2307.736974839537,
			"y": -748.6176579485619,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.176682651446419,
			"height": 9.287471666577515,
			"seed": 1681923776,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					7.176682651446419,
					-9.287471666577515
				]
			]
		},
		{
			"type": "line",
			"version": 652,
			"versionNonce": 1016859040,
			"isDeleted": false,
			"id": "Seen93cS6PANuQNb7Hlo1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2305.119596460774,
			"y": -736.7972394638286,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 9.287471666577515,
			"seed": 206456512,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					9.287471666577515
				]
			]
		},
		{
			"type": "line",
			"version": 654,
			"versionNonce": 1916461152,
			"isDeleted": false,
			"id": "L35fEcEG0yMkLbRIPIWBx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2310.692079460721,
			"y": -725.3989787821183,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 3.7994202272363196,
			"seed": 1616342720,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					6.332367045393866,
					-3.7994202272363196
				]
			]
		},
		{
			"type": "line",
			"version": 665,
			"versionNonce": 195679648,
			"isDeleted": false,
			"id": "AlwZuSu-zw4EOUuEwAcOy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2291.694978324539,
			"y": -739.7523440850108,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.754524848420141,
			"height": 1.6886312121057987,
			"seed": 687576768,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					6.754524848420141,
					-1.6886312121057987
				]
			]
		},
		{
			"type": "line",
			"version": 681,
			"versionNonce": 1019204704,
			"isDeleted": false,
			"id": "UQWeKfBLJQ7yL-zg2122d",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2294.059062021486,
			"y": -753.0925306606414,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 5.488051439341196,
			"seed": 450543296,
			"groupIds": [
				"mqaFmab4zd2AJmEfWdScV",
				"9rKcAI1xQz_hqotVB42Yg",
				"-_bDl_4g3A1887Rm3gEYp",
				"OhYPg7nNoNDB11FVZgKTH"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					6.332367045393866,
					5.488051439341196
				]
			]
		},
		{
			"type": "rectangle",
			"version": 2783,
			"versionNonce": 1327374752,
			"isDeleted": false,
			"id": "Tp8qd0wENffOXcGsiVRg3",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1210.7207134946414,
			"y": -458.3515915439368,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 106.96115236495706,
			"height": 106.8587269774196,
			"seed": 466837184,
			"groupIds": [
				"JF-XcOA8lv2Lk7kh7MJEp",
				"AER3VgmOUGQUgG1VoP-XY",
				"QDH-axTkWLd8CahGoXWUF"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "5QV6onNsAlDUCvdmTq6Oo",
					"type": "arrow"
				},
				{
					"id": "i9mr7oig95aZ2XlxhUsIS",
					"type": "arrow"
				}
			],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2146,
			"versionNonce": 1384532064,
			"isDeleted": false,
			"id": "xP_oF6GZOFLAZQjnUOPHa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1246.8706953408805,
			"y": -423.16388969469017,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.07285065911464,
			"height": 35.82425929166074,
			"seed": 1870235328,
			"groupIds": [
				"lMR3teLR9vSw9aqbPnCQA",
				"AER3VgmOUGQUgG1VoP-XY",
				"QDH-axTkWLd8CahGoXWUF"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2470,
			"versionNonce": 908651936,
			"isDeleted": false,
			"id": "uPe86EMAH2Z1CGD7_w7FS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 1265.2556793904878,
			"y": -393.2927121735207,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 35.340211482939296,
			"height": 35.38596252270706,
			"seed": 1008381632,
			"groupIds": [
				"brQbavj6SUOdagCQLrqiS",
				"lMR3teLR9vSw9aqbPnCQA",
				"AER3VgmOUGQUgG1VoP-XY",
				"QDH-axTkWLd8CahGoXWUF"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.09181816364893312,
					-13.822648751690894
				],
				[
					-35.12752958842831,
					-14.094006963379169
				],
				[
					-35.248393319290365,
					20.920343155277774
				],
				[
					-21.527865364795254,
					21.291955559327892
				]
			]
		},
		{
			"type": "line",
			"version": 2484,
			"versionNonce": 1331575904,
			"isDeleted": false,
			"id": "OkHt7xzozr-Obpyz9ibt1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 1296.0018022274476,
			"y": -424.4382374789343,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 35.340211482939296,
			"height": 35.38596252270706,
			"seed": 710334144,
			"groupIds": [
				"pq1T5hjc0BIJfSBwmRN8k",
				"lMR3teLR9vSw9aqbPnCQA",
				"AER3VgmOUGQUgG1VoP-XY",
				"QDH-axTkWLd8CahGoXWUF"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.09181816364893312,
					-13.822648751690894
				],
				[
					-35.12752958842831,
					-14.094006963379169
				],
				[
					-35.248393319290365,
					20.920343155277774
				],
				[
					-21.527865364795254,
					21.291955559327892
				]
			]
		},
		{
			"type": "text",
			"version": 2537,
			"versionNonce": 167393696,
			"isDeleted": false,
			"id": "tAFqYIX5",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1229.3557413545122,
			"y": -344.67457733086053,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 67.33894348144531,
			"height": 39.82348379726615,
			"seed": 1322122944,
			"groupIds": [
				"QDH-axTkWLd8CahGoXWUF"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"fontSize": 33.186236497721794,
			"fontFamily": 1,
			"text": "EC2",
			"rawText": "EC2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "EC2",
			"lineHeight": 1.2
		},
		{
			"type": "text",
			"version": 3097,
			"versionNonce": 1427615840,
			"isDeleted": false,
			"id": "bIvBglDe",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1657.8712878460651,
			"y": -75.33195556569683,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 180.08660888671875,
			"height": 41.11677384287278,
			"seed": 230280512,
			"groupIds": [
				"wRUdSDAsVXL_8erucYxfY",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"fontSize": 34.263978202393986,
			"fontFamily": 1,
			"text": "Rekognition",
			"rawText": "Rekognition",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Rekognition",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1802,
			"versionNonce": 1841431968,
			"isDeleted": false,
			"id": "xqvko52RSdMyp8oiurAyw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1692.2030766864725,
			"y": -194.87958162544464,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 111.49642598129428,
			"height": 111.49642598129428,
			"seed": 1737368896,
			"groupIds": [
				"AIJDfAyp4opANa-eerN8y",
				"odFL7Ievr7alQrNVIPtN7",
				"pGXKA9SwcfMf2i7AKFhm8",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "O9LQf7NsQhIxvDW5x8X1b",
					"type": "arrow"
				},
				{
					"id": "FIlZGvwXzh0nKp7thmKAd",
					"type": "arrow"
				}
			],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2620,
			"versionNonce": 1266852960,
			"isDeleted": false,
			"id": "eC4Y7POSErE_lpxEftLlJ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1706.5335861286644,
			"y": -181.0436761671001,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 66.23094070053295,
			"height": 66.23094070053295,
			"seed": 890731840,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13140,
			"versionNonce": 514871712,
			"isDeleted": false,
			"id": "FDlqqWpaw2UYo-mOqbFbf",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1715.5700995948678,
			"y": -172.0159815603174,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.50343322539075,
			"height": 48.50343322539075,
			"seed": 934663488,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "O9LQf7NsQhIxvDW5x8X1b",
					"type": "arrow"
				}
			],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2817,
			"versionNonce": 544151648,
			"isDeleted": false,
			"id": "-c9Z_zNRFIgdYt-favDaS",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1758.6732442510574,
			"y": -122.12024377897546,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75022091862902,
			"height": 30.60025551438842,
			"seed": 80293184,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					18.704072168265583,
					23.99980752779158
				],
				[
					27.25841203550344,
					24.290444973710922
				],
				[
					27.75022091862902,
					16.715317349572405
				],
				[
					9.773780204755147,
					-6.309810540677497
				]
			]
		},
		{
			"type": "line",
			"version": 581,
			"versionNonce": 871701920,
			"isDeleted": false,
			"id": "IRnPCbEjDBLI8hkX_ljwI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1729.5323011993657,
			"y": -152.62406880556273,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 95520064,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-6.083772946402906
				],
				[
					6.083772946403041,
					-6.083772946402906
				]
			]
		},
		{
			"type": "line",
			"version": 609,
			"versionNonce": 128781408,
			"isDeleted": false,
			"id": "FwKcU28VCjkrsUpnCstYW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1750.6353886072015,
			"y": -152.62406880556273,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 2010045760,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-6.083772946402906
				],
				[
					-6.083772946403041,
					-6.083772946402906
				]
			]
		},
		{
			"type": "line",
			"version": 594,
			"versionNonce": 1589668256,
			"isDeleted": false,
			"id": "d7e5zIe8oCEYqyjuB7Kx1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1744.5516156607985,
			"y": -137.22451853497887,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 1820407104,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-6.083772946402906
				],
				[
					6.083772946403041,
					-6.083772946402906
				]
			]
		},
		{
			"type": "line",
			"version": 622,
			"versionNonce": 990675040,
			"isDeleted": false,
			"id": "UfxN8OBEV2atAYv1yleHa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1735.6160741457688,
			"y": -137.22451853497887,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 1227394368,
			"groupIds": [
				"6DIZDqph-C_E0LgM1RH8N",
				"mFBOXvjuOv_Lc8rHJ7Ck1",
				"54xXAlsa7fKrmkaui9k5y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-6.083772946402906
				],
				[
					-6.083772946403041,
					-6.083772946402906
				]
			]
		},
		{
			"type": "embeddable",
			"version": 298,
			"versionNonce": 708982176,
			"isDeleted": false,
			"id": "D6RNpTN3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1998.4826711536373,
			"y": -118.54878029276489,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 500,
			"height": 174.70592335926176,
			"seed": 22163,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": "[[Integration of AI and Machine Learning Services#Amazon Rekognition]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "rectangle",
			"version": 1717,
			"versionNonce": 979203168,
			"isDeleted": false,
			"id": "7ove5sN0njY_t7uGTc7Yu",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1432.0864604545443,
			"y": -204.11084320527902,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 108.26125563418046,
			"height": 108.26125563418046,
			"seed": 537377888,
			"groupIds": [
				"m9vbQueCU2asjdiTjH-xT",
				"AEYgm6PloGtZQBWJvv16M",
				"n9yeXbFI5en4wOsWVnzph",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1622,
			"versionNonce": 1001030048,
			"isDeleted": false,
			"id": "BbCiDNQhqudYvtzkfUjCb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1461.6901378325551,
			"y": -175.02625472545114,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 66.96246786542376,
			"height": 69.29836790724075,
			"seed": 1418801248,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					15.313122496356552,
					-9.603144616359199
				],
				[
					24.39717821453423,
					-3.893166736361841
				],
				[
					33.7407783818026,
					-9.084055718177638
				],
				[
					49.313445327249944,
					1.557266694544723
				],
				[
					49.313445327249966,
					12.977222454539435
				],
				[
					57.618867698155185,
					17.90856698726439
				],
				[
					57.87841214724609,
					34.0003228308934
				],
				[
					50.09207867452238,
					37.89348956725521
				],
				[
					50.092078674522384,
					49.57298977634075
				],
				[
					33.22168948362108,
					59.69522329088154
				],
				[
					24.39717821453423,
					54.244789859974986
				],
				[
					15.053578047265745,
					59.69522329088154
				],
				[
					-1.03817779636313,
					49.31344532724993
				],
				[
					-1.038177796363124,
					38.672122914527655
				],
				[
					-9.084055718177666,
					33.740778381802585
				],
				[
					-9.084055718177675,
					17.64902253817368
				],
				[
					-0.25954444909080854,
					11.679500209085507
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1163,
			"versionNonce": 191883360,
			"isDeleted": false,
			"id": "a8v42OGWlhmabPivdxt5i",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1486.0873160470874,
			"y": -178.91942146181074,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 8.56496681999605,
			"height": 22.061278172717078,
			"seed": 533472352,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					16.610844741810507
				],
				[
					8.56496681999605,
					22.061278172717078
				]
			]
		},
		{
			"type": "line",
			"version": 1089,
			"versionNonce": 304696736,
			"isDeleted": false,
			"id": "NtFJdd1h83_zUS8S-RJYk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1461.4305933834678,
			"y": -163.08721006727325,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 16.091755843628974,
			"height": 14.534489149084193,
			"seed": 797481056,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783864,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					7.786333472723613,
					5.450433430906554
				],
				[
					16.091755843628974,
					-0.25954444909080987
				],
				[
					16.091755843628974,
					-9.08405571817764
				]
			]
		},
		{
			"type": "line",
			"version": 1073,
			"versionNonce": 2048121952,
			"isDeleted": false,
			"id": "DpFjVeptN3XqWlTGQEW6f",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1470.2551046525516,
			"y": -179.46446480490252,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 11.160411310903948,
			"seed": 2006355040,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					11.160411310903948
				]
			]
		},
		{
			"type": "line",
			"version": 1058,
			"versionNonce": 1190042016,
			"isDeleted": false,
			"id": "8Lf6VP3Xcmvr7rC75P5Q8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1469.2169268561877,
			"y": -158.15586553455051,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.267244574541996,
			"height": 12.717678005448674,
			"seed": 1908801632,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-0.2595444490906962,
					8.045877921814494
				],
				[
					-7.267244574541996,
					12.717678005448674
				]
			]
		},
		{
			"type": "line",
			"version": 1107,
			"versionNonce": 1478053984,
			"isDeleted": false,
			"id": "2cr5qKz2dHk30hpj7CNba",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1468.9573824070944,
			"y": -150.88862096000835,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.0077001254513,
			"height": 18.946744783627594,
			"seed": 1575416928,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					6.748155676360487,
					5.450433430906555
				],
				[
					7.0077001254513,
					13.755855801811785
				],
				[
					0.25954444909069496,
					18.946744783627594
				]
			]
		},
		{
			"type": "line",
			"version": 1067,
			"versionNonce": 1294624160,
			"isDeleted": false,
			"id": "SFO1TNYcucrWxMe7f5lbh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1486.087316047092,
			"y": -120.26237596729354,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.0077001254513,
			"height": 34.519411729075,
			"seed": 29976672,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.25954444909069474,
					-29.84761164544076
				],
				[
					-6.7481556763606045,
					-34.519411729075
				]
			]
		},
		{
			"type": "line",
			"version": 1167,
			"versionNonce": 1028670560,
			"isDeleted": false,
			"id": "ZK_v2bx1MdsA8rLY3IbHb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1475.9650825325518,
			"y": -137.13276515819416,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 10.122233514540799,
			"height": 7.526789023632803,
			"seed": 1765629024,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					10.122233514540799,
					-7.526789023632803
				]
			]
		},
		{
			"type": "line",
			"version": 1065,
			"versionNonce": 839692704,
			"isDeleted": false,
			"id": "-3d5HEfiiVlhASIrLW5vT",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1519.8280944288913,
			"y": -141.28547634364685,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 8.824511269086859,
			"height": 4.6718000836341815,
			"seed": 638767200,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-8.824511269086859,
					-4.6718000836341815
				]
			]
		},
		{
			"type": "line",
			"version": 1037,
			"versionNonce": 1200142432,
			"isDeleted": false,
			"id": "q1FYn5rYwLigkCebeEJDt",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1486.3468604961818,
			"y": -130.41056392674383,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.267244574542229,
			"height": 0,
			"seed": 270124128,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					7.267244574542229,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1070,
			"versionNonce": 1556446624,
			"isDeleted": false,
			"id": "Id6Aboedrzr6e9H6717HO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1470.7741935507318,
			"y": -119.22419817093038,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.786333472723613,
			"height": 5.969522329088171,
			"seed": 86128736,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					7.786333472723613,
					-5.969522329088171
				]
			]
		},
		{
			"type": "line",
			"version": 1053,
			"versionNonce": 1519561824,
			"isDeleted": false,
			"id": "cmlNTB3a6yiHfX3wgcf9m",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1460.1328711380113,
			"y": -137.13276515819416,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.709977879997366,
			"height": 3.374077838180246,
			"seed": 687615072,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.709977879997366,
					-3.374077838180246
				]
			]
		},
		{
			"type": "line",
			"version": 1064,
			"versionNonce": 1317325216,
			"isDeleted": false,
			"id": "NSU7U9l1uFhejTQj_ZQvx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1453.6442599107406,
			"y": -150.88862096000835,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.709977879997482,
			"height": 3.114533389089492,
			"seed": 628596832,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.709977879997482,
					-3.114533389089492
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1012,
			"versionNonce": 1614684256,
			"isDeleted": false,
			"id": "t7leV2Nh51Aga_mlZ2Bkp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1500.3622607470863,
			"y": -171.39263243817857,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 1784976480,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1058,
			"versionNonce": 1652200864,
			"isDeleted": false,
			"id": "bEFqE3sLHBL_I1Obtqql2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1495.041599540723,
			"y": -158.54518220818403,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 1838352480,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1093,
			"versionNonce": 140186720,
			"isDeleted": false,
			"id": "y-sosl5km5-oAjCUoGOJU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1505.4233775043524,
			"y": -150.7588487354618,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 1792212064,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1064,
			"versionNonce": 232186272,
			"isDeleted": false,
			"id": "HRDORwAe5nzB4MRrYtjzM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1494.2889206383563,
			"y": -133.62891509546813,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 603222112,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1051,
			"versionNonce": 146376800,
			"isDeleted": false,
			"id": "Upxf5j33j2PXc7umnzG3d",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1506.0722386270816,
			"y": -169.05673239635917,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 4.671800083634238,
			"height": 0,
			"seed": 549938272,
			"groupIds": [
				"l4c0vvmvT9-UntcZwtNvS",
				"rQL5dTC7cvffJwpOIL_mz",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					4.671800083634238,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 3007,
			"versionNonce": 533310880,
			"isDeleted": false,
			"id": "8u5gPQKy",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1398.8839218922144,
			"y": -88.03200039568873,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 173.5655059814453,
			"height": 39.92373320202065,
			"seed": 1864095840,
			"groupIds": [
				"nSNUL3HybmJPDdWUtQrlt",
				"EFZ6MxG5oMywi9-b8e9Vi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"fontSize": 33.26977766835054,
			"fontFamily": 1,
			"text": "SageMaker",
			"rawText": "SageMaker",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SageMaker",
			"lineHeight": 1.2
		},
		{
			"type": "text",
			"version": 3478,
			"versionNonce": 1562999904,
			"isDeleted": false,
			"id": "WF7Btrtq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1675.3146430128372,
			"y": -948.2658528877446,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.40867614746094,
			"height": 27.743935377854452,
			"seed": 1470051744,
			"groupIds": [
				"M3HBEEDj1emdst7yMuw5Y",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "4c0UdOsGSDVJIkiVGG7QB",
					"type": "arrow"
				}
			],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"fontSize": 23.119946148212044,
			"fontFamily": 1,
			"text": "Personalize",
			"rawText": "Personalize",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Personalize",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2307,
			"versionNonce": 25360800,
			"isDeleted": false,
			"id": "NFpxu9SH1L8Jl9rNr07W4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1701.1567130509547,
			"y": -1028.2683456726295,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 74.72305088242369,
			"height": 74.72305088242369,
			"seed": 895975840,
			"groupIds": [
				"07Bxr6q51a__A40FTdEgm",
				"Y8Qv-9hw2hEIckr13XQan",
				"2Pop0Qvd6d-lFdD4PBZH5",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "eGg_COYDnmiZRa-aQBlWh",
					"type": "arrow"
				},
				{
					"id": "ACDqpyxuesxKi_YA4tyJL",
					"type": "arrow"
				}
			],
			"updated": 1714137783865,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 478,
			"versionNonce": 125497440,
			"isDeleted": false,
			"id": "0SMhUdfdxdwpSiCpwVI26",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1719.0602263394571,
			"y": -1010.3097330865381,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 39.86314744288174,
			"height": 39.86314744288174,
			"seed": 1279675808,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "l-Vg3rlJDQMrzD9Onlo15",
					"type": "arrow"
				},
				{
					"id": "DP-ZzG1Nds8-7fgO1iMVu",
					"type": "arrow"
				},
				{
					"id": "eGg_COYDnmiZRa-aQBlWh",
					"type": "arrow"
				},
				{
					"id": "4c0UdOsGSDVJIkiVGG7QB",
					"type": "arrow"
				}
			],
			"updated": 1714137783865,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 835,
			"versionNonce": 1983038880,
			"isDeleted": false,
			"id": "l-Vg3rlJDQMrzD9Onlo15",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1750.6007327436716,
			"y": -1018.178659112295,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 896244128,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5033884540041134,
				"gap": 10.195409271004902
			},
			"endBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"gap": 15.059658061092357,
				"focus": 1.4950557318415354
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					7.12999385157236,
					3.8890875554030218
				],
				[
					13.287715814293925,
					10.370900147741699
				],
				[
					17.176803369697062,
					18.14907525854805
				],
				[
					18.797256517781694,
					30.464519183990948
				]
			]
		},
		{
			"type": "arrow",
			"version": 928,
			"versionNonce": 1333650528,
			"isDeleted": false,
			"id": "DP-ZzG1Nds8-7fgO1iMVu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5318549836978397,
			"x": 1743.107755013218,
			"y": -985.471434353828,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1678206368,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5014921565015409,
				"gap": 10.200396231667213
			},
			"endBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"gap": 14.534447891051393,
				"focus": 1.478257871739441
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					7.12999385157236,
					3.8890875554030218
				],
				[
					13.287715814293925,
					10.370900147741699
				],
				[
					17.176803369697062,
					18.14907525854805
				],
				[
					18.797256517781694,
					30.464519183990948
				]
			]
		},
		{
			"type": "arrow",
			"version": 950,
			"versionNonce": 1527320992,
			"isDeleted": false,
			"id": "eGg_COYDnmiZRa-aQBlWh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.659805918773737,
			"x": 1715.5989447450434,
			"y": -1026.6050154823354,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1699328416,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5334048395146314,
				"gap": 10.746893053393809
			},
			"endBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": 1.5315387436222352,
				"gap": 11.257631391195225
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					7.12999385157236,
					3.8890875554030218
				],
				[
					13.287715814293925,
					10.370900147741699
				],
				[
					17.176803369697062,
					18.14907525854805
				],
				[
					18.797256517781694,
					30.464519183990948
				]
			]
		},
		{
			"type": "arrow",
			"version": 893,
			"versionNonce": 50485344,
			"isDeleted": false,
			"id": "4c0UdOsGSDVJIkiVGG7QB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.0860941483440776,
			"x": 1708.4689508934714,
			"y": -991.9273181133245,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 543325600,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5202105672697392,
				"gap": 10.459096950956052
			},
			"endBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": 1.5364855559035686,
				"gap": 11.437821273077521
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					7.12999385157236,
					3.8890875554030218
				],
				[
					13.287715814293925,
					10.370900147741699
				],
				[
					17.176803369697062,
					18.14907525854805
				],
				[
					18.797256517781694,
					30.464519183990948
				]
			]
		},
		{
			"type": "line",
			"version": 567,
			"versionNonce": 1731583392,
			"isDeleted": false,
			"id": "5Ew1iFWE3m_9jAqrcwjaP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1728.8866605593373,
			"y": -982.2045992248168,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 19.769528406632524,
			"height": 10.046809518124626,
			"seed": 377604512,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783865,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					18.149075258547857,
					0
				],
				[
					19.769528406632524,
					-4.213178185019787
				],
				[
					16.20453148084631,
					-7.778175110806351
				],
				[
					10.046809518124704,
					-10.046809518124626
				],
				[
					3.8890875554031368,
					-8.426356370040187
				],
				[
					0.9722718888507939,
					-5.185450073871002
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 442,
			"versionNonce": 903367776,
			"isDeleted": false,
			"id": "aR4g4skctQPFsWB2o5ZGy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1733.4239293739745,
			"y": -1003.2964189827593,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.019081406975497,
			"height": 11.019081406975497,
			"seed": 584553888,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD",
				"-t13HeYNjhxB_GlT9GzQl"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2698,
			"versionNonce": 1810442656,
			"isDeleted": false,
			"id": "U9sGOpfQr2euZBCFhLzoo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 989.6797057223123,
			"y": -745.4005294470855,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 96.95861181072574,
			"height": 96.95861181072574,
			"seed": 289174624,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "cTKYit54IDA4gGy5GPLGd",
					"type": "arrow"
				},
				{
					"id": "XO3l3aysTBF7sBOFc781j",
					"type": "arrow"
				}
			],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3166,
			"versionNonce": 30392416,
			"isDeleted": false,
			"id": "zeQ7qAr0pyX4hEULUnoj5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1027.0161924168442,
			"y": -715.2630566016843,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 22.748946471158828,
			"height": 0,
			"seed": 779020384,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					22.748946471158828,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3217,
			"versionNonce": 340981152,
			"isDeleted": false,
			"id": "nSMU5rDRt5yqTMrFmW01W",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1024.8088394483373,
			"y": -678.1029396110688,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.701067588859278,
			"height": 0,
			"seed": 1697832032,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					25.701067588859278,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3063,
			"versionNonce": 1186509920,
			"isDeleted": false,
			"id": "qb1T2ZjPiRQOFrIRBfLof",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 999.6135915939386,
			"y": -721.5176630961367,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.426941630593085,
			"height": 72.60298153552196,
			"seed": 123228256,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					25.426941630593085,
					-11.098384549762521
				],
				[
					25.3017245817911,
					61.504596985759434
				],
				[
					0.12081457637190465,
					50.16525905780218
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3011,
			"versionNonce": 631456160,
			"isDeleted": false,
			"id": "JvPay2fiJ0w8qjcDH8RbG",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1051.29371855786,
			"y": -732.8935624147717,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.45952787686465,
			"height": 72.40256469241159,
			"seed": 749683808,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.29547248372867163,
					72.40256469241159
				],
				[
					25.43673042369387,
					61.41788914839453
				],
				[
					25.45952787686465,
					11.259348084639162
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2736,
			"versionNonce": 1784883296,
			"isDeleted": false,
			"id": "0yDTS9nuMaC9tjgqFQyeL",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1031.3195918260124,
			"y": -687.7001059068184,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 13.648658319418736,
			"height": 18.301853045094497,
			"seed": 1929885792,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					13.648658319418736,
					-18.301853045094497
				]
			]
		},
		{
			"type": "line",
			"version": 2855,
			"versionNonce": 1057623456,
			"isDeleted": false,
			"id": "CfbLy1h0LomN1QMJqY5sp",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1043.029770975647,
			"y": -702.4999610774038,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.52333842785504,
			"height": 12.617992815585021,
			"seed": 1043442784,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					7.5069210814565555,
					6.5545410777766255
				],
				[
					-0.01641734639848531,
					12.617992815585021
				]
			]
		},
		{
			"type": "line",
			"version": 2994,
			"versionNonce": 413080672,
			"isDeleted": false,
			"id": "eqVKlXPUF2edOSaW1xtqZ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1025.3249647446683,
			"y": -703.3148557428573,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.523338427855042,
			"height": 12.617992815585021,
			"seed": 2013077600,
			"groupIds": [
				"Z6pbr9is0qO6_Qc_6N_vQ",
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					7.506921081456556,
					6.5545410777766255
				],
				[
					-0.01641734639848531,
					12.617992815585021
				]
			]
		},
		{
			"type": "text",
			"version": 2679,
			"versionNonce": 431446432,
			"isDeleted": false,
			"id": "zZbCbKB2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 938.0561563214683,
			"y": -643.3314480342777,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 200.14634704589844,
			"height": 35.99203374908673,
			"seed": 1345983584,
			"groupIds": [
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"fontSize": 29.993361457572277,
			"fontFamily": 1,
			"text": "API Gateway",
			"rawText": "API Gateway",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "API Gateway",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2404,
			"versionNonce": 54300768,
			"isDeleted": false,
			"id": "o96CptdGghXXkdnknr03s",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 804.5553458120081,
			"y": -331.95509416749974,
			"strokeColor": "#000000",
			"backgroundColor": "#40c05788",
			"width": 106.50167096688487,
			"height": 106.50167096688487,
			"seed": 1132957088,
			"groupIds": [
				"Ahskw8tTv8Nt0jFaGi7nU",
				"kDICOAaehh4_FvNbLEbjL",
				"T3uz4j8DljL3Il7APgjwg",
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2192,
			"versionNonce": 1222321568,
			"isDeleted": false,
			"id": "MA0gXT42XOUSG2cQNB85L",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 826.8321295680003,
			"y": -313.84432300673535,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 63.994487962286954,
			"height": 17.598397113796313,
			"seed": 847567264,
			"groupIds": [
				"T3uz4j8DljL3Il7APgjwg",
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2810,
			"versionNonce": 571180128,
			"isDeleted": false,
			"id": "giSm-WkFL3vewN38s29Ak",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 827.4178425946823,
			"y": -304.22449235164265,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 62.669193790678,
			"height": 66.254411607132,
			"seed": 1811457440,
			"groupIds": [
				"T3uz4j8DljL3Il7APgjwg",
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					6.292611871781907,
					52.606787411315565
				],
				[
					11.076018754841968,
					62.16689761885467
				],
				[
					33.29963208668013,
					66.254411607132
				],
				[
					53.24567662452103,
					62.84037873096743
				],
				[
					57.87618141886532,
					52.27510532086745
				],
				[
					62.669193790678,
					0.15983537383103305
				]
			]
		},
		{
			"type": "ellipse",
			"version": 2202,
			"versionNonce": 2040885664,
			"isDeleted": false,
			"id": "FjzwEzto-t_fvRo0ALvW2",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 854.861613672864,
			"y": -287.43040529135857,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 7.688347830880011,
			"height": 7.688347830880011,
			"seed": 1561522592,
			"groupIds": [
				"T3uz4j8DljL3Il7APgjwg",
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2888,
			"versionNonce": 1927018592,
			"isDeleted": false,
			"id": "OVW3qdEXHIkphIx70jM4-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 858.9365728627183,
			"y": -283.2198300381582,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 38.04246444892518,
			"height": 18.87015206949028,
			"seed": 1292090784,
			"groupIds": [
				"T3uz4j8DljL3Il7APgjwg",
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					11.49268916281939,
					12.167540822926414
				],
				[
					27.827763975042327,
					18.87015206949028
				],
				[
					37.51351410864873,
					16.599909554328253
				],
				[
					38.04246444892518,
					9.639704945558007
				],
				[
					29.39497837120684,
					2.8738140267855954
				]
			]
		},
		{
			"type": "text",
			"version": 2651,
			"versionNonce": 860241312,
			"isDeleted": false,
			"id": "5Z50elXe",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 772.9561425885581,
			"y": -218.761310699298,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 169.64625549316406,
			"height": 39.274847426662085,
			"seed": 486214048,
			"groupIds": [
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"fontSize": 32.72903952221841,
			"fontFamily": 1,
			"text": "S3 Bucket",
			"rawText": "S3 Bucket",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "S3 Bucket",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 3145,
			"versionNonce": 964553824,
			"isDeleted": false,
			"id": "9Pd5rzpPJDa-MXqznlk6g",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1418.5467019263308,
			"y": -1028.6179161836644,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 87.3127427287515,
			"height": 87.22913254586531,
			"seed": 242404448,
			"groupIds": [
				"UdW8ot5fHAmEuxTiZ6R8R",
				"OsA7HTkItQ4k1QgYGmcyY",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2042,
			"versionNonce": 384666016,
			"isDeleted": false,
			"id": "0NJYSHqaC2RAqvm5uCdpS",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1427.990824025013,
			"y": -1018.6190502641853,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 68.42449853138703,
			"height": 67.23140070690664,
			"seed": 1662664800,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "53ILdE1xm5mBIijONewJC",
					"type": "arrow"
				}
			],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2046,
			"versionNonce": 1069637728,
			"isDeleted": false,
			"id": "7gYyyhqNNwGmn9IB8RJSg",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1460.4573300567968,
			"y": -1008.6058430498465,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 447951968,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2091,
			"versionNonce": 533419424,
			"isDeleted": false,
			"id": "Z05yc1CmDWcrCoU3qbnwG",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1469.9924446042028,
			"y": -978.3976592240584,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 1527621728,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2123,
			"versionNonce": 360076384,
			"isDeleted": false,
			"id": "2yyL3k-zW1kCxs3oEW16_",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1441.6402481781479,
			"y": -989.1123564781551,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 268016736,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2110,
			"versionNonce": 1661968800,
			"isDeleted": false,
			"id": "Zehr3znpkeUXZCvuNhXsf",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1471.9934933909713,
			"y": -994.4826266929268,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.934786164220179,
			"height": 11.986856642598756,
			"seed": 726077536,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.121216910544975,
					5.770675305519921
				],
				[
					4.934786164220179,
					11.986856642598756
				]
			]
		},
		{
			"type": "line",
			"version": 2151,
			"versionNonce": 1349306464,
			"isDeleted": false,
			"id": "7n9dUfA1BQo_VZCAGBAY-",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.497787143782138,
			"x": 1459.7189374052098,
			"y": -984.2150281264911,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.934786164220179,
			"height": 11.986856642598756,
			"seed": 1690698848,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.121216910544975,
					5.770675305519921
				],
				[
					4.934786164220179,
					11.986856642598756
				]
			]
		},
		{
			"type": "line",
			"version": 2251,
			"versionNonce": 1340763552,
			"isDeleted": false,
			"id": "UCRIko6dupAzYu1SCPFzJ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.33043282694363,
			"x": 1452.1800170021256,
			"y": -998.4523949449386,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1884401276853573,
			"height": 7.987405343349235,
			"seed": 2051438688,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.0166655481341116,
					3.845271879388254
				],
				[
					3.1884401276853573,
					7.987405343349235
				]
			]
		},
		{
			"type": "line",
			"version": 2263,
			"versionNonce": 1282718816,
			"isDeleted": false,
			"id": "7To_Op5D_zY55KzQo0hyo",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.2993692646569315,
			"x": 1444.699792166926,
			"y": -972.8588568684918,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.015437461328267,
			"height": 18.29894110884873,
			"seed": 1872260192,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					4.437213956286741,
					8.809419410150145
				],
				[
					7.015437461328267,
					18.29894110884873
				]
			]
		},
		{
			"type": "line",
			"version": 2398,
			"versionNonce": 1871428000,
			"isDeleted": false,
			"id": "RGuOJ2biAlAaTQIE9pPLW",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.938756218467832,
			"x": 1431.8442868749746,
			"y": -987.7429700714698,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1884401276853573,
			"height": 7.987405343349235,
			"seed": 1317789792,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.0166655481341116,
					3.845271879388254
				],
				[
					3.1884401276853573,
					7.987405343349235
				]
			]
		},
		{
			"type": "line",
			"version": 2515,
			"versionNonce": 1801334880,
			"isDeleted": false,
			"id": "FkcV5XcPeREfgomSvfK2b",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.829160445235754,
			"x": 1484.3957681683141,
			"y": -966.5789315073405,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.4917345266282833,
			"height": 4.617471446267002,
			"seed": 1727059040,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783866,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.9435114056845403,
					2.222928766347496
				],
				[
					1.4917345266282833,
					4.617471446267002
				]
			]
		},
		{
			"type": "line",
			"version": 2687,
			"versionNonce": 623084960,
			"isDeleted": false,
			"id": "V_JVLYSgI97Wk0VvSKKU5",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.49818137785806815,
			"x": 1475.703177288675,
			"y": -962.9272660182901,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1438731318945865,
			"height": 7.65480669233386,
			"seed": 244795488,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.9884772424436012,
					3.6851532695399634
				],
				[
					3.1438731318945865,
					7.65480669233386
				]
			]
		},
		{
			"type": "line",
			"version": 2700,
			"versionNonce": 1425613920,
			"isDeleted": false,
			"id": "yCxmSxbX7OMals_Zv_gwa",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.809117217502431,
			"x": 1478.922463060602,
			"y": -1013.6565832099154,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.8771884437576465,
			"height": 10.706843635479597,
			"seed": 1632582752,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.819801086943362,
					5.154455418091166
				],
				[
					2.8771884437576465,
					10.706843635479597
				]
			]
		},
		{
			"type": "line",
			"version": 2655,
			"versionNonce": 1843515808,
			"isDeleted": false,
			"id": "9gEcJ3XCT-Usz55fwAdTl",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.014839308967369,
			"x": 1456.7665205158426,
			"y": -1017.2807756902357,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.353935257345782,
			"height": 7.364308683671784,
			"seed": 15249504,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.753832871457995,
					3.545302620210306
				],
				[
					4.353935257345782,
					7.364308683671784
				]
			]
		},
		{
			"type": "text",
			"version": 2545,
			"versionNonce": 924162144,
			"isDeleted": false,
			"id": "E7rlBiYD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1391.9531153934279,
			"y": -935.8401161761556,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 140.48143005371094,
			"height": 32.50804164384153,
			"seed": 1429447776,
			"groupIds": [
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"fontSize": 27.090034703201276,
			"fontFamily": 1,
			"text": "CloudFront",
			"rawText": "CloudFront",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "CloudFront",
			"lineHeight": 1.2
		},
		{
			"type": "text",
			"version": 1703,
			"versionNonce": 553033120,
			"isDeleted": false,
			"id": "IyQv4DqK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1938.5127552391114,
			"y": -976.5819262046621,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 123.90129089355469,
			"height": 43.78800418134342,
			"seed": 1706417568,
			"groupIds": [
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"fontSize": 36.49000348445285,
			"fontFamily": 1,
			"text": "Athena",
			"rawText": "Athena",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Athena",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2854,
			"versionNonce": 92507232,
			"isDeleted": false,
			"id": "LXfSYtGXQXqF06EabsIK7",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1942.6533193895646,
			"y": -1101.6425402766179,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 117.60938372045632,
			"height": 117.49676164749559,
			"seed": 443099552,
			"groupIds": [
				"eQWR4Rzf99Qk4NcF_mF6Z",
				"wYxOIeQHs1LWDUPb23282",
				"lZGpxQLbwHPYd9Etzpdi1",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1905,
			"versionNonce": 798091680,
			"isDeleted": false,
			"id": "XQPiqnVQxkpLZ6FqEaGlC",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1961.6084254408756,
			"y": -1087.458167285072,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 67.60229032344449,
			"height": 67.60229032344449,
			"seed": 1926428064,
			"groupIds": [
				"XcjWoooGznvBlu_fvhFvC",
				"lZGpxQLbwHPYd9Etzpdi1",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2003,
			"versionNonce": 974323808,
			"isDeleted": false,
			"id": "zN2jJ4YrFPS892QlEnuFC",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1970.807462518982,
			"y": -1078.2209727564743,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 49.50772463602171,
			"height": 49.50772463602171,
			"seed": 874725792,
			"groupIds": [
				"XcjWoooGznvBlu_fvhFvC",
				"lZGpxQLbwHPYd9Etzpdi1",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2092,
			"versionNonce": 1692644768,
			"isDeleted": false,
			"id": "BCLBnbETdqa_OMhavtpSE",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2009.5051273839736,
			"y": -1022.9525540441543,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 28.324805162638814,
			"height": 31.23385135972594,
			"seed": 2106199456,
			"groupIds": [
				"XcjWoooGznvBlu_fvhFvC",
				"lZGpxQLbwHPYd9Etzpdi1",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					19.091350712757922,
					24.49673731098763
				],
				[
					27.82281309444467,
					24.793392571959124
				],
				[
					28.324805162638814,
					17.061417584624603
				],
				[
					9.97615193096714,
					-6.440458787766817
				]
			]
		},
		{
			"type": "ellipse",
			"version": 2133,
			"versionNonce": 345240672,
			"isDeleted": false,
			"id": "Qn37QDbN60LKHCtV33wzu",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1982.2048539218886,
			"y": -1068.3884924498338,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.12043252812945,
			"height": 6.908084764438986,
			"seed": 137845152,
			"groupIds": [
				"mxy4cEL0Zj5Zn3lB4uvpg",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2768,
			"versionNonce": 639369632,
			"isDeleted": false,
			"id": "84yR6LwDtAM2NjQtiM4IZ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1982.4347700449166,
			"y": -1064.612318679281,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 24.60020080383713,
			"height": 26.00754423488317,
			"seed": 1734026656,
			"groupIds": [
				"mxy4cEL0Zj5Zn3lB4uvpg",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.4701054260166737,
					20.65029810796187
				],
				[
					4.34778667149071,
					24.40302918023008
				],
				[
					13.071456428215301,
					26.00754423488317
				],
				[
					20.901088041350114,
					24.667397837195786
				],
				[
					22.718749014371024,
					20.520099432432186
				],
				[
					24.60020080383713,
					0.06274186811678219
				]
			]
		},
		{
			"type": "ellipse",
			"version": 2150,
			"versionNonce": 1524000864,
			"isDeleted": false,
			"id": "t5fOUhhzBqPmnt7AViemD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1993.2075634782057,
			"y": -1058.0199582385176,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 3.0179884094428444,
			"height": 3.0179884094428444,
			"seed": 1210413472,
			"groupIds": [
				"mxy4cEL0Zj5Zn3lB4uvpg",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2990,
			"versionNonce": 845860256,
			"isDeleted": false,
			"id": "pTlY2cSIYhzHywjbZlMgu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1993.922875391441,
			"y": -1058.4656292094817,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 18.766656221809924,
			"height": 13.878660841506111,
			"seed": 835075488,
			"groupIds": [
				"mxy4cEL0Zj5Zn3lB4uvpg",
				"S4XOgayDOq1-YrEsCPQZG",
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.6694367651264415,
					8.949009617660035
				],
				[
					13.727661640912451,
					13.878660841506111
				],
				[
					18.505720729376065,
					12.208937895984954
				],
				[
					18.766656221809924,
					7.089831340993667
				],
				[
					14.500781212021671,
					2.1136390450083726
				]
			]
		},
		{
			"type": "rectangle",
			"version": 2453,
			"versionNonce": 413817952,
			"isDeleted": false,
			"id": "dVNrB3hwj-8exkKKKlNkt",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1174.3053496643736,
			"y": -737.2895062985161,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 100.217322075418,
			"height": 100.217322075418,
			"seed": 775860320,
			"groupIds": [
				"q5GWLM7A_8xwC1uoNsyxb",
				"NdwiZsn2mI7fPxGGruVuV",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "cTKYit54IDA4gGy5GPLGd",
					"type": "arrow"
				}
			],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1725,
			"versionNonce": 1660950944,
			"isDeleted": false,
			"id": "Faq2hZUTQptXNtgvzCgvM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1183.519734377153,
			"y": -710.2274277780433,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 47.755657481286896,
			"height": 47.755657481286896,
			"seed": 1741268064,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1681,
			"versionNonce": 1608503392,
			"isDeleted": false,
			"id": "gCEGTlE8Vr_XU4YJAiwg-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1243.7054034534706,
			"y": -718.5215694296119,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 467015776,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1674,
			"versionNonce": 1795941792,
			"isDeleted": false,
			"id": "R5mhmoIZPQG2HA9as1jEU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1243.8900938346333,
			"y": -668.7791212848534,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 2117340256,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1728,
			"versionNonce": 138855520,
			"isDeleted": false,
			"id": "60P4XlI6-IZwSgbOh1SEA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1251.0984949638803,
			"y": -695.8106255195411,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 1219723360,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "i9mr7oig95aZ2XlxhUsIS",
					"type": "arrow"
				}
			],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1648,
			"versionNonce": 398340512,
			"isDeleted": false,
			"id": "VxQsfHSfjltOr1Xm2gEmN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1232.176441999597,
			"y": -686.8001241079777,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 2065986656,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					18.02100282312723,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1672,
			"versionNonce": 1873754208,
			"isDeleted": false,
			"id": "beBQoj7ZNREoAIHSVEAuX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.41450687458479507,
			"x": 1226.5854507714982,
			"y": -667.8780711436951,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 458680416,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					18.02100282312723,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1734,
			"versionNonce": 273087904,
			"isDeleted": false,
			"id": "MgLP3HR6-kmKe297P3kd3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.900439403044541,
			"x": 1226.585450771499,
			"y": -705.5374866910996,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 1964694624,
			"groupIds": [
				"PX_Zd_h_3ZmzzkZdgBa9w",
				"l3xfYE_D_Cz9YBCowLcyL",
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					18.02100282312723,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 3216,
			"versionNonce": 971582560,
			"isDeleted": false,
			"id": "2AUKEF9e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1192.8462701974472,
			"y": -629.6365734003479,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 61.562530517578125,
			"height": 36.95735473713406,
			"seed": 1514164320,
			"groupIds": [
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"fontSize": 30.797795614278385,
			"fontFamily": 1,
			"text": "ELB",
			"rawText": "ELB",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "ELB",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 3235,
			"versionNonce": 366365088,
			"isDeleted": false,
			"id": "HxZTbYxf2gWcN46en_c8P",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 978.4993698074206,
			"y": -1096.1554563442198,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 109.3594674450266,
			"height": 109.25474544469017,
			"seed": 1567148448,
			"groupIds": [
				"my-bsbgY6LKtcU649ywwA",
				"V3w5LGxN-mFZjepZTHoSc",
				"NFBPA9wtc2DgqL8RgeGQV",
				"0bStXcGE-yUMON9xes4_r",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2468,
			"versionNonce": 281321568,
			"isDeleted": false,
			"id": "IdXmOZ6gXAPiw2KQV_bc5",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1004.1888237910421,
			"y": -1036.1768702183892,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 96.05911429546964,
			"height": 47.13158712368855,
			"seed": 1960744352,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					44.956503500961006,
					-0.9424832482624007
				],
				[
					55.762780446602584,
					-2.2932621983562296
				],
				[
					53.52169682012794,
					-10.981251027481235
				],
				[
					57.082858844537725,
					-19.239446554303374
				],
				[
					62.57808145421776,
					-11.533848084267143
				],
				[
					61.84130839447016,
					-5.3325261722900095
				],
				[
					70.69815180631672,
					-11.395700237098477
				],
				[
					77.6209181438416,
					-8.862986613975389
				],
				[
					73.50715236396874,
					-3.291007986352879
				],
				[
					64.45075639365614,
					0.9915979483219375
				],
				[
					40.81208199853724,
					25.32103425172963
				],
				[
					0.28859188896924837,
					27.892140569385173
				],
				[
					-18.43819615162804,
					1.8910905301312881
				],
				[
					-6.078527947867729,
					-1.0130842125705404
				],
				[
					-0.4872288928686471,
					-0.033158976294135695
				]
			]
		},
		{
			"type": "rectangle",
			"version": 1374,
			"versionNonce": 1134302624,
			"isDeleted": false,
			"id": "-Zp2_V910VitqD_bWmGes",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 993.5262819389172,
			"y": -1049.4304679731802,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 867885472,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1429,
			"versionNonce": 1678873696,
			"isDeleted": false,
			"id": "3U6sFw--AVJ9RDLPvyvU_",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1005.3305460531983,
			"y": -1049.8632840121052,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1764601248,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1449,
			"versionNonce": 1321755040,
			"isDeleted": false,
			"id": "XaiK0QfpBCsSMhkY52PaI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1017.6856657435073,
			"y": -1049.666566860428,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 2120677792,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1470,
			"versionNonce": 698353760,
			"isDeleted": false,
			"id": "A5RSDRBhk1BmzpquP6UAQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1030.0014367200054,
			"y": -1050.256757941567,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 915850656,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1512,
			"versionNonce": 1183526304,
			"isDeleted": false,
			"id": "lf05_oK7EdLPgyXUDfDh-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1041.6876480884916,
			"y": -1050.0993762950088,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1861030304,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783867,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1416,
			"versionNonce": 490732640,
			"isDeleted": false,
			"id": "8Nl-jSWJjhpvdVkoSZlis",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1004.9960786835868,
			"y": -1061.313403097696,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1587142048,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1440,
			"versionNonce": 1410628000,
			"isDeleted": false,
			"id": "KXz_gjR2crIOEK19eh-KF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1017.3905536920647,
			"y": -1061.156014846789,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1456286112,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1464,
			"versionNonce": 12677216,
			"isDeleted": false,
			"id": "UHZZDw15rhOL3m88SUDKE",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1029.9424169514543,
			"y": -1061.1560280554797,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 45544864,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1483,
			"versionNonce": 2056537504,
			"isDeleted": false,
			"id": "7--5lQR0oaNSk7sGERoEP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1029.5292521542128,
			"y": -1073.196371243958,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 663175584,
			"groupIds": [
				"N1AJPL1ymDYcdDPph03C8",
				"j7lfnf6n3kKP7oq-pZgjw",
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1993,
			"versionNonce": 1542743136,
			"isDeleted": false,
			"id": "bSlhQ21e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 976.3457701966001,
			"y": -977.7652396826719,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 111.94245910644531,
			"height": 42.41293532338311,
			"seed": 1684934048,
			"groupIds": [
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"fontSize": 33.93034825870649,
			"fontFamily": 1,
			"text": "Docker",
			"rawText": "Docker",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Docker",
			"lineHeight": 1.25
		},
		{
			"type": "rectangle",
			"version": 3189,
			"versionNonce": 1463456160,
			"isDeleted": false,
			"id": "8UAblmj7Y7obzIYou-UeD",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 819.4000299560998,
			"y": -1086.2629494865005,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 92.73381114783894,
			"height": 92.64500978085071,
			"seed": 913461664,
			"groupIds": [
				"DKcExaieDw2owzu9drhbe",
				"0TZiyLm7eBWjVMZUXAo-5",
				"ZblcKCPWNkEIkMwzgfcG6",
				"Uth72P0T0dANIYJFnUG7q",
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1144,
			"versionNonce": 1017698400,
			"isDeleted": false,
			"id": "jKUbmzEZUUknxJnZcZbL0",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 828.4478523529539,
			"y": -1077.0958620244576,
			"strokeColor": "#000000",
			"backgroundColor": "#868e96",
			"width": 74.6381663541306,
			"height": 74.6381663541306,
			"seed": 58138016,
			"groupIds": [
				"-YHk8_5qEJ9bdQNZo8f-_",
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 4690,
			"versionNonce": 1631018400,
			"isDeleted": false,
			"id": "gaOeLtASgAUd9QWNpEmTV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 851.102584897619,
			"y": -1062.122840844516,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 40.42845896405703,
			"height": 46.69337197962393,
			"seed": 1845651872,
			"groupIds": [
				"-YHk8_5qEJ9bdQNZo8f-_",
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.6287007070178,
					1.2770013946469938
				],
				[
					6.074129444355898,
					3.8998877961489646
				],
				[
					9.406666172997701,
					2.8045350660469324
				],
				[
					18.70573071366493,
					2.9310598222934012
				],
				[
					21.60613098320441,
					3.2172925230203195
				],
				[
					23.849503922211213,
					1.430175310886328
				],
				[
					26.965453442367807,
					-0.7326535407010105
				],
				[
					27.820038753803185,
					2.242622168350892
				],
				[
					27.741153955824508,
					5.130847715724726
				],
				[
					30.594154149385616,
					7.865542146061478
				],
				[
					31.869458383373754,
					15.694215391986194
				],
				[
					30.870250942310896,
					23.893314768899707
				],
				[
					27.964660883430707,
					27.07889417421662
				],
				[
					24.007273518168514,
					28.78531833553041
				],
				[
					19.734346960991747,
					29.728096972097514
				],
				[
					20.865029065352406,
					30.790476283610555
				],
				[
					22.14033329934052,
					33.14595364600562
				],
				[
					22.403282625935983,
					40.534318857891876
				],
				[
					22.350692760616916,
					45.00759833050466
				],
				[
					20.957061329660824,
					45.78179635900904
				],
				[
					10.416080199763984,
					45.96071843892292
				],
				[
					9.098046700204055,
					44.67043711437921
				],
				[
					8.729917642970399,
					39.40755292143862
				],
				[
					6.297636371962061,
					40.08361248331054
				],
				[
					2.274511675051001,
					40.3411589830713
				],
				[
					-1.4856636952645375,
					38.184207047575114
				],
				[
					-3.8259127019644046,
					34.41758948857428
				],
				[
					-6.1004243770154005,
					32.09967099072767
				],
				[
					-8.559000580683277,
					30.46854315890965
				],
				[
					-5.219544132920522,
					30.790476283610555
				],
				[
					-2.8530001935610754,
					32.614763990249116
				],
				[
					-0.17091706228707618,
					35.15803567538645
				],
				[
					3.089654587497059,
					36.7462390905776
				],
				[
					6.7052078281850696,
					36.295532715996366
				],
				[
					8.493263249034436,
					34.889758071469025
				],
				[
					8.664180311321491,
					32.67915061518928
				],
				[
					9.623945353395072,
					30.7582829711405
				],
				[
					10.872954654723646,
					29.889063534447928
				],
				[
					6.1530142423345335,
					28.676448764741217
				],
				[
					1.643433291221829,
					27.189322274228044
				],
				[
					-0.6573733164887305,
					23.839659248116217
				],
				[
					-2.3796914056892104,
					15.771427451501943
				],
				[
					-1.012354907392652,
					8.180039825449018
				],
				[
					0.9597650420735601,
					6.09976414827195
				],
				[
					-0.17091706228707618,
					3.276103826237163
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 2021,
			"versionNonce": 1991167072,
			"isDeleted": false,
			"id": "SizzwGgf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 819.0124368632669,
			"y": -985.5620329027447,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 92.0501708984375,
			"height": 35.96499897442564,
			"seed": 21247392,
			"groupIds": [
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"fontSize": 28.771999179540515,
			"fontFamily": 1,
			"text": "GitHub",
			"rawText": "GitHub",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "GitHub",
			"lineHeight": 1.25
		},
		{
			"type": "image",
			"version": 188,
			"versionNonce": 700098976,
			"isDeleted": false,
			"id": "x299zNfV9ZT8ZDgt4jEWi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1180.8457701966004,
			"y": -1107.763325040743,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 106.33333333333326,
			"height": 106.33333333333326,
			"seed": 1532221536,
			"groupIds": [
				"eu0zB0LaxWqvQ4T5MVsJV"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"status": "pending",
			"fileId": "0e77320ba2cdfffa54ed944064dc676677a1c426",
			"scale": [
				1,
				1
			]
		},
		{
			"type": "text",
			"version": 497,
			"versionNonce": 1674985568,
			"isDeleted": false,
			"id": "Nt6ZLJmr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1134.660271641099,
			"y": -993.8696055289128,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 191.79371643066406,
			"height": 33.54589430967364,
			"seed": 1372471392,
			"groupIds": [
				"eu0zB0LaxWqvQ4T5MVsJV"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"fontSize": 26.83671544773891,
			"fontFamily": 1,
			"text": "Github Actions",
			"rawText": "Github Actions",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Github Actions",
			"lineHeight": 1.25
		},
		{
			"type": "text",
			"version": 2018,
			"versionNonce": 469005728,
			"isDeleted": false,
			"id": "rCXmBsQO",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 515.6386975298872,
			"y": -213.36183383448952,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 150.04879760742188,
			"height": 31.136012047488816,
			"seed": 775021984,
			"groupIds": [
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"fontSize": 25.94667670624068,
			"fontFamily": 1,
			"text": "ElastiCache",
			"rawText": "ElastiCache",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "ElastiCache",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1766,
			"versionNonce": 602879072,
			"isDeleted": false,
			"id": "ZQpiz6xoS_Qc6kUaCKF6I",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 548.4736693513746,
			"y": -304.3960663897236,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 84.43157714347974,
			"height": 84.43157714347974,
			"seed": 103035296,
			"groupIds": [
				"hX-KHPDLr1IgBHEmNtj8Q",
				"JPVUcWFh6oJcrjarlwK17",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3093,
			"versionNonce": 1024770464,
			"isDeleted": false,
			"id": "fAAxadBqk3bTrgmysED6k",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 574.4819579060525,
			"y": -276.41129306407515,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.678720425002144,
			"height": 11.236901335627255,
			"seed": 1106050464,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1265,
			"versionNonce": 1556719712,
			"isDeleted": false,
			"id": "-7qRWkrso9UXpLuxOCLx7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 574.7884442043242,
			"y": -270.06842003703366,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.22273187379533896,
			"height": 34.96890418587131,
			"seed": 582764960,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.22273187379533896,
					34.96890418587131
				]
			]
		},
		{
			"type": "line",
			"version": 1325,
			"versionNonce": 1816890784,
			"isDeleted": false,
			"id": "6F6HoQWB3prN56BTdCDi1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 605.21361816477,
			"y": -270.424791035104,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.15041600671561423,
			"height": 33.518229949663585,
			"seed": 1136792992,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.15041600671561423,
					33.518229949663585
				]
			]
		},
		{
			"type": "line",
			"version": 1329,
			"versionNonce": 2050333792,
			"isDeleted": false,
			"id": "ID3ItmApWQnwSU-sBE6VP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 575.1893615771555,
			"y": -235.0549694764013,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1512989088,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.3363912427721552,
					1.336391242772155
				],
				[
					4.677369349702543,
					3.340978106930388
				],
				[
					8.018347456632933,
					4.0091737283164655
				],
				[
					11.80478931115403,
					4.231905602111743
				],
				[
					15.368499291879788,
					4.231905602111743
				],
				[
					18.93220927260551,
					4.231905602111743
				],
				[
					23.16411487471735,
					3.5637099807256654
				],
				[
					26.282361107852363,
					2.450050611748789
				],
				[
					28.955143593396684,
					0.6681956213860775
				],
				[
					30.068802962373493,
					-1.559123116567676
				]
			]
		},
		{
			"type": "line",
			"version": 1352,
			"versionNonce": 583588256,
			"isDeleted": false,
			"id": "fblVT0pIq0tf3qTfiSPAP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 575.0953346211604,
			"y": -245.8791806751958,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1966157216,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.3363912427721552,
					1.336391242772155
				],
				[
					4.677369349702543,
					3.340978106930388
				],
				[
					8.018347456632933,
					4.0091737283164655
				],
				[
					11.80478931115403,
					4.231905602111743
				],
				[
					15.368499291879788,
					4.231905602111743
				],
				[
					18.93220927260551,
					4.231905602111743
				],
				[
					23.16411487471735,
					3.5637099807256654
				],
				[
					26.282361107852363,
					2.450050611748789
				],
				[
					28.955143593396684,
					0.6681956213860775
				],
				[
					30.068802962373493,
					-1.559123116567676
				]
			]
		},
		{
			"type": "line",
			"version": 1375,
			"versionNonce": 1845694560,
			"isDeleted": false,
			"id": "4elKOlFaMVMgmowcS6_NC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 575.0953346211604,
			"y": -257.63333891129025,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1039825312,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.3363912427721552,
					1.336391242772155
				],
				[
					4.677369349702543,
					3.340978106930388
				],
				[
					8.018347456632933,
					4.0091737283164655
				],
				[
					11.80478931115403,
					4.231905602111743
				],
				[
					15.368499291879788,
					4.231905602111743
				],
				[
					18.93220927260551,
					4.231905602111743
				],
				[
					23.16411487471735,
					3.5637099807256654
				],
				[
					26.282361107852363,
					2.450050611748789
				],
				[
					28.955143593396684,
					0.6681956213860775
				],
				[
					30.068802962373493,
					-1.559123116567676
				]
			]
		},
		{
			"type": "line",
			"version": 1038,
			"versionNonce": 868001184,
			"isDeleted": false,
			"id": "3p7ltir8aEzfk8Dw0cZtv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 568.4871590327139,
			"y": -254.2945159158321,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.007862475072281,
			"height": 24.814334053976648,
			"seed": 934954400,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-11.007862475072281,
					0
				],
				[
					-11.007862475072281,
					-24.814334053976648
				]
			]
		},
		{
			"type": "line",
			"version": 1079,
			"versionNonce": 1879180384,
			"isDeleted": false,
			"id": "i7ZkxaN7zVEjDtR9TJ5_4",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 612.611895903131,
			"y": -254.126599369602,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.007862475072281,
			"height": 24.814334053976648,
			"seed": 2141229472,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					11.007862475072281,
					0
				],
				[
					11.007862475072281,
					-24.814334053976648
				]
			]
		},
		{
			"type": "line",
			"version": 1061,
			"versionNonce": 207024544,
			"isDeleted": false,
			"id": "WgbXEj7vxp3u3oIp3ladb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 557.4792965576414,
			"y": -287.9897695259692,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 66.42032273094495,
			"height": 5.597218207663906,
			"seed": 215834016,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-5.597218207663906
				],
				[
					66.42032273094495,
					-5.22407032715298
				],
				[
					66.42032273094495,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 990,
			"versionNonce": 1040349280,
			"isDeleted": false,
			"id": "tgjd95xIOES8o-NhB9KYK",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 562.5167929445392,
			"y": -254.96618210075258,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.343513968685692,
			"height": 5.410644267408442,
			"seed": 1889577376,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-5.410644267408442
				],
				[
					6.343513968685692,
					-5.410644267408442
				]
			]
		},
		{
			"type": "line",
			"version": 1035,
			"versionNonce": 1942470048,
			"isDeleted": false,
			"id": "qbhgggZ7hiqURSKBsk_ul",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 618.488975021178,
			"y": -254.76095076647084,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.343513968685692,
			"height": 5.410644267408442,
			"seed": 370832800,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-5.410644267408442
				],
				[
					-6.343513968685692,
					-5.410644267408442
				]
			]
		},
		{
			"type": "line",
			"version": 1040,
			"versionNonce": 1540648032,
			"isDeleted": false,
			"id": "03b3qbk1QTwiknxheM_ta",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 570.7260463157791,
			"y": -266.9069142771017,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.649531550474005,
			"height": 21.269429189122842,
			"seed": 41599392,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-3.3583309245983433,
					0
				],
				[
					-3.3583309245983433,
					-21.269429189122842
				],
				[
					4.2912006258756605,
					-21.269429189122842
				],
				[
					4.2912006258756605,
					-11.194436415327813
				]
			]
		},
		{
			"type": "line",
			"version": 1081,
			"versionNonce": 1262422432,
			"isDeleted": false,
			"id": "uYwrcYv2fUmwh8rKnqyU8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 610.0744903156565,
			"y": -266.9069142771017,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.649531550474005,
			"height": 21.269429189122842,
			"seed": 351374752,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783868,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.3583309245983433,
					0
				],
				[
					3.3583309245983433,
					-21.269429189122842
				],
				[
					-4.2912006258756605,
					-21.269429189122842
				],
				[
					-4.2912006258756605,
					-11.194436415327813
				]
			]
		},
		{
			"type": "line",
			"version": 1030,
			"versionNonce": 1397219424,
			"isDeleted": false,
			"id": "xMAFh06oYb5BzLsjmVLm5",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 579.6815954480417,
			"y": -281.08653373651737,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.209253371240395,
			"height": 7.089809729707613,
			"seed": 1185864096,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-7.089809729707613
				],
				[
					8.209253371240395,
					-7.089809729707613
				],
				[
					8.209253371240395,
					-0.18657394025546348
				]
			]
		},
		{
			"type": "line",
			"version": 1045,
			"versionNonce": 1307366816,
			"isDeleted": false,
			"id": "WzbYduf4vfQLgKpe6swEv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 593.1149191464347,
			"y": -281.08653373651737,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.209253371240395,
			"height": 7.089809729707613,
			"seed": 1793238432,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0,
					-7.089809729707613
				],
				[
					8.209253371240395,
					-7.089809729707613
				],
				[
					8.209253371240395,
					-0.18657394025546348
				]
			]
		},
		{
			"type": "line",
			"version": 1018,
			"versionNonce": 1949095008,
			"isDeleted": false,
			"id": "m3c7Dt_FBKqa7UPSCodUe",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 557.6658704978968,
			"y": -287.8031955857133,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.918052745364734,
			"height": 8.209253371240395,
			"seed": 1857876384,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.798609103831953,
					1.4925915220437083
				],
				[
					3.918052745364734,
					3.7314788051092704
				],
				[
					2.798609103831953,
					6.7166618491966865
				],
				[
					0,
					8.209253371240395
				]
			]
		},
		{
			"type": "line",
			"version": 1066,
			"versionNonce": 1359028640,
			"isDeleted": false,
			"id": "_LpfLcwnHicgxlqFo7oCQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 623.6197583782032,
			"y": -287.8778251618154,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.918052745364734,
			"height": 8.209253371240395,
			"seed": 426622368,
			"groupIds": [
				"rXiq_NHTwsUwEoNUs7OaF",
				"YewlLYqX7s-EHXdQnzN2C",
				"wsFdXOKFQ0m6JppmW3Pxx"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-2.798609103831953,
					1.4925915220437083
				],
				[
					-3.918052745364734,
					3.7314788051092704
				],
				[
					-2.798609103831953,
					6.7166618491966865
				],
				[
					0,
					8.209253371240395
				]
			]
		},
		{
			"id": "zvVCEpHHGBqOthIuK4uqy",
			"type": "frame",
			"x": -1158.2559980987958,
			"y": 200.10794172859812,
			"width": 1363.0688396675923,
			"height": 916.7542638472302,
			"angle": 0,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 1400110496,
			"version": 159,
			"versionNonce": 47217056,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714169476797,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": null
		},
		{
			"id": "A7kreWsOQA5Xrz6Op0VnQ",
			"type": "frame",
			"x": 409.87629532409755,
			"y": 219.4080314938028,
			"width": 2125.4223853931835,
			"height": 849.2039496690134,
			"angle": 0,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"seed": 161065056,
			"version": 159,
			"versionNonce": 251010144,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714169463584,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": null
		},
		{
			"type": "embeddable",
			"version": 627,
			"versionNonce": 341002336,
			"isDeleted": true,
			"id": "uO_eHW4LcsG7S5Udg_ys8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -588.4113049629412,
			"y": -636.8918731283972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 352.5793983609069,
			"height": 500,
			"seed": 941444512,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": null,
			"boundElements": null,
			"updated": 1714137783869,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 1]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "embeddable",
			"version": 522,
			"versionNonce": 61599136,
			"isDeleted": true,
			"id": "KtoDxGXpAm7c5n53C4qUk",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -973.9113049629407,
			"y": -861.2252064617302,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 309.3333333333335,
			"height": 213.66666666666643,
			"seed": 1566563424,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": null,
			"boundElements": null,
			"updated": 1714137783869,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 2]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "embeddable",
			"version": 538,
			"versionNonce": 1334525024,
			"isDeleted": true,
			"id": "JhYdy1onjWJ3nsQmk3Zz_",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -526.2863049629409,
			"y": -1002.0611439617303,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 429.16666666666663,
			"height": 192.9166666666667,
			"seed": 241342880,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": null,
			"boundElements": null,
			"updated": 1714137783869,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 3]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "line",
			"version": 355,
			"versionNonce": 790444448,
			"isDeleted": true,
			"id": "sYYyzKXVELIRSsHg57_dN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -698.7967216296074,
			"y": -790.7479929200638,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 222.5,
			"height": 116.25,
			"seed": 1910853728,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					122.5,
					-30
				],
				[
					222.5,
					-116.25
				]
			]
		},
		{
			"type": "line",
			"version": 589,
			"versionNonce": 1201975392,
			"isDeleted": true,
			"id": "sRRzb0KuhcwKD6jJPO4EB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -687.5467216296074,
			"y": -789.4979929200638,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 122.5,
			"height": 283.75,
			"seed": 102655392,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					47.5,
					62.5
				],
				[
					122.5,
					283.75
				]
			]
		},
		{
			"type": "frame",
			"version": 190,
			"versionNonce": 1988429216,
			"isDeleted": true,
			"id": "2GKpE-8QHZY0_E3W7_ZUS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1136.5619898086943,
			"y": -1108.6540598145957,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 1349.9255371093755,
			"height": 1038.1449538010822,
			"seed": 1033651296,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": null,
			"updated": 1714137783869,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "1. Schema"
		},
		{
			"type": "embeddable",
			"version": 626,
			"versionNonce": 1298451872,
			"isDeleted": true,
			"id": "tdfncErm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -588.4113049629412,
			"y": -636.8918731283972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 352.5793983609069,
			"height": 500,
			"seed": 941444512,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": null,
			"boundElements": null,
			"updated": 1714137782299,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 1]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "embeddable",
			"version": 521,
			"versionNonce": 1112562784,
			"isDeleted": true,
			"id": "MOi6YAzE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -973.9113049629407,
			"y": -861.2252064617302,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 309.3333333333335,
			"height": 213.66666666666643,
			"seed": 1566563424,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": null,
			"boundElements": null,
			"updated": 1714137782299,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 2]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		},
		{
			"type": "embeddable",
			"version": 537,
			"versionNonce": 247077280,
			"isDeleted": true,
			"id": "GNgx3jku",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -526.2863049629409,
			"y": -1002.0611439617303,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 429.16666666666663,
			"height": 192.9166666666667,
			"seed": 241342880,
			"groupIds": [],
			"frameId": "2GKpE-8QHZY0_E3W7_ZUS",
			"roundness": null,
			"boundElements": null,
			"updated": 1714137782299,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 3]]",
			"locked": false,
			"customData": {
				"mdProps": {
					"useObsidianDefaults": false,
					"backgroundMatchCanvas": false,
					"backgroundMatchElement": true,
					"backgroundColor": "#fff",
					"backgroundOpacity": 60,
					"borderMatchElement": true,
					"borderColor": "#fff",
					"borderOpacity": 0,
					"filenameVisible": false
				}
			},
			"scale": [
				1,
				1
			]
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "#ffffff",
		"currentItemStrokeColor": "#1e1e1e",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "solid",
		"currentItemStrokeWidth": 2,
		"currentItemStrokeStyle": "solid",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 20,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": 1540.6390265719165,
		"scrollY": 731.8376037111661,
		"zoom": {
			"value": 0.414505844134611
		},
		"currentItemRoundness": "sharp",
		"gridSize": null,
		"gridColor": {
			"Bold": "#C9C9C9FF",
			"Regular": "#EDEDEDFF"
		},
		"currentStrokeOptions": null,
		"previousGridSize": null,
		"frameRendering": {
			"enabled": true,
			"clip": true,
			"name": true,
			"outline": true
		}
	},
	"files": {}
}
```
%%