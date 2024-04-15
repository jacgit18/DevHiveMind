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

Copy estimation part into its own file 

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
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate also consider ratios.

Active Userbase of 200,000,000

#### Storage
You should be concerned with writes here only because we need to know how much data we need to store.

##### Writes per Day
> POST, PUT, DELETE
- Post Comment
- Post Like
- Not in scope for storage estimation
	- Post unlike
	- Update Comment 
	- Delete Comment

Monthly total storage size needed  = average size of comments + average size of likes = 10KB  

Average user Post about 20 comments and 10 likes = 30 Post 

Write per Month = Active Userbase of 200,000,000M * 30 avg user post = 6,000,000,000B 

Write per day = Write per Month/ 30 = 200,000,000M 

write per sec = 200M/ 4000 * 20(secs in day est) = 200M/ 80K = 200M /100k = 2,000 writes a sec


Daily storage for writes = Monthly total storage size needed * Write per day 
10KB * 200M = 10(10^3) * 200(10^6) = 200,000,000M = 2TB

Retention Period = 5 years  
  
5 Year Storage =  5 * 400(Rounded year day) * 2TB(new data per day) = 2K(10^3) * 2,000,000,000 GB(10^9) = 20(10^12) = 4PB
  
Data replication which is typically done 3 to 5 times  

Data replication = 4PB * 3 = 12TB

Yearly storage:(12TB* 400 days) = 4800 TB = 4.8 PB 

#### Network Traffic
Read:write heavy *50*:1 ratio

##### Reads per day
> GET

Get Video views

quick math
3,600 in a day using 4,000 easier math then round up to 100K easier math


read per day = *50* * 1M write per day = 50M
read per sec = *50* * 10 write per sec = 500





#### Memory Cache
Consider metadata

caching is a way to serve read request faster use 80-20 rule for caching
##### Data Point 1 service
Caching Memory = read per day * arbitrary storage action size * 20%

Caching Memory = 50M  * 10KB  * 0.2 = 50M(^6) * 2KB(^3) = 100GB might be less since you have duplicate request being made to do the same thing 

##### Data Point 2 service

#### Bandwidth
InComing Data per sec(Write) = 10(write per sec) * 10KB(arbitrary storage action size) = 100KB per sec

OutGoing Data per sec(Read) = 500(read per sec) * 10KB(arbitrary storage action size) = 5MB per sec

500 * 10^3 = 500 * 1000 = 500,000 = 5MB


### App Server Estimations
Might be asked how many app service do you need

500(read per sec)/ number of request per second a single server can handle

You should consider if the request is CPU bound, memory bound or I/O bound

this relates to [[Request Resource Bound]]

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
cqasGqqJ: [[Capacity Est temp#Table 1]]
S5QN8lcM: [[Capacity Est temp#Table 2]]

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