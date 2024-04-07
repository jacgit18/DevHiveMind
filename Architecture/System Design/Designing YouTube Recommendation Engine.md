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
## Requirements




## Userbase

10,000 user

small storage foreach user easier to calulate

1 gb per user

## Data points
views, likes, dislikes(not available), comments

data stats user daily to monthly


user stories 

### Database Schema 
**Endpoint**
READ
- GET

WRITE
- POST 
- PATCH/PUT
- DELETE

**Request:** 

| DB    | Request | Description                                | Path                    |
| ----- | ------- | ------------------------------------------ | ----------------------- |
| READ  | GET     | *Returns nearby business at user location* | **/v1/search/nearby**   |
| READ  | GET     |                                            | **/v1/search/specific** |
| READ  | GET     |                                            | **/v2/search/specific** |
| WRITE | POST    |                                            | ..                      |
| WRITE | DELETE  |                                            | ..                      |
| WRITE | PATCH   |                                            | ..                      |
|       |         |                                            |                         |
Other endpoints which flow from some microservices..

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| ..        | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |

**Response:** 
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
qT0FzZ8g: [[Architecture/System Design/Designing YouTube Recommendation Engine.md#Data points]]

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
			"version": 81,
			"versionNonce": 572417424,
			"isDeleted": false,
			"id": "qT0FzZ8g",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -356.625,
			"y": -457.3515625,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 697,
			"height": 637,
			"seed": 50110,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712441014338,
			"link": "[[Architecture/System Design/Designing YouTube Recommendation Engine.md#Data points]]",
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
		"scrollX": 352.125,
		"scrollY": 740.6484375,
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