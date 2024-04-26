---
excalidraw-plugin: parsed
tags: 
author: 
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 2024-04-13T00:00:00.000Z
EditDate: 
Relates: 
Peer Reviewed: 0
excalidraw-open-md: true
dg-publish:
---
# Question
## Requirements Gathering
Functional Requirements core functionality.

Non Requirements Functional how the system should perform or behave under various conditions things like performance, scalability, security, reliability, and usability should be discussed.

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

|     | Region       |
| --- | ------------ |
| PK  | RegionID     |
| FK  | UserID       |
| FK  | RandomID     |
|     | Name         |
|     | Phone number |
|     | ...          |
|     | ...          |

  

### Capacity Estimation
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate also consider ratios and metadata.

Assume we have a Active Userbase of 200,000,000

#### Storage
You should be concerned with writes here only because we need to know how much data we need to store.

##### Writes(POST)
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

##### Reads(GET)
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

## Backing Services
Scalability strategies 
### Cloud Infrastructure
Don't need to use strictly cloud services

#### Data Storage
can talk governance and retention within cache, database, and application state also optimizations.
##### Database

##### Storage 
file systems static files etc..

##### Caching

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
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.1.4",
	"elements": [
		{
			"type": "embeddable",
			"version": 828,
			"versionNonce": 1395730528,
			"isDeleted": false,
			"id": "cqasGqqJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1339.1610256703464,
			"y": -1046.5946933403611,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 820.2427122401591,
			"height": 330.5377817830738,
			"seed": 94149,
			"groupIds": [],
			"frameId": "b_CFDPxeHaDK177m8nPQ0",
			"roundness": null,
			"boundElements": [],
			"updated": 1714137900760,
			"link": "[[_System Design Template#Table 1]]",
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
			"version": 629,
			"versionNonce": 715557984,
			"isDeleted": false,
			"id": "S5QN8lcM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1223.3031693136868,
			"y": -672.0786298581955,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 388.7526111639461,
			"height": 277.5162023589054,
			"seed": 40223,
			"groupIds": [],
			"frameId": "b_CFDPxeHaDK177m8nPQ0",
			"roundness": null,
			"boundElements": [],
			"updated": 1714150898889,
			"link": "[[_System Design Template#Table 2]]",
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
			"id": "b_CFDPxeHaDK177m8nPQ0",
			"type": "frame",
			"x": -1498.2029442210246,
			"y": -1137.7444537919764,
			"width": 1191.3043086357386,
			"height": 792.0821704947901,
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
			"seed": 156896352,
			"version": 166,
			"versionNonce": 826717280,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714137900760,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "1 Schema"
		},
		{
			"id": "bxL2RflkXFdN5903FWKpZ",
			"type": "frame",
			"x": -133.56501408886652,
			"y": -1145.4488228537855,
			"width": 993.0925615684716,
			"height": 797.5415166264172,
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
			"seed": 1436124256,
			"version": 186,
			"versionNonce": 830923872,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714138223781,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "2 Codebase Arch"
		},
		{
			"id": "qGrI9dqflYdohIJYjf8st",
			"type": "frame",
			"x": -1483.379798440925,
			"y": -151.73594211605155,
			"width": 1178.8342836746044,
			"height": 744.7765896857663,
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
			"seed": 876494944,
			"version": 156,
			"versionNonce": 1255729568,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714138289510,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "3 Database Stuff"
		},
		{
			"id": "hy-ix3SUl-OOGEZt8P5ep",
			"type": "frame",
			"x": -176.4629165401061,
			"y": -151.7359421160512,
			"width": 1138.5119842330182,
			"height": 735.2889898171576,
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
			"seed": 629524896,
			"version": 65,
			"versionNonce": 1240313248,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1714137945183,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "4"
		},
		{
			"id": "xTMJFJGy",
			"type": "text",
			"x": -1352.9253002475584,
			"y": -199.1739414590936,
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
			"seed": 1738231904,
			"version": 2,
			"versionNonce": 1877651872,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714137925283,
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
			"id": "9bMuNKVH",
			"type": "text",
			"x": -114.66144456769666,
			"y": -1179.2557350756056,
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
			"seed": 128782752,
			"version": 17,
			"versionNonce": 1588697184,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714138190220,
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
			"id": "2Kad2C6f",
			"type": "text",
			"x": -110.92365463023975,
			"y": -1166.1734702945062,
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
			"seed": 415236512,
			"version": 2,
			"versionNonce": 2126928992,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714138192897,
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
			"id": "hKX844kd",
			"type": "text",
			"x": -75.41465022439888,
			"y": -1162.4356803570493,
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
			"seed": 420533664,
			"version": 2,
			"versionNonce": 2045724768,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1714138210087,
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
		"scrollX": 1677.9920859090557,
		"scrollY": 1433.9802790165177,
		"zoom": {
			"value": 0.5350755482424828
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