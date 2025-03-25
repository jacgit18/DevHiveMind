
```javascript
let userInput = prompt("Please enter something:");  

console.log("User input:", userInput);
```



[Redis Demystified: A Simple Introduction for System Design 🧩 - DEV Community](https://dev.to/priya01/redis-demystified-a-simple-introduction-for-system-design-56mb)


Create a ticket  
  

  
Create stories for work that doesn't have a ticket that you are doing  
  
  
Local stock is a cloud service emulator that empowers developers to run AWS applications locally eliminating the need for a cloud connection by encapsulating these services within a single container local stock streamlined the testing and development process


One streams sends to aws and clodwatch logs are triggered for sqs repo


Security 4 ways - IAM, Network Security, Data Encryption, Application Security


```handwritten-ink
{
	"versionAtEmbed": "0.3.3",
	"filepath": "_NoteAssets/Images To Move/Ink/Writing/2025.2.2 - 8.42am.writing"
}
```
## Migration patterns  
While designing your application, it's critical for you to choose services and patterns that suit your workloads based on characteristics such as expected throughput, service limits, and cost. This helps you adopt serverless architectures in a way that is customized to what your solutions need to do and to the skills and organizational models you are working within.


As the name suggests, with the leapfrog pattern, you bypass interim steps and go straight from an on-premises legacy architecture to a serverless cloud architecture.


With the organic pattern, you move on-premises applications to the cloud in more of a _lift-and-shift_ model. In this model, existing applications are kept intact, either running on Amazon Elastic Compute Cloud (Amazon EC2) instances or with some limited rewrites to container services such as Amazon Elastic Kubernetes Service (Amazon EKS), Amazon Elastic Container Service (Amazon ECS), or AWS Fargate.

  

Developers experiment with Lambda in low-risk internal scenarios such as log processing or cron jobs. As you gain more experience, you might use serverless components for tasks such as data transformations and parallelization of processes.

  

At some point in the adoption curve, you take a more strategic look at how serverless and microservices might address business goals such as market agility, developer innovation, and total cost of ownership.

  

You get buy-in for a more long-term commitment to invest in modernizing your applications and select a production workload as a pilot. With initial success and lessons learned, adoption accelerates and more applications are migrated to microservices and serverless.


With the strangler pattern, an organization incrementally and systematically decomposes monolithic applications by creating APIs and building event-driven components that gradually replace components of the legacy application.

  

Distinct API endpoints can point to old compared to new components and safe deployment options (such as canary deployments) let you point back to the legacy version with very little risk.

  

New feature branches can be _serverless first_, and legacy components can be decommissioned as they are replaced. This pattern represents a more systematic approach to adopting serverless, allowing you to move to critical improvements where you see benefit quickly but with less risk and upheaval than the leapfrog pattern.


-   
    bullet
    
    What does this application do and how are its components organized?
    
- bullet
    
    How can you break your data needs up based on the command query responsibility segregation (CQRS) pattern?
    
- bullet
    
    How does the application scale and what components drive the capacity you need?
    
- bullet
    
    Do you have schedule-based tasks?
    
- bullet
    
    Do you have workers listening to a queue?
    
- bullet
    
    Where can you refactor or enhance functionality without impacting the current implementation?


For Aws lambda you need to define access permission and triggering events then the code dependencies and configuration which includes things like execution parameters memory timeout and concurrency


AWS Lambda supports different **Invocation Models** for running functions, depending on how the function is triggered and how it handles responses. The three main invocation models are:

---

### **1. Synchronous Invocation**

The caller **waits** for the function to complete and receives the response.

- **Use Case:** API requests, interactive applications, or real-time processing.
- **Examples:**
    - Amazon API Gateway invoking a Lambda function to return HTTP responses.
    - AWS SDK calling Lambda and waiting for a result.
- **Error Handling:** Errors are returned directly to the caller. The caller decides whether to retry.

The following AWS services invoke Lambda synchronously:

- Amazon API Gateway
- Amazon Cognito
- AWS CloudFormation
- Amazon Alexa
- Amazon Lex
- Amazon CloudFront


**Execution Flow:**

1. Caller triggers Lambda.
2. Lambda executes the function.
3. The function returns a response to the caller.

---

### **2. Asynchronous Invocation**

The caller **does not wait** for the function to complete. The request is queued, and Lambda executes it **later**.

- **Use Case:** Event-driven processing where an immediate response isn't needed.
- **Examples:**
    - S3 triggering Lambda when an object is uploaded.
    - EventBridge triggering Lambda on a scheduled event.
- **Error Handling:** Lambda automatically retries the function twice (total of three attempts). Unsuccessful executions can be sent to a **dead-letter queue (DLQ)** or **failure destination** for debugging.

The following AWS services invoke Lambda asynchronously: 

- Amazon SNS 
- Amazon S3
- Amazon EventBridge

**Execution Flow:**

4. Caller triggers Lambda.
5. Lambda **queues** the event.
6. Lambda processes the event **asynchronously**.

---

### **3. Event Source Mapping (Poll-Based Invocation)**

Lambda **polls a data stream or queue** and processes events automatically.

- **Use Case:** Continuous event processing from queues or streams.
- **Examples:**
    - Lambda reading messages from an **SQS queue**.
    - Lambda processing records from **Kinesis** or **DynamoDB Streams**.
- **Error Handling:**
    - For SQS, messages are returned to the queue after retry attempts.
    - For Kinesis/DynamoDB, errors cause retries for up to 24 hours before skipping records.

The configuration of services as event triggers is known as event source mapping. This process occurs when you configure event sources to launch your Lambda functions and then grant theses sources IAM permissions to access the Lambda function. 

  

Lambda reads events from the following services:

- Amazon DynamoDB
- Amazon Kinesis
- Amazon MQ
- Amazon Managed Streaming for Apache Kafka (MSK)
- self-managed Apache Kafka
- Amazon SQS


**Execution Flow:**

7. Lambda automatically polls the source.
8. Lambda retrieves and batches events.
9. The function processes each batch.

---

### **Comparison Summary**

|Invocation Model|Caller Waits?|Retried Automatically?|Example Use Case|
|---|---|---|---|
|**Synchronous**|Yes|No|API responses, interactive apps|
|**Asynchronous**|No|Yes (2 retries)|S3 events, SNS triggers|
|**Event Source Mapping**|No (Auto-Triggered)|Depends on source|SQS, Kinesis, DynamoDB|

Would you like any specific details on configuration or best practices?


Resource Based policies
Lambda resource-based (function) policy

- Associated with a "push" event source such as Amazon API Gateway
- Created when you add a trigger to a Lambda function
- Allows the event source to take the _lambda:InvokeFunction_ action



IAM execution role

- Role selected or created when you create a Lambda function
- IAM policy includes actions you can take with the resource
- Trust policy that allows Lambda to _AssumeRole_
- Creator must have permission for _iam:PassRole_



AWS SAM
an application framework that simplifies creation and deployment of your serverless applications. it an extension of AWS Cloud Formation  

You can install the AWS SAM CLI locally to help test your serverless applications, validate your AWS SAM templates, and streamline your deployments.



 If you allocate 10 GB to a function and the function only uses 2 GB, you are charged for the 10 GB. This is another reason to test your functions using different memory allocations to determine which is the most beneficial for the function and your budget.

It is important to analyze how long your function runs. When you analyze the duration, you can better determine any problems that might increase the invocation of the function beyond your expected length. Load testing your Lambda function is the best way to determine the optimum timeout value.

Your Lambda function is billed based on runtime in 1-ms increments. Avoiding lengthy timeouts for functions can prevent you from being billed while a function is simply waiting to time out.


## **Testing concurrency**

The most important factor for your concurrency, memory, and timeout settings is to verify application testing against real-world conditions. To do this, follow these suggestions:

- Run performance tests that simulate peak levels of invocations.
    - View the metrics for the amount of throttling that occurs during performance peaks.
- Determine whether the existing backend can handle the speed of requests sent to it.
    - Don't test in isolation. If you’re connecting to Amazon Relational Database Service (Amazon RDS), ensure that you test that the concurrency levels for your function can be processed by the database.
- Does your error handling work as expected? 
    - Tests should include pushing the application beyond the concurrency settings to verify correct error handling.



**The AWS CloudFormation template is considered the _blueprint_ for the Lambda function.**

The CloudFormation template specifies every detail of the Lambda function and the environment required for the Lambda function to run. CloudFormation provides a common language and format that all parts of AWS can read and understand.



**CloudFormation is infrastructure as code.**

The entire infrastructure needed for your Lambda function is written to a text file. This file (template) then deploys your desired stack. A stack is a collection of AWS resources that you can manage as a single unit. The template becomes the single source of truth for deploying identical stacks into any AWS account. Each time the Lambda function is invoked, it runs by using information provided in the CloudFormation template.



AWS X-Ray records how the Lambda functions are running.  

You can use X-Ray for:

- Tuning performance
- Identifying the call flow of Lambda functions and API calls
- Tracing path and timing of an invocation to locate bottlenecks and failures


## Three patterns for communicating status updates

In an architecture in the previous lesson, the client service submitted an order, and the SQS queue gave a response to API Gateway with the message ID. Then Lambda pulled the message from the queue and handed it off to Step Functions to complete the order process and update the job status as it moved through the workflow.

The next thing you need to consider is how to provide the status to the calling client. The method you choose depends on your use case. The next set of videos looks at three potential approaches:

- Client polling
    
- Webhooks with Amazon Simple Notification Service (Amazon SNS)
    
- WebSockets with AWS AppSync


Another serverless data processing pattern you can use is messaging, instead of streaming. Amazon Simple Notification Service (Amazon SNS) uses a publication/subscription, or pub/sub, model, which means that a single published message can have multiple consumers. To learn more, choose the play button.


To architect serverless applications, you need to understand migration strategies, the types of compute and data stores you can select, and different application architecture patterns you can use.


### Considerations for choosing Fargate or Lambda for serverless compute

When selecting to use either Fargate or Lambda for your serverless compute, consider the differences between the two and the needs of your workload.

|   |   |
|---|---|
|AWS Fargate|AWS Lambda|
|- Lift and shift with minimal rework<br>- Longer-running processes or larger deployment packages<br>- Predictable, consistent workload<br>- Need more than 3 GB of memory<br>- Application with a non-HTTP/S listener<br>- Run side cars with your service (agents only supported as side cars)<br>- Container image portability with Docker runtime|- Tasks that run less than 15 minutes<br>- Spiky, unpredictable workloads<br>- Unknown demand<br>- Lighter-weight, application-focused stateless computing<br>- Simplified IT automation<br>- Real-time data processing<br>- Reduced complexity for development and operations|


fargate serverless way of running containers 


Event source to resource based policy to lambda function to execution role policy to Other AWS resources  
  
With Lambda functions, there are two sides that define the necessary scope of permissions – permission to invoke the function, and permission of the Lambda function itself to act upon other services.  
  
  
IAM policy vs Trust policy

Sam server-less application model


Cloud 9 dev environment can practice dev in it as if you're doing it locally in vs code


Sources of events in AWS can be storage related like S3 Amazon kinesis dynamodb then you can have endpoints services like AWS iot core AWS step functions AWS API Gateway Amazon Alexa then you have a repository related services like cloud formation cloud trail Cloud watch code commit and then other services like Crown events SNS sqs SES that can give out events and you can use those events to trigger something with a hook or something or Lambda


## **Best practices for serverless applications**

By using the event-driven patterns found in this module, you can start creating your own serverless applications. You can use the [Serverless Patterns Collection](https://serverlessland.com/patterns) and the [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/) to help jump-start your work to reduce undifferentiated heavy lifting. Reference [The Amazon Builders' Library](https://aws.amazon.com/builders-library/) for articles written by senior technical leaders who have deep expertise in how Amazon and AWS design and build their own systems.

This course doesn’t mention every possible pattern, but hopefully it illustrates the variety of ways you can apply event-driven approaches to your workloads. Here are key best practices:

- bullet
    
    **Don’t reinvent the wheel.**  
    Use managed services when possible and use the AWS Serverless Application Repository and Serverless Patterns Collection.
    
- bullet
    
    **Don’t just port your code.**   
    You can easily copy code from other applications and run it in Lambda. But if you don’t apply event-driven thinking, you’re going to miss out on some of the benefits. It’s OK to start here, but revisit and iterate.
    
- bullet
    
    **Stay current.**  
    Services and available serverless applications evolve quickly. There might be an easier way to do something.
    
- **Prefer idempotent, stateless functions.

- **When you can’t, use Step Functions where you need stateful control (retries, long-running).
    
- **Keep events inside AWS services for as long as possible.**  
    Let AWS services talk directly to each other whenever possible rather than writing code to do it.
    
- **Verify the limits of all of the services involved.**  
    You can use AWS Service Quotas console to view and request increases for most AWS quotas.



## 

**Scaling considerations  
**

There are lots of ways to connect managed services and serverless applications to create more complex serverless architectures.

To successfully scale your serverless architecture, you need to know the capabilities and service limits of the services that you’re integrating. Also, select patterns that optimize your application for the scale you need to support. Key considerations include the following:

- bullet
    
    Timeouts
    
- bullet
    
    Retry behaviors
    
- bullet
    
    Throughput
    
- bullet
    
    Payload size
    

As we review scaling considerations for different AWS services in this lesson, contemplate how each of these considerations will affect the scaling of the service.


Throttling logic 

Throttling the number of requests that can hit the endpoint might help reduce the number of failures on the backend. You might also need to introduce additional error handling on the frontend.
### 

Best practices for testing load

- bullet
    
    Use authentic data and access patterns.
    
- bullet
    
    Address issues at each integration point end to end, and iterate.
    
- bullet
    
    Remember the business drivers, and make trade-offs that support them.
    
- bullet
    
    Know your "error budget," and validate your failure management mechanisms.
    

**The best tip for serverless load testing is that no tip or best practice is going to apply 100 percent to all situations. You need to dive deep into the specifics of your workload. Test it and monitor it under conditions that are like production.**

### 

Testing tips

- ****Watch service limits.**** Service limits are in place to protect customers from unauthorized use of services. Limits that are not properly monitored might result in a degradation or throttling of service and additional cost. Many limits are soft limits. You can request limit increases.
- ****Use all of the monitoring tools available to you while testing and when you go into production.**** Managed services have built-in logging and metrics that you can monitor and alarm on in Amazon CloudWatch.
- ****Don’t try to mock services you can’t control.**** Perform your integration and load tests using the services in an AWS environment that will be the same as the production environment.
- ****When using DynamoDB, make sure that you’ve set the capacity to handle the load that you are testing**.** Use on-demand mode or auto scaling to accommodate the performance testing cycle.

#todo/prompts 
- [ ] list most common aws service patterns in terms of 




Alt jobs  
  
Triple A Roadside Assistance  
  
Visual interpreter for the blind  
[https://aira.io/](https://aira.io/)  
  
  
Study pool  [Studypool - Homework Help](https://www.studypool.com)
  
It help desk technician  
  
Medical transcription  
  
  
Virtual receptionist



#prompt 
Investigate the top achievers in software engineering. List key lessons from their success and discern patterns, strategies, habits, and mindset that contributes to their high productivity. Ask me detailed questions about my current work situation, my skills, and my professional goals. Based on my top responses contextualized the lessons from top performers to my unique context. Suggest specific actionable steps I can take to implement these lessons in my daily routine boost my productivity and overall performance.  
  
  
As a decision making assistant apply your reasoning to the situation where I'm deliberating whether to do a or b. Generate a comprehensive evaluation that lists out pro and cons making this decision and also considering the potential long-term implications, possible alternative options, and any risk or opportunities associated with each. Your objectives is provided a detailed multifaceted analysis that will guide me toward a well-informed decision.