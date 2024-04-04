---
excalidraw-plugin: parsed
tags: null
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: null
Started: null
EditDate: null
Relates: null
Peer Reviewed: 0
dg-publish: null
---

total sums is calculate using array length the reason this works is because were dealing with a fixed range of numbers 




==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==



# Code Section

`[1,2,3,5]` 

```javascript
var missingNumber = function(nums) {
    const n = nums.length +1;

    let totalSum = (n * (n + 1)) / 2;


    let arraySum = nums.reduce((acc, curr) => acc + curr, 0);


    return totalSum - arraySum; 
};
```



# Text Elements
# Element Links
dYATnB4R: [[Algorithms & Data Structures/LeetCode Snippets/Untitled.md#Code Section]]

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
			"version": 310,
			"versionNonce": 1947432752,
			"isDeleted": false,
			"id": "dYATnB4R",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -635.0912187022053,
			"y": -661.3146432787285,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 918.0435186416065,
			"height": 500,
			"seed": 10784,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712260768427,
			"link": "[[Algorithms & Data Structures/LeetCode Snippets/Untitled.md#Code Section]]",
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
		"scrollX": 855.1095952220855,
		"scrollY": 776.0644703470165,
		"zoom": {
			"value": 1.1527855358722412
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