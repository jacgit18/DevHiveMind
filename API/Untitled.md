---
tags: 
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
### **Choosing between RESTful APIs and WebSocket APIs**

Using API Gateway, you can build and deploy both RESTful APIs and WebSocket APIs. Now that you have an introduction to these API types, this table compares a few features of each to help you choose the right API type.

|                                                                                                 |                                                                                   |                                                                                                                                       |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **REST API**                                                                                    | **HTTP API**                                                                      | **WebSocket API**                                                                                                                     |
| All-inclusive set of features needed to build, manage, and publish APIs at a single price point | Building modern APIs that are equipped with native OIDC and OAuth 2 authorization | Bidirectional communication that lets clients and services independently send messages to each other                                  |
| Building APIs that use certificates for backend authentication, AWS WAF, or resource policies   | Building proxy APIs for Lambda or any HTTP endpoint                               | Richer client-to-service interactions because services can push data to clients without requiring clients to make an explicit request |
| Workloads that need an edge-optimized or private API type                                       | APIs for latency-sensitive workloads                                              | APIs for real-time communication                                                                                                      |



WebSocket APIs offer APIs that the client can access through the WebSocket protocol. Unlike REST and HTTP APIs, WebSocket APIs allow bidirectional communications. WebSocket APIs are often used in real-time applications such as chat applications, collaboration platforms, multiplayer games, and financial trading platforms.

  

WebSocket APIs maintain a persistent connection between connected clients to facilitate real-time message communication. With WebSocket APIs in API Gateway, you can define backend integrations with Lambda functions, Amazon Kinesis, or any HTTP endpoint to be invoked when messages are received from the connected clients.

![WebSocket API Gateway architecture showing how API Gateway can be used with Amazon Elastic Container Service using WebSocket APIs.](https://explore.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1738958400/MmlZiMpAQnh0b8bS7TQZYg/tincan/914789_1645026071_p1fs1j2ru4ua0g4910qldke14j14_zip/assets/websocket-api-integration-with-ecs.png)