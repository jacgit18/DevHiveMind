---
excalidraw-plugin: parsed
tags: 
author: []
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 2024-04-13T00:00:00.000Z
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
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
Active Userbase size = 200,000,000
AVG likes per user in month = 100 posts  
AVG comments per user in month = 50 posts 
Post per user in month = 150

###### Data Size 
AVG likes size = 90 byte(adjusted for meta data)

AVG comments size = 
40(words) * 5(char) * 1byte = 
200 byte(adjusted for meta data)

Total post size per user = round to 300 bytes 

Total Monthly Post size = 150 Post per user in month * 300 bytes Total post size per user = 45,000 bytes = 43.95KB = 44KB

Monthly Post Storage Requirement = AU size 200M * Total post size 300 bytes * 150 monthly post = 9,000,000,000,000 bytes = 8.18TB = 8TB

###### Daily estimates

Total writes per day = 200,000,000 AU * 45,000 bytes Total Monthly Post size / 30 = 300,000,000,000 bytes = 286.1MB = 300MB


Total write per sec = 300,000,000,000 bytes/ 4000 * 20(secs in day est) = 300,000,000,000 bytes/ 80K = 300,000,000,000 bytes /100k = 3,000,000,000,000 bytes = 3TBps

###### Long term estimates

Data replication = 8TB Monthly Post Storage Requirement * 3 = 24TB

Year Storage =  1 * 400(Rounded year day) * 24TB = 400 * 24TB = 9600TB

5 Year Storage = Year Storage * 5 = 48,000TB = 48PB


#### Network Traffic
Read:Write *50*:1 read heavy ratio

##### Reads
> GET

As a users we want to:
- Get Video views(not included in calculation)
- Get Video likes
- Get Comment likes

something off with math

read per day = *50* * 300,000,000,000 bytes write per day = 15,000,000,000,000 bytes = 15,000TB = 15PB

read per sec = *50* * 3,000,000,000,000 bytes write per sec = 150,000,000,000,000 bytes = 150TB

Overall Traffic: (Daily active users * read per sec) * (Daily active users * writes per sec)

Overall Traffic = 200,000,000 AU * (15,000,000,000,000 bytes + 150,000,000,000,000 bytes)

Overall Traffic = 200,000,000 AU * 165,000,000,000,000 bytes = 33,000,000,000,000,000,000,000,000 bytes


#### Memory Cache
caching is a way to serve read request faster use 80-20 rule for caching

Caching Memory = read per day * AVG post total size * 20%

Caching Memory = 172.5TB * 300 bytes  * 0.2 = 172.5TB * 300 bytes = 2,070TB  might be less since you have duplicate request being made to do the same thing 

Total memory: (Caching Memory * 3 for replication) = 6,210 TB


#### Bandwidth
InComing Data per sec(Write) = 0.005(write per sec) * 300 bytes(arbitrary storage action size) = 1.5 bytes per sec

OutGoing Data per sec(Read) = 0.25(read per sec) * 300 bytes(arbitrary storage action size) = 75 bytes per sec



### App Server Estimations
Might be asked how many app service do you need

request per sec for single server = # cpu physical cores / 0.5 or half a sec = 16 

request per sec for single server = 8 physical cores / 0.5 or half a sec = 16 

Number of Servers = 500(read per sec)/ number of request per second a single server can handle

Number of Servers = 500(read per sec) / 16 request per sec for single server = 30 to 50 servers 



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
cqasGqqJ: [[_System Design Template#Table 1]]
S5QN8lcM: [[_System Design Template#Table 2]]

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