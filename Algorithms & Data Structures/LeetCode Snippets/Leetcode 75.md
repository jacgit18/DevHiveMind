---
excalidraw-plugin: parsed
tags:
  - excalidraw
  - codeSnippet
  - twoPointer
  - pattern
author:
  - jacgit18
  - chatgpt
Purpose: This is a coded snippet
Status: Done
Started: 2024-03-03T00:00:00.000Z
EditDate: 2024-03-03T00:00:00.000Z
Relates: 
dg-publish: false
---
Ask yourself how many swap checks 
makes sense
## Explained
Alright, imagine you have a bunch of colorful balls, and you want to arrange them in a certain order. You have red balls (represented by 0), blue balls (represented by 1), and green balls (represented by 2).

Now, we want to organize these balls in such a way that all the red balls are on the left side, followed by the blue balls, and then the green balls on the right side.

So, we have three baskets: one for red balls (left), one for blue balls (middle), and one for green balls (right). Our goal is to sort these balls by moving them into the correct baskets.

Here's how we do it step by step:

1. **Create Pointers:** We have two special friends, one standing on the left side and the other on the right side. They are helping us organize the balls. Let's call them Lefty and Righty.

2. **Start Sorting:** Now, we go through each ball one by one (represented by the `i` variable).

3. **If it's a Red Ball (0):** If the ball is red, we quickly swap it with the ball that Lefty is pointing to. Lefty then takes a step to the right, and we also move our finger (i) to the next ball.

4. **If it's a Green Ball (2):** If the ball is green, we do a similar swap with the ball that Righty is pointing to. But, we don't move our finger (i) immediately because the ball we swapped might be red or blue. We leave it for the next round to check.

5. **If it's a Blue Ball (1):** If the ball is blue, we just move our finger to the next ball without any swapping. No need to involve Lefty or Righty for blue balls.

6. **Keep Going:** We repeat these steps until our finger (i) reaches the same spot as Righty. That means we've checked and organized all the balls.

By doing this, we cleverly use Lefty and Righty to put the red balls on the left, green balls on the right, and blue balls in the middle, just like magic! And that's how we sort these colorful balls using a cool trick in our code.

==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
```
function sortArray(nums) {
    let left = 0;
    let right = nums.length - 1;
    let index = 0;

    while (left < right) {
        // Swap if left is greater than or equal to right
        if (nums[left] >= nums[right]) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--;

        } else if (nums[right] > nums[left]) { // This condition seems redundant due to the while loop's logic
            left++;
        }

        // Additional swaps based on the index value
        if (nums[index] > nums[left]) {
            [nums[index], nums[left]] = [nums[left], nums[index]];
        }

        if (nums[index] > nums[right]) {
            [nums[right], nums[index]] = [nums[index], nums[right]];
        }

        index++;
    }
}
```

 ^Q3C46MmA

Attempt ^5VD1f55W

```javascript
function sortColors(nums) {
    let left = 0; // Pointer for 0s
    let right = nums.length - 1; // Pointer for 2s
    let i = 0; // Current element pointer

    while (i <= right) {
        if (nums[i] === 0) {
            // If current element is 0, swap it with the element at the left pointer
            [nums[i], nums[left]] = [nums[left], nums[i]];
            left++; // Move left pointer to the right
            i++; // Move current pointer to the right
        } else if (nums[i] === 2) {
            // If current element is 2, swap it with the element at the right pointer
            [nums[i], nums[right]] = [nums[right], nums[i]];
            right--; // Move right pointer to the left
            // Note: We don't increment i here because the swapped element at index i might be 0 or 1 and needs to be evaluated
        } else {
            // If current element is 1, simply move to the next element
            i++;
        }
    }
}
``` ^I4eyAGwx

Alt Logic ^00FajLwb

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.1.1",
	"elements": [
		{
			"type": "text",
			"version": 749,
			"versionNonce": 932248368,
			"isDeleted": false,
			"id": "Q3C46MmA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -796.4329822640618,
			"y": -459.95640716607335,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 565.0701293945312,
			"height": 406.00000000000017,
			"seed": 1068184016,
			"groupIds": [
				"cMeU9wQm2YamEfq11aF9h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712259235272,
			"link": null,
			"locked": false,
			"fontSize": 10.477419354838714,
			"fontFamily": 1,
			"text": "```\nfunction sortArray(nums) {\n    let left = 0;\n    let right = nums.length - 1;\n    let index = 0;\n\n    while (left < right) {\n        // Swap if left is greater than or equal to right\n        if (nums[left] >= nums[right]) {\n            [nums[left], nums[right]] = [nums[right], nums[left]];\n            right--;\n\n        } else if (nums[right] > nums[left]) { // This condition seems redundant due to the while loop's logic\n            left++;\n        }\n\n        // Additional swaps based on the index value\n        if (nums[index] > nums[left]) {\n            [nums[index], nums[left]] = [nums[left], nums[index]];\n        }\n\n        if (nums[index] > nums[right]) {\n            [nums[right], nums[index]] = [nums[index], nums[right]];\n        }\n\n        index++;\n    }\n}\n```\n\n",
			"rawText": "```\nfunction sortArray(nums) {\n    let left = 0;\n    let right = nums.length - 1;\n    let index = 0;\n\n    while (left < right) {\n        // Swap if left is greater than or equal to right\n        if (nums[left] >= nums[right]) {\n            [nums[left], nums[right]] = [nums[right], nums[left]];\n            right--;\n\n        } else if (nums[right] > nums[left]) { // This condition seems redundant due to the while loop's logic\n            left++;\n        }\n\n        // Additional swaps based on the index value\n        if (nums[index] > nums[left]) {\n            [nums[index], nums[left]] = [nums[left], nums[index]];\n        }\n\n        if (nums[index] > nums[right]) {\n            [nums[right], nums[index]] = [nums[index], nums[right]];\n        }\n\n        index++;\n    }\n}\n```\n\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "```\nfunction sortArray(nums) {\n    let left = 0;\n    let right = nums.length - 1;\n    let index = 0;\n\n    while (left < right) {\n        // Swap if left is greater than or equal to right\n        if (nums[left] >= nums[right]) {\n            [nums[left], nums[right]] = [nums[right], nums[left]];\n            right--;\n\n        } else if (nums[right] > nums[left]) { // This condition seems redundant due to the while loop's logic\n            left++;\n        }\n\n        // Additional swaps based on the index value\n        if (nums[index] > nums[left]) {\n            [nums[index], nums[left]] = [nums[left], nums[index]];\n        }\n\n        if (nums[index] > nums[right]) {\n            [nums[right], nums[index]] = [nums[index], nums[right]];\n        }\n\n        index++;\n    }\n}\n```\n\n",
			"lineHeight": 1.25
		},
		{
			"type": "text",
			"version": 220,
			"versionNonce": 1009390896,
			"isDeleted": false,
			"id": "5VD1f55W",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -580.3964543769151,
			"y": -504.1321884160733,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.47991943359375,
			"height": 25,
			"seed": 691346384,
			"groupIds": [
				"cMeU9wQm2YamEfq11aF9h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712259235272,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Attempt",
			"rawText": "Attempt",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Attempt",
			"lineHeight": 1.25
		},
		{
			"type": "text",
			"version": 379,
			"versionNonce": 357562832,
			"isDeleted": false,
			"id": "I4eyAGwx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -76.35543523400361,
			"y": -545.6310775591309,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1300.978759765625,
			"height": 600,
			"seed": 329121072,
			"groupIds": [
				"tJrhXg1ePmFMk5o2-cmlV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1712259311832,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "```javascript\nfunction sortColors(nums) {\n    let left = 0; // Pointer for 0s\n    let right = nums.length - 1; // Pointer for 2s\n    let i = 0; // Current element pointer\n\n    while (i <= right) {\n        if (nums[i] === 0) {\n            // If current element is 0, swap it with the element at the left pointer\n            [nums[i], nums[left]] = [nums[left], nums[i]];\n            left++; // Move left pointer to the right\n            i++; // Move current pointer to the right\n        } else if (nums[i] === 2) {\n            // If current element is 2, swap it with the element at the right pointer\n            [nums[i], nums[right]] = [nums[right], nums[i]];\n            right--; // Move right pointer to the left\n            // Note: We don't increment i here because the swapped element at index i might be 0 or 1 and needs to be evaluated\n        } else {\n            // If current element is 1, simply move to the next element\n            i++;\n        }\n    }\n}\n```",
			"rawText": "```javascript\nfunction sortColors(nums) {\n    let left = 0; // Pointer for 0s\n    let right = nums.length - 1; // Pointer for 2s\n    let i = 0; // Current element pointer\n\n    while (i <= right) {\n        if (nums[i] === 0) {\n            // If current element is 0, swap it with the element at the left pointer\n            [nums[i], nums[left]] = [nums[left], nums[i]];\n            left++; // Move left pointer to the right\n            i++; // Move current pointer to the right\n        } else if (nums[i] === 2) {\n            // If current element is 2, swap it with the element at the right pointer\n            [nums[i], nums[right]] = [nums[right], nums[i]];\n            right--; // Move right pointer to the left\n            // Note: We don't increment i here because the swapped element at index i might be 0 or 1 and needs to be evaluated\n        } else {\n            // If current element is 1, simply move to the next element\n            i++;\n        }\n    }\n}\n```",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "```javascript\nfunction sortColors(nums) {\n    let left = 0; // Pointer for 0s\n    let right = nums.length - 1; // Pointer for 2s\n    let i = 0; // Current element pointer\n\n    while (i <= right) {\n        if (nums[i] === 0) {\n            // If current element is 0, swap it with the element at the left pointer\n            [nums[i], nums[left]] = [nums[left], nums[i]];\n            left++; // Move left pointer to the right\n            i++; // Move current pointer to the right\n        } else if (nums[i] === 2) {\n            // If current element is 2, swap it with the element at the right pointer\n            [nums[i], nums[right]] = [nums[right], nums[i]];\n            right--; // Move right pointer to the left\n            // Note: We don't increment i here because the swapped element at index i might be 0 or 1 and needs to be evaluated\n        } else {\n            // If current element is 1, simply move to the next element\n            i++;\n        }\n    }\n}\n```",
			"lineHeight": 1.25
		},
		{
			"id": "00FajLwb",
			"type": "text",
			"x": 252.94132497993337,
			"y": -614.6532676029867,
			"width": 87.17991638183594,
			"height": 25,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [
				"tJrhXg1ePmFMk5o2-cmlV"
			],
			"frameId": null,
			"roundness": null,
			"seed": 2035558704,
			"version": 126,
			"versionNonce": 315637712,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1712259311833,
			"link": null,
			"locked": false,
			"text": "Alt Logic",
			"rawText": "Alt Logic",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Alt Logic",
			"lineHeight": 1.25
		},
		{
			"id": "GATL3kWY",
			"type": "text",
			"x": 160.63363267224133,
			"y": -586.960959910679,
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
			"seed": 1062617392,
			"version": 2,
			"versionNonce": 1398271952,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1712259294709,
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
		"scrollX": 909.3663673277587,
		"scrollY": 953.5715368337559,
		"zoom": {
			"value": 0.65
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