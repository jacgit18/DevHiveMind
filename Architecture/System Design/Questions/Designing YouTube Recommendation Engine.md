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

Docker ^bSlhQ21e

GitHub ^SizzwGgf

Github Actions ^Nt6ZLJmr

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

 Main 
Service ^608JGAdT

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

EC2 ^C9J0wCdq

Rekognition ^A4UfXbGs

SageMaker ^SVVIyLy3

Personalize ^uq24zpXV

API Gateway ^ou2BeJ2j

S3 Bucket ^hcGmDQcD

CloudFront ^W2uzNyu3

Athena ^is5cc0TM

ELB ^DURt6w4Z

ElastiCache ^BsSd6jtq

Talk What service is stateful vs stateless ^e2sMgHlP

Request Handled 

personalized recommendations

trending

related content 
 ^k9JopjXL

Response 

personalized recommendations with meta data

 ^7wr2qVdE

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
			"version": 716,
			"versionNonce": 50697711,
			"isDeleted": false,
			"id": "cfVAGpj7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1102.411304962941,
			"y": -606.8918731283972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 352.5793983609069,
			"height": 500,
			"seed": 16317,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063512,
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
			"version": 611,
			"versionNonce": 1245284339,
			"isDeleted": false,
			"id": "TsXzxI5r",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1487.9113049629402,
			"y": -831.2252064617302,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 309.3333333333335,
			"height": 213.66666666666643,
			"seed": 14525,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063512,
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
			"version": 586,
			"versionNonce": 905488431,
			"isDeleted": false,
			"id": "zrOOXy2q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1040.2863049629404,
			"y": -972.0611439617303,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 429.16666666666663,
			"height": 192.9166666666667,
			"seed": 3319,
			"groupIds": [],
			"frameId": "ESidNTlLbrCl4hZ0PJBBY",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063512,
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
			"version": 441,
			"versionNonce": 1097316786,
			"isDeleted": false,
			"id": "-PO2Zd6NDX76DEi7npcXu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1212.796721629607,
			"y": -760.7479929200638,
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
			"updated": 1714834063512,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 675,
			"versionNonce": 894399086,
			"isDeleted": false,
			"id": "_q6MHlXRfqRwgPr01jKBY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1201.546721629607,
			"y": -759.4979929200638,
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
			"updated": 1714834063512,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 880,
			"versionNonce": 587617586,
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
			"updated": 1714834350064,
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
			"version": 678,
			"versionNonce": 687298670,
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
			"updated": 1714834361504,
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
			"version": 885,
			"versionNonce": 850878706,
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
			"updated": 1714834307412,
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
			"version": 496,
			"versionNonce": 177583410,
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
			"updated": 1714834298476,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 460,
			"versionNonce": 407650034,
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
			"updated": 1714834298476,
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
			"version": 1430,
			"versionNonce": 1242271922,
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
			"updated": 1714834298476,
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
			"version": 3348,
			"versionNonce": 863677042,
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
			"updated": 1714834298476,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2590,
			"versionNonce": 1533054002,
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
			"updated": 1714834298476,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2752,
			"versionNonce": 1470379506,
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
			"updated": 1714834298476,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2796,
			"versionNonce": 1766631346,
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
			"updated": 1714834298476,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2854,
			"versionNonce": 411099506,
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
			"updated": 1714834298476,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1112,
			"versionNonce": 1351082802,
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
			"updated": 1714834298477,
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
			"version": 1064,
			"versionNonce": 2076749042,
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
			"updated": 1714834298477,
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
			"version": 1071,
			"versionNonce": 533348018,
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
			"updated": 1714834298477,
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
			"version": 1078,
			"versionNonce": 2033424498,
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
			"updated": 1714834298477,
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
			"version": 1080,
			"versionNonce": 399227442,
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
			"updated": 1714834298477,
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
			"version": 1067,
			"versionNonce": 2054792178,
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
			"updated": 1714834298477,
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
			"version": 1001,
			"versionNonce": 725898674,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1037,
			"versionNonce": 1532153714,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1035,
			"versionNonce": 2129400114,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1426,
			"versionNonce": 1769413362,
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
			"updated": 1714834298477,
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
			"version": 2371,
			"versionNonce": 1769663666,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2593,
			"versionNonce": 1688110706,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2608,
			"versionNonce": 1940449330,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2262,
			"versionNonce": 2122387954,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2291,
			"versionNonce": 1479410610,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2340,
			"versionNonce": 1524022642,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1287,
			"versionNonce": 63061810,
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
			"updated": 1714834298477,
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
			"version": 1330,
			"versionNonce": 257394930,
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
			"updated": 1714834298477,
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
			"version": 2393,
			"versionNonce": 354261682,
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
			"updated": 1714834298477,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 2343,
			"versionNonce": 761501230,
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
			"updated": 1714834322471,
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
			"version": 2142,
			"versionNonce": 88534578,
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
			"updated": 1714834307414,
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
			"version": 1584,
			"versionNonce": 847415730,
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
			"updated": 1714834307415,
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
			"version": 828,
			"versionNonce": 662333042,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 772,
			"versionNonce": 1889202606,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 745,
			"versionNonce": 805881906,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 747,
			"versionNonce": 1206684654,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 756,
			"versionNonce": 1675948530,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 825,
			"versionNonce": 1854987822,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 799,
			"versionNonce": 638968754,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 801,
			"versionNonce": 1500571758,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 810,
			"versionNonce": 1623367026,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 809,
			"versionNonce": 2018880174,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 783,
			"versionNonce": 556932914,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 785,
			"versionNonce": 1508386030,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 794,
			"versionNonce": 868968690,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 826,
			"versionNonce": 1337022254,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 800,
			"versionNonce": 1075149490,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 802,
			"versionNonce": 303710574,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 811,
			"versionNonce": 1689736306,
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
			"updated": 1714837928758,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 732,
			"versionNonce": 1684792238,
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
			"updated": 1714837928758,
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
			"version": 1344,
			"versionNonce": 104573358,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1288,
			"versionNonce": 1488339950,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1259,
			"versionNonce": 489463918,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1261,
			"versionNonce": 1004167854,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1270,
			"versionNonce": 1008065774,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1341,
			"versionNonce": 325586734,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1313,
			"versionNonce": 507115886,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1315,
			"versionNonce": 1138006958,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1324,
			"versionNonce": 442562030,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1323,
			"versionNonce": 182978606,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1297,
			"versionNonce": 1968362094,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1299,
			"versionNonce": 1416254638,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1308,
			"versionNonce": 1641516782,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1342,
			"versionNonce": 975405358,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1314,
			"versionNonce": 12004206,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1316,
			"versionNonce": 64720302,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1325,
			"versionNonce": 1622779886,
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
			"updated": 1714834322471,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1273,
			"versionNonce": 660240942,
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
			"updated": 1714834322471,
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
			"version": 1881,
			"versionNonce": 1709714738,
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
			"updated": 1714834340866,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1829,
			"versionNonce": 1227082926,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1801,
			"versionNonce": 1229169518,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1802,
			"versionNonce": 1947796910,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1811,
			"versionNonce": 1518870510,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1883,
			"versionNonce": 1352266286,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1854,
			"versionNonce": 1094155374,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1856,
			"versionNonce": 1378467502,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1865,
			"versionNonce": 135903470,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1864,
			"versionNonce": 1787849518,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1838,
			"versionNonce": 670487918,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1840,
			"versionNonce": 966129582,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1849,
			"versionNonce": 127324654,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1881,
			"versionNonce": 218260526,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1855,
			"versionNonce": 2076290670,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1857,
			"versionNonce": 1620947118,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1866,
			"versionNonce": 1195338478,
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
			"updated": 1714834307096,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1846,
			"versionNonce": 1580195118,
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
			"updated": 1714834307096,
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
			"version": 1799,
			"versionNonce": 2133640853,
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
			"updated": 1714843667696,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1748,
			"versionNonce": 1932344818,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1721,
			"versionNonce": 264458798,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1720,
			"versionNonce": 1047834546,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1730,
			"versionNonce": 339008622,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1799,
			"versionNonce": 1345285845,
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
			"updated": 1714843494570,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1772,
			"versionNonce": 511385262,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1775,
			"versionNonce": 1900931890,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1783,
			"versionNonce": 54466798,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1783,
			"versionNonce": 646821106,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1756,
			"versionNonce": 436849454,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1758,
			"versionNonce": 1018054322,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1767,
			"versionNonce": 1631860078,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1800,
			"versionNonce": 1817616498,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1775,
			"versionNonce": 574052270,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1775,
			"versionNonce": 1095615026,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1784,
			"versionNonce": 353120750,
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
			"updated": 1714837937859,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1788,
			"versionNonce": 914009074,
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
			"updated": 1714837937860,
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
			"version": 3328,
			"versionNonce": 278345262,
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
			"updated": 1714834337537,
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
			"version": 2033,
			"versionNonce": 418136174,
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
			"updated": 1714834337537,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2851,
			"versionNonce": 1875619630,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13371,
			"versionNonce": 1831442798,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3048,
			"versionNonce": 1406155694,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 812,
			"versionNonce": 1776850414,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 840,
			"versionNonce": 1216063534,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 825,
			"versionNonce": 2138206830,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 853,
			"versionNonce": 966128814,
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
			"updated": 1714834337538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 661,
			"versionNonce": 1315511861,
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
			"updated": 1714840488696,
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
			"version": 2033,
			"versionNonce": 424606702,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1937,
			"versionNonce": 1838029486,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1478,
			"versionNonce": 1855100142,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1404,
			"versionNonce": 1166919470,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1388,
			"versionNonce": 1927852398,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1373,
			"versionNonce": 32265134,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1422,
			"versionNonce": 750890478,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1382,
			"versionNonce": 7454766,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1482,
			"versionNonce": 15043182,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1380,
			"versionNonce": 1290144942,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1352,
			"versionNonce": 1109149422,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1385,
			"versionNonce": 554776878,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1368,
			"versionNonce": 825090926,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1379,
			"versionNonce": 1689994670,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1327,
			"versionNonce": 2095210478,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1373,
			"versionNonce": 766259758,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1408,
			"versionNonce": 1107410030,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1379,
			"versionNonce": 1068236462,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1366,
			"versionNonce": 190052590,
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
			"updated": 1714834361504,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3322,
			"versionNonce": 209890094,
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
			"updated": 1714834361504,
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
			"version": 3664,
			"versionNonce": 1989217390,
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
			"updated": 1714834307097,
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
			"version": 2493,
			"versionNonce": 1171345070,
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
			"updated": 1714834307097,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 664,
			"versionNonce": 630455086,
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
			"updated": 1714834307097,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1214,
			"versionNonce": 1152025458,
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
			"updated": 1714834307422,
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
			"version": 1307,
			"versionNonce": 1261258034,
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
			"updated": 1714834307423,
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
			"version": 1329,
			"versionNonce": 2138164978,
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
			"updated": 1714834307424,
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
			"version": 1272,
			"versionNonce": 1442783410,
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
			"updated": 1714834307425,
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
			"version": 753,
			"versionNonce": 2019137390,
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
			"updated": 1714834307097,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 628,
			"versionNonce": 877689262,
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
			"updated": 1714834307097,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 3433,
			"versionNonce": 1852293746,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2666,
			"versionNonce": 1589728686,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1572,
			"versionNonce": 1760207922,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1627,
			"versionNonce": 1806069742,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1647,
			"versionNonce": 1546341874,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1668,
			"versionNonce": 1231962670,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1710,
			"versionNonce": 2100346802,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1614,
			"versionNonce": 989973614,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1638,
			"versionNonce": 1210186098,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1662,
			"versionNonce": 1042943662,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1681,
			"versionNonce": 474348338,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 2191,
			"versionNonce": 797968622,
			"isDeleted": false,
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
			"updated": 1714834155858,
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
			"version": 3387,
			"versionNonce": 1476642034,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1342,
			"versionNonce": 1857862446,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 4889,
			"versionNonce": 1960990386,
			"isDeleted": false,
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
			"updated": 1714834155858,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2219,
			"versionNonce": 35202414,
			"isDeleted": false,
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
			"updated": 1714834155858,
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
			"version": 386,
			"versionNonce": 596160626,
			"isDeleted": false,
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
			"updated": 1714834155858,
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
			"version": 695,
			"versionNonce": 988694446,
			"isDeleted": false,
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
			"updated": 1714834155858,
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
			"version": 173,
			"versionNonce": 2114367509,
			"isDeleted": false,
			"boundElements": [
				{
					"id": "vlXMA3a79fMl66YyLo9yj",
					"type": "arrow"
				}
			],
			"updated": 1714843494569,
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
			"version": 315,
			"versionNonce": 1088954779,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843648837,
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
			"x": 978.4768586583789,
			"y": -404.5480593344321,
			"width": 436.3794250488281,
			"height": 25,
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
			"version": 311,
			"versionNonce": 1560135739,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843771424,
			"link": null,
			"locked": false,
			"text": "Talk What service is stateful vs stateless",
			"rawText": "Talk What service is stateful vs stateless",
			"fontSize": 20,
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
			"version": 46,
			"versionNonce": 1312941429,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843494570,
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
			"version": 79,
			"versionNonce": 2046768437,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843667696,
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
			"type": "frame",
			"version": 769,
			"versionNonce": 1348951602,
			"isDeleted": false,
			"id": "vjQ13QAGqqwZLC97MoanI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 458.6366950513682,
			"y": -1104.7823393922772,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 2146.188263721955,
			"height": 1201.5320763221152,
			"seed": 1224266406,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714834298476,
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
			"version": 585,
			"versionNonce": 508988594,
			"isDeleted": false,
			"id": "jyBPmKT2KA6fl9aZTenhn",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 36.67506886634192,
			"y": 948.6406948971545,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 237.99163633207854,
			"height": 55.72484815753057,
			"seed": 2131051698,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.1487644411785,
				"gap": 7.865599552686529,
				"elementId": "YR0Txf-XdlSTltwlBrIQ8"
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
			"version": 442,
			"versionNonce": 28004206,
			"isDeleted": false,
			"id": "XiFOhlWOtit7uaGevF7cY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 120.68343253426337,
			"y": 564.9158467396239,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 236,
			"height": 76,
			"seed": 1382291310,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"focus": -0.5459276814084713,
				"gap": 14.686069499380096,
				"elementId": "nx86Bc1GlV_tMbyAxJz3B"
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
			"version": 656,
			"versionNonce": 1023813234,
			"isDeleted": false,
			"id": "Fpg41cP9ZXjmu0KQH0xkc",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 98.68343253426337,
			"y": 369.31298485656635,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 228.0803302058298,
			"height": 213.41285114673167,
			"seed": 119398002,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.342546804872001,
				"gap": 1.4595794677734375,
				"elementId": "cbMBB4NEcwEaqVZMokb60"
			},
			"endBinding": {
				"focus": 0.053025073689851404,
				"gap": 1,
				"elementId": "_ivFATriFZ0ejPM0jWE9Y"
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
			"version": 459,
			"versionNonce": 447426990,
			"isDeleted": false,
			"id": "dB3HcAjuGIwb0F_qDolQf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -298.208420079166,
			"y": 895.3990737289054,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 129.98314738657064,
			"height": 231.6174193220944,
			"seed": 1762326958,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.19711674509662427,
				"gap": 13.27182734010637,
				"elementId": "GneXi6osnZvxo_XJcnmL0"
			},
			"endBinding": {
				"focus": 0.1786377627991464,
				"gap": 6.961068180698028,
				"elementId": "l5JwcInVEYNLdoVT_NODw"
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
			"version": 342,
			"versionNonce": 1173670894,
			"isDeleted": false,
			"id": "0ju_1XAjWr8Pad7EyC84U",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -420.05899170816156,
			"y": 1191.6364765465578,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 155.55555555555566,
			"height": 17.77777777777783,
			"seed": 1159435246,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.13538172405428375,
				"gap": 1.119211251777756,
				"elementId": "l5JwcInVEYNLdoVT_NODw"
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
			"version": 634,
			"versionNonce": 1501606386,
			"isDeleted": false,
			"id": "0lQfAWR4DScNi0fQQT_y6",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -474.07988888521686,
			"y": 558.4209835595858,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 67.98568215742239,
			"height": 220.3652751893477,
			"seed": 1527409138,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.31061866614034983,
				"gap": 12.000168780107586,
				"elementId": "kKaVTXdVNbY2wqBO8Porv"
			},
			"endBinding": {
				"focus": 0.27924234783167035,
				"gap": 2.087165458837717,
				"elementId": "lluP5brliY-iDI86q0qP0"
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
			"version": 424,
			"versionNonce": 26287662,
			"isDeleted": false,
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
			"updated": 1714834063525,
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
			"version": 384,
			"versionNonce": 1916380082,
			"isDeleted": false,
			"id": "f29lxlS7odwqKbKjk7rRN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -167.96375361292303,
			"y": 295.09381781639945,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 46.66666666666674,
			"height": 294.9999999999999,
			"seed": 164387762,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"focus": -0.7396892725560091,
				"gap": 12.022213821990931,
				"elementId": "R87L366hFg_NGk1e01O--"
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
			"version": 482,
			"versionNonce": 577316974,
			"isDeleted": false,
			"id": "jBiUvkVqpoavp-ev4b2wA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -601.3315326766055,
			"y": 361.983377898385,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 110.03444573034926,
			"height": 209.77710658468084,
			"seed": 209580142,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063525,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.5597483473665974,
				"gap": 16.80785017672666,
				"elementId": "nVuTuOFj8CcudbOYrwaOi"
			},
			"endBinding": {
				"focus": 3.114050634833699,
				"gap": 13.540776501307903,
				"elementId": "JUH30NkHefLG0bds8BAZP"
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
			"version": 486,
			"versionNonce": 1919835506,
			"isDeleted": false,
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
			"updated": 1714834063525,
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
			"version": 483,
			"versionNonce": 2017847982,
			"isDeleted": false,
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
			"updated": 1714834063525,
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
			"version": 376,
			"versionNonce": 124116786,
			"isDeleted": false,
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
			"updated": 1714834063525,
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
			"version": 3448,
			"versionNonce": 2086222514,
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
			"updated": 1714834063526,
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
			"version": 2207,
			"versionNonce": 1772289970,
			"isDeleted": false,
			"id": "cs3EH4r4Sz6UbamjHV3eZ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -210.28167654709364,
			"y": 590.5541518854938,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 229.15595246467387,
			"height": 21.81624030867613,
			"seed": 684046258,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.9474665456192557,
				"gap": 14.861936421465202,
				"elementId": "HKZRyY6lsRRtBe4KkF4fc"
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
			"version": 1891,
			"versionNonce": 903056494,
			"isDeleted": false,
			"id": "1QoFVbs_TZpOC3aj22Lbp",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -505.0611084673958,
			"y": 598.8530746249429,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 178.32766752377063,
			"height": 148.368513056275,
			"seed": 2035831918,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063526,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 1.2649463339007112,
				"gap": 12.695682290491959,
				"elementId": "fE4EQWYfd_0em_Z1uiWA4"
			},
			"endBinding": {
				"focus": 1.4334399177492558,
				"gap": 10.745986782836212,
				"elementId": "RW3IqUSwk3kHfWo0x9Ccd"
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
			"version": 1333,
			"versionNonce": 1816934770,
			"isDeleted": false,
			"id": "8M7rNkXcTGu5JRDORCze1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -262.2154280035868,
			"y": 834.1370523394982,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 173.64659400760388,
			"height": 193.43332681199524,
			"seed": 643297650,
			"groupIds": [],
			"frameId": "Y1F9G_aV8lvxkSjtSY6pH",
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063527,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 1.0556238155401163,
				"gap": 8.830522124555955,
				"elementId": "GneXi6osnZvxo_XJcnmL0"
			},
			"endBinding": {
				"focus": 0.32153799547805806,
				"gap": 8.965207504809598,
				"elementId": "kKaVTXdVNbY2wqBO8Porv"
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
			"version": 873,
			"versionNonce": 2026098350,
			"isDeleted": false,
			"id": "lv4cG2rXEU9d_drFWhvnu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -733.8814128929648,
			"y": 746.4656662160521,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 818,
			"versionNonce": 1093155634,
			"isDeleted": false,
			"id": "RW3IqUSwk3kHfWo0x9Ccd",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -713.7530734589614,
			"y": 757.9675744640541,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 791,
			"versionNonce": 1894893806,
			"isDeleted": false,
			"id": "mQJfSws9RC13H48RoNYPG",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -706.5643808039601,
			"y": 765.1562671190553,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 793,
			"versionNonce": 647890162,
			"isDeleted": false,
			"id": "iogd4kOd4ay4gTjgOFYO6",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -707.2832500694601,
			"y": 777.3770446325575,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 802,
			"versionNonce": 501644078,
			"isDeleted": false,
			"id": "wYSlyNg6sKtbG-rVxd1h5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -707.2832500694601,
			"y": 791.75442994256,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 871,
			"versionNonce": 1983157938,
			"isDeleted": false,
			"id": "xTxxyq6c3n-Mo34xMX-ix",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -700.0945574144589,
			"y": 773.7826983050569,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 845,
			"versionNonce": 638248302,
			"isDeleted": false,
			"id": "7Ij4MV-v3BzXYGWBsdyzQ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -692.9058647594577,
			"y": 780.9713909600581,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 847,
			"versionNonce": 1083371634,
			"isDeleted": false,
			"id": "jYU_yy5pgDn_ODSA4i9F9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -693.6247340249579,
			"y": 793.1921684735603,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 856,
			"versionNonce": 2057832366,
			"isDeleted": false,
			"id": "xgSxYVOGhWLpoY2NMFnho",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -693.6247340249579,
			"y": 807.5695537835627,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 855,
			"versionNonce": 1770000946,
			"isDeleted": false,
			"id": "JiWoaAPCzpkjUcVX6HPll",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -684.2794335734561,
			"y": 783.8468680220586,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 829,
			"versionNonce": 2078728686,
			"isDeleted": false,
			"id": "fka4pvGeL-WA-sOdpGOxT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -677.0907409184549,
			"y": 791.0355606770598,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 831,
			"versionNonce": 1138949106,
			"isDeleted": false,
			"id": "567WsftF8O6Y7LeTr0AQp",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -677.8096101839551,
			"y": 803.256338190562,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 840,
			"versionNonce": 483423278,
			"isDeleted": false,
			"id": "_4QEfqg4ra24pV_hBwM3V",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -677.8096101839551,
			"y": 817.6337235005645,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 872,
			"versionNonce": 767733170,
			"isDeleted": false,
			"id": "KdCsxFDVnTGPs-dWjVh4v",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -672.7775253254542,
			"y": 796.7865148010609,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 846,
			"versionNonce": 122535534,
			"isDeleted": false,
			"id": "CcRpS9Ktw_Xi2mLb1VpWv",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -665.588832670453,
			"y": 803.9752074560621,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 848,
			"versionNonce": 742795122,
			"isDeleted": false,
			"id": "TKgd6cxsa1RG04YkWnN_A",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -666.307701935953,
			"y": 816.1959849695643,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 857,
			"versionNonce": 1076347054,
			"isDeleted": false,
			"id": "7FBS2eHYy2uWjiWfe6mGD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -666.307701935953,
			"y": 830.5733702795668,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 778,
			"versionNonce": 129263922,
			"isDeleted": false,
			"id": "608JGAdT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -722.3795046449627,
			"y": 857.1715331030714,
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
			"updated": 1714834063527,
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
			"version": 1358,
			"versionNonce": 1258781422,
			"isDeleted": false,
			"id": "_ivFATriFZ0ejPM0jWE9Y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -215.5480795596318,
			"y": 574.7989995493855,
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
			"boundElements": [],
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1303,
			"versionNonce": 1735684850,
			"isDeleted": false,
			"id": "HKZRyY6lsRRtBe4KkF4fc",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -195.41974012562832,
			"y": 586.3009077973875,
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
			"boundElements": [],
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1274,
			"versionNonce": 1316351278,
			"isDeleted": false,
			"id": "zfsGuUDo14F8dD3Y_tYcn",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -188.23104747062712,
			"y": 593.4896004523887,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1276,
			"versionNonce": 1846363314,
			"isDeleted": false,
			"id": "K08lGkKesnQ4HqKuhRs88",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -188.94991673612708,
			"y": 605.7103779658909,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1285,
			"versionNonce": 937170798,
			"isDeleted": false,
			"id": "jLu3ad85AO2D79-TIopbP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -188.94991673612708,
			"y": 620.0877632758934,
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
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1355,
			"versionNonce": 1428545138,
			"isDeleted": false,
			"id": "R87L366hFg_NGk1e01O--",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -181.76122408112587,
			"y": 602.1160316383903,
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
			"boundElements": [],
			"updated": 1714834063527,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1328,
			"versionNonce": 1602419118,
			"isDeleted": false,
			"id": "Aoa1Nat093BROYAuMIvKX",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -174.57253142612467,
			"y": 609.3047242933915,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1330,
			"versionNonce": 159727666,
			"isDeleted": false,
			"id": "XAg6KyLY1DwqeQwOD6RHm",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -175.29140069162486,
			"y": 621.5255018068937,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1339,
			"versionNonce": 747869166,
			"isDeleted": false,
			"id": "4-cziDWdU4XoEbrCfq7u7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -175.29140069162486,
			"y": 635.9028871168961,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1338,
			"versionNonce": 1192389106,
			"isDeleted": false,
			"id": "hcW3J8yTyJvfjFbEhzOAK",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -165.9461002401231,
			"y": 612.180201355392,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1312,
			"versionNonce": 957802030,
			"isDeleted": false,
			"id": "BMZnV3H7K_xKH6sdBrEx5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -158.75740758512188,
			"y": 619.3688940103932,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1314,
			"versionNonce": 886332338,
			"isDeleted": false,
			"id": "9xF7qJ5Dfx_Tn2s5GLYpg",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -159.47627685062207,
			"y": 631.5896715238954,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1323,
			"versionNonce": 1979052142,
			"isDeleted": false,
			"id": "qbpFpny0jgK-zR9SPZlfY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -159.47627685062207,
			"y": 645.9670568338979,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1356,
			"versionNonce": 15865202,
			"isDeleted": false,
			"id": "nx86Bc1GlV_tMbyAxJz3B",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -154.4441919921212,
			"y": 625.1198481343943,
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
			"boundElements": [],
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1329,
			"versionNonce": 1324987054,
			"isDeleted": false,
			"id": "QscAWn70zKKP8JjNQC4tJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -147.25549933712,
			"y": 632.3085407893955,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1331,
			"versionNonce": 2092078898,
			"isDeleted": false,
			"id": "7BvkKSxvuirdx4FqPAL-I",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -147.97436860261996,
			"y": 644.5293183028977,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1340,
			"versionNonce": 1321938158,
			"isDeleted": false,
			"id": "RaeFJfUNl2EYo7VyuZ6CY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -147.97436860261996,
			"y": 658.9067036129002,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1268,
			"versionNonce": 947708146,
			"isDeleted": false,
			"id": "V0vR63R9",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -204.04617131162968,
			"y": 685.5048664364048,
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
			"updated": 1714834063528,
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
			"version": 1927,
			"versionNonce": 1123245870,
			"isDeleted": false,
			"id": "7lo7iu1RpYiFvNGecDEAz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -305.5480795596336,
			"y": 831.4656662160521,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1876,
			"versionNonce": 534246066,
			"isDeleted": false,
			"id": "GneXi6osnZvxo_XJcnmL0",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -285.41974012563014,
			"y": 842.9675744640541,
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
			"boundElements": [],
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1848,
			"versionNonce": 1608206702,
			"isDeleted": false,
			"id": "iMBwEF89_SMaU3wvOvSXq",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -278.23104747062894,
			"y": 850.1562671190553,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1849,
			"versionNonce": 359320690,
			"isDeleted": false,
			"id": "p0QwkyQfUOAgD-C3rkVKD",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -278.9499167361289,
			"y": 862.3770446325575,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1858,
			"versionNonce": 1691085742,
			"isDeleted": false,
			"id": "sOfQhSL-UFOkrjikaU4_y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -278.9499167361289,
			"y": 876.75442994256,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1930,
			"versionNonce": 251424306,
			"isDeleted": false,
			"id": "A8um0Kl_h0cT-PMJ5BGb8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -271.7612240811277,
			"y": 858.7826983050569,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1901,
			"versionNonce": 1072580078,
			"isDeleted": false,
			"id": "RJl7PHr3aDdesRtMLhjKH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -264.5725314261265,
			"y": 865.9713909600581,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1903,
			"versionNonce": 829675506,
			"isDeleted": false,
			"id": "x6naLK14ACXt2R4zBbtJK",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -265.2914006916267,
			"y": 878.1921684735603,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1912,
			"versionNonce": 843798574,
			"isDeleted": false,
			"id": "jrAhWUnrd3qsnhHx0M0Jv",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -265.2914006916267,
			"y": 892.5695537835627,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1911,
			"versionNonce": 1826097586,
			"isDeleted": false,
			"id": "3vKCVHa4p6VzD7FaZnbBk",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -255.9461002401249,
			"y": 868.8468680220586,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1885,
			"versionNonce": 1942757998,
			"isDeleted": false,
			"id": "7o-bk-cSbwu7VgQWieCK8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -248.7574075851237,
			"y": 876.0355606770598,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1887,
			"versionNonce": 407896946,
			"isDeleted": false,
			"id": "ZARHNz5OXYz3_Yi4DTKCL",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -249.4762768506239,
			"y": 888.256338190562,
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
			"updated": 1714834063528,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1896,
			"versionNonce": 1463395502,
			"isDeleted": false,
			"id": "Zt9gMhWUuiVgv0Czsimbz",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -249.4762768506239,
			"y": 902.6337235005645,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1928,
			"versionNonce": 237159730,
			"isDeleted": false,
			"id": "q1imb4QIu2LjJAl7kAzMG",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -244.44419199212302,
			"y": 881.7865148010609,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1902,
			"versionNonce": 1849482990,
			"isDeleted": false,
			"id": "8gcJhGs9cJs81NnmxFO1W",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -237.25549933712182,
			"y": 888.9752074560621,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1904,
			"versionNonce": 1203195634,
			"isDeleted": false,
			"id": "EVsu8SMDa_uIhQiwIF1_M",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -237.97436860262178,
			"y": 901.1959849695643,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1913,
			"versionNonce": 761188654,
			"isDeleted": false,
			"id": "Bb5abMHmcgz6fBFdaGS6k",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -237.97436860262178,
			"y": 915.5733702795668,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1893,
			"versionNonce": 2039783602,
			"isDeleted": false,
			"id": "EgGLjjR8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -304.0461713116315,
			"y": 942.1715331030714,
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
			"updated": 1714834063529,
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
			"version": 1844,
			"versionNonce": 268991342,
			"isDeleted": false,
			"id": "kKaVTXdVNbY2wqBO8Porv",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -535.6889555886685,
			"y": 568.9764528002305,
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
			"boundElements": [],
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1794,
			"versionNonce": 794933874,
			"isDeleted": false,
			"id": "IN5Rul9VLA1PEQhR7r1EV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -518.108392928822,
			"y": 579.0224886058571,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1766,
			"versionNonce": 1015209390,
			"isDeleted": false,
			"id": "JUH30NkHefLG0bds8BAZP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -511.8296205503052,
			"y": 585.3012609843737,
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
			"boundElements": [],
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1766,
			"versionNonce": 1743100978,
			"isDeleted": false,
			"id": "T-bZNq6QWebOnrs4Wmu4y",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -512.4574977881571,
			"y": 595.975174027852,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1776,
			"versionNonce": 670496750,
			"isDeleted": false,
			"id": "TW5mvbILn2MpfOjPWxkhN",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -512.4574977881571,
			"y": 608.5327187848852,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1844,
			"versionNonce": 822560242,
			"isDeleted": false,
			"id": "ntFas2T0CbzLl6eihtQ8M",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -506.17872540964026,
			"y": 592.8357878385937,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1818,
			"versionNonce": 980273710,
			"isDeleted": false,
			"id": "0Dn3_hwjVV8rHBndw4qU1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -499.8999530311239,
			"y": 599.1145602171104,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1821,
			"versionNonce": 1137555378,
			"isDeleted": false,
			"id": "xTmYzR0xtytGchVYZlrYx",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -500.5278302689753,
			"y": 609.7884732605886,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1829,
			"versionNonce": 1926255726,
			"isDeleted": false,
			"id": "E-YH1HDc0rkyXEcc8G_4d",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -500.5278302689753,
			"y": 622.3460180176218,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1829,
			"versionNonce": 543158642,
			"isDeleted": false,
			"id": "fE4EQWYfd_0em_Z1uiWA4",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -492.36542617690384,
			"y": 601.6260691685169,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1802,
			"versionNonce": 182949550,
			"isDeleted": false,
			"id": "LsPOsA-pRMOhE7h8uBIZf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -486.08665379838703,
			"y": 607.9048415470336,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1804,
			"versionNonce": 704967474,
			"isDeleted": false,
			"id": "mWcdvHovWZGEqWn7_eQGh",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -486.7145310362389,
			"y": 618.5787545905118,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1813,
			"versionNonce": 459051246,
			"isDeleted": false,
			"id": "q4VRiY1AY--BhTbLIkUCR",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -486.7145310362389,
			"y": 631.1362993475451,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1846,
			"versionNonce": 1126415602,
			"isDeleted": false,
			"id": "A7VvN7SIf-payIwMWW6x5",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -482.3193903712772,
			"y": 612.9278594498469,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1821,
			"versionNonce": 1069040430,
			"isDeleted": false,
			"id": "GgkptlQ0Jr8lLnXINN_aW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -476.0406179927604,
			"y": 619.2066318283635,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1821,
			"versionNonce": 1766018738,
			"isDeleted": false,
			"id": "Ll6JR53eqOXHi91W9wTsi",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -476.6684952306123,
			"y": 629.8805448718417,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1830,
			"versionNonce": 979610990,
			"isDeleted": false,
			"id": "QN4Cz8bFEaE_uYMZHnnpP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -476.6684952306123,
			"y": 642.438089628875,
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
			"updated": 1714834063529,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1834,
			"versionNonce": 1359652978,
			"isDeleted": false,
			"id": "qSNLwu2x",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -567.5014023064859,
			"y": 669.855395681731,
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
			"updated": 1714834063530,
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
			"version": 2211,
			"versionNonce": 413650862,
			"isDeleted": false,
			"id": "uOQlIhve",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 118.59518464423218,
			"y": 428.81621427108723,
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
			"updated": 1714834063530,
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
			"version": 1968,
			"versionNonce": 37800498,
			"isDeleted": false,
			"id": "cbMBB4NEcwEaqVZMokb60",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 100.14301200203681,
			"y": 319.83072443826245,
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
			"boundElements": [],
			"updated": 1714834063530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2820,
			"versionNonce": 1454221806,
			"isDeleted": false,
			"id": "sDEb2dXyr4AQKPt2YdXS1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 179.01448572901654,
			"y": 396.4482926753359,
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
			"updated": 1714834063530,
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
			"version": 2713,
			"versionNonce": 1942795250,
			"isDeleted": false,
			"id": "YizsGb4aRLDvz21DWNTTk",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.029928014204294584,
			"x": 184.45530772282063,
			"y": 330.95316361863297,
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
			"updated": 1714834063530,
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
			"version": 3320,
			"versionNonce": 58604590,
			"isDeleted": false,
			"id": "Axbe5eL-_mMyziu7gfX9Q",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.765434113477622,
			"x": 191.0080191906195,
			"y": 401.3265663355518,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3538,
			"versionNonce": 666199474,
			"isDeleted": false,
			"id": "HlI2xMGXmcJDIY6imauYW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.48666424209895,
			"x": 117.86661546499181,
			"y": 329.95340874540693,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2914,
			"versionNonce": 1694664302,
			"isDeleted": false,
			"id": "a4gOZwyncJsxFy92A7uKx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 112.86734827093596,
			"y": 332.0248514309533,
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
			"updated": 1714834063530,
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
			"version": 2777,
			"versionNonce": 1193402226,
			"isDeleted": false,
			"id": "Z1xDlrftgEvz-tFPOUJQ7",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.06885648930104615,
			"x": 120.66993418640277,
			"y": 396.0620956981445,
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
			"updated": 1714834063530,
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
			"version": 3547,
			"versionNonce": 469993646,
			"isDeleted": false,
			"id": "cf587vBs2vGSzYQyKnLrn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.854199750177644,
			"x": 189.48288029609967,
			"y": 328.7256260955228,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3541,
			"versionNonce": 1046028594,
			"isDeleted": false,
			"id": "k4ZQTMTylddhAK-KVQbAA",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.663921886409196,
			"x": 117.90988633133566,
			"y": 402.66871137501164,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 4470,
			"versionNonce": 1210729198,
			"isDeleted": false,
			"id": "nWFqxrShJ-aMVOZ3ypTaj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 130.97291273986093,
			"y": 347.22259337655214,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2627,
			"versionNonce": 1489119986,
			"isDeleted": false,
			"id": "B8l3tzMeRJ_w-Ft6hz7RQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 130.8406119746969,
			"y": 341.71207046242125,
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
			"boundElements": [],
			"updated": 1714834063530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2468,
			"versionNonce": 738178350,
			"isDeleted": false,
			"id": "EZR4VmndRp0FgSAJO6TOM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 131.46142178274067,
			"y": 361.37879181751896,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2496,
			"versionNonce": 1558445234,
			"isDeleted": false,
			"id": "JRCC87PFsUaRa2Sr7ce3t",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 130.46409763008205,
			"y": 378.05114480107966,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 5587,
			"versionNonce": 1357700974,
			"isDeleted": false,
			"id": "6cWLZwwOFxou93y4zhDwe",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.034244644020102,
			"x": 130.10688113442802,
			"y": 357.36569529794383,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 0.17059876156316842,
				"gap": 9.292283166223374,
				"elementId": "B8l3tzMeRJ_w-Ft6hz7RQ"
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
			"version": 5632,
			"versionNonce": 677746290,
			"isDeleted": false,
			"id": "z0y0KGskzL7ifJPVlpDtW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.31086799431261625,
			"x": 166.37887090419508,
			"y": 357.3682476104925,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -0.31376123802395034,
				"gap": 9.07787046494131,
				"elementId": "B8l3tzMeRJ_w-Ft6hz7RQ"
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
			"version": 2993,
			"versionNonce": 725270958,
			"isDeleted": false,
			"id": "IVZyLxaF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -3.1965723485491253,
			"y": 1027.8172512754247,
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
			"updated": 1714834063530,
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
			"version": 1853,
			"versionNonce": 1275983922,
			"isDeleted": false,
			"id": "8Dw4nFpOFUyc1qDrLOYxH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 31.232078243401702,
			"y": 926.6116003281888,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3376,
			"versionNonce": 1041390574,
			"isDeleted": false,
			"id": "YR0Txf-XdlSTltwlBrIQ8",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 44.391054718872965,
			"y": 937.7353821430781,
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
			"boundElements": [],
			"updated": 1714834063530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1544,
			"versionNonce": 667165170,
			"isDeleted": false,
			"id": "XVp3saUvdBe0KV8yTUrVN",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 44.88636222656123,
			"y": 947.9859957865848,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1584,
			"versionNonce": 1065135662,
			"isDeleted": false,
			"id": "qw6LGRrLVmHAMGF_Ahs35",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 94.05598961393162,
			"y": 947.410070429195,
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
			"updated": 1714834063530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1717,
			"versionNonce": 110039986,
			"isDeleted": false,
			"id": "glrMrPonXYT210Qf9q5FF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 45.28231090976851,
			"y": 987.5835524948309,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1609,
			"versionNonce": 1013102702,
			"isDeleted": false,
			"id": "iSWlXpIuOtcTfKJqBs8-t",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 45.53427825362769,
			"y": 1004.5706621503847,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1309,
			"versionNonce": 982895986,
			"isDeleted": false,
			"id": "6KDK_gnJWvUCElBZpO7y-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 94.34468946779862,
			"y": 994.1295666024716,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1731,
			"versionNonce": 1015904942,
			"isDeleted": false,
			"id": "sTM2IedET_gSHqxtyCtXa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 45.2404450356421,
			"y": 968.8096221291053,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1046,
			"versionNonce": 958353202,
			"isDeleted": false,
			"id": "HUKr0_6UA2Zq-9niN00po",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 80.8813328507681,
			"y": 966.576660154072,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1605,
			"versionNonce": 1722152174,
			"isDeleted": false,
			"id": "HyvXRibmrvO9SbJ0daUSJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 84.92708948661402,
			"y": 969.105890714748,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": 2.454945017800435,
				"gap": 14.809161682799413,
				"elementId": "YR0Txf-XdlSTltwlBrIQ8"
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
			"version": 1197,
			"versionNonce": 915577074,
			"isDeleted": false,
			"id": "_ysLQZY9QUeduUAQ6V1zz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 84.24118457262057,
			"y": 986.2535135645919,
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
			"updated": 1714834063531,
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
			"version": 1148,
			"versionNonce": 607463214,
			"isDeleted": false,
			"id": "fSoopPNEwwUYjGeA1YeZB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 84.24118457262057,
			"y": 978.9371944819923,
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
			"updated": 1714834063531,
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
			"version": 2670,
			"versionNonce": 1115073202,
			"isDeleted": false,
			"id": "1pDBQAgf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 107.87343116097236,
			"y": 640.439140056576,
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
			"updated": 1714834063531,
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
			"version": 1542,
			"versionNonce": 1168380270,
			"isDeleted": false,
			"id": "YzjOrUiLhIF7CIiKHxCrs",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 117.5586762278349,
			"y": 525.2678503281888,
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
			"boundElements": [],
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2763,
			"versionNonce": 1668449394,
			"isDeleted": false,
			"id": "P8h_vIWmRzdpAe2tSSZ3f",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 133.16608738713785,
			"y": 540.4940585423974,
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
			"boundElements": [],
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 935,
			"versionNonce": 641446830,
			"isDeleted": false,
			"id": "hkHc-kFfgq2Ne3lkgjqPE",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 133.6952599135625,
			"y": 551.4455241166793,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 967,
			"versionNonce": 860694066,
			"isDeleted": false,
			"id": "mRQoAC6MGZtM7xjc8Xxki",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 186.22669855326603,
			"y": 550.8302217607261,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1036,
			"versionNonce": 1344605678,
			"isDeleted": false,
			"id": "5EjQCMeEr4RdUwFFuwRxL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 133.6952599135625,
			"y": 572.4427170136621,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1053,
			"versionNonce": 2062389234,
			"isDeleted": false,
			"id": "6ToCNPAHDEqPNEj_hrMkO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 134.1182802832809,
			"y": 592.280006810912,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 997,
			"versionNonce": 543760430,
			"isDeleted": false,
			"id": "JYJG-ZGasPQF16AWXICMl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 134.38747506401205,
			"y": 611.8989805893153,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 882,
			"versionNonce": 1314570674,
			"isDeleted": false,
			"id": "zyntTs9J6pKW2-yxVOYtk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 187.3066460301029,
			"y": 579.9861902267628,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 894,
			"versionNonce": 1794173550,
			"isDeleted": false,
			"id": "HSeJdBeqH64CLRO1ml2Fb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 200.73126416633795,
			"y": 562.5088571814767,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 885,
			"versionNonce": 683391858,
			"isDeleted": false,
			"id": "S94isRa_y-2bGpy_prMc4",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 190.00845596947102,
			"y": 601.7695328629186,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 886,
			"versionNonce": 512060590,
			"isDeleted": false,
			"id": "0zscjhc34ZFDtCuRVoFKY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 171.09578639389474,
			"y": 586.2341257115529,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 881,
			"versionNonce": 139951410,
			"isDeleted": false,
			"id": "Evd5uyZSIjKeaqKNoVu7D",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 177.0904271968675,
			"y": 569.7699713935286,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 880,
			"versionNonce": 1758439150,
			"isDeleted": false,
			"id": "_0IoBXcAWlYpCdFtBUUnx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 204.8684106359956,
			"y": 594.5084186508666,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 899,
			"versionNonce": 177538802,
			"isDeleted": false,
			"id": "vfNn93G1hvF-BnjlWhB-T",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 196.59411769668077,
			"y": 580.2394849085805,
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
			"updated": 1714834063531,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 885,
			"versionNonce": 1515755822,
			"isDeleted": false,
			"id": "ijnFm1EGjPc6K3BEJt8Fm",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 193.9767393179177,
			"y": 592.0599033933138,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 887,
			"versionNonce": 133912754,
			"isDeleted": false,
			"id": "mD0Vw5JvMaknOY-dZuhOd",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 199.5492223178644,
			"y": 603.4581640750241,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 898,
			"versionNonce": 176767854,
			"isDeleted": false,
			"id": "wcOuX8sUkNwjuzXvNioUB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 180.55212118168265,
			"y": 589.1047987721316,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 914,
			"versionNonce": 808546930,
			"isDeleted": false,
			"id": "vCZETQbya5lCLvBWIDSWO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 182.91620487862974,
			"y": 575.764612196501,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3016,
			"versionNonce": 1001039278,
			"isDeleted": false,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2379,
			"versionNonce": 637424690,
			"isDeleted": false,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2703,
			"versionNonce": 2128986094,
			"isDeleted": false,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2717,
			"versionNonce": 457768434,
			"isDeleted": false,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2770,
			"versionNonce": 1480823342,
			"isDeleted": false,
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
			"updated": 1714834063532,
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
			"version": 3330,
			"versionNonce": 1830318002,
			"isDeleted": false,
			"id": "A4UfXbGs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -453.2715692967913,
			"y": 1253.5251872914455,
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
			"updated": 1714834063532,
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
			"version": 2035,
			"versionNonce": 1655512174,
			"isDeleted": false,
			"id": "l5JwcInVEYNLdoVT_NODw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -418.9397804563839,
			"y": 1133.9775612316978,
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
			"boundElements": [],
			"updated": 1714834063532,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2853,
			"versionNonce": 1066641778,
			"isDeleted": false,
			"id": "059xAD6GXasc2y1KcOUqa",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": -404.609271014192,
			"y": 1147.8134666900423,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 13373,
			"versionNonce": 1944805038,
			"isDeleted": false,
			"id": "Zq6ZkNO6cWGIsU66n0ke_",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": -395.57275754798866,
			"y": 1156.841161296825,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3050,
			"versionNonce": 436316978,
			"isDeleted": false,
			"id": "TDXOxmJxVXS944MzwDWya",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.145779584744503,
			"x": -352.469612891799,
			"y": 1206.736899078167,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 814,
			"versionNonce": 1084709102,
			"isDeleted": false,
			"id": "11QfoJRRBalBiuJbG1IOi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -381.6105559434907,
			"y": 1176.2330740515797,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 842,
			"versionNonce": 46757106,
			"isDeleted": false,
			"id": "yfhPAcFCt3W_RmVtq13Hl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -360.5074685356549,
			"y": 1176.2330740515797,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 827,
			"versionNonce": 6949678,
			"isDeleted": false,
			"id": "yx9d1VZWOYwv8IpOi22oP",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -366.59124148205797,
			"y": 1191.6326243221636,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 855,
			"versionNonce": 460457650,
			"isDeleted": false,
			"id": "m8EpJyrhEOP6w5BQow_sX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -375.5267829970876,
			"y": 1191.6326243221636,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1950,
			"versionNonce": 1017274482,
			"isDeleted": false,
			"id": "tT23HScioDms3mIbqfzPg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -679.0563966883121,
			"y": 1124.7462996518634,
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
			"updated": 1714834063532,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1855,
			"versionNonce": 495425454,
			"isDeleted": false,
			"id": "tHiePl4R9NdAL4gxTtcU3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -649.4527193103013,
			"y": 1153.8308881316914,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1396,
			"versionNonce": 304185906,
			"isDeleted": false,
			"id": "BxXHNUK-EeT5YNK6AD-iG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -625.0555410957691,
			"y": 1149.9377213953317,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1322,
			"versionNonce": 1012167150,
			"isDeleted": false,
			"id": "8-jFrXL002oF00r5L6ybC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -649.7122637593886,
			"y": 1165.7699327898692,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1306,
			"versionNonce": 920022002,
			"isDeleted": false,
			"id": "d_T3yhdNtQ0mNWdBDZ5Jb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -640.8877524903048,
			"y": 1149.39267805224,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1291,
			"versionNonce": 420217902,
			"isDeleted": false,
			"id": "ZZTcEbp26t7tn7WTifsbQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -641.9259302866687,
			"y": 1170.701277322592,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1340,
			"versionNonce": 1355292082,
			"isDeleted": false,
			"id": "_uym9VPQ5q3gzJyQsD9Vi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -642.185474735762,
			"y": 1177.968521897134,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1300,
			"versionNonce": 362237550,
			"isDeleted": false,
			"id": "1t8kh7WqdFGcoNqjKniVv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -625.0555410957645,
			"y": 1208.5947668898489,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1400,
			"versionNonce": 756914034,
			"isDeleted": false,
			"id": "5rgp0bK7AWRsEhxYN9Ltu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -635.1777746103046,
			"y": 1191.7243776989483,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1298,
			"versionNonce": 1858031790,
			"isDeleted": false,
			"id": "buDGwVVbH1_rKlfUTfES9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -591.3147627139651,
			"y": 1187.5716665134955,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1270,
			"versionNonce": 1545460018,
			"isDeleted": false,
			"id": "zL-z0rf9fzFTrTIF75trr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -624.7959966466747,
			"y": 1198.4465789303986,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1303,
			"versionNonce": 1613564654,
			"isDeleted": false,
			"id": "zzzq4IGLlsGNwNcnO0Wjb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -640.3686635921247,
			"y": 1209.632944686212,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1286,
			"versionNonce": 1294983922,
			"isDeleted": false,
			"id": "VWuUcS65mfJbAkcAWg_LY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -651.0099860048451,
			"y": 1191.7243776989483,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1297,
			"versionNonce": 1214872878,
			"isDeleted": false,
			"id": "DbI1iM5zMj1oYIHPjQ4g7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -657.4985972321158,
			"y": 1177.968521897134,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1245,
			"versionNonce": 1792718002,
			"isDeleted": false,
			"id": "GTTMjj8ibmzJLMBTkSJwl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -610.7805963957701,
			"y": 1157.464510418964,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1291,
			"versionNonce": 1289594734,
			"isDeleted": false,
			"id": "FVBEvhyM-nH59S3tofbzq",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -616.1012576021335,
			"y": 1170.3119606489583,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1326,
			"versionNonce": 918900338,
			"isDeleted": false,
			"id": "3ORIayuxg4tHoz77YJIze",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -605.719479638504,
			"y": 1178.0982941216807,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1297,
			"versionNonce": 2110949806,
			"isDeleted": false,
			"id": "IOIH4u-YJQuEqWGLxWEwU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -616.8539365045001,
			"y": 1195.2282277616744,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1284,
			"versionNonce": 1706471474,
			"isDeleted": false,
			"id": "BMw8VtIM1aTFHtMOkuY6n",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -605.0706185157749,
			"y": 1159.8004104607833,
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
			"updated": 1714834063533,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3240,
			"versionNonce": 2054235118,
			"isDeleted": false,
			"id": "SVVIyLy3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -712.258935250642,
			"y": 1240.8251424614537,
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
			"updated": 1714834063533,
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
			"version": 3711,
			"versionNonce": 2073418226,
			"isDeleted": false,
			"id": "uq24zpXV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -435.8282141300192,
			"y": 380.59128996939785,
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
			"updated": 1714834063533,
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
			"version": 2540,
			"versionNonce": 348288558,
			"isDeleted": false,
			"id": "lluP5brliY-iDI86q0qP0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -409.9861440919017,
			"y": 300.58879718451294,
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
			"boundElements": [],
			"updated": 1714834063533,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 711,
			"versionNonce": 1734986674,
			"isDeleted": false,
			"id": "UzLTMwgW0EAtgx7eN1IMv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -392.0826308033993,
			"y": 318.5474097706043,
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
			"boundElements": [],
			"updated": 1714834063533,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 1112,
			"versionNonce": 1974435950,
			"isDeleted": false,
			"id": "-vhkX7u366GU-wyu1JtSh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -360.5421243991848,
			"y": 310.6784837448474,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5033884540041134,
				"gap": 10.195409271004902,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 1205,
			"versionNonce": 525960562,
			"isDeleted": false,
			"id": "5TV7VZn7IYZsjskJobvAe",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5318549836978397,
			"x": -368.0351021296385,
			"y": 343.3857085033144,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5014921565015409,
				"gap": 10.200396231667213,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 1227,
			"versionNonce": 1090601646,
			"isDeleted": false,
			"id": "5peHY9Bdux9fRGJQR-yyz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.659805918773737,
			"x": -395.5439123978131,
			"y": 302.25212737480706,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5334048395146314,
				"gap": 10.746893053393809,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 1170,
			"versionNonce": 1017906994,
			"isDeleted": false,
			"id": "lHYcqByIpwLxGUgLFVrCv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.0860941483440776,
			"x": -402.673906249385,
			"y": 336.9298247438179,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": {
				"focus": -1.5202105672697392,
				"gap": 10.459096950956052,
				"elementId": "UzLTMwgW0EAtgx7eN1IMv"
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
			"version": 800,
			"versionNonce": 962641134,
			"isDeleted": false,
			"id": "z1rfQtAFbQTsGQM98BU-t",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -382.2561965835191,
			"y": 346.65254363232566,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 675,
			"versionNonce": 399003890,
			"isDeleted": false,
			"id": "2IoOJBp-yFDAvnTr20re0",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -377.71892776888194,
			"y": 325.56072387438314,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2931,
			"versionNonce": 1683418926,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3399,
			"versionNonce": 1681220274,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3450,
			"versionNonce": 776788334,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3296,
			"versionNonce": 1285176434,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3244,
			"versionNonce": 244022190,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2969,
			"versionNonce": 247324210,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3088,
			"versionNonce": 725341678,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3227,
			"versionNonce": 394741746,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2912,
			"versionNonce": 2103896110,
			"isDeleted": false,
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
			"updated": 1714834063534,
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
			"version": 2637,
			"versionNonce": 519928242,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2425,
			"versionNonce": 1962259054,
			"isDeleted": false,
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
			"updated": 1714834063534,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3043,
			"versionNonce": 1145533298,
			"isDeleted": false,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2435,
			"versionNonce": 481375406,
			"isDeleted": false,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3121,
			"versionNonce": 699151666,
			"isDeleted": false,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2884,
			"versionNonce": 1044541166,
			"isDeleted": false,
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
			"updated": 1714834063535,
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
			"version": 3378,
			"versionNonce": 278052594,
			"isDeleted": false,
			"id": "ZwKKiK5OxjYFbYEWoHQ9b",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -692.5961552165256,
			"y": 300.239226673478,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2275,
			"versionNonce": 103964974,
			"isDeleted": false,
			"id": "nVuTuOFj8CcudbOYrwaOi",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -683.1520331178435,
			"y": 310.2380925929572,
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
			"boundElements": [],
			"updated": 1714834063535,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2279,
			"versionNonce": 1971458226,
			"isDeleted": false,
			"id": "-Qd_eac-wX2-NvtAx5kLm",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -650.6855270860597,
			"y": 320.25129980729594,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2324,
			"versionNonce": 669649774,
			"isDeleted": false,
			"id": "50uZ2q3HpQ_hB4gs__jfd",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -641.1504125386537,
			"y": 350.459483633084,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2356,
			"versionNonce": 740371058,
			"isDeleted": false,
			"id": "c7RtJ_vFaiphs-wZX0Kw-",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -669.5026089647085,
			"y": 339.7447863789873,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2343,
			"versionNonce": 28470702,
			"isDeleted": false,
			"id": "BcscTEDU55f58RxXHctLi",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -639.1493637518852,
			"y": 334.3745161642156,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2384,
			"versionNonce": 2067205170,
			"isDeleted": false,
			"id": "NDVSDoiZMIZcEv-SsCeAE",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.497787143782138,
			"x": -651.4239197376467,
			"y": 344.6421147306513,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2484,
			"versionNonce": 1085573102,
			"isDeleted": false,
			"id": "xMM574d918SG_i7f6tFPD",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.33043282694363,
			"x": -658.9628401407308,
			"y": 330.4047479122038,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2496,
			"versionNonce": 950711794,
			"isDeleted": false,
			"id": "PumX9x4qspw_CD9Q8IVoN",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.2993692646569315,
			"x": -666.4430649759304,
			"y": 355.99828598865065,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2631,
			"versionNonce": 83450414,
			"isDeleted": false,
			"id": "6W_cQ3tq7OygsuyN498fz",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.938756218467832,
			"x": -679.2985702678818,
			"y": 341.1141727856726,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2748,
			"versionNonce": 1703094194,
			"isDeleted": false,
			"id": "QJtzVzlzDxl-CTA1Fmgk1",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.829160445235754,
			"x": -626.7470889745423,
			"y": 362.27821134980195,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2920,
			"versionNonce": 90825838,
			"isDeleted": false,
			"id": "VnWwhIrb1WSGwhkIvpCyp",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.49818137785806815,
			"x": -635.4396798541813,
			"y": 365.92987683885235,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2933,
			"versionNonce": 1239900530,
			"isDeleted": false,
			"id": "GbhAaTB2lClzd0n31M8Lw",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.809117217502431,
			"x": -632.2203940822544,
			"y": 315.200559647227,
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
			"updated": 1714834063535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2888,
			"versionNonce": 869213870,
			"isDeleted": false,
			"id": "KcNLaDHZr7jyEjaFjLBk3",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.014839308967369,
			"x": -654.3763366270139,
			"y": 311.5763671669067,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2778,
			"versionNonce": 287204146,
			"isDeleted": false,
			"id": "W2uzNyu3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -719.1897417494285,
			"y": 393.0170266809869,
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
			"updated": 1714834063536,
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
			"version": 1936,
			"versionNonce": 1624383726,
			"isDeleted": false,
			"id": "is5cc0TM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -172.63010190374507,
			"y": 352.27521665248037,
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
			"updated": 1714834063536,
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
			"version": 3087,
			"versionNonce": 1703881970,
			"isDeleted": false,
			"id": "0ElEA9ifaQkbnN5klJ3mM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -168.48953775329187,
			"y": 227.21460258052457,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2138,
			"versionNonce": 1610339118,
			"isDeleted": false,
			"id": "EVVzfJgKZXtCgXW-SzlTR",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -149.5344317019808,
			"y": 241.3989755720704,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2236,
			"versionNonce": 213958322,
			"isDeleted": false,
			"id": "vESZKvL--cLuGvg2LPIA6",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -140.33539462387444,
			"y": 250.6361701006681,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2325,
			"versionNonce": 733298030,
			"isDeleted": false,
			"id": "9pjVhJ4NEcna9DAkkj3FZ",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -101.63772975888287,
			"y": 305.9045888129881,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2366,
			"versionNonce": 56236146,
			"isDeleted": false,
			"id": "Ago84y1_vglRfjcokLjtX",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -128.93800322096786,
			"y": 260.4686504073086,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3001,
			"versionNonce": 155672494,
			"isDeleted": false,
			"id": "t4VGa9mfl5X6LiUf7_N7G",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -128.70808709793982,
			"y": 264.24482417786135,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2383,
			"versionNonce": 421673522,
			"isDeleted": false,
			"id": "u6AgjhKCTTQg1yrb5OBYd",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -117.93529366465077,
			"y": 270.83718461862486,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3223,
			"versionNonce": 752564718,
			"isDeleted": false,
			"id": "aEDBKVxxSx8ETXOtD9E8B",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -117.21998175141539,
			"y": 270.39151364766076,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 2686,
			"versionNonce": 218113010,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1958,
			"versionNonce": 1568263214,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1914,
			"versionNonce": 687527346,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1907,
			"versionNonce": 420222574,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1961,
			"versionNonce": 1580814194,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1881,
			"versionNonce": 945494190,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1905,
			"versionNonce": 1627558194,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1967,
			"versionNonce": 319804142,
			"isDeleted": false,
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
			"updated": 1714834063536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 3449,
			"versionNonce": 1153276658,
			"isDeleted": false,
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
			"updated": 1714834063536,
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
			"version": 2251,
			"versionNonce": 433430894,
			"isDeleted": false,
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
			"updated": 1714834063538,
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
			"version": 1999,
			"versionNonce": 1356985458,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 3326,
			"versionNonce": 498811822,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1498,
			"versionNonce": 558798386,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1558,
			"versionNonce": 1362271726,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1562,
			"versionNonce": 121700338,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1585,
			"versionNonce": 1229238318,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1608,
			"versionNonce": 1589653938,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1271,
			"versionNonce": 299530862,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1312,
			"versionNonce": 1794321266,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1294,
			"versionNonce": 1371339950,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1223,
			"versionNonce": 1914760498,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1268,
			"versionNonce": 1855272686,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1273,
			"versionNonce": 1504737010,
			"isDeleted": false,
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
			"width": 7.649531550474005,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1314,
			"versionNonce": 820783406,
			"isDeleted": false,
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
			"updated": 1714834063538,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1263,
			"versionNonce": 1109969074,
			"isDeleted": false,
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
			"updated": 1714834063539,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1278,
			"versionNonce": 1747637102,
			"isDeleted": false,
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
			"updated": 1714834063539,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1251,
			"versionNonce": 590406258,
			"isDeleted": false,
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
			"updated": 1714834063539,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"version": 1299,
			"versionNonce": 244987310,
			"isDeleted": false,
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
			"updated": 1714834063539,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
			"type": "text",
			"version": 329,
			"versionNonce": 1835225070,
			"isDeleted": false,
			"id": "88TIvi3e",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 625.8546746425761,
			"y": -1300.3131175034628,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 940.1990966796875,
			"height": 100,
			"seed": 666982599,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1714834063539,
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
			"x": 1901.463063085757,
			"y": -943.3475124960538,
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
			"version": 261,
			"versionNonce": 1036106619,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714843768144,
			"link": null,
			"locked": false,
			"status": "pending",
			"fileId": "d751345c2cc691e74f0ca6a58a00573821ffaf18",
			"scale": [
				1,
				1
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
		"currentItemFontSize": 20,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": -909.1452050179003,
		"scrollY": 1198.588198933394,
		"zoom": {
			"value": 1.0000000000000004
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