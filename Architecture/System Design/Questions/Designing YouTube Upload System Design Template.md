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
| ..        | ..                                         | VarChar |
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


#### Data points of focus identified
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate.

Define services/ endpoints think about storage then estimate request 

### Capacity Estimation
Consider Ratios
#### Network Traffic
##### Data Point 1 service

###### write per day
POST, PUT, DELETE
PlaceHolder = Upload Video
month, day, seconds

###### read per day
GET
PlaceHolder = Watch Video
month, day, seconds

quick math
Read:write heavy *50*:1 ratio

3,600 in a day using 4,000 easier math then round up to 100K easier math

write per day = **1M**
write per sec = 1M/ 4000 * 20 = 1M/ 80K = 1M /100k = 10 writes a sec


read per day = *50* * 1M write per day = 50M
read per sec = *50* * 10 write per sec = 500
##### Data Point 2 service

#### Storage
##### Data Point 1 service
arbitrary storage action size = 10KB  

new data per day = arbitrary storage action size * write per day 
10KB * 1M = 10(10^3) * 1(10^6) = 10^9 = 10 GB


Retention Period = 5 years  
  
5 Year Storage =  5 * 400(Rounded year day) * 10 GB(new data per day) = 2K(10^3) * 10 GB(10^9) = 20(10^12) = 20TB  
  
Data replication which is typically done 3 to 5 times  

Data replication = 20TB * 3 = 60TB
  


##### Data Point 2 service


#### Memory Cache
Consider metadata

caching is a way to serve read request faster use 80-20 rule for caching
##### Data Point 1 service

##### Data Point 2 service

#### Bandwidth
InComing Data per sec(Write) = 10(write per sec) * 10KB(arbitrary storage action size) = 100KB per sec

OutGoing Data per sec(Read) = 500(read per sec) * 10KB(arbitrary storage action size) = 5MB per sec

500 * 10^3 = 500 * 1000 = 500,000 = 5MB

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
yApo8vnP: [[Designing YouTube Upload System Design Template#Userbase]]
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
			"version": 250,
			"versionNonce": 73984650,
			"isDeleted": false,
			"id": "yApo8vnP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -360.875,
			"y": -555.328125,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 370.00000000000006,
			"height": 146.03915156373264,
			"seed": 38646,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713057385366,
			"link": "[[Architecture/System Design/Questions/System Design Template#Userbase]]",
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
			"version": 489,
			"versionNonce": 1298206166,
			"isDeleted": false,
			"id": "cqasGqqJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -39.89289798502517,
			"y": -361.3805362348282,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 540.9040281581279,
			"height": 393.52594859215577,
			"seed": 94149,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713057427309,
			"link": "[[Architecture/System Design/Questions/System Design Template#Table 1]]",
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
			"version": 304,
			"versionNonce": 417429066,
			"isDeleted": false,
			"id": "S5QN8lcM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -394.1686282912867,
			"y": -283.7267955767591,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 220.20017659919824,
			"height": 135.01712495286347,
			"seed": 40223,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1713057424873,
			"link": "[[Architecture/System Design/Questions/System Design Template#Table 2]]",
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
			"id": "Tji8AxHImGs8RXEvcQtG7",
			"type": "arrow",
			"x": -256.5396712885005,
			"y": -245.8247013833764,
			"width": 212.14285714285717,
			"height": 30.000000000000057,
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
			"seed": 1360903114,
			"version": 312,
			"versionNonce": 159116234,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1713057427309,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					212.14285714285717,
					30.000000000000057
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": {
				"elementId": "cqasGqqJ",
				"focus": 0.05244266244886404,
				"gap": 4.503916160618132
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "pbzOZE1cMFtwNIU1FHYcS",
			"type": "arrow",
			"x": -4.396814145643361,
			"y": -75.11041566909068,
			"width": 167.1428571428571,
			"height": 137.14285714285717,
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
			"seed": 338485450,
			"version": 255,
			"versionNonce": 251633174,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1713057424872,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-167.1428571428571,
					-137.14285714285717
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": {
				"elementId": "S5QN8lcM",
				"focus": -0.5598228991149633,
				"gap": 2.428780403588007
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
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
		"scrollX": 436.18252843135764,
		"scrollY": 576.7845228119478,
		"zoom": {
			"value": 1.4000000000000001
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