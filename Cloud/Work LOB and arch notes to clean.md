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
Create a ticket  
  

  
Create stories for work that doesn't have a ticket that you are doing  






When a agent or who ever initiate contract offer from Empath 

goes rules lab coming back with true or false 

Can only process one contract at a time which comes from a frontend through the exchange through the public API invoker getting things like contract id, contract info, and account id along with contract draft which gets sent to rules lab which determines contract eligibility if eligible we update the UCP(*Unified customer profile*) with the status to enroll and set the payments and publish to one stream for the eventual workflow and do a audit and send a response back to the client this is the immediate workflow. 

When comes to Payments still being decided were its being sent to.  

We just schedule when hooks fire


A hook is a event that is configured to fire in the future. Hooks manage the schedule invocations of business processes by capturing identification information to trigger events at specific future times  
  
  
Hooks are created when tasks are performed by business process automation when a decision is made to reevaluate the customer at a later time  
  
Hooks are deleted when tasks are performed by BPA in response to Broad exclusion where where we don't know when or if we will be able to engage with a customer in the future


One streams sends to aws and clodwatch logs are triggered for sqs repo


There is a list of actions associated with each contract which also has one offset we need to separate  those actions by the offset meaning immediate actions fired on the same day and eventual actions which are triggered by hooks based on offset date.

Data lambda => JSON => Enrollment Async Step Function

an offset is 


Does offset has to do with sending offers offers to people in delinquency depending on their level of delinquency




Delete colima and reinstall for broken localstack

Fms fuffilment management service  
  
AMA auditability monitoring and Analytics

For question use soc core slack channel



KT Knowledge Transfer  
  
  
5 bpa workflows



MVP Min Viable Product 

LLD Low Level Design



Lambda subscribe to things like sns when it comes to asynchronous process but there are more options now Like sqs  
  
  
  
A high level pattern that typically happens now is you have a publisher who sends things to SNS which can connect to multiple things and then that connects to a sqs  
  
  
Another common use case with aws lambda is glue Logic for step function workflows  
  
  

ByteMorphers team creates DMN,s using Rules lab that ends up getting used by AWS step functions

how is DMN,s accessed by AWS Step function

DMN Domain Model & Notation


Agent or customer enters empath or ease(maybe cap one mobile app) platforms which starts a process with an event through the exchange which is a internal digital asset manger and marketplace were capital one employees can publish, manage, find and use data. the exchange contains API's, streams, datasets and features that can be discovered and consumed by user. features can combine multiple datasets to produce calculated or relative datasets.

when you trigger event through the exchange you hit an API kicking off BFF Lambda. the customer account is locked then the enrollment synchronous workflow is started


UCP unified customer profile  provides data on enrollment contracts




There is a Data Lambda if event's `lifecycle_stage = READ ENROLLMENT`
an error gets triggered 


Send published events to onestream

then 


we have lambda that is a publisher sending published events to onestream which then sends the data to Qsink to BSE SQS(simple queue service)


at the same time eventbridge rules are process by DLQ Drainer Lambda which sends start message move task to the BSE SQS which then invokes event analyzer lambda which publishes data 







Qsink not lambda used to batch sqs message

It seems like you're describing a **"data sink"** solution, which is designed to consume and process data produced by streams. In this context, **Qsink** appears to be a tool or service that consumes **stream data**, processes it, and stores it as a **batch of JSON records**. This is similar to how data is handled in other data platforms like **OneLake**, **Snowflake**, or **Kafka**, where streams of data are consumed, transformed, and stored for further analysis or processing.

### **Qsink in Context with Stream Data**

Based on the description you provided, here's a breakdown of how **Qsink** could function in relation to stream data:

1. **Data Stream as Input**:
    
    - **Stream Sources**: Qsink consumes data from continuous streams (such as data produced by IoT devices, user activity logs, financial transactions, etc.).
    - Similar to **Kafka** (which ingests stream data), Qsink would pull data from these streams.
2. **Batch File Creation**:
    
    - Once Qsink ingests stream data, it processes the incoming records and groups them into **batch files**.
    - These batch files are often in formats like **JSON** for ease of processing, storage, or integration with other systems.
3. **Storage**:
    
    - **OneLake** and **Snowflake** are examples of data lakes and warehouses, which serve as storage for processed data. In the case of Qsink, it could store these batch files in a centralized data store for analytics, reporting, or machine learning purposes.
    - It might also make the processed data available for querying by other systems or users.
4. **Integration with Other Data Platforms**:
    
    - Similar to **Kafka** (which allows real-time stream processing), Qsink could integrate with downstream tools, enabling users to run queries, data transformations, or insights on the data stored in batch format.

### **Real-World Use Case**

Let's say you're collecting **financial transaction data** in real-time from different exchanges or banking systems. As transactions come in, Qsink could:

- Consume the data in **real-time** (from a stream),
- Organize the incoming stream into **batch JSON files** (e.g., daily or hourly),
- Store those batch files in a data warehouse like **Snowflake** or in a **data lake** (e.g., **OneLake**),
- Allow for further processing or querying by data analysts or machine learning models.

This allows companies to efficiently manage large streams of data by batching them into manageable chunks for further processing and analysis.



In data engineering and stream processing, a **"sink"** refers to a destination or end point where data is sent for storage, further processing, or consumption after being produced or generated by a source.

### **Key Characteristics of a Sink:**

- **Destination for Data**: A sink typically receives and stores data from a stream or data pipeline, making it the final destination in a data flow process.
- **Data Aggregation**: It may aggregate, batch, or transform the data before storing or forwarding it.
- **Types of Sinks**: Sinks can take many forms depending on the system or platform. Some common examples include databases, data lakes, message queues, or file storage systems (e.g., JSON files, Parquet files).
- **Integration with Data Sources**: A sink is often paired with a data **source** (e.g., a stream producer like Kafka, a sensor, or an API) that generates data, which then flows into the sink.

### **Examples of Data Sinks:**

1. **Databases**: Storing incoming data (e.g., financial transactions, logs) in relational databases (e.g., MySQL, PostgreSQL) or NoSQL databases (e.g., MongoDB, DynamoDB).
2. **Data Lakes**: For unstructured or large-scale data, sinks like **AWS S3**, **Azure Data Lake**, or **OneLake** serve as destinations to store and organize raw data before further analysis or transformation.
3. **Message Queues**: Sinks can also be message queues (e.g., **Apache Kafka**, **RabbitMQ**) where data is temporarily stored for later processing or forwarding to another service.
4. **File Systems**: Data can be batched into files (e.g., JSON, CSV, Parquet files) and stored in file systems or cloud storage services like **AWS S3** or **Google Cloud Storage**.
5. **Data Warehouses**: Processed data might be stored in a data warehouse like **Snowflake** or **BigQuery** for analytics and reporting.

### **Sink vs. Source**

In a typical data flow, the **source** produces data, while the **sink** consumes or stores that data.

- **Source**: Data producers like sensors, databases, or applications.
- **Sink**: Where the data is sent for storage or further processing (e.g., data warehouses, lakes, or file systems).

### **Use Case Example:**

Imagine you have a streaming data source, such as **IoT devices** that generate data on temperature readings every second. The data produced from the IoT devices is sent to a **data pipeline** (like **Apache Kafka**). From there, the data could be consumed by a **sink**, such as a **database** where it is stored for historical analysis, or a **data lake** for future processing.

### **In Summary**

A sink is simply the **endpoint** in a data flow where data is received, stored, or further processed. It plays a critical role in stream processing, batch processing, and data pipeline architectures.


  


