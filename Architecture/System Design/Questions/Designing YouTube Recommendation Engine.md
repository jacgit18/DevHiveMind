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

### Database Schema 

#### DB Table

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| ..        | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |


#### DB Query to Request Table

| Request | DB    | Description                                | Endpoints               |
| ------- | ----- | ------------------------------------------ | ----------------------- |
| GET     | READ  | *Returns nearby business at user location* | **/v1/search/nearby**   |
| GET     | READ  |                                            | **/v1/search/specific** |
| GET     | READ  |                                            | **/v2/search/specific** |
| POST    | WRITE |                                            | ..                      |
| DELETE  | WRITE |                                            | ..                      |
| PATCH   | WRITE |                                            | ..                      |
|         |       |                                            |                         |


#### Response 
```json
{
"total":10,
"buisnesses": [{buisness object}]
}
```



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

# Element Links
cfVAGpj7: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 1]]
TsXzxI5r: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 2]]
zrOOXy2q: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 3]]
D6RNpTN3: [[Integration of AI and Machine Learning Services#Amazon Rekognition]]

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
			"version": 618,
			"versionNonce": 727226784,
			"isDeleted": false,
			"id": "cfVAGpj7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -598.4113049629412,
			"y": -644.0347302712545,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 352.5793983609069,
			"height": 500,
			"seed": 16317,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898180,
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
			"version": 513,
			"versionNonce": 1196380256,
			"isDeleted": false,
			"id": "TsXzxI5r",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -983.9113049629407,
			"y": -868.3680636045875,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 309.3333333333335,
			"height": 213.66666666666643,
			"seed": 14525,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898180,
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
			"version": 529,
			"versionNonce": 341075360,
			"isDeleted": false,
			"id": "zrOOXy2q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -536.2863049629409,
			"y": -1009.2040011045876,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 429.16666666666663,
			"height": 192.9166666666667,
			"seed": 3319,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898180,
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
			"version": 351,
			"versionNonce": 1439056992,
			"isDeleted": false,
			"id": "-PO2Zd6NDX76DEi7npcXu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -708.7967216296074,
			"y": -797.8908500629211,
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
			"updated": 1713973898180,
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
			"version": 585,
			"versionNonce": 66498976,
			"isDeleted": false,
			"id": "_q6MHlXRfqRwgPr01jKBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -697.5467216296074,
			"y": -796.6408500629211,
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
			"updated": 1713973898180,
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
			"version": 184,
			"versionNonce": 1631500384,
			"isDeleted": false,
			"id": "ESidNTlLbrCl4hZ0PJBBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1146.5619898086943,
			"y": -1115.796916957453,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 1349.9255371093755,
			"height": 1038.1449538010822,
			"seed": 1362751418,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898180,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "Schema"
		},
		{
			"type": "arrow",
			"version": 306,
			"versionNonce": 1634696608,
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
			"updated": 1713973898180,
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
			"version": 163,
			"versionNonce": 1300802656,
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
			"updated": 1713973898180,
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
			"version": 333,
			"versionNonce": 770623904,
			"isDeleted": false,
			"id": "WyM64MRAi_hQ0WnO58U6d",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2209.82628967712,
			"y": -957.9412961175185,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 228.0803302058298,
			"height": 211.80998926367408,
			"seed": 463490368,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898180,
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
					64
				],
				[
					-228.0803302058298,
					211.80998926367408
				]
			]
		},
		{
			"type": "arrow",
			"version": 137,
			"versionNonce": 74719328,
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
			"updated": 1713973898180,
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
			"version": 681,
			"versionNonce": 1151636896,
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
			"updated": 1713973898180,
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
			"id": "FIlZGvwXzh0nKp7thmKAd",
			"type": "arrow",
			"x": 1691.0838654346949,
			"y": -137.22066631058465,
			"width": 155.55555555555566,
			"height": 17.77777777777783,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 1261770848,
			"version": 63,
			"versionNonce": 902894688,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1713973898180,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-155.55555555555566,
					-17.77777777777783
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "xqvko52RSdMyp8oiurAyw",
				"focus": -0.13538172405428375,
				"gap": 1.119211251777756
			},
			"endBinding": null,
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "ACDqpyxuesxKi_YA4tyJL",
			"type": "arrow",
			"x": 1637.0629682576396,
			"y": -770.4361592975566,
			"width": 75.55555555555566,
			"height": 211.22895145747248,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 759341152,
			"version": 283,
			"versionNonce": 448848288,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1713973898180,
			"link": null,
			"locked": false,
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
					69.57645273261096,
					-211.22895145747248
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "2IIbIsp3eopTrfWcuwVdP",
				"focus": 0.31061866614034983,
				"gap": 12.000168780107586
			},
			"endBinding": {
				"elementId": "NFpxu9SH1L8Jl9rNr07W4",
				"focus": 0.27924234783167035,
				"gap": 2.087165458837717
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "cTKYit54IDA4gGy5GPLGd",
			"type": "arrow",
			"x": 1089.3457701966,
			"y": -686.1011226597909,
			"width": 104,
			"height": 2,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 381464992,
			"version": 54,
			"versionNonce": 622490720,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1713973916741,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					104,
					2
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "U9sGOpfQr2euZBCFhLzoo",
				"focus": 0.1990573082134081,
				"gap": 2.7074526635618668
			},
			"endBinding": {
				"elementId": "dVNrB3hwj-8exkKKKlNkt",
				"focus": 0.016909645559655108,
				"gap": 5.959579467773665
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"type": "frame",
			"version": 634,
			"versionNonce": 393185376,
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
			"updated": 1713973898180,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "Architecture"
		},
		{
			"type": "rectangle",
			"version": 362,
			"versionNonce": 2138287520,
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
			"updated": 1713973898180,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 326,
			"versionNonce": 622820448,
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
			"updated": 1713973898181,
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
			"version": 1296,
			"versionNonce": 1542257056,
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
			"updated": 1713973898181,
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
			"version": 3212,
			"versionNonce": 1622208608,
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
			"boundElements": [],
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2456,
			"versionNonce": 1935459744,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2618,
			"versionNonce": 301196384,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2662,
			"versionNonce": 586355104,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2720,
			"versionNonce": 112744544,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 978,
			"versionNonce": 568319392,
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
			"updated": 1713973898181,
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
			"version": 930,
			"versionNonce": 1389251680,
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
			"updated": 1713973898181,
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
			"version": 937,
			"versionNonce": 1095969184,
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
			"updated": 1713973898181,
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
			"version": 944,
			"versionNonce": 268812384,
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
			"updated": 1713973898181,
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
			"version": 946,
			"versionNonce": 746386848,
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
			"updated": 1713973898181,
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
			"version": 933,
			"versionNonce": 506377312,
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
			"updated": 1713973898181,
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
			"version": 867,
			"versionNonce": 680346016,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 903,
			"versionNonce": 1662593120,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 901,
			"versionNonce": 1421086112,
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
			"updated": 1713973898181,
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
			"version": 1292,
			"versionNonce": 177544288,
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
			"updated": 1713973898181,
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
			"version": 2237,
			"versionNonce": 1780570528,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2459,
			"versionNonce": 1181913184,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2474,
			"versionNonce": 2080712096,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2128,
			"versionNonce": 243369056,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2157,
			"versionNonce": 932147616,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2206,
			"versionNonce": 1620179040,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1153,
			"versionNonce": 602946976,
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
			"updated": 1713973898181,
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
			"version": 1196,
			"versionNonce": 7597152,
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
			"updated": 1713973898181,
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
			"version": 2259,
			"versionNonce": 1649904032,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1928,
			"versionNonce": 938958944,
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
			"updated": 1713973898181,
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
			"version": 1569,
			"versionNonce": 1844794784,
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
			"updated": 1713973898181,
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
			"version": 1011,
			"versionNonce": 384586848,
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
			"updated": 1713973898181,
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
			"version": 637,
			"versionNonce": 1543086496,
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
				}
			],
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 583,
			"versionNonce": 857917536,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 556,
			"versionNonce": 462712224,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 558,
			"versionNonce": 1751825504,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 567,
			"versionNonce": 905296288,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 636,
			"versionNonce": 412364896,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 610,
			"versionNonce": 239961504,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 612,
			"versionNonce": 1802445920,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 621,
			"versionNonce": 567005600,
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
			"updated": 1713973898181,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 620,
			"versionNonce": 248223840,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 594,
			"versionNonce": 1201708448,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 596,
			"versionNonce": 1987677280,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 605,
			"versionNonce": 1895557536,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 637,
			"versionNonce": 474546272,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 611,
			"versionNonce": 1762506144,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 613,
			"versionNonce": 1074394208,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 622,
			"versionNonce": 352715168,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 543,
			"versionNonce": 663513184,
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
			"updated": 1713973898182,
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
			"version": 1123,
			"versionNonce": 873778592,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1068,
			"versionNonce": 1587567712,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1039,
			"versionNonce": 527047072,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1041,
			"versionNonce": 1997918304,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1050,
			"versionNonce": 171304352,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1119,
			"versionNonce": 1220330592,
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
			"boundElements": [],
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1093,
			"versionNonce": 1101541792,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1095,
			"versionNonce": 828717152,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1104,
			"versionNonce": 1827732896,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1103,
			"versionNonce": 1423912032,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1077,
			"versionNonce": 1296058784,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1079,
			"versionNonce": 1559928928,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1088,
			"versionNonce": 2110133664,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1121,
			"versionNonce": 965186656,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1094,
			"versionNonce": 867328416,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1096,
			"versionNonce": 1616250976,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1105,
			"versionNonce": 2117414304,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1033,
			"versionNonce": 221641824,
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
			"updated": 1713973898182,
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
			"version": 1692,
			"versionNonce": 108951968,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1641,
			"versionNonce": 32993376,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1613,
			"versionNonce": 1337869728,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1614,
			"versionNonce": 1181377632,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1623,
			"versionNonce": 1998885280,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1695,
			"versionNonce": 1751046240,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1666,
			"versionNonce": 1944149408,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1668,
			"versionNonce": 1000655968,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1677,
			"versionNonce": 1462020512,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1676,
			"versionNonce": 437010528,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1650,
			"versionNonce": 203322784,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1652,
			"versionNonce": 593835104,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1661,
			"versionNonce": 402571680,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1693,
			"versionNonce": 2105518176,
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
			"updated": 1713973898182,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1667,
			"versionNonce": 1509264800,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1669,
			"versionNonce": 338402400,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1678,
			"versionNonce": 1261623712,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1658,
			"versionNonce": 1496911968,
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
			"updated": 1713973898183,
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
			"version": 1609,
			"versionNonce": 1055303072,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1559,
			"versionNonce": 74974304,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1530,
			"versionNonce": 574681504,
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
				}
			],
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1531,
			"versionNonce": 1404598368,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1541,
			"versionNonce": 1014087072,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1609,
			"versionNonce": 1254780000,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1583,
			"versionNonce": 1856571808,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1586,
			"versionNonce": 1937629280,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1594,
			"versionNonce": 1947653536,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1594,
			"versionNonce": 497210464,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1567,
			"versionNonce": 569057696,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1569,
			"versionNonce": 520702048,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1578,
			"versionNonce": 659942816,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1611,
			"versionNonce": 327236704,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1586,
			"versionNonce": 1300707744,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1586,
			"versionNonce": 484094048,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1595,
			"versionNonce": 934217120,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1599,
			"versionNonce": 585475168,
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
			"updated": 1713973898183,
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
			"version": 1975,
			"versionNonce": 587026848,
			"isDeleted": false,
			"id": "VaAiB2VJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2229.7380417870886,
			"y": -898.0409285860552,
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
			"updated": 1713973898183,
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
			"version": 1732,
			"versionNonce": 326244448,
			"isDeleted": false,
			"id": "KAaV-QTO59RxROnreu97C",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2211.2858691448932,
			"y": -1007.02641841888,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2584,
			"versionNonce": 648158624,
			"isDeleted": false,
			"id": "dRAaKVGQr6cD0zwzZjorv",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 2290.157342871873,
			"y": -930.4088501818065,
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
			"updated": 1713973898183,
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
			"version": 2477,
			"versionNonce": 575671392,
			"isDeleted": false,
			"id": "oTOyGNKr2cEYmYe6eSgOH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.029928014204294584,
			"x": 2295.598164865677,
			"y": -995.9039792385095,
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
			"updated": 1713973898183,
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
			"version": 3084,
			"versionNonce": 1942841760,
			"isDeleted": false,
			"id": "yqLUkBpzMMsmnD89SXydH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.765434113477622,
			"x": 2302.150876333476,
			"y": -925.5305765215907,
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
			"updated": 1713973898183,
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
			"version": 3302,
			"versionNonce": 156205152,
			"isDeleted": false,
			"id": "y2d6lCkd1iqJ3Xo7mS2dx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.48666424209895,
			"x": 2229.0094726078482,
			"y": -996.9037341117355,
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
			"updated": 1713973898183,
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
			"version": 2678,
			"versionNonce": 363804064,
			"isDeleted": false,
			"id": "YestT38NN0kYlUoPABMUs",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 2224.0102054137924,
			"y": -994.8322914261892,
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
			"updated": 1713973898183,
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
			"version": 2541,
			"versionNonce": 1212183648,
			"isDeleted": false,
			"id": "T3raV22AUirE7j1dq4AL8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.06885648930104615,
			"x": 2231.812791329259,
			"y": -930.7950471589979,
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
			"updated": 1713973898183,
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
			"version": 3311,
			"versionNonce": 829915552,
			"isDeleted": false,
			"id": "p_Cd85u5VSHJo6eivVUB5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.854199750177644,
			"x": 2300.625737438956,
			"y": -998.1315167616197,
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
			"updated": 1713973898183,
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
			"version": 3305,
			"versionNonce": 1693640800,
			"isDeleted": false,
			"id": "NeGJGGXx40qezmkgID0t5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.663921886409196,
			"x": 2229.052743474192,
			"y": -924.1884314821308,
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
			"updated": 1713973898183,
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
			"version": 4234,
			"versionNonce": 1180061088,
			"isDeleted": false,
			"id": "gwwCMMAZBrvx4iYvT6VsI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2242.1157698827174,
			"y": -979.6345494805903,
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
			"updated": 1713973898183,
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
			"version": 2391,
			"versionNonce": 725015648,
			"isDeleted": false,
			"id": "30rX2VQxBJCRbitDCPL_V",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2241.9834691175533,
			"y": -985.1450723947212,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2232,
			"versionNonce": 1836816800,
			"isDeleted": false,
			"id": "WwTHsx0ICM3m8xaXB1ADw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2242.604278925597,
			"y": -965.4783510396235,
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
			"updated": 1713973898183,
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
			"version": 2260,
			"versionNonce": 1826377824,
			"isDeleted": false,
			"id": "dKwGKuq9DvTd3aYKSfTgt",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2241.6069547729385,
			"y": -948.8059980560628,
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
			"updated": 1713973898183,
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
			"version": 5305,
			"versionNonce": 437740960,
			"isDeleted": false,
			"id": "5ptbPmHfQLkfJ-3sHJTWh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.034244644020102,
			"x": 2241.2497382772845,
			"y": -969.4914475591986,
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
			"updated": 1713973898183,
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
			"version": 5350,
			"versionNonce": 1102267488,
			"isDeleted": false,
			"id": "9dqvYiuxpR39AsuYNGx9L",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.31086799431261625,
			"x": 2277.5217280470515,
			"y": -969.4888952466499,
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
			"updated": 1713973898183,
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
			"version": 2758,
			"versionNonce": 1499050400,
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
			"updated": 1713973898183,
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
			"version": 1618,
			"versionNonce": 1200339040,
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
			"updated": 1713973898183,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3141,
			"versionNonce": 309493152,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1309,
			"versionNonce": 1647684704,
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
			"updated": 1713973898184,
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
			"version": 1349,
			"versionNonce": 1183959456,
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
			"updated": 1713973898184,
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
			"version": 1482,
			"versionNonce": 2072060000,
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
			"updated": 1713973898184,
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
			"version": 1374,
			"versionNonce": 1357354400,
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
			"updated": 1713973898184,
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
			"version": 1074,
			"versionNonce": 1128141920,
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
			"updated": 1713973898184,
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
			"version": 1496,
			"versionNonce": 648274336,
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
			"updated": 1713973898184,
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
			"version": 811,
			"versionNonce": 1866238048,
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
			"updated": 1713973898184,
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
			"version": 1326,
			"versionNonce": 385265056,
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
			"updated": 1713973898184,
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
			"version": 962,
			"versionNonce": 2068610144,
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
			"updated": 1713973898184,
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
			"version": 913,
			"versionNonce": 185596320,
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
			"updated": 1713973898184,
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
			"version": 2435,
			"versionNonce": 1765666912,
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
			"updated": 1713973898184,
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
			"version": 1307,
			"versionNonce": 1176487328,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2528,
			"versionNonce": 14738528,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 700,
			"versionNonce": 626397600,
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
			"updated": 1713973898184,
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
			"version": 732,
			"versionNonce": 268785760,
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
			"updated": 1713973898184,
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
			"version": 801,
			"versionNonce": 1608703392,
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
			"updated": 1713973898184,
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
			"version": 818,
			"versionNonce": 712723552,
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
			"updated": 1713973898184,
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
			"version": 762,
			"versionNonce": 1190537632,
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
			"updated": 1713973898184,
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
			"version": 647,
			"versionNonce": 1779613792,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 659,
			"versionNonce": 96466336,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 650,
			"versionNonce": 781956192,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 651,
			"versionNonce": 1634746784,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 646,
			"versionNonce": 1575364704,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 645,
			"versionNonce": 2033651104,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 664,
			"versionNonce": 599923808,
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
			"updated": 1713973898184,
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
			"version": 650,
			"versionNonce": 105142688,
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
			"updated": 1713973898184,
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
			"version": 652,
			"versionNonce": 838832224,
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
			"updated": 1713973898184,
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
			"version": 663,
			"versionNonce": 466101664,
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
			"updated": 1713973898184,
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
			"version": 679,
			"versionNonce": 7242848,
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
			"updated": 1713973898184,
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
			"version": 2688,
			"versionNonce": 1727164832,
			"isDeleted": false,
			"id": "Tp8qd0wENffOXcGsiVRg3",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1135.7207134946414,
			"y": -1078.3515915439368,
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
			"boundElements": [],
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2053,
			"versionNonce": 215939168,
			"isDeleted": false,
			"id": "xP_oF6GZOFLAZQjnUOPHa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1171.8706953408805,
			"y": -1043.1638896946902,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2377,
			"versionNonce": 1861434784,
			"isDeleted": false,
			"id": "uPe86EMAH2Z1CGD7_w7FS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 1190.2556793904878,
			"y": -1013.2927121735207,
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
			"updated": 1713973898184,
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
			"version": 2391,
			"versionNonce": 455142496,
			"isDeleted": false,
			"id": "OkHt7xzozr-Obpyz9ibt1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 1221.0018022274476,
			"y": -1044.4382374789343,
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
			"updated": 1713973898184,
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
			"version": 2444,
			"versionNonce": 1425705376,
			"isDeleted": false,
			"id": "tAFqYIX5",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1154.3557413545122,
			"y": -964.6745773308605,
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
			"updated": 1713973898184,
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
			"version": 3095,
			"versionNonce": 1963221088,
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
			"updated": 1713973898184,
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
			"version": 1800,
			"versionNonce": 339236256,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2618,
			"versionNonce": 710497376,
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
			"updated": 1713973898184,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13138,
			"versionNonce": 1104978336,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2815,
			"versionNonce": 1357891680,
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
			"updated": 1713973898185,
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
			"version": 579,
			"versionNonce": 1293381024,
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
			"updated": 1713973898185,
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
			"version": 607,
			"versionNonce": 1150794848,
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
			"updated": 1713973898185,
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
			"version": 592,
			"versionNonce": 1058584992,
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
			"updated": 1713973898185,
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
			"version": 620,
			"versionNonce": 1730228320,
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
			"updated": 1713973898185,
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
			"version": 291,
			"versionNonce": 2064680352,
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
			"updated": 1713973898185,
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
			"version": 1715,
			"versionNonce": 1616651360,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1620,
			"versionNonce": 2116997536,
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
			"updated": 1713973898185,
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
			"version": 1161,
			"versionNonce": 1578670176,
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
			"updated": 1713973898185,
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
			"version": 1087,
			"versionNonce": 530816416,
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
			"updated": 1713973898185,
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
			"version": 1071,
			"versionNonce": 1411812448,
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
			"updated": 1713973898185,
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
			"version": 1056,
			"versionNonce": 1352591776,
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
			"updated": 1713973898185,
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
			"version": 1105,
			"versionNonce": 1012269152,
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
			"updated": 1713973898185,
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
			"version": 1065,
			"versionNonce": 1548793248,
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
			"updated": 1713973898185,
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
			"version": 1165,
			"versionNonce": 1450636384,
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
			"updated": 1713973898185,
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
			"version": 1063,
			"versionNonce": 669581728,
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
			"updated": 1713973898185,
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
			"version": 1035,
			"versionNonce": 1750689888,
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
			"updated": 1713973898185,
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
			"version": 1068,
			"versionNonce": 1922551200,
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
			"updated": 1713973898185,
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
			"version": 1051,
			"versionNonce": 2110610528,
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
			"updated": 1713973898185,
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
			"version": 1062,
			"versionNonce": 361568672,
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
			"updated": 1713973898185,
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
			"version": 1010,
			"versionNonce": 681758816,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1056,
			"versionNonce": 1140385184,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1091,
			"versionNonce": 1084867680,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1062,
			"versionNonce": 1259024800,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1049,
			"versionNonce": 598882400,
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
			"updated": 1713973898185,
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
			"version": 3005,
			"versionNonce": 1374944672,
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
			"updated": 1713973898185,
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
			"version": 3456,
			"versionNonce": 1972120672,
			"isDeleted": false,
			"id": "WF7Btrtq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1671.981309679504,
			"y": -914.5114471230496,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 179.7405242919922,
			"height": 39.449571285620905,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false,
			"fontSize": 32.87464273801742,
			"fontFamily": 1,
			"text": "Personalize",
			"rawText": "",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Personalize",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2285,
			"versionNonce": 434325920,
			"isDeleted": false,
			"id": "NFpxu9SH1L8Jl9rNr07W4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1708.7265864490882,
			"y": -1028.2683456726295,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 106.24997075282316,
			"height": 106.24997075282316,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 456,
			"versionNonce": 1611112544,
			"isDeleted": false,
			"id": "0SMhUdfdxdwpSiCpwVI26",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1734.1838950146785,
			"y": -1002.7326904832305,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 56.68208404105626,
			"height": 56.68208404105626,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 782,
			"versionNonce": 1040782752,
			"isDeleted": false,
			"id": "l-Vg3rlJDQMrzD9Onlo15",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1779.0318749004314,
			"y": -1013.9216495824562,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.72813719009165,
			"height": 43.318015446010506,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.503388454004107,
				"gap": 14.497025001854308
			},
			"endBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": 1.4950557318415354,
				"gap": 15.059658061092357
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
					10.138258934172686,
					5.529959418639528
				],
				[
					18.894028013685435,
					14.746558449705844
				],
				[
					24.423987432325127,
					25.806477286985338
				],
				[
					26.72813719009165,
					43.318015446010506
				]
			]
		},
		{
			"type": "arrow",
			"version": 875,
			"versionNonce": 1391760480,
			"isDeleted": false,
			"id": "DP-ZzG1Nds8-7fgO1iMVu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5318549836978397,
			"x": 1768.3774830453,
			"y": -967.414693121842,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.72813719009165,
			"height": 43.318015446010506,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5014921565015449,
				"gap": 14.504116045625693
			},
			"endBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": 1.478257871739441,
				"gap": 14.534447891051393
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
					10.138258934172686,
					5.529959418639528
				],
				[
					18.894028013685435,
					14.746558449705844
				],
				[
					24.423987432325127,
					25.806477286985338
				],
				[
					26.72813719009165,
					43.318015446010506
				]
			]
		},
		{
			"type": "arrow",
			"version": 896,
			"versionNonce": 1939169696,
			"isDeleted": false,
			"id": "eGg_COYDnmiZRa-aQBlWh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.659805918773737,
			"x": 1729.2622401326742,
			"y": -1025.9032283228426,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.72813719009165,
			"height": 43.318015446010506,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5334048395146214,
				"gap": 15.281189126010037
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
					10.138258934172686,
					5.529959418639528
				],
				[
					18.894028013685435,
					14.746558449705844
				],
				[
					24.423987432325127,
					25.806477286985338
				],
				[
					26.72813719009165,
					43.318015446010506
				]
			]
		},
		{
			"type": "arrow",
			"version": 839,
			"versionNonce": 1143146592,
			"isDeleted": false,
			"id": "4c0UdOsGSDVJIkiVGG7QB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.0860941483440776,
			"x": 1719.123981198502,
			"y": -976.5944235066393,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.72813719009165,
			"height": 43.318015446010506,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.520210567269741,
				"gap": 14.871966976945544
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
					10.138258934172686,
					5.529959418639528
				],
				[
					18.894028013685435,
					14.746558449705844
				],
				[
					24.423987432325127,
					25.806477286985338
				],
				[
					26.72813719009165,
					43.318015446010506
				]
			]
		},
		{
			"type": "line",
			"version": 545,
			"versionNonce": 1236807072,
			"isDeleted": false,
			"id": "5Ew1iFWE3m_9jAqrcwjaP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1748.1562681463597,
			"y": -962.76952496004,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 28.11062704475164,
			"height": 14.28572849815233,
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
			"updated": 1713973898185,
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
					25.806477286985064,
					0
				],
				[
					28.11062704475164,
					-5.990789370192604
				],
				[
					23.041497577665247,
					-11.059918837279493
				],
				[
					14.285728498152443,
					-14.28572849815233
				],
				[
					5.529959418639692,
					-11.98157874038608
				],
				[
					1.3824898546599367,
					-7.37327922485314
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 420,
			"versionNonce": 1868758112,
			"isDeleted": false,
			"id": "aR4g4skctQPFsWB2o5ZGy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1754.6078874681061,
			"y": -992.7603404572743,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.668218352812378,
			"height": 15.668218352812378,
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
			"updated": 1713973898185,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2695,
			"versionNonce": 1125216352,
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
				}
			],
			"updated": 1713973904613,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3164,
			"versionNonce": 377778272,
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
			"updated": 1713973898185,
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
			"version": 3215,
			"versionNonce": 1451312544,
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
			"updated": 1713973898185,
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
			"version": 3061,
			"versionNonce": 1096246368,
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
			"updated": 1713973898186,
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
			"version": 3009,
			"versionNonce": 763859360,
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
			"updated": 1713973898186,
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
			"version": 2734,
			"versionNonce": 2108414048,
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
			"updated": 1713973898186,
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
			"version": 2853,
			"versionNonce": 1709464992,
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
			"updated": 1713973898186,
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
			"version": 2992,
			"versionNonce": 525454432,
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
			"updated": 1713973898186,
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
			"version": 2677,
			"versionNonce": 281520544,
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
			"width": 200.20548178122584,
			"height": 35.99203374908673,
			"seed": 1345983584,
			"groupIds": [
				"wo4PjdjSijFwXP-1EPtsz"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
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
			"version": 2402,
			"versionNonce": 1654880,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2190,
			"versionNonce": 425817504,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2808,
			"versionNonce": 1070740576,
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
			"updated": 1713973898186,
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
			"version": 2200,
			"versionNonce": 81904032,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2886,
			"versionNonce": 72132704,
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
			"updated": 1713973898186,
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
			"version": 2649,
			"versionNonce": 846761376,
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
			"width": 169.69989013671875,
			"height": 39.27484742666209,
			"seed": 486214048,
			"groupIds": [
				"PDyRVKcJPqRRmb8nu7knq"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
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
			"version": 3045,
			"versionNonce": 962108512,
			"isDeleted": false,
			"id": "9Pd5rzpPJDa-MXqznlk6g",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1400.171449577121,
			"y": -1073.6179161836644,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 109.0632834676127,
			"height": 108.95884509135847,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1941,
			"versionNonce": 458611104,
			"isDeleted": false,
			"id": "0NJYSHqaC2RAqvm5uCdpS",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1411.9682037891741,
			"y": -1061.1282255148164,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 85.46977504350609,
			"height": 83.97946375366216,
			"seed": 1662664800,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1946,
			"versionNonce": 1355157600,
			"isDeleted": false,
			"id": "7gYyyhqNNwGmn9IB8RJSg",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1452.5224647124355,
			"y": -1048.6206209807333,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.965561040759582,
			"height": 14.965561040759582,
			"seed": 447951968,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1991,
			"versionNonce": 313107872,
			"isDeleted": false,
			"id": "Z05yc1CmDWcrCoU3qbnwG",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1464.432878568184,
			"y": -1010.8872545479687,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.965561040759582,
			"height": 14.965561040759582,
			"seed": 1527621728,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2023,
			"versionNonce": 40174688,
			"isDeleted": false,
			"id": "2yyL3k-zW1kCxs3oEW16_",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1429.0178459039307,
			"y": -1024.2710978149653,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.965561040759582,
			"height": 14.965561040759582,
			"seed": 268016736,
			"groupIds": [
				"egFrTeNukTBGALLvCCKRp",
				"V7xgbUDE0AohuIgtSqHSw",
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2010,
			"versionNonce": 94630304,
			"isDeleted": false,
			"id": "Zehr3znpkeUXZCvuNhXsf",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1466.9324100711838,
			"y": -1030.979159942287,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.164094328732747,
			"height": 14.97291120448208,
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
			"updated": 1713973898186,
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
					3.8987455214435522,
					7.2082124209600025
				],
				[
					6.164094328732747,
					14.97291120448208
				]
			]
		},
		{
			"type": "line",
			"version": 2051,
			"versionNonce": 201685088,
			"isDeleted": false,
			"id": "7n9dUfA1BQo_VZCAGBAY-",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.497787143782138,
			"x": 1451.6001305312657,
			"y": -1018.1537924416726,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.164094328732747,
			"height": 14.97291120448208,
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
			"updated": 1713973898186,
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
					3.8987455214435522,
					7.2082124209600025
				],
				[
					6.164094328732747,
					14.97291120448208
				]
			]
		},
		{
			"type": "line",
			"version": 2151,
			"versionNonce": 997506464,
			"isDeleted": false,
			"id": "UCRIko6dupAzYu1SCPFzJ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.33043282694363,
			"x": 1442.183184192566,
			"y": -1035.9378400460025,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.982714763016491,
			"height": 9.977153688078612,
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
			"updated": 1713973898186,
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
					2.5190385671287934,
					4.803170349311025
				],
				[
					3.982714763016491,
					9.977153688078612
				]
			]
		},
		{
			"type": "line",
			"version": 2163,
			"versionNonce": 1903651936,
			"isDeleted": false,
			"id": "7To_Op5D_zY55KzQo0hyo",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.2993692646569315,
			"x": 1432.8395551172855,
			"y": -1003.9686771158877,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.763058181222418,
			"height": 22.85740361531829,
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
			"updated": 1713973898186,
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
					5.54257154679429,
					11.003940275923952
				],
				[
					8.763058181222418,
					22.85740361531829
				]
			]
		},
		{
			"type": "line",
			"version": 2298,
			"versionNonce": 357304736,
			"isDeleted": false,
			"id": "RGuOJ2biAlAaTQIE9pPLW",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.938756218467832,
			"x": 1416.7816055676856,
			"y": -1022.5605825662003,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.982714763016491,
			"height": 9.977153688078612,
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
			"updated": 1713973898186,
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
					2.5190385671287934,
					4.803170349311025
				],
				[
					3.982714763016491,
					9.977153688078612
				]
			]
		},
		{
			"type": "line",
			"version": 2415,
			"versionNonce": 1015734368,
			"isDeleted": false,
			"id": "FkcV5XcPeREfgomSvfK2b",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.829160445235754,
			"x": 1482.424224523591,
			"y": -996.1243549881718,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.8633415977037182,
			"height": 5.767733110988331,
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
			"updated": 1713973898186,
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
					1.1785502170373772,
					2.776684165398847
				],
				[
					1.8633415977037182,
					5.767733110988331
				]
			]
		},
		{
			"type": "line",
			"version": 2587,
			"versionNonce": 1314510240,
			"isDeleted": false,
			"id": "V_JVLYSgI97Wk0VvSKKU5",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.49818137785806815,
			"x": 1471.5662160182428,
			"y": -991.5630204576732,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.927045650544227,
			"height": 9.561701145609224,
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
			"updated": 1713973898186,
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
					2.4838282521402175,
					4.603164476301452
				],
				[
					3.927045650544227,
					9.561701145609224
				]
			]
		},
		{
			"type": "line",
			"version": 2600,
			"versionNonce": 1024447584,
			"isDeleted": false,
			"id": "yCxmSxbX7OMals_Zv_gwa",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.809117217502431,
			"x": 1475.587460406335,
			"y": -1054.9295546894148,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.5939269461059875,
			"height": 13.374033227743203,
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
			"updated": 1713973898186,
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
					2.273133057067713,
					6.4384855499371785
				],
				[
					3.5939269461059875,
					13.374033227743203
				]
			]
		},
		{
			"type": "line",
			"version": 2555,
			"versionNonce": 1003364768,
			"isDeleted": false,
			"id": "9gEcJ3XCT-Usz55fwAdTl",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.014839308967369,
			"x": 1447.912234926841,
			"y": -1059.4565723900305,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.438547230691562,
			"height": 9.198836967079002,
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
			"updated": 1713973898186,
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
					3.4398421776224026,
					4.428475530171856
				],
				[
					5.438547230691562,
					9.198836967079002
				]
			]
		},
		{
			"type": "text",
			"version": 2445,
			"versionNonce": 1222002784,
			"isDeleted": false,
			"id": "E7rlBiYD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1366.9531153934279,
			"y": -957.7281710504101,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 175.49977111816406,
			"height": 40.60614350179794,
			"seed": 1429447776,
			"groupIds": [
				"-i8gwXjQMe0A60tD_RQ1C"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
			"link": null,
			"locked": false,
			"fontSize": 33.83845291816495,
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
			"version": 1612,
			"versionNonce": 215543200,
			"isDeleted": false,
			"id": "IyQv4DqK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1086.8460885724448,
			"y": -256.5819262046623,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 123.91993713378906,
			"height": 43.78800418134342,
			"seed": 1706417568,
			"groupIds": [
				"zqZZOw9bTbBPoS84IEC9p"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898186,
			"link": null,
			"locked": false,
			"fontSize": 36.49000348445285,
			"fontFamily": 1,
			"text": "Athena",
			"rawText": "",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Athena",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2763,
			"versionNonce": 2075016288,
			"isDeleted": false,
			"id": "LXfSYtGXQXqF06EabsIK7",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1090.986652722898,
			"y": -381.6425402766181,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1814,
			"versionNonce": 178928032,
			"isDeleted": false,
			"id": "XQPiqnVQxkpLZ6FqEaGlC",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1109.9417587742091,
			"y": -367.45816728507225,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1912,
			"versionNonce": 2003284064,
			"isDeleted": false,
			"id": "zN2jJ4YrFPS892QlEnuFC",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1119.1407958523155,
			"y": -358.22097275647457,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2001,
			"versionNonce": 1483867552,
			"isDeleted": false,
			"id": "BCLBnbETdqa_OMhavtpSE",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1157.838460717307,
			"y": -302.9525540441546,
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
			"updated": 1713973898186,
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
			"version": 2042,
			"versionNonce": 601007200,
			"isDeleted": false,
			"id": "Qn37QDbN60LKHCtV33wzu",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1130.538187255222,
			"y": -348.3884924498342,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2677,
			"versionNonce": 861950368,
			"isDeleted": false,
			"id": "84yR6LwDtAM2NjQtiM4IZ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1130.76810337825,
			"y": -344.61231867928143,
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
			"updated": 1713973898186,
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
			"version": 2059,
			"versionNonce": 1858017376,
			"isDeleted": false,
			"id": "t5fOUhhzBqPmnt7AViemD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1141.5408968115391,
			"y": -338.0199582385177,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2899,
			"versionNonce": 849681824,
			"isDeleted": false,
			"id": "pTlY2cSIYhzHywjbZlMgu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1142.2562087247745,
			"y": -338.46562920948196,
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
			"updated": 1713973898186,
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
			"version": 2432,
			"versionNonce": 1644959840,
			"isDeleted": false,
			"id": "dVNrB3hwj-8exkKKKlNkt",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1199.3053496643736,
			"y": -745.6228396318495,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 127.93798392159579,
			"height": 127.93798392159579,
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
			"updated": 1713973915804,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1704,
			"versionNonce": 124807584,
			"isDeleted": false,
			"id": "Faq2hZUTQptXNtgvzCgvM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1211.0684838094253,
			"y": -711.0752415226953,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 60.96513469406268,
			"height": 60.96513469406268,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1660,
			"versionNonce": 895254624,
			"isDeleted": false,
			"id": "gCEGTlE8Vr_XU4YJAiwg-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1287.901839591989,
			"y": -721.6635883203004,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.404568964245374,
			"height": 18.404568964245374,
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
			"updated": 1713973898186,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1653,
			"versionNonce": 1022506400,
			"isDeleted": false,
			"id": "R5mhmoIZPQG2HA9as1jEU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1288.137616347208,
			"y": -658.1621057504931,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.404568964245374,
			"height": 18.404568964245374,
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
			"updated": 1713973898187,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1706,
			"versionNonce": 1789752416,
			"isDeleted": false,
			"id": "60P4XlI6-IZwSgbOh1SEA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1297.3399008293256,
			"y": -692.6706725584493,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.404568964245374,
			"height": 18.404568964245374,
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
			"boundElements": [],
			"updated": 1713973898187,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1627,
			"versionNonce": 2019197344,
			"isDeleted": false,
			"id": "VxQsfHSfjltOr1Xm2gEmN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1273.183904063754,
			"y": -681.1678169557961,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 23.005711205306795,
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
			"updated": 1713973898187,
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
					23.005711205306795,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1651,
			"versionNonce": 834660448,
			"isDeleted": false,
			"id": "beBQoj7ZNREoAIHSVEAuX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.41450687458479507,
			"x": 1266.046413946946,
			"y": -657.0118201902253,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 23.005711205306795,
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
			"updated": 1713973898187,
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
					23.005711205306795,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1713,
			"versionNonce": 953765280,
			"isDeleted": false,
			"id": "MgLP3HR6-kmKe297P3kd3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.900439403044541,
			"x": 1266.0464139469468,
			"y": -705.0880369661506,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 23.005711205306795,
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
			"updated": 1713973898187,
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
					23.005711205306795,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 3195,
			"versionNonce": 1449385056,
			"isDeleted": false,
			"id": "2AUKEF9e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1222.9747906744503,
			"y": -608.1925140851964,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 78.63321015532459,
			"height": 47.179962088649226,
			"seed": 1514164320,
			"groupIds": [
				"AfLVVdTQUhQ_ToAF-a4q1"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1713973898187,
			"link": null,
			"locked": false,
			"fontSize": 39.31663507387435,
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
			"id": "3MUqtS6QkAqOzMDuQ0kqo",
			"type": "arrow",
			"x": 1095.3457701966,
			"y": -678.1011226597909,
			"width": 62,
			"height": 10,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 1644638304,
			"version": 40,
			"versionNonce": 396269984,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1713973898187,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					62,
					-10
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "U9sGOpfQr2euZBCFhLzoo",
				"focus": 0.4981260124804532,
				"gap": 8.707452663561867
			},
			"endBinding": null,
			"startArrowhead": "arrow",
			"endArrowhead": null
		},
		{
			"id": "S2fDN42hDIvS-SMRBcGG0",
			"type": "arrow",
			"x": 1083.3457701966,
			"y": -698.1011226597909,
			"width": 80,
			"height": 100,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 1185306016,
			"version": 132,
			"versionNonce": 608025696,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1713973890389,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					80,
					-100
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": null,
			"startArrowhead": "arrow",
			"endArrowhead": null
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
		"scrollX": -74.34577019659912,
		"scrollY": 1620.7886226597916,
		"zoom": {
			"value": 0.4999999999999996
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