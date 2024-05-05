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

Rekognition ^bIvBglDe

SageMaker ^8u5gPQKy

Personalize ^WF7Btrtq

Overall architecture to breakdown maybe go by microservice then or start as a general whole 
and explore different components on each story board like once microservice 
is defined copy arch then focus on database stuff and replication strategies
then traffic management architecture    ^88TIvi3e

Frontend ^Q1glw6i9

Web Application ^BqzQ3WmD

G ^JG9UxXB4

o ^dg1Cm4Y2

o ^alWwYoty

g ^WLvseRfk

l ^kreaL7bF

e ^Gw10f43p

Mobile ^g8ryoYQr

Lorem ipsum dolor sit amet, 
consectetur adipiscing elit,sed
 do eiusmod tempor incididunt
 ut labore et dolore magna
 aliqua. Ut enim ad miveniam,
 quis nostrud exercitaullamco 
laboris nisi ut aliquip ex ea 
ommodo consequat. Duis aute 
irure dolor in reprehenderit i ^G9psTynL

Lorem ipsum dolor s, 
consectetur adipng d
 do eiusmopor incididunt
ut labore et dolore magna
aliqua. Ut enim ad miveniam,
quis nostrud exercitaullamco 
laboris nisi ut aliquip ex ea 
ommodo consequat. Duis aute 
 ^JmFFze7b

Channel 
Service ^V0vR63R9

Content 
Analysis 
Service ^EgGLjjR8

Recommendation 
   Service ^qSNLwu2x

RDS ^uOQlIhve

Timestream ^IVZyLxaF

Neptune ^1pDBQAgf

Rekognition ^A4UfXbGs

SageMaker ^SVVIyLy3

Personalize ^uq24zpXV

CloudFront ^W2uzNyu3

Athena ^is5cc0TM

Talk What service is stateful vs stateless ^e2sMgHlP

Request Handled 

personalized recommendations

trending

related content 
 ^k9JopjXL

Response 

personalized recommendations with meta data

 ^7wr2qVdE

Main service connects 
to most microservices
so the rec service and 
other service outside of
this feature of focus  ^NWGNvREY

Userbase  ^Q0R5lWcO

Kids ^qjYBMRTj

Adults ^8PoHAsRh

CQRs read specific
service 



 ^VAqdI717

Docker ^CTwZr31H

GitHub ^RqUOW8uC

Github Actions ^aZqBmKVk

Frontend ^xxGFTN9X

Web Application ^FOB3b5rJ

G ^F7TaeFrb

o ^uiqH8ZfP

o ^vWsn1QF2

g ^AypVZqEZ

l ^1GbamHUI

e ^Omc5Fl1v

Mobile ^Of0QPOl3

Lorem ipsum dolor sit amet, 
consectetur adipiscing elit,sed
 do eiusmod tempor incididunt
 ut labore et dolore magna
 aliqua. Ut enim ad miveniam,
 quis nostrud exercitaullamco 
laboris nisi ut aliquip ex ea 
ommodo consequat. Duis aute 
irure dolor in reprehenderit i ^ljFj2PUV

Lorem ipsum dolor s, 
consectetur adipng d
 do eiusmopor incididunt
ut labore et dolore magna
aliqua. Ut enim ad miveniam,
quis nostrud exercitaullamco 
laboris nisi ut aliquip ex ea 
ommodo consequat. Duis aute 
 ^7RIEY13b

 Main 
Service ^4vYQ7kkP

Channel 
Service ^gNq7u2wW

Content 
Analysis 
Service ^j3d1NMMa

Recommendation 
   Service ^ylHFExAT

RDS ^8yqEqizz

Timestream ^O5WfknEj

Neptune ^LYWvhO94

EC2 ^20qFc3Hs

Rekognition ^FYezQhhE

SageMaker ^z56E4ib8

Personalize ^jtv9bwZa

API Gateway ^QX3BwP9h

S3 Bucket ^5m8AGmiQ

CloudFront ^gyPH09i5

Athena ^W9VV1TfA

ELB ^mKE0A1Xi

ElastiCache ^d5yomrzf

Replication Strategies ^VBfwcdmd

# Element Links
cfVAGpj7: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 1]]
TsXzxI5r: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 2]]
zrOOXy2q: [[Architecture/System Design/Questions/Designing YouTube Recommendation Engine.md#Table 3]]
D6RNpTN3: [[Integration of AI and Machine Learning Services#Amazon Rekognition]]

# Embedded files
0e77320ba2cdfffa54ed944064dc676677a1c426: [[Github Actions.png]]
d751345c2cc691e74f0ca6a58a00573821ffaf18: [[Pasted Image 20240504132918_569.jpg]]

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
			"version": 785,
			"versionNonce": 1429587355,
			"isDeleted": false,
			"id": "cfVAGpj7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -338.4113049629408,
			"y": -644.8918731283972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 352.5793983609069,
			"height": 500,
			"seed": 16317,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714843908910,
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
			"version": 680,
			"versionNonce": 725637691,
			"isDeleted": false,
			"id": "TsXzxI5r",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -723.9113049629401,
			"y": -869.2252064617302,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 309.3333333333335,
			"height": 213.66666666666643,
			"seed": 14525,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714843908910,
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
			"version": 655,
			"versionNonce": 1481595611,
			"isDeleted": false,
			"id": "zrOOXy2q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -276.28630496294033,
			"y": -1010.0611439617303,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 429.16666666666663,
			"height": 192.9166666666667,
			"seed": 3319,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714843908910,
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
			"version": 510,
			"versionNonce": 1492469627,
			"isDeleted": false,
			"id": "-PO2Zd6NDX76DEi7npcXu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -448.79672162960685,
			"y": -798.7479929200638,
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
			"updated": 1714843908910,
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
			"version": 744,
			"versionNonce": 1937023003,
			"isDeleted": false,
			"id": "_q6MHlXRfqRwgPr01jKBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -437.54672162960685,
			"y": -797.4979929200638,
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
			"updated": 1714843908910,
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
			"id": "Q0R5lWcO",
			"type": "text",
			"x": -1569.3547949821007,
			"y": -1033.2913239333936,
			"width": 411.870361328125,
			"height": 103.00000000000003,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"seed": 1804229845,
			"version": 93,
			"versionNonce": 566156987,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843945829,
			"link": null,
			"locked": false,
			"text": "Userbase ",
			"rawText": "Userbase ",
			"fontSize": 82.40000000000002,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Userbase ",
			"lineHeight": 1.25
		},
		{
			"type": "frame",
			"version": 295,
			"versionNonce": 527020914,
			"isDeleted": false,
			"id": "ESidNTlLbrCl4hZ0PJBBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1686.5619898086943,
			"y": -1118.6540598145957,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 2041.9255371093755,
			"height": 1222.1449538010822,
			"seed": 1362751418,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063512,
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
			"version": 884,
			"versionNonce": 1528894523,
			"isDeleted": false,
			"id": "O9LQf7NsQhIxvDW5x8X1b",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1624.363008492262,
			"y": -502.02949769966574,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 318.0218571563696,
			"height": 263.36834193121433,
			"seed": 1689820864,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GSlmI5e7jUq5iDmCQlUMJ",
				"focus": -0.26387416270576075,
				"gap": 2.8086638353517515
			},
			"endBinding": {
				"elementId": "xqvko52RSdMyp8oiurAyw",
				"focus": 0.1713041170531794,
				"gap": 3.7815741430065444
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
					261.4454240420009,
					32.70985336786134
				],
				[
					318.0218571563696,
					263.36834193121433
				]
			]
		},
		{
			"type": "arrow",
			"version": 682,
			"versionNonce": 844472565,
			"isDeleted": false,
			"id": "FIlZGvwXzh0nKp7thmKAd",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1888.226722577552,
			"y": -175.61724024263083,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 235.55555555555588,
			"height": 50.46959478038795,
			"seed": 1261770848,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "xqvko52RSdMyp8oiurAyw",
				"focus": 0.12071025053242097,
				"gap": 1.1192112517775286
			},
			"endBinding": {
				"elementId": "7ove5sN0njY_t7uGTc7Yu",
				"focus": 0.06348825345271954,
				"gap": 9.466308076128598
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
					-235.55555555555588,
					50.46959478038795
				]
			]
		},
		{
			"type": "arrow",
			"version": 889,
			"versionNonce": 578779,
			"isDeleted": false,
			"id": "ACDqpyxuesxKi_YA4tyJL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1342.7772539719253,
			"y": -821.8647307261282,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 67.98568215742239,
			"height": 220.3652751893477,
			"seed": 759341152,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "2IIbIsp3eopTrfWcuwVdP",
				"focus": 0.3106186661403512,
				"gap": 12.000018671218129
			},
			"endBinding": {
				"elementId": "NFpxu9SH1L8Jl9rNr07W4",
				"focus": 0.2792423478316705,
				"gap": 2.0871654588374895
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
			"type": "rectangle",
			"version": 500,
			"versionNonce": 20953685,
			"isDeleted": false,
			"id": "bzmt6bN9-N04WZy7twrr3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 477.9858014356744,
			"y": -868.0143424227699,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 464,
			"versionNonce": 2138014075,
			"isDeleted": false,
			"id": "uDjBIacQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 644.3822858106741,
			"y": -859.6247784954861,
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
			"updated": 1714917072292,
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
			"version": 1434,
			"versionNonce": 308258741,
			"isDeleted": false,
			"id": "SI2huACs",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 729.7774150414427,
			"y": -570.192339481609,
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
			"updated": 1714917072292,
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
			"version": 3352,
			"versionNonce": 43489819,
			"isDeleted": false,
			"id": "d9SJ5xa227orwk2L2uvDP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 723.5803076740547,
			"y": -696.8631638460561,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2594,
			"versionNonce": 1205528853,
			"isDeleted": false,
			"id": "BQrMUmXRGc6CME5fprUx-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 723.8707122025946,
			"y": -696.827636156756,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2756,
			"versionNonce": 1718853307,
			"isDeleted": false,
			"id": "_f0F8Dg0xZaKFqD2TzorU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 730.9018773445184,
			"y": -691.3070085063937,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2800,
			"versionNonce": 589758069,
			"isDeleted": false,
			"id": "AW7reduuVWOZBSTqYcmMT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 747.6439550881134,
			"y": -691.3070085063937,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2858,
			"versionNonce": 1168510811,
			"isDeleted": false,
			"id": "JE93ZeXCyzZoqXUNG_pOb",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 765.1213180923803,
			"y": -690.5717232456964,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1116,
			"versionNonce": 1527343061,
			"isDeleted": false,
			"id": "6en8MHq1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 779.8008051209224,
			"y": -659.5014062468958,
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
			"updated": 1714917072292,
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
			"version": 1068,
			"versionNonce": 1115778043,
			"isDeleted": false,
			"id": "RlRCehCJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 800.6197961791429,
			"y": -659.5014062468958,
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
			"updated": 1714917072292,
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
			"version": 1075,
			"versionNonce": 832021813,
			"isDeleted": false,
			"id": "EPK2gIuS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 817.0558417514219,
			"y": -659.5014062468958,
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
			"updated": 1714917072292,
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
			"version": 1082,
			"versionNonce": 285750427,
			"isDeleted": false,
			"id": "GK2aQ01e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 832.3961509522144,
			"y": -659.5014062468958,
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
			"updated": 1714917072292,
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
			"version": 1084,
			"versionNonce": 171390613,
			"isDeleted": false,
			"id": "XdMOo9iL",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 845.544987410037,
			"y": -659.5014062468958,
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
			"updated": 1714917072292,
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
			"version": 1071,
			"versionNonce": 1089268027,
			"isDeleted": false,
			"id": "izMdlSsx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 854.3108783819182,
			"y": -659.5014062468958,
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
			"updated": 1714917072292,
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
			"version": 1005,
			"versionNonce": 1067293685,
			"isDeleted": false,
			"id": "V4DlMY0fanGv1u-qBlBOq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 758.860065576984,
			"y": -625.1318087279756,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1041,
			"versionNonce": 1200753115,
			"isDeleted": false,
			"id": "sbjx-ckMAvGVQIgC2EKoa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 876.7856488459377,
			"y": -620.1888202077203,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1039,
			"versionNonce": 969954645,
			"isDeleted": false,
			"id": "Bnk1MF_hHq_dtb71Xa27Q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 884.4503620264734,
			"y": -613.5133077839937,
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
			"updated": 1714917072292,
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
			"version": 1430,
			"versionNonce": 1242175099,
			"isDeleted": false,
			"id": "yIBmoZ3b",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 532.1351129146675,
			"y": -557.1806075902541,
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
			"updated": 1714917072292,
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
			"version": 2375,
			"versionNonce": 1143268021,
			"isDeleted": false,
			"id": "qpTe1Z-V3NpdCTO7xDz0X",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 495.6167126490865,
			"y": -804.0125220571899,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2597,
			"versionNonce": 655855387,
			"isDeleted": false,
			"id": "hu77snj2V4i4fnSlCRO3Z",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 503.003305027126,
			"y": -795.4895391019359,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2612,
			"versionNonce": 591447061,
			"isDeleted": false,
			"id": "cLz2kk4ne3IyjrA0bdTMj",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 571.0894684478068,
			"y": -797.5858000375542,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2266,
			"versionNonce": 1093465019,
			"isDeleted": false,
			"id": "31PG5Q_RDjTUmZkACjC8k",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 509.6953425291855,
			"y": -779.1156563400887,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2295,
			"versionNonce": 1796831605,
			"isDeleted": false,
			"id": "EZ7wDQmJ16yQDf62RN-6a",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 518.3388114990859,
			"y": -706.8991799274859,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2344,
			"versionNonce": 141345883,
			"isDeleted": false,
			"id": "jCoZjDNUKoRQlX-CB_QXX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 590.0465403629265,
			"y": -640.0205915565448,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1291,
			"versionNonce": 351568597,
			"isDeleted": false,
			"id": "cxrY9Vlb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 571.4039927574378,
			"y": -710.0544255283935,
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
			"updated": 1714917072292,
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
			"version": 1334,
			"versionNonce": 1151959291,
			"isDeleted": false,
			"id": "ACbVHD62",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 512.5203604000004,
			"y": -662.5459967931338,
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
			"updated": 1714917072292,
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
			"version": 2397,
			"versionNonce": 1432838197,
			"isDeleted": false,
			"id": "vN-5qtvLW8SM1jxD_2qUG",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 510.920128922192,
			"y": -602.1987512370397,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 2347,
			"versionNonce": 526756251,
			"isDeleted": false,
			"id": "sKpUldSUe9aG6lFr-os91",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1655.146894881477,
			"y": -866.1816176966258,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 277.7273810361023,
			"height": 98.26629560508172,
			"seed": 1902022336,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
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
					-162.48510736885873,
					98.26629560508172
				],
				[
					-277.7273810361023,
					96.9446759526353
				]
			]
		},
		{
			"type": "arrow",
			"version": 2146,
			"versionNonce": 844599701,
			"isDeleted": false,
			"id": "T5LtQqsybOX_YbKMme4_4",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1311.7960343897464,
			"y": -781.4326396607711,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 178.32766752377063,
			"height": 148.368513056275,
			"seed": 1491541312,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 1588,
			"versionNonce": 1842593339,
			"isDeleted": false,
			"id": "3IVUe5tSxsqqkUZgeOqqV",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1554.6417148535554,
			"y": -546.1486619462158,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 173.64659400760388,
			"height": 193.43332681199524,
			"seed": 394368704,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 832,
			"versionNonce": 1492817653,
			"isDeleted": false,
			"id": "z1UyFGgijam0uIYgmWi4N",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1082.9757299641774,
			"y": -633.8200480696619,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 85033210,
			"groupIds": [
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "sKpUldSUe9aG6lFr-os91",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 776,
			"versionNonce": 987119323,
			"isDeleted": false,
			"id": "v4kt-ARfpU8zcZlSeSWdc",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1103.1040693981809,
			"y": -622.3181398216599,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 132862394,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 749,
			"versionNonce": 869658709,
			"isDeleted": false,
			"id": "DNLnuPc5vfs3UEnzU475h",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1110.292762053182,
			"y": -615.1294471666587,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1489832570,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 751,
			"versionNonce": 285191035,
			"isDeleted": false,
			"id": "lHEiQXruuMpy6DbkJicwT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1109.573892787682,
			"y": -602.9086696531565,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1048161082,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 760,
			"versionNonce": 1086266805,
			"isDeleted": false,
			"id": "Af6H46kDF1lTDMjpUz6Py",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1109.573892787682,
			"y": -588.531284343154,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 794047482,
			"groupIds": [
				"p4YneF8TK9VkjsgXibQEh",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 829,
			"versionNonce": 76710939,
			"isDeleted": false,
			"id": "GpoeAwXE5dIBs0lEQQ9MZ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1116.7625854426833,
			"y": -606.5030159806571,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1566549178,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 803,
			"versionNonce": 651927317,
			"isDeleted": false,
			"id": "LoXxNuAuIHesCBR90eobx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1123.9512780976845,
			"y": -599.3143233256559,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1111424378,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 805,
			"versionNonce": 2105624763,
			"isDeleted": false,
			"id": "ihF0DejI6D3YS3vFZxYxj",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1123.2324088321843,
			"y": -587.0935458121537,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 724909626,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 814,
			"versionNonce": 211874933,
			"isDeleted": false,
			"id": "RSl8HmQsQSbZTNHt-hF5v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1123.2324088321843,
			"y": -572.7161605021513,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1160079098,
			"groupIds": [
				"LxJ839wlTSjsWU1ZS7TV_",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 813,
			"versionNonce": 1097759067,
			"isDeleted": false,
			"id": "XhkuetTLlCQdNfmWTLb5q",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1132.577709283686,
			"y": -596.4388462636554,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 680687546,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 787,
			"versionNonce": 768908757,
			"isDeleted": false,
			"id": "nfpDZjuBSQiDUarex57Xz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1139.7664019386873,
			"y": -589.2501536086542,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1704947834,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 789,
			"versionNonce": 1034720763,
			"isDeleted": false,
			"id": "Rw-Xj8b22FJufKdd1r8he",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1139.047532673187,
			"y": -577.029376095152,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 269439290,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 798,
			"versionNonce": 831265589,
			"isDeleted": false,
			"id": "XyufN6m3Rlo5jiHEdWfWX",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1139.047532673187,
			"y": -562.6519907851495,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1262819834,
			"groupIds": [
				"zGQOOwYgSZxrUTURf6BMr",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 830,
			"versionNonce": 289283739,
			"isDeleted": false,
			"id": "OKFEXmSuyTR0BinTKjQVn",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1144.079617531688,
			"y": -583.4991994846531,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1447283386,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 804,
			"versionNonce": 1076685973,
			"isDeleted": false,
			"id": "g__0_au0EK5jFSGPp3BP1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1151.2683101866892,
			"y": -576.3105068296519,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 397304698,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 806,
			"versionNonce": 1456837435,
			"isDeleted": false,
			"id": "zcKyfZtuCg2YU4SM4xkMf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1150.5494409211892,
			"y": -564.0897293161497,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 700965946,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 815,
			"versionNonce": 1500287477,
			"isDeleted": false,
			"id": "x60jMgyreU2bGhTUnQy8r",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1150.5494409211892,
			"y": -549.7123440061472,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1718832378,
			"groupIds": [
				"QVLpSpvUPLL22XEARWqLF",
				"WytssOIPzPgluhGpWK-jJ",
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 736,
			"versionNonce": 785740763,
			"isDeleted": false,
			"id": "nm1VEi3v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1094.4776382121795,
			"y": -523.1141811826426,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 97.05978393554688,
			"height": 71.88692655001252,
			"seed": 1932762554,
			"groupIds": [
				"kgTvb0fQ_JKJpYMav6Y-l"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
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
			"version": 1348,
			"versionNonce": 1783663445,
			"isDeleted": false,
			"id": "epdVoUdP3yMf_i9s1SJp-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1649.8804918689389,
			"y": -888.3438575934714,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 579079488,
			"groupIds": [
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1292,
			"versionNonce": 156254331,
			"isDeleted": false,
			"id": "PAygpytLM6JGFWbXPrOFH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1670.0088313029423,
			"y": -876.8419493454694,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1098802880,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "sKpUldSUe9aG6lFr-os91",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1263,
			"versionNonce": 590239925,
			"isDeleted": false,
			"id": "EAgBQmk1SJfhQuwluGLFH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1677.1975239579435,
			"y": -869.6532566904682,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1762682176,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1265,
			"versionNonce": 805861659,
			"isDeleted": false,
			"id": "0YMrgsrWzJC4EPkQEqD_x",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1676.4786546924436,
			"y": -857.432479176966,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 981700288,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1274,
			"versionNonce": 229341717,
			"isDeleted": false,
			"id": "K6Md31cWOF6ggFEHts4ZM",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1676.4786546924436,
			"y": -843.0550938669635,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1280425280,
			"groupIds": [
				"uuTq-P8XJf1RoMX_sUuQx",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1345,
			"versionNonce": 275815867,
			"isDeleted": false,
			"id": "mZ0TSb-mZRjlN5Gmieac6",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1683.6673473474448,
			"y": -861.0268255044666,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 681817792,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1317,
			"versionNonce": 1656582005,
			"isDeleted": false,
			"id": "u_z-eoXx9d7ZZFXlOpm3U",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1690.856040002446,
			"y": -853.8381328494654,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1839732032,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1319,
			"versionNonce": 1168846427,
			"isDeleted": false,
			"id": "LZexxBZVBR-9z667zow9F",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1690.1371707369458,
			"y": -841.6173553359632,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 813620928,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1328,
			"versionNonce": 547993813,
			"isDeleted": false,
			"id": "GKkAjaH-grf_7Am5-9z89",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1690.1371707369458,
			"y": -827.2399700259608,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1114860864,
			"groupIds": [
				"A1HTQdiPQiECEW1Hdr4HQ",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1327,
			"versionNonce": 1653254907,
			"isDeleted": false,
			"id": "y13YhrqZ0Xyxpm7DW1Oyu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1699.4824711884476,
			"y": -850.9626557874649,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1656030912,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1301,
			"versionNonce": 1627772469,
			"isDeleted": false,
			"id": "SYo_SLglBBt6H4OyelR6p",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1706.6711638434488,
			"y": -843.7739631324637,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 336840000,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1303,
			"versionNonce": 2073138075,
			"isDeleted": false,
			"id": "pm46f3V_LG5RNY748NHPH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1705.9522945779486,
			"y": -831.5531856189615,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1004940992,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1312,
			"versionNonce": 1857505173,
			"isDeleted": false,
			"id": "e5AG6BZbv_Vbp7DsvDGVu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1705.9522945779486,
			"y": -817.175800308959,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2145983808,
			"groupIds": [
				"SYdWoYrsuh3NTSJgcY7Ga",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1346,
			"versionNonce": 1894934587,
			"isDeleted": false,
			"id": "MHOhOR6ILD__ZflgoyJ5I",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1710.9843794364494,
			"y": -838.0230090084626,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 615667392,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1318,
			"versionNonce": 468946165,
			"isDeleted": false,
			"id": "TyUDmPguiEaKdQxVf7_M_",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1718.1730720914506,
			"y": -830.8343163534614,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2001958208,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1320,
			"versionNonce": 2022680795,
			"isDeleted": false,
			"id": "mfPt6lYW38GdCuHGWaZTA",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1717.4542028259507,
			"y": -818.6135388399592,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1907982016,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1329,
			"versionNonce": 1480599125,
			"isDeleted": false,
			"id": "0_K7NhnUT2nIq9FEQrpu7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1717.4542028259507,
			"y": -804.2361535299567,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1068682560,
			"groupIds": [
				"IcoezSe097gUh1rw5jsdg",
				"T8hY1YNX43LQcS8uVvI2H",
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1277,
			"versionNonce": 1744557435,
			"isDeleted": false,
			"id": "fH3LGqwb",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1652.8109715455125,
			"y": -760.4951335635951,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 116.40850830078125,
			"height": 71.88692655001252,
			"seed": 1671145152,
			"groupIds": [
				"dsBtKXj6IiekF-lA8ZxRD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 1885,
			"versionNonce": 108172213,
			"isDeleted": false,
			"id": "GSlmI5e7jUq5iDmCQlUMJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1511.3090632975086,
			"y": -548.8200480696619,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 159268544,
			"groupIds": [
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "O9LQf7NsQhIxvDW5x8X1b",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1833,
			"versionNonce": 1048145435,
			"isDeleted": false,
			"id": "vaBljZs6Xsfg2ByxS2fMb",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1531.437402731512,
			"y": -537.3181398216599,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 60427584,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b"
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1805,
			"versionNonce": 313546005,
			"isDeleted": false,
			"id": "79AGDquzmuYvl4Li2CvyY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1538.6260953865133,
			"y": -530.1294471666587,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 617113280,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1806,
			"versionNonce": 1861939899,
			"isDeleted": false,
			"id": "5Q7b3FI_J5Us1ab3PEqwP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1537.9072261210133,
			"y": -517.9086696531565,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 929457472,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1815,
			"versionNonce": 1215228533,
			"isDeleted": false,
			"id": "00vwJHarQ1v7lvkq5Pica",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1537.9072261210133,
			"y": -503.53128434315397,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 613256896,
			"groupIds": [
				"XC5a9zhfxWlKHygZeAFfD",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1887,
			"versionNonce": 1780671323,
			"isDeleted": false,
			"id": "LaN2NEWO-A6l8ea1eHX60",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1545.0959187760145,
			"y": -521.5030159806571,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1609022784,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1858,
			"versionNonce": 1752421333,
			"isDeleted": false,
			"id": "te5OscxTPwn1gzzCNzQm_",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1552.2846114310157,
			"y": -514.3143233256559,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1097709248,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1860,
			"versionNonce": 1749270523,
			"isDeleted": false,
			"id": "WDYHhGju-RKxR4VTvY8N-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1551.5657421655155,
			"y": -502.0935458121537,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 511579456,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1869,
			"versionNonce": 2127860021,
			"isDeleted": false,
			"id": "sfr6Igy7giLmpoEKYMyRU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1551.5657421655155,
			"y": -487.7161605021513,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 537452224,
			"groupIds": [
				"gqV9si4qLViYuBLsTjqMq",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1868,
			"versionNonce": 1935673499,
			"isDeleted": false,
			"id": "o-kc2O5yCSZgx8qJj5_wG",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1560.9110426170173,
			"y": -511.43884626365536,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1753836864,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1842,
			"versionNonce": 2029429397,
			"isDeleted": false,
			"id": "-oOE2HFc9rmwoZfugKJ6v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1568.0997352720185,
			"y": -504.25015360865416,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1358890688,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1844,
			"versionNonce": 824851771,
			"isDeleted": false,
			"id": "PpirpOzl0g0oZKffELR0Q",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1567.3808660065183,
			"y": -492.029376095152,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 124372288,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1853,
			"versionNonce": 2073004021,
			"isDeleted": false,
			"id": "uOkZZ9TJh1o9Qngx3m6SL",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1567.3808660065183,
			"y": -477.65199078514945,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1357917888,
			"groupIds": [
				"ibl3nfwCc5Y3tGEp5PolS",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1885,
			"versionNonce": 1829035483,
			"isDeleted": false,
			"id": "s7v1DtoiIecHp2j_9YUIU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1572.4129508650192,
			"y": -498.4991994846531,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 410983744,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1859,
			"versionNonce": 2024063317,
			"isDeleted": false,
			"id": "G3TCeLodGaha6EZa8_h9Z",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1579.6016435200204,
			"y": -491.3105068296519,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 142366400,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1861,
			"versionNonce": 1644325499,
			"isDeleted": false,
			"id": "qOw-hzKA1GKxcXk4l-Xk1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1578.8827742545204,
			"y": -479.0897293161497,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 220820800,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1870,
			"versionNonce": 93048501,
			"isDeleted": false,
			"id": "BQM-M-LSpkCHOEyv3igdW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1578.8827742545204,
			"y": -464.7123440061472,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1279491776,
			"groupIds": [
				"jlV_qKk73ERnpg1KpmTL4",
				"o1L1wuXrceSVdSwjZ4V8b"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1850,
			"versionNonce": 1155883803,
			"isDeleted": false,
			"id": "goqrN6wV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1512.8109715455107,
			"y": -438.1141811826426,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 124.4010009765625,
			"height": 107.83038982501878,
			"seed": 717802816,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 1803,
			"versionNonce": 1894395925,
			"isDeleted": false,
			"id": "2IIbIsp3eopTrfWcuwVdP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1281.1681872684737,
			"y": -811.3092614854835,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 96.69309462915602,
			"height": 94.18158567774937,
			"seed": 118707520,
			"groupIds": [
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
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
				},
				{
					"id": "-WMaG9J0glrfmj1l6oTIk",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1752,
			"versionNonce": 236996539,
			"isDeleted": false,
			"id": "Vc-m_YZk8RA7Ni4Wg_l1Y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1298.7487499283202,
			"y": -801.2632256798569,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 209104192,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1725,
			"versionNonce": 414541173,
			"isDeleted": false,
			"id": "LJHIdDOwCgWwF1o2BUI5K",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1305.027522306837,
			"y": -794.9844533013403,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1001325888,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1724,
			"versionNonce": 64329819,
			"isDeleted": false,
			"id": "0jGSBLOoR8dm_27jU4rwB",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1304.3996450689851,
			"y": -784.310540257862,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 303848768,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1734,
			"versionNonce": 3337941,
			"isDeleted": false,
			"id": "_6j06czfMwVBinmMec1N2",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1304.3996450689851,
			"y": -771.7529955008288,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1629402432,
			"groupIds": [
				"oEmDoS4cmktU5FLrAstK0",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1803,
			"versionNonce": 64476411,
			"isDeleted": false,
			"id": "qqM5WUbIRO5NAPFTe8Mho",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1310.678417447502,
			"y": -787.4499264471203,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 1310068032,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "vlXMA3a79fMl66YyLo9yj",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1776,
			"versionNonce": 637029429,
			"isDeleted": false,
			"id": "dc9LtKCoz7BbkWxr9_Cvy",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1316.9571898260183,
			"y": -781.1711540686036,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1382180160,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1779,
			"versionNonce": 229211547,
			"isDeleted": false,
			"id": "TQWSiMBHBF8A6SW45dbYD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1316.3293125881669,
			"y": -770.4972410251254,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 996392256,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1787,
			"versionNonce": 434830741,
			"isDeleted": false,
			"id": "p06VNb8utGT11NTWPpQs3",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1316.3293125881669,
			"y": -757.9396962680922,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 712643904,
			"groupIds": [
				"wnGLlyd4XvVSv1b7L8mg2",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1787,
			"versionNonce": 209523259,
			"isDeleted": false,
			"id": "nt0tUhmDkHiC8N03EPhfs",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1324.4917166802384,
			"y": -778.6596451171971,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 352677184,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "T5LtQqsybOX_YbKMme4_4",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1760,
			"versionNonce": 1396736757,
			"isDeleted": false,
			"id": "7uamUervLGxKbl9MhU8xw",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1330.7704890587552,
			"y": -772.3808727386804,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1147520320,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1762,
			"versionNonce": 1630868187,
			"isDeleted": false,
			"id": "i1kLhgOavjeI1ftLKE036",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1330.1426118209033,
			"y": -761.7069596952022,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1442520384,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1771,
			"versionNonce": 1182686293,
			"isDeleted": false,
			"id": "UgV9c0Agj4k2AmZtpeqQJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1330.1426118209033,
			"y": -749.1494149381689,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 992310592,
			"groupIds": [
				"uVL_5NaUzQlES-55BEaWu",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1804,
			"versionNonce": 744750971,
			"isDeleted": false,
			"id": "4hq7vnIrn23EvX-smh02y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1334.537752485865,
			"y": -767.3578548358671,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 960810304,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1779,
			"versionNonce": 997853621,
			"isDeleted": false,
			"id": "n-ckNLwdKFypMUmFPTZW7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1340.8165248643818,
			"y": -761.0790824573505,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1773741376,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1779,
			"versionNonce": 1481398299,
			"isDeleted": false,
			"id": "dQqPM_0mOBGzfeYU5S_sm",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1340.18864762653,
			"y": -750.4051694138723,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 971144512,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1788,
			"versionNonce": 1666779925,
			"isDeleted": false,
			"id": "7GGbwkpjDghuz3wcCHAtN",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1340.18864762653,
			"y": -737.847624656839,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1797313856,
			"groupIds": [
				"yUIipkBZN6ySxGgq_EMpi",
				"67fpALgxVYduuCkmuC0iK",
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1792,
			"versionNonce": 1658887355,
			"isDeleted": false,
			"id": "a5fEmhU7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1249.3557405506563,
			"y": -710.430318603983,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 203.43548583984375,
			"height": 62.78772378516625,
			"seed": 315895104,
			"groupIds": [
				"-XkwePvVa1pUmeUTSLEfi"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "3IVUe5tSxsqqkUZgeOqqV",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
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
			"version": 3332,
			"versionNonce": 781246581,
			"isDeleted": false,
			"id": "bIvBglDe",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1855.014144988922,
			"y": -115.33195556569706,
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
			"updated": 1714917072292,
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
			"version": 2037,
			"versionNonce": 1740852571,
			"isDeleted": false,
			"id": "xqvko52RSdMyp8oiurAyw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1889.3459338293294,
			"y": -234.87958162544487,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2855,
			"versionNonce": 1659308501,
			"isDeleted": false,
			"id": "eC4Y7POSErE_lpxEftLlJ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1903.6764432715213,
			"y": -221.04367616710033,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13375,
			"versionNonce": 1783032315,
			"isDeleted": false,
			"id": "FDlqqWpaw2UYo-mOqbFbf",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1912.7129567377247,
			"y": -212.01598156031764,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3052,
			"versionNonce": 1903232821,
			"isDeleted": false,
			"id": "-c9Z_zNRFIgdYt-favDaS",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1955.8161013939143,
			"y": -162.1202437789757,
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
			"updated": 1714917072292,
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
			"version": 816,
			"versionNonce": 1601041051,
			"isDeleted": false,
			"id": "IRnPCbEjDBLI8hkX_ljwI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1926.6751583422226,
			"y": -192.62406880556296,
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
			"updated": 1714917072292,
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
			"version": 844,
			"versionNonce": 211048597,
			"isDeleted": false,
			"id": "FwKcU28VCjkrsUpnCstYW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1947.7782457500584,
			"y": -192.62406880556296,
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
			"updated": 1714917072292,
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
			"version": 829,
			"versionNonce": 2011883323,
			"isDeleted": false,
			"id": "d7e5zIe8oCEYqyjuB7Kx1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1941.6944728036553,
			"y": -177.2245185349791,
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
			"updated": 1714917072292,
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
			"version": 857,
			"versionNonce": 2114354677,
			"isDeleted": false,
			"id": "UfxN8OBEV2atAYv1yleHa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1932.7589312886257,
			"y": -177.2245185349791,
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
			"updated": 1714917072292,
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
			"version": 665,
			"versionNonce": 706758619,
			"isDeleted": false,
			"id": "D6RNpTN3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2043.8794965504626,
			"y": -237.27893902292374,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 531.4285714285712,
			"height": 266.13449478783315,
			"seed": 22163,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 2037,
			"versionNonce": 1020065621,
			"isDeleted": false,
			"id": "7ove5sN0njY_t7uGTc7Yu",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1534.943603311687,
			"y": -169.82512891956503,
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
			"boundElements": [
				{
					"id": "FIlZGvwXzh0nKp7thmKAd",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1941,
			"versionNonce": 2082509947,
			"isDeleted": false,
			"id": "BbCiDNQhqudYvtzkfUjCb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1564.5472806896978,
			"y": -140.74054043973715,
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
			"updated": 1714917072292,
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
			"version": 1482,
			"versionNonce": 1128088757,
			"isDeleted": false,
			"id": "a8v42OGWlhmabPivdxt5i",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1588.94445890423,
			"y": -144.63370717609675,
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
			"updated": 1714917072292,
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
			"version": 1408,
			"versionNonce": 229526811,
			"isDeleted": false,
			"id": "NtFJdd1h83_zUS8S-RJYk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1564.2877362406105,
			"y": -128.80149578155925,
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
			"updated": 1714917072292,
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
			"version": 1392,
			"versionNonce": 620553749,
			"isDeleted": false,
			"id": "DpFjVeptN3XqWlTGQEW6f",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1573.1122475096943,
			"y": -145.17875051918853,
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
			"updated": 1714917072292,
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
			"version": 1377,
			"versionNonce": 1648095675,
			"isDeleted": false,
			"id": "8Lf6VP3Xcmvr7rC75P5Q8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1572.0740697133303,
			"y": -123.87015124883652,
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
			"updated": 1714917072292,
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
			"version": 1426,
			"versionNonce": 1694587765,
			"isDeleted": false,
			"id": "2cr5qKz2dHk30hpj7CNba",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1571.814525264237,
			"y": -116.60290667429436,
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
			"updated": 1714917072292,
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
			"version": 1386,
			"versionNonce": 1793851995,
			"isDeleted": false,
			"id": "SFO1TNYcucrWxMe7f5lbh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1588.9444589042346,
			"y": -85.97666168157954,
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
			"updated": 1714917072292,
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
			"version": 1486,
			"versionNonce": 193995989,
			"isDeleted": false,
			"id": "ZK_v2bx1MdsA8rLY3IbHb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1578.8222253896945,
			"y": -102.84705087248017,
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
			"updated": 1714917072292,
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
			"version": 1384,
			"versionNonce": 1351679739,
			"isDeleted": false,
			"id": "-3d5HEfiiVlhASIrLW5vT",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1622.685237286034,
			"y": -106.99976205793286,
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
			"updated": 1714917072292,
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
			"version": 1356,
			"versionNonce": 2084487733,
			"isDeleted": false,
			"id": "q1FYn5rYwLigkCebeEJDt",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1589.2040033533244,
			"y": -96.12484964102984,
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
			"updated": 1714917072292,
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
			"version": 1389,
			"versionNonce": 2108516251,
			"isDeleted": false,
			"id": "Id6Aboedrzr6e9H6717HO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1573.6313364078744,
			"y": -84.93848388521639,
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
			"updated": 1714917072292,
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
			"version": 1372,
			"versionNonce": 200455061,
			"isDeleted": false,
			"id": "cmlNTB3a6yiHfX3wgcf9m",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1562.990013995154,
			"y": -102.84705087248017,
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
			"updated": 1714917072292,
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
			"version": 1383,
			"versionNonce": 1752415291,
			"isDeleted": false,
			"id": "NSU7U9l1uFhejTQj_ZQvx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1556.5014027678833,
			"y": -116.60290667429436,
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
			"updated": 1714917072292,
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
			"version": 1331,
			"versionNonce": 1457617141,
			"isDeleted": false,
			"id": "t7leV2Nh51Aga_mlZ2Bkp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1603.219403604229,
			"y": -137.10691815246457,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1377,
			"versionNonce": 482770139,
			"isDeleted": false,
			"id": "bEFqE3sLHBL_I1Obtqql2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1597.8987423978656,
			"y": -124.25946792247004,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1412,
			"versionNonce": 1452315221,
			"isDeleted": false,
			"id": "y-sosl5km5-oAjCUoGOJU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1608.280520361495,
			"y": -116.47313444974782,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1383,
			"versionNonce": 104343931,
			"isDeleted": false,
			"id": "HRDORwAe5nzB4MRrYtjzM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1597.146063495499,
			"y": -99.34320080975414,
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1370,
			"versionNonce": 936738741,
			"isDeleted": false,
			"id": "Upxf5j33j2PXc7umnzG3d",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1608.9293814842242,
			"y": -134.77101811064517,
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
			"updated": 1714917072292,
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
			"version": 3326,
			"versionNonce": 2047558171,
			"isDeleted": false,
			"id": "8u5gPQKy",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1501.741064749357,
			"y": -53.74628610997473,
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
			"updated": 1714917072292,
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
			"version": 3668,
			"versionNonce": 1893056789,
			"isDeleted": false,
			"id": "WF7Btrtq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1381.028928727123,
			"y": -999.6944243163161,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.40867614746094,
			"height": 27.743935377854452,
			"seed": 1470051744,
			"groupIds": [
				"M3HBEEDj1emdst7yMuw5Y"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [
				{
					"id": "4c0UdOsGSDVJIkiVGG7QB",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
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
			"version": 2497,
			"versionNonce": 20072123,
			"isDeleted": false,
			"id": "NFpxu9SH1L8Jl9rNr07W4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1406.8709987652405,
			"y": -1079.696917101201,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 74.72305088242369,
			"height": 74.72305088242369,
			"seed": 895975840,
			"groupIds": [
				"07Bxr6q51a__A40FTdEgm",
				"Y8Qv-9hw2hEIckr13XQan",
				"2Pop0Qvd6d-lFdD4PBZH5",
				"YkMtsrYHUSavjoi0lqSTD"
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 668,
			"versionNonce": 386324085,
			"isDeleted": false,
			"id": "0SMhUdfdxdwpSiCpwVI26",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1424.774512053743,
			"y": -1061.7383045151096,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 39.86314744288174,
			"height": 39.86314744288174,
			"seed": 1279675808,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
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
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1218,
			"versionNonce": 1649391451,
			"isDeleted": false,
			"id": "l-Vg3rlJDQMrzD9Onlo15",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1456.3150184579574,
			"y": -1069.6072305408666,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 896244128,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 1311,
			"versionNonce": 1965965269,
			"isDeleted": false,
			"id": "DP-ZzG1Nds8-7fgO1iMVu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5318549836978397,
			"x": 1448.8220407275037,
			"y": -1036.9000057823996,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1678206368,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5014921565015418,
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
			"version": 1333,
			"versionNonce": 1807094779,
			"isDeleted": false,
			"id": "eGg_COYDnmiZRa-aQBlWh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.659805918773737,
			"x": 1421.3132304593291,
			"y": -1078.033586910907,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1699328416,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 1276,
			"versionNonce": 1633778997,
			"isDeleted": false,
			"id": "4c0UdOsGSDVJIkiVGG7QB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.0860941483440776,
			"x": 1414.1832366077572,
			"y": -1043.355889541896,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 543325600,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0SMhUdfdxdwpSiCpwVI26",
				"focus": -1.5202105672697341,
				"gap": 10.459096950955939
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
			"version": 757,
			"versionNonce": 2103958683,
			"isDeleted": false,
			"id": "5Ew1iFWE3m_9jAqrcwjaP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1434.600946273623,
			"y": -1033.6331706533883,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 19.769528406632524,
			"height": 10.046809518124626,
			"seed": 377604512,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917072292,
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
			"version": 632,
			"versionNonce": 1392905877,
			"isDeleted": false,
			"id": "aR4g4skctQPFsWB2o5ZGy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1439.1382150882603,
			"y": -1054.724990411331,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.019081406975497,
			"height": 11.019081406975497,
			"seed": 584553888,
			"groupIds": [
				"wzue1zcR5foVqeC_PMDBz",
				"YkMtsrYHUSavjoi0lqSTD"
			],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917072292,
			"link": null,
			"locked": false
		},
		{
			"id": "k9JopjXL",
			"type": "text",
			"x": 993.4356743524868,
			"y": -1052.7199884061768,
			"width": 285.35968017578125,
			"height": 200,
			"angle": 0,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 2057456981,
			"version": 177,
			"versionNonce": 1394053435,
			"isDeleted": false,
			"boundElements": [
				{
					"id": "vlXMA3a79fMl66YyLo9yj",
					"type": "arrow"
				}
			],
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"text": "Request Handled \n\npersonalized recommendations\n\ntrending\n\nrelated content \n",
			"rawText": "Request Handled \n\npersonalized recommendations\n\ntrending\n\nrelated content \n",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Request Handled \n\npersonalized recommendations\n\ntrending\n\nrelated content \n",
			"lineHeight": 1.25
		},
		{
			"id": "7wr2qVdE",
			"type": "text",
			"x": 1566.9650861171926,
			"y": -1087.425870759118,
			"width": 450.699462890625,
			"height": 125,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 1959230869,
			"version": 319,
			"versionNonce": 953250805,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"text": "Response \n\npersonalized recommendations with meta data\n\n",
			"rawText": "Response \n\npersonalized recommendations with meta data\n\n",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Response \n\npersonalized recommendations with meta data\n\n",
			"lineHeight": 1.25
		},
		{
			"id": "e2sMgHlP",
			"type": "text",
			"x": 515.5651266960997,
			"y": -1345.9365581197194,
			"width": 1995.9612394125943,
			"height": 114.34763003559831,
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
			"seed": 1174957653,
			"version": 544,
			"versionNonce": 1360256123,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917086956,
			"link": null,
			"locked": false,
			"text": "Talk What service is stateful vs stateless",
			"rawText": "Talk What service is stateful vs stateless",
			"fontSize": 91.4781040284787,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Talk What service is stateful vs stateless",
			"lineHeight": 1.25
		},
		{
			"id": "vlXMA3a79fMl66YyLo9yj",
			"type": "arrow",
			"x": 1224.0239096466046,
			"y": -840.9552825238238,
			"width": 72.94117647058806,
			"height": 42.352941176470495,
			"angle": 0,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 348209051,
			"version": 50,
			"versionNonce": 248065365,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					72.94117647058806,
					42.352941176470495
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "k9JopjXL",
				"focus": 0.33208821865862187,
				"gap": 11.764705882352928
			},
			"endBinding": {
				"elementId": "qqM5WUbIRO5NAPFTe8Mho",
				"focus": 0.6658020699143613,
				"gap": 13.713331330309302
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "-WMaG9J0glrfmj1l6oTIk",
			"type": "arrow",
			"x": 1370.607242979938,
			"y": -809.058223700294,
			"width": 202.66666666666674,
			"height": 169.33333333333337,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 594700251,
			"version": 83,
			"versionNonce": 2141896315,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					202.66666666666674,
					-169.33333333333337
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "2IIbIsp3eopTrfWcuwVdP",
				"focus": -0.1693333882598148,
				"gap": 13.165759809616453
			},
			"endBinding": null,
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "NWGNvREY",
			"type": "text",
			"x": 1218.6452050179,
			"y": -520.2913239333944,
			"width": 240.1197052001953,
			"height": 125,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 2099590069,
			"version": 176,
			"versionNonce": 876788405,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"text": "Main service connects \nto most microservices\nso the rec service and \nother service outside of\nthis feature of focus ",
			"rawText": "Main service connects \nto most microservices\nso the rec service and \nother service outside of\nthis feature of focus ",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Main service connects \nto most microservices\nso the rec service and \nother service outside of\nthis feature of focus ",
			"lineHeight": 1.25
		},
		{
			"id": "VAqdI717",
			"type": "text",
			"x": 1679.677311170049,
			"y": -608.8436237975142,
			"width": 310.76806640625,
			"height": 250.93336088372,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 902081973,
			"version": 339,
			"versionNonce": 845362971,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"text": "CQRs read specific\nservice \n\n\n\n",
			"rawText": "CQRs read specific\nservice \n\n\n\n",
			"fontSize": 33.45778145116267,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "CQRs read specific\nservice \n\n\n\n",
			"lineHeight": 1.25
		},
		{
			"type": "frame",
			"version": 804,
			"versionNonce": 1199900699,
			"isDeleted": false,
			"id": "vjQ13QAGqqwZLC97MoanI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 458.6366950513684,
			"y": -1427.6075136959255,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 2146.188263721955,
			"height": 1524.3572506257635,
			"seed": 1224266406,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714917072189,
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
			"type": "arrow",
			"version": 669,
			"versionNonce": 1313009147,
			"isDeleted": false,
			"id": "jyBPmKT2KA6fl9aZTenhn",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -387.02727432683696,
			"y": 1011.1096301115334,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 237.99163633207854,
			"height": 55.72484815753057,
			"seed": 2131051698,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466826,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "YR0Txf-XdlSTltwlBrIQ8",
				"focus": -1.1487644411784912,
				"gap": 7.865599552686302
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
			"version": 611,
			"versionNonce": 959064149,
			"isDeleted": false,
			"id": "XiFOhlWOtit7uaGevF7cY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -392.73427431522543,
			"y": 707.2918149622988,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 146.28463634369007,
			"height": 7.907033008295912,
			"seed": 1382291310,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "P8h_vIWmRzdpAe2tSSZ3f",
				"focus": -1.3337261718329019,
				"gap": 6.626538266233727
			},
			"endBinding": {
				"elementId": "nx86Bc1GlV_tMbyAxJz3B",
				"focus": -0.5459276814084717,
				"gap": 14.68606949938038
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
					-30.284636343690067,
					-3.9070330082959117
				],
				[
					-146.28463634369007,
					-7.907033008295912
				]
			]
		},
		{
			"type": "arrow",
			"version": 809,
			"versionNonce": 86370907,
			"isDeleted": false,
			"id": "Fpg41cP9ZXjmu0KQH0xkc",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -409.21617116525226,
			"y": 468.67958589572834,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 143.88306969949303,
			"height": 176.5151853219486,
			"seed": 119398002,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "cbMBB4NEcwEaqVZMokb60",
				"focus": 0.34254680487200073,
				"gap": 1.459579467773409
			},
			"endBinding": {
				"elementId": "_ivFATriFZ0ejPM0jWE9Y",
				"focus": 0.05302507368985622,
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
					-55.80273949366324,
					28.70519605827451
				],
				[
					-143.88306969949303,
					176.5151853219486
				]
			]
		},
		{
			"type": "arrow",
			"version": 575,
			"versionNonce": 1604833563,
			"isDeleted": false,
			"id": "dB3HcAjuGIwb0F_qDolQf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -721.9107632723449,
			"y": 957.8680089432843,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 129.98314738657064,
			"height": 231.6174193220944,
			"seed": 1762326958,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466829,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GneXi6osnZvxo_XJcnmL0",
				"focus": -0.1971167450966268,
				"gap": 12.788679953535791
			},
			"endBinding": {
				"elementId": "l5JwcInVEYNLdoVT_NODw",
				"focus": 0.17863776279914872,
				"gap": 6.961068180697907
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
			"type": "arrow",
			"version": 426,
			"versionNonce": 1113912763,
			"isDeleted": false,
			"id": "0ju_1XAjWr8Pad7EyC84U",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -843.7613349013404,
			"y": 1254.1054117609367,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 155.55555555555566,
			"height": 17.77777777777783,
			"seed": 1159435246,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466829,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "l5JwcInVEYNLdoVT_NODw",
				"focus": -0.13538172405428472,
				"gap": 1.1192112517775854
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
			"version": 750,
			"versionNonce": 893977339,
			"isDeleted": false,
			"id": "0lQfAWR4DScNi0fQQT_y6",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -897.7822320783957,
			"y": 620.8899187739647,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 67.98568215742239,
			"height": 220.3652751893477,
			"seed": 1527409138,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466830,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "kKaVTXdVNbY2wqBO8Porv",
				"focus": 0.3106186661403559,
				"gap": 12.000018671218172
			},
			"endBinding": {
				"elementId": "lluP5brliY-iDI86q0qP0",
				"focus": 0.2792423478316705,
				"gap": 2.0871654588374895
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
			"version": 468,
			"versionNonce": 348449691,
			"isDeleted": false,
			"id": "f29lxlS7odwqKbKjk7rRN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -591.6660968061019,
			"y": 357.56275303077837,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 46.66666666666674,
			"height": 294.9999999999999,
			"seed": 164387762,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466831,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "R87L366hFg_NGk1e01O--",
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
			"version": 598,
			"versionNonce": 785187035,
			"isDeleted": false,
			"id": "jBiUvkVqpoavp-ev4b2wA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1025.0338758697844,
			"y": 424.45231311276393,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 110.03444573034926,
			"height": 209.77710658468084,
			"seed": 209580142,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466831,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "nVuTuOFj8CcudbOYrwaOi",
				"focus": -0.5597483473665993,
				"gap": 16.807653190493916
			},
			"endBinding": {
				"elementId": "JUH30NkHefLG0bds8BAZP",
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
			"type": "rectangle",
			"version": 597,
			"versionNonce": 1909482734,
			"isDeleted": false,
			"id": "JCkXWkaed2HjyxvXX1w-Q",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1704.5856271357536,
			"y": 437.98565757722986,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 466.82823768028857,
			"height": 446.6046142578127,
			"seed": 1666395374,
			"groupIds": [
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 561,
			"versionNonce": 495397106,
			"isDeleted": false,
			"id": "Q1glw6i9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1538.1891427607538,
			"y": 446.37522150451366,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 162.16014099121094,
			"height": 48.59421950120189,
			"seed": 276095218,
			"groupIds": [
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
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
			"version": 1531,
			"versionNonce": 1083283246,
			"isDeleted": false,
			"id": "BqzQ3WmD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1452.7940135299852,
			"y": 735.8076605183908,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 196.07342529296875,
			"height": 35.79861612413039,
			"seed": 108748590,
			"groupIds": [
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
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
			"version": 3449,
			"versionNonce": 223119995,
			"isDeleted": false,
			"id": "Rk518Hz-_vELLbEIyXQK1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1458.9911208973733,
			"y": 609.1368361539437,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 208.62366608186124,
			"height": 124.85891208837496,
			"seed": 953152178,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917434082,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2691,
			"versionNonce": 2096267630,
			"isDeleted": false,
			"id": "Aegqm3a3nM9k3jGlgM_8V",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1458.7007163688334,
			"y": 609.1723638432438,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 207.2467928616144,
			"height": 20.33987091745275,
			"seed": 1919109486,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2853,
			"versionNonce": 1652757618,
			"isDeleted": false,
			"id": "jeomxPJUwF-zvBN-cQEox",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1451.6695512269096,
			"y": 614.6929914936061,
			"strokeColor": "#000000",
			"backgroundColor": "#fa5252",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 1331874930,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2897,
			"versionNonce": 1245455278,
			"isDeleted": false,
			"id": "FKbRaXJlyUm75zxmCt36G",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1434.9274734833145,
			"y": 614.6929914936061,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 1716775854,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2955,
			"versionNonce": 566998578,
			"isDeleted": false,
			"id": "UHFIqiH0U4U1zSU6Be6dL",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1417.4501104790477,
			"y": 615.4282767543034,
			"strokeColor": "#000000",
			"backgroundColor": "#40c057",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 1240755762,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1213,
			"versionNonce": 2056748526,
			"isDeleted": false,
			"id": "JG9UxXB4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1402.7706234505056,
			"y": 646.4985937531039,
			"strokeColor": "#228be6",
			"backgroundColor": "#ffffff",
			"width": 17.283935546875,
			"height": 28.48914565861645,
			"seed": 1349928430,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1165,
			"versionNonce": 991567858,
			"isDeleted": false,
			"id": "dg1Cm4Y2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1381.951632392285,
			"y": 646.4985937531039,
			"strokeColor": "#d9480f",
			"backgroundColor": "#ffffff",
			"width": 12.136001586914062,
			"height": 28.48914565861645,
			"seed": 1298913266,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1172,
			"versionNonce": 856526894,
			"isDeleted": false,
			"id": "alWwYoty",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1365.515586820006,
			"y": 646.4985937531039,
			"strokeColor": "#fab005",
			"backgroundColor": "#ffffff",
			"width": 12.136001586914062,
			"height": 28.48914565861645,
			"seed": 1909676078,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1179,
			"versionNonce": 2054508978,
			"isDeleted": false,
			"id": "WLvseRfk",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1350.1752776192136,
			"y": 646.4985937531039,
			"strokeColor": "#228be6",
			"backgroundColor": "#ffffff",
			"width": 10.9749755859375,
			"height": 28.489145658616444,
			"seed": 1238370738,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1181,
			"versionNonce": 260528750,
			"isDeleted": false,
			"id": "kreaL7bF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1337.026441161391,
			"y": 646.4985937531039,
			"strokeColor": "#5c940d",
			"backgroundColor": "#ffffff",
			"width": 5.7613067626953125,
			"height": 28.489145658616444,
			"seed": 39068270,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1168,
			"versionNonce": 319048562,
			"isDeleted": false,
			"id": "Gw10f43p",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1328.2605501895098,
			"y": 646.4985937531039,
			"strokeColor": "#d9480f",
			"backgroundColor": "#ffffff",
			"width": 11.982650756835938,
			"height": 28.48914565861645,
			"seed": 373818226,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1102,
			"versionNonce": 1187896494,
			"isDeleted": false,
			"id": "J9IBZU6hKQk-8Go1HvyPS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1423.711362994444,
			"y": 680.8681912720242,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 134.16683126408196,
			"height": 19.771954081022606,
			"seed": 1421976750,
			"groupIds": [
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1138,
			"versionNonce": 990776626,
			"isDeleted": false,
			"id": "XlOOtfbiZrjAv4XhZ5Flj",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1305.7857797254903,
			"y": 685.8111797922795,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.835099044411467,
			"height": 6.735436020634421,
			"seed": 219858226,
			"groupIds": [
				"CLGkCXqS_A3IcrqRXjZRi",
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1136,
			"versionNonce": 1317672686,
			"isDeleted": false,
			"id": "C9JKebYzonUMl_8dVk7yf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": -1298.1210665449546,
			"y": 692.4866922160061,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.9862784611917985,
			"height": 5.085941484968847,
			"seed": 2059722478,
			"groupIds": [
				"CLGkCXqS_A3IcrqRXjZRi",
				"lLjjTMH-bUrmP9jj4Muz6",
				"FACRJt2z5itWn5jJ3IkI2",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1527,
			"versionNonce": 1207539442,
			"isDeleted": false,
			"id": "g8ryoYQr",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1650.4363156567606,
			"y": 748.8193924097457,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 85.75489807128906,
			"height": 38.34606664685638,
			"seed": 665800434,
			"groupIds": [
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 2472,
			"versionNonce": 2135230766,
			"isDeleted": false,
			"id": "hSzTslcFB4okUmWQpcPQw",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1686.9547159223416,
			"y": 501.98747794280985,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 158.88799360370288,
			"height": 242.99796412645367,
			"seed": 1759957294,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2694,
			"versionNonce": 1246619826,
			"isDeleted": false,
			"id": "1Lo-OuPKqj9pMd3USpP5q",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1679.5681235443021,
			"y": 510.5104608980639,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 142.48575746374448,
			"height": 226.6954840610708,
			"seed": 445423794,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2709,
			"versionNonce": 946320238,
			"isDeleted": false,
			"id": "z4pnmpn87zW8qYJEeOT-R",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1611.4819601236213,
			"y": 508.41419996244554,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 9.8015549628143,
			"height": 9.8015549628143,
			"seed": 445676398,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2363,
			"versionNonce": 699531890,
			"isDeleted": false,
			"id": "kIUhHi8mAlgT5TTuWuRWo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1672.8760860422426,
			"y": 526.8843436599111,
			"strokeColor": "#000000",
			"backgroundColor": "#15aabf",
			"width": 128.02124883833554,
			"height": 59.75125078684551,
			"seed": 1901705842,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2392,
			"versionNonce": 70981038,
			"isDeleted": false,
			"id": "pxEiHhZbyLU3cnWlb71zx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1664.2326170723422,
			"y": 599.1008200725139,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 44.82786000305885,
			"height": 34.901277498386165,
			"seed": 906681774,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2441,
			"versionNonce": 1089266738,
			"isDeleted": false,
			"id": "BHnKuoNn4CINsoMGjEvsD",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1592.5248882085016,
			"y": 665.979408443455,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 40.50612551810942,
			"height": 29.499109392199383,
			"seed": 719166514,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1388,
			"versionNonce": 1005072366,
			"isDeleted": false,
			"id": "G9psTynL",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1611.1674358139903,
			"y": 595.9455744716063,
			"strokeColor": "#495057",
			"backgroundColor": "transparent",
			"width": 71.6641845703125,
			"height": 58.3434155468175,
			"seed": 813627374,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 1431,
			"versionNonce": 2045087218,
			"isDeleted": false,
			"id": "JmFFze7b",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": -1670.0510681714277,
			"y": 643.454003206866,
			"strokeColor": "#495057",
			"backgroundColor": "transparent",
			"width": 71.6641845703125,
			"height": 58.3434155468175,
			"seed": 1426015730,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714834063526,
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
			"version": 2494,
			"versionNonce": 729285166,
			"isDeleted": false,
			"id": "zsHkow5L3YlTSZSdhczvS",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1671.651299649236,
			"y": 703.8012487629601,
			"strokeColor": "#000000",
			"backgroundColor": "#15aabf",
			"width": 128.02124883833554,
			"height": 20.571573995492262,
			"seed": 1911933486,
			"groupIds": [
				"QMKuAGPBkWmbHPVrZbPbq",
				"i7IWZ12_7KPgPcVQmQheD",
				"snsl2hxwoaq00fuGJ-S32"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 1
			},
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 2291,
			"versionNonce": 483274107,
			"isDeleted": false,
			"id": "cs3EH4r4Sz6UbamjHV3eZ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -633.9840197402725,
			"y": 653.0230870998727,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 229.15595246467387,
			"height": 21.81624030867613,
			"seed": 684046258,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466832,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "HKZRyY6lsRRtBe4KkF4fc",
				"focus": 0.9474665456192557,
				"gap": 14.86193642146526
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
			"version": 1449,
			"versionNonce": 1428822011,
			"isDeleted": false,
			"id": "8M7rNkXcTGu5JRDORCze1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -685.9177711967657,
			"y": 896.6059875538771,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 173.64659400760388,
			"height": 193.43332681199524,
			"seed": 643297650,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466834,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GneXi6osnZvxo_XJcnmL0",
				"focus": 1.0556238155401163,
				"gap": 8.830522124555955
			},
			"endBinding": {
				"elementId": "kKaVTXdVNbY2wqBO8Porv",
				"focus": 0.32153799547805717,
				"gap": 8.965207504809854
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
			"version": 1411,
			"versionNonce": 1676409013,
			"isDeleted": false,
			"id": "_ivFATriFZ0ejPM0jWE9Y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -639.2504227528107,
			"y": 637.2679347637644,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 1152533230,
			"groupIds": [
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "Fpg41cP9ZXjmu0KQH0xkc",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1356,
			"versionNonce": 143855477,
			"isDeleted": false,
			"id": "HKZRyY6lsRRtBe4KkF4fc",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -619.1220833188072,
			"y": 648.7698430117664,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1220160242,
			"groupIds": [
				"U6xiRcaZfD2ZOp8fFkEZ3",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "cs3EH4r4Sz6UbamjHV3eZ",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1326,
			"versionNonce": 99841589,
			"isDeleted": false,
			"id": "zfsGuUDo14F8dD3Y_tYcn",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -611.933390663806,
			"y": 655.9585356667676,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1468511534,
			"groupIds": [
				"U6xiRcaZfD2ZOp8fFkEZ3",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1328,
			"versionNonce": 1693509525,
			"isDeleted": false,
			"id": "K08lGkKesnQ4HqKuhRs88",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -612.652259929306,
			"y": 668.1793131802698,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 232520882,
			"groupIds": [
				"U6xiRcaZfD2ZOp8fFkEZ3",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1337,
			"versionNonce": 1509502197,
			"isDeleted": false,
			"id": "jLu3ad85AO2D79-TIopbP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -612.652259929306,
			"y": 682.5566984902723,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1265950574,
			"groupIds": [
				"U6xiRcaZfD2ZOp8fFkEZ3",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1408,
			"versionNonce": 76662357,
			"isDeleted": false,
			"id": "R87L366hFg_NGk1e01O--",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -605.4635672743048,
			"y": 664.5849668527692,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 2052953714,
			"groupIds": [
				"gJe3qv3PNpZJ42w4yZkG1",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "f29lxlS7odwqKbKjk7rRN",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1380,
			"versionNonce": 1327101205,
			"isDeleted": false,
			"id": "Aoa1Nat093BROYAuMIvKX",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -598.2748746193035,
			"y": 671.7736595077704,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 348307886,
			"groupIds": [
				"gJe3qv3PNpZJ42w4yZkG1",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1382,
			"versionNonce": 111446645,
			"isDeleted": false,
			"id": "XAg6KyLY1DwqeQwOD6RHm",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -598.9937438848037,
			"y": 683.9944370212726,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 520484914,
			"groupIds": [
				"gJe3qv3PNpZJ42w4yZkG1",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1391,
			"versionNonce": 250966997,
			"isDeleted": false,
			"id": "4-cziDWdU4XoEbrCfq7u7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -598.9937438848037,
			"y": 698.371822331275,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 916085742,
			"groupIds": [
				"gJe3qv3PNpZJ42w4yZkG1",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1390,
			"versionNonce": 606220597,
			"isDeleted": false,
			"id": "hcW3J8yTyJvfjFbEhzOAK",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -589.648443433302,
			"y": 674.6491365697709,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1539056114,
			"groupIds": [
				"Q_XpQH0mV-PETouZPI2cV",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1364,
			"versionNonce": 1670398613,
			"isDeleted": false,
			"id": "BMZnV3H7K_xKH6sdBrEx5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -582.4597507783008,
			"y": 681.8378292247721,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1728359982,
			"groupIds": [
				"Q_XpQH0mV-PETouZPI2cV",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1366,
			"versionNonce": 569714677,
			"isDeleted": false,
			"id": "9xF7qJ5Dfx_Tn2s5GLYpg",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -583.178620043801,
			"y": 694.0586067382743,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2072449970,
			"groupIds": [
				"Q_XpQH0mV-PETouZPI2cV",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1375,
			"versionNonce": 22438229,
			"isDeleted": false,
			"id": "qbpFpny0jgK-zR9SPZlfY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -583.178620043801,
			"y": 708.4359920482768,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 854243438,
			"groupIds": [
				"Q_XpQH0mV-PETouZPI2cV",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1409,
			"versionNonce": 1191800501,
			"isDeleted": false,
			"id": "nx86Bc1GlV_tMbyAxJz3B",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -578.1465351853001,
			"y": 687.5887833487732,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1351470450,
			"groupIds": [
				"TnAXN9RCgsmMIiYofrgmC",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "XiFOhlWOtit7uaGevF7cY",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1381,
			"versionNonce": 256574837,
			"isDeleted": false,
			"id": "QscAWn70zKKP8JjNQC4tJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -570.9578425302989,
			"y": 694.7774760037744,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 571833006,
			"groupIds": [
				"TnAXN9RCgsmMIiYofrgmC",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1383,
			"versionNonce": 1393856213,
			"isDeleted": false,
			"id": "7BvkKSxvuirdx4FqPAL-I",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -571.6767117957988,
			"y": 706.9982535172766,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1343704882,
			"groupIds": [
				"TnAXN9RCgsmMIiYofrgmC",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1392,
			"versionNonce": 1806036021,
			"isDeleted": false,
			"id": "RaeFJfUNl2EYo7VyuZ6CY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -571.6767117957988,
			"y": 721.3756388272791,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1529738478,
			"groupIds": [
				"TnAXN9RCgsmMIiYofrgmC",
				"MoNCWFyE4PwfcdFm1NNJ9",
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1320,
			"versionNonce": 417635733,
			"isDeleted": false,
			"id": "V0vR63R9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -627.7485145048086,
			"y": 747.9738016507837,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 116.40850830078125,
			"height": 71.88692655001252,
			"seed": 780835058,
			"groupIds": [
				"Sf61-OfaMB4YKxPM9892g"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1979,
			"versionNonce": 33956597,
			"isDeleted": false,
			"id": "7lo7iu1RpYiFvNGecDEAz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -729.2504227528125,
			"y": 893.934601430431,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 1203578670,
			"groupIds": [
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1930,
			"versionNonce": 1267727445,
			"isDeleted": false,
			"id": "GneXi6osnZvxo_XJcnmL0",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -709.122083318809,
			"y": 905.436509678433,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 2070850226,
			"groupIds": [
				"fPCb6i47-WhTwjkZdTQMe",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "dB3HcAjuGIwb0F_qDolQf",
					"type": "arrow"
				},
				{
					"id": "8M7rNkXcTGu5JRDORCze1",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1900,
			"versionNonce": 2105966709,
			"isDeleted": false,
			"id": "iMBwEF89_SMaU3wvOvSXq",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -701.9333906638078,
			"y": 912.6252023334342,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 942412142,
			"groupIds": [
				"fPCb6i47-WhTwjkZdTQMe",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1901,
			"versionNonce": 36219349,
			"isDeleted": false,
			"id": "p0QwkyQfUOAgD-C3rkVKD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -702.6522599293078,
			"y": 924.8459798469364,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1030390898,
			"groupIds": [
				"fPCb6i47-WhTwjkZdTQMe",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1910,
			"versionNonce": 2004789045,
			"isDeleted": false,
			"id": "sOfQhSL-UFOkrjikaU4_y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -702.6522599293078,
			"y": 939.2233651569389,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 130266030,
			"groupIds": [
				"fPCb6i47-WhTwjkZdTQMe",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1982,
			"versionNonce": 1072560277,
			"isDeleted": false,
			"id": "A8um0Kl_h0cT-PMJ5BGb8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -695.4635672743066,
			"y": 921.2516335194358,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 239412786,
			"groupIds": [
				"8Gu7f8kQRpu5B9_ODvL-x",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1953,
			"versionNonce": 1428954613,
			"isDeleted": false,
			"id": "RJl7PHr3aDdesRtMLhjKH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -688.2748746193054,
			"y": 928.440326174437,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1085083118,
			"groupIds": [
				"8Gu7f8kQRpu5B9_ODvL-x",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1955,
			"versionNonce": 1581160277,
			"isDeleted": false,
			"id": "x6naLK14ACXt2R4zBbtJK",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -688.9937438848056,
			"y": 940.6611036879392,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 921014258,
			"groupIds": [
				"8Gu7f8kQRpu5B9_ODvL-x",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1964,
			"versionNonce": 91940021,
			"isDeleted": false,
			"id": "jrAhWUnrd3qsnhHx0M0Jv",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -688.9937438848056,
			"y": 955.0384889979416,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1072767022,
			"groupIds": [
				"8Gu7f8kQRpu5B9_ODvL-x",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1963,
			"versionNonce": 243697173,
			"isDeleted": false,
			"id": "3vKCVHa4p6VzD7FaZnbBk",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -679.6484434333038,
			"y": 931.3158032364375,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1263714738,
			"groupIds": [
				"Wz6O59kbciCyhUS-VlYHR",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1937,
			"versionNonce": 743897973,
			"isDeleted": false,
			"id": "7o-bk-cSbwu7VgQWieCK8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -672.4597507783026,
			"y": 938.5044958914388,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1501096558,
			"groupIds": [
				"Wz6O59kbciCyhUS-VlYHR",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1939,
			"versionNonce": 389137621,
			"isDeleted": false,
			"id": "ZARHNz5OXYz3_Yi4DTKCL",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -673.1786200438028,
			"y": 950.7252734049409,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1186184050,
			"groupIds": [
				"Wz6O59kbciCyhUS-VlYHR",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1948,
			"versionNonce": 1655464501,
			"isDeleted": false,
			"id": "Zt9gMhWUuiVgv0Czsimbz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -673.1786200438028,
			"y": 965.1026587149435,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2081254574,
			"groupIds": [
				"Wz6O59kbciCyhUS-VlYHR",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1980,
			"versionNonce": 330060693,
			"isDeleted": false,
			"id": "q1imb4QIu2LjJAl7kAzMG",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -668.1465351853019,
			"y": 944.2554500154398,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 659520818,
			"groupIds": [
				"VKRPuCKiZEYxvumL3B1tX",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1954,
			"versionNonce": 1986468085,
			"isDeleted": false,
			"id": "8gcJhGs9cJs81NnmxFO1W",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -660.9578425303007,
			"y": 951.444142670441,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1431807726,
			"groupIds": [
				"VKRPuCKiZEYxvumL3B1tX",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1956,
			"versionNonce": 878850645,
			"isDeleted": false,
			"id": "EVsu8SMDa_uIhQiwIF1_M",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -661.6767117958007,
			"y": 963.6649201839432,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 177014514,
			"groupIds": [
				"VKRPuCKiZEYxvumL3B1tX",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1965,
			"versionNonce": 712187829,
			"isDeleted": false,
			"id": "Bb5abMHmcgz6fBFdaGS6k",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -661.6767117958007,
			"y": 978.0423054939457,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1977653550,
			"groupIds": [
				"VKRPuCKiZEYxvumL3B1tX",
				"4MGDWReX00H0ADbeHcKwm",
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1945,
			"versionNonce": 2126471445,
			"isDeleted": false,
			"id": "EgGLjjR8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -727.7485145048104,
			"y": 1004.6404683174503,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 124.4010009765625,
			"height": 107.83038982501878,
			"seed": 1223907506,
			"groupIds": [
				"RVz7kqij2koR6UfbJTPAd"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1898,
			"versionNonce": 1992062581,
			"isDeleted": false,
			"id": "kKaVTXdVNbY2wqBO8Porv",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -959.3912987818474,
			"y": 631.4453880146094,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 96.69309462915602,
			"height": 94.18158567774937,
			"seed": 1964065646,
			"groupIds": [
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "0lQfAWR4DScNi0fQQT_y6",
					"type": "arrow"
				},
				{
					"id": "8M7rNkXcTGu5JRDORCze1",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1846,
			"versionNonce": 1327476373,
			"isDeleted": false,
			"id": "IN5Rul9VLA1PEQhR7r1EV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -941.8107361220009,
			"y": 641.491423820236,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 304706162,
			"groupIds": [
				"5sgMmjLw-iB5H1j_sF3GD",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1819,
			"versionNonce": 1085740021,
			"isDeleted": false,
			"id": "JUH30NkHefLG0bds8BAZP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -935.5319637434841,
			"y": 647.7701961987526,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 355640750,
			"groupIds": [
				"5sgMmjLw-iB5H1j_sF3GD",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "jBiUvkVqpoavp-ev4b2wA",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1818,
			"versionNonce": 2000706229,
			"isDeleted": false,
			"id": "T-bZNq6QWebOnrs4Wmu4y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -936.159840981336,
			"y": 658.4441092422309,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 150361138,
			"groupIds": [
				"5sgMmjLw-iB5H1j_sF3GD",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1828,
			"versionNonce": 1412250645,
			"isDeleted": false,
			"id": "TW5mvbILn2MpfOjPWxkhN",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -936.159840981336,
			"y": 671.0016539992641,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1735245806,
			"groupIds": [
				"5sgMmjLw-iB5H1j_sF3GD",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1896,
			"versionNonce": 934736245,
			"isDeleted": false,
			"id": "ntFas2T0CbzLl6eihtQ8M",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -929.8810686028191,
			"y": 655.3047230529726,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 1598094834,
			"groupIds": [
				"H56FpJ-iQkekelqwoPrqI",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1870,
			"versionNonce": 1596127957,
			"isDeleted": false,
			"id": "0Dn3_hwjVV8rHBndw4qU1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -923.6022962243028,
			"y": 661.5834954314893,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1875612206,
			"groupIds": [
				"H56FpJ-iQkekelqwoPrqI",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1873,
			"versionNonce": 1124522037,
			"isDeleted": false,
			"id": "xTmYzR0xtytGchVYZlrYx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -924.2301734621542,
			"y": 672.2574084749675,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1913679794,
			"groupIds": [
				"H56FpJ-iQkekelqwoPrqI",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1881,
			"versionNonce": 759695765,
			"isDeleted": false,
			"id": "E-YH1HDc0rkyXEcc8G_4d",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -924.2301734621542,
			"y": 684.8149532320007,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1228217454,
			"groupIds": [
				"H56FpJ-iQkekelqwoPrqI",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1883,
			"versionNonce": 1949936373,
			"isDeleted": false,
			"id": "fE4EQWYfd_0em_Z1uiWA4",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -916.0677693700827,
			"y": 664.0950043828958,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 1703651698,
			"groupIds": [
				"Z_7OY7abwQLn-JlySJKL-",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917475846,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1854,
			"versionNonce": 115512757,
			"isDeleted": false,
			"id": "LsPOsA-pRMOhE7h8uBIZf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -909.7889969915659,
			"y": 670.3737767614125,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1232297646,
			"groupIds": [
				"Z_7OY7abwQLn-JlySJKL-",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1856,
			"versionNonce": 1238374165,
			"isDeleted": false,
			"id": "mWcdvHovWZGEqWn7_eQGh",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -910.4168742294178,
			"y": 681.0476898048908,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1090104114,
			"groupIds": [
				"Z_7OY7abwQLn-JlySJKL-",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1865,
			"versionNonce": 1246129269,
			"isDeleted": false,
			"id": "q4VRiY1AY--BhTbLIkUCR",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -910.4168742294178,
			"y": 693.605234561924,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 623859950,
			"groupIds": [
				"Z_7OY7abwQLn-JlySJKL-",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1898,
			"versionNonce": 134944213,
			"isDeleted": false,
			"id": "A7VvN7SIf-payIwMWW6x5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -906.0217335644561,
			"y": 675.3967946642258,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 180450546,
			"groupIds": [
				"-GLoCQ9Q-a3uhOiJLiXPd",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1873,
			"versionNonce": 1848873781,
			"isDeleted": false,
			"id": "GgkptlQ0Jr8lLnXINN_aW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -899.7429611859393,
			"y": 681.6755670427424,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 334629678,
			"groupIds": [
				"-GLoCQ9Q-a3uhOiJLiXPd",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1873,
			"versionNonce": 1764058261,
			"isDeleted": false,
			"id": "Ll6JR53eqOXHi91W9wTsi",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -900.3708384237912,
			"y": 692.3494800862206,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1684670130,
			"groupIds": [
				"-GLoCQ9Q-a3uhOiJLiXPd",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1882,
			"versionNonce": 1016465909,
			"isDeleted": false,
			"id": "QN4Cz8bFEaE_uYMZHnnpP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -900.3708384237912,
			"y": 704.9070248432539,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1948546414,
			"groupIds": [
				"-GLoCQ9Q-a3uhOiJLiXPd",
				"SZOvVexnTCFXUl0tZNEj3",
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1886,
			"versionNonce": 428540757,
			"isDeleted": false,
			"id": "qSNLwu2x",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -991.2037454996648,
			"y": 732.3243308961099,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 203.43548583984375,
			"height": 62.78772378516625,
			"seed": 647651442,
			"groupIds": [
				"P4CxyjJfxrM59hYBpWUI6"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2291,
			"versionNonce": 2109879579,
			"isDeleted": false,
			"id": "uOQlIhve",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -389.30441905528346,
			"y": 526.5936780848978,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.142822265625,
			"height": 37.27579646895363,
			"seed": 1863292846,
			"groupIds": [
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 2049,
			"versionNonce": 2006112699,
			"isDeleted": false,
			"id": "cbMBB4NEcwEaqVZMokb60",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -407.7565916974788,
			"y": 417.608188252073,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 101.08084106445294,
			"height": 101.08084106445294,
			"seed": 2098823730,
			"groupIds": [
				"SgxirckfzRJ-iYQkH0uZy",
				"rspI5aW-LAA6K5J7eptqO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "Fpg41cP9ZXjmu0KQH0xkc",
					"type": "arrow"
				}
			],
			"updated": 1714917585664,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2900,
			"versionNonce": 1531832059,
			"isDeleted": false,
			"id": "sDEb2dXyr4AQKPt2YdXS1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": -328.8851179704991,
			"y": 494.2257564891464,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.012737581657009,
			"height": 10.57610619368553,
			"seed": 484209134,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 2793,
			"versionNonce": 1888309147,
			"isDeleted": false,
			"id": "YizsGb4aRLDvz21DWNTTk",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.029928014204294584,
			"x": -323.444295976695,
			"y": 428.7306274324435,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.57665040349346,
			"height": 11.163737885090274,
			"seed": 47082482,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 3400,
			"versionNonce": 1192666171,
			"isDeleted": false,
			"id": "Axbe5eL-_mMyziu7gfX9Q",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.765434113477622,
			"x": -316.89158450889613,
			"y": 499.1040301493623,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.914795147667562,
			"height": 7.805897785531529,
			"seed": 680789038,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 3618,
			"versionNonce": 1993106651,
			"isDeleted": false,
			"id": "HlI2xMGXmcJDIY6imauYW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.48666424209895,
			"x": -390.0329882345238,
			"y": 427.73087255921746,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 1572871602,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 2994,
			"versionNonce": 2000753019,
			"isDeleted": false,
			"id": "a4gOZwyncJsxFy92A7uKx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": -395.0322554285797,
			"y": 429.8023152447638,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.012737581657009,
			"height": 10.57610619368553,
			"seed": 1948208750,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 2857,
			"versionNonce": 699869723,
			"isDeleted": false,
			"id": "Z1xDlrftgEvz-tFPOUJQ7",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.06885648930104615,
			"x": -387.22966951311287,
			"y": 493.83955951195503,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.57665040349346,
			"height": 11.163737885090274,
			"seed": 1528141682,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 3627,
			"versionNonce": 589377211,
			"isDeleted": false,
			"id": "cf587vBs2vGSzYQyKnLrn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.854199750177644,
			"x": -318.416723403416,
			"y": 426.5030899093333,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 1011306670,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 3621,
			"versionNonce": 908173147,
			"isDeleted": false,
			"id": "k4ZQTMTylddhAK-KVQbAA",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.663921886409196,
			"x": -389.98971736818,
			"y": 500.44617518882217,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 185981234,
			"groupIds": [
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 4550,
			"versionNonce": 1024130043,
			"isDeleted": false,
			"id": "nWFqxrShJ-aMVOZ3ypTaj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -376.9266909596547,
			"y": 445.00005719036267,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.9329596882709,
			"height": 57.344099073364674,
			"seed": 1018497774,
			"groupIds": [
				"_M7mS1ywpbprEu2Wua0k9",
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 2709,
			"versionNonce": 601867419,
			"isDeleted": false,
			"id": "B8l3tzMeRJ_w-Ft6hz7RQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -377.0589917248187,
			"y": 439.4895342762318,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 35.869338881988476,
			"height": 9.75268955332379,
			"seed": 1562895090,
			"groupIds": [
				"_M7mS1ywpbprEu2Wua0k9",
				"t4p8K-E-qnzTKZNwWs-Iw",
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "6cWLZwwOFxou93y4zhDwe",
					"type": "arrow"
				},
				{
					"id": "z0y0KGskzL7ifJPVlpDtW",
					"type": "arrow"
				}
			],
			"updated": 1714917585664,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2548,
			"versionNonce": 726378107,
			"isDeleted": false,
			"id": "EZR4VmndRp0FgSAJO6TOM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -376.43818191677497,
			"y": 459.1562556313295,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.2689376620743,
			"height": 4.531369714274167,
			"seed": 1408335150,
			"groupIds": [
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 2576,
			"versionNonce": 161947419,
			"isDeleted": false,
			"id": "JRCC87PFsUaRa2Sr7ce3t",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -377.4355060694336,
			"y": 475.8286086148902,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.2689376620743,
			"height": 4.531369714274167,
			"seed": 1003664562,
			"groupIds": [
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917585664,
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
			"version": 5737,
			"versionNonce": 730779701,
			"isDeleted": false,
			"id": "6cWLZwwOFxou93y4zhDwe",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.034244644020102,
			"x": -377.7927225650876,
			"y": 455.14315911175436,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 14.463571016844513,
			"height": 25.532582515865883,
			"seed": 660973422,
			"groupIds": [
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917585831,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "B8l3tzMeRJ_w-Ft6hz7RQ",
				"focus": 0.17059876156314954,
				"gap": 9.292283166223264
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
			"version": 5782,
			"versionNonce": 839975317,
			"isDeleted": false,
			"id": "z0y0KGskzL7ifJPVlpDtW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.31086799431261625,
			"x": -341.52073279532055,
			"y": 455.14571142430304,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 16.442530389432445,
			"height": 28.10295050046834,
			"seed": 683495026,
			"groupIds": [
				"UEScGUrgC4YyuGhjn5CBO",
				"AZuuB6BqqsPY8XsO645aG",
				"e6Ih4j9POI3qpWe9_ONJZ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917585832,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "B8l3tzMeRJ_w-Ft6hz7RQ",
				"focus": -0.3137612380239567,
				"gap": 9.077870464941224
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
			"version": 3045,
			"versionNonce": 1518429909,
			"isDeleted": false,
			"id": "IVZyLxaF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -426.898915541728,
			"y": 1090.2861864898036,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 164.84603881835938,
			"height": 35.40284187563427,
			"seed": 1197115822,
			"groupIds": [
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1905,
			"versionNonce": 532137013,
			"isDeleted": false,
			"id": "8Dw4nFpOFUyc1qDrLOYxH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -392.4702649497772,
			"y": 989.0805355425678,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 96.00194688908816,
			"height": 96.00194688908816,
			"seed": 1487843378,
			"groupIds": [
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3430,
			"versionNonce": 486241685,
			"isDeleted": false,
			"id": "YR0Txf-XdlSTltwlBrIQ8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -379.3112884743059,
			"y": 1000.2043173574571,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 49.57937969326794,
			"height": 18.159772968914965,
			"seed": 1392059374,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "jyBPmKT2KA6fl9aZTenhn",
					"type": "arrow"
				},
				{
					"id": "HyvXRibmrvO9SbJ0daUSJ",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1596,
			"versionNonce": 2109571509,
			"isDeleted": false,
			"id": "XVp3saUvdBe0KV8yTUrVN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -378.81598096661764,
			"y": 1010.4549310009637,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.35995334837017967,
			"height": 56.512675694123224,
			"seed": 1334696434,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1636,
			"versionNonce": 2121106197,
			"isDeleted": false,
			"id": "qw6LGRrLVmHAMGF_Ahs35",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -329.64635357924726,
			"y": 1009.8790056435739,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.3599533483701519,
			"height": 16.678951976095433,
			"seed": 474641966,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1769,
			"versionNonce": 1616271477,
			"isDeleted": false,
			"id": "glrMrPonXYT210Qf9q5FF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -378.42003228341036,
			"y": 1050.0524877092098,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.63971383820803,
			"height": 8.323775076416316,
			"seed": 2086783922,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1661,
			"versionNonce": 759005653,
			"isDeleted": false,
			"id": "iSWlXpIuOtcTfKJqBs8-t",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -378.1680649395512,
			"y": 1067.0395973647637,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.59370202997869,
			"height": 9.358787057625653,
			"seed": 1278705774,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1361,
			"versionNonce": 439910197,
			"isDeleted": false,
			"id": "6KDK_gnJWvUCElBZpO7y-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -329.35765372538026,
			"y": 1056.5985018168506,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.564700143856714e-13,
			"height": 7.302675216406523,
			"seed": 1431405938,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1783,
			"versionNonce": 497864853,
			"isDeleted": false,
			"id": "sTM2IedET_gSHqxtyCtXa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -378.4618981575368,
			"y": 1031.2785573434842,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.63971383820803,
			"height": 8.323775076416316,
			"seed": 109658798,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1098,
			"versionNonce": 1162868213,
			"isDeleted": false,
			"id": "HUKr0_6UA2Zq-9niN00po",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -342.8210103424108,
			"y": 1029.045595368451,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 33.1937158062507,
			"height": 27.526496034452418,
			"seed": 1940129586,
			"groupIds": [
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1689,
			"versionNonce": 241841627,
			"isDeleted": false,
			"id": "HyvXRibmrvO9SbJ0daUSJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -338.77525370656485,
			"y": 1031.574825929127,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.52165667442574,
			"height": 13.718098279875628,
			"seed": 233356526,
			"groupIds": [
				"8F4lydq9AH0JNCuQpTNC-",
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466845,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "YR0Txf-XdlSTltwlBrIQ8",
				"focus": 2.454945017800447,
				"gap": 14.809161682799555
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
			"version": 1249,
			"versionNonce": 1888009397,
			"isDeleted": false,
			"id": "_ysLQZY9QUeduUAQ6V1zz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -339.4611586205583,
			"y": 1048.7224487789708,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.978926617088188,
			"height": 19.433972563156786,
			"seed": 801132786,
			"groupIds": [
				"8F4lydq9AH0JNCuQpTNC-",
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1200,
			"versionNonce": 169434645,
			"isDeleted": false,
			"id": "fSoopPNEwwUYjGeA1YeZB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -339.4611586205583,
			"y": 1041.4061296963712,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.207561588419505,
			"height": 10.517208681237769,
			"seed": 1742663470,
			"groupIds": [
				"8F4lydq9AH0JNCuQpTNC-",
				"h7iUS-3rYuxiktCP3nd5S",
				"9CzvBV6RJxIgM9eoQkFL0",
				"PE8nHqz4fuxaCsCBN8nEB"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2809,
			"versionNonce": 1305516085,
			"isDeleted": false,
			"id": "1pDBQAgf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -419.03845716900696,
			"y": 787.1053357772914,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 128.57763671875,
			"height": 40.288174827240816,
			"seed": 1026384562,
			"groupIds": [
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1682,
			"versionNonce": 953797013,
			"isDeleted": false,
			"id": "YzjOrUiLhIF7CIiKHxCrs",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -409.3532121021444,
			"y": 671.9340460489043,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 109.24951261285652,
			"height": 109.24951261285652,
			"seed": 13949294,
			"groupIds": [
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "XiFOhlWOtit7uaGevF7cY",
					"type": "arrow"
				}
			],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2903,
			"versionNonce": 1115016949,
			"isDeleted": false,
			"id": "P8h_vIWmRzdpAe2tSSZ3f",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -393.74580094284147,
			"y": 687.1602542631128,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 52.96920640933012,
			"height": 19.40138760686516,
			"seed": 1183988850,
			"groupIds": [
				"AwdT2U09UXusKKIdo_HPG",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "XiFOhlWOtit7uaGevF7cY",
					"type": "arrow"
				}
			],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1074,
			"versionNonce": 2127320501,
			"isDeleted": false,
			"id": "hkHc-kFfgq2Ne3lkgjqPE",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -393.2166284164168,
			"y": 698.1117198373947,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.3845639724721782,
			"height": 60.376543678137324,
			"seed": 1343454126,
			"groupIds": [
				"AwdT2U09UXusKKIdo_HPG",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1106,
			"versionNonce": 511825685,
			"isDeleted": false,
			"id": "mRQoAC6MGZtM7xjc8Xxki",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -340.6851897767133,
			"y": 697.4964174814415,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.1817949871701327,
			"height": 17.15856077432575,
			"seed": 162913842,
			"groupIds": [
				"AwdT2U09UXusKKIdo_HPG",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1175,
			"versionNonce": 583019637,
			"isDeleted": false,
			"id": "5EjQCMeEr4RdUwFFuwRxL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -393.2166284164168,
			"y": 719.1089127343776,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.379217109582335,
			"height": 9.229535339333117,
			"seed": 2076431854,
			"groupIds": [
				"AwdT2U09UXusKKIdo_HPG",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1192,
			"versionNonce": 726455765,
			"isDeleted": false,
			"id": "6ToCNPAHDEqPNEj_hrMkO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -392.7936080466984,
			"y": 738.9462025316275,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.379217109582335,
			"height": 8.460407394388971,
			"seed": 1937721330,
			"groupIds": [
				"AwdT2U09UXusKKIdo_HPG",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1136,
			"versionNonce": 1128092469,
			"isDeleted": false,
			"id": "JYJG-ZGasPQF16AWXICMl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -392.52441326596727,
			"y": 758.5651763100308,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 51.916136283748784,
			"height": 9.998663284277683,
			"seed": 2096031790,
			"groupIds": [
				"AwdT2U09UXusKKIdo_HPG",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1021,
			"versionNonce": 1995908245,
			"isDeleted": false,
			"id": "zyntTs9J6pKW2-yxVOYtk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -339.6052422998764,
			"y": 726.6523859474783,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.820418484735523,
			"height": 11.820418484735523,
			"seed": 1005943218,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1033,
			"versionNonce": 707774965,
			"isDeleted": false,
			"id": "HSeJdBeqH64CLRO1ml2Fb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -326.18062416364137,
			"y": 709.1750529021922,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.865313863551412,
			"height": 8.865313863551412,
			"seed": 1132311150,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1024,
			"versionNonce": 770491221,
			"isDeleted": false,
			"id": "S94isRa_y-2bGpy_prMc4",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -336.9034323605083,
			"y": 748.435728583634,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.131787272630186,
			"height": 10.131787272630186,
			"seed": 37712754,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1025,
			"versionNonce": 377721013,
			"isDeleted": false,
			"id": "0zscjhc34ZFDtCuRVoFKY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -355.8161019360846,
			"y": 732.9003214322684,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.287471666577515,
			"height": 9.287471666577515,
			"seed": 1513698478,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1020,
			"versionNonce": 1369027093,
			"isDeleted": false,
			"id": "Evd5uyZSIjKeaqKNoVu7D",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -349.8214611331118,
			"y": 716.4361671142441,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 6.332367045393866,
			"seed": 1755591986,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1019,
			"versionNonce": 2082776949,
			"isDeleted": false,
			"id": "_0IoBXcAWlYpCdFtBUUnx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -322.04347769398373,
			"y": 741.174614371582,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 6.332367045393866,
			"seed": 181038830,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1038,
			"versionNonce": 2020208853,
			"isDeleted": false,
			"id": "vfNn93G1hvF-BnjlWhB-T",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -330.31777063329855,
			"y": 726.905680629296,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.176682651446419,
			"height": 9.287471666577515,
			"seed": 814399218,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1024,
			"versionNonce": 1140788789,
			"isDeleted": false,
			"id": "ijnFm1EGjPc6K3BEJt8Fm",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -332.93514901206163,
			"y": 738.7260991140292,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 9.287471666577515,
			"seed": 28991790,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1026,
			"versionNonce": 231309205,
			"isDeleted": false,
			"id": "mD0Vw5JvMaknOY-dZuhOd",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -327.3626660121149,
			"y": 750.1243597957396,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 3.7994202272363196,
			"seed": 1450840242,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1037,
			"versionNonce": 201245941,
			"isDeleted": false,
			"id": "wcOuX8sUkNwjuzXvNioUB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -346.35976714829667,
			"y": 735.7709944928471,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.754524848420141,
			"height": 1.6886312121057987,
			"seed": 1920076654,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
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
			"version": 1053,
			"versionNonce": 304373333,
			"isDeleted": false,
			"id": "vCZETQbya5lCLvBWIDSWO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -343.9956834513496,
			"y": 722.4308079172165,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 5.488051439341196,
			"seed": 773401202,
			"groupIds": [
				"KXzMjuE4rnS6PWagxRHvo",
				"8csOmzdS7mbevCA9Fa0As",
				"GjcuZJDXhWa7-3RmuMtjl",
				"Oc3JcGU2c0JMclB9fU2UN"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917599690,
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
			"type": "text",
			"version": 3382,
			"versionNonce": 671015317,
			"isDeleted": false,
			"id": "A4UfXbGs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -876.9739124899702,
			"y": 1315.9941225058244,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 180.08660888671875,
			"height": 41.11677384287278,
			"seed": 175843250,
			"groupIds": [
				"LPJvstVNdIIq95s_Wbayk",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2089,
			"versionNonce": 1027073781,
			"isDeleted": false,
			"id": "l5JwcInVEYNLdoVT_NODw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -842.6421236495628,
			"y": 1196.4464964460767,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 111.49642598129428,
			"height": 111.49642598129428,
			"seed": 1274143854,
			"groupIds": [
				"Lt9OgWO2OUGG9NDav6Qhz",
				"Nd-YQ5trGMBg-ReabY-yL",
				"cYW2KXXpOqzitZhJnnOD_",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "dB3HcAjuGIwb0F_qDolQf",
					"type": "arrow"
				},
				{
					"id": "0ju_1XAjWr8Pad7EyC84U",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2905,
			"versionNonce": 643493653,
			"isDeleted": false,
			"id": "059xAD6GXasc2y1KcOUqa",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": -828.3116142073709,
			"y": 1210.2824019044212,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 66.23094070053295,
			"height": 66.23094070053295,
			"seed": 266297714,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13425,
			"versionNonce": 2142651509,
			"isDeleted": false,
			"id": "Zq6ZkNO6cWGIsU66n0ke_",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": -819.2751007411675,
			"y": 1219.310096511204,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.50343322539075,
			"height": 48.50343322539075,
			"seed": 1767319214,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3102,
			"versionNonce": 834661845,
			"isDeleted": false,
			"id": "TDXOxmJxVXS944MzwDWya",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": -776.1719560849779,
			"y": 1269.205834292546,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75022091862902,
			"height": 30.60025551438842,
			"seed": 1477862194,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 866,
			"versionNonce": 999123765,
			"isDeleted": false,
			"id": "11QfoJRRBalBiuJbG1IOi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -805.3128991366696,
			"y": 1238.7020092659586,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 626663662,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 894,
			"versionNonce": 495205525,
			"isDeleted": false,
			"id": "yfhPAcFCt3W_RmVtq13Hl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -784.2098117288338,
			"y": 1238.7020092659586,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 226962674,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 879,
			"versionNonce": 794419701,
			"isDeleted": false,
			"id": "yx9d1VZWOYwv8IpOi22oP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -790.2935846752368,
			"y": 1254.1015595365425,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 1401148206,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 907,
			"versionNonce": 907270997,
			"isDeleted": false,
			"id": "m8EpJyrhEOP6w5BQow_sX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -799.2291261902665,
			"y": 1254.1015595365425,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 1975041714,
			"groupIds": [
				"Y8YpJZECq_Yi41gU6OdqH",
				"2oDZJXl_YM2xGJ26deoHu",
				"YbpR3sSjis79Stxm6IqeH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"type": "rectangle",
			"version": 2002,
			"versionNonce": 973580469,
			"isDeleted": false,
			"id": "tT23HScioDms3mIbqfzPg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1102.758739881491,
			"y": 1187.2152348662423,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 108.26125563418046,
			"height": 108.26125563418046,
			"seed": 223484018,
			"groupIds": [
				"yBQQlTnmyy33K6aK4zByH",
				"wxE6fcQMF1HHhUHIHG8NO",
				"f7-EadHJ5BSIfWVVmL8T7",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1907,
			"versionNonce": 484100629,
			"isDeleted": false,
			"id": "tHiePl4R9NdAL4gxTtcU3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1073.1550625034802,
			"y": 1216.2998233460703,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 66.96246786542376,
			"height": 69.29836790724075,
			"seed": 986668974,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1448,
			"versionNonce": 1870839669,
			"isDeleted": false,
			"id": "BxXHNUK-EeT5YNK6AD-iG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1048.757884288948,
			"y": 1212.4066566097106,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 8.56496681999605,
			"height": 22.061278172717078,
			"seed": 605698610,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1374,
			"versionNonce": 138741973,
			"isDeleted": false,
			"id": "8-jFrXL002oF00r5L6ybC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1073.4146069525675,
			"y": 1228.2388680042482,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 16.091755843628974,
			"height": 14.534489149084193,
			"seed": 1835219438,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1358,
			"versionNonce": 1488397877,
			"isDeleted": false,
			"id": "d_T3yhdNtQ0mNWdBDZ5Jb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1064.5900956834837,
			"y": 1211.8616132666189,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 11.160411310903948,
			"seed": 2029528050,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1343,
			"versionNonce": 62822293,
			"isDeleted": false,
			"id": "ZZTcEbp26t7tn7WTifsbQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1065.6282734798476,
			"y": 1233.170212536971,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.267244574541996,
			"height": 12.717678005448674,
			"seed": 1291963438,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1392,
			"versionNonce": 865131765,
			"isDeleted": false,
			"id": "_uym9VPQ5q3gzJyQsD9Vi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1065.8878179289409,
			"y": 1240.437457111513,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.0077001254513,
			"height": 18.946744783627594,
			"seed": 1441977778,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1352,
			"versionNonce": 800290389,
			"isDeleted": false,
			"id": "1t8kh7WqdFGcoNqjKniVv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1048.7578842889434,
			"y": 1271.0637021042278,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.0077001254513,
			"height": 34.519411729075,
			"seed": 1469322862,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1452,
			"versionNonce": 855368629,
			"isDeleted": false,
			"id": "5rgp0bK7AWRsEhxYN9Ltu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1058.8801178034835,
			"y": 1254.1933129133272,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 10.122233514540799,
			"height": 7.526789023632803,
			"seed": 741429106,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1350,
			"versionNonce": 26191125,
			"isDeleted": false,
			"id": "buDGwVVbH1_rKlfUTfES9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1015.017105907144,
			"y": 1250.0406017278744,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 8.824511269086859,
			"height": 4.6718000836341815,
			"seed": 1709381806,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1322,
			"versionNonce": 1055144565,
			"isDeleted": false,
			"id": "zL-z0rf9fzFTrTIF75trr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1048.4983398398535,
			"y": 1260.9155141447775,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.267244574542229,
			"height": 0,
			"seed": 804950322,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1355,
			"versionNonce": 62858197,
			"isDeleted": false,
			"id": "zzzq4IGLlsGNwNcnO0Wjb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1064.0710067853036,
			"y": 1272.101879900591,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.786333472723613,
			"height": 5.969522329088171,
			"seed": 1335349998,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1338,
			"versionNonce": 875946293,
			"isDeleted": false,
			"id": "VWuUcS65mfJbAkcAWg_LY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1074.712329198024,
			"y": 1254.1933129133272,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.709977879997366,
			"height": 3.374077838180246,
			"seed": 1958058738,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1349,
			"versionNonce": 363721365,
			"isDeleted": false,
			"id": "DbI1iM5zMj1oYIHPjQ4g7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1081.2009404252947,
			"y": 1240.437457111513,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.709977879997482,
			"height": 3.114533389089492,
			"seed": 255542574,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1297,
			"versionNonce": 618452981,
			"isDeleted": false,
			"id": "GTTMjj8ibmzJLMBTkSJwl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1034.482939588949,
			"y": 1219.933445633343,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 149515442,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1343,
			"versionNonce": 734531925,
			"isDeleted": false,
			"id": "FVBEvhyM-nH59S3tofbzq",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1039.8036007953124,
			"y": 1232.7808958633373,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 1714843502,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1378,
			"versionNonce": 398794421,
			"isDeleted": false,
			"id": "3ORIayuxg4tHoz77YJIze",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1029.421822831683,
			"y": 1240.5672293360597,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 305989234,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1349,
			"versionNonce": 259620885,
			"isDeleted": false,
			"id": "IOIH4u-YJQuEqWGLxWEwU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1040.556279697679,
			"y": 1257.6971629760533,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 13783470,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1336,
			"versionNonce": 1222292853,
			"isDeleted": false,
			"id": "BMw8VtIM1aTFHtMOkuY6n",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1028.7729617089537,
			"y": 1222.2693456751622,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 4.671800083634238,
			"height": 0,
			"seed": 1769433138,
			"groupIds": [
				"Vt_2NWlANnLRX8bIfEk9O",
				"zz358Vfztq6u9t5Ttl6n4",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 3292,
			"versionNonce": 523124437,
			"isDeleted": false,
			"id": "SVVIyLy3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1135.961278443821,
			"y": 1303.2940776758326,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 173.5655059814453,
			"height": 39.92373320202065,
			"seed": 439872494,
			"groupIds": [
				"tqCUhvyoV2U-g7l6MbFLQ",
				"ffG9Omx3pyjCZ2LSSIBGS"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 3763,
			"versionNonce": 1762237493,
			"isDeleted": false,
			"id": "uq24zpXV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -859.5305573231981,
			"y": 443.06022518377677,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.40867614746094,
			"height": 27.743935377854452,
			"seed": 914330098,
			"groupIds": [
				"rPJpIMYk3ysQbz_q6F7LA",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2593,
			"versionNonce": 240274837,
			"isDeleted": false,
			"id": "lluP5brliY-iDI86q0qP0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -833.6884872850806,
			"y": 363.05773239889186,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 74.72305088242369,
			"height": 74.72305088242369,
			"seed": 544226862,
			"groupIds": [
				"f5IT3iMm0b7qnuTaHzlgT",
				"wJ4c6Y6p8j_NtsmQmpZKT",
				"_bq6tZ1AeDrPJYaNXYSTm",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "0lQfAWR4DScNi0fQQT_y6",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 767,
			"versionNonce": 626109525,
			"isDeleted": false,
			"id": "UzLTMwgW0EAtgx7eN1IMv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -815.7849739965782,
			"y": 381.0163449849832,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 39.86314744288174,
			"height": 39.86314744288174,
			"seed": 207389618,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "-vhkX7u366GU-wyu1JtSh",
					"type": "arrow"
				},
				{
					"id": "5TV7VZn7IYZsjskJobvAe",
					"type": "arrow"
				},
				{
					"id": "5peHY9Bdux9fRGJQR-yyz",
					"type": "arrow"
				},
				{
					"id": "lHYcqByIpwLxGUgLFVrCv",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1196,
			"versionNonce": 1560068731,
			"isDeleted": false,
			"id": "-vhkX7u366GU-wyu1JtSh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -784.2444675923637,
			"y": 373.14741895922634,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1482967150,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466851,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "UzLTMwgW0EAtgx7eN1IMv",
				"focus": -1.50338845400411,
				"gap": 10.195409271004841
			},
			"endBinding": {
				"focus": 1.4950557318415354,
				"gap": 15.059658061092357,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 1289,
			"versionNonce": 517258011,
			"isDeleted": false,
			"id": "5TV7VZn7IYZsjskJobvAe",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5318549836978397,
			"x": -791.7374453228174,
			"y": 405.8546437176933,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 87375218,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466851,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "UzLTMwgW0EAtgx7eN1IMv",
				"focus": -1.501492156501539,
				"gap": 10.200396231667174
			},
			"endBinding": {
				"focus": 1.478257871739441,
				"gap": 14.534447891051393,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 1311,
			"versionNonce": 543465403,
			"isDeleted": false,
			"id": "5peHY9Bdux9fRGJQR-yyz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.659805918773737,
			"x": -819.246255590992,
			"y": 364.721062589186,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 31263406,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466852,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "UzLTMwgW0EAtgx7eN1IMv",
				"focus": -1.533404839514626,
				"gap": 10.746893053393642
			},
			"endBinding": {
				"focus": 1.5315387436222352,
				"gap": 11.257631391195225,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 1254,
			"versionNonce": 2077159515,
			"isDeleted": false,
			"id": "lHYcqByIpwLxGUgLFVrCv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.0860941483440776,
			"x": -826.3762494425639,
			"y": 399.3987599581968,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1582350130,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466852,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "UzLTMwgW0EAtgx7eN1IMv",
				"focus": -1.5202105672697388,
				"gap": 10.459096950955992
			},
			"endBinding": {
				"focus": 1.5364855559035686,
				"gap": 11.437821273077521,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 852,
			"versionNonce": 282498229,
			"isDeleted": false,
			"id": "z1rfQtAFbQTsGQM98BU-t",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -805.958539776698,
			"y": 409.1214788467046,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 19.769528406632524,
			"height": 10.046809518124626,
			"seed": 2072216814,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 727,
			"versionNonce": 317470229,
			"isDeleted": false,
			"id": "2IoOJBp-yFDAvnTr20re0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -801.4212709620608,
			"y": 388.02965908876206,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.019081406975497,
			"height": 11.019081406975497,
			"seed": 336988402,
			"groupIds": [
				"kk3s4af8PUKDQIIms0vz8",
				"MVsHSLP3kn6RT-v5MR5TK",
				"_pAmazZlAYTOewkx5vMxi"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 3430,
			"versionNonce": 2022091637,
			"isDeleted": false,
			"id": "ZwKKiK5OxjYFbYEWoHQ9b",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1116.2984984097045,
			"y": 362.70816188785693,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 87.3127427287515,
			"height": 87.22913254586531,
			"seed": 430470898,
			"groupIds": [
				"DE50o2k4JzvjJ8vK7wGCB",
				"wNx8WHbVeqeVlFfc-um6D",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2328,
			"versionNonce": 569078997,
			"isDeleted": false,
			"id": "nVuTuOFj8CcudbOYrwaOi",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1106.8543763110224,
			"y": 372.7070278073361,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 68.42449853138703,
			"height": 67.23140070690664,
			"seed": 208939310,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [
				{
					"id": "jBiUvkVqpoavp-ev4b2wA",
					"type": "arrow"
				}
			],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2331,
			"versionNonce": 532284309,
			"isDeleted": false,
			"id": "-Qd_eac-wX2-NvtAx5kLm",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1074.3878702792385,
			"y": 382.72023502167485,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 1126222002,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2376,
			"versionNonce": 356436213,
			"isDeleted": false,
			"id": "50uZ2q3HpQ_hB4gs__jfd",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1064.8527557318325,
			"y": 412.9284188474629,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 313709422,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2408,
			"versionNonce": 2093212245,
			"isDeleted": false,
			"id": "c7RtJ_vFaiphs-wZX0Kw-",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1093.2049521578874,
			"y": 402.21372159336624,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 1160307314,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2395,
			"versionNonce": 1528745909,
			"isDeleted": false,
			"id": "BcscTEDU55f58RxXHctLi",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1062.851706945064,
			"y": 396.8434513785945,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.934786164220179,
			"height": 11.986856642598756,
			"seed": 673330606,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2436,
			"versionNonce": 2121601301,
			"isDeleted": false,
			"id": "NDVSDoiZMIZcEv-SsCeAE",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.497787143782138,
			"x": -1075.1262629308255,
			"y": 407.11104994503023,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.934786164220179,
			"height": 11.986856642598756,
			"seed": 176669746,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2536,
			"versionNonce": 1413228149,
			"isDeleted": false,
			"id": "xMM574d918SG_i7f6tFPD",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.33043282694363,
			"x": -1082.6651833339097,
			"y": 392.8736831265827,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1884401276853573,
			"height": 7.987405343349235,
			"seed": 367742958,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2548,
			"versionNonce": 2134478805,
			"isDeleted": false,
			"id": "PumX9x4qspw_CD9Q8IVoN",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.2993692646569315,
			"x": -1090.1454081691093,
			"y": 418.46722120302957,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.015437461328267,
			"height": 18.29894110884873,
			"seed": 220491250,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2683,
			"versionNonce": 763546933,
			"isDeleted": false,
			"id": "6W_cQ3tq7OygsuyN498fz",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.938756218467832,
			"x": -1103.0009134610607,
			"y": 403.58310800005154,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1884401276853573,
			"height": 7.987405343349235,
			"seed": 404169262,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2800,
			"versionNonce": 779968149,
			"isDeleted": false,
			"id": "QJtzVzlzDxl-CTA1Fmgk1",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.829160445235754,
			"x": -1050.4494321677212,
			"y": 424.74714656418087,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.4917345266282833,
			"height": 4.617471446267002,
			"seed": 1912987570,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2972,
			"versionNonce": 1222558709,
			"isDeleted": false,
			"id": "VnWwhIrb1WSGwhkIvpCyp",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.49818137785806815,
			"x": -1059.1420230473602,
			"y": 428.39881205323127,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1438731318945865,
			"height": 7.65480669233386,
			"seed": 26127470,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2985,
			"versionNonce": 1353481557,
			"isDeleted": false,
			"id": "GbhAaTB2lClzd0n31M8Lw",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.809117217502431,
			"x": -1055.9227372754333,
			"y": 377.6694948616059,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.8771884437576465,
			"height": 10.706843635479597,
			"seed": 626202994,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2940,
			"versionNonce": 2101086901,
			"isDeleted": false,
			"id": "KcNLaDHZr7jyEjaFjLBk3",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.014839308967369,
			"x": -1078.0786798201927,
			"y": 374.04530238128564,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.353935257345782,
			"height": 7.364308683671784,
			"seed": 1612377774,
			"groupIds": [
				"KbFpO5POi36yO-bjjlRcm",
				"52aCOBB4WWDwd61bxnQXH",
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2830,
			"versionNonce": 2134043669,
			"isDeleted": false,
			"id": "W2uzNyu3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1142.8920849426074,
			"y": 455.4859618953658,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 140.48143005371094,
			"height": 32.50804164384153,
			"seed": 1985157938,
			"groupIds": [
				"bOzoIZy61A0P7UGeIwUsu"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 1988,
			"versionNonce": 1451663733,
			"isDeleted": false,
			"id": "is5cc0TM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -596.332445096924,
			"y": 414.7441518668593,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 123.90129089355469,
			"height": 43.78800418134342,
			"seed": 543484142,
			"groupIds": [
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 3139,
			"versionNonce": 1753000661,
			"isDeleted": false,
			"id": "0ElEA9ifaQkbnN5klJ3mM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -592.1918809464707,
			"y": 289.6835377949035,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 117.60938372045632,
			"height": 117.49676164749559,
			"seed": 862774514,
			"groupIds": [
				"hkJOWtdxZc1Y7jhkLW8S6",
				"kYXNwOkfF6EfNPZU1-jl7",
				"7E2x5C7ou8qK8dZTVVbRL",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2190,
			"versionNonce": 1437239349,
			"isDeleted": false,
			"id": "EVVzfJgKZXtCgXW-SzlTR",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -573.2367748951597,
			"y": 303.86791078644933,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 67.60229032344449,
			"height": 67.60229032344449,
			"seed": 838179630,
			"groupIds": [
				"tJ2Y5nwaztZkdSyIhbtHb",
				"7E2x5C7ou8qK8dZTVVbRL",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2288,
			"versionNonce": 267762069,
			"isDeleted": false,
			"id": "vESZKvL--cLuGvg2LPIA6",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -564.0377378170533,
			"y": 313.105105315047,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 49.50772463602171,
			"height": 49.50772463602171,
			"seed": 1176991410,
			"groupIds": [
				"tJ2Y5nwaztZkdSyIhbtHb",
				"7E2x5C7ou8qK8dZTVVbRL",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2377,
			"versionNonce": 814989045,
			"isDeleted": false,
			"id": "9pjVhJ4NEcna9DAkkj3FZ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -525.3400729520617,
			"y": 368.373524027367,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 28.324805162638814,
			"height": 31.23385135972594,
			"seed": 724960622,
			"groupIds": [
				"tJ2Y5nwaztZkdSyIhbtHb",
				"7E2x5C7ou8qK8dZTVVbRL",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2418,
			"versionNonce": 235542613,
			"isDeleted": false,
			"id": "Ago84y1_vglRfjcokLjtX",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -552.6403464141467,
			"y": 322.9375856216875,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.12043252812945,
			"height": 6.908084764438986,
			"seed": 1328140402,
			"groupIds": [
				"3hyOmnGXSrlzP0VSXS5BU",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3053,
			"versionNonce": 305022389,
			"isDeleted": false,
			"id": "t4VGa9mfl5X6LiUf7_N7G",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -552.4104302911187,
			"y": 326.71375939224026,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 24.60020080383713,
			"height": 26.00754423488317,
			"seed": 1836001198,
			"groupIds": [
				"3hyOmnGXSrlzP0VSXS5BU",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"version": 2435,
			"versionNonce": 1344653077,
			"isDeleted": false,
			"id": "u6AgjhKCTTQg1yrb5OBYd",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -541.6376368578296,
			"y": 333.3061198330038,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 3.0179884094428444,
			"height": 3.0179884094428444,
			"seed": 1111159346,
			"groupIds": [
				"3hyOmnGXSrlzP0VSXS5BU",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3275,
			"versionNonce": 1516641397,
			"isDeleted": false,
			"id": "aEDBKVxxSx8ETXOtD9E8B",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -540.9223249445943,
			"y": 332.8604488620397,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 18.766656221809924,
			"height": 13.878660841506111,
			"seed": 1221198318,
			"groupIds": [
				"3hyOmnGXSrlzP0VSXS5BU",
				"POmizD_M4fiibH6Y86hks",
				"Gq2KmnnnZT5KztcadcgjW"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917466722,
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
			"id": "VBfwcdmd",
			"type": "text",
			"x": -260.6046706984838,
			"y": 242.42641156784532,
			"width": 674.4962334104747,
			"height": 77.59248793793675,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"seed": 392848757,
			"version": 41,
			"versionNonce": 21645173,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917580702,
			"link": null,
			"locked": false,
			"text": "Replication Strategies",
			"rawText": "Replication Strategies",
			"fontSize": 62.0739903503494,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Replication Strategies",
			"lineHeight": 1.25
		},
		{
			"type": "frame",
			"version": 893,
			"versionNonce": 1737475122,
			"isDeleted": false,
			"id": "Y1F9G_aV8lvxkSjtSY6pH",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1723.9347335200598,
			"y": 201.21766060772256,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 2146.188263721955,
			"height": 1201.5320763221152,
			"seed": 771783730,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063539,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "3. Database"
		},
		{
			"type": "rectangle",
			"version": 3499,
			"versionNonce": 524395483,
			"isDeleted": false,
			"id": "_4r5H1ch1fc6RBcxB01oa",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2243.3077940203175,
			"y": 1230.115746534224,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 109.3594674450266,
			"height": 109.25474544469017,
			"seed": 83480917,
			"groupIds": [
				"skFRog2AxOre-RpRzh3CL",
				"t6s3GQzovj7GQz6LD9ZIP",
				"ggFHP7eIAb6IBhWgwIw5n",
				"SoPg6VRkZeYZW1psmaMnS",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2732,
			"versionNonce": 2092331131,
			"isDeleted": false,
			"id": "k5KZzybNyBQs5beL5Na00",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2268.9972480039387,
			"y": 1290.0943326600545,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 96.05911429546964,
			"height": 47.13158712368855,
			"seed": 1028020859,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1638,
			"versionNonce": 925411611,
			"isDeleted": false,
			"id": "hqMU-m--1Mn_2x68s75u3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2258.3347061518143,
			"y": 1276.8407349052636,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1690230453,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1693,
			"versionNonce": 604687803,
			"isDeleted": false,
			"id": "CerZj8M17CUNbcte6jj4Z",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2270.1389702660954,
			"y": 1276.4079188663386,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1915441947,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1713,
			"versionNonce": 1182752347,
			"isDeleted": false,
			"id": "XGy1ysitp8tEbuZviIjwK",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2282.4940899564044,
			"y": 1276.6046360180158,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 389758997,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1734,
			"versionNonce": 425253627,
			"isDeleted": false,
			"id": "E4mJUxqKVGF44vBxJ_wmf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2294.809860932902,
			"y": 1276.0144449368768,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 2099787707,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1776,
			"versionNonce": 421118875,
			"isDeleted": false,
			"id": "UZEfDqatZQJ8L3ug0RYfA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2306.4960723013883,
			"y": 1276.171826583435,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1919186293,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1680,
			"versionNonce": 234133563,
			"isDeleted": false,
			"id": "XVNSDguPfh7KN8-9cfy_2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2269.8045028964834,
			"y": 1264.9577997807478,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 744458331,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1704,
			"versionNonce": 365680859,
			"isDeleted": false,
			"id": "5ej7JpckUjaAZ6Y9Jqh9Z",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2282.198977904962,
			"y": 1265.1151880316547,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1904213717,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1728,
			"versionNonce": 1848771963,
			"isDeleted": false,
			"id": "rpAKnt4gR2LbbXXgDQH6G",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2294.750841164351,
			"y": 1265.115174822964,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 1705231611,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1747,
			"versionNonce": 2120850971,
			"isDeleted": false,
			"id": "q7ag6wLX16TBy55FTxXnp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2294.3376763671095,
			"y": 1253.0748316344857,
			"strokeColor": "#0091e2",
			"backgroundColor": "#0091e2",
			"width": 9.443413933166918,
			"height": 9.443413933166918,
			"seed": 186866741,
			"groupIds": [
				"hLKWkmzj7zZUJeVrAptXl",
				"1pcdp84oFocspFz7jdMDY",
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 2257,
			"versionNonce": 560276155,
			"isDeleted": false,
			"id": "CTwZr31H",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2241.154194409497,
			"y": 1348.5059631957718,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 111.94245910644531,
			"height": 42.41293532338311,
			"seed": 813133211,
			"groupIds": [
				"fBcNQdIukpoemHOtrW3h1"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 3453,
			"versionNonce": 801575771,
			"isDeleted": false,
			"id": "3Rj5pAxlAX8rSKmAWY1Bn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2084.2084541689965,
			"y": 1240.0082533919433,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 92.73381114783894,
			"height": 92.64500978085071,
			"seed": 1194593685,
			"groupIds": [
				"KX_vpiNw_vPYfMg-03yXQ",
				"uZCLMnWMzHjBUF6BD1LfI",
				"l1F1UYWR0d3gu0hu0Lnzp",
				"DcEQF3jAUD-t6MuVpBM7n",
				"lQ3oxtcEYRMQxYTYGmxNO"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1408,
			"versionNonce": 1239543803,
			"isDeleted": false,
			"id": "VUhZHsljZj5n-pWFaurxS",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2093.256276565851,
			"y": 1249.1753408539862,
			"strokeColor": "#000000",
			"backgroundColor": "#868e96",
			"width": 74.6381663541306,
			"height": 74.6381663541306,
			"seed": 852539,
			"groupIds": [
				"9CvnChCZ7SduAXIrab64Y",
				"lQ3oxtcEYRMQxYTYGmxNO"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 4955,
			"versionNonce": 1639463067,
			"isDeleted": false,
			"id": "gbWxfaKF0hLwaLZpl0KIu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2115.911009110516,
			"y": 1264.1483620339277,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 40.42845896405703,
			"height": 46.693371979623926,
			"seed": 350720757,
			"groupIds": [
				"9CvnChCZ7SduAXIrab64Y",
				"lQ3oxtcEYRMQxYTYGmxNO"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 2285,
			"versionNonce": 83651899,
			"isDeleted": false,
			"id": "RqUOW8uC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2083.820861076164,
			"y": 1340.709169975699,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 92.0501708984375,
			"height": 35.96499897442564,
			"seed": 1028063963,
			"groupIds": [
				"lQ3oxtcEYRMQxYTYGmxNO"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 452,
			"versionNonce": 1729170907,
			"isDeleted": false,
			"id": "B3dtTLX2NlybwUvKGYODq",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2445.654194409497,
			"y": 1218.5078778377008,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 106.33333333333326,
			"height": 106.33333333333326,
			"seed": 1623419989,
			"groupIds": [
				"EMc42jHe2AzDW66pj985m"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 761,
			"versionNonce": 721984123,
			"isDeleted": false,
			"id": "aZqBmKVk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2399.468695853996,
			"y": 1332.401597349531,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 191.79371643066406,
			"height": 33.54589430967364,
			"seed": 280489851,
			"groupIds": [
				"EMc42jHe2AzDW66pj985m"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
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
			"type": "arrow",
			"version": 652,
			"versionNonce": 1839567643,
			"isDeleted": false,
			"id": "grzS_4Ssot2CFN-vCTFEa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2310.054921650667,
			"y": 954.9118977755987,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 237.99163633207854,
			"height": 55.72484815753057,
			"seed": 1788680629,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.1487644411785,
				"gap": 7.865599552686529,
				"elementId": "fsm5Sdj5DBsMymSXvmdqM"
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
			"version": 509,
			"versionNonce": 257587131,
			"isDeleted": false,
			"id": "JvMBbwarnJaOtq1A14J_Z",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2394.0632853185884,
			"y": 571.1870496180682,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 236,
			"height": 76,
			"seed": 1822574619,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"focus": -0.5459276814084713,
				"gap": 14.686069499380096,
				"elementId": "_ZsGvAlRcDowR62nW-TFC"
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
			"version": 723,
			"versionNonce": 1045022811,
			"isDeleted": false,
			"id": "DfUle4dc6pLnN8CIt52L8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2372.0632853185884,
			"y": 375.5841877350106,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 228.0803302058298,
			"height": 213.41285114673167,
			"seed": 1536826133,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.342546804872001,
				"gap": 1.4595794677734375,
				"elementId": "wL9vNMYx3ZDjl3ZLZ3LzD"
			},
			"endBinding": {
				"focus": 0.053025073689851404,
				"gap": 1,
				"elementId": "9lerrlitkA1JfjMPT5UU0"
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
			"version": 526,
			"versionNonce": 1078330619,
			"isDeleted": false,
			"id": "J0_EC8_LoF6xucrVgoxvA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1975.171432705159,
			"y": 901.6702766073496,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 129.98314738657064,
			"height": 231.6174193220944,
			"seed": 1459129531,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.19711674509662427,
				"gap": 13.27182734010637,
				"elementId": "cXUaA0U8oFMBGrhyCohyx"
			},
			"endBinding": {
				"focus": 0.1786377627991464,
				"gap": 6.961068180698028,
				"elementId": "2MAKMhmDRbo6esQiZPYfg"
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
			"type": "arrow",
			"version": 409,
			"versionNonce": 2094116251,
			"isDeleted": false,
			"id": "M6G_oeWXMD7YT5wOCd5O6",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1853.3208610761635,
			"y": 1197.907679425002,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 155.55555555555566,
			"height": 17.77777777777783,
			"seed": 472903797,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.13538172405428375,
				"gap": 1.119211251777756,
				"elementId": "2MAKMhmDRbo6esQiZPYfg"
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
			"version": 701,
			"versionNonce": 1193230907,
			"isDeleted": false,
			"id": "AnzhTdE6nkgMBpuou1lJ3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1799.2999638991082,
			"y": 564.69218643803,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 67.98568215742239,
			"height": 220.3652751893477,
			"seed": 1935490395,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.31061866614034983,
				"gap": 12.000168780107586,
				"elementId": "FNmQfAdmn8giN9O-0CROq"
			},
			"endBinding": {
				"focus": 0.27924234783167035,
				"gap": 2.087165458837717,
				"elementId": "yE91JrzvXnCxJARGYme7E"
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
			"version": 491,
			"versionNonce": 1745961691,
			"isDeleted": false,
			"id": "L5SU1Rl9YHqvIaYvURUic",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1251.5827658380686,
			"y": 647.6645604023656,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 79,
			"height": 0.3321836128277482,
			"seed": 1780750805,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.1990573082134081,
				"gap": 2.7074526635618668,
				"elementId": "fpjZtxbPYY-GtapBHGLj_"
			},
			"endBinding": {
				"focus": 0.016909645559655108,
				"gap": 5.959579467773665,
				"elementId": "CPGM1wOhGjFYdz5Cg-tH3"
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
			"version": 451,
			"versionNonce": 1748643707,
			"isDeleted": false,
			"id": "F2d11fJZQq9sHqc4nxNKt",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2105.416099171402,
			"y": 301.3650206948437,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 46.66666666666674,
			"height": 294.9999999999999,
			"seed": 1294129659,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"focus": -0.7396892725560091,
				"gap": 12.022213821990931,
				"elementId": "z-4qKax2bgNG4aVerA1se"
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
			"version": 549,
			"versionNonce": 433883163,
			"isDeleted": false,
			"id": "10rZOqWWAaQkR_R87ajxG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1672.0483201077195,
			"y": 368.25458077682924,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 110.03444573034926,
			"height": 209.77710658468084,
			"seed": 780932917,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.5597483473665974,
				"gap": 16.80785017672666,
				"elementId": "k7_ZYiRB_aMiBfc5h3hgu"
			},
			"endBinding": {
				"focus": 3.114050634833699,
				"gap": 13.540776501307903,
				"elementId": "Z8NbbnY2cBJw61d3S-0gp"
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
			"version": 553,
			"versionNonce": 1659555003,
			"isDeleted": false,
			"id": "ii8RZK7lzTGMmmbSGiAo_",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1487.0827658380686,
			"y": 883.2691917234727,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 56.200202701718354,
			"height": 43.39384689373452,
			"seed": 1632363163,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.004779173689316546,
				"gap": 7.163904337001554,
				"elementId": "Q7nExiwcexcfyLzCNy-k2"
			},
			"endBinding": {
				"focus": 0.09584531512765687,
				"gap": 6.423398205862647,
				"elementId": "aekTVk7j0Z_eU3eGOHpG6"
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
			"version": 550,
			"versionNonce": 1191673179,
			"isDeleted": false,
			"id": "wcizZWpwVA1JpdMbphf1t",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1438.7494325047355,
			"y": 654.6983540281768,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 93.33333333333348,
			"height": 205,
			"seed": 332228757,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.8531279849182286,
				"gap": 12.747227193510877,
				"elementId": "BvhbJhFdMX9LgMsFFk2u3"
			},
			"endBinding": {
				"focus": -0.29224252582620075,
				"gap": 17.07840016347302,
				"elementId": "Q7nExiwcexcfyLzCNy-k2"
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
			"version": 443,
			"versionNonce": 830806523,
			"isDeleted": false,
			"id": "8kMuKsLf2dMYqU14lxfoh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1052.0827658380688,
			"y": 641.3650206948435,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 95,
			"height": 3.3333333333332575,
			"seed": 1753929531,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.48105050517775383,
				"gap": 29.070367869255733,
				"elementId": "jFm6joZU-3zl5YUsnvtU9"
			},
			"endBinding": {
				"focus": 0.04077443715531453,
				"gap": 4.833935525712263,
				"elementId": "fpjZtxbPYY-GtapBHGLj_"
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
			"type": "rectangle",
			"version": 663,
			"versionNonce": 2137399963,
			"isDeleted": false,
			"id": "gFML3OaACSxL0Uviol8Tv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 568.7942256485715,
			"y": 444.2568604556741,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 466.82823768028857,
			"height": 446.6046142578127,
			"seed": 1537052149,
			"groupIds": [
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 3
			},
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 627,
			"versionNonce": 1230837563,
			"isDeleted": false,
			"id": "xxGFTN9X",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 735.1907100235712,
			"y": 452.6464243829579,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 162.16014099121094,
			"height": 48.59421950120189,
			"seed": 1631729627,
			"groupIds": [
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1597,
			"versionNonce": 1842116571,
			"isDeleted": false,
			"id": "FOB3b5rJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 820.5858392543398,
			"y": 742.078863396835,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 196.07342529296875,
			"height": 35.79861612413039,
			"seed": 1963067221,
			"groupIds": [
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 3514,
			"versionNonce": 1522975867,
			"isDeleted": false,
			"id": "jFm6joZU-3zl5YUsnvtU9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 814.3887318869517,
			"y": 615.4080390323879,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 208.62366608186124,
			"height": 124.85891208837496,
			"seed": 1501856891,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2757,
			"versionNonce": 403602715,
			"isDeleted": false,
			"id": "l8YAraAiCi49loIB2jNF4",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 814.6791364154917,
			"y": 615.4435667216881,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 207.2467928616144,
			"height": 20.33987091745275,
			"seed": 1380996277,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2919,
			"versionNonce": 286663099,
			"isDeleted": false,
			"id": "2ctxq-6tFl7oOQtzG2Tvk",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 821.7103015574155,
			"y": 620.9641943720503,
			"strokeColor": "#000000",
			"backgroundColor": "#fa5252",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 2031369499,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2963,
			"versionNonce": 520106587,
			"isDeleted": false,
			"id": "mRqAo2OSDy7klOSM3soJd",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 838.4523793010105,
			"y": 620.9641943720503,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 2133718549,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3021,
			"versionNonce": 1386163963,
			"isDeleted": false,
			"id": "vvyIOSphS_KIR3BpOLlTa",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 855.9297423052774,
			"y": 621.6994796327476,
			"strokeColor": "#000000",
			"backgroundColor": "#40c057",
			"width": 8.159950728197234,
			"height": 8.159950728197234,
			"seed": 1264837051,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1279,
			"versionNonce": 2121635739,
			"isDeleted": false,
			"id": "F7TaeFrb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 870.6092293338195,
			"y": 652.7697966315482,
			"strokeColor": "#228be6",
			"backgroundColor": "#ffffff",
			"width": 17.283935546875,
			"height": 28.48914565861645,
			"seed": 1989176181,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1231,
			"versionNonce": 11922491,
			"isDeleted": false,
			"id": "uiqH8ZfP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 891.42822039204,
			"y": 652.7697966315482,
			"strokeColor": "#d9480f",
			"backgroundColor": "#ffffff",
			"width": 12.136001586914062,
			"height": 28.48914565861645,
			"seed": 1234563675,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1238,
			"versionNonce": 1296215259,
			"isDeleted": false,
			"id": "vWsn1QF2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 907.864265964319,
			"y": 652.7697966315482,
			"strokeColor": "#fab005",
			"backgroundColor": "#ffffff",
			"width": 12.136001586914062,
			"height": 28.48914565861645,
			"seed": 951923925,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1245,
			"versionNonce": 934173051,
			"isDeleted": false,
			"id": "AypVZqEZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 923.2045751651115,
			"y": 652.7697966315482,
			"strokeColor": "#228be6",
			"backgroundColor": "#ffffff",
			"width": 10.9749755859375,
			"height": 28.489145658616444,
			"seed": 612167419,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1247,
			"versionNonce": 2101047835,
			"isDeleted": false,
			"id": "1GbamHUI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 936.3534116229341,
			"y": 652.7697966315482,
			"strokeColor": "#5c940d",
			"backgroundColor": "#ffffff",
			"width": 5.7613067626953125,
			"height": 28.489145658616444,
			"seed": 558486069,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1234,
			"versionNonce": 249329339,
			"isDeleted": false,
			"id": "Omc5Fl1v",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 945.1193025948153,
			"y": 652.7697966315482,
			"strokeColor": "#d9480f",
			"backgroundColor": "#ffffff",
			"width": 11.982650756835938,
			"height": 28.48914565861645,
			"seed": 1318803355,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402559,
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
			"version": 1168,
			"versionNonce": 456386395,
			"isDeleted": false,
			"id": "BPE7rCEkMqJRwDfBwnUFP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 849.668489789881,
			"y": 687.1393941504684,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 134.16683126408196,
			"height": 19.771954081022606,
			"seed": 2098971541,
			"groupIds": [
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 1
			},
			"boundElements": null,
			"updated": 1714917402559,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1204,
			"versionNonce": 1486111739,
			"isDeleted": false,
			"id": "0E39v-MRDPGGtBqsXXV7O",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 967.5940730588347,
			"y": 692.0823826707237,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.835099044411467,
			"height": 6.735436020634421,
			"seed": 1176742971,
			"groupIds": [
				"KsNSfkLAw798tNobx8t2t",
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1202,
			"versionNonce": 251661467,
			"isDeleted": false,
			"id": "qdAoVZHNqZwQ3NfmzJ8dC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 975.2587862393705,
			"y": 698.7578950944503,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.9862784611917985,
			"height": 5.085941484968847,
			"seed": 1617463541,
			"groupIds": [
				"KsNSfkLAw798tNobx8t2t",
				"kvKTVKGK9a1t7RdLaxMqQ",
				"gGm3HEoXIDkmldsfObgAH",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1593,
			"versionNonce": 1646903611,
			"isDeleted": false,
			"id": "Of0QPOl3",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 622.9435371275645,
			"y": 755.0905952881899,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 85.75489807128906,
			"height": 38.34606664685638,
			"seed": 519597275,
			"groupIds": [
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2538,
			"versionNonce": 1534321115,
			"isDeleted": false,
			"id": "cA4e3exnFGkyfdEmG4XY-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 586.4251368619834,
			"y": 508.2586808212541,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 158.88799360370288,
			"height": 242.99796412645367,
			"seed": 1018536533,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 1
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2760,
			"versionNonce": 871427707,
			"isDeleted": false,
			"id": "b8anPhcmaqNIFdmP6vfjR",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 593.8117292400229,
			"y": 516.7816637765081,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 142.48575746374448,
			"height": 226.6954840610708,
			"seed": 1286347131,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 1
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2775,
			"versionNonce": 1583572763,
			"isDeleted": false,
			"id": "MmZZ9OQioQLbdp8SX3gdQ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 661.8978926607037,
			"y": 514.6854028408898,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 9.8015549628143,
			"height": 9.8015549628143,
			"seed": 920162229,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2429,
			"versionNonce": 1363004347,
			"isDeleted": false,
			"id": "jaGrUqESlpM7aXQsDvQpy",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 600.5037667420825,
			"y": 533.1555465383553,
			"strokeColor": "#000000",
			"backgroundColor": "#15aabf",
			"width": 128.02124883833554,
			"height": 59.75125078684551,
			"seed": 746664475,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2458,
			"versionNonce": 279092315,
			"isDeleted": false,
			"id": "S0_n1r607Fp5q1tBWedTj",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 609.1472357119828,
			"y": 605.3720229509581,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 44.82786000305885,
			"height": 34.901277498386165,
			"seed": 1022808341,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2507,
			"versionNonce": 2019842299,
			"isDeleted": false,
			"id": "zTeuLMvHC-NHouiuZ7Qmu",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 680.8549645758235,
			"y": 672.2506113218992,
			"strokeColor": "#000000",
			"backgroundColor": "#fab005",
			"width": 40.50612551810942,
			"height": 29.499109392199383,
			"seed": 1332360891,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1454,
			"versionNonce": 1174765979,
			"isDeleted": false,
			"id": "ljFj2PUV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 662.2124169703347,
			"y": 602.2167773500505,
			"strokeColor": "#495057",
			"backgroundColor": "transparent",
			"width": 71.6641845703125,
			"height": 58.3434155468175,
			"seed": 1552279157,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1497,
			"versionNonce": 1656264251,
			"isDeleted": false,
			"id": "7RIEY13b",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 80,
			"angle": 0,
			"x": 603.3287846128974,
			"y": 649.7252060853102,
			"strokeColor": "#495057",
			"backgroundColor": "transparent",
			"width": 71.6641845703125,
			"height": 58.3434155468175,
			"seed": 67741531,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2560,
			"versionNonce": 1835013851,
			"isDeleted": false,
			"id": "ySPkW-xL56cv8VCeWAOX1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 601.728553135089,
			"y": 710.0724516414043,
			"strokeColor": "#000000",
			"backgroundColor": "#15aabf",
			"width": 128.02124883833554,
			"height": 20.571573995492262,
			"seed": 1481330645,
			"groupIds": [
				"FF2T4Ebc_1PKU6Dr-7YyK",
				"zD9upmPUUrRmz6TPtsE1D",
				"1P6o9HgI5Z-EhCLAwjPPd"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 1
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 2274,
			"versionNonce": 76448635,
			"isDeleted": false,
			"id": "-21WxF2K3h_MZ980osjif",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2063.098176237231,
			"y": 596.825354763938,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 229.15595246467387,
			"height": 21.81624030867613,
			"seed": 548537339,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.9474665456192557,
				"gap": 14.861936421465202,
				"elementId": "OwN9_dxwhcR5FCMLxFj20"
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
			"version": 1958,
			"versionNonce": 1350982683,
			"isDeleted": false,
			"id": "pRVdh86ssUDcRz7J50eIX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1768.3187443169293,
			"y": 605.1242775033871,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 178.32766752377063,
			"height": 148.368513056275,
			"seed": 2119994677,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 1.2649463339007112,
				"gap": 12.695682290491959,
				"elementId": "-cONoYIglNrTqsI03Zpbd"
			},
			"endBinding": {
				"focus": 1.4334399177492558,
				"gap": 10.745986782836212,
				"elementId": "18880SWSffZthMGrbl3rH"
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
			"version": 1400,
			"versionNonce": 1295655099,
			"isDeleted": false,
			"id": "mNuF6rQOGj-DssQ6S2QTj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2011.1644247807383,
			"y": 840.4082552179424,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 173.64659400760388,
			"height": 193.43332681199524,
			"seed": 224775323,
			"groupIds": [],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 1.0556238155401163,
				"gap": 8.830522124555955,
				"elementId": "cXUaA0U8oFMBGrhyCohyx"
			},
			"endBinding": {
				"focus": 0.32153799547805806,
				"gap": 8.965207504809598,
				"elementId": "FNmQfAdmn8giN9O-0CROq"
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
			"version": 939,
			"versionNonce": 1414287707,
			"isDeleted": false,
			"id": "aekTVk7j0Z_eU3eGOHpG6",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1539.4984398913602,
			"y": 752.7368690944963,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 1042226837,
			"groupIds": [
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 884,
			"versionNonce": 1729064443,
			"isDeleted": false,
			"id": "18880SWSffZthMGrbl3rH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1559.6267793253637,
			"y": 764.2387773424983,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 232227131,
			"groupIds": [
				"_Vz3b2x0X1Lc0n_z1EV1i",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 857,
			"versionNonce": 948303515,
			"isDeleted": false,
			"id": "_IoIEqBIfdkWg42dGY52h",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1566.815471980365,
			"y": 771.4274699974995,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2118681589,
			"groupIds": [
				"_Vz3b2x0X1Lc0n_z1EV1i",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 859,
			"versionNonce": 2002938683,
			"isDeleted": false,
			"id": "VZofknVqBEAVG9BSv0-FU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1566.096602714865,
			"y": 783.6482475110017,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1265213915,
			"groupIds": [
				"_Vz3b2x0X1Lc0n_z1EV1i",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 868,
			"versionNonce": 1476873179,
			"isDeleted": false,
			"id": "ZeujhHiFVZhLbdIWi7nb7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1566.096602714865,
			"y": 798.0256328210043,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 853425493,
			"groupIds": [
				"_Vz3b2x0X1Lc0n_z1EV1i",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 937,
			"versionNonce": 1585911931,
			"isDeleted": false,
			"id": "G68gE_bdFB7pPNLLqCEB_",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1573.2852953698662,
			"y": 780.0539011835011,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 523153019,
			"groupIds": [
				"HY9NRVBLRnFGD8OXTmKSu",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 911,
			"versionNonce": 1755599131,
			"isDeleted": false,
			"id": "KY742jcrE4Ns_6PqadxD2",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1580.4739880248674,
			"y": 787.2425938385023,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 859163317,
			"groupIds": [
				"HY9NRVBLRnFGD8OXTmKSu",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 913,
			"versionNonce": 2010215867,
			"isDeleted": false,
			"id": "P34rjKnCZCPgHFWJTykKB",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1579.7551187593672,
			"y": 799.4633713520045,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 468264731,
			"groupIds": [
				"HY9NRVBLRnFGD8OXTmKSu",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 922,
			"versionNonce": 993068635,
			"isDeleted": false,
			"id": "gicKAIkd83gJTkNzfiaKw",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1579.7551187593672,
			"y": 813.8407566620069,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1341434901,
			"groupIds": [
				"HY9NRVBLRnFGD8OXTmKSu",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 921,
			"versionNonce": 1502970619,
			"isDeleted": false,
			"id": "OAfDG7hYoxGvgerg42LpD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1589.100419210869,
			"y": 790.1180709005029,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1477151675,
			"groupIds": [
				"nEUgmnLCmHR71LN1PGD98",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 895,
			"versionNonce": 2072079259,
			"isDeleted": false,
			"id": "Yf6XAhaYW4Q-YbpPSE-12",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1596.2891118658702,
			"y": 797.3067635555041,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 688939381,
			"groupIds": [
				"nEUgmnLCmHR71LN1PGD98",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 897,
			"versionNonce": 354893883,
			"isDeleted": false,
			"id": "lUDpw9tuyAVXsF7sJ8rr3",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1595.57024260037,
			"y": 809.5275410690062,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2008570971,
			"groupIds": [
				"nEUgmnLCmHR71LN1PGD98",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 906,
			"versionNonce": 1885962459,
			"isDeleted": false,
			"id": "ZNJzawSz1ZwJF3veolBds",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1595.57024260037,
			"y": 823.9049263790088,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1137601237,
			"groupIds": [
				"nEUgmnLCmHR71LN1PGD98",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 938,
			"versionNonce": 1994042747,
			"isDeleted": false,
			"id": "N0bSwxozluZ6gtApe_kqT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1600.6023274588708,
			"y": 803.0577176795051,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1992431867,
			"groupIds": [
				"O-Dr7_cUspH7tlxx2euKZ",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 912,
			"versionNonce": 1002259995,
			"isDeleted": false,
			"id": "gVkUOQ-na2jkTJF4fInkX",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1607.791020113872,
			"y": 810.2464103345063,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1623476277,
			"groupIds": [
				"O-Dr7_cUspH7tlxx2euKZ",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 914,
			"versionNonce": 1174653627,
			"isDeleted": false,
			"id": "lQriSnF2hjS9aVchKpAh2",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1607.072150848372,
			"y": 822.4671878480085,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 850084251,
			"groupIds": [
				"O-Dr7_cUspH7tlxx2euKZ",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 923,
			"versionNonce": 441498459,
			"isDeleted": false,
			"id": "BWZxZ1_ACBxiwXfV5HqMI",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1607.072150848372,
			"y": 836.844573158011,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 299334037,
			"groupIds": [
				"O-Dr7_cUspH7tlxx2euKZ",
				"VsWpxxFIfrvRKmGTbRjmy",
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 844,
			"versionNonce": 83269627,
			"isDeleted": false,
			"id": "4vYQ7kkP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1551.0003481393624,
			"y": 863.4427359815156,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 97.05978393554688,
			"height": 71.88692655001252,
			"seed": 883316283,
			"groupIds": [
				"UmRe5-BxmUIhucOrhXYZG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1424,
			"versionNonce": 603447451,
			"isDeleted": false,
			"id": "9lerrlitkA1JfjMPT5UU0",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2057.8317732246933,
			"y": 581.0702024278297,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 272465653,
			"groupIds": [
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1369,
			"versionNonce": 822547771,
			"isDeleted": false,
			"id": "OwN9_dxwhcR5FCMLxFj20",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2077.9601126586967,
			"y": 592.5721106758317,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 999675611,
			"groupIds": [
				"Q_sYX22mDUUyzAvPTtQ0Y",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1340,
			"versionNonce": 193377755,
			"isDeleted": false,
			"id": "Ynsv0Q-N-dqojQR6jVWrp",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2085.148805313698,
			"y": 599.7608033308329,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1383848021,
			"groupIds": [
				"Q_sYX22mDUUyzAvPTtQ0Y",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1342,
			"versionNonce": 42549883,
			"isDeleted": false,
			"id": "qiW2QoucC8amnyf2g8DrA",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2084.429936048198,
			"y": 611.9815808443351,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 101467003,
			"groupIds": [
				"Q_sYX22mDUUyzAvPTtQ0Y",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1351,
			"versionNonce": 1590770459,
			"isDeleted": false,
			"id": "53rkvx8jgM3UU2FoibvO0",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2084.429936048198,
			"y": 626.3589661543376,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1650984373,
			"groupIds": [
				"Q_sYX22mDUUyzAvPTtQ0Y",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1421,
			"versionNonce": 751902651,
			"isDeleted": false,
			"id": "z-4qKax2bgNG4aVerA1se",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2091.618628703199,
			"y": 608.3872345168345,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1548491803,
			"groupIds": [
				"WAsYyp9aeztkIHw4XS5cx",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1394,
			"versionNonce": 1185640539,
			"isDeleted": false,
			"id": "HE8ekIkglr9DBG-8uMD_j",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2098.8073213582,
			"y": 615.5759271718357,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1931970325,
			"groupIds": [
				"WAsYyp9aeztkIHw4XS5cx",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1396,
			"versionNonce": 506637563,
			"isDeleted": false,
			"id": "IRMS1K9StkfsMuZGCnhLD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2098.0884520927,
			"y": 627.7967046853379,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1514660027,
			"groupIds": [
				"WAsYyp9aeztkIHw4XS5cx",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1405,
			"versionNonce": 1189696923,
			"isDeleted": false,
			"id": "jyP0e7MLIW9vAxSqTPfAx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2098.0884520927,
			"y": 642.1740899953403,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 925883509,
			"groupIds": [
				"WAsYyp9aeztkIHw4XS5cx",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1404,
			"versionNonce": 1073867323,
			"isDeleted": false,
			"id": "8m9PehPvj_PNVLqpbLa78",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2107.433752544202,
			"y": 618.4514042338362,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 2040664411,
			"groupIds": [
				"l5yMwBi73EjVeUWYjyyHU",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1378,
			"versionNonce": 2120149723,
			"isDeleted": false,
			"id": "GXkREVjlaDnCuE0_bPMZ7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2114.622445199203,
			"y": 625.6400968888374,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1984333269,
			"groupIds": [
				"l5yMwBi73EjVeUWYjyyHU",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1380,
			"versionNonce": 915593083,
			"isDeleted": false,
			"id": "DJcndG3J2UqjE-XBiW_a1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2113.903575933703,
			"y": 637.8608744023396,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1538076155,
			"groupIds": [
				"l5yMwBi73EjVeUWYjyyHU",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1389,
			"versionNonce": 1725968411,
			"isDeleted": false,
			"id": "rYe79u-vQjV-_xdDa1spo",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2113.903575933703,
			"y": 652.2382597123421,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1669399349,
			"groupIds": [
				"l5yMwBi73EjVeUWYjyyHU",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1422,
			"versionNonce": 557413563,
			"isDeleted": false,
			"id": "_ZsGvAlRcDowR62nW-TFC",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2118.9356607922036,
			"y": 631.3910510128385,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1399568027,
			"groupIds": [
				"vlbfK4TVXloyRZv35nv2B",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1395,
			"versionNonce": 356590939,
			"isDeleted": false,
			"id": "ySpTfbAY2N3jMP8MOUT_R",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2126.124353447205,
			"y": 638.5797436678397,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 860148885,
			"groupIds": [
				"vlbfK4TVXloyRZv35nv2B",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1397,
			"versionNonce": 1514783227,
			"isDeleted": false,
			"id": "oNJbLRO6v_0gO18i-pb2e",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2125.405484181705,
			"y": 650.8005211813419,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 797977403,
			"groupIds": [
				"vlbfK4TVXloyRZv35nv2B",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1406,
			"versionNonce": 2035665563,
			"isDeleted": false,
			"id": "InCWphpnS6Vz0XhZALfoe",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2125.405484181705,
			"y": 665.1779064913444,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1900509685,
			"groupIds": [
				"vlbfK4TVXloyRZv35nv2B",
				"hU6X8S7iEcLD_wxMOeWn7",
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1334,
			"versionNonce": 924303163,
			"isDeleted": false,
			"id": "gNq7u2wW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2069.3336814726954,
			"y": 691.776069314849,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 116.40850830078125,
			"height": 71.88692655001252,
			"seed": 1149045723,
			"groupIds": [
				"mRLEbj7pjah9V9iGcfMnJ"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1993,
			"versionNonce": 502407131,
			"isDeleted": false,
			"id": "uGr323pjVzCNn9SbjjR85",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1967.8317732246915,
			"y": 837.7368690944963,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 378434389,
			"groupIds": [
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1942,
			"versionNonce": 1207397499,
			"isDeleted": false,
			"id": "cXUaA0U8oFMBGrhyCohyx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1987.960112658695,
			"y": 849.2387773424983,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 910481531,
			"groupIds": [
				"qRIHO1ypMLl9-7gFEQzmL",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1914,
			"versionNonce": 1760175387,
			"isDeleted": false,
			"id": "I2sWSWtrnRzJsoHKiZ46K",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1995.1488053136961,
			"y": 856.4274699974995,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1601126581,
			"groupIds": [
				"qRIHO1ypMLl9-7gFEQzmL",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1915,
			"versionNonce": 406636987,
			"isDeleted": false,
			"id": "r7xvmNskcSe21uSfPteN-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1994.4299360481962,
			"y": 868.6482475110017,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 44699931,
			"groupIds": [
				"qRIHO1ypMLl9-7gFEQzmL",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1924,
			"versionNonce": 1527896667,
			"isDeleted": false,
			"id": "f6adpfOqWQrkX_CfK3f6K",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1994.4299360481962,
			"y": 883.0256328210043,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1636786709,
			"groupIds": [
				"qRIHO1ypMLl9-7gFEQzmL",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1996,
			"versionNonce": 1849415419,
			"isDeleted": false,
			"id": "fSInNrLpVlVTeB5ST4EdT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2001.6186287031974,
			"y": 865.0539011835011,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1260336571,
			"groupIds": [
				"Z7H0KoWVA1gqiKAthqJle",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1967,
			"versionNonce": 1346191259,
			"isDeleted": false,
			"id": "dutXXwnhKylcrzebOIy4y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2008.8073213581986,
			"y": 872.2425938385023,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1642354549,
			"groupIds": [
				"Z7H0KoWVA1gqiKAthqJle",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1969,
			"versionNonce": 189305915,
			"isDeleted": false,
			"id": "owyZYdHTdqvd_pUOM-S3i",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2008.0884520926984,
			"y": 884.4633713520045,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1590085211,
			"groupIds": [
				"Z7H0KoWVA1gqiKAthqJle",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1978,
			"versionNonce": 1061180635,
			"isDeleted": false,
			"id": "QgERU0QoDMd5GkosYMTnF",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2008.0884520926984,
			"y": 898.8407566620069,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1790157013,
			"groupIds": [
				"Z7H0KoWVA1gqiKAthqJle",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1977,
			"versionNonce": 1807155579,
			"isDeleted": false,
			"id": "I8h9gHvtf-WSzlu8ynMIf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2017.4337525442002,
			"y": 875.1180709005029,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 74662651,
			"groupIds": [
				"JoL3pKo_52LXqEc2zeIGp",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1951,
			"versionNonce": 2045712923,
			"isDeleted": false,
			"id": "HsUmJKW374RIIqptWdSnx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2024.6224451992014,
			"y": 882.3067635555041,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 563265077,
			"groupIds": [
				"JoL3pKo_52LXqEc2zeIGp",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1953,
			"versionNonce": 115023547,
			"isDeleted": false,
			"id": "uMyzb1qwwei1gt6nzh_uW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2023.9035759337012,
			"y": 894.5275410690062,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 78064539,
			"groupIds": [
				"JoL3pKo_52LXqEc2zeIGp",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1962,
			"versionNonce": 1830653787,
			"isDeleted": false,
			"id": "6_Sm19ssfAyqS5n4y6VG3",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2023.9035759337012,
			"y": 908.9049263790088,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1567043477,
			"groupIds": [
				"JoL3pKo_52LXqEc2zeIGp",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1994,
			"versionNonce": 252242939,
			"isDeleted": false,
			"id": "Vp6yM1IOmNHQbA1yMzaw9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2028.935660792202,
			"y": 888.0577176795051,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1939144763,
			"groupIds": [
				"EHsG-McEnwYyyurotp1_T",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1968,
			"versionNonce": 1621079195,
			"isDeleted": false,
			"id": "yBIYjcgav1QAlBdfQMVaa",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2036.1243534472032,
			"y": 895.2464103345063,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2087089397,
			"groupIds": [
				"EHsG-McEnwYyyurotp1_T",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1970,
			"versionNonce": 831809851,
			"isDeleted": false,
			"id": "Vhd3dvyoeWaeA2bHcx6Mf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2035.4054841817033,
			"y": 907.4671878480085,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 991903963,
			"groupIds": [
				"EHsG-McEnwYyyurotp1_T",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1979,
			"versionNonce": 927566299,
			"isDeleted": false,
			"id": "dKZbmnW82IgfUQfH_ukaN",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2035.4054841817033,
			"y": 921.844573158011,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 2048265813,
			"groupIds": [
				"EHsG-McEnwYyyurotp1_T",
				"bcVAuMRnCNOs-xABt8O5g",
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1959,
			"versionNonce": 1456576123,
			"isDeleted": false,
			"id": "j3d1NMMa",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1969.3336814726936,
			"y": 948.4427359815156,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 124.4010009765625,
			"height": 107.83038982501878,
			"seed": 1691905403,
			"groupIds": [
				"iFcE39u9xhveYSlrqzEqz"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1910,
			"versionNonce": 787418907,
			"isDeleted": false,
			"id": "FNmQfAdmn8giN9O-0CROq",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1737.6908971956566,
			"y": 575.2476556786747,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 96.69309462915602,
			"height": 94.18158567774937,
			"seed": 1162574773,
			"groupIds": [
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1860,
			"versionNonce": 1645507515,
			"isDeleted": false,
			"id": "s77PWfd9_Xtnkf5dCZg93",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1755.271459855503,
			"y": 585.2936914843013,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 604177947,
			"groupIds": [
				"MY_CEoWmfRDa_XrecFKp9",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1832,
			"versionNonce": 543442011,
			"isDeleted": false,
			"id": "Z8NbbnY2cBJw61d3S-0gp",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1761.5502322340199,
			"y": 591.5724638628179,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1445739797,
			"groupIds": [
				"MY_CEoWmfRDa_XrecFKp9",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1832,
			"versionNonce": 1907425531,
			"isDeleted": false,
			"id": "FreCU-uuKDb8QArTh7b_p",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1760.922354996168,
			"y": 602.2463769062962,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 529631931,
			"groupIds": [
				"MY_CEoWmfRDa_XrecFKp9",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1842,
			"versionNonce": 1065167259,
			"isDeleted": false,
			"id": "boA0sxDdmKF0MoPHBmXA9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1760.922354996168,
			"y": 614.8039216633294,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 70111861,
			"groupIds": [
				"MY_CEoWmfRDa_XrecFKp9",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1910,
			"versionNonce": 519781947,
			"isDeleted": false,
			"id": "ILHKX040sdupKFSXalx7t",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1767.2011273746848,
			"y": 599.1069907170379,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 2082896731,
			"groupIds": [
				"q0A_AKT0YILtfrebXnpkN",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1884,
			"versionNonce": 1527627483,
			"isDeleted": false,
			"id": "0U-j2A5cUqnya3gLVWe08",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1773.4798997532012,
			"y": 605.3857630955546,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 471186389,
			"groupIds": [
				"q0A_AKT0YILtfrebXnpkN",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1887,
			"versionNonce": 1044851579,
			"isDeleted": false,
			"id": "uNwXQ32mX8qkF2Rj6SATc",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1772.8520225153497,
			"y": 616.0596761390328,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 638867451,
			"groupIds": [
				"q0A_AKT0YILtfrebXnpkN",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1895,
			"versionNonce": 485098523,
			"isDeleted": false,
			"id": "pvDl7-1UapXyuO-R6VnKu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1772.8520225153497,
			"y": 628.617220896066,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 905541941,
			"groupIds": [
				"q0A_AKT0YILtfrebXnpkN",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1895,
			"versionNonce": 518572219,
			"isDeleted": false,
			"id": "-cONoYIglNrTqsI03Zpbd",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1781.0144266074212,
			"y": 607.8972720469611,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 1532862619,
			"groupIds": [
				"LEaRXaQiVuCcwJGHxzR9D",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1868,
			"versionNonce": 1239808347,
			"isDeleted": false,
			"id": "aGm4uvJnG8qvp3EVbv6xI",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1787.293198985938,
			"y": 614.1760444254778,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1262389909,
			"groupIds": [
				"LEaRXaQiVuCcwJGHxzR9D",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1870,
			"versionNonce": 1261704699,
			"isDeleted": false,
			"id": "tPFbJTwVTAH764qfuAuHx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1786.6653217480862,
			"y": 624.8499574689561,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1974785339,
			"groupIds": [
				"LEaRXaQiVuCcwJGHxzR9D",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1879,
			"versionNonce": 30776987,
			"isDeleted": false,
			"id": "Nv0S6IB6klSolpTbCGcZO",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1786.6653217480862,
			"y": 637.4075022259893,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 211447797,
			"groupIds": [
				"LEaRXaQiVuCcwJGHxzR9D",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1912,
			"versionNonce": 1216156475,
			"isDeleted": false,
			"id": "5RPTG4rsQK-a-WV5rngdq",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1791.0604624130478,
			"y": 619.1990623282911,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 21.34782608695653,
			"height": 42.69565217391307,
			"seed": 1954313691,
			"groupIds": [
				"PLF6XEUecXgi35WrHFocX",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1887,
			"versionNonce": 2139943899,
			"isDeleted": false,
			"id": "VAZ9OfHU4Vl5Ckq6Cqqsz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1797.3392347915646,
			"y": 625.4778347068077,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 2014488917,
			"groupIds": [
				"PLF6XEUecXgi35WrHFocX",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1887,
			"versionNonce": 1461174395,
			"isDeleted": false,
			"id": "8crwGFNh-QxuQasKGd2ET",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1796.7113575537128,
			"y": 636.151747750286,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 1187447419,
			"groupIds": [
				"PLF6XEUecXgi35WrHFocX",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1896,
			"versionNonce": 1491073307,
			"isDeleted": false,
			"id": "QVtypsth7bsuORS44hRh5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1796.7113575537128,
			"y": 648.7092925073192,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 11.301790281329925,
			"height": 3.7672634271099747,
			"seed": 788313781,
			"groupIds": [
				"PLF6XEUecXgi35WrHFocX",
				"LIjEFq5mnoVJeMGhqmaGG",
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1900,
			"versionNonce": 844635579,
			"isDeleted": false,
			"id": "ylHFExAT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1705.8784504778391,
			"y": 676.1265985601752,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 203.43548583984375,
			"height": 62.78772378516625,
			"seed": 1431763739,
			"groupIds": [
				"5GSVNE7_xvztNcSeR5NKm"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2277,
			"versionNonce": 1050848859,
			"isDeleted": false,
			"id": "8yqEqizz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2391.9750374285572,
			"y": 435.08741714953146,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.142822265625,
			"height": 37.27579646895363,
			"seed": 201201685,
			"groupIds": [
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2034,
			"versionNonce": 1351756539,
			"isDeleted": false,
			"id": "wL9vNMYx3ZDjl3ZLZ3LzD",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2373.522864786362,
			"y": 326.1019273167067,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 101.08084106445294,
			"height": 101.08084106445294,
			"seed": 1285480379,
			"groupIds": [
				"xeWc14c00oJtGVDlk4Mn7",
				"lf58h6uSiR1ZmlTvUVF-Z",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2886,
			"versionNonce": 1017713563,
			"isDeleted": false,
			"id": "nt1UTdVNCV1Q_CzTHPVvL",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 2452.3943385133416,
			"y": 402.7194955537801,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.012737581657009,
			"height": 10.57610619368553,
			"seed": 2030849397,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2779,
			"versionNonce": 588900411,
			"isDeleted": false,
			"id": "tSUiNG2Z6hZSNT8DoJtwZ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.029928014204294584,
			"x": 2457.8351605071457,
			"y": 337.2243664970772,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.57665040349346,
			"height": 11.163737885090274,
			"seed": 650195035,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3386,
			"versionNonce": 2043095259,
			"isDeleted": false,
			"id": "QWhxDyx1Ihy0xoRub1BpM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.765434113477622,
			"x": 2464.3878719749446,
			"y": 407.597769213996,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.914795147667562,
			"height": 7.805897785531529,
			"seed": 91018965,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3604,
			"versionNonce": 1447253371,
			"isDeleted": false,
			"id": "sSqkZiUoiFmw4Il91jDGF",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.48666424209895,
			"x": 2391.246468249317,
			"y": 336.22461162385116,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 1972399355,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2980,
			"versionNonce": 2010181147,
			"isDeleted": false,
			"id": "hXQHSsz35ai1U5B3acE9N",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 2386.247201055261,
			"y": 338.2960543093975,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.012737581657009,
			"height": 10.57610619368553,
			"seed": 1001731125,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2843,
			"versionNonce": 291664571,
			"isDeleted": false,
			"id": "rb4_cJk-Z59SKSkesSG7Q",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.06885648930104615,
			"x": 2394.049786970728,
			"y": 402.33329857658873,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 7.57665040349346,
			"height": 11.163737885090274,
			"seed": 1821316507,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3613,
			"versionNonce": 1402626907,
			"isDeleted": false,
			"id": "l0RYj5fCcddcDK1_ubym_",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.854199750177644,
			"x": 2462.8627330804247,
			"y": 334.996828973967,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 936043925,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3607,
			"versionNonce": 919289851,
			"isDeleted": false,
			"id": "HFIolhhrLV6khom_GW1Jg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.663921886409196,
			"x": 2391.2897391156607,
			"y": 408.93991425345587,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.065410662827956,
			"height": 6.8785352962834105,
			"seed": 720349755,
			"groupIds": [
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 4536,
			"versionNonce": 83331227,
			"isDeleted": false,
			"id": "rQ7BjtNfdGqe9Mg5jRrKR",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2404.352765524186,
			"y": 353.49379625499637,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.9329596882709,
			"height": 57.344099073364674,
			"seed": 2095278837,
			"groupIds": [
				"ZrHT091a8YF6YjON3zSk1",
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2693,
			"versionNonce": 600948027,
			"isDeleted": false,
			"id": "UFguR7z6gtak_b9srcjvz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2404.220464759022,
			"y": 347.9832733408655,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 35.869338881988476,
			"height": 9.75268955332379,
			"seed": 1167370971,
			"groupIds": [
				"ZrHT091a8YF6YjON3zSk1",
				"mz-Hu6t4rRMOnzgkgk2Ta",
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2534,
			"versionNonce": 515661275,
			"isDeleted": false,
			"id": "DeTg4EfY0VV3o9U-eoeDS",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2404.8412745670657,
			"y": 367.6499946959632,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.2689376620743,
			"height": 4.531369714274167,
			"seed": 193217621,
			"groupIds": [
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2562,
			"versionNonce": 1892280955,
			"isDeleted": false,
			"id": "cnRdNvjW48AuDgsFdR_sh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2403.843950414407,
			"y": 384.3223476795239,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.2689376620743,
			"height": 4.531369714274167,
			"seed": 286300027,
			"groupIds": [
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 5654,
			"versionNonce": 247259931,
			"isDeleted": false,
			"id": "icDkD51kh0DxHce1ESc0R",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.034244644020102,
			"x": 2403.486733918753,
			"y": 363.63689817638806,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 14.463571016844513,
			"height": 25.532582515865883,
			"seed": 931328437,
			"groupIds": [
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.17059876156316842,
				"gap": 9.292283166223374,
				"elementId": "UFguR7z6gtak_b9srcjvz"
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
			"version": 5699,
			"versionNonce": 822593467,
			"isDeleted": false,
			"id": "xoEbhMKKdauctfarT8EIN",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.31086799431261625,
			"x": 2439.75872368852,
			"y": 363.63945048893675,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 16.442530389432445,
			"height": 28.10295050046834,
			"seed": 732295195,
			"groupIds": [
				"YQubeuWPlGlnhxSjTkE-R",
				"1Fby_fbemkQ3nYTWSnfGM",
				"mbtTkgXLeKUNVM0OnSfdI"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.31376123802395034,
				"gap": 9.07787046494131,
				"elementId": "UFguR7z6gtak_b9srcjvz"
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
			"version": 3059,
			"versionNonce": 1573722203,
			"isDeleted": false,
			"id": "O5WfknEj",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2270.183280435776,
			"y": 1034.088454153869,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 164.84603881835938,
			"height": 35.40284187563427,
			"seed": 1040511765,
			"groupIds": [
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1919,
			"versionNonce": 853497083,
			"isDeleted": false,
			"id": "MMGjPfvdrxbybsf6yswfr",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2304.6119310277268,
			"y": 932.8828032066331,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 96.00194688908816,
			"height": 96.00194688908816,
			"seed": 1195848891,
			"groupIds": [
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3442,
			"versionNonce": 1874918811,
			"isDeleted": false,
			"id": "fsm5Sdj5DBsMymSXvmdqM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2317.770907503198,
			"y": 944.0065850215224,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 49.57937969326794,
			"height": 18.159772968914965,
			"seed": 461359221,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1610,
			"versionNonce": 1067749947,
			"isDeleted": false,
			"id": "hdCwTbnEiisfyoVloDfv2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2318.2662150108863,
			"y": 954.257198665029,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.35995334837017967,
			"height": 56.512675694123224,
			"seed": 865527131,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1650,
			"versionNonce": 1131188955,
			"isDeleted": false,
			"id": "514k75wDW4oGOKAxI6V8U",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2367.4358423982567,
			"y": 953.6812733076392,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.3599533483701519,
			"height": 16.678951976095433,
			"seed": 565768661,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1783,
			"versionNonce": 1537965947,
			"isDeleted": false,
			"id": "YI9UX0iPqTalo-3YWy3yk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2318.6621636940936,
			"y": 993.8547553732751,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.63971383820803,
			"height": 8.323775076416316,
			"seed": 669483515,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1675,
			"versionNonce": 849598491,
			"isDeleted": false,
			"id": "NaJVIWvrwMtA7UEYmj94-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2318.9141310379528,
			"y": 1010.8418650288289,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.59370202997869,
			"height": 9.358787057625653,
			"seed": 1304817461,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1375,
			"versionNonce": 105389243,
			"isDeleted": false,
			"id": "WbLYZWakVn1qv6WMd5MaF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2367.7245422521237,
			"y": 1000.4007694809159,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.564700143856714e-13,
			"height": 7.302675216406523,
			"seed": 1295747739,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1797,
			"versionNonce": 842714459,
			"isDeleted": false,
			"id": "uy44Kv1XEKHztiyjG82s7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2318.620297819967,
			"y": 975.0808250075495,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.63971383820803,
			"height": 8.323775076416316,
			"seed": 1577861269,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1112,
			"versionNonce": 2043570683,
			"isDeleted": false,
			"id": "Pg6qRaoZBXd1A3mvkr1rf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2354.261185635093,
			"y": 972.8478630325162,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 33.1937158062507,
			"height": 27.526496034452418,
			"seed": 138772283,
			"groupIds": [
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1672,
			"versionNonce": 302346907,
			"isDeleted": false,
			"id": "v3j4sQT6zXnbFORqDl68t",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2358.306942270939,
			"y": 975.3770935931923,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.52165667442574,
			"height": 13.718098279875628,
			"seed": 675374581,
			"groupIds": [
				"DApSw_eRq1absJcNhygEX",
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 2.454945017800435,
				"gap": 14.809161682799413,
				"elementId": "fsm5Sdj5DBsMymSXvmdqM"
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
			"version": 1263,
			"versionNonce": 1804756795,
			"isDeleted": false,
			"id": "TpWd_vCPynndJUqC6QQlp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2357.6210373569456,
			"y": 992.5247164430361,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.978926617088188,
			"height": 19.433972563156786,
			"seed": 57139163,
			"groupIds": [
				"DApSw_eRq1absJcNhygEX",
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1214,
			"versionNonce": 1020774363,
			"isDeleted": false,
			"id": "qubkvNUxxE9rZlffz7NKz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2357.6210373569456,
			"y": 985.2083973604365,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.207561588419505,
			"height": 10.517208681237769,
			"seed": 795533141,
			"groupIds": [
				"DApSw_eRq1absJcNhygEX",
				"4UsH53usj4vZawlTG-QMk",
				"R-w_-VgTufxHAJ4freH2f",
				"r7wxfjmYuE9A3JrzeLGk2"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2736,
			"versionNonce": 1273500795,
			"isDeleted": false,
			"id": "LYWvhO94",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2381.2532839452974,
			"y": 646.7103429350202,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 128.57763671875,
			"height": 40.288174827240816,
			"seed": 2025139323,
			"groupIds": [
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1608,
			"versionNonce": 2022034715,
			"isDeleted": false,
			"id": "oo5T8bKVa9Ftw0n1H5Kqb",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2390.93852901216,
			"y": 531.5390532066331,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 109.24951261285652,
			"height": 109.24951261285652,
			"seed": 2044603573,
			"groupIds": [
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2829,
			"versionNonce": 102986171,
			"isDeleted": false,
			"id": "LIVg2f6X0VW3YLn-xy2XY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2406.545940171463,
			"y": 546.7652614208416,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 52.96920640933012,
			"height": 19.40138760686516,
			"seed": 1005577499,
			"groupIds": [
				"ycfK6JPIG2r4PjPF2IXsM",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1001,
			"versionNonce": 635667035,
			"isDeleted": false,
			"id": "iS9wpToGf7Fk9PZK06-Bw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2407.0751126978876,
			"y": 557.7167269951235,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.3845639724721782,
			"height": 60.376543678137324,
			"seed": 658558485,
			"groupIds": [
				"ycfK6JPIG2r4PjPF2IXsM",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1033,
			"versionNonce": 1083735803,
			"isDeleted": false,
			"id": "X_i8T1AUAKU-OQ73pg_oq",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2459.606551337591,
			"y": 557.1014246391703,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.1817949871701327,
			"height": 17.15856077432575,
			"seed": 76188091,
			"groupIds": [
				"ycfK6JPIG2r4PjPF2IXsM",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1102,
			"versionNonce": 12904347,
			"isDeleted": false,
			"id": "S8nUJpJWpHfnIEwri8GeT",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2407.0751126978876,
			"y": 578.7139198921063,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.379217109582335,
			"height": 9.229535339333117,
			"seed": 1183335285,
			"groupIds": [
				"ycfK6JPIG2r4PjPF2IXsM",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1119,
			"versionNonce": 479935547,
			"isDeleted": false,
			"id": "6KL-mVheBmoJnHhZHkpeh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2407.498133067606,
			"y": 598.5512096893563,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.379217109582335,
			"height": 8.460407394388971,
			"seed": 2007472731,
			"groupIds": [
				"ycfK6JPIG2r4PjPF2IXsM",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1063,
			"versionNonce": 1610480859,
			"isDeleted": false,
			"id": "0UDUdR9RtWUAycbDOy-Oa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2407.767327848337,
			"y": 618.1701834677596,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 51.916136283748784,
			"height": 9.998663284277683,
			"seed": 1811549397,
			"groupIds": [
				"ycfK6JPIG2r4PjPF2IXsM",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 948,
			"versionNonce": 1988077947,
			"isDeleted": false,
			"id": "w2rEoJa4iBTALxw3gvEW9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2460.686498814428,
			"y": 586.257393105207,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.820418484735523,
			"height": 11.820418484735523,
			"seed": 1914279675,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 960,
			"versionNonce": 1969406491,
			"isDeleted": false,
			"id": "c4RouRe2H9YqN354jjm1h",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2474.111116950663,
			"y": 568.780060059921,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.865313863551412,
			"height": 8.865313863551412,
			"seed": 120302133,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 951,
			"versionNonce": 630834875,
			"isDeleted": false,
			"id": "AWgjSBS1zKO6V2QccgFUw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2463.388308753796,
			"y": 608.0407357413628,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.131787272630186,
			"height": 10.131787272630186,
			"seed": 308477851,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 952,
			"versionNonce": 231159643,
			"isDeleted": false,
			"id": "bbZjo2R-RKyJixaQuaowg",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2444.47563917822,
			"y": 592.5053285899971,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.287471666577515,
			"height": 9.287471666577515,
			"seed": 2030214037,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 947,
			"versionNonce": 1010668539,
			"isDeleted": false,
			"id": "fnLbdqXtb3SkJMomiwNYR",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2450.4702799811926,
			"y": 576.0411742719729,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 6.332367045393866,
			"seed": 45503547,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 946,
			"versionNonce": 1358912667,
			"isDeleted": false,
			"id": "CL0j8MIVp9QdNxJQszvjk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2478.2482634203207,
			"y": 600.7796215293108,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 6.332367045393866,
			"seed": 1773428981,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 965,
			"versionNonce": 1203704123,
			"isDeleted": false,
			"id": "ZQ1QCg-DNDuA3J1hiy0xp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2469.973970481006,
			"y": 586.5106877870247,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.176682651446419,
			"height": 9.287471666577515,
			"seed": 49681627,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 951,
			"versionNonce": 31404507,
			"isDeleted": false,
			"id": "nulmNfJl68w1qQvhWuDXf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2467.3565921022428,
			"y": 598.331106271758,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 9.287471666577515,
			"seed": 1590065749,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 953,
			"versionNonce": 275922555,
			"isDeleted": false,
			"id": "8aIChu7uB3JL-wjtfD69g",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2472.9290751021895,
			"y": 609.7293669534683,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 3.7994202272363196,
			"seed": 850706811,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 964,
			"versionNonce": 1044035355,
			"isDeleted": false,
			"id": "W5A2pNL2aS8jT9FDTEt-k",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2453.9319739660077,
			"y": 595.3760016505759,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.754524848420141,
			"height": 1.6886312121057987,
			"seed": 286156725,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 980,
			"versionNonce": 1504385979,
			"isDeleted": false,
			"id": "EhECIT4vuAOSIQgRfmruw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2456.296057662955,
			"y": 582.0358150749453,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.332367045393866,
			"height": 5.488051439341196,
			"seed": 456448539,
			"groupIds": [
				"Q3866BsIndwLGnWhxGxGI",
				"13IN1zFz-KeLU6DzsDjEN",
				"SRbZuu1XkTRKMhfThrs2f",
				"IyUXvwM4W8aG5ImReZXQy"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3082,
			"versionNonce": 1055255643,
			"isDeleted": false,
			"id": "Q7nExiwcexcfyLzCNy-k2",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1372.95770913611,
			"y": 876.7767541916498,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 106.96115236495706,
			"height": 106.8587269774196,
			"seed": 45197589,
			"groupIds": [
				"sxyRoprOzIoMrqNqYLLOJ",
				"qexIp_HWraggKqxHF6VFn",
				"hxA_X7NoN80NAIl3MeZx5"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2445,
			"versionNonce": 566077691,
			"isDeleted": false,
			"id": "XM3aKxq2GLAXsL8xb6lPp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1409.1076909823491,
			"y": 911.9644560408965,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.07285065911464,
			"height": 35.82425929166074,
			"seed": 2036915899,
			"groupIds": [
				"-9xf-Oxj5qPRg32HlEEIF",
				"qexIp_HWraggKqxHF6VFn",
				"hxA_X7NoN80NAIl3MeZx5"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2769,
			"versionNonce": 397726107,
			"isDeleted": false,
			"id": "TRdf5jQpK0jKCcVo5fYR3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 1427.4926750319564,
			"y": 941.8356335620659,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 35.340211482939296,
			"height": 35.38596252270706,
			"seed": 1428536949,
			"groupIds": [
				"7g6Zsc77YynDQA2s3mKlW",
				"-9xf-Oxj5qPRg32HlEEIF",
				"qexIp_HWraggKqxHF6VFn",
				"hxA_X7NoN80NAIl3MeZx5"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2783,
			"versionNonce": 1644029499,
			"isDeleted": false,
			"id": "5YBnNgU3FKK_U1OCZuPGz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 1458.2387978689162,
			"y": 910.6901082566524,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 35.340211482939296,
			"height": 35.38596252270706,
			"seed": 1207127899,
			"groupIds": [
				"i-PcdgbPWJEkM7EoWXh0x",
				"-9xf-Oxj5qPRg32HlEEIF",
				"qexIp_HWraggKqxHF6VFn",
				"hxA_X7NoN80NAIl3MeZx5"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2836,
			"versionNonce": 2004575963,
			"isDeleted": false,
			"id": "20qFc3Hs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1391.5927369959809,
			"y": 990.4537684047261,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 67.33894348144531,
			"height": 39.82348379726615,
			"seed": 1596991445,
			"groupIds": [
				"hxA_X7NoN80NAIl3MeZx5"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3396,
			"versionNonce": 1321194363,
			"isDeleted": false,
			"id": "FYezQhhE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1820.1082834875338,
			"y": 1259.7963901698897,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 180.08660888671875,
			"height": 41.11677384287278,
			"seed": 153529339,
			"groupIds": [
				"QW45GmsxA7YKvJO5y3ZZ4",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2101,
			"versionNonce": 1745726491,
			"isDeleted": false,
			"id": "2MAKMhmDRbo6esQiZPYfg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1854.4400723279412,
			"y": 1140.248764110142,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 111.49642598129428,
			"height": 111.49642598129428,
			"seed": 48653621,
			"groupIds": [
				"zjEch4iMw6lrpCIaULQyS",
				"75JKSy7Ij5r0CH3H3zJNz",
				"LxLCc7NBgxLYSFZq9-wy6",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2919,
			"versionNonce": 391606459,
			"isDeleted": false,
			"id": "w4ZCGfpQY3IqXem0VcudQ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1868.770581770133,
			"y": 1154.0846695684866,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 66.23094070053295,
			"height": 66.23094070053295,
			"seed": 1359312027,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13439,
			"versionNonce": 239051099,
			"isDeleted": false,
			"id": "QVvjQ3WXDfrQNOeTZXNGb",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1877.8070952363364,
			"y": 1163.1123641752692,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.50343322539075,
			"height": 48.50343322539075,
			"seed": 1135474325,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3116,
			"versionNonce": 639155707,
			"isDeleted": false,
			"id": "hy69F-mfLK1rzQfCwduhC",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": 1920.910239892526,
			"y": 1213.0081019566112,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75022091862902,
			"height": 30.60025551438842,
			"seed": 255994171,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 880,
			"versionNonce": 1776633499,
			"isDeleted": false,
			"id": "hUiHzEozmU_sMo4ur31Ra",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1891.7692968408344,
			"y": 1182.504276930024,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 473717749,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 908,
			"versionNonce": 1616362299,
			"isDeleted": false,
			"id": "qa0jeUr3ZcsTpXfMZHbJp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1912.8723842486702,
			"y": 1182.504276930024,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 423578075,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 893,
			"versionNonce": 366123995,
			"isDeleted": false,
			"id": "na_tRaBLvIHlfWRcjoS_X",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1906.788611302267,
			"y": 1197.9038272006078,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 345445717,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 921,
			"versionNonce": 1718118523,
			"isDeleted": false,
			"id": "LdRTaAgj59WooNcmw40Fh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1897.8530697872375,
			"y": 1197.9038272006078,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.083772946403041,
			"height": 6.083772946402906,
			"seed": 1947162235,
			"groupIds": [
				"qfSa3zSF6voh3Zx9AaTYu",
				"9bN1jqZb-PT7aiC0dgU7A",
				"Fa5HQn7Dd3KV_ZAwzErbe"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"type": "rectangle",
			"version": 2016,
			"versionNonce": 131834139,
			"isDeleted": false,
			"id": "o05NUNTGTO1knkrDMoQlb",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1594.323456096013,
			"y": 1131.0175025303076,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 108.26125563418046,
			"height": 108.26125563418046,
			"seed": 403940021,
			"groupIds": [
				"yckA1ZaNp7-z4ecMuNKXd",
				"dfW54lcGZg_sMh0AVk0ML",
				"oKIxhVD35s_XLTRMTYK47",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1921,
			"versionNonce": 1402914235,
			"isDeleted": false,
			"id": "6Au-UJJPUWEjB6TwHcnuU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1623.9271334740238,
			"y": 1160.1020910101356,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 66.96246786542376,
			"height": 69.29836790724075,
			"seed": 1584713499,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1462,
			"versionNonce": 1356093019,
			"isDeleted": false,
			"id": "0Ul5Cq-pz89hboT5kgkGr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1648.324311688556,
			"y": 1156.208924273776,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 8.56496681999605,
			"height": 22.061278172717078,
			"seed": 190284821,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1388,
			"versionNonce": 2119095035,
			"isDeleted": false,
			"id": "6Nz-hawrseVwuUUrsmzR6",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1623.6675890249364,
			"y": 1172.0411356683135,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 16.091755843628974,
			"height": 14.534489149084193,
			"seed": 451031995,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1372,
			"versionNonce": 1552989083,
			"isDeleted": false,
			"id": "jMvcIbuDUaD5TGfMsNp8x",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1632.4921002940202,
			"y": 1155.6638809306842,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 11.160411310903948,
			"seed": 576207221,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1357,
			"versionNonce": 936153147,
			"isDeleted": false,
			"id": "MIWYEFuSJTMHnLViWNFud",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1631.4539224976563,
			"y": 1176.9724802010362,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.267244574541996,
			"height": 12.717678005448674,
			"seed": 2038039643,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1406,
			"versionNonce": 837079259,
			"isDeleted": false,
			"id": "Klms0xiNst59G8Gq6LPoI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1631.194378048563,
			"y": 1184.2397247755782,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.0077001254513,
			"height": 18.946744783627594,
			"seed": 1985692373,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1366,
			"versionNonce": 208403835,
			"isDeleted": false,
			"id": "yaX4-SIft92H3ICAxZ_2_",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1648.3243116885606,
			"y": 1214.865969768293,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.0077001254513,
			"height": 34.519411729075,
			"seed": 571392251,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1466,
			"versionNonce": 849647131,
			"isDeleted": false,
			"id": "hNe6m5szCgglmqQa0gkc1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1638.2020781740205,
			"y": 1197.9955805773925,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 10.122233514540799,
			"height": 7.526789023632803,
			"seed": 1542856757,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1364,
			"versionNonce": 58792635,
			"isDeleted": false,
			"id": "F9f-hCLu1r3QeidxaNObW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1682.06509007036,
			"y": 1193.8428693919398,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 8.824511269086859,
			"height": 4.6718000836341815,
			"seed": 505604507,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1336,
			"versionNonce": 1537477467,
			"isDeleted": false,
			"id": "miXdoDKA7ktdlBSPFQwpk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1648.5838561376504,
			"y": 1204.7177818088428,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.267244574542229,
			"height": 0,
			"seed": 2030981525,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1369,
			"versionNonce": 1600120827,
			"isDeleted": false,
			"id": "8DF32TqTSIvObYGzg14Sp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1633.0111891922004,
			"y": 1215.9041475646563,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 7.786333472723613,
			"height": 5.969522329088171,
			"seed": 585694779,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1352,
			"versionNonce": 79114395,
			"isDeleted": false,
			"id": "wiZvhK7sJKytiGHPHWcG1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1622.36986677948,
			"y": 1197.9955805773925,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.709977879997366,
			"height": 3.374077838180246,
			"seed": 450451189,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1363,
			"versionNonce": 1566336315,
			"isDeleted": false,
			"id": "3jJHUhR6RnaYy3s0aDKBF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1615.8812555522093,
			"y": 1184.2397247755782,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.709977879997482,
			"height": 3.114533389089492,
			"seed": 457408219,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1311,
			"versionNonce": 548537819,
			"isDeleted": false,
			"id": "MHUnuI5cjKUAMXQgOWxfw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1662.599256388555,
			"y": 1163.7357132974082,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 1272754261,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1357,
			"versionNonce": 1976210043,
			"isDeleted": false,
			"id": "03nR-bTuoRPzQ8CAZDBtp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1657.2785951821916,
			"y": 1176.5831635274026,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 1908730747,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1392,
			"versionNonce": 2104003355,
			"isDeleted": false,
			"id": "_8yfbhCu3iklhG5zzMaJP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1667.660373145821,
			"y": 1184.369497000125,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 703454645,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1363,
			"versionNonce": 469659579,
			"isDeleted": false,
			"id": "iWCbhKatmS7APVUytUzkL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1656.525916279825,
			"y": 1201.4994306401186,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 5.450433430906552,
			"height": 5.450433430906552,
			"seed": 447726619,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1350,
			"versionNonce": 61784155,
			"isDeleted": false,
			"id": "ZCqoJcx6ePtiEUC19PRrQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1668.3092342685502,
			"y": 1166.0716133392275,
			"strokeColor": "#232f3e",
			"backgroundColor": "transparent",
			"width": 4.671800083634238,
			"height": 0,
			"seed": 2083675925,
			"groupIds": [
				"RJELt3ylMbCeK-bT76ZfJ",
				"nzEKQT5K9-nAV9sKEIxH4",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3306,
			"versionNonce": 2118909179,
			"isDeleted": false,
			"id": "z56E4ib8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1561.120917533683,
			"y": 1247.0963453398979,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 173.5655059814453,
			"height": 39.92373320202065,
			"seed": 1576437947,
			"groupIds": [
				"jrKSrFpTNTuHA0G7fgQfw",
				"eCSQgFG8Am8CPmpXeLNny"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3777,
			"versionNonce": 2002298267,
			"isDeleted": false,
			"id": "jtv9bwZa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1837.5516386543059,
			"y": 386.8624928478421,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.40867614746094,
			"height": 27.743935377854452,
			"seed": 153072757,
			"groupIds": [
				"GC_G3reWgt-XFV9O24WJr",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2606,
			"versionNonce": 1174878779,
			"isDeleted": false,
			"id": "yE91JrzvXnCxJARGYme7E",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1863.3937086924234,
			"y": 306.86000006295717,
			"strokeColor": "#000000",
			"backgroundColor": "#7eddd2",
			"width": 74.72305088242369,
			"height": 74.72305088242369,
			"seed": 1631304027,
			"groupIds": [
				"EmFWtnj5-kmg23FTvnh3M",
				"TG5cfaiDjgOzyQ-6zjjM3",
				"DfpHFJ1Kuk5Vk7jtyuuev",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 777,
			"versionNonce": 926563035,
			"isDeleted": false,
			"id": "8e0e0GOMqxoyGmXf7uvl0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1881.2972219809258,
			"y": 324.81861264904853,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 39.86314744288174,
			"height": 39.86314744288174,
			"seed": 746282453,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1179,
			"versionNonce": 1468278651,
			"isDeleted": false,
			"id": "qkIq7SpI5G-HeROlBTX0x",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1912.8377283851403,
			"y": 316.94968662329165,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1909577211,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5033884540041134,
				"gap": 10.195409271004902,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
			},
			"endBinding": {
				"focus": 1.4950557318415354,
				"gap": 15.059658061092357,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
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
			"version": 1272,
			"versionNonce": 2099740699,
			"isDeleted": false,
			"id": "hfd3lk3aIY-LOyDknoMhB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5318549836978397,
			"x": 1905.3447506546865,
			"y": 349.6569113817586,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 760929077,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5014921565015409,
				"gap": 10.200396231667213,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
			},
			"endBinding": {
				"focus": 1.478257871739441,
				"gap": 14.534447891051393,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
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
			"version": 1294,
			"versionNonce": 303482043,
			"isDeleted": false,
			"id": "VaJrBgt-y_5eCFh9L45dX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.659805918773737,
			"x": 1877.835940386512,
			"y": 308.5233302532513,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 247160475,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5334048395146314,
				"gap": 10.746893053393809,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
			},
			"endBinding": {
				"focus": 1.5315387436222352,
				"gap": 11.257631391195225,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
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
			"version": 1237,
			"versionNonce": 502560091,
			"isDeleted": false,
			"id": "ugqEttTsUcs1egwDYVCrp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.0860941483440776,
			"x": 1870.70594653494,
			"y": 343.20102762226213,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.797256517781694,
			"height": 30.464519183990948,
			"seed": 1411624085,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5202105672697392,
				"gap": 10.459096950956052,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
			},
			"endBinding": {
				"focus": 1.5364855559035686,
				"gap": 11.437821273077521,
				"elementId": "8e0e0GOMqxoyGmXf7uvl0"
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
			"version": 866,
			"versionNonce": 269685243,
			"isDeleted": false,
			"id": "nLM94hOOnAR-JY7kpR-q0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1891.123656200806,
			"y": 352.9237465107699,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 19.769528406632524,
			"height": 10.046809518124626,
			"seed": 850055995,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 741,
			"versionNonce": 1232411291,
			"isDeleted": false,
			"id": "DLC2zJ4n4ds0457oXSVqi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1895.6609250154431,
			"y": 331.83192675282737,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.019081406975497,
			"height": 11.019081406975497,
			"seed": 1082872309,
			"groupIds": [
				"gppAZ9JXg-3v8qLSJPoOU",
				"k85ti7PGic-tlMkuzRNKt",
				"dHnxOeiMd3pHqxJ4R-uS6"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2997,
			"versionNonce": 1724714811,
			"isDeleted": false,
			"id": "fpjZtxbPYY-GtapBHGLj_",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1151.916701363781,
			"y": 589.7278162885011,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 96.95861181072574,
			"height": 96.95861181072574,
			"seed": 1577235419,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3465,
			"versionNonce": 1249734619,
			"isDeleted": false,
			"id": "qMiQ556r32qSqZRpoTouv",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1189.2531880583128,
			"y": 619.8652891339024,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 22.748946471158828,
			"height": 0,
			"seed": 2140621653,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3516,
			"versionNonce": 1721285755,
			"isDeleted": false,
			"id": "iaeDq73FYxxDg31kMwI4F",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1187.045835089806,
			"y": 657.0254061245179,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.701067588859278,
			"height": 0,
			"seed": 1624604795,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3362,
			"versionNonce": 1189180699,
			"isDeleted": false,
			"id": "G-4LBcGlFRWd9TkrzAUD1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1161.8505872354071,
			"y": 613.6106826394499,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.426941630593085,
			"height": 72.60298153552196,
			"seed": 1637685429,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3310,
			"versionNonce": 1523194299,
			"isDeleted": false,
			"id": "jTW0jVJh9J-vu3o8es5GE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1213.5307141993287,
			"y": 602.2347833208149,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.45952787686465,
			"height": 72.40256469241159,
			"seed": 1692776731,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3035,
			"versionNonce": 2138384987,
			"isDeleted": false,
			"id": "P-ObIvhJmjVmQZipbguQk",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1193.556587467481,
			"y": 647.4282398287683,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 13.648658319418736,
			"height": 18.301853045094497,
			"seed": 272775701,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3154,
			"versionNonce": 1236608763,
			"isDeleted": false,
			"id": "m68FTtmnYIj7fKfhnyUrO",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1205.2667666171155,
			"y": 632.6283846581829,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.52333842785504,
			"height": 12.617992815585021,
			"seed": 933617083,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3293,
			"versionNonce": 269258651,
			"isDeleted": false,
			"id": "SZ-VI4pZzylaKg8eWSm6j",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 1187.561960386137,
			"y": 631.8134899927294,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.523338427855042,
			"height": 12.617992815585021,
			"seed": 1685860213,
			"groupIds": [
				"ImU8_WNKUihI8WIw13SvO",
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2978,
			"versionNonce": 883811387,
			"isDeleted": false,
			"id": "QX3BwP9h",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1100.293151962937,
			"y": 691.7968977013089,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 200.14634704589844,
			"height": 35.99203374908673,
			"seed": 1412984411,
			"groupIds": [
				"ag0XjgHSpQZPvp_hERcjN"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2703,
			"versionNonce": 796632283,
			"isDeleted": false,
			"id": "x87PMWPLX3P5YIhR1AMPA",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 966.7923414534766,
			"y": 1003.1732515680869,
			"strokeColor": "#000000",
			"backgroundColor": "#40c05788",
			"width": 106.50167096688487,
			"height": 106.50167096688487,
			"seed": 2089842901,
			"groupIds": [
				"m_UCghYaJW0iiTmjjBnst",
				"co-VYMxWpYti3loALgheg",
				"IhF37g83kcQn8i_k5ybVH",
				"sfkL_pYaCpkZwh_mwoYVj"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2491,
			"versionNonce": 1476940155,
			"isDeleted": false,
			"id": "r2FwgKljtV8yZtHlmWpFa",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 989.0691252094689,
			"y": 1021.2840227288514,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 63.994487962286954,
			"height": 17.598397113796313,
			"seed": 762309371,
			"groupIds": [
				"IhF37g83kcQn8i_k5ybVH",
				"sfkL_pYaCpkZwh_mwoYVj"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3109,
			"versionNonce": 1872128539,
			"isDeleted": false,
			"id": "U98Ntv1rYEQQ-Cis2ITw1",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 989.6548382361509,
			"y": 1030.9038533839441,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 62.669193790678,
			"height": 66.254411607132,
			"seed": 303339061,
			"groupIds": [
				"IhF37g83kcQn8i_k5ybVH",
				"sfkL_pYaCpkZwh_mwoYVj"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2501,
			"versionNonce": 1796763323,
			"isDeleted": false,
			"id": "etb_x8easKQFhGXh5GeDt",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1017.0986093143326,
			"y": 1047.6979404442282,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 7.688347830880011,
			"height": 7.688347830880011,
			"seed": 936301467,
			"groupIds": [
				"IhF37g83kcQn8i_k5ybVH",
				"sfkL_pYaCpkZwh_mwoYVj"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3187,
			"versionNonce": 2100354907,
			"isDeleted": false,
			"id": "YhT4izIspIOkq90aQlyxq",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1021.173568504187,
			"y": 1051.9085156974286,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 38.04246444892518,
			"height": 18.87015206949028,
			"seed": 267257749,
			"groupIds": [
				"IhF37g83kcQn8i_k5ybVH",
				"sfkL_pYaCpkZwh_mwoYVj"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2950,
			"versionNonce": 1613904891,
			"isDeleted": false,
			"id": "5m8AGmiQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 935.1931382300268,
			"y": 1116.3670350362886,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 169.64625549316406,
			"height": 39.274847426662085,
			"seed": 864528443,
			"groupIds": [
				"sfkL_pYaCpkZwh_mwoYVj"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3444,
			"versionNonce": 1612645531,
			"isDeleted": false,
			"id": "HfgYb_VWbiRF1KV60drIo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1580.7836975677994,
			"y": 306.51042955192224,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 87.3127427287515,
			"height": 87.22913254586531,
			"seed": 1750224117,
			"groupIds": [
				"5bwdZF2Ac_xlFhBPFX48K",
				"ze4Jnk2HWOCf4gjcw_Vus",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2341,
			"versionNonce": 615102779,
			"isDeleted": false,
			"id": "k7_ZYiRB_aMiBfc5h3hgu",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1590.2278196664815,
			"y": 316.5092954714014,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 68.42449853138703,
			"height": 67.23140070690664,
			"seed": 914155739,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2345,
			"versionNonce": 993319387,
			"isDeleted": false,
			"id": "OWKDbb4BJjsZGA0bzLjm7",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1622.6943256982654,
			"y": 326.52250268574016,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 717678165,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2390,
			"versionNonce": 1624434299,
			"isDeleted": false,
			"id": "z_xNwG67LaveVYkdP_MYY",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1632.2294402456714,
			"y": 356.73068651152823,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 1983976827,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2422,
			"versionNonce": 205938459,
			"isDeleted": false,
			"id": "N9r5ykflxpH1HpIw36Ma-",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1603.8772438196165,
			"y": 346.01598925743156,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.980972325404995,
			"height": 11.980972325404995,
			"seed": 1512133557,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2409,
			"versionNonce": 939639739,
			"isDeleted": false,
			"id": "-8QLG2NCJiqCR5h-DA3Wc",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1634.23048903244,
			"y": 340.64571904265983,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.934786164220179,
			"height": 11.986856642598756,
			"seed": 1377218075,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2450,
			"versionNonce": 1814533211,
			"isDeleted": false,
			"id": "q2QGnbw623Av0pCCJvHaT",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.497787143782138,
			"x": 1621.9559330466784,
			"y": 350.91331760909554,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.934786164220179,
			"height": 11.986856642598756,
			"seed": 42407189,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2550,
			"versionNonce": 143282427,
			"isDeleted": false,
			"id": "MjBdEax-n3uEOun1bcObq",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.33043282694363,
			"x": 1614.4170126435943,
			"y": 336.675950790648,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1884401276853573,
			"height": 7.987405343349235,
			"seed": 485503675,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2562,
			"versionNonce": 1319926171,
			"isDeleted": false,
			"id": "MRqFLU_9Os6k76XNFE1mT",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.2993692646569315,
			"x": 1606.9367878083947,
			"y": 362.2694888670949,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.015437461328267,
			"height": 18.29894110884873,
			"seed": 258845301,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2697,
			"versionNonce": 734039611,
			"isDeleted": false,
			"id": "RgxlUYGIlpgciXqW-EsUV",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.938756218467832,
			"x": 1594.0812825164433,
			"y": 347.38537566411685,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1884401276853573,
			"height": 7.987405343349235,
			"seed": 661660507,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2814,
			"versionNonce": 1118375643,
			"isDeleted": false,
			"id": "_iymmUgbo7U8DtH03HFOP",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.829160445235754,
			"x": 1646.6327638097828,
			"y": 368.5494142282462,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.4917345266282833,
			"height": 4.617471446267002,
			"seed": 1637520341,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2986,
			"versionNonce": 905476987,
			"isDeleted": false,
			"id": "AIMmDIz8a20utDtBTo6Iv",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.49818137785806815,
			"x": 1637.9401729301437,
			"y": 372.2010797172966,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.1438731318945865,
			"height": 7.65480669233386,
			"seed": 166264827,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2999,
			"versionNonce": 837899291,
			"isDeleted": false,
			"id": "UTe6wC6hC-i9gT70pESLS",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.809117217502431,
			"x": 1641.1594587020707,
			"y": 321.47176252567124,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.8771884437576465,
			"height": 10.706843635479597,
			"seed": 623071541,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2954,
			"versionNonce": 914757819,
			"isDeleted": false,
			"id": "vM1TNjHehYAydHedQqZXL",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.014839308967369,
			"x": 1619.0035161573112,
			"y": 317.84757004535095,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.353935257345782,
			"height": 7.364308683671784,
			"seed": 777865371,
			"groupIds": [
				"AWPwtmeoEAraTf7-WG6ym",
				"NEiNcNDPtONBiVY7rxl0E",
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2844,
			"versionNonce": 559499611,
			"isDeleted": false,
			"id": "gyPH09i5",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1554.1901110348965,
			"y": 399.2882295594311,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 140.48143005371094,
			"height": 32.50804164384153,
			"seed": 1735221909,
			"groupIds": [
				"8Yw7RaM2kDmR2nmrVHuCw"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2002,
			"versionNonce": 2008901115,
			"isDeleted": false,
			"id": "W9VV1TfA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2100.74975088058,
			"y": 358.5464195309246,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 123.90129089355469,
			"height": 43.78800418134342,
			"seed": 444562747,
			"groupIds": [
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3153,
			"versionNonce": 1890905755,
			"isDeleted": false,
			"id": "jqMMIxFnkQk1mLip_f_3J",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2104.8903150310334,
			"y": 233.4858054589688,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 117.60938372045632,
			"height": 117.49676164749559,
			"seed": 1831749621,
			"groupIds": [
				"IMSvlW2womOPyxJH519X0",
				"A9FfLrcVV4o7L67vlm5Aj",
				"XB-YzuCcdUgFiJefXff_r",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2204,
			"versionNonce": 1056072507,
			"isDeleted": false,
			"id": "g_zcUqx2G_p1PO_k6HrLk",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2123.8454210823443,
			"y": 247.67017845051464,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 67.60229032344449,
			"height": 67.60229032344449,
			"seed": 2041716187,
			"groupIds": [
				"ebexStwCRSP3P-awWQw_F",
				"XB-YzuCcdUgFiJefXff_r",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2302,
			"versionNonce": 450380763,
			"isDeleted": false,
			"id": "uypey_guyKcmMPiPV__5I",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2133.0444581604506,
			"y": 256.9073729791123,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 49.50772463602171,
			"height": 49.50772463602171,
			"seed": 1215005013,
			"groupIds": [
				"ebexStwCRSP3P-awWQw_F",
				"XB-YzuCcdUgFiJefXff_r",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2391,
			"versionNonce": 209260667,
			"isDeleted": false,
			"id": "AhaCVuaz3sNoJmgka4993",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2171.742123025442,
			"y": 312.1757916914323,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 28.324805162638814,
			"height": 31.23385135972594,
			"seed": 1728555643,
			"groupIds": [
				"ebexStwCRSP3P-awWQw_F",
				"XB-YzuCcdUgFiJefXff_r",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2432,
			"versionNonce": 1972848923,
			"isDeleted": false,
			"id": "tcB50AGGEDxoxVkPO95qt",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2144.441849563357,
			"y": 266.7398532857528,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.12043252812945,
			"height": 6.908084764438986,
			"seed": 779783861,
			"groupIds": [
				"GAfCsbo9diKE7sPCe7OmG",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3067,
			"versionNonce": 1537568187,
			"isDeleted": false,
			"id": "G4kFx__dfdXNnflDP-hv-",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2144.6717656863852,
			"y": 270.5160270563056,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 24.60020080383713,
			"height": 26.00754423488317,
			"seed": 2000855835,
			"groupIds": [
				"GAfCsbo9diKE7sPCe7OmG",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2449,
			"versionNonce": 1908801115,
			"isDeleted": false,
			"id": "KjGXDxNzFZ0Db41dKXBNY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2155.4445591196745,
			"y": 277.1083874970691,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 3.0179884094428444,
			"height": 3.0179884094428444,
			"seed": 234942485,
			"groupIds": [
				"GAfCsbo9diKE7sPCe7OmG",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3289,
			"versionNonce": 1657502459,
			"isDeleted": false,
			"id": "hSU2CfvkZuj4tf-xtKQP7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2156.15987103291,
			"y": 276.662716526105,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 18.766656221809924,
			"height": 13.878660841506111,
			"seed": 47548347,
			"groupIds": [
				"GAfCsbo9diKE7sPCe7OmG",
				"GSaDESsoZkfq8wYwBeEg0",
				"_0ykG2wp7QHd1IjLwcTRG"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2752,
			"versionNonce": 1530422171,
			"isDeleted": false,
			"id": "CPGM1wOhGjFYdz5Cg-tH3",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1336.5423453058422,
			"y": 597.8388394370705,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 100.217322075418,
			"height": 100.217322075418,
			"seed": 1693721973,
			"groupIds": [
				"uMinJApxj1LDk-nQv7qnV",
				"08MHXzAMK0F8xCQya-L9r",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2024,
			"versionNonce": 1396652091,
			"isDeleted": false,
			"id": "hK9Oi6k6X_Ef5itdjvg0e",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1345.7567300186217,
			"y": 624.9009179575434,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 47.755657481286896,
			"height": 47.755657481286896,
			"seed": 803395675,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1980,
			"versionNonce": 415398107,
			"isDeleted": false,
			"id": "ViMKWMwbWDIrStaHSVJKU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1405.9423990949392,
			"y": 616.6067763059748,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 1452912341,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1973,
			"versionNonce": 424977787,
			"isDeleted": false,
			"id": "3cv1zZtYwmVdqm3rJYtxM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1406.127089476102,
			"y": 666.3492244507332,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 1010636027,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2027,
			"versionNonce": 1815625243,
			"isDeleted": false,
			"id": "BvhbJhFdMX9LgMsFFk2u3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1413.335490605349,
			"y": 639.3177202160456,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 25627701,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1947,
			"versionNonce": 476037819,
			"isDeleted": false,
			"id": "hQ0_ahp7OLUZAH8m3-Lio",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1394.4134376410657,
			"y": 648.328221627609,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 124173723,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1971,
			"versionNonce": 846050139,
			"isDeleted": false,
			"id": "e8QDE5RKxyfrqFHN2C8yw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.41450687458479507,
			"x": 1388.8224464129669,
			"y": 667.2502745918915,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 362921365,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2033,
			"versionNonce": 2125762555,
			"isDeleted": false,
			"id": "6IeITfs6b2bXYbqEmWsKz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.900439403044541,
			"x": 1388.8224464129676,
			"y": 629.590859044487,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 1553093179,
			"groupIds": [
				"blpvJcyp35IDVcnCTs-1O",
				"c4Q_3zPUZZFLZfzqlNiTJ",
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 3515,
			"versionNonce": 590796955,
			"isDeleted": false,
			"id": "mKE0A1Xi",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1355.0832658389158,
			"y": 705.4917723352388,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 61.562530517578125,
			"height": 36.95735473713406,
			"seed": 706691829,
			"groupIds": [
				"jSfoJm0-VwohNbvz2QerW"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"type": "text",
			"version": 2317,
			"versionNonce": 1571228987,
			"isDeleted": false,
			"id": "d5yomrzf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 677.8756931713558,
			"y": 1121.7665119010971,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 150.04879760742188,
			"height": 31.136012047488816,
			"seed": 2091012827,
			"groupIds": [
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 2065,
			"versionNonce": 292007387,
			"isDeleted": false,
			"id": "mVf3C-k_nFy0jT4f-AP2i",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 710.7106649928432,
			"y": 1030.7322793458632,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 84.43157714347974,
			"height": 84.43157714347974,
			"seed": 1401232469,
			"groupIds": [
				"OMOlTf_xQrk_MFWqtLEV7",
				"8IR4DcimM41StRF9iGgOz",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3392,
			"versionNonce": 294337147,
			"isDeleted": false,
			"id": "Bk2hJISyjxpRemYzwIJRL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 736.7189535475211,
			"y": 1058.7170526715115,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.678720425002144,
			"height": 11.236901335627255,
			"seed": 1747533691,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1564,
			"versionNonce": 718549787,
			"isDeleted": false,
			"id": "hEcFu5zGlqzpYObaX-PAJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 737.0254398457928,
			"y": 1065.0599256985531,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.22273187379533896,
			"height": 34.96890418587131,
			"seed": 2041104821,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1624,
			"versionNonce": 1840584635,
			"isDeleted": false,
			"id": "TW1gYuB9aEzdF0LMqOhjv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 767.4506138062386,
			"y": 1064.7035547004828,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.15041600671561423,
			"height": 33.518229949663585,
			"seed": 1768527899,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1628,
			"versionNonce": 944793691,
			"isDeleted": false,
			"id": "kEdVi6xiKRTAZ489HtAwe",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 737.4263572186242,
			"y": 1100.0733762591854,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1840237333,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1651,
			"versionNonce": 7906555,
			"isDeleted": false,
			"id": "X9k1c9GXijFKguH7l3dVp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 737.3323302626291,
			"y": 1089.2491650603909,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1582685371,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1674,
			"versionNonce": 1571835291,
			"isDeleted": false,
			"id": "7MT1WOSCiW_fHRPJdrR5L",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 737.3323302626291,
			"y": 1077.4950068242963,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1074765941,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1337,
			"versionNonce": 1395253819,
			"isDeleted": false,
			"id": "qkT4Wx3ZDO8pEljFIq7eP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 730.7241546741825,
			"y": 1080.8338298197546,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.007862475072281,
			"height": 24.814334053976648,
			"seed": 1116769627,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1378,
			"versionNonce": 1506271963,
			"isDeleted": false,
			"id": "WcevJhxpkU1ycQPE7GgqL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 774.8488915445996,
			"y": 1081.0017463659847,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.007862475072281,
			"height": 24.814334053976648,
			"seed": 1452132821,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1360,
			"versionNonce": 706531195,
			"isDeleted": false,
			"id": "N_Vv6bSacHLBGL4VT-b0b",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 719.7162921991101,
			"y": 1047.1385762096174,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 66.42032273094495,
			"height": 5.597218207663906,
			"seed": 2037131771,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1289,
			"versionNonce": 1181427739,
			"isDeleted": false,
			"id": "Tqpv-KkqXcT1kZ8g7hWIO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 724.7537885860079,
			"y": 1080.162163634834,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.343513968685692,
			"height": 5.410644267408442,
			"seed": 1111476021,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1334,
			"versionNonce": 1151691963,
			"isDeleted": false,
			"id": "dIsqQtosoiij4oWjQx3Oj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 780.7259706626467,
			"y": 1080.3673949691158,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.343513968685692,
			"height": 5.410644267408442,
			"seed": 1475031707,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1339,
			"versionNonce": 1483611483,
			"isDeleted": false,
			"id": "leb9vVHyuhU5vHzTNJ4DB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 732.9630419572477,
			"y": 1068.221431458485,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.649531550474005,
			"height": 21.269429189122842,
			"seed": 1435179157,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1380,
			"versionNonce": 488094203,
			"isDeleted": false,
			"id": "kDMa71T2ZKjIDUNGG-MG1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 772.3114859571251,
			"y": 1068.221431458485,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.649531550474005,
			"height": 21.269429189122842,
			"seed": 1858086715,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1329,
			"versionNonce": 530891419,
			"isDeleted": false,
			"id": "Wk_Q5-DLxIZ7dcWbyQtw0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 741.9185910895103,
			"y": 1054.0418119990693,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.209253371240395,
			"height": 7.089809729707613,
			"seed": 2049261045,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1344,
			"versionNonce": 684177211,
			"isDeleted": false,
			"id": "COjeRELb2pT2RfdiOOzKa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 755.3519147879033,
			"y": 1054.0418119990693,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.209253371240395,
			"height": 7.089809729707613,
			"seed": 340625371,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": null,
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1317,
			"versionNonce": 1189287899,
			"isDeleted": false,
			"id": "r7xFz7Cp8sCUk0_w5HgMs",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 719.9028661393654,
			"y": 1047.3251501498733,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.918052745364734,
			"height": 8.209253371240395,
			"seed": 1192474453,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"version": 1365,
			"versionNonce": 403268731,
			"isDeleted": false,
			"id": "T9nMX1KMVtlOyWUZJHjKM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 785.8567540196718,
			"y": 1047.2505205737714,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.918052745364734,
			"height": 8.209253371240395,
			"seed": 782619771,
			"groupIds": [
				"1SZ72ShKc7hD9ZA2Hy5bZ",
				"vZtlHe1sRNCibFiXzQGXQ",
				"dSkeWqLfGK8d4lgPZPY-X"
			],
			"frameId": "-k3sogTWR7b1x5pRu5E8l",
			"roundness": {
				"type": 2
			},
			"boundElements": null,
			"updated": 1714917402560,
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
			"type": "frame",
			"version": 999,
			"versionNonce": 1866295931,
			"isDeleted": false,
			"id": "-k3sogTWR7b1x5pRu5E8l",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 549.4451192642653,
			"y": 207.4888634861668,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 2146.188263721955,
			"height": 1201.5320763221152,
			"seed": 1454113973,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": null,
			"updated": 1714917548083,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "4. Performance & Traffic Management"
		},
		{
			"type": "text",
			"version": 434,
			"versionNonce": 93338107,
			"isDeleted": false,
			"id": "88TIvi3e",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 503.89849768342026,
			"y": -97.49043102394535,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 940.1990966796875,
			"height": 100,
			"seed": 666982599,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917076256,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Overall architecture to breakdown maybe go by microservice then or start as a general whole \nand explore different components on each story board like once microservice \nis defined copy arch then focus on database stuff and replication strategies\nthen traffic management architecture   ",
			"rawText": "Overall architecture to breakdown maybe go by microservice then or start as a general whole \nand explore different components on each story board like once microservice \nis defined copy arch then focus on database stuff and replication strategies\nthen traffic management architecture   ",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Overall architecture to breakdown maybe go by microservice then or start as a general whole \nand explore different components on each story board like once microservice \nis defined copy arch then focus on database stuff and replication strategies\nthen traffic management architecture   ",
			"lineHeight": 1.25
		},
		{
			"id": "BwnOKOTXYV8wzRHi98fJg",
			"type": "image",
			"x": 2103.9630630857573,
			"y": -1030.847512496054,
			"width": 366.57407407407396,
			"height": 455.45010066148956,
			"angle": 0,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "vjQ13QAGqqwZLC97MoanI",
			"roundness": null,
			"seed": 1670347227,
			"version": 297,
			"versionNonce": 31693845,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714917072292,
			"link": null,
			"locked": false,
			"status": "pending",
			"fileId": "d751345c2cc691e74f0ca6a58a00573821ffaf18",
			"scale": [
				1,
				1
			]
		},
		{
			"id": "qjYBMRTj",
			"type": "text",
			"x": -1299.3547949821007,
			"y": -749.2913239333935,
			"width": 69.98402404785156,
			"height": 45,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"seed": 1150249499,
			"version": 54,
			"versionNonce": 1584409147,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843975728,
			"link": null,
			"locked": false,
			"text": "Kids",
			"rawText": "Kids",
			"fontSize": 36,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Kids",
			"lineHeight": 1.25
		},
		{
			"type": "ellipse",
			"version": 3039,
			"versionNonce": 889531099,
			"isDeleted": false,
			"id": "SSxKOkSaag-JpN1VsITfD",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1271.612778336068,
			"y": -872.3869001230456,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 33.375425184569565,
			"height": 36.62273130852396,
			"seed": 1473871579,
			"groupIds": [
				"0AIwHBxJx3RUGa2IBvldL",
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714843975728,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3014,
			"versionNonce": 1047598971,
			"isDeleted": false,
			"id": "Sv5urrCnH2xqOon2PDUsS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1259.792020457698,
			"y": -835.482488338293,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 1.8806774343095514,
			"height": 42.767466235176585,
			"seed": 731573115,
			"groupIds": [
				"0AIwHBxJx3RUGa2IBvldL",
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					-1.8806774343095514,
					42.767466235176585
				]
			]
		},
		{
			"type": "line",
			"version": 3021,
			"versionNonce": 1492545563,
			"isDeleted": false,
			"id": "jWH8cHNANu2z6vJznA8o1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1261.9695108728022,
			"y": -793.2338263765881,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 11.668391066206432,
			"height": 23.809914817211723,
			"seed": 700826651,
			"groupIds": [
				"0AIwHBxJx3RUGa2IBvldL",
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					11.668391066206432,
					23.809914817211723
				]
			]
		},
		{
			"type": "line",
			"version": 2994,
			"versionNonce": 1988605115,
			"isDeleted": false,
			"id": "WOhgVzj4h5i7M9zqniLMO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1262.5499242305746,
			"y": -794.1094617301255,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 18.800183557774766,
			"height": 21.534455632589,
			"seed": 441223355,
			"groupIds": [
				"0AIwHBxJx3RUGa2IBvldL",
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					-18.800183557774766,
					21.534455632589
				]
			]
		},
		{
			"type": "line",
			"version": 2918,
			"versionNonce": 650601819,
			"isDeleted": false,
			"id": "OcHvUgmm-vij-CgXuDbsG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1277.2332141558281,
			"y": -829.8490286376324,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 16.445160312989156,
			"height": 15.784769763536955,
			"seed": 584169819,
			"groupIds": [
				"0AIwHBxJx3RUGa2IBvldL",
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					16.445160312989156,
					15.784769763536955
				]
			]
		},
		{
			"type": "line",
			"version": 2946,
			"versionNonce": 1627914747,
			"isDeleted": false,
			"id": "gXVh-7sQR-8mn4n518tJ0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1262.0231389656308,
			"y": -815.1219753230538,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 23.698689119744106,
			"height": 13.365730468260935,
			"seed": 279434747,
			"groupIds": [
				"0AIwHBxJx3RUGa2IBvldL",
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					23.698689119744106,
					-13.365730468260935
				]
			]
		},
		{
			"type": "line",
			"version": 3120,
			"versionNonce": 239864475,
			"isDeleted": false,
			"id": "B3v12Ij35mG-8LiqisfUt",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1268.027461765424,
			"y": -868.8462510215068,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef5",
			"width": 52.22057143284038,
			"height": 19.4431885599262,
			"seed": 1657888411,
			"groupIds": [
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					15.281223056580373,
					-14.902701846909155
				],
				[
					29.631746084813198,
					-0.04637072557415544
				],
				[
					27.95956948378734,
					2.479317580941423
				],
				[
					26.671836104022468,
					4.540486713017045
				],
				[
					-22.336318731782203,
					2.0173646757832393
				],
				[
					-22.588825348027182,
					-0.969553202600364
				],
				[
					0.5361907138049135,
					-0.25347038855912646
				]
			]
		},
		{
			"type": "line",
			"version": 2291,
			"versionNonce": 1397096251,
			"isDeleted": false,
			"id": "U_R8__0KgaRvgGqc17K4P",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1252.164836576584,
			"y": -881.9973097618895,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.84285974130535,
			"height": 15.460966018427795,
			"seed": 335598395,
			"groupIds": [
				"Q09GULL_OqeBspO1YvZMa",
				"Hv8GmVjw5VIY6F__89AaB"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843975728,
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
					-0.3835800056802405,
					-7.654776429145379
				],
				[
					-10.171599624310314,
					-7.666553008267129
				],
				[
					-15.371800490791165,
					-15.460966018427795
				],
				[
					10.479473049922193,
					-3.5144676836230353
				],
				[
					20.471059250514184,
					-8.988894606796421
				],
				[
					1.0262447520392777,
					-6.954911155623444
				]
			]
		},
		{
			"id": "8PoHAsRh",
			"type": "text",
			"x": -1479.4457952072562,
			"y": -748.0660705256612,
			"width": 84.47698101468349,
			"height": 33.37426592296761,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"seed": 1934255445,
			"version": 144,
			"versionNonce": 460366453,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714844017811,
			"link": null,
			"locked": false,
			"text": "Adults",
			"rawText": "Adults",
			"fontSize": 26.699412738374086,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Adults",
			"lineHeight": 1.25
		},
		{
			"type": "ellipse",
			"version": 565,
			"versionNonce": 1652460501,
			"isDeleted": false,
			"id": "Czigyv1WG0sHTjUhTFW7c",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1459.5090997712666,
			"y": -928.2749994531006,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 54.77636414698838,
			"height": 42.04741560309746,
			"seed": 879328827,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 611,
			"versionNonce": 1455966517,
			"isDeleted": false,
			"id": "Y2JrX-ceOEKwTsK6g5fih",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1449.8540241337128,
			"y": -903.6509431508645,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 20.718509902380113,
			"height": 6.087819493195332,
			"seed": 682884827,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					6.421102925686131,
					6.087819493195332
				],
				[
					20.718509902380113,
					1.3772568824470812
				]
			]
		},
		{
			"type": "line",
			"version": 779,
			"versionNonce": 162749077,
			"isDeleted": false,
			"id": "SObQ3Tmrz3llwqCWRNLYz",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1448.459963464491,
			"y": -912.9802964376335,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 4.794295137188621,
			"height": 2.343866353375668,
			"seed": 2099604347,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					3.069198257549619,
					-2.204436543633043
				],
				[
					4.794295137188621,
					0.13942980974262517
				]
			]
		},
		{
			"type": "line",
			"version": 814,
			"versionNonce": 1140146165,
			"isDeleted": false,
			"id": "l-kcnaD1FOeYiKjk5Stml",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1433.0972985171757,
			"y": -912.8939709236837,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 4.794295137188621,
			"height": 2.343866353375668,
			"seed": 1711293467,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					3.069198257549619,
					-2.204436543633043
				],
				[
					4.794295137188621,
					0.13942980974262517
				]
			]
		},
		{
			"type": "line",
			"version": 617,
			"versionNonce": 462649685,
			"isDeleted": false,
			"id": "de1IQoQSjaDeP2HborGRr",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1441.006284638203,
			"y": -875.5590132240724,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 66.68982372733072,
			"height": 18.690844431696412,
			"seed": 1798768827,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					-34.837967618754845,
					8.18415915991447
				],
				[
					-66.68982372733072,
					18.690844431696412
				]
			]
		},
		{
			"type": "line",
			"version": 589,
			"versionNonce": 1239647925,
			"isDeleted": false,
			"id": "SCxRyaTdum4a3UINNkZFu",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1428.95124356246,
			"y": -877.2179691257769,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 68.90175480417103,
			"height": 17.91666906107393,
			"seed": 1919695195,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					35.1697577865525,
					6.63580335595331
				],
				[
					68.90175480417103,
					17.91666906107393
				]
			]
		},
		{
			"type": "line",
			"version": 588,
			"versionNonce": 1099622421,
			"isDeleted": false,
			"id": "HzBPT628eBXs9de0KcZnW",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1433.3751158415723,
			"y": -869.9185854342282,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 1.3271606711906443,
			"height": 93.5648323816578,
			"seed": 150099451,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					-1.3271606711906443,
					40.588995506342336
				],
				[
					-0.6635803355953221,
					93.5648323816578
				]
			]
		},
		{
			"type": "line",
			"version": 579,
			"versionNonce": 75439477,
			"isDeleted": false,
			"id": "KVJaXFeRTQixM_BI1RT9a",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1441.669870036514,
			"y": -768.6119816268389,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 27.42798382946288,
			"height": 0.2211951327705002,
			"seed": 1842077339,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					-27.42798382946288,
					-0.2211951327705002
				]
			]
		},
		{
			"type": "line",
			"version": 565,
			"versionNonce": 973448917,
			"isDeleted": false,
			"id": "5V8-aAvhPuaplZR7gyEPl",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1429.8360139681097,
			"y": -768.9437717946366,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 28.533954430599206,
			"height": 0.3317901677976805,
			"seed": 1537954619,
			"groupIds": [
				"WHqjjw8u3e3sg0hjkIaje",
				"PcNfOF2bBH0KnkPe8EOc4"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714844017811,
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
					28.533954430599206,
					-0.3317901677976805
				]
			]
		},
		{
			"id": "LKzimptD",
			"type": "text",
			"x": -1455.3547949821009,
			"y": -973.2913239333936,
			"width": 9.999984741210938,
			"height": 25,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"seed": 1072968187,
			"version": 2,
			"versionNonce": 1595445397,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714843912886,
			"link": null,
			"locked": false,
			"text": "",
			"rawText": "",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "",
			"lineHeight": 1.25
		},
		{
			"id": "LfRtP9Tl",
			"type": "text",
			"x": -1257.3547949821007,
			"y": -965.2913239333936,
			"width": 9.999984741210938,
			"height": 25,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"seed": 1973628757,
			"version": 2,
			"versionNonce": 1175360795,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714843913769,
			"link": null,
			"locked": false,
			"text": "",
			"rawText": "",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "",
			"lineHeight": 1.25
		},
		{
			"id": "8flLuvXI",
			"type": "text",
			"x": -1303.3547949821007,
			"y": -641.2913239333935,
			"width": 18,
			"height": 45,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"seed": 118557589,
			"version": 2,
			"versionNonce": 1052026075,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714843959628,
			"link": null,
			"locked": false,
			"text": "",
			"rawText": "",
			"fontSize": 36,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "",
			"lineHeight": 1.25
		},
		{
			"type": "rectangle",
			"version": 3434,
			"versionNonce": 480024981,
			"isDeleted": true,
			"id": "HxZTbYxf2gWcN46en_c8P",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -30.07205876400758,
			"y": 1223.8445436557797,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2667,
			"versionNonce": 2084779579,
			"isDeleted": true,
			"id": "IdXmOZ6gXAPiw2KQV_bc5",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -4.382604780386146,
			"y": 1283.8231297816103,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917409570,
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
			"version": 1573,
			"versionNonce": 1163828981,
			"isDeleted": true,
			"id": "-Zp2_V910VitqD_bWmGes",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -15.045146632510978,
			"y": 1270.5695320268194,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1628,
			"versionNonce": 1016510171,
			"isDeleted": true,
			"id": "3U6sFw--AVJ9RDLPvyvU_",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -3.2408825182299097,
			"y": 1270.1367159878944,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1648,
			"versionNonce": 108591189,
			"isDeleted": true,
			"id": "XaiK0QfpBCsSMhkY52PaI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 9.114237172079129,
			"y": 1270.3334331395715,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1669,
			"versionNonce": 1945183099,
			"isDeleted": true,
			"id": "A5RSDRBhk1BmzpquP6UAQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 21.430008148577144,
			"y": 1269.7432420584325,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1711,
			"versionNonce": 1505830325,
			"isDeleted": true,
			"id": "lf05_oK7EdLPgyXUDfDh-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 33.11621951706343,
			"y": 1269.9006237049907,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1615,
			"versionNonce": 2056584219,
			"isDeleted": true,
			"id": "8Nl-jSWJjhpvdVkoSZlis",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -3.575349887841412,
			"y": 1258.6865969023036,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1639,
			"versionNonce": 1650239253,
			"isDeleted": true,
			"id": "KXz_gjR2crIOEK19eh-KF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 8.8191251206365,
			"y": 1258.8439851532105,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1663,
			"versionNonce": 2088026299,
			"isDeleted": true,
			"id": "UHZZDw15rhOL3m88SUDKE",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 21.37098838002612,
			"y": 1258.8439719445198,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1682,
			"versionNonce": 1119943797,
			"isDeleted": true,
			"id": "7--5lQR0oaNSk7sGERoEP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 20.957823582784613,
			"y": 1246.8036287560415,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 2192,
			"versionNonce": 53670235,
			"isDeleted": true,
			"id": "bSlhQ21e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -32.22565837482807,
			"y": 1342.2347603173275,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 111.94245910644531,
			"height": 42.41293532338311,
			"seed": 1684934048,
			"groupIds": [
				"msB06AshkaOcsBzIQFpMQ"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
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
			"version": 3388,
			"versionNonce": 850634197,
			"isDeleted": true,
			"id": "8UAblmj7Y7obzIYou-UeD",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -189.17139861532837,
			"y": 1233.737050513499,
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
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1343,
			"versionNonce": 1075973627,
			"isDeleted": true,
			"id": "jKUbmzEZUUknxJnZcZbL0",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -180.12357621847434,
			"y": 1242.904137975542,
			"strokeColor": "#000000",
			"backgroundColor": "#868e96",
			"width": 74.6381663541306,
			"height": 74.6381663541306,
			"seed": 58138016,
			"groupIds": [
				"-YHk8_5qEJ9bdQNZo8f-_",
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 4890,
			"versionNonce": 1430922037,
			"isDeleted": true,
			"id": "gaOeLtASgAUd9QWNpEmTV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -157.46884367380926,
			"y": 1257.8771591554835,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 40.42845896405703,
			"height": 46.693371979623926,
			"seed": 1845651872,
			"groupIds": [
				"-YHk8_5qEJ9bdQNZo8f-_",
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917409570,
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
			"version": 2220,
			"versionNonce": 373593755,
			"isDeleted": true,
			"id": "SizzwGgf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -189.55899170816133,
			"y": 1334.4379670972548,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 92.0501708984375,
			"height": 35.96499897442564,
			"seed": 21247392,
			"groupIds": [
				"SjFKopVcvFVK61fToRJu9"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
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
			"version": 387,
			"versionNonce": 1323955349,
			"isDeleted": true,
			"id": "x299zNfV9ZT8ZDgt4jEWi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 172.27434162517216,
			"y": 1212.2366749592566,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 106.33333333333326,
			"height": 106.33333333333326,
			"seed": 1532221536,
			"groupIds": [
				"eu0zB0LaxWqvQ4T5MVsJV"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
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
			"version": 696,
			"versionNonce": 1682770747,
			"isDeleted": true,
			"id": "Nt6ZLJmr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 126.0888430696707,
			"y": 1326.1303944710867,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 191.79371643066406,
			"height": 33.54589430967364,
			"seed": 1372471392,
			"groupIds": [
				"eu0zB0LaxWqvQ4T5MVsJV"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917409570,
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
			"type": "arrow",
			"version": 425,
			"versionNonce": 103021365,
			"isDeleted": true,
			"id": "-M4YSmX-2hl3WO3N0wWQr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1021.7970869462565,
			"y": 641.3933575239214,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 79,
			"height": 0.3321836128277482,
			"seed": 10413614,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.1990573082134081,
				"gap": 2.7074526635618668,
				"elementId": "QofJKVok2ElsrvC0a-5TV"
			},
			"endBinding": {
				"focus": 0.016909645559655108,
				"gap": 5.959579467773665,
				"elementId": "KoRcF5YsRAjnC9yl4MXhc"
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
			"version": 487,
			"versionNonce": 563994619,
			"isDeleted": true,
			"id": "ebVW5i9Ic1MzNfA3x18Kp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -786.2970869462565,
			"y": 876.9979888450284,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 56.200202701718354,
			"height": 43.39384689373452,
			"seed": 1995052402,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917429159,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.004779173689316546,
				"gap": 7.163904337001554,
				"elementId": "hiF1vLUrhPmvoOt3nJMvV"
			},
			"endBinding": {
				"focus": 0.09584531512765687,
				"gap": 6.423398205862647,
				"elementId": "lv4cG2rXEU9d_drFWhvnu"
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
			"version": 484,
			"versionNonce": 1519664795,
			"isDeleted": true,
			"id": "qFpojBnlmJJZdKmDMwqIt",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -834.6304202795895,
			"y": 648.4271511497326,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 93.33333333333348,
			"height": 205,
			"seed": 1417786030,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.8531279849182286,
				"gap": 12.747227193510877,
				"elementId": "uO42DoOHUcuDnSCsgZbsi"
			},
			"endBinding": {
				"focus": -0.29224252582620075,
				"gap": 17.07840016347302,
				"elementId": "hiF1vLUrhPmvoOt3nJMvV"
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
			"version": 377,
			"versionNonce": 772317525,
			"isDeleted": true,
			"id": "Xu6DcuyGM6S0RIBJrJl4I",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1221.2970869462563,
			"y": 635.0938178163992,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 95,
			"height": 3.3333333333332575,
			"seed": 1940559666,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917434081,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.48105050517775383,
				"gap": 29.070367869255733,
				"elementId": "Rk518Hz-_vELLbEIyXQK1"
			},
			"endBinding": {
				"focus": 0.04077443715531453,
				"gap": 4.833935525712263,
				"elementId": "QofJKVok2ElsrvC0a-5TV"
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
			"type": "arrow",
			"version": 2008,
			"versionNonce": 690804123,
			"isDeleted": true,
			"id": "1QoFVbs_TZpOC3aj22Lbp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -928.7634516605747,
			"y": 661.3220098393218,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 178.32766752377063,
			"height": 148.368513056275,
			"seed": 2035831918,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917475846,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "fE4EQWYfd_0em_Z1uiWA4",
				"focus": 1.2649463339007112,
				"gap": 12.695682290491959
			},
			"endBinding": {
				"elementId": "RW3IqUSwk3kHfWo0x9Ccd",
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
			"type": "ellipse",
			"version": 927,
			"versionNonce": 2118726069,
			"isDeleted": true,
			"id": "lv4cG2rXEU9d_drFWhvnu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1157.5837560861437,
			"y": 808.934601430431,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 110.70586688701928,
			"height": 107.83038982501878,
			"seed": 7313070,
			"groupIds": [
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 873,
			"versionNonce": 1264824347,
			"isDeleted": true,
			"id": "RW3IqUSwk3kHfWo0x9Ccd",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1137.4554166521402,
			"y": 820.436509678433,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 821883698,
			"groupIds": [
				"3MDeeUpdEEoU1jrvhzXf-",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 844,
			"versionNonce": 1375941397,
			"isDeleted": true,
			"id": "mQJfSws9RC13H48RoNYPG",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1130.266723997139,
			"y": 827.6252023334342,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 535073006,
			"groupIds": [
				"3MDeeUpdEEoU1jrvhzXf-",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 846,
			"versionNonce": 692909243,
			"isDeleted": true,
			"id": "iogd4kOd4ay4gTjgOFYO6",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1130.985593262639,
			"y": 839.8459798469364,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 723238130,
			"groupIds": [
				"3MDeeUpdEEoU1jrvhzXf-",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 855,
			"versionNonce": 364251253,
			"isDeleted": true,
			"id": "wYSlyNg6sKtbG-rVxd1h5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1130.985593262639,
			"y": 854.2233651569389,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1933591342,
			"groupIds": [
				"3MDeeUpdEEoU1jrvhzXf-",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 924,
			"versionNonce": 1323607387,
			"isDeleted": true,
			"id": "xTxxyq6c3n-Mo34xMX-ix",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1123.7969006076378,
			"y": 836.2516335194358,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 305876658,
			"groupIds": [
				"dkUX-NIW1i62jKkUtUlsQ",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 898,
			"versionNonce": 2066166229,
			"isDeleted": true,
			"id": "7Ij4MV-v3BzXYGWBsdyzQ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1116.6082079526366,
			"y": 843.440326174437,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1022078318,
			"groupIds": [
				"dkUX-NIW1i62jKkUtUlsQ",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 900,
			"versionNonce": 326975995,
			"isDeleted": true,
			"id": "jYU_yy5pgDn_ODSA4i9F9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1117.3270772181368,
			"y": 855.6611036879392,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 453159026,
			"groupIds": [
				"dkUX-NIW1i62jKkUtUlsQ",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 909,
			"versionNonce": 1600925493,
			"isDeleted": true,
			"id": "xgSxYVOGhWLpoY2NMFnho",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1117.3270772181368,
			"y": 870.0384889979416,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 170905518,
			"groupIds": [
				"dkUX-NIW1i62jKkUtUlsQ",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 908,
			"versionNonce": 1075399323,
			"isDeleted": true,
			"id": "JiWoaAPCzpkjUcVX6HPll",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1107.981776766635,
			"y": 846.3158032364375,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 1295567410,
			"groupIds": [
				"NxJ55-bIZIoOHYWJu_5ul",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 882,
			"versionNonce": 1625981077,
			"isDeleted": true,
			"id": "fka4pvGeL-WA-sOdpGOxT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1100.7930841116338,
			"y": 853.5044958914388,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1463134702,
			"groupIds": [
				"NxJ55-bIZIoOHYWJu_5ul",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 884,
			"versionNonce": 1500200763,
			"isDeleted": true,
			"id": "567WsftF8O6Y7LeTr0AQp",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1101.511953377134,
			"y": 865.7252734049409,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 532984818,
			"groupIds": [
				"NxJ55-bIZIoOHYWJu_5ul",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 893,
			"versionNonce": 894936565,
			"isDeleted": true,
			"id": "_4QEfqg4ra24pV_hBwM3V",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1101.511953377134,
			"y": 880.1026587149435,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 856046638,
			"groupIds": [
				"NxJ55-bIZIoOHYWJu_5ul",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 925,
			"versionNonce": 701865947,
			"isDeleted": true,
			"id": "KdCsxFDVnTGPs-dWjVh4v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1096.479868518633,
			"y": 859.2554500154398,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 24.441555027004263,
			"height": 48.88311005400853,
			"seed": 346908082,
			"groupIds": [
				"gAtqPleRpLF41cDXwFeo9",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 899,
			"versionNonce": 1069096789,
			"isDeleted": true,
			"id": "CcRpS9Ktw_Xi2mLb1VpWv",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1089.291175863632,
			"y": 866.444142670441,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1670022766,
			"groupIds": [
				"gAtqPleRpLF41cDXwFeo9",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 901,
			"versionNonce": 191556731,
			"isDeleted": true,
			"id": "TKgd6cxsa1RG04YkWnN_A",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1090.0100451291319,
			"y": 878.6649201839432,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 1427758962,
			"groupIds": [
				"gAtqPleRpLF41cDXwFeo9",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 910,
			"versionNonce": 1717857461,
			"isDeleted": true,
			"id": "7FBS2eHYy2uWjiWfe6mGD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1090.0100451291319,
			"y": 893.0423054939457,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 12.939646779002253,
			"height": 4.313215593000751,
			"seed": 160139438,
			"groupIds": [
				"gAtqPleRpLF41cDXwFeo9",
				"xLOcb--tC2twZgKfHC3QA",
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 831,
			"versionNonce": 1911399707,
			"isDeleted": true,
			"id": "608JGAdT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1146.0818478381416,
			"y": 919.6404683174503,
			"strokeColor": "#000000",
			"backgroundColor": "#ffcf66",
			"width": 97.05978393554688,
			"height": 71.88692655001252,
			"seed": 1297162546,
			"groupIds": [
				"h-CE7PKad_2MOQeFq7OMI"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917478573,
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
			"type": "rectangle",
			"version": 3019,
			"versionNonce": 198345365,
			"isDeleted": true,
			"id": "hiF1vLUrhPmvoOt3nJMvV",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -900.4221436482151,
			"y": 870.5055513132056,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 106.96115236495706,
			"height": 106.8587269774196,
			"seed": 993684910,
			"groupIds": [
				"Z4-bB0SvKkkcx8YnlGRHR",
				"CYkEfpf_jo_slF_s2dm8G",
				"4NnYEN0N_E7Md971KdK5I"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917429159,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2380,
			"versionNonce": 1348973371,
			"isDeleted": true,
			"id": "if1GOu2DBx0y0AstlziVG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -864.2721618019759,
			"y": 905.6932531624523,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.07285065911464,
			"height": 35.82425929166074,
			"seed": 2117012530,
			"groupIds": [
				"c8SRr8-hWrgNAsdgOCMEI",
				"CYkEfpf_jo_slF_s2dm8G",
				"4NnYEN0N_E7Md971KdK5I"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2704,
			"versionNonce": 294416885,
			"isDeleted": true,
			"id": "rP9NlVVHnqYfyRRGLMamM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": -845.8871777523686,
			"y": 935.5644306836217,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 35.340211482939296,
			"height": 35.38596252270706,
			"seed": 154961902,
			"groupIds": [
				"A5FIV6-6vEOVzk0kU5wre",
				"c8SRr8-hWrgNAsdgOCMEI",
				"CYkEfpf_jo_slF_s2dm8G",
				"4NnYEN0N_E7Md971KdK5I"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 2718,
			"versionNonce": 1898157019,
			"isDeleted": true,
			"id": "VbtMQWqhc8wlvAl0LKfGs",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": -815.1410549154089,
			"y": 904.4189053782081,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 35.340211482939296,
			"height": 35.38596252270706,
			"seed": 480425458,
			"groupIds": [
				"k2nsBerLKmnY33Bycg-jm",
				"c8SRr8-hWrgNAsdgOCMEI",
				"CYkEfpf_jo_slF_s2dm8G",
				"4NnYEN0N_E7Md971KdK5I"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 2771,
			"versionNonce": 1400138581,
			"isDeleted": true,
			"id": "C9J0wCdq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -881.7871157883442,
			"y": 984.1825655262819,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 67.33894348144531,
			"height": 39.82348379726615,
			"seed": 2088852014,
			"groupIds": [
				"4NnYEN0N_E7Md971KdK5I"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"type": "rectangle",
			"version": 2934,
			"versionNonce": 1105953563,
			"isDeleted": true,
			"id": "QofJKVok2ElsrvC0a-5TV",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1121.4631514205441,
			"y": 583.4566134100569,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 96.95861181072574,
			"height": 96.95861181072574,
			"seed": 1726002990,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917434082,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3400,
			"versionNonce": 2094414005,
			"isDeleted": true,
			"id": "C2RuJswFSeGYRDj0WJbqo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1084.1266647260122,
			"y": 613.5940862554581,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 22.748946471158828,
			"height": 0,
			"seed": 2114722482,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 3451,
			"versionNonce": 223254811,
			"isDeleted": true,
			"id": "U2-NpTecfrSnav484KrH1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1086.3340176945192,
			"y": 650.7542032460736,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.701067588859278,
			"height": 0,
			"seed": 1281204590,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 3297,
			"versionNonce": 660036117,
			"isDeleted": true,
			"id": "zxUjPVSl70u3LQwF4YuOe",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1111.529265548918,
			"y": 607.3394797610057,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.426941630593085,
			"height": 72.60298153552196,
			"seed": 1792668786,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 3245,
			"versionNonce": 536001979,
			"isDeleted": true,
			"id": "h0mkr1GlzMvyTCeXu-Ofh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1059.8491385849964,
			"y": 595.9635804423707,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 25.45952787686465,
			"height": 72.40256469241159,
			"seed": 1061372846,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 2970,
			"versionNonce": 468537205,
			"isDeleted": true,
			"id": "g3pWi_0d97-uxNaZii4mM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1079.823265316844,
			"y": 641.157036950324,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 13.648658319418736,
			"height": 18.301853045094497,
			"seed": 1011258930,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 3089,
			"versionNonce": 1609125467,
			"isDeleted": true,
			"id": "PA_sGVmy-vHlQDID-SA9d",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1068.1130861672095,
			"y": 626.3571817797387,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.52333842785504,
			"height": 12.617992815585021,
			"seed": 29007342,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424547,
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
			"version": 3228,
			"versionNonce": 1759353045,
			"isDeleted": true,
			"id": "Tq-JyJ7o5mxsDHRcz7Nox",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -1085.8178923981882,
			"y": 625.5422871142852,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.523338427855042,
			"height": 12.617992815585021,
			"seed": 54067186,
			"groupIds": [
				"u8nnY8bKiQsze5T4Ygnn4",
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424548,
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
			"version": 2913,
			"versionNonce": 1342491387,
			"isDeleted": true,
			"id": "ou2BeJ2j",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1173.0867008213881,
			"y": 685.5256948228647,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 200.14634704589844,
			"height": 35.99203374908673,
			"seed": 684503086,
			"groupIds": [
				"fGVVOPfBZOGMAh0kTQmdH"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424548,
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
			"version": 2638,
			"versionNonce": 712273179,
			"isDeleted": true,
			"id": "_9A0dXvFmerell5jWaQRZ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1306.5875113308484,
			"y": 996.9020486896427,
			"strokeColor": "#000000",
			"backgroundColor": "#40c05788",
			"width": 106.50167096688487,
			"height": 106.50167096688487,
			"seed": 465056178,
			"groupIds": [
				"ak6Zf77bp5zn7YdE5acKL",
				"rW5pOJY8MdkGTZhguqT6o",
				"jkRWGjiyix4dkTNRP_NGp",
				"-uhZdwRgHK12XD8wYd9QX"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917451618,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2426,
			"versionNonce": 925419029,
			"isDeleted": true,
			"id": "z-1UGOJb3bYRO6HWKUdp7",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1284.3107275748562,
			"y": 1015.0128198504071,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 63.994487962286954,
			"height": 17.598397113796313,
			"seed": 1080195694,
			"groupIds": [
				"jkRWGjiyix4dkTNRP_NGp",
				"-uhZdwRgHK12XD8wYd9QX"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917451618,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3044,
			"versionNonce": 1094586811,
			"isDeleted": true,
			"id": "_YE5TVAWADkRpWdPCgN-m",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1283.7250145481742,
			"y": 1024.6326505055,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 62.669193790678,
			"height": 66.254411607132,
			"seed": 1223371634,
			"groupIds": [
				"jkRWGjiyix4dkTNRP_NGp",
				"-uhZdwRgHK12XD8wYd9QX"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917451618,
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
			"version": 2436,
			"versionNonce": 112278389,
			"isDeleted": true,
			"id": "fIU__Lw9EXNc_jqSS6H5Y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1256.2812434699924,
			"y": 1041.426737565784,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 7.688347830880011,
			"height": 7.688347830880011,
			"seed": 1866792110,
			"groupIds": [
				"jkRWGjiyix4dkTNRP_NGp",
				"-uhZdwRgHK12XD8wYd9QX"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917451618,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3122,
			"versionNonce": 1688871515,
			"isDeleted": true,
			"id": "-EqDH59nSubvuSFfuORHl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1252.206284280138,
			"y": 1045.6373128189844,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 38.04246444892518,
			"height": 18.87015206949028,
			"seed": 1360588082,
			"groupIds": [
				"jkRWGjiyix4dkTNRP_NGp",
				"-uhZdwRgHK12XD8wYd9QX"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917451618,
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
			"version": 2885,
			"versionNonce": 742655189,
			"isDeleted": true,
			"id": "hcGmDQcD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1338.1867145542983,
			"y": 1110.0958321578444,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 169.64625549316406,
			"height": 39.274847426662085,
			"seed": 454899438,
			"groupIds": [
				"-uhZdwRgHK12XD8wYd9QX"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917451618,
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
			"version": 2688,
			"versionNonce": 1113395899,
			"isDeleted": true,
			"id": "KoRcF5YsRAjnC9yl4MXhc",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -936.8375074784828,
			"y": 591.5676365586263,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 100.217322075418,
			"height": 100.217322075418,
			"seed": 37870578,
			"groupIds": [
				"SLjLFg-Rj5DPd3iJLYli8",
				"IYzYmUwlHKHuhu6JR8JBy",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424548,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1959,
			"versionNonce": 1959244699,
			"isDeleted": true,
			"id": "EVp4PYWiTk4WMQ8tKRDdw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -927.6231227657033,
			"y": 618.6297150790991,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 47.755657481286896,
			"height": 47.755657481286896,
			"seed": 542086190,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1915,
			"versionNonce": 1668491157,
			"isDeleted": true,
			"id": "Yl0SIMULbfmWhJpIrIAnG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -867.4374536893858,
			"y": 610.3355734275306,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 2101710258,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1908,
			"versionNonce": 509904955,
			"isDeleted": true,
			"id": "4fmwuSs1HEZOiAycqVXaF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -867.2527633082232,
			"y": 660.078021572289,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 233365102,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1963,
			"versionNonce": 1807665781,
			"isDeleted": true,
			"id": "uO42DoOHUcuDnSCsgZbsi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -860.0443621789761,
			"y": 633.0465173376014,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 14.416802258501734,
			"height": 14.416802258501734,
			"seed": 1215104882,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1882,
			"versionNonce": 1925040347,
			"isDeleted": true,
			"id": "a-lI_8CTB2TZ1jpeI6Gd_",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -878.9664151432594,
			"y": 642.0570187491647,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 106881198,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
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
			"version": 1906,
			"versionNonce": 2005141077,
			"isDeleted": true,
			"id": "2glaCJU39y-e_F-QUMYgI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.41450687458479507,
			"x": -884.5574063713582,
			"y": 660.9790717134473,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 1006586162,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
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
			"version": 1968,
			"versionNonce": 929428859,
			"isDeleted": true,
			"id": "OeRd7onaVuHrWUhtkI-y2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.900439403044541,
			"x": -884.5574063713575,
			"y": 623.3196561660428,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.02100282312723,
			"height": 0,
			"seed": 2103089902,
			"groupIds": [
				"SB3ykYFJiFbjyhQVBPKXH",
				"hBk8I4fE5GuE1cGbAa42B",
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917424548,
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
			"version": 3450,
			"versionNonce": 1379562421,
			"isDeleted": true,
			"id": "DURt6w4Z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -918.2965869454092,
			"y": 699.2205694567946,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 61.562530517578125,
			"height": 36.95735473713406,
			"seed": 258167538,
			"groupIds": [
				"JL_RTatEJQB5cLEn61Rox"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917424548,
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
			"type": "text",
			"version": 2252,
			"versionNonce": 432038645,
			"isDeleted": true,
			"id": "BsSd6jtq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1595.5041596129693,
			"y": 1115.495309022653,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 150.04879760742188,
			"height": 31.136012047488816,
			"seed": 449210734,
			"groupIds": [
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 2000,
			"versionNonce": 723727067,
			"isDeleted": true,
			"id": "RS3FLpdwYzoU0_twQRdkX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1562.6691877914818,
			"y": 1024.461076467419,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 84.43157714347974,
			"height": 84.43157714347974,
			"seed": 708947058,
			"groupIds": [
				"rye555KlDbevTeT7eOll2",
				"CKkJLZE_9a1uLGo5KFBw_",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3327,
			"versionNonce": 1912749141,
			"isDeleted": true,
			"id": "sHzAbUiTiLS2fFUjzccJJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1536.660899236804,
			"y": 1052.4458497930673,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.678720425002144,
			"height": 11.236901335627255,
			"seed": 1431505838,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1499,
			"versionNonce": 1401823099,
			"isDeleted": true,
			"id": "bP4T7FjNgwcFk_fXQHCUG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1536.3544129385323,
			"y": 1058.788722820109,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.22273187379533896,
			"height": 34.96890418587131,
			"seed": 636964402,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1559,
			"versionNonce": 193063349,
			"isDeleted": true,
			"id": "SWovAES1ins6Fm3ajRr14",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1505.9292389780865,
			"y": 1058.4323518220385,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.15041600671561423,
			"height": 33.518229949663585,
			"seed": 1385260526,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1563,
			"versionNonce": 1429370907,
			"isDeleted": true,
			"id": "19rtdxdY7XqsuuLUgDIXe",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1535.953495565701,
			"y": 1093.8021733807411,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1712502770,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1586,
			"versionNonce": 660925205,
			"isDeleted": true,
			"id": "e03W3fV2SBUggD8GkO2sz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1536.047522521696,
			"y": 1082.9779621819466,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1133148206,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1609,
			"versionNonce": 503495867,
			"isDeleted": true,
			"id": "nURG-3oIlezJN2Gi3DyQa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1536.047522521696,
			"y": 1071.223803945852,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.068802962373493,
			"height": 5.791028718679419,
			"seed": 1788537266,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1272,
			"versionNonce": 1176551541,
			"isDeleted": true,
			"id": "cWuqlx_WvksbqjbupoxZV",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1542.6556981101426,
			"y": 1074.5626269413103,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.007862475072281,
			"height": 24.814334053976648,
			"seed": 1344750190,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1313,
			"versionNonce": 966880603,
			"isDeleted": true,
			"id": "lNL1rL4EIycVkjrt9l4sw",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1498.5309612397255,
			"y": 1074.7305434875404,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 11.007862475072281,
			"height": 24.814334053976648,
			"seed": 448193394,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1295,
			"versionNonce": 1031465429,
			"isDeleted": true,
			"id": "B9CyUtP9FkpZPSILRD9fP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1553.663560585215,
			"y": 1040.8673733311732,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 66.42032273094495,
			"height": 5.597218207663906,
			"seed": 993051822,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1224,
			"versionNonce": 459344379,
			"isDeleted": true,
			"id": "dkykS0cwF5trIwMuNWkoi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1548.6260641983172,
			"y": 1073.8909607563899,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.343513968685692,
			"height": 5.410644267408442,
			"seed": 1621992754,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1269,
			"versionNonce": 243853109,
			"isDeleted": true,
			"id": "1RvubsP1xYJEQTV_4Ds7Z",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1492.6538821216784,
			"y": 1074.0961920906716,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.343513968685692,
			"height": 5.410644267408442,
			"seed": 105905902,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1275,
			"versionNonce": 675549851,
			"isDeleted": true,
			"id": "3oAS1FzivRAQ4GWSdZdlZ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1540.4168108270774,
			"y": 1061.9502285800409,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.649531550474004,
			"height": 21.269429189122842,
			"seed": 1172713202,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1315,
			"versionNonce": 2075146389,
			"isDeleted": true,
			"id": "oKxLiXhDvysl38Hn0zRaS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1501.0683668272,
			"y": 1061.9502285800409,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.649531550474005,
			"height": 21.269429189122842,
			"seed": 370012462,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1264,
			"versionNonce": 16582459,
			"isDeleted": true,
			"id": "k52ERmZgw2bxvlRlM3Q5N",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1531.4612616948148,
			"y": 1047.770609120625,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.209253371240395,
			"height": 7.089809729707613,
			"seed": 250052786,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1279,
			"versionNonce": 1587961333,
			"isDeleted": true,
			"id": "6FiM2N-Yap71yDgNfx6iK",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1518.0279379964218,
			"y": 1047.770609120625,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.209253371240395,
			"height": 7.089809729707613,
			"seed": 1439931246,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1252,
			"versionNonce": 200173531,
			"isDeleted": true,
			"id": "A12UZZZf-BMtosfwS3p8o",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1553.4769866449597,
			"y": 1041.053947271429,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.918052745364734,
			"height": 8.209253371240395,
			"seed": 1465424498,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"version": 1300,
			"versionNonce": 1047582549,
			"isDeleted": true,
			"id": "2fjpQ3BdG9__5KrEx8aZJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -1487.5230987646532,
			"y": 1040.9793176953272,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.918052745364734,
			"height": 8.209253371240395,
			"seed": 1542061486,
			"groupIds": [
				"FAAJB61Von4wq2ILlJMDy",
				"tofQXKqiLp2kOuDldrchi",
				"JfODokSjxr-v2O-Wi13o2"
			],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714917448362,
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
			"id": "HxrEDsZo",
			"type": "text",
			"x": -28.889357317346594,
			"y": 329.3397127356769,
			"width": 18,
			"height": 45,
			"angle": 0,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"seed": 422926939,
			"version": 2,
			"versionNonce": 1586620981,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714917509769,
			"link": null,
			"locked": false,
			"text": "",
			"rawText": "",
			"fontSize": 36,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "",
			"lineHeight": 1.25
		},
		{
			"type": "ellipse",
			"version": 298,
			"versionNonce": 95964693,
			"isDeleted": true,
			"id": "oFjKkJ6jWEDn0QgSTeZX4",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1537.8872959728942,
			"y": -919.3232291444191,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 73.85739636353019,
			"height": 56.69439161618387,
			"seed": 440773179,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 220,
			"versionNonce": 189467067,
			"isDeleted": true,
			"id": "eJf6tL7ik0q6pg9R2QVQz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1500.729464355121,
			"y": -921.889438085867,
			"strokeColor": "#e67700",
			"backgroundColor": "#fab005",
			"width": 37.1048043079615,
			"height": 45.60292881204641,
			"seed": 1512745691,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					17.16159531622833,
					3.131303800061339
				],
				[
					28.475353364185878,
					13.075859858148366
				],
				[
					35.54646347328611,
					22.975403005451255
				],
				[
					36.53640904840432,
					36.41049473351752
				],
				[
					31.162376241449863,
					45.60292881204641
				],
				[
					-0.5683952595571782,
					7.165863226362738
				]
			]
		},
		{
			"type": "line",
			"version": 173,
			"versionNonce": 1779417973,
			"isDeleted": true,
			"id": "BrcSLtcIfmdjSi7oCtf4R",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1502.0029457408718,
			"y": -918.1906938362806,
			"strokeColor": "#e67700",
			"backgroundColor": "#fab005",
			"width": 36.545361996626525,
			"height": 38.9200923093722,
			"seed": 585537403,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					-14.945750334047602,
					22.418625501071382
				],
				[
					-33.723738495952205,
					35.06503401553572
				],
				[
					-35.831466669880626,
					23.75991224934522
				],
				[
					-30.65793770809495,
					12.071567577499977
				],
				[
					-15.631810037869968,
					0.23422387575573822
				],
				[
					0.7138953267458987,
					-3.8550582938364784
				]
			]
		},
		{
			"type": "line",
			"version": 371,
			"versionNonce": 1381505627,
			"isDeleted": true,
			"id": "NnAI-Xlwf91XSLSiqi4OS",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1516.6728964842907,
			"y": -877.1040162224518,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 26.52265225868655,
			"height": 6.380434383223692,
			"seed": 314306587,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					13.386872726012637,
					5.697312498977821
				],
				[
					26.52265225868655,
					-0.6831218842458711
				]
			]
		},
		{
			"type": "line",
			"version": 557,
			"versionNonce": 848399573,
			"isDeleted": true,
			"id": "0WarNdBbWKB0vNoza5TPF",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1515.932426725276,
			"y": -893.7350021250754,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 12.028571343153317,
			"height": 3.5725033153668413,
			"seed": 1537029307,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					6.817397273723202,
					-3.384503931263527
				],
				[
					12.028571343153317,
					0.18799938410331407
				]
			]
		},
		{
			"type": "line",
			"version": 543,
			"versionNonce": 582620923,
			"isDeleted": true,
			"id": "Hqou3ZaXHtSc01ax-PR_B",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1496.9699679182581,
			"y": -895.1786872367647,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 6.464360344927229,
			"height": 3.16033875158044,
			"seed": 1294787931,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					4.138335863581801,
					-2.972339367477126
				],
				[
					6.464360344927229,
					0.18799938410331407
				]
			]
		},
		{
			"type": "line",
			"version": 349,
			"versionNonce": 248719925,
			"isDeleted": true,
			"id": "otk8_9qHzckXUlXkiBw9X",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1512.9391313328176,
			"y": -848.2439315268571,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 89.92084124506889,
			"height": 25.20169286622469,
			"seed": 515736059,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					-46.97357378473746,
					11.035064053429926
				],
				[
					-89.92084124506889,
					25.20169286622469
				]
			]
		},
		{
			"type": "line",
			"version": 321,
			"versionNonce": 1525907355,
			"isDeleted": true,
			"id": "tU3dDG4BZH1LFQPx04G2a",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1496.684785854162,
			"y": -850.4807752000338,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 92.90328582340236,
			"height": 24.15783794643642,
			"seed": 2035387035,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					47.42094115411591,
					8.947347387569048
				],
				[
					92.90328582340236,
					24.15783794643642
				]
			]
		},
		{
			"type": "line",
			"version": 321,
			"versionNonce": 532290453,
			"isDeleted": true,
			"id": "76GLvQvrok20jaazyp-j3",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1502.6496886633972,
			"y": -840.6386930737077,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 1.789469477513786,
			"height": 126.15760499100783,
			"seed": 1100709691,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					-1.789469477513786,
					54.727939245202556
				],
				[
					-0.894734738756893,
					126.15760499100783
				]
			]
		},
		{
			"type": "line",
			"version": 311,
			"versionNonce": 1698092091,
			"isDeleted": true,
			"id": "q5i0eI0ShBPtSpk4Xlfg_",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1513.8338728978588,
			"y": -704.0425149928219,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 36.98236465109584,
			"height": 0.2982471883470697,
			"seed": 570286043,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					-36.98236465109584,
					-0.2982471883470697
				]
			]
		},
		{
			"type": "line",
			"version": 297,
			"versionNonce": 1299964149,
			"isDeleted": true,
			"id": "KF3j0layXdvhAcbVifX3y",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1497.877760954982,
			"y": -704.4898823622004,
			"strokeColor": "#1864ab",
			"backgroundColor": "#ced4da",
			"width": 38.47359376654688,
			"height": 0.44736736937847266,
			"seed": 1418407035,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					38.47359376654688,
					-0.44736736937847266
				]
			]
		},
		{
			"type": "line",
			"version": 117,
			"versionNonce": 1097241819,
			"isDeleted": true,
			"id": "KTA3pR2MIZu4B1E4YafIl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1465.053885032187,
			"y": -875.1878295424646,
			"strokeColor": "#e67700",
			"backgroundColor": "#fab005",
			"width": 29.10828737010911,
			"height": 17.464981691438396,
			"seed": 755361051,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					6.327876468232944,
					8.09969392952297
				],
				[
					29.10828737010911,
					3.0373881202501565
				],
				[
					24.04598156083631,
					15.440052415699569
				],
				[
					14.680693798920913,
					-2.0249292757388275
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 122,
			"versionNonce": 1570634325,
			"isDeleted": true,
			"id": "XjZ7Fl35NNj5A3nR2wy_-",
			"fillStyle": "solid",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1502.2527273964354,
			"y": -838.479186291408,
			"strokeColor": "#1864ab",
			"backgroundColor": "#fab005",
			"width": 54.79041555517034,
			"height": 88.08076589256544,
			"seed": 1658882491,
			"groupIds": [
				"TsxVgnSoA-shfw5tgqB3C"
			],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1714843984151,
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
					-6.24194366465224,
					53.056521149544295
				],
				[
					-27.74199300834374,
					88.08076589256544
				],
				[
					27.0484225468266,
					85.65333277358937
				],
				[
					-2.4274331189760687,
					50.62910390465183
				],
				[
					0,
					0
				]
			]
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "#ffffff",
		"currentItemStrokeColor": "#1971c2",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "solid",
		"currentItemStrokeWidth": 2,
		"currentItemStrokeStyle": "solid",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 36,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": 2018.3891418622416,
		"scrollY": 828.4999336324623,
		"zoom": {
			"value": 0.3681830004156356
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