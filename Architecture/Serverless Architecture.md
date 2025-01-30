---
excalidraw-plugin: parsed
tags:
  - excalidraw
  - serverLess
  - cloud
  - CapitalOne
author:
  - jacgit18
  - chatgpt
Purpose: This documentation discusses serverless architecture.
Status: Refinement
Started: 
EditDate: 2024-02-07
Relates: "[[AWS Lambda]]"
Peer Reviewed: 0
dg-publish:
---

![[Serverless.gif]]
In serverless architecture, you typically use functions as a service ([[Cloud Service Model#FAAS|FAAS]]). Here's a simple example using AWS Lambda and JavaScript:  
  
```javascript  
// index.js  
  
exports.handler = async (event) => {  
// Your serverless function logic here  
const response = {  
statusCode: 200,  
body: JSON.stringify('Hello from Lambda!'),  
};  
  
return response;  
};  
```  
  
In this example, the `handler` function is the entry point for your serverless function. It receives an event, processes it, and returns a response. This code can be deployed to AWS Lambda, and the function will be executed in response to events, such as HTTP requests, file uploads, etc.  
  
Note: This is a basic example, and real-world serverless applications might involve more complex setups, multiple functions, and interaction with other AWS services or external APIs.

## Use Cases 
Serverless architecture, also known as Function as a Service (FaaS), offers various use cases across different domains:  
  
1. **Web Applications**: Serverless architectures are ideal for building web applications, especially those with dynamic workloads and varying traffic patterns. Functions can be triggered by HTTP requests, allowing for efficient scaling and cost optimization.  
  
2. **Data Processing and ETL**: Serverless platforms can be used for processing large datasets and performing Extract, Transform, Load (ETL) operations. Functions can process data from sources like S3, DynamoDB, or Kinesis, perform transformations, and store results in databases or data warehouses.  
  
3. **Real-time Data Processing**: For applications requiring real-time data processing, serverless functions can be triggered by events from streaming platforms like Kafka or Kinesis. This enables applications to react to data in near real-time, making it suitable for IoT applications, real-time analytics, and more.  
  
4. **Backend APIs and Microservices**: Serverless architectures can power backend APIs and microservices, allowing developers to focus on writing business logic without managing infrastructure. Functions can handle specific tasks or endpoints within an application, providing scalability and reducing operational overhead.  
  
5. **Scheduled Tasks and Cron Jobs**: Serverless platforms support scheduled execution, making them suitable for running periodic tasks, batch jobs, or cron jobs. This includes tasks such as data backups, report generation, and periodic data cleanup.  
  
6. **Chatbots and Voice Assistants**: Serverless architectures are well-suited for building chatbots and voice assistants, where functions can handle incoming messages or voice commands, process them, and generate appropriate responses.  
  
7. **Image and Video Processing**: Functions can be used to trigger image or video processing tasks in response to file uploads or events. This can include tasks like thumbnail generation, image recognition, or video transcoding.  
  
8. **IoT and Edge Computing**: Serverless platforms can extend to the edge, enabling lightweight functions to run on IoT devices or edge locations. This allows for local processing of sensor data, device management, and edge analytics.  
  
9. **Content Management and Delivery**: Serverless architectures can be used to build content management systems (CMS) and content delivery networks (CDNs). Functions can serve dynamic content, handle user authentication, and cache content for faster delivery.  
  
10. **DevOps Automation**: Serverless platforms can automate various DevOps tasks such as continuous integration, deployment, monitoring, and alerting. Functions can respond to events from source control systems, CI/CD pipelines, or monitoring tools, enabling automated workflows and improving developer productivity.

==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
[[API Gateway]] ^xvYqFZyd

DynamoDB ^fVII0mcA

this service doesn't 
need to be a lambda ^333ijImU

Polling ^3DQk4vc0

Polling is automatic ^KAVeR8eH

Sending message  ^7O6uVUUV

Message is json blob of data ^KIUlhQEP

subscriber applies 
to SNS of a topic ^s9VDLfjq

topic are a event 
type use 1 to man
sending things to 
multiple subscriber  ^Ej93YLsE

Best Practice ^gIBNKm8C

can be service
instead of lambda  ^V4HF2bBT

can swap out SNS for EventBridge 
or add to arch the benefit being service
integration like shopify ^CJrPUXRI

eventBridge has limits 
for rules being 5 targets, 
target being subscriber ^zUxgEtlb

use messageBus same as topics
and events from other service
 ^WWORJFfk

Event driven Architecture  ^FVrB4ayH

Alternatively you can use Step Functions 
which is more of a workflow utilizing 
different aws services ^Yq0S3src

S3 Bucket ^NvYtrXeT

SQS ^5qSf5670

Lambda ^qpWDr8EH

Order Service  ^4LqlXCLp

User ^rCoIT7m8

User ^LO9s5K1B

Data governance ^8KBL4tDg

SQS ^cmyzSHtF

SQS ^5ZpulkDT

API Gateway ^9j4reCCm

Polling ^vq11xmsW

Sending message  ^ZVOcNv1d

SNS OrderTopic ^wvHEeZgx

SQS ^YO8vFNLw

EventBridge ^VmuTFAEX

Lambda ^EVUVJXgv

Lambda ^KJM57Puj

Lambda ^vDZSNT85

Order Service  ^sBZcQaSd

User ^MWGG2YDM

User ^LavnfBlV

SQS ^Q3rVOsby

SQS ^WVfOQazT

%%
## Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.8.0",
	"elements": [
		{
			"type": "rectangle",
			"version": 3031,
			"versionNonce": 1739112339,
			"index": "a0",
			"isDeleted": false,
			"id": "yjKm94GTjAE8_eGZp2BVR",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -482.4639887801154,
			"y": -997.0473594193822,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 133.56536184952898,
			"height": 133.56536184952898,
			"seed": 159191859,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "iZLHxKSNrysnzIJDnvI5w",
					"type": "arrow"
				},
				{
					"id": "cTt6-LlHjwO_F3FuVZUZ9",
					"type": "arrow"
				},
				{
					"id": "F84MW_4DTspgqFfyCABmF",
					"type": "arrow"
				}
			],
			"updated": 1738273633303,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3500,
			"versionNonce": 1325325843,
			"index": "a1",
			"isDeleted": false,
			"id": "589F-b9Z0U0gt20gbWwOX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -431.0311014644408,
			"y": -955.5314755731465,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 31.337817346718374,
			"height": 0,
			"seed": 1232745683,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					31.337817346718374,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3551,
			"versionNonce": 1447011251,
			"index": "a2",
			"isDeleted": false,
			"id": "EVF8FJ7x90rolajxhkVpd",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -434.0718411415287,
			"y": -904.341546390669,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.404512588591444,
			"height": 0,
			"seed": 2091000435,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					35.404512588591444,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3397,
			"versionNonce": 1888925011,
			"index": "a3",
			"isDeleted": false,
			"id": "tR-KgFNhYMVM0pXPsF-Js",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -468.7795616184949,
			"y": -964.1475104364422,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.02689030085028,
			"height": 100.01425679522707,
			"seed": 196828179,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					35.02689030085028,
					-15.288582629751218
				],
				[
					34.85439752150217,
					84.72567416547585
				],
				[
					0.16642815226471644,
					69.10516614460754
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3345,
			"versionNonce": 2103087859,
			"index": "a4",
			"isDeleted": false,
			"id": "_L_aJypVcyMcdOZjf_0C0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -397.587588781254,
			"y": -979.8183836108988,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 35.07177949319017,
			"height": 99.73817251894812,
			"seed": 45900211,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					0.40702819964913534,
					99.73817251894812
				],
				[
					35.04037485542631,
					84.6062297607288
				],
				[
					35.07177949319017,
					15.510317990632277
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3070,
			"versionNonce": 756137107,
			"index": "a5",
			"isDeleted": false,
			"id": "JlSAsHTXN2N5nctcE3squ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -425.1029524477176,
			"y": -917.5621254097273,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 18.80171294894803,
			"height": 25.211722598265744,
			"seed": 717992787,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					18.80171294894803,
					-25.211722598265744
				]
			]
		},
		{
			"type": "line",
			"version": 3189,
			"versionNonce": 1534243379,
			"index": "a6",
			"isDeleted": false,
			"id": "ZkrRGb--qyzF9LKo84ZLp",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -408.9715920019121,
			"y": -937.9496698914768,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.363776880330352,
			"height": 17.38191940617219,
			"seed": 1681903859,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					10.341161160371373,
					9.029209829445925
				],
				[
					-0.02261571995897925,
					17.38191940617219
				]
			]
		},
		{
			"type": "line",
			"version": 3328,
			"versionNonce": 694416339,
			"index": "a7",
			"isDeleted": false,
			"id": "em6TrE7rpfcJtF3E61IGj",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -433.3608526003695,
			"y": -939.0722282576485,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.363776880330352,
			"height": 17.38191940617219,
			"seed": 1084177043,
			"groupIds": [
				"6BZFrKpqnjFg5-o7VHU13",
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					10.341161160371373,
					9.029209829445925
				],
				[
					-0.02261571995897925,
					17.38191940617219
				]
			]
		},
		{
			"type": "text",
			"version": 3314,
			"versionNonce": 1459356019,
			"index": "a8",
			"isDeleted": false,
			"id": "xvYqFZyd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -604.6766627910451,
			"y": -848.6890692417419,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 342.34861801274764,
			"height": 40.60941023569677,
			"seed": 1554018355,
			"groupIds": [
				"uLTNfZYQrYh8uwHZteyGV"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
			"link": "[[API Gateway]]",
			"locked": false,
			"fontSize": 33.84117519641398,
			"fontFamily": 1,
			"text": "📍[[API Gateway]]",
			"rawText": "[[API Gateway]]",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "📍[[API Gateway]]",
			"autoResize": false,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1169,
			"versionNonce": 1568758547,
			"index": "a9",
			"isDeleted": false,
			"id": "TZx0cxH_R12Uu88LRh4Kh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 198.63504489872093,
			"y": -1536.2940740640147,
			"strokeColor": "#000000",
			"backgroundColor": "#4c6ef588",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 2049569235,
			"groupIds": [
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1553,
			"versionNonce": 1231716531,
			"index": "aA",
			"isDeleted": false,
			"id": "077DpXASnt3sLcGOEbTLT",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 234.7658455944454,
			"y": -1521.0138435794147,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 20.392952417507118,
			"height": 29.65931807154984,
			"seed": 1515339635,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					11.291882204028958,
					-0.07856785942293742
				],
				[
					8.91970940464355,
					11.182561477242349
				],
				[
					17.039082032329567,
					11.130202448537357
				],
				[
					0.9527134724776793,
					29.580750212126905
				],
				[
					4.502309685563436,
					12.790104832796008
				],
				[
					-3.353870385177551,
					12.908650442579543
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1765,
			"versionNonce": 1415443027,
			"index": "aB",
			"isDeleted": false,
			"id": "dWtmQi7yvfsGeUX3y0rWE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 240.9819215997311,
			"y": -1524.0445547821068,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 30.123651477831686,
			"height": 13.842650301774263,
			"seed": 1465899283,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					-4.706395360126805,
					-1.3164465047551381
				],
				[
					-11.237008979432716,
					-2.066002450681422
				],
				[
					-19.324990082266396,
					-1.4467577492084818
				],
				[
					-25.923467692013077,
					0.3847528663096522
				],
				[
					-28.40503392681569,
					1.8896205379134692
				],
				[
					-29.745848783885236,
					3.420941343280705
				],
				[
					-30.123651477831686,
					5.575606255223854
				],
				[
					-28.89561125720354,
					7.5004357480503625
				],
				[
					-26.039121577915154,
					9.517157388399708
				],
				[
					-22.04454604455418,
					10.809559587419757
				],
				[
					-17.86000456778072,
					11.489308381133629
				],
				[
					-13.14475773347138,
					11.776647851092841
				],
				[
					-9.363117618212527,
					11.53773901686747
				]
			]
		},
		{
			"type": "line",
			"version": 1285,
			"versionNonce": 1060253683,
			"index": "aC",
			"isDeleted": false,
			"id": "P-avYhT8JuBzTTFArknse",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 211.02909784935514,
			"y": -1519.4235871073583,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.15180014033282502,
			"height": 31.450030078474583,
			"seed": 1053376179,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					-0.15180014033282502,
					31.450030078474583
				]
			]
		},
		{
			"type": "line",
			"version": 1554,
			"versionNonce": 1810741651,
			"index": "aD",
			"isDeleted": false,
			"id": "Qv7WLiNnJhnlU-w0M829M",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 210.70543051653294,
			"y": -1488.318806092741,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 36.3309166493582,
			"height": 6.921251859973494,
			"seed": 1798631507,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					0.42529905498881576,
					1.5338517849183
				],
				[
					1.937322872056971,
					3.0997854457676337
				],
				[
					4.652847763273935,
					4.708110571066803
				],
				[
					8.527961889287702,
					5.965274498808358
				],
				[
					12.595050419642421,
					6.712147997295383
				],
				[
					17.598401207972476,
					6.921251859973494
				],
				[
					23.078079808537186,
					6.744845516901
				],
				[
					27.783651622835993,
					5.939134072943138
				],
				[
					32.155519985884006,
					4.4139794764435445
				],
				[
					35.03681476488695,
					2.6029316840139223
				],
				[
					36.3309166493582,
					0.19908743781386912
				]
			]
		},
		{
			"type": "line",
			"version": 1217,
			"versionNonce": 935792435,
			"index": "aE",
			"isDeleted": false,
			"id": "C4T-bknylJXneDECB-7-q",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 247.07181019597397,
			"y": -1488.0176292982865,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0.08017048740121642,
			"height": 14.597878964416353,
			"seed": 511274483,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					-0.08017048740121642,
					-14.597878964416353
				]
			]
		},
		{
			"type": "line",
			"version": 1458,
			"versionNonce": 354726099,
			"index": "aF",
			"isDeleted": false,
			"id": "pAS4mX5PiaM_RaCdMnt4o",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 210.8350332821551,
			"y": -1511.0194255335086,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.329971862343818,
			"height": 6.435137660098611,
			"seed": 463288211,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					0.5763677797816948,
					1.6688731920882902
				],
				[
					2.5256607299112193,
					3.4036886622096643
				],
				[
					5.70428979677279,
					5.13614905097271
				],
				[
					8.95610687703166,
					5.771884208014826
				],
				[
					12.995022870334497,
					6.435137660098611
				],
				[
					17.590633010172894,
					6.378635251742465
				],
				[
					21.329971862343818,
					6.337308948570871
				]
			]
		},
		{
			"type": "line",
			"version": 1493,
			"versionNonce": 1704795763,
			"index": "aG",
			"isDeleted": false,
			"id": "ceBmYT2r7jtCxdNtgYazH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 210.72075320354497,
			"y": -1507.6569556811305,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 24.028909757166286,
			"height": 6.8272831365641675,
			"seed": 14077235,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					0.45942411958652735,
					1.7404735286544422
				],
				[
					2.3241915354510674,
					3.4836930235399612
				],
				[
					5.914789950765661,
					5.221156738674221
				],
				[
					10.40923956005531,
					6.301992500317828
				],
				[
					15.587637618914338,
					6.8272831365641675
				],
				[
					20.508624915087434,
					6.657003913872047
				],
				[
					24.028909757166286,
					6.151687494623275
				]
			]
		},
		{
			"type": "line",
			"version": 1473,
			"versionNonce": 334944275,
			"index": "aH",
			"isDeleted": false,
			"id": "iGS50ZMzkR58NCglqZo70",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 210.77228160189543,
			"y": -1499.3998743127745,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 23.846493559175247,
			"height": 6.502037606069938,
			"seed": 1636609747,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					0.5350261850244786,
					1.68990279824229
				],
				[
					2.1243203143253413,
					3.319687503055488
				],
				[
					5.887382870014392,
					5.248723894324979
				],
				[
					10.796655050815621,
					6.147534342850296
				],
				[
					15.225601648714695,
					6.502037606069938
				],
				[
					20.59633434731442,
					6.410091711877098
				],
				[
					23.846493559175247,
					5.923752753200385
				]
			]
		},
		{
			"type": "line",
			"version": 1596,
			"versionNonce": 1848139187,
			"index": "aI",
			"isDeleted": false,
			"id": "rgpUSmw_PT9PXKmLkMkdL",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 210.54600323512068,
			"y": -1495.4000764474972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 36.66162968201005,
			"height": 6.860879691377109,
			"seed": 542465139,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					1.1014156603495067,
					1.7346102555631764
				],
				[
					3.7674906177310836,
					3.532055254421068
				],
				[
					6.963884249012106,
					4.619946488017826
				],
				[
					13.2253425256893,
					6.0526470399900045
				],
				[
					19.240375583076712,
					6.142169447971787
				],
				[
					24.57083702410097,
					5.6498597228638054
				],
				[
					29.183187240458384,
					4.754977667309638
				],
				[
					33.53015452247743,
					3.0833194205029963
				],
				[
					35.77312470898929,
					1.2126323686134
				],
				[
					36.66162968201005,
					-0.7187102434053219
				]
			]
		},
		{
			"type": "line",
			"version": 1144,
			"versionNonce": 1062743891,
			"index": "aJ",
			"isDeleted": false,
			"id": "l12hIklxZ9wwcylXza8-k",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 241.41424026899335,
			"y": -1495.2022300691547,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.418309296367974,
			"height": 3.536872910477726,
			"seed": 150427155,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					3.9280704911268587,
					-2.157645409097867
				],
				[
					5.418309296367974,
					-3.536872910477726
				]
			]
		},
		{
			"type": "line",
			"version": 1361,
			"versionNonce": 702336243,
			"index": "aK",
			"isDeleted": false,
			"id": "bDi9nrEnQoCf3xL4N-u23",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 214.0541502235542,
			"y": -1512.7884922906037,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.493856800190197,
			"height": 4.561260010435187,
			"seed": 711531443,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					4.3445241206166125,
					1.7154520107374738
				],
				[
					4.225626714447601,
					4.561260010435187
				],
				[
					-0.14933267957358465,
					2.859508514487632
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1424,
			"versionNonce": 1094497939,
			"index": "aL",
			"isDeleted": false,
			"id": "qybmtQv-ILIOpZ2sZbmvI",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 214.11025197491654,
			"y": -1500.976432713071,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.493856800190197,
			"height": 4.561260010435187,
			"seed": 1892756819,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					4.3445241206166125,
					1.7154520107374738
				],
				[
					4.225626714447601,
					4.561260010435187
				],
				[
					-0.14933267957358465,
					2.859508514487632
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1468,
			"versionNonce": 1680763955,
			"index": "aM",
			"isDeleted": false,
			"id": "gnHVVnSwrfkYqI6uwM-mC",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 214.26468570207908,
			"y": -1489.6137612585867,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 4.493856800190197,
			"height": 4.561260010435187,
			"seed": 2139491059,
			"groupIds": [
				"_ZMJR6V9n7g16HrD8Ll6V",
				"AETWKg4gKMAUOUaJQ917I",
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
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
					4.3445241206166125,
					1.7154520107374738
				],
				[
					4.225626714447601,
					4.561260010435187
				],
				[
					-0.14933267957358465,
					2.859508514487632
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 2295,
			"versionNonce": 1452830163,
			"index": "aN",
			"isDeleted": false,
			"id": "fVII0mcA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 179.67546543094727,
			"y": -1467.6855812411463,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 101.99992370605469,
			"height": 24,
			"seed": 1259222163,
			"groupIds": [
				"l8H8rW7BEXM-56CmkLQyh"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "DynamoDB",
			"rawText": "DynamoDB",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "DynamoDB",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"id": "iZLHxKSNrysnzIJDnvI5w",
			"type": "arrow",
			"x": -789.5840522903518,
			"y": -1163.4394034680809,
			"width": 297.2959471495533,
			"height": 192.16878193945547,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aO",
			"roundness": {
				"type": 2
			},
			"seed": 1931487795,
			"version": 204,
			"versionNonce": 1026098963,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633354,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					297.2959471495533,
					192.16878193945547
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": {
				"elementId": "yjKm94GTjAE8_eGZp2BVR",
				"focus": -0.0774153298079138,
				"gap": 9.82411636068332,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "cTt6-LlHjwO_F3FuVZUZ9",
			"type": "arrow",
			"x": -777.3997921612718,
			"y": -789.3826175053232,
			"width": 280.23798296884115,
			"height": 106.38321125578307,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aP",
			"roundness": {
				"type": 2
			},
			"seed": 1554148307,
			"version": 175,
			"versionNonce": 792505523,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633354,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					280.23798296884115,
					-106.38321125578307
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": {
				"elementId": "yjKm94GTjAE8_eGZp2BVR",
				"focus": -0.03871983620195233,
				"gap": 14.697820412315423,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "333ijImU",
			"type": "text",
			"x": -247.9936895527435,
			"y": -1118.3576409904845,
			"width": 287.7099609375,
			"height": 72.03972610632545,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aQ",
			"roundness": null,
			"seed": 195787123,
			"version": 290,
			"versionNonce": 1098463923,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "this service doesn't \nneed to be a lambda",
			"rawText": "this service doesn't \nneed to be a lambda",
			"fontSize": 28.815890442530176,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "this service doesn't \nneed to be a lambda",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "AstA8tWTWRMd3IZkLzDfJ",
			"type": "arrow",
			"x": 373.4035770303392,
			"y": -1065.9653224354406,
			"width": 259.52474074940505,
			"height": 109.6583411617205,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aR",
			"roundness": {
				"type": 2
			},
			"seed": 1031918355,
			"version": 71,
			"versionNonce": 2099460915,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "3DQk4vc0"
				}
			],
			"updated": 1738273633355,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					259.52474074940505,
					109.6583411617205
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "97htCSb1CMdnbkTun5GWb",
				"focus": -0.38420588455638427,
				"gap": 10.239482487679197,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "RQQ2PE517VBkHMxans8_z",
				"focus": -0.3286798130126853,
				"gap": 6.561375232727258,
				"fixedPoint": null
			},
			"startArrowhead": "arrow",
			"endArrowhead": null,
			"elbowed": false
		},
		{
			"id": "3DQk4vc0",
			"type": "text",
			"x": 472.28597303980735,
			"y": -1023.6361518545805,
			"width": 61.75994873046875,
			"height": 25,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aS",
			"roundness": null,
			"seed": 1117518003,
			"version": 17,
			"versionNonce": 2052745715,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Polling",
			"rawText": "Polling",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "AstA8tWTWRMd3IZkLzDfJ",
			"originalText": "Polling",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "F84MW_4DTspgqFfyCABmF",
			"type": "arrow",
			"x": -352.7783266628319,
			"y": -917.317348860664,
			"width": 183.98232794910882,
			"height": 46.30018849050418,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aT",
			"roundness": {
				"type": 2
			},
			"seed": 413166163,
			"version": 29,
			"versionNonce": 907762899,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633355,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					183.98232794910882,
					-46.30018849050418
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "yjKm94GTjAE8_eGZp2BVR",
				"focus": 0.3442707413155646,
				"gap": 1,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "rhHKetsj-RqcllHai7Bvn",
				"focus": 0.41822105047855307,
				"gap": 5.595541116555182,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "KAVeR8eH",
			"type": "text",
			"x": 463.5671019855315,
			"y": -1240.2002422812852,
			"width": 189.8598175048828,
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
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aU",
			"roundness": null,
			"seed": 1147512819,
			"version": 29,
			"versionNonce": 1571342643,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Polling is automatic",
			"rawText": "Polling is automatic",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Polling is automatic",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "mbCspvOR4sqlfZyabWRBH",
			"type": "arrow",
			"x": -68.88506565526677,
			"y": -968.4912414027999,
			"width": 370.4015079240337,
			"height": 97.47408103264047,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aV",
			"roundness": {
				"type": 2
			},
			"seed": 1811034515,
			"version": 124,
			"versionNonce": 182340211,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "7O6uVUUV"
				}
			],
			"updated": 1738273633355,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					370.4015079240337,
					-97.47408103264047
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "rhHKetsj-RqcllHai7Bvn",
				"focus": -0.046370170407632236,
				"gap": 4.599432937338975,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "7RxN8cFEAOZ2kG2N59LZj",
				"focus": 0.11575564617481712,
				"gap": 13.536894367930296,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "7O6uVUUV",
			"type": "text",
			"x": 32.62576215928914,
			"y": -1029.72828191912,
			"width": 167.37985229492188,
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
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aW",
			"roundness": null,
			"seed": 813467443,
			"version": 31,
			"versionNonce": 903370867,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Sending message ",
			"rawText": "Sending message ",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "mbCspvOR4sqlfZyabWRBH",
			"originalText": "Sending message ",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "KIUlhQEP",
			"type": "text",
			"x": 66.36022177752193,
			"y": -1241.4186682941931,
			"width": 284.1397705078125,
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
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aX",
			"roundness": null,
			"seed": 1214982355,
			"version": 37,
			"versionNonce": 1824182803,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Message is json blob of data",
			"rawText": "Message is json blob of data",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Message is json blob of data",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "s9VDLfjq",
			"type": "text",
			"x": 651.9118280747225,
			"y": -1081.4507962677912,
			"width": 177.4398193359375,
			"height": 50,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aY",
			"roundness": null,
			"seed": 1498715763,
			"version": 71,
			"versionNonce": 1079842739,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "subscriber applies \nto SNS of a topic",
			"rawText": "subscriber applies \nto SNS of a topic",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "subscriber applies \nto SNS of a topic",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "Ej93YLsE",
			"type": "text",
			"x": 658.5372551387088,
			"y": -752.3879187564785,
			"width": 184.09982299804688,
			"height": 100,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aZ",
			"roundness": null,
			"seed": 301944851,
			"version": 94,
			"versionNonce": 518367571,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "topic are a event \ntype use 1 to man\nsending things to \nmultiple subscriber ",
			"rawText": "topic are a event \ntype use 1 to man\nsending things to \nmultiple subscriber ",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "topic are a event \ntype use 1 to man\nsending things to \nmultiple subscriber ",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "nd-trjzv8mqwDHifbmLHo",
			"type": "arrow",
			"x": -149.9032452022343,
			"y": 197.13937103269905,
			"width": 129.97014105153823,
			"height": 3.644048264192861,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aa",
			"roundness": {
				"type": 2
			},
			"seed": 73520563,
			"version": 84,
			"versionNonce": 1390270163,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					129.97014105153823,
					3.644048264192861
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "PHw_979K4wjQ0-83ubtOI",
				"focus": -0.17633819153764138,
				"gap": 5.532154761073002,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "_rtdpLcWGSYXhMXnT11WI",
				"focus": 0.6914845108050055,
				"gap": 2.1909104364846606,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "aHFfskHLmr0bCuCWUvBKt",
			"type": "arrow",
			"x": 85.5467766917393,
			"y": 207.19314136001003,
			"width": 243.54816383958064,
			"height": 8.760725317970582,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ab",
			"roundness": {
				"type": 2
			},
			"seed": 1067624275,
			"version": 52,
			"versionNonce": 1713274387,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					243.54816383958064,
					-8.760725317970582
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "NFlzLqKNU4ywoJYQyTSo4",
				"focus": 0.10470141241595197,
				"gap": 9.312561592421218,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "I797kINX2ffE2EtWqlLuy",
				"focus": -0.5163712286100458,
				"gap": 9.241629936087575,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "vSTJIa_3VQbkWKUKc88cE",
			"type": "arrow",
			"x": 61.01674580142185,
			"y": 228.2188821231391,
			"width": 273.3346299206803,
			"height": 96.36797849767572,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ac",
			"roundness": {
				"type": 2
			},
			"seed": 706233587,
			"version": 64,
			"versionNonce": 1011766611,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					273.3346299206803,
					96.36797849767572
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "Yb1HJAUTCIMTUtfLoLEWG",
				"focus": 0.028859053705395047,
				"gap": 6.981143733458615,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "-iaxJLf3yqEpRVZ41xxpx",
				"focus": 0.9608757780454871,
				"gap": 8.771478179376707,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "gIBNKm8C",
			"type": "text",
			"x": 299.30847445022005,
			"y": -22.337861970817812,
			"width": 135.8998565673828,
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
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ad",
			"roundness": null,
			"seed": 457780883,
			"version": 57,
			"versionNonce": 1318643667,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Best Practice",
			"rawText": "Best Practice",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Best Practice",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "jh5kmbY3CFhX9L8NYv_55",
			"type": "arrow",
			"x": 667.258937804982,
			"y": 218.17841721012314,
			"width": 275.08677498427437,
			"height": 12.737420913707297,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ae",
			"roundness": {
				"type": 2
			},
			"seed": 904651827,
			"version": 61,
			"versionNonce": 678118323,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-275.08677498427437,
					-12.737420913707297
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "CRyvBRFqenkCwIE-Vgy8z",
				"focus": -0.2939807699102354,
				"gap": 11.327576215579938,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "XK-MGRsSmzww45-V24Ddg",
				"focus": 2.1502062323241784,
				"gap": 9.11446240942556,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "chd08WEwOdRuqpL2efZ4p",
			"type": "arrow",
			"x": 662.0025026141998,
			"y": 371.89477733785566,
			"width": 262.82175953911565,
			"height": 49.060061780634896,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "af",
			"roundness": {
				"type": 2
			},
			"seed": 31909331,
			"version": 75,
			"versionNonce": 824062707,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-262.82175953911565,
					-49.060061780634896
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "p5KoSjKgUKV8Us0PLSE-3",
				"focus": -0.2952879827310446,
				"gap": 7.310415706827143,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "DbB1_f5TLwwVr-pahaXmf",
				"focus": -2.893829608497517,
				"gap": 12.436733188944192,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "V4HF2bBT",
			"type": "text",
			"x": 728.5840150307758,
			"y": -108.19297008692911,
			"width": 181.61984252929688,
			"height": 50,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ag",
			"roundness": null,
			"seed": 1179693939,
			"version": 40,
			"versionNonce": 1741943987,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "can be service\ninstead of lambda ",
			"rawText": "can be service\ninstead of lambda ",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "can be service\ninstead of lambda ",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "CJrPUXRI",
			"type": "text",
			"x": 167.89759468066222,
			"y": 545.3571386336721,
			"width": 392.95965576171875,
			"height": 75,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ah",
			"roundness": null,
			"seed": 594529555,
			"version": 117,
			"versionNonce": 1299768915,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "can swap out SNS for EventBridge \nor add to arch the benefit being service\nintegration like shopify",
			"rawText": "can swap out SNS for EventBridge \nor add to arch the benefit being service\nintegration like shopify",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "can swap out SNS for EventBridge \nor add to arch the benefit being service\nintegration like shopify",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "WPPcHCtpQJN2Uhhbv_NX_",
			"type": "arrow",
			"x": -154.4353999633072,
			"y": 214.28788600601752,
			"width": 124.27036759650593,
			"height": 224.09415701103876,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ai",
			"roundness": {
				"type": 2
			},
			"seed": 1824174771,
			"version": 109,
			"versionNonce": 490833011,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					124.27036759650593,
					224.09415701103876
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "PHw_979K4wjQ0-83ubtOI",
				"focus": -0.5748135313748625,
				"gap": 1,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "Wk4xVkDxqr0YeV8CtC4g1",
				"focus": -0.4900597943970898,
				"gap": 4.843597879098581,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "zUxgEtlb",
			"type": "text",
			"x": 93.86896673050683,
			"y": 432.63972824403277,
			"width": 255.09976196289062,
			"height": 75,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "aj",
			"roundness": null,
			"seed": 1121444947,
			"version": 135,
			"versionNonce": 1776004499,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "eventBridge has limits \nfor rules being 5 targets, \ntarget being subscriber",
			"rawText": "eventBridge has limits \nfor rules being 5 targets, \ntarget being subscriber",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "eventBridge has limits \nfor rules being 5 targets, \ntarget being subscriber",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "WWORJFfk",
			"type": "text",
			"x": -226.55219760420596,
			"y": 610.651486207762,
			"width": 309.19970703125,
			"height": 75,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "ak",
			"roundness": null,
			"seed": 1839063539,
			"version": 93,
			"versionNonce": 735478579,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "use messageBus same as topics\nand events from other service\n",
			"rawText": "use messageBus same as topics\nand events from other service\n",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "use messageBus same as topics\nand events from other service\n",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "FVrB4ayH",
			"type": "text",
			"x": -564.8456919383675,
			"y": -512.8087315675275,
			"width": 1068.4876708984375,
			"height": 103.19189071901347,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "al",
			"roundness": null,
			"seed": 1980967827,
			"version": 122,
			"versionNonce": 1059431635,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Event driven Architecture ",
			"rawText": "Event driven Architecture ",
			"fontSize": 82.55351257521077,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Event driven Architecture ",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "Yq0S3src",
			"type": "text",
			"x": -543.179906883995,
			"y": -377.92772007722897,
			"width": 821.7708129882812,
			"height": 151.23709345103788,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "am",
			"roundness": null,
			"seed": 7225651,
			"version": 158,
			"versionNonce": 190812787,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"text": "Alternatively you can use Step Functions \nwhich is more of a workflow utilizing \ndifferent aws services",
			"rawText": "Alternatively you can use Step Functions \nwhich is more of a workflow utilizing \ndifferent aws services",
			"fontSize": 40.32989158694344,
			"fontFamily": 5,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Alternatively you can use Step Functions \nwhich is more of a workflow utilizing \ndifferent aws services",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "rectangle",
			"version": 2446,
			"versionNonce": 1095420947,
			"index": "an",
			"isDeleted": false,
			"id": "lilzdcO4r8JPxSix8KrU_",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 749.661316045718,
			"y": -1289.7026426521534,
			"strokeColor": "#000000",
			"backgroundColor": "#40c05788",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 1712693971,
			"groupIds": [
				"6-TzpjRJhqQMDHxD-m3GU",
				"ZHG-Vnp1PCeNfRffGFB5r",
				"SWHryaI3Zcakibj-T8Zgx",
				"TUiSk42XlNkiXEtl8uix5"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2234,
			"versionNonce": 886952371,
			"index": "ao",
			"isDeleted": false,
			"id": "n8tkCutOAFYpOguHfJaqa",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 763.2741712233772,
			"y": -1278.6355466266377,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 39.10563151041674,
			"height": 10.753995455228363,
			"seed": 262131827,
			"groupIds": [
				"SWHryaI3Zcakibj-T8Zgx",
				"TUiSk42XlNkiXEtl8uix5"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2852,
			"versionNonce": 2000626515,
			"index": "ap",
			"isDeleted": false,
			"id": "aEITMKkr5T5Xa-Caq6ugL",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 763.6320876396437,
			"y": -1272.7570785777589,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.295773237179446,
			"height": 40.48662140675077,
			"seed": 248728083,
			"groupIds": [
				"SWHryaI3Zcakibj-T8Zgx",
				"TUiSk42XlNkiXEtl8uix5"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					3.8452774439103905,
					32.14685684595355
				],
				[
					6.768312737880933,
					37.98883103590748
				],
				[
					20.34867663261207,
					40.48662140675077
				],
				[
					32.537268066406114,
					38.400380608974274
				],
				[
					35.36686823918285,
					31.944173177083314
				],
				[
					38.295773237179446,
					0.09767190004004078
				]
			]
		},
		{
			"type": "ellipse",
			"version": 2244,
			"versionNonce": 818233587,
			"index": "aq",
			"isDeleted": false,
			"id": "z79A3y3CWkd3qCyTxzflT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 780.4023757255811,
			"y": -1262.4945793993866,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 4.69818115234375,
			"height": 4.69818115234375,
			"seed": 2024181683,
			"groupIds": [
				"SWHryaI3Zcakibj-T8Zgx",
				"TUiSk42XlNkiXEtl8uix5"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2930,
			"versionNonce": 989244051,
			"index": "ar",
			"isDeleted": false,
			"id": "XJck5KZLU7VMR4I5eQhHl",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 782.8924941337843,
			"y": -1259.921588981906,
			"strokeColor": "#000000",
			"backgroundColor": "#000",
			"width": 23.24691772460949,
			"height": 11.53113708496096,
			"seed": 2134909267,
			"groupIds": [
				"SWHryaI3Zcakibj-T8Zgx",
				"TUiSk42XlNkiXEtl8uix5"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633304,
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
					7.0229309082030795,
					7.4353179931640625
				],
				[
					17.00493774414076,
					11.53113708496096
				],
				[
					22.923687744140693,
					10.143841552734386
				],
				[
					23.24691772460949,
					5.890612792968767
				],
				[
					17.962628173828193,
					1.7561248779296932
				]
			]
		},
		{
			"type": "text",
			"version": 2710,
			"versionNonce": 2055856179,
			"index": "as",
			"isDeleted": false,
			"id": "NvYtrXeT",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 730.3517342891262,
			"y": -1220.5323980494304,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 103.69989013671875,
			"height": 24,
			"seed": 1274445555,
			"groupIds": [
				"TUiSk42XlNkiXEtl8uix5"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633304,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "S3 Bucket",
			"rawText": "S3 Bucket",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "S3 Bucket",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1906,
			"versionNonce": 2036687315,
			"index": "at",
			"isDeleted": false,
			"id": "e_1hDK1uzFh44yRBN-pcW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 306.4038390538369,
			"y": -1103.1530099260412,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 424683667,
			"groupIds": [
				"rzy2hPrzxMIUopdbZE9yD",
				"21oQEbd7VtTtHT8g013rA",
				"o3xwWTCQPRaGc3GKYbWuD",
				"HfcbteL2snRW2zvt0tpyw",
				"afl9H8ivwYYTYqx1xa1MZ",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1608,
			"versionNonce": 1084206963,
			"index": "au",
			"isDeleted": false,
			"id": "7RxN8cFEAOZ2kG2N59LZj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 314.587490521865,
			"y": -1074.0463354226363,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 218340915,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "mbCspvOR4sqlfZyabWRBH",
					"type": "arrow"
				}
			],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1663,
			"versionNonce": 612019891,
			"index": "av",
			"isDeleted": false,
			"id": "97htCSb1CMdnbkTun5GWb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 355.64525757148454,
			"y": -1074.1197705161017,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 1375166419,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "AstA8tWTWRMd3IZkLzDfJ",
					"type": "arrow"
				}
			],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2279,
			"versionNonce": 2056183283,
			"index": "aw",
			"isDeleted": false,
			"id": "OA_pu9cS4p2duaTbviGds",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 331.5687118679077,
			"y": -1077.7267306771305,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1916923251,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2352,
			"versionNonce": 864331667,
			"index": "ax",
			"isDeleted": false,
			"id": "F46KAcKuVh2Y941nNcwyB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5707963267948957,
			"x": 338.13020758664584,
			"y": -1083.6538897102187,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1898563347,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2383,
			"versionNonce": 173030707,
			"index": "ay",
			"isDeleted": false,
			"id": "Szrn9NN___CTeJLWazfB7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 344.06461148489393,
			"y": -1077.135044611195,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 623209651,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2469,
			"versionNonce": 1515724499,
			"index": "az",
			"isDeleted": false,
			"id": "doN7tmZH2BAKbYb-XkEgg",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.71238898038469,
			"x": 337.51221005892535,
			"y": -1071.187030691985,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1373331027,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 1881,
			"versionNonce": 1311951987,
			"index": "b00",
			"isDeleted": false,
			"id": "BMuBHHiEVA2wJAwmIYOi3",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 324.73216620083053,
			"y": -1069.9726106328685,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 35789811,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1897,
			"versionNonce": 2040972819,
			"index": "b01",
			"isDeleted": false,
			"id": "iZrwRiuds9qjifg4PnoIa",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 347.3260148277684,
			"y": -1069.8497401712316,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 570434963,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1872,
			"versionNonce": 866814899,
			"index": "b02",
			"isDeleted": false,
			"id": "cHL6g6gmWoDV908hJtsbT",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 318.61088450506054,
			"y": -1074.002516040117,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 1487665971,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "line",
			"version": 1976,
			"versionNonce": 811900243,
			"index": "b03",
			"isDeleted": false,
			"id": "nwLLDbcODEgEwRGTehoPL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 318.3572271320488,
			"y": -1049.3149323679659,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 579607763,
			"groupIds": [
				"HeAf5GqmCcYzGe1159a5r",
				"jt7CSWOmud5sljBk5YsIV",
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "text",
			"version": 2051,
			"versionNonce": 1529576179,
			"index": "b04",
			"isDeleted": false,
			"id": "5qSf5670",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 319.444259586063,
			"y": -1033.917242363504,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.41996765136719,
			"height": 24,
			"seed": 725027443,
			"groupIds": [
				"LEs8I84r3Ivr10AOabhoT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "SQS",
			"rawText": "SQS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SQS",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2186,
			"versionNonce": 1887806611,
			"index": "b05",
			"isDeleted": false,
			"id": "RQQ2PE517VBkHMxans8_z",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 639.4896930124714,
			"y": -1000.3551328490416,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 89.71595900456212,
			"height": 89.63004751551998,
			"seed": 1735607315,
			"groupIds": [
				"OXkwOgGXPJiiDf0MH-Yzm",
				"CEyINPa3r_C6LeSalQavX",
				"fD9NTUSELZz-4fpPNMmp2"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "AstA8tWTWRMd3IZkLzDfJ",
					"type": "arrow"
				}
			],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1352,
			"versionNonce": 1056824275,
			"index": "b06",
			"isDeleted": false,
			"id": "ixV5rogPAvR0W3yFKYILM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 674.2720397408756,
			"y": -963.1423729734388,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.87136084633906,
			"height": 37.43479694070029,
			"seed": 1865894323,
			"groupIds": [
				"zUwNNGcIRAfEmxP25Yjf4",
				"CEyINPa3r_C6LeSalQavX",
				"fD9NTUSELZz-4fpPNMmp2"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					-17.71788340736501,
					35.44315495749986
				],
				[
					-0.7207462846264164,
					37.43479694070029
				],
				[
					9.153477438974049,
					18.345096422477248
				],
				[
					1.2516036327557503,
					0.784965813085287
				]
			]
		},
		{
			"type": "line",
			"version": 1351,
			"versionNonce": 1897458035,
			"index": "b07",
			"isDeleted": false,
			"id": "VRg5SpcwOqxdP8a6lwlFz",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 708.3522493713451,
			"y": -941.017192954615,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.52285575046692,
			"height": 61.23846768750466,
			"seed": 396991315,
			"groupIds": [
				"zUwNNGcIRAfEmxP25Yjf4",
				"CEyINPa3r_C6LeSalQavX",
				"fD9NTUSELZz-4fpPNMmp2"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					-20.82125062063946,
					-45.12161641883866
				],
				[
					-40.60434929806802,
					-45.928850765628496
				],
				[
					-42.00148823695817,
					-32.01240898364306
				],
				[
					-31.868072977227005,
					-30.61923384375233
				],
				[
					-10.948412974083748,
					14.505166141799394
				],
				[
					5.13531705179845,
					15.309616921876165
				],
				[
					6.521367513508751,
					1.391783356534197
				],
				[
					5.13531705179845,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1695,
			"versionNonce": 1942045459,
			"index": "b08",
			"isDeleted": false,
			"id": "qpWDr8EH",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 633.4161983963513,
			"y": -903.8171010708224,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 101.8167724609375,
			"height": 33.40280055682072,
			"seed": 1293990131,
			"groupIds": [
				"fD9NTUSELZz-4fpPNMmp2"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 27.835667130683937,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2254,
			"versionNonce": 1601005747,
			"index": "b09",
			"isDeleted": false,
			"id": "rhHKetsj-RqcllHai7Bvn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -163.20045759716777,
			"y": -997.66568892649,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 89.71595900456212,
			"height": 89.63004751551998,
			"seed": 757277331,
			"groupIds": [
				"lkbHeezkFXrcxRoNJlz52",
				"dv71BkTua7jYWKENrM4mS",
				"0bAEWU40oBo2DCR8AZv2g"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "AstA8tWTWRMd3IZkLzDfJ",
					"type": "arrow"
				},
				{
					"id": "F84MW_4DTspgqFfyCABmF",
					"type": "arrow"
				},
				{
					"id": "mbCspvOR4sqlfZyabWRBH",
					"type": "arrow"
				}
			],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1417,
			"versionNonce": 251240851,
			"index": "b0A",
			"isDeleted": false,
			"id": "Xuitv49BNWOoMjqODjMZH",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -128.41811086876396,
			"y": -960.4529290508867,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.87136084633906,
			"height": 37.43479694070029,
			"seed": 1617385523,
			"groupIds": [
				"8FPaPu9lWZArIV-aOd6ym",
				"dv71BkTua7jYWKENrM4mS",
				"0bAEWU40oBo2DCR8AZv2g"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					-17.71788340736501,
					35.44315495749986
				],
				[
					-0.7207462846264164,
					37.43479694070029
				],
				[
					9.153477438974049,
					18.345096422477248
				],
				[
					1.2516036327557503,
					0.784965813085287
				]
			]
		},
		{
			"type": "line",
			"version": 1416,
			"versionNonce": 1628829491,
			"index": "b0B",
			"isDeleted": false,
			"id": "H2xMPe0qFLf2s9kr4pH43",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -94.33790123829431,
			"y": -938.3277490320629,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.52285575046692,
			"height": 61.23846768750466,
			"seed": 886299091,
			"groupIds": [
				"8FPaPu9lWZArIV-aOd6ym",
				"dv71BkTua7jYWKENrM4mS",
				"0bAEWU40oBo2DCR8AZv2g"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					-20.82125062063946,
					-45.12161641883866
				],
				[
					-40.60434929806802,
					-45.928850765628496
				],
				[
					-42.00148823695817,
					-32.01240898364306
				],
				[
					-31.868072977227005,
					-30.61923384375233
				],
				[
					-10.948412974083748,
					14.505166141799394
				],
				[
					5.13531705179845,
					15.309616921876165
				],
				[
					6.521367513508751,
					1.391783356534197
				],
				[
					5.13531705179845,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1787,
			"versionNonce": 72784083,
			"index": "b0C",
			"isDeleted": false,
			"id": "4LqlXCLp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -216.84963580703834,
			"y": -901.1276571482708,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 196.9681396484375,
			"height": 33.40280055682072,
			"seed": 2004821875,
			"groupIds": [
				"0bAEWU40oBo2DCR8AZv2g"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 27.835667130683937,
			"fontFamily": 1,
			"text": "Order Service ",
			"rawText": "Order Service ",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Order Service ",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "text",
			"version": 1061,
			"versionNonce": 1716651635,
			"index": "b0D",
			"isDeleted": false,
			"id": "rCoIT7m8",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -875.1527291814582,
			"y": -717.6001907729637,
			"strokeColor": "#000000",
			"backgroundColor": "white",
			"width": 102.43217468261719,
			"height": 55.05419336317897,
			"seed": 246399251,
			"groupIds": [
				"3ik4DUPS5C58MfPkUGx2-"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 44.043354690543175,
			"fontFamily": 1,
			"text": "User",
			"rawText": "User",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "User",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "line",
			"version": 1370,
			"versionNonce": 2110701587,
			"index": "b0E",
			"isDeleted": false,
			"id": "0KMAu6YaNJ0e56GZJJDRf",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -881.290656562609,
			"y": -738.8575529759169,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 108.49952860432626,
			"height": 96.61571428937773,
			"seed": 1406936755,
			"groupIds": [
				"qkoAff4u_WVW6WIQ-IV6r",
				"3ik4DUPS5C58MfPkUGx2-"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					12.15194720368453,
					-64.0224612760937
				],
				[
					52.0797737300766,
					-96.61571428937773
				],
				[
					92.00760025646866,
					-71.00672977894018
				],
				[
					108.49952860432626,
					-6.6479213090370735
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1107,
			"versionNonce": 616777139,
			"index": "b0F",
			"isDeleted": false,
			"id": "XCMzScwhzNQUbreOYcHO0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -853.8651440369058,
			"y": -885.7224265917389,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 55.5517586454151,
			"height": 48.60778881473838,
			"seed": 766171219,
			"groupIds": [
				"qkoAff4u_WVW6WIQ-IV6r",
				"3ik4DUPS5C58MfPkUGx2-"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1085,
			"versionNonce": 844502867,
			"index": "b0G",
			"isDeleted": false,
			"id": "LO9s5K1B",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -884.9024020775009,
			"y": -1101.3752226809092,
			"strokeColor": "#000000",
			"backgroundColor": "white",
			"width": 102.43217468261719,
			"height": 55.05419336317897,
			"seed": 1777489395,
			"groupIds": [
				"UKwc0DJS2zWhGjslhy_aT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 44.043354690543175,
			"fontFamily": 1,
			"text": "User",
			"rawText": "User",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "User",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "line",
			"version": 1394,
			"versionNonce": 1423815923,
			"index": "b0H",
			"isDeleted": false,
			"id": "vW33XXAxfz_2-Ns7bRCAK",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -891.0403294586517,
			"y": -1122.6325848838624,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 108.49952860432626,
			"height": 96.61571428937773,
			"seed": 1471750035,
			"groupIds": [
				"9q6pE2LBXK1uBjeaKTv81",
				"UKwc0DJS2zWhGjslhy_aT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					12.15194720368453,
					-64.0224612760937
				],
				[
					52.0797737300766,
					-96.61571428937773
				],
				[
					92.00760025646866,
					-71.00672977894018
				],
				[
					108.49952860432626,
					-6.6479213090370735
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1131,
			"versionNonce": 736140947,
			"index": "b0I",
			"isDeleted": false,
			"id": "HyIvnFXTG8d0ha8-bQ73F",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -863.6148169329485,
			"y": -1269.4974584996844,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 55.5517586454151,
			"height": 48.60778881473838,
			"seed": 557167923,
			"groupIds": [
				"9q6pE2LBXK1uBjeaKTv81",
				"UKwc0DJS2zWhGjslhy_aT"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 203,
			"versionNonce": 571823155,
			"index": "b0J",
			"isDeleted": false,
			"id": "8KBL4tDg",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 343.4974019998301,
			"y": -1563.9040593662985,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 437.5244140625,
			"height": 65.00000000000001,
			"seed": 1708037843,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 52.00000000000001,
			"fontFamily": 1,
			"text": "Data governance",
			"rawText": "Data governance",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Data governance",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "rectangle",
			"version": 1910,
			"versionNonce": 123885011,
			"index": "b0K",
			"isDeleted": false,
			"id": "NzdwgR7Zu3lrphxAnQPW8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 304.31037611087254,
			"y": -968.8089366935646,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 337265779,
			"groupIds": [
				"sd6iFWd0qeddwP_s0Z4pF",
				"ldnu3-L3ZeOMmfWU2B-Uf",
				"hMdmciGLlMkKdAJzU-68i",
				"5emzSUbfsITL8cGC896d6",
				"SUybX9Bwnlhs8DyC9O7ps",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1611,
			"versionNonce": 1792942963,
			"index": "b0L",
			"isDeleted": false,
			"id": "dakWiNohCmm7Ub20oEFaL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 312.4940275789006,
			"y": -939.7022621901592,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 64962067,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1666,
			"versionNonce": 885996819,
			"index": "b0M",
			"isDeleted": false,
			"id": "jsjUmOE-a9AYPG6MdNNX_",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 353.55179462852016,
			"y": -939.775697283625,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 1343488947,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2283,
			"versionNonce": 11281075,
			"index": "b0N",
			"isDeleted": false,
			"id": "t0Rry3ie5I7AE9VF3HkN7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 329.47524892494334,
			"y": -943.3826574446534,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1893668179,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2356,
			"versionNonce": 924537939,
			"index": "b0O",
			"isDeleted": false,
			"id": "UxRoWjg6vWTHH03GMJGpF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5707963267948957,
			"x": 336.03674464368146,
			"y": -949.3098164777416,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 362214131,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2387,
			"versionNonce": 1743999475,
			"index": "b0P",
			"isDeleted": false,
			"id": "yye14yec_W3ClUazpna81",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 341.97114854192955,
			"y": -942.790971378718,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1052908691,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2473,
			"versionNonce": 1681562515,
			"index": "b0Q",
			"isDeleted": false,
			"id": "Toi9KKsUHD0AZpi9g1Ya6",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.71238898038469,
			"x": 335.41874711596097,
			"y": -936.8429574595079,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 404165171,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 1885,
			"versionNonce": 405254451,
			"index": "b0R",
			"isDeleted": false,
			"id": "MjoC_SrfndL4tjz36nYdy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 322.63870325786615,
			"y": -935.6285374003915,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 310137811,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1901,
			"versionNonce": 622924499,
			"index": "b0S",
			"isDeleted": false,
			"id": "1_DPhuXagpmsuLOI6fBEJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 345.232551884804,
			"y": -935.5056669387545,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 1040736627,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1876,
			"versionNonce": 1002258547,
			"index": "b0T",
			"isDeleted": false,
			"id": "4oDP5FLy_1SW8Ix6GgOhW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 316.51742156209616,
			"y": -939.6584428076399,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 1677835027,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "line",
			"version": 1980,
			"versionNonce": 901954067,
			"index": "b0U",
			"isDeleted": false,
			"id": "czLFdZv7npaZ1I7N0BKyh",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 316.26376418908444,
			"y": -914.9708591354888,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 1625219251,
			"groupIds": [
				"pFBryzcHY_30fq5jJlVPl",
				"a3f4ZLmWh1xWOdOFDMzeQ",
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "text",
			"version": 2055,
			"versionNonce": 1881669555,
			"index": "b0V",
			"isDeleted": false,
			"id": "cmyzSHtF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 317.35079664309865,
			"y": -899.573169131027,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.41996765136719,
			"height": 24,
			"seed": 1044795987,
			"groupIds": [
				"Iay4H7xJFO1LpVGQvcQ0O"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "SQS",
			"rawText": "SQS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SQS",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1926,
			"versionNonce": 1695781203,
			"index": "b0W",
			"isDeleted": false,
			"id": "nujY4sgZ-hlxbY65FbeAE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 306.74722813668836,
			"y": -832.345223247868,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 219058163,
			"groupIds": [
				"d5x0bZSTdgUHWRI93_p_w",
				"D8I75UuVkxC0Mn7ov6fAk",
				"KewPSOh8yVW5MygCcquQ0",
				"p1cqVmCcnWRSjYeasCzJm",
				"HiwLe-DoUsqsDDinK0tnz",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1627,
			"versionNonce": 98299635,
			"index": "b0X",
			"isDeleted": false,
			"id": "cDcHu046ddqfCSR4G3s54",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 314.93087960471644,
			"y": -803.2385487444626,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 2134776211,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1682,
			"versionNonce": 1426561171,
			"index": "b0Y",
			"isDeleted": false,
			"id": "i_YARb6-LyEfXZQ_MecNM",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 355.988646654336,
			"y": -803.3119838379284,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 1108045619,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2299,
			"versionNonce": 1078791731,
			"index": "b0Z",
			"isDeleted": false,
			"id": "LKQRcKBNdkmCa6eYoXGVR",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 331.91210095075917,
			"y": -806.9189439989568,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 400363731,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2372,
			"versionNonce": 982699987,
			"index": "b0a",
			"isDeleted": false,
			"id": "oM8MRuEzgULvAo-PzkgQV",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5707963267948957,
			"x": 338.4735966694973,
			"y": -812.846103032045,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 843677299,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2403,
			"versionNonce": 368008563,
			"index": "b0b",
			"isDeleted": false,
			"id": "tCAmoqLiBd5ECXkYn0OaQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 344.4080005677454,
			"y": -806.3272579330214,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1276590099,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2489,
			"versionNonce": 497628947,
			"index": "b0c",
			"isDeleted": false,
			"id": "xOPskZcdhJezT8ZAhpYoV",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.71238898038469,
			"x": 337.8555991417768,
			"y": -800.3792440138113,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 54312371,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 1901,
			"versionNonce": 1882643635,
			"index": "b0d",
			"isDeleted": false,
			"id": "Vf8hf3KroDusIWnfOf20n",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 325.075555283682,
			"y": -799.1648239546948,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 1927319379,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1917,
			"versionNonce": 423546451,
			"index": "b0e",
			"isDeleted": false,
			"id": "o0OUFMwFhq-xp8YIwnsgQ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 347.66940391061985,
			"y": -799.0419534930579,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 223948019,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1892,
			"versionNonce": 1805093875,
			"index": "b0f",
			"isDeleted": false,
			"id": "jWIImaKCauM2Wc1H9iwdF",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 318.954273587912,
			"y": -803.1947293619432,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 908924563,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "line",
			"version": 1996,
			"versionNonce": 457676179,
			"index": "b0g",
			"isDeleted": false,
			"id": "KjbJFSUdKft-bmwom3JQC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 318.70061621490026,
			"y": -778.5071456897922,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 470993971,
			"groupIds": [
				"P8N7rTbHJZuJKs6ahTi79",
				"xGPCJhWHJ6O2xaX7BTyzz",
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633305,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "text",
			"version": 2071,
			"versionNonce": 394619699,
			"index": "b0h",
			"isDeleted": false,
			"id": "5ZpulkDT",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 319.78764866891447,
			"y": -763.1094556853304,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.41996765136719,
			"height": 24,
			"seed": 1391513043,
			"groupIds": [
				"YY2sF9KPI4kRFLpPN7old"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "SQS",
			"rawText": "SQS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SQS",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 3454,
			"versionNonce": 616008915,
			"index": "b0i",
			"isDeleted": false,
			"id": "VMQxihTzhYJHZYYCVZUyn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -591.4557419071734,
			"y": 161.19300680383867,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 119.69071915908152,
			"height": 119.69071915908152,
			"seed": 769497971,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "Pyr079C0jRxGdo5gWx2vV",
					"type": "arrow"
				},
				{
					"id": "nl4CJvPDHHLT5lp3zyeUW",
					"type": "arrow"
				},
				{
					"id": "KiSZV79zsx-Eat7CDcrTc",
					"type": "arrow"
				}
			],
			"updated": 1738273633305,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3916,
			"versionNonce": 815598419,
			"index": "b0j",
			"isDeleted": false,
			"id": "0UU-JJoVrEq9WU1lsqNXD",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -545.3656539832077,
			"y": 198.39626014192254,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 28.082474701264697,
			"height": 0,
			"seed": 1495250195,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					28.082474701264697,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3967,
			"versionNonce": 1445341427,
			"index": "b0k",
			"isDeleted": false,
			"id": "_5gTVR4SQx_By_tqv07jl",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -548.0905245161553,
			"y": 244.2686281923734,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 31.72672551120865,
			"height": 0,
			"seed": 875403955,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					31.72672551120865,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3813,
			"versionNonce": 1408930451,
			"index": "b0l",
			"isDeleted": false,
			"id": "dtWsutbe8ok0TNFJnnUF0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -579.1928400172387,
			"y": 190.67525078135714,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 31.388330267379224,
			"height": 89.62487097117089,
			"seed": 1806552147,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					31.388330267379224,
					-13.700419214522709
				],
				[
					31.23375587380865,
					75.92445175664818
				],
				[
					0.14913975417760067,
					61.92658724478317
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3761,
			"versionNonce": 449890355,
			"index": "b0m",
			"isDeleted": false,
			"id": "3nZSNOChJ7bHMLn6BwPK7",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -515.396221573284,
			"y": 176.6322530001312,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 31.428556413134615,
			"height": 89.37746606679478,
			"seed": 1400293875,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633305,
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
					0.364746497590558,
					89.37746606679478
				],
				[
					31.400414059257553,
					75.81741512300502
				],
				[
					31.428556413134615,
					13.899120917114969
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3486,
			"versionNonce": 1083132371,
			"index": "b0n",
			"isDeleted": false,
			"id": "lHS58rPFlHKRIbtpiS29c",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -540.0533154452182,
			"y": 232.42139034134107,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 16.84860889919523,
			"height": 22.59275284579582,
			"seed": 9376659,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					16.84860889919523,
					-22.59275284579582
				]
			]
		},
		{
			"type": "line",
			"version": 3605,
			"versionNonce": 1514968947,
			"index": "b0o",
			"isDeleted": false,
			"id": "Pg_K4Pr5y-VlCd002Jdge",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -525.5976653722,
			"y": 214.15168457992195,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.287197599991954,
			"height": 15.576302158592041,
			"seed": 590162227,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					9.266931179501587,
					8.091264104402542
				],
				[
					-0.02026642049036733,
					15.576302158592041
				]
			]
		},
		{
			"type": "line",
			"version": 3744,
			"versionNonce": 374288659,
			"index": "b0p",
			"isDeleted": false,
			"id": "lCvnxEB2AtqXZDzkJkSi0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -547.4533927880871,
			"y": 213.14573650862076,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.287197599991956,
			"height": 15.576302158592041,
			"seed": 548899539,
			"groupIds": [
				"dMPNOO69NSmYeqLvjL03M",
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					9.266931179501588,
					8.091264104402542
				],
				[
					-0.02026642049036733,
					15.576302158592041
				]
			]
		},
		{
			"type": "text",
			"version": 3438,
			"versionNonce": 369989299,
			"index": "b0q",
			"isDeleted": false,
			"id": "9j4reCCm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -656.0066650830117,
			"y": 287.1923536391075,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 248.7192840576172,
			"height": 44.43042575563747,
			"seed": 1841608819,
			"groupIds": [
				"OgaSS7WRk0HA9xpLa0z8N"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 37.02535479636456,
			"fontFamily": 1,
			"text": "API Gateway",
			"rawText": "API Gateway",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "API Gateway",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"id": "nl4CJvPDHHLT5lp3zyeUW",
			"type": "arrow",
			"x": -763.9915214094494,
			"y": -31.93041655497973,
			"width": 170.51870555259165,
			"height": 215.31749787318074,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0r",
			"roundness": {
				"type": 2
			},
			"seed": 672870931,
			"version": 391,
			"versionNonce": 2114881971,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633356,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					170.51870555259165,
					215.31749787318074
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": {
				"elementId": "VMQxihTzhYJHZYYCVZUyn",
				"focus": -0.29881614152157593,
				"gap": 2.017073949684459,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "Pyr079C0jRxGdo5gWx2vV",
			"type": "arrow",
			"x": -751.8072612803694,
			"y": 342.1263694077778,
			"width": 156.1581294909638,
			"height": 88.28194515371115,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0s",
			"roundness": {
				"type": 2
			},
			"seed": 1890678707,
			"version": 372,
			"versionNonce": 1345487891,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633356,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					156.1581294909638,
					-88.28194515371115
				]
			],
			"lastCommittedPoint": null,
			"startBinding": null,
			"endBinding": {
				"elementId": "VMQxihTzhYJHZYYCVZUyn",
				"focus": 0.036266805003051975,
				"gap": 4.193389882232054,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "wIIBULLfhZnB7u3oqgANz",
			"type": "arrow",
			"x": 398.9961079112413,
			"y": 65.54366447766051,
			"width": 273.5419012581578,
			"height": 29.022490153692104,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0t",
			"roundness": {
				"type": 2
			},
			"seed": 95291731,
			"version": 312,
			"versionNonce": 207231059,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "vq11xmsW"
				}
			],
			"updated": 1738273633356,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					273.5419012581578,
					-29.022490153692104
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "wKMg0eB7RYnYc8XrEIAHm",
				"focus": -0.3842058845563665,
				"gap": 10.239482487678725,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "1A32W-bXcYIsh_d2HWdV_",
				"focus": -0.3286798130126865,
				"gap": 6.561375232727414,
				"fixedPoint": null
			},
			"startArrowhead": "arrow",
			"endArrowhead": null,
			"elbowed": false
		},
		{
			"id": "vq11xmsW",
			"type": "text",
			"x": 504.8870841750859,
			"y": 38.53241940081446,
			"width": 61.75994873046875,
			"height": 25,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0u",
			"roundness": null,
			"seed": 476538611,
			"version": 20,
			"versionNonce": 1194272051,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"text": "Polling",
			"rawText": "Polling",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "wIIBULLfhZnB7u3oqgANz",
			"originalText": "Polling",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"id": "KiSZV79zsx-Eat7CDcrTc",
			"type": "arrow",
			"x": -469.10954593305223,
			"y": 217.69592817962553,
			"width": 218.3626458486276,
			"height": 25.80416411117551,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0v",
			"roundness": {
				"type": 2
			},
			"seed": 2070155411,
			"version": 311,
			"versionNonce": 1328346419,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633357,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					218.3626458486276,
					-25.80416411117551
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "VMQxihTzhYJHZYYCVZUyn",
				"focus": 0.08999522519371103,
				"gap": 2.6554768150393784,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "PHw_979K4wjQ0-83ubtOI",
				"focus": 0.3575972307477515,
				"gap": 5.595541116555523,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "PiEaARvd6nBPCv07MzPhf",
			"type": "arrow",
			"x": 57.94443129005708,
			"y": 185.21034499191774,
			"width": 269.1645418596122,
			"height": 119.66668051425722,
			"angle": 0,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0w",
			"roundness": {
				"type": 2
			},
			"seed": 1415218739,
			"version": 509,
			"versionNonce": 1273390963,
			"isDeleted": false,
			"boundElements": [
				{
					"type": "text",
					"id": "ZVOcNv1d"
				}
			],
			"updated": 1738273633356,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					269.1645418596122,
					-119.66668051425722
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "drPKrdFZNhQhlS1-u0OZ2",
				"focus": -3.162478473253181,
				"gap": 14,
				"fixedPoint": null
			},
			"endBinding": {
				"elementId": "RMzO5RfNj6OfVlHhu_bKu",
				"focus": -2.7383680828872112,
				"gap": 13.53689436793049,
				"fixedPoint": null
			},
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"elbowed": false
		},
		{
			"id": "ZVOcNv1d",
			"type": "text",
			"x": 108.83677607240224,
			"y": 112.87700473478912,
			"width": 167.37985229492188,
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
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"index": "b0x",
			"roundness": null,
			"seed": 1580287955,
			"version": 34,
			"versionNonce": 1628352019,
			"isDeleted": false,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"text": "Sending message ",
			"rawText": "Sending message ",
			"fontSize": 20,
			"fontFamily": 5,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "PiEaARvd6nBPCv07MzPhf",
			"originalText": "Sending message ",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "rectangle",
			"version": 1863,
			"versionNonce": 903181235,
			"index": "b0y",
			"isDeleted": false,
			"id": "NFlzLqKNU4ywoJYQyTSo4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -35.14681445563929,
			"y": 147.80024745933497,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 111.38102955495731,
			"height": 111.38102955495731,
			"seed": 788452723,
			"groupIds": [
				"aIjTIGv1ZWQiwuTLDHZz9",
				"paVqfk887dmzMHrVLEN1n",
				"gQsQ207tXDr60Cr8E4mLE",
				"IopCQPSPmy_WstXFsTa3T",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "aHFfskHLmr0bCuCWUvBKt",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1631,
			"versionNonce": 767320819,
			"index": "b0z",
			"isDeleted": false,
			"id": "_rtdpLcWGSYXhMXnT11WI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -18.572519812565133,
			"y": 199.078174669904,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.158442686061253,
			"height": 10.158442686061253,
			"seed": 1443475219,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "nd-trjzv8mqwDHifbmLHo",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1724,
			"versionNonce": 429949491,
			"index": "b10",
			"isDeleted": false,
			"id": "drPKrdFZNhQhlS1-u0OZ2",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 49.98298348142407,
			"y": 198.99138498475781,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.158442686061253,
			"height": 10.158442686061253,
			"seed": 902321331,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "PiEaARvd6nBPCv07MzPhf",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1768,
			"versionNonce": 536203635,
			"index": "b11",
			"isDeleted": false,
			"id": "6tFgwIPCAInH9UVlkpZR5",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 44.55927662472095,
			"y": 180.8210016227613,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.158442686061253,
			"height": 10.158442686061253,
			"seed": 501302867,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1843,
			"versionNonce": 113322771,
			"index": "b12",
			"isDeleted": false,
			"id": "Yb1HJAUTCIMTUtfLoLEWG",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 44.61295040361392,
			"y": 218.99159758675341,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.158442686061253,
			"height": 10.158442686061253,
			"seed": 623576051,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "vSTJIa_3VQbkWKUKc88cE",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1748,
			"versionNonce": 1810481747,
			"index": "b13",
			"isDeleted": false,
			"id": "qRZLApNgEfIjb1fO8lGhf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 23.579326355544254,
			"y": 204.2187431435973,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.93573751130497,
			"height": 0,
			"seed": 1135349139,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					26.93573751130497,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1670,
			"versionNonce": 348389363,
			"index": "b14",
			"isDeleted": false,
			"id": "bJUyKwHYsN41xMlq771hA",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 37.09333623445946,
			"y": 185.18488944759065,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 0,
			"height": 40.109298773898956,
			"seed": 748348211,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					40.109298773898956
				]
			]
		},
		{
			"type": "line",
			"version": 1618,
			"versionNonce": 1321568659,
			"index": "b15",
			"isDeleted": false,
			"id": "UwUl7nOBwHv8suJKmOow9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 44.86099050761959,
			"y": 186.06734293958698,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.3224050601958,
			"height": 0,
			"seed": 1750992083,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					-7.3224050601958,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1630,
			"versionNonce": 254074675,
			"index": "b16",
			"isDeleted": false,
			"id": "Il-fSCaUpV-957X4_mpNb",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 44.80272786956493,
			"y": 224.46723214699114,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 7.3224050601958,
			"height": 0,
			"seed": 780923507,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					-7.3224050601958,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1800,
			"versionNonce": 1615364307,
			"index": "b17",
			"isDeleted": false,
			"id": "usQzUyCB09sqXI-gUr8Lc",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1.2317337116933231,
			"y": 190.35382676318704,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 23.17060106179336,
			"height": 7.3312367033661605,
			"seed": 2146118675,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1935,
			"versionNonce": 1002892915,
			"index": "b18",
			"isDeleted": false,
			"id": "UcdSnntUGpfaIf9PUpHJL",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1.883646766624679,
			"y": 195.25278434737925,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 22.77121871028257,
			"height": 25.278133405978252,
			"seed": 7483827,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					8.023338145654579,
					12.088933472947122
				],
				[
					8.622937949421834,
					24.7626284862338
				],
				[
					13.62810086544401,
					23.262111660150143
				],
				[
					13.313332839697328,
					12.340397953844917
				],
				[
					22.77121871028257,
					-0.5155049197444499
				]
			]
		},
		{
			"type": "line",
			"version": 1807,
			"versionNonce": 610707475,
			"index": "b19",
			"isDeleted": false,
			"id": "Hxflp0do18lsajdpjrZA1",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -8.253439998562953,
			"y": 204.0469801967265,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.660782069132503,
			"height": 0,
			"seed": 289899347,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					10.660782069132503,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1777,
			"versionNonce": 1977779,
			"index": "b1A",
			"isDeleted": false,
			"id": "h02QY-F6qlJmGu9rvPAHK",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -13.115980245712308,
			"y": 199.07364713982588,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 56.12901696265294,
			"height": 28.753225173298464,
			"seed": 717332723,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					4.1274840142583,
					-12.068834904502275
				],
				[
					12.793519305542539,
					-21.122921010824946
				],
				[
					22.35957707008295,
					-26.374657484010793
				],
				[
					34.621409217903356,
					-28.753225173298464
				],
				[
					48.2236247624932,
					-25.442942300206486
				],
				[
					56.12901696265294,
					-19.770352966374844
				]
			]
		},
		{
			"type": "line",
			"version": 1911,
			"versionNonce": 840171347,
			"index": "b1B",
			"isDeleted": false,
			"id": "rU0_uoDe8cVdlOoWiBZFC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -13.823301699080275,
			"y": 209.46697664331236,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 57.71623632862783,
			"height": 29.566310424010425,
			"seed": 1986464403,
			"groupIds": [
				"BY8maxU_2fthb-sFknyRP",
				"XBlVR4Re4p2rf4D-o33Fv",
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					4.244201229607745,
					12.410118068216459
				],
				[
					13.155295133796258,
					21.72023610929974
				],
				[
					22.991862395234058,
					27.120481469444723
				],
				[
					35.60043529321413,
					29.566310424010425
				],
				[
					49.58729502187909,
					26.162419193470697
				],
				[
					57.71623632862783,
					20.329420072810475
				]
			]
		},
		{
			"type": "text",
			"version": 2148,
			"versionNonce": 1956551923,
			"index": "b1C",
			"isDeleted": false,
			"id": "wvHEeZgx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -77.27396706707987,
			"y": 274.8385774264884,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 261.2261962890625,
			"height": 41.07421885761462,
			"seed": 686702643,
			"groupIds": [
				"hAJcigQ95RXWSU_goDcGu"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 34.22851571467885,
			"fontFamily": 1,
			"text": "SNS OrderTopic",
			"rawText": "SNS OrderTopic",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SNS OrderTopic",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1971,
			"versionNonce": 1933870739,
			"index": "b1D",
			"isDeleted": false,
			"id": "aRqAwgEembTc7Zfz0KZHE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 331.9963699347395,
			"y": 28.35597698705965,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 473809363,
			"groupIds": [
				"5Hg43g8WfFVy8JKjgDNUS",
				"up_87r5o1V3zvKohkwa0I",
				"ZuNZVNXLh3feJ5PP4C1bG",
				"DlBpuuLd2e2B02ZXbV8uS",
				"z5Why2O6rCAIEYp7GZTgL",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1673,
			"versionNonce": 616315955,
			"index": "b1E",
			"isDeleted": false,
			"id": "RMzO5RfNj6OfVlHhu_bKu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 340.1800214027676,
			"y": 57.46265149046508,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 694947699,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "PiEaARvd6nBPCv07MzPhf",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1728,
			"versionNonce": 1324026739,
			"index": "b1F",
			"isDeleted": false,
			"id": "wKMg0eB7RYnYc8XrEIAHm",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 381.2377884523871,
			"y": 57.389216396999245,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 1119856915,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "wIIBULLfhZnB7u3oqgANz",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2344,
			"versionNonce": 614402739,
			"index": "b1G",
			"isDeleted": false,
			"id": "-4tn_MQyrHJwzUrRlJOkK",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 357.1612427488103,
			"y": 53.78225623597086,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1303318195,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2417,
			"versionNonce": 745618515,
			"index": "b1H",
			"isDeleted": false,
			"id": "VdBM51xz85HvgReKiXPsJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5707963267948957,
			"x": 363.7227384675484,
			"y": 47.85509720288269,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1021362259,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2448,
			"versionNonce": 172767731,
			"index": "b1I",
			"isDeleted": false,
			"id": "BHSh6H6BmpMxy0R1b_oCZ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 369.6571423657965,
			"y": 54.373942301906254,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1781218803,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2534,
			"versionNonce": 456557459,
			"index": "b1J",
			"isDeleted": false,
			"id": "r4rZaN3iRUvq2Gzu7Wimj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.71238898038469,
			"x": 363.1047409398275,
			"y": 60.32195622111635,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 815073171,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 1946,
			"versionNonce": 1466341683,
			"index": "b1K",
			"isDeleted": false,
			"id": "NW8xQOi4iiTGvU0vRQuz9",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 350.3246970817331,
			"y": 61.536376280232844,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 1179950387,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1962,
			"versionNonce": 1816328915,
			"index": "b1L",
			"isDeleted": false,
			"id": "b33TqKUg45EYrwqBoqoQW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 372.918545708671,
			"y": 61.659246741869765,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 1456504531,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1937,
			"versionNonce": 375531635,
			"index": "b1M",
			"isDeleted": false,
			"id": "CoNKOxKUJKaKoiHJa7aYY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 344.20341538596267,
			"y": 57.50647087298444,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 1553935475,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "line",
			"version": 2041,
			"versionNonce": 998941203,
			"index": "b1N",
			"isDeleted": false,
			"id": "u13xRzC5JeW8AeXI5oRkf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 343.9497580129514,
			"y": 82.19405454513549,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 998712851,
			"groupIds": [
				"uywwzUq_kd0yWayEiqDf5",
				"T854HrMDFkNM6KXFqy7ou",
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633306,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "text",
			"version": 2116,
			"versionNonce": 1152575411,
			"index": "b1O",
			"isDeleted": false,
			"id": "YO8vFNLw",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 345.03679046696516,
			"y": 97.59174454959725,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.41996765136719,
			"height": 24,
			"seed": 444525491,
			"groupIds": [
				"Dxcx2uPkksEGSrm-HT6Fn"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "SQS",
			"rawText": "SQS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SQS",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1845,
			"versionNonce": 939620691,
			"index": "b1P",
			"isDeleted": false,
			"id": "Wk4xVkDxqr0YeV8CtC4g1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -25.321434487702618,
			"y": 416.04871633503353,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 99.73810927168931,
			"height": 99.73810927168931,
			"seed": 2108489043,
			"groupIds": [
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "WPPcHCtpQJN2Uhhbv_NX_",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2056,
			"versionNonce": 1671135379,
			"index": "b1Q",
			"isDeleted": false,
			"id": "b7WnByeSHioUqbMiCp2Gf",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2.6574488196717994,
			"y": 466.2747708457973,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 44.85305360714792,
			"height": 39.145543668098554,
			"seed": 543677171,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					11.196212818396406,
					-19.50864110055188
				],
				[
					33.526792184489096,
					-19.37778383689235
				],
				[
					44.85305360714792,
					0.10930649072348875
				],
				[
					33.86820818199925,
					19.139334440431597
				],
				[
					11.341658297582045,
					19.636902567546677
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1840,
			"versionNonce": 606336563,
			"index": "b1R",
			"isDeleted": false,
			"id": "pkJX8iuD2iS4_vCws1Vqa",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2.2464315078420896,
			"y": 430.5312855649204,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.061615164520074,
			"height": 10.061615164520074,
			"seed": 255198355,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1901,
			"versionNonce": 1397536723,
			"index": "b1S",
			"isDeleted": false,
			"id": "s1CMBajafy0Qsp8vrCc-8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 10.085325020166465,
			"y": 440.02525013566435,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.7459690989725103,
			"height": 6.4208283933451575,
			"seed": 30276147,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					3.7459690989725103,
					6.4208283933451575
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1962,
			"versionNonce": 1328301427,
			"index": "b1T",
			"isDeleted": false,
			"id": "2HACY9qApjo2BrGfhAdtC",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 37.82145686308854,
			"y": 491.2426412123157,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.061615164520074,
			"height": 10.061615164520074,
			"seed": 1964391379,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2030,
			"versionNonce": 1862868755,
			"index": "b1U",
			"isDeleted": false,
			"id": "2wUuydX4spcwn7njp9ubC",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 36.29820941630783,
			"y": 485.38946341274686,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 3.7459690989725103,
			"height": 6.4208283933451575,
			"seed": 86329715,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					3.7459690989725103,
					6.4208283933451575
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1973,
			"versionNonce": 1566164147,
			"index": "b1V",
			"isDeleted": false,
			"id": "zfZgjbJ39pyCXdptZNN5e",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 46.49711472999229,
			"y": 445.27181613169955,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.061615164520074,
			"height": 10.061615164520074,
			"seed": 121742099,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 2061,
			"versionNonce": 834975315,
			"index": "b1W",
			"isDeleted": false,
			"id": "crb-2X4WZjloWoNP7_sfQ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -7.110380385836606,
			"y": 476.72346700398884,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 10.061615164520074,
			"height": 10.061615164520074,
			"seed": 1675741363,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1867,
			"versionNonce": 1260418035,
			"index": "b1X",
			"isDeleted": false,
			"id": "iIlPUwygSN9o1p0ZI6oIE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 25.19544932115309,
			"y": 437.3091168656572,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 22.939548411770073,
			"height": 8.970628511936326,
			"seed": 816593491,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					16.912189421334713,
					-0.06001061386837484
				],
				[
					22.939548411770073,
					8.910617898067951
				]
			]
		},
		{
			"type": "line",
			"version": 1855,
			"versionNonce": 1769176467,
			"index": "b1Y",
			"isDeleted": false,
			"id": "3tuVK53P6F3qWwr64iDvW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 51.086927996567965,
			"y": 481.3878467535826,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.262396525249063,
			"height": 27.144884567932603,
			"seed": 175601651,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					8.262396525249063,
					-14.9526297967811
				],
				[
					2.3312680030839594,
					-27.144884567932603
				]
			]
		},
		{
			"type": "line",
			"version": 2040,
			"versionNonce": 133452595,
			"index": "b1Z",
			"isDeleted": false,
			"id": "tJsQPQcTBA--Py4jj8sxN",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 0.9602425633604526,
			"y": 485.8422944803581,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 22.939548411770073,
			"height": 8.970628511936326,
			"seed": 793379219,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					16.912189421334713,
					-0.06001061386837484
				],
				[
					22.939548411770073,
					8.910617898067951
				]
			]
		},
		{
			"type": "line",
			"version": 2025,
			"versionNonce": 1997108435,
			"index": "b1a",
			"isDeleted": false,
			"id": "0AcTJj63u6EfMwWbfeFYC",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": -10.254084225533688,
			"y": 477.7590564445652,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.262396525249063,
			"height": 27.144884567932603,
			"seed": 1482315571,
			"groupIds": [
				"061PvQR7TFufuri0dZx6k",
				"5TjIc7jLFzFqofp-_-eDL",
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					8.262396525249063,
					-14.9526297967811
				],
				[
					2.3312680030839594,
					-27.144884567932603
				]
			]
		},
		{
			"type": "text",
			"version": 2761,
			"versionNonce": 910778995,
			"index": "b1b",
			"isDeleted": false,
			"id": "VmuTFAEX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -64.86089089739767,
			"y": 521.2569817965554,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 178.9850616455078,
			"height": 36.996625260222906,
			"seed": 1410267347,
			"groupIds": [
				"O-yW4HZfGX3LuE3gUQUl6"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 30.83052105018576,
			"fontFamily": 1,
			"text": "EventBridge",
			"rawText": "EventBridge",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "EventBridge",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2292,
			"versionNonce": 242916371,
			"index": "b1c",
			"isDeleted": false,
			"id": "1A32W-bXcYIsh_d2HWdV_",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 679.0993844021266,
			"y": -30.043491786598224,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 89.71595900456212,
			"height": 89.63004751551998,
			"seed": 1610507891,
			"groupIds": [
				"2TrohtC5i2GmJHIXNYMDo",
				"1zelS-IKlRzVN9IUcNhea",
				"PZM0GObzKSod83jPxuc5U"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "wIIBULLfhZnB7u3oqgANz",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1458,
			"versionNonce": 1991963475,
			"index": "b1d",
			"isDeleted": false,
			"id": "knsnSe0ikmU8kC60O11Vh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 713.8817311305309,
			"y": 7.169268089004618,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.87136084633906,
			"height": 37.43479694070029,
			"seed": 1122967571,
			"groupIds": [
				"gU9hkxQu4SB-gFfCPgAAD",
				"1zelS-IKlRzVN9IUcNhea",
				"PZM0GObzKSod83jPxuc5U"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					-17.71788340736501,
					35.44315495749986
				],
				[
					-0.7207462846264164,
					37.43479694070029
				],
				[
					9.153477438974049,
					18.345096422477248
				],
				[
					1.2516036327557503,
					0.784965813085287
				]
			]
		},
		{
			"type": "line",
			"version": 1457,
			"versionNonce": 1883705587,
			"index": "b1e",
			"isDeleted": false,
			"id": "PfXb-nYlyryFa5NcgkAIC",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 747.9619407610005,
			"y": 29.294448107828657,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.52285575046692,
			"height": 61.23846768750466,
			"seed": 651666867,
			"groupIds": [
				"gU9hkxQu4SB-gFfCPgAAD",
				"1zelS-IKlRzVN9IUcNhea",
				"PZM0GObzKSod83jPxuc5U"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					-20.82125062063946,
					-45.12161641883866
				],
				[
					-40.60434929806802,
					-45.928850765628496
				],
				[
					-42.00148823695817,
					-32.01240898364306
				],
				[
					-31.868072977227005,
					-30.61923384375233
				],
				[
					-10.948412974083748,
					14.505166141799394
				],
				[
					5.13531705179845,
					15.309616921876165
				],
				[
					6.521367513508751,
					1.391783356534197
				],
				[
					5.13531705179845,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1801,
			"versionNonce": 1237219987,
			"index": "b1f",
			"isDeleted": false,
			"id": "EVUVJXgv",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 673.0258897860065,
			"y": 66.49453999162097,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 101.8167724609375,
			"height": 33.40280055682072,
			"seed": 853440339,
			"groupIds": [
				"PZM0GObzKSod83jPxuc5U"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 27.835667130683937,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2363,
			"versionNonce": 2144841779,
			"index": "b1g",
			"isDeleted": false,
			"id": "CRyvBRFqenkCwIE-Vgy8z",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 678.5865140205619,
			"y": 162.1795948271888,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 89.71595900456212,
			"height": 89.63004751551998,
			"seed": 1700402419,
			"groupIds": [
				"2zKDH2bXCKlYEcAFXpJKT",
				"TH8Q3yU5rvjQO2Kh7KFY6",
				"tPAQBpz2eQacBIvQCvIvO"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "wIIBULLfhZnB7u3oqgANz",
					"type": "arrow"
				},
				{
					"id": "jh5kmbY3CFhX9L8NYv_55",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1527,
			"versionNonce": 146374515,
			"index": "b1h",
			"isDeleted": false,
			"id": "TQx4khBBDdT2Ueg5Df5y4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 713.3688607489662,
			"y": 199.39235470279164,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.87136084633906,
			"height": 37.43479694070029,
			"seed": 768671379,
			"groupIds": [
				"3-potGorxG4Zpga-pazS-",
				"TH8Q3yU5rvjQO2Kh7KFY6",
				"tPAQBpz2eQacBIvQCvIvO"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					-17.71788340736501,
					35.44315495749986
				],
				[
					-0.7207462846264164,
					37.43479694070029
				],
				[
					9.153477438974049,
					18.345096422477248
				],
				[
					1.2516036327557503,
					0.784965813085287
				]
			]
		},
		{
			"type": "line",
			"version": 1526,
			"versionNonce": 920590611,
			"index": "b1i",
			"isDeleted": false,
			"id": "zneW1rQyriPat09vLLCLR",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 747.4490703794359,
			"y": 221.51753472161545,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.52285575046692,
			"height": 61.23846768750466,
			"seed": 1190769715,
			"groupIds": [
				"3-potGorxG4Zpga-pazS-",
				"TH8Q3yU5rvjQO2Kh7KFY6",
				"tPAQBpz2eQacBIvQCvIvO"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					-20.82125062063946,
					-45.12161641883866
				],
				[
					-40.60434929806802,
					-45.928850765628496
				],
				[
					-42.00148823695817,
					-32.01240898364306
				],
				[
					-31.868072977227005,
					-30.61923384375233
				],
				[
					-10.948412974083748,
					14.505166141799394
				],
				[
					5.13531705179845,
					15.309616921876165
				],
				[
					6.521367513508751,
					1.391783356534197
				],
				[
					5.13531705179845,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1870,
			"versionNonce": 1818263219,
			"index": "b1j",
			"isDeleted": false,
			"id": "KJM57Puj",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 672.5130194044418,
			"y": 258.717626605408,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 101.8167724609375,
			"height": 33.40280055682072,
			"seed": 1354413523,
			"groupIds": [
				"tPAQBpz2eQacBIvQCvIvO"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 27.835667130683937,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2386,
			"versionNonce": 1675898963,
			"index": "b1k",
			"isDeleted": false,
			"id": "p5KoSjKgUKV8Us0PLSE-3",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 669.3129183210269,
			"y": 321.11192523268755,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 89.71595900456212,
			"height": 89.63004751551998,
			"seed": 707429235,
			"groupIds": [
				"GRs0o5J84lmoYsrIdxKJz",
				"wOYbohZ5okUwH-En5SLAt",
				"D5TjGQ8rkjHnpnCYZ0Qym"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "wIIBULLfhZnB7u3oqgANz",
					"type": "arrow"
				},
				{
					"id": "jh5kmbY3CFhX9L8NYv_55",
					"type": "arrow"
				},
				{
					"id": "chd08WEwOdRuqpL2efZ4p",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1548,
			"versionNonce": 561805203,
			"index": "b1l",
			"isDeleted": false,
			"id": "RVYU-Fw1wWOC96iGzvjuJ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 704.0952650494312,
			"y": 358.3246851082904,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.87136084633906,
			"height": 37.43479694070029,
			"seed": 193961235,
			"groupIds": [
				"UtmdsAdiaDeX7XLuuQJrv",
				"wOYbohZ5okUwH-En5SLAt",
				"D5TjGQ8rkjHnpnCYZ0Qym"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					-17.71788340736501,
					35.44315495749986
				],
				[
					-0.7207462846264164,
					37.43479694070029
				],
				[
					9.153477438974049,
					18.345096422477248
				],
				[
					1.2516036327557503,
					0.784965813085287
				]
			]
		},
		{
			"type": "line",
			"version": 1547,
			"versionNonce": 147721523,
			"index": "b1m",
			"isDeleted": false,
			"id": "dgLhO2Hc6nWZYyiwQ1Ilo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 738.1754746799008,
			"y": 380.44986512711444,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.52285575046692,
			"height": 61.23846768750466,
			"seed": 1616937651,
			"groupIds": [
				"UtmdsAdiaDeX7XLuuQJrv",
				"wOYbohZ5okUwH-En5SLAt",
				"D5TjGQ8rkjHnpnCYZ0Qym"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
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
					-20.82125062063946,
					-45.12161641883866
				],
				[
					-40.60434929806802,
					-45.928850765628496
				],
				[
					-42.00148823695817,
					-32.01240898364306
				],
				[
					-31.868072977227005,
					-30.61923384375233
				],
				[
					-10.948412974083748,
					14.505166141799394
				],
				[
					5.13531705179845,
					15.309616921876165
				],
				[
					6.521367513508751,
					1.391783356534197
				],
				[
					5.13531705179845,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1891,
			"versionNonce": 1755049683,
			"index": "b1n",
			"isDeleted": false,
			"id": "vDZSNT85",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 663.2394237049068,
			"y": 417.64995701090675,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 101.8167724609375,
			"height": 33.40280055682072,
			"seed": 1631827027,
			"groupIds": [
				"D5TjGQ8rkjHnpnCYZ0Qym"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633306,
			"link": null,
			"locked": false,
			"fontSize": 27.835667130683937,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 2373,
			"versionNonce": 58498163,
			"index": "b1o",
			"isDeleted": false,
			"id": "PHw_979K4wjQ0-83ubtOI",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -245.15135896786933,
			"y": 159.03591224929232,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 89.71595900456212,
			"height": 89.63004751551998,
			"seed": 1846522355,
			"groupIds": [
				"UwfxGHmNYyQQ75vphnRm2",
				"nXI8ZDHAcaemauGA54VWS",
				"3pj1GEYvT831yLn_3LQNK"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [
				{
					"id": "wIIBULLfhZnB7u3oqgANz",
					"type": "arrow"
				},
				{
					"id": "KiSZV79zsx-Eat7CDcrTc",
					"type": "arrow"
				},
				{
					"id": "PiEaARvd6nBPCv07MzPhf",
					"type": "arrow"
				},
				{
					"id": "nd-trjzv8mqwDHifbmLHo",
					"type": "arrow"
				},
				{
					"id": "WPPcHCtpQJN2Uhhbv_NX_",
					"type": "arrow"
				}
			],
			"updated": 1738273633306,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1534,
			"versionNonce": 1963805427,
			"index": "b1p",
			"isDeleted": false,
			"id": "kwVn5RIalrZ24E_QeAEeT",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -210.36901223946552,
			"y": 196.24867212489517,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 26.87136084633906,
			"height": 37.43479694070029,
			"seed": 667614099,
			"groupIds": [
				"Wq-5aY6jHEjFry-z6lgCV",
				"nXI8ZDHAcaemauGA54VWS",
				"3pj1GEYvT831yLn_3LQNK"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
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
					-17.71788340736501,
					35.44315495749986
				],
				[
					-0.7207462846264164,
					37.43479694070029
				],
				[
					9.153477438974049,
					18.345096422477248
				],
				[
					1.2516036327557503,
					0.784965813085287
				]
			]
		},
		{
			"type": "line",
			"version": 1533,
			"versionNonce": 229471379,
			"index": "b1q",
			"isDeleted": false,
			"id": "KTUMKW683iooahfF_stAT",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -176.28880260899587,
			"y": 218.37385214371898,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 48.52285575046692,
			"height": 61.23846768750466,
			"seed": 1252790579,
			"groupIds": [
				"Wq-5aY6jHEjFry-z6lgCV",
				"nXI8ZDHAcaemauGA54VWS",
				"3pj1GEYvT831yLn_3LQNK"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
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
					-20.82125062063946,
					-45.12161641883866
				],
				[
					-40.60434929806802,
					-45.928850765628496
				],
				[
					-42.00148823695817,
					-32.01240898364306
				],
				[
					-31.868072977227005,
					-30.61923384375233
				],
				[
					-10.948412974083748,
					14.505166141799394
				],
				[
					5.13531705179845,
					15.309616921876165
				],
				[
					6.521367513508751,
					1.391783356534197
				],
				[
					5.13531705179845,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1959,
			"versionNonce": 534211123,
			"index": "b1r",
			"isDeleted": false,
			"id": "sBZcQaSd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -333.25442581588095,
			"y": 264.7616476643491,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 196.9681396484375,
			"height": 33.40280055682072,
			"seed": 1209627347,
			"groupIds": [
				"3pj1GEYvT831yLn_3LQNK"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false,
			"fontSize": 27.835667130683937,
			"fontFamily": 1,
			"text": "Order Service ",
			"rawText": "Order Service ",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Order Service ",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "text",
			"version": 1126,
			"versionNonce": 1886497747,
			"index": "b1s",
			"isDeleted": false,
			"id": "MWGG2YDM",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -849.5601983005558,
			"y": 413.9087961401374,
			"strokeColor": "#000000",
			"backgroundColor": "white",
			"width": 102.43217468261719,
			"height": 55.05419336317897,
			"seed": 547987571,
			"groupIds": [
				"q2KlI0L_LIzMRyvVLT1j7"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false,
			"fontSize": 44.043354690543175,
			"fontFamily": 1,
			"text": "User",
			"rawText": "User",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "User",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "line",
			"version": 1435,
			"versionNonce": 1670560115,
			"index": "b1t",
			"isDeleted": false,
			"id": "GkYPLkcTU9K0TJP8UD-E5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -855.6981256817066,
			"y": 392.65143393718415,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 108.49952860432626,
			"height": 96.61571428937773,
			"seed": 2116229651,
			"groupIds": [
				"N0xWk8g7EhMic6QS4w5Uq",
				"q2KlI0L_LIzMRyvVLT1j7"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					12.15194720368453,
					-64.0224612760937
				],
				[
					52.0797737300766,
					-96.61571428937773
				],
				[
					92.00760025646866,
					-71.00672977894018
				],
				[
					108.49952860432626,
					-6.6479213090370735
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1172,
			"versionNonce": 377557779,
			"index": "b1u",
			"isDeleted": false,
			"id": "Lcex2qLKC7CXNjPp9f0MF",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -828.2726131560034,
			"y": 245.78656032136223,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 55.5517586454151,
			"height": 48.60778881473838,
			"seed": 226254771,
			"groupIds": [
				"N0xWk8g7EhMic6QS4w5Uq",
				"q2KlI0L_LIzMRyvVLT1j7"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1150,
			"versionNonce": 968046771,
			"index": "b1v",
			"isDeleted": false,
			"id": "LavnfBlV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -859.3098711965981,
			"y": 30.13376423219188,
			"strokeColor": "#000000",
			"backgroundColor": "white",
			"width": 102.43217468261719,
			"height": 55.05419336317897,
			"seed": 417067347,
			"groupIds": [
				"ILxlgd5ZxgUvQJr7CTmMm"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false,
			"fontSize": 44.043354690543175,
			"fontFamily": 1,
			"text": "User",
			"rawText": "User",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "User",
			"autoResize": true,
			"lineHeight": 1.25
		},
		{
			"type": "line",
			"version": 1459,
			"versionNonce": 718252627,
			"index": "b1w",
			"isDeleted": false,
			"id": "laI2FnaHJKBWnhX5qZInj",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -865.4477985777489,
			"y": 8.876402029238761,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 108.49952860432626,
			"height": 96.61571428937773,
			"seed": 1637371635,
			"groupIds": [
				"st4UJKZTnWQTcqPy9jgg8",
				"ILxlgd5ZxgUvQJr7CTmMm"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					12.15194720368453,
					-64.0224612760937
				],
				[
					52.0797737300766,
					-96.61571428937773
				],
				[
					92.00760025646866,
					-71.00672977894018
				],
				[
					108.49952860432626,
					-6.6479213090370735
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1196,
			"versionNonce": 1319954419,
			"index": "b1x",
			"isDeleted": false,
			"id": "jaExUhD0vonkb6BLWLrXr",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -838.0222860520457,
			"y": -137.98847158658327,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 55.5517586454151,
			"height": 48.60778881473838,
			"seed": 976746643,
			"groupIds": [
				"st4UJKZTnWQTcqPy9jgg8",
				"ILxlgd5ZxgUvQJr7CTmMm"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1975,
			"versionNonce": 726757779,
			"index": "b1y",
			"isDeleted": false,
			"id": "07Mv5S6T744kuV93YsvFP",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 329.90290699177467,
			"y": 162.70005021953648,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 1618046515,
			"groupIds": [
				"PlK1eCcvPtK9kv0zioJpb",
				"AG-qeWLjPoIjQAaTN1k-t",
				"AaEu7qTWpmTTH-K-W9E6f",
				"kNch_cZIA8q8LKT--vMcz",
				"K3PQQFWtOZUWicAu2kEHt",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1677,
			"versionNonce": 1106495283,
			"index": "b1z",
			"isDeleted": false,
			"id": "I797kINX2ffE2EtWqlLuy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 338.08655845980275,
			"y": 191.8067247229419,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 388706259,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "aHFfskHLmr0bCuCWUvBKt",
					"type": "arrow"
				}
			],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1732,
			"versionNonce": 1711003251,
			"index": "b20",
			"isDeleted": false,
			"id": "XK-MGRsSmzww45-V24Ddg",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 379.1443255094223,
			"y": 191.73328962947608,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 8109427,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "jh5kmbY3CFhX9L8NYv_55",
					"type": "arrow"
				}
			],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2348,
			"versionNonce": 3741107,
			"index": "b21",
			"isDeleted": false,
			"id": "BFf4ejS7OZHnpIaZDd-uq",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 355.0677798058455,
			"y": 188.1263294684477,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 933861139,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2421,
			"versionNonce": 1049749331,
			"index": "b22",
			"isDeleted": false,
			"id": "OQCJy0DD-vM0y-yDy3_Ag",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5707963267948957,
			"x": 361.6292755245836,
			"y": 182.19917043535952,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 724253875,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2452,
			"versionNonce": 153060595,
			"index": "b23",
			"isDeleted": false,
			"id": "eHeahJNJ7FeTrc8baNMr7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 367.5636794228317,
			"y": 188.71801553438308,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 916926035,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2538,
			"versionNonce": 392720019,
			"index": "b24",
			"isDeleted": false,
			"id": "x7XcPfrc1GuiAP-kNRIAu",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.71238898038469,
			"x": 361.01127799686356,
			"y": 194.66602945359318,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 2096360435,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 1950,
			"versionNonce": 1814242355,
			"index": "b25",
			"isDeleted": false,
			"id": "Ht_nZOXSAWAWkBzdTOlZz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 348.2312341387683,
			"y": 195.88044951270967,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 35124627,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1966,
			"versionNonce": 1865819603,
			"index": "b26",
			"isDeleted": false,
			"id": "VE9d2SfC8LlvC22m-spaR",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 370.82508276570616,
			"y": 196.0033199743466,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 88722227,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1941,
			"versionNonce": 1203237747,
			"index": "b27",
			"isDeleted": false,
			"id": "kEwMyYonbUmrpm9ROBK3c",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 342.10995244299875,
			"y": 191.85054410546127,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 451931347,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "line",
			"version": 2045,
			"versionNonce": 1978600723,
			"index": "b28",
			"isDeleted": false,
			"id": "yifCBB1u_LAQuQinO7LTj",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 341.8562950699866,
			"y": 216.53812777761232,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 111204979,
			"groupIds": [
				"5ZUbHyL9dRZztu2RZfD5M",
				"sZZFntDw6hwererv_uK2j",
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "text",
			"version": 2120,
			"versionNonce": 760345267,
			"index": "b29",
			"isDeleted": false,
			"id": "Q3rVOsby",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 342.94332752400123,
			"y": 231.93581778207408,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.41996765136719,
			"height": 24,
			"seed": 1428362259,
			"groupIds": [
				"LCb3ke80tO5vELdQ1tI7S"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "SQS",
			"rawText": "SQS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SQS",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "rectangle",
			"version": 1991,
			"versionNonce": 1854350419,
			"index": "b2A",
			"isDeleted": false,
			"id": "pk5pxbGYc1ScS4PvPDGhn",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 332.3397590175905,
			"y": 299.1637636652331,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 65.08084106445301,
			"height": 65.08084106445301,
			"seed": 913119667,
			"groupIds": [
				"bFy_4b3TKsdKPj0g4QVg2",
				"BiCCabckj8qoOHHa970c7",
				"1jH3bUo744-NUcUb6RwuV",
				"F28Ac1d7GA32WBqA4XRIe",
				"_GmFWTaCOxXAhg2IKOSV8",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1693,
			"versionNonce": 1634017779,
			"index": "b2B",
			"isDeleted": false,
			"id": "-iaxJLf3yqEpRVZ41xxpx",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 340.52341048561857,
			"y": 328.2704381686385,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 396716883,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "vSTJIa_3VQbkWKUKc88cE",
					"type": "arrow"
				}
			],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "ellipse",
			"version": 1748,
			"versionNonce": 459637043,
			"index": "b2C",
			"isDeleted": false,
			"id": "DbB1_f5TLwwVr-pahaXmf",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 381.5811775352381,
			"y": 328.1970030751727,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 8.117920455804926,
			"height": 8.117920455804926,
			"seed": 2099415283,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "chd08WEwOdRuqpL2efZ4p",
					"type": "arrow"
				}
			],
			"updated": 1738273633307,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2364,
			"versionNonce": 1170673779,
			"index": "b2D",
			"isDeleted": false,
			"id": "hbr0pgornCR3vBNRcikpi",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 357.5046318316613,
			"y": 324.5900429141443,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 476770963,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2437,
			"versionNonce": 2115144211,
			"index": "b2E",
			"isDeleted": false,
			"id": "mOBaKgNexlvyKwfRd336F",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5707963267948957,
			"x": 364.0661275503994,
			"y": 318.66288388105613,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 909453363,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2468,
			"versionNonce": 1040043955,
			"index": "b2F",
			"isDeleted": false,
			"id": "uHYN705MJpJ6GJtTUNNxS",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 370.0005314486475,
			"y": 325.1817289800797,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 812100051,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 2554,
			"versionNonce": 397369683,
			"index": "b2G",
			"isDeleted": false,
			"id": "R5Oc-6t4SuEnTiPGjWDEC",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.71238898038469,
			"x": 363.4481300226794,
			"y": 331.1297428992898,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2.6587160660160247,
			"height": 14.901485256991352,
			"seed": 1880684403,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					1.534250496037679,
					3.516089644932923
				],
				[
					2.0434697529165025,
					7.61467595931855
				],
				[
					1.302129499685611,
					11.595258942488735
				],
				[
					-0.615246313099522,
					14.901485256991352
				]
			]
		},
		{
			"type": "line",
			"version": 1966,
			"versionNonce": 343785203,
			"index": "b2H",
			"isDeleted": false,
			"id": "9lPdvcWHZvMo0nFtWCloJ",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 350.6680861645841,
			"y": 332.3441629584063,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 1938788627,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1982,
			"versionNonce": 1324312723,
			"index": "b2I",
			"isDeleted": false,
			"id": "pn4fWdgiuPs2Iotp4mZDX",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 373.261934791522,
			"y": 332.4670334200432,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.842473884372846,
			"height": 5.167099126652263,
			"seed": 742520499,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
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
					5.816503304871627,
					-0.053670945826642225
				],
				[
					3.254730628247874,
					-2.532485186304994
				],
				[
					5.842473884372846,
					-0.04842214250790278
				],
				[
					3.0350803951419567,
					2.6346139403472693
				]
			]
		},
		{
			"type": "line",
			"version": 1957,
			"versionNonce": 1287314995,
			"index": "b2J",
			"isDeleted": false,
			"id": "-c_QIoizvYl0A52E_ZF_f",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 344.54680446881457,
			"y": 328.3142575511579,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 416720979,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "line",
			"version": 2061,
			"versionNonce": 415670227,
			"index": "b2K",
			"isDeleted": false,
			"id": "hBuzx2zsxUNZwY226qq4u",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 344.2931470958024,
			"y": 353.00184122330893,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 41.34963281275164,
			"height": 17.10905784483692,
			"seed": 522462707,
			"groupIds": [
				"Gnadn2bXITwK52Gb2sNO6",
				"JKIm7TjeolnAG67x3ttFn",
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1738273633307,
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
					2.559970698127005,
					-7.66093059073715
				],
				[
					8.271070731353255,
					-13.100012337621466
				],
				[
					15.09486779216366,
					-16.193976031908193
				],
				[
					21.94229008411606,
					-16.944786876248074
				],
				[
					29.75087123626803,
					-15.033447184450166
				],
				[
					35.47649450941106,
					-11.065217973307726
				],
				[
					39.57403120169017,
					-5.297544356691949
				],
				[
					41.34963281275164,
					0.16427096858884305
				]
			]
		},
		{
			"type": "text",
			"version": 2136,
			"versionNonce": 489237875,
			"index": "b2L",
			"isDeleted": false,
			"id": "WVfOQazT",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 345.38017954981706,
			"y": 368.3995312277707,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 38.41996765136719,
			"height": 24,
			"seed": 640741267,
			"groupIds": [
				"GCWxFow8Cd8FkEuLkoQyX"
			],
			"frameId": "5ScoxZ-0BJ3d6B5GMvEc7",
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633307,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "SQS",
			"rawText": "SQS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "SQS",
			"autoResize": true,
			"lineHeight": 1.2
		},
		{
			"type": "frame",
			"version": 395,
			"versionNonce": 659944947,
			"index": "b2M",
			"isDeleted": false,
			"id": "5ScoxZ-0BJ3d6B5GMvEc7",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -941.7235787525419,
			"y": -1687.2948361605713,
			"strokeColor": "#bbb",
			"backgroundColor": "transparent",
			"width": 1963.7752825050839,
			"height": 2483.9646723211426,
			"seed": 1882424627,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1738273633303,
			"link": null,
			"locked": false,
			"customData": {
				"frameColor": {
					"stroke": "#D4D4D4",
					"fill": "#ADADAD",
					"nameColor": "#7A7A7A"
				}
			},
			"name": "2 Backing Services"
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
		"currentItemFontFamily": 5,
		"currentItemFontSize": 20,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"currentItemArrowType": "round",
		"scrollX": 1889.2645089285716,
		"scrollY": 2066.5267857142862,
		"zoom": {
			"value": 0.35
		},
		"currentItemRoundness": "round",
		"gridSize": 20,
		"gridStep": 5,
		"gridModeEnabled": false,
		"gridColor": {
			"Bold": "rgba(217, 217, 217, 0.5)",
			"Regular": "rgba(230, 230, 230, 0.5)"
		},
		"currentStrokeOptions": null,
		"frameRendering": {
			"enabled": true,
			"clip": true,
			"name": true,
			"outline": true
		},
		"objectsSnapModeEnabled": false,
		"activeTool": {
			"type": "selection",
			"customType": null,
			"locked": false,
			"lastActiveTool": null
		}
	},
	"files": {}
}
```
%%