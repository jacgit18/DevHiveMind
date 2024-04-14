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

| Unit       | Equivalent in Bytes                           | Place       |       |
| ---------- | --------------------------------------------- | ----------- | ----- |
| 1 Byte     | 1                                             | Hundred     | 10^2  |
| 1 Kilobyte | 1,024 Bytes                                   | Thousand    | 10^3  |
| 1 Megabyte | 1,024 Kilobytes = 1,048,576 Bytes             | Million     | 10^6  |
| 1 Gigabyte | 1,024 Megabytes = 1,073,741,824 Bytes         | Billion     | 10^9  |
| 1 Terabyte | 1,024 Gigabytes = 1,099,511,627,776 Bytes     | Trillion    | 10^12 |
| 1 Petabyte | 1,024 Terabytes = 1,125,899,906,842,624 Bytes | Quadrillion | 10^15 |

### Time

| Calculation              | Result                      |
| ------------------------ | --------------------------- |
| 60 seconds * 60 minutes  | 3,600 seconds per hour      |
| 3,600 seconds * 24 hours | 86,400 seconds per day      |
| 86,400 seconds * 30 days | 2,592,000 seconds per month |



# Question
Design a recommendation engine for YouTube that provides personalized video recommendations to users. 
## Requirements

### Userbase
age, geography, governance, etc ...

#### Schema
##### Table 1 

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| ..        | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |

##### Table 2

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| ..        | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |


#### Data points of focus identified
comments, views, likes, 

dislikes(not on youtube any more specifically the count at least on the client side)


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

Total Storage Needed = 25,612,809.7525 MB

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

Bandwidth: Requests per day * average request size

Bandwidth required: (200,000,000 million(Active users) \* 1.5 MB) = 286.13 TB

Bandwidth per second: (286.13 TB / 86,400 seconds in a day) = 3.308 GB

### Database Schema 
READ
- GET

WRITE
- POST 
- PATCH/PUT
- DELETE

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

### Backing Services

#### Database
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
  

#### Cloud Infrastructure


#### Non-Cloud Infrastructure
##### Caches
For videos that already exist on YouTube and are being recommended to users, they are typically not stored separately in a cache or database solely for the purpose of recommendations. Instead, YouTube leverages its existing infrastructure and data storage mechanisms to facilitate recommendation functionality. Here's how it generally works:  
  
1. **Metadata and Indexing**: YouTube stores metadata about each video, including titles, descriptions, tags, categories, upload dates, view counts, likes, and dislikes, in its databases. This metadata is indexed and optimized for efficient querying and retrieval.  
  
2. **User Interactions**: YouTube tracks user interactions such as views, likes, dislikes, comments, shares, and subscriptions using its backend systems. This user engagement data is also stored in databases and used to generate personalized recommendations.  
  
3. **Recommendation Algorithms**: YouTube employs sophisticated recommendation algorithms that analyze user behavior, preferences, and content similarities to generate personalized recommendations. These algorithms run on YouTube's backend infrastructure and leverage large-scale data processing techniques to compute recommendations in real-time.  
  
4. **Caching and Optimization**: While the recommended videos themselves may not be stored separately in a cache or database, YouTube likely uses caching mechanisms at various levels of its infrastructure to optimize recommendation delivery and reduce latency. This may include caching frequently accessed metadata, pre-computed recommendations, and other relevant data to improve system performance.  
  
In summary, videos recommended on YouTube are typically not stored separately in a cache or database solely for recommendation purposes. Instead, YouTube leverages its existing infrastructure and data storage mechanisms, including metadata storage, user interaction tracking, recommendation algorithms, and caching mechanisms, to deliver personalized recommendations to users based on their preferences and behavior.

## Optimizations


## Wrap Up


==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
# Element Links
d9HppMUX: [[Designing YouTube Recommendation Engine#DB Query to Request Table]]
cLKZo11N: [[Designing YouTube Recommendation Engine#DB Table]]

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.1.1",
	"elements": [
		{
			"type": "embeddable",
			"version": 122,
			"versionNonce": 2140519207,
			"isDeleted": false,
			"id": "d9HppMUX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -329.7674865722656,
			"y": -399.9989471435547,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 741.7788696289064,
			"height": 336.7786865234375,
			"seed": 63178,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712465694514,
			"link": "[[Architecture/System Design/Designing YouTube Recommendation Engine.md#DB Query to Request Table]]",
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
			"version": 136,
			"versionNonce": 1769616935,
			"isDeleted": false,
			"id": "cLKZo11N",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -266.40804873907604,
			"y": 1.4009252779292183,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 659.6204833984374,
			"height": 309.392578125,
			"seed": 94875,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712465696330,
			"link": "[[Architecture/System Design/Designing YouTube Recommendation Engine.md#DB Table]]",
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
		"scrollX": 309.3915082117323,
		"scrollY": 588.5570550418864,
		"zoom": {
			"value": 1
		},
		"currentItemRoundness": "round",
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