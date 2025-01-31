---
tags:
  - CapitalOne
  - career
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: "[[OneStream]]"
Peer Reviewed: 0
dg-publish:
---
Qsink not lambda


KT Knowledge Transfer  
  
  
5 bpa workflows





Lambda subscribe to things like sns when it comes to asynchronous process but there are more options now Like sqs  
  
  
  
A high level pattern that typically happens now is you have a publisher who sends things to SNS which can connect to multiple things and then that connects to a sqs  
  
  
Another common use case with aws lambda is glue Logic for step function workflows  
  
  
Running lambdas locally



They need a way to automate to publish data to onestream




ByteMorphers team creates DMN,s using Rules lab that ends up getting used by AWS step functions

how is DMN,s accessed by AWS Step function

DMN Domain Model & Notation


Agent or customer enters empath or ease(maybe cap one mobile app) platforms which starts a process with an event through the exchange which is a internal digital asset manger and marketplace were capital one employees can publish, manage, find and use data. the exchange contains API's, streams, datasets and features that can be discovered and consumed by user. features can combine multiple datasets to produce calculated or relative datasets.

when you trigger event through the exchange you hit an API kicking off BFF Lambda. the customer account is locked then the enrollment synchronous workflow is started











Using **AWS AppSync** as an intermediary between a **database** and an **exchange** (a data platform with APIs, streams, datasets, and features) allows for **real-time bidirectional data flow**, efficient API management, and seamless data synchronization.

### **Use Case: AWS AppSync as a Data Synchronization Layer Between a Database and an Exchange**

#### **Architecture Overview**

1. **Database (Storage Layer)** – Stores structured data, such as order books, user transactions, or financial records. (e.g., DynamoDB, RDS, or even a custom backend)
2. **AWS AppSync (GraphQL API Layer)** – Facilitates communication between the database and the exchange while providing real-time updates and offline sync.
3. **Exchange (Data Platform Layer)** – Provides APIs, data streams, and features for users to consume market data, execute trades, or retrieve analytics.

#### **How AWS AppSync Enhances This Setup:**

✅ **GraphQL API for Flexible Queries** – Users or applications interacting with the exchange can request only the data they need (e.g., specific trades, market prices, or account balances) without over-fetching.  
✅ **Real-time Data Streaming** – When the database updates (e.g., a trade is executed), AppSync can push real-time updates to the exchange via GraphQL subscriptions.  
✅ **Efficient Bidirectional Data Sync** – If the exchange provides new data (e.g., new market prices or liquidity metrics), AppSync can update the database and trigger updates to subscribed clients.  
✅ **Offline Support** – Traders or applications consuming the exchange's APIs can still query cached data when offline and sync when reconnected.  
✅ **Access Control & Security** – AWS AppSync integrates with IAM, Cognito, or API keys to control access, ensuring secure data exchange between the database and exchange.

#### **Example Flow:**

4. **A trade is executed on the exchange.**
    
    - The trade data is streamed into AWS AppSync.
    - AppSync updates the database.
    - Clients subscribed to price updates receive real-time notifications.
5. **A user queries market data from the exchange.**
    
    - The request goes through AWS AppSync.
    - AppSync fetches data from both the exchange API and the database.
    - It returns only the required data via GraphQL.

This architecture ensures **efficient data transfer, low latency, and scalable real-time communication** between the database and the exchange.

Would you like a more detailed breakdown of any part of this setup?


