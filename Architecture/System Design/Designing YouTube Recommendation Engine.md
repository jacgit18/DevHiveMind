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
EditDate: 2024-04-06
Relates: 
Peer Reviewed: 0
dg-publish:
---
Can expand on this system week by week growing it or mock by mock interview in a week.

# Question
Design a recommendation engine for YouTube that provides personalized video recommendations to users. 
## Requirements

## Userbase
age geo location governance etc ...
#### Data points of focus identified
comments, views, likes, 

dislikes(not on youtube any more specifically the count at least on the client side)


#### Usage Assumption to trace out math calculation
update values after to be closer to more realistic estimations

10,000 active user

Total seconds in a month =  30 * 24 * 60 * 60 =  2,592,000 seconds

Total seconds in a day =  24 * 60 * 60 =  86,400 seconds

> in general monthly estimations should be sufficient especially since there is so much other things to consider.
##### Comments
2 comments per user on average a month

Total monthly comments: 2 comments per user * 10,000 users = 20,000 comments

Overall comments per day: Total monthly comments / 30 days  = 667 comments after rounding up 

Comments per second in a day = Overall comments per day / Total seconds in a day

Comments per second in a day = 667 / 86,400  ≈ 0.008

###### Storage Estimation

Total storage needed = Average comment size(assumption) * Total monthly comments 

Total storage needed = 1KB * 20,000 comments = 20,000 KB

20,000 KB / 1024 bytes = 19.53 MB (approximately)


###### Memory Estimation
> metadata associated with each comment, such as timestamp, user ID, Comment ID, Reply-to ID, likes/dislikes count, or Flags. You need to allocate additional memory.

Total metadata overhead = 500 bytes * 20,000 comments = 10,000,000 bytes boils down to roughly 9.54 MB

To convert bytes to megabytes (MB), we divide by 1,048,576 (1024 * 1024), because 1 MB equals 1,048,576 bytes

10,000,000 bytes / 1,048,576 bytes/MB ≈ 9.54 MB


Allocate an additional 20-30% of the total memory for overhead

Memory overhead = 30% * (Total memory for storing comments + Total metadata overhead) Memory overhead ≈ 30% * (20,000 KB + 9.54 MB) ≈ 30% * (20,000 KB + 9.54 MB) ≈ 3.76 MB

Total memory estimation ≈ Total memory for storing comments + Total metadata overhead + Memory overhead 

Total memory estimation ≈ 20,000 KB + 9.54 MB + 3.76 MB ≈ 20,000 KB + 13.3 MB ≈ 13.32 MB



###### Ratio(Side Note)
Storage to memory ratio = Storage estimation / Memory estimation

Storage to memory ratio = 19.53 MB / 13.32 MB ≈ 1.47  

A ratio of approximately 1.47 indicates that the storage estimation is higher than the memory estimation by about 47%.


A 47% difference between storage and memory estimations is somewhat on the higher side. It suggests that the storage requirements are significantly higher than the memory requirements for caching and managing the same data set.

In some cases, such as when optimizing for read performance or when storage is relatively inexpensive compared to memory, this higher ratio might be acceptable. However, it's essential to ensure that you're not overallocating resources unnecessarily, as excessive memory usage can lead to performance degradation due to increased paging/swapping or even out-of-memory errors.

###### Network Estimation
Total network traffic for comments: 20,000 comments * 1 KB Average comment size(assumption) = 20,000,000 KB


##### Likes
30 likes per user in a month between shorts and regular videos

Total monthly likes: 30 likes per user * 30 days * 10,000 users = 9,000,000 likes

Overall likes per day: Total monthly likes / 30 days  = 300,000 likes


Likes per second in a day = Total likes in a day / Total seconds in a day

Likes per second in a day = 300,000 likes / 86,400 seconds = 3.4722 likes

##### Views
100 views per user a month shorts and regular videos

Total monthly views = 100 * active users * 30 days = 30,000,000

Overall daily views per day(shorts and regular videos): Monthly views/ 30 days = 1,000,000 views

Views per second in a day = Total views in a day / Total seconds in a day

Views per second in a day = 1,000,000 views / 86,400 seconds ≈ 11.5741 views per second



### Database Schema 
READ
- GET

WRITE
- POST 
- PATCH/PUT
- DELETE


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

#### DB Table

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| ..        | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |

#### Response 
```json
{
"total":10,
"buisnesses": [{buisness object}]
}
```

## Estimations

Database

Network Traffic

Memory

Bandwidth

#todo/Personal/Low 
- [ ] Senior level estimation to research storage around machine learning models. **Total Storage:** Considering additional storage for video metadata, user profiles, and machine learning model checkpoints, let's estimate a total storage requirement of 500 GB per month. 


## Architecture
Typically Microservices

### Backing Services

#### Cloud Infrastructure


#### Non-Cloud Infrastructure
##### Caches


## Optimizations


## Wrap Up


==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
# Element Links
d9HppMUX: [[Architecture/System Design/Designing YouTube Recommendation Engine.md#DB Query to Request Table]]
cLKZo11N: [[Architecture/System Design/Designing YouTube Recommendation Engine.md#DB Table]]

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