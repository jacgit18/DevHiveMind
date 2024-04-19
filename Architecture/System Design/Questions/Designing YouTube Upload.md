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
Functional Requirements core functionality.

Non Requirements Functional how the system should perform or behave under various conditions things like performance, scalability, security, reliability, and usability should be discussed.


### Userbase

Geography USA no inappropriate content , China Region lock only certain content


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


##### Table User

|     | User                | Type      |
| --- | ------------------- | --------- |
| PK  | UserID              |           |
|     | email               | VarChar   |
|     | password            | VarChar   |
|     | date started        | TimeStamp |
|     | channel name        | VarChar   |
|     | monetization status | Boolean   |


##### Table Region

|     | Region   |
| --- | -------- |
| PK  | RegionID |
| FK  | UserID   |
| FK  | ...      |
|     | ...      |
|     | ...      |
|     | ...      |
|     | ...      |

  

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

##### Traffic Management

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
User Table ^zmns1Vak

Region Table ^kDAUSBOV

# Element Links
cqasGqqJ: [[_System Design Template#Table 1]]
Mf9OBUwN: [[Architecture/System Design/Questions/Designing YouTube Upload.md#Table User]]
gPBXehTo: [[Architecture/System Design/Questions/Designing YouTube Upload.md#Table Region]]

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
			"version": 774,
			"versionNonce": 813015081,
			"isDeleted": false,
			"id": "cqasGqqJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -747.5021061454199,
			"y": -910.619949133179,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 820.2427122401591,
			"height": 330.5377817830738,
			"seed": 94149,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632529,
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
			"version": 263,
			"versionNonce": 1934791399,
			"isDeleted": false,
			"id": "Mf9OBUwN",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 155.71321911010398,
			"y": -1141.4509123432636,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 598.6017113690564,
			"height": 291.548805907991,
			"seed": 41078,
			"groupIds": [
				"8iqW4reCuNgs5gs8CRDjC"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632529,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Upload.md#Table User]]",
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
			"id": "zmns1Vak",
			"type": "text",
			"x": 294.4816351961232,
			"y": -1253.1033152810428,
			"width": 322.1274450440888,
			"height": 72.931463503065,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [
				"8iqW4reCuNgs5gs8CRDjC"
			],
			"frameId": null,
			"roundness": null,
			"seed": 1743798023,
			"version": 202,
			"versionNonce": 251769609,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1713328632529,
			"link": null,
			"locked": false,
			"text": "User Table",
			"rawText": "User Table",
			"fontSize": 58.345170802452,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "User Table",
			"lineHeight": 1.25
		},
		{
			"id": "kDAUSBOV",
			"type": "text",
			"x": 942.410690994646,
			"y": -1067.3170247551639,
			"width": 333.0792236328125,
			"height": 66.57336336827835,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [
				"ytZLB-HcdUO2W2ZrCVy9O"
			],
			"frameId": null,
			"roundness": null,
			"seed": 398053641,
			"version": 88,
			"versionNonce": 560832007,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1713328632529,
			"link": null,
			"locked": false,
			"text": "Region Table",
			"rawText": "Region Table",
			"fontSize": 53.25869069462268,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Region Table",
			"lineHeight": 1.25
		},
		{
			"type": "embeddable",
			"version": 103,
			"versionNonce": 742943209,
			"isDeleted": false,
			"id": "gPBXehTo",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 914.6775919001338,
			"y": -974.0370603192141,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 391.4798990885421,
			"height": 290.7396569826509,
			"seed": 51869,
			"groupIds": [
				"ytZLB-HcdUO2W2ZrCVy9O"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632529,
			"link": "[[Architecture/System Design/Questions/Designing YouTube Upload.md#Table Region]]",
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
			"id": "ftC1hzyHhNxrfFq4MBV7J",
			"type": "arrow",
			"x": 646.2066639453367,
			"y": -1074.957784936098,
			"width": 365.1483832465278,
			"height": 214.22037760416652,
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
			"roundness": {
				"type": 2
			},
			"seed": 1700446377,
			"version": 76,
			"versionNonce": 1782203687,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1713328632529,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					365.1483832465278,
					214.22037760416652
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": null,
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"type": "rectangle",
			"version": 1222,
			"versionNonce": 559236297,
			"isDeleted": true,
			"id": "lUKbAZrmR_wbps46Iyl-6",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 645.3090941119797,
			"y": -459.40831051744055,
			"strokeColor": "#000000",
			"backgroundColor": "#40c05788",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 1215458983,
			"groupIds": [
				"GfC2DZm3rdfCyonqLBx2p",
				"Ff_ptdkfaUUGpD5-wvict",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632529,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1469,
			"versionNonce": 1025837127,
			"isDeleted": true,
			"id": "FASb2f1P",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 657.7595144916183,
			"y": -389.2380659147176,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 40.18000030517578,
			"height": 24,
			"seed": 1167851975,
			"groupIds": [
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632529,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "EBS",
			"rawText": "",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "EBS",
			"lineHeight": 1.2
		},
		{
			"type": "line",
			"version": 1972,
			"versionNonce": 1506001833,
			"isDeleted": true,
			"id": "Djfz4mvPlDYT1FTWLyG6A",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 696.8051023210019,
			"y": -409.5739121024718,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 4.515147036494501,
			"height": 6.809419856658472,
			"seed": 174469351,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
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
					4.515147036494501,
					6.809419856658472
				]
			]
		},
		{
			"type": "line",
			"version": 1865,
			"versionNonce": 1745512295,
			"isDeleted": true,
			"id": "6I5uyfiIQ_dVUzAmGnQOs",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.029928014204294584,
			"x": 700.3081724152937,
			"y": -451.74291306989755,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 4.878221980723982,
			"height": 7.187766181342914,
			"seed": 274562055,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
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
					-4.878221980723982,
					7.187766181342914
				]
			]
		},
		{
			"type": "line",
			"version": 2471,
			"versionNonce": 1103062665,
			"isDeleted": true,
			"id": "hBOwGEzLpDs5KTmxdPWGk",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.765434113477622,
			"x": 704.5271319044134,
			"y": -406.4330384274409,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.027484543816503,
			"height": 5.025822775075784,
			"seed": 1803445031,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-2.6558630674341366,
					5.025822775075784
				],
				[
					-7.027484543816502,
					2.0346398876757292
				]
			]
		},
		{
			"type": "line",
			"version": 2689,
			"versionNonce": 1228333703,
			"isDeleted": true,
			"id": "OKmQ2xZnlteLL15zqCFWo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.48666424209895,
			"x": 657.4350814132292,
			"y": -452.38660466686736,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.480608834450265,
			"height": 4.428740972665685,
			"seed": 2083874375,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-3.0517914343207093,
					4.428740972665685
				],
				[
					-6.4806088344502655,
					0.4183784164032155
				]
			]
		},
		{
			"type": "line",
			"version": 2066,
			"versionNonce": 872656233,
			"isDeleted": true,
			"id": "VxJCLjIRHpyEDiS8nFXy9",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.070517456686609,
			"x": 654.2163061214048,
			"y": -451.05290749168955,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 4.515147036494501,
			"height": 6.809419856658472,
			"seed": 1633617255,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
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
					4.515147036494501,
					6.809419856658472
				]
			]
		},
		{
			"type": "line",
			"version": 1929,
			"versionNonce": 1097267623,
			"isDeleted": true,
			"id": "mqXNn7NEpXKl42xEPmuJh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.06885648930104615,
			"x": 659.2399965508546,
			"y": -409.82256480289936,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e14",
			"width": 4.878221980723982,
			"height": 7.187766181342914,
			"seed": 709345415,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
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
					-4.878221980723982,
					7.187766181342914
				]
			]
		},
		{
			"type": "line",
			"version": 2698,
			"versionNonce": 668735561,
			"isDeleted": true,
			"id": "2nphQNYWOElixw5bLhs8P",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.854199750177644,
			"x": 703.5451721091615,
			"y": -453.1771118159696,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.480608834450265,
			"height": 4.428740972665685,
			"seed": 1219237799,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-3.0517914343207093,
					4.428740972665685
				],
				[
					-6.4806088344502655,
					0.4183784164032155
				]
			]
		},
		{
			"type": "line",
			"version": 2692,
			"versionNonce": 1707551943,
			"isDeleted": true,
			"id": "fBsGV29tffmgluszaO6SW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.663921886409196,
			"x": 657.4629413355012,
			"y": -405.56889911994324,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 6.480608834450265,
			"height": 4.428740972665685,
			"seed": 1119390407,
			"groupIds": [
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-3.0517914343207093,
					4.428740972665685
				],
				[
					-6.4806088344502655,
					0.4183784164032155
				]
			]
		},
		{
			"type": "line",
			"version": 3621,
			"versionNonce": 522463017,
			"isDeleted": true,
			"id": "m0NNnB6RSLArFWnssuwqV",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 665.8735633343019,
			"y": -441.2678501288475,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 23.135415315317864,
			"height": 36.920965026381495,
			"seed": 621386215,
			"groupIds": [
				"ufJM_KsdAQdQ7PTXvDtdI",
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
					25.503446923456124
				],
				[
					0.40532440068439735,
					30.11539925866262
				],
				[
					3.1876357067575456,
					31.80990219489879
				],
				[
					7.354871715271549,
					33.14980858335201
				],
				[
					11.79869252961072,
					33.49583129123406
				],
				[
					15.592667073872917,
					33.15082359908378
				],
				[
					19.15112117952793,
					32.29793104408936
				],
				[
					22.700411705907744,
					29.933635302086913
				],
				[
					22.943034924407762,
					25.503446923456124
				],
				[
					23.135415315317864,
					3.4738605093386736
				],
				[
					22.843298221964968,
					-0.11105662756083756
				],
				[
					19.96759931086617,
					-2.0234583686940315
				],
				[
					16.74018432777816,
					-3.10679842415807
				],
				[
					12.544405636380267,
					-3.4251337351474422
				],
				[
					9.881394068972043,
					-3.4158696025941406
				],
				[
					4.21068157261921,
					-2.726823717701885
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1773,
			"versionNonce": 1911815143,
			"isDeleted": true,
			"id": "_MmYPkahN3k2shuBwCDtv",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 665.7883815631606,
			"y": -444.8157971203847,
			"strokeColor": "#000000",
			"backgroundColor": "#ffffff",
			"width": 23.09445309598474,
			"height": 6.279263528942145,
			"seed": 883672327,
			"groupIds": [
				"ufJM_KsdAQdQ7PTXvDtdI",
				"bhm9M8ERItDIpzzpO_gN6",
				"Ve9Wfwi1f1zQ5SBWmaOzh"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 2708,
			"versionNonce": 1413962249,
			"isDeleted": true,
			"id": "jq1RH_6I74RwnXiwdCU_c",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 284.02513533456863,
			"y": -508.72705634838394,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 635040713,
			"groupIds": [
				"2fUGCb0lZfn0QVZy5jMP0",
				"zfbKEYLl8I8N12cdJSu4R",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1604,
			"versionNonce": 2046420743,
			"isDeleted": true,
			"id": "cs7qfEBuRy_qygyWgS6Gb",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 290.99753105288505,
			"y": -501.34510499318867,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 50.516360928324076,
			"height": 49.63552202386937,
			"seed": 1742377641,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1609,
			"versionNonce": 675361001,
			"isDeleted": true,
			"id": "3Fc33IIxkztr9DcfRPWk0",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 314.9668661884705,
			"y": -493.9525657631407,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.845298617494336,
			"height": 8.845298617494336,
			"seed": 572806537,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1654,
			"versionNonce": 1549102631,
			"isDeleted": true,
			"id": "P-WY9NIPMRXS_dwbW3SPU",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 322.00643970830765,
			"y": -471.6505021764756,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.845298617494336,
			"height": 8.845298617494336,
			"seed": 938654825,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1686,
			"versionNonce": 1352477641,
			"isDeleted": true,
			"id": "_Hbs3wNKgKwi2tf0jtpkF",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 301.0746123875367,
			"y": -479.5609366749818,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.845298617494336,
			"height": 8.845298617494336,
			"seed": 420562761,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1673,
			"versionNonce": 1945309511,
			"isDeleted": true,
			"id": "HxqTqSIeahqBwBLXFEdJF",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 323.483771729984,
			"y": -483.5256936593182,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.6432483149510517,
			"height": 8.849642884497484,
			"seed": 802911785,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.3043284696686896,
					4.260367599188044
				],
				[
					3.6432483149510517,
					8.849642884497484
				]
			]
		},
		{
			"type": "line",
			"version": 1714,
			"versionNonce": 1165413033,
			"isDeleted": true,
			"id": "c-4tdsCE038xpFkEEhg_I",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.497787143782138,
			"x": 314.42172650173575,
			"y": -475.94534267126846,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.6432483149510517,
			"height": 8.849642884497484,
			"seed": 255641865,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.3043284696686896,
					4.260367599188044
				],
				[
					3.6432483149510517,
					8.849642884497484
				]
			]
		},
		{
			"type": "line",
			"version": 1814,
			"versionNonce": 170872935,
			"isDeleted": true,
			"id": "AUqD2FSMqc1fVt6K4fR2D",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.33043282694363,
			"x": 308.85590092367306,
			"y": -486.45648964795737,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.353957949938376,
			"height": 5.8969325295145145,
			"seed": 1622196201,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.488861546490229,
					2.8388829482996942
				],
				[
					2.353957949938376,
					5.8969325295145145
				]
			]
		},
		{
			"type": "line",
			"version": 1826,
			"versionNonce": 1870237065,
			"isDeleted": true,
			"id": "wX9kkTRY2mrBU5ypyalfK",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.2993692646569315,
			"x": 303.3334090426895,
			"y": -467.5613214749742,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.179349187396381,
			"height": 13.509721422901174,
			"seed": 306371273,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.2759012713722266,
					6.503808139536359
				],
				[
					5.179349187396381,
					13.509721422901174
				]
			]
		},
		{
			"type": "line",
			"version": 1961,
			"versionNonce": 148286343,
			"isDeleted": true,
			"id": "Le6JIgr4tCS0eYTCQPjP1",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.938756218467832,
			"x": 293.8424612216206,
			"y": -478.5499476366226,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.353957949938376,
			"height": 5.8969325295145145,
			"seed": 1150196137,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.488861546490229,
					2.8388829482996942
				],
				[
					2.353957949938376,
					5.8969325295145145
				]
			]
		},
		{
			"type": "line",
			"version": 2078,
			"versionNonce": 367064169,
			"isDeleted": true,
			"id": "8aaoDaxyPkEAm-McEOjb3",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 5.829160445235754,
			"x": 332.640109042374,
			"y": -462.9249853240949,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 1.1013160691536525,
			"height": 3.4089815659935994,
			"seed": 2025815177,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.696574527143772,
					1.6411413205645016
				],
				[
					1.1013160691536525,
					3.408981565993599
				]
			]
		},
		{
			"type": "line",
			"version": 2250,
			"versionNonce": 1814405799,
			"isDeleted": true,
			"id": "jKUYOt1P2cH7atY9QZOel",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0.49818137785806815,
			"x": 326.22255293742614,
			"y": -460.22903788138547,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.321055078990408,
			"height": 5.651381975844629,
			"seed": 2123432809,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.4680507162352354,
					2.7206707631898914
				],
				[
					2.321055078990408,
					5.651381975844629
				]
			]
		},
		{
			"type": "line",
			"version": 2263,
			"versionNonce": 209223497,
			"isDeleted": true,
			"id": "2CzDkjMYYV5ac7I1_rTls",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.809117217502431,
			"x": 328.59928357450167,
			"y": -497.68142046222465,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.1241674108432527,
			"height": 7.904636337888744,
			"seed": 575581769,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.3435206760575413,
					3.8054254817784003
				],
				[
					2.1241674108432527,
					7.904636337888744
				]
			]
		},
		{
			"type": "line",
			"version": 2218,
			"versionNonce": 1959310791,
			"isDeleted": true,
			"id": "VtKnb9bDgE6c3Lk5vp8sB",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 6.014839308967369,
			"x": 312.2420195196562,
			"y": -500.3570851633053,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.2144183682653376,
			"height": 5.436913436512896,
			"seed": 450100521,
			"groupIds": [
				"zrdrYyiDxVBXmWZGoBEJZ",
				"EC9KbR9mTiL8F-ecsa6mR",
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.0330965992690806,
					2.6174219849126668
				],
				[
					3.2144183682653376,
					5.436913436512896
				]
			]
		},
		{
			"type": "text",
			"version": 2107,
			"versionNonce": 563850793,
			"isDeleted": true,
			"id": "Hv_5gxdS6-Zia_DN11akB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 264.3757066342348,
			"y": -440.2311677133316,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 103.75990295410156,
			"height": 24,
			"seed": 931950601,
			"groupIds": [
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"fontSize": 20,
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
			"version": 2654,
			"versionNonce": 433874151,
			"isDeleted": true,
			"id": "ZldgbPT0l0qylpQ63WlnJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 384.28033186370453,
			"y": -451.6240628397827,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 129.2652130126953,
			"height": 21.2940157010695,
			"seed": 1316194025,
			"groupIds": [
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"fontSize": 17.745013084224585,
			"fontFamily": 1,
			"text": "Direct Connect",
			"rawText": "Direct Connect",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Direct Connect",
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1876,
			"versionNonce": 1278607625,
			"isDeleted": true,
			"id": "s6CvRF3Zjed8ZBukg6y1Z",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 420.08052210209985,
			"y": -513.6513172172845,
			"strokeColor": "#000000",
			"backgroundColor": "#7950f288",
			"width": 57.743018811052984,
			"height": 57.743018811052984,
			"seed": 1779745225,
			"groupIds": [
				"4MSHxAFl8xP8jq2Uu_V1N",
				"anB6tBgD-9KUhC7mBWBFM",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2711,
			"versionNonce": 988622855,
			"isDeleted": true,
			"id": "wx09hVK2FX3rESOVM0lrT",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 437.93144874164705,
			"y": -480.1347514104086,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 45.47645982418744,
			"height": 27.58411003610599,
			"seed": 931897513,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-8.090270639972786,
					-0.6882323731788852
				],
				[
					-11.533209106942376,
					-4.341205256510569
				],
				[
					-11.533209106942376,
					-8.936170147303994
				],
				[
					-8.598769044224541,
					-13.096168482587897
				],
				[
					-4.567908515066292,
					-14.689303734891933
				],
				[
					-3.3937878067641245,
					-14.922654924253733
				],
				[
					-4.098260231745434,
					-15.389357302977565
				],
				[
					-3.6286119484245094,
					-20.756434658300773
				],
				[
					-0.5758981068389057,
					-24.9567560668146
				],
				[
					4.825057151351148,
					-27.290267960433443
				],
				[
					10.460836551201549,
					-26.82356558170961
				],
				[
					14.922495242749832,
					-24.25670249872897
				],
				[
					17.50556080101461,
					-20.523083468938843
				],
				[
					17.97520908433546,
					-19.35632752212937
				],
				[
					19.3841539342981,
					-20.523083468938843
				],
				[
					22.436867775883744,
					-21.223137037024486
				],
				[
					25.489581617469412,
					-19.823029900853204
				],
				[
					27.133350609092457,
					-17.25616681787257
				],
				[
					26.194054042450723,
					-14.455952545530012
				],
				[
					27.837823034073768,
					-14.922654924253607
				],
				[
					32.06465758396159,
					-13.289196598720654
				],
				[
					33.943250717245064,
					-8.155470432759135
				],
				[
					33.00395415060331,
					-3.2550954561599066
				],
				[
					30.186064450678106,
					-0.22152999445555588
				],
				[
					17.424482528696554,
					0.29384207567254683
				]
			]
		},
		{
			"type": "rectangle",
			"version": 550,
			"versionNonce": 432207849,
			"isDeleted": true,
			"id": "j6ggdb4cRo6tK1eiIRpJr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 439.4335178970184,
			"y": -475.13891531053105,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 16.967804280661124,
			"height": 7.662879352556636,
			"seed": 881042313,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 548,
			"versionNonce": 301438759,
			"isDeleted": true,
			"id": "uCmEO0j8G8Xu5wtWsQbV3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 436.97044953369664,
			"y": -462.0025507061496,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.463068363321776,
			"height": 6.568182302191402,
			"seed": 490228329,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
					-4.652462464052243
				],
				[
					2.463068363321776,
					-6.568182302191402
				]
			]
		},
		{
			"type": "line",
			"version": 570,
			"versionNonce": 1548620489,
			"isDeleted": true,
			"id": "ihydac7oYfn3Adg28C6_2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 459.0012276722971,
			"y": -462.0025507061496,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.463068363321776,
			"height": 6.568182302191402,
			"seed": 443880777,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
					-4.652462464052243
				],
				[
					-2.463068363321776,
					-6.568182302191402
				]
			]
		},
		{
			"type": "ellipse",
			"version": 543,
			"versionNonce": 1701321287,
			"isDeleted": true,
			"id": "VfreO8DrZYJUHz9I35S-Q",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 444.6333288862536,
			"y": -498.1275533682019,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.747159514417477,
			"height": 5.747159514417477,
			"seed": 798327849,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 545,
			"versionNonce": 410177961,
			"isDeleted": true,
			"id": "6tSGH2XwiWxk-uJOrntGk",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 439.29668076572284,
			"y": -491.42253393471447,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.747159514417477,
			"height": 5.747159514417477,
			"seed": 1753552649,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 545,
			"versionNonce": 2048604519,
			"isDeleted": true,
			"id": "wtffF9F-lJ58fL7OJ-wAS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 450.51732553196666,
			"y": -491.42253393471447,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.747159514417477,
			"height": 5.747159514417477,
			"seed": 1203719657,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 551,
			"versionNonce": 861713545,
			"isDeleted": true,
			"id": "L4TapfkBWrRjiIRafqrHm",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 447.6437457747577,
			"y": -477.87565793644444,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 14.504735917339348,
			"seed": 1951377609,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
					-14.504735917339348
				]
			]
		},
		{
			"type": "line",
			"version": 551,
			"versionNonce": 1163752583,
			"isDeleted": true,
			"id": "0XJbWzUVJo97-viW3lZcf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 442.1702605229318,
			"y": -485.53853728900185,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 7.662879352556636,
			"seed": 668051369,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
					7.662879352556636
				]
			]
		},
		{
			"type": "line",
			"version": 556,
			"versionNonce": 1623669609,
			"isDeleted": true,
			"id": "cE1ynhu9Id-B7VM_O-JNg",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 453.3909052891752,
			"y": -485.53853728900185,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 7.662879352556636,
			"seed": 1550895753,
			"groupIds": [
				"Mh7sFotTJv-Sbb0f37X-V",
				"HyQQh2OJjNja6c3xmOgkS",
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328632530,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
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
					7.662879352556636
				]
			]
		},
		{
			"type": "text",
			"version": 2106,
			"versionNonce": 363810983,
			"isDeleted": true,
			"id": "Z7SSlTJP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 264.3757066342348,
			"y": -440.2311677133316,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 103.75990295410156,
			"height": 24,
			"seed": 931950601,
			"groupIds": [
				"-ZDmi7J_FIPIwZvpmpTXV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328631863,
			"link": null,
			"locked": false,
			"fontSize": 20,
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
			"version": 2653,
			"versionNonce": 1546170697,
			"isDeleted": true,
			"id": "mT37If0D",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 384.28033186370453,
			"y": -451.6240628397827,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 129.2652130126953,
			"height": 21.2940157010695,
			"seed": 1316194025,
			"groupIds": [
				"ew-6YQJJl5wnsQ3hOx_BI"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713328631863,
			"link": null,
			"locked": false,
			"fontSize": 17.745013084224585,
			"fontFamily": 1,
			"text": "Direct Connect",
			"rawText": "Direct Connect",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Direct Connect",
			"lineHeight": 1.2
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "transparent",
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
		"scrollX": 701.0596896268983,
		"scrollY": 1252.1887773231638,
		"zoom": {
			"value": 0.9
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