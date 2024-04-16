---
excalidraw-plugin: parsed
tags: null
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: null
Started: 2024-04-13T00:00:00.000Z
EditDate: null
Relates: null
Peer Reviewed: 0
dg-publish: null
---

# Question
## Requirements Gathering

### Userbase

#### Schema

##### Table 1

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| tes       | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |


##### Table 2

|     |     |
| --- | --- |
|     |     |
|     |     |
|     |     |
|     |     |
|     |     |
|     |     |

  

### Capacity Estimation
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate also consider ratios and metadata.

Assume we have a Active Userbase of 200,000,000

#### Storage
You should be concerned with writes here only because we need to know how much data we need to store.

##### Writes
> POST, PUT, DELETE

As a users we want to:
- Post Comment
- Post Like
- Not in scope for storage estimation
	- Post unlike(if you reClick like button) would still be a post
	- Update Comment 
	- Delete Comment

Lets Assume were dealing with English comments there are about 500K words in the English language.

A comment might contain 20 to 40 words and each word might have a length of 5 characters thus each comment will range about 100 to 200 characters. Assuming each character is approximately 1 byte, the average size of a YouTube comment in English would be around 100 to 200 bytes.

**Lets say we have 2:1 ratio of Likes to Comments**
AVG likes per user in month = 100 posts 
AVG comments per user in month = 50 posts 

AVG likes size = 90 byte(adjusted for meta data)
AVG comments size = 40 * 5 * 1 = 200 byte(adjusted for meta data)
AVG post total size = round to 300 bytes 

AU Number of likes per month = AVG likes * AVG likes  size * Active User = 1,800,000,000,000 bytes = 1.8TB

AU Number of comments per month = AVG comments * AVG comments size * Active User = 2,000,000,000,000 bytes = 2TB

Monthly Total storage size needed = AU Number of likes per month + AU Number of comments per month = 3,800,000,000,000 bytes = 3.8TB

Total Monthly Post = 100 monthly likes + 50 monthly comments = 150

Total writes per day = 150 Total Monthly Post / 30 = 5 writes

Total writes per day in  bytes
3,800,000,000,000 bytes > 3,000,000,000,000 bytes / 30 = 100,000,000 bytes rough approximation or 95.37 MB or 90 MB

write per sec = 5/ 4000 * 20(secs in day est) = 5/ 80K = 5 /100k = 0.005 writes a sec

Data replication which is typically done 3 to 5 times  

Data replication =  3.8 TB * 3 = 11.4TB


Year Storage =  1 * 400(Rounded year day) * 3.8 TB = 400 * 3.8 TB = 1520 TB

5 Year Storage = Year Storage * 5 = 7600TB

#### Network Traffic
Read:Write *50*:1 read heavy ratio

##### Reads
> GET

As a users we want to:
- Get Video views
- Get Video likes
- Get Comment likes

read per day = *50* * 3,800,000,000,000 bytes write per day = 190,000,000,000 bytes = 172.5TB

read per sec = *50* * 0.005 write per sec = 0.25

Overall Traffic: (Daily active users * read per sec) * (Daily active users * writes per sec)

Overall Traffic = (200,000,000 * 0.25) + (200,000,000 * 0.005)

Overall Traffic = (50,000,000) + (100,000) = 50,100,000 bytes = 47.79MB = 50MBps

#### Memory Cache
caching is a way to serve read request faster use 80-20 rule for caching
##### Cache
Caching Memory = read per day * arbitrary storage action size * 20%

Caching Memory = 10,000,000,000B * 10KB  * 0.2 = 10,000,000,000B(^9) * 2KB(^3) =  18.651 TB might be less since you have duplicate request being made to do the same thing 

seems excessive might be issues

#### Bandwidth
InComing Data per sec(Write) = 2,000(write per sec) * 10KB(arbitrary storage action size) = 20MB per sec

OutGoing Data per sec(Read) = 100k(read per sec) * 10KB(arbitrary storage action size) = 10MB per sec



### App Server Estimations
Might be asked how many app service do you need

500(read per sec)/ number of request per second a single server can handle

You should consider if the request is CPU bound, memory bound or I/O bound

if CPU bound number of request per second a single server can handle would = number of physical cores / time to process request

8 cores / 0.5 or half a sec = 16 request per sec for single server

500(read per sec) / 16 request per sec for single server = 30 to 50 servers 


This this is dependent on service hardware also the number of time it takes to process a single request.


## Architecture
Typically Microservices 

Talk optimizations throughout and traffic management.

### Backing Services

#### Cloud Infrastructure
##### Cloud Database or Non-AWS Alt

##### Cache


## Wrap Up


==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
# Element Links
cqasGqqJ: [[Designing YouTube Upload System Design Template#Table 1]]
S5QN8lcM: [[Designing YouTube Upload System Design Template#Table 2]]

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.1.3",
	"elements": [
		{
			"type": "embeddable",
			"version": 744,
			"versionNonce": 1509628712,
			"isDeleted": false,
			"id": "cqasGqqJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -367.1573022819002,
			"y": -862.5466510419571,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 820.2427122401591,
			"height": 330.5377817830738,
			"seed": 94149,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713150648726,
			"link": "[[Designing YouTube Upload System Design Template#Table 1]]",
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
			"version": 423,
			"versionNonce": 2134863144,
			"isDeleted": false,
			"id": "S5QN8lcM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -350.3508792678492,
			"y": -456.25937309140755,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 244.8476985718545,
			"height": 174.72697907884003,
			"seed": 40223,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713150656095,
			"link": "[[Designing YouTube Upload System Design Template#Table 2]]",
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
			"version": 420,
			"versionNonce": 1696134232,
			"isDeleted": true,
			"id": "yApo8vnP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -401.9541015625,
			"y": -886.700309753418,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 805.439453125,
			"height": 393.8836568737912,
			"seed": 38646,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713150638804,
			"link": "[[Designing YouTube Upload System Design Template#Userbase]]",
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
			"id": "9MoWNcW1",
			"type": "text",
			"x": -239.14912088756978,
			"y": -80.74666790580886,
			"width": 9.999984741210938,
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
			"frameId": null,
			"roundness": null,
			"seed": 1898583384,
			"version": 2,
			"versionNonce": 601540392,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1713150634272,
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
		"scrollX": 447.9041562879604,
		"scrollY": 1055.8853893718733,
		"zoom": {
			"value": 0.8
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